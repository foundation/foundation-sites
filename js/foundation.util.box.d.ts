declare const Box: {
    ImNotTouchingYou: (element: JQuery<HTMLElement>, parent: JQuery<HTMLElement>, lrOnly: boolean, tbOnly: boolean, ignoreBottom: boolean) => boolean;
    OverlapArea: (element: JQuery<HTMLElement>, parent: JQuery<HTMLElement>, lrOnly: boolean, tbOnly: boolean, ignoreBottom: boolean) => number;
    GetDimensions: (element: HTMLElement | JQuery<HTMLElement>) => {
        width: number;
        height: number;
        offset: {
            top: number;
            left: number;
        };
        parentDims: {
            width: any;
            height: any;
            offset: {
                top: any;
                left: any;
            };
        };
        windowDims: {
            width: number;
            height: number;
            offset: {
                top: number;
                left: number;
            };
        };
    };
    GetOffsets: (element: any, anchor: any, position: any, vOffset: any, hOffset: any, isOverflow: any) => {
        top: any;
        left: any;
    };
    GetExplicitOffsets: (element: any, anchor: any, position: any, alignment: any, vOffset: any, hOffset: any, isOverflow: any) => {
        top: any;
        left: any;
    };
};
export { Box };
