import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { SpinnerIcon } from 'primeng/icons/spinner';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Scroller is a performance-approach to handle huge data efficiently.
 * @group Components
 */
export class Scroller {
    document;
    platformId;
    renderer;
    cd;
    zone;
    /**
     * Unique identifier of the element.
     * @group Props
     */
    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
    }
    /**
     * Inline style of the component.
     * @group Props
     */
    get style() {
        return this._style;
    }
    set style(val) {
        this._style = val;
    }
    /**
     * Style class of the element.
     * @group Props
     */
    get styleClass() {
        return this._styleClass;
    }
    set styleClass(val) {
        this._styleClass = val;
    }
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    get tabindex() {
        return this._tabindex;
    }
    set tabindex(val) {
        this._tabindex = val;
    }
    /**
     * An array of objects to display.
     * @group Props
     */
    get items() {
        return this._items;
    }
    set items(val) {
        this._items = val;
    }
    /**
     * The height/width of item according to orientation.
     * @group Props
     */
    get itemSize() {
        return this._itemSize;
    }
    set itemSize(val) {
        this._itemSize = val;
    }
    /**
     * Height of the scroll viewport.
     * @group Props
     */
    get scrollHeight() {
        return this._scrollHeight;
    }
    set scrollHeight(val) {
        this._scrollHeight = val;
    }
    /**
     * Width of the scroll viewport.
     * @group Props
     */
    get scrollWidth() {
        return this._scrollWidth;
    }
    set scrollWidth(val) {
        this._scrollWidth = val;
    }
    /**
     * The orientation of scrollbar.
     * @group Props
     */
    get orientation() {
        return this._orientation;
    }
    set orientation(val) {
        this._orientation = val;
    }
    /**
     * Used to specify how many items to load in each load method in lazy mode.
     * @group Props
     */
    get step() {
        return this._step;
    }
    set step(val) {
        this._step = val;
    }
    /**
     * Delay in scroll before new data is loaded.
     * @group Props
     */
    get delay() {
        return this._delay;
    }
    set delay(val) {
        this._delay = val;
    }
    /**
     * Delay after window's resize finishes.
     * @group Props
     */
    get resizeDelay() {
        return this._resizeDelay;
    }
    set resizeDelay(val) {
        this._resizeDelay = val;
    }
    /**
     * Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.
     * @group Props
     */
    get appendOnly() {
        return this._appendOnly;
    }
    set appendOnly(val) {
        this._appendOnly = val;
    }
    /**
     * Specifies whether the scroller should be displayed inline or not.
     * @group Props
     */
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = val;
    }
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    get lazy() {
        return this._lazy;
    }
    set lazy(val) {
        this._lazy = val;
    }
    /**
     * If disabled, the scroller feature is eliminated and the content is displayed directly.
     * @group Props
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = val;
    }
    /**
     * Used to implement a custom loader instead of using the loader feature in the scroller.
     * @group Props
     */
    get loaderDisabled() {
        return this._loaderDisabled;
    }
    set loaderDisabled(val) {
        this._loaderDisabled = val;
    }
    /**
     * Columns to display.
     * @group Props
     */
    get columns() {
        return this._columns;
    }
    set columns(val) {
        this._columns = val;
    }
    /**
     * Used to implement a custom spacer instead of using the spacer feature in the scroller.
     * @group Props
     */
    get showSpacer() {
        return this._showSpacer;
    }
    set showSpacer(val) {
        this._showSpacer = val;
    }
    /**
     * Defines whether to show loader.
     * @group Props
     */
    get showLoader() {
        return this._showLoader;
    }
    set showLoader(val) {
        this._showLoader = val;
    }
    /**
     * Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view.
     * @group Props
     */
    get numToleratedItems() {
        return this._numToleratedItems;
    }
    set numToleratedItems(val) {
        this._numToleratedItems = val;
    }
    /**
     * Defines whether the data is loaded.
     * @group Props
     */
    get loading() {
        return this._loading;
    }
    set loading(val) {
        this._loading = val;
    }
    /**
     * Defines whether to dynamically change the height or width of scrollable container.
     * @group Props
     */
    get autoSize() {
        return this._autoSize;
    }
    set autoSize(val) {
        this._autoSize = val;
    }
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity.
     * @group Props
     */
    get trackBy() {
        return this._trackBy;
    }
    set trackBy(val) {
        this._trackBy = val;
    }
    /**
     * Defines whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        if (val && typeof val === 'object') {
            //@ts-ignore
            Object.entries(val).forEach(([k, v]) => this[`_${k}`] !== v && (this[`_${k}`] = v));
        }
    }
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {ScrollerLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    /**
     * Callback to invoke when scroll position changes.
     * @param {ScrollerScrollEvent} event - Custom scroll event.
     * @group Emits
     */
    onScroll = new EventEmitter();
    /**
     * Callback to invoke when scroll position and item's range in view changes.
     * @param {ScrollerScrollEvent} event - Custom scroll index change event.
     * @group Emits
     */
    onScrollIndexChange = new EventEmitter();
    elementViewChild;
    contentViewChild;
    templates;
    _id;
    _style;
    _styleClass;
    _tabindex = 0;
    _items;
    _itemSize = 0;
    _scrollHeight;
    _scrollWidth;
    _orientation = 'vertical';
    _step = 0;
    _delay = 0;
    _resizeDelay = 10;
    _appendOnly = false;
    _inline = false;
    _lazy = false;
    _disabled = false;
    _loaderDisabled = false;
    _columns;
    _showSpacer = true;
    _showLoader = false;
    _numToleratedItems;
    _loading;
    _autoSize = false;
    _trackBy;
    _options;
    d_loading = false;
    d_numToleratedItems;
    contentEl;
    contentTemplate;
    itemTemplate;
    loaderTemplate;
    loaderIconTemplate;
    first = 0;
    last = 0;
    page = 0;
    isRangeChanged = false;
    numItemsInViewport = 0;
    lastScrollPos = 0;
    lazyLoadState = {};
    loaderArr = [];
    spacerStyle = {};
    contentStyle = {};
    scrollTimeout;
    resizeTimeout;
    initialized = false;
    resizeObserver;
    defaultWidth;
    defaultHeight;
    defaultContentWidth;
    defaultContentHeight;
    get vertical() {
        return this._orientation === 'vertical';
    }
    get horizontal() {
        return this._orientation === 'horizontal';
    }
    get both() {
        return this._orientation === 'both';
    }
    get loadedItems() {
        if (this._items && !this.d_loading) {
            if (this.both)
                return this._items.slice(this._appendOnly ? 0 : this.first.rows, this.last.rows).map((item) => (this._columns ? item : item.slice(this._appendOnly ? 0 : this.first.cols, this.last.cols)));
            else if (this.horizontal && this._columns)
                return this._items;
            else
                return this._items.slice(this._appendOnly ? 0 : this.first, this.last);
        }
        return [];
    }
    get loadedRows() {
        return this.d_loading ? (this._loaderDisabled ? this.loaderArr : []) : this.loadedItems;
    }
    get loadedColumns() {
        if (this._columns && (this.both || this.horizontal)) {
            return this.d_loading && this._loaderDisabled ? (this.both ? this.loaderArr[0] : this.loaderArr) : this._columns.slice(this.both ? this.first.cols : this.first, this.both ? this.last.cols : this.last);
        }
        return this._columns;
    }
    constructor(document, platformId, renderer, cd, zone) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
    }
    ngOnInit() {
        this.setInitialState();
    }
    ngOnChanges(simpleChanges) {
        let isLoadingChanged = false;
        if (simpleChanges.loading) {
            const { previousValue, currentValue } = simpleChanges.loading;
            if (this.lazy && previousValue !== currentValue && currentValue !== this.d_loading) {
                this.d_loading = currentValue;
                isLoadingChanged = true;
            }
        }
        if (simpleChanges.orientation) {
            this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        }
        if (simpleChanges.numToleratedItems) {
            const { previousValue, currentValue } = simpleChanges.numToleratedItems;
            if (previousValue !== currentValue && currentValue !== this.d_numToleratedItems) {
                this.d_numToleratedItems = currentValue;
            }
        }
        if (simpleChanges.options) {
            const { previousValue, currentValue } = simpleChanges.options;
            if (this.lazy && previousValue?.loading !== currentValue?.loading && currentValue?.loading !== this.d_loading) {
                this.d_loading = currentValue.loading;
                isLoadingChanged = true;
            }
            if (previousValue?.numToleratedItems !== currentValue?.numToleratedItems && currentValue?.numToleratedItems !== this.d_numToleratedItems) {
                this.d_numToleratedItems = currentValue.numToleratedItems;
            }
        }
        if (this.initialized) {
            const isChanged = !isLoadingChanged && (simpleChanges.items?.previousValue?.length !== simpleChanges.items?.currentValue?.length || simpleChanges.itemSize || simpleChanges.scrollHeight || simpleChanges.scrollWidth);
            if (isChanged) {
                this.init();
                this.calculateAutoSize();
            }
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'loader':
                    this.loaderTemplate = item.template;
                    break;
                case 'loadericon':
                    this.loaderIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this.viewInit();
        });
    }
    ngAfterViewChecked() {
        if (!this.initialized) {
            this.viewInit();
        }
    }
    ngOnDestroy() {
        this.unbindResizeListener();
        this.contentEl = null;
        this.initialized = false;
    }
    viewInit() {
        if (isPlatformBrowser(this.platformId) && !this.initialized) {
            if (DomHandler.isVisible(this.elementViewChild?.nativeElement)) {
                this.setInitialState();
                this.setContentEl(this.contentEl);
                this.init();
                this.calculateAutoSize();
                this.defaultWidth = DomHandler.getWidth(this.elementViewChild?.nativeElement);
                this.defaultHeight = DomHandler.getHeight(this.elementViewChild?.nativeElement);
                this.defaultContentWidth = DomHandler.getWidth(this.contentEl);
                this.defaultContentHeight = DomHandler.getHeight(this.contentEl);
                this.resizeObserver = new ResizeObserver(() => this.onResize());
                this.resizeObserver.observe(this.elementViewChild?.nativeElement);
                this.initialized = true;
            }
        }
    }
    init() {
        if (!this._disabled) {
            this.setSize();
            this.calculateOptions();
            this.setSpacerSize();
            this.cd.detectChanges();
        }
    }
    setContentEl(el) {
        this.contentEl = el || this.contentViewChild?.nativeElement || DomHandler.findSingle(this.elementViewChild?.nativeElement, '.p-scroller-content');
    }
    setInitialState() {
        this.first = this.both ? { rows: 0, cols: 0 } : 0;
        this.last = this.both ? { rows: 0, cols: 0 } : 0;
        this.numItemsInViewport = this.both ? { rows: 0, cols: 0 } : 0;
        this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.d_loading = this._loading || false;
        this.d_numToleratedItems = this._numToleratedItems;
        this.loaderArr = [];
        this.spacerStyle = {};
        this.contentStyle = {};
    }
    getElementRef() {
        return this.elementViewChild;
    }
    getPageByFirst(first) {
        return Math.floor(((first ?? this.first) + this.d_numToleratedItems * 4) / (this._step || 1));
    }
    isPageChanged(first) {
        return this._step ? this.page !== this.getPageByFirst(first ?? this.first) : true;
    }
    scrollTo(options) {
        // this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.elementViewChild?.nativeElement?.scrollTo(options);
    }
    scrollToIndex(index, behavior = 'auto') {
        const valid = this.both ? index.every((i) => i > -1) : index > -1;
        if (valid) {
            const first = this.first;
            const { scrollTop = 0, scrollLeft = 0 } = this.elementViewChild?.nativeElement;
            const { numToleratedItems } = this.calculateNumItems();
            const contentPos = this.getContentPosition();
            const itemSize = this.itemSize;
            const calculateFirst = (_index = 0, _numT) => (_index <= _numT ? 0 : _index);
            const calculateCoord = (_first, _size, _cpos) => _first * _size + _cpos;
            const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
            let newFirst = this.both ? { rows: 0, cols: 0 } : 0;
            let isRangeChanged = false, isScrollChanged = false;
            if (this.both) {
                newFirst = { rows: calculateFirst(index[0], numToleratedItems[0]), cols: calculateFirst(index[1], numToleratedItems[1]) };
                scrollTo(calculateCoord(newFirst.cols, itemSize[1], contentPos.left), calculateCoord(newFirst.rows, itemSize[0], contentPos.top));
                isScrollChanged = this.lastScrollPos.top !== scrollTop || this.lastScrollPos.left !== scrollLeft;
                isRangeChanged = newFirst.rows !== first.rows || newFirst.cols !== first.cols;
            }
            else {
                newFirst = calculateFirst(index, numToleratedItems);
                this.horizontal ? scrollTo(calculateCoord(newFirst, itemSize, contentPos.left), scrollTop) : scrollTo(scrollLeft, calculateCoord(newFirst, itemSize, contentPos.top));
                isScrollChanged = this.lastScrollPos !== (this.horizontal ? scrollLeft : scrollTop);
                isRangeChanged = newFirst !== first;
            }
            this.isRangeChanged = isRangeChanged;
            isScrollChanged && (this.first = newFirst);
        }
    }
    scrollInView(index, to, behavior = 'auto') {
        if (to) {
            const { first, viewport } = this.getRenderedRange();
            const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
            const isToStart = to === 'to-start';
            const isToEnd = to === 'to-end';
            if (isToStart) {
                if (this.both) {
                    if (viewport.first.rows - first.rows > index[0]) {
                        scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows - 1) * this._itemSize[0]);
                    }
                    else if (viewport.first.cols - first.cols > index[1]) {
                        scrollTo((viewport.first.cols - 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
                    }
                }
                else {
                    if (viewport.first - first > index) {
                        const pos = (viewport.first - 1) * this._itemSize;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
            else if (isToEnd) {
                if (this.both) {
                    if (viewport.last.rows - first.rows <= index[0] + 1) {
                        scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows + 1) * this._itemSize[0]);
                    }
                    else if (viewport.last.cols - first.cols <= index[1] + 1) {
                        scrollTo((viewport.first.cols + 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
                    }
                }
                else {
                    if (viewport.last - first <= index + 1) {
                        const pos = (viewport.first + 1) * this._itemSize;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
        }
        else {
            this.scrollToIndex(index, behavior);
        }
    }
    getRenderedRange() {
        const calculateFirstInViewport = (_pos, _size) => (_size || _pos ? Math.floor(_pos / (_size || _pos)) : 0);
        let firstInViewport = this.first;
        let lastInViewport = 0;
        if (this.elementViewChild?.nativeElement) {
            const { scrollTop, scrollLeft } = this.elementViewChild.nativeElement;
            if (this.both) {
                firstInViewport = { rows: calculateFirstInViewport(scrollTop, this._itemSize[0]), cols: calculateFirstInViewport(scrollLeft, this._itemSize[1]) };
                lastInViewport = { rows: firstInViewport.rows + this.numItemsInViewport.rows, cols: firstInViewport.cols + this.numItemsInViewport.cols };
            }
            else {
                const scrollPos = this.horizontal ? scrollLeft : scrollTop;
                firstInViewport = calculateFirstInViewport(scrollPos, this._itemSize);
                lastInViewport = firstInViewport + this.numItemsInViewport;
            }
        }
        return {
            first: this.first,
            last: this.last,
            viewport: {
                first: firstInViewport,
                last: lastInViewport
            }
        };
    }
    calculateNumItems() {
        const contentPos = this.getContentPosition();
        const contentWidth = (this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetWidth - contentPos.left : 0) || 0;
        const contentHeight = (this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetHeight - contentPos.top : 0) || 0;
        const calculateNumItemsInViewport = (_contentSize, _itemSize) => (_itemSize || _contentSize ? Math.ceil(_contentSize / (_itemSize || _contentSize)) : 0);
        const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
        const numItemsInViewport = this.both
            ? { rows: calculateNumItemsInViewport(contentHeight, this._itemSize[0]), cols: calculateNumItemsInViewport(contentWidth, this._itemSize[1]) }
            : calculateNumItemsInViewport(this.horizontal ? contentWidth : contentHeight, this._itemSize);
        const numToleratedItems = this.d_numToleratedItems || (this.both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
        return { numItemsInViewport, numToleratedItems };
    }
    calculateOptions() {
        const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
        const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
        const first = this.first;
        const last = this.both
            ? { rows: calculateLast(this.first.rows, numItemsInViewport.rows, numToleratedItems[0]), cols: calculateLast(this.first.cols, numItemsInViewport.cols, numToleratedItems[1], true) }
            : calculateLast(this.first, numItemsInViewport, numToleratedItems);
        this.last = last;
        this.numItemsInViewport = numItemsInViewport;
        this.d_numToleratedItems = numToleratedItems;
        if (this.showLoader) {
            this.loaderArr = this.both ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
        }
        if (this._lazy) {
            Promise.resolve().then(() => {
                this.lazyLoadState = {
                    first: this._step ? (this.both ? { rows: 0, cols: first.cols } : 0) : first,
                    last: Math.min(this._step ? this._step : this.last, this.items.length)
                };
                this.handleEvents('onLazyLoad', this.lazyLoadState);
            });
        }
    }
    calculateAutoSize() {
        if (this._autoSize && !this.d_loading) {
            Promise.resolve().then(() => {
                if (this.contentEl) {
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = 'auto';
                    this.contentEl.style.position = 'relative';
                    this.elementViewChild.nativeElement.style.contain = 'none';
                    const [contentWidth, contentHeight] = [DomHandler.getWidth(this.contentEl), DomHandler.getHeight(this.contentEl)];
                    contentWidth !== this.defaultContentWidth && (this.elementViewChild.nativeElement.style.width = '');
                    contentHeight !== this.defaultContentHeight && (this.elementViewChild.nativeElement.style.height = '');
                    const [width, height] = [DomHandler.getWidth(this.elementViewChild.nativeElement), DomHandler.getHeight(this.elementViewChild.nativeElement)];
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = '';
                    this.contentEl.style.position = '';
                    this.elementViewChild.nativeElement.style.contain = '';
                    this.defaultWidth = width;
                    this.defaultHeight = height;
                    this.defaultContentWidth = contentWidth;
                    this.defaultContentHeight = contentHeight;
                    (this.both || this.horizontal) && (this.elementViewChild.nativeElement.style.width = width < this.defaultWidth ? width + 'px' : this._scrollWidth || this.defaultWidth + 'px');
                    (this.both || this.vertical) && (this.elementViewChild.nativeElement.style.height = height < this.defaultHeight ? height + 'px' : this._scrollHeight || this.defaultHeight + 'px');
                }
            });
        }
    }
    getLast(last = 0, isCols = false) {
        return this._items ? Math.min(isCols ? (this._columns || this._items[0]).length : this._items.length, last) : 0;
    }
    getContentPosition() {
        if (this.contentEl) {
            const style = getComputedStyle(this.contentEl);
            const left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
            const right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
            const top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
            const bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);
            return { left, right, top, bottom, x: left + right, y: top + bottom };
        }
        return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
    }
    setSize() {
        if (this.elementViewChild?.nativeElement) {
            const parentElement = this.elementViewChild.nativeElement.parentElement.parentElement;
            const width = this._scrollWidth || `${this.elementViewChild.nativeElement.offsetWidth || parentElement.offsetWidth}px`;
            const height = this._scrollHeight || `${this.elementViewChild.nativeElement.offsetHeight || parentElement.offsetHeight}px`;
            const setProp = (_name, _value) => (this.elementViewChild.nativeElement.style[_name] = _value);
            if (this.both || this.horizontal) {
                setProp('height', height);
                setProp('width', width);
            }
            else {
                setProp('height', height);
            }
        }
    }
    setSpacerSize() {
        if (this._items) {
            const setProp = (_name, _count, _size) => (this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: _count * _size + 'px' } });
            const numItems = this._items.length;
            if (this.both) {
                setProp('height', numItems, this._itemSize[0]);
                setProp('width', this._columns?.length || this._items[1]?.length, this._itemSize[1]);
            }
            else {
                this.horizontal ? setProp('width', this._columns?.length || this._items.length, this._itemSize) : setProp('height', numItems, this._itemSize);
            }
        }
    }
    setContentPosition(pos) {
        if (this.contentEl && !this._appendOnly) {
            const first = pos ? pos.first : this.first;
            const calculateTranslateVal = (_first, _size) => _first * _size;
            const setTransform = (_x = 0, _y = 0) => (this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } });
            if (this.both) {
                setTransform(calculateTranslateVal(first.cols, this._itemSize[1]), calculateTranslateVal(first.rows, this._itemSize[0]));
            }
            else {
                const translateVal = calculateTranslateVal(first, this._itemSize);
                this.horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
            }
        }
    }
    onScrollPositionChange(event) {
        const target = event.target;
        const contentPos = this.getContentPosition();
        const calculateScrollPos = (_pos, _cpos) => (_pos ? (_pos > _cpos ? _pos - _cpos : _pos) : 0);
        const calculateCurrentIndex = (_pos, _size) => (_size || _pos ? Math.floor(_pos / (_size || _pos)) : 0);
        const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
            return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
        };
        const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
            if (_currentIndex <= _numT)
                return 0;
            else
                return Math.max(0, _isScrollDownOrRight ? (_currentIndex < _triggerIndex ? _first : _currentIndex - _numT) : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
        };
        const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols = false) => {
            let lastValue = _first + _num + 2 * _numT;
            if (_currentIndex >= _numT) {
                lastValue += _numT + 1;
            }
            return this.getLast(lastValue, _isCols);
        };
        const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
        const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
        let newFirst = this.both ? { rows: 0, cols: 0 } : 0;
        let newLast = this.last;
        let isRangeChanged = false;
        let newScrollPos = this.lastScrollPos;
        if (this.both) {
            const isScrollDown = this.lastScrollPos.top <= scrollTop;
            const isScrollRight = this.lastScrollPos.left <= scrollLeft;
            if (!this._appendOnly || (this._appendOnly && (isScrollDown || isScrollRight))) {
                const currentIndex = { rows: calculateCurrentIndex(scrollTop, this._itemSize[0]), cols: calculateCurrentIndex(scrollLeft, this._itemSize[1]) };
                const triggerIndex = {
                    rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                    cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                };
                newFirst = {
                    rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                    cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                };
                newLast = {
                    rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
                    cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
                };
                isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
                newScrollPos = { top: scrollTop, left: scrollLeft };
            }
        }
        else {
            const scrollPos = this.horizontal ? scrollLeft : scrollTop;
            const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
            if (!this._appendOnly || (this._appendOnly && isScrollDownOrRight)) {
                const currentIndex = calculateCurrentIndex(scrollPos, this._itemSize);
                const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
                newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
                newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
                isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
                newScrollPos = scrollPos;
            }
        }
        return {
            first: newFirst,
            last: newLast,
            isRangeChanged,
            scrollPos: newScrollPos
        };
    }
    onScrollChange(event) {
        const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);
        if (isRangeChanged) {
            const newState = { first, last };
            this.setContentPosition(newState);
            this.first = first;
            this.last = last;
            this.lastScrollPos = scrollPos;
            this.handleEvents('onScrollIndexChange', newState);
            if (this._lazy && this.isPageChanged(first)) {
                const lazyLoadState = {
                    first: this._step ? Math.min(this.getPageByFirst(first) * this._step, this.items.length - this._step) : first,
                    last: Math.min(this._step ? (this.getPageByFirst(first) + 1) * this._step : last, this.items.length)
                };
                const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;
                isLazyStateChanged && this.handleEvents('onLazyLoad', lazyLoadState);
                this.lazyLoadState = lazyLoadState;
            }
        }
    }
    onContainerScroll(event) {
        this.handleEvents('onScroll', { originalEvent: event });
        if (this._delay && this.isPageChanged()) {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            if (!this.d_loading && this.showLoader) {
                const { isRangeChanged } = this.onScrollPositionChange(event);
                const changed = isRangeChanged || (this._step ? this.isPageChanged() : false);
                if (changed) {
                    this.d_loading = true;
                    this.cd.detectChanges();
                }
            }
            this.scrollTimeout = setTimeout(() => {
                this.onScrollChange(event);
                if (this.d_loading && this.showLoader && (!this._lazy || this._loading === undefined)) {
                    this.d_loading = false;
                    this.page = this.getPageByFirst();
                    this.cd.detectChanges();
                }
            }, this._delay);
        }
        else {
            !this.d_loading && this.onScrollChange(event);
        }
    }
    unbindResizeListener() {
        if (this.resizeObserver) {
            this.resizeObserver.unobserve(this.elementViewChild?.nativeElement);
            this.resizeObserver = null;
        }
    }
    onResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(() => {
            if (DomHandler.isVisible(this.elementViewChild?.nativeElement)) {
                const [width, height] = [DomHandler.getWidth(this.elementViewChild?.nativeElement), DomHandler.getHeight(this.elementViewChild?.nativeElement)];
                const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
                const reinit = this.both ? isDiffWidth || isDiffHeight : this.horizontal ? isDiffWidth : this.vertical ? isDiffHeight : false;
                reinit &&
                    this.zone.run(() => {
                        this.d_numToleratedItems = this._numToleratedItems;
                        this.init();
                        this.calculateAutoSize();
                    });
            }
        }, this._resizeDelay);
    }
    handleEvents(name, params) {
        //@ts-ignore
        return this.options && this.options[name] ? this.options[name](params) : this[name].emit(params);
    }
    getContentOptions() {
        return {
            contentStyleClass: `p-scroller-content ${this.d_loading ? 'p-scroller-loading' : ''}`,
            items: this.loadedItems,
            getItemOptions: (index) => this.getOptions(index),
            loading: this.d_loading,
            getLoaderOptions: (index, options) => this.getLoaderOptions(index, options),
            itemSize: this._itemSize,
            rows: this.loadedRows,
            columns: this.loadedColumns,
            spacerStyle: this.spacerStyle,
            contentStyle: this.contentStyle,
            vertical: this.vertical,
            horizontal: this.horizontal,
            both: this.both
        };
    }
    getOptions(renderedIndex) {
        const count = (this._items || []).length;
        const index = this.both ? this.first.rows + renderedIndex : this.first + renderedIndex;
        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0
        };
    }
    getLoaderOptions(index, extOptions) {
        const count = this.loaderArr.length;
        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0,
            ...extOptions
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Scroller, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: Scroller, selector: "p-scroller", inputs: { id: "id", style: "style", styleClass: "styleClass", tabindex: "tabindex", items: "items", itemSize: "itemSize", scrollHeight: "scrollHeight", scrollWidth: "scrollWidth", orientation: "orientation", step: "step", delay: "delay", resizeDelay: "resizeDelay", appendOnly: "appendOnly", inline: "inline", lazy: "lazy", disabled: "disabled", loaderDisabled: "loaderDisabled", columns: "columns", showSpacer: "showSpacer", showLoader: "showLoader", numToleratedItems: "numToleratedItems", loading: "loading", autoSize: "autoSize", trackBy: "trackBy", options: "options" }, outputs: { onLazyLoad: "onLazyLoad", onScroll: "onScroll", onScrollIndexChange: "onScrollIndexChange" }, host: { classAttribute: "p-scroller-viewport p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "elementViewChild", first: true, predicate: ["element"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div
                #element
                [attr.id]="_id"
                [attr.tabindex]="tabindex"
                [ngStyle]="_style"
                [class]="_styleClass"
                [ngClass]="{ 'p-scroller': true, 'p-scroller-inline': inline, 'p-both-scroll': both, 'p-horizontal-scroll': horizontal }"
                (scroll)="onContainerScroll($event)"
                [attr.data-pc-name]="'scroller'"
                [attr.data-pc-section]="'root'"
            >
                <ng-container *ngIf="contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-scroller-content" [ngClass]="{ 'p-scroller-loading': d_loading }" [ngStyle]="contentStyle" [attr.data-pc-section]="'content'">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy || index">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-scroller-spacer" [ngStyle]="spacerStyle" [attr.data-pc-section]="'spacer'"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-scroller-loader" [ngClass]="{ 'p-component-overlay': !loaderTemplate }" [attr.data-pc-section]="'loader'">
                    <ng-container *ngIf="loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: getLoaderOptions(index, both && { numCols: _numItemsInViewport.cols }) }"></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate; context: { options: { styleClass: 'p-scroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <SpinnerIcon [styleClass]="'p-scroller-loading-icon pi-spin'" [attr.data-pc-section]="'loadingIcon'" />
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `, isInline: true, styles: ["@layer primeng{p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Scroller, decorators: [{
            type: Component,
            args: [{ selector: 'p-scroller', template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div
                #element
                [attr.id]="_id"
                [attr.tabindex]="tabindex"
                [ngStyle]="_style"
                [class]="_styleClass"
                [ngClass]="{ 'p-scroller': true, 'p-scroller-inline': inline, 'p-both-scroll': both, 'p-horizontal-scroll': horizontal }"
                (scroll)="onContainerScroll($event)"
                [attr.data-pc-name]="'scroller'"
                [attr.data-pc-section]="'root'"
            >
                <ng-container *ngIf="contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-scroller-content" [ngClass]="{ 'p-scroller-loading': d_loading }" [ngStyle]="contentStyle" [attr.data-pc-section]="'content'">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy || index">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-scroller-spacer" [ngStyle]="spacerStyle" [attr.data-pc-section]="'spacer'"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-scroller-loader" [ngClass]="{ 'p-component-overlay': !loaderTemplate }" [attr.data-pc-section]="'loader'">
                    <ng-container *ngIf="loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: getLoaderOptions(index, both && { numCols: _numItemsInViewport.cols }) }"></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate; context: { options: { styleClass: 'p-scroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <SpinnerIcon [styleClass]="'p-scroller-loading-icon pi-spin'" [attr.data-pc-section]="'loadingIcon'" />
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `, changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-scroller-viewport p-element'
                    }, styles: ["@layer primeng{p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }], propDecorators: { id: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], items: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], scrollWidth: [{
                type: Input
            }], orientation: [{
                type: Input
            }], step: [{
                type: Input
            }], delay: [{
                type: Input
            }], resizeDelay: [{
                type: Input
            }], appendOnly: [{
                type: Input
            }], inline: [{
                type: Input
            }], lazy: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loaderDisabled: [{
                type: Input
            }], columns: [{
                type: Input
            }], showSpacer: [{
                type: Input
            }], showLoader: [{
                type: Input
            }], numToleratedItems: [{
                type: Input
            }], loading: [{
                type: Input
            }], autoSize: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], options: [{
                type: Input
            }], onLazyLoad: [{
                type: Output
            }], onScroll: [{
                type: Output
            }], onScrollIndexChange: [{
                type: Output
            }], elementViewChild: [{
                type: ViewChild,
                args: ['element']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ScrollerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ScrollerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: ScrollerModule, declarations: [Scroller], imports: [CommonModule, SharedModule, SpinnerIcon], exports: [Scroller, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ScrollerModule, imports: [CommonModule, SharedModule, SpinnerIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ScrollerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, SpinnerIcon],
                    exports: [Scroller, SharedModule],
                    declarations: [Scroller]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2Nyb2xsZXIvc2Nyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUlSLE1BQU0sRUFDTixXQUFXLEVBS1gsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFtQixZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDM0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQUlwRDs7O0dBR0c7QUEwREgsTUFBTSxPQUFPLFFBQVE7SUFnYWE7SUFDRztJQUNyQjtJQUNBO0lBQ0E7SUFuYVo7OztPQUdHO0lBQ0gsSUFBYSxFQUFFO1FBQ1gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQyxHQUF1QjtRQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsSUFBYSxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxHQUFRO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDdEIsQ0FBQztJQUNEOzs7T0FHRztJQUNILElBQWEsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQztJQUNE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LElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN0TSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDOztnQkFDekQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hGLENBQUM7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUYsQ0FBQztJQUVELElBQUksYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDbEQsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMs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QVc7c0JBQXZCLEtBQUs7Z0JBVU8sVUFBVTtzQkFBdEIsS0FBSztnQkFVTyxNQUFNO3NCQUFsQixLQUFLO2dCQVVPLElBQUk7c0JBQWhCLEtBQUs7Z0JBVU8sUUFBUTtzQkFBcEIsS0FBSztnQkFVTyxjQUFjO3NCQUExQixLQUFLO2dCQVVPLE9BQU87c0JBQW5CLEtBQUs7Z0JBVU8sVUFBVTtzQkFBdEIsS0FBSztnQkFVTyxVQUFVO3NCQUF0QixLQUFLO2dCQVVPLGlCQUFpQjtzQkFBN0IsS0FBSztnQkFVTyxPQUFPO3NCQUFuQixLQUFLO2dCQVVPLFFBQVE7c0JBQXBCLEtBQUs7Z0JBVU8sT0FBTztzQkFBbkIsS0FBSztnQkFVTyxPQUFPO3NCQUFuQixLQUFLO2dCQWdCSSxVQUFVO3NCQUFuQixNQUFNO2dCQU1HLFFBQVE7c0JBQWpCLE1BQU07Z0JBTUcsbUJBQW1CO3NCQUE1QixNQUFNO2dCQUVlLGdCQUFnQjtzQkFBckMsU0FBUzt1QkFBQyxTQUFTO2dCQUVFLGdCQUFnQjtzQkFBckMsU0FBUzt1QkFBQyxTQUFTO2dCQUVZLFNBQVM7c0JBQXhDLGVBQWU7dUJBQUMsYUFBYTs7QUF5dkJsQyxNQUFNLE9BQU8sY0FBYzt1R0FBZCxjQUFjO3dHQUFkLGNBQWMsaUJBaGhDZCxRQUFRLGFBNGdDUCxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsYUE1Z0N4QyxRQUFRLEVBNmdDRyxZQUFZO3dHQUd2QixjQUFjLFlBSmIsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQzdCLFlBQVk7OzJGQUd2QixjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDO29CQUNsRCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDO29CQUNqQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlLCBTY3JvbGxlck9wdGlvbnMsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBTcGlubmVySWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc3Bpbm5lcic7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBTY3JvbGxlckxhenlMb2FkRXZlbnQsIFNjcm9sbGVyU2Nyb2xsRXZlbnQsIFNjcm9sbGVyU2Nyb2xsSW5kZXhDaGFuZ2VFdmVudCwgU2Nyb2xsZXJUb1R5cGUgfSBmcm9tICcuL3Njcm9sbGVyLmludGVyZmFjZSc7XG5cbi8qKlxuICogU2Nyb2xsZXIgaXMgYSBwZXJmb3JtYW5jZS1hcHByb2FjaCB0byBoYW5kbGUgaHVnZSBkYXRhIGVmZmljaWVudGx5LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNjcm9sbGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIV9kaXNhYmxlZDsgZWxzZSBkaXNhYmxlZENvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICNlbGVtZW50XG4gICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiX2lkXCJcbiAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiX3N0eWxlXCJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwiX3N0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3Atc2Nyb2xsZXInOiB0cnVlLCAncC1zY3JvbGxlci1pbmxpbmUnOiBpbmxpbmUsICdwLWJvdGgtc2Nyb2xsJzogYm90aCwgJ3AtaG9yaXpvbnRhbC1zY3JvbGwnOiBob3Jpem9udGFsIH1cIlxuICAgICAgICAgICAgICAgIChzY3JvbGwpPVwib25Db250YWluZXJTY3JvbGwoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidzY3JvbGxlcidcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncm9vdCdcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGU7IGVsc2UgYnVpbGRJbkNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGxvYWRlZEl0ZW1zLCBvcHRpb25zOiBnZXRDb250ZW50T3B0aW9ucygpIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWxkSW5Db250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwicC1zY3JvbGxlci1jb250ZW50XCIgW25nQ2xhc3NdPVwieyAncC1zY3JvbGxlci1sb2FkaW5nJzogZF9sb2FkaW5nIH1cIiBbbmdTdHlsZV09XCJjb250ZW50U3R5bGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NvbnRlbnQnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGxvYWRlZEl0ZW1zOyBsZXQgaW5kZXggPSBpbmRleDsgdHJhY2tCeTogX3RyYWNrQnkgfHwgaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSwgb3B0aW9uczogZ2V0T3B0aW9ucyhpbmRleCkgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIl9zaG93U3BhY2VyXCIgY2xhc3M9XCJwLXNjcm9sbGVyLXNwYWNlclwiIFtuZ1N0eWxlXT1cInNwYWNlclN0eWxlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzcGFjZXInXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIiFsb2FkZXJEaXNhYmxlZCAmJiBfc2hvd0xvYWRlciAmJiBkX2xvYWRpbmdcIiBjbGFzcz1cInAtc2Nyb2xsZXItbG9hZGVyXCIgW25nQ2xhc3NdPVwieyAncC1jb21wb25lbnQtb3ZlcmxheSc6ICFsb2FkZXJUZW1wbGF0ZSB9XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsb2FkZXInXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkZXJUZW1wbGF0ZTsgZWxzZSBidWlsZEluTG9hZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGxvYWRlckFycjsgbGV0IGluZGV4ID0gaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibG9hZGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgb3B0aW9uczogZ2V0TG9hZGVyT3B0aW9ucyhpbmRleCwgYm90aCAmJiB7IG51bUNvbHM6IF9udW1JdGVtc0luVmlld3BvcnQuY29scyB9KSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnVpbGRJbkxvYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkZXJJY29uVGVtcGxhdGU7IGVsc2UgYnVpbGRJbkxvYWRlckljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibG9hZGVySWNvblRlbXBsYXRlOyBjb250ZXh0OiB7IG9wdGlvbnM6IHsgc3R5bGVDbGFzczogJ3Atc2Nyb2xsZXItbG9hZGluZy1pY29uJyB9IH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNidWlsZEluTG9hZGVySWNvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3Bpbm5lckljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc2Nyb2xsZXItbG9hZGluZy1pY29uIHBpLXNwaW4nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsb2FkaW5nSWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNkaXNhYmxlZENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbXMsIG9wdGlvbnM6IHsgcm93czogX2l0ZW1zLCBjb2x1bW5zOiBsb2FkZWRDb2x1bW5zIH0gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9zY3JvbGxlci5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1zY3JvbGxlci12aWV3cG9ydCBwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxlciBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBVbmlxdWUgaWRlbnRpZmllciBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaWQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cbiAgICBzZXQgaWQodmFsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5faWQgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzdHlsZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU7XG4gICAgfVxuICAgIHNldCBzdHlsZSh2YWw6IGFueSkge1xuICAgICAgICB0aGlzLl9zdHlsZSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHN0eWxlQ2xhc3MoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlQ2xhc3M7XG4gICAgfVxuICAgIHNldCBzdHlsZUNsYXNzKHZhbDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3N0eWxlQ2xhc3MgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRhYmJpbmcgb3JkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHRhYmluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFiaW5kZXg7XG4gICAgfVxuICAgIHNldCB0YWJpbmRleCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90YWJpbmRleCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBkaXNwbGF5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBpdGVtcygpOiBhbnlbXSB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gICAgfVxuICAgIHNldCBpdGVtcyh2YWw6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9pdGVtcyA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGhlaWdodC93aWR0aCBvZiBpdGVtIGFjY29yZGluZyB0byBvcmllbnRhdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaXRlbVNpemUoKTogbnVtYmVyW10gfCBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbVNpemU7XG4gICAgfVxuICAgIHNldCBpdGVtU2l6ZSh2YWw6IG51bWJlcltdIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1TaXplID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIZWlnaHQgb2YgdGhlIHNjcm9sbCB2aWV3cG9ydC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2Nyb2xsSGVpZ2h0KCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxIZWlnaHQ7XG4gICAgfVxuICAgIHNldCBzY3JvbGxIZWlnaHQodmFsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsSGVpZ2h0ID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaWR0aCBvZiB0aGUgc2Nyb2xsIHZpZXdwb3J0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzY3JvbGxXaWR0aCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsV2lkdGg7XG4gICAgfVxuICAgIHNldCBzY3JvbGxXaWR0aCh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zY3JvbGxXaWR0aCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG9yaWVudGF0aW9uIG9mIHNjcm9sbGJhci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgb3JpZW50YXRpb24oKTogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyB8ICdib3RoJyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcbiAgICB9XG4gICAgc2V0IG9yaWVudGF0aW9uKHZhbDogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyB8ICdib3RoJykge1xuICAgICAgICB0aGlzLl9vcmllbnRhdGlvbiA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBzcGVjaWZ5IGhvdyBtYW55IGl0ZW1zIHRvIGxvYWQgaW4gZWFjaCBsb2FkIG1ldGhvZCBpbiBsYXp5IG1vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHN0ZXAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gICAgfVxuICAgIHNldCBzdGVwKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3N0ZXAgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGF5IGluIHNjcm9sbCBiZWZvcmUgbmV3IGRhdGEgaXMgbG9hZGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBkZWxheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlbGF5O1xuICAgIH1cbiAgICBzZXQgZGVsYXkodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZGVsYXkgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGF5IGFmdGVyIHdpbmRvdydzIHJlc2l6ZSBmaW5pc2hlcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgcmVzaXplRGVsYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNpemVEZWxheTtcbiAgICB9XG4gICAgc2V0IHJlc2l6ZURlbGF5KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZURlbGF5ID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGFwcGVuZCBlYWNoIGxvYWRlZCBpdGVtIHRvIHRvcCB3aXRob3V0IHJlbW92aW5nIGFueSBpdGVtcyBmcm9tIHRoZSBET00uIFVzaW5nIHZlcnkgbGFyZ2UgZGF0YSBtYXkgY2F1c2UgdGhlIGJyb3dzZXIgdG8gY3Jhc2guXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGFwcGVuZE9ubHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBlbmRPbmx5O1xuICAgIH1cbiAgICBzZXQgYXBwZW5kT25seSh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYXBwZW5kT25seSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHdoZXRoZXIgdGhlIHNjcm9sbGVyIHNob3VsZCBiZSBkaXNwbGF5ZWQgaW5saW5lIG9yIG5vdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaW5saW5lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5saW5lO1xuICAgIH1cbiAgICBzZXQgaW5saW5lKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9pbmxpbmUgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgZGF0YSBpcyBsb2FkZWQgYW5kIGludGVyYWN0ZWQgd2l0aCBpbiBsYXp5IG1hbm5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbGF6eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhenk7XG4gICAgfVxuICAgIHNldCBsYXp5KHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9sYXp5ID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiBkaXNhYmxlZCwgdGhlIHNjcm9sbGVyIGZlYXR1cmUgaXMgZWxpbWluYXRlZCBhbmQgdGhlIGNvbnRlbnQgaXMgZGlzcGxheWVkIGRpcmVjdGx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBkaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGltcGxlbWVudCBhIGN1c3RvbSBsb2FkZXIgaW5zdGVhZCBvZiB1c2luZyB0aGUgbG9hZGVyIGZlYXR1cmUgaW4gdGhlIHNjcm9sbGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBsb2FkZXJEaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlckRpc2FibGVkO1xuICAgIH1cbiAgICBzZXQgbG9hZGVyRGlzYWJsZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2xvYWRlckRpc2FibGVkID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb2x1bW5zIHRvIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGNvbHVtbnMoKTogYW55W10gfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XG4gICAgfVxuICAgIHNldCBjb2x1bW5zKHZhbDogYW55W10gfCB1bmRlZmluZWQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtbnMgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gaW1wbGVtZW50IGEgY3VzdG9tIHNwYWNlciBpbnN0ZWFkIG9mIHVzaW5nIHRoZSBzcGFjZXIgZmVhdHVyZSBpbiB0aGUgc2Nyb2xsZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHNob3dTcGFjZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93U3BhY2VyO1xuICAgIH1cbiAgICBzZXQgc2hvd1NwYWNlcih2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2hvd1NwYWNlciA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRvIHNob3cgbG9hZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzaG93TG9hZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0xvYWRlcjtcbiAgICB9XG4gICAgc2V0IHNob3dMb2FkZXIodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dMb2FkZXIgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaG93IG1hbnkgYWRkaXRpb25hbCBlbGVtZW50cyB0byBhZGQgdG8gdGhlIERPTSBvdXRzaWRlIG9mIHRoZSB2aWV3LiBBY2NvcmRpbmcgdG8gdGhlIHNjcm9sbHMgbWFkZSB1cCBhbmQgZG93biwgZXh0cmEgaXRlbXMgYXJlIGFkZGVkIGluIGEgY2VydGFpbiBhbGdvcml0aG0gaW4gdGhlIGZvcm0gb2YgbXVsdGlwbGVzIG9mIHRoaXMgbnVtYmVyLiBEZWZhdWx0IHZhbHVlIGlzIGhhbGYgdGhlIG51bWJlciBvZiBpdGVtcyBzaG93biBpbiB0aGUgdmlldy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbnVtVG9sZXJhdGVkSXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9udW1Ub2xlcmF0ZWRJdGVtcztcbiAgICB9XG4gICAgc2V0IG51bVRvbGVyYXRlZEl0ZW1zKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX251bVRvbGVyYXRlZEl0ZW1zID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdGhlIGRhdGEgaXMgbG9hZGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBsb2FkaW5nKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGluZztcbiAgICB9XG4gICAgc2V0IGxvYWRpbmcodmFsOiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2xvYWRpbmcgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciB0byBkeW5hbWljYWxseSBjaGFuZ2UgdGhlIGhlaWdodCBvciB3aWR0aCBvZiBzY3JvbGxhYmxlIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgYXV0b1NpemUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvU2l6ZTtcbiAgICB9XG4gICAgc2V0IGF1dG9TaXplKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hdXRvU2l6ZSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gb3B0aW1pemUgdGhlIGRvbSBvcGVyYXRpb25zIGJ5IGRlbGVnYXRpbmcgdG8gbmdGb3JUcmFja0J5LCBkZWZhdWx0IGFsZ29yaXRtIGNoZWNrcyBmb3Igb2JqZWN0IGlkZW50aXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCB0cmFja0J5KCk6IEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYWNrQnk7XG4gICAgfVxuICAgIHNldCB0cmFja0J5KHZhbDogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fdHJhY2tCeSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRvIHVzZSB0aGUgc2Nyb2xsZXIgZmVhdHVyZS4gVGhlIHByb3BlcnRpZXMgb2Ygc2Nyb2xsZXIgY29tcG9uZW50IGNhbiBiZSB1c2VkIGxpa2UgYW4gb2JqZWN0IGluIGl0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBvcHRpb25zKCk6IFNjcm9sbGVyT3B0aW9ucyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cbiAgICBzZXQgb3B0aW9ucyh2YWw6IFNjcm9sbGVyT3B0aW9ucyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gdmFsO1xuXG4gICAgICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXModmFsKS5mb3JFYWNoKChbaywgdl0pID0+IHRoaXNbYF8ke2t9YF0gIT09IHYgJiYgKHRoaXNbYF8ke2t9YF0gPSB2KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGluIGxhenkgbW9kZSB0byBsb2FkIG5ldyBkYXRhLlxuICAgICAqIEBwYXJhbSB7U2Nyb2xsZXJMYXp5TG9hZEV2ZW50fSBldmVudCAtIEN1c3RvbSBsYXp5IGxvYWQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTGF6eUxvYWQ6IEV2ZW50RW1pdHRlcjxTY3JvbGxlckxhenlMb2FkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTY3JvbGxlckxhenlMb2FkRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gc2Nyb2xsIHBvc2l0aW9uIGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtTY3JvbGxlclNjcm9sbEV2ZW50fSBldmVudCAtIEN1c3RvbSBzY3JvbGwgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2Nyb2xsOiBFdmVudEVtaXR0ZXI8U2Nyb2xsZXJTY3JvbGxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNjcm9sbGVyU2Nyb2xsRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gc2Nyb2xsIHBvc2l0aW9uIGFuZCBpdGVtJ3MgcmFuZ2UgaW4gdmlldyBjaGFuZ2VzLlxuICAgICAqIEBwYXJhbSB7U2Nyb2xsZXJTY3JvbGxFdmVudH0gZXZlbnQgLSBDdXN0b20gc2Nyb2xsIGluZGV4IGNoYW5nZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25TY3JvbGxJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPFNjcm9sbGVyU2Nyb2xsSW5kZXhDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNjcm9sbGVyU2Nyb2xsSW5kZXhDaGFuZ2VFdmVudD4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2VsZW1lbnQnKSBlbGVtZW50Vmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50Vmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBOdWxsYWJsZTxRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4+O1xuXG4gICAgX2lkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBfc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgICBfc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgX3RhYmluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgX2l0ZW1zOiBhbnlbXSB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBfaXRlbVNpemU6IG51bWJlciB8IG51bWJlcltdID0gMDtcblxuICAgIF9zY3JvbGxIZWlnaHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIF9zY3JvbGxXaWR0aDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgX29yaWVudGF0aW9uOiAndmVydGljYWwnIHwgJ2hvcml6b250YWwnIHwgJ2JvdGgnID0gJ3ZlcnRpY2FsJztcblxuICAgIF9zdGVwOiBudW1iZXIgPSAwO1xuXG4gICAgX2RlbGF5OiBudW1iZXIgPSAwO1xuXG4gICAgX3Jlc2l6ZURlbGF5OiBudW1iZXIgPSAxMDtcblxuICAgIF9hcHBlbmRPbmx5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfaW5saW5lOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfbGF6eTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfbG9hZGVyRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIF9jb2x1bW5zOiBhbnlbXSB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBfc2hvd1NwYWNlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBfc2hvd0xvYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX251bVRvbGVyYXRlZEl0ZW1zOiBhbnk7XG5cbiAgICBfbG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIF9hdXRvU2l6ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX3RyYWNrQnk6IGFueTtcblxuICAgIF9vcHRpb25zOiBTY3JvbGxlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgICBkX2xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGRfbnVtVG9sZXJhdGVkSXRlbXM6IGFueTtcblxuICAgIGNvbnRlbnRFbDogSFRNTEVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGl0ZW1UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBsb2FkZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBsb2FkZXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZmlyc3Q6IGFueSA9IDA7XG5cbiAgICBsYXN0OiBhbnkgPSAwO1xuXG4gICAgcGFnZTogbnVtYmVyID0gMDtcblxuICAgIGlzUmFuZ2VDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBudW1JdGVtc0luVmlld3BvcnQ6IGFueSA9IDA7XG5cbiAgICBsYXN0U2Nyb2xsUG9zOiBhbnkgPSAwO1xuXG4gICAgbGF6eUxvYWRTdGF0ZTogYW55ID0ge307XG5cbiAgICBsb2FkZXJBcnI6IGFueVtdID0gW107XG5cbiAgICBzcGFjZXJTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZCA9IHt9O1xuXG4gICAgY29udGVudFN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkID0ge307XG5cbiAgICBzY3JvbGxUaW1lb3V0OiBhbnk7XG5cbiAgICByZXNpemVUaW1lb3V0OiBhbnk7XG5cbiAgICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIGRlZmF1bHRXaWR0aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgZGVmYXVsdEhlaWdodDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgZGVmYXVsdENvbnRlbnRXaWR0aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgZGVmYXVsdENvbnRlbnRIZWlnaHQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGdldCB2ZXJ0aWNhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnO1xuICAgIH1cblxuICAgIGdldCBob3Jpem9udGFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJztcbiAgICB9XG5cbiAgICBnZXQgYm90aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uID09PSAnYm90aCc7XG4gICAgfVxuXG4gICAgZ2V0IGxvYWRlZEl0ZW1zKCkge1xuICAgICAgICBpZiAodGhpcy5faXRlbXMgJiYgIXRoaXMuZF9sb2FkaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ib3RoKSByZXR1cm4gdGhpcy5faXRlbXMuc2xpY2UodGhpcy5fYXBwZW5kT25seSA/IDAgOiB0aGlzLmZpcnN0LnJvd3MsIHRoaXMubGFzdC5yb3dzKS5tYXAoKGl0ZW0pID0+ICh0aGlzLl9jb2x1bW5zID8gaXRlbSA6IGl0ZW0uc2xpY2UodGhpcy5fYXBwZW5kT25seSA/IDAgOiB0aGlzLmZpcnN0LmNvbHMsIHRoaXMubGFzdC5jb2xzKSkpO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ob3Jpem9udGFsICYmIHRoaXMuX2NvbHVtbnMpIHJldHVybiB0aGlzLl9pdGVtcztcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuX2l0ZW1zLnNsaWNlKHRoaXMuX2FwcGVuZE9ubHkgPyAwIDogdGhpcy5maXJzdCwgdGhpcy5sYXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBnZXQgbG9hZGVkUm93cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZF9sb2FkaW5nID8gKHRoaXMuX2xvYWRlckRpc2FibGVkID8gdGhpcy5sb2FkZXJBcnIgOiBbXSkgOiB0aGlzLmxvYWRlZEl0ZW1zO1xuICAgIH1cblxuICAgIGdldCBsb2FkZWRDb2x1bW5zKCkge1xuICAgICAgICBpZiAodGhpcy5fY29sdW1ucyAmJiAodGhpcy5ib3RoIHx8IHRoaXMuaG9yaXpvbnRhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRfbG9hZGluZyAmJiB0aGlzLl9sb2FkZXJEaXNhYmxlZCA/ICh0aGlzLmJvdGggPyB0aGlzLmxvYWRlckFyclswXSA6IHRoaXMubG9hZGVyQXJyKSA6IHRoaXMuX2NvbHVtbnMuc2xpY2UodGhpcy5ib3RoID8gdGhpcy5maXJzdC5jb2xzIDogdGhpcy5maXJzdCwgdGhpcy5ib3RoID8gdGhpcy5sYXN0LmNvbHMgOiB0aGlzLmxhc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSxcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGxldCBpc0xvYWRpbmdDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZXMubG9hZGluZykge1xuICAgICAgICAgICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUgfSA9IHNpbXBsZUNoYW5nZXMubG9hZGluZztcblxuICAgICAgICAgICAgaWYgKHRoaXMubGF6eSAmJiBwcmV2aW91c1ZhbHVlICE9PSBjdXJyZW50VmFsdWUgJiYgY3VycmVudFZhbHVlICE9PSB0aGlzLmRfbG9hZGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZF9sb2FkaW5nID0gY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgIGlzTG9hZGluZ0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZXMub3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFNjcm9sbFBvcyA9IHRoaXMuYm90aCA/IHsgdG9wOiAwLCBsZWZ0OiAwIH0gOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZXMubnVtVG9sZXJhdGVkSXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlIH0gPSBzaW1wbGVDaGFuZ2VzLm51bVRvbGVyYXRlZEl0ZW1zO1xuXG4gICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSAhPT0gY3VycmVudFZhbHVlICYmIGN1cnJlbnRWYWx1ZSAhPT0gdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zID0gY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZXMub3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUgfSA9IHNpbXBsZUNoYW5nZXMub3B0aW9ucztcblxuICAgICAgICAgICAgaWYgKHRoaXMubGF6eSAmJiBwcmV2aW91c1ZhbHVlPy5sb2FkaW5nICE9PSBjdXJyZW50VmFsdWU/LmxvYWRpbmcgJiYgY3VycmVudFZhbHVlPy5sb2FkaW5nICE9PSB0aGlzLmRfbG9hZGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZF9sb2FkaW5nID0gY3VycmVudFZhbHVlLmxvYWRpbmc7XG4gICAgICAgICAgICAgICAgaXNMb2FkaW5nQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlPy5udW1Ub2xlcmF0ZWRJdGVtcyAhPT0gY3VycmVudFZhbHVlPy5udW1Ub2xlcmF0ZWRJdGVtcyAmJiBjdXJyZW50VmFsdWU/Lm51bVRvbGVyYXRlZEl0ZW1zICE9PSB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMgPSBjdXJyZW50VmFsdWUubnVtVG9sZXJhdGVkSXRlbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gIWlzTG9hZGluZ0NoYW5nZWQgJiYgKHNpbXBsZUNoYW5nZXMuaXRlbXM/LnByZXZpb3VzVmFsdWU/Lmxlbmd0aCAhPT0gc2ltcGxlQ2hhbmdlcy5pdGVtcz8uY3VycmVudFZhbHVlPy5sZW5ndGggfHwgc2ltcGxlQ2hhbmdlcy5pdGVtU2l6ZSB8fCBzaW1wbGVDaGFuZ2VzLnNjcm9sbEhlaWdodCB8fCBzaW1wbGVDaGFuZ2VzLnNjcm9sbFdpZHRoKTtcblxuICAgICAgICAgICAgaWYgKGlzQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQXV0b1NpemUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgKHRoaXMudGVtcGxhdGVzIGFzIFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsb2FkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsb2FkZXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdJbml0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdJbml0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuXG4gICAgICAgIHRoaXMuY29udGVudEVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZpZXdJbml0KCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSAmJiAhdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaXNWaXNpYmxlKHRoaXMuZWxlbWVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudEVsKHRoaXMuY29udGVudEVsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUF1dG9TaXplKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRXaWR0aCA9IERvbUhhbmRsZXIuZ2V0V2lkdGgodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRIZWlnaHQgPSBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRlbnRXaWR0aCA9IERvbUhhbmRsZXIuZ2V0V2lkdGgodGhpcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRlbnRIZWlnaHQgPSBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmNvbnRlbnRFbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLm9uUmVzaXplKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTaXplKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU9wdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3BhY2VyU2l6ZSgpO1xuXG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENvbnRlbnRFbChlbD86IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuY29udGVudEVsID0gZWwgfHwgdGhpcy5jb250ZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50IHx8IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQsICcucC1zY3JvbGxlci1jb250ZW50Jyk7XG4gICAgfVxuXG4gICAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiAwIH0gOiAwO1xuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLmJvdGggPyB7IHJvd3M6IDAsIGNvbHM6IDAgfSA6IDA7XG4gICAgICAgIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0ID0gdGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiAwIH0gOiAwO1xuICAgICAgICB0aGlzLmxhc3RTY3JvbGxQb3MgPSB0aGlzLmJvdGggPyB7IHRvcDogMCwgbGVmdDogMCB9IDogMDtcbiAgICAgICAgdGhpcy5kX2xvYWRpbmcgPSB0aGlzLl9sb2FkaW5nIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMgPSB0aGlzLl9udW1Ub2xlcmF0ZWRJdGVtcztcbiAgICAgICAgdGhpcy5sb2FkZXJBcnIgPSBbXTtcbiAgICAgICAgdGhpcy5zcGFjZXJTdHlsZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRlbnRTdHlsZSA9IHt9O1xuICAgIH1cblxuICAgIGdldEVsZW1lbnRSZWYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUJ5Rmlyc3QoZmlyc3Q/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKChmaXJzdCA/PyB0aGlzLmZpcnN0KSArIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcyAqIDQpIC8gKHRoaXMuX3N0ZXAgfHwgMSkpO1xuICAgIH1cblxuICAgIGlzUGFnZUNoYW5nZWQoZmlyc3Q/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXAgPyB0aGlzLnBhZ2UgIT09IHRoaXMuZ2V0UGFnZUJ5Rmlyc3QoZmlyc3QgPz8gdGhpcy5maXJzdCkgOiB0cnVlO1xuICAgIH1cblxuICAgIHNjcm9sbFRvKG9wdGlvbnM6IFNjcm9sbFRvT3B0aW9ucykge1xuICAgICAgICAvLyB0aGlzLmxhc3RTY3JvbGxQb3MgPSB0aGlzLmJvdGggPyB7IHRvcDogMCwgbGVmdDogMCB9IDogMDtcbiAgICAgICAgdGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50Py5zY3JvbGxUbyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzY3JvbGxUb0luZGV4KGluZGV4OiBudW1iZXIgfCBudW1iZXJbXSwgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yID0gJ2F1dG8nKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy5ib3RoID8gKGluZGV4IGFzIG51bWJlcltdKS5ldmVyeSgoaSkgPT4gaSA+IC0xKSA6IChpbmRleCBhcyBudW1iZXIpID4gLTE7XG5cbiAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdCA9IHRoaXMuZmlyc3Q7XG4gICAgICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCA9IDAsIHNjcm9sbExlZnQgPSAwIH0gPSB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCB7IG51bVRvbGVyYXRlZEl0ZW1zIH0gPSB0aGlzLmNhbGN1bGF0ZU51bUl0ZW1zKCk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50UG9zID0gdGhpcy5nZXRDb250ZW50UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1TaXplID0gdGhpcy5pdGVtU2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IGNhbGN1bGF0ZUZpcnN0ID0gKF9pbmRleCA9IDAsIF9udW1UKSA9PiAoX2luZGV4IDw9IF9udW1UID8gMCA6IF9pbmRleCk7XG4gICAgICAgICAgICBjb25zdCBjYWxjdWxhdGVDb29yZCA9IChfZmlyc3QsIF9zaXplLCBfY3BvcykgPT4gX2ZpcnN0ICogX3NpemUgKyBfY3BvcztcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbFRvID0gKGxlZnQgPSAwLCB0b3AgPSAwKSA9PiB0aGlzLnNjcm9sbFRvKHsgbGVmdCwgdG9wLCBiZWhhdmlvciB9KTtcbiAgICAgICAgICAgIGxldCBuZXdGaXJzdCA9IHRoaXMuYm90aCA/IHsgcm93czogMCwgY29sczogMCB9IDogMDtcbiAgICAgICAgICAgIGxldCBpc1JhbmdlQ2hhbmdlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGlzU2Nyb2xsQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5ib3RoKSB7XG4gICAgICAgICAgICAgICAgbmV3Rmlyc3QgPSB7IHJvd3M6IGNhbGN1bGF0ZUZpcnN0KGluZGV4WzBdLCBudW1Ub2xlcmF0ZWRJdGVtc1swXSksIGNvbHM6IGNhbGN1bGF0ZUZpcnN0KGluZGV4WzFdLCBudW1Ub2xlcmF0ZWRJdGVtc1sxXSkgfTtcbiAgICAgICAgICAgICAgICBzY3JvbGxUbyhjYWxjdWxhdGVDb29yZChuZXdGaXJzdC5jb2xzLCBpdGVtU2l6ZVsxXSwgY29udGVudFBvcy5sZWZ0KSwgY2FsY3VsYXRlQ29vcmQobmV3Rmlyc3Qucm93cywgaXRlbVNpemVbMF0sIGNvbnRlbnRQb3MudG9wKSk7XG4gICAgICAgICAgICAgICAgaXNTY3JvbGxDaGFuZ2VkID0gdGhpcy5sYXN0U2Nyb2xsUG9zLnRvcCAhPT0gc2Nyb2xsVG9wIHx8IHRoaXMubGFzdFNjcm9sbFBvcy5sZWZ0ICE9PSBzY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgIGlzUmFuZ2VDaGFuZ2VkID0gbmV3Rmlyc3Qucm93cyAhPT0gZmlyc3Qucm93cyB8fCBuZXdGaXJzdC5jb2xzICE9PSBmaXJzdC5jb2xzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdGaXJzdCA9IGNhbGN1bGF0ZUZpcnN0KGluZGV4IGFzIG51bWJlciwgbnVtVG9sZXJhdGVkSXRlbXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbCA/IHNjcm9sbFRvKGNhbGN1bGF0ZUNvb3JkKG5ld0ZpcnN0LCBpdGVtU2l6ZSwgY29udGVudFBvcy5sZWZ0KSwgc2Nyb2xsVG9wKSA6IHNjcm9sbFRvKHNjcm9sbExlZnQsIGNhbGN1bGF0ZUNvb3JkKG5ld0ZpcnN0LCBpdGVtU2l6ZSwgY29udGVudFBvcy50b3ApKTtcbiAgICAgICAgICAgICAgICBpc1Njcm9sbENoYW5nZWQgPSB0aGlzLmxhc3RTY3JvbGxQb3MgIT09ICh0aGlzLmhvcml6b250YWwgPyBzY3JvbGxMZWZ0IDogc2Nyb2xsVG9wKTtcbiAgICAgICAgICAgICAgICBpc1JhbmdlQ2hhbmdlZCA9IG5ld0ZpcnN0ICE9PSBmaXJzdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pc1JhbmdlQ2hhbmdlZCA9IGlzUmFuZ2VDaGFuZ2VkO1xuICAgICAgICAgICAgaXNTY3JvbGxDaGFuZ2VkICYmICh0aGlzLmZpcnN0ID0gbmV3Rmlyc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsSW5WaWV3KGluZGV4OiBudW1iZXIsIHRvOiBTY3JvbGxlclRvVHlwZSwgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yID0gJ2F1dG8nKSB7XG4gICAgICAgIGlmICh0bykge1xuICAgICAgICAgICAgY29uc3QgeyBmaXJzdCwgdmlld3BvcnQgfSA9IHRoaXMuZ2V0UmVuZGVyZWRSYW5nZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsVG8gPSAobGVmdCA9IDAsIHRvcCA9IDApID0+IHRoaXMuc2Nyb2xsVG8oeyBsZWZ0LCB0b3AsIGJlaGF2aW9yIH0pO1xuICAgICAgICAgICAgY29uc3QgaXNUb1N0YXJ0ID0gdG8gPT09ICd0by1zdGFydCc7XG4gICAgICAgICAgICBjb25zdCBpc1RvRW5kID0gdG8gPT09ICd0by1lbmQnO1xuXG4gICAgICAgICAgICBpZiAoaXNUb1N0YXJ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYm90aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlld3BvcnQuZmlyc3Qucm93cyAtIGZpcnN0LnJvd3MgPiAoPGFueT5pbmRleClbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvKHZpZXdwb3J0LmZpcnN0LmNvbHMgKiAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSwgKHZpZXdwb3J0LmZpcnN0LnJvd3MgLSAxKSAqICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2aWV3cG9ydC5maXJzdC5jb2xzIC0gZmlyc3QuY29scyA+ICg8YW55PmluZGV4KVsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG8oKHZpZXdwb3J0LmZpcnN0LmNvbHMgLSAxKSAqICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzFdLCB2aWV3cG9ydC5maXJzdC5yb3dzICogKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXdwb3J0LmZpcnN0IC0gZmlyc3QgPiBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zID0gKHZpZXdwb3J0LmZpcnN0IC0gMSkgKiA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsID8gc2Nyb2xsVG8ocG9zLCAwKSA6IHNjcm9sbFRvKDAsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzVG9FbmQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ib3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydC5sYXN0LnJvd3MgLSBmaXJzdC5yb3dzIDw9ICg8YW55PmluZGV4KVswXSArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvKHZpZXdwb3J0LmZpcnN0LmNvbHMgKiAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSwgKHZpZXdwb3J0LmZpcnN0LnJvd3MgKyAxKSAqICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2aWV3cG9ydC5sYXN0LmNvbHMgLSBmaXJzdC5jb2xzIDw9ICg8YW55PmluZGV4KVsxXSArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvKCh2aWV3cG9ydC5maXJzdC5jb2xzICsgMSkgKiAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSwgdmlld3BvcnQuZmlyc3Qucm93cyAqICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydC5sYXN0IC0gZmlyc3QgPD0gaW5kZXggKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSAodmlld3BvcnQuZmlyc3QgKyAxKSAqIDxudW1iZXI+dGhpcy5faXRlbVNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWwgPyBzY3JvbGxUbyhwb3MsIDApIDogc2Nyb2xsVG8oMCwgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9JbmRleChpbmRleCwgYmVoYXZpb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UmVuZGVyZWRSYW5nZSgpIHtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlRmlyc3RJblZpZXdwb3J0ID0gKF9wb3M6IG51bWJlciwgX3NpemU6IG51bWJlcikgPT4gKF9zaXplIHx8IF9wb3MgPyBNYXRoLmZsb29yKF9wb3MgLyAoX3NpemUgfHwgX3BvcykpIDogMCk7XG5cbiAgICAgICAgbGV0IGZpcnN0SW5WaWV3cG9ydCA9IHRoaXMuZmlyc3Q7XG4gICAgICAgIGxldCBsYXN0SW5WaWV3cG9ydDogYW55ID0gMDtcblxuICAgICAgICBpZiAodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCB9ID0gdGhpcy5lbGVtZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmJvdGgpIHtcbiAgICAgICAgICAgICAgICBmaXJzdEluVmlld3BvcnQgPSB7IHJvd3M6IGNhbGN1bGF0ZUZpcnN0SW5WaWV3cG9ydChzY3JvbGxUb3AsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKSwgY29sczogY2FsY3VsYXRlRmlyc3RJblZpZXdwb3J0KHNjcm9sbExlZnQsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzFdKSB9O1xuICAgICAgICAgICAgICAgIGxhc3RJblZpZXdwb3J0ID0geyByb3dzOiBmaXJzdEluVmlld3BvcnQucm93cyArIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LnJvd3MsIGNvbHM6IGZpcnN0SW5WaWV3cG9ydC5jb2xzICsgdGhpcy5udW1JdGVtc0luVmlld3BvcnQuY29scyB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxQb3MgPSB0aGlzLmhvcml6b250YWwgPyBzY3JvbGxMZWZ0IDogc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICAgIGZpcnN0SW5WaWV3cG9ydCA9IGNhbGN1bGF0ZUZpcnN0SW5WaWV3cG9ydChzY3JvbGxQb3MsIDxudW1iZXI+dGhpcy5faXRlbVNpemUpO1xuICAgICAgICAgICAgICAgIGxhc3RJblZpZXdwb3J0ID0gZmlyc3RJblZpZXdwb3J0ICsgdGhpcy5udW1JdGVtc0luVmlld3BvcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICBsYXN0OiB0aGlzLmxhc3QsXG4gICAgICAgICAgICB2aWV3cG9ydDoge1xuICAgICAgICAgICAgICAgIGZpcnN0OiBmaXJzdEluVmlld3BvcnQsXG4gICAgICAgICAgICAgICAgbGFzdDogbGFzdEluVmlld3BvcnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVOdW1JdGVtcygpIHtcbiAgICAgICAgY29uc3QgY29udGVudFBvcyA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRXaWR0aCA9ICh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQgPyB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAtIGNvbnRlbnRQb3MubGVmdCA6IDApIHx8IDA7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSAodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50ID8gdGhpcy5lbGVtZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gY29udGVudFBvcy50b3AgOiAwKSB8fCAwO1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVOdW1JdGVtc0luVmlld3BvcnQgPSAoX2NvbnRlbnRTaXplOiBudW1iZXIsIF9pdGVtU2l6ZTogbnVtYmVyKSA9PiAoX2l0ZW1TaXplIHx8IF9jb250ZW50U2l6ZSA/IE1hdGguY2VpbChfY29udGVudFNpemUgLyAoX2l0ZW1TaXplIHx8IF9jb250ZW50U2l6ZSkpIDogMCk7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZU51bVRvbGVyYXRlZEl0ZW1zID0gKF9udW1JdGVtczogbnVtYmVyKSA9PiBNYXRoLmNlaWwoX251bUl0ZW1zIC8gMik7XG4gICAgICAgIGNvbnN0IG51bUl0ZW1zSW5WaWV3cG9ydDogYW55ID0gdGhpcy5ib3RoXG4gICAgICAgICAgICA/IHsgcm93czogY2FsY3VsYXRlTnVtSXRlbXNJblZpZXdwb3J0KGNvbnRlbnRIZWlnaHQsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKSwgY29sczogY2FsY3VsYXRlTnVtSXRlbXNJblZpZXdwb3J0KGNvbnRlbnRXaWR0aCwgKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMV0pIH1cbiAgICAgICAgICAgIDogY2FsY3VsYXRlTnVtSXRlbXNJblZpZXdwb3J0KHRoaXMuaG9yaXpvbnRhbCA/IGNvbnRlbnRXaWR0aCA6IGNvbnRlbnRIZWlnaHQsIDxudW1iZXI+dGhpcy5faXRlbVNpemUpO1xuXG4gICAgICAgIGNvbnN0IG51bVRvbGVyYXRlZEl0ZW1zID0gdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zIHx8ICh0aGlzLmJvdGggPyBbY2FsY3VsYXRlTnVtVG9sZXJhdGVkSXRlbXMobnVtSXRlbXNJblZpZXdwb3J0LnJvd3MpLCBjYWxjdWxhdGVOdW1Ub2xlcmF0ZWRJdGVtcyhudW1JdGVtc0luVmlld3BvcnQuY29scyldIDogY2FsY3VsYXRlTnVtVG9sZXJhdGVkSXRlbXMobnVtSXRlbXNJblZpZXdwb3J0KSk7XG5cbiAgICAgICAgcmV0dXJuIHsgbnVtSXRlbXNJblZpZXdwb3J0LCBudW1Ub2xlcmF0ZWRJdGVtcyB9O1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZU9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IHsgbnVtSXRlbXNJblZpZXdwb3J0LCBudW1Ub2xlcmF0ZWRJdGVtcyB9ID0gdGhpcy5jYWxjdWxhdGVOdW1JdGVtcygpO1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVMYXN0ID0gKF9maXJzdDogbnVtYmVyLCBfbnVtOiBudW1iZXIsIF9udW1UOiBudW1iZXIsIF9pc0NvbHM6IGJvb2xlYW4gPSBmYWxzZSkgPT4gdGhpcy5nZXRMYXN0KF9maXJzdCArIF9udW0gKyAoX2ZpcnN0IDwgX251bVQgPyAyIDogMykgKiBfbnVtVCwgX2lzQ29scyk7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5maXJzdDtcbiAgICAgICAgY29uc3QgbGFzdCA9IHRoaXMuYm90aFxuICAgICAgICAgICAgPyB7IHJvd3M6IGNhbGN1bGF0ZUxhc3QodGhpcy5maXJzdC5yb3dzLCBudW1JdGVtc0luVmlld3BvcnQucm93cywgbnVtVG9sZXJhdGVkSXRlbXNbMF0pLCBjb2xzOiBjYWxjdWxhdGVMYXN0KHRoaXMuZmlyc3QuY29scywgbnVtSXRlbXNJblZpZXdwb3J0LmNvbHMsIG51bVRvbGVyYXRlZEl0ZW1zWzFdLCB0cnVlKSB9XG4gICAgICAgICAgICA6IGNhbGN1bGF0ZUxhc3QodGhpcy5maXJzdCwgbnVtSXRlbXNJblZpZXdwb3J0LCBudW1Ub2xlcmF0ZWRJdGVtcyk7XG5cbiAgICAgICAgdGhpcy5sYXN0ID0gbGFzdDtcbiAgICAgICAgdGhpcy5udW1JdGVtc0luVmlld3BvcnQgPSBudW1JdGVtc0luVmlld3BvcnQ7XG4gICAgICAgIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcyA9IG51bVRvbGVyYXRlZEl0ZW1zO1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dMb2FkZXIpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVyQXJyID0gdGhpcy5ib3RoID8gQXJyYXkuZnJvbSh7IGxlbmd0aDogbnVtSXRlbXNJblZpZXdwb3J0LnJvd3MgfSkubWFwKCgpID0+IEFycmF5LmZyb20oeyBsZW5ndGg6IG51bUl0ZW1zSW5WaWV3cG9ydC5jb2xzIH0pKSA6IEFycmF5LmZyb20oeyBsZW5ndGg6IG51bUl0ZW1zSW5WaWV3cG9ydCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9sYXp5KSB7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhenlMb2FkU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLl9zdGVwID8gKHRoaXMuYm90aCA/IHsgcm93czogMCwgY29sczogZmlyc3QuY29scyB9IDogMCkgOiBmaXJzdCxcbiAgICAgICAgICAgICAgICAgICAgbGFzdDogTWF0aC5taW4odGhpcy5fc3RlcCA/IHRoaXMuX3N0ZXAgOiB0aGlzLmxhc3QsICg8YW55W10+dGhpcy5pdGVtcykubGVuZ3RoKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25MYXp5TG9hZCcsIHRoaXMubGF6eUxvYWRTdGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZUF1dG9TaXplKCkge1xuICAgICAgICBpZiAodGhpcy5fYXV0b1NpemUgJiYgIXRoaXMuZF9sb2FkaW5nKSB7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50RWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50RWwuc3R5bGUubWluSGVpZ2h0ID0gdGhpcy5jb250ZW50RWwuc3R5bGUubWluV2lkdGggPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgICAgICAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMuZWxlbWVudFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5jb250YWluID0gJ25vbmUnO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtjb250ZW50V2lkdGgsIGNvbnRlbnRIZWlnaHRdID0gW0RvbUhhbmRsZXIuZ2V0V2lkdGgodGhpcy5jb250ZW50RWwpLCBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmNvbnRlbnRFbCldO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50V2lkdGggIT09IHRoaXMuZGVmYXVsdENvbnRlbnRXaWR0aCAmJiAoKDxFbGVtZW50UmVmPnRoaXMuZWxlbWVudFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9ICcnKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEhlaWdodCAhPT0gdGhpcy5kZWZhdWx0Q29udGVudEhlaWdodCAmJiAoKDxFbGVtZW50UmVmPnRoaXMuZWxlbWVudFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gW0RvbUhhbmRsZXIuZ2V0V2lkdGgoKDxFbGVtZW50UmVmPnRoaXMuZWxlbWVudFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudCksIERvbUhhbmRsZXIuZ2V0SGVpZ2h0KCg8RWxlbWVudFJlZj50aGlzLmVsZW1lbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQpXTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS5taW5IZWlnaHQgPSB0aGlzLmNvbnRlbnRFbC5zdHlsZS5taW5XaWR0aCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS5wb3NpdGlvbiA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5lbGVtZW50Vmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmNvbnRhaW4gPSAnJztcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRlbnRXaWR0aCA9IGNvbnRlbnRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q29udGVudEhlaWdodCA9IGNvbnRlbnRIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuYm90aCB8fCB0aGlzLmhvcml6b250YWwpICYmICgoPEVsZW1lbnRSZWY+dGhpcy5lbGVtZW50Vmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggPCA8bnVtYmVyPnRoaXMuZGVmYXVsdFdpZHRoID8gd2lkdGggKyAncHgnIDogdGhpcy5fc2Nyb2xsV2lkdGggfHwgdGhpcy5kZWZhdWx0V2lkdGggKyAncHgnKTtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuYm90aCB8fCB0aGlzLnZlcnRpY2FsKSAmJiAoKDxFbGVtZW50UmVmPnRoaXMuZWxlbWVudFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgPCA8bnVtYmVyPnRoaXMuZGVmYXVsdEhlaWdodCA/IGhlaWdodCArICdweCcgOiB0aGlzLl9zY3JvbGxIZWlnaHQgfHwgdGhpcy5kZWZhdWx0SGVpZ2h0ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMYXN0KGxhc3QgPSAwLCBpc0NvbHMgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMgPyBNYXRoLm1pbihpc0NvbHMgPyAodGhpcy5fY29sdW1ucyB8fCB0aGlzLl9pdGVtc1swXSkubGVuZ3RoIDogdGhpcy5faXRlbXMubGVuZ3RoLCBsYXN0KSA6IDA7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudFBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZW50RWwpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNvbnRlbnRFbCk7XG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nTGVmdCkgKyBNYXRoLm1heChwYXJzZUZsb2F0KHN0eWxlLmxlZnQpIHx8IDAsIDApO1xuICAgICAgICAgICAgY29uc3QgcmlnaHQgPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdSaWdodCkgKyBNYXRoLm1heChwYXJzZUZsb2F0KHN0eWxlLnJpZ2h0KSB8fCAwLCAwKTtcbiAgICAgICAgICAgIGNvbnN0IHRvcCA9IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1RvcCkgKyBNYXRoLm1heChwYXJzZUZsb2F0KHN0eWxlLnRvcCkgfHwgMCwgMCk7XG4gICAgICAgICAgICBjb25zdCBib3R0b20gPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdCb3R0b20pICsgTWF0aC5tYXgocGFyc2VGbG9hdChzdHlsZS5ib3R0b20pIHx8IDAsIDApO1xuXG4gICAgICAgICAgICByZXR1cm4geyBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIHg6IGxlZnQgKyByaWdodCwgeTogdG9wICsgYm90dG9tIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBsZWZ0OiAwLCByaWdodDogMCwgdG9wOiAwLCBib3R0b206IDAsIHg6IDAsIHk6IDAgfTtcbiAgICB9XG5cbiAgICBzZXRTaXplKCkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpcy5lbGVtZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLl9zY3JvbGxXaWR0aCB8fCBgJHt0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCB8fCBwYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRofXB4YDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuX3Njcm9sbEhlaWdodCB8fCBgJHt0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgcGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHR9cHhgO1xuICAgICAgICAgICAgY29uc3Qgc2V0UHJvcCA9IChfbmFtZTogc3RyaW5nLCBfdmFsdWU6IGFueSkgPT4gKCg8RWxlbWVudFJlZj50aGlzLmVsZW1lbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGVbX25hbWVdID0gX3ZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYm90aCB8fCB0aGlzLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICBzZXRQcm9wKCdoZWlnaHQnLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIHNldFByb3AoJ3dpZHRoJywgd2lkdGgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRQcm9wKCdoZWlnaHQnLCBoZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0U3BhY2VyU2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCBzZXRQcm9wID0gKF9uYW1lLCBfY291bnQsIF9zaXplKSA9PiAodGhpcy5zcGFjZXJTdHlsZSA9IHsgLi4udGhpcy5zcGFjZXJTdHlsZSwgLi4ueyBbYCR7X25hbWV9YF06IF9jb3VudCAqIF9zaXplICsgJ3B4JyB9IH0pO1xuXG4gICAgICAgICAgICBjb25zdCBudW1JdGVtcyA9IHRoaXMuX2l0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGlmICh0aGlzLmJvdGgpIHtcbiAgICAgICAgICAgICAgICBzZXRQcm9wKCdoZWlnaHQnLCBudW1JdGVtcywgdGhpcy5faXRlbVNpemVbMF0pO1xuICAgICAgICAgICAgICAgIHNldFByb3AoJ3dpZHRoJywgdGhpcy5fY29sdW1ucz8ubGVuZ3RoIHx8IHRoaXMuX2l0ZW1zWzFdPy5sZW5ndGgsIHRoaXMuX2l0ZW1TaXplWzFdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsID8gc2V0UHJvcCgnd2lkdGgnLCB0aGlzLl9jb2x1bW5zPy5sZW5ndGggfHwgdGhpcy5faXRlbXMubGVuZ3RoLCB0aGlzLl9pdGVtU2l6ZSkgOiBzZXRQcm9wKCdoZWlnaHQnLCBudW1JdGVtcywgdGhpcy5faXRlbVNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q29udGVudFBvc2l0aW9uKHBvczogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRFbCAmJiAhdGhpcy5fYXBwZW5kT25seSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3QgPSBwb3MgPyBwb3MuZmlyc3QgOiB0aGlzLmZpcnN0O1xuICAgICAgICAgICAgY29uc3QgY2FsY3VsYXRlVHJhbnNsYXRlVmFsID0gKF9maXJzdDogbnVtYmVyLCBfc2l6ZTogbnVtYmVyKSA9PiBfZmlyc3QgKiBfc2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IHNldFRyYW5zZm9ybSA9IChfeCA9IDAsIF95ID0gMCkgPT4gKHRoaXMuY29udGVudFN0eWxlID0geyAuLi50aGlzLmNvbnRlbnRTdHlsZSwgLi4ueyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke194fXB4LCAke195fXB4LCAwKWAgfSB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYm90aCkge1xuICAgICAgICAgICAgICAgIHNldFRyYW5zZm9ybShjYWxjdWxhdGVUcmFuc2xhdGVWYWwoZmlyc3QuY29scywgKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMV0pLCBjYWxjdWxhdGVUcmFuc2xhdGVWYWwoZmlyc3Qucm93cywgKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMF0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlVmFsID0gY2FsY3VsYXRlVHJhbnNsYXRlVmFsKGZpcnN0LCA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWwgPyBzZXRUcmFuc2Zvcm0odHJhbnNsYXRlVmFsLCAwKSA6IHNldFRyYW5zZm9ybSgwLCB0cmFuc2xhdGVWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TY3JvbGxQb3NpdGlvbkNoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBjb250ZW50UG9zID0gdGhpcy5nZXRDb250ZW50UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlU2Nyb2xsUG9zID0gKF9wb3M6IG51bWJlciwgX2Nwb3M6IG51bWJlcikgPT4gKF9wb3MgPyAoX3BvcyA+IF9jcG9zID8gX3BvcyAtIF9jcG9zIDogX3BvcykgOiAwKTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlQ3VycmVudEluZGV4ID0gKF9wb3M6IG51bWJlciwgX3NpemU6IG51bWJlcikgPT4gKF9zaXplIHx8IF9wb3MgPyBNYXRoLmZsb29yKF9wb3MgLyAoX3NpemUgfHwgX3BvcykpIDogMCk7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZVRyaWdnZXJJbmRleCA9IChfY3VycmVudEluZGV4OiBudW1iZXIsIF9maXJzdDogbnVtYmVyLCBfbGFzdDogbnVtYmVyLCBfbnVtOiBudW1iZXIsIF9udW1UOiBudW1iZXIsIF9pc1Njcm9sbERvd25PclJpZ2h0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfY3VycmVudEluZGV4IDw9IF9udW1UID8gX251bVQgOiBfaXNTY3JvbGxEb3duT3JSaWdodCA/IF9sYXN0IC0gX251bSAtIF9udW1UIDogX2ZpcnN0ICsgX251bVQgLSAxO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVGaXJzdCA9IChfY3VycmVudEluZGV4OiBudW1iZXIsIF90cmlnZ2VySW5kZXg6IG51bWJlciwgX2ZpcnN0OiBudW1iZXIsIF9sYXN0OiBudW1iZXIsIF9udW06IG51bWJlciwgX251bVQ6IG51bWJlciwgX2lzU2Nyb2xsRG93bk9yUmlnaHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKF9jdXJyZW50SW5kZXggPD0gX251bVQpIHJldHVybiAwO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gTWF0aC5tYXgoMCwgX2lzU2Nyb2xsRG93bk9yUmlnaHQgPyAoX2N1cnJlbnRJbmRleCA8IF90cmlnZ2VySW5kZXggPyBfZmlyc3QgOiBfY3VycmVudEluZGV4IC0gX251bVQpIDogX2N1cnJlbnRJbmRleCA+IF90cmlnZ2VySW5kZXggPyBfZmlyc3QgOiBfY3VycmVudEluZGV4IC0gMiAqIF9udW1UKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlTGFzdCA9IChfY3VycmVudEluZGV4OiBudW1iZXIsIF9maXJzdDogbnVtYmVyLCBfbGFzdDogbnVtYmVyLCBfbnVtOiBudW1iZXIsIF9udW1UOiBudW1iZXIsIF9pc0NvbHMgPSBmYWxzZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGxhc3RWYWx1ZSA9IF9maXJzdCArIF9udW0gKyAyICogX251bVQ7XG5cbiAgICAgICAgICAgIGlmIChfY3VycmVudEluZGV4ID49IF9udW1UKSB7XG4gICAgICAgICAgICAgICAgbGFzdFZhbHVlICs9IF9udW1UICsgMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGFzdChsYXN0VmFsdWUsIF9pc0NvbHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IGNhbGN1bGF0ZVNjcm9sbFBvcygoPEhUTUxFbGVtZW50PnRhcmdldCkuc2Nyb2xsVG9wLCBjb250ZW50UG9zLnRvcCk7XG4gICAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSBjYWxjdWxhdGVTY3JvbGxQb3MoKDxIVE1MRWxlbWVudD50YXJnZXQpLnNjcm9sbExlZnQsIGNvbnRlbnRQb3MubGVmdCk7XG5cbiAgICAgICAgbGV0IG5ld0ZpcnN0ID0gdGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiAwIH0gOiAwO1xuICAgICAgICBsZXQgbmV3TGFzdCA9IHRoaXMubGFzdDtcbiAgICAgICAgbGV0IGlzUmFuZ2VDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBuZXdTY3JvbGxQb3MgPSB0aGlzLmxhc3RTY3JvbGxQb3M7XG5cbiAgICAgICAgaWYgKHRoaXMuYm90aCkge1xuICAgICAgICAgICAgY29uc3QgaXNTY3JvbGxEb3duID0gdGhpcy5sYXN0U2Nyb2xsUG9zLnRvcCA8PSBzY3JvbGxUb3A7XG4gICAgICAgICAgICBjb25zdCBpc1Njcm9sbFJpZ2h0ID0gdGhpcy5sYXN0U2Nyb2xsUG9zLmxlZnQgPD0gc2Nyb2xsTGVmdDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9hcHBlbmRPbmx5IHx8ICh0aGlzLl9hcHBlbmRPbmx5ICYmIChpc1Njcm9sbERvd24gfHwgaXNTY3JvbGxSaWdodCkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0geyByb3dzOiBjYWxjdWxhdGVDdXJyZW50SW5kZXgoc2Nyb2xsVG9wLCAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVswXSksIGNvbHM6IGNhbGN1bGF0ZUN1cnJlbnRJbmRleChzY3JvbGxMZWZ0LCAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSkgfTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VySW5kZXggPSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IGNhbGN1bGF0ZVRyaWdnZXJJbmRleChjdXJyZW50SW5kZXgucm93cywgdGhpcy5maXJzdC5yb3dzLCB0aGlzLmxhc3Qucm93cywgdGhpcy5udW1JdGVtc0luVmlld3BvcnQucm93cywgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zWzBdLCBpc1Njcm9sbERvd24pLFxuICAgICAgICAgICAgICAgICAgICBjb2xzOiBjYWxjdWxhdGVUcmlnZ2VySW5kZXgoY3VycmVudEluZGV4LmNvbHMsIHRoaXMuZmlyc3QuY29scywgdGhpcy5sYXN0LmNvbHMsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LmNvbHMsIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtc1sxXSwgaXNTY3JvbGxSaWdodClcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbmV3Rmlyc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IGNhbGN1bGF0ZUZpcnN0KGN1cnJlbnRJbmRleC5yb3dzLCB0cmlnZ2VySW5kZXgucm93cywgdGhpcy5maXJzdC5yb3dzLCB0aGlzLmxhc3Qucm93cywgdGhpcy5udW1JdGVtc0luVmlld3BvcnQucm93cywgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zWzBdLCBpc1Njcm9sbERvd24pLFxuICAgICAgICAgICAgICAgICAgICBjb2xzOiBjYWxjdWxhdGVGaXJzdChjdXJyZW50SW5kZXguY29scywgdHJpZ2dlckluZGV4LmNvbHMsIHRoaXMuZmlyc3QuY29scywgdGhpcy5sYXN0LmNvbHMsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LmNvbHMsIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtc1sxXSwgaXNTY3JvbGxSaWdodClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5ld0xhc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IGNhbGN1bGF0ZUxhc3QoY3VycmVudEluZGV4LnJvd3MsIG5ld0ZpcnN0LnJvd3MsIHRoaXMubGFzdC5yb3dzLCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydC5yb3dzLCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXNbMF0pLFxuICAgICAgICAgICAgICAgICAgICBjb2xzOiBjYWxjdWxhdGVMYXN0KGN1cnJlbnRJbmRleC5jb2xzLCBuZXdGaXJzdC5jb2xzLCB0aGlzLmxhc3QuY29scywgdGhpcy5udW1JdGVtc0luVmlld3BvcnQuY29scywgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zWzFdLCB0cnVlKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpc1JhbmdlQ2hhbmdlZCA9IG5ld0ZpcnN0LnJvd3MgIT09IHRoaXMuZmlyc3Qucm93cyB8fCBuZXdMYXN0LnJvd3MgIT09IHRoaXMubGFzdC5yb3dzIHx8IG5ld0ZpcnN0LmNvbHMgIT09IHRoaXMuZmlyc3QuY29scyB8fCBuZXdMYXN0LmNvbHMgIT09IHRoaXMubGFzdC5jb2xzIHx8IHRoaXMuaXNSYW5nZUNoYW5nZWQ7XG4gICAgICAgICAgICAgICAgbmV3U2Nyb2xsUG9zID0geyB0b3A6IHNjcm9sbFRvcCwgbGVmdDogc2Nyb2xsTGVmdCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUG9zID0gdGhpcy5ob3Jpem9udGFsID8gc2Nyb2xsTGVmdCA6IHNjcm9sbFRvcDtcbiAgICAgICAgICAgIGNvbnN0IGlzU2Nyb2xsRG93bk9yUmlnaHQgPSB0aGlzLmxhc3RTY3JvbGxQb3MgPD0gc2Nyb2xsUG9zO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2FwcGVuZE9ubHkgfHwgKHRoaXMuX2FwcGVuZE9ubHkgJiYgaXNTY3JvbGxEb3duT3JSaWdodCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBjYWxjdWxhdGVDdXJyZW50SW5kZXgoc2Nyb2xsUG9zLCA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VySW5kZXggPSBjYWxjdWxhdGVUcmlnZ2VySW5kZXgoY3VycmVudEluZGV4LCB0aGlzLmZpcnN0LCB0aGlzLmxhc3QsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMsIGlzU2Nyb2xsRG93bk9yUmlnaHQpO1xuXG4gICAgICAgICAgICAgICAgbmV3Rmlyc3QgPSBjYWxjdWxhdGVGaXJzdChjdXJyZW50SW5kZXgsIHRyaWdnZXJJbmRleCwgdGhpcy5maXJzdCwgdGhpcy5sYXN0LCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydCwgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zLCBpc1Njcm9sbERvd25PclJpZ2h0KTtcbiAgICAgICAgICAgICAgICBuZXdMYXN0ID0gY2FsY3VsYXRlTGFzdChjdXJyZW50SW5kZXgsIG5ld0ZpcnN0LCB0aGlzLmxhc3QsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMpO1xuICAgICAgICAgICAgICAgIGlzUmFuZ2VDaGFuZ2VkID0gbmV3Rmlyc3QgIT09IHRoaXMuZmlyc3QgfHwgbmV3TGFzdCAhPT0gdGhpcy5sYXN0IHx8IHRoaXMuaXNSYW5nZUNoYW5nZWQ7XG4gICAgICAgICAgICAgICAgbmV3U2Nyb2xsUG9zID0gc2Nyb2xsUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpcnN0OiBuZXdGaXJzdCxcbiAgICAgICAgICAgIGxhc3Q6IG5ld0xhc3QsXG4gICAgICAgICAgICBpc1JhbmdlQ2hhbmdlZCxcbiAgICAgICAgICAgIHNjcm9sbFBvczogbmV3U2Nyb2xsUG9zXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb25TY3JvbGxDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHsgZmlyc3QsIGxhc3QsIGlzUmFuZ2VDaGFuZ2VkLCBzY3JvbGxQb3MgfSA9IHRoaXMub25TY3JvbGxQb3NpdGlvbkNoYW5nZShldmVudCk7XG5cbiAgICAgICAgaWYgKGlzUmFuZ2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHsgZmlyc3QsIGxhc3QgfTtcblxuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50UG9zaXRpb24obmV3U3RhdGUpO1xuXG4gICAgICAgICAgICB0aGlzLmZpcnN0ID0gZmlyc3Q7XG4gICAgICAgICAgICB0aGlzLmxhc3QgPSBsYXN0O1xuICAgICAgICAgICAgdGhpcy5sYXN0U2Nyb2xsUG9zID0gc2Nyb2xsUG9zO1xuXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25TY3JvbGxJbmRleENoYW5nZScsIG5ld1N0YXRlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhenkgJiYgdGhpcy5pc1BhZ2VDaGFuZ2VkKGZpcnN0KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhenlMb2FkU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLl9zdGVwID8gTWF0aC5taW4odGhpcy5nZXRQYWdlQnlGaXJzdChmaXJzdCkgKiB0aGlzLl9zdGVwLCAoPGFueVtdPnRoaXMuaXRlbXMpLmxlbmd0aCAtIHRoaXMuX3N0ZXApIDogZmlyc3QsXG4gICAgICAgICAgICAgICAgICAgIGxhc3Q6IE1hdGgubWluKHRoaXMuX3N0ZXAgPyAodGhpcy5nZXRQYWdlQnlGaXJzdChmaXJzdCkgKyAxKSAqIHRoaXMuX3N0ZXAgOiBsYXN0LCAoPGFueVtdPnRoaXMuaXRlbXMpLmxlbmd0aClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzTGF6eVN0YXRlQ2hhbmdlZCA9IHRoaXMubGF6eUxvYWRTdGF0ZS5maXJzdCAhPT0gbGF6eUxvYWRTdGF0ZS5maXJzdCB8fCB0aGlzLmxhenlMb2FkU3RhdGUubGFzdCAhPT0gbGF6eUxvYWRTdGF0ZS5sYXN0O1xuXG4gICAgICAgICAgICAgICAgaXNMYXp5U3RhdGVDaGFuZ2VkICYmIHRoaXMuaGFuZGxlRXZlbnRzKCdvbkxhenlMb2FkJywgbGF6eUxvYWRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXp5TG9hZFN0YXRlID0gbGF6eUxvYWRTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29udGFpbmVyU2Nyb2xsKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25TY3JvbGwnLCB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9kZWxheSAmJiB0aGlzLmlzUGFnZUNoYW5nZWQoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVGltZW91dCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNjcm9sbFRpbWVvdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZF9sb2FkaW5nICYmIHRoaXMuc2hvd0xvYWRlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgaXNSYW5nZUNoYW5nZWQgfSA9IHRoaXMub25TY3JvbGxQb3NpdGlvbkNoYW5nZShldmVudCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlZCA9IGlzUmFuZ2VDaGFuZ2VkIHx8ICh0aGlzLl9zdGVwID8gdGhpcy5pc1BhZ2VDaGFuZ2VkKCkgOiBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRfbG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2Nyb2xsQ2hhbmdlKGV2ZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRfbG9hZGluZyAmJiB0aGlzLnNob3dMb2FkZXIgJiYgKCF0aGlzLl9sYXp5IHx8IHRoaXMuX2xvYWRpbmcgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5nZXRQYWdlQnlGaXJzdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzLl9kZWxheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAhdGhpcy5kX2xvYWRpbmcgJiYgdGhpcy5vblNjcm9sbENoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuZWxlbWVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUmVzaXplKCkge1xuICAgICAgICBpZiAodGhpcy5yZXNpemVUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaXNWaXNpYmxlKHRoaXMuZWxlbWVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBbRG9tSGFuZGxlci5nZXRXaWR0aCh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpLCBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBbaXNEaWZmV2lkdGgsIGlzRGlmZkhlaWdodF0gPSBbd2lkdGggIT09IHRoaXMuZGVmYXVsdFdpZHRoLCBoZWlnaHQgIT09IHRoaXMuZGVmYXVsdEhlaWdodF07XG4gICAgICAgICAgICAgICAgY29uc3QgcmVpbml0ID0gdGhpcy5ib3RoID8gaXNEaWZmV2lkdGggfHwgaXNEaWZmSGVpZ2h0IDogdGhpcy5ob3Jpem9udGFsID8gaXNEaWZmV2lkdGggOiB0aGlzLnZlcnRpY2FsID8gaXNEaWZmSGVpZ2h0IDogZmFsc2U7XG5cbiAgICAgICAgICAgICAgICByZWluaXQgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMgPSB0aGlzLl9udW1Ub2xlcmF0ZWRJdGVtcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUF1dG9TaXplKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLl9yZXNpemVEZWxheSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXZlbnRzKG5hbWU6IHN0cmluZywgcGFyYW1zOiBhbnkpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMgJiYgKDxhbnk+dGhpcy5vcHRpb25zKVtuYW1lXSA/ICg8YW55PnRoaXMub3B0aW9ucylbbmFtZV0ocGFyYW1zKSA6IHRoaXNbbmFtZV0uZW1pdChwYXJhbXMpO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29udGVudFN0eWxlQ2xhc3M6IGBwLXNjcm9sbGVyLWNvbnRlbnQgJHt0aGlzLmRfbG9hZGluZyA/ICdwLXNjcm9sbGVyLWxvYWRpbmcnIDogJyd9YCxcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmxvYWRlZEl0ZW1zLFxuICAgICAgICAgICAgZ2V0SXRlbU9wdGlvbnM6IChpbmRleDogbnVtYmVyKSA9PiB0aGlzLmdldE9wdGlvbnMoaW5kZXgpLFxuICAgICAgICAgICAgbG9hZGluZzogdGhpcy5kX2xvYWRpbmcsXG4gICAgICAgICAgICBnZXRMb2FkZXJPcHRpb25zOiAoaW5kZXg6IG51bWJlciwgb3B0aW9ucz86IGFueSkgPT4gdGhpcy5nZXRMb2FkZXJPcHRpb25zKGluZGV4LCBvcHRpb25zKSxcbiAgICAgICAgICAgIGl0ZW1TaXplOiB0aGlzLl9pdGVtU2l6ZSxcbiAgICAgICAgICAgIHJvd3M6IHRoaXMubG9hZGVkUm93cyxcbiAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMubG9hZGVkQ29sdW1ucyxcbiAgICAgICAgICAgIHNwYWNlclN0eWxlOiB0aGlzLnNwYWNlclN0eWxlLFxuICAgICAgICAgICAgY29udGVudFN0eWxlOiB0aGlzLmNvbnRlbnRTdHlsZSxcbiAgICAgICAgICAgIHZlcnRpY2FsOiB0aGlzLnZlcnRpY2FsLFxuICAgICAgICAgICAgaG9yaXpvbnRhbDogdGhpcy5ob3Jpem9udGFsLFxuICAgICAgICAgICAgYm90aDogdGhpcy5ib3RoXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9ucyhyZW5kZXJlZEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY291bnQgPSAodGhpcy5faXRlbXMgfHwgW10pLmxlbmd0aDtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmJvdGggPyB0aGlzLmZpcnN0LnJvd3MgKyByZW5kZXJlZEluZGV4IDogdGhpcy5maXJzdCArIHJlbmRlcmVkSW5kZXg7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgY291bnQsXG4gICAgICAgICAgICBmaXJzdDogaW5kZXggPT09IDAsXG4gICAgICAgICAgICBsYXN0OiBpbmRleCA9PT0gY291bnQgLSAxLFxuICAgICAgICAgICAgZXZlbjogaW5kZXggJSAyID09PSAwLFxuICAgICAgICAgICAgb2RkOiBpbmRleCAlIDIgIT09IDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRMb2FkZXJPcHRpb25zKGluZGV4OiBudW1iZXIsIGV4dE9wdGlvbnM6IGFueSkge1xuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMubG9hZGVyQXJyLmxlbmd0aDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBjb3VudCxcbiAgICAgICAgICAgIGZpcnN0OiBpbmRleCA9PT0gMCxcbiAgICAgICAgICAgIGxhc3Q6IGluZGV4ID09PSBjb3VudCAtIDEsXG4gICAgICAgICAgICBldmVuOiBpbmRleCAlIDIgPT09IDAsXG4gICAgICAgICAgICBvZGQ6IGluZGV4ICUgMiAhPT0gMCxcbiAgICAgICAgICAgIC4uLmV4dE9wdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2hhcmVkTW9kdWxlLCBTcGlubmVySWNvbl0sXG4gICAgZXhwb3J0czogW1Njcm9sbGVyLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1Njcm9sbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxlck1vZHVsZSB7fVxuIl19