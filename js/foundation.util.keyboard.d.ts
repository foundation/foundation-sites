declare var Keyboard: {
    keys: {};
    parseKey: (event: any) => any;
    handleKey(event: any, component: any, functions: any): void;
    findFocusable: ($element: any) => any;
    register(componentName: any, cmds: any): void;
    trapFocus($element: any): void;
    releaseFocus($element: any): void;
};
export { Keyboard };
