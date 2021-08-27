// Type definitions for Foundation Sites v6.3.1
// Project: https://get.foundation/
// Github: https://github.com/foundation/foundation-sites
//
// Definitions by: Sam Vloeberghs <https://github.com/samvloeberghs/>
// Original Definitions: https://github.com/samvloeberghs/foundation-sites-typings

declare module FoundationSites {

  // https://get.foundation/sites/docs/abide.html#javascript-reference
  interface Abide {
    enableValidation(): void;
    disableValidation(): void;
    requiredCheck(element: JQuery): boolean;
    findFormError(element: JQuery, failedValidators?: string[]): JQuery;
    findLabel(element: JQuery): boolean;
    findRadioLabels(elements: JQuery): boolean;
    findCheckboxLabels(elements: JQuery): boolean;
    addErrorClasses(element: JQuery, failedValidators?: string[]): void;
    addA11yAttributes(element: JQuery): void;
    addGlobalErrorA11yAttributes(element: JQuery): void;
    removeRadioErrorClasses(groupName: string): void;
    removeCheckboxErrorClasses(groupName: string): void;
    removeErrorClasses(element: JQuery): void;
    validateInput(element: JQuery): boolean;
    validateForm(): boolean;
    initialized: boolean;
    validateText(element: JQuery, pattern: string): boolean;
    validateRadio(groupName: string): boolean;
    validateCheckbox(groupName: string): boolean;
    matchValidation(element: JQuery, validators: string, required: boolean): boolean;
    resetForm(): void;
  }

  interface AbideDefaults {
    validateOn: string | null;
    labelErrorClass: string;
    inputErrorClass: string;
    formErrorSelector: string;
    formErrorClass: string;
    a11yAttributes: boolean;
    a11yErrorLevel: string;
    liveValidate: boolean;
    validateOnBlur: boolean;
    patterns: IAbidePatterns;
    validators: any; // TODO, maybe there is a better solution to describe how this object may look like
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
    website?: any;
  }

  interface IAbideOptions {
    validateOn?: string | null;
    labelErrorClass?: string;
    inputErrorClass?: string;
    formErrorSelector?: string;
    formErrorClass?: string;
    a11yAttributes?: boolean;
    a11yErrorLevel?: string;
    liveValidate?: boolean;
    validateOnBlur?: boolean;
    patterns?: IAbidePatterns;
    validators?: any;
  }

  // https://get.foundation/sites/docs/accordion.html#javascript-reference
  interface Accordion {
    toggle(target: JQuery): void;
    down(target: JQuery, firstTime: boolean): void;
    up(target: JQuery): void;
  }

  interface IAccordionOptions {
    slideSpeed?: number;
    multiExpand?: boolean;
    allowAllClosed?: boolean;
    deepLink?: boolean;
    deepLinkSmudge?: boolean;
    deepLinkSmudgeDelay?: number;
    deepLinkSmudgeOffset?: number;
    updateHistory?: boolean;
  }

  // https://get.foundation/sites/docs/accordion-menu.html#javascript-reference
  interface AccordionMenu {
    hideAll(): void;
    showAll(): void;
    toggle(target: JQuery): void;
    down(target: JQuery, firstTime: boolean): void;
    up(target: JQuery): void;
  }

  interface IAccordionMenuOptions {
    parentLink?: boolean;
    slideSpeed?: number;
    submenuToggle?: boolean;
    submenuToggleText?: string;
    multiOpen?: boolean;
  }

  // https://get.foundation/sites/docs/drilldown-menu.html#javascript-reference
  interface Drilldown {
    // no public methods
  }

  interface IDrilldownOptions {
    autoApplyClass?: boolean;
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

  // https://get.foundation/sites/docs/dropdown.html#javascript-reference
  interface Dropdown {
    open(): void;
    close(): void;
    toggle(): void;
  }

  interface IDropdownOptions {
    parentClass?: string | null;
    hoverDelay?: number;
    hover?: boolean;
    hoverPane?: boolean;
    vOffset?: number;
    hOffset?: number;
    position?: string;
    alignment?: string;
    allowOverlap?: boolean;
    allowBottomOverlap?: boolean;
    trapFocus?: boolean;
    autoFocus?: boolean;
    closeOnClick?: boolean;
    forceFollow?: boolean;
  }

  // https://get.foundation/sites/docs/dropdown-menu.html#javascript-reference
  interface DropdownMenu {
    // No public methods
  }

  interface IDropdownMenuOptions {
    disableHover?: boolean;
    disableHoverOnTouch?: boolean;
    autoclose?: boolean;
    hoverDelay?: number;
    clickOpen?: boolean;
    closingTime?: number;
    alignment?: string;
    closeOnClick?: boolean;
    closeOnClickInside?: boolean;
    verticalClass?: string;
    rightClass?: string;
    forceFollow?: boolean;
  }

  // https://get.foundation/sites/docs/equalizer.html#javascript-reference
  interface Equalizer {
    getHeights(cb: Function): any[];
    getHeightsByRow(cb: Function): any[];
    applyHeight(heights: any[]): void;
    applyHeightByRow(groups: any[]): void;
  }

  interface IEqualizerOptions {
    equalizeOnStack?: boolean;
    equalizeByRow?: boolean;
    equalizeOn?: string;
  }

  // https://get.foundation/sites/docs/interchange.html#javascript-reference
  interface Interchange {
    replace(path: string): void;
  }

  interface IInterchangeOptions {
    rules?: any[];
    type?: string;
  }

  // https://get.foundation/sites/docs/magellan.html#javascript-reference
  interface Magellan {
    calcPoints(): void;
    scrollToLoc(location: string): void;
    reflow(): void;
  }

  interface IMagellanOptions {
    animationDuration?: number;
    animationEasing?: string;
    threshold?: number;
    activeClass?: string;
    deepLinking?: boolean;
    updateHistory?: boolean;
    offset?: number;
  }

  // https://get.foundation/sites/docs/offcanvas.html#javascript-reference
  interface OffCanvas {
    reveal(isRevealed: boolean): void;
    open(event: Event, trigger: JQuery): void;
    close(cb?: Function): void;
    toggle(event: Event, trigger: JQuery): void;
  }

  interface IOffCanvasOptions {
    closeOnClick?: boolean;
    contentOverlay?: boolean;
    contentId?: string | null;
    nested?: boolean;
    contentScroll?: boolean;
    transitionTime?: string;
    transition?: string;
    forceTo?: string | null;
    isRevealed?: boolean;
    revealOn?: string | null;
    inCanvasOn?: string | null;
    autoFocus?: boolean;
    revealClass?: string;
    trapFocus?: boolean;
  }

  // https://get.foundation/sites/docs/orbit.html#javascript-reference
  interface Orbit {
    geoSync(): void;
    changeSlide(isLTR: boolean, chosenSlide?: JQuery, idx?: number): void;
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

  interface Positionable {
    // No public methods
  }

  interface IPositionableOptions {
    position?: string;
    alignment?: string;
    allowOverlap?: boolean;
    allowBottomOverlap?: boolean;
    vOffset?: number;
    hOffset?: number;
  }

  interface ResponsiveAccordionTabs {
    storezfData: any;
    open(_target: any, ...args: any[]): any;
    close(_target: any, ...args: any[]): any;
    toggle(_target: any, ...args: any[]): any;
  }

  interface IResponsiveAccordionTabsOptions {
    // No Options
  }

  interface ResponsiveMenu {
    // No public methods
  }

  interface IResponsiveMenuOptions {
    // No Options
  }

  interface ResponsiveToggle {
    toggleMenu(): void;
  }

  interface IResponsiveToggleOptions {
    hideFor?: string;
    animate?: boolean;
  }

  // https://get.foundation/sites/docs/reveal.html#javascript-reference
  interface Reveal {
    open(): void;
    toggle(): void;
    close(): void;
  }

  interface IRevealOptions {
    animationIn?: string;
    animationOut?: string;
    showDelay?: number;
    hideDelay?: number;
    closeOnClick?: boolean;
    closeOnEsc?: boolean;
    multipleOpened?: boolean;
    vOffset?: number | string;
    hOffset?: number | string;
    fullScreen?: boolean;
    overlay?: boolean;
    resetOnClose?: boolean;
    deepLink?: boolean;
    updateHistory?: boolean;
    appendTo?: string;
    additionalOverlayClasses?: string;
  }

  // https://get.foundation/sites/docs/slider.html#javascript-reference
  interface Slider {
    // No public methods
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

  interface SmoothScroll {
    scrollToLoc(loc: string, options: any, callback: Function): boolean;
    constructor(element: any, options: any);
  }

  interface ISmoothScrollOptions {
    animationDuration?: number;
    animationEasing?: string;
    threshold?: number;
    offset?: number;
  }

  // https://get.foundation/sites/docs/sticky.html#javascript-reference
  interface Sticky {
    // No public methods
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
    dynamicHeight?: boolean;
    checkEvery?: number;
  }

  // https://get.foundation/sites/docs/tabs.html#javascript-reference
  interface Tabs {
    selectTab(element: JQuery | string): void;
  }

  interface ITabsOptions {
    deepLink?: boolean;
    deepLinkSmudge?: boolean;
    deepLinkSmudgeDelay?: number;
    deepLinkSmudgeOffset?: number;
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

  // https://get.foundation/sites/docs/toggler.html#javascript-reference
  interface Toggler {
    toggle(): void;
  }

  interface ITogglerOptions {
    toggler?: string;
    animate?: boolean;
  }

  // https://get.foundation/sites/docs/tooltip.html#javascript-reference
  interface Tooltip {
    show(): void;
    hide(): void;
    toggle(): void;
  }

  interface ITooltipOptions {
    hoverDelay?: number;
    fadeInDuration?: number;
    fadeOutDuration?: number;
    disableHover?: boolean;
    disableForTouch?: any;
    templateClasses?: string;
    tooltipClass?: string;
    triggerClass?: string;
    showOn?: string;
    template?: string;
    tipText?: string;
    touchCloseText?: string;
    clickOpen?: boolean;
    position?: string;
    alignment?: string;
    allowOverlap?: boolean;
    allowBottomOverlap?: boolean;
    vOffset?: number;
    hOffset?: number;
    tooltipHeight?: number;
    tooltipWidth?: number;
    allowHtml?: boolean;
  }

  // Utilities
  // ---------

  interface Box {
    ImNotTouchingYou(element: Object, parent?: Object, lrOnly?: boolean, tbOnly?: boolean): boolean;
    OverlapArea(element: Object, parent?: Object, lrOnly?: boolean, tbOnly?: boolean, ignoreBottom?: boolean): number;
    GetDimensions(element: Object): Object;
    GetExplicitOffsets(element: any, anchor: any, position: string, alignment: any, vOffset: number, hOffset: number, isOverflow: boolean): Object
  }

  interface Keyboard {
    parseKey(event: any): string;
    handleKey(event: any, component: any, functions: any): void;
    findFocusable(element: JQuery): Object;
    register(componentName: any, cmds: any): void;
    trapFocus(element: JQuery): void;
    releaseFocus(element: JQuery): void;
  }

  interface MediaQuery {
    queries: any[];
    current: string;
    atLeast(size: string): boolean;
    only(size: string): boolean;
    upTo(size: string): boolean;
    is(size: string): boolean;
    get(size: string): string | null;
    next(size: string): string | null;
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
    setupSpotSwipe(event: Object): void;
    setupTouchHandler(event: Object): void;
    init(event: Object): void;
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
    GetYoDigits(length: number, namespace?: string): string;
    reflow(elem: Object, plugins?: Array<string>|string): void;
    getFnName(fn: string): string;
    RegExpEscape(str: string): string;
    transitionend(element: JQuery): any;
    onLoad(elem: any, handler: any): string;

    util: {
      throttle(func: (...args: any[]) => any, delay: number): (...args: any[]) => any;
    };

    Abide: {
      new(element: JQuery, options?: IAbideOptions): Abide;
      defaults: AbideDefaults;
    }
    Accordion: {
      new(element: JQuery, options?: IAccordionOptions): Accordion;
    }
    AccordionMenu: {
      new(element: JQuery, options?: IAccordionMenuOptions): AccordionMenu;
    }
    Drilldown: {
      new(element: JQuery, options?: IDrilldownOptions): Drilldown;
    }
    Dropdown: {
      new(element: JQuery, options?: IDropdownOptions): Dropdown;
    }
    DropdownMenu: {
      new(element: JQuery, options?: IDropdownMenuOptions): DropdownMenu;
    }
    Equalizer: {
      new(element: JQuery, options?: IEqualizerOptions): Equalizer;
    }
    Interchange: {
      new(element: JQuery, options?: IInterchangeOptions): Interchange;
    }
    Magellan: {
      new(element: JQuery, options?: IMagellanOptions): Magellan;
    }
    OffCanvas: {
      new(element: JQuery, options?: IOffCanvasOptions): OffCanvas;
    }
    Orbit: {
      new(element: JQuery, options?: IOrbitOptions): Orbit;
    }
    Positionable: {
      new(element: JQuery, options?: IPositionableOptions): Positionable;
    }
    ResponsiveAccordionTabs: {
      new(element: JQuery, options?: IResponsiveAccordionTabsOptions): ResponsiveAccordionTabs;
    };
    ResponsiveMenu: {
      new(element: JQuery, options?: IResponsiveMenuOptions): ResponsiveMenu;
    };
    ResponsiveToggle: {
      new(element: JQuery, options?: IResponsiveToggleOptions): ResponsiveToggle;
    };
    Reveal: {
      new(element: JQuery, options?: IRevealOptions): Reveal;
    };
    Slider: {
      new(element: JQuery, options?: ISliderOptions): Slider;
    }
    SmoothScroll: {
      new(element: JQuery, options?: ISmoothScrollOptions): SmoothScroll;
    }
    Sticky: {
      new(element: JQuery, options?: IStickyOptions): Sticky;
    }
    Tabs: {
      new(element: JQuery, options?: ITabsOptions): Tabs;
    }
    Toggler: {
      new(element: JQuery, options?: ITogglerOptions): Toggler;
    }
    Tooltip: {
      new(element: JQuery, options?: ITooltipOptions): Tooltip;
    }

    // utils
    Box: Box;
    Keyboard: Keyboard;
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
  foundation(method?: string | Array<any>, ...args: any[]): JQuery;
}

declare var Foundation: FoundationSites.FoundationSitesStatic;

declare module "Foundation" {
  export = Foundation;
}

declare module "foundation-sites" {
  export = Foundation;
}
