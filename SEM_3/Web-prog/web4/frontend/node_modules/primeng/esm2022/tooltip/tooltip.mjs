import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Directive, Inject, Input, NgModule, PLATFORM_ID, TemplateRef, booleanAttribute, numberAttribute } from '@angular/core';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
/**
 * Tooltip directive provides advisory information for a component.
 * @group Components
 */
export class Tooltip {
    platformId;
    el;
    zone;
    config;
    renderer;
    viewContainer;
    /**
     * Position of the tooltip.
     * @group Props
     */
    tooltipPosition;
    /**
     * Event to show the tooltip.
     * @group Props
     */
    tooltipEvent = 'hover';
    /**
     *  Target element to attach the overlay, valid values are "body", "target" or a local ng-F variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Type of CSS position.
     * @group Props
     */
    positionStyle;
    /**
     * Style class of the tooltip.
     * @group Props
     */
    tooltipStyleClass;
    /**
     * Whether the z-index should be managed automatically to always go on top or have a fixed value.
     * @group Props
     */
    tooltipZIndex;
    /**
     * By default the tooltip contents are rendered as text. Set to false to support html tags in the content.
     * @group Props
     */
    escape = true;
    /**
     * Delay to show the tooltip in milliseconds.
     * @group Props
     */
    showDelay;
    /**
     * Delay to hide the tooltip in milliseconds.
     * @group Props
     */
    hideDelay;
    /**
     * Time to wait in milliseconds to hide the tooltip even it is active.
     * @group Props
     */
    life;
    /**
     * Specifies the additional vertical offset of the tooltip from its default position.
     * @group Props
     */
    positionTop;
    /**
     * Specifies the additional horizontal offset of the tooltip from its default position.
     * @group Props
     */
    positionLeft;
    /**
     * Whether to hide tooltip when hovering over tooltip content.
     * @group Props
     */
    autoHide = true;
    /**
     * Automatically adjusts the element position when there is not enough space on the selected position.
     * @group Props
     */
    fitContent = true;
    /**
     * Whether to hide tooltip on escape key press.
     * @group Props
     */
    hideOnEscape = true;
    /**
     * Content of the tooltip.
     * @group Props
     */
    content;
    /**
     * When present, it specifies that the component should be disabled.
     * @defaultValue false
     * @group Props
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = val;
        this.deactivate();
    }
    /**
     * Specifies the tooltip configuration options for the component.
     * @group Props
     */
    tooltipOptions;
    _tooltipOptions = {
        tooltipLabel: null,
        tooltipPosition: 'right',
        tooltipEvent: 'hover',
        appendTo: 'body',
        positionStyle: null,
        tooltipStyleClass: null,
        tooltipZIndex: 'auto',
        escape: true,
        disabled: null,
        showDelay: null,
        hideDelay: null,
        positionTop: null,
        positionLeft: null,
        life: null,
        autoHide: true,
        hideOnEscape: true,
        id: UniqueComponentId() + '_tooltip'
    };
    _disabled;
    container;
    styleClass;
    tooltipText;
    showTimeout;
    hideTimeout;
    active;
    mouseEnterListener;
    mouseLeaveListener;
    containerMouseleaveListener;
    clickListener;
    focusListener;
    blurListener;
    documentEscapeListener;
    scrollHandler;
    resizeListener;
    interactionInProgress = false;
    constructor(platformId, el, zone, config, renderer, viewContainer) {
        this.platformId = platformId;
        this.el = el;
        this.zone = zone;
        this.config = config;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                const tooltipEvent = this.getOption('tooltipEvent');
                if (tooltipEvent === 'hover' || tooltipEvent === 'both') {
                    this.mouseEnterListener = this.onMouseEnter.bind(this);
                    this.mouseLeaveListener = this.onMouseLeave.bind(this);
                    this.clickListener = this.onInputClick.bind(this);
                    this.el.nativeElement.addEventListener('mouseenter', this.mouseEnterListener);
                    this.el.nativeElement.addEventListener('click', this.clickListener);
                    this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveListener);
                }
                if (tooltipEvent === 'focus' || tooltipEvent === 'both') {
                    this.focusListener = this.onFocus.bind(this);
                    this.blurListener = this.onBlur.bind(this);
                    let target = this.el.nativeElement.querySelector('.p-component');
                    if (!target) {
                        target = this.getTarget(this.el.nativeElement);
                    }
                    target.addEventListener('focus', this.focusListener);
                    target.addEventListener('blur', this.blurListener);
                }
            });
        }
    }
    setAriaDescribedBy() {
        const tooltipId = this.getOption('id');
        if (tooltipId && this.active) {
            this.renderer.setAttribute(this.el.nativeElement, 'aria-describedby', tooltipId);
        }
    }
    removeAriaDescribedBy() {
        this.renderer.removeAttribute(this.el.nativeElement, 'aria-describedby');
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.tooltipPosition) {
            this.setOption({ tooltipPosition: simpleChange.tooltipPosition.currentValue });
        }
        if (simpleChange.tooltipEvent) {
            this.setOption({ tooltipEvent: simpleChange.tooltipEvent.currentValue });
        }
        if (simpleChange.appendTo) {
            this.setOption({ appendTo: simpleChange.appendTo.currentValue });
        }
        if (simpleChange.positionStyle) {
            this.setOption({ positionStyle: simpleChange.positionStyle.currentValue });
        }
        if (simpleChange.tooltipStyleClass) {
            this.setOption({ tooltipStyleClass: simpleChange.tooltipStyleClass.currentValue });
        }
        if (simpleChange.tooltipZIndex) {
            this.setOption({ tooltipZIndex: simpleChange.tooltipZIndex.currentValue });
        }
        if (simpleChange.escape) {
            this.setOption({ escape: simpleChange.escape.currentValue });
        }
        if (simpleChange.showDelay) {
            this.setOption({ showDelay: simpleChange.showDelay.currentValue });
        }
        if (simpleChange.hideDelay) {
            this.setOption({ hideDelay: simpleChange.hideDelay.currentValue });
        }
        if (simpleChange.life) {
            this.setOption({ life: simpleChange.life.currentValue });
        }
        if (simpleChange.positionTop) {
            this.setOption({ positionTop: simpleChange.positionTop.currentValue });
        }
        if (simpleChange.positionLeft) {
            this.setOption({ positionLeft: simpleChange.positionLeft.currentValue });
        }
        if (simpleChange.disabled) {
            this.setOption({ disabled: simpleChange.disabled.currentValue });
        }
        if (simpleChange.content) {
            this.setOption({ tooltipLabel: simpleChange.content.currentValue });
            if (this.active) {
                if (simpleChange.content.currentValue) {
                    if (this.container && this.container.offsetParent) {
                        this.updateText();
                        this.align();
                    }
                    else {
                        this.show();
                    }
                }
                else {
                    this.hide();
                }
            }
        }
        if (simpleChange.autoHide) {
            this.setOption({ autoHide: simpleChange.autoHide.currentValue });
        }
        if (simpleChange.id) {
            this.setOption({ id: simpleChange.id.currentValue });
        }
        if (simpleChange.tooltipOptions) {
            this._tooltipOptions = { ...this._tooltipOptions, ...simpleChange.tooltipOptions.currentValue };
            this.deactivate();
            if (this.active) {
                if (this.getOption('tooltipLabel')) {
                    if (this.container && this.container.offsetParent) {
                        this.updateText();
                        this.align();
                    }
                    else {
                        this.show();
                    }
                }
                else {
                    this.hide();
                }
            }
        }
    }
    isAutoHide() {
        return this.getOption('autoHide');
    }
    onMouseEnter(e) {
        if (!this.container && !this.showTimeout) {
            this.activate();
        }
    }
    onMouseLeave(e) {
        if (!this.isAutoHide()) {
            const valid = DomHandler.hasClass(e.relatedTarget, 'p-tooltip') || DomHandler.hasClass(e.relatedTarget, 'p-tooltip-text') || DomHandler.hasClass(e.relatedTarget, 'p-tooltip-arrow');
            !valid && this.deactivate();
        }
        else {
            this.deactivate();
        }
    }
    onFocus(e) {
        this.activate();
    }
    onBlur(e) {
        this.deactivate();
    }
    onInputClick(e) {
        this.deactivate();
    }
    activate() {
        if (!this.interactionInProgress) {
            this.active = true;
            this.clearHideTimeout();
            if (this.getOption('showDelay'))
                this.showTimeout = setTimeout(() => {
                    this.show();
                }, this.getOption('showDelay'));
            else
                this.show();
            if (this.getOption('life')) {
                let duration = this.getOption('showDelay') ? this.getOption('life') + this.getOption('showDelay') : this.getOption('life');
                this.hideTimeout = setTimeout(() => {
                    this.hide();
                }, duration);
            }
            if (this.getOption('hideOnEscape')) {
                this.documentEscapeListener = this.renderer.listen('document', 'keydown.escape', () => {
                    this.deactivate();
                    this.documentEscapeListener();
                });
            }
        }
        this.interactionInProgress = true;
    }
    deactivate() {
        this.interactionInProgress = false;
        this.active = false;
        this.clearShowTimeout();
        if (this.getOption('hideDelay')) {
            this.clearHideTimeout(); //life timeout
            this.hideTimeout = setTimeout(() => {
                this.hide();
            }, this.getOption('hideDelay'));
        }
        else {
            this.hide();
        }
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
        }
    }
    create() {
        if (this.container) {
            this.clearHideTimeout();
            this.remove();
        }
        this.container = document.createElement('div');
        this.container.setAttribute('id', this.getOption('id'));
        this.container.setAttribute('role', 'tooltip');
        let tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'p-tooltip-arrow';
        this.container.appendChild(tooltipArrow);
        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'p-tooltip-text';
        this.updateText();
        if (this.getOption('positionStyle')) {
            this.container.style.position = this.getOption('positionStyle');
        }
        this.container.appendChild(this.tooltipText);
        if (this.getOption('appendTo') === 'body')
            document.body.appendChild(this.container);
        else if (this.getOption('appendTo') === 'target')
            DomHandler.appendChild(this.container, this.el.nativeElement);
        else
            DomHandler.appendChild(this.container, this.getOption('appendTo'));
        this.container.style.display = 'inline-block';
        if (this.fitContent) {
            this.container.style.width = 'fit-content';
        }
        if (this.isAutoHide()) {
            this.container.style.pointerEvents = 'none';
        }
        else {
            this.container.style.pointerEvents = 'unset';
            this.bindContainerMouseleaveListener();
        }
        this.setAriaDescribedBy();
    }
    bindContainerMouseleaveListener() {
        if (!this.containerMouseleaveListener) {
            const targetEl = this.container ?? this.container.nativeElement;
            this.containerMouseleaveListener = this.renderer.listen(targetEl, 'mouseleave', (e) => {
                this.deactivate();
            });
        }
    }
    unbindContainerMouseleaveListener() {
        if (this.containerMouseleaveListener) {
            this.bindContainerMouseleaveListener();
            this.containerMouseleaveListener = null;
        }
    }
    show() {
        if (!this.getOption('tooltipLabel') || this.getOption('disabled')) {
            return;
        }
        this.create();
        const nativeElement = this.el.nativeElement;
        const pDialogWrapper = nativeElement.closest('p-dialog');
        if (pDialogWrapper) {
            setTimeout(() => {
                this.container && this.align();
            }, 100);
        }
        else {
            this.align();
        }
        DomHandler.fadeIn(this.container, 250);
        if (this.getOption('tooltipZIndex') === 'auto')
            ZIndexUtils.set('tooltip', this.container, this.config.zIndex.tooltip);
        else
            this.container.style.zIndex = this.getOption('tooltipZIndex');
        this.bindDocumentResizeListener();
        this.bindScrollListener();
    }
    hide() {
        if (this.getOption('tooltipZIndex') === 'auto') {
            ZIndexUtils.clear(this.container);
        }
        this.remove();
    }
    updateText() {
        const content = this.getOption('tooltipLabel');
        if (content instanceof TemplateRef) {
            const embeddedViewRef = this.viewContainer.createEmbeddedView(content);
            embeddedViewRef.detectChanges();
            embeddedViewRef.rootNodes.forEach((node) => this.tooltipText.appendChild(node));
        }
        else if (this.getOption('escape')) {
            this.tooltipText.innerHTML = '';
            this.tooltipText.appendChild(document.createTextNode(content));
        }
        else {
            this.tooltipText.innerHTML = content;
        }
    }
    align() {
        let position = this.getOption('tooltipPosition');
        switch (position) {
            case 'top':
                this.alignTop();
                if (this.isOutOfBounds()) {
                    this.alignBottom();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;
            case 'bottom':
                this.alignBottom();
                if (this.isOutOfBounds()) {
                    this.alignTop();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;
            case 'left':
                this.alignLeft();
                if (this.isOutOfBounds()) {
                    this.alignRight();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
            case 'right':
                this.alignRight();
                if (this.isOutOfBounds()) {
                    this.alignLeft();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
        }
    }
    getHostOffset() {
        if (this.getOption('appendTo') === 'body' || this.getOption('appendTo') === 'target') {
            let offset = this.el.nativeElement.getBoundingClientRect();
            let targetLeft = offset.left + DomHandler.getWindowScrollLeft();
            let targetTop = offset.top + DomHandler.getWindowScrollTop();
            return { left: targetLeft, top: targetTop };
        }
        else {
            return { left: 0, top: 0 };
        }
    }
    alignRight() {
        this.preAlign('right');
        const el = this.activeElement;
        const hostOffset = this.getHostOffset();
        const left = hostOffset.left + DomHandler.getOuterWidth(el);
        const top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    get activeElement() {
        return this.el.nativeElement.nodeName.includes('P-') ? DomHandler.findSingle(this.el.nativeElement, '.p-component') || this.el.nativeElement : this.el.nativeElement;
    }
    alignLeft() {
        this.preAlign('left');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left - DomHandler.getOuterWidth(this.container);
        let top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    alignTop() {
        this.preAlign('top');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top - DomHandler.getOuterHeight(this.container);
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    alignBottom() {
        this.preAlign('bottom');
        let hostOffset = this.getHostOffset();
        let left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        let top = hostOffset.top + DomHandler.getOuterHeight(this.el.nativeElement);
        this.container.style.left = left + this.getOption('positionLeft') + 'px';
        this.container.style.top = top + this.getOption('positionTop') + 'px';
    }
    setOption(option) {
        this._tooltipOptions = { ...this._tooltipOptions, ...option };
    }
    getOption(option) {
        return this._tooltipOptions[option];
    }
    getTarget(el) {
        return DomHandler.hasClass(el, 'p-inputwrapper') ? DomHandler.findSingle(el, 'input') : el;
    }
    preAlign(position) {
        this.container.style.left = -999 + 'px';
        this.container.style.top = -999 + 'px';
        let defaultClassName = 'p-tooltip p-component p-tooltip-' + position;
        this.container.className = this.getOption('tooltipStyleClass') ? defaultClassName + ' ' + this.getOption('tooltipStyleClass') : defaultClassName;
    }
    isOutOfBounds() {
        let offset = this.container.getBoundingClientRect();
        let targetTop = offset.top;
        let targetLeft = offset.left;
        let width = DomHandler.getOuterWidth(this.container);
        let height = DomHandler.getOuterHeight(this.container);
        let viewport = DomHandler.getViewport();
        return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
    }
    onWindowResize(e) {
        this.hide();
    }
    bindDocumentResizeListener() {
        this.zone.runOutsideAngular(() => {
            this.resizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.resizeListener);
        });
    }
    unbindDocumentResizeListener() {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
                if (this.container) {
                    this.hide();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    unbindEvents() {
        const tooltipEvent = this.getOption('tooltipEvent');
        if (tooltipEvent === 'hover' || tooltipEvent === 'both') {
            this.el.nativeElement.removeEventListener('mouseenter', this.mouseEnterListener);
            this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener);
            this.el.nativeElement.removeEventListener('click', this.clickListener);
        }
        if (tooltipEvent === 'focus' || tooltipEvent === 'both') {
            let target = this.el.nativeElement.querySelector('.p-component');
            if (!target) {
                target = this.getTarget(this.el.nativeElement);
            }
        }
        this.unbindDocumentResizeListener();
    }
    remove() {
        if (this.container && this.container.parentElement) {
            if (this.getOption('appendTo') === 'body')
                document.body.removeChild(this.container);
            else if (this.getOption('appendTo') === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                DomHandler.removeChild(this.container, this.getOption('appendTo'));
        }
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.unbindContainerMouseleaveListener();
        this.clearTimeouts();
        this.removeAriaDescribedBy();
        this.container = null;
        this.scrollHandler = null;
    }
    clearShowTimeout() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    }
    clearHideTimeout() {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }
    clearTimeouts() {
        this.clearShowTimeout();
        this.clearHideTimeout();
    }
    ngOnDestroy() {
        this.unbindEvents();
        if (this.container) {
            ZIndexUtils.clear(this.container);
        }
        this.remove();
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Tooltip, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.PrimeNGConfig }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "18.0.1", type: Tooltip, selector: "[pTooltip]", inputs: { tooltipPosition: "tooltipPosition", tooltipEvent: "tooltipEvent", appendTo: "appendTo", positionStyle: "positionStyle", tooltipStyleClass: "tooltipStyleClass", tooltipZIndex: "tooltipZIndex", escape: ["escape", "escape", booleanAttribute], showDelay: ["showDelay", "showDelay", numberAttribute], hideDelay: ["hideDelay", "hideDelay", numberAttribute], life: ["life", "life", numberAttribute], positionTop: ["positionTop", "positionTop", numberAttribute], positionLeft: ["positionLeft", "positionLeft", numberAttribute], autoHide: ["autoHide", "autoHide", booleanAttribute], fitContent: ["fitContent", "fitContent", booleanAttribute], hideOnEscape: ["hideOnEscape", "hideOnEscape", booleanAttribute], content: ["pTooltip", "content"], disabled: ["tooltipDisabled", "disabled"], tooltipOptions: "tooltipOptions" }, host: { classAttribute: "p-element" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Tooltip, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pTooltip]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.PrimeNGConfig }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }], propDecorators: { tooltipPosition: [{
                type: Input
            }], tooltipEvent: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], positionStyle: [{
                type: Input
            }], tooltipStyleClass: [{
                type: Input
            }], tooltipZIndex: [{
                type: Input
            }], escape: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showDelay: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], hideDelay: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], life: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], positionTop: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], positionLeft: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], autoHide: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], fitContent: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], hideOnEscape: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], content: [{
                type: Input,
                args: ['pTooltip']
            }], disabled: [{
                type: Input,
                args: ['tooltipDisabled']
            }], tooltipOptions: [{
                type: Input
            }] } });
export class TooltipModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: TooltipModule, declarations: [Tooltip], imports: [CommonModule], exports: [Tooltip] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TooltipModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Tooltip],
                    declarations: [Tooltip]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90b29sdGlwL3Rvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBaUIsU0FBUyxFQUFjLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFxQixXQUFXLEVBQTRCLFdBQVcsRUFBb0IsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFOLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRS9EOzs7R0FHRztBQU9ILE1BQU0sT0FBTyxPQUFPO0lBMEppQjtJQUN0QjtJQUNBO0lBQ0E7SUFDQztJQUNBO0lBOUpaOzs7T0FHRztJQUNNLGVBQWUsQ0FBMkQ7SUFDbkY7OztPQUdHO0lBQ00sWUFBWSxHQUE4QyxPQUFPLENBQUM7SUFDM0U7OztPQUdHO0lBQ00sUUFBUSxDQUFnRjtJQUNqRzs7O09BR0c7SUFDTSxhQUFhLENBQXFCO0lBQzNDOzs7T0FHRztJQUNNLGlCQUFpQixDQUFxQjtJQUMvQzs7O09BR0c7SUFDTSxhQUFhLENBQXFCO0lBQzNDOzs7T0FHRztJQUNxQyxNQUFNLEdBQVksSUFBSSxDQUFDO0lBQy9EOzs7T0FHRztJQUNvQyxTQUFTLENBQXFCO0lBQ3JFOzs7T0FHRztJQUNvQyxTQUFTLENBQXFCO0lBQ3JFOzs7T0FHRztJQUNvQyxJQUFJLENBQXFCO0lBQ2hFOzs7T0FHRztJQUNvQyxXQUFXLENBQXFCO0lBQ3ZFOzs7T0FHRztJQUNvQyxZQUFZLENBQXFCO0lBQ3hFOzs7T0FHRztJQUNxQyxRQUFRLEdBQVksSUFBSSxDQUFDO0lBQ2pFOzs7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LEdBQUcsVUFBVSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMxRSxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUgsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3pFLElBQUks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ZUFBZSxFQUFFO2dCQUtFLElBQUk7c0JBQTFDLEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFO2dCQUtFLFdBQVc7c0JBQWpELEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFO2dCQUtFLFlBQVk7c0JBQWxELEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFO2dCQUtHLFFBQVE7c0JBQS9DLEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBS0UsVUFBVTtzQkFBakQsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTtnQkFLRSxZQUFZO3NCQUFuRCxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQUtuQixPQUFPO3NCQUF6QixLQUFLO3VCQUFDLFVBQVU7Z0JBTWEsUUFBUTtzQkFBckMsS0FBSzt1QkFBQyxpQkFBaUI7Z0JBV2YsY0FBYztzQkFBdEIsS0FBSzs7QUErb0JWLE1BQU0sT0FBTyxhQUFhO3VHQUFiLGFBQWE7d0dBQWIsYUFBYSxpQkFodkJiLE9BQU8sYUE0dUJOLFlBQVksYUE1dUJiLE9BQU87d0dBZ3ZCUCxhQUFhLFlBSlosWUFBWTs7MkZBSWIsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO2lCQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBOZ01vZHVsZSwgTmdab25lLCBPbkRlc3Ryb3ksIFBMQVRGT1JNX0lELCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmLCBib29sZWFuQXR0cmlidXRlLCBudW1iZXJBdHRyaWJ1dGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lTkdDb25maWcsIFRvb2x0aXBPcHRpb25zIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIsIERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCwgWkluZGV4VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuLyoqXG4gKiBUb29sdGlwIGRpcmVjdGl2ZSBwcm92aWRlcyBhZHZpc29yeSBpbmZvcm1hdGlvbiBmb3IgYSBjb21wb25lbnQuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twVG9vbHRpcF0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUb29sdGlwIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiB0aGUgdG9vbHRpcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb246ICdyaWdodCcgfCAnbGVmdCcgfCAndG9wJyB8ICdib3R0b20nIHwgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEV2ZW50IHRvIHNob3cgdGhlIHRvb2x0aXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdG9vbHRpcEV2ZW50OiAnaG92ZXInIHwgJ2ZvY3VzJyB8ICdib3RoJyB8IHN0cmluZyB8IGFueSA9ICdob3Zlcic7XG4gICAgLyoqXG4gICAgICogIFRhcmdldCBlbGVtZW50IHRvIGF0dGFjaCB0aGUgb3ZlcmxheSwgdmFsaWQgdmFsdWVzIGFyZSBcImJvZHlcIiwgXCJ0YXJnZXRcIiBvciBhIGxvY2FsIG5nLUYgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nICNteWRpdiBhcyB2YXJpYWJsZSBuYW1lKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgfCBhbnk7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiBDU1MgcG9zaXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcG9zaXRpb25TdHlsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSB0b29sdGlwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgei1pbmRleCBzaG91bGQgYmUgbWFuYWdlZCBhdXRvbWF0aWNhbGx5IHRvIGFsd2F5cyBnbyBvbiB0b3Agb3IgaGF2ZSBhIGZpeGVkIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBaSW5kZXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBCeSBkZWZhdWx0IHRoZSB0b29sdGlwIGNvbnRlbnRzIGFyZSByZW5kZXJlZCBhcyB0ZXh0LiBTZXQgdG8gZmFsc2UgdG8gc3VwcG9ydCBodG1sIHRhZ3MgaW4gdGhlIGNvbnRlbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGVzY2FwZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVsYXkgdG8gc2hvdyB0aGUgdG9vbHRpcCBpbiBtaWxsaXNlY29uZHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgc2hvd0RlbGF5OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVsYXkgdG8gaGlkZSB0aGUgdG9vbHRpcCBpbiBtaWxsaXNlY29uZHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgaGlkZURlbGF5OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGltZSB0byB3YWl0IGluIG1pbGxpc2Vjb25kcyB0byBoaWRlIHRoZSB0b29sdGlwIGV2ZW4gaXQgaXMgYWN0aXZlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGxpZmU6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGFkZGl0aW9uYWwgdmVydGljYWwgb2Zmc2V0IG9mIHRoZSB0b29sdGlwIGZyb20gaXRzIGRlZmF1bHQgcG9zaXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgcG9zaXRpb25Ub3A6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIGFkZGl0aW9uYWwgaG9yaXpvbnRhbCBvZmZzZXQgb2YgdGhlIHRvb2x0aXAgZnJvbSBpdHMgZGVmYXVsdCBwb3NpdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBwb3NpdGlvbkxlZnQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGhpZGUgdG9vbHRpcCB3aGVuIGhvdmVyaW5nIG92ZXIgdG9vbHRpcCBjb250ZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhdXRvSGlkZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQXV0b21hdGljYWxseSBhZGp1c3RzIHRoZSBlbGVtZW50IHBvc2l0aW9uIHdoZW4gdGhlcmUgaXMgbm90IGVub3VnaCBzcGFjZSBvbiB0aGUgc2VsZWN0ZWQgcG9zaXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGZpdENvbnRlbnQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gaGlkZSB0b29sdGlwIG9uIGVzY2FwZSBrZXkgcHJlc3MuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGhpZGVPbkVzY2FwZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQ29udGVudCBvZiB0aGUgdG9vbHRpcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoJ3BUb29sdGlwJykgY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8SFRNTEVsZW1lbnQ+IHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBmYWxzZVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgndG9vbHRpcERpc2FibGVkJykgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgYXMgYm9vbGVhbjtcbiAgICB9XG4gICAgc2V0IGRpc2FibGVkKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgdG9vbHRpcCBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdG9vbHRpcE9wdGlvbnM6IFRvb2x0aXBPcHRpb25zIHwgdW5kZWZpbmVkO1xuXG4gICAgX3Rvb2x0aXBPcHRpb25zID0ge1xuICAgICAgICB0b29sdGlwTGFiZWw6IG51bGwsXG4gICAgICAgIHRvb2x0aXBQb3NpdGlvbjogJ3JpZ2h0JyxcbiAgICAgICAgdG9vbHRpcEV2ZW50OiAnaG92ZXInLFxuICAgICAgICBhcHBlbmRUbzogJ2JvZHknLFxuICAgICAgICBwb3NpdGlvblN0eWxlOiBudWxsLFxuICAgICAgICB0b29sdGlwU3R5bGVDbGFzczogbnVsbCxcbiAgICAgICAgdG9vbHRpcFpJbmRleDogJ2F1dG8nLFxuICAgICAgICBlc2NhcGU6IHRydWUsXG4gICAgICAgIGRpc2FibGVkOiBudWxsLFxuICAgICAgICBzaG93RGVsYXk6IG51bGwsXG4gICAgICAgIGhpZGVEZWxheTogbnVsbCxcbiAgICAgICAgcG9zaXRpb25Ub3A6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uTGVmdDogbnVsbCxcbiAgICAgICAgbGlmZTogbnVsbCxcbiAgICAgICAgYXV0b0hpZGU6IHRydWUsXG4gICAgICAgIGhpZGVPbkVzY2FwZTogdHJ1ZSxcbiAgICAgICAgaWQ6IFVuaXF1ZUNvbXBvbmVudElkKCkgKyAnX3Rvb2x0aXAnXG4gICAgfTtcblxuICAgIF9kaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnRhaW5lcjogYW55O1xuXG4gICAgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgdG9vbHRpcFRleHQ6IGFueTtcblxuICAgIHNob3dUaW1lb3V0OiBhbnk7XG5cbiAgICBoaWRlVGltZW91dDogYW55O1xuXG4gICAgYWN0aXZlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgbW91c2VFbnRlckxpc3RlbmVyOiBOdWxsYWJsZTxGdW5jdGlvbj47XG5cbiAgICBtb3VzZUxlYXZlTGlzdGVuZXI6IE51bGxhYmxlPEZ1bmN0aW9uPjtcblxuICAgIGNvbnRhaW5lck1vdXNlbGVhdmVMaXN0ZW5lcjogTnVsbGFibGU8RnVuY3Rpb24+O1xuXG4gICAgY2xpY2tMaXN0ZW5lcjogTnVsbGFibGU8RnVuY3Rpb24+O1xuXG4gICAgZm9jdXNMaXN0ZW5lcjogTnVsbGFibGU8RnVuY3Rpb24+O1xuXG4gICAgYmx1ckxpc3RlbmVyOiBOdWxsYWJsZTxGdW5jdGlvbj47XG5cbiAgICBkb2N1bWVudEVzY2FwZUxpc3RlbmVyOiBOdWxsYWJsZTxGdW5jdGlvbj47XG5cbiAgICBzY3JvbGxIYW5kbGVyOiBhbnk7XG5cbiAgICByZXNpemVMaXN0ZW5lcjogYW55O1xuXG4gICAgaW50ZXJhY3Rpb25JblByb2dyZXNzID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWZcbiAgICApIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvb2x0aXBFdmVudCA9IHRoaXMuZ2V0T3B0aW9uKCd0b29sdGlwRXZlbnQnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0b29sdGlwRXZlbnQgPT09ICdob3ZlcicgfHwgdG9vbHRpcEV2ZW50ID09PSAnYm90aCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3VzZUVudGVyTGlzdGVuZXIgPSB0aGlzLm9uTW91c2VFbnRlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlTGVhdmVMaXN0ZW5lciA9IHRoaXMub25Nb3VzZUxlYXZlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tMaXN0ZW5lciA9IHRoaXMub25JbnB1dENsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5tb3VzZUVudGVyTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMubW91c2VMZWF2ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRvb2x0aXBFdmVudCA9PT0gJ2ZvY3VzJyB8fCB0b29sdGlwRXZlbnQgPT09ICdib3RoJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzTGlzdGVuZXIgPSB0aGlzLm9uRm9jdXMuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ibHVyTGlzdGVuZXIgPSB0aGlzLm9uQmx1ci5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnAtY29tcG9uZW50Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0VGFyZ2V0KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLmZvY3VzTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuYmx1ckxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEFyaWFEZXNjcmliZWRCeSgpIHtcbiAgICAgICAgY29uc3QgdG9vbHRpcElkID0gdGhpcy5nZXRPcHRpb24oJ2lkJyk7XG4gICAgICAgIGlmICh0b29sdGlwSWQgJiYgdGhpcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2FyaWEtZGVzY3JpYmVkYnknLCB0b29sdGlwSWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQXJpYURlc2NyaWJlZEJ5KCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5Jyk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudG9vbHRpcFBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IHRvb2x0aXBQb3NpdGlvbjogc2ltcGxlQ2hhbmdlLnRvb2x0aXBQb3NpdGlvbi5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnRvb2x0aXBFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oeyB0b29sdGlwRXZlbnQ6IHNpbXBsZUNoYW5nZS50b29sdGlwRXZlbnQuY3VycmVudFZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oeyBhcHBlbmRUbzogc2ltcGxlQ2hhbmdlLmFwcGVuZFRvLmN1cnJlbnRWYWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UucG9zaXRpb25TdHlsZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oeyBwb3NpdGlvblN0eWxlOiBzaW1wbGVDaGFuZ2UucG9zaXRpb25TdHlsZS5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnRvb2x0aXBTdHlsZUNsYXNzKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IHRvb2x0aXBTdHlsZUNsYXNzOiBzaW1wbGVDaGFuZ2UudG9vbHRpcFN0eWxlQ2xhc3MuY3VycmVudFZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS50b29sdGlwWkluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IHRvb2x0aXBaSW5kZXg6IHNpbXBsZUNoYW5nZS50b29sdGlwWkluZGV4LmN1cnJlbnRWYWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UuZXNjYXBlKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IGVzY2FwZTogc2ltcGxlQ2hhbmdlLmVzY2FwZS5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnNob3dEZWxheSkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oeyBzaG93RGVsYXk6IHNpbXBsZUNoYW5nZS5zaG93RGVsYXkuY3VycmVudFZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5oaWRlRGVsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgaGlkZURlbGF5OiBzaW1wbGVDaGFuZ2UuaGlkZURlbGF5LmN1cnJlbnRWYWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UubGlmZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb24oeyBsaWZlOiBzaW1wbGVDaGFuZ2UubGlmZS5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnBvc2l0aW9uVG9wKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IHBvc2l0aW9uVG9wOiBzaW1wbGVDaGFuZ2UucG9zaXRpb25Ub3AuY3VycmVudFZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5wb3NpdGlvbkxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgcG9zaXRpb25MZWZ0OiBzaW1wbGVDaGFuZ2UucG9zaXRpb25MZWZ0LmN1cnJlbnRWYWx1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgZGlzYWJsZWQ6IHNpbXBsZUNoYW5nZS5kaXNhYmxlZC5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgdG9vbHRpcExhYmVsOiBzaW1wbGVDaGFuZ2UuY29udGVudC5jdXJyZW50VmFsdWUgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzaW1wbGVDaGFuZ2UuY29udGVudC5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuY29udGFpbmVyLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UuYXV0b0hpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKHsgYXV0b0hpZGU6IHNpbXBsZUNoYW5nZS5hdXRvSGlkZS5jdXJyZW50VmFsdWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmlkKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbih7IGlkOiBzaW1wbGVDaGFuZ2UuaWQuY3VycmVudFZhbHVlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS50b29sdGlwT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcE9wdGlvbnMgPSB7IC4uLnRoaXMuX3Rvb2x0aXBPcHRpb25zLCAuLi5zaW1wbGVDaGFuZ2UudG9vbHRpcE9wdGlvbnMuY3VycmVudFZhbHVlIH07XG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCd0b29sdGlwTGFiZWwnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNBdXRvSGlkZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3B0aW9uKCdhdXRvSGlkZScpO1xuICAgIH1cblxuICAgIG9uTW91c2VFbnRlcihlOiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGFpbmVyICYmICF0aGlzLnNob3dUaW1lb3V0KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlTGVhdmUoZTogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNBdXRvSGlkZSgpKSB7XG4gICAgICAgICAgICBjb25zdCB2YWxpZCA9IERvbUhhbmRsZXIuaGFzQ2xhc3MoZS5yZWxhdGVkVGFyZ2V0LCAncC10b29sdGlwJykgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhlLnJlbGF0ZWRUYXJnZXQsICdwLXRvb2x0aXAtdGV4dCcpIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZS5yZWxhdGVkVGFyZ2V0LCAncC10b29sdGlwLWFycm93Jyk7XG4gICAgICAgICAgICAhdmFsaWQgJiYgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRm9jdXMoZTogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIG9uQmx1cihlOiBFdmVudCkge1xuICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBvbklucHV0Q2xpY2soZTogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnRlcmFjdGlvbkluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJIaWRlVGltZW91dCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRPcHRpb24oJ3Nob3dEZWxheScpKVxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5nZXRPcHRpb24oJ3Nob3dEZWxheScpKTtcbiAgICAgICAgICAgIGVsc2UgdGhpcy5zaG93KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdldE9wdGlvbignbGlmZScpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gdGhpcy5nZXRPcHRpb24oJ3Nob3dEZWxheScpID8gdGhpcy5nZXRPcHRpb24oJ2xpZmUnKSArIHRoaXMuZ2V0T3B0aW9uKCdzaG93RGVsYXknKSA6IHRoaXMuZ2V0T3B0aW9uKCdsaWZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdldE9wdGlvbignaGlkZU9uRXNjYXBlJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAna2V5ZG93bi5lc2NhcGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmludGVyYWN0aW9uSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgfVxuXG4gICAgZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5pbnRlcmFjdGlvbkluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbGVhclNob3dUaW1lb3V0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCdoaWRlRGVsYXknKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckhpZGVUaW1lb3V0KCk7IC8vbGlmZSB0aW1lb3V0XG4gICAgICAgICAgICB0aGlzLmhpZGVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICB9LCB0aGlzLmdldE9wdGlvbignaGlkZURlbGF5JykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFySGlkZVRpbWVvdXQoKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5nZXRPcHRpb24oJ2lkJykpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndG9vbHRpcCcpO1xuXG4gICAgICAgIGxldCB0b29sdGlwQXJyb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9vbHRpcEFycm93LmNsYXNzTmFtZSA9ICdwLXRvb2x0aXAtYXJyb3cnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b29sdGlwQXJyb3cpO1xuXG4gICAgICAgIHRoaXMudG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy50b29sdGlwVGV4dC5jbGFzc05hbWUgPSAncC10b29sdGlwLXRleHQnO1xuXG4gICAgICAgIHRoaXMudXBkYXRlVGV4dCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbigncG9zaXRpb25TdHlsZScpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IHRoaXMuZ2V0T3B0aW9uKCdwb3NpdGlvblN0eWxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBUZXh0KTtcblxuICAgICAgICBpZiAodGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJykgPT09ICdib2R5JykgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpID09PSAndGFyZ2V0JykgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lciwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgZWxzZSBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuXG4gICAgICAgIGlmICh0aGlzLmZpdENvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoID0gJ2ZpdC1jb250ZW50JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzQXV0b0hpZGUoKSkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAndW5zZXQnO1xuICAgICAgICAgICAgdGhpcy5iaW5kQ29udGFpbmVyTW91c2VsZWF2ZUxpc3RlbmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEFyaWFEZXNjcmliZWRCeSgpO1xuICAgIH1cblxuICAgIGJpbmRDb250YWluZXJNb3VzZWxlYXZlTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250YWluZXJNb3VzZWxlYXZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldEVsOiBhbnkgPSB0aGlzLmNvbnRhaW5lciA/PyB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lck1vdXNlbGVhdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRhcmdldEVsLCAnbW91c2VsZWF2ZScsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZENvbnRhaW5lck1vdXNlbGVhdmVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyTW91c2VsZWF2ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRDb250YWluZXJNb3VzZWxlYXZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyTW91c2VsZWF2ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBMYWJlbCcpIHx8IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuXG4gICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHBEaWFsb2dXcmFwcGVyID0gbmF0aXZlRWxlbWVudC5jbG9zZXN0KCdwLWRpYWxvZycpO1xuXG4gICAgICAgIGlmIChwRGlhbG9nV3JhcHBlcikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgJiYgdGhpcy5hbGlnbigpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIERvbUhhbmRsZXIuZmFkZUluKHRoaXMuY29udGFpbmVyLCAyNTApO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE9wdGlvbigndG9vbHRpcFpJbmRleCcpID09PSAnYXV0bycpIFpJbmRleFV0aWxzLnNldCgndG9vbHRpcCcsIHRoaXMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy56SW5kZXgudG9vbHRpcCk7XG4gICAgICAgIGVsc2UgdGhpcy5jb250YWluZXIuc3R5bGUuekluZGV4ID0gdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBaSW5kZXgnKTtcblxuICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCd0b29sdGlwWkluZGV4JykgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5jb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUZXh0KCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBMYWJlbCcpO1xuICAgICAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgICBjb25zdCBlbWJlZGRlZFZpZXdSZWYgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbnRlbnQpO1xuICAgICAgICAgICAgZW1iZWRkZWRWaWV3UmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIGVtYmVkZGVkVmlld1JlZi5yb290Tm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gdGhpcy50b29sdGlwVGV4dC5hcHBlbmRDaGlsZChub2RlKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5nZXRPcHRpb24oJ2VzY2FwZScpKSB7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBUZXh0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwVGV4dC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXBUZXh0LmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbigpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gdGhpcy5nZXRPcHRpb24oJ3Rvb2x0aXBQb3NpdGlvbicpO1xuXG4gICAgICAgIHN3aXRjaCAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnblRvcCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduQm90dG9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblJpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbkJvdHRvbSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblJpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25MZWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25SaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblRvcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsaWduQm90dG9tKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmFsaWduUmlnaHQoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbkxlZnQoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc091dE9mQm91bmRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25Ub3AoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNPdXRPZkJvdW5kcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbkJvdHRvbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SG9zdE9mZnNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpID09PSAnYm9keScgfHwgdGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJykgPT09ICd0YXJnZXQnKSB7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbGV0IHRhcmdldExlZnQgPSBvZmZzZXQubGVmdCArIERvbUhhbmRsZXIuZ2V0V2luZG93U2Nyb2xsTGVmdCgpO1xuICAgICAgICAgICAgbGV0IHRhcmdldFRvcCA9IG9mZnNldC50b3AgKyBEb21IYW5kbGVyLmdldFdpbmRvd1Njcm9sbFRvcCgpO1xuXG4gICAgICAgICAgICByZXR1cm4geyBsZWZ0OiB0YXJnZXRMZWZ0LCB0b3A6IHRhcmdldFRvcCB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHsgbGVmdDogMCwgdG9wOiAwIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnblJpZ2h0KCkge1xuICAgICAgICB0aGlzLnByZUFsaWduKCdyaWdodCcpO1xuICAgICAgICBjb25zdCBlbCA9IHRoaXMuYWN0aXZlRWxlbWVudDtcblxuICAgICAgICBjb25zdCBob3N0T2Zmc2V0ID0gdGhpcy5nZXRIb3N0T2Zmc2V0KCk7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBob3N0T2Zmc2V0LmxlZnQgKyBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoZWwpO1xuICAgICAgICBjb25zdCB0b3AgPSBob3N0T2Zmc2V0LnRvcCArIChEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KGVsKSAtIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250YWluZXIpKSAvIDI7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0ICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uTGVmdCcpICsgJ3B4JztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gdG9wICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uVG9wJykgKyAncHgnO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IGFjdGl2ZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lLmluY2x1ZGVzKCdQLScpID8gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLWNvbXBvbmVudCcpIHx8IHRoaXMuZWwubmF0aXZlRWxlbWVudCA6IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBhbGlnbkxlZnQoKSB7XG4gICAgICAgIHRoaXMucHJlQWxpZ24oJ2xlZnQnKTtcbiAgICAgICAgbGV0IGhvc3RPZmZzZXQgPSB0aGlzLmdldEhvc3RPZmZzZXQoKTtcbiAgICAgICAgbGV0IGxlZnQgPSBob3N0T2Zmc2V0LmxlZnQgLSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXIpO1xuICAgICAgICBsZXQgdG9wID0gaG9zdE9mZnNldC50b3AgKyAoRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIC0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcikpIC8gMjtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IGxlZnQgKyB0aGlzLmdldE9wdGlvbigncG9zaXRpb25MZWZ0JykgKyAncHgnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSB0b3AgKyB0aGlzLmdldE9wdGlvbigncG9zaXRpb25Ub3AnKSArICdweCc7XG4gICAgfVxuXG4gICAgYWxpZ25Ub3AoKSB7XG4gICAgICAgIHRoaXMucHJlQWxpZ24oJ3RvcCcpO1xuICAgICAgICBsZXQgaG9zdE9mZnNldCA9IHRoaXMuZ2V0SG9zdE9mZnNldCgpO1xuICAgICAgICBsZXQgbGVmdCA9IGhvc3RPZmZzZXQubGVmdCArIChEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5lbC5uYXRpdmVFbGVtZW50KSAtIERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmNvbnRhaW5lcikpIC8gMjtcbiAgICAgICAgbGV0IHRvcCA9IGhvc3RPZmZzZXQudG9wIC0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0ICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uTGVmdCcpICsgJ3B4JztcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gdG9wICsgdGhpcy5nZXRPcHRpb24oJ3Bvc2l0aW9uVG9wJykgKyAncHgnO1xuICAgIH1cblxuICAgIGFsaWduQm90dG9tKCkge1xuICAgICAgICB0aGlzLnByZUFsaWduKCdib3R0b20nKTtcbiAgICAgICAgbGV0IGhvc3RPZmZzZXQgPSB0aGlzLmdldEhvc3RPZmZzZXQoKTtcbiAgICAgICAgbGV0IGxlZnQgPSBob3N0T2Zmc2V0LmxlZnQgKyAoRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuZWwubmF0aXZlRWxlbWVudCkgLSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXIpKSAvIDI7XG4gICAgICAgIGxldCB0b3AgPSBob3N0T2Zmc2V0LnRvcCArIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IGxlZnQgKyB0aGlzLmdldE9wdGlvbigncG9zaXRpb25MZWZ0JykgKyAncHgnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSB0b3AgKyB0aGlzLmdldE9wdGlvbigncG9zaXRpb25Ub3AnKSArICdweCc7XG4gICAgfVxuXG4gICAgc2V0T3B0aW9uKG9wdGlvbjogYW55KSB7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXBPcHRpb25zID0geyAuLi50aGlzLl90b29sdGlwT3B0aW9ucywgLi4ub3B0aW9uIH07XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uKG9wdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwT3B0aW9uc1tvcHRpb24gYXMga2V5b2YgdHlwZW9mIHRoaXMudG9vbHRpcE9wdGlvbnNdO1xuICAgIH1cblxuICAgIGdldFRhcmdldChlbDogRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5oYXNDbGFzcyhlbCwgJ3AtaW5wdXR3cmFwcGVyJykgPyBEb21IYW5kbGVyLmZpbmRTaW5nbGUoZWwsICdpbnB1dCcpIDogZWw7XG4gICAgfVxuXG4gICAgcHJlQWxpZ24ocG9zaXRpb246IHN0cmluZykge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gLTk5OSArICdweCc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IC05OTkgKyAncHgnO1xuXG4gICAgICAgIGxldCBkZWZhdWx0Q2xhc3NOYW1lID0gJ3AtdG9vbHRpcCBwLWNvbXBvbmVudCBwLXRvb2x0aXAtJyArIHBvc2l0aW9uO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc05hbWUgPSB0aGlzLmdldE9wdGlvbigndG9vbHRpcFN0eWxlQ2xhc3MnKSA/IGRlZmF1bHRDbGFzc05hbWUgKyAnICcgKyB0aGlzLmdldE9wdGlvbigndG9vbHRpcFN0eWxlQ2xhc3MnKSA6IGRlZmF1bHRDbGFzc05hbWU7XG4gICAgfVxuXG4gICAgaXNPdXRPZkJvdW5kcygpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgdGFyZ2V0VG9wID0gb2Zmc2V0LnRvcDtcbiAgICAgICAgbGV0IHRhcmdldExlZnQgPSBvZmZzZXQubGVmdDtcbiAgICAgICAgbGV0IHdpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgbGV0IGhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250YWluZXIpO1xuICAgICAgICBsZXQgdmlld3BvcnQgPSBEb21IYW5kbGVyLmdldFZpZXdwb3J0KCk7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldExlZnQgKyB3aWR0aCA+IHZpZXdwb3J0LndpZHRoIHx8IHRhcmdldExlZnQgPCAwIHx8IHRhcmdldFRvcCA8IDAgfHwgdGFyZ2V0VG9wICsgaGVpZ2h0ID4gdmlld3BvcnQuaGVpZ2h0O1xuICAgIH1cblxuICAgIG9uV2luZG93UmVzaXplKGU6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVMaXN0ZW5lciA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZFNjcm9sbExpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gbmV3IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXBFdmVudCA9IHRoaXMuZ2V0T3B0aW9uKCd0b29sdGlwRXZlbnQnKTtcblxuICAgICAgICBpZiAodG9vbHRpcEV2ZW50ID09PSAnaG92ZXInIHx8IHRvb2x0aXBFdmVudCA9PT0gJ2JvdGgnKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMubW91c2VFbnRlckxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5tb3VzZUxlYXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9vbHRpcEV2ZW50ID09PSAnZm9jdXMnIHx8IHRvb2x0aXBFdmVudCA9PT0gJ2JvdGgnKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wLWNvbXBvbmVudCcpO1xuXG4gICAgICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0VGFyZ2V0KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpID09PSAnYm9keScpIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJykgPT09ICd0YXJnZXQnKSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgZWxzZSBEb21IYW5kbGVyLnJlbW92ZUNoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZENvbnRhaW5lck1vdXNlbGVhdmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dHMoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVBcmlhRGVzY3JpYmVkQnkoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGNsZWFyU2hvd1RpbWVvdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLnNob3dUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFySGlkZVRpbWVvdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmhpZGVUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLmhpZGVUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyVGltZW91dHMoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJTaG93VGltZW91dCgpO1xuICAgICAgICB0aGlzLmNsZWFySGlkZVRpbWVvdXQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcblxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVG9vbHRpcF0sXG4gICAgZGVjbGFyYXRpb25zOiBbVG9vbHRpcF1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcE1vZHVsZSB7fVxuIl19