import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/tooltip";
import * as i3 from "primeng/ripple";
/**
 * TabPanel is a helper component for TabView component.
 * @group Components
 */
export class TabPanel {
    el;
    viewContainer;
    cd;
    /**
     * Defines if tab can be removed.
     * @group Props
     */
    closable = false;
    /**
     * Inline style of the tab header.
     * @group Props
     */
    get headerStyle() {
        return this._headerStyle;
    }
    set headerStyle(headerStyle) {
        this._headerStyle = headerStyle;
        this.tabView.cd.markForCheck();
    }
    /**
     * Style class of the tab header.
     * @group Props
     */
    get headerStyleClass() {
        return this._headerStyleClass;
    }
    set headerStyleClass(headerStyleClass) {
        this._headerStyleClass = headerStyleClass;
        this.tabView.cd.markForCheck();
    }
    /**
     * Whether a lazy loaded panel should avoid getting loaded again on reselection.
     * @group Props
     */
    cache = true;
    /**
     * Advisory information to display in a tooltip on hover.
     * @group Props
     */
    tooltip;
    /**
     * Position of the tooltip.
     * @group Props
     */
    tooltipPosition = 'top';
    /**
     * Type of CSS position.
     * @group Props
     */
    tooltipPositionStyle = 'absolute';
    /**
     * Style class of the tooltip.
     * @group Props
     */
    tooltipStyleClass;
    /**
     * Defines if tab is active.
     * @defaultValue false
     * @group Props
     */
    get selected() {
        return !!this._selected;
    }
    set selected(val) {
        this._selected = val;
        if (!this.loaded) {
            this.cd.detectChanges();
        }
        if (val)
            this.loaded = true;
    }
    /**
     * When true, tab cannot be activated.
     * @defaultValue false
     * @group Props
     */
    get disabled() {
        return !!this._disabled;
    }
    set disabled(disabled) {
        this._disabled = disabled;
        this.tabView.cd.markForCheck();
    }
    /**
     * Title of the tabPanel.
     * @group Props
     */
    get header() {
        return this._header;
    }
    set header(header) {
        this._header = header;
        // We have to wait for the rendering and then retrieve the actual size element from the DOM.
        // in future `Promise.resolve` can be changed to `queueMicrotask` (if ie11 support will be dropped)
        Promise.resolve().then(() => {
            this.tabView.updateInkBar();
            this.tabView.cd.markForCheck();
        });
    }
    /**
     * Left icon of the tabPanel.
     * @group Props
     * @deprecated since v15.4.2, use `lefticon` template instead.
     */
    get leftIcon() {
        return this._leftIcon;
    }
    set leftIcon(leftIcon) {
        this._leftIcon = leftIcon;
        this.tabView.cd.markForCheck();
    }
    /**
     * Left icon of the tabPanel.
     * @group Props
     * @deprecated since v15.4.2, use `righticon` template instead.
     */
    get rightIcon() {
        return this._rightIcon;
    }
    set rightIcon(rightIcon) {
        this._rightIcon = rightIcon;
        this.tabView.cd.markForCheck();
    }
    templates;
    closed = false;
    view = null;
    _headerStyle;
    _headerStyleClass;
    _selected;
    _disabled;
    _header;
    _leftIcon;
    _rightIcon = undefined;
    loaded = false;
    id;
    contentTemplate;
    headerTemplate;
    leftIconTemplate;
    rightIconTemplate;
    closeIconTemplate;
    tabView;
    constructor(tabView, el, viewContainer, cd) {
        this.el = el;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.tabView = tabView;
        this.id = UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'righticon':
                    this.rightIconTemplate = item.template;
                    break;
                case 'lefticon':
                    this.leftIconTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    ngOnDestroy() {
        this.view = null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabPanel, deps: [{ token: forwardRef(() => TabView) }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: TabPanel, selector: "p-tabPanel", inputs: { closable: ["closable", "closable", booleanAttribute], headerStyle: "headerStyle", headerStyleClass: "headerStyleClass", cache: ["cache", "cache", booleanAttribute], tooltip: "tooltip", tooltipPosition: "tooltipPosition", tooltipPositionStyle: "tooltipPositionStyle", tooltipStyleClass: "tooltipStyleClass", selected: "selected", disabled: "disabled", header: "header", leftIcon: "leftIcon", rightIcon: "rightIcon" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div
            *ngIf="!closed"
            class="p-tabview-panel"
            role="tabpanel"
            [hidden]="!selected"
            [attr.id]="tabView.getTabContentId(id)"
            [attr.aria-hidden]="!selected"
            [attr.aria-labelledby]="tabView.getTabHeaderActionId(id)"
            [attr.data-pc-name]="'tabpanel'"
        >
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabPanel, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tabPanel',
                    template: `
        <div
            *ngIf="!closed"
            class="p-tabview-panel"
            role="tabpanel"
            [hidden]="!selected"
            [attr.id]="tabView.getTabContentId(id)"
            [attr.aria-hidden]="!selected"
            [attr.aria-labelledby]="tabView.getTabHeaderActionId(id)"
            [attr.data-pc-name]="'tabpanel'"
        >
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: TabView, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => TabView)]
                }] }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }], propDecorators: { closable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], headerStyle: [{
                type: Input
            }], headerStyleClass: [{
                type: Input
            }], cache: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tooltip: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], tooltipPositionStyle: [{
                type: Input
            }], tooltipStyleClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], header: [{
                type: Input
            }], leftIcon: [{
                type: Input
            }], rightIcon: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
/**
 * TabView is a container component to group content with tabs.
 * @group Components
 */
export class TabView {
    platformId;
    el;
    cd;
    renderer;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Whether tab close is controlled at onClose event or not.
     * @defaultValue false
     * @group Props
     */
    controlClose;
    /**
     * When enabled displays buttons at each side of the tab headers to scroll the tab list.
     * @defaultValue false
     * @group Props
     */
    scrollable;
    /**
     * Index of the active tab to change selected tab programmatically.
     * @group Props
     */
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(val) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }
        if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            this.findSelectedTab().selected = false;
            this.tabs[this._activeIndex].selected = true;
            this.tabChanged = true;
            this.updateScrollBar(val);
        }
    }
    /**
     * When enabled, the focused tab is activated.
     * @group Props
     */
    selectOnFocus = false;
    /**
     * Used to define a string aria label attribute the forward navigation button.
     * @group Props
     */
    nextButtonAriaLabel;
    /**
     * Used to define a string aria label attribute the backward navigation button.
     * @group Props
     */
    prevButtonAriaLabel;
    /**
     * When activated, navigation buttons will automatically hide or show based on the available space within the container.
     * @group Props
     */
    autoHideButtons = true;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Callback to invoke on tab change.
     * @param {TabViewChangeEvent} event - Custom tab change event
     * @group Emits
     */
    onChange = new EventEmitter();
    /**
     * Callback to invoke on tab close.
     * @param {TabViewCloseEvent} event - Custom tab close event
     * @group Emits
     */
    onClose = new EventEmitter();
    /**
     * Callback to invoke on the active tab change.
     * @param {number} index - New active index
     * @group Emits
     */
    activeIndexChange = new EventEmitter();
    content;
    navbar;
    prevBtn;
    nextBtn;
    inkbar;
    tabPanels;
    templates;
    initialized;
    tabs;
    _activeIndex;
    preventActiveIndexPropagation;
    tabChanged;
    backwardIsDisabled = true;
    forwardIsDisabled = false;
    tabChangesSubscription;
    nextIconTemplate;
    previousIconTemplate;
    resizeObserver;
    container;
    list;
    buttonVisible;
    elementToObserve;
    constructor(platformId, el, cd, renderer) {
        this.platformId = platformId;
        this.el = el;
        this.cd = cd;
        this.renderer = renderer;
    }
    ngAfterContentInit() {
        this.initTabs();
        this.tabChangesSubscription = this.tabPanels.changes.subscribe((_) => {
            this.initTabs();
            this.refreshButtonState();
            this.callResizeObserver();
        });
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;
                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;
            }
        });
    }
    callResizeObserver() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.autoHideButtons) {
                this.bindResizeObserver();
            }
        }
    }
    ngAfterViewInit() {
        this.callResizeObserver();
    }
    bindResizeObserver() {
        this.container = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="navcontent"]');
        this.list = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="nav"]');
        this.resizeObserver = new ResizeObserver(() => {
            if (this.list.offsetWidth >= this.container.offsetWidth) {
                this.buttonVisible = true;
            }
            else {
                this.buttonVisible = false;
            }
            this.updateButtonState();
            this.cd.detectChanges();
        });
        this.resizeObserver.observe(this.container);
    }
    unbindResizeObserver() {
        this.resizeObserver.unobserve(this.elementToObserve.nativeElement);
        this.resizeObserver = null;
    }
    ngAfterViewChecked() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.tabChanged) {
                this.updateInkBar();
                this.tabChanged = false;
            }
        }
    }
    ngOnDestroy() {
        if (this.tabChangesSubscription) {
            this.tabChangesSubscription.unsubscribe();
        }
        if (this.resizeObserver) {
            this.unbindResizeObserver();
        }
    }
    getTabHeaderActionId(tabId) {
        return `${tabId}_header_action`;
    }
    getTabContentId(tabId) {
        return `${tabId}_content`;
    }
    initTabs() {
        this.tabs = this.tabPanels.toArray();
        let selectedTab = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
            this.tabChanged = true;
        }
        this.cd.markForCheck();
    }
    onTabKeyDown(event, tab) {
        switch (event.code) {
            case 'ArrowLeft':
                this.onTabArrowLeftKey(event);
                break;
            case 'ArrowRight':
                this.onTabArrowRightKey(event);
                break;
            case 'Home':
                this.onTabHomeKey(event);
                break;
            case 'End':
                this.onTabEndKey(event);
                break;
            case 'PageDown':
                this.onTabEndKey(event);
                break;
            case 'PageUp':
                this.onTabHomeKey(event);
                break;
            case 'Enter':
            case 'Space':
                this.open(event, tab);
                break;
            default:
                break;
        }
    }
    onTabArrowLeftKey(event) {
        const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement);
        const index = DomHandler.getAttribute(prevHeaderAction, 'data-pc-index');
        prevHeaderAction ? this.changeFocusedTab(event, prevHeaderAction, index) : this.onTabEndKey(event);
        event.preventDefault();
    }
    onTabArrowRightKey(event) {
        const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement);
        const index = DomHandler.getAttribute(nextHeaderAction, 'data-pc-index');
        nextHeaderAction ? this.changeFocusedTab(event, nextHeaderAction, index) : this.onTabHomeKey(event);
        event.preventDefault();
    }
    onTabHomeKey(event) {
        const firstHeaderAction = this.findFirstHeaderAction();
        const index = DomHandler.getAttribute(firstHeaderAction, 'data-pc-index');
        this.changeFocusedTab(event, firstHeaderAction, index);
        event.preventDefault();
    }
    onTabEndKey(event) {
        const lastHeaderAction = this.findLastHeaderAction();
        const index = DomHandler.getAttribute(lastHeaderAction, 'data-pc-index');
        this.changeFocusedTab(event, lastHeaderAction, index);
        event.preventDefault();
    }
    changeFocusedTab(event, element, index) {
        if (element) {
            DomHandler.focus(element);
            element.scrollIntoView({ block: 'nearest' });
            if (this.selectOnFocus) {
                const tab = this.tabs[index];
                this.open(event, tab);
            }
        }
    }
    findNextHeaderAction(tabElement, selfCheck = false) {
        const headerElement = selfCheck ? tabElement : tabElement.nextElementSibling;
        return headerElement
            ? DomHandler.getAttribute(headerElement, 'data-p-disabled') || DomHandler.getAttribute(headerElement, 'data-pc-section') === 'inkbar'
                ? this.findNextHeaderAction(headerElement)
                : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')
            : null;
    }
    findPrevHeaderAction(tabElement, selfCheck = false) {
        const headerElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        return headerElement
            ? DomHandler.getAttribute(headerElement, 'data-p-disabled') || DomHandler.getAttribute(headerElement, 'data-pc-section') === 'inkbar'
                ? this.findPrevHeaderAction(headerElement)
                : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')
            : null;
    }
    findFirstHeaderAction() {
        const firstEl = this.navbar.nativeElement.firstElementChild;
        return this.findNextHeaderAction(firstEl, true);
    }
    findLastHeaderAction() {
        const lastEl = this.navbar.nativeElement.lastElementChild;
        const lastHeaderAction = DomHandler.getAttribute(lastEl, 'data-pc-section') === 'inkbar' ? lastEl.previousElementSibling : lastEl;
        return this.findPrevHeaderAction(lastHeaderAction, true);
    }
    open(event, tab) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        if (!tab.selected) {
            let selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            this.tabChanged = true;
            tab.selected = true;
            let selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
            this.updateScrollBar(selectedTabIndex);
        }
        if (event) {
            event.preventDefault();
        }
    }
    close(event, tab) {
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: () => {
                    this.closeTab(tab);
                }
            });
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }
    }
    closeTab(tab) {
        if (tab.disabled) {
            return;
        }
        if (tab.selected) {
            this.tabChanged = true;
            tab.selected = false;
            for (let i = 0; i < this.tabs.length; i++) {
                let tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled && tabPanel != tab) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
        setTimeout(() => {
            this.updateInkBar();
        });
    }
    findSelectedTab() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }
    findTabIndex(tab) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    updateInkBar() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.navbar) {
                const tabHeader = DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');
                if (!tabHeader) {
                    return;
                }
                this.inkbar.nativeElement.style.width = DomHandler.getWidth(tabHeader) + 'px';
                this.inkbar.nativeElement.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
            }
        }
    }
    updateScrollBar(index) {
        let tabHeader = this.navbar.nativeElement.children[index];
        if (tabHeader) {
            tabHeader.scrollIntoView({ block: 'nearest' });
        }
    }
    updateButtonState() {
        const content = this.content.nativeElement;
        const { scrollLeft, scrollWidth } = content;
        const width = DomHandler.getWidth(content);
        this.backwardIsDisabled = scrollLeft === 0;
        this.forwardIsDisabled = Math.round(scrollLeft) === scrollWidth - width;
    }
    refreshButtonState() {
        this.container = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="navcontent"]');
        this.list = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="nav"]');
        if (this.list.offsetWidth >= this.container.offsetWidth) {
            if (this.list.offsetWidth >= this.container.offsetWidth) {
                this.buttonVisible = true;
            }
            else {
                this.buttonVisible = false;
            }
            this.updateButtonState();
            this.cd.markForCheck();
        }
    }
    onScroll(event) {
        this.scrollable && this.updateButtonState();
        event.preventDefault();
    }
    getVisibleButtonWidths() {
        return [this.prevBtn?.nativeElement, this.nextBtn?.nativeElement].reduce((acc, el) => (el ? acc + DomHandler.getWidth(el) : acc), 0);
    }
    navBackward() {
        const content = this.content.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft - width;
        content.scrollLeft = pos <= 0 ? 0 : pos;
    }
    navForward() {
        const content = this.content.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft + width;
        const lastPos = content.scrollWidth - width;
        content.scrollLeft = pos >= lastPos ? lastPos : pos;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabView, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: TabView, selector: "p-tabView", inputs: { style: "style", styleClass: "styleClass", controlClose: ["controlClose", "controlClose", booleanAttribute], scrollable: ["scrollable", "scrollable", booleanAttribute], activeIndex: "activeIndex", selectOnFocus: ["selectOnFocus", "selectOnFocus", booleanAttribute], nextButtonAriaLabel: "nextButtonAriaLabel", prevButtonAriaLabel: "prevButtonAriaLabel", autoHideButtons: ["autoHideButtons", "autoHideButtons", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute] }, outputs: { onChange: "onChange", onClose: "onClose", activeIndexChange: "activeIndexChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "tabPanels", predicate: TabPanel }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "navbar", first: true, predicate: ["navbar"], descendants: true }, { propertyName: "prevBtn", first: true, predicate: ["prevBtn"], descendants: true }, { propertyName: "nextBtn", first: true, predicate: ["nextBtn"], descendants: true }, { propertyName: "inkbar", first: true, predicate: ["inkbar"], descendants: true }, { propertyName: "elementToObserve", first: true, predicate: ["elementToObserve"], descendants: true }], ngImport: i0, template: `
        <div [ngClass]="{ 'p-tabview p-component': true, 'p-tabview-scrollable': scrollable }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'tabview'">
            <div #elementToObserve class="p-tabview-nav-container">
                <button
                    *ngIf="scrollable && !backwardIsDisabled && autoHideButtons"
                    #prevBtn
                    class="p-tabview-nav-prev p-tabview-nav-btn p-link"
                    (click)="navBackward()"
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="prevButtonAriaLabel"
                    type="button"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                </button>
                <div #content class="p-tabview-nav-content" (scroll)="onScroll($event)" [attr.data-pc-section]="'navcontent'">
                    <ul #navbar class="p-tabview-nav" role="tablist" [attr.data-pc-section]="'nav'">
                        <ng-template ngFor let-tab [ngForOf]="tabs" let-i="index">
                            <li role="presentation" [ngClass]="{ 'p-highlight': tab.selected, 'p-disabled': tab.disabled }" [attr.data-p-disabled]="tab.disabled" [ngStyle]="tab.headerStyle" [class]="tab.headerStyleClass" *ngIf="!tab.closed">
                                <a
                                    role="tab"
                                    class="p-tabview-nav-link"
                                    [pTooltip]="tab.tooltip"
                                    [tooltipPosition]="tab.tooltipPosition"
                                    [positionStyle]="tab.tooltipPositionStyle"
                                    [tooltipStyleClass]="tab.tooltipStyleClass"
                                    [attr.id]="getTabHeaderActionId(tab.id)"
                                    [attr.aria-controls]="getTabContentId(tab.id)"
                                    [attr.aria-selected]="tab.selected"
                                    [attr.tabindex]="tab.disabled || !tab.selected ? '-1' : tabindex"
                                    [attr.aria-disabled]="tab.disabled"
                                    [attr.data-pc-index]="i"
                                    [attr.data-pc-section]="'headeraction'"
                                    (click)="open($event, tab)"
                                    (keydown)="onTabKeyDown($event, tab)"
                                    pRipple
                                >
                                    <ng-container *ngIf="!tab.headerTemplate">
                                        <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon && !tab.leftIconTemplate"></span>
                                        <span *ngIf="tab.leftIconTemplate" class="p-tabview-left-icon">
                                            <ng-template *ngTemplateOutlet="tab.leftIconTemplate"></ng-template>
                                        </span>
                                        <span class="p-tabview-title">{{ tab.header }}</span>
                                        <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon && !tab.rightIconTemplate"></span>
                                        <span *ngIf="tab.rightIconTemplate" class="p-tabview-right-icon">
                                            <ng-template *ngTemplateOutlet="tab.rightIconTemplate"></ng-template>
                                        </span>
                                    </ng-container>
                                    <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                                    <ng-container *ngIf="tab.closable">
                                        <TimesIcon *ngIf="!tab.closeIconTemplate" [styleClass]="'p-tabview-close'" (click)="close($event, tab)" />
                                        <span class="tab.closeIconTemplate" *ngIf="tab.closeIconTemplate"></span>
                                        <ng-template *ngTemplateOutlet="tab.closeIconTemplate"></ng-template>
                                    </ng-container>
                                </a>
                            </li>
                        </ng-template>
                        <li #inkbar class="p-tabview-ink-bar" role="presentation" aria-hidden="true" [attr.data-pc-section]="'inkbar'"></li>
                    </ul>
                </div>
                <button
                    *ngIf="scrollable && !forwardIsDisabled && buttonVisible"
                    #nextBtn
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="nextButtonAriaLabel"
                    class="p-tabview-nav-next p-tabview-nav-btn p-link"
                    (click)="navForward()"
                    type="button"
                    pRipple
                >
                    <ChevronRightIcon *ngIf="!nextIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-tabview-panels">
                <ng-content></ng-content>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-tabview-nav-container{position:relative}.p-tabview-scrollable .p-tabview-nav-container{overflow:hidden}.p-tabview-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain auto}.p-tabview-nav{display:inline-flex;min-width:100%;margin:0;padding:0;list-style-type:none;flex:1 1 auto}.p-tabview-nav-link{cursor:pointer;-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabview-ink-bar{display:none;z-index:1}.p-tabview-nav-link:focus{z-index:1}.p-tabview-title{line-height:1;white-space:nowrap}.p-tabview-nav-btn{position:absolute;top:0;z-index:2;height:100%;display:flex;align-items:center;justify-content:center}.p-tabview-nav-prev{left:0}.p-tabview-nav-next{right:0}.p-tabview-nav-content::-webkit-scrollbar{display:none}.p-tabview-close{z-index:1}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronLeftIcon), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabView, decorators: [{
            type: Component,
            args: [{ selector: 'p-tabView', template: `
        <div [ngClass]="{ 'p-tabview p-component': true, 'p-tabview-scrollable': scrollable }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'tabview'">
            <div #elementToObserve class="p-tabview-nav-container">
                <button
                    *ngIf="scrollable && !backwardIsDisabled && autoHideButtons"
                    #prevBtn
                    class="p-tabview-nav-prev p-tabview-nav-btn p-link"
                    (click)="navBackward()"
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="prevButtonAriaLabel"
                    type="button"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                </button>
                <div #content class="p-tabview-nav-content" (scroll)="onScroll($event)" [attr.data-pc-section]="'navcontent'">
                    <ul #navbar class="p-tabview-nav" role="tablist" [attr.data-pc-section]="'nav'">
                        <ng-template ngFor let-tab [ngForOf]="tabs" let-i="index">
                            <li role="presentation" [ngClass]="{ 'p-highlight': tab.selected, 'p-disabled': tab.disabled }" [attr.data-p-disabled]="tab.disabled" [ngStyle]="tab.headerStyle" [class]="tab.headerStyleClass" *ngIf="!tab.closed">
                                <a
                                    role="tab"
                                    class="p-tabview-nav-link"
                                    [pTooltip]="tab.tooltip"
                                    [tooltipPosition]="tab.tooltipPosition"
                                    [positionStyle]="tab.tooltipPositionStyle"
                                    [tooltipStyleClass]="tab.tooltipStyleClass"
                                    [attr.id]="getTabHeaderActionId(tab.id)"
                                    [attr.aria-controls]="getTabContentId(tab.id)"
                                    [attr.aria-selected]="tab.selected"
                                    [attr.tabindex]="tab.disabled || !tab.selected ? '-1' : tabindex"
                                    [attr.aria-disabled]="tab.disabled"
                                    [attr.data-pc-index]="i"
                                    [attr.data-pc-section]="'headeraction'"
                                    (click)="open($event, tab)"
                                    (keydown)="onTabKeyDown($event, tab)"
                                    pRipple
                                >
                                    <ng-container *ngIf="!tab.headerTemplate">
                                        <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon && !tab.leftIconTemplate"></span>
                                        <span *ngIf="tab.leftIconTemplate" class="p-tabview-left-icon">
                                            <ng-template *ngTemplateOutlet="tab.leftIconTemplate"></ng-template>
                                        </span>
                                        <span class="p-tabview-title">{{ tab.header }}</span>
                                        <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon && !tab.rightIconTemplate"></span>
                                        <span *ngIf="tab.rightIconTemplate" class="p-tabview-right-icon">
                                            <ng-template *ngTemplateOutlet="tab.rightIconTemplate"></ng-template>
                                        </span>
                                    </ng-container>
                                    <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                                    <ng-container *ngIf="tab.closable">
                                        <TimesIcon *ngIf="!tab.closeIconTemplate" [styleClass]="'p-tabview-close'" (click)="close($event, tab)" />
                                        <span class="tab.closeIconTemplate" *ngIf="tab.closeIconTemplate"></span>
                                        <ng-template *ngTemplateOutlet="tab.closeIconTemplate"></ng-template>
                                    </ng-container>
                                </a>
                            </li>
                        </ng-template>
                        <li #inkbar class="p-tabview-ink-bar" role="presentation" aria-hidden="true" [attr.data-pc-section]="'inkbar'"></li>
                    </ul>
                </div>
                <button
                    *ngIf="scrollable && !forwardIsDisabled && buttonVisible"
                    #nextBtn
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="nextButtonAriaLabel"
                    class="p-tabview-nav-next p-tabview-nav-btn p-link"
                    (click)="navForward()"
                    type="button"
                    pRipple
                >
                    <ChevronRightIcon *ngIf="!nextIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-tabview-panels">
                <ng-content></ng-content>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-tabview-nav-container{position:relative}.p-tabview-scrollable .p-tabview-nav-container{overflow:hidden}.p-tabview-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain auto}.p-tabview-nav{display:inline-flex;min-width:100%;margin:0;padding:0;list-style-type:none;flex:1 1 auto}.p-tabview-nav-link{cursor:pointer;-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabview-ink-bar{display:none;z-index:1}.p-tabview-nav-link:focus{z-index:1}.p-tabview-title{line-height:1;white-space:nowrap}.p-tabview-nav-btn{position:absolute;top:0;z-index:2;height:100%;display:flex;align-items:center;justify-content:center}.p-tabview-nav-prev{left:0}.p-tabview-nav-next{right:0}.p-tabview-nav-content::-webkit-scrollbar{display:none}.p-tabview-close{z-index:1}}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], controlClose: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], scrollable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], activeIndex: [{
                type: Input
            }], selectOnFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], nextButtonAriaLabel: [{
                type: Input
            }], prevButtonAriaLabel: [{
                type: Input
            }], autoHideButtons: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], onChange: [{
                type: Output
            }], onClose: [{
                type: Output
            }], activeIndexChange: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content']
            }], navbar: [{
                type: ViewChild,
                args: ['navbar']
            }], prevBtn: [{
                type: ViewChild,
                args: ['prevBtn']
            }], nextBtn: [{
                type: ViewChild,
                args: ['nextBtn']
            }], inkbar: [{
                type: ViewChild,
                args: ['inkbar']
            }], tabPanels: [{
                type: ContentChildren,
                args: [TabPanel]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], elementToObserve: [{
                type: ViewChild,
                args: ['elementToObserve']
            }] } });
export class TabViewModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: TabViewModule, declarations: [TabView, TabPanel], imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon], exports: [TabView, TabPanel, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabViewModule, imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabViewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
                    exports: [TabView, TabPanel, SharedModule],
                    declarations: [TabView, TabPanel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFHSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFHZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBRVIsTUFBTSxFQUNOLFdBQVcsRUFJWCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsZUFBZSxFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBR2xEOzs7R0FHRztBQXdCSCxNQUFNLE9BQU8sUUFBUTtJQWtLTjtJQUNBO0lBQ0E7SUFuS1g7OztPQUdHO0lBQ3FDLFFBQVEsR0FBd0IsS0FBSyxDQUFDO0lBQzlFOzs7T0FHRztJQUNILElBQWEsV0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksV0FBVyxD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USxFQUFFLFlBQVksQ0FBQztvQkFDMUMsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgICBmb3J3YXJkUmVmLFxuICAgIG51bWJlckF0dHJpYnV0ZSxcbiAgICBzaWduYWxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCbG9ja2FibGVVSSwgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IENoZXZyb25MZWZ0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbmxlZnQnO1xuaW1wb3J0IHsgQ2hldnJvblJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbnJpZ2h0JztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRhYlZpZXdDaGFuZ2VFdmVudCwgVGFiVmlld0Nsb3NlRXZlbnQgfSBmcm9tICcuL3RhYnZpZXcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5cbi8qKlxuICogVGFiUGFuZWwgaXMgYSBoZWxwZXIgY29tcG9uZW50IGZvciBUYWJWaWV3IGNvbXBvbmVudC5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nSWY9XCIhY2xvc2VkXCJcbiAgICAgICAgICAgIGNsYXNzPVwicC10YWJ2aWV3LXBhbmVsXCJcbiAgICAgICAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiXG4gICAgICAgICAgICBbaGlkZGVuXT1cIiFzZWxlY3RlZFwiXG4gICAgICAgICAgICBbYXR0ci5pZF09XCJ0YWJWaWV3LmdldFRhYkNvbnRlbnRJZChpZClcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIXNlbGVjdGVkXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJ0YWJWaWV3LmdldFRhYkhlYWRlckFjdGlvbklkKGlkKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3RhYnBhbmVsJ1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGUgJiYgKGNhY2hlID8gbG9hZGVkIDogc2VsZWN0ZWQpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRhYlBhbmVsIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIHRhYiBjYW4gYmUgcmVtb3ZlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgY2xvc2FibGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIHRhYiBoZWFkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGhlYWRlclN0eWxlKCk6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyU3R5bGU7XG4gICAgfVxuICAgIHNldCBoZWFkZXJTdHlsZShoZWFkZXJTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9oZWFkZXJTdHlsZSA9IGhlYWRlclN0eWxlO1xuICAgICAgICB0aGlzLnRhYlZpZXcuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSB0YWIgaGVhZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBoZWFkZXJTdHlsZUNsYXNzKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkZXJTdHlsZUNsYXNzO1xuICAgIH1cbiAgICBzZXQgaGVhZGVyU3R5bGVDbGFzcyhoZWFkZXJTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5faGVhZGVyU3R5bGVDbGFzcyA9IGhlYWRlclN0eWxlQ2xhc3M7XG4gICAgICAgIHRoaXMudGFiVmlldy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciBhIGxhenkgbG9hZGVkIHBhbmVsIHNob3VsZCBhdm9pZCBnZXR0aW5nIGxvYWRlZCBhZ2FpbiBvbiByZXNlbGVjdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgY2FjaGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEFkdmlzb3J5IGluZm9ybWF0aW9uIHRvIGRpc3BsYXkgaW4gYSB0b29sdGlwIG9uIGhvdmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXA6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiB0aGUgdG9vbHRpcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgdW5kZWZpbmVkID0gJ3RvcCc7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiBDU1MgcG9zaXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdG9vbHRpcFBvc2l0aW9uU3R5bGU6IHN0cmluZyB8IHVuZGVmaW5lZCA9ICdhYnNvbHV0ZSc7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIHRvb2x0aXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdG9vbHRpcFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIHRhYiBpcyBhY3RpdmUuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBmYWxzZVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuICAgIHNldCBzZWxlY3RlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWw7XG5cbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsKSB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZW4gdHJ1ZSwgdGFiIGNhbm5vdCBiZSBhY3RpdmF0ZWQuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBmYWxzZVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuICAgIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICB0aGlzLnRhYlZpZXcuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRpdGxlIG9mIHRoZSB0YWJQYW5lbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaGVhZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkZXI7XG4gICAgfVxuICAgIHNldCBoZWFkZXIoaGVhZGVyOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faGVhZGVyID0gaGVhZGVyO1xuXG4gICAgICAgIC8vIFdlIGhhdmUgdG8gd2FpdCBmb3IgdGhlIHJlbmRlcmluZyBhbmQgdGhlbiByZXRyaWV2ZSB0aGUgYWN0dWFsIHNpemUgZWxlbWVudCBmcm9tIHRoZSBET00uXG4gICAgICAgIC8vIGluIGZ1dHVyZSBgUHJvbWlzZS5yZXNvbHZlYCBjYW4gYmUgY2hhbmdlZCB0byBgcXVldWVNaWNyb3Rhc2tgIChpZiBpZTExIHN1cHBvcnQgd2lsbCBiZSBkcm9wcGVkKVxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGFiVmlldy51cGRhdGVJbmtCYXIoKTtcbiAgICAgICAgICAgIHRoaXMudGFiVmlldy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExlZnQgaWNvbiBvZiB0aGUgdGFiUGFuZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjE1LjQuMiwgdXNlIGBsZWZ0aWNvbmAgdGVtcGxhdGUgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbGVmdEljb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnRJY29uO1xuICAgIH1cbiAgICBzZXQgbGVmdEljb24obGVmdEljb246IHN0cmluZykge1xuICAgICAgICB0aGlzLl9sZWZ0SWNvbiA9IGxlZnRJY29uO1xuICAgICAgICB0aGlzLnRhYlZpZXcuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExlZnQgaWNvbiBvZiB0aGUgdGFiUGFuZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjE1LjQuMiwgdXNlIGByaWdodGljb25gIHRlbXBsYXRlIGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHJpZ2h0SWNvbigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmlnaHRJY29uO1xuICAgIH1cbiAgICBzZXQgcmlnaHRJY29uKHJpZ2h0SWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3JpZ2h0SWNvbiA9IHJpZ2h0SWNvbjtcbiAgICAgICAgdGhpcy50YWJWaWV3LmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBjbG9zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBfaGVhZGVyU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgICBfaGVhZGVyU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgX3NlbGVjdGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgX2Rpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgX2hlYWRlciE6IHN0cmluZztcblxuICAgIF9sZWZ0SWNvbiE6IHN0cmluZztcblxuICAgIF9yaWdodEljb246IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGxlZnRJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICByaWdodEljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGNsb3NlSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgdGFiVmlldzogVGFiVmlldztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gVGFiVmlldykpIHRhYlZpZXc6IFRhYlZpZXcsXG4gICAgICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHtcbiAgICAgICAgdGhpcy50YWJWaWV3ID0gdGFiVmlldyBhcyBUYWJWaWV3O1xuICAgICAgICB0aGlzLmlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnaHRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbG9zZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICB9XG59XG4vKipcbiAqIFRhYlZpZXcgaXMgYSBjb250YWluZXIgY29tcG9uZW50IHRvIGdyb3VwIGNvbnRlbnQgd2l0aCB0YWJzLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRhYlZpZXcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyAncC10YWJ2aWV3IHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtdGFidmlldy1zY3JvbGxhYmxlJzogc2Nyb2xsYWJsZSB9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFthdHRyLmRhdGEtcGMtbmFtZV09XCIndGFidmlldydcIj5cbiAgICAgICAgICAgIDxkaXYgI2VsZW1lbnRUb09ic2VydmUgY2xhc3M9XCJwLXRhYnZpZXctbmF2LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzY3JvbGxhYmxlICYmICFiYWNrd2FyZElzRGlzYWJsZWQgJiYgYXV0b0hpZGVCdXR0b25zXCJcbiAgICAgICAgICAgICAgICAgICAgI3ByZXZCdG5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRhYnZpZXctbmF2LXByZXYgcC10YWJ2aWV3LW5hdi1idG4gcC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdkJhY2t3YXJkKClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwicHJldkJ1dHRvbkFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkxlZnRJY29uICpuZ0lmPVwiIXByZXZpb3VzSWNvblRlbXBsYXRlXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInByZXZpb3VzSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwicC10YWJ2aWV3LW5hdi1jb250ZW50XCIgKHNjcm9sbCk9XCJvblNjcm9sbCgkZXZlbnQpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIiduYXZjb250ZW50J1wiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgI25hdmJhciBjbGFzcz1cInAtdGFidmlldy1uYXZcIiByb2xlPVwidGFibGlzdFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbmF2J1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC10YWIgW25nRm9yT2ZdPVwidGFic1wiIGxldC1pPVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0JzogdGFiLnNlbGVjdGVkLCAncC1kaXNhYmxlZCc6IHRhYi5kaXNhYmxlZCB9XCIgW2F0dHIuZGF0YS1wLWRpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiIFtuZ1N0eWxlXT1cInRhYi5oZWFkZXJTdHlsZVwiIFtjbGFzc109XCJ0YWIuaGVhZGVyU3R5bGVDbGFzc1wiICpuZ0lmPVwiIXRhYi5jbG9zZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRhYnZpZXctbmF2LWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BUb29sdGlwXT1cInRhYi50b29sdGlwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwidGFiLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcG9zaXRpb25TdHlsZV09XCJ0YWIudG9vbHRpcFBvc2l0aW9uU3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBTdHlsZUNsYXNzXT1cInRhYi50b29sdGlwU3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRUYWJIZWFkZXJBY3Rpb25JZCh0YWIuaWQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiZ2V0VGFiQ29udGVudElkKHRhYi5pZClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJ0YWIuc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwidGFiLmRpc2FibGVkIHx8ICF0YWIuc2VsZWN0ZWQgPyAnLTEnIDogdGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1pbmRleF09XCJpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGVhZGVyYWN0aW9uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib3BlbigkZXZlbnQsIHRhYilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25UYWJLZXlEb3duKCRldmVudCwgdGFiKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGFiLmhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXRhYnZpZXctbGVmdC1pY29uXCIgW25nQ2xhc3NdPVwidGFiLmxlZnRJY29uXCIgKm5nSWY9XCJ0YWIubGVmdEljb24gJiYgIXRhYi5sZWZ0SWNvblRlbXBsYXRlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidGFiLmxlZnRJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtdGFidmlldy1sZWZ0LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmxlZnRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtdGFidmlldy10aXRsZVwiPnt7IHRhYi5oZWFkZXIgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXRhYnZpZXctcmlnaHQtaWNvblwiIFtuZ0NsYXNzXT1cInRhYi5yaWdodEljb25cIiAqbmdJZj1cInRhYi5yaWdodEljb24gJiYgIXRhYi5yaWdodEljb25UZW1wbGF0ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInRhYi5yaWdodEljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC10YWJ2aWV3LXJpZ2h0LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLnJpZ2h0SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWIuY2xvc2FibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGltZXNJY29uICpuZ0lmPVwiIXRhYi5jbG9zZUljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLXRhYnZpZXctY2xvc2UnXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudCwgdGFiKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWIuY2xvc2VJY29uVGVtcGxhdGVcIiAqbmdJZj1cInRhYi5jbG9zZUljb25UZW1wbGF0ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuY2xvc2VJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAjaW5rYmFyIGNsYXNzPVwicC10YWJ2aWV3LWluay1iYXJcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpbmtiYXInXCI+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2Nyb2xsYWJsZSAmJiAhZm9yd2FyZElzRGlzYWJsZWQgJiYgYnV0dG9uVmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICNuZXh0QnRuXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuZXh0QnV0dG9uQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRhYnZpZXctbmF2LW5leHQgcC10YWJ2aWV3LW5hdi1idG4gcC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdkZvcndhcmQoKVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAqbmdJZj1cIiFuZXh0SWNvblRlbXBsYXRlXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm5leHRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10YWJ2aWV3LXBhbmVsc1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFidmlldy5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGFiVmlldyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSwgQmxvY2thYmxlVUkge1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGFiIGNsb3NlIGlzIGNvbnRyb2xsZWQgYXQgb25DbG9zZSBldmVudCBvciBub3QuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBmYWxzZVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBjb250cm9sQ2xvc2U6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkIGRpc3BsYXlzIGJ1dHRvbnMgYXQgZWFjaCBzaWRlIG9mIHRoZSB0YWIgaGVhZGVycyB0byBzY3JvbGwgdGhlIHRhYiBsaXN0LlxuICAgICAqIEBkZWZhdWx0VmFsdWUgZmFsc2VcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2Nyb2xsYWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgYWN0aXZlIHRhYiB0byBjaGFuZ2Ugc2VsZWN0ZWQgdGFiIHByb2dyYW1tYXRpY2FsbHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG4gICAgc2V0IGFjdGl2ZUluZGV4KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGFicyAmJiB0aGlzLnRhYnMubGVuZ3RoICYmIHRoaXMuX2FjdGl2ZUluZGV4ICE9IG51bGwgJiYgdGhpcy50YWJzLmxlbmd0aCA+IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAodGhpcy5maW5kU2VsZWN0ZWRUYWIoKSBhcyBUYWJQYW5lbCkuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGFic1t0aGlzLl9hY3RpdmVJbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50YWJDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxCYXIodmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIHRoZSBmb2N1c2VkIHRhYiBpcyBhY3RpdmF0ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNlbGVjdE9uRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGRlZmluZSBhIHN0cmluZyBhcmlhIGxhYmVsIGF0dHJpYnV0ZSB0aGUgZm9yd2FyZCBuYXZpZ2F0aW9uIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBuZXh0QnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZWZpbmUgYSBzdHJpbmcgYXJpYSBsYWJlbCBhdHRyaWJ1dGUgdGhlIGJhY2t3YXJkIG5hdmlnYXRpb24gYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHByZXZCdXR0b25BcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGFjdGl2YXRlZCwgbmF2aWdhdGlvbiBidXR0b25zIHdpbGwgYXV0b21hdGljYWxseSBoaWRlIG9yIHNob3cgYmFzZWQgb24gdGhlIGF2YWlsYWJsZSBzcGFjZSB3aXRoaW4gdGhlIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b0hpZGVCdXR0b25zOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiB0YWIgY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7VGFiVmlld0NoYW5nZUV2ZW50fSBldmVudCAtIEN1c3RvbSB0YWIgY2hhbmdlIGV2ZW50XG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8VGFiVmlld0NoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFiVmlld0NoYW5nZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiB0YWIgY2xvc2UuXG4gICAgICogQHBhcmFtIHtUYWJWaWV3Q2xvc2VFdmVudH0gZXZlbnQgLSBDdXN0b20gdGFiIGNsb3NlIGV2ZW50XG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxUYWJWaWV3Q2xvc2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYlZpZXdDbG9zZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiB0aGUgYWN0aXZlIHRhYiBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gTmV3IGFjdGl2ZSBpbmRleFxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBhY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50PzogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG5cbiAgICBAVmlld0NoaWxkKCduYXZiYXInKSBuYXZiYXI/OiBFbGVtZW50UmVmPEhUTUxVTGlzdEVsZW1lbnQ+O1xuXG4gICAgQFZpZXdDaGlsZCgncHJldkJ0bicpIHByZXZCdG4/OiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnbmV4dEJ0bicpIG5leHRCdG4/OiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnaW5rYmFyJykgaW5rYmFyPzogRWxlbWVudFJlZjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oVGFiUGFuZWwpIHRhYlBhbmVsczogUXVlcnlMaXN0PFRhYlBhbmVsPiB8IHVuZGVmaW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBpbml0aWFsaXplZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHRhYnMhOiBUYWJQYW5lbFtdO1xuXG4gICAgX2FjdGl2ZUluZGV4ITogbnVtYmVyO1xuXG4gICAgcHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24hOiBib29sZWFuO1xuXG4gICAgdGFiQ2hhbmdlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGJhY2t3YXJkSXNEaXNhYmxlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBmb3J3YXJkSXNEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB0YWJDaGFuZ2VzU3Vic2NyaXB0aW9uITogU3Vic2NyaXB0aW9uO1xuXG4gICAgbmV4dEljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHByZXZpb3VzSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcmVzaXplT2JzZXJ2ZXI6IE51bGxhYmxlPFJlc2l6ZU9ic2VydmVyPjtcblxuICAgIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgICBsaXN0OiBIVE1MVUxpc3RFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgYnV0dG9uVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIEBWaWV3Q2hpbGQoJ2VsZW1lbnRUb09ic2VydmUnKSBlbGVtZW50VG9PYnNlcnZlOiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LFxuICAgICAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgICkge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0VGFicygpO1xuXG4gICAgICAgIHRoaXMudGFiQ2hhbmdlc1N1YnNjcmlwdGlvbiA9ICh0aGlzLnRhYlBhbmVscyBhcyBRdWVyeUxpc3Q8VGFiUGFuZWw+KS5jaGFuZ2VzLnN1YnNjcmliZSgoXykgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0VGFicygpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQnV0dG9uU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbFJlc2l6ZU9ic2VydmVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdwcmV2aW91c2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICduZXh0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxsUmVzaXplT2JzZXJ2ZXIoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvSGlkZUJ1dHRvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRSZXNpemVPYnNlcnZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmNhbGxSZXNpemVPYnNlcnZlcigpO1xuICAgIH1cblxuICAgIGJpbmRSZXNpemVPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cIm5hdmNvbnRlbnRcIl0nKTtcbiAgICAgICAgdGhpcy5saXN0ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJuYXZcIl0nKTtcblxuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3Qub2Zmc2V0V2lkdGggPj0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICB1bmJpbmRSZXNpemVPYnNlcnZlcigpIHtcbiAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5lbGVtZW50VG9PYnNlcnZlLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbmtCYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYkNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50YWJDaGFuZ2VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhYkNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZFJlc2l6ZU9ic2VydmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUYWJIZWFkZXJBY3Rpb25JZCh0YWJJZCkge1xuICAgICAgICByZXR1cm4gYCR7dGFiSWR9X2hlYWRlcl9hY3Rpb25gO1xuICAgIH1cblxuICAgIGdldFRhYkNvbnRlbnRJZCh0YWJJZCkge1xuICAgICAgICByZXR1cm4gYCR7dGFiSWR9X2NvbnRlbnRgO1xuICAgIH1cblxuICAgIGluaXRUYWJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYnMgPSAodGhpcy50YWJQYW5lbHMgYXMgUXVlcnlMaXN0PFRhYlBhbmVsPikudG9BcnJheSgpO1xuICAgICAgICBsZXQgc2VsZWN0ZWRUYWI6IFRhYlBhbmVsID0gdGhpcy5maW5kU2VsZWN0ZWRUYWIoKSBhcyBUYWJQYW5lbDtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFRhYiAmJiB0aGlzLnRhYnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCAhPSBudWxsICYmIHRoaXMudGFicy5sZW5ndGggPiB0aGlzLmFjdGl2ZUluZGV4KSB0aGlzLnRhYnNbdGhpcy5hY3RpdmVJbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZWxzZSB0aGlzLnRhYnNbMF0uc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnRhYkNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvblRhYktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIHRhYjogVGFiUGFuZWwpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJBcnJvd0xlZnRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiQXJyb3dSaWdodEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJIb21lS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiRW5kS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJFbmRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJIb21lS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub3BlbihldmVudCwgdGFiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGFiQXJyb3dMZWZ0S2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByZXZIZWFkZXJBY3Rpb24gPSB0aGlzLmZpbmRQcmV2SGVhZGVyQWN0aW9uKCg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShwcmV2SGVhZGVyQWN0aW9uLCAnZGF0YS1wYy1pbmRleCcpO1xuXG4gICAgICAgIHByZXZIZWFkZXJBY3Rpb24gPyB0aGlzLmNoYW5nZUZvY3VzZWRUYWIoZXZlbnQsIHByZXZIZWFkZXJBY3Rpb24sIGluZGV4KSA6IHRoaXMub25UYWJFbmRLZXkoZXZlbnQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uVGFiQXJyb3dSaWdodEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBuZXh0SGVhZGVyQWN0aW9uID0gdGhpcy5maW5kTmV4dEhlYWRlckFjdGlvbigoPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCkucGFyZW50RWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUobmV4dEhlYWRlckFjdGlvbiwgJ2RhdGEtcGMtaW5kZXgnKTtcblxuICAgICAgICBuZXh0SGVhZGVyQWN0aW9uID8gdGhpcy5jaGFuZ2VGb2N1c2VkVGFiKGV2ZW50LCBuZXh0SGVhZGVyQWN0aW9uLCBpbmRleCkgOiB0aGlzLm9uVGFiSG9tZUtleShldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UYWJIb21lS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZpcnN0SGVhZGVyQWN0aW9uID0gdGhpcy5maW5kRmlyc3RIZWFkZXJBY3Rpb24oKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShmaXJzdEhlYWRlckFjdGlvbiwgJ2RhdGEtcGMtaW5kZXgnKTtcblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRUYWIoZXZlbnQsIGZpcnN0SGVhZGVyQWN0aW9uLCBpbmRleCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UYWJFbmRLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgbGFzdEhlYWRlckFjdGlvbiA9IHRoaXMuZmluZExhc3RIZWFkZXJBY3Rpb24oKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShsYXN0SGVhZGVyQWN0aW9uLCAnZGF0YS1wYy1pbmRleCcpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZFRhYihldmVudCwgbGFzdEhlYWRlckFjdGlvbiwgaW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoYW5nZUZvY3VzZWRUYWIoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGVsZW1lbnQ6IGFueSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyhlbGVtZW50KTtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RPbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFiID0gdGhpcy50YWJzW2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4oZXZlbnQsIHRhYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dEhlYWRlckFjdGlvbih0YWJFbGVtZW50OiBhbnksIHNlbGZDaGVjayA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckVsZW1lbnQgPSBzZWxmQ2hlY2sgPyB0YWJFbGVtZW50IDogdGFiRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIHJldHVybiBoZWFkZXJFbGVtZW50XG4gICAgICAgICAgICA/IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXAtZGlzYWJsZWQnKSB8fCBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShoZWFkZXJFbGVtZW50LCAnZGF0YS1wYy1zZWN0aW9uJykgPT09ICdpbmtiYXInXG4gICAgICAgICAgICAgICAgPyB0aGlzLmZpbmROZXh0SGVhZGVyQWN0aW9uKGhlYWRlckVsZW1lbnQpXG4gICAgICAgICAgICAgICAgOiBEb21IYW5kbGVyLmZpbmRTaW5nbGUoaGVhZGVyRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJoZWFkZXJhY3Rpb25cIl0nKVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SGVhZGVyQWN0aW9uKHRhYkVsZW1lbnQ6IGFueSwgc2VsZkNoZWNrID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IHNlbGZDaGVjayA/IHRhYkVsZW1lbnQgOiB0YWJFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgcmV0dXJuIGhlYWRlckVsZW1lbnRcbiAgICAgICAgICAgID8gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoaGVhZGVyRWxlbWVudCwgJ2RhdGEtcC1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ2lua2JhcidcbiAgICAgICAgICAgICAgICA/IHRoaXMuZmluZFByZXZIZWFkZXJBY3Rpb24oaGVhZGVyRWxlbWVudClcbiAgICAgICAgICAgICAgICA6IERvbUhhbmRsZXIuZmluZFNpbmdsZShoZWFkZXJFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlcmFjdGlvblwiXScpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgZmluZEZpcnN0SGVhZGVyQWN0aW9uKCkge1xuICAgICAgICBjb25zdCBmaXJzdEVsID0gdGhpcy5uYXZiYXIubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE5leHRIZWFkZXJBY3Rpb24oZmlyc3RFbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZmluZExhc3RIZWFkZXJBY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGxhc3RFbCA9IHRoaXMubmF2YmFyLm5hdGl2ZUVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgY29uc3QgbGFzdEhlYWRlckFjdGlvbiA9IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGxhc3RFbCwgJ2RhdGEtcGMtc2VjdGlvbicpID09PSAnaW5rYmFyJyA/IGxhc3RFbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIDogbGFzdEVsO1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kUHJldkhlYWRlckFjdGlvbihsYXN0SGVhZGVyQWN0aW9uLCB0cnVlKTtcbiAgICB9XG5cbiAgICBvcGVuKGV2ZW50OiBFdmVudCwgdGFiOiBUYWJQYW5lbCkge1xuICAgICAgICBpZiAodGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0YWIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFRhYjogVGFiUGFuZWwgPSB0aGlzLmZpbmRTZWxlY3RlZFRhYigpIGFzIFRhYlBhbmVsO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGFiKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUYWIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50YWJDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRUYWJJbmRleCA9IHRoaXMuZmluZFRhYkluZGV4KHRhYik7XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChzZWxlY3RlZFRhYkluZGV4KTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogc2VsZWN0ZWRUYWJJbmRleCB9KTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxCYXIoc2VsZWN0ZWRUYWJJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZShldmVudDogRXZlbnQsIHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbENsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZmluZFRhYkluZGV4KHRhYiksXG4gICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmZpbmRUYWJJbmRleCh0YWIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlVGFiKHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgaWYgKHRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGFiQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB0YWIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhYlBhbmVsID0gdGhpcy50YWJzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghdGFiUGFuZWwuY2xvc2VkICYmICF0YWIuZGlzYWJsZWQgJiYgdGFiUGFuZWwgIT0gdGFiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYlBhbmVsLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGFiLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbmtCYXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmluZFNlbGVjdGVkVGFiKCk6IFRhYlBhbmVsIHwgbnVsbCB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJzW2ldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFic1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kVGFiSW5kZXgodGFiOiBUYWJQYW5lbCkge1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYnNbaV0gPT0gdGFiKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICB1cGRhdGVJbmtCYXIoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uYXZiYXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJIZWFkZXI6IEhUTUxFbGVtZW50IHwgbnVsbCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLm5hdmJhci5uYXRpdmVFbGVtZW50LCAnbGkucC1oaWdobGlnaHQnKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGFiSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAodGhpcy5pbmtiYXIgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IERvbUhhbmRsZXIuZ2V0V2lkdGgodGFiSGVhZGVyKSArICdweCc7XG4gICAgICAgICAgICAgICAgKHRoaXMuaW5rYmFyIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRhYkhlYWRlcikubGVmdCAtIERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMubmF2YmFyLm5hdGl2ZUVsZW1lbnQpLmxlZnQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlU2Nyb2xsQmFyKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHRhYkhlYWRlciA9ICh0aGlzLm5hdmJhciBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW2luZGV4XTtcblxuICAgICAgICBpZiAodGFiSGVhZGVyKSB7XG4gICAgICAgICAgICB0YWJIZWFkZXIuc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQnV0dG9uU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSAodGhpcy5jb250ZW50IGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHsgc2Nyb2xsTGVmdCwgc2Nyb2xsV2lkdGggfSA9IGNvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gRG9tSGFuZGxlci5nZXRXaWR0aChjb250ZW50KTtcblxuICAgICAgICB0aGlzLmJhY2t3YXJkSXNEaXNhYmxlZCA9IHNjcm9sbExlZnQgPT09IDA7XG4gICAgICAgIHRoaXMuZm9yd2FyZElzRGlzYWJsZWQgPSBNYXRoLnJvdW5kKHNjcm9sbExlZnQpID09PSBzY3JvbGxXaWR0aCAtIHdpZHRoO1xuICAgIH1cblxuICAgIHJlZnJlc2hCdXR0b25TdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cIm5hdmNvbnRlbnRcIl0nKTtcbiAgICAgICAgdGhpcy5saXN0ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJuYXZcIl0nKTtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5vZmZzZXRXaWR0aCA+PSB0aGlzLmNvbnRhaW5lci5vZmZzZXRXaWR0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdC5vZmZzZXRXaWR0aCA+PSB0aGlzLmNvbnRhaW5lci5vZmZzZXRXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2Nyb2xsKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnNjcm9sbGFibGUgJiYgdGhpcy51cGRhdGVCdXR0b25TdGF0ZSgpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZ2V0VmlzaWJsZUJ1dHRvbldpZHRocygpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLnByZXZCdG4/Lm5hdGl2ZUVsZW1lbnQsIHRoaXMubmV4dEJ0bj8ubmF0aXZlRWxlbWVudF0ucmVkdWNlKChhY2MsIGVsKSA9PiAoZWwgPyBhY2MgKyBEb21IYW5kbGVyLmdldFdpZHRoKGVsKSA6IGFjYyksIDApO1xuICAgIH1cblxuICAgIG5hdkJhY2t3YXJkKCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gKHRoaXMuY29udGVudCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCB3aWR0aCA9IERvbUhhbmRsZXIuZ2V0V2lkdGgoY29udGVudCkgLSB0aGlzLmdldFZpc2libGVCdXR0b25XaWR0aHMoKTtcbiAgICAgICAgY29uc3QgcG9zID0gY29udGVudC5zY3JvbGxMZWZ0IC0gd2lkdGg7XG4gICAgICAgIGNvbnRlbnQuc2Nyb2xsTGVmdCA9IHBvcyA8PSAwID8gMCA6IHBvcztcbiAgICB9XG5cbiAgICBuYXZGb3J3YXJkKCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gKHRoaXMuY29udGVudCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCB3aWR0aCA9IERvbUhhbmRsZXIuZ2V0V2lkdGgoY29udGVudCkgLSB0aGlzLmdldFZpc2libGVCdXR0b25XaWR0aHMoKTtcbiAgICAgICAgY29uc3QgcG9zID0gY29udGVudC5zY3JvbGxMZWZ0ICsgd2lkdGg7XG4gICAgICAgIGNvbnN0IGxhc3RQb3MgPSBjb250ZW50LnNjcm9sbFdpZHRoIC0gd2lkdGg7XG5cbiAgICAgICAgY29udGVudC5zY3JvbGxMZWZ0ID0gcG9zID49IGxhc3RQb3MgPyBsYXN0UG9zIDogcG9zO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFJpcHBsZU1vZHVsZSwgVGltZXNJY29uLCBDaGV2cm9uTGVmdEljb24sIENoZXZyb25SaWdodEljb25dLFxuICAgIGV4cG9ydHM6IFtUYWJWaWV3LCBUYWJQYW5lbCwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUYWJWaWV3LCBUYWJQYW5lbF1cbn0pXG5leHBvcnQgY2xhc3MgVGFiVmlld01vZHVsZSB7fVxuIl19