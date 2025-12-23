import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ContentChild, ContentChildren, effect, EventEmitter, forwardRef, Input, NgModule, numberAttribute, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Footer, Header, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { ScrollerModule } from 'primeng/scroller';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { CheckIcon } from 'primeng/icons/check';
import { SearchIcon } from 'primeng/icons/search';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { TimesIcon } from 'primeng/icons/times';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { AutoFocusModule } from 'primeng/autofocus';
import { MinusIcon } from 'primeng/icons/minus';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/overlay";
import * as i5 from "primeng/tooltip";
import * as i6 from "primeng/scroller";
import * as i7 from "primeng/autofocus";
export const MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelect),
    multi: true
};
export class MultiSelectItem {
    config;
    id;
    option;
    selected;
    label;
    disabled;
    itemSize;
    focused;
    ariaPosInset;
    ariaSetSize;
    template;
    checkIconTemplate;
    itemCheckboxIconTemplate;
    onClick = new EventEmitter();
    onMouseEnter = new EventEmitter();
    constructor(config) {
        this.config = config;
    }
    onOptionClick(event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option,
            selected: this.selected
        });
        event.stopPropagation();
    }
    onOptionMouseEnter(event) {
        this.onMouseEnter.emit({
            originalEvent: event,
            option: this.option,
            selected: this.selected
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: MultiSelectItem, deps: [{ token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: MultiSelectItem, selector: "p-multiSelectItem", inputs: { id: "id", option: "option", selected: ["selected", "selected", booleanAttribute], label: "label", disabled: ["disabled", "disabled", booleanAttribute], itemSize: ["itemSize", "itemSize", numberAttribute], focused: ["focused", "focused", booleanAttribute], ariaPosInset: "ariaPosInset", ariaSetSize: "ariaSetSize", template: "template", checkIconTemplate: "checkIconTemplate", itemCheckboxIconTemplate: "itemCheckboxIconTemplate" }, outputs: { onClick: "onClick", onMouseEnter: "onMouseEnter" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <li
            pRipple
            role="option"
            [ngStyle]="{ height: itemSize + 'px' }"
            class="p-multiselect-item"
            [ngClass]="{ 'p-multiselect-item': true, 'p-disabled': disabled, 'p-focus': focused }"
            [id]="id"
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-disabled]="disabled"
            [attr.aria-checked]="selected"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
        >
            <div class="p-checkbox p-component" [ngClass]="{ 'p-variant-filled': config.inputStyle() === 'filled' }">
                <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': selected }">
                    <ng-container *ngIf="selected">
                        <CheckIcon *ngIf="!checkIconTemplate && !itemCheckboxIconTemplate" [styleClass]="'p-checkbox-icon'" [attr.aria-hidden]="true" />
                        <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="checkIconTemplate"></ng-template>
                        </span>
                        <span *ngIf="itemCheckboxIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="itemCheckboxIconTemplate; context: { $implicit: selected }"></ng-template>
                        </span>
                    </ng-container>
                </div>
            </div>
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: MultiSelectItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-multiSelectItem',
                    template: `
        <li
            pRipple
            role="option"
            [ngStyle]="{ height: itemSize + 'px' }"
            class="p-multiselect-item"
            [ngClass]="{ 'p-multiselect-item': true, 'p-disabled': disabled, 'p-focus': focused }"
            [id]="id"
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-disabled]="disabled"
            [attr.aria-checked]="selected"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
        >
            <div class="p-checkbox p-component" [ngClass]="{ 'p-variant-filled': config.inputStyle() === 'filled' }">
                <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': selected }">
                    <ng-container *ngIf="selected">
                        <CheckIcon *ngIf="!checkIconTemplate && !itemCheckboxIconTemplate" [styleClass]="'p-checkbox-icon'" [attr.aria-hidden]="true" />
                        <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="checkIconTemplate"></ng-template>
                        </span>
                        <span *ngIf="itemCheckboxIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="itemCheckboxIconTemplate; context: { $implicit: selected }"></ng-template>
                        </span>
                    </ng-container>
                </div>
            </div>
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i1.PrimeNGConfig }], propDecorators: { id: [{
                type: Input
            }], option: [{
                type: Input
            }], selected: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], itemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], focused: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], ariaPosInset: [{
                type: Input
            }], ariaSetSize: [{
                type: Input
            }], template: [{
                type: Input
            }], checkIconTemplate: [{
                type: Input
            }], itemCheckboxIconTemplate: [{
                type: Input
            }], onClick: [{
                type: Output
            }], onMouseEnter: [{
                type: Output
            }] } });
/**
 * MultiSelect is used to select multiple items from a collection.
 * @group Components
 */
export class MultiSelect {
    el;
    renderer;
    cd;
    zone;
    filterService;
    config;
    overlayService;
    /**
     * Unique identifier of the component
     * @group Props
     */
    id;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Inline style of the overlay panel.
     * @group Props
     */
    panelStyle;
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    panelStyleClass;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    readonly;
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    group;
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @group Props
     */
    filter = true;
    /**
     * Defines placeholder of the filter input.
     * @group Props
     */
    filterPlaceHolder;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Specifies the visibility of the options panel.
     * @group Props
     */
    overlayVisible;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant = 'outlined';
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey;
    /**
     * Name of the input element.
     * @group Props
     */
    name;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Whether to show labels of selected item labels or use default label.
     * @group Props
     * @defaultValue true
     */
    set displaySelectedLabel(val) {
        this._displaySelectedLabel = val;
    }
    get displaySelectedLabel() {
        return this._displaySelectedLabel;
    }
    /**
     * Decides how many selected item labels to show at most.
     * @group Props
     * @defaultValue 3
     */
    set maxSelectedLabels(val) {
        this._maxSelectedLabels = val;
    }
    get maxSelectedLabels() {
        return this._maxSelectedLabels;
    }
    /**
     * Decides how many selected item labels to show at most.
     * @group Props
     */
    selectionLimit;
    /**
     * Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow.
     * @group Props
     */
    selectedItemsLabel;
    /**
     * Whether to show the checkbox at header to toggle all items at once.
     * @group Props
     */
    showToggleAll = true;
    /**
     * Text to display when filtering does not return any results.
     * @group Props
     */
    emptyFilterMessage = '';
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage = '';
    /**
     * Clears the filter value when hiding the dropdown.
     * @group Props
     */
    resetFilterOnHide = false;
    /**
     * Icon class of the dropdown icon.
     * @group Props
     */
    dropdownIcon;
    /**
     * Name of the label field of an option.
     * @group Props
     */
    optionLabel;
    /**
     * Name of the value field of an option.
     * @group Props
     */
    optionValue;
    /**
     * Name of the disabled field of an option.
     * @group Props
     */
    optionDisabled;
    /**
     * Name of the label field of an option group.
     * @group Props
     */
    optionGroupLabel = 'label';
    /**
     * Name of the options field of an option group.
     * @group Props
     */
    optionGroupChildren = 'items';
    /**
     * Whether to show the header.
     * @group Props
     */
    showHeader = true;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy;
    /**
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight = '200px';
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = false;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll;
    /**
     * Whether the multiselect is in loading state.
     * @group Props
     */
    loading = false;
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    virtualScrollItemSize;
    /**
     * Icon to display in loading state.
     * @group Props
     */
    loadingIcon;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions;
    /**
     * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
     * @group Props
     */
    overlayOptions;
    /**
     * Defines a string that labels the filter input.
     * @group Props
     */
    ariaFilterLabel;
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode = 'contains';
    /**
     * Advisory information to display in a tooltip on hover.
     * @group Props
     */
    tooltip = '';
    /**
     * Position of the tooltip.
     * @group Props
     */
    tooltipPosition = 'right';
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
     * Applies focus to the filter element when the overlay is shown.
     * @group Props
     */
    autofocusFilter = true;
    /**
     * Defines how the selected items are displayed.
     * @group Props
     */
    display = 'comma';
    /**
     * Defines the autocomplete is active.
     * @group Props
     */
    autocomplete = 'off';
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * @deprecated since v14.2.0, use overlayOptions property instead.
     * Whether to automatically manage layering.
     * @group Props
     */
    get autoZIndex() {
        return this._autoZIndex;
    }
    set autoZIndex(val) {
        this._autoZIndex = val;
        console.warn('The autoZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * @deprecated since v14.2.0, use overlayOptions property instead.
     * Base zIndex value to use in layering.
     * @group Props
     */
    get baseZIndex() {
        return this._baseZIndex;
    }
    set baseZIndex(val) {
        this._baseZIndex = val;
        console.warn('The baseZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get showTransitionOptions() {
        return this._showTransitionOptions;
    }
    set showTransitionOptions(val) {
        this._showTransitionOptions = val;
        console.warn('The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get hideTransitionOptions() {
        return this._hideTransitionOptions;
    }
    set hideTransitionOptions(val) {
        this._hideTransitionOptions = val;
        console.warn('The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Label to display when there are no selections.
     * @group Props
     * @deprecated Use placeholder instead.
     */
    set defaultLabel(val) {
        this._defaultLabel = val;
        console.warn('defaultLabel property is deprecated since 16.6.0, use placeholder instead');
    }
    get defaultLabel() {
        return this._defaultLabel;
    }
    /**
     * Label to display when there are no selections.
     * @group Props
     */
    set placeholder(val) {
        this._placeholder.set(val);
    }
    get placeholder() {
        return this._placeholder.asReadonly();
    }
    /**
     * An array of objects to display as the available options.
     * @group Props
     */
    get options() {
        const options = this._options();
        return options;
    }
    set options(val) {
        if (!ObjectUtils.deepEquals(this._options(), val)) {
            this._options.set(val);
        }
    }
    /**
     * When specified, filter displays with this value.
     * @group Props
     */
    get filterValue() {
        return this._filterValue();
    }
    set filterValue(val) {
        this._filterValue.set(val);
    }
    /**
     * Item size of item to be virtual scrolled.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    get itemSize() {
        return this._itemSize;
    }
    set itemSize(val) {
        this._itemSize = val;
        console.warn('The itemSize property is deprecated, use virtualScrollItemSize property instead.');
    }
    /**
     * Whether all data is selected.
     * @group Props
     */
    get selectAll() {
        return this._selectAll;
    }
    set selectAll(value) {
        this._selectAll = value;
    }
    /**
     * Indicates whether to focus on options when hovering over them, defaults to optionLabel.
     * @group Props
     */
    focusOnHover = false;
    /**
     * Fields used when filtering the options, defaults to optionLabel.
     * @group Props
     */
    filterFields;
    /**
     * Determines if the option will be selected on focus.
     * @group Props
     */
    selectOnFocus = false;
    /**
     * Whether to focus on the first visible or selected element when the overlay panel is shown.
     * @group Props
     */
    autoOptionFocus = true;
    /**
     * Callback to invoke when value changes.
     * @param {MultiSelectChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange = new EventEmitter();
    /**
     * Callback to invoke when data is filtered.
     * @param {MultiSelectFilterEvent} event - Custom filter event.
     * @group Emits
     */
    onFilter = new EventEmitter();
    /**
     * Callback to invoke when multiselect receives focus.
     * @param {MultiSelectFocusEvent} event - Custom focus event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when multiselect loses focus.
     * @param {MultiSelectBlurEvent} event - Custom blur event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    /**
     * Callback to invoke when component is clicked.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClick = new EventEmitter();
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke when overlay panel becomes visible.
     * @group Emits
     */
    onPanelShow = new EventEmitter();
    /**
     * Callback to invoke when overlay panel becomes hidden.
     * @group Emits
     */
    onPanelHide = new EventEmitter();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {MultiSelectLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {MultiSelectRemoveEvent} event - Remove event.
     * @group Emits
     */
    onRemove = new EventEmitter();
    /**
     * Callback to invoke when all data is selected.
     * @param {MultiSelectSelectAllChangeEvent} event - Custom select event.
     * @group Emits
     */
    onSelectAllChange = new EventEmitter();
    containerViewChild;
    overlayViewChild;
    filterInputChild;
    focusInputViewChild;
    itemsViewChild;
    scroller;
    lastHiddenFocusableElementOnOverlay;
    firstHiddenFocusableElementOnOverlay;
    headerCheckboxViewChild;
    footerFacet;
    headerFacet;
    templates;
    searchValue;
    searchTimeout;
    _selectAll = null;
    _autoZIndex;
    _baseZIndex;
    _showTransitionOptions;
    _hideTransitionOptions;
    _defaultLabel;
    _placeholder = signal(undefined);
    _itemSize;
    _selectionLimit;
    _disableTooltip = false;
    value;
    _filteredOptions;
    onModelChange = () => { };
    onModelTouched = () => { };
    valuesAsString;
    focus;
    filtered;
    itemTemplate;
    groupTemplate;
    loaderTemplate;
    headerTemplate;
    filterTemplate;
    footerTemplate;
    emptyFilterTemplate;
    emptyTemplate;
    selectedItemsTemplate;
    checkIconTemplate;
    loadingIconTemplate;
    filterIconTemplate;
    removeTokenIconTemplate;
    closeIconTemplate;
    clearIconTemplate;
    dropdownIconTemplate;
    itemCheckboxIconTemplate;
    headerCheckboxIconTemplate;
    headerCheckboxFocus;
    filterOptions;
    preventModelTouched;
    preventDocumentDefault;
    focused = false;
    itemsWrapper;
    _displaySelectedLabel = true;
    _maxSelectedLabels = 3;
    modelValue = signal(null);
    _filterValue = signal(null);
    _options = signal(null);
    startRangeIndex = signal(-1);
    focusedOptionIndex = signal(-1);
    selectedOptions;
    clickInProgress = false;
    get containerClass() {
        return {
            'p-multiselect p-component p-inputwrapper': true,
            'p-disabled': this.disabled,
            'p-multiselect-clearable': this.showClear && !this.disabled,
            'p-multiselect-chip': this.display === 'chip',
            'p-focus': this.focused,
            'p-variant-filled': this.variant === 'filled' || this.config.inputStyle() === 'filled'
        };
    }
    get inputClass() {
        return {
            'p-multiselect-label p-inputtext': true,
            'p-placeholder': (this.placeholder() || this.defaultLabel) && (this.label() === this.placeholder() || this.label() === this.defaultLabel),
            'p-multiselect-label-empty': !this.selectedItemsTemplate && (this.label() === 'p-emptylabel' || this.label().length === 0)
        };
    }
    get panelClass() {
        return {
            'p-multiselect-panel p-component': true,
            'p-input-filled': this.config.inputStyle() === 'filled',
            'p-ripple-disabled': this.config.ripple === false
        };
    }
    get labelClass() {
        return {
            'p-multiselect-label': true,
            'p-placeholder': this.label() === this.placeholder() || this.label() === this.defaultLabel,
            'p-multiselect-label-empty': !this.placeholder() && !this.defaultLabel && (!this.modelValue() || this.modelValue().length === 0)
        };
    }
    get emptyMessageLabel() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    get emptyFilterMessageLabel() {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }
    get filled() {
        if (typeof this.modelValue() === 'string')
            return !!this.modelValue();
        return ObjectUtils.isNotEmpty(this.modelValue());
    }
    get isVisibleClearIcon() {
        return this.modelValue() != null && this.modelValue() !== '' && ObjectUtils.isNotEmpty(this.modelValue()) && this.showClear && !this.disabled && this.filled;
    }
    get toggleAllAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria[this.allSelected() ? 'selectAll' : 'unselectAll'] : undefined;
    }
    get closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }
    get listLabel() {
        return this.config.getTranslation(TranslationKeys.ARIA)['listLabel'];
    }
    getAllVisibleAndNonVisibleOptions() {
        return this.group ? this.flatOptions(this.options) : this.options || [];
    }
    visibleOptions = computed(() => {
        const options = this.getAllVisibleAndNonVisibleOptions();
        const isArrayOfObjects = ObjectUtils.isArray(options) && ObjectUtils.isObject(options[0]);
        if (this._filterValue()) {
            let filteredOptions;
            if (isArrayOfObjects) {
                filteredOptions = this.filterService.filter(options, this.searchFields(), this._filterValue(), this.filterMatchMode, this.filterLocale);
            }
            else {
                filteredOptions = options.filter((option) => option.toString().toLocaleLowerCase().includes(this._filterValue().toLocaleLowerCase()));
            }
            if (this.group) {
                const optionGroups = this.options || [];
                const filtered = [];
                optionGroups.forEach((group) => {
                    const groupChildren = this.getOptionGroupChildren(group);
                    const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));
                    if (filteredItems.length > 0)
                        filtered.push({ ...group, [typeof this.optionGroupChildren === 'string' ? this.optionGroupChildren : 'items']: [...filteredItems] });
                });
                return this.flatOptions(filtered);
            }
            return filteredOptions;
        }
        return options;
    });
    label = computed(() => {
        let label;
        const modelValue = this.modelValue();
        if (modelValue && modelValue.length && this.displaySelectedLabel) {
            if (ObjectUtils.isNotEmpty(this.maxSelectedLabels) && modelValue.length > this.maxSelectedLabels) {
                return this.getSelectedItemsLabel();
            }
            else {
                label = '';
                for (let i = 0; i < modelValue.length; i++) {
                    if (i !== 0) {
                        label += ', ';
                    }
                    label += this.getLabelByValue(modelValue[i]);
                }
            }
        }
        else {
            label = this.placeholder() || this.defaultLabel || '';
        }
        return label;
    });
    chipSelectedItems = computed(() => {
        return ObjectUtils.isNotEmpty(this.maxSelectedLabels) && this.modelValue() && this.modelValue().length > this.maxSelectedLabels ? this.modelValue().slice(0, this.maxSelectedLabels) : this.modelValue();
    });
    constructor(el, renderer, cd, zone, filterService, config, overlayService) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.filterService = filterService;
        this.config = config;
        this.overlayService = overlayService;
        effect(() => {
            const modelValue = this.modelValue();
            const visibleOptions = this.visibleOptions();
            if (visibleOptions && ObjectUtils.isNotEmpty(visibleOptions)) {
                if (this.optionValue && this.optionLabel && modelValue) {
                    this.selectedOptions = visibleOptions.filter((option) => modelValue.includes(option[this.optionLabel]) || modelValue.includes(option[this.optionValue]));
                }
                else {
                    this.selectedOptions = modelValue;
                }
                this.cd.markForCheck();
            }
        });
    }
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
        this.autoUpdateModel();
        if (this.filterBy) {
            this.filterOptions = {
                filter: (value) => this.onFilterInputChange(value),
                reset: () => this.resetFilter()
            };
        }
    }
    maxSelectionLimitReached() {
        return ObjectUtils.isNotEmpty(this.selectionLimit) && this.modelValue() && this.modelValue().length === this.selectionLimit;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'group':
                    this.groupTemplate = item.template;
                    break;
                case 'selectedItems':
                    this.selectedItemsTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'filter':
                    this.filterTemplate = item.template;
                    break;
                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'loader':
                    this.loaderTemplate = item.template;
                    break;
                case 'checkicon':
                    this.checkIconTemplate = item.template;
                    console.warn('checkicon is deprecated and will removed in v18. Use itemcheckboxicon or headercheckboxicon templates instead.');
                    break;
                case 'headercheckboxicon':
                    this.headerCheckboxIconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;
                case 'removetokenicon':
                    this.removeTokenIconTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;
                case 'itemcheckboxicon':
                    this.itemCheckboxIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.overlayVisible) {
            this.show();
        }
    }
    ngAfterViewChecked() {
        if (this.filtered) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.overlayViewChild?.alignOverlay();
                }, 1);
            });
            this.filtered = false;
        }
    }
    flatOptions(options) {
        return (options || []).reduce((result, option, index) => {
            result.push({ optionGroup: option, group: true, index });
            const optionGroupChildren = this.getOptionGroupChildren(option);
            optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
            return result;
        }, []);
    }
    autoUpdateModel() {
        if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption()) {
            this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex());
            const value = this.getOptionValue(this.visibleOptions()[this.focusedOptionIndex()]);
            this.onOptionSelect({ originalEvent: null, option: [value] });
        }
    }
    /**
     * Updates the model value.
     * @group Method
     */
    updateModel(value, event) {
        this.value = value;
        this.onModelChange(value);
        this.modelValue.set(value);
    }
    onInputClick(event) {
        event.stopPropagation();
        event.preventDefault();
        this.focusedOptionIndex.set(-1);
    }
    onOptionSelect(event, isFocus = false, index = -1) {
        const { originalEvent, option } = event;
        if (this.disabled || this.isOptionDisabled(option)) {
            return;
        }
        let selected = this.isSelected(option);
        let value = null;
        if (selected) {
            value = this.modelValue().filter((val) => !ObjectUtils.equals(val, this.getOptionValue(option), this.equalityKey()));
            this.onRemove.emit({ newValue: this.value, removed: this.getOptionValue(option) });
        }
        else {
            value = [...(this.modelValue() || []), this.getOptionValue(option)];
        }
        this.updateModel(value, originalEvent);
        index !== -1 && this.focusedOptionIndex.set(index);
        isFocus && DomHandler.focus(this.focusInputViewChild?.nativeElement);
        this.onChange.emit({
            originalEvent: { ...event, selected: !event.selected },
            value: value,
            itemValue: option
        });
    }
    findSelectedOptionIndex() {
        return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
    }
    onOptionSelectRange(event, start = -1, end = -1) {
        start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
        end === -1 && (end = this.findNearestSelectedOptionIndex(start));
        if (start !== -1 && end !== -1) {
            const rangeStart = Math.min(start, end);
            const rangeEnd = Math.max(start, end);
            const value = this.visibleOptions()
                .slice(rangeStart, rangeEnd + 1)
                .filter((option) => this.isValidOption(option))
                .map((option) => this.getOptionValue(option));
            this.updateModel(value, event);
        }
    }
    searchFields() {
        return (this.filterBy || this.optionLabel || 'label').split(',');
    }
    findNearestSelectedOptionIndex(index, firstCheckUp = false) {
        let matchedOptionIndex = -1;
        if (this.hasSelectedOption()) {
            if (firstCheckUp) {
                matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
                matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
            }
            else {
                matchedOptionIndex = this.findNextSelectedOptionIndex(index);
                matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
            }
        }
        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }
    findPrevSelectedOptionIndex(index) {
        const matchedOptionIndex = this.hasSelectedOption() && index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidSelectedOption(option)) : -1;
        return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
    }
    findFirstFocusedOptionIndex() {
        const selectedIndex = this.findFirstSelectedOptionIndex();
        return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    }
    findFirstOptionIndex() {
        return this.visibleOptions().findIndex((option) => this.isValidOption(option));
    }
    findFirstSelectedOptionIndex() {
        return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
    }
    findNextSelectedOptionIndex(index) {
        const matchedOptionIndex = this.hasSelectedOption() && index < this.visibleOptions().length - 1
            ? this.visibleOptions()
                .slice(index + 1)
                .findIndex((option) => this.isValidSelectedOption(option))
            : -1;
        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
    }
    equalityKey() {
        return this.optionValue ? null : this.dataKey;
    }
    hasSelectedOption() {
        return ObjectUtils.isNotEmpty(this.modelValue());
    }
    isSelectionAllDisabled() {
        return this.showToggleAll && ObjectUtils.isEmpty(this.selectionLimit);
    }
    isValidSelectedOption(option) {
        return this.isValidOption(option) && this.isSelected(option);
    }
    isOptionGroup(option) {
        return (this.group || this.optionGroupLabel) && option.optionGroup && option.group;
    }
    isValidOption(option) {
        return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    }
    isOptionDisabled(option) {
        if (this.maxSelectionLimitReached() && !this.isSelected(option)) {
            return true;
        }
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== undefined ? option.disabled : false;
    }
    isSelected(option) {
        const optionValue = this.getOptionValue(option);
        return (this.modelValue() || []).some((value) => ObjectUtils.equals(value, optionValue, this.equalityKey()));
    }
    isOptionMatched(option) {
        return this.isValidOption(option) && this.getOptionLabel(option).toString().toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
    }
    isEmpty() {
        return !this._options() || (this.visibleOptions() && this.visibleOptions().length === 0);
    }
    getOptionIndex(index, scrollerOptions) {
        return this.virtualScrollerDisabled ? index : scrollerOptions && scrollerOptions.getItemOptions(index)['index'];
    }
    getAriaPosInset(index) {
        return ((this.optionGroupLabel
            ? index -
                this.visibleOptions()
                    .slice(0, index)
                    .filter((option) => this.isOptionGroup(option)).length
            : index) + 1);
    }
    get ariaSetSize() {
        return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
    }
    getLabelByValue(value) {
        const options = this.group ? this.flatOptions(this._options()) : this._options() || [];
        const matchedOption = options.find((option) => !this.isOptionGroup(option) && ObjectUtils.equals(this.getOptionValue(option), value, this.equalityKey()));
        return matchedOption ? this.getOptionLabel(matchedOption) : null;
    }
    getSelectedItemsLabel() {
        let pattern = /{(.*?)}/;
        let message = this.selectedItemsLabel ? this.selectedItemsLabel : this.config.getTranslation(TranslationKeys.SELECTION_MESSAGE);
        if (pattern.test(message)) {
            return message.replace(message.match(pattern)[0], this.modelValue().length + '');
        }
        return message;
    }
    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option && option.label != undefined ? option.label : option;
    }
    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : !this.optionValue && option && option.value !== undefined ? option.value : option;
    }
    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label != undefined ? optionGroup.label : optionGroup;
    }
    getOptionGroupChildren(optionGroup) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }
    onKeyDown(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        const metaKey = event.metaKey || event.ctrlKey;
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;
            case 'Home':
                this.onHomeKey(event);
                break;
            case 'End':
                this.onEndKey(event);
                break;
            case 'PageDown':
                this.onPageDownKey(event);
                break;
            case 'PageUp':
                this.onPageUpKey(event);
                break;
            case 'Enter':
            case 'Space':
                this.onEnterKey(event);
                break;
            case 'Escape':
                this.onEscapeKey(event);
                break;
            case 'Tab':
                this.onTabKey(event);
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                this.onShiftKey();
                break;
            default:
                if (event.code === 'KeyA' && metaKey) {
                    const value = this.visibleOptions()
                        .filter((option) => this.isValidOption(option))
                        .map((option) => this.getOptionValue(option));
                    this.updateModel(value, event);
                    event.preventDefault();
                    break;
                }
                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    !this.overlayVisible && this.show();
                    this.searchOptions(event, event.key);
                    event.preventDefault();
                }
                break;
        }
    }
    onFilterKeyDown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event, true);
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                this.onArrowLeftKey(event, true);
                break;
            case 'Home':
                this.onHomeKey(event, true);
                break;
            case 'End':
                this.onEndKey(event, true);
                break;
            case 'Enter':
            case 'NumpadEnter':
                this.onEnterKey(event);
                break;
            case 'Escape':
                this.onEscapeKey(event);
                break;
            case 'Tab':
                this.onTabKey(event, true);
                break;
            default:
                break;
        }
    }
    onArrowLeftKey(event, pressedInInputText = false) {
        pressedInInputText && this.focusedOptionIndex.set(-1);
    }
    onArrowDownKey(event) {
        const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();
        if (event.shiftKey) {
            this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
        }
        this.changeFocusedOptionIndex(event, optionIndex);
        !this.overlayVisible && this.show();
        event.preventDefault();
        event.stopPropagation();
    }
    onArrowUpKey(event, pressedInInputText = false) {
        if (event.altKey && !pressedInInputText) {
            if (this.focusedOptionIndex() !== -1) {
                this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
            }
            this.overlayVisible && this.hide();
            event.preventDefault();
        }
        else {
            const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();
            if (event.shiftKey) {
                this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
            }
            this.changeFocusedOptionIndex(event, optionIndex);
            !this.overlayVisible && this.show();
            event.preventDefault();
        }
        event.stopPropagation();
    }
    onHomeKey(event, pressedInInputText = false) {
        const { currentTarget } = event;
        if (pressedInInputText) {
            const len = currentTarget.value.length;
            currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
            this.focusedOptionIndex.set(-1);
        }
        else {
            let metaKey = event.metaKey || event.ctrlKey;
            let optionIndex = this.findFirstOptionIndex();
            if (event.shiftKey && metaKey) {
                this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
            }
            this.changeFocusedOptionIndex(event, optionIndex);
            !this.overlayVisible && this.show();
        }
        event.preventDefault();
    }
    onEndKey(event, pressedInInputText = false) {
        const { currentTarget } = event;
        if (pressedInInputText) {
            const len = currentTarget.value.length;
            currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
            this.focusedOptionIndex.set(-1);
        }
        else {
            let metaKey = event.metaKey || event.ctrlKey;
            let optionIndex = this.findLastFocusedOptionIndex();
            if (event.shiftKey && metaKey) {
                this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
            }
            this.changeFocusedOptionIndex(event, optionIndex);
            !this.overlayVisible && this.show();
        }
        event.preventDefault();
    }
    onPageDownKey(event) {
        this.scrollInView(this.visibleOptions().length - 1);
        event.preventDefault();
    }
    onPageUpKey(event) {
        this.scrollInView(0);
        event.preventDefault();
    }
    onEnterKey(event) {
        if (!this.overlayVisible) {
            this.onArrowDownKey(event);
        }
        else {
            if (this.focusedOptionIndex() !== -1) {
                if (event.shiftKey) {
                    this.onOptionSelectRange(event, this.focusedOptionIndex());
                }
                else {
                    this.onOptionSelect({ originalEvent: event, option: this.visibleOptions()[this.focusedOptionIndex()] });
                }
            }
        }
        event.preventDefault();
    }
    onEscapeKey(event) {
        this.overlayVisible && this.hide(true);
        event.preventDefault();
    }
    onDeleteKey(event) {
        if (this.showClear) {
            this.clear(event);
            event.preventDefault();
        }
    }
    onTabKey(event, pressedInInputText = false) {
        if (!pressedInInputText) {
            if (this.overlayVisible && this.hasFocusableElements()) {
                DomHandler.focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay.nativeElement : this.firstHiddenFocusableElementOnOverlay.nativeElement);
                event.preventDefault();
            }
            else {
                if (this.focusedOptionIndex() !== -1) {
                    this.onOptionSelect({ originalEvent: event, option: this.visibleOptions()[this.focusedOptionIndex()] });
                }
                this.overlayVisible && this.hide(this.filter);
            }
        }
    }
    onShiftKey() {
        this.startRangeIndex.set(this.focusedOptionIndex());
    }
    onContainerClick(event) {
        if (this.disabled || this.loading || this.readonly || event.target.isSameNode(this.focusInputViewChild?.nativeElement)) {
            return;
        }
        if (event.target.tagName === 'INPUT' || event.target.getAttribute('data-pc-section') === 'clearicon' || event.target.closest('[data-pc-section="clearicon"]')) {
            event.preventDefault();
            return;
        }
        else if (!this.overlayViewChild || !this.overlayViewChild.el.nativeElement.contains(event.target)) {
            if (this.clickInProgress) {
                return;
            }
            this.clickInProgress = true;
            setTimeout(() => {
                this.clickInProgress = false;
            }, 150);
            this.overlayVisible ? this.hide(true) : this.show(true);
        }
        this.focusInputViewChild?.nativeElement.focus({ preventScroll: true });
        this.onClick.emit(event);
        this.cd.detectChanges();
    }
    onFirstHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement
            ? DomHandler.getFirstFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])')
            : this.focusInputViewChild?.nativeElement;
        DomHandler.focus(focusableEl);
    }
    onInputFocus(event) {
        this.focused = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        this.overlayVisible && this.scrollInView(this.focusedOptionIndex());
        this.onFocus.emit({ originalEvent: event });
    }
    onInputBlur(event) {
        this.focused = false;
        this.onBlur.emit({ originalEvent: event });
        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }
    onFilterInputChange(event) {
        let value = event.target.value;
        this._filterValue.set(value);
        this.focusedOptionIndex.set(-1);
        this.onFilter.emit({ originalEvent: event, filter: this._filterValue() });
        !this.virtualScrollerDisabled && this.scroller.scrollToIndex(0);
        setTimeout(() => {
            this.overlayViewChild.alignOverlay();
        });
    }
    onLastHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement
            ? DomHandler.getLastFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])')
            : this.focusInputViewChild?.nativeElement;
        DomHandler.focus(focusableEl);
    }
    onOptionMouseEnter(event, index) {
        if (this.focusOnHover) {
            this.changeFocusedOptionIndex(event, index);
        }
    }
    onHeaderCheckboxKeyDown(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        switch (event.code) {
            case 'Space':
                this.onToggleAll(event);
                break;
            case 'Enter':
                this.onToggleAll(event);
                break;
            default:
                break;
        }
    }
    onremoveTokenIconKeyDown(event, item) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        switch (event.code) {
            case 'Space':
            case 'Enter':
            case 'NumpadEnter':
                this.removeOption(item, event);
                break;
            default:
                break;
        }
        event.preventDefault();
        event.stopPropagation();
    }
    onFilterBlur(event) {
        this.focusedOptionIndex.set(-1);
    }
    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }
    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }
    onToggleAll(event) {
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.selectAll != null) {
            this.onSelectAllChange.emit({
                originalEvent: event,
                checked: !this.allSelected()
            });
        }
        else {
            // pre-selected disabled options should always be selected.
            const selectedDisabledOptions = this.getAllVisibleAndNonVisibleOptions().filter((option) => this.isSelected(option) && (this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== undefined ? option.disabled : false));
            const visibleOptions = this.allSelected()
                ? this.visibleOptions().filter((option) => !this.isValidOption(option) && this.isSelected(option))
                : this.visibleOptions().filter((option) => this.isSelected(option) || this.isValidOption(option));
            const optionValues = [...selectedDisabledOptions, ...visibleOptions].map((option) => this.getOptionValue(option));
            const value = [...new Set(optionValues)];
            this.updateModel(value, event);
            // because onToggleAll could have been called during filtering, this additional test needs to be performed before calling onSelectAllChange.emit
            if (!value.length || value.length === this.getAllVisibleAndNonVisibleOptions().length) {
                this.onSelectAllChange.emit({
                    originalEvent: event,
                    checked: !!value.length
                });
            }
        }
        if (this.partialSelected()) {
            this.selectedOptions = null;
            this.cd.markForCheck();
        }
        this.onChange.emit({ originalEvent: event, value: this.value });
        DomHandler.focus(this.headerCheckboxViewChild?.nativeElement);
        this.headerCheckboxFocus = true;
        event.preventDefault();
        event.stopPropagation();
    }
    changeFocusedOptionIndex(event, index) {
        if (this.focusedOptionIndex() !== index) {
            this.focusedOptionIndex.set(index);
            this.scrollInView();
        }
    }
    get virtualScrollerDisabled() {
        return !this.virtualScroll;
    }
    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
        if (this.itemsViewChild && this.itemsViewChild.nativeElement) {
            const element = DomHandler.findSingle(this.itemsViewChild.nativeElement, `li[id="${id}"]`);
            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
            else if (!this.virtualScrollerDisabled) {
                setTimeout(() => {
                    this.virtualScroll && this.scroller?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
                }, 0);
            }
        }
    }
    get focusedOptionId() {
        return this.focusedOptionIndex() !== -1 ? `${this.id}_${this.focusedOptionIndex()}` : null;
    }
    writeValue(value) {
        this.value = value;
        if (!ObjectUtils.isEmpty(this.selectionLimit) && ObjectUtils.isEmpty(this.value)) {
            this.modelValue.set([]);
        }
        else {
            this.modelValue.set(this.value);
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
    allSelected() {
        return this.selectAll !== null ? this.selectAll : ObjectUtils.isNotEmpty(this.visibleOptions()) && this.visibleOptions().every((option) => this.isOptionGroup(option) || this.isOptionDisabled(option) || this.isSelected(option));
    }
    partialSelected() {
        return this.selectedOptions && this.selectedOptions.length > 0 && this.selectedOptions.length < this.options.length;
    }
    /**
     * Displays the panel.
     * @group Method
     */
    show(isFocus) {
        this.overlayVisible = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        if (isFocus) {
            DomHandler.focus(this.focusInputViewChild?.nativeElement);
        }
        this.cd.markForCheck();
    }
    /**
     * Hides the panel.
     * @group Method
     */
    hide(isFocus) {
        this.overlayVisible = false;
        this.focusedOptionIndex.set(-1);
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
        if (this.overlayOptions?.mode === 'modal') {
            DomHandler.unblockBodyScroll();
        }
        isFocus && DomHandler.focus(this.focusInputViewChild?.nativeElement);
        this.onPanelHide.emit();
        this.cd.markForCheck();
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild?.overlayViewChild?.nativeElement, this.virtualScroll ? '.p-scroller' : '.p-multiselect-items-wrapper');
                this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);
                if (this._options() && this._options().length) {
                    if (this.virtualScroll) {
                        const selectedIndex = ObjectUtils.isNotEmpty(this.modelValue()) ? this.focusedOptionIndex() : -1;
                        if (selectedIndex !== -1) {
                            this.scroller?.scrollToIndex(selectedIndex);
                        }
                    }
                    else {
                        let selectedListItem = DomHandler.findSingle(this.itemsWrapper, '[data-p-highlight="true"]');
                        if (selectedListItem) {
                            selectedListItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                        }
                    }
                }
                if (this.filterInputChild && this.filterInputChild.nativeElement) {
                    this.preventModelTouched = true;
                    if (this.autofocusFilter) {
                        this.filterInputChild.nativeElement.focus();
                    }
                }
                this.onPanelShow.emit();
                break;
            case 'void':
                this.itemsWrapper = null;
                this.onModelTouched();
                break;
        }
    }
    resetFilter() {
        if (this.filterInputChild && this.filterInputChild.nativeElement) {
            this.filterInputChild.nativeElement.value = '';
        }
        this._filterValue.set(null);
        this._filteredOptions = null;
    }
    close(event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }
    clear(event) {
        this.value = null;
        this.updateModel(null, event);
        this.selectedOptions = null;
        this.onClear.emit();
        this._disableTooltip = true;
        event.stopPropagation();
    }
    labelContainerMouseLeave() {
        if (this._disableTooltip)
            this._disableTooltip = false;
    }
    removeOption(optionValue, event) {
        let value = this.modelValue().filter((val) => !ObjectUtils.equals(val, optionValue, this.equalityKey()));
        this.updateModel(value, event);
        this.onChange.emit({
            originalEvent: event,
            value: value,
            itemValue: optionValue
        });
        this.onClear.emit();
        event && event.stopPropagation();
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem.children[0], 'p-disabled') || DomHandler.isHidden(nextItem.children[0]) || DomHandler.hasClass(nextItem, 'p-multiselect-item-group') ? this.findNextItem(nextItem) : nextItem.children[0];
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem.children[0], 'p-disabled') || DomHandler.isHidden(prevItem.children[0]) || DomHandler.hasClass(prevItem, 'p-multiselect-item-group') ? this.findPrevItem(prevItem) : prevItem.children[0];
        else
            return null;
    }
    findNextOptionIndex(index) {
        const matchedOptionIndex = index < this.visibleOptions().length - 1
            ? this.visibleOptions()
                .slice(index + 1)
                .findIndex((option) => this.isValidOption(option))
            : -1;
        return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    }
    findPrevOptionIndex(index) {
        const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;
        return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    }
    findLastSelectedOptionIndex() {
        return this.hasSelectedOption() ? ObjectUtils.findLastIndex(this.visibleOptions(), (option) => this.isValidSelectedOption(option)) : -1;
    }
    findLastFocusedOptionIndex() {
        const selectedIndex = this.findLastSelectedOptionIndex();
        return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    }
    findLastOptionIndex() {
        return ObjectUtils.findLastIndex(this.visibleOptions(), (option) => this.isValidOption(option));
    }
    searchOptions(event, char) {
        this.searchValue = (this.searchValue || '') + char;
        let optionIndex = -1;
        let matched = false;
        if (this.focusedOptionIndex() !== -1) {
            optionIndex = this.visibleOptions()
                .slice(this.focusedOptionIndex())
                .findIndex((option) => this.isOptionMatched(option));
            optionIndex =
                optionIndex === -1
                    ? this.visibleOptions()
                        .slice(0, this.focusedOptionIndex())
                        .findIndex((option) => this.isOptionMatched(option))
                    : optionIndex + this.focusedOptionIndex();
        }
        else {
            optionIndex = this.visibleOptions().findIndex((option) => this.isOptionMatched(option));
        }
        if (optionIndex !== -1) {
            matched = true;
        }
        if (optionIndex === -1 && this.focusedOptionIndex() === -1) {
            optionIndex = this.findFirstFocusedOptionIndex();
        }
        if (optionIndex !== -1) {
            this.changeFocusedOptionIndex(event, optionIndex);
        }
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = null;
        }, 500);
        return matched;
    }
    activateFilter() {
        if (this.hasFilter() && this._options) {
            if (this.group) {
                let filteredGroups = [];
                for (let optgroup of this.options) {
                    let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({ ...optgroup, ...{ [this.optionGroupChildren]: filteredSubOptions } });
                    }
                }
                this._filteredOptions = filteredGroups;
            }
            else {
                this._filteredOptions = this.filterService.filter(this.options, this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);
            }
        }
        else {
            this._filteredOptions = null;
        }
    }
    hasFocusableElements() {
        return DomHandler.getFocusableElements(this.overlayViewChild.overlayViewChild.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
    }
    hasFilter() {
        return this._filterValue() && this._filterValue().trim().length > 0;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: MultiSelect, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1.FilterService }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: MultiSelect, selector: "p-multiSelect", inputs: { id: "id", ariaLabel: "ariaLabel", style: "style", styleClass: "styleClass", panelStyle: "panelStyle", panelStyleClass: "panelStyleClass", inputId: "inputId", disabled: ["disabled", "disabled", booleanAttribute], readonly: ["readonly", "readonly", booleanAttribute], group: ["group", "group", booleanAttribute], filter: ["filter", "filter", booleanAttribute], filterPlaceHolder: "filterPlaceHolder", filterLocale: "filterLocale", overlayVisible: ["overlayVisible", "overlayVisible", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute], variant: "variant", appendTo: "appendTo", dataKey: "dataKey", name: "name", ariaLabelledBy: "ariaLabelledBy", displaySelectedLabel: "displaySelectedLabel", maxSelectedLabels: "maxSelectedLabels", selectionLimit: ["selectionLimit", "selectionLimit", (value) => numberAttribute(value, null)], selectedItemsLabel: "selectedItemsLabel", showToggleAll: ["showToggleAll", "showToggleAll", booleanAttribute], emptyFilterMessage: "emptyFilterMessage", emptyMessage: "emptyMessage", resetFilterOnHide: ["resetFilterOnHide", "resetFilterOnHide", booleanAttribute], dropdownIcon: "dropdownIcon", optionLabel: "optionLabel", optionValue: "optionValue", optionDisabled: "optionDisabled", optionGroupLabel: "optionGroupLabel", optionGroupChildren: "optionGroupChildren", showHeader: ["showHeader", "showHeader", booleanAttribute], filterBy: "filterBy", scrollHeight: "scrollHeight", lazy: ["lazy", "lazy", booleanAttribute], virtualScroll: ["virtualScroll", "virtualScroll", booleanAttribute], loading: ["loading", "loading", booleanAttribute], virtualScrollItemSize: ["virtualScrollItemSize", "virtualScrollItemSize", numberAttribute], loadingIcon: "loadingIcon", virtualScrollOptions: "virtualScrollOptions", overlayOptions: "overlayOptions", ariaFilterLabel: "ariaFilterLabel", filterMatchMode: "filterMatchMode", tooltip: "tooltip", tooltipPosition: "tooltipPosition", tooltipPositionStyle: "tooltipPositionStyle", tooltipStyleClass: "tooltipStyleClass", autofocusFilter: ["autofocusFilter", "autofocusFilter", booleanAttribute], display: "display", autocomplete: "autocomplete", showClear: ["showClear", "showClear", booleanAttribute], autofocus: ["autofocus", "autofocus", booleanAttribute], autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", defaultLabel: "defaultLabel", placeholder: "placeholder", options: "options", filterValue: "filterValue", itemSize: "itemSize", selectAll: "selectAll", focusOnHover: ["focusOnHover", "focusOnHover", booleanAttribute], filterFields: "filterFields", selectOnFocus: ["selectOnFocus", "selectOnFocus", booleanAttribute], autoOptionFocus: ["autoOptionFocus", "autoOptionFocus", booleanAttribute] }, outputs: { onChange: "onChange", onFilter: "onFilter", onFocus: "onFocus", onBlur: "onBlur", onClick: "onClick", onClear: "onClear", onPanelShow: "onPanelShow", onPanelHide: "onPanelHide", onLazyLoad: "onLazyLoad", onRemove: "onRemove", onSelectAllChange: "onSelectAllChange" }, host: { properties: { "class.p-inputwrapper-focus": "focused || overlayVisible", "class.p-inputwrapper-filled": "filled" }, classAttribute: "p-element p-inputwrapper" }, providers: [MULTISELECT_VALUE_ACCESSOR], queries: [{ propertyName: "footerFacet", first: true, predicate: Footer, descendants: true }, { propertyName: "headerFacet", first: true, predicate: Header, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "overlayViewChild", first: true, predicate: ["overlay"], descendants: true }, { propertyName: "filterInputChild", first: true, predicate: ["filterInput"], descendants: true }, { propertyName: "focusInputViewChild", first: true, predicate: ["focusInput"], descendants: true }, { propertyName: "itemsViewChild", first: true, predicate: ["items"], descendants: true }, { propertyName: "scroller", first: true, predicate: ["scroller"], descendants: true }, { propertyName: "lastHiddenFocusableElementOnOverlay", first: true, predicate: ["lastHiddenFocusableEl"], descendants: true }, { propertyName: "firstHiddenFocusableElementOnOverlay", first: true, predicate: ["firstHiddenFocusableEl"], descendants: true }, { propertyName: "headerCheckboxViewChild", first: true, predicate: ["headerCheckbox"], descendants: true }], ngImport: i0, template: `
        <div #container [attr.id]="id" [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick($event)">
            <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                <input
                    #focusInput
                    [pTooltip]="tooltip"
                    [tooltipPosition]="tooltipPosition"
                    [positionStyle]="tooltipPositionStyle"
                    [tooltipStyleClass]="tooltipStyleClass"
                    [attr.aria-disabled]="disabled"
                    [attr.id]="inputId"
                    role="combobox"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-haspopup]="'listbox'"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (keydown)="onKeyDown($event)"
                    pAutoFocus
                    [autofocus]="autofocus"
                    [attr.value]="label() || 'empty'"
                />
            </div>
            <div
                class="p-multiselect-label-container"
                [pTooltip]="tooltip"
                (mouseleave)="labelContainerMouseLeave()"
                [tooltipDisabled]="_disableTooltip"
                [tooltipPosition]="tooltipPosition"
                [positionStyle]="tooltipPositionStyle"
                [tooltipStyleClass]="tooltipStyleClass"
            >
                <div [ngClass]="labelClass">
                    <ng-container *ngIf="!selectedItemsTemplate">
                        <ng-container *ngIf="display === 'comma'">{{ label() || 'empty' }}</ng-container>
                        <ng-container *ngIf="display === 'chip'">
                            <div #token *ngFor="let item of chipSelectedItems(); let i = index" class="p-multiselect-token">
                                <span class="p-multiselect-token-label">{{ getLabelByValue(item) }}</span>
                                <ng-container *ngIf="!disabled">
                                    <TimesCircleIcon
                                        *ngIf="!removeTokenIconTemplate"
                                        [ngClass]="{ 'p-disabled': isOptionDisabled(item) }"
                                        [styleClass]="'p-multiselect-token-icon'"
                                        (click)="removeOption(item, event)"
                                        (keydown)="onremoveTokenIconKeyDown($event, item)"
                                        [attr.tabindex]="0"
                                        [attr.data-pc-section]="'clearicon'"
                                        [attr.aria-hidden]="true"
                                    />
                                    <span
                                        *ngIf="removeTokenIconTemplate"
                                        class="p-multiselect-token-icon"
                                        (click)="removeOption(item, event)"
                                        (keydown)="onremoveTokenIconKeyDown($event, item)"
                                        [attr.tabindex]="0"
                                        [attr.data-pc-section]="'clearicon'"
                                        [attr.aria-hidden]="true"
                                    >
                                        <ng-container *ngTemplateOutlet="removeTokenIconTemplate"></ng-container>
                                    </span>
                                </ng-container>
                            </div>
                            <ng-container *ngIf="!modelValue() || modelValue().length === 0">{{ placeholder() || defaultLabel || 'empty' }}</ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: { $implicit: selectedOptions, removeChip: removeOption.bind(this) }"></ng-container>
                </div>
                <ng-container *ngIf="isVisibleClearIcon">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-multiselect-clear-icon'" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
                    <span *ngIf="clearIconTemplate" class="p-multiselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div class="p-multiselect-trigger">
                <ng-container *ngIf="loading; else elseBlock">
                    <ng-container *ngIf="loadingIconTemplate">
                        <ng-container *ngTemplateOutlet="loadingIconTemplate"></ng-container>
                    </ng-container>
                    <ng-container *ngIf="!loadingIconTemplate">
                        <span *ngIf="loadingIcon" [ngClass]="'p-multiselect-trigger-icon pi-spin ' + loadingIcon" aria-hidden="true"></span>
                        <span *ngIf="!loadingIcon" [class]="'p-multiselect-trigger-icon pi pi-spinner pi-spin'" aria-hidden="true"></span>
                    </ng-container>
                </ng-container>
                <ng-template #elseBlock>
                    <ng-container *ngIf="!dropdownIconTemplate">
                        <span *ngIf="dropdownIcon" class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true"></span>
                        <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-multiselect-trigger-icon'" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true" />
                    </ng-container>
                    <span *ngIf="dropdownIconTemplate" class="p-multiselect-trigger-icon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                    </span>
                </ng-template>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [autoZIndex]="autoZIndex"
                [baseZIndex]="baseZIndex"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onHide)="hide()"
            >
                <ng-template pTemplate="content">
                    <div [attr.id]="id + '_list'" [ngClass]="'p-multiselect-panel p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
                        <span
                            #firstHiddenFocusableEl
                            role="presentation"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onFirstHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        >
                        </span>
                        <div class="p-multiselect-header" *ngIf="showHeader">
                            <ng-content select="p-header"></ng-content>
                            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div
                                    class="p-checkbox p-component"
                                    *ngIf="isSelectionAllDisabled()"
                                    [ngClass]="{ 'p-variant-filled': variant === 'filled' || config.inputStyle() === 'filled', 'p-checkbox-disabled': disabled || toggleAllDisabled }"
                                    (click)="onToggleAll($event)"
                                    (keydown)="onHeaderCheckboxKeyDown($event)"
                                >
                                    <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                                        <input
                                            #headerCheckbox
                                            type="checkbox"
                                            [readonly]="readonly"
                                            [attr.checked]="allSelected()"
                                            (focus)="onHeaderCheckboxFocus()"
                                            (blur)="onHeaderCheckboxBlur()"
                                            [disabled]="disabled || toggleAllDisabled"
                                            [attr.aria-label]="toggleAllAriaLabel"
                                        />
                                    </div>
                                    <div
                                        class="p-checkbox-box"
                                        role="checkbox"
                                        [attr.aria-label]="toggleAllAriaLabel"
                                        [attr.aria-checked]="allSelected()"
                                        [ngClass]="{ 'p-highlight': allSelected(), 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled }"
                                    >
                                        <ng-container *ngIf="allSelected() || partialSelected()">
                                            <ng-container *ngIf="!checkIconTemplate && !headerCheckboxIconTemplate">
                                                <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="allSelected()" [attr.aria-hidden]="true" />
                                            </ng-container>

                                            <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                                                <ng-template *ngTemplateOutlet="checkIconTemplate; context: { $implicit: allSelected() }"></ng-template>
                                            </span>
                                            <span *ngIf="headerCheckboxIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                                                <ng-template *ngTemplateOutlet="headerCheckboxIconTemplate; context: { $implicit: allSelected(), partialSelected: partialSelected() }"></ng-template>
                                            </span>
                                        </ng-container>
                                    </div>
                                </div>
                                <div class="p-multiselect-filter-container" *ngIf="filter">
                                    <input
                                        #filterInput
                                        type="text"
                                        role="searchbox"
                                        [attr.autocomplete]="autocomplete"
                                        [attr.placeholder]="filterPlaceHolder"
                                        role="searchbox"
                                        [attr.aria-owns]="id + '_list'"
                                        [attr.aria-activedescendant]="focusedOptionId"
                                        [value]="_filterValue() || ''"
                                        (input)="onFilterInputChange($event)"
                                        (keydown)="onFilterKeyDown($event)"
                                        (click)="onInputClick($event)"
                                        (blur)="onFilterBlur($event)"
                                        class="p-multiselect-filter p-inputtext p-component"
                                        [disabled]="disabled"
                                        [attr.placeholder]="filterPlaceHolder"
                                        [attr.aria-label]="ariaFilterLabel"
                                    />
                                    <SearchIcon [styleClass]="'p-multiselect-filter-icon'" *ngIf="!filterIconTemplate" />
                                    <span *ngIf="filterIconTemplate" class="p-multiselect-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                    </span>
                                </div>

                                <button class="p-multiselect-close p-link p-button-icon-only" type="button" (click)="close($event)" pRipple [attr.aria-label]="closeAriaLabel">
                                    <TimesIcon [styleClass]="'p-multiselect-close-icon'" *ngIf="!closeIconTemplate" />
                                    <span *ngIf="closeIconTemplate" class="p-multiselect-close-icon">
                                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                    </span>
                                </button>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-items-wrapper" [ngStyle]="{ 'max-height': virtualScroll ? 'auto' : scrollHeight || 'auto' }">
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
                                [tabindex]="-1"
                                [lazy]="lazy"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions"
                            >
                                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                                </ng-template>
                                <ng-container *ngIf="loaderTemplate">
                                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                    </ng-template>
                                </ng-container>
                            </p-scroller>
                            <ng-container *ngIf="!virtualScroll">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: visibleOptions(), options: {} }"></ng-container>
                            </ng-container>

                            <ng-template #buildInItems let-items let-scrollerOptions="options">
                                <ul #items class="p-multiselect-items p-component" [ngClass]="scrollerOptions.contentStyleClass" [ngStyle]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true" [attr.aria-label]="listLabel">
                                    <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                        <ng-container *ngIf="isOptionGroup(option)">
                                            <li [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" class="p-multiselect-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                            </li>
                                        </ng-container>
                                        <ng-container *ngIf="!isOptionGroup(option)">
                                            <p-multiSelectItem
                                                [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                                [option]="option"
                                                [selected]="isSelected(option)"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                [template]="itemTemplate"
                                                [checkIconTemplate]="checkIconTemplate"
                                                [itemCheckboxIconTemplate]="itemCheckboxIconTemplate"
                                                [itemSize]="scrollerOptions.itemSize"
                                                [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                                [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                                [ariaSetSize]="ariaSetSize"
                                                (onClick)="onOptionSelect($event, false, getOptionIndex(i, scrollerOptions))"
                                                (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            ></p-multiSelectItem>
                                        </ng-container>
                                    </ng-template>

                                    <li *ngIf="hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-footer" *ngIf="footerFacet || footerTemplate">
                            <ng-content select="p-footer"></ng-content>
                            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                        </div>

                        <span
                            #lastHiddenFocusableEl
                            role="presentation"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onLastHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        ></span>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-multiselect{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-multiselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-multiselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer;display:flex}.p-multiselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-multiselect-label-empty{overflow:hidden;visibility:hidden}.p-multiselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-multiselect-token-icon{cursor:pointer}.p-multiselect-token-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100px}.p-multiselect-items-wrapper{overflow:auto}.p-multiselect-items{margin:0;padding:0;list-style-type:none}.p-multiselect-item{cursor:pointer;display:flex;align-items:center;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-multiselect-header{display:flex;align-items:center;justify-content:space-between}.p-multiselect-filter-container{position:relative;flex:1 1 auto}.p-multiselect-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-multiselect-filter-container .p-inputtext{width:100%}.p-multiselect-close{display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;position:relative}.p-fluid .p-multiselect{display:flex}.p-multiselect-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-multiselect-clearable{position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => i4.Overlay), selector: "p-overlay", inputs: ["visible", "mode", "style", "styleClass", "contentStyle", "contentStyleClass", "target", "appendTo", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "listener", "responsive", "options"], outputs: ["visibleChange", "onBeforeShow", "onShow", "onBeforeHide", "onHide", "onAnimationStart", "onAnimationDone"] }, { kind: "directive", type: i0.forwardRef(() => i1.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i5.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => i6.Scroller), selector: "p-scroller", inputs: ["id", "style", "styleClass", "tabindex", "items", "itemSize", "scrollHeight", "scrollWidth", "orientation", "step", "delay", "resizeDelay", "appendOnly", "inline", "lazy", "disabled", "loaderDisabled", "columns", "showSpacer", "showLoader", "numToleratedItems", "loading", "autoSize", "trackBy", "options"], outputs: ["onLazyLoad", "onScroll", "onScrollIndexChange"] }, { kind: "directive", type: i0.forwardRef(() => i7.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }, { kind: "component", type: i0.forwardRef(() => SearchIcon), selector: "SearchIcon" }, { kind: "component", type: i0.forwardRef(() => TimesCircleIcon), selector: "TimesCircleIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => MultiSelectItem), selector: "p-multiSelectItem", inputs: ["id", "option", "selected", "label", "disabled", "itemSize", "focused", "ariaPosInset", "ariaSetSize", "template", "checkIconTemplate", "itemCheckboxIconTemplate"], outputs: ["onClick", "onMouseEnter"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: MultiSelect, decorators: [{
            type: Component,
            args: [{ selector: 'p-multiSelect', template: `
        <div #container [attr.id]="id" [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick($event)">
            <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                <input
                    #focusInput
                    [pTooltip]="tooltip"
                    [tooltipPosition]="tooltipPosition"
                    [positionStyle]="tooltipPositionStyle"
                    [tooltipStyleClass]="tooltipStyleClass"
                    [attr.aria-disabled]="disabled"
                    [attr.id]="inputId"
                    role="combobox"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-haspopup]="'listbox'"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (keydown)="onKeyDown($event)"
                    pAutoFocus
                    [autofocus]="autofocus"
                    [attr.value]="label() || 'empty'"
                />
            </div>
            <div
                class="p-multiselect-label-container"
                [pTooltip]="tooltip"
                (mouseleave)="labelContainerMouseLeave()"
                [tooltipDisabled]="_disableTooltip"
                [tooltipPosition]="tooltipPosition"
                [positionStyle]="tooltipPositionStyle"
                [tooltipStyleClass]="tooltipStyleClass"
            >
                <div [ngClass]="labelClass">
                    <ng-container *ngIf="!selectedItemsTemplate">
                        <ng-container *ngIf="display === 'comma'">{{ label() || 'empty' }}</ng-container>
                        <ng-container *ngIf="display === 'chip'">
                            <div #token *ngFor="let item of chipSelectedItems(); let i = index" class="p-multiselect-token">
                                <span class="p-multiselect-token-label">{{ getLabelByValue(item) }}</span>
                                <ng-container *ngIf="!disabled">
                                    <TimesCircleIcon
                                        *ngIf="!removeTokenIconTemplate"
                                        [ngClass]="{ 'p-disabled': isOptionDisabled(item) }"
                                        [styleClass]="'p-multiselect-token-icon'"
                                        (click)="removeOption(item, event)"
                                        (keydown)="onremoveTokenIconKeyDown($event, item)"
                                        [attr.tabindex]="0"
                                        [attr.data-pc-section]="'clearicon'"
                                        [attr.aria-hidden]="true"
                                    />
                                    <span
                                        *ngIf="removeTokenIconTemplate"
                                        class="p-multiselect-token-icon"
                                        (click)="removeOption(item, event)"
                                        (keydown)="onremoveTokenIconKeyDown($event, item)"
                                        [attr.tabindex]="0"
                                        [attr.data-pc-section]="'clearicon'"
                                        [attr.aria-hidden]="true"
                                    >
                                        <ng-container *ngTemplateOutlet="removeTokenIconTemplate"></ng-container>
                                    </span>
                                </ng-container>
                            </div>
                            <ng-container *ngIf="!modelValue() || modelValue().length === 0">{{ placeholder() || defaultLabel || 'empty' }}</ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: { $implicit: selectedOptions, removeChip: removeOption.bind(this) }"></ng-container>
                </div>
                <ng-container *ngIf="isVisibleClearIcon">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-multiselect-clear-icon'" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
                    <span *ngIf="clearIconTemplate" class="p-multiselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div class="p-multiselect-trigger">
                <ng-container *ngIf="loading; else elseBlock">
                    <ng-container *ngIf="loadingIconTemplate">
                        <ng-container *ngTemplateOutlet="loadingIconTemplate"></ng-container>
                    </ng-container>
                    <ng-container *ngIf="!loadingIconTemplate">
                        <span *ngIf="loadingIcon" [ngClass]="'p-multiselect-trigger-icon pi-spin ' + loadingIcon" aria-hidden="true"></span>
                        <span *ngIf="!loadingIcon" [class]="'p-multiselect-trigger-icon pi pi-spinner pi-spin'" aria-hidden="true"></span>
                    </ng-container>
                </ng-container>
                <ng-template #elseBlock>
                    <ng-container *ngIf="!dropdownIconTemplate">
                        <span *ngIf="dropdownIcon" class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true"></span>
                        <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-multiselect-trigger-icon'" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true" />
                    </ng-container>
                    <span *ngIf="dropdownIconTemplate" class="p-multiselect-trigger-icon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                    </span>
                </ng-template>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [autoZIndex]="autoZIndex"
                [baseZIndex]="baseZIndex"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onHide)="hide()"
            >
                <ng-template pTemplate="content">
                    <div [attr.id]="id + '_list'" [ngClass]="'p-multiselect-panel p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
                        <span
                            #firstHiddenFocusableEl
                            role="presentation"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onFirstHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        >
                        </span>
                        <div class="p-multiselect-header" *ngIf="showHeader">
                            <ng-content select="p-header"></ng-content>
                            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div
                                    class="p-checkbox p-component"
                                    *ngIf="isSelectionAllDisabled()"
                                    [ngClass]="{ 'p-variant-filled': variant === 'filled' || config.inputStyle() === 'filled', 'p-checkbox-disabled': disabled || toggleAllDisabled }"
                                    (click)="onToggleAll($event)"
                                    (keydown)="onHeaderCheckboxKeyDown($event)"
                                >
                                    <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                                        <input
                                            #headerCheckbox
                                            type="checkbox"
                                            [readonly]="readonly"
                                            [attr.checked]="allSelected()"
                                            (focus)="onHeaderCheckboxFocus()"
                                            (blur)="onHeaderCheckboxBlur()"
                                            [disabled]="disabled || toggleAllDisabled"
                                            [attr.aria-label]="toggleAllAriaLabel"
                                        />
                                    </div>
                                    <div
                                        class="p-checkbox-box"
                                        role="checkbox"
                                        [attr.aria-label]="toggleAllAriaLabel"
                                        [attr.aria-checked]="allSelected()"
                                        [ngClass]="{ 'p-highlight': allSelected(), 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled }"
                                    >
                                        <ng-container *ngIf="allSelected() || partialSelected()">
                                            <ng-container *ngIf="!checkIconTemplate && !headerCheckboxIconTemplate">
                                                <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="allSelected()" [attr.aria-hidden]="true" />
                                            </ng-container>

                                            <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                                                <ng-template *ngTemplateOutlet="checkIconTemplate; context: { $implicit: allSelected() }"></ng-template>
                                            </span>
                                            <span *ngIf="headerCheckboxIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                                                <ng-template *ngTemplateOutlet="headerCheckboxIconTemplate; context: { $implicit: allSelected(), partialSelected: partialSelected() }"></ng-template>
                                            </span>
                                        </ng-container>
                                    </div>
                                </div>
                                <div class="p-multiselect-filter-container" *ngIf="filter">
                                    <input
                                        #filterInput
                                        type="text"
                                        role="searchbox"
                                        [attr.autocomplete]="autocomplete"
                                        [attr.placeholder]="filterPlaceHolder"
                                        role="searchbox"
                                        [attr.aria-owns]="id + '_list'"
                                        [attr.aria-activedescendant]="focusedOptionId"
                                        [value]="_filterValue() || ''"
                                        (input)="onFilterInputChange($event)"
                                        (keydown)="onFilterKeyDown($event)"
                                        (click)="onInputClick($event)"
                                        (blur)="onFilterBlur($event)"
                                        class="p-multiselect-filter p-inputtext p-component"
                                        [disabled]="disabled"
                                        [attr.placeholder]="filterPlaceHolder"
                                        [attr.aria-label]="ariaFilterLabel"
                                    />
                                    <SearchIcon [styleClass]="'p-multiselect-filter-icon'" *ngIf="!filterIconTemplate" />
                                    <span *ngIf="filterIconTemplate" class="p-multiselect-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                    </span>
                                </div>

                                <button class="p-multiselect-close p-link p-button-icon-only" type="button" (click)="close($event)" pRipple [attr.aria-label]="closeAriaLabel">
                                    <TimesIcon [styleClass]="'p-multiselect-close-icon'" *ngIf="!closeIconTemplate" />
                                    <span *ngIf="closeIconTemplate" class="p-multiselect-close-icon">
                                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                    </span>
                                </button>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-items-wrapper" [ngStyle]="{ 'max-height': virtualScroll ? 'auto' : scrollHeight || 'auto' }">
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
                                [tabindex]="-1"
                                [lazy]="lazy"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions"
                            >
                                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                                </ng-template>
                                <ng-container *ngIf="loaderTemplate">
                                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                    </ng-template>
                                </ng-container>
                            </p-scroller>
                            <ng-container *ngIf="!virtualScroll">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: visibleOptions(), options: {} }"></ng-container>
                            </ng-container>

                            <ng-template #buildInItems let-items let-scrollerOptions="options">
                                <ul #items class="p-multiselect-items p-component" [ngClass]="scrollerOptions.contentStyleClass" [ngStyle]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true" [attr.aria-label]="listLabel">
                                    <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                        <ng-container *ngIf="isOptionGroup(option)">
                                            <li [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" class="p-multiselect-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                            </li>
                                        </ng-container>
                                        <ng-container *ngIf="!isOptionGroup(option)">
                                            <p-multiSelectItem
                                                [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                                [option]="option"
                                                [selected]="isSelected(option)"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                [template]="itemTemplate"
                                                [checkIconTemplate]="checkIconTemplate"
                                                [itemCheckboxIconTemplate]="itemCheckboxIconTemplate"
                                                [itemSize]="scrollerOptions.itemSize"
                                                [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                                [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                                [ariaSetSize]="ariaSetSize"
                                                (onClick)="onOptionSelect($event, false, getOptionIndex(i, scrollerOptions))"
                                                (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            ></p-multiSelectItem>
                                        </ng-container>
                                    </ng-template>

                                    <li *ngIf="hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-footer" *ngIf="footerFacet || footerTemplate">
                            <ng-content select="p-footer"></ng-content>
                            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                        </div>

                        <span
                            #lastHiddenFocusableEl
                            role="presentation"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onLastHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        ></span>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `, host: {
                        class: 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-focus]': 'focused || overlayVisible',
                        '[class.p-inputwrapper-filled]': 'filled'
                    }, providers: [MULTISELECT_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.p-multiselect{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-multiselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-multiselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer;display:flex}.p-multiselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-multiselect-label-empty{overflow:hidden;visibility:hidden}.p-multiselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-multiselect-token-icon{cursor:pointer}.p-multiselect-token-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100px}.p-multiselect-items-wrapper{overflow:auto}.p-multiselect-items{margin:0;padding:0;list-style-type:none}.p-multiselect-item{cursor:pointer;display:flex;align-items:center;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-multiselect-header{display:flex;align-items:center;justify-content:space-between}.p-multiselect-filter-container{position:relative;flex:1 1 auto}.p-multiselect-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-multiselect-filter-container .p-inputtext{width:100%}.p-multiselect-close{display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;position:relative}.p-fluid .p-multiselect{display:flex}.p-multiselect-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-multiselect-clearable{position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1.FilterService }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }], propDecorators: { id: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], inputId: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], group: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filterPlaceHolder: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], overlayVisible: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], variant: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], dataKey: [{
                type: Input
            }], name: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], displaySelectedLabel: [{
                type: Input
            }], maxSelectedLabels: [{
                type: Input
            }], selectionLimit: [{
                type: Input,
                args: [{ transform: (value) => numberAttribute(value, null) }]
            }], selectedItemsLabel: [{
                type: Input
            }], showToggleAll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], emptyFilterMessage: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], resetFilterOnHide: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dropdownIcon: [{
                type: Input
            }], optionLabel: [{
                type: Input
            }], optionValue: [{
                type: Input
            }], optionDisabled: [{
                type: Input
            }], optionGroupLabel: [{
                type: Input
            }], optionGroupChildren: [{
                type: Input
            }], showHeader: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filterBy: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], lazy: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualScroll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualScrollItemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], loadingIcon: [{
                type: Input
            }], virtualScrollOptions: [{
                type: Input
            }], overlayOptions: [{
                type: Input
            }], ariaFilterLabel: [{
                type: Input
            }], filterMatchMode: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], tooltipPositionStyle: [{
                type: Input
            }], tooltipStyleClass: [{
                type: Input
            }], autofocusFilter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], display: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], showClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], defaultLabel: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], options: [{
                type: Input
            }], filterValue: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], selectAll: [{
                type: Input
            }], focusOnHover: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filterFields: [{
                type: Input
            }], selectOnFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoOptionFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onChange: [{
                type: Output
            }], onFilter: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onClick: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onPanelShow: [{
                type: Output
            }], onPanelHide: [{
                type: Output
            }], onLazyLoad: [{
                type: Output
            }], onRemove: [{
                type: Output
            }], onSelectAllChange: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], overlayViewChild: [{
                type: ViewChild,
                args: ['overlay']
            }], filterInputChild: [{
                type: ViewChild,
                args: ['filterInput']
            }], focusInputViewChild: [{
                type: ViewChild,
                args: ['focusInput']
            }], itemsViewChild: [{
                type: ViewChild,
                args: ['items']
            }], scroller: [{
                type: ViewChild,
                args: ['scroller']
            }], lastHiddenFocusableElementOnOverlay: [{
                type: ViewChild,
                args: ['lastHiddenFocusableEl']
            }], firstHiddenFocusableElementOnOverlay: [{
                type: ViewChild,
                args: ['firstHiddenFocusableEl']
            }], headerCheckboxViewChild: [{
                type: ViewChild,
                args: ['headerCheckbox']
            }], footerFacet: [{
                type: ContentChild,
                args: [Footer]
            }], headerFacet: [{
                type: ContentChild,
                args: [Header]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class MultiSelectModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: MultiSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: MultiSelectModule, declarations: [MultiSelect, MultiSelectItem], imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, CheckIcon, MinusIcon], exports: [MultiSelect, OverlayModule, SharedModule, ScrollerModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: MultiSelectModule, imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, CheckIcon, MinusIcon, OverlayModule, SharedModule, ScrollerModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: MultiSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, CheckIcon, MinusIcon],
                    exports: [MultiSelect, OverlayModule, SharedModule, ScrollerModule],
                    declarations: [MultiSelect, MultiSelectItem]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvbXVsdGlzZWxlY3QvbXVsdGlzZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFJSCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxRQUFRLEVBQ1IsWUFBWSxFQUNaLGVBQWUsRUFDZixNQUFNLEVBRU4sWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsUUFBUSxFQUVSLGVBQWUsRUFFZixNQUFNLEVBSU4sTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBaUIsTUFBTSxFQUFFLE1BQU0sRUFBaUQsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekosT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQVcsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBWSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwy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QkFMN0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO29CQUM1TSxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUM7b0JBQ25FLFlBQVksRUFBRSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUM7aUJBQy9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIGNvbXB1dGVkLFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgZWZmZWN0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgTmdab25lLFxuICAgIG51bWJlckF0dHJpYnV0ZSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2lnbmFsLFxuICAgIHNpZ25hbCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlLCBGb290ZXIsIEhlYWRlciwgT3ZlcmxheU9wdGlvbnMsIE92ZXJsYXlTZXJ2aWNlLCBQcmltZU5HQ29uZmlnLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUsIFRyYW5zbGF0aW9uS2V5cyB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9vdmVybGF5JztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFNjcm9sbGVyLCBTY3JvbGxlck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvc2Nyb2xsZXInO1xuaW1wb3J0IHsgU2Nyb2xsZXJPcHRpb25zIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XG5pbXBvcnQgeyBPYmplY3RVdGlscywgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7IENoZWNrSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hlY2snO1xuaW1wb3J0IHsgU2VhcmNoSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc2VhcmNoJztcbmltcG9ydCB7IFRpbWVzQ2lyY2xlSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXNjaXJjbGUnO1xuaW1wb3J0IHsgVGltZXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lcyc7XG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25kb3duJztcbmltcG9ydCB7IE51bGxhYmxlIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IEF1dG9Gb2N1c01vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXV0b2ZvY3VzJztcbmltcG9ydCB7IE11bHRpU2VsZWN0UmVtb3ZlRXZlbnQsIE11bHRpU2VsZWN0RmlsdGVyT3B0aW9ucywgTXVsdGlTZWxlY3RGaWx0ZXJFdmVudCwgTXVsdGlTZWxlY3RCbHVyRXZlbnQsIE11bHRpU2VsZWN0Q2hhbmdlRXZlbnQsIE11bHRpU2VsZWN0Rm9jdXNFdmVudCwgTXVsdGlTZWxlY3RMYXp5TG9hZEV2ZW50LCBNdWx0aVNlbGVjdFNlbGVjdEFsbENoYW5nZUV2ZW50IH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTWludXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9taW51cyc7XG5cbmV4cG9ydCBjb25zdCBNVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE11bHRpU2VsZWN0KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW11bHRpU2VsZWN0SXRlbScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGxpXG4gICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgaGVpZ2h0OiBpdGVtU2l6ZSArICdweCcgfVwiXG4gICAgICAgICAgICBjbGFzcz1cInAtbXVsdGlzZWxlY3QtaXRlbVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLW11bHRpc2VsZWN0LWl0ZW0nOiB0cnVlLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkLCAncC1mb2N1cyc6IGZvY3VzZWQgfVwiXG4gICAgICAgICAgICBbaWRdPVwiaWRcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJsYWJlbFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXNldHNpemVdPVwiYXJpYVNldFNpemVcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1wb3NpbnNldF09XCJhcmlhUG9zSW5zZXRcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXAtZm9jdXNlZF09XCJmb2N1c2VkXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcC1oaWdobGlnaHRdPVwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgIChtb3VzZWVudGVyKT1cIm9uT3B0aW9uTW91c2VFbnRlcigkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtY2hlY2tib3ggcC1jb21wb25lbnRcIiBbbmdDbGFzc109XCJ7ICdwLXZhcmlhbnQtZmlsbGVkJzogY29uZmlnLmlucHV0U3R5bGUoKSA9PT0gJ2ZpbGxlZCcgfVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNoZWNrYm94LWJveFwiIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0Jzogc2VsZWN0ZWQgfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0ljb24gKm5nSWY9XCIhY2hlY2tJY29uVGVtcGxhdGUgJiYgIWl0ZW1DaGVja2JveEljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWNoZWNrYm94LWljb24nXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNoZWNrSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWNoZWNrYm94LWljb25cIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2hlY2tJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtQ2hlY2tib3hJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtY2hlY2tib3gtaWNvblwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtQ2hlY2tib3hJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBzZWxlY3RlZCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3sgbGFiZWwgPz8gJ2VtcHR5JyB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IG9wdGlvbiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbGk+XG4gICAgYCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdEl0ZW0ge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBvcHRpb246IGFueTtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzZWxlY3RlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBpdGVtU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGZvY3VzZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBhcmlhUG9zSW5zZXQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFyaWFTZXRTaXplOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGNoZWNrSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgaXRlbUNoZWNrYm94SWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTW91c2VFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnKSB7fVxuXG4gICAgb25PcHRpb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICBvcHRpb246IHRoaXMub3B0aW9uLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWRcbiAgICAgICAgfSk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIG9uT3B0aW9uTW91c2VFbnRlcihldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbk1vdXNlRW50ZXIuZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIG9wdGlvbjogdGhpcy5vcHRpb24sXG4gICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZFxuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIE11bHRpU2VsZWN0IGlzIHVzZWQgdG8gc2VsZWN0IG11bHRpcGxlIGl0ZW1zIGZyb20gYSBjb2xsZWN0aW9uLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW11bHRpU2VsZWN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW2F0dHIuaWRdPVwiaWRcIiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAoY2xpY2spPVwib25Db250YWluZXJDbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiIFthdHRyLmRhdGEtcC1oaWRkZW4tYWNjZXNzaWJsZV09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICNmb2N1c0lucHV0XG4gICAgICAgICAgICAgICAgICAgIFtwVG9vbHRpcF09XCJ0b29sdGlwXCJcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBQb3NpdGlvbl09XCJ0b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICBbcG9zaXRpb25TdHlsZV09XCJ0b29sdGlwUG9zaXRpb25TdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgIFt0b29sdGlwU3R5bGVDbGFzc109XCJ0b29sdGlwU3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cIidsaXN0Ym94J1wiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3ZlcmxheVZpc2libGUgPz8gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cIm92ZXJsYXlWaXNpYmxlID8gaWQgKyAnX2xpc3QnIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIiFkaXNhYmxlZCA/IHRhYmluZGV4IDogLTFcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiZm9jdXNlZCA/IGZvY3VzZWRPcHRpb25JZCA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIHBBdXRvRm9jdXNcbiAgICAgICAgICAgICAgICAgICAgW2F1dG9mb2N1c109XCJhdXRvZm9jdXNcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci52YWx1ZV09XCJsYWJlbCgpIHx8ICdlbXB0eSdcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtbXVsdGlzZWxlY3QtbGFiZWwtY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICBbcFRvb2x0aXBdPVwidG9vbHRpcFwiXG4gICAgICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwibGFiZWxDb250YWluZXJNb3VzZUxlYXZlKClcIlxuICAgICAgICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwiX2Rpc2FibGVUb29sdGlwXCJcbiAgICAgICAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cInRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgW3Bvc2l0aW9uU3R5bGVdPVwidG9vbHRpcFBvc2l0aW9uU3R5bGVcIlxuICAgICAgICAgICAgICAgIFt0b29sdGlwU3R5bGVDbGFzc109XCJ0b29sdGlwU3R5bGVDbGFzc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJsYWJlbENsYXNzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc2VsZWN0ZWRJdGVtc1RlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheSA9PT0gJ2NvbW1hJ1wiPnt7IGxhYmVsKCkgfHwgJ2VtcHR5JyB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc3BsYXkgPT09ICdjaGlwJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgI3Rva2VuICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNoaXBTZWxlY3RlZEl0ZW1zKCk7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtdG9rZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW11bHRpc2VsZWN0LXRva2VuLWxhYmVsXCI+e3sgZ2V0TGFiZWxCeVZhbHVlKGl0ZW0pIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGltZXNDaXJjbGVJY29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhcmVtb3ZlVG9rZW5JY29uVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBpc09wdGlvbkRpc2FibGVkKGl0ZW0pIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZUNsYXNzXT1cIidwLW11bHRpc2VsZWN0LXRva2VuLWljb24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlT3B0aW9uKGl0ZW0sIGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25yZW1vdmVUb2tlbkljb25LZXlEb3duKCRldmVudCwgaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xlYXJpY29uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInJlbW92ZVRva2VuSWNvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbXVsdGlzZWxlY3QtdG9rZW4taWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZU9wdGlvbihpdGVtLCBldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9ucmVtb3ZlVG9rZW5JY29uS2V5RG93bigkZXZlbnQsIGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NsZWFyaWNvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyZW1vdmVUb2tlbkljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW1vZGVsVmFsdWUoKSB8fCBtb2RlbFZhbHVlKCkubGVuZ3RoID09PSAwXCI+e3sgcGxhY2Vob2xkZXIoKSB8fCBkZWZhdWx0TGFiZWwgfHwgJ2VtcHR5JyB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2VsZWN0ZWRJdGVtc1RlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogc2VsZWN0ZWRPcHRpb25zLCByZW1vdmVDaGlwOiByZW1vdmVPcHRpb24uYmluZCh0aGlzKSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVmlzaWJsZUNsZWFySWNvblwiPlxuICAgICAgICAgICAgICAgICAgICA8VGltZXNJY29uICpuZ0lmPVwiIWNsZWFySWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtbXVsdGlzZWxlY3QtY2xlYXItaWNvbidcIiAoY2xpY2spPVwiY2xlYXIoJGV2ZW50KVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xlYXJpY29uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNsZWFySWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLW11bHRpc2VsZWN0LWNsZWFyLWljb25cIiAoY2xpY2spPVwiY2xlYXIoJGV2ZW50KVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xlYXJpY29uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNsZWFySWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tdWx0aXNlbGVjdC10cmlnZ2VyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxvYWRpbmc7IGVsc2UgZWxzZUJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibG9hZGluZ0ljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFsb2FkaW5nSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImxvYWRpbmdJY29uXCIgW25nQ2xhc3NdPVwiJ3AtbXVsdGlzZWxlY3QtdHJpZ2dlci1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhbG9hZGluZ0ljb25cIiBbY2xhc3NdPVwiJ3AtbXVsdGlzZWxlY3QtdHJpZ2dlci1pY29uIHBpIHBpLXNwaW5uZXIgcGktc3BpbidcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWRyb3Bkb3duSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImRyb3Bkb3duSWNvblwiIGNsYXNzPVwicC1tdWx0aXNlbGVjdC10cmlnZ2VyLWljb25cIiBbbmdDbGFzc109XCJkcm9wZG93bkljb25cIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RyaWdnZXJpY29uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkRvd25JY29uICpuZ0lmPVwiIWRyb3Bkb3duSWNvblwiIFtzdHlsZUNsYXNzXT1cIidwLW11bHRpc2VsZWN0LXRyaWdnZXItaWNvbidcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RyaWdnZXJpY29uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJkcm9wZG93bkljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1tdWx0aXNlbGVjdC10cmlnZ2VyLWljb25cIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RyaWdnZXJpY29uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImRyb3Bkb3duSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwLW92ZXJsYXlcbiAgICAgICAgICAgICAgICAjb3ZlcmxheVxuICAgICAgICAgICAgICAgIFsodmlzaWJsZSldPVwib3ZlcmxheVZpc2libGVcIlxuICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cIm92ZXJsYXlPcHRpb25zXCJcbiAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cIidAcGFyZW50J1wiXG4gICAgICAgICAgICAgICAgW2FwcGVuZFRvXT1cImFwcGVuZFRvXCJcbiAgICAgICAgICAgICAgICBbYXV0b1pJbmRleF09XCJhdXRvWkluZGV4XCJcbiAgICAgICAgICAgICAgICBbYmFzZVpJbmRleF09XCJiYXNlWkluZGV4XCJcbiAgICAgICAgICAgICAgICBbc2hvd1RyYW5zaXRpb25PcHRpb25zXT1cInNob3dUcmFuc2l0aW9uT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgW2hpZGVUcmFuc2l0aW9uT3B0aW9uc109XCJoaWRlVHJhbnNpdGlvbk9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIChvbkFuaW1hdGlvblN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxuICAgICAgICAgICAgICAgIChvbkhpZGUpPVwiaGlkZSgpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFthdHRyLmlkXT1cImlkICsgJ19saXN0J1wiIFtuZ0NsYXNzXT1cIidwLW11bHRpc2VsZWN0LXBhbmVsIHAtY29tcG9uZW50J1wiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIiBbY2xhc3NdPVwicGFuZWxTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICNmaXJzdEhpZGRlbkZvY3VzYWJsZUVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWhpZGRlbi1hY2Nlc3NpYmxlIHAtaGlkZGVuLWZvY3VzYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRmlyc3RIaWRkZW5Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtaGlkZGVuLWFjY2Vzc2libGVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZGRlbi1mb2N1c2FibGVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tdWx0aXNlbGVjdC1oZWFkZXJcIiAqbmdJZj1cInNob3dIZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZmlsdGVyVGVtcGxhdGU7IGVsc2UgYnVpbHRJbkZpbHRlckVsZW1lbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZpbHRlclRlbXBsYXRlOyBjb250ZXh0OiB7IG9wdGlvbnM6IGZpbHRlck9wdGlvbnMgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnVpbHRJbkZpbHRlckVsZW1lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1jaGVja2JveCBwLWNvbXBvbmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzU2VsZWN0aW9uQWxsRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXZhcmlhbnQtZmlsbGVkJzogdmFyaWFudCA9PT0gJ2ZpbGxlZCcgfHwgY29uZmlnLmlucHV0U3R5bGUoKSA9PT0gJ2ZpbGxlZCcsICdwLWNoZWNrYm94LWRpc2FibGVkJzogZGlzYWJsZWQgfHwgdG9nZ2xlQWxsRGlzYWJsZWQgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25Ub2dnbGVBbGwoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkhlYWRlckNoZWNrYm94S2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIiBbYXR0ci5kYXRhLXAtaGlkZGVuLWFjY2Vzc2libGVdPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjaGVhZGVyQ2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuY2hlY2tlZF09XCJhbGxTZWxlY3RlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSGVhZGVyQ2hlY2tib3hGb2N1cygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25IZWFkZXJDaGVja2JveEJsdXIoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCB0b2dnbGVBbGxEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwidG9nZ2xlQWxsQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWNoZWNrYm94LWJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInRvZ2dsZUFsbEFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jaGVja2VkXT1cImFsbFNlbGVjdGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0JzogYWxsU2VsZWN0ZWQoKSwgJ3AtZm9jdXMnOiBoZWFkZXJDaGVja2JveEZvY3VzLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIHx8IHRvZ2dsZUFsbERpc2FibGVkIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhbGxTZWxlY3RlZCgpIHx8IHBhcnRpYWxTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY2hlY2tJY29uVGVtcGxhdGUgJiYgIWhlYWRlckNoZWNrYm94SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tJY29uIFtzdHlsZUNsYXNzXT1cIidwLWNoZWNrYm94LWljb24nXCIgKm5nSWY9XCJhbGxTZWxlY3RlZCgpXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2hlY2tJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtY2hlY2tib3gtaWNvblwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNoZWNrSWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogYWxsU2VsZWN0ZWQoKSB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImhlYWRlckNoZWNrYm94SWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWNoZWNrYm94LWljb25cIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJDaGVja2JveEljb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGFsbFNlbGVjdGVkKCksIHBhcnRpYWxTZWxlY3RlZDogcGFydGlhbFNlbGVjdGVkKCkgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjZmlsdGVySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInNlYXJjaGJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2VIb2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJzZWFyY2hib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtb3duc109XCJpZCArICdfbGlzdCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJmb2N1c2VkT3B0aW9uSWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJfZmlsdGVyVmFsdWUoKSB8fCAnJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uRmlsdGVySW5wdXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25GaWx0ZXJLZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbklucHV0Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25GaWx0ZXJCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1maWx0ZXIgcC1pbnB1dHRleHQgcC1jb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2VIb2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUZpbHRlckxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VhcmNoSWNvbiBbc3R5bGVDbGFzc109XCIncC1tdWx0aXNlbGVjdC1maWx0ZXItaWNvbidcIiAqbmdJZj1cIiFmaWx0ZXJJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJmaWx0ZXJJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtZmlsdGVyLWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmaWx0ZXJJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1jbG9zZSBwLWxpbmsgcC1idXR0b24taWNvbi1vbmx5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjbG9zZSgkZXZlbnQpXCIgcFJpcHBsZSBbYXR0ci5hcmlhLWxhYmVsXT1cImNsb3NlQXJpYUxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGltZXNJY29uIFtzdHlsZUNsYXNzXT1cIidwLW11bHRpc2VsZWN0LWNsb3NlLWljb24nXCIgKm5nSWY9XCIhY2xvc2VJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjbG9zZUljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1jbG9zZS1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xvc2VJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tdWx0aXNlbGVjdC1pdGVtcy13cmFwcGVyXCIgW25nU3R5bGVdPVwieyAnbWF4LWhlaWdodCc6IHZpcnR1YWxTY3JvbGwgPyAnYXV0bycgOiBzY3JvbGxIZWlnaHQgfHwgJ2F1dG8nIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC1zY3JvbGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInZpcnR1YWxTY3JvbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjc2Nyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1zXT1cInZpc2libGVPcHRpb25zKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwieyBoZWlnaHQ6IHNjcm9sbEhlaWdodCB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1TaXplXT1cInZpcnR1YWxTY3JvbGxJdGVtU2l6ZSB8fCBfaXRlbVNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXV0b1NpemVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXp5XT1cImxhenlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25MYXp5TG9hZCk9XCJvbkxhenlMb2FkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cInZpcnR1YWxTY3JvbGxPcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJjb250ZW50XCIgbGV0LWl0ZW1zIGxldC1zY3JvbGxlck9wdGlvbnM9XCJvcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYnVpbGRJbkl0ZW1zOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbXMsIG9wdGlvbnM6IHNjcm9sbGVyT3B0aW9ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImxvYWRlclwiIGxldC1zY3JvbGxlck9wdGlvbnM9XCJvcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxvYWRlclRlbXBsYXRlOyBjb250ZXh0OiB7IG9wdGlvbnM6IHNjcm9sbGVyT3B0aW9ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Atc2Nyb2xsZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF2aXJ0dWFsU2Nyb2xsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJidWlsZEluSXRlbXM7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB2aXNpYmxlT3B0aW9ucygpLCBvcHRpb25zOiB7fSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWxkSW5JdGVtcyBsZXQtaXRlbXMgbGV0LXNjcm9sbGVyT3B0aW9ucz1cIm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsICNpdGVtcyBjbGFzcz1cInAtbXVsdGlzZWxlY3QtaXRlbXMgcC1jb21wb25lbnRcIiBbbmdDbGFzc109XCJzY3JvbGxlck9wdGlvbnMuY29udGVudFN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzY3JvbGxlck9wdGlvbnMuY29udGVudFN0eWxlXCIgcm9sZT1cImxpc3Rib3hcIiBhcmlhLW11bHRpc2VsZWN0YWJsZT1cInRydWVcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImxpc3RMYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1vcHRpb24gW25nRm9yT2ZdPVwiaXRlbXNcIiBsZXQtaT1cImluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzT3B0aW9uR3JvdXAob3B0aW9uKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgW2F0dHIuaWRdPVwiaWQgKyAnXycgKyBnZXRPcHRpb25JbmRleChpLCBzY3JvbGxlck9wdGlvbnMpXCIgY2xhc3M9XCJwLW11bHRpc2VsZWN0LWl0ZW0tZ3JvdXBcIiBbbmdTdHlsZV09XCJ7IGhlaWdodDogc2Nyb2xsZXJPcHRpb25zLml0ZW1TaXplICsgJ3B4JyB9XCIgcm9sZT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZ3JvdXBUZW1wbGF0ZVwiPnt7IGdldE9wdGlvbkdyb3VwTGFiZWwob3B0aW9uLm9wdGlvbkdyb3VwKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogb3B0aW9uLm9wdGlvbkdyb3VwIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzT3B0aW9uR3JvdXAob3B0aW9uKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC1tdWx0aVNlbGVjdEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJpZCArICdfJyArIGdldE9wdGlvbkluZGV4KGksIHNjcm9sbGVyT3B0aW9ucylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW29wdGlvbl09XCJvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NlbGVjdGVkXT1cImlzU2VsZWN0ZWQob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGFiZWxdPVwiZ2V0T3B0aW9uTGFiZWwob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNPcHRpb25EaXNhYmxlZChvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0ZW1wbGF0ZV09XCJpdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NoZWNrSWNvblRlbXBsYXRlXT1cImNoZWNrSWNvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpdGVtQ2hlY2tib3hJY29uVGVtcGxhdGVdPVwiaXRlbUNoZWNrYm94SWNvblRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpdGVtU2l6ZV09XCJzY3JvbGxlck9wdGlvbnMuaXRlbVNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZvY3VzZWRdPVwiZm9jdXNlZE9wdGlvbkluZGV4KCkgPT09IGdldE9wdGlvbkluZGV4KGksIHNjcm9sbGVyT3B0aW9ucylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2FyaWFQb3NJbnNldF09XCJnZXRBcmlhUG9zSW5zZXQoZ2V0T3B0aW9uSW5kZXgoaSwgc2Nyb2xsZXJPcHRpb25zKSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2FyaWFTZXRTaXplXT1cImFyaWFTZXRTaXplXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbkNsaWNrKT1cIm9uT3B0aW9uU2VsZWN0KCRldmVudCwgZmFsc2UsIGdldE9wdGlvbkluZGV4KGksIHNjcm9sbGVyT3B0aW9ucykpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbk1vdXNlRW50ZXIpPVwib25PcHRpb25Nb3VzZUVudGVyKCRldmVudCwgZ2V0T3B0aW9uSW5kZXgoaSwgc2Nyb2xsZXJPcHRpb25zKSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9wLW11bHRpU2VsZWN0SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cImhhc0ZpbHRlcigpICYmIGlzRW1wdHkoKVwiIGNsYXNzPVwicC1tdWx0aXNlbGVjdC1lbXB0eS1tZXNzYWdlXCIgW25nU3R5bGVdPVwieyBoZWlnaHQ6IHNjcm9sbGVyT3B0aW9ucy5pdGVtU2l6ZSArICdweCcgfVwiIHJvbGU9XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWVtcHR5RmlsdGVyVGVtcGxhdGUgJiYgIWVtcHR5VGVtcGxhdGU7IGVsc2UgZW1wdHlGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZW1wdHlGaWx0ZXJNZXNzYWdlTGFiZWwgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICNlbXB0eUZpbHRlciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5RmlsdGVyVGVtcGxhdGUgfHwgZW1wdHlUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFoYXNGaWx0ZXIoKSAmJiBpc0VtcHR5KClcIiBjbGFzcz1cInAtbXVsdGlzZWxlY3QtZW1wdHktbWVzc2FnZVwiIFtuZ1N0eWxlXT1cInsgaGVpZ2h0OiBzY3JvbGxlck9wdGlvbnMuaXRlbVNpemUgKyAncHgnIH1cIiByb2xlPVwib3B0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFlbXB0eVRlbXBsYXRlOyBlbHNlIGVtcHR5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGVtcHR5TWVzc2FnZUxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAjZW1wdHkgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW11bHRpc2VsZWN0LWZvb3RlclwiICpuZ0lmPVwiZm9vdGVyRmFjZXQgfHwgZm9vdGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICNsYXN0SGlkZGVuRm9jdXNhYmxlRWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGUgcC1oaWRkZW4tZm9jdXNhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25MYXN0SGlkZGVuRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZGRlbi1hY2Nlc3NpYmxlXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1oaWRkZW4tZm9jdXNhYmxlXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcC1vdmVybGF5PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQgcC1pbnB1dHdyYXBwZXInLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1c2VkIHx8IG92ZXJsYXlWaXNpYmxlJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW01VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL211bHRpc2VsZWN0LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgLyoqXG4gICAgICogVW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGNvbXBvbmVudFxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgaW5wdXQgZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIG92ZXJsYXkgcGFuZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZTogYW55O1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBvdmVybGF5IHBhbmVsIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBvZiB0aGUgZm9jdXMgaW5wdXQgdG8gbWF0Y2ggYSBsYWJlbCBkZWZpbmVkIGZvciB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBlbGVtZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgY29tcG9uZW50IGNhbm5vdCBiZSBlZGl0ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHJlYWRvbmx5OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSBvcHRpb25zIGFzIGdyb3VwZWQgd2hlbiBuZXN0ZWQgb3B0aW9ucyBhcmUgcHJvdmlkZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGdyb3VwOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gc3BlY2lmaWVkLCBkaXNwbGF5cyBhbiBpbnB1dCBmaWVsZCB0byBmaWx0ZXIgdGhlIGl0ZW1zIG9uIGtleXVwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBmaWx0ZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgcGxhY2Vob2xkZXIgb2YgdGhlIGZpbHRlciBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJQbGFjZUhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIExvY2FsZSB0byB1c2UgaW4gZmlsdGVyaW5nLiBUaGUgZGVmYXVsdCBsb2NhbGUgaXMgdGhlIGhvc3QgZW52aXJvbm1lbnQncyBjdXJyZW50IGxvY2FsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG9wdGlvbnMgcGFuZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIG92ZXJsYXlWaXNpYmxlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRhYmJpbmcgb3JkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCA9IDA7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSBpbnB1dCB2YXJpYW50IG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmFyaWFudDogJ2ZpbGxlZCcgfCAnb3V0bGluZWQnID0gJ291dGxpbmVkJztcbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIG92ZXJsYXksIHZhbGlkIHZhbHVlcyBhcmUgXCJib2R5XCIgb3IgYSBsb2NhbCBuZy10ZW1wbGF0ZSB2YXJpYWJsZSBvZiBhbm90aGVyIGVsZW1lbnQgKG5vdGU6IHVzZSBiaW5kaW5nIHdpdGggYnJhY2tldHMgZm9yIHRlbXBsYXRlIHZhcmlhYmxlcywgZS5nLiBbYXBwZW5kVG9dPVwibXlkaXZcIiBmb3IgYSBkaXYgZWxlbWVudCBoYXZpbmcgI215ZGl2IGFzIHZhcmlhYmxlIG5hbWUpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB8IGFueTtcbiAgICAvKipcbiAgICAgKiBBIHByb3BlcnR5IHRvIHVuaXF1ZWx5IGlkZW50aWZ5IGEgdmFsdWUgaW4gb3B0aW9ucy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkYXRhS2V5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRXN0YWJsaXNoZXMgcmVsYXRpb25zaGlwcyBiZXR3ZWVuIHRoZSBjb21wb25lbnQgYW5kIGxhYmVsKHMpIHdoZXJlIGl0cyB2YWx1ZSBzaG91bGQgYmUgb25lIG9yIG1vcmUgZWxlbWVudCBJRHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgbGFiZWxzIG9mIHNlbGVjdGVkIGl0ZW0gbGFiZWxzIG9yIHVzZSBkZWZhdWx0IGxhYmVsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZWZhdWx0VmFsdWUgdHJ1ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNldCBkaXNwbGF5U2VsZWN0ZWRMYWJlbCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzcGxheVNlbGVjdGVkTGFiZWwgPSB2YWw7XG4gICAgfVxuICAgIGdldCBkaXNwbGF5U2VsZWN0ZWRMYWJlbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXlTZWxlY3RlZExhYmVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNpZGVzIGhvdyBtYW55IHNlbGVjdGVkIGl0ZW0gbGFiZWxzIHRvIHNob3cgYXQgbW9zdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVmYXVsdFZhbHVlIDNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZXQgbWF4U2VsZWN0ZWRMYWJlbHModmFsOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX21heFNlbGVjdGVkTGFiZWxzID0gdmFsO1xuICAgIH1cbiAgICBnZXQgbWF4U2VsZWN0ZWRMYWJlbHMoKTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhTZWxlY3RlZExhYmVscztcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjaWRlcyBob3cgbWFueSBzZWxlY3RlZCBpdGVtIGxhYmVscyB0byBzaG93IGF0IG1vc3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiAodmFsdWU6IHVua25vd24pID0+IG51bWJlckF0dHJpYnV0ZSh2YWx1ZSwgbnVsbCkgfSkgc2VsZWN0aW9uTGltaXQ6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTGFiZWwgdG8gZGlzcGxheSBhZnRlciBleGNlZWRpbmcgbWF4IHNlbGVjdGVkIGxhYmVscyBlLmcuICh7MH0gaXRlbXMgc2VsZWN0ZWQpLCBkZWZhdWx0cyBcImVsbGlwc2lzXCIga2V5d29yZCB0byBpbmRpY2F0ZSBhIHRleHQtb3ZlcmZsb3cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2VsZWN0ZWRJdGVtc0xhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBjaGVja2JveCBhdCBoZWFkZXIgdG8gdG9nZ2xlIGFsbCBpdGVtcyBhdCBvbmNlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93VG9nZ2xlQWxsOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBUZXh0IHRvIGRpc3BsYXkgd2hlbiBmaWx0ZXJpbmcgZG9lcyBub3QgcmV0dXJuIGFueSByZXN1bHRzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGVtcHR5RmlsdGVyTWVzc2FnZTogc3RyaW5nID0gJyc7XG4gICAgLyoqXG4gICAgICogVGV4dCB0byBkaXNwbGF5IHdoZW4gdGhlcmUgaXMgbm8gZGF0YS4gRGVmYXVsdHMgdG8gZ2xvYmFsIHZhbHVlIGluIGkxOG4gdHJhbnNsYXRpb24gY29uZmlndXJhdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBlbXB0eU1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZmlsdGVyIHZhbHVlIHdoZW4gaGlkaW5nIHRoZSBkcm9wZG93bi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcmVzZXRGaWx0ZXJPbkhpZGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJY29uIGNsYXNzIG9mIHRoZSBkcm9wZG93biBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyb3Bkb3duSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGxhYmVsIGZpZWxkIG9mIGFuIG9wdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvcHRpb25MYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIHZhbHVlIGZpZWxkIG9mIGFuIG9wdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvcHRpb25WYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGRpc2FibGVkIGZpZWxkIG9mIGFuIG9wdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvcHRpb25EaXNhYmxlZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGxhYmVsIGZpZWxkIG9mIGFuIG9wdGlvbiBncm91cC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvcHRpb25Hcm91cExhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnbGFiZWwnO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIG9wdGlvbnMgZmllbGQgb2YgYW4gb3B0aW9uIGdyb3VwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9wdGlvbkdyb3VwQ2hpbGRyZW46IHN0cmluZyA9ICdpdGVtcyc7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBoZWFkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZmlsdGVyaW5nIGlzIGVuYWJsZWQsIGZpbHRlckJ5IGRlY2lkZXMgd2hpY2ggZmllbGQgb3IgZmllbGRzIChjb21tYSBzZXBhcmF0ZWQpIHRvIHNlYXJjaCBhZ2FpbnN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlckJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiBwaXhlbHMsIGEgc2Nyb2xsYmFyIGlzIGRlZmluZWQgaWYgaGVpZ2h0IG9mIGxpc3QgZXhjZWVkcyB0aGlzIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNjcm9sbEhlaWdodDogc3RyaW5nID0gJzIwMHB4JztcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIGRhdGEgaXMgbG9hZGVkIGFuZCBpbnRlcmFjdGVkIHdpdGggaW4gbGF6eSBtYW5uZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGxhenk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBkYXRhIHNob3VsZCBiZSBsb2FkZWQgb24gZGVtYW5kIGR1cmluZyBzY3JvbGwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHZpcnR1YWxTY3JvbGw6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgbXVsdGlzZWxlY3QgaXMgaW4gbG9hZGluZyBzdGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgbG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiBhbiBpdGVtIGluIHRoZSBsaXN0IGZvciBWaXJ0dWFsU2Nyb2xsaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEljb24gdG8gZGlzcGxheSBpbiBsb2FkaW5nIHN0YXRlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxvYWRpbmdJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgdGhlIHNjcm9sbGVyIGZlYXR1cmUuIFRoZSBwcm9wZXJ0aWVzIG9mIHNjcm9sbGVyIGNvbXBvbmVudCBjYW4gYmUgdXNlZCBsaWtlIGFuIG9iamVjdCBpbiBpdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB2aXJ0dWFsU2Nyb2xsT3B0aW9uczogU2Nyb2xsZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIG92ZXJsYXkgQVBJIGZlYXR1cmUuIFRoZSBwcm9wZXJ0aWVzIG9mIG92ZXJsYXkgQVBJIGNhbiBiZSB1c2VkIGxpa2UgYW4gb2JqZWN0IGluIGl0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG92ZXJsYXlPcHRpb25zOiBPdmVybGF5T3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBmaWx0ZXIgaW5wdXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUZpbHRlckxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBob3cgdGhlIGl0ZW1zIGFyZSBmaWx0ZXJlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJNYXRjaE1vZGU6ICdjb250YWlucycgfCAnc3RhcnRzV2l0aCcgfCAnZW5kc1dpdGgnIHwgJ2VxdWFscycgfCAnbm90RXF1YWxzJyB8ICdpbicgfCAnbHQnIHwgJ2x0ZScgfCAnZ3QnIHwgJ2d0ZScgPSAnY29udGFpbnMnO1xuICAgIC8qKlxuICAgICAqIEFkdmlzb3J5IGluZm9ybWF0aW9uIHRvIGRpc3BsYXkgaW4gYSB0b29sdGlwIG9uIGhvdmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXA6IHN0cmluZyA9ICcnO1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSB0b29sdGlwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBQb3NpdGlvbjogJ3RvcCcgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgPSAncmlnaHQnO1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgQ1NTIHBvc2l0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBQb3NpdGlvblN0eWxlOiBzdHJpbmcgPSAnYWJzb2x1dGUnO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSB0b29sdGlwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQXBwbGllcyBmb2N1cyB0byB0aGUgZmlsdGVyIGVsZW1lbnQgd2hlbiB0aGUgb3ZlcmxheSBpcyBzaG93bi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b2ZvY3VzRmlsdGVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGhvdyB0aGUgc2VsZWN0ZWQgaXRlbXMgYXJlIGRpc3BsYXllZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkaXNwbGF5OiBzdHJpbmcgfCAnY29tbWEnIHwgJ2NoaXAnID0gJ2NvbW1hJztcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBhdXRvY29tcGxldGUgaXMgYWN0aXZlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9jb21wbGV0ZTogc3RyaW5nID0gJ29mZic7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBhIGNsZWFyIGljb24gaXMgZGlzcGxheWVkIHRvIGNsZWFyIHRoZSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd0NsZWFyOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgY29tcG9uZW50IHNob3VsZCBhdXRvbWF0aWNhbGx5IGdldCBmb2N1cyBvbiBsb2FkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhdXRvZm9jdXM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjE0LjIuMCwgdXNlIG92ZXJsYXlPcHRpb25zIHByb3BlcnR5IGluc3RlYWQuXG4gICAgICogV2hldGhlciB0byBhdXRvbWF0aWNhbGx5IG1hbmFnZSBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgYXV0b1pJbmRleCgpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9aSW5kZXg7XG4gICAgfVxuICAgIHNldCBhdXRvWkluZGV4KHZhbDogYm9vbGVhbiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9hdXRvWkluZGV4ID0gdmFsO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBhdXRvWkluZGV4IHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQgc2luY2UgdjE0LjIuMCwgdXNlIG92ZXJsYXlPcHRpb25zIHByb3BlcnR5IGluc3RlYWQuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqIEJhc2UgekluZGV4IHZhbHVlIHRvIHVzZSBpbiBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgYmFzZVpJbmRleCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmFzZVpJbmRleDtcbiAgICB9XG4gICAgc2V0IGJhc2VaSW5kZXgodmFsOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fYmFzZVpJbmRleCA9IHZhbDtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgYmFzZVpJbmRleCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIHNob3cgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzaG93VHJhbnNpdGlvbk9wdGlvbnMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dUcmFuc2l0aW9uT3B0aW9ucztcbiAgICB9XG4gICAgc2V0IHNob3dUcmFuc2l0aW9uT3B0aW9ucyh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zaG93VHJhbnNpdGlvbk9wdGlvbnMgPSB2YWw7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIHNob3dUcmFuc2l0aW9uT3B0aW9ucyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIGhpZGUgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBoaWRlVHJhbnNpdGlvbk9wdGlvbnMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpZGVUcmFuc2l0aW9uT3B0aW9ucztcbiAgICB9XG4gICAgc2V0IGhpZGVUcmFuc2l0aW9uT3B0aW9ucyh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9oaWRlVHJhbnNpdGlvbk9wdGlvbnMgPSB2YWw7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIGhpZGVUcmFuc2l0aW9uT3B0aW9ucyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMYWJlbCB0byBkaXNwbGF5IHdoZW4gdGhlcmUgYXJlIG5vIHNlbGVjdGlvbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHBsYWNlaG9sZGVyIGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KCkgc2V0IGRlZmF1bHRMYWJlbCh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9kZWZhdWx0TGFiZWwgPSB2YWw7XG4gICAgICAgIGNvbnNvbGUud2FybignZGVmYXVsdExhYmVsIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQgc2luY2UgMTYuNi4wLCB1c2UgcGxhY2Vob2xkZXIgaW5zdGVhZCcpO1xuICAgIH1cbiAgICBnZXQgZGVmYXVsdExhYmVsKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0TGFiZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExhYmVsIHRvIGRpc3BsYXkgd2hlbiB0aGVyZSBhcmUgbm8gc2VsZWN0aW9ucy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZXQgcGxhY2Vob2xkZXIodmFsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIuc2V0KHZhbCk7XG4gICAgfVxuICAgIGdldCBwbGFjZWhvbGRlcigpOiBTaWduYWw8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlci5hc1JlYWRvbmx5KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgdG8gZGlzcGxheSBhcyB0aGUgYXZhaWxhYmxlIG9wdGlvbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG9wdGlvbnMoKTogYW55W10gfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucygpO1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG4gICAgc2V0IG9wdGlvbnModmFsOiBhbnlbXSB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIU9iamVjdFV0aWxzLmRlZXBFcXVhbHModGhpcy5fb3B0aW9ucygpLCB2YWwpKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNldCh2YWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZW4gc3BlY2lmaWVkLCBmaWx0ZXIgZGlzcGxheXMgd2l0aCB0aGlzIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBmaWx0ZXJWYWx1ZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclZhbHVlKCk7XG4gICAgfVxuICAgIHNldCBmaWx0ZXJWYWx1ZSh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fZmlsdGVyVmFsdWUuc2V0KHZhbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEl0ZW0gc2l6ZSBvZiBpdGVtIHRvIGJlIHZpcnR1YWwgc2Nyb2xsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZSBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBpdGVtU2l6ZSgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbVNpemU7XG4gICAgfVxuICAgIHNldCBpdGVtU2l6ZSh2YWw6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9pdGVtU2l6ZSA9IHZhbDtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgaXRlbVNpemUgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCwgdXNlIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZSBwcm9wZXJ0eSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGFsbCBkYXRhIGlzIHNlbGVjdGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzZWxlY3RBbGwoKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0QWxsO1xuICAgIH1cbiAgICBzZXQgc2VsZWN0QWxsKHZhbHVlOiBib29sZWFuIHwgdW5kZWZpbmVkIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9zZWxlY3RBbGwgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdG8gZm9jdXMgb24gb3B0aW9ucyB3aGVuIGhvdmVyaW5nIG92ZXIgdGhlbSwgZGVmYXVsdHMgdG8gb3B0aW9uTGFiZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGZvY3VzT25Ib3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEZpZWxkcyB1c2VkIHdoZW4gZmlsdGVyaW5nIHRoZSBvcHRpb25zLCBkZWZhdWx0cyB0byBvcHRpb25MYWJlbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJGaWVsZHM6IGFueVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIG9wdGlvbiB3aWxsIGJlIHNlbGVjdGVkIG9uIGZvY3VzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzZWxlY3RPbkZvY3VzOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBmb2N1cyBvbiB0aGUgZmlyc3QgdmlzaWJsZSBvciBzZWxlY3RlZCBlbGVtZW50IHdoZW4gdGhlIG92ZXJsYXkgcGFuZWwgaXMgc2hvd24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGF1dG9PcHRpb25Gb2N1czogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdmFsdWUgY2hhbmdlcy5cbiAgICAgKiBAcGFyYW0ge011bHRpU2VsZWN0Q2hhbmdlRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIGNoYW5nZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdENoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlTZWxlY3RDaGFuZ2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkYXRhIGlzIGZpbHRlcmVkLlxuICAgICAqIEBwYXJhbSB7TXVsdGlTZWxlY3RGaWx0ZXJFdmVudH0gZXZlbnQgLSBDdXN0b20gZmlsdGVyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkZpbHRlcjogRXZlbnRFbWl0dGVyPE11bHRpU2VsZWN0RmlsdGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdEZpbHRlckV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIG11bHRpc2VsZWN0IHJlY2VpdmVzIGZvY3VzLlxuICAgICAqIEBwYXJhbSB7TXVsdGlTZWxlY3RGb2N1c0V2ZW50fSBldmVudCAtIEN1c3RvbSBmb2N1cyBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPE11bHRpU2VsZWN0Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpU2VsZWN0Rm9jdXNFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBtdWx0aXNlbGVjdCBsb3NlcyBmb2N1cy5cbiAgICAgKiBAcGFyYW0ge011bHRpU2VsZWN0Qmx1ckV2ZW50fSBldmVudCAtIEN1c3RvbSBibHVyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdEJsdXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpU2VsZWN0Qmx1ckV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGNvbXBvbmVudCBpcyBjbGlja2VkLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaW5wdXQgZmllbGQgaXMgY2xlYXJlZC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGVhcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIG92ZXJsYXkgcGFuZWwgYmVjb21lcyB2aXNpYmxlLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblBhbmVsU2hvdzogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIG92ZXJsYXkgcGFuZWwgYmVjb21lcyBoaWRkZW4uXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUGFuZWxIaWRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGluIGxhenkgbW9kZSB0byBsb2FkIG5ldyBkYXRhLlxuICAgICAqIEBwYXJhbSB7TXVsdGlTZWxlY3RMYXp5TG9hZEV2ZW50fSBldmVudCAtIExhenkgbG9hZCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25MYXp5TG9hZDogRXZlbnRFbWl0dGVyPE11bHRpU2VsZWN0TGF6eUxvYWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpU2VsZWN0TGF6eUxvYWRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2UgaW4gbGF6eSBtb2RlIHRvIGxvYWQgbmV3IGRhdGEuXG4gICAgICogQHBhcmFtIHtNdWx0aVNlbGVjdFJlbW92ZUV2ZW50fSBldmVudCAtIFJlbW92ZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25SZW1vdmU6IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdFJlbW92ZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlTZWxlY3RSZW1vdmVFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbGwgZGF0YSBpcyBzZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0ge011bHRpU2VsZWN0U2VsZWN0QWxsQ2hhbmdlRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHNlbGVjdCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25TZWxlY3RBbGxDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNdWx0aVNlbGVjdFNlbGVjdEFsbENoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlTZWxlY3RTZWxlY3RBbGxDaGFuZ2VFdmVudD4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdvdmVybGF5Jykgb3ZlcmxheVZpZXdDaGlsZDogTnVsbGFibGU8T3ZlcmxheT47XG5cbiAgICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcpIGZpbHRlcklucHV0Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnZm9jdXNJbnB1dCcpIGZvY3VzSW5wdXRWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnaXRlbXMnKSBpdGVtc1ZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxlcicpIHNjcm9sbGVyOiBOdWxsYWJsZTxTY3JvbGxlcj47XG5cbiAgICBAVmlld0NoaWxkKCdsYXN0SGlkZGVuRm9jdXNhYmxlRWwnKSBsYXN0SGlkZGVuRm9jdXNhYmxlRWxlbWVudE9uT3ZlcmxheTogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdmaXJzdEhpZGRlbkZvY3VzYWJsZUVsJykgZmlyc3RIaWRkZW5Gb2N1c2FibGVFbGVtZW50T25PdmVybGF5OiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2hlYWRlckNoZWNrYm94JykgaGVhZGVyQ2hlY2tib3hWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIpIGZvb3RlckZhY2V0OiBhbnk7XG5cbiAgICBAQ29udGVudENoaWxkKEhlYWRlcikgaGVhZGVyRmFjZXQ6IGFueTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBOdWxsYWJsZTxRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4+O1xuXG4gICAgc2VhcmNoVmFsdWU6IE51bGxhYmxlPHN0cmluZz47XG5cbiAgICBzZWFyY2hUaW1lb3V0OiBhbnk7XG5cbiAgICBfc2VsZWN0QWxsOiBib29sZWFuIHwgdW5kZWZpbmVkIHwgbnVsbCA9IG51bGw7XG5cbiAgICBfYXV0b1pJbmRleDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIF9iYXNlWkluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBfc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBfaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBfZGVmYXVsdExhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBfcGxhY2Vob2xkZXIgPSBzaWduYWw8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG4gICAgX2l0ZW1TaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBfc2VsZWN0aW9uTGltaXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIF9kaXNhYmxlVG9vbHRpcCA9IGZhbHNlO1xuXG4gICAgdmFsdWU6IGFueVtdO1xuXG4gICAgcHVibGljIF9maWx0ZXJlZE9wdGlvbnM6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHB1YmxpYyBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgcHVibGljIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgcHVibGljIHZhbHVlc0FzU3RyaW5nOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgZm9jdXM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgZmlsdGVyZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIGdyb3VwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgbG9hZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgZmlsdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgZW1wdHlGaWx0ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBlbXB0eVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIHNlbGVjdGVkSXRlbXNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGNoZWNrSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgbG9hZGluZ0ljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGZpbHRlckljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHJlbW92ZVRva2VuSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgY2xvc2VJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBjbGVhckljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGRyb3Bkb3duSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaXRlbUNoZWNrYm94SWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaGVhZGVyQ2hlY2tib3hJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgaGVhZGVyQ2hlY2tib3hGb2N1czogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGZpbHRlck9wdGlvbnM6IE11bHRpU2VsZWN0RmlsdGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcblxuICAgIHByZXZlbnRNb2RlbFRvdWNoZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBwcmV2ZW50RG9jdW1lbnREZWZhdWx0OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaXRlbXNXcmFwcGVyOiBhbnk7XG5cbiAgICBfZGlzcGxheVNlbGVjdGVkTGFiZWw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgX21heFNlbGVjdGVkTGFiZWxzOiBudW1iZXIgPSAzO1xuXG4gICAgbW9kZWxWYWx1ZSA9IHNpZ25hbDxhbnk+KG51bGwpO1xuXG4gICAgX2ZpbHRlclZhbHVlID0gc2lnbmFsPGFueT4obnVsbCk7XG5cbiAgICBfb3B0aW9ucyA9IHNpZ25hbDxhbnlbXT4obnVsbCk7XG5cbiAgICBzdGFydFJhbmdlSW5kZXggPSBzaWduYWw8bnVtYmVyPigtMSk7XG5cbiAgICBmb2N1c2VkT3B0aW9uSW5kZXggPSBzaWduYWw8bnVtYmVyPigtMSk7XG5cbiAgICBzZWxlY3RlZE9wdGlvbnM6IGFueTtcblxuICAgIGNsaWNrSW5Qcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtbXVsdGlzZWxlY3QgcC1jb21wb25lbnQgcC1pbnB1dHdyYXBwZXInOiB0cnVlLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAgICAgJ3AtbXVsdGlzZWxlY3QtY2xlYXJhYmxlJzogdGhpcy5zaG93Q2xlYXIgJiYgIXRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgICAncC1tdWx0aXNlbGVjdC1jaGlwJzogdGhpcy5kaXNwbGF5ID09PSAnY2hpcCcsXG4gICAgICAgICAgICAncC1mb2N1cyc6IHRoaXMuZm9jdXNlZCxcbiAgICAgICAgICAgICdwLXZhcmlhbnQtZmlsbGVkJzogdGhpcy52YXJpYW50ID09PSAnZmlsbGVkJyB8fCB0aGlzLmNvbmZpZy5pbnB1dFN0eWxlKCkgPT09ICdmaWxsZWQnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0Q2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1tdWx0aXNlbGVjdC1sYWJlbCBwLWlucHV0dGV4dCc6IHRydWUsXG4gICAgICAgICAgICAncC1wbGFjZWhvbGRlcic6ICh0aGlzLnBsYWNlaG9sZGVyKCkgfHwgdGhpcy5kZWZhdWx0TGFiZWwpICYmICh0aGlzLmxhYmVsKCkgPT09IHRoaXMucGxhY2Vob2xkZXIoKSB8fCB0aGlzLmxhYmVsKCkgPT09IHRoaXMuZGVmYXVsdExhYmVsKSxcbiAgICAgICAgICAgICdwLW11bHRpc2VsZWN0LWxhYmVsLWVtcHR5JzogIXRoaXMuc2VsZWN0ZWRJdGVtc1RlbXBsYXRlICYmICh0aGlzLmxhYmVsKCkgPT09ICdwLWVtcHR5bGFiZWwnIHx8IHRoaXMubGFiZWwoKS5sZW5ndGggPT09IDApXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IHBhbmVsQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1tdWx0aXNlbGVjdC1wYW5lbCBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1pbnB1dC1maWxsZWQnOiB0aGlzLmNvbmZpZy5pbnB1dFN0eWxlKCkgPT09ICdmaWxsZWQnLFxuICAgICAgICAgICAgJ3AtcmlwcGxlLWRpc2FibGVkJzogdGhpcy5jb25maWcucmlwcGxlID09PSBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldCBsYWJlbENsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtbXVsdGlzZWxlY3QtbGFiZWwnOiB0cnVlLFxuICAgICAgICAgICAgJ3AtcGxhY2Vob2xkZXInOiB0aGlzLmxhYmVsKCkgPT09IHRoaXMucGxhY2Vob2xkZXIoKSB8fCB0aGlzLmxhYmVsKCkgPT09IHRoaXMuZGVmYXVsdExhYmVsLFxuICAgICAgICAgICAgJ3AtbXVsdGlzZWxlY3QtbGFiZWwtZW1wdHknOiAhdGhpcy5wbGFjZWhvbGRlcigpICYmICF0aGlzLmRlZmF1bHRMYWJlbCAmJiAoIXRoaXMubW9kZWxWYWx1ZSgpIHx8IHRoaXMubW9kZWxWYWx1ZSgpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgZW1wdHlNZXNzYWdlTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlNZXNzYWdlIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5FTVBUWV9NRVNTQUdFKTtcbiAgICB9XG5cbiAgICBnZXQgZW1wdHlGaWx0ZXJNZXNzYWdlTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1wdHlGaWx0ZXJNZXNzYWdlIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5FTVBUWV9GSUxURVJfTUVTU0FHRSk7XG4gICAgfVxuXG4gICAgZ2V0IGZpbGxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsVmFsdWUoKSA9PT0gJ3N0cmluZycpIHJldHVybiAhIXRoaXMubW9kZWxWYWx1ZSgpO1xuXG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMubW9kZWxWYWx1ZSgpKTtcbiAgICB9XG5cbiAgICBnZXQgaXNWaXNpYmxlQ2xlYXJJY29uKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbFZhbHVlKCkgIT0gbnVsbCAmJiB0aGlzLm1vZGVsVmFsdWUoKSAhPT0gJycgJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLm1vZGVsVmFsdWUoKSkgJiYgdGhpcy5zaG93Q2xlYXIgJiYgIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5maWxsZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHRvZ2dsZUFsbEFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhW3RoaXMuYWxsU2VsZWN0ZWQoKSA/ICdzZWxlY3RBbGwnIDogJ3Vuc2VsZWN0QWxsJ10gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGNsb3NlQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuY2xvc2UgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGxpc3RMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkFSSUEpWydsaXN0TGFiZWwnXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEFsbFZpc2libGVBbmROb25WaXNpYmxlT3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3JvdXAgPyB0aGlzLmZsYXRPcHRpb25zKHRoaXMub3B0aW9ucykgOiB0aGlzLm9wdGlvbnMgfHwgW107XG4gICAgfVxuXG4gICAgdmlzaWJsZU9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldEFsbFZpc2libGVBbmROb25WaXNpYmxlT3B0aW9ucygpO1xuICAgICAgICBjb25zdCBpc0FycmF5T2ZPYmplY3RzID0gT2JqZWN0VXRpbHMuaXNBcnJheShvcHRpb25zKSAmJiBPYmplY3RVdGlscy5pc09iamVjdChvcHRpb25zWzBdKTtcblxuICAgICAgICBpZiAodGhpcy5fZmlsdGVyVmFsdWUoKSkge1xuICAgICAgICAgICAgbGV0IGZpbHRlcmVkT3B0aW9ucztcblxuICAgICAgICAgICAgaWYgKGlzQXJyYXlPZk9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmZpbHRlclNlcnZpY2UuZmlsdGVyKG9wdGlvbnMsIHRoaXMuc2VhcmNoRmllbGRzKCksIHRoaXMuX2ZpbHRlclZhbHVlKCksIHRoaXMuZmlsdGVyTWF0Y2hNb2RlLCB0aGlzLmZpbHRlckxvY2FsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkT3B0aW9ucyA9IG9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IG9wdGlvbi50b1N0cmluZygpLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5jbHVkZXModGhpcy5fZmlsdGVyVmFsdWUoKS50b0xvY2FsZUxvd2VyQ2FzZSgpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uR3JvdXBzID0gdGhpcy5vcHRpb25zIHx8IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gW107XG5cbiAgICAgICAgICAgICAgICBvcHRpb25Hcm91cHMuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBDaGlsZHJlbiA9IHRoaXMuZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihncm91cCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkSXRlbXMgPSBncm91cENoaWxkcmVuLmZpbHRlcigoaXRlbSkgPT4gZmlsdGVyZWRPcHRpb25zLmluY2x1ZGVzKGl0ZW0pKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWRJdGVtcy5sZW5ndGggPiAwKSBmaWx0ZXJlZC5wdXNoKHsgLi4uZ3JvdXAsIFt0eXBlb2YgdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuID09PSAnc3RyaW5nJyA/IHRoaXMub3B0aW9uR3JvdXBDaGlsZHJlbiA6ICdpdGVtcyddOiBbLi4uZmlsdGVyZWRJdGVtc10gfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mbGF0T3B0aW9ucyhmaWx0ZXJlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZE9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfSk7XG5cbiAgICBsYWJlbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgbGV0IGxhYmVsO1xuICAgICAgICBjb25zdCBtb2RlbFZhbHVlID0gdGhpcy5tb2RlbFZhbHVlKCk7XG5cbiAgICAgICAgaWYgKG1vZGVsVmFsdWUgJiYgbW9kZWxWYWx1ZS5sZW5ndGggJiYgdGhpcy5kaXNwbGF5U2VsZWN0ZWRMYWJlbCkge1xuICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5tYXhTZWxlY3RlZExhYmVscykgJiYgbW9kZWxWYWx1ZS5sZW5ndGggPiB0aGlzLm1heFNlbGVjdGVkTGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VsZWN0ZWRJdGVtc0xhYmVsKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gJyc7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVsVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsICs9ICcsICc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsYWJlbCArPSB0aGlzLmdldExhYmVsQnlWYWx1ZShtb2RlbFZhbHVlW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYWJlbCA9IHRoaXMucGxhY2Vob2xkZXIoKSB8fCB0aGlzLmRlZmF1bHRMYWJlbCB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGFiZWw7XG4gICAgfSk7XG5cbiAgICBjaGlwU2VsZWN0ZWRJdGVtcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5tYXhTZWxlY3RlZExhYmVscykgJiYgdGhpcy5tb2RlbFZhbHVlKCkgJiYgdGhpcy5tb2RlbFZhbHVlKCkubGVuZ3RoID4gdGhpcy5tYXhTZWxlY3RlZExhYmVscyA/IHRoaXMubW9kZWxWYWx1ZSgpLnNsaWNlKDAsIHRoaXMubWF4U2VsZWN0ZWRMYWJlbHMpIDogdGhpcy5tb2RlbFZhbHVlKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgcHVibGljIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsXG4gICAgICAgIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsVmFsdWUgPSB0aGlzLm1vZGVsVmFsdWUoKTtcblxuICAgICAgICAgICAgY29uc3QgdmlzaWJsZU9wdGlvbnMgPSB0aGlzLnZpc2libGVPcHRpb25zKCk7XG4gICAgICAgICAgICBpZiAodmlzaWJsZU9wdGlvbnMgJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh2aXNpYmxlT3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25WYWx1ZSAmJiB0aGlzLm9wdGlvbkxhYmVsICYmIG1vZGVsVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSB2aXNpYmxlT3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4gbW9kZWxWYWx1ZS5pbmNsdWRlcyhvcHRpb25bdGhpcy5vcHRpb25MYWJlbF0pIHx8IG1vZGVsVmFsdWUuaW5jbHVkZXMob3B0aW9uW3RoaXMub3B0aW9uVmFsdWVdKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBtb2RlbFZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQgfHwgVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICAgICAgdGhpcy5hdXRvVXBkYXRlTW9kZWwoKTtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJCeSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGZpbHRlcjogKHZhbHVlKSA9PiB0aGlzLm9uRmlsdGVySW5wdXRDaGFuZ2UodmFsdWUpLFxuICAgICAgICAgICAgICAgIHJlc2V0OiAoKSA9PiB0aGlzLnJlc2V0RmlsdGVyKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWQoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuc2VsZWN0aW9uTGltaXQpICYmIHRoaXMubW9kZWxWYWx1ZSgpICYmIHRoaXMubW9kZWxWYWx1ZSgpLmxlbmd0aCA9PT0gdGhpcy5zZWxlY3Rpb25MaW1pdDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3RlZEl0ZW1zJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbHRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5ZmlsdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eUZpbHRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignY2hlY2tpY29uIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgcmVtb3ZlZCBpbiB2MTguIFVzZSBpdGVtY2hlY2tib3hpY29uIG9yIGhlYWRlcmNoZWNrYm94aWNvbiB0ZW1wbGF0ZXMgaW5zdGVhZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXJjaGVja2JveGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlckNoZWNrYm94SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsb2FkaW5naWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsdGVyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVySWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmV0b2tlbmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRva2VuSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbG9zZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbGVhcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFySWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdkcm9wZG93bmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3Bkb3duSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtY2hlY2tib3hpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtQ2hlY2tib3hJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJlZCkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5Vmlld0NoaWxkPy5hbGlnbk92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmxhdE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLnJlZHVjZSgocmVzdWx0LCBvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7IG9wdGlvbkdyb3VwOiBvcHRpb24sIGdyb3VwOiB0cnVlLCBpbmRleCB9KTtcblxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uR3JvdXBDaGlsZHJlbiA9IHRoaXMuZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRpb24pO1xuXG4gICAgICAgICAgICBvcHRpb25Hcm91cENoaWxkcmVuICYmIG9wdGlvbkdyb3VwQ2hpbGRyZW4uZm9yRWFjaCgobykgPT4gcmVzdWx0LnB1c2gobykpO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgYXV0b1VwZGF0ZU1vZGVsKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RPbkZvY3VzICYmIHRoaXMuYXV0b09wdGlvbkZvY3VzICYmICF0aGlzLmhhc1NlbGVjdGVkT3B0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCh0aGlzLmZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRPcHRpb25WYWx1ZSh0aGlzLnZpc2libGVPcHRpb25zKClbdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKV0pO1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdCh7IG9yaWdpbmFsRXZlbnQ6IG51bGwsIG9wdGlvbjogW3ZhbHVlXSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIG1vZGVsIHZhbHVlLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlTW9kZWwodmFsdWUsIGV2ZW50Pykge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMubW9kZWxWYWx1ZS5zZXQodmFsdWUpO1xuICAgIH1cblxuICAgIG9uSW5wdXRDbGljayhldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KC0xKTtcbiAgICB9XG5cbiAgICBvbk9wdGlvblNlbGVjdChldmVudCwgaXNGb2N1cyA9IGZhbHNlLCBpbmRleCA9IC0xKSB7XG4gICAgICAgIGNvbnN0IHsgb3JpZ2luYWxFdmVudCwgb3B0aW9uIH0gPSBldmVudDtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5pc09wdGlvbkRpc2FibGVkKG9wdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChvcHRpb24pO1xuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5tb2RlbFZhbHVlKCkuZmlsdGVyKCh2YWwpID0+ICFPYmplY3RVdGlscy5lcXVhbHModmFsLCB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbiksIHRoaXMuZXF1YWxpdHlLZXkoKSkpO1xuICAgICAgICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KHsgbmV3VmFsdWU6IHRoaXMudmFsdWUsIHJlbW92ZWQ6IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gWy4uLih0aGlzLm1vZGVsVmFsdWUoKSB8fCBbXSksIHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKV07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlLCBvcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgaW5kZXggIT09IC0xICYmIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldChpbmRleCk7XG5cbiAgICAgICAgaXNGb2N1cyAmJiBEb21IYW5kbGVyLmZvY3VzKHRoaXMuZm9jdXNJbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IHsgLi4uZXZlbnQsIHNlbGVjdGVkOiAhZXZlbnQuc2VsZWN0ZWQgfSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGl0ZW1WYWx1ZTogb3B0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbmRTZWxlY3RlZE9wdGlvbkluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNTZWxlY3RlZE9wdGlvbigpID8gdGhpcy52aXNpYmxlT3B0aW9ucygpLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRTZWxlY3RlZE9wdGlvbihvcHRpb24pKSA6IC0xO1xuICAgIH1cblxuICAgIG9uT3B0aW9uU2VsZWN0UmFuZ2UoZXZlbnQsIHN0YXJ0ID0gLTEsIGVuZCA9IC0xKSB7XG4gICAgICAgIHN0YXJ0ID09PSAtMSAmJiAoc3RhcnQgPSB0aGlzLmZpbmROZWFyZXN0U2VsZWN0ZWRPcHRpb25JbmRleChlbmQsIHRydWUpKTtcbiAgICAgICAgZW5kID09PSAtMSAmJiAoZW5kID0gdGhpcy5maW5kTmVhcmVzdFNlbGVjdGVkT3B0aW9uSW5kZXgoc3RhcnQpKTtcblxuICAgICAgICBpZiAoc3RhcnQgIT09IC0xICYmIGVuZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlU3RhcnQgPSBNYXRoLm1pbihzdGFydCwgZW5kKTtcbiAgICAgICAgICAgIGNvbnN0IHJhbmdlRW5kID0gTWF0aC5tYXgoc3RhcnQsIGVuZCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlzaWJsZU9wdGlvbnMoKVxuICAgICAgICAgICAgICAgIC5zbGljZShyYW5nZVN0YXJ0LCByYW5nZUVuZCArIDEpXG4gICAgICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRPcHRpb24ob3B0aW9uKSlcbiAgICAgICAgICAgICAgICAubWFwKChvcHRpb24pID0+IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwodmFsdWUsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlYXJjaEZpZWxkcygpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmZpbHRlckJ5IHx8IHRoaXMub3B0aW9uTGFiZWwgfHwgJ2xhYmVsJykuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICBmaW5kTmVhcmVzdFNlbGVjdGVkT3B0aW9uSW5kZXgoaW5kZXgsIGZpcnN0Q2hlY2tVcCA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBtYXRjaGVkT3B0aW9uSW5kZXggPSAtMTtcblxuICAgICAgICBpZiAodGhpcy5oYXNTZWxlY3RlZE9wdGlvbigpKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RDaGVja1VwKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZE9wdGlvbkluZGV4ID0gdGhpcy5maW5kUHJldlNlbGVjdGVkT3B0aW9uSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgIG1hdGNoZWRPcHRpb25JbmRleCA9IG1hdGNoZWRPcHRpb25JbmRleCA9PT0gLTEgPyB0aGlzLmZpbmROZXh0U2VsZWN0ZWRPcHRpb25JbmRleChpbmRleCkgOiBtYXRjaGVkT3B0aW9uSW5kZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hdGNoZWRPcHRpb25JbmRleCA9IHRoaXMuZmluZE5leHRTZWxlY3RlZE9wdGlvbkluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICBtYXRjaGVkT3B0aW9uSW5kZXggPSBtYXRjaGVkT3B0aW9uSW5kZXggPT09IC0xID8gdGhpcy5maW5kUHJldlNlbGVjdGVkT3B0aW9uSW5kZXgoaW5kZXgpIDogbWF0Y2hlZE9wdGlvbkluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4IDogaW5kZXg7XG4gICAgfVxuXG4gICAgZmluZFByZXZTZWxlY3RlZE9wdGlvbkluZGV4KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRPcHRpb25JbmRleCA9IHRoaXMuaGFzU2VsZWN0ZWRPcHRpb24oKSAmJiBpbmRleCA+IDAgPyBPYmplY3RVdGlscy5maW5kTGFzdEluZGV4KHRoaXMudmlzaWJsZU9wdGlvbnMoKS5zbGljZSgwLCBpbmRleCksIChvcHRpb24pID0+IHRoaXMuaXNWYWxpZFNlbGVjdGVkT3B0aW9uKG9wdGlvbikpIDogLTE7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4IDogLTE7XG4gICAgfVxuXG4gICAgZmluZEZpcnN0Rm9jdXNlZE9wdGlvbkluZGV4KCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5maW5kRmlyc3RTZWxlY3RlZE9wdGlvbkluZGV4KCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkSW5kZXggPCAwID8gdGhpcy5maW5kRmlyc3RPcHRpb25JbmRleCgpIDogc2VsZWN0ZWRJbmRleDtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RPcHRpb25JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnMoKS5maW5kSW5kZXgoKG9wdGlvbikgPT4gdGhpcy5pc1ZhbGlkT3B0aW9uKG9wdGlvbikpO1xuICAgIH1cblxuICAgIGZpbmRGaXJzdFNlbGVjdGVkT3B0aW9uSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1NlbGVjdGVkT3B0aW9uKCkgPyB0aGlzLnZpc2libGVPcHRpb25zKCkuZmluZEluZGV4KChvcHRpb24pID0+IHRoaXMuaXNWYWxpZFNlbGVjdGVkT3B0aW9uKG9wdGlvbikpIDogLTE7XG4gICAgfVxuXG4gICAgZmluZE5leHRTZWxlY3RlZE9wdGlvbkluZGV4KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRPcHRpb25JbmRleCA9XG4gICAgICAgICAgICB0aGlzLmhhc1NlbGVjdGVkT3B0aW9uKCkgJiYgaW5kZXggPCB0aGlzLnZpc2libGVPcHRpb25zKCkubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgID8gdGhpcy52aXNpYmxlT3B0aW9ucygpXG4gICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAuZmluZEluZGV4KChvcHRpb24pID0+IHRoaXMuaXNWYWxpZFNlbGVjdGVkT3B0aW9uKG9wdGlvbikpXG4gICAgICAgICAgICAgICAgOiAtMTtcblxuICAgICAgICByZXR1cm4gbWF0Y2hlZE9wdGlvbkluZGV4ID4gLTEgPyBtYXRjaGVkT3B0aW9uSW5kZXggKyBpbmRleCArIDEgOiAtMTtcbiAgICB9XG5cbiAgICBlcXVhbGl0eUtleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uVmFsdWUgPyBudWxsIDogdGhpcy5kYXRhS2V5O1xuICAgIH1cblxuICAgIGhhc1NlbGVjdGVkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLm1vZGVsVmFsdWUoKSk7XG4gICAgfVxuXG4gICAgaXNTZWxlY3Rpb25BbGxEaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1RvZ2dsZUFsbCAmJiBPYmplY3RVdGlscy5pc0VtcHR5KHRoaXMuc2VsZWN0aW9uTGltaXQpO1xuICAgIH1cblxuICAgIGlzVmFsaWRTZWxlY3RlZE9wdGlvbihvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pICYmIHRoaXMuaXNTZWxlY3RlZChvcHRpb24pO1xuICAgIH1cblxuICAgIGlzT3B0aW9uR3JvdXAob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5ncm91cCB8fCB0aGlzLm9wdGlvbkdyb3VwTGFiZWwpICYmIG9wdGlvbi5vcHRpb25Hcm91cCAmJiBvcHRpb24uZ3JvdXA7XG4gICAgfVxuXG4gICAgaXNWYWxpZE9wdGlvbihvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbiAmJiAhKHRoaXMuaXNPcHRpb25EaXNhYmxlZChvcHRpb24pIHx8IHRoaXMuaXNPcHRpb25Hcm91cChvcHRpb24pKTtcbiAgICB9XG5cbiAgICBpc09wdGlvbkRpc2FibGVkKG9wdGlvbjogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLm1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZCgpICYmICF0aGlzLmlzU2VsZWN0ZWQob3B0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uRGlzYWJsZWQgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25EaXNhYmxlZCkgOiBvcHRpb24gJiYgb3B0aW9uLmRpc2FibGVkICE9PSB1bmRlZmluZWQgPyBvcHRpb24uZGlzYWJsZWQgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKG9wdGlvbikge1xuICAgICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1vZGVsVmFsdWUoKSB8fCBbXSkuc29tZSgodmFsdWUpID0+IE9iamVjdFV0aWxzLmVxdWFscyh2YWx1ZSwgb3B0aW9uVmFsdWUsIHRoaXMuZXF1YWxpdHlLZXkoKSkpO1xuICAgIH1cblxuICAgIGlzT3B0aW9uTWF0Y2hlZChvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pICYmIHRoaXMuZ2V0T3B0aW9uTGFiZWwob3B0aW9uKS50b1N0cmluZygpLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuZmlsdGVyTG9jYWxlKS5zdGFydHNXaXRoKHRoaXMuc2VhcmNoVmFsdWUudG9Mb2NhbGVMb3dlckNhc2UodGhpcy5maWx0ZXJMb2NhbGUpKTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX29wdGlvbnMoKSB8fCAodGhpcy52aXNpYmxlT3B0aW9ucygpICYmIHRoaXMudmlzaWJsZU9wdGlvbnMoKS5sZW5ndGggPT09IDApO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkluZGV4KGluZGV4LCBzY3JvbGxlck9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlydHVhbFNjcm9sbGVyRGlzYWJsZWQgPyBpbmRleCA6IHNjcm9sbGVyT3B0aW9ucyAmJiBzY3JvbGxlck9wdGlvbnMuZ2V0SXRlbU9wdGlvbnMoaW5kZXgpWydpbmRleCddO1xuICAgIH1cblxuICAgIGdldEFyaWFQb3NJbnNldChpbmRleCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKHRoaXMub3B0aW9uR3JvdXBMYWJlbFxuICAgICAgICAgICAgICAgID8gaW5kZXggLVxuICAgICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9ucygpXG4gICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4gdGhpcy5pc09wdGlvbkdyb3VwKG9wdGlvbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgIDogaW5kZXgpICsgMVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldCBhcmlhU2V0U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnMoKS5maWx0ZXIoKG9wdGlvbikgPT4gIXRoaXMuaXNPcHRpb25Hcm91cChvcHRpb24pKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0TGFiZWxCeVZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdyb3VwID8gdGhpcy5mbGF0T3B0aW9ucyh0aGlzLl9vcHRpb25zKCkpIDogdGhpcy5fb3B0aW9ucygpIHx8IFtdO1xuICAgICAgICBjb25zdCBtYXRjaGVkT3B0aW9uID0gb3B0aW9ucy5maW5kKChvcHRpb24pID0+ICF0aGlzLmlzT3B0aW9uR3JvdXAob3B0aW9uKSAmJiBPYmplY3RVdGlscy5lcXVhbHModGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pLCB2YWx1ZSwgdGhpcy5lcXVhbGl0eUtleSgpKSk7XG4gICAgICAgIHJldHVybiBtYXRjaGVkT3B0aW9uID8gdGhpcy5nZXRPcHRpb25MYWJlbChtYXRjaGVkT3B0aW9uKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRJdGVtc0xhYmVsKCkge1xuICAgICAgICBsZXQgcGF0dGVybiA9IC97KC4qPyl9LztcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLnNlbGVjdGVkSXRlbXNMYWJlbCA/IHRoaXMuc2VsZWN0ZWRJdGVtc0xhYmVsIDogdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLlNFTEVDVElPTl9NRVNTQUdFKTtcblxuICAgICAgICBpZiAocGF0dGVybi50ZXN0KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKG1lc3NhZ2UubWF0Y2gocGF0dGVybilbMF0sIHRoaXMubW9kZWxWYWx1ZSgpLmxlbmd0aCArICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkxhYmVsKG9wdGlvbjogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkxhYmVsID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb24sIHRoaXMub3B0aW9uTGFiZWwpIDogb3B0aW9uICYmIG9wdGlvbi5sYWJlbCAhPSB1bmRlZmluZWQgPyBvcHRpb24ubGFiZWwgOiBvcHRpb247XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uVmFsdWUob3B0aW9uOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uVmFsdWUgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25WYWx1ZSkgOiAhdGhpcy5vcHRpb25WYWx1ZSAmJiBvcHRpb24gJiYgb3B0aW9uLnZhbHVlICE9PSB1bmRlZmluZWQgPyBvcHRpb24udmFsdWUgOiBvcHRpb247XG4gICAgfVxuXG4gICAgZ2V0T3B0aW9uR3JvdXBMYWJlbChvcHRpb25Hcm91cDogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkdyb3VwTGFiZWwgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbkdyb3VwLCB0aGlzLm9wdGlvbkdyb3VwTGFiZWwpIDogb3B0aW9uR3JvdXAgJiYgb3B0aW9uR3JvdXAubGFiZWwgIT0gdW5kZWZpbmVkID8gb3B0aW9uR3JvdXAubGFiZWwgOiBvcHRpb25Hcm91cDtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25Hcm91cENoaWxkcmVuKG9wdGlvbkdyb3VwOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uR3JvdXBDaGlsZHJlbiA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uR3JvdXAsIHRoaXMub3B0aW9uR3JvdXBDaGlsZHJlbikgOiBvcHRpb25Hcm91cC5pdGVtcztcbiAgICB9XG5cbiAgICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtZXRhS2V5ID0gZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93VXBLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVuZEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uUGFnZURvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdQYWdlVXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25QYWdlVXBLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXNjYXBlS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnU2hpZnRMZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ1NoaWZ0UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25TaGlmdEtleSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSAnS2V5QScgJiYgbWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmlzaWJsZU9wdGlvbnMoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRPcHRpb24ob3B0aW9uKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKG9wdGlvbikgPT4gdGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlLCBldmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5ICYmIE9iamVjdFV0aWxzLmlzUHJpbnRhYmxlQ2hhcmFjdGVyKGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoT3B0aW9ucyhldmVudCwgZXZlbnQua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRmlsdGVyS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1VwS2V5KGV2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0xlZnRLZXkoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZUtleShldmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVuZEtleShldmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ051bXBhZEVudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Fc2NhcGVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJLZXkoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BcnJvd0xlZnRLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIHByZXNzZWRJbklucHV0VGV4dDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHByZXNzZWRJbklucHV0VGV4dCAmJiB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoLTEpO1xuICAgIH1cblxuICAgIG9uQXJyb3dEb3duS2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEgPyB0aGlzLmZpbmROZXh0T3B0aW9uSW5kZXgodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSkgOiB0aGlzLmZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpO1xuXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdFJhbmdlKGV2ZW50LCB0aGlzLnN0YXJ0UmFuZ2VJbmRleCgpLCBvcHRpb25JbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChldmVudCwgb3B0aW9uSW5kZXgpO1xuICAgICAgICAhdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLnNob3coKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgb25BcnJvd1VwS2V5KGV2ZW50LCBwcmVzc2VkSW5JbnB1dFRleHQgPSBmYWxzZSkge1xuICAgICAgICBpZiAoZXZlbnQuYWx0S2V5ICYmICFwcmVzc2VkSW5JbnB1dFRleHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25PcHRpb25TZWxlY3QoZXZlbnQsIHRoaXMudmlzaWJsZU9wdGlvbnMoKVt0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uSW5kZXggPSB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSA/IHRoaXMuZmluZFByZXZPcHRpb25JbmRleCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpKSA6IHRoaXMuZmluZExhc3RGb2N1c2VkT3B0aW9uSW5kZXgoKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdFJhbmdlKGV2ZW50LCBvcHRpb25JbmRleCwgdGhpcy5zdGFydFJhbmdlSW5kZXgoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCBvcHRpb25JbmRleCk7XG5cbiAgICAgICAgICAgICF0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoZXZlbnQsIHByZXNzZWRJbklucHV0VGV4dCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHsgY3VycmVudFRhcmdldCB9ID0gZXZlbnQ7XG5cbiAgICAgICAgaWYgKHByZXNzZWRJbklucHV0VGV4dCkge1xuICAgICAgICAgICAgY29uc3QgbGVuID0gY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgZXZlbnQuc2hpZnRLZXkgPyBsZW4gOiAwKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9IGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleTtcbiAgICAgICAgICAgIGxldCBvcHRpb25JbmRleCA9IHRoaXMuZmluZEZpcnN0T3B0aW9uSW5kZXgoKTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0UmFuZ2UoZXZlbnQsIG9wdGlvbkluZGV4LCB0aGlzLnN0YXJ0UmFuZ2VJbmRleCgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgoZXZlbnQsIG9wdGlvbkluZGV4KTtcblxuICAgICAgICAgICAgIXRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW5kS2V5KGV2ZW50LCBwcmVzc2VkSW5JbnB1dFRleHQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB7IGN1cnJlbnRUYXJnZXQgfSA9IGV2ZW50O1xuXG4gICAgICAgIGlmIChwcmVzc2VkSW5JbnB1dFRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IGN1cnJlbnRUYXJnZXQudmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgY3VycmVudFRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShldmVudC5zaGlmdEtleSA/IDAgOiBsZW4sIGxlbik7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoLTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG1ldGFLZXkgPSBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXk7XG4gICAgICAgICAgICBsZXQgb3B0aW9uSW5kZXggPSB0aGlzLmZpbmRMYXN0Rm9jdXNlZE9wdGlvbkluZGV4KCk7XG5cbiAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSAmJiBtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdFJhbmdlKGV2ZW50LCB0aGlzLnN0YXJ0UmFuZ2VJbmRleCgpLCBvcHRpb25JbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCBvcHRpb25JbmRleCk7XG5cbiAgICAgICAgICAgICF0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblBhZ2VEb3duS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KHRoaXMudmlzaWJsZU9wdGlvbnMoKS5sZW5ndGggLSAxKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblBhZ2VVcEtleShldmVudCkge1xuICAgICAgICB0aGlzLnNjcm9sbEluVmlldygwKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkVudGVyS2V5KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bktleShldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdFJhbmdlKGV2ZW50LCB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG9wdGlvbjogdGhpcy52aXNpYmxlT3B0aW9ucygpW3RoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCldIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Fc2NhcGVLZXkoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLmhpZGUodHJ1ZSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25EZWxldGVLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0NsZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKGV2ZW50KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRhYktleShldmVudCwgcHJlc3NlZEluSW5wdXRUZXh0ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFwcmVzc2VkSW5JbnB1dFRleHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuaGFzRm9jdXNhYmxlRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXMoZXZlbnQuc2hpZnRLZXkgPyB0aGlzLmxhc3RIaWRkZW5Gb2N1c2FibGVFbGVtZW50T25PdmVybGF5Lm5hdGl2ZUVsZW1lbnQgOiB0aGlzLmZpcnN0SGlkZGVuRm9jdXNhYmxlRWxlbWVudE9uT3ZlcmxheS5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG9wdGlvbjogdGhpcy52aXNpYmxlT3B0aW9ucygpW3RoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCldIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5oaWRlKHRoaXMuZmlsdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2hpZnRLZXkoKSB7XG4gICAgICAgIHRoaXMuc3RhcnRSYW5nZUluZGV4LnNldCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpKTtcbiAgICB9XG5cbiAgICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5sb2FkaW5nIHx8IHRoaXMucmVhZG9ubHkgfHwgKGV2ZW50LnRhcmdldCBhcyBOb2RlKS5pc1NhbWVOb2RlKHRoaXMuZm9jdXNJbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ2NsZWFyaWNvbicgfHwgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXBjLXNlY3Rpb249XCJjbGVhcmljb25cIl0nKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vdmVybGF5Vmlld0NoaWxkIHx8ICF0aGlzLm92ZXJsYXlWaWV3Q2hpbGQuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jbGlja0luUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2xpY2tJblByb2dyZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDE1MCk7XG5cbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPyB0aGlzLmhpZGUodHJ1ZSkgOiB0aGlzLnNob3codHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBvbkZpcnN0SGlkZGVuRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZm9jdXNhYmxlRWwgPVxuICAgICAgICAgICAgZXZlbnQucmVsYXRlZFRhcmdldCA9PT0gdGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgPyBEb21IYW5kbGVyLmdldEZpcnN0Rm9jdXNhYmxlRWxlbWVudCh0aGlzLm92ZXJsYXlWaWV3Q2hpbGQ/Lm92ZXJsYXlWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQsICc6bm90KFtkYXRhLXAtaGlkZGVuLWZvY3VzYWJsZT1cInRydWVcIl0pJylcbiAgICAgICAgICAgICAgICA6IHRoaXMuZm9jdXNJbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudDtcblxuICAgICAgICBEb21IYW5kbGVyLmZvY3VzKGZvY3VzYWJsZUVsKTtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRPcHRpb25JbmRleCA9IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkgIT09IC0xID8gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSA6IHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5hdXRvT3B0aW9uRm9jdXMgPyB0aGlzLmZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpIDogLTE7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldChmb2N1c2VkT3B0aW9uSW5kZXgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuc2Nyb2xsSW5WaWV3KHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkpO1xuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH0pO1xuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH0pO1xuXG4gICAgICAgIGlmICghdGhpcy5wcmV2ZW50TW9kZWxUb3VjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmV2ZW50TW9kZWxUb3VjaGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25GaWx0ZXJJbnB1dENoYW5nZShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBsZXQgdmFsdWU6IHN0cmluZyA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIHRoaXMuX2ZpbHRlclZhbHVlLnNldCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgIHRoaXMub25GaWx0ZXIuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBmaWx0ZXI6IHRoaXMuX2ZpbHRlclZhbHVlKCkgfSk7XG5cbiAgICAgICAgIXRoaXMudmlydHVhbFNjcm9sbGVyRGlzYWJsZWQgJiYgdGhpcy5zY3JvbGxlci5zY3JvbGxUb0luZGV4KDApO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpZXdDaGlsZC5hbGlnbk92ZXJsYXkoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25MYXN0SGlkZGVuRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZm9jdXNhYmxlRWwgPVxuICAgICAgICAgICAgZXZlbnQucmVsYXRlZFRhcmdldCA9PT0gdGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgPyBEb21IYW5kbGVyLmdldExhc3RGb2N1c2FibGVFbGVtZW50KHRoaXMub3ZlcmxheVZpZXdDaGlsZD8ub3ZlcmxheVZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgJzpub3QoW2RhdGEtcC1oaWRkZW4tZm9jdXNhYmxlPVwidHJ1ZVwiXSknKVxuICAgICAgICAgICAgICAgIDogdGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIERvbUhhbmRsZXIuZm9jdXMoZm9jdXNhYmxlRWwpO1xuICAgIH1cblxuICAgIG9uT3B0aW9uTW91c2VFbnRlcihldmVudCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNPbkhvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChldmVudCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25IZWFkZXJDaGVja2JveEtleURvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Ub2dnbGVBbGwoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25Ub2dnbGVBbGwoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9ucmVtb3ZlVG9rZW5JY29uS2V5RG93bihldmVudCwgaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICdOdW1wYWRFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVPcHRpb24oaXRlbSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBvbkZpbHRlckJsdXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KC0xKTtcbiAgICB9XG5cbiAgICBvbkhlYWRlckNoZWNrYm94Rm9jdXMoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyQ2hlY2tib3hGb2N1cyA9IHRydWU7XG4gICAgfVxuXG4gICAgb25IZWFkZXJDaGVja2JveEJsdXIoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyQ2hlY2tib3hGb2N1cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uVG9nZ2xlQWxsKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdEFsbCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0QWxsQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6ICF0aGlzLmFsbFNlbGVjdGVkKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gcHJlLXNlbGVjdGVkIGRpc2FibGVkIG9wdGlvbnMgc2hvdWxkIGFsd2F5cyBiZSBzZWxlY3RlZC5cbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkRGlzYWJsZWRPcHRpb25zID0gdGhpcy5nZXRBbGxWaXNpYmxlQW5kTm9uVmlzaWJsZU9wdGlvbnMoKS5maWx0ZXIoXG4gICAgICAgICAgICAgICAgKG9wdGlvbikgPT4gdGhpcy5pc1NlbGVjdGVkKG9wdGlvbikgJiYgKHRoaXMub3B0aW9uRGlzYWJsZWQgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25EaXNhYmxlZCkgOiBvcHRpb24gJiYgb3B0aW9uLmRpc2FibGVkICE9PSB1bmRlZmluZWQgPyBvcHRpb24uZGlzYWJsZWQgOiBmYWxzZSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHZpc2libGVPcHRpb25zID0gdGhpcy5hbGxTZWxlY3RlZCgpXG4gICAgICAgICAgICAgICAgPyB0aGlzLnZpc2libGVPcHRpb25zKCkuZmlsdGVyKChvcHRpb24pID0+ICF0aGlzLmlzVmFsaWRPcHRpb24ob3B0aW9uKSAmJiB0aGlzLmlzU2VsZWN0ZWQob3B0aW9uKSlcbiAgICAgICAgICAgICAgICA6IHRoaXMudmlzaWJsZU9wdGlvbnMoKS5maWx0ZXIoKG9wdGlvbikgPT4gdGhpcy5pc1NlbGVjdGVkKG9wdGlvbikgfHwgdGhpcy5pc1ZhbGlkT3B0aW9uKG9wdGlvbikpO1xuXG4gICAgICAgICAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSBbLi4uc2VsZWN0ZWREaXNhYmxlZE9wdGlvbnMsIC4uLnZpc2libGVPcHRpb25zXS5tYXAoKG9wdGlvbikgPT4gdGhpcy5nZXRPcHRpb25WYWx1ZShvcHRpb24pKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gWy4uLm5ldyBTZXQob3B0aW9uVmFsdWVzKV07XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwodmFsdWUsIGV2ZW50KTtcblxuICAgICAgICAgICAgLy8gYmVjYXVzZSBvblRvZ2dsZUFsbCBjb3VsZCBoYXZlIGJlZW4gY2FsbGVkIGR1cmluZyBmaWx0ZXJpbmcsIHRoaXMgYWRkaXRpb25hbCB0ZXN0IG5lZWRzIHRvIGJlIHBlcmZvcm1lZCBiZWZvcmUgY2FsbGluZyBvblNlbGVjdEFsbENoYW5nZS5lbWl0XG4gICAgICAgICAgICBpZiAoIXZhbHVlLmxlbmd0aCB8fCB2YWx1ZS5sZW5ndGggPT09IHRoaXMuZ2V0QWxsVmlzaWJsZUFuZE5vblZpc2libGVPcHRpb25zKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdEFsbENoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6ICEhdmFsdWUubGVuZ3RoXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYXJ0aWFsU2VsZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy52YWx1ZSB9KTtcbiAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLmhlYWRlckNoZWNrYm94Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5oZWFkZXJDaGVja2JveEZvY3VzID0gdHJ1ZTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgoZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdmlydHVhbFNjcm9sbGVyRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy52aXJ0dWFsU2Nyb2xsO1xuICAgIH1cblxuICAgIHNjcm9sbEluVmlldyhpbmRleCA9IC0xKSB7XG4gICAgICAgIGNvbnN0IGlkID0gaW5kZXggIT09IC0xID8gYCR7dGhpcy5pZH1fJHtpbmRleH1gIDogdGhpcy5mb2N1c2VkT3B0aW9uSWQ7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zVmlld0NoaWxkICYmIHRoaXMuaXRlbXNWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLml0ZW1zVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIGBsaVtpZD1cIiR7aWR9XCJdYCk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcgJiYgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcsIGlubGluZTogJ25lYXJlc3QnIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy52aXJ0dWFsU2Nyb2xsZXJEaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGwgJiYgdGhpcy5zY3JvbGxlcj8uc2Nyb2xsVG9JbmRleChpbmRleCAhPT0gLTEgPyBpbmRleCA6IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkpO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGZvY3VzZWRPcHRpb25JZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkgIT09IC0xID8gYCR7dGhpcy5pZH1fJHt0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpfWAgOiBudWxsO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmICghT2JqZWN0VXRpbHMuaXNFbXB0eSh0aGlzLnNlbGVjdGlvbkxpbWl0KSAmJiBPYmplY3RVdGlscy5pc0VtcHR5KHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsVmFsdWUuc2V0KFtdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxWYWx1ZS5zZXQodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGFsbFNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RBbGwgIT09IG51bGwgPyB0aGlzLnNlbGVjdEFsbCA6IE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy52aXNpYmxlT3B0aW9ucygpKSAmJiB0aGlzLnZpc2libGVPcHRpb25zKCkuZXZlcnkoKG9wdGlvbikgPT4gdGhpcy5pc09wdGlvbkdyb3VwKG9wdGlvbikgfHwgdGhpcy5pc09wdGlvbkRpc2FibGVkKG9wdGlvbikgfHwgdGhpcy5pc1NlbGVjdGVkKG9wdGlvbikpO1xuICAgIH1cblxuICAgIHBhcnRpYWxTZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRPcHRpb25zICYmIHRoaXMuc2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA+IDAgJiYgdGhpcy5zZWxlY3RlZE9wdGlvbnMubGVuZ3RoIDwgdGhpcy5vcHRpb25zLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyB0aGUgcGFuZWwuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93KGlzRm9jdXM/KSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xuICAgICAgICBjb25zdCBmb2N1c2VkT3B0aW9uSW5kZXggPSB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSA/IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkgOiB0aGlzLmF1dG9PcHRpb25Gb2N1cyA/IHRoaXMuZmluZEZpcnN0Rm9jdXNlZE9wdGlvbkluZGV4KCkgOiAtMTtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KGZvY3VzZWRPcHRpb25JbmRleCk7XG5cbiAgICAgICAgaWYgKGlzRm9jdXMpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXModGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHBhbmVsLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZShpc0ZvY3VzPykge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyICYmIHRoaXMucmVzZXRGaWx0ZXJPbkhpZGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGaWx0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vdmVybGF5T3B0aW9ucz8ubW9kZSA9PT0gJ21vZGFsJykge1xuICAgICAgICAgICAgRG9tSGFuZGxlci51bmJsb2NrQm9keVNjcm9sbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNGb2N1cyAmJiBEb21IYW5kbGVyLmZvY3VzKHRoaXMuZm9jdXNJbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMub25QYW5lbEhpZGUuZW1pdCgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNXcmFwcGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMub3ZlcmxheVZpZXdDaGlsZD8ub3ZlcmxheVZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgdGhpcy52aXJ0dWFsU2Nyb2xsID8gJy5wLXNjcm9sbGVyJyA6ICcucC1tdWx0aXNlbGVjdC1pdGVtcy13cmFwcGVyJyk7XG4gICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsICYmIHRoaXMuc2Nyb2xsZXI/LnNldENvbnRlbnRFbCh0aGlzLml0ZW1zVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zKCkgJiYgdGhpcy5fb3B0aW9ucygpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLm1vZGVsVmFsdWUoKSkgPyB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpIDogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbGVyPy5zY3JvbGxUb0luZGV4KHNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkTGlzdEl0ZW0gPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5pdGVtc1dyYXBwZXIsICdbZGF0YS1wLWhpZ2hsaWdodD1cInRydWVcIl0nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTGlzdEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZExpc3RJdGVtLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JywgaW5saW5lOiAnbmVhcmVzdCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJJbnB1dENoaWxkICYmIHRoaXMuZmlsdGVySW5wdXRDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmVudE1vZGVsVG91Y2hlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b2ZvY3VzRmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vblBhbmVsU2hvdy5lbWl0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNXcmFwcGVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldEZpbHRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVySW5wdXRDaGlsZCAmJiB0aGlzLmZpbHRlcklucHV0Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dENoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ZpbHRlclZhbHVlLnNldChudWxsKTtcbiAgICAgICAgdGhpcy5fZmlsdGVyZWRPcHRpb25zID0gbnVsbDtcbiAgICB9XG5cbiAgICBjbG9zZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGNsZWFyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChudWxsLCBldmVudCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gbnVsbDtcbiAgICAgICAgdGhpcy5vbkNsZWFyLmVtaXQoKTtcbiAgICAgICAgdGhpcy5fZGlzYWJsZVRvb2x0aXAgPSB0cnVlO1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGxhYmVsQ29udGFpbmVyTW91c2VMZWF2ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Rpc2FibGVUb29sdGlwKSB0aGlzLl9kaXNhYmxlVG9vbHRpcCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlbW92ZU9wdGlvbihvcHRpb25WYWx1ZSwgZXZlbnQpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5tb2RlbFZhbHVlKCkuZmlsdGVyKCh2YWwpID0+ICFPYmplY3RVdGlscy5lcXVhbHModmFsLCBvcHRpb25WYWx1ZSwgdGhpcy5lcXVhbGl0eUtleSgpKSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh2YWx1ZSwgZXZlbnQpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBpdGVtVmFsdWU6IG9wdGlvblZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uQ2xlYXIuZW1pdCgpO1xuXG4gICAgICAgIGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIGZpbmROZXh0SXRlbShpdGVtOiBhbnkpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBpdGVtLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAobmV4dEl0ZW0pIHJldHVybiBEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRJdGVtLmNoaWxkcmVuWzBdLCAncC1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4obmV4dEl0ZW0uY2hpbGRyZW5bMF0pIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MobmV4dEl0ZW0sICdwLW11bHRpc2VsZWN0LWl0ZW0tZ3JvdXAnKSA/IHRoaXMuZmluZE5leHRJdGVtKG5leHRJdGVtKSA6IG5leHRJdGVtLmNoaWxkcmVuWzBdO1xuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbShpdGVtOiBhbnkpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgcHJldkl0ZW0gPSBpdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKHByZXZJdGVtKSByZXR1cm4gRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2SXRlbS5jaGlsZHJlblswXSwgJ3AtZGlzYWJsZWQnKSB8fCBEb21IYW5kbGVyLmlzSGlkZGVuKHByZXZJdGVtLmNoaWxkcmVuWzBdKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKHByZXZJdGVtLCAncC1tdWx0aXNlbGVjdC1pdGVtLWdyb3VwJykgPyB0aGlzLmZpbmRQcmV2SXRlbShwcmV2SXRlbSkgOiBwcmV2SXRlbS5jaGlsZHJlblswXTtcbiAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kTmV4dE9wdGlvbkluZGV4KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRPcHRpb25JbmRleCA9XG4gICAgICAgICAgICBpbmRleCA8IHRoaXMudmlzaWJsZU9wdGlvbnMoKS5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgPyB0aGlzLnZpc2libGVPcHRpb25zKClcbiAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgIC5maW5kSW5kZXgoKG9wdGlvbikgPT4gdGhpcy5pc1ZhbGlkT3B0aW9uKG9wdGlvbikpXG4gICAgICAgICAgICAgICAgOiAtMTtcbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4ICsgaW5kZXggKyAxIDogaW5kZXg7XG4gICAgfVxuXG4gICAgZmluZFByZXZPcHRpb25JbmRleChpbmRleCkge1xuICAgICAgICBjb25zdCBtYXRjaGVkT3B0aW9uSW5kZXggPSBpbmRleCA+IDAgPyBPYmplY3RVdGlscy5maW5kTGFzdEluZGV4KHRoaXMudmlzaWJsZU9wdGlvbnMoKS5zbGljZSgwLCBpbmRleCksIChvcHRpb24pID0+IHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pKSA6IC0xO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkT3B0aW9uSW5kZXggPiAtMSA/IG1hdGNoZWRPcHRpb25JbmRleCA6IGluZGV4O1xuICAgIH1cblxuICAgIGZpbmRMYXN0U2VsZWN0ZWRPcHRpb25JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2VsZWN0ZWRPcHRpb24oKSA/IE9iamVjdFV0aWxzLmZpbmRMYXN0SW5kZXgodGhpcy52aXNpYmxlT3B0aW9ucygpLCAob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRTZWxlY3RlZE9wdGlvbihvcHRpb24pKSA6IC0xO1xuICAgIH1cblxuICAgIGZpbmRMYXN0Rm9jdXNlZE9wdGlvbkluZGV4KCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5maW5kTGFzdFNlbGVjdGVkT3B0aW9uSW5kZXgoKTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJbmRleCA8IDAgPyB0aGlzLmZpbmRMYXN0T3B0aW9uSW5kZXgoKSA6IHNlbGVjdGVkSW5kZXg7XG4gICAgfVxuXG4gICAgZmluZExhc3RPcHRpb25JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmZpbmRMYXN0SW5kZXgodGhpcy52aXNpYmxlT3B0aW9ucygpLCAob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRPcHRpb24ob3B0aW9uKSk7XG4gICAgfVxuXG4gICAgc2VhcmNoT3B0aW9ucyhldmVudCwgY2hhcikge1xuICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gKHRoaXMuc2VhcmNoVmFsdWUgfHwgJycpICsgY2hhcjtcblxuICAgICAgICBsZXQgb3B0aW9uSW5kZXggPSAtMTtcbiAgICAgICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIG9wdGlvbkluZGV4ID0gdGhpcy52aXNpYmxlT3B0aW9ucygpXG4gICAgICAgICAgICAgICAgLnNsaWNlKHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkpXG4gICAgICAgICAgICAgICAgLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzT3B0aW9uTWF0Y2hlZChvcHRpb24pKTtcbiAgICAgICAgICAgIG9wdGlvbkluZGV4ID1cbiAgICAgICAgICAgICAgICBvcHRpb25JbmRleCA9PT0gLTFcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnZpc2libGVPcHRpb25zKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kSW5kZXgoKG9wdGlvbikgPT4gdGhpcy5pc09wdGlvbk1hdGNoZWQob3B0aW9uKSlcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25JbmRleCArIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25JbmRleCA9IHRoaXMudmlzaWJsZU9wdGlvbnMoKS5maW5kSW5kZXgoKG9wdGlvbikgPT4gdGhpcy5pc09wdGlvbk1hdGNoZWQob3B0aW9uKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25JbmRleCA9PT0gLTEgJiYgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIG9wdGlvbkluZGV4ID0gdGhpcy5maW5kRmlyc3RGb2N1c2VkT3B0aW9uSW5kZXgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCBvcHRpb25JbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zZWFyY2hUaW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICByZXR1cm4gbWF0Y2hlZDtcbiAgICB9XG5cbiAgICBhY3RpdmF0ZUZpbHRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzRmlsdGVyKCkgJiYgdGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRHcm91cHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvcHRncm91cCBvZiB0aGlzLm9wdGlvbnMgYXMgYW55W10pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkU3ViT3B0aW9ucyA9IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXIodGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKG9wdGdyb3VwKSwgdGhpcy5zZWFyY2hGaWVsZHMoKSwgdGhpcy5maWx0ZXJWYWx1ZSwgdGhpcy5maWx0ZXJNYXRjaE1vZGUsIHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkU3ViT3B0aW9ucyAmJiBmaWx0ZXJlZFN1Yk9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEdyb3Vwcy5wdXNoKHsgLi4ub3B0Z3JvdXAsIC4uLnsgW3RoaXMub3B0aW9uR3JvdXBDaGlsZHJlbl06IGZpbHRlcmVkU3ViT3B0aW9ucyB9IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRPcHRpb25zID0gZmlsdGVyZWRHcm91cHM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXIodGhpcy5vcHRpb25zIGFzIGFueVtdLCB0aGlzLnNlYXJjaEZpZWxkcygpLCB0aGlzLmZpbHRlclZhbHVlLCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRPcHRpb25zID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0ZvY3VzYWJsZUVsZW1lbnRzKCkge1xuICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5nZXRGb2N1c2FibGVFbGVtZW50cyh0aGlzLm92ZXJsYXlWaWV3Q2hpbGQub3ZlcmxheVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnOm5vdChbZGF0YS1wLWhpZGRlbi1mb2N1c2FibGU9XCJ0cnVlXCJdKScpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgaGFzRmlsdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyVmFsdWUoKSAmJiB0aGlzLl9maWx0ZXJWYWx1ZSgpLnRyaW0oKS5sZW5ndGggPiAwO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBTaGFyZWRNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFJpcHBsZU1vZHVsZSwgU2Nyb2xsZXJNb2R1bGUsIEF1dG9Gb2N1c01vZHVsZSwgQ2hlY2tJY29uLCBTZWFyY2hJY29uLCBUaW1lc0NpcmNsZUljb24sIFRpbWVzSWNvbiwgQ2hldnJvbkRvd25JY29uLCBDaGVja0ljb24sIE1pbnVzSWNvbl0sXG4gICAgZXhwb3J0czogW011bHRpU2VsZWN0LCBPdmVybGF5TW9kdWxlLCBTaGFyZWRNb2R1bGUsIFNjcm9sbGVyTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNdWx0aVNlbGVjdCwgTXVsdGlTZWxlY3RJdGVtXVxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdE1vZHVsZSB7fVxuIl19