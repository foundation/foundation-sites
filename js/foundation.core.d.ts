import { Plugin, PluginConstructor } from './foundation.plugin';
export interface FoundationCore {
    version: string;
    plugin(plugin: PluginConstructor, name: string): void;
    registerPlugin(plugin: Plugin, name: string): void;
    unregisterPlugin(plugin: Plugin): void;
    [key: string]: Plugin | any;
}
declare const Foundation: FoundationCore;
export { Foundation };
