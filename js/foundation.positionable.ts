import { Plugin } from './foundation.plugin';
import { Box } from './foundation.util.box';
import { rtl as Rtl } from './foundation.util.core';

export type Alignment = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'auto';

const POSITIONS: Array<Alignment> = ['left', 'right', 'top', 'bottom'];
const VERTICAL_ALIGNMENTS: Array<Alignment> = ['top', 'bottom', 'center'];
const HORIZONTAL_ALIGNMENTS: Array<Alignment> = ['left', 'right', 'center'];

const ALIGNMENTS = {
  left: VERTICAL_ALIGNMENTS,
  right: VERTICAL_ALIGNMENTS,
  top: HORIZONTAL_ALIGNMENTS,
  bottom: HORIZONTAL_ALIGNMENTS,
};

function nextItem(item, array) {
  const currentIdx = array.indexOf(item);
  if (currentIdx === array.length - 1) {
    return array[0];
  } else {
    return array[currentIdx + 1];
  }
}
export interface PositionableOptions {
  position?: string;
  alignment?: string;
  allowOverlap?: boolean;
  allowBottomOverlap?: boolean;
  vOffset?: number;
  hOffset?: number;
  hoverDelay?: number;
}

export abstract class Positionable extends Plugin {

  public static defaults = {
    /**
     * Position of positionable relative to anchor. Can be left, right, bottom, top, or auto.
     * @option
     * @type {string}
     * @default 'auto'
     */
    position: 'auto',
    /**
     * Alignment of positionable relative to anchor. Can be left, right, bottom, top, center, or auto.
     * @option
     * @type {string}
     * @default 'auto'
     */
    alignment: 'auto',
    /**
     * Allow overlap of container/window. If false, dropdown positionable first
     * try to position as defined by data-position and data-alignment, but
     * reposition if it would cause an overflow.
     * @option
     * @type {boolean}
     * @default false
     */
    allowOverlap: false,
    /**
     * Allow overlap of only the bottom of the container. This is the most common
     * behavior for dropdowns, allowing the dropdown to extend the bottom of the
     * screen but not otherwise influence or break out of the container.
     * @option
     * @type {boolean}
     * @default true
     */
    allowBottomOverlap: true,
    /**
     * Number of pixels the positionable should be separated vertically from anchor
     * @option
     * @type {number}
     * @default 0
     */
    vOffset: 0,
    /**
     * Number of pixels the positionable should be separated horizontally from anchor
     * @option
     * @type {number}
     * @default 0
     */
    hOffset: 0,
  };

  public position: Alignment;
  public alignment: Alignment;

  /**
   * Abstract class encapsulating the tether-like explicit positioning logic
   * including repositioning based on overlap.
   * Expects classes to define defaults for vOffset, hOffset, position,
   * alignment, allowOverlap, and allowBottomOverlap. They can do this by
   * extending the defaults, or (for now recommended due to the way docs are
   * generated) by explicitly declaring them.
   *
   **/

  public _init() {
    this.triedPositions = {};
    this.position  = this.options.position === 'auto' ? this._getDefaultPosition() : this.options.position;
    this.alignment = this.options.alignment === 'auto' ? this._getDefaultAlignment() : this.options.alignment;
    this.originalPosition = this.position;
    this.originalAlignment = this.alignment;
  }

  public _getDefaultPosition(): Alignment {
    return 'bottom';
  }

  public _getDefaultAlignment(): Alignment {
    switch (this.position) {
      case 'bottom':
      case 'top':
        return Rtl() ? 'right' : 'left';
      case 'left':
      case 'right':
        return 'bottom';
    }
  }

  /**
   * Adjusts the positionable possible positions by iterating through alignments
   * and positions.
   * @function
   * @private
   */
  public _reposition() {
    if (this._alignmentsExhausted(this.position)) {
      this.position = nextItem(this.position, POSITIONS);
      this.alignment = ALIGNMENTS[this.position][0];
    } else {
      this._realign();
    }
  }

  /**
   * Adjusts the dropdown pane possible positions by iterating through alignments
   * on the current position.
   * @function
   * @private
   */
  public _realign() {
    this._addTriedPosition(this.position, this.alignment);
    this.alignment = nextItem(this.alignment, ALIGNMENTS[this.position]);
  }

  public _addTriedPosition(position, alignment) {
    this.triedPositions[position] = this.triedPositions[position] || [];
    this.triedPositions[position].push(alignment);
  }

  public _positionsExhausted() {
    let isExhausted = true;
    for (let i = 0; i < POSITIONS.length; i++) {
      isExhausted = isExhausted && this._alignmentsExhausted(POSITIONS[i]);
    }
    return isExhausted;
  }

  public _alignmentsExhausted(position) {
    return this.triedPositions[position] && this.triedPositions[position].length == ALIGNMENTS[position].length;
  }

  // When we're trying to center, we don't want to apply offset that's going to
  // take us just off center, so wrap around to return 0 for the appropriate
  // offset in those alignments.  TODO: Figure out if we want to make this
  // configurable behavior... it feels more intuitive, especially for tooltips, but
  // it's possible someone might actually want to start from center and then nudge
  // slightly off.
  public _getVOffset() {
    return this.options.vOffset;
  }

  public _getHOffset() {
    return this.options.hOffset;
  }

  public _setPosition($anchor, $element, $parent) {
    if ($anchor.attr('aria-expanded') === 'false'){ return false; }
    const $eleDims = Box.GetDimensions($element),
        $anchorDims = Box.GetDimensions($anchor);

    if (!this.options.allowOverlap) {
      // restore original position & alignment before checking overlap
      this.position = this.originalPosition;
      this.alignment = this.originalAlignment;
    }

    $element.offset(Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));

    if (!this.options.allowOverlap) {
      const overlaps = {};
      let minOverlap = 100000000;
      // default coordinates to how we start, in case we can't figure out better
      let minCoordinates = {position: this.position, alignment: this.alignment};
      while (!this._positionsExhausted()) {
        const overlap = Box.OverlapArea($element, $parent, false, false, this.options.allowBottomOverlap);
        if (overlap === 0) {
          return;
        }

        if (overlap < minOverlap) {
          minOverlap = overlap;
          minCoordinates = {position: this.position, alignment: this.alignment};
        }

        this._reposition();

        $element.offset(Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
      }
      // If we get through the entire loop, there was no non-overlapping
      // position available. Pick the version with least overlap.
      this.position = minCoordinates.position;
      this.alignment = minCoordinates.alignment;
      $element.offset(Box.GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
    }
  }

}
