import { Plugin, PluginConstructor } from './foundation.plugin';
declare const Foundation: {
    version: string;
    _plugins: {};
    _uuids: never[];
    plugin(plugin: PluginConstructor, name: string): void;
    registerPlugin(plugin: Plugin, name: string): void;
    unregisterPlugin(plugin: Plugin): void;
    reInit(plugins: any): any;
    reflow(elem: any, plugins: any): void;
    getFnName: (fn: any) => any;
    addToJquery($: any): any;
};
export { Foundation };
