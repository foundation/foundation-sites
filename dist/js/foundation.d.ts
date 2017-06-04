// Type definitions for Foundation Sites v6.3.1
// Project: http://foundation.zurb.com/
// Github: https://github.com/zurb/foundation-sites
//
// Definitions by: Sam Vloeberghs <https://github.com/samvloeberghs/>
// Original Definitions: https://github.com/samvloeberghs/foundation-sites-typings

declare module FoundationSites {

  // http://foundation.zurb.com/sites/docs/abide.html#javascript-reference
  interface Abide {
    requiredChecked(element: JQuery): boolean;
    findFormError(element: JQuery): JQuery;
    findLabel(element: JQuery): boolean;
    findRadioLabels(element: JQuery): any;
    addErrorClasses(element: JQuery): void;
    removeRadioErrorClasses(groupName: string): void;
    removeErrorClasses(element: JQuery): void;
    validateInput(element: JQuery): boolean;
    validateForm(): boolean;
    validateText(element: JQuery, pattern: string): boolean;
    validateRadio(groupName: string): boolean;
    matchValidation(element: JQuery, validators: string, required: boolean): boolean;
    resetForm(): void;
    destroy(): void;
  }

  interface AbideDefaults extends IAbideOptions{
   
  }

  interface IAbidePatterns {
    alpha?: RegExp;
    alpha_numeric?: RegExp;
    integer?: RegExp;
    number?: RegExp;
    card?: RegExp;
    cvv?: RegExp;
    email ?: RegExp;
    url?: RegExp;
    domain?: RegExp;
    datetime?: RegExp;
    date?: RegExp;
    time?: RegExp;
    dateISO?: RegExp;
    month_day_year?: RegExp;
    day_month_year?: RegExp;
    color?: RegExp;
  }

  interface IAbideOptions {
    validateOn?: string;
    labelErrorClass?: string;
    inputErrorClass?: string;
    formErrorSelector?: string;
    formErrorClass?: string;
    liveValidate?: boolean;
    validators?: {[key:string]:Function};
    patterns?:{[key:string]:RegExp}; 
  }

  // http://foundation.zurb.com/sites/docs/accordion.html#javascript-reference
  interface Accordion {
    toggle($target: JQuery): void;
    down($target: JQuery, firstTime: boolean): void;
    up($target: JQuery): void;
    destroy(): void;
  }

  interface AccordionDefaults extends IAccordionOptions{
   
  }

  interface IAccordionOptions {
    slideSpeed?: number
    multiExpand?: boolean;
    allowAllClosed?: boolean;
  }

  // http://foundation.zurb.com/sites/docs/accordion-menu.html#javascript-reference
  interface AccordionMenu {
    hideAll(): void;
    toggle($target: JQuery): void;
    down($target: JQuery, firstTime: boolean): void;
    up($target: JQuery): void;
    destroy(): void;
  }

  interface AccordionMenuDefaults extends IAccordionMenuOptions{

  }

  interface IAccordionMenuOptions {
    slideSpeed?: number;
    multiOpen?: boolean;
  }

  // http://foundation.zurb.com/sites/docs/drilldown-menu.html#javascript-reference
  interface Drilldown {
    destroy(): void;
  }

  interface DrilldownDefaults extends IDrilldownOptions{
    
  }

  interface IDrilldownOptions {
    backButton?: string;
    backButtonPosition?: string;
    wrapper?: string;
    parentLink?: boolean;
    closeOnClick?: boolean;
    autoHeight?: boolean;
    animateHeight?: boolean;
    scrollTop?: boolean;
    scrollTopElement?: string;
    scrollTopOffset?: number;
    animationDuration?: number;
    animationEasing?: string;
  }

  // http://foundation.zurb.com/sites/docs/dropdown.html#javascript-reference
  interface Dropdown {
    getPositionClass(): string;
    open(): void;
    close(): void;
    toggle(): void;
    destroy(): void;
  }

  interface DropdownDefaults extends IDropdownOptions{
  
  }

  interface IDropdownOptions {
    hoverDelay?: number;
    hover?: boolean;
    hoverPane?: boolean;
    vOffset?: number;
    hOffset?: number;
    positionClass?: string;
    trapFocus?: boolean;
    autoFocus?: boolean;
    closeOnClick?: boolean;
  }

  // http://foundation.zurb.com/sites/docs/dropdown-menu.html#javascript-reference
  interface DropdownMenu {
    destroy(): void;
  }

  interface dropdownMenuDefaults extends IDropdownMenuOptions{
  
  }

  interface IDropdownMenuOptions {
    disableHover?: boolean;
    autoclose?: boolean;
    hoverDelay?: number;
    clickOpen?: boolean;
    closingTime?: number;
    alignment?: string;
    closeOnClick?: boolean;
    verticalClass?: string;
    rightClass?: string;
    forceFollow?: boolean;
  }

  // http://foundation.zurb.com/sites/docs/equalizer.html#javascript-reference
  interface Equalizer {
    getHeights(cb: Function): Array<any>;
    getHeightsByRow(cb: Function): Array<any>;
    applyHeight(heights: Array<any>): void;
    applyHeightByRow(groups: Array<any>): void;
    destroy(): void;
  }

  interface EqualizerDefaults extends IEqualizerOptions{
  }

  interface IEqualizerOptions{
    equalizeOnStack?: boolean;
    equalizeByRow?: boolean;
    equalizeOn?: string;
  
  }

  // http://foundation.zurb.com/sites/docs/interchange.html#javascript-reference
  interface Interchange {
    replace(path: string): void;
    destroy(): void;
  }

  interface InterchangeDefaults extends IInterchangeOptions{
  
  }

  interface InterchangeOptions{
    rules?: Array<any>;
  }

  // http://foundation.zurb.com/sites/docs/magellan.html#javascript-reference
  interface Magellan {
    calcPoints(): void;
    scrollToLoc(location: string): void;
    reflow(): void;
    destroy(): void;
  }
  
  interface MagellanDefaults extends IMagellanOptions{
    
  }

  interface IMagellanOptions {
    animationDuration?: number;
    animationEasing?: string;
    threshold?: number;
    activeClass?: string;
    deepLinking?: boolean;
    barOffset?: number;
  }

  // http://foundation.zurb.com/sites/docs/offcanvas.html#javascript-reference
  interface OffCanvas {
    reveal(isRevealed: boolean): void;
    open(event: Event, trigger: JQuery): void;
    close(cb?: Function): void;
    toggle(event: Event, trigger: JQuery): void;
    destroy(): void;
  }

  interface OffCanvasDefaults extends IOffCanvasOptions{
    
  }

  interface IOffCanvasOptions {
    closeOnClick?: boolean;
    transitionTime?: number;
    position?: string;
    forceTop?: boolean;
    isRevealed?: boolean;
    revealOn?: string;
    autoFocus?: boolean;
    revealClass?: string;
    trapFocus?: boolean;
  }

  // http://foundation.zurb.com/sites/docs/orbit.html#javascript-reference
  interface Orbit {
    geoSync(): void;
    changeSlide(isLTR: boolean, chosenSlide?: JQuery, idx?: number): void;
    destroy(): void;
  }

  interface OrbitDefaults extends IOrbitOptions{
    
  }

  interface IOrbitOptions {
    bullets?: boolean;
    navButtons?: boolean;
    animInFromRight?: string;
    animOutToRight?: string;
    animInFromLeft?: string;
    animOutToLeft?: string;
    autoPlay?: boolean;
    timerDelay?: number;
    infiniteWrap?: boolean;
    swipe?: boolean;
    pauseOnHover?: boolean;
    accessible?: boolean;
    containerClass?: string;
    slideClass?: string;
    boxOfBullets?: string;
    nextClass?: string;
    prevClass?: string;
    useMUI?: boolean;
  }

  // https://foundation.zurb.com/sites/docs/responsive-navigation.htm
  interface ResponsiveMenu{
    destroy();
  }

  interface ResponsiveMenuDefaults extends IResponsiveMenuOptions{
    
  }

  interface IResponsiveMenuOptions{

  }

  // https://foundation.zurb.com/sites/docs/responsive-navigation.html
  interface ResponsiveToggle{
    toggleMenu();
    destroy();
  }

  interface ResponsiveToggleDefaults extends IResponsiveToggleOptions{
    
  }

  interface IResponsiveToggleOptions{
    hideFor?: string;
    animate?: boolean|string;
  }

  // http://foundation.zurb.com/sites/docs/reveal.html#javascript-reference
  interface Reveal {
    open(): void;
    toggle(): void;
    close(): void;
    destroy(): void;
  }

  interface RevealDefaults extends IRevealOptions{

  }
  interface IRevealOptions {
    animationIn?: string;
    animationOut?: string;
    showDelay?: number;
    hideDelay?: number;
    closeOnClick?: boolean;
    closeOnEsc?: boolean;
    multipleOpened?: boolean;
    vOffset?: number|string;
    hOffset?: number|string;
    fullScreen?: boolean;
    btmOffsetPct?: number;
    overlay?: boolean;
    resetOnClose?: boolean;
    deepLink?: boolean;
    appendTo?: string;
  }

  // http://foundation.zurb.com/sites/docs/slider.html#javascript-reference
  interface Slider {
    destroy(): void;
  }

  interface SliderDefaults extends ISliderOptions{

  }

  interface ISliderOptions {
    start?: number;
    end?: number;
    step?: number;
    initialStart?: number;
    initialEnd?: number;
    binding?: boolean;
    clickSelect?: boolean;
    vertical?: boolean;
    draggable?: boolean;
    disabled?: boolean;
    doubleSided?: boolean;
    decimal?: number;
    moveTime?: number;
    disabledClass?: string;
    invertVertical?: boolean;
    changedDelay?: number;
    nonLinearBase?: number;
    positionValueFunction?: string;
  }

  // http://foundation.zurb.com/sites/docs/sticky.html#javascript-reference
  interface Sticky {
    destroy(): void;
  }

  interface StickyDefaults{

  }

  interface StickyDefaults extends IStickyOptions{

  }

  interface IStickyOptions {
    container?: string;
    stickTo?: string;
    anchor?: string;
    topAnchor?: string;
    btmAnchor?: string;
    marginTop?: number;
    marginBottom?: number;
    stickyOn?: string;
    stickyClass?: string;
    containerClass?: string;
    checkEvery?: number;
  }

  // http://foundation.zurb.com/sites/docs/tabs.html#javascript-reference
  interface Tabs {
    selectTab(element: JQuery | string): void;
    destroy(): void;
  }

  interface TabsDefaults extends ITabsOptions{

  }

  interface ITabsOptions {
    deepLink?: boolean;
    deepLinkSmudge?: boolean;
    deepLinkSmudgeDelay?: number;
    updateHistory?: boolean;
    autoFocus?: boolean;
    wrapOnKeys?: boolean;
    matchHeight?: boolean;
    activeCollapse?: boolean;
    linkClass?: string;
    linkActiveClass?: string;
    panelClass?: string;
    panelActiveClass?: string;
  }

  // http://foundation.zurb.com/sites/docs/toggler.html#javascript-reference
  interface Toggler {
    toggle(): void;
    destroy(): void;
  }

  interface TogglerDefaults extends ITogglerOptions{

  }

  interface ITogglerOptions {
    animate?: boolean|string;
  }

  // http://foundation.zurb.com/sites/docs/tooltip.html#javascript-reference
  interface Tooltip {
    show(): void;
    hide(): void;
    toggle(): void;
    destroy(): void;
  }

  interface TooltipDefaults extends ITooltipOptions{

  }

  interface ITooltipOptions {
    disableForTouch?: boolean;
    hoverDelay?: number;
    fadeInDuration?: number;
    fadeOutDuration?: number;
    disableHover?: number;
    templateClasses?: string;
    tooltipClass?: string;
    triggerClass?: string;
    showOn?: string;
    template?: string;
    tipText?: string;
    touchCloseText?: string;
    clickOpen?: boolean;
    positionClass?: string;
    vOffset?: number;
    hOffset?: number;
    allowHtml?: boolean;
  }

  // Utilities
  // ---------

  interface Box {
    ImNotTouchingYou(element: Object, parent?: Object, lrOnly?: boolean, tbOnly?: boolean): boolean;
    GetDimensions(element: Object): Object;
    GetOffsets(element: Object, anchor: Object, position: string, vOffset: number, hOffset: number, isOverflow: boolean): Object;
  }

  interface KeyBoard {
    parseKey(event: any): string;
    handleKey(event: any, component: any, functions: any): void;
    findFocusable($element: Object): Object;
  }

  interface MediaQuery {
    get(size: string): string;
    atLeast(size: string): boolean;
    queries: Array<string>;
    current: string;
  }

  interface Motion {
    animateIn(element: Object, animation: any, cb: Function): void;
    animateOut(element: Object, animation: any, cb: Function): void;
  }

  interface Move {
    // TODO
  }

  interface Nest {
    Feather(menu: any, type: any): void;
    Burn(menu: any, type: any): void;
  }

  interface Timer {
    start(): void;
    restart(): void;
    pause(): void;
  }

  interface Touch {
    // TODO :extension on jQuery
  }

  interface Triggers {
    // TODO :extension on jQuery
  }

  interface FoundationSitesStatic {
    version: string;

    rtl(): boolean;
    plugin(plugin: Object, name: string): void;
    registerPlugin(plugin: Object): void;
    unregisterPlugin(plugin: Object): void;
    reInit(plugins: Array<any>): void;
	reInit(element: JQuery): void;
    GetYoDigits(length: number, namespace?: string): string;
    reflow(elem: Object, plugins?: Array<string>|string): void;
    getFnName(fn: string): string;
    transitionend(): string;

    util: {
      throttle(func: (...args: any[]) => any, delay: number): (...args: any[]) => any;
    };

    Abide: {
      new(element: JQuery, options?: IAbideOptions): Abide;
      defaults: AbideDefaults;
    }
    Accordion: {
      new(element: JQuery, options?: IAccordionOptions): Accordion;
      defaults: AccordionDefaults;
    }
    AccordionMenu: {
      new(element: JQuery, options?: IAccordionMenuOptions): AccordionMenu;
      defaults: AccordionMenuDefaults;
    }
    Drilldown: {
      new(element: JQuery, options?: IDrilldownOptions): Drilldown;
      defaults: DrilldownDefaults;
    }
    Dropdown: {
      new(element: JQuery, options?: IDropdownOptions): Dropdown;
      defaults: DropdownDefaults;
    }
    DropdownMenu: {
      new(element: JQuery, options?: IDropdownMenuOptions): DropdownMenu;
      defaults: dropdownMenuDefaults;
    }
    Equalizer: {
      new(element: JQuery, options?: IEqualizerOptions): Equalizer;
      defaults: EqualizerDefaults;
    }
    Interchange: {
      new(element: JQuery, options?: IInterchangeOptions): Interchange;
      defaults: InterchangeDefaults;
      SPECIAL_QUERIES:{[key:string]:string};
    }
    Magellan: {
      new(element: JQuery, options?: IMagellanOptions): Magellan;
      defaults: MagellanDefaults;
    }
    OffCanvas: {
      new(element: JQuery, options?: IOffCanvasOptions): OffCanvas;
      defaults: OffCanvasDefaults;
    }
    Orbit: {
      new(element: JQuery, options?: IOrbitOptions): Orbit;
      defaults: OrbitDefaults;
    }
    ResponsiveMenu: {
      new(element: JQuery, options?: IResponsiveMenuOptions): ResponsiveMenu;
      defaults: ResponsiveMenuDefaults;
    }
    ResponsiveToggle:{
      new(element: JQuery, options?:IResponsiveToggleOptions): ResponsiveToggle;
      defaults: ResponsiveToggleDefaults;
    }
    Reveal: {
      new(element: JQuery, options?: IRevealOptions): Reveal;
      defaults: RevealDefaults;
    };
    Slider: {
      new(element: JQuery, options?: ISliderOptions): Slider;
      defaults: SliderDefaults;
    }
    Sticky: {
      new(element: JQuery, options?: IStickyOptions): Sticky;
      defaults: StickyDefaults;
    }
    Tabs: {
      new(element: JQuery, options?: ITabsOptions): Tabs;
      defaults: TabsDefaults;
    }
    Toggler: {
      new(element: JQuery, options?: ITogglerOptions): Toggler;
      defaults: TogglerDefaults;
    }
    Tooltip: {
      new(element: JQuery, options?: ITooltipOptions): Tooltip;
      defaults: TooltipDefaults;
    }

    // utils
    Box: Box;
    KeyBoard: KeyBoard;
    MediaQuery: MediaQuery;
    Motion: Motion;
    Move: Move;
    Nest: Nest;
    Timer: Timer;
    Touch: Touch;
    Triggers: Triggers;

  }

}

interface JQuery {
  foundation(method?: string|Array<any>, $element?: JQuery): JQuery;
  addTouch():JQuery;
  spotSwipe():JQuery;
}

declare var Foundation: FoundationSites.FoundationSitesStatic;

declare module "Foundation" {
  export = Foundation;
}
