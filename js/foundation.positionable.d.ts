import { Plugin } from './foundation.plugin';
export interface PositionableOptions {
    position?: string;
    alignment?: string;
    allowOverlap?: boolean;
    allowBottomOverlap?: boolean;
    vOffset?: number;
    hOffset?: number;
    hoverDelay?: number;
}
export declare abstract class Positionable extends Plugin {
    static defaults: {
        position: string;
        alignment: string;
        allowOverlap: boolean;
        allowBottomOverlap: boolean;
        vOffset: number;
        hOffset: number;
    };
    position: string;
    alignment: string;
    /**
     * Abstract class encapsulating the tether-like explicit positioning logic
     * including repositioning based on overlap.
     * Expects classes to define defaults for vOffset, hOffset, position,
     * alignment, allowOverlap, and allowBottomOverlap. They can do this by
     * extending the defaults, or (for now recommended due to the way docs are
     * generated) by explicitly declaring them.
     *
     **/
    _init(): void;
    _getDefaultPosition(): string;
    _getDefaultAlignment(): "left" | "right" | "bottom" | undefined;
    /**
     * Adjusts the positionable possible positions by iterating through alignments
     * and positions.
     * @function
     * @private
     */
    _reposition(): void;
    /**
     * Adjusts the dropdown pane possible positions by iterating through alignments
     * on the current position.
     * @function
     * @private
     */
    _realign(): void;
    _addTriedPosition(position: any, alignment: any): void;
    _positionsExhausted(): boolean;
    _alignmentsExhausted(position: any): boolean;
    _getVOffset(): any;
    _getHOffset(): any;
    _setPosition($anchor: any, $element: any, $parent: any): false | undefined;
}
