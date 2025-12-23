import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, NgModule, PLATFORM_ID, ViewChild, ViewEncapsulation, numberAttribute } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * ScrollPanel is a cross browser, lightweight and themable alternative to native browser scrollbar.
 * @group Components
 */
export class ScrollPanel {
    platformId;
    el;
    zone;
    cd;
    document;
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
     * Step factor to scroll the content while pressing the arrow keys.
     * @group Props
     */
    step = 5;
    containerViewChild;
    contentViewChild;
    xBarViewChild;
    yBarViewChild;
    templates;
    scrollYRatio;
    scrollXRatio;
    timeoutFrame = (fn) => setTimeout(fn, 0);
    initialized = false;
    lastPageY;
    lastPageX;
    isXBarClicked = false;
    isYBarClicked = false;
    contentTemplate;
    lastScrollLeft = 0;
    lastScrollTop = 0;
    orientation = 'vertical';
    timer;
    contentId;
    windowResizeListener;
    contentScrollListener;
    mouseEnterListener;
    xBarMouseDownListener;
    yBarMouseDownListener;
    documentMouseMoveListener;
    documentMouseUpListener;
    constructor(platformId, el, zone, cd, document, renderer) {
        this.platformId = platformId;
        this.el = el;
        this.zone = zone;
        this.cd = cd;
        this.document = document;
        this.renderer = renderer;
        this.contentId = UniqueComponentId() + '_content';
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.moveBar();
                this.moveBar = this.moveBar.bind(this);
                this.onXBarMouseDown = this.onXBarMouseDown.bind(this);
                this.onYBarMouseDown = this.onYBarMouseDown.bind(this);
                this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
                this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
                this.windowResizeListener = this.renderer.listen(window, 'resize', this.moveBar);
                this.contentScrollListener = this.renderer.listen(this.contentViewChild.nativeElement, 'scroll', this.moveBar);
                this.mouseEnterListener = this.renderer.listen(this.contentViewChild.nativeElement, 'mouseenter', this.moveBar);
                this.xBarMouseDownListener = this.renderer.listen(this.xBarViewChild.nativeElement, 'mousedown', this.onXBarMouseDown);
                this.yBarMouseDownListener = this.renderer.listen(this.yBarViewChild.nativeElement, 'mousedown', this.onYBarMouseDown);
                this.calculateContainerHeight();
                this.initialized = true;
            });
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    calculateContainerHeight() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        let xBar = this.xBarViewChild.nativeElement;
        const window = this.document.defaultView;
        let containerStyles = window.getComputedStyle(container), xBarStyles = window.getComputedStyle(xBar), pureContainerHeight = DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);
        if (containerStyles['max-height'] != 'none' && pureContainerHeight == 0) {
            if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            }
            else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
            }
        }
    }
    moveBar() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        let xBar = this.xBarViewChild.nativeElement;
        let yBar = this.yBarViewChild.nativeElement;
        function computeBarPosition() {
            /* horizontal scroll */
            let totalWidth = content.scrollWidth;
            let ownWidth = content.clientWidth;
            let bottom = (container.clientHeight - xBar.clientHeight) * -1;
            this.scrollXRatio = ownWidth / totalWidth;
            /* vertical scroll */
            let totalHeight = content.scrollHeight;
            let ownHeight = content.clientHeight;
            let right = (container.clientWidth - yBar.clientWidth) * -1;
            this.scrollYRatio = ownHeight / totalHeight;
            return { totalWidth, ownWidth, bottom, totalHeight, ownHeight, right };
        }
        this.requestAnimationFrame(() => {
            let { totalWidth, ownWidth, bottom, totalHeight, ownHeight, right } = computeBarPosition.call(this);
            if (this.scrollXRatio >= 1) {
                xBar.setAttribute('data-p-scrollpanel-hidden', 'true');
                DomHandler.addClass(xBar, 'p-scrollpanel-hidden');
            }
            else {
                xBar.setAttribute('data-p-scrollpanel-hidden', 'false');
                DomHandler.removeClass(xBar, 'p-scrollpanel-hidden');
                const xBarWidth = Math.max(this.scrollXRatio * 100, 10);
                const xBarLeft = (content.scrollLeft * (100 - xBarWidth)) / (totalWidth - ownWidth);
                xBar.style.cssText = 'width:' + xBarWidth + '%; left:' + xBarLeft + '%;bottom:' + bottom + 'px;';
            }
            if (this.scrollYRatio >= 1) {
                yBar.setAttribute('data-p-scrollpanel-hidden', 'true');
                DomHandler.addClass(yBar, 'p-scrollpanel-hidden');
            }
            else {
                yBar.setAttribute('data-p-scrollpanel-hidden', 'false');
                DomHandler.removeClass(yBar, 'p-scrollpanel-hidden');
                const yBarHeight = Math.max(this.scrollYRatio * 100, 10);
                const yBarTop = (content.scrollTop * (100 - yBarHeight)) / (totalHeight - ownHeight);
                yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
        this.cd.markForCheck();
    }
    onScroll(event) {
        if (this.lastScrollLeft !== event.target.scrollLeft) {
            this.lastScrollLeft = event.target.scrollLeft;
            this.orientation = 'horizontal';
        }
        else if (this.lastScrollTop !== event.target.scrollTop) {
            this.lastScrollTop = event.target.scrollTop;
            this.orientation = 'vertical';
        }
        this.moveBar();
    }
    onKeyDown(event) {
        if (this.orientation === 'vertical') {
            switch (event.code) {
                case 'ArrowDown': {
                    this.setTimer('scrollTop', this.step);
                    event.preventDefault();
                    break;
                }
                case 'ArrowUp': {
                    this.setTimer('scrollTop', this.step * -1);
                    event.preventDefault();
                    break;
                }
                case 'ArrowLeft':
                case 'ArrowRight': {
                    event.preventDefault();
                    break;
                }
                default:
                    //no op
                    break;
            }
        }
        else if (this.orientation === 'horizontal') {
            switch (event.code) {
                case 'ArrowRight': {
                    this.setTimer('scrollLeft', this.step);
                    event.preventDefault();
                    break;
                }
                case 'ArrowLeft': {
                    this.setTimer('scrollLeft', this.step * -1);
                    event.preventDefault();
                    break;
                }
                case 'ArrowDown':
                case 'ArrowUp': {
                    event.preventDefault();
                    break;
                }
                default:
                    //no op
                    break;
            }
        }
    }
    onKeyUp() {
        this.clearTimer();
    }
    repeat(bar, step) {
        this.contentViewChild.nativeElement[bar] += step;
        this.moveBar();
    }
    setTimer(bar, step) {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(bar, step);
        }, 40);
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    bindDocumentMouseListeners() {
        if (!this.documentMouseMoveListener) {
            this.documentMouseMoveListener = (e) => {
                this.onDocumentMouseMove(e);
            };
            this.document.addEventListener('mousemove', this.documentMouseMoveListener);
        }
        if (!this.documentMouseUpListener) {
            this.documentMouseUpListener = (e) => {
                this.onDocumentMouseUp(e);
            };
            this.document.addEventListener('mouseup', this.documentMouseUpListener);
        }
    }
    unbindDocumentMouseListeners() {
        if (this.documentMouseMoveListener) {
            this.document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    }
    onYBarMouseDown(e) {
        this.isYBarClicked = true;
        this.yBarViewChild.nativeElement.focus();
        this.lastPageY = e.pageY;
        this.yBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'true');
        DomHandler.addClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'true');
        DomHandler.addClass(this.document.body, 'p-scrollpanel-grabbed');
        this.bindDocumentMouseListeners();
        e.preventDefault();
    }
    onXBarMouseDown(e) {
        this.isXBarClicked = true;
        this.xBarViewChild.nativeElement.focus();
        this.lastPageX = e.pageX;
        this.xBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.addClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.addClass(this.document.body, 'p-scrollpanel-grabbed');
        this.bindDocumentMouseListeners();
        e.preventDefault();
    }
    onDocumentMouseMove(e) {
        if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        }
        else if (this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
        }
        else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
        }
    }
    onMouseMoveForXBar(e) {
        let deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollLeft += deltaX / this.scrollXRatio;
        });
    }
    onMouseMoveForYBar(e) {
        let deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollTop += deltaY / this.scrollYRatio;
        });
    }
    /**
     * Scrolls the top location to the given value.
     * @param scrollTop
     * @group Method
     */
    scrollTop(scrollTop) {
        let scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        this.contentViewChild.nativeElement.scrollTop = scrollTop;
    }
    onFocus(event) {
        if (this.xBarViewChild.nativeElement.isSameNode(event.target)) {
            this.orientation = 'horizontal';
        }
        else if (this.yBarViewChild.nativeElement.isSameNode(event.target)) {
            this.orientation = 'vertical';
        }
    }
    onBlur() {
        if (this.orientation === 'horizontal') {
            this.orientation = 'vertical';
        }
    }
    onDocumentMouseUp(e) {
        this.yBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.removeClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.xBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.removeClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.removeClass(this.document.body, 'p-scrollpanel-grabbed');
        this.unbindDocumentMouseListeners();
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    }
    requestAnimationFrame(f) {
        let frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    }
    unbindListeners() {
        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }
        if (this.contentScrollListener) {
            this.contentScrollListener();
            this.contentScrollListener = null;
        }
        if (this.mouseEnterListener) {
            this.mouseEnterListener();
            this.mouseEnterListener = null;
        }
        if (this.xBarMouseDownListener) {
            this.xBarMouseDownListener();
            this.xBarMouseDownListener = null;
        }
        if (this.yBarMouseDownListener) {
            this.yBarMouseDownListener();
            this.yBarMouseDownListener = null;
        }
    }
    ngOnDestroy() {
        if (this.initialized) {
            this.unbindListeners();
        }
    }
    /**
     * Refreshes the position and size of the scrollbar.
     * @group Method
     */
    refresh() {
        this.moveBar();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ScrollPanel, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: ScrollPanel, selector: "p-scrollPanel", inputs: { style: "style", styleClass: "styleClass", step: ["step", "step", numberAttribute] }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }, { propertyName: "xBarViewChild", first: true, predicate: ["xBar"], descendants: true }, { propertyName: "yBarViewChild", first: true, predicate: ["yBar"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'scrollpanel'">
            <div class="p-scrollpanel-wrapper" [attr.data-pc-section]="'wrapper'">
                <div #content class="p-scrollpanel-content" [attr.data-pc-section]="'content'" (mouseenter)="moveBar()" (scroll)="onScroll($event)">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div
                #xBar
                class="p-scrollpanel-bar p-scrollpanel-bar-x"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'horizontal'"
                [attr.aria-valuenow]="lastScrollLeft"
                [attr.data-pc-section]="'barx'"
                [attr.aria-controls]="contentId"
                (mousedown)="onXBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
                (blur)="onBlur()"
            ></div>
            <div
                #yBar
                class="p-scrollpanel-bar p-scrollpanel-bar-y"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'vertical'"
                [attr.aria-valuenow]="lastScrollTop"
                [attr.data-pc-section]="'bary'"
                [attr.aria-controls]="contentId"
                (mousedown)="onYBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
            ></div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-scrollpanel-wrapper{overflow:hidden;width:100%;height:100%;position:relative;float:left}.p-scrollpanel-content{height:calc(100% + 18px);width:calc(100% + 18px);padding:0 18px 18px 0;position:relative;overflow:auto;box-sizing:border-box}.p-scrollpanel-bar{position:relative;background:#c1c1c1;border-radius:3px;cursor:pointer;opacity:0;transition:opacity .25s linear}.p-scrollpanel-bar-y{width:9px;top:0}.p-scrollpanel-bar-x{height:9px;bottom:0}.p-scrollpanel-hidden{visibility:hidden}.p-scrollpanel:hover .p-scrollpanel-bar,.p-scrollpanel:active .p-scrollpanel-bar{opacity:1}.p-scrollpanel-grabbed{-webkit-user-select:none;user-select:none}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ScrollPanel, decorators: [{
            type: Component,
            args: [{ selector: 'p-scrollPanel', template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'scrollpanel'">
            <div class="p-scrollpanel-wrapper" [attr.data-pc-section]="'wrapper'">
                <div #content class="p-scrollpanel-content" [attr.data-pc-section]="'content'" (mouseenter)="moveBar()" (scroll)="onScroll($event)">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div
                #xBar
                class="p-scrollpanel-bar p-scrollpanel-bar-x"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'horizontal'"
                [attr.aria-valuenow]="lastScrollLeft"
                [attr.data-pc-section]="'barx'"
                [attr.aria-controls]="contentId"
                (mousedown)="onXBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
                (blur)="onBlur()"
            ></div>
            <div
                #yBar
                class="p-scrollpanel-bar p-scrollpanel-bar-y"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'vertical'"
                [attr.aria-valuenow]="lastScrollTop"
                [attr.data-pc-section]="'bary'"
                [attr.aria-controls]="contentId"
                (mousedown)="onYBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
            ></div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-scrollpanel-wrapper{overflow:hidden;width:100%;height:100%;position:relative;float:left}.p-scrollpanel-content{height:calc(100% + 18px);width:calc(100% + 18px);padding:0 18px 18px 0;position:relative;overflow:auto;box-sizing:border-box}.p-scrollpanel-bar{position:relative;background:#c1c1c1;border-radius:3px;cursor:pointer;opacity:0;transition:opacity .25s linear}.p-scrollpanel-bar-y{width:9px;top:0}.p-scrollpanel-bar-x{height:9px;bottom:0}.p-scrollpanel-hidden{visibility:hidden}.p-scrollpanel:hover .p-scrollpanel-bar,.p-scrollpanel:active .p-scrollpanel-bar{opacity:1}.p-scrollpanel-grabbed{-webkit-user-select:none;user-select:none}}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2 }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], step: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], xBarViewChild: [{
                type: ViewChild,
                args: ['xBar']
            }], yBarViewChild: [{
                type: ViewChild,
                args: ['yBar']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ScrollPanelModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ScrollPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: ScrollPanelModule, declarations: [ScrollPanel], imports: [CommonModule], exports: [ScrollPanel] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ScrollPanelModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ScrollPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ScrollPanel],
                    declarations: [ScrollPanel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xscGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2Nyb2xscGFuZWwvc2Nyb2xscGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBR1IsV0FBVyxFQUlYLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsZUFBZSxFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFFbEQ7OztHQUdHO0FBaURILE1BQU0sT0FBTyxXQUFXO0lBc0VhO0lBQ3RCO0lBQ0E7SUFDQTtJQUNtQjtJQUNsQjtJQTFFWjs7O09BR0c7SUFDTSxLQUFLLENBQThDO0lBQzVEOzs7T0FHRztJQUNNLFVBQVUsQ0FBcUI7SUFDeEM7OztPQUdHO0lBQ29DLElBQUksR0FBVyxDQUFDLENBQUM7SUFFaEMsa0JBQWtCLENBQXlCO0lBRTdDLGdCQUFnQixDQUF5QjtJQUU1QyxhQUFhLENBQXlCO0lBRXRDLGFBQWEsQ0FBeUI7SUFFekIsU0FBUyxDQUF1QztJQUVoRixZQUFZLENBQXFCO0lBRWpDLFlBQVksQ0FBcUI7SUFFakMsWUFBWSxHQUFRLENBQUMsRUFBZ0IsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU1RCxXQUFXLEdBQVksS0FBSyxDQUFDO0lBRTdCLFNBQVMsQ0FBcUI7SUFFOUIsU0FBUyxDQUFxQjtJ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bEIsTUFBTTsyQkFBQyxRQUFRO2lFQXJFWCxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLaUMsSUFBSTtzQkFBMUMsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUU7Z0JBRWIsa0JBQWtCO3NCQUF6QyxTQUFTO3VCQUFDLFdBQVc7Z0JBRUEsZ0JBQWdCO3NCQUFyQyxTQUFTO3VCQUFDLFNBQVM7Z0JBRUQsYUFBYTtzQkFBL0IsU0FBUzt1QkFBQyxNQUFNO2dCQUVFLGFBQWE7c0JBQS9CLFNBQVM7dUJBQUMsTUFBTTtnQkFFZSxTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7O0FBc2FsQyxNQUFNLE9BQU8saUJBQWlCO3VHQUFqQixpQkFBaUI7d0dBQWpCLGlCQUFpQixpQkEvYmpCLFdBQVcsYUEyYlYsWUFBWSxhQTNiYixXQUFXO3dHQStiWCxpQkFBaUIsWUFKaEIsWUFBWTs7MkZBSWIsaUJBQWlCO2tCQUw3QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUN0QixZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7aUJBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIG51bWJlckF0dHJpYnV0ZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuLyoqXG4gKiBTY3JvbGxQYW5lbCBpcyBhIGNyb3NzIGJyb3dzZXIsIGxpZ2h0d2VpZ2h0IGFuZCB0aGVtYWJsZSBhbHRlcm5hdGl2ZSB0byBuYXRpdmUgYnJvd3NlciBzY3JvbGxiYXIuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2Nyb2xsUGFuZWwnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCIncC1zY3JvbGxwYW5lbCBwLWNvbXBvbmVudCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidzY3JvbGxwYW5lbCdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNjcm9sbHBhbmVsLXdyYXBwZXJcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3dyYXBwZXInXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInAtc2Nyb2xscGFuZWwtY29udGVudFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY29udGVudCdcIiAobW91c2VlbnRlcik9XCJtb3ZlQmFyKClcIiAoc2Nyb2xsKT1cIm9uU2Nyb2xsKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAjeEJhclxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zY3JvbGxwYW5lbC1iYXIgcC1zY3JvbGxwYW5lbC1iYXIteFwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICByb2xlPVwic2Nyb2xsYmFyXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLW9yaWVudGF0aW9uXT1cIidob3Jpem9udGFsJ1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJsYXN0U2Nyb2xsTGVmdFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidiYXJ4J1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJjb250ZW50SWRcIlxuICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25YQmFyTW91c2VEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoa2V5dXApPVwib25LZXlVcCgpXCJcbiAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoYmx1cik9XCJvbkJsdXIoKVwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgI3lCYXJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtc2Nyb2xscGFuZWwtYmFyIHAtc2Nyb2xscGFuZWwtYmFyLXlcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgcm9sZT1cInNjcm9sbGJhclwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1vcmllbnRhdGlvbl09XCIndmVydGljYWwnXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cImxhc3RTY3JvbGxUb3BcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInYmFyeSdcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiY29udGVudElkXCJcbiAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uWUJhck1vdXNlRG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleXVwKT1cIm9uS2V5VXAoKVwiXG4gICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9zY3JvbGxwYW5lbC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsUGFuZWwgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0ZXAgZmFjdG9yIHRvIHNjcm9sbCB0aGUgY29udGVudCB3aGlsZSBwcmVzc2luZyB0aGUgYXJyb3cga2V5cy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBzdGVwOiBudW1iZXIgPSA1O1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCd4QmFyJykgeEJhclZpZXdDaGlsZDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ3lCYXInKSB5QmFyVmlld0NoaWxkOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIHNjcm9sbFlSYXRpbzogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgc2Nyb2xsWFJhdGlvOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICB0aW1lb3V0RnJhbWU6IGFueSA9IChmbjogVm9pZEZ1bmN0aW9uKSA9PiBzZXRUaW1lb3V0KGZuLCAwKTtcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBsYXN0UGFnZVk6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGxhc3RQYWdlWDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgaXNYQmFyQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaXNZQmFyQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgbGFzdFNjcm9sbExlZnQ6IG51bWJlciA9IDA7XG5cbiAgICBsYXN0U2Nyb2xsVG9wOiBudW1iZXIgPSAwO1xuXG4gICAgb3JpZW50YXRpb246IHN0cmluZyA9ICd2ZXJ0aWNhbCc7XG5cbiAgICB0aW1lcjogYW55O1xuXG4gICAgY29udGVudElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICB3aW5kb3dSZXNpemVMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnRlbnRTY3JvbGxMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIG1vdXNlRW50ZXJMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIHhCYXJNb3VzZURvd25MaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIHlCYXJNb3VzZURvd25MaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIGRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXI6IE51bGxhYmxlPChldmVudD86IGFueSkgPT4gdm9pZD47XG5cbiAgICBkb2N1bWVudE1vdXNlVXBMaXN0ZW5lcjogTnVsbGFibGU8KGV2ZW50PzogYW55KSA9PiB2b2lkPjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSxcbiAgICAgICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgem9uZTogTmdab25lLFxuICAgICAgICBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29udGVudElkID0gVW5pcXVlQ29tcG9uZW50SWQoKSArICdfY29udGVudCc7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVCYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVCYXIgPSB0aGlzLm1vdmVCYXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uWEJhck1vdXNlRG93biA9IHRoaXMub25YQmFyTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbllCYXJNb3VzZURvd24gPSB0aGlzLm9uWUJhck1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZSA9IHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlVXAgPSB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwLmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4od2luZG93LCAncmVzaXplJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRTY3JvbGxMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZUVudGVyTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbigodGhpcy5jb250ZW50Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWVudGVyJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnhCYXJNb3VzZURvd25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCh0aGlzLnhCYXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicsIHRoaXMub25YQmFyTW91c2VEb3duKTtcbiAgICAgICAgICAgICAgICB0aGlzLnlCYXJNb3VzZURvd25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCh0aGlzLnlCYXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicsIHRoaXMub25ZQmFyTW91c2VEb3duKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUNvbnRhaW5lckhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgKHRoaXMudGVtcGxhdGVzIGFzIFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCkge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gKHRoaXMuY29udGFpbmVyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCBjb250ZW50ID0gKHRoaXMuY29udGVudFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgeEJhciA9ICh0aGlzLnhCYXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3Qgd2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBXaW5kb3c7XG5cbiAgICAgICAgbGV0IGNvbnRhaW5lclN0eWxlczogeyBba2xhc3M6IHN0cmluZ106IGFueSB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKSxcbiAgICAgICAgICAgIHhCYXJTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh4QmFyKSxcbiAgICAgICAgICAgIHB1cmVDb250YWluZXJIZWlnaHQgPSBEb21IYW5kbGVyLmdldEhlaWdodChjb250YWluZXIpIC0gcGFyc2VJbnQoeEJhclN0eWxlc1snaGVpZ2h0J10sIDEwKTtcblxuICAgICAgICBpZiAoY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J10gIT0gJ25vbmUnICYmIHB1cmVDb250YWluZXJIZWlnaHQgPT0gMCkge1xuICAgICAgICAgICAgaWYgKGNvbnRlbnQub2Zmc2V0SGVpZ2h0ICsgcGFyc2VJbnQoeEJhclN0eWxlc1snaGVpZ2h0J10sIDEwKSA+IHBhcnNlSW50KGNvbnRhaW5lclN0eWxlc1snbWF4LWhlaWdodCddLCAxMCkpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBjb250ZW50Lm9mZnNldEhlaWdodCArIHBhcnNlRmxvYXQoY29udGFpbmVyU3R5bGVzLnBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMucGFkZGluZ0JvdHRvbSkgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5ib3JkZXJCb3R0b21XaWR0aCkgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUJhcigpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9ICh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgY29udGVudCA9ICh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IHhCYXIgPSAodGhpcy54QmFyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCB5QmFyID0gKHRoaXMueUJhclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIGZ1bmN0aW9uIGNvbXB1dGVCYXJQb3NpdGlvbigpIHtcbiAgICAgICAgICAgIC8qIGhvcml6b250YWwgc2Nyb2xsICovXG4gICAgICAgICAgICBsZXQgdG90YWxXaWR0aCA9IGNvbnRlbnQuc2Nyb2xsV2lkdGg7XG4gICAgICAgICAgICBsZXQgb3duV2lkdGggPSBjb250ZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgbGV0IGJvdHRvbSA9IChjb250YWluZXIuY2xpZW50SGVpZ2h0IC0geEJhci5jbGllbnRIZWlnaHQpICogLTE7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFhSYXRpbyA9IG93bldpZHRoIC8gdG90YWxXaWR0aDtcblxuICAgICAgICAgICAgLyogdmVydGljYWwgc2Nyb2xsICovXG4gICAgICAgICAgICBsZXQgdG90YWxIZWlnaHQgPSBjb250ZW50LnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIGxldCBvd25IZWlnaHQgPSBjb250ZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIGxldCByaWdodCA9IChjb250YWluZXIuY2xpZW50V2lkdGggLSB5QmFyLmNsaWVudFdpZHRoKSAqIC0xO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxZUmF0aW8gPSBvd25IZWlnaHQgLyB0b3RhbEhlaWdodDtcblxuICAgICAgICAgICAgcmV0dXJuIHsgdG90YWxXaWR0aCwgb3duV2lkdGgsIGJvdHRvbSwgdG90YWxIZWlnaHQsIG93bkhlaWdodCwgcmlnaHQgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGxldCB7IHRvdGFsV2lkdGgsIG93bldpZHRoLCBib3R0b20sIHRvdGFsSGVpZ2h0LCBvd25IZWlnaHQsIHJpZ2h0IH0gPSBjb21wdXRlQmFyUG9zaXRpb24uY2FsbCh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKCh0aGlzLnNjcm9sbFhSYXRpbyBhcyBudW1iZXIpID49IDEpIHtcbiAgICAgICAgICAgICAgICB4QmFyLnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh4QmFyLCAncC1zY3JvbGxwYW5lbC1oaWRkZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeEJhci5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHhCYXIsICdwLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHhCYXJXaWR0aCA9IE1hdGgubWF4KCh0aGlzLnNjcm9sbFhSYXRpbyBhcyBudW1iZXIpICogMTAwLCAxMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeEJhckxlZnQgPSAoY29udGVudC5zY3JvbGxMZWZ0ICogKDEwMCAtIHhCYXJXaWR0aCkpIC8gKHRvdGFsV2lkdGggLSBvd25XaWR0aCk7XG4gICAgICAgICAgICAgICAgeEJhci5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOicgKyB4QmFyV2lkdGggKyAnJTsgbGVmdDonICsgeEJhckxlZnQgKyAnJTtib3R0b206JyArIGJvdHRvbSArICdweDsnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKHRoaXMuc2Nyb2xsWVJhdGlvIGFzIG51bWJlcikgPj0gMSkge1xuICAgICAgICAgICAgICAgIHlCYXIuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHlCYXIsICdwLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB5QmFyLnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWhpZGRlbicsICdmYWxzZScpO1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoeUJhciwgJ3Atc2Nyb2xscGFuZWwtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgeUJhckhlaWdodCA9IE1hdGgubWF4KCh0aGlzLnNjcm9sbFlSYXRpbyBhcyBudW1iZXIpICogMTAwLCAxMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeUJhclRvcCA9IChjb250ZW50LnNjcm9sbFRvcCAqICgxMDAgLSB5QmFySGVpZ2h0KSkgLyAodG90YWxIZWlnaHQgLSBvd25IZWlnaHQpO1xuICAgICAgICAgICAgICAgIHlCYXIuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6JyArIHlCYXJIZWlnaHQgKyAnJTsgdG9wOiBjYWxjKCcgKyB5QmFyVG9wICsgJyUgLSAnICsgeEJhci5jbGllbnRIZWlnaHQgKyAncHgpO3JpZ2h0OicgKyByaWdodCArICdweDsnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvblNjcm9sbChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5sYXN0U2Nyb2xsTGVmdCAhPT0gZXZlbnQudGFyZ2V0LnNjcm9sbExlZnQpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFNjcm9sbExlZnQgPSBldmVudC50YXJnZXQuc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5sYXN0U2Nyb2xsVG9wICE9PSBldmVudC50YXJnZXQuc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBldmVudC50YXJnZXQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vdmVCYXIoKTtcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lcignc2Nyb2xsVG9wJywgdGhpcy5zdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lcignc2Nyb2xsVG9wJywgdGhpcy5zdGVwICogLTEpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuXG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9ubyBvcFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoJ3Njcm9sbExlZnQnLCB0aGlzLnN0ZXApO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZXIoJ3Njcm9sbExlZnQnLCB0aGlzLnN0ZXAgKiAtMSk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzoge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlVcCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgfVxuXG4gICAgcmVwZWF0KGJhciwgc3RlcCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudFtiYXJdICs9IHN0ZXA7XG4gICAgICAgIHRoaXMubW92ZUJhcigpO1xuICAgIH1cblxuICAgIHNldFRpbWVyKGJhciwgc3RlcCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoYmFyLCBzdGVwKTtcbiAgICAgICAgfSwgNDApO1xuICAgIH1cblxuICAgIGNsZWFyVGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRNb3VzZUxpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlKGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VVcChlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50TW91c2VMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbllCYXJNb3VzZURvd24oZTogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLmlzWUJhckNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGUucGFnZVk7XG5cbiAgICAgICAgdGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtZ3JhYmJlZCcsICd0cnVlJyk7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoKHRoaXMueUJhclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG5cbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWdyYWJiZWQnLCAndHJ1ZScpO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgJ3Atc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuICAgICAgICB0aGlzLmJpbmREb2N1bWVudE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblhCYXJNb3VzZURvd24oZTogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLmlzWEJhckNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGUucGFnZVg7XG5cbiAgICAgICAgdGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtZ3JhYmJlZCcsICdmYWxzZScpO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKCh0aGlzLnhCYXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCwgJ3Atc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuXG4gICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1ncmFiYmVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG5cbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Eb2N1bWVudE1vdXNlTW92ZShlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzWEJhckNsaWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmVGb3JYQmFyKGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNZQmFyQ2xpY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvcllCYXIoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlRm9yWEJhcihlKTtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmVGb3JZQmFyKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmVGb3JYQmFyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IGRlbHRhWCA9IGUucGFnZVggLSAodGhpcy5sYXN0UGFnZVggYXMgbnVtYmVyKTtcbiAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBlLnBhZ2VYO1xuXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ICs9IGRlbHRhWCAvICh0aGlzLnNjcm9sbFhSYXRpbyBhcyBudW1iZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZUZvcllCYXIoZTogTW91c2VFdmVudCkge1xuICAgICAgICBsZXQgZGVsdGFZID0gZS5wYWdlWSAtICh0aGlzLmxhc3RQYWdlWSBhcyBudW1iZXIpO1xuICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGUucGFnZVk7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgKHRoaXMuY29udGVudFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCArPSBkZWx0YVkgLyAodGhpcy5zY3JvbGxZUmF0aW8gYXMgbnVtYmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjcm9sbHMgdGhlIHRvcCBsb2NhdGlvbiB0byB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAgICogQHBhcmFtIHNjcm9sbFRvcFxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBzY3JvbGxUb3Aoc2Nyb2xsVG9wOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHNjcm9sbGFibGVIZWlnaHQgPSAodGhpcy5jb250ZW50Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gKHRoaXMuY29udGVudFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgc2Nyb2xsVG9wID0gc2Nyb2xsVG9wID4gc2Nyb2xsYWJsZUhlaWdodCA/IHNjcm9sbGFibGVIZWlnaHQgOiBzY3JvbGxUb3AgPiAwID8gc2Nyb2xsVG9wIDogMDtcbiAgICAgICAgKHRoaXMuY29udGVudFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICB9XG5cbiAgICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRvY3VtZW50TW91c2VVcChlOiBFdmVudCkge1xuICAgICAgICB0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1ncmFiYmVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoKHRoaXMueUJhclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG4gICAgICAgIHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWdyYWJiZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcygodGhpcy54QmFyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQsICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWdyYWJiZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcblxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50TW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5pc1hCYXJDbGlja2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNZQmFyQ2xpY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmOiBWb2lkRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IGZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB0aGlzLnRpbWVvdXRGcmFtZTtcbiAgICAgICAgZnJhbWUoZik7XG4gICAgfVxuXG4gICAgdW5iaW5kTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb250ZW50U2Nyb2xsTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRTY3JvbGxMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb3VzZUVudGVyTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VFbnRlckxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRW50ZXJMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54QmFyTW91c2VEb3duTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMueEJhck1vdXNlRG93bkxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLnhCYXJNb3VzZURvd25MaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55QmFyTW91c2VEb3duTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMueUJhck1vdXNlRG93bkxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLnlCYXJNb3VzZURvd25MaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudW5iaW5kTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVmcmVzaGVzIHRoZSBwb3NpdGlvbiBhbmQgc2l6ZSBvZiB0aGUgc2Nyb2xsYmFyLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLm1vdmVCYXIoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1Njcm9sbFBhbmVsXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTY3JvbGxQYW5lbF1cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsUGFuZWxNb2R1bGUge31cbiJdfQ==