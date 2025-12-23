import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { Footer, Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { ChevronUpIcon } from 'primeng/icons/chevronup';
import { RippleModule } from 'primeng/ripple';
import { UniqueComponentId } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
/**
 * Carousel is a content slider featuring various customization options.
 * @group Components
 */
export class Carousel {
    el;
    zone;
    cd;
    renderer;
    document;
    platformId;
    config;
    updateSlideAccessibility(slide, isActive) {
        const focusableElements = slide.querySelectorAll('a, button, input, select, textarea, [tabindex]');
        focusableElements.forEach((element) => {
            element.tabIndex = isActive ? 0 : -1;
        });
    }
    updateCarouselItemsAccessibility() {
        const slides = this.el.nativeElement.querySelectorAll('.p-carousel-item');
        slides.forEach((slide, index) => {
            const isActive = index === this._page;
            slide.setAttribute('aria-hidden', !isActive ? 'true' : 'false');
            this.updateSlideAccessibility(slide, isActive);
        });
    }
    /**
     * Index of the first item.
     * @defaultValue 0
     * @group Props
     */
    get page() {
        return this._page;
    }
    set page(val) {
        if (this.isCreated && val !== this._page) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
            if (val > this._page && val <= this.totalDots() - 1) {
                this.step(-1, val);
            }
            else if (val < this._page) {
                this.step(1, val);
            }
        }
        this._page = val;
    }
    /**
     * Number of items per page.
     * @defaultValue 1
     * @group Props
     */
    get numVisible() {
        return this._numVisible;
    }
    set numVisible(val) {
        this._numVisible = val;
    }
    /**
     * Number of items to scroll.
     * @defaultValue 1
     * @group Props
     */
    get numScroll() {
        return this._numVisible;
    }
    set numScroll(val) {
        this._numScroll = val;
    }
    /**
     * An array of options for responsive design.
     * @see {CarouselResponsiveOptions}
     * @group Props
     */
    responsiveOptions;
    /**
     * Specifies the layout of the component.
     * @group Props
     */
    orientation = 'horizontal';
    /**
     * Height of the viewport in vertical layout.
     * @group Props
     */
    verticalViewPortHeight = '300px';
    /**
     * Style class of main content.
     * @group Props
     */
    contentClass = '';
    /**
     * Style class of the indicator items.
     * @group Props
     */
    indicatorsContentClass = '';
    /**
     * Inline style of the indicator items.
     * @group Props
     */
    indicatorsContentStyle;
    /**
     * Style class of the indicators.
     * @group Props
     */
    indicatorStyleClass = '';
    /**
     * Style of the indicators.
     * @group Props
     */
    indicatorStyle;
    /**
     * An array of objects to display.
     * @defaultValue null
     * @group Props
     */
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
    /**
     * Defines if scrolling would be infinite.
     * @group Props
     */
    circular = false;
    /**
     * Whether to display indicator container.
     * @group Props
     */
    showIndicators = true;
    /**
     * Whether to display navigation buttons in container.
     * @group Props
     */
    showNavigators = true;
    /**
     * Time in milliseconds to scroll items automatically.
     * @group Props
     */
    autoplayInterval = 0;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the viewport container.
     * @group Props
     */
    styleClass;
    /**
     * Callback to invoke after scroll.
     * @param {CarouselPageEvent} event - Custom page event.
     * @group Emits
     */
    onPage = new EventEmitter();
    itemsContainer;
    indicatorContent;
    headerFacet;
    footerFacet;
    templates;
    _numVisible = 1;
    _numScroll = 1;
    _oldNumScroll = 0;
    prevState = {
        numScroll: 0,
        numVisible: 0,
        value: []
    };
    defaultNumScroll = 1;
    defaultNumVisible = 1;
    _page = 0;
    _value;
    carouselStyle;
    id;
    totalShiftedItems;
    isRemainingItemsAdded = false;
    animationTimeout;
    translateTimeout;
    remainingItems = 0;
    _items;
    startPos;
    documentResizeListener;
    clonedItemsForStarting;
    clonedItemsForFinishing;
    allowAutoplay;
    interval;
    isCreated;
    swipeThreshold = 20;
    itemTemplate;
    headerTemplate;
    footerTemplate;
    previousIconTemplate;
    nextIconTemplate;
    window;
    constructor(el, zone, cd, renderer, document, platformId, config) {
        this.el = el;
        this.zone = zone;
        this.cd = cd;
        this.renderer = renderer;
        this.document = document;
        this.platformId = platformId;
        this.config = config;
        this.totalShiftedItems = this.page * this.numScroll * -1;
        this.window = this.document.defaultView;
    }
    ngOnChanges(simpleChange) {
        if (isPlatformBrowser(this.platformId)) {
            if (simpleChange.value) {
                if (this.circular && this._value) {
                    this.setCloneItems();
                }
            }
            if (this.isCreated) {
                if (simpleChange.numVisible) {
                    if (this.responsiveOptions) {
                        this.defaultNumVisible = this.numVisible;
                    }
                    if (this.isCircular()) {
                        this.setCloneItems();
                    }
                    this.createStyle();
                    this.calculatePosition();
                }
                if (simpleChange.numScroll) {
                    if (this.responsiveOptions) {
                        this.defaultNumScroll = this.numScroll;
                    }
                }
            }
        }
        this.cd.markForCheck();
    }
    ngAfterContentInit() {
        this.id = UniqueComponentId();
        if (isPlatformBrowser(this.platformId)) {
            this.allowAutoplay = !!this.autoplayInterval;
            if (this.circular) {
                this.setCloneItems();
            }
            if (this.responsiveOptions) {
                this.defaultNumScroll = this._numScroll;
                this.defaultNumVisible = this._numVisible;
            }
            this.createStyle();
            this.calculatePosition();
            if (this.responsiveOptions) {
                this.bindDocumentListeners();
            }
        }
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;
                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
        this.cd.detectChanges();
    }
    ngAfterContentChecked() {
        if (isPlatformBrowser(this.platformId)) {
            const isCircular = this.isCircular();
            let totalShiftedItems = this.totalShiftedItems;
            if (this.value && this.itemsContainer && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
                if (this.autoplayInterval) {
                    this.stopAutoplay(false);
                }
                this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;
                let page = this._page;
                if (this.totalDots() !== 0 && page >= this.totalDots()) {
                    page = this.totalDots() - 1;
                    this._page = page;
                    this.onPage.emit({
                        page: this.page
                    });
                }
                totalShiftedItems = page * this._numScroll * -1;
                if (isCircular) {
                    totalShiftedItems -= this._numVisible;
                }
                if (page === this.totalDots() - 1 && this.remainingItems > 0) {
                    totalShiftedItems += -1 * this.remainingItems + this._numScroll;
                    this.isRemainingItemsAdded = true;
                }
                else {
                    this.isRemainingItemsAdded = false;
                }
                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;
                }
                this._oldNumScroll = this._numScroll;
                this.prevState.numScroll = this._numScroll;
                this.prevState.numVisible = this._numVisible;
                this.prevState.value = [...this._value];
                if (this.totalDots() > 0 && this.itemsContainer.nativeElement) {
                    this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
                }
                this.isCreated = true;
                if (this.autoplayInterval && this.isAutoplay()) {
                    this.startAutoplay();
                }
            }
            if (isCircular) {
                if (this.page === 0) {
                    totalShiftedItems = -1 * this._numVisible;
                }
                else if (totalShiftedItems === 0) {
                    totalShiftedItems = -1 * this.value.length;
                    if (this.remainingItems > 0) {
                        this.isRemainingItemsAdded = true;
                    }
                }
                if (totalShiftedItems !== this.totalShiftedItems) {
                    this.totalShiftedItems = totalShiftedItems;
                }
            }
        }
    }
    createStyle() {
        if (!this.carouselStyle) {
            this.carouselStyle = this.renderer.createElement('style');
            this.carouselStyle.type = 'text/css';
            DomHandler.setAttribute(this.carouselStyle, 'nonce', this.config?.csp()?.nonce);
            this.renderer.appendChild(this.document.head, this.carouselStyle);
        }
        let innerHTML = `
            #${this.id} .p-carousel-item {
				flex: 1 0 ${100 / this.numVisible}%
			}
        `;
        if (this.responsiveOptions) {
            this.responsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
                return -1 * result;
            });
            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];
                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .p-carousel-item {
                            flex: 1 0 ${100 / res.numVisible}%
                        }
                    }
                `;
            }
        }
        this.carouselStyle.innerHTML = innerHTML;
    }
    calculatePosition() {
        if (this.responsiveOptions) {
            let matchedResponsiveData = {
                numVisible: this.defaultNumVisible,
                numScroll: this.defaultNumScroll
            };
            if (typeof window !== 'undefined') {
                let windowWidth = window.innerWidth;
                for (let i = 0; i < this.responsiveOptions.length; i++) {
                    let res = this.responsiveOptions[i];
                    if (parseInt(res.breakpoint, 10) >= windowWidth) {
                        matchedResponsiveData = res;
                    }
                }
            }
            if (this._numScroll !== matchedResponsiveData.numScroll) {
                let page = this._page;
                page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);
                let totalShiftedItems = matchedResponsiveData.numScroll * this.page * -1;
                if (this.isCircular()) {
                    totalShiftedItems -= matchedResponsiveData.numVisible;
                }
                this.totalShiftedItems = totalShiftedItems;
                this._numScroll = matchedResponsiveData.numScroll;
                this._page = page;
                this.onPage.emit({
                    page: this.page
                });
            }
            if (this._numVisible !== matchedResponsiveData.numVisible) {
                this._numVisible = matchedResponsiveData.numVisible;
                this.setCloneItems();
            }
            this.cd.markForCheck();
        }
    }
    setCloneItems() {
        this.clonedItemsForStarting = [];
        this.clonedItemsForFinishing = [];
        if (this.isCircular()) {
            this.clonedItemsForStarting.push(...this.value.slice(-1 * this._numVisible));
            this.clonedItemsForFinishing.push(...this.value.slice(0, this._numVisible));
        }
    }
    firstIndex() {
        return this.isCircular() ? -1 * (this.totalShiftedItems + this.numVisible) : this.totalShiftedItems * -1;
    }
    lastIndex() {
        return this.firstIndex() + this.numVisible - 1;
    }
    totalDots() {
        return this.value?.length ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
    }
    totalDotsArray() {
        const totalDots = this.totalDots();
        return totalDots <= 0 ? [] : Array(totalDots).fill(0);
    }
    isVertical() {
        return this.orientation === 'vertical';
    }
    isCircular() {
        return this.circular && this.value && this.value.length >= this.numVisible;
    }
    isAutoplay() {
        return this.autoplayInterval && this.allowAutoplay;
    }
    isForwardNavDisabled() {
        return this.isEmpty() || (this._page >= this.totalDots() - 1 && !this.isCircular());
    }
    isBackwardNavDisabled() {
        return this.isEmpty() || (this._page <= 0 && !this.isCircular());
    }
    isEmpty() {
        return !this.value || this.value.length === 0;
    }
    navForward(e, index) {
        if (this.isCircular() || this._page < this.totalDots() - 1) {
            this.step(-1, index);
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e, index) {
        if (this.isCircular() || this._page !== 0) {
            this.step(1, index);
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    onDotClick(e, index) {
        let page = this._page;
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
        if (index > page) {
            this.navForward(e, index);
        }
        else if (index < page) {
            this.navBackward(e, index);
        }
    }
    onIndicatorKeydown(event) {
        switch (event.code) {
            case 'ArrowRight':
                this.onRightKey();
                break;
            case 'ArrowLeft':
                this.onLeftKey();
                break;
        }
    }
    onRightKey() {
        const indicators = [...DomHandler.find(this.indicatorContent.nativeElement, '[data-pc-section="indicator"]')];
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
    }
    onLeftKey() {
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
    }
    onHomeKey() {
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, 0);
    }
    onEndKey() {
        const indicators = [...DomHandler.find(this.indicatorContent.nativeElement, '[data-pc-section="indicator"]r')];
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, indicators.length - 1);
    }
    onTabKey() {
        const indicators = [...DomHandler.find(this.indicatorContent.nativeElement, '[data-pc-section="indicator"]')];
        const highlightedIndex = indicators.findIndex((ind) => DomHandler.getAttribute(ind, 'data-p-highlight') === true);
        const activeIndicator = DomHandler.findSingle(this.indicatorContent.nativeElement, '[data-pc-section="indicator"] > button[tabindex="0"]');
        const activeIndex = indicators.findIndex((ind) => ind === activeIndicator.parentElement);
        indicators[activeIndex].children[0].tabIndex = '-1';
        indicators[highlightedIndex].children[0].tabIndex = '0';
    }
    findFocusedIndicatorIndex() {
        const indicators = [...DomHandler.find(this.indicatorContent.nativeElement, '[data-pc-section="indicator"]')];
        const activeIndicator = DomHandler.findSingle(this.indicatorContent.nativeElement, '[data-pc-section="indicator"] > button[tabindex="0"]');
        return indicators.findIndex((ind) => ind === activeIndicator.parentElement);
    }
    changedFocusedIndicator(prevInd, nextInd) {
        const indicators = [...DomHandler.find(this.indicatorContent.nativeElement, '[data-pc-section="indicator"]')];
        indicators[prevInd].children[0].tabIndex = '-1';
        indicators[nextInd].children[0].tabIndex = '0';
        indicators[nextInd].children[0].focus();
    }
    step(dir, page) {
        let totalShiftedItems = this.totalShiftedItems;
        const isCircular = this.isCircular();
        if (page != null) {
            totalShiftedItems = this._numScroll * page * -1;
            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }
            this.isRemainingItemsAdded = false;
        }
        else {
            totalShiftedItems += this._numScroll * dir;
            if (this.isRemainingItemsAdded) {
                totalShiftedItems += this.remainingItems - this._numScroll * dir;
                this.isRemainingItemsAdded = false;
            }
            let originalShiftedItems = isCircular ? totalShiftedItems + this._numVisible : totalShiftedItems;
            page = Math.abs(Math.floor(originalShiftedItems / this._numScroll));
        }
        if (isCircular && this.page === this.totalDots() - 1 && dir === -1) {
            totalShiftedItems = -1 * (this.value.length + this._numVisible);
            page = 0;
        }
        else if (isCircular && this.page === 0 && dir === 1) {
            totalShiftedItems = 0;
            page = this.totalDots() - 1;
        }
        else if (page === this.totalDots() - 1 && this.remainingItems > 0) {
            totalShiftedItems += this.remainingItems * -1 - this._numScroll * dir;
            this.isRemainingItemsAdded = true;
        }
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
        this._page = page;
        this.onPage.emit({
            page: this.page
        });
        this.cd.markForCheck();
        this.updateCarouselItemsAccessibility();
    }
    startAutoplay() {
        this.interval = setInterval(() => {
            if (this.totalDots() > 0) {
                if (this.page === this.totalDots() - 1) {
                    this.step(-1, 0);
                }
                else {
                    this.step(-1, this.page + 1);
                }
            }
        }, this.autoplayInterval);
        this.allowAutoplay = true;
        this.cd.markForCheck();
    }
    stopAutoplay(changeAllow = true) {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
            if (changeAllow) {
                this.allowAutoplay = false;
            }
        }
        this.cd.markForCheck();
    }
    isPlaying() {
        return !!this.interval;
    }
    onTransitionEnd() {
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transition = '';
            if ((this.page === 0 || this.page === this.totalDots() - 1) && this.isCircular()) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${this.totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${this.totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            }
        }
    }
    onTouchStart(e) {
        let touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }
    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];
        if (this.isVertical()) {
            this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
        }
        else {
            this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
        }
    }
    changePageOnTouch(e, diff) {
        if (Math.abs(diff) > this.swipeThreshold) {
            if (diff < 0) {
                this.navForward(e);
            }
            else {
                this.navBackward(e);
            }
        }
    }
    ariaPrevButtonLabel() {
        return this.config.translation.aria ? this.config.translation.aria.prevPageLabel : undefined;
    }
    ariaSlideLabel() {
        return this.config.translation.aria ? this.config.translation.aria.slide : undefined;
    }
    ariaNextButtonLabel() {
        return this.config.translation.aria ? this.config.translation.aria.nextPageLabel : undefined;
    }
    ariaSlideNumber(value) {
        return this.config.translation.aria ? this.config.translation.aria.slideNumber.replace(/{slideNumber}/g, value) : undefined;
    }
    ariaPageLabel(value) {
        return this.config.translation.aria ? this.config.translation.aria.pageLabel.replace(/{page}/g, value) : undefined;
    }
    bindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentResizeListener) {
                this.documentResizeListener = this.renderer.listen(this.window, 'resize', (event) => {
                    this.calculatePosition();
                });
            }
        }
    }
    unbindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.documentResizeListener) {
                this.documentResizeListener();
                this.documentResizeListener = null;
            }
        }
    }
    ngOnDestroy() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Carousel, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: Carousel, selector: "p-carousel", inputs: { page: "page", numVisible: "numVisible", numScroll: "numScroll", responsiveOptions: "responsiveOptions", orientation: "orientation", verticalViewPortHeight: "verticalViewPortHeight", contentClass: "contentClass", indicatorsContentClass: "indicatorsContentClass", indicatorsContentStyle: "indicatorsContentStyle", indicatorStyleClass: "indicatorStyleClass", indicatorStyle: "indicatorStyle", value: "value", circular: ["circular", "circular", booleanAttribute], showIndicators: ["showIndicators", "showIndicators", booleanAttribute], showNavigators: ["showNavigators", "showNavigators", booleanAttribute], autoplayInterval: ["autoplayInterval", "autoplayInterval", numberAttribute], style: "style", styleClass: "styleClass" }, outputs: { onPage: "onPage" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "headerFacet", first: true, predicate: Header, descendants: true }, { propertyName: "footerFacet", first: true, predicate: Footer, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "itemsContainer", first: true, predicate: ["itemsContainer"], descendants: true }, { propertyName: "indicatorContent", first: true, predicate: ["indicatorContent"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div [attr.id]="id" [ngClass]="{ 'p-carousel p-component': true, 'p-carousel-vertical': isVertical(), 'p-carousel-horizontal': !isVertical() }" [ngStyle]="style" [class]="styleClass" role="region">
            <div class="p-carousel-header" *ngIf="headerFacet || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div [class]="contentClass" [ngClass]="'p-carousel-content'">
                <div class="p-carousel-container" [attr.aria-live]="allowAutoplay ? 'polite' : 'off'">
                    <button
                        type="button"
                        *ngIf="showNavigators"
                        [ngClass]="{ 'p-carousel-prev p-link': true, 'p-disabled': isBackwardNavDisabled() }"
                        [disabled]="isBackwardNavDisabled()"
                        [attr.aria-label]="ariaPrevButtonLabel()"
                        (click)="navBackward($event)"
                        pRipple
                    >
                        <ng-container *ngIf="!previousIconTemplate">
                            <ChevronLeftIcon *ngIf="!isVertical()" [styleClass]="'carousel-prev-icon'" />
                            <ChevronUpIcon *ngIf="isVertical()" [styleClass]="'carousel-prev-icon'" />
                        </ng-container>
                        <span *ngIf="previousIconTemplate" class="p-carousel-prev-icon">
                            <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                        </span>
                    </button>
                    <div class="p-carousel-items-content" [ngStyle]="{ height: isVertical() ? verticalViewPortHeight : 'auto' }" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)">
                        <div #itemsContainer class="p-carousel-items-container" (transitionend)="onTransitionEnd()">
                            <div
                                *ngFor="let item of clonedItemsForStarting; let index = index"
                                [ngClass]="{
                                    'p-carousel-item p-carousel-item-cloned': true,
                                    'p-carousel-item-active': totalShiftedItems * -1 === value.length,
                                    'p-carousel-item-start': 0 === index,
                                    'p-carousel-item-end': clonedItemsForStarting.length - 1 === index
                                }"
                                [attr.aria-hidden]="!(totalShiftedItems * -1 === value.length)"
                                [attr.aria-label]="ariaSlideNumber(index)"
                                [attr.aria-roledescription]="ariaSlideLabel()"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </div>
                            <div
                                *ngFor="let item of value; let index = index"
                                [ngClass]="{ 'p-carousel-item': true, 'p-carousel-item-active': firstIndex() <= index && lastIndex() >= index, 'p-carousel-item-start': firstIndex() === index, 'p-carousel-item-end': lastIndex() === index }"
                                [attr.aria-hidden]="!(totalShiftedItems * -1 === value.length)"
                                [attr.aria-label]="ariaSlideNumber(index)"
                                [attr.aria-roledescription]="ariaSlideLabel()"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </div>
                            <div
                                *ngFor="let item of clonedItemsForFinishing; let index = index"
                                [ngClass]="{
                                    'p-carousel-item p-carousel-item-cloned': true,
                                    'p-carousel-item-active': totalShiftedItems * -1 === numVisible,
                                    'p-carousel-item-start': 0 === index,
                                    'p-carousel-item-end': clonedItemsForFinishing.length - 1 === index
                                }"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        *ngIf="showNavigators"
                        [ngClass]="{ 'p-carousel-next p-link': true, 'p-disabled': isForwardNavDisabled() }"
                        [disabled]="isForwardNavDisabled()"
                        (click)="navForward($event)"
                        pRipple
                        [attr.aria-label]="ariaNextButtonLabel()"
                    >
                        <ng-container *ngIf="!nextIconTemplate">
                            <ChevronRightIcon *ngIf="!isVertical()" [styleClass]="'carousel-prev-icon'" />
                            <ChevronDownIcon *ngIf="isVertical()" [styleClass]="'carousel-prev-icon'" />
                        </ng-container>
                        <span *ngIf="nextIconTemplate" class="p-carousel-prev-icon">
                            <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                        </span>
                    </button>
                </div>
                <ul #indicatorContent [ngClass]="'p-carousel-indicators p-reset'" [class]="indicatorsContentClass" [ngStyle]="indicatorsContentStyle" *ngIf="showIndicators" (keydown)="onIndicatorKeydown($event)">
                    <li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{ 'p-carousel-indicator': true, 'p-highlight': _page === i }" [attr.data-pc-section]="'indicator'">
                        <button
                            type="button"
                            [ngClass]="'p-link'"
                            (click)="onDotClick($event, i)"
                            [class]="indicatorStyleClass"
                            [ngStyle]="indicatorStyle"
                            [attr.aria-label]="ariaPageLabel(i + 1)"
                            [attr.aria-current]="_page === i ? 'page' : undefined"
                            [tabindex]="_page === i ? 0 : -1"
                        ></button>
                    </li>
                </ul>
            </div>
            <div class="p-carousel-footer" *ngIf="footerFacet || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-carousel{display:flex;flex-direction:column}.p-carousel-content{display:flex;flex-direction:column;overflow:auto}.p-carousel-prev,.p-carousel-next{align-self:center;flex-grow:0;flex-shrink:0;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-carousel-container{display:flex;flex-direction:row}.p-carousel-items-content{overflow:hidden;width:100%}.p-carousel-items-container{display:flex;flex-direction:row}.p-carousel-indicators{display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap}.p-carousel-indicator>button{display:flex;align-items:center;justify-content:center}.p-carousel-vertical .p-carousel-container{flex-direction:column}.p-carousel-vertical .p-carousel-items-container{flex-direction:column;height:100%}.p-items-hidden .p-carousel-item{visibility:hidden}.p-items-hidden .p-carousel-item.p-carousel-item-active{visibility:visible}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronLeftIcon), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronUpIcon), selector: "ChevronUpIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Carousel, decorators: [{
            type: Component,
            args: [{ selector: 'p-carousel', template: `
        <div [attr.id]="id" [ngClass]="{ 'p-carousel p-component': true, 'p-carousel-vertical': isVertical(), 'p-carousel-horizontal': !isVertical() }" [ngStyle]="style" [class]="styleClass" role="region">
            <div class="p-carousel-header" *ngIf="headerFacet || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div [class]="contentClass" [ngClass]="'p-carousel-content'">
                <div class="p-carousel-container" [attr.aria-live]="allowAutoplay ? 'polite' : 'off'">
                    <button
                        type="button"
                        *ngIf="showNavigators"
                        [ngClass]="{ 'p-carousel-prev p-link': true, 'p-disabled': isBackwardNavDisabled() }"
                        [disabled]="isBackwardNavDisabled()"
                        [attr.aria-label]="ariaPrevButtonLabel()"
                        (click)="navBackward($event)"
                        pRipple
                    >
                        <ng-container *ngIf="!previousIconTemplate">
                            <ChevronLeftIcon *ngIf="!isVertical()" [styleClass]="'carousel-prev-icon'" />
                            <ChevronUpIcon *ngIf="isVertical()" [styleClass]="'carousel-prev-icon'" />
                        </ng-container>
                        <span *ngIf="previousIconTemplate" class="p-carousel-prev-icon">
                            <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                        </span>
                    </button>
                    <div class="p-carousel-items-content" [ngStyle]="{ height: isVertical() ? verticalViewPortHeight : 'auto' }" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)">
                        <div #itemsContainer class="p-carousel-items-container" (transitionend)="onTransitionEnd()">
                            <div
                                *ngFor="let item of clonedItemsForStarting; let index = index"
                                [ngClass]="{
                                    'p-carousel-item p-carousel-item-cloned': true,
                                    'p-carousel-item-active': totalShiftedItems * -1 === value.length,
                                    'p-carousel-item-start': 0 === index,
                                    'p-carousel-item-end': clonedItemsForStarting.length - 1 === index
                                }"
                                [attr.aria-hidden]="!(totalShiftedItems * -1 === value.length)"
                                [attr.aria-label]="ariaSlideNumber(index)"
                                [attr.aria-roledescription]="ariaSlideLabel()"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </div>
                            <div
                                *ngFor="let item of value; let index = index"
                                [ngClass]="{ 'p-carousel-item': true, 'p-carousel-item-active': firstIndex() <= index && lastIndex() >= index, 'p-carousel-item-start': firstIndex() === index, 'p-carousel-item-end': lastIndex() === index }"
                                [attr.aria-hidden]="!(totalShiftedItems * -1 === value.length)"
                                [attr.aria-label]="ariaSlideNumber(index)"
                                [attr.aria-roledescription]="ariaSlideLabel()"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </div>
                            <div
                                *ngFor="let item of clonedItemsForFinishing; let index = index"
                                [ngClass]="{
                                    'p-carousel-item p-carousel-item-cloned': true,
                                    'p-carousel-item-active': totalShiftedItems * -1 === numVisible,
                                    'p-carousel-item-start': 0 === index,
                                    'p-carousel-item-end': clonedItemsForFinishing.length - 1 === index
                                }"
                            >
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        *ngIf="showNavigators"
                        [ngClass]="{ 'p-carousel-next p-link': true, 'p-disabled': isForwardNavDisabled() }"
                        [disabled]="isForwardNavDisabled()"
                        (click)="navForward($event)"
                        pRipple
                        [attr.aria-label]="ariaNextButtonLabel()"
                    >
                        <ng-container *ngIf="!nextIconTemplate">
                            <ChevronRightIcon *ngIf="!isVertical()" [styleClass]="'carousel-prev-icon'" />
                            <ChevronDownIcon *ngIf="isVertical()" [styleClass]="'carousel-prev-icon'" />
                        </ng-container>
                        <span *ngIf="nextIconTemplate" class="p-carousel-prev-icon">
                            <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                        </span>
                    </button>
                </div>
                <ul #indicatorContent [ngClass]="'p-carousel-indicators p-reset'" [class]="indicatorsContentClass" [ngStyle]="indicatorsContentStyle" *ngIf="showIndicators" (keydown)="onIndicatorKeydown($event)">
                    <li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{ 'p-carousel-indicator': true, 'p-highlight': _page === i }" [attr.data-pc-section]="'indicator'">
                        <button
                            type="button"
                            [ngClass]="'p-link'"
                            (click)="onDotClick($event, i)"
                            [class]="indicatorStyleClass"
                            [ngStyle]="indicatorStyle"
                            [attr.aria-label]="ariaPageLabel(i + 1)"
                            [attr.aria-current]="_page === i ? 'page' : undefined"
                            [tabindex]="_page === i ? 0 : -1"
                        ></button>
                    </li>
                </ul>
            </div>
            <div class="p-carousel-footer" *ngIf="footerFacet || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-carousel{display:flex;flex-direction:column}.p-carousel-content{display:flex;flex-direction:column;overflow:auto}.p-carousel-prev,.p-carousel-next{align-self:center;flex-grow:0;flex-shrink:0;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-carousel-container{display:flex;flex-direction:row}.p-carousel-items-content{overflow:hidden;width:100%}.p-carousel-items-container{display:flex;flex-direction:row}.p-carousel-indicators{display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap}.p-carousel-indicator>button{display:flex;align-items:center;justify-content:center}.p-carousel-vertical .p-carousel-container{flex-direction:column}.p-carousel-vertical .p-carousel-items-container{flex-direction:column;height:100%}.p-items-hidden .p-carousel-item{visibility:hidden}.p-items-hidden .p-carousel-item.p-carousel-item-active{visibility:visible}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i1.PrimeNGConfig }], propDecorators: { page: [{
                type: Input
            }], numVisible: [{
                type: Input
            }], numScroll: [{
                type: Input
            }], responsiveOptions: [{
                type: Input
            }], orientation: [{
                type: Input
            }], verticalViewPortHeight: [{
                type: Input
            }], contentClass: [{
                type: Input
            }], indicatorsContentClass: [{
                type: Input
            }], indicatorsContentStyle: [{
                type: Input
            }], indicatorStyleClass: [{
                type: Input
            }], indicatorStyle: [{
                type: Input
            }], value: [{
                type: Input
            }], circular: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showIndicators: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showNavigators: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoplayInterval: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], onPage: [{
                type: Output
            }], itemsContainer: [{
                type: ViewChild,
                args: ['itemsContainer']
            }], indicatorContent: [{
                type: ViewChild,
                args: ['indicatorContent']
            }], headerFacet: [{
                type: ContentChild,
                args: [Header]
            }], footerFacet: [{
                type: ContentChild,
                args: [Footer]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class CarouselModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: CarouselModule, declarations: [Carousel], imports: [CommonModule, SharedModule, RippleModule, ChevronRightIcon, ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon], exports: [CommonModule, Carousel, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselModule, imports: [CommonModule, SharedModule, RippleModule, ChevronRightIcon, ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon, CommonModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, RippleModule, ChevronRightIcon, ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon],
                    exports: [CommonModule, Carousel, SharedModule],
                    declarations: [Carousel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBRUgsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUVmLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFFUixNQUFNLEVBQ04sV0FBVyxFQUtYLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR2xELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7O0FBQ3pDOzs7R0FHRztBQWdISCxNQUFNLE9BQU8sUUFBUTtJQWtPTjtJQUNBO0lBQ0E7SUFDQztJQUNrQjtJQUNHO0lBQ3JCO0lBdk9KLHdCQUF3QixDQUFDLEtBQWtCLEVBQUUsUUFBaUI7UUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsZ0JB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UUFBUSxDQUFDO2lCQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgTmdab25lLFxuICAgIE91dHB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgbnVtYmVyQXR0cmlidXRlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9vdGVyLCBIZWFkZXIsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENoZXZyb25Eb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbmRvd24nO1xuaW1wb3J0IHsgQ2hldnJvbkxlZnRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGV2cm9ubGVmdCc7XG5pbXBvcnQgeyBDaGV2cm9uUmlnaHRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGV2cm9ucmlnaHQnO1xuaW1wb3J0IHsgQ2hldnJvblVwSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbnVwJztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBDYXJvdXNlbFBhZ2VFdmVudCwgQ2Fyb3VzZWxSZXNwb25zaXZlT3B0aW9ucyB9IGZyb20gJy4vY2Fyb3VzZWwuaW50ZXJmYWNlJztcbmltcG9ydCB7IFByaW1lTkdDb25maWcgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuLyoqXG4gKiBDYXJvdXNlbCBpcyBhIGNvbnRlbnQgc2xpZGVyIGZlYXR1cmluZyB2YXJpb3VzIGN1c3RvbWl6YXRpb24gb3B0aW9ucy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jYXJvdXNlbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbYXR0ci5pZF09XCJpZFwiIFtuZ0NsYXNzXT1cInsgJ3AtY2Fyb3VzZWwgcC1jb21wb25lbnQnOiB0cnVlLCAncC1jYXJvdXNlbC12ZXJ0aWNhbCc6IGlzVmVydGljYWwoKSwgJ3AtY2Fyb3VzZWwtaG9yaXpvbnRhbCc6ICFpc1ZlcnRpY2FsKCkgfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiByb2xlPVwicmVnaW9uXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jYXJvdXNlbC1oZWFkZXJcIiAqbmdJZj1cImhlYWRlckZhY2V0IHx8IGhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgW2NsYXNzXT1cImNvbnRlbnRDbGFzc1wiIFtuZ0NsYXNzXT1cIidwLWNhcm91c2VsLWNvbnRlbnQnXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtY2Fyb3VzZWwtY29udGFpbmVyXCIgW2F0dHIuYXJpYS1saXZlXT1cImFsbG93QXV0b3BsYXkgPyAncG9saXRlJyA6ICdvZmYnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93TmF2aWdhdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWNhcm91c2VsLXByZXYgcC1saW5rJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOiBpc0JhY2t3YXJkTmF2RGlzYWJsZWQoKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0JhY2t3YXJkTmF2RGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFQcmV2QnV0dG9uTGFiZWwoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibmF2QmFja3dhcmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcHJldmlvdXNJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkxlZnRJY29uICpuZ0lmPVwiIWlzVmVydGljYWwoKVwiIFtzdHlsZUNsYXNzXT1cIidjYXJvdXNlbC1wcmV2LWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblVwSWNvbiAqbmdJZj1cImlzVmVydGljYWwoKVwiIFtzdHlsZUNsYXNzXT1cIidjYXJvdXNlbC1wcmV2LWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJwcmV2aW91c0ljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1jYXJvdXNlbC1wcmV2LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwcmV2aW91c0ljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jYXJvdXNlbC1pdGVtcy1jb250ZW50XCIgW25nU3R5bGVdPVwieyBoZWlnaHQ6IGlzVmVydGljYWwoKSA/IHZlcnRpY2FsVmlld1BvcnRIZWlnaHQgOiAnYXV0bycgfVwiICh0b3VjaGVuZCk9XCJvblRvdWNoRW5kKCRldmVudClcIiAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50KVwiICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAjaXRlbXNDb250YWluZXIgY2xhc3M9XCJwLWNhcm91c2VsLWl0ZW1zLWNvbnRhaW5lclwiICh0cmFuc2l0aW9uZW5kKT1cIm9uVHJhbnNpdGlvbkVuZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjbG9uZWRJdGVtc0ZvclN0YXJ0aW5nOyBsZXQgaW5kZXggPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwLWNhcm91c2VsLWl0ZW0gcC1jYXJvdXNlbC1pdGVtLWNsb25lZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncC1jYXJvdXNlbC1pdGVtLWFjdGl2ZSc6IHRvdGFsU2hpZnRlZEl0ZW1zICogLTEgPT09IHZhbHVlLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwLWNhcm91c2VsLWl0ZW0tc3RhcnQnOiAwID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwLWNhcm91c2VsLWl0ZW0tZW5kJzogY2xvbmVkSXRlbXNGb3JTdGFydGluZy5sZW5ndGggLSAxID09PSBpbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiISh0b3RhbFNoaWZ0ZWRJdGVtcyAqIC0xID09PSB2YWx1ZS5sZW5ndGgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhU2xpZGVOdW1iZXIoaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1yb2xlZGVzY3JpcHRpb25dPVwiYXJpYVNsaWRlTGFiZWwoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiB2YWx1ZTsgbGV0IGluZGV4ID0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWNhcm91c2VsLWl0ZW0nOiB0cnVlLCAncC1jYXJvdXNlbC1pdGVtLWFjdGl2ZSc6IGZpcnN0SW5kZXgoKSA8PSBpbmRleCAmJiBsYXN0SW5kZXgoKSA+PSBpbmRleCwgJ3AtY2Fyb3VzZWwtaXRlbS1zdGFydCc6IGZpcnN0SW5kZXgoKSA9PT0gaW5kZXgsICdwLWNhcm91c2VsLWl0ZW0tZW5kJzogbGFzdEluZGV4KCkgPT09IGluZGV4IH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhKHRvdGFsU2hpZnRlZEl0ZW1zICogLTEgPT09IHZhbHVlLmxlbmd0aClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFTbGlkZU51bWJlcihpbmRleClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXJvbGVkZXNjcmlwdGlvbl09XCJhcmlhU2xpZGVMYWJlbCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNsb25lZEl0ZW1zRm9yRmluaXNoaW5nOyBsZXQgaW5kZXggPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwLWNhcm91c2VsLWl0ZW0gcC1jYXJvdXNlbC1pdGVtLWNsb25lZCc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncC1jYXJvdXNlbC1pdGVtLWFjdGl2ZSc6IHRvdGFsU2hpZnRlZEl0ZW1zICogLTEgPT09IG51bVZpc2libGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncC1jYXJvdXNlbC1pdGVtLXN0YXJ0JzogMCA9PT0gaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncC1jYXJvdXNlbC1pdGVtLWVuZCc6IGNsb25lZEl0ZW1zRm9yRmluaXNoaW5nLmxlbmd0aCAtIDEgPT09IGluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW0gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd05hdmlnYXRvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1jYXJvdXNlbC1uZXh0IHAtbGluayc6IHRydWUsICdwLWRpc2FibGVkJzogaXNGb3J3YXJkTmF2RGlzYWJsZWQoKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc0ZvcndhcmROYXZEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJuYXZGb3J3YXJkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTmV4dEJ1dHRvbkxhYmVsKClcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW5leHRJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAqbmdJZj1cIiFpc1ZlcnRpY2FsKClcIiBbc3R5bGVDbGFzc109XCInY2Fyb3VzZWwtcHJldi1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cImlzVmVydGljYWwoKVwiIFtzdHlsZUNsYXNzXT1cIidjYXJvdXNlbC1wcmV2LWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJuZXh0SWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWNhcm91c2VsLXByZXYtaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm5leHRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8dWwgI2luZGljYXRvckNvbnRlbnQgW25nQ2xhc3NdPVwiJ3AtY2Fyb3VzZWwtaW5kaWNhdG9ycyBwLXJlc2V0J1wiIFtjbGFzc109XCJpbmRpY2F0b3JzQ29udGVudENsYXNzXCIgW25nU3R5bGVdPVwiaW5kaWNhdG9yc0NvbnRlbnRTdHlsZVwiICpuZ0lmPVwic2hvd0luZGljYXRvcnNcIiAoa2V5ZG93bik9XCJvbkluZGljYXRvcktleWRvd24oJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHRvdGFsRG90IG9mIHRvdGFsRG90c0FycmF5KCk7IGxldCBpID0gaW5kZXhcIiBbbmdDbGFzc109XCJ7ICdwLWNhcm91c2VsLWluZGljYXRvcic6IHRydWUsICdwLWhpZ2hsaWdodCc6IF9wYWdlID09PSBpIH1cIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2luZGljYXRvcidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIncC1saW5rJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRG90Q2xpY2soJGV2ZW50LCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImluZGljYXRvclN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImluZGljYXRvclN0eWxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFQYWdlTGFiZWwoaSArIDEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWN1cnJlbnRdPVwiX3BhZ2UgPT09IGkgPyAncGFnZScgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YWJpbmRleF09XCJfcGFnZSA9PT0gaSA/IDAgOiAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtY2Fyb3VzZWwtZm9vdGVyXCIgKm5nSWY9XCJmb290ZXJGYWNldCB8fCBmb290ZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9jYXJvdXNlbC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBwcml2YXRlIHVwZGF0ZVNsaWRlQWNjZXNzaWJpbGl0eShzbGlkZTogSFRNTEVsZW1lbnQsIGlzQWN0aXZlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gc2xpZGUucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oJ2EsIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFt0YWJpbmRleF0nKTtcbiAgICAgICAgZm9jdXNhYmxlRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC50YWJJbmRleCA9IGlzQWN0aXZlID8gMCA6IC0xO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUNhcm91c2VsSXRlbXNBY2Nlc3NpYmlsaXR5KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzbGlkZXMgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnAtY2Fyb3VzZWwtaXRlbScpO1xuICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGluZGV4ID09PSB0aGlzLl9wYWdlO1xuICAgICAgICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICFpc0FjdGl2ZSA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTbGlkZUFjY2Vzc2liaWxpdHkoc2xpZGUgYXMgSFRNTEVsZW1lbnQsIGlzQWN0aXZlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0uXG4gICAgICogQGRlZmF1bHRWYWx1ZSAwXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHBhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2U7XG4gICAgfVxuICAgIHNldCBwYWdlKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ3JlYXRlZCAmJiB2YWwgIT09IHRoaXMuX3BhZ2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsID4gdGhpcy5fcGFnZSAmJiB2YWwgPD0gdGhpcy50b3RhbERvdHMoKSAtIDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXAoLTEsIHZhbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbCA8IHRoaXMuX3BhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXAoMSwgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BhZ2UgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZS5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIDFcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbnVtVmlzaWJsZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbnVtVmlzaWJsZTtcbiAgICB9XG4gICAgc2V0IG51bVZpc2libGUodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbnVtVmlzaWJsZSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIGl0ZW1zIHRvIHNjcm9sbC5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIDFcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbnVtU2Nyb2xsKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9udW1WaXNpYmxlO1xuICAgIH1cbiAgICBzZXQgbnVtU2Nyb2xsKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX251bVNjcm9sbCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2Ygb3B0aW9ucyBmb3IgcmVzcG9uc2l2ZSBkZXNpZ24uXG4gICAgICogQHNlZSB7Q2Fyb3VzZWxSZXNwb25zaXZlT3B0aW9uc31cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByZXNwb25zaXZlT3B0aW9uczogQ2Fyb3VzZWxSZXNwb25zaXZlT3B0aW9uc1tdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgbGF5b3V0IG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiB2ZXJ0aWNhbCBsYXlvdXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmVydGljYWxWaWV3UG9ydEhlaWdodDogc3RyaW5nID0gJzMwMHB4JztcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiBtYWluIGNvbnRlbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY29udGVudENsYXNzOiBzdHJpbmcgPSAnJztcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgaW5kaWNhdG9yIGl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGluZGljYXRvcnNDb250ZW50Q2xhc3M6IHN0cmluZyA9ICcnO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgaW5kaWNhdG9yIGl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGluZGljYXRvcnNDb250ZW50U3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGluZGljYXRvcnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW5kaWNhdG9yU3R5bGVDbGFzczogc3RyaW5nID0gJyc7XG4gICAgLyoqXG4gICAgICogU3R5bGUgb2YgdGhlIGluZGljYXRvcnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW5kaWNhdG9yU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBkaXNwbGF5LlxuICAgICAqIEBkZWZhdWx0VmFsdWUgbnVsbFxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZSBhcyBhbnlbXTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbCkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBzY3JvbGxpbmcgd291bGQgYmUgaW5maW5pdGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGNpcmN1bGFyOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IGluZGljYXRvciBjb250YWluZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dJbmRpY2F0b3JzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgbmF2aWdhdGlvbiBidXR0b25zIGluIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd05hdmlnYXRvcnM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIHNjcm9sbCBpdGVtcyBhdXRvbWF0aWNhbGx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGF1dG9wbGF5SW50ZXJ2YWw6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIHZpZXdwb3J0IGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGFmdGVyIHNjcm9sbC5cbiAgICAgKiBAcGFyYW0ge0Nhcm91c2VsUGFnZUV2ZW50fSBldmVudCAtIEN1c3RvbSBwYWdlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblBhZ2U6IEV2ZW50RW1pdHRlcjxDYXJvdXNlbFBhZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPENhcm91c2VsUGFnZUV2ZW50PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnaXRlbXNDb250YWluZXInKSBpdGVtc0NvbnRhaW5lcjogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2luZGljYXRvckNvbnRlbnQnKSBpbmRpY2F0b3JDb250ZW50OiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIpIGhlYWRlckZhY2V0OiBRdWVyeUxpc3Q8SGVhZGVyPiB8IHVuZGVmaW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXJGYWNldDogUXVlcnlMaXN0PEZvb3Rlcj4gfCB1bmRlZmluZWQ7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgX251bVZpc2libGU6IG51bWJlciA9IDE7XG5cbiAgICBfbnVtU2Nyb2xsOiBudW1iZXIgPSAxO1xuXG4gICAgX29sZE51bVNjcm9sbDogbnVtYmVyID0gMDtcblxuICAgIHByZXZTdGF0ZTogYW55ID0ge1xuICAgICAgICBudW1TY3JvbGw6IDAsXG4gICAgICAgIG51bVZpc2libGU6IDAsXG4gICAgICAgIHZhbHVlOiBbXVxuICAgIH07XG5cbiAgICBkZWZhdWx0TnVtU2Nyb2xsOiBudW1iZXIgPSAxO1xuXG4gICAgZGVmYXVsdE51bVZpc2libGU6IG51bWJlciA9IDE7XG5cbiAgICBfcGFnZTogbnVtYmVyID0gMDtcblxuICAgIF92YWx1ZTogYW55W10gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgY2Fyb3VzZWxTdHlsZTogYW55O1xuXG4gICAgaWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIHRvdGFsU2hpZnRlZEl0ZW1zO1xuXG4gICAgaXNSZW1haW5pbmdJdGVtc0FkZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBhbmltYXRpb25UaW1lb3V0OiBhbnk7XG5cbiAgICB0cmFuc2xhdGVUaW1lb3V0OiBhbnk7XG5cbiAgICByZW1haW5pbmdJdGVtczogbnVtYmVyID0gMDtcblxuICAgIF9pdGVtczogYW55W10gfCB1bmRlZmluZWQ7XG5cbiAgICBzdGFydFBvczogYW55O1xuXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xuXG4gICAgY2xvbmVkSXRlbXNGb3JTdGFydGluZzogYW55W10gfCB1bmRlZmluZWQ7XG5cbiAgICBjbG9uZWRJdGVtc0ZvckZpbmlzaGluZzogYW55W10gfCB1bmRlZmluZWQ7XG5cbiAgICBhbGxvd0F1dG9wbGF5OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgaW50ZXJ2YWw6IGFueTtcblxuICAgIGlzQ3JlYXRlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHN3aXBlVGhyZXNob2xkOiBudW1iZXIgPSAyMDtcblxuICAgIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwcmV2aW91c0ljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIG5leHRJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICB3aW5kb3c6IFdpbmRvdztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyB6b25lOiBOZ1pvbmUsXG4gICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LFxuICAgICAgICBwcml2YXRlIGNvbmZpZzogUHJpbWVOR0NvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy5wYWdlICogdGhpcy5udW1TY3JvbGwgKiAtMTtcbiAgICAgICAgdGhpcy53aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIFdpbmRvdztcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaXJjdWxhciAmJiB0aGlzLl92YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENsb25lSXRlbXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ3JlYXRlZCkge1xuICAgICAgICAgICAgICAgIGlmIChzaW1wbGVDaGFuZ2UubnVtVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0TnVtVmlzaWJsZSA9IHRoaXMubnVtVmlzaWJsZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2lyY3VsYXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDbG9uZUl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLm51bVNjcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0TnVtU2Nyb2xsID0gdGhpcy5udW1TY3JvbGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuaWQgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy5hbGxvd0F1dG9wbGF5ID0gISF0aGlzLmF1dG9wbGF5SW50ZXJ2YWw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNpcmN1bGFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDbG9uZUl0ZW1zKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0TnVtU2Nyb2xsID0gdGhpcy5fbnVtU2Nyb2xsO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdE51bVZpc2libGUgPSB0aGlzLl9udW1WaXNpYmxlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwcmV2aW91c2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICduZXh0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQ2lyY3VsYXIgPSB0aGlzLmlzQ2lyY3VsYXIoKTtcbiAgICAgICAgICAgIGxldCB0b3RhbFNoaWZ0ZWRJdGVtcyA9IHRoaXMudG90YWxTaGlmdGVkSXRlbXM7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMuaXRlbXNDb250YWluZXIgJiYgKHRoaXMucHJldlN0YXRlLm51bVNjcm9sbCAhPT0gdGhpcy5fbnVtU2Nyb2xsIHx8IHRoaXMucHJldlN0YXRlLm51bVZpc2libGUgIT09IHRoaXMuX251bVZpc2libGUgfHwgdGhpcy5wcmV2U3RhdGUudmFsdWUubGVuZ3RoICE9PSB0aGlzLnZhbHVlLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9wbGF5KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbmluZ0l0ZW1zID0gKHRoaXMudmFsdWUubGVuZ3RoIC0gdGhpcy5fbnVtVmlzaWJsZSkgJSB0aGlzLl9udW1TY3JvbGw7XG5cbiAgICAgICAgICAgICAgICBsZXQgcGFnZSA9IHRoaXMuX3BhZ2U7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudG90YWxEb3RzKCkgIT09IDAgJiYgcGFnZSA+PSB0aGlzLnRvdGFsRG90cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2UgPSB0aGlzLnRvdGFsRG90cygpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFnZSA9IHBhZ2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25QYWdlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gcGFnZSAqIHRoaXMuX251bVNjcm9sbCAqIC0xO1xuICAgICAgICAgICAgICAgIGlmIChpc0NpcmN1bGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zIC09IHRoaXMuX251bVZpc2libGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UgPT09IHRoaXMudG90YWxEb3RzKCkgLSAxICYmIHRoaXMucmVtYWluaW5nSXRlbXMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zICs9IC0xICogdGhpcy5yZW1haW5pbmdJdGVtcyArIHRoaXMuX251bVNjcm9sbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRvdGFsU2hpZnRlZEl0ZW1zICE9PSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0b3RhbFNoaWZ0ZWRJdGVtcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9vbGROdW1TY3JvbGwgPSB0aGlzLl9udW1TY3JvbGw7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2U3RhdGUubnVtU2Nyb2xsID0gdGhpcy5fbnVtU2Nyb2xsO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldlN0YXRlLm51bVZpc2libGUgPSB0aGlzLl9udW1WaXNpYmxlO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldlN0YXRlLnZhbHVlID0gWy4uLih0aGlzLl92YWx1ZSBhcyBhbnlbXSldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudG90YWxEb3RzKCkgPiAwICYmIHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy5pc1ZlcnRpY2FsKCkgPyBgdHJhbnNsYXRlM2QoMCwgJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAgLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAgLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwLCAwKWA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NyZWF0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCAmJiB0aGlzLmlzQXV0b3BsYXkoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0NpcmN1bGFyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyA9IC0xICogdGhpcy5fbnVtVmlzaWJsZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRvdGFsU2hpZnRlZEl0ZW1zID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gLTEgKiB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtYWluaW5nSXRlbXMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodG90YWxTaGlmdGVkSXRlbXMgIT09IHRoaXMudG90YWxTaGlmdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRvdGFsU2hpZnRlZEl0ZW1zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVN0eWxlKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2Fyb3VzZWxTdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbFN0eWxlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgdGhpcy5jYXJvdXNlbFN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5zZXRBdHRyaWJ1dGUodGhpcy5jYXJvdXNlbFN0eWxlLCAnbm9uY2UnLCB0aGlzLmNvbmZpZz8uY3NwKCk/Lm5vbmNlKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCB0aGlzLmNhcm91c2VsU3R5bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICMke3RoaXMuaWR9IC5wLWNhcm91c2VsLWl0ZW0ge1xuXHRcdFx0XHRmbGV4OiAxIDAgJHsxMDAgLyB0aGlzLm51bVZpc2libGV9JVxuXHRcdFx0fVxuICAgICAgICBgO1xuXG4gICAgICAgIGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNpdmVPcHRpb25zLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlMSA9IGRhdGExLmJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUyID0gZGF0YTIuYnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgIT0gbnVsbCkgcmVzdWx0ID0gLTE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxICE9IG51bGwgJiYgdmFsdWUyID09IG51bGwpIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpIHJlc3VsdCA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlMSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlMiA9PT0gJ3N0cmluZycpIHJlc3VsdCA9IHZhbHVlMS5sb2NhbGVDb21wYXJlKHZhbHVlMiwgdW5kZWZpbmVkLCB7IG51bWVyaWM6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgZWxzZSByZXN1bHQgPSB2YWx1ZTEgPCB2YWx1ZTIgPyAtMSA6IHZhbHVlMSA+IHZhbHVlMiA/IDEgOiAwO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xICogcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZXNwb25zaXZlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLnJlc3BvbnNpdmVPcHRpb25zW2ldO1xuXG4gICAgICAgICAgICAgICAgaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtyZXMuYnJlYWtwb2ludH0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICMke3RoaXMuaWR9IC5wLWNhcm91c2VsLWl0ZW0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEgMCAkezEwMCAvIHJlcy5udW1WaXNpYmxlfSVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhcm91c2VsU3R5bGUuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuICAgICAgICAgICAgbGV0IG1hdGNoZWRSZXNwb25zaXZlRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBudW1WaXNpYmxlOiB0aGlzLmRlZmF1bHROdW1WaXNpYmxlLFxuICAgICAgICAgICAgICAgIG51bVNjcm9sbDogdGhpcy5kZWZhdWx0TnVtU2Nyb2xsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnNbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHJlcy5icmVha3BvaW50LCAxMCkgPj0gd2luZG93V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWRSZXNwb25zaXZlRGF0YSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX251bVNjcm9sbCAhPT0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVNjcm9sbCkge1xuICAgICAgICAgICAgICAgIGxldCBwYWdlID0gdGhpcy5fcGFnZTtcbiAgICAgICAgICAgICAgICBwYWdlID0gTWF0aC5mbG9vcigocGFnZSAqIHRoaXMuX251bVNjcm9sbCkgLyBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtU2Nyb2xsKTtcblxuICAgICAgICAgICAgICAgIGxldCB0b3RhbFNoaWZ0ZWRJdGVtcyA9IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1TY3JvbGwgKiB0aGlzLnBhZ2UgKiAtMTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2lyY3VsYXIoKSkge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyAtPSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtVmlzaWJsZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG4gICAgICAgICAgICAgICAgdGhpcy5fbnVtU2Nyb2xsID0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVNjcm9sbDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2UgPSBwYWdlO1xuICAgICAgICAgICAgICAgIHRoaXMub25QYWdlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX251bVZpc2libGUgIT09IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbnVtVmlzaWJsZSA9IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2xvbmVJdGVtcygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q2xvbmVJdGVtcygpIHtcbiAgICAgICAgdGhpcy5jbG9uZWRJdGVtc0ZvclN0YXJ0aW5nID0gW107XG4gICAgICAgIHRoaXMuY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmcgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuaXNDaXJjdWxhcigpKSB7XG4gICAgICAgICAgICB0aGlzLmNsb25lZEl0ZW1zRm9yU3RhcnRpbmcucHVzaCguLi50aGlzLnZhbHVlLnNsaWNlKC0xICogdGhpcy5fbnVtVmlzaWJsZSkpO1xuICAgICAgICAgICAgdGhpcy5jbG9uZWRJdGVtc0ZvckZpbmlzaGluZy5wdXNoKC4uLnRoaXMudmFsdWUuc2xpY2UoMCwgdGhpcy5fbnVtVmlzaWJsZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlyc3RJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNDaXJjdWxhcigpID8gLTEgKiAodGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyArIHRoaXMubnVtVmlzaWJsZSkgOiB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICogLTE7XG4gICAgfVxuXG4gICAgbGFzdEluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maXJzdEluZGV4KCkgKyB0aGlzLm51bVZpc2libGUgLSAxO1xuICAgIH1cblxuICAgIHRvdGFsRG90cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU/Lmxlbmd0aCA/IE1hdGguY2VpbCgodGhpcy52YWx1ZS5sZW5ndGggLSB0aGlzLl9udW1WaXNpYmxlKSAvIHRoaXMuX251bVNjcm9sbCkgKyAxIDogMDtcbiAgICB9XG5cbiAgICB0b3RhbERvdHNBcnJheSgpIHtcbiAgICAgICAgY29uc3QgdG90YWxEb3RzID0gdGhpcy50b3RhbERvdHMoKTtcbiAgICAgICAgcmV0dXJuIHRvdGFsRG90cyA8PSAwID8gW10gOiBBcnJheSh0b3RhbERvdHMpLmZpbGwoMCk7XG4gICAgfVxuXG4gICAgaXNWZXJ0aWNhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCc7XG4gICAgfVxuXG4gICAgaXNDaXJjdWxhcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2lyY3VsYXIgJiYgdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA+PSB0aGlzLm51bVZpc2libGU7XG4gICAgfVxuXG4gICAgaXNBdXRvcGxheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0b3BsYXlJbnRlcnZhbCAmJiB0aGlzLmFsbG93QXV0b3BsYXk7XG4gICAgfVxuXG4gICAgaXNGb3J3YXJkTmF2RGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRW1wdHkoKSB8fCAodGhpcy5fcGFnZSA+PSB0aGlzLnRvdGFsRG90cygpIC0gMSAmJiAhdGhpcy5pc0NpcmN1bGFyKCkpO1xuICAgIH1cblxuICAgIGlzQmFja3dhcmROYXZEaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNFbXB0eSgpIHx8ICh0aGlzLl9wYWdlIDw9IDAgJiYgIXRoaXMuaXNDaXJjdWxhcigpKTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZS5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgbmF2Rm9yd2FyZChlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgaW5kZXg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDaXJjdWxhcigpIHx8IHRoaXMuX3BhZ2UgPCB0aGlzLnRvdGFsRG90cygpIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5zdGVwKC0xLCBpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUgJiYgZS5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZCYWNrd2FyZChlOiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgaW5kZXg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDaXJjdWxhcigpIHx8IHRoaXMuX3BhZ2UgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcCgxLCBpbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUgJiYgZS5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRvdENsaWNrKGU6IE1vdXNlRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLl9wYWdlO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcEF1dG9wbGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5kZXggPiBwYWdlKSB7XG4gICAgICAgICAgICB0aGlzLm5hdkZvcndhcmQoZSwgaW5kZXgpO1xuICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgcGFnZSkge1xuICAgICAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChlLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkluZGljYXRvcktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uUmlnaHRLZXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGVmdEtleSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25SaWdodEtleSgpIHtcbiAgICAgICAgY29uc3QgaW5kaWNhdG9ycyA9IFsuLi5Eb21IYW5kbGVyLmZpbmQodGhpcy5pbmRpY2F0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiaW5kaWNhdG9yXCJdJyldO1xuICAgICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHRoaXMuZmluZEZvY3VzZWRJbmRpY2F0b3JJbmRleCgpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlZEZvY3VzZWRJbmRpY2F0b3IoYWN0aXZlSW5kZXgsIGFjdGl2ZUluZGV4ICsgMSA9PT0gaW5kaWNhdG9ycy5sZW5ndGggPyBpbmRpY2F0b3JzLmxlbmd0aCAtIDEgOiBhY3RpdmVJbmRleCArIDEpO1xuICAgIH1cblxuICAgIG9uTGVmdEtleSgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSB0aGlzLmZpbmRGb2N1c2VkSW5kaWNhdG9ySW5kZXgoKTtcblxuICAgICAgICB0aGlzLmNoYW5nZWRGb2N1c2VkSW5kaWNhdG9yKGFjdGl2ZUluZGV4LCBhY3RpdmVJbmRleCAtIDEgPD0gMCA/IDAgOiBhY3RpdmVJbmRleCAtIDEpO1xuICAgIH1cbiAgICBvbkhvbWVLZXkoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gdGhpcy5maW5kRm9jdXNlZEluZGljYXRvckluZGV4KCk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VkRm9jdXNlZEluZGljYXRvcihhY3RpdmVJbmRleCwgMCk7XG4gICAgfVxuXG4gICAgb25FbmRLZXkoKSB7XG4gICAgICAgIGNvbnN0IGluZGljYXRvcnMgPSBbLi4uRG9tSGFuZGxlci5maW5kKHRoaXMuaW5kaWNhdG9yQ29udGVudC5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImluZGljYXRvclwiXXInKV07XG4gICAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gdGhpcy5maW5kRm9jdXNlZEluZGljYXRvckluZGV4KCk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VkRm9jdXNlZEluZGljYXRvcihhY3RpdmVJbmRleCwgaW5kaWNhdG9ycy5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICBvblRhYktleSgpIHtcbiAgICAgICAgY29uc3QgaW5kaWNhdG9ycyA9IFsuLi5Eb21IYW5kbGVyLmZpbmQodGhpcy5pbmRpY2F0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiaW5kaWNhdG9yXCJdJyldO1xuICAgICAgICBjb25zdCBoaWdobGlnaHRlZEluZGV4ID0gaW5kaWNhdG9ycy5maW5kSW5kZXgoKGluZCkgPT4gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoaW5kLCAnZGF0YS1wLWhpZ2hsaWdodCcpID09PSB0cnVlKTtcblxuICAgICAgICBjb25zdCBhY3RpdmVJbmRpY2F0b3IgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5pbmRpY2F0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiaW5kaWNhdG9yXCJdID4gYnV0dG9uW3RhYmluZGV4PVwiMFwiXScpO1xuICAgICAgICBjb25zdCBhY3RpdmVJbmRleCA9IGluZGljYXRvcnMuZmluZEluZGV4KChpbmQpID0+IGluZCA9PT0gYWN0aXZlSW5kaWNhdG9yLnBhcmVudEVsZW1lbnQpO1xuXG4gICAgICAgIGluZGljYXRvcnNbYWN0aXZlSW5kZXhdLmNoaWxkcmVuWzBdLnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgaW5kaWNhdG9yc1toaWdobGlnaHRlZEluZGV4XS5jaGlsZHJlblswXS50YWJJbmRleCA9ICcwJztcbiAgICB9XG5cbiAgICBmaW5kRm9jdXNlZEluZGljYXRvckluZGV4KCkge1xuICAgICAgICBjb25zdCBpbmRpY2F0b3JzID0gWy4uLkRvbUhhbmRsZXIuZmluZCh0aGlzLmluZGljYXRvckNvbnRlbnQubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJpbmRpY2F0b3JcIl0nKV07XG4gICAgICAgIGNvbnN0IGFjdGl2ZUluZGljYXRvciA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmluZGljYXRvckNvbnRlbnQubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJpbmRpY2F0b3JcIl0gPiBidXR0b25bdGFiaW5kZXg9XCIwXCJdJyk7XG5cbiAgICAgICAgcmV0dXJuIGluZGljYXRvcnMuZmluZEluZGV4KChpbmQpID0+IGluZCA9PT0gYWN0aXZlSW5kaWNhdG9yLnBhcmVudEVsZW1lbnQpO1xuICAgIH1cblxuICAgIGNoYW5nZWRGb2N1c2VkSW5kaWNhdG9yKHByZXZJbmQsIG5leHRJbmQpIHtcbiAgICAgICAgY29uc3QgaW5kaWNhdG9ycyA9IFsuLi5Eb21IYW5kbGVyLmZpbmQodGhpcy5pbmRpY2F0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiaW5kaWNhdG9yXCJdJyldO1xuXG4gICAgICAgIGluZGljYXRvcnNbcHJldkluZF0uY2hpbGRyZW5bMF0udGFiSW5kZXggPSAnLTEnO1xuICAgICAgICBpbmRpY2F0b3JzW25leHRJbmRdLmNoaWxkcmVuWzBdLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICBpbmRpY2F0b3JzW25leHRJbmRdLmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgc3RlcChkaXI6IG51bWJlciwgcGFnZT86IG51bWJlcikge1xuICAgICAgICBsZXQgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xuICAgICAgICBjb25zdCBpc0NpcmN1bGFyID0gdGhpcy5pc0NpcmN1bGFyKCk7XG5cbiAgICAgICAgaWYgKHBhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLl9udW1TY3JvbGwgKiBwYWdlICogLTE7XG5cbiAgICAgICAgICAgIGlmIChpc0NpcmN1bGFyKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgLT0gdGhpcy5fbnVtVmlzaWJsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zICs9IHRoaXMuX251bVNjcm9sbCAqIGRpcjtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCkge1xuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zICs9IHRoaXMucmVtYWluaW5nSXRlbXMgLSB0aGlzLl9udW1TY3JvbGwgKiBkaXI7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG9yaWdpbmFsU2hpZnRlZEl0ZW1zID0gaXNDaXJjdWxhciA/IHRvdGFsU2hpZnRlZEl0ZW1zICsgdGhpcy5fbnVtVmlzaWJsZSA6IHRvdGFsU2hpZnRlZEl0ZW1zO1xuICAgICAgICAgICAgcGFnZSA9IE1hdGguYWJzKE1hdGguZmxvb3Iob3JpZ2luYWxTaGlmdGVkSXRlbXMgLyB0aGlzLl9udW1TY3JvbGwpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0NpcmN1bGFyICYmIHRoaXMucGFnZSA9PT0gdGhpcy50b3RhbERvdHMoKSAtIDEgJiYgZGlyID09PSAtMSkge1xuICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAtMSAqICh0aGlzLnZhbHVlLmxlbmd0aCArIHRoaXMuX251bVZpc2libGUpO1xuICAgICAgICAgICAgcGFnZSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNDaXJjdWxhciAmJiB0aGlzLnBhZ2UgPT09IDAgJiYgZGlyID09PSAxKSB7XG4gICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyA9IDA7XG4gICAgICAgICAgICBwYWdlID0gdGhpcy50b3RhbERvdHMoKSAtIDE7XG4gICAgICAgIH0gZWxzZSBpZiAocGFnZSA9PT0gdGhpcy50b3RhbERvdHMoKSAtIDEgJiYgdGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcbiAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zICs9IHRoaXMucmVtYWluaW5nSXRlbXMgKiAtMSAtIHRoaXMuX251bVNjcm9sbCAqIGRpcjtcbiAgICAgICAgICAgIHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLml0ZW1zQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy5pc1ZlcnRpY2FsKCkgPyBgdHJhbnNsYXRlM2QoMCwgJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAgLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAgLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwLCAwKWA7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gNTAwbXMgZWFzZSAwcyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG4gICAgICAgIHRoaXMuX3BhZ2UgPSBwYWdlO1xuICAgICAgICB0aGlzLm9uUGFnZS5lbWl0KHtcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy51cGRhdGVDYXJvdXNlbEl0ZW1zQWNjZXNzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIHN0YXJ0QXV0b3BsYXkoKSB7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50b3RhbERvdHMoKSA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlID09PSB0aGlzLnRvdGFsRG90cygpIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXAoLTEsIDApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcCgtMSwgdGhpcy5wYWdlICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLmFsbG93QXV0b3BsYXkgPSB0cnVlO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHN0b3BBdXRvcGxheShjaGFuZ2VBbGxvdzogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGNoYW5nZUFsbG93KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxvd0F1dG9wbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBpc1BsYXlpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuaW50ZXJ2YWw7XG4gICAgfVxuXG4gICAgb25UcmFuc2l0aW9uRW5kKCkge1xuICAgICAgICBpZiAodGhpcy5pdGVtc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnJztcblxuICAgICAgICAgICAgaWYgKCh0aGlzLnBhZ2UgPT09IDAgfHwgdGhpcy5wYWdlID09PSB0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgdGhpcy5pc0NpcmN1bGFyKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy5pc1ZlcnRpY2FsKCkgPyBgdHJhbnNsYXRlM2QoMCwgJHt0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICogKDEwMCAvIHRoaXMuX251bVZpc2libGUpfSUsIDApYCA6IGB0cmFuc2xhdGUzZCgke3RoaXMudG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwIC8gdGhpcy5fbnVtVmlzaWJsZSl9JSwgMCwgMClgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaFN0YXJ0KGU6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblxuICAgICAgICB0aGlzLnN0YXJ0UG9zID0ge1xuICAgICAgICAgICAgeDogdG91Y2hvYmoucGFnZVgsXG4gICAgICAgICAgICB5OiB0b3VjaG9iai5wYWdlWVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uVG91Y2hNb3ZlKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblRvdWNoRW5kKGU6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblxuICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZU9uVG91Y2goZSwgdG91Y2hvYmoucGFnZVkgLSB0aGlzLnN0YXJ0UG9zLnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlT25Ub3VjaChlLCB0b3VjaG9iai5wYWdlWCAtIHRoaXMuc3RhcnRQb3MueCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlT25Ub3VjaChlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCwgZGlmZjogbnVtYmVyKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaWZmKSA+IHRoaXMuc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGlmIChkaWZmIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubmF2Rm9yd2FyZChlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZCYWNrd2FyZChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFyaWFQcmV2QnV0dG9uTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5wcmV2UGFnZUxhYmVsIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGFyaWFTbGlkZUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuc2xpZGUgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgYXJpYU5leHRCdXR0b25MYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLm5leHRQYWdlTGFiZWwgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgYXJpYVNsaWRlTnVtYmVyKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5zbGlkZU51bWJlci5yZXBsYWNlKC97c2xpZGVOdW1iZXJ9L2csIHZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBhcmlhUGFnZUxhYmVsKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5wYWdlTGFiZWwucmVwbGFjZSgve3BhZ2V9L2csIHZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMud2luZG93LCAncmVzaXplJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBDaGV2cm9uUmlnaHRJY29uLCBDaGV2cm9uTGVmdEljb24sIENoZXZyb25Eb3duSWNvbiwgQ2hldnJvblVwSWNvbl0sXG4gICAgZXhwb3J0czogW0NvbW1vbk1vZHVsZSwgQ2Fyb3VzZWwsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ2Fyb3VzZWxdXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsTW9kdWxlIHt9XG4iXX0=