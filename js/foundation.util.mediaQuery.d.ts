declare var MediaQuery: {
    queries: never[];
    current: string;
    _init(): void;
    atLeast(size: any): boolean;
    is(size: any): boolean;
    get(size: any): any;
    _getCurrentSize(): any;
    _watcher(): void;
};
export { MediaQuery };
