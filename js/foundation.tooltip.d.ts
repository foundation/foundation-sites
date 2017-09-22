import { PositionableOptions } from './foundation.positionable';
export interface TooltipOptions extends PositionableOptions {
    disableForTouch?: boolean;
    fadeInDuration?: number;
    fadeOutDuration?: number;
    disableHover?: boolean;
    templateClasses?: string;
    tooltipClass?: string;
    triggerClass?: string;
    showOn?: string;
    template?: string;
    tipText?: string;
    touchCloseText?: string;
    tooltipHeight?: number;
    tooltipWidth?: number;
    clickOpen?: boolean;
    positionClass?: string;
    allowHtml?: boolean;
}
