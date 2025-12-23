import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Injectable, Input, NgModule, Output, ViewChild, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/autofocus";
export const RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButton),
    multi: true
};
export class RadioControlRegistry {
    accessors = [];
    add(control, accessor) {
        this.accessors.push([control, accessor]);
    }
    remove(accessor) {
        this.accessors = this.accessors.filter((c) => {
            return c[1] !== accessor;
        });
    }
    select(accessor) {
        this.accessors.forEach((c) => {
            if (this.isSameGroup(c, accessor) && c[1] !== accessor) {
                c[1].writeValue(accessor.value);
            }
        });
    }
    isSameGroup(controlPair, accessor) {
        if (!controlPair[0].control) {
            return false;
        }
        return controlPair[0].control.root === accessor.control.control.root && controlPair[1].name === accessor.name;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: RadioControlRegistry, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: RadioControlRegistry, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: RadioControlRegistry, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
/**
 * RadioButton is an extension to standard radio button element with theming.
 * @group Components
 */
export class RadioButton {
    cd;
    injector;
    registry;
    config;
    /**
     * Value of the radiobutton.
     * @group Props
     */
    value;
    /**
     * The name of the form control.
     * @group Props
     */
    formControlName;
    /**
     * Name of the radiobutton group.
     * @group Props
     */
    name;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Label of the radiobutton.
     * @group Props
     */
    label;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant = 'outlined';
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Used to define a string that labels the input element.
     * @group Props
     */
    ariaLabel;
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
     * Style class of the label.
     * @group Props
     */
    labelStyleClass;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * Callback to invoke on radio button click.
     * @param {RadioButtonClickEvent} event - Custom click event.
     * @group Emits
     */
    onClick = new EventEmitter();
    /**
     * Callback to invoke when the receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when the loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    inputViewChild;
    onModelChange = () => { };
    onModelTouched = () => { };
    checked;
    focused;
    control;
    constructor(cd, injector, registry, config) {
        this.cd = cd;
        this.injector = injector;
        this.registry = registry;
        this.config = config;
    }
    ngOnInit() {
        this.control = this.injector.get(NgControl);
        this.checkName();
        this.registry.add(this.control, this);
    }
    handleClick(event, radioButton, focus) {
        if (this.disabled) {
            return;
        }
        this.select(event);
        if (focus) {
            radioButton.focus();
        }
    }
    select(event) {
        if (!this.disabled) {
            this.inputViewChild.nativeElement.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
            this.registry.select(this);
            this.onClick.emit({ originalEvent: event, value: this.value });
        }
    }
    writeValue(value) {
        this.checked = value == this.value;
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            this.inputViewChild.nativeElement.checked = this.checked;
        }
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    /**
     * Applies focus to input field.
     * @group Method
     */
    focus() {
        this.inputViewChild.nativeElement.focus();
    }
    ngOnDestroy() {
        this.registry.remove(this);
    }
    checkName() {
        if (this.name && this.formControlName && this.name !== this.formControlName) {
            this.throwNameError();
        }
        if (!this.name && this.formControlName) {
            this.name = this.formControlName;
        }
    }
    throwNameError() {
        throw new Error(`
          If you define both a name and a formControlName attribute on your radio button, their values
          must match. Ex: <p-radioButton formControlName="food" name="food"></p-radioButton>
        `);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: RadioButton, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Injector }, { token: RadioControlRegistry }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: RadioButton, selector: "p-radioButton", inputs: { value: "value", formControlName: "formControlName", name: "name", disabled: ["disabled", "disabled", booleanAttribute], label: "label", variant: "variant", tabindex: ["tabindex", "tabindex", numberAttribute], inputId: "inputId", ariaLabelledBy: "ariaLabelledBy", ariaLabel: "ariaLabel", style: "style", styleClass: "styleClass", labelStyleClass: "labelStyleClass", autofocus: ["autofocus", "autofocus", booleanAttribute] }, outputs: { onClick: "onClick", onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-element" }, providers: [RADIO_VALUE_ACCESSOR], viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["input"], descendants: true }], ngImport: i0, template: `
        <div
            [ngStyle]="style"
            [ngClass]="{
                'p-radiobutton p-component': true,
                'p-radiobutton-checked': checked,
                'p-radiobutton-disabled': disabled,
                'p-radiobutton-focused': focused,
                'p-variant-filled': variant === 'filled' || config.inputStyle() === 'filled'
            }"
            [class]="styleClass"
            [attr.data-pc-name]="'radiobutton'"
            [attr.data-pc-section]="'root'"
            (click)="handleClick($event, input, true)"
        >
            <div class="p-hidden-accessible" [attr.data-pc-section]="'hiddenInputWrapper'">
                <input
                    #input
                    [attr.id]="inputId"
                    type="radio"
                    [attr.name]="name"
                    [checked]="checked"
                    [disabled]="disabled"
                    [value]="value"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [attr.tabindex]="tabindex"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    [attr.data-pc-section]="'hiddenInput'"
                    pAutoFocus
                    [autofocus]="autofocus"
                />
            </div>
            <div [ngClass]="{ 'p-radiobutton-box': true, 'p-highlight': checked, 'p-disabled': disabled, 'p-focus': focused }" [attr.data-pc-section]="'input'">
                <span class="p-radiobutton-icon" [attr.data-pc-section]="'icon'"></span>
            </div>
        </div>
        <label
            (click)="select($event)"
            [class]="labelStyleClass"
            [ngClass]="{ 'p-radiobutton-label': true, 'p-radiobutton-label-active': input.checked, 'p-disabled': disabled, 'p-radiobutton-label-focus': focused }"
            *ngIf="label"
            [attr.for]="inputId"
            [attr.data-pc-section]="'label'"
            >{{ label }}</label
        >
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i3.AutoFocus, selector: "[pAutoFocus]", inputs: ["autofocus"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: RadioButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-radioButton',
                    template: `
        <div
            [ngStyle]="style"
            [ngClass]="{
                'p-radiobutton p-component': true,
                'p-radiobutton-checked': checked,
                'p-radiobutton-disabled': disabled,
                'p-radiobutton-focused': focused,
                'p-variant-filled': variant === 'filled' || config.inputStyle() === 'filled'
            }"
            [class]="styleClass"
            [attr.data-pc-name]="'radiobutton'"
            [attr.data-pc-section]="'root'"
            (click)="handleClick($event, input, true)"
        >
            <div class="p-hidden-accessible" [attr.data-pc-section]="'hiddenInputWrapper'">
                <input
                    #input
                    [attr.id]="inputId"
                    type="radio"
                    [attr.name]="name"
                    [checked]="checked"
                    [disabled]="disabled"
                    [value]="value"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-label]="ariaLabel"
                    [attr.tabindex]="tabindex"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    [attr.data-pc-section]="'hiddenInput'"
                    pAutoFocus
                    [autofocus]="autofocus"
                />
            </div>
            <div [ngClass]="{ 'p-radiobutton-box': true, 'p-highlight': checked, 'p-disabled': disabled, 'p-focus': focused }" [attr.data-pc-section]="'input'">
                <span class="p-radiobutton-icon" [attr.data-pc-section]="'icon'"></span>
            </div>
        </div>
        <label
            (click)="select($event)"
            [class]="labelStyleClass"
            [ngClass]="{ 'p-radiobutton-label': true, 'p-radiobutton-label-active': input.checked, 'p-disabled': disabled, 'p-radiobutton-label-focus': focused }"
            *ngIf="label"
            [attr.for]="inputId"
            [attr.data-pc-section]="'label'"
            >{{ label }}</label
        >
    `,
                    providers: [RADIO_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.Injector }, { type: RadioControlRegistry }, { type: i1.PrimeNGConfig }], propDecorators: { value: [{
                type: Input
            }], formControlName: [{
                type: Input
            }], name: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], label: [{
                type: Input
            }], variant: [{
                type: Input
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], inputId: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], labelStyleClass: [{
                type: Input
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onClick: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], inputViewChild: [{
                type: ViewChild,
                args: ['input']
            }] } });
export class RadioButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: RadioButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: RadioButtonModule, declarations: [RadioButton], imports: [CommonModule, AutoFocusModule], exports: [RadioButton] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: RadioButtonModule, imports: [CommonModule, AutoFocusModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: RadioButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AutoFocusModule],
                    exports: [RadioButton],
                    declarations: [RadioButton]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvcmFkaW9idXR0b24vcmFkaW9idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFjLFlBQVksRUFBRSxVQUFVLEVBQVksS0FBSyxFQUFFLFFBQVEsRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVPLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQU1wRCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBUTtJQUNyQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUtGLE1BQU0sT0FBTyxvQkFBb0I7SUFDckIsU0FBUyxHQUFVLEVBQUUsQ0FBQztJQUU5QixHQUFHLENBQUMsT0FBa0IsRUFBRSxRQUFxQjtRQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBcUI7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FB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QixNQUFNO2dCQU1HLE9BQU87c0JBQWhCLE1BQU07Z0JBTUcsTUFBTTtzQkFBZixNQUFNO2dCQUVhLGNBQWM7c0JBQWpDLFNBQVM7dUJBQUMsT0FBTzs7QUFtSHRCLE1BQU0sT0FBTyxpQkFBaUI7dUdBQWpCLGlCQUFpQjt3R0FBakIsaUJBQWlCLGlCQTdNakIsV0FBVyxhQXlNVixZQUFZLEVBQUUsZUFBZSxhQXpNOUIsV0FBVzt3R0E2TVgsaUJBQWlCLFlBSmhCLFlBQVksRUFBRSxlQUFlOzsyRkFJOUIsaUJBQWlCO2tCQUw3QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUM7b0JBQ3hDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztvQkFDdEIsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciwgSW5wdXQsIE5nTW9kdWxlLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQsIGJvb2xlYW5BdHRyaWJ1dGUsIGZvcndhcmRSZWYsIG51bWJlckF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBdXRvRm9jdXNNb2R1bGUgfSBmcm9tICdwcmltZW5nL2F1dG9mb2N1cyc7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5cbmltcG9ydCB7IFByaW1lTkdDb25maWcgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBSYWRpb0J1dHRvbkNsaWNrRXZlbnQgfSBmcm9tICcuL3JhZGlvYnV0dG9uLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBSQURJT19WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhZGlvQnV0dG9uKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSYWRpb0NvbnRyb2xSZWdpc3RyeSB7XG4gICAgcHJpdmF0ZSBhY2Nlc3NvcnM6IGFueVtdID0gW107XG5cbiAgICBhZGQoY29udHJvbDogTmdDb250cm9sLCBhY2Nlc3NvcjogUmFkaW9CdXR0b24pIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NvcnMucHVzaChbY29udHJvbCwgYWNjZXNzb3JdKTtcbiAgICB9XG5cbiAgICByZW1vdmUoYWNjZXNzb3I6IFJhZGlvQnV0dG9uKSB7XG4gICAgICAgIHRoaXMuYWNjZXNzb3JzID0gdGhpcy5hY2Nlc3NvcnMuZmlsdGVyKChjKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY1sxXSAhPT0gYWNjZXNzb3I7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdChhY2Nlc3NvcjogUmFkaW9CdXR0b24pIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NvcnMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTYW1lR3JvdXAoYywgYWNjZXNzb3IpICYmIGNbMV0gIT09IGFjY2Vzc29yKSB7XG4gICAgICAgICAgICAgICAgY1sxXS53cml0ZVZhbHVlKGFjY2Vzc29yLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1NhbWVHcm91cChjb250cm9sUGFpcjogW05nQ29udHJvbCwgUmFkaW9CdXR0b25dLCBhY2Nlc3NvcjogUmFkaW9CdXR0b24pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFjb250cm9sUGFpclswXS5jb250cm9sKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29udHJvbFBhaXJbMF0uY29udHJvbC5yb290ID09PSAoYWNjZXNzb3IgYXMgYW55KS5jb250cm9sLmNvbnRyb2wucm9vdCAmJiBjb250cm9sUGFpclsxXS5uYW1lID09PSBhY2Nlc3Nvci5uYW1lO1xuICAgIH1cbn1cbi8qKlxuICogUmFkaW9CdXR0b24gaXMgYW4gZXh0ZW5zaW9uIHRvIHN0YW5kYXJkIHJhZGlvIGJ1dHRvbiBlbGVtZW50IHdpdGggdGhlbWluZy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1yYWRpb0J1dHRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICdwLXJhZGlvYnV0dG9uIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAncC1yYWRpb2J1dHRvbi1jaGVja2VkJzogY2hlY2tlZCxcbiAgICAgICAgICAgICAgICAncC1yYWRpb2J1dHRvbi1kaXNhYmxlZCc6IGRpc2FibGVkLFxuICAgICAgICAgICAgICAgICdwLXJhZGlvYnV0dG9uLWZvY3VzZWQnOiBmb2N1c2VkLFxuICAgICAgICAgICAgICAgICdwLXZhcmlhbnQtZmlsbGVkJzogdmFyaWFudCA9PT0gJ2ZpbGxlZCcgfHwgY29uZmlnLmlucHV0U3R5bGUoKSA9PT0gJ2ZpbGxlZCdcbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidyYWRpb2J1dHRvbidcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiXG4gICAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LCBpbnB1dCwgdHJ1ZSlcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGlkZGVuSW5wdXRXcmFwcGVyJ1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAjaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cImNoZWNrZWRcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGlkZGVuSW5wdXQnXCJcbiAgICAgICAgICAgICAgICAgICAgcEF1dG9Gb2N1c1xuICAgICAgICAgICAgICAgICAgICBbYXV0b2ZvY3VzXT1cImF1dG9mb2N1c1wiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7ICdwLXJhZGlvYnV0dG9uLWJveCc6IHRydWUsICdwLWhpZ2hsaWdodCc6IGNoZWNrZWQsICdwLWRpc2FibGVkJzogZGlzYWJsZWQsICdwLWZvY3VzJzogZm9jdXNlZCB9XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpbnB1dCdcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtcmFkaW9idXR0b24taWNvblwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJsYWJlbFN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1yYWRpb2J1dHRvbi1sYWJlbCc6IHRydWUsICdwLXJhZGlvYnV0dG9uLWxhYmVsLWFjdGl2ZSc6IGlucHV0LmNoZWNrZWQsICdwLWRpc2FibGVkJzogZGlzYWJsZWQsICdwLXJhZGlvYnV0dG9uLWxhYmVsLWZvY3VzJzogZm9jdXNlZCB9XCJcbiAgICAgICAgICAgICpuZ0lmPVwibGFiZWxcIlxuICAgICAgICAgICAgW2F0dHIuZm9yXT1cImlucHV0SWRcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsYWJlbCdcIlxuICAgICAgICAgICAgPnt7IGxhYmVsIH19PC9sYWJlbFxuICAgICAgICA+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtSQURJT19WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBWYWx1ZSBvZiB0aGUgcmFkaW9idXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmFsdWU6IGFueTtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgZm9ybSBjb250cm9sLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZvcm1Db250cm9sTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIHJhZGlvYnV0dG9uIGdyb3VwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBlbGVtZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTGFiZWwgb2YgdGhlIHJhZGlvYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSBpbnB1dCB2YXJpYW50IG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmFyaWFudDogJ2ZpbGxlZCcgfCAnb3V0bGluZWQnID0gJ291dGxpbmVkJztcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHRhYmluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBvZiB0aGUgZm9jdXMgaW5wdXQgdG8gbWF0Y2ggYSBsYWJlbCBkZWZpbmVkIGZvciB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFc3RhYmxpc2hlcyByZWxhdGlvbnNoaXBzIGJldHdlZW4gdGhlIGNvbXBvbmVudCBhbmQgbGFiZWwocykgd2hlcmUgaXRzIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBlbGVtZW50IElEcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZGVmaW5lIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBsYWJlbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsYWJlbFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBjb21wb25lbnQgc2hvdWxkIGF1dG9tYXRpY2FsbHkgZ2V0IGZvY3VzIG9uIGxvYWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGF1dG9mb2N1czogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gcmFkaW8gYnV0dG9uIGNsaWNrLlxuICAgICAqIEBwYXJhbSB7UmFkaW9CdXR0b25DbGlja0V2ZW50fSBldmVudCAtIEN1c3RvbSBjbGljayBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPFJhZGlvQnV0dG9uQ2xpY2tFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFJhZGlvQnV0dG9uQ2xpY2tFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgcmVjZWl2ZXMgZm9jdXMuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgbG9zZXMgZm9jdXMuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dFZpZXdDaGlsZCE6IEVsZW1lbnRSZWY7XG5cbiAgICBwdWJsaWMgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIHB1YmxpYyBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIHB1YmxpYyBjaGVja2VkOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIHB1YmxpYyBmb2N1c2VkOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIGNvbnRyb2w6IE51bGxhYmxlPE5nQ29udHJvbD47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgcmVnaXN0cnk6IFJhZGlvQ29udHJvbFJlZ2lzdHJ5LFxuICAgICAgICBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY29udHJvbCA9IHRoaXMuaW5qZWN0b3IuZ2V0KE5nQ29udHJvbCk7XG4gICAgICAgIHRoaXMuY2hlY2tOYW1lKCk7XG4gICAgICAgIHRoaXMucmVnaXN0cnkuYWRkKHRoaXMuY29udHJvbCwgdGhpcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50LCByYWRpb0J1dHRvbjogSFRNTEVsZW1lbnQsIGZvY3VzOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdChldmVudCk7XG5cbiAgICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgICAgICByYWRpb0J1dHRvbi5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0KGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJ5LnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMub25DbGljay5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlID09IHRoaXMudmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uSW5wdXRGb2N1cyhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLm9uQmx1ci5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGZvY3VzIHRvIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgZm9jdXMoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5LnJlbW92ZSh0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrTmFtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubmFtZSAmJiB0aGlzLmZvcm1Db250cm9sTmFtZSAmJiB0aGlzLm5hbWUgIT09IHRoaXMuZm9ybUNvbnRyb2xOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnRocm93TmFtZUVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLm5hbWUgJiYgdGhpcy5mb3JtQ29udHJvbE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMuZm9ybUNvbnRyb2xOYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0aHJvd05hbWVFcnJvcigpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgICAgICBJZiB5b3UgZGVmaW5lIGJvdGggYSBuYW1lIGFuZCBhIGZvcm1Db250cm9sTmFtZSBhdHRyaWJ1dGUgb24geW91ciByYWRpbyBidXR0b24sIHRoZWlyIHZhbHVlc1xuICAgICAgICAgIG11c3QgbWF0Y2guIEV4OiA8cC1yYWRpb0J1dHRvbiBmb3JtQ29udHJvbE5hbWU9XCJmb29kXCIgbmFtZT1cImZvb2RcIj48L3AtcmFkaW9CdXR0b24+XG4gICAgICAgIGApO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBBdXRvRm9jdXNNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtSYWRpb0J1dHRvbl0sXG4gICAgZGVjbGFyYXRpb25zOiBbUmFkaW9CdXR0b25dXG59KVxuZXhwb3J0IGNsYXNzIFJhZGlvQnV0dG9uTW9kdWxlIHt9XG4iXX0=