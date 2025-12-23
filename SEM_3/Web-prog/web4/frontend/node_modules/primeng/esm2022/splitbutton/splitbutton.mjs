import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, ViewChild, ViewEncapsulation, booleanAttribute, numberAttribute, signal } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { UniqueComponentId } from 'primeng/utils';
import { AutoFocusModule } from 'primeng/autofocus';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/button";
import * as i3 from "primeng/tieredmenu";
import * as i4 from "primeng/tooltip";
import * as i5 from "primeng/autofocus";
/**
 * SplitButton groups a set of commands in an overlay with a default command.
 * @group Components
 */
export class SplitButton {
    /**
     * MenuModel instance to define the overlay items.
     * @group Props
     */
    model;
    /**
     * Defines the style of the button.
     * @group Props
     */
    severity;
    /**
     * Add a shadow to indicate elevation.
     * @group Props
     */
    raised = false;
    /**
     * Add a circular border radius to the button.
     * @group Props
     */
    rounded = false;
    /**
     * Add a textual class to the button without a background initially.
     * @group Props
     */
    text = false;
    /**
     * Add a border class without a background initially.
     * @group Props
     */
    outlined = false;
    /**
     * Defines the size of the button.
     * @group Props
     */
    size = null;
    /**
     * Add a plain textual class to the button without a background initially.
     * @group Props
     */
    plain = false;
    /**
     * Name of the icon.
     * @group Props
     */
    icon;
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'left';
    /**
     * Text of the button.
     * @group Props
     */
    label;
    /**
     * Tooltip for the main button.
     * @group Props
     */
    tooltip;
    /**
     * Tooltip options for the main button.
     * @group Props
     */
    tooltipOptions;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Inline style of the overlay menu.
     * @group Props
     */
    menuStyle;
    /**
     * Style class of the overlay menu.
     * @group Props
     */
    menuStyleClass;
    /**
     *  Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Indicates the direction of the element.
     * @group Props
     */
    dir;
    /**
     * Defines a string that labels the expand button for accessibility.
     * @group Props
     */
    expandAriaLabel;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    hideTransitionOptions = '.1s linear';
    /**
     * Button Props
     */
    buttonProps;
    /**
     * Menu Button Props
     */
    menuButtonProps;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    set disabled(v) {
        this._disabled = v;
        this._buttonDisabled = v;
        this.menuButtonDisabled = v;
    }
    get disabled() {
        return this._disabled;
    }
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex;
    /**
     * When present, it specifies that the menu button element should be disabled.
     * @group Props
     */
    set menuButtonDisabled(v) {
        if (this.disabled) {
            this._menuButtonDisabled = this.disabled;
        }
        else
            this._menuButtonDisabled = v;
    }
    get menuButtonDisabled() {
        return this._menuButtonDisabled;
    }
    /**
     * When present, it specifies that the button element should be disabled.
     * @group Props
     */
    set buttonDisabled(v) {
        if (this.disabled) {
            this.buttonDisabled = this.disabled;
        }
        else
            this._buttonDisabled = v;
    }
    get buttonDisabled() {
        return this._buttonDisabled;
    }
    /**
     * Callback to invoke when default command button is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onClick = new EventEmitter();
    /**
     * Callback to invoke when overlay menu is hidden.
     * @group Emits
     */
    onMenuHide = new EventEmitter();
    /**
     * Callback to invoke when overlay menu is shown.
     * @group Emits
     */
    onMenuShow = new EventEmitter();
    /**
     * Callback to invoke when dropdown button is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onDropdownClick = new EventEmitter();
    containerViewChild;
    buttonViewChild;
    menu;
    templates;
    contentTemplate;
    dropdownIconTemplate;
    ariaId;
    isExpanded = signal(false);
    _disabled;
    _buttonDisabled;
    _menuButtonDisabled;
    ngOnInit() {
        this.ariaId = UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    get containerClass() {
        const cls = {
            'p-splitbutton p-component': true,
            'p-button-raised': this.raised,
            'p-button-rounded': this.rounded,
            'p-button-outlined': this.outlined,
            'p-button-text': this.text,
            'p-button-plain': this.plain,
            [`p-button-${this.size === 'small' ? 'sm' : 'lg'}`]: this.size
        };
        return { ...cls };
    }
    onDefaultButtonClick(event) {
        this.onClick.emit(event);
        this.menu.hide();
    }
    onDropdownButtonClick(event) {
        this.onDropdownClick.emit(event);
        this.menu?.toggle({ currentTarget: this.containerViewChild?.nativeElement, relativeAlign: this.appendTo == null });
    }
    onDropdownButtonKeydown(event) {
        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            this.onDropdownButtonClick();
            event.preventDefault();
        }
    }
    onHide() {
        this.isExpanded.set(false);
        this.onMenuHide.emit();
    }
    onShow() {
        this.isExpanded.set(true);
        this.onMenuShow.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: SplitButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: SplitButton, selector: "p-splitButton", inputs: { model: "model", severity: "severity", raised: ["raised", "raised", booleanAttribute], rounded: ["rounded", "rounded", booleanAttribute], text: ["text", "text", booleanAttribute], outlined: ["outlined", "outlined", booleanAttribute], size: "size", plain: ["plain", "plain", booleanAttribute], icon: "icon", iconPos: "iconPos", label: "label", tooltip: "tooltip", tooltipOptions: "tooltipOptions", style: "style", styleClass: "styleClass", menuStyle: "menuStyle", menuStyleClass: "menuStyleClass", appendTo: "appendTo", dir: "dir", expandAriaLabel: "expandAriaLabel", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", buttonProps: "buttonProps", menuButtonProps: "menuButtonProps", autofocus: ["autofocus", "autofocus", booleanAttribute], disabled: ["disabled", "disabled", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute], menuButtonDisabled: "menuButtonDisabled", buttonDisabled: "buttonDisabled" }, outputs: { onClick: "onClick", onMenuHide: "onMenuHide", onMenuShow: "onMenuShow", onDropdownClick: "onDropdownClick" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "buttonViewChild", first: true, predicate: ["defaultbtn"], descendants: true }, { propertyName: "menu", first: true, predicate: ["menu"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="containerClass" [class]="styleClass" [ngStyle]="style">
            <ng-container *ngIf="contentTemplate; else defaultButton">
                <button
                    class="p-splitbutton-defaultbutton"
                    type="button"
                    pButton
                    [severity]="severity"
                    [text]="text"
                    [outlined]="outlined"
                    [size]="size"
                    [icon]="icon"
                    [iconPos]="iconPos"
                    (click)="onDefaultButtonClick($event)"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    [ariaLabel]="buttonProps?.['ariaLabel'] || label"
                    pAutoFocus
                    [autofocus]="autofocus"
                    [pTooltip]="tooltip"
                    [tooltipOptions]="tooltipOptions"
                >
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </button>
            </ng-container>
            <ng-template #defaultButton>
                <button
                    #defaultbtn
                    class="p-splitbutton-defaultbutton"
                    type="button"
                    pButton
                    [severity]="severity"
                    [text]="text"
                    [outlined]="outlined"
                    [size]="size"
                    [icon]="icon"
                    [iconPos]="iconPos"
                    [label]="label"
                    (click)="onDefaultButtonClick($event)"
                    [disabled]="buttonDisabled"
                    [attr.tabindex]="tabindex"
                    [ariaLabel]="buttonProps?.['ariaLabel']"
                    pAutoFocus
                    [autofocus]="autofocus"
                    [pTooltip]="tooltip"
                    [tooltipOptions]="tooltipOptions"
                ></button>
            </ng-template>
            <button
                type="button"
                pButton
                [size]="size"
                [severity]="severity"
                [text]="text"
                [outlined]="outlined"
                class="p-splitbutton-menubutton p-button-icon-only"
                (click)="onDropdownButtonClick($event)"
                (keydown)="onDropdownButtonKeydown($event)"
                [disabled]="menuButtonDisabled"
                [ariaLabel]="menuButtonProps?.['ariaLabel'] || expandAriaLabel"
                [attr.aria-haspopup]="menuButtonProps?.['ariaHasPopup'] || true"
                [attr.aria-expanded]="menuButtonProps?.['ariaExpanded'] || isExpanded()"
                [attr.aria-controls]="menuButtonProps?.['ariaControls'] || ariaId"
            >
                <ChevronDownIcon *ngIf="!dropdownIconTemplate" />
                <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
            </button>
            <p-tieredMenu
                [id]="ariaId"
                #menu
                [popup]="true"
                [model]="model"
                [style]="menuStyle"
                [styleClass]="menuStyleClass"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onHide)="onHide()"
                (onShow)="onShow()"
            ></p-tieredMenu>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-splitbutton{display:inline-flex;position:relative}.p-splitbutton .p-splitbutton-defaultbutton,.p-splitbutton.p-button-rounded>.p-splitbutton-defaultbutton.p-button,.p-splitbutton.p-button-outlined>.p-splitbutton-defaultbutton.p-button{flex:1 1 auto;border-top-right-radius:0;border-bottom-right-radius:0;border-right:0 none}.p-splitbutton-menubutton,.p-splitbutton.p-button-rounded>.p-splitbutton-menubutton.p-button,.p-splitbutton.p-button-outlined>.p-splitbutton-menubutton.p-button{display:flex;align-items:center;justify-content:center;border-top-left-radius:0;border-bottom-left-radius:0}.p-splitbutton .p-menu{min-width:100%}.p-fluid .p-splitbutton{display:flex}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading", "severity", "raised", "rounded", "text", "outlined", "size", "plain"] }, { kind: "component", type: i0.forwardRef(() => i3.TieredMenu), selector: "p-tieredMenu", inputs: ["model", "popup", "style", "styleClass", "appendTo", "autoZIndex", "baseZIndex", "autoDisplay", "showTransitionOptions", "hideTransitionOptions", "id", "ariaLabel", "ariaLabelledBy", "disabled", "tabindex"], outputs: ["onShow", "onHide"] }, { kind: "directive", type: i0.forwardRef(() => i4.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "directive", type: i0.forwardRef(() => i5.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: SplitButton, decorators: [{
            type: Component,
            args: [{ selector: 'p-splitButton', template: `
        <div #container [ngClass]="containerClass" [class]="styleClass" [ngStyle]="style">
            <ng-container *ngIf="contentTemplate; else defaultButton">
                <button
                    class="p-splitbutton-defaultbutton"
                    type="button"
                    pButton
                    [severity]="severity"
                    [text]="text"
                    [outlined]="outlined"
                    [size]="size"
                    [icon]="icon"
                    [iconPos]="iconPos"
                    (click)="onDefaultButtonClick($event)"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    [ariaLabel]="buttonProps?.['ariaLabel'] || label"
                    pAutoFocus
                    [autofocus]="autofocus"
                    [pTooltip]="tooltip"
                    [tooltipOptions]="tooltipOptions"
                >
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </button>
            </ng-container>
            <ng-template #defaultButton>
                <button
                    #defaultbtn
                    class="p-splitbutton-defaultbutton"
                    type="button"
                    pButton
                    [severity]="severity"
                    [text]="text"
                    [outlined]="outlined"
                    [size]="size"
                    [icon]="icon"
                    [iconPos]="iconPos"
                    [label]="label"
                    (click)="onDefaultButtonClick($event)"
                    [disabled]="buttonDisabled"
                    [attr.tabindex]="tabindex"
                    [ariaLabel]="buttonProps?.['ariaLabel']"
                    pAutoFocus
                    [autofocus]="autofocus"
                    [pTooltip]="tooltip"
                    [tooltipOptions]="tooltipOptions"
                ></button>
            </ng-template>
            <button
                type="button"
                pButton
                [size]="size"
                [severity]="severity"
                [text]="text"
                [outlined]="outlined"
                class="p-splitbutton-menubutton p-button-icon-only"
                (click)="onDropdownButtonClick($event)"
                (keydown)="onDropdownButtonKeydown($event)"
                [disabled]="menuButtonDisabled"
                [ariaLabel]="menuButtonProps?.['ariaLabel'] || expandAriaLabel"
                [attr.aria-haspopup]="menuButtonProps?.['ariaHasPopup'] || true"
                [attr.aria-expanded]="menuButtonProps?.['ariaExpanded'] || isExpanded()"
                [attr.aria-controls]="menuButtonProps?.['ariaControls'] || ariaId"
            >
                <ChevronDownIcon *ngIf="!dropdownIconTemplate" />
                <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
            </button>
            <p-tieredMenu
                [id]="ariaId"
                #menu
                [popup]="true"
                [model]="model"
                [style]="menuStyle"
                [styleClass]="menuStyleClass"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onHide)="onHide()"
                (onShow)="onShow()"
            ></p-tieredMenu>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-splitbutton{display:inline-flex;position:relative}.p-splitbutton .p-splitbutton-defaultbutton,.p-splitbutton.p-button-rounded>.p-splitbutton-defaultbutton.p-button,.p-splitbutton.p-button-outlined>.p-splitbutton-defaultbutton.p-button{flex:1 1 auto;border-top-right-radius:0;border-bottom-right-radius:0;border-right:0 none}.p-splitbutton-menubutton,.p-splitbutton.p-button-rounded>.p-splitbutton-menubutton.p-button,.p-splitbutton.p-button-outlined>.p-splitbutton-menubutton.p-button{display:flex;align-items:center;justify-content:center;border-top-left-radius:0;border-bottom-left-radius:0}.p-splitbutton .p-menu{min-width:100%}.p-fluid .p-splitbutton{display:flex}}\n"] }]
        }], propDecorators: { model: [{
                type: Input
            }], severity: [{
                type: Input
            }], raised: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], rounded: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], text: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], outlined: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], size: [{
                type: Input
            }], plain: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], icon: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], label: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], tooltipOptions: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], menuStyle: [{
                type: Input
            }], menuStyleClass: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], dir: [{
                type: Input
            }], expandAriaLabel: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], buttonProps: [{
                type: Input
            }], menuButtonProps: [{
                type: Input
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], menuButtonDisabled: [{
                type: Input,
                args: ['menuButtonDisabled']
            }], buttonDisabled: [{
                type: Input
            }], onClick: [{
                type: Output
            }], onMenuHide: [{
                type: Output
            }], onMenuShow: [{
                type: Output
            }], onDropdownClick: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], buttonViewChild: [{
                type: ViewChild,
                args: ['defaultbtn']
            }], menu: [{
                type: ViewChild,
                args: ['menu']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class SplitButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: SplitButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: SplitButtonModule, declarations: [SplitButton], imports: [CommonModule, ButtonModule, TieredMenuModule, AutoFocusModule, ChevronDownIcon], exports: [SplitButton, ButtonModule, TieredMenuModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: SplitButtonModule, imports: [CommonModule, ButtonModule, TieredMenuModule, AutoFocusModule, ChevronDownIcon, ButtonModule, TieredMenuModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: SplitButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, TieredMenuModule, AutoFocusModule, ChevronDownIcon],
                    exports: [SplitButton, ButtonModule, TieredMenuModule],
                    declarations: [SplitButton]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRidXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3BsaXRidXR0b24vc3BsaXRidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBMEIsU0FBUyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeE8sT0FBTyxFQUFZLGFBQWEsRUFBa0IsTUFBTSxhQUFhLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQWMsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7O0FBS3BEOzs7R0FHRztBQTRGSCxNQUFNLE9BQU8sV0FBVztJQUNwQjs7O09BR0c7SUFDTSxLQUFLLENBQXlCO0lBQ3ZDOzs7T0FHRztJQUNNLFFBQVEsQ0FBK0c7SUFDaEk7OztPQUdHO0lBQ3FDLE1BQU0sR0FBWSxLQUFLLENBQUM7SUFDaEU7OztPQUdHO0lBQ3FDLE9BQU8sR0FBWSxLQUFLLENBQUM7SUFDakU7OztPQUdHO0lBQ3FDLElBQUksR0FBWSxLQUFLLENBQUM7SUFDOUQ7OztPQUdHO0lBQ3FDLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFDbEU7OztPQUdHO0lBQ00sSUFBSSxHQUF5QyxJQUFJLENBQUM7SUFD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cm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ01vZHVsZSwgT3V0cHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBib29sZWFuQXR0cmlidXRlLCBudW1iZXJBdHRyaWJ1dGUsIHNpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudUl0ZW0sIFByaW1lVGVtcGxhdGUsIFRvb2x0aXBPcHRpb25zIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25JY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGV2cm9uZG93bic7XG5pbXBvcnQgeyBUaWVyZWRNZW51LCBUaWVyZWRNZW51TW9kdWxlIH0gZnJvbSAncHJpbWVuZy90aWVyZWRtZW51JztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBBdXRvRm9jdXNNb2R1bGUgfSBmcm9tICdwcmltZW5nL2F1dG9mb2N1cyc7XG5cbmltcG9ydCB7IEJ1dHRvblByb3BzLCBNZW51QnV0dG9uUHJvcHMgfSBmcm9tICcuL3NwbGl0YnV0dG9uLmludGVyZmFjZSc7XG5cbnR5cGUgU3BsaXRCdXR0b25JY29uUG9zaXRpb24gPSAnbGVmdCcgfCAncmlnaHQnO1xuLyoqXG4gKiBTcGxpdEJ1dHRvbiBncm91cHMgYSBzZXQgb2YgY29tbWFuZHMgaW4gYW4gb3ZlcmxheSB3aXRoIGEgZGVmYXVsdCBjb21tYW5kLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNwbGl0QnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3NcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGVudFRlbXBsYXRlOyBlbHNlIGRlZmF1bHRCdXR0b25cIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zcGxpdGJ1dHRvbi1kZWZhdWx0YnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgW3NldmVyaXR5XT1cInNldmVyaXR5XCJcbiAgICAgICAgICAgICAgICAgICAgW3RleHRdPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIFtvdXRsaW5lZF09XCJvdXRsaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIFtzaXplXT1cInNpemVcIlxuICAgICAgICAgICAgICAgICAgICBbaWNvbl09XCJpY29uXCJcbiAgICAgICAgICAgICAgICAgICAgW2ljb25Qb3NdPVwiaWNvblBvc1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkRlZmF1bHRCdXR0b25DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBbYXJpYUxhYmVsXT1cImJ1dHRvblByb3BzPy5bJ2FyaWFMYWJlbCddIHx8IGxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgcEF1dG9Gb2N1c1xuICAgICAgICAgICAgICAgICAgICBbYXV0b2ZvY3VzXT1cImF1dG9mb2N1c1wiXG4gICAgICAgICAgICAgICAgICAgIFtwVG9vbHRpcF09XCJ0b29sdGlwXCJcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBPcHRpb25zXT1cInRvb2x0aXBPcHRpb25zXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0QnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgI2RlZmF1bHRidG5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXNwbGl0YnV0dG9uLWRlZmF1bHRidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBbc2V2ZXJpdHldPVwic2V2ZXJpdHlcIlxuICAgICAgICAgICAgICAgICAgICBbdGV4dF09XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgW291dGxpbmVkXT1cIm91dGxpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW3NpemVdPVwic2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtpY29uXT1cImljb25cIlxuICAgICAgICAgICAgICAgICAgICBbaWNvblBvc109XCJpY29uUG9zXCJcbiAgICAgICAgICAgICAgICAgICAgW2xhYmVsXT1cImxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uRGVmYXVsdEJ1dHRvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiYnV0dG9uRGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIFthcmlhTGFiZWxdPVwiYnV0dG9uUHJvcHM/LlsnYXJpYUxhYmVsJ11cIlxuICAgICAgICAgICAgICAgICAgICBwQXV0b0ZvY3VzXG4gICAgICAgICAgICAgICAgICAgIFthdXRvZm9jdXNdPVwiYXV0b2ZvY3VzXCJcbiAgICAgICAgICAgICAgICAgICAgW3BUb29sdGlwXT1cInRvb2x0aXBcIlxuICAgICAgICAgICAgICAgICAgICBbdG9vbHRpcE9wdGlvbnNdPVwidG9vbHRpcE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgID48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgIFtzaXplXT1cInNpemVcIlxuICAgICAgICAgICAgICAgIFtzZXZlcml0eV09XCJzZXZlcml0eVwiXG4gICAgICAgICAgICAgICAgW3RleHRdPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgW291dGxpbmVkXT1cIm91dGxpbmVkXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtc3BsaXRidXR0b24tbWVudWJ1dHRvbiBwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkRyb3Bkb3duQnV0dG9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Ecm9wZG93bkJ1dHRvbktleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIm1lbnVCdXR0b25EaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW2FyaWFMYWJlbF09XCJtZW51QnV0dG9uUHJvcHM/LlsnYXJpYUxhYmVsJ10gfHwgZXhwYW5kQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cIm1lbnVCdXR0b25Qcm9wcz8uWydhcmlhSGFzUG9wdXAnXSB8fCB0cnVlXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm1lbnVCdXR0b25Qcm9wcz8uWydhcmlhRXhwYW5kZWQnXSB8fCBpc0V4cGFuZGVkKClcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwibWVudUJ1dHRvblByb3BzPy5bJ2FyaWFDb250cm9scyddIHx8IGFyaWFJZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cIiFkcm9wZG93bkljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHJvcGRvd25JY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8cC10aWVyZWRNZW51XG4gICAgICAgICAgICAgICAgW2lkXT1cImFyaWFJZFwiXG4gICAgICAgICAgICAgICAgI21lbnVcbiAgICAgICAgICAgICAgICBbcG9wdXBdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgW21vZGVsXT1cIm1vZGVsXCJcbiAgICAgICAgICAgICAgICBbc3R5bGVdPVwibWVudVN0eWxlXCJcbiAgICAgICAgICAgICAgICBbc3R5bGVDbGFzc109XCJtZW51U3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgW2FwcGVuZFRvXT1cImFwcGVuZFRvXCJcbiAgICAgICAgICAgICAgICBbc2hvd1RyYW5zaXRpb25PcHRpb25zXT1cInNob3dUcmFuc2l0aW9uT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgW2hpZGVUcmFuc2l0aW9uT3B0aW9uc109XCJoaWRlVHJhbnNpdGlvbk9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIChvbkhpZGUpPVwib25IaWRlKClcIlxuICAgICAgICAgICAgICAgIChvblNob3cpPVwib25TaG93KClcIlxuICAgICAgICAgICAgPjwvcC10aWVyZWRNZW51PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc3BsaXRidXR0b24uY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0QnV0dG9uIHtcbiAgICAvKipcbiAgICAgKiBNZW51TW9kZWwgaW5zdGFuY2UgdG8gZGVmaW5lIHRoZSBvdmVybGF5IGl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHN0eWxlIG9mIHRoZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2V2ZXJpdHk6ICdzdWNjZXNzJyB8ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgJ2hlbHAnIHwgJ3ByaW1hcnknIHwgJ3NlY29uZGFyeScgfCAnY29udHJhc3QnIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBzaGFkb3cgdG8gaW5kaWNhdGUgZWxldmF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByYWlzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBjaXJjdWxhciBib3JkZXIgcmFkaXVzIHRvIHRoZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHJvdW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBBZGQgYSB0ZXh0dWFsIGNsYXNzIHRvIHRoZSBidXR0b24gd2l0aG91dCBhIGJhY2tncm91bmQgaW5pdGlhbGx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB0ZXh0OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQWRkIGEgYm9yZGVyIGNsYXNzIHdpdGhvdXQgYSBiYWNrZ3JvdW5kIGluaXRpYWxseS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgb3V0bGluZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBzaXplIG9mIHRoZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2l6ZTogJ3NtYWxsJyB8ICdsYXJnZScgfCB1bmRlZmluZWQgfCBudWxsID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBwbGFpbiB0ZXh0dWFsIGNsYXNzIHRvIHRoZSBidXR0b24gd2l0aG91dCBhIGJhY2tncm91bmQgaW5pdGlhbGx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBwbGFpbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb25Qb3M6IFNwbGl0QnV0dG9uSWNvblBvc2l0aW9uID0gJ2xlZnQnO1xuICAgIC8qKlxuICAgICAqIFRleHQgb2YgdGhlIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRvb2x0aXAgZm9yIHRoZSBtYWluIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVG9vbHRpcCBvcHRpb25zIGZvciB0aGUgbWFpbiBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdG9vbHRpcE9wdGlvbnM6IFRvb2x0aXBPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDbGFzcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBvdmVybGF5IG1lbnUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWVudVN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBvdmVybGF5IG1lbnUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWVudVN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqICBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIG92ZXJsYXksIHZhbGlkIHZhbHVlcyBhcmUgXCJib2R5XCIgb3IgYSBsb2NhbCBuZy10ZW1wbGF0ZSB2YXJpYWJsZSBvZiBhbm90aGVyIGVsZW1lbnQgKG5vdGU6IHVzZSBiaW5kaW5nIHdpdGggYnJhY2tldHMgZm9yIHRlbXBsYXRlIHZhcmlhYmxlcywgZS5nLiBbYXBwZW5kVG9dPVwibXlkaXZcIiBmb3IgYSBkaXYgZWxlbWVudCBoYXZpbmcgI215ZGl2IGFzIHZhcmlhYmxlIG5hbWUpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB8IGFueTtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIGRpcmVjdGlvbiBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkaXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBleHBhbmQgYnV0dG9uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGV4cGFuZEFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgc2hvdyBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnLjEycyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBoaWRlIGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMXMgbGluZWFyJztcbiAgICAvKipcbiAgICAgKiBCdXR0b24gUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBidXR0b25Qcm9wczogQnV0dG9uUHJvcHMgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTWVudSBCdXR0b24gUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtZW51QnV0dG9uUHJvcHM6IE1lbnVCdXR0b25Qcm9wcyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBjb21wb25lbnQgc2hvdWxkIGF1dG9tYXRpY2FsbHkgZ2V0IGZvY3VzIG9uIGxvYWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGF1dG9mb2N1czogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBlbGVtZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2V0IGRpc2FibGVkKHY6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSB2O1xuICAgICAgICB0aGlzLl9idXR0b25EaXNhYmxlZCA9IHY7XG4gICAgICAgIHRoaXMubWVudUJ1dHRvbkRpc2FibGVkID0gdjtcbiAgICB9XG4gICAgcHVibGljIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHRhYmluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgbWVudSBidXR0b24gZWxlbWVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCdtZW51QnV0dG9uRGlzYWJsZWQnKSBzZXQgbWVudUJ1dHRvbkRpc2FibGVkKHY6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX21lbnVCdXR0b25EaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XG4gICAgICAgIH0gZWxzZSB0aGlzLl9tZW51QnV0dG9uRGlzYWJsZWQgPSB2O1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IG1lbnVCdXR0b25EaXNhYmxlZCgpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbnVCdXR0b25EaXNhYmxlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgYnV0dG9uIGVsZW1lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNldCBidXR0b25EaXNhYmxlZCh2OiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkRpc2FibGVkID0gdGhpcy5kaXNhYmxlZDtcbiAgICAgICAgfSBlbHNlIHRoaXMuX2J1dHRvbkRpc2FibGVkID0gdjtcbiAgICB9XG4gICAgcHVibGljIGdldCBidXR0b25EaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbkRpc2FibGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkZWZhdWx0IGNvbW1hbmQgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCAtIE1vdXNlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gb3ZlcmxheSBtZW51IGlzIGhpZGRlbi5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25NZW51SGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBvdmVybGF5IG1lbnUgaXMgc2hvd24uXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTWVudVNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZHJvcGRvd24gYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCAtIE1vdXNlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkRyb3Bkb3duQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2RlZmF1bHRidG4nKSBidXR0b25WaWV3Q2hpbGQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCdtZW51JykgbWVudTogVGllcmVkTWVudSB8IHVuZGVmaW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBkcm9wZG93bkljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGFyaWFJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgaXNFeHBhbmRlZCA9IHNpZ25hbDxib29sZWFuPihmYWxzZSk7XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHByaXZhdGUgX2J1dHRvbkRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJpdmF0ZSBfbWVudUJ1dHRvbkRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYXJpYUlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdkcm9wZG93bmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIGNvbnN0IGNscyA9IHtcbiAgICAgICAgICAgICdwLXNwbGl0YnV0dG9uIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWJ1dHRvbi1yYWlzZWQnOiB0aGlzLnJhaXNlZCxcbiAgICAgICAgICAgICdwLWJ1dHRvbi1yb3VuZGVkJzogdGhpcy5yb3VuZGVkLFxuICAgICAgICAgICAgJ3AtYnV0dG9uLW91dGxpbmVkJzogdGhpcy5vdXRsaW5lZCxcbiAgICAgICAgICAgICdwLWJ1dHRvbi10ZXh0JzogdGhpcy50ZXh0LFxuICAgICAgICAgICAgJ3AtYnV0dG9uLXBsYWluJzogdGhpcy5wbGFpbixcbiAgICAgICAgICAgIFtgcC1idXR0b24tJHt0aGlzLnNpemUgPT09ICdzbWFsbCcgPyAnc20nIDogJ2xnJ31gXTogdGhpcy5zaXplXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHsgLi4uY2xzIH07XG4gICAgfVxuXG4gICAgb25EZWZhdWx0QnV0dG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm1lbnUuaGlkZSgpO1xuICAgIH1cblxuICAgIG9uRHJvcGRvd25CdXR0b25DbGljayhldmVudD86IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkRyb3Bkb3duQ2xpY2suZW1pdChldmVudCk7XG4gICAgICAgIHRoaXMubWVudT8udG9nZ2xlKHsgY3VycmVudFRhcmdldDogdGhpcy5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQsIHJlbGF0aXZlQWxpZ246IHRoaXMuYXBwZW5kVG8gPT0gbnVsbCB9KTtcbiAgICB9XG5cbiAgICBvbkRyb3Bkb3duQnV0dG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ0Fycm93RG93bicgfHwgZXZlbnQuY29kZSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgICAgICB0aGlzLm9uRHJvcGRvd25CdXR0b25DbGljaygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSGlkZSgpIHtcbiAgICAgICAgdGhpcy5pc0V4cGFuZGVkLnNldChmYWxzZSk7XG4gICAgICAgIHRoaXMub25NZW51SGlkZS5lbWl0KCk7XG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLmlzRXhwYW5kZWQuc2V0KHRydWUpO1xuICAgICAgICB0aGlzLm9uTWVudVNob3cuZW1pdCgpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBCdXR0b25Nb2R1bGUsIFRpZXJlZE1lbnVNb2R1bGUsIEF1dG9Gb2N1c01vZHVsZSwgQ2hldnJvbkRvd25JY29uXSxcbiAgICBleHBvcnRzOiBbU3BsaXRCdXR0b24sIEJ1dHRvbk1vZHVsZSwgVGllcmVkTWVudU1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU3BsaXRCdXR0b25dXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0QnV0dG9uTW9kdWxlIHt9XG4iXX0=