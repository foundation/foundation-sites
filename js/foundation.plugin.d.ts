export interface PluginConstructor {
    new (element: JQuery, options: any): Plugin;
}
export interface PluginOptions {
}
export declare abstract class Plugin {
    static className: string;
    uuid: string;
    $element: JQuery;
    options: PluginOptions;
    constructor(element: JQuery, options: any);
    protected abstract _setup(element: JQuery, options: any): void;
    protected abstract _destroy(): void;
    destroy(): void;
}
