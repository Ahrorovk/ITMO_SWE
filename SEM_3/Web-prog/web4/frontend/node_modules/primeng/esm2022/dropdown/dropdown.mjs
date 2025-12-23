import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ContentChildren, effect, EventEmitter, forwardRef, Input, NgModule, numberAttribute, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { DomHandler } from 'primeng/dom';
import { OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { ScrollerModule } from 'primeng/scroller';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { TimesIcon } from 'primeng/icons/times';
import { CheckIcon } from 'primeng/icons/check';
import { BlankIcon } from 'primeng/icons/blank';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { SearchIcon } from 'primeng/icons/search';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
import * as i3 from "primeng/api";
import * as i4 from "primeng/overlay";
import * as i5 from "primeng/tooltip";
import * as i6 from "primeng/scroller";
import * as i7 from "primeng/autofocus";
export const DROPDOWN_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Dropdown),
    multi: true
};
export class DropdownItem {
    id;
    option;
    selected;
    focused;
    label;
    disabled;
    visible;
    itemSize;
    ariaPosInset;
    ariaSetSize;
    template;
    checkmark;
    onClick = new EventEmitter();
    onMouseEnter = new EventEmitter();
    ngOnInit() { }
    onOptionClick(event) {
        this.onClick.emit(event);
    }
    onOptionMouseEnter(event) {
        this.onMouseEnter.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: DropdownItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: DropdownItem, selector: "p-dropdownItem", inputs: { id: "id", option: "option", selected: ["selected", "selected", booleanAttribute], focused: ["focused", "focused", booleanAttribute], label: "label", disabled: ["disabled", "disabled", booleanAttribute], visible: ["visible", "visible", booleanAttribute], itemSize: ["itemSize", "itemSize", numberAttribute], ariaPosInset: "ariaPosInset", ariaSetSize: "ariaSetSize", template: "template", checkmark: ["checkmark", "checkmark", booleanAttribute] }, outputs: { onClick: "onClick", onMouseEnter: "onMouseEnter" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <li
            [id]="id"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
            role="option"
            pRipple
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-disabled]="disabled"
            [ngStyle]="{ height: itemSize + 'px' }"
            [ngClass]="{ 'p-dropdown-item': true, 'p-highlight': selected, 'p-disabled': disabled, 'p-focus': focused }"
        >
            <ng-container *ngIf="checkmark">
                <CheckIcon *ngIf="selected" [styleClass]="'p-dropdown-check-icon'" />
                <BlankIcon *ngIf="!selected" [styleClass]="'p-dropdown-blank-icon'" />
            </ng-container>
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => BlankIcon), selector: "BlankIcon" }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: DropdownItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-dropdownItem',
                    template: `
        <li
            [id]="id"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
            role="option"
            pRipple
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-disabled]="disabled"
            [ngStyle]="{ height: itemSize + 'px' }"
            [ngClass]="{ 'p-dropdown-item': true, 'p-highlight': selected, 'p-disabled': disabled, 'p-focus': focused }"
        >
            <ng-container *ngIf="checkmark">
                <CheckIcon *ngIf="selected" [styleClass]="'p-dropdown-check-icon'" />
                <BlankIcon *ngIf="!selected" [styleClass]="'p-dropdown-blank-icon'" />
            </ng-container>
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], propDecorators: { id: [{
                type: Input
            }], option: [{
                type: Input
            }], selected: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], focused: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], visible: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], itemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], ariaPosInset: [{
                type: Input
            }], ariaSetSize: [{
                type: Input
            }], template: [{
                type: Input
            }], checkmark: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], onClick: [{
                type: Output
            }], onMouseEnter: [{
                type: Output
            }] } });
/**
 * Dropdown also known as Select, is used to choose an item from a collection of options.
 * @group Components
 */
export class Dropdown {
    el;
    renderer;
    cd;
    zone;
    filterService;
    config;
    /**
     * Unique identifier of the component
     * @group Props
     */
    id;
    /**
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight = '200px';
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @group Props
     */
    filter;
    /**
     * Name of the input element.
     * @group Props
     */
    name;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Inline style of the overlay panel element.
     * @group Props
     */
    panelStyle;
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    panelStyleClass;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    readonly;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    required;
    /**
     * When present, custom value instead of predefined options can be entered using the editable input field.
     * @group Props
     */
    editable;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Default text to display when no option is selected.
     * @group Props
     */
    set placeholder(val) {
        this._placeholder.set(val);
    }
    get placeholder() {
        return this._placeholder.asReadonly();
    }
    /**
     * Icon to display in loading state.
     * @group Props
     */
    loadingIcon;
    /**
     * Placeholder text to show when filter input is empty.
     * @group Props
     */
    filterPlaceholder;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant = 'outlined';
    /**
     * Identifier of the accessible input element.
     * @group Props
     */
    inputId;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy;
    /**
     * Fields used when filtering the options, defaults to optionLabel.
     * @group Props
     */
    filterFields;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * Clears the filter value when hiding the dropdown.
     * @group Props
     */
    resetFilterOnHide = false;
    /**
     * Whether the selected option will be shown with a check mark.
     * @group Props
     */
    checkmark = false;
    /**
     * Icon class of the dropdown icon.
     * @group Props
     */
    dropdownIcon;
    /**
     * Whether the dropdown is in loading state.
     * @group Props
     */
    loading = false;
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
     * Whether to display the first item as the label if no placeholder is defined and value is null.
     * @deprecated since v17.3.0, set initial value by model instead.
     * @group Props
     */
    autoDisplayFirst = true;
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    group;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear;
    /**
     * Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyFilterMessage = '';
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage = '';
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
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    virtualScrollItemSize;
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
     * Used to define a aria label attribute the current element.
     * @group Props
     */
    ariaLabel;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode = 'contains';
    /**
     * Maximum number of character allows in the editable input field.
     * @group Props
     */
    maxlength;
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
     * Fields used when filtering the options, defaults to optionLabel.
     * @group Props
     */
    focusOnHover = false;
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
     * Applies focus to the filter element when the overlay is shown.
     * @group Props
     */
    autofocusFilter = true;
    /**
     * Determines if the panel will be shown when the input is focused and receives a character key down event.
     * @group Props
     */
    autoShowPanelOnPrintableCharacterKeyDown = true;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(_disabled) {
        if (_disabled) {
            this.focused = false;
            if (this.overlayVisible)
                this.hide();
        }
        this._disabled = _disabled;
        if (!this.cd.destroyed) {
            this.cd.detectChanges();
        }
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
    _itemSize;
    /**
     * Whether to automatically manage layering.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get autoZIndex() {
        return this._autoZIndex;
    }
    set autoZIndex(val) {
        this._autoZIndex = val;
        console.warn('The autoZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    _autoZIndex;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get baseZIndex() {
        return this._baseZIndex;
    }
    set baseZIndex(val) {
        this._baseZIndex = val;
        console.warn('The baseZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    _baseZIndex;
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
    _showTransitionOptions;
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
    _hideTransitionOptions;
    /**
     * When specified, filter displays with this value.
     * @group Props
     */
    get filterValue() {
        return this._filterValue();
    }
    set filterValue(val) {
        setTimeout(() => {
            this._filterValue.set(val);
        });
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
        if (!ObjectUtils.deepEquals(val, this._options())) {
            this._options.set(val);
        }
    }
    /**
     * Callback to invoke when value of dropdown changes.
     * @param {DropdownChangeEvent} event - custom change event.
     * @group Emits
     */
    onChange = new EventEmitter();
    /**
     * Callback to invoke when data is filtered.
     * @param {DropdownFilterEvent} event - custom filter event.
     * @group Emits
     */
    onFilter = new EventEmitter();
    /**
     * Callback to invoke when dropdown gets focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when dropdown loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    /**
     * Callback to invoke when component is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onClick = new EventEmitter();
    /**
     * Callback to invoke when dropdown overlay gets visible.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Callback to invoke when dropdown overlay gets hidden.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    onHide = new EventEmitter();
    /**
     * Callback to invoke when dropdown clears the value.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {DropdownLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    containerViewChild;
    filterViewChild;
    focusInputViewChild;
    editableInputViewChild;
    itemsViewChild;
    scroller;
    overlayViewChild;
    firstHiddenFocusableElementOnOverlay;
    lastHiddenFocusableElementOnOverlay;
    templates;
    _disabled;
    itemsWrapper;
    itemTemplate;
    groupTemplate;
    loaderTemplate;
    selectedItemTemplate;
    headerTemplate;
    filterTemplate;
    footerTemplate;
    emptyFilterTemplate;
    emptyTemplate;
    dropdownIconTemplate;
    loadingIconTemplate;
    clearIconTemplate;
    filterIconTemplate;
    filterOptions;
    _options = signal(null);
    _placeholder = signal(undefined);
    modelValue = signal(null);
    value;
    onModelChange = () => { };
    onModelTouched = () => { };
    hover;
    focused;
    overlayVisible;
    optionsChanged;
    panel;
    dimensionsUpdated;
    hoveredItem;
    selectedOptionUpdated;
    _filterValue = signal(null);
    searchValue;
    searchIndex;
    searchTimeout;
    previousSearchChar;
    currentSearchChar;
    preventModelTouched;
    focusedOptionIndex = signal(-1);
    labelId;
    listId;
    clicked = signal(false);
    get emptyMessageLabel() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    get emptyFilterMessageLabel() {
        return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
    }
    get isVisibleClearIcon() {
        return this.modelValue() != null && this.hasSelectedOption() && this.showClear && !this.disabled;
    }
    get listLabel() {
        return this.config.getTranslation(TranslationKeys.ARIA)['listLabel'];
    }
    get containerClass() {
        return {
            'p-dropdown p-component p-inputwrapper': true,
            'p-disabled': this.disabled,
            'p-dropdown-clearable': this.showClear && !this.disabled,
            'p-focus': this.focused,
            'p-inputwrapper-filled': this.modelValue() !== undefined && this.modelValue() !== null && !this.modelValue().length,
            'p-inputwrapper-focus': this.focused || this.overlayVisible,
            'p-variant-filled': this.variant === 'filled' || this.config.inputStyle() === 'filled',
            'p-dropdown-open': this.overlayVisible
        };
    }
    get inputClass() {
        const label = this.label();
        return {
            'p-dropdown-label p-inputtext': true,
            'p-placeholder': this.placeholder() && label === this.placeholder(),
            'p-dropdown-label-empty': !this.editable && !this.selectedItemTemplate && (label === undefined || label === null || label === 'p-emptylabel' || label.length === 0)
        };
    }
    get panelClass() {
        return {
            'p-dropdown-panel p-component': true,
            'p-input-filled': this.config.inputStyle() === 'filled',
            'p-ripple-disabled': this.config.ripple === false
        };
    }
    get focusedOptionId() {
        return this.focusedOptionIndex() !== -1 ? `${this.id}_${this.focusedOptionIndex()}` : null;
    }
    visibleOptions = computed(() => {
        const options = this.getAllVisibleAndNonVisibleOptions();
        if (this._filterValue()) {
            const _filterBy = this.filterBy || this.optionLabel;
            const filteredOptions = !_filterBy && !this.filterFields && !this.optionValue
                ? this.options.filter((option) => {
                    if (option.label) {
                        return option.label.toString().toLowerCase().indexOf(this._filterValue().toLowerCase().trim()) !== -1;
                    }
                    return option.toString().toLowerCase().indexOf(this._filterValue().toLowerCase().trim()) !== -1;
                })
                : this.filterService.filter(options, this.searchFields(), this._filterValue().trim(), this.filterMatchMode, this.filterLocale);
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
        // use  getAllVisibleAndNonVisibleOptions verses just visible options
        // this will find the selected option whether or not the user is currently filtering  because the filtered (i.e. visible) options, are a subset of all the options
        const options = this.getAllVisibleAndNonVisibleOptions();
        // use isOptionEqualsModelValue for the use case where the dropdown is initalized with a disabled option
        const selectedOptionIndex = options.findIndex((option) => this.isOptionValueEqualsModelValue(option));
        return selectedOptionIndex !== -1 ? this.getOptionLabel(options[selectedOptionIndex]) : this.placeholder() || 'p-emptylabel';
    });
    filled = computed(() => {
        if (typeof this.modelValue() === 'string')
            return !!this.modelValue();
        const options = this.getAllVisibleAndNonVisibleOptions();
        const isOptionSelected = options.findIndex((option) => this.isOptionValueEqualsModelValue(option)) !== -1;
        return this.label() !== 'p-emptylabel' && isOptionSelected;
    });
    selectedOption;
    editableInputValue = computed(() => this.getOptionLabel(this.selectedOption) || this.modelValue() || '');
    constructor(el, renderer, cd, zone, filterService, config) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.filterService = filterService;
        this.config = config;
        effect(() => {
            const modelValue = this.modelValue();
            const visibleOptions = this.visibleOptions();
            if (visibleOptions && ObjectUtils.isNotEmpty(visibleOptions)) {
                const selectedOptionIndex = this.findSelectedOptionIndex();
                if (selectedOptionIndex !== -1 || modelValue === undefined || (typeof modelValue === 'string' && modelValue.length === 0) || this.isModelValueNotSet() || this.editable) {
                    this.selectedOption = visibleOptions[selectedOptionIndex];
                }
            }
            if (ObjectUtils.isEmpty(visibleOptions) && (modelValue === undefined || this.isModelValueNotSet()) && ObjectUtils.isNotEmpty(this.selectedOption)) {
                this.selectedOption = null;
            }
            if (modelValue !== undefined && this.editable) {
                this.updateEditableLabel();
            }
            this.cd.markForCheck();
        });
    }
    isModelValueNotSet() {
        return this.modelValue() === null && !this.isOptionValueEqualsModelValue(this.selectedOption);
    }
    getAllVisibleAndNonVisibleOptions() {
        return this.group ? this.flatOptions(this.options) : this.options || [];
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
    ngAfterViewChecked() {
        if (this.optionsChanged && this.overlayVisible) {
            this.optionsChanged = false;
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    if (this.overlayViewChild) {
                        this.overlayViewChild.alignOverlay();
                    }
                }, 1);
            });
        }
        if (this.selectedOptionUpdated && this.itemsWrapper) {
            let selectedItem = DomHandler.findSingle(this.overlayViewChild?.overlayViewChild?.nativeElement, 'li.p-highlight');
            if (selectedItem) {
                DomHandler.scrollInView(this.itemsWrapper, selectedItem);
            }
            this.selectedOptionUpdated = false;
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'filter':
                    this.filterTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'emptyfilter':
                    this.emptyFilterTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
                    break;
                case 'group':
                    this.groupTemplate = item.template;
                    break;
                case 'loader':
                    this.loaderTemplate = item.template;
                    break;
                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
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
            this.onOptionSelect(null, this.visibleOptions()[this.focusedOptionIndex()], false);
        }
        if (this.autoDisplayFirst && (this.modelValue() === null || this.modelValue() === undefined)) {
            if (!this.placeholder()) {
                const ind = this.findFirstOptionIndex();
                this.onOptionSelect(null, this.visibleOptions()[ind], false, true);
            }
        }
    }
    onOptionSelect(event, option, isHide = true, preventChange = false) {
        if (!this.isSelected(option)) {
            const value = this.getOptionValue(option);
            this.updateModel(value, event);
            this.focusedOptionIndex.set(this.findSelectedOptionIndex());
            preventChange === false && this.onChange.emit({ originalEvent: event, value: value });
        }
        if (isHide) {
            this.hide(true);
        }
    }
    onOptionMouseEnter(event, index) {
        if (this.focusOnHover) {
            this.changeFocusedOptionIndex(event, index);
        }
    }
    updateModel(value, event) {
        this.value = value;
        this.onModelChange(value);
        this.modelValue.set(value);
        this.selectedOptionUpdated = true;
    }
    writeValue(value, emitEvent = true) {
        if (this.filter) {
            this.resetFilter();
        }
        this.value = value;
        if (emitEvent && this.allowModelChange()) {
            this.onModelChange(value);
        }
        this.modelValue.set(this.value);
        this.updateEditableLabel();
        this.cd.markForCheck();
    }
    allowModelChange() {
        return this.autoDisplayFirst && !this.placeholder() && (this.modelValue() === undefined || this.modelValue() === null) && !this.editable && this.options && this.options.length;
    }
    isSelectedOptionEmpty() {
        return ObjectUtils.isEmpty(this.selectedOption);
    }
    isSelected(option) {
        return this.isValidOption(option) && this.isOptionValueEqualsModelValue(option);
    }
    isOptionValueEqualsModelValue(option) {
        return ObjectUtils.equals(this.modelValue(), this.getOptionValue(option), this.equalityKey());
    }
    ngAfterViewInit() {
        if (this.editable) {
            this.updateEditableLabel();
        }
        this.updatePlaceHolderForFloatingLabel();
    }
    updatePlaceHolderForFloatingLabel() {
        if (this._placeholder() !== null && this._placeholder() !== undefined) {
            // We don't want to overwrite the placeholder if it's already set
            return;
        }
        const parentElement = this.el.nativeElement.parentElement;
        const isInFloatingLabel = parentElement?.classList.contains('p-float-label');
        if (parentElement && isInFloatingLabel && !this.selectedOption) {
            const label = parentElement.querySelector('label');
            if (label) {
                this._placeholder.set(label.textContent);
            }
        }
    }
    updateEditableLabel() {
        if (this.editableInputViewChild) {
            this.editableInputViewChild.nativeElement.value = this.getOptionLabel(this.selectedOption) || this.modelValue() || '';
        }
    }
    clearEditableLabel() {
        if (this.editableInputViewChild) {
            this.editableInputViewChild.nativeElement.value = '';
        }
    }
    getOptionIndex(index, scrollerOptions) {
        return this.virtualScrollerDisabled ? index : scrollerOptions && scrollerOptions.getItemOptions(index)['index'];
    }
    getOptionLabel(option) {
        return this.optionLabel !== undefined && this.optionLabel !== null ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option && option.label !== undefined ? option.label : option;
    }
    getOptionValue(option) {
        return this.optionValue && this.optionValue !== null ? ObjectUtils.resolveFieldData(option, this.optionValue) : !this.optionLabel && option && option.value !== undefined ? option.value : option;
    }
    isOptionDisabled(option) {
        if (this.getOptionValue(this.modelValue()) === this.getOptionValue(option) || (this.getOptionLabel(this.modelValue() === this.getOptionLabel(option)) && option.disabled === false)) {
            return false;
        }
        else {
            return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== undefined ? option.disabled : false;
        }
    }
    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel !== undefined && this.optionGroupLabel !== null ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label !== undefined ? optionGroup.label : optionGroup;
    }
    getOptionGroupChildren(optionGroup) {
        return this.optionGroupChildren !== undefined && this.optionGroupChildren !== null ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
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
    /**
     * Callback to invoke on filter reset.
     * @group Method
     */
    resetFilter() {
        this._filterValue.set(null);
        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }
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
    onContainerClick(event) {
        if (this.disabled || this.readonly || this.loading) {
            return;
        }
        this.focusInputViewChild?.nativeElement.focus({ preventScroll: true });
        if (event.target.tagName === 'INPUT' || event.target.getAttribute('data-pc-section') === 'clearicon' || event.target.closest('[data-pc-section="clearicon"]')) {
            return;
        }
        else if (!this.overlayViewChild || !this.overlayViewChild.el.nativeElement.contains(event.target)) {
            this.overlayVisible ? this.hide(true) : this.show(true);
        }
        this.onClick.emit(event);
        this.clicked.set(true);
        this.cd.detectChanges();
    }
    isEmpty() {
        return !this._options() || (this.visibleOptions() && this.visibleOptions().length === 0);
    }
    onEditableInput(event) {
        const value = event.target.value;
        this.searchValue = '';
        const matched = this.searchOptions(event, value);
        !matched && this.focusedOptionIndex.set(-1);
        this.onModelChange(value);
        this.updateModel(value, event);
        setTimeout(() => {
            this.onChange.emit({ originalEvent: event, value: value });
        }, 1);
        !this.overlayVisible && ObjectUtils.isNotEmpty(value) && this.show();
    }
    /**
     * Displays the panel.
     * @group Method
     */
    show(isFocus) {
        this.overlayVisible = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.editable ? -1 : this.findSelectedOptionIndex();
        this.focusedOptionIndex.set(focusedOptionIndex);
        if (isFocus) {
            DomHandler.focus(this.focusInputViewChild?.nativeElement);
        }
        this.cd.markForCheck();
    }
    onOverlayAnimationStart(event) {
        if (event.toState === 'visible') {
            this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild?.overlayViewChild?.nativeElement, this.virtualScroll ? '.p-scroller' : '.p-dropdown-items-wrapper');
            this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);
            if (this.options && this.options.length) {
                if (this.virtualScroll) {
                    const selectedIndex = this.modelValue() ? this.focusedOptionIndex() : -1;
                    if (selectedIndex !== -1) {
                        this.scroller?.scrollToIndex(selectedIndex);
                    }
                }
                else {
                    let selectedListItem = DomHandler.findSingle(this.itemsWrapper, '.p-dropdown-item.p-highlight');
                    if (selectedListItem) {
                        selectedListItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                    }
                }
            }
            if (this.filterViewChild && this.filterViewChild.nativeElement) {
                this.preventModelTouched = true;
                if (this.autofocusFilter && !this.editable) {
                    this.filterViewChild.nativeElement.focus();
                }
            }
            this.onShow.emit(event);
        }
        if (event.toState === 'void') {
            this.itemsWrapper = null;
            this.onModelTouched();
            this.onHide.emit(event);
        }
    }
    /**
     * Hides the panel.
     * @group Method
     */
    hide(isFocus) {
        this.overlayVisible = false;
        this.focusedOptionIndex.set(-1);
        this.clicked.set(false);
        this.searchValue = '';
        if (this.overlayOptions?.mode === 'modal') {
            DomHandler.unblockBodyScroll();
        }
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
        if (isFocus) {
            if (this.focusInputViewChild) {
                setTimeout(() => {
                    DomHandler.focus(this.focusInputViewChild?.nativeElement);
                });
            }
            if (this.editable && this.editableInputViewChild) {
                setTimeout(() => {
                    DomHandler.focus(this.editableInputViewChild?.nativeElement);
                });
            }
        }
        this.cd.markForCheck();
    }
    onInputFocus(event) {
        if (this.disabled) {
            // For ScreenReaders
            return;
        }
        this.focused = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        this.overlayVisible && this.scrollInView(this.focusedOptionIndex());
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focused = false;
        this.onBlur.emit(event);
        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }
    onMouseDown(event) {
        event.preventDefault();
    }
    onKeyDown(event, search) {
        if (this.disabled || this.readonly || this.loading) {
            return;
        }
        switch (event.code) {
            //down
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            //up
            case 'ArrowUp':
                this.onArrowUpKey(event, this.editable);
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                this.onArrowLeftKey(event, this.editable);
                break;
            case 'Delete':
                this.onDeleteKey(event);
                break;
            case 'Home':
                this.onHomeKey(event, this.editable);
                break;
            case 'End':
                this.onEndKey(event, this.editable);
                break;
            case 'PageDown':
                this.onPageDownKey(event);
                break;
            case 'PageUp':
                this.onPageUpKey(event);
                break;
            //space
            case 'Space':
                this.onSpaceKey(event, search);
                break;
            //enter
            case 'Enter':
            case 'NumpadEnter':
                this.onEnterKey(event);
                break;
            //escape and tab
            case 'Escape':
                this.onEscapeKey(event);
                break;
            case 'Tab':
                this.onTabKey(event);
                break;
            case 'Backspace':
                this.onBackspaceKey(event, this.editable);
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;
            default:
                if (!event.metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    !this.overlayVisible && this.autoShowPanelOnPrintableCharacterKeyDown && this.show();
                    !this.editable && this.searchOptions(event, event.key);
                }
                break;
        }
        this.clicked.set(false);
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
                this.onEnterKey(event, true);
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
    onFilterBlur(event) {
        this.focusedOptionIndex.set(-1);
    }
    onArrowDownKey(event) {
        if (!this.overlayVisible) {
            this.show();
            this.editable && this.changeFocusedOptionIndex(event, this.findSelectedOptionIndex());
        }
        else {
            const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.clicked() ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();
            this.changeFocusedOptionIndex(event, optionIndex);
        }
        // const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();
        // this.changeFocusedOptionIndex(event, optionIndex);
        // !this.overlayVisible && this.show();
        event.preventDefault();
        event.stopPropagation();
    }
    changeFocusedOptionIndex(event, index) {
        if (this.focusedOptionIndex() !== index) {
            this.focusedOptionIndex.set(index);
            this.scrollInView();
            if (this.selectOnFocus) {
                const option = this.visibleOptions()[index];
                this.onOptionSelect(event, option, false);
            }
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
    hasSelectedOption() {
        return this.modelValue() !== undefined;
    }
    isValidSelectedOption(option) {
        return this.isValidOption(option) && this.isSelected(option);
    }
    equalityKey() {
        return this.optionValue ? null : this.dataKey;
    }
    findFirstFocusedOptionIndex() {
        const selectedIndex = this.findSelectedOptionIndex();
        return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    }
    findFirstOptionIndex() {
        return this.visibleOptions().findIndex((option) => this.isValidOption(option));
    }
    findSelectedOptionIndex() {
        return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
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
    findLastOptionIndex() {
        return ObjectUtils.findLastIndex(this.visibleOptions(), (option) => this.isValidOption(option));
    }
    findLastFocusedOptionIndex() {
        const selectedIndex = this.findSelectedOptionIndex();
        return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    }
    isValidOption(option) {
        return option !== undefined && option !== null && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    }
    isOptionGroup(option) {
        return this.optionGroupLabel !== undefined && this.optionGroupLabel !== null && option.optionGroup !== undefined && option.optionGroup !== null && option.group;
    }
    onArrowUpKey(event, pressedInInputText = false) {
        if (event.altKey && !pressedInInputText) {
            if (this.focusedOptionIndex() !== -1) {
                const option = this.visibleOptions()[this.focusedOptionIndex()];
                this.onOptionSelect(event, option);
            }
            this.overlayVisible && this.hide();
        }
        else {
            const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.clicked() ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();
            this.changeFocusedOptionIndex(event, optionIndex);
            !this.overlayVisible && this.show();
        }
        event.preventDefault();
        event.stopPropagation();
    }
    onArrowLeftKey(event, pressedInInputText = false) {
        pressedInInputText && this.focusedOptionIndex.set(-1);
    }
    onDeleteKey(event) {
        if (this.showClear) {
            this.clear(event);
            event.preventDefault();
        }
    }
    onHomeKey(event, pressedInInputText = false) {
        if (pressedInInputText) {
            const target = event.currentTarget;
            if (event.shiftKey) {
                target.setSelectionRange(0, target.value.length);
            }
            else {
                target.setSelectionRange(0, 0);
                this.focusedOptionIndex.set(-1);
            }
        }
        else {
            this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());
            !this.overlayVisible && this.show();
        }
        event.preventDefault();
    }
    onEndKey(event, pressedInInputText = false) {
        if (pressedInInputText) {
            const target = event.currentTarget;
            if (event.shiftKey) {
                target.setSelectionRange(0, target.value.length);
            }
            else {
                const len = target.value.length;
                target.setSelectionRange(len, len);
                this.focusedOptionIndex.set(-1);
            }
        }
        else {
            this.changeFocusedOptionIndex(event, this.findLastOptionIndex());
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
    onSpaceKey(event, pressedInInputText = false) {
        !this.editable && !pressedInInputText && this.onEnterKey(event);
    }
    onEnterKey(event, pressedInInput = false) {
        if (!this.overlayVisible) {
            this.focusedOptionIndex.set(-1);
            this.onArrowDownKey(event);
        }
        else {
            if (this.focusedOptionIndex() !== -1) {
                const option = this.visibleOptions()[this.focusedOptionIndex()];
                this.onOptionSelect(event, option);
            }
            !pressedInInput && this.hide();
        }
        event.preventDefault();
    }
    onEscapeKey(event) {
        this.overlayVisible && this.hide(true);
        event.preventDefault();
    }
    onTabKey(event, pressedInInputText = false) {
        if (!pressedInInputText) {
            if (this.overlayVisible && this.hasFocusableElements()) {
                DomHandler.focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay.nativeElement : this.firstHiddenFocusableElementOnOverlay.nativeElement);
                event.preventDefault();
            }
            else {
                if (this.focusedOptionIndex() !== -1 && this.overlayVisible) {
                    const option = this.visibleOptions()[this.focusedOptionIndex()];
                    this.onOptionSelect(event, option);
                }
                this.overlayVisible && this.hide(this.filter);
            }
        }
        event.stopPropagation();
    }
    onFirstHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement ? DomHandler.getFirstFocusableElement(this.overlayViewChild.el?.nativeElement, ':not(.p-hidden-focusable)') : this.focusInputViewChild?.nativeElement;
        DomHandler.focus(focusableEl);
    }
    onLastHiddenFocus(event) {
        const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement
            ? DomHandler.getLastFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])')
            : this.focusInputViewChild?.nativeElement;
        DomHandler.focus(focusableEl);
    }
    hasFocusableElements() {
        return DomHandler.getFocusableElements(this.overlayViewChild.overlayViewChild.nativeElement, ':not([data-p-hidden-focusable="true"]):not([class="p-dropdown-items-wrapper"])').length > 0;
    }
    onBackspaceKey(event, pressedInInputText = false) {
        if (pressedInInputText) {
            !this.overlayVisible && this.show();
        }
    }
    searchFields() {
        return this.filterBy?.split(',') || this.filterFields || [this.optionLabel];
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
    isOptionMatched(option) {
        return this.isValidOption(option) && this.getOptionLabel(option).toString().toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
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
        this.cd.markForCheck();
    }
    applyFocus() {
        if (this.editable)
            DomHandler.findSingle(this.el.nativeElement, '.p-dropdown-label.p-inputtext').focus();
        else
            DomHandler.focus(this.focusInputViewChild?.nativeElement);
    }
    /**
     * Applies focus.
     * @group Method
     */
    focus() {
        this.applyFocus();
    }
    /**
     * Clears the model.
     * @group Method
     */
    clear(event) {
        this.updateModel(null, event);
        this.clearEditableLabel();
        this.onModelTouched();
        this.onChange.emit({ originalEvent: event, value: this.value });
        this.onClear.emit(event);
        this.resetFilter();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Dropdown, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i3.FilterService }, { token: i3.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: Dropdown, selector: "p-dropdown", inputs: { id: "id", scrollHeight: "scrollHeight", filter: ["filter", "filter", booleanAttribute], name: "name", style: "style", panelStyle: "panelStyle", styleClass: "styleClass", panelStyleClass: "panelStyleClass", readonly: ["readonly", "readonly", booleanAttribute], required: ["required", "required", booleanAttribute], editable: ["editable", "editable", booleanAttribute], appendTo: "appendTo", tabindex: ["tabindex", "tabindex", numberAttribute], placeholder: "placeholder", loadingIcon: "loadingIcon", filterPlaceholder: "filterPlaceholder", filterLocale: "filterLocale", variant: "variant", inputId: "inputId", dataKey: "dataKey", filterBy: "filterBy", filterFields: "filterFields", autofocus: ["autofocus", "autofocus", booleanAttribute], resetFilterOnHide: ["resetFilterOnHide", "resetFilterOnHide", booleanAttribute], checkmark: ["checkmark", "checkmark", booleanAttribute], dropdownIcon: "dropdownIcon", loading: ["loading", "loading", booleanAttribute], optionLabel: "optionLabel", optionValue: "optionValue", optionDisabled: "optionDisabled", optionGroupLabel: "optionGroupLabel", optionGroupChildren: "optionGroupChildren", autoDisplayFirst: ["autoDisplayFirst", "autoDisplayFirst", booleanAttribute], group: ["group", "group", booleanAttribute], showClear: ["showClear", "showClear", booleanAttribute], emptyFilterMessage: "emptyFilterMessage", emptyMessage: "emptyMessage", lazy: ["lazy", "lazy", booleanAttribute], virtualScroll: ["virtualScroll", "virtualScroll", booleanAttribute], virtualScrollItemSize: ["virtualScrollItemSize", "virtualScrollItemSize", numberAttribute], virtualScrollOptions: "virtualScrollOptions", overlayOptions: "overlayOptions", ariaFilterLabel: "ariaFilterLabel", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", filterMatchMode: "filterMatchMode", maxlength: ["maxlength", "maxlength", numberAttribute], tooltip: "tooltip", tooltipPosition: "tooltipPosition", tooltipPositionStyle: "tooltipPositionStyle", tooltipStyleClass: "tooltipStyleClass", focusOnHover: ["focusOnHover", "focusOnHover", booleanAttribute], selectOnFocus: ["selectOnFocus", "selectOnFocus", booleanAttribute], autoOptionFocus: ["autoOptionFocus", "autoOptionFocus", booleanAttribute], autofocusFilter: ["autofocusFilter", "autofocusFilter", booleanAttribute], autoShowPanelOnPrintableCharacterKeyDown: ["autoShowPanelOnPrintableCharacterKeyDown", "autoShowPanelOnPrintableCharacterKeyDown", booleanAttribute], disabled: "disabled", itemSize: "itemSize", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", filterValue: "filterValue", options: "options" }, outputs: { onChange: "onChange", onFilter: "onFilter", onFocus: "onFocus", onBlur: "onBlur", onClick: "onClick", onShow: "onShow", onHide: "onHide", onClear: "onClear", onLazyLoad: "onLazyLoad" }, host: { properties: { "class.p-inputwrapper-filled": "filled()", "class.p-inputwrapper-focus": "focused || overlayVisible" }, classAttribute: "p-element p-inputwrapper" }, providers: [DROPDOWN_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "filterViewChild", first: true, predicate: ["filter"], descendants: true }, { propertyName: "focusInputViewChild", first: true, predicate: ["focusInput"], descendants: true }, { propertyName: "editableInputViewChild", first: true, predicate: ["editableInput"], descendants: true }, { propertyName: "itemsViewChild", first: true, predicate: ["items"], descendants: true }, { propertyName: "scroller", first: true, predicate: ["scroller"], descendants: true }, { propertyName: "overlayViewChild", first: true, predicate: ["overlay"], descendants: true }, { propertyName: "firstHiddenFocusableElementOnOverlay", first: true, predicate: ["firstHiddenFocusableEl"], descendants: true }, { propertyName: "lastHiddenFocusableElementOnOverlay", first: true, predicate: ["lastHiddenFocusableEl"], descendants: true }], ngImport: i0, template: `
        <div #container [attr.id]="id" [ngClass]="containerClass" (click)="onContainerClick($event)" [ngStyle]="style" [class]="styleClass">
            <span
                #focusInput
                [ngClass]="inputClass"
                *ngIf="!editable"
                [pTooltip]="tooltip"
                [tooltipPosition]="tooltipPosition"
                [positionStyle]="tooltipPositionStyle"
                [tooltipStyleClass]="tooltipStyleClass"
                [attr.aria-disabled]="disabled"
                [attr.id]="inputId"
                role="combobox"
                [attr.aria-label]="ariaLabel || (label() === 'p-emptylabel' ? undefined : label())"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-haspopup]="'listbox'"
                [attr.aria-expanded]="overlayVisible ?? false"
                [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                [attr.tabindex]="!disabled ? tabindex : -1"
                pAutoFocus
                [autofocus]="autofocus"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
                [attr.aria-required]="required"
                [attr.required]="required"
            >
                <ng-container *ngIf="!selectedItemTemplate; else defaultPlaceholder">{{ label() === 'p-emptylabel' ? '&nbsp;' : label() }}</ng-container>
                <ng-container *ngIf="selectedItemTemplate && !isSelectedOptionEmpty()" [ngTemplateOutlet]="selectedItemTemplate" [ngTemplateOutletContext]="{ $implicit: selectedOption }"></ng-container>
                <ng-template #defaultPlaceholder>
                    <span *ngIf="isSelectedOptionEmpty()">{{ label() === 'p-emptylabel' ? '&nbsp;' : label() }}</span>
                </ng-template>
            </span>
            <input
                *ngIf="editable"
                #editableInput
                type="text"
                [attr.id]="inputId"
                [attr.maxlength]="maxlength"
                [ngClass]="inputClass"
                [disabled]="disabled"
                aria-haspopup="listbox"
                [attr.placeholder]="modelValue() === undefined || modelValue() === null ? placeholder() : undefined"
                [attr.aria-label]="ariaLabel || (label() === 'p-emptylabel' ? undefined : label())"
                (input)="onEditableInput($event)"
                (keydown)="onKeyDown($event)"
                pAutoFocus
                [autofocus]="autofocus"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
            />
            <ng-container *ngIf="isVisibleClearIcon">
                <TimesIcon [styleClass]="'p-dropdown-clear-icon'" (click)="clear($event)" *ngIf="!clearIconTemplate" [attr.data-pc-section]="'clearicon'" />
                <span class="p-dropdown-clear-icon" (click)="clear($event)" *ngIf="clearIconTemplate" [attr.data-pc-section]="'clearicon'">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>

            <div class="p-dropdown-trigger" role="button" aria-label="dropdown trigger" (mousedown)="onMouseDown($event)" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible ?? false" [attr.data-pc-section]="'trigger'">
                <ng-container *ngIf="loading; else elseBlock">
                    <ng-container *ngIf="loadingIconTemplate">
                        <ng-container *ngTemplateOutlet="loadingIconTemplate"></ng-container>
                    </ng-container>
                    <ng-container *ngIf="!loadingIconTemplate">
                        <span *ngIf="loadingIcon" [ngClass]="'p-dropdown-trigger-icon pi-spin ' + loadingIcon" aria-hidden="true"></span>
                        <span *ngIf="!loadingIcon" [class]="'p-dropdown-trigger-icon pi pi-spinner pi-spin'" aria-hidden="true"></span>
                    </ng-container>
                </ng-container>

                <ng-template #elseBlock>
                    <ng-container *ngIf="!dropdownIconTemplate">
                        <span class="p-dropdown-trigger-icon" *ngIf="dropdownIcon" [ngClass]="dropdownIcon"></span>
                        <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-dropdown-trigger-icon'" />
                    </ng-container>
                    <span *ngIf="dropdownIconTemplate" class="p-dropdown-trigger-icon">
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
                    <div [ngClass]="'p-dropdown-panel p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
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
                        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                        <div class="p-dropdown-header" *ngIf="filter" (click)="$event.stopPropagation()">
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div class="p-dropdown-filter-container">
                                    <input
                                        #filter
                                        type="text"
                                        role="searchbox"
                                        autocomplete="off"
                                        [value]="_filterValue() || ''"
                                        class="p-dropdown-filter p-inputtext p-component"
                                        [ngClass]="{ 'p-variant-filled': variant === 'filled' || config.inputStyle() === 'filled' }"
                                        [attr.placeholder]="filterPlaceholder"
                                        [attr.aria-owns]="id + '_list'"
                                        (input)="onFilterInputChange($event)"
                                        [attr.aria-label]="ariaFilterLabel"
                                        [attr.aria-activedescendant]="focusedOptionId"
                                        (keydown)="onFilterKeyDown($event)"
                                        (blur)="onFilterBlur($event)"
                                    />
                                    <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-dropdown-filter-icon'" />
                                    <span *ngIf="filterIconTemplate" class="p-dropdown-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                    </span>
                                </div>
                            </ng-template>
                        </div>
                        <div
                            class="p-dropdown-items-wrapper"
                            [ngStyle]="{
                                'max-height': virtualScroll ? 'auto' : scrollHeight || 'auto'
                            }"
                            tabindex="0"
                        >
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
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
                                <ul #items [attr.id]="id + '_list'" [attr.aria-label]="listLabel" class="p-dropdown-items" [ngClass]="scrollerOptions.contentStyleClass" [ngStyle]="scrollerOptions.contentStyle" role="listbox">
                                    <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                        <ng-container *ngIf="isOptionGroup(option)">
                                            <li class="p-dropdown-item-group" [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                            </li>
                                        </ng-container>
                                        <ng-container *ngIf="!isOptionGroup(option)">
                                            <p-dropdownItem
                                                [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                                [option]="option"
                                                [checkmark]="checkmark"
                                                [selected]="isSelected(option)"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                [template]="itemTemplate"
                                                [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                                [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                                [ariaSetSize]="ariaSetSize"
                                                (onClick)="onOptionSelect($event, option)"
                                                (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            ></p-dropdownItem>
                                        </ng-container>
                                    </ng-template>
                                    <li *ngIf="filterValue && isEmpty()" class="p-dropdown-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!filterValue && isEmpty()" class="p-dropdown-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
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
    `, isInline: true, styles: ["@layer primeng{.p-dropdown{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-dropdown-clear-icon{position:absolute;top:50%;margin-top:-.5rem}.p-dropdown-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-dropdown-label{display:block;white-space:nowrap;overflow:hidden;flex:1 1 auto;width:1%;text-overflow:ellipsis;cursor:pointer}.p-dropdown-label-empty{overflow:hidden;opacity:0}input.p-dropdown-label{cursor:default}.p-dropdown .p-dropdown-panel{min-width:100%}.p-dropdown-items-wrapper{overflow:auto}.p-dropdown-item{cursor:pointer;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-dropdown-item-group{cursor:auto}.p-dropdown-items{margin:0;padding:0;list-style-type:none}.p-dropdown-filter{width:100%}.p-dropdown-filter-container{position:relative}.p-dropdown-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-fluid .p-dropdown{display:flex}.p-fluid .p-dropdown .p-dropdown-label{width:1%}.p-float-label .p-dropdown .p-placeholder{opacity:0}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => i4.Overlay), selector: "p-overlay", inputs: ["visible", "mode", "style", "styleClass", "contentStyle", "contentStyleClass", "target", "appendTo", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "listener", "responsive", "options"], outputs: ["visibleChange", "onBeforeShow", "onShow", "onBeforeHide", "onHide", "onAnimationStart", "onAnimationDone"] }, { kind: "directive", type: i0.forwardRef(() => i3.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i5.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => i6.Scroller), selector: "p-scroller", inputs: ["id", "style", "styleClass", "tabindex", "items", "itemSize", "scrollHeight", "scrollWidth", "orientation", "step", "delay", "resizeDelay", "appendOnly", "inline", "lazy", "disabled", "loaderDisabled", "columns", "showSpacer", "showLoader", "numToleratedItems", "loading", "autoSize", "trackBy", "options"], outputs: ["onLazyLoad", "onScroll", "onScrollIndexChange"] }, { kind: "directive", type: i0.forwardRef(() => i7.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => SearchIcon), selector: "SearchIcon" }, { kind: "component", type: i0.forwardRef(() => DropdownItem), selector: "p-dropdownItem", inputs: ["id", "option", "selected", "focused", "label", "disabled", "visible", "itemSize", "ariaPosInset", "ariaSetSize", "template", "checkmark"], outputs: ["onClick", "onMouseEnter"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Dropdown, decorators: [{
            type: Component,
            args: [{ selector: 'p-dropdown', template: `
        <div #container [attr.id]="id" [ngClass]="containerClass" (click)="onContainerClick($event)" [ngStyle]="style" [class]="styleClass">
            <span
                #focusInput
                [ngClass]="inputClass"
                *ngIf="!editable"
                [pTooltip]="tooltip"
                [tooltipPosition]="tooltipPosition"
                [positionStyle]="tooltipPositionStyle"
                [tooltipStyleClass]="tooltipStyleClass"
                [attr.aria-disabled]="disabled"
                [attr.id]="inputId"
                role="combobox"
                [attr.aria-label]="ariaLabel || (label() === 'p-emptylabel' ? undefined : label())"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-haspopup]="'listbox'"
                [attr.aria-expanded]="overlayVisible ?? false"
                [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                [attr.tabindex]="!disabled ? tabindex : -1"
                pAutoFocus
                [autofocus]="autofocus"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (keydown)="onKeyDown($event)"
                [attr.aria-required]="required"
                [attr.required]="required"
            >
                <ng-container *ngIf="!selectedItemTemplate; else defaultPlaceholder">{{ label() === 'p-emptylabel' ? '&nbsp;' : label() }}</ng-container>
                <ng-container *ngIf="selectedItemTemplate && !isSelectedOptionEmpty()" [ngTemplateOutlet]="selectedItemTemplate" [ngTemplateOutletContext]="{ $implicit: selectedOption }"></ng-container>
                <ng-template #defaultPlaceholder>
                    <span *ngIf="isSelectedOptionEmpty()">{{ label() === 'p-emptylabel' ? '&nbsp;' : label() }}</span>
                </ng-template>
            </span>
            <input
                *ngIf="editable"
                #editableInput
                type="text"
                [attr.id]="inputId"
                [attr.maxlength]="maxlength"
                [ngClass]="inputClass"
                [disabled]="disabled"
                aria-haspopup="listbox"
                [attr.placeholder]="modelValue() === undefined || modelValue() === null ? placeholder() : undefined"
                [attr.aria-label]="ariaLabel || (label() === 'p-emptylabel' ? undefined : label())"
                (input)="onEditableInput($event)"
                (keydown)="onKeyDown($event)"
                pAutoFocus
                [autofocus]="autofocus"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
            />
            <ng-container *ngIf="isVisibleClearIcon">
                <TimesIcon [styleClass]="'p-dropdown-clear-icon'" (click)="clear($event)" *ngIf="!clearIconTemplate" [attr.data-pc-section]="'clearicon'" />
                <span class="p-dropdown-clear-icon" (click)="clear($event)" *ngIf="clearIconTemplate" [attr.data-pc-section]="'clearicon'">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>

            <div class="p-dropdown-trigger" role="button" aria-label="dropdown trigger" (mousedown)="onMouseDown($event)" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible ?? false" [attr.data-pc-section]="'trigger'">
                <ng-container *ngIf="loading; else elseBlock">
                    <ng-container *ngIf="loadingIconTemplate">
                        <ng-container *ngTemplateOutlet="loadingIconTemplate"></ng-container>
                    </ng-container>
                    <ng-container *ngIf="!loadingIconTemplate">
                        <span *ngIf="loadingIcon" [ngClass]="'p-dropdown-trigger-icon pi-spin ' + loadingIcon" aria-hidden="true"></span>
                        <span *ngIf="!loadingIcon" [class]="'p-dropdown-trigger-icon pi pi-spinner pi-spin'" aria-hidden="true"></span>
                    </ng-container>
                </ng-container>

                <ng-template #elseBlock>
                    <ng-container *ngIf="!dropdownIconTemplate">
                        <span class="p-dropdown-trigger-icon" *ngIf="dropdownIcon" [ngClass]="dropdownIcon"></span>
                        <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-dropdown-trigger-icon'" />
                    </ng-container>
                    <span *ngIf="dropdownIconTemplate" class="p-dropdown-trigger-icon">
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
                    <div [ngClass]="'p-dropdown-panel p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
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
                        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                        <div class="p-dropdown-header" *ngIf="filter" (click)="$event.stopPropagation()">
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div class="p-dropdown-filter-container">
                                    <input
                                        #filter
                                        type="text"
                                        role="searchbox"
                                        autocomplete="off"
                                        [value]="_filterValue() || ''"
                                        class="p-dropdown-filter p-inputtext p-component"
                                        [ngClass]="{ 'p-variant-filled': variant === 'filled' || config.inputStyle() === 'filled' }"
                                        [attr.placeholder]="filterPlaceholder"
                                        [attr.aria-owns]="id + '_list'"
                                        (input)="onFilterInputChange($event)"
                                        [attr.aria-label]="ariaFilterLabel"
                                        [attr.aria-activedescendant]="focusedOptionId"
                                        (keydown)="onFilterKeyDown($event)"
                                        (blur)="onFilterBlur($event)"
                                    />
                                    <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-dropdown-filter-icon'" />
                                    <span *ngIf="filterIconTemplate" class="p-dropdown-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                    </span>
                                </div>
                            </ng-template>
                        </div>
                        <div
                            class="p-dropdown-items-wrapper"
                            [ngStyle]="{
                                'max-height': virtualScroll ? 'auto' : scrollHeight || 'auto'
                            }"
                            tabindex="0"
                        >
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
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
                                <ul #items [attr.id]="id + '_list'" [attr.aria-label]="listLabel" class="p-dropdown-items" [ngClass]="scrollerOptions.contentStyleClass" [ngStyle]="scrollerOptions.contentStyle" role="listbox">
                                    <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                        <ng-container *ngIf="isOptionGroup(option)">
                                            <li class="p-dropdown-item-group" [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                            </li>
                                        </ng-container>
                                        <ng-container *ngIf="!isOptionGroup(option)">
                                            <p-dropdownItem
                                                [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                                [option]="option"
                                                [checkmark]="checkmark"
                                                [selected]="isSelected(option)"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                [template]="itemTemplate"
                                                [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                                [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                                [ariaSetSize]="ariaSetSize"
                                                (onClick)="onOptionSelect($event, option)"
                                                (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            ></p-dropdownItem>
                                        </ng-container>
                                    </ng-template>
                                    <li *ngIf="filterValue && isEmpty()" class="p-dropdown-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!filterValue && isEmpty()" class="p-dropdown-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
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
                        '[class.p-inputwrapper-filled]': 'filled()',
                        '[class.p-inputwrapper-focus]': 'focused || overlayVisible'
                    }, providers: [DROPDOWN_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.p-dropdown{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-dropdown-clear-icon{position:absolute;top:50%;margin-top:-.5rem}.p-dropdown-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-dropdown-label{display:block;white-space:nowrap;overflow:hidden;flex:1 1 auto;width:1%;text-overflow:ellipsis;cursor:pointer}.p-dropdown-label-empty{overflow:hidden;opacity:0}input.p-dropdown-label{cursor:default}.p-dropdown .p-dropdown-panel{min-width:100%}.p-dropdown-items-wrapper{overflow:auto}.p-dropdown-item{cursor:pointer;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-dropdown-item-group{cursor:auto}.p-dropdown-items{margin:0;padding:0;list-style-type:none}.p-dropdown-filter{width:100%}.p-dropdown-filter-container{position:relative}.p-dropdown-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-fluid .p-dropdown{display:flex}.p-fluid .p-dropdown .p-dropdown-label{width:1%}.p-float-label .p-dropdown .p-placeholder{opacity:0}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i3.FilterService }, { type: i3.PrimeNGConfig }], propDecorators: { id: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], filter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], name: [{
                type: Input
            }], style: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], required: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], editable: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], appendTo: [{
                type: Input
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], placeholder: [{
                type: Input
            }], loadingIcon: [{
                type: Input
            }], filterPlaceholder: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], variant: [{
                type: Input
            }], inputId: [{
                type: Input
            }], dataKey: [{
                type: Input
            }], filterBy: [{
                type: Input
            }], filterFields: [{
                type: Input
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], resetFilterOnHide: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], checkmark: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dropdownIcon: [{
                type: Input
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
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
            }], autoDisplayFirst: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], group: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], emptyFilterMessage: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], lazy: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualScroll: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], virtualScrollItemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], virtualScrollOptions: [{
                type: Input
            }], overlayOptions: [{
                type: Input
            }], ariaFilterLabel: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], filterMatchMode: [{
                type: Input
            }], maxlength: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], tooltip: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], tooltipPositionStyle: [{
                type: Input
            }], tooltipStyleClass: [{
                type: Input
            }], focusOnHover: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], selectOnFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoOptionFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autofocusFilter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoShowPanelOnPrintableCharacterKeyDown: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disabled: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], filterValue: [{
                type: Input
            }], options: [{
                type: Input
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
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onLazyLoad: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], filterViewChild: [{
                type: ViewChild,
                args: ['filter']
            }], focusInputViewChild: [{
                type: ViewChild,
                args: ['focusInput']
            }], editableInputViewChild: [{
                type: ViewChild,
                args: ['editableInput']
            }], itemsViewChild: [{
                type: ViewChild,
                args: ['items']
            }], scroller: [{
                type: ViewChild,
                args: ['scroller']
            }], overlayViewChild: [{
                type: ViewChild,
                args: ['overlay']
            }], firstHiddenFocusableElementOnOverlay: [{
                type: ViewChild,
                args: ['firstHiddenFocusableEl']
            }], lastHiddenFocusableElementOnOverlay: [{
                type: ViewChild,
                args: ['lastHiddenFocusableEl']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class DropdownModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: DropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: DropdownModule, declarations: [Dropdown, DropdownItem], imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, TimesIcon, ChevronDownIcon, SearchIcon, BlankIcon, CheckIcon], exports: [Dropdown, OverlayModule, SharedModule, ScrollerModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: DropdownModule, imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, TimesIcon, ChevronDownIcon, SearchIcon, BlankIcon, CheckIcon, OverlayModule, SharedModule, ScrollerModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: DropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, AutoFocusModule, TimesIcon, ChevronDownIcon, SearchIcon, BlankIcon, CheckIcon],
                    exports: [Dropdown, OverlayModule, SharedModule, ScrollerModule],
                    declarations: [Dropdown, DropdownItem]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFJSCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxRQUFRLEVBQ1IsZUFBZSxFQUNmLE1BQU0sRUFFTixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxRQUFRLEVBRVIsZUFBZSxFQUVmLE1BQU0sRUFJTixNQUFNLEVBR04sU0FBUyxFQUNULGlCQUFpQixFQUVwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFnRCxhQUFhLEVBQWMsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNySSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQVcsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBWSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFB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QkFBdUI7Z0JBRUYsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQXVtQ2xDLE1BQU0sT0FBTyxjQUFjO3VHQUFkLGNBQWM7d0dBQWQsY0FBYyxpQkE1akRkLFFBQVEsRUF6UlIsWUFBWSxhQWkxRFgsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLGFBeGpEdEssUUFBUSxFQXlqREcsYUFBYSxFQUFFLFlBQVksRUFBRSxjQUFjO3dHQUd0RCxjQUFjLFlBSmIsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQzNKLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBYzs7MkZBR3RELGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7b0JBQ2hMLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQztvQkFDaEUsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQztpQkFDekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgY29tcHV0ZWQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIGVmZmVjdCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE5nWm9uZSxcbiAgICBudW1iZXJBdHRyaWJ1dGUsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNpZ25hbCxcbiAgICBzaWduYWwsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgVmlld1JlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UsIE92ZXJsYXlPcHRpb25zLCBQcmltZU5HQ29uZmlnLCBQcmltZVRlbXBsYXRlLCBTZWxlY3RJdGVtLCBTaGFyZWRNb2R1bGUsIFRyYW5zbGF0aW9uS2V5cyB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEF1dG9Gb2N1c01vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXV0b2ZvY3VzJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9vdmVybGF5JztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFNjcm9sbGVyLCBTY3JvbGxlck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvc2Nyb2xsZXInO1xuaW1wb3J0IHsgU2Nyb2xsZXJPcHRpb25zIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XG5pbXBvcnQgeyBPYmplY3RVdGlscywgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgQ2hlY2tJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGVjayc7XG5pbXBvcnQgeyBCbGFua0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2JsYW5rJztcbmltcG9ydCB7IENoZXZyb25Eb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbmRvd24nO1xuaW1wb3J0IHsgU2VhcmNoSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc2VhcmNoJztcbmltcG9ydCB7IERyb3Bkb3duQ2hhbmdlRXZlbnQsIERyb3Bkb3duRmlsdGVyRXZlbnQsIERyb3Bkb3duRmlsdGVyT3B0aW9ucywgRHJvcGRvd25MYXp5TG9hZEV2ZW50IH0gZnJvbSAnLi9kcm9wZG93bi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuXG5leHBvcnQgY29uc3QgRFJPUERPV05fVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEcm9wZG93biksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1kcm9wZG93bkl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxsaVxuICAgICAgICAgICAgW2lkXT1cImlkXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib25PcHRpb25Nb3VzZUVudGVyKCRldmVudClcIlxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImxhYmVsXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtc2V0c2l6ZV09XCJhcmlhU2V0U2l6ZVwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXBvc2luc2V0XT1cImFyaWFQb3NJbnNldFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcC1mb2N1c2VkXT1cImZvY3VzZWRcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZ2hsaWdodF09XCJzZWxlY3RlZFwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXAtZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwieyBoZWlnaHQ6IGl0ZW1TaXplICsgJ3B4JyB9XCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZHJvcGRvd24taXRlbSc6IHRydWUsICdwLWhpZ2hsaWdodCc6IHNlbGVjdGVkLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkLCAncC1mb2N1cyc6IGZvY3VzZWQgfVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjaGVja21hcmtcIj5cbiAgICAgICAgICAgICAgICA8Q2hlY2tJY29uICpuZ0lmPVwic2VsZWN0ZWRcIiBbc3R5bGVDbGFzc109XCIncC1kcm9wZG93bi1jaGVjay1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPEJsYW5rSWNvbiAqbmdJZj1cIiFzZWxlY3RlZFwiIFtzdHlsZUNsYXNzXT1cIidwLWRyb3Bkb3duLWJsYW5rLWljb24nXCIgLz5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhdGVtcGxhdGVcIj57eyBsYWJlbCA/PyAnZW1wdHknIH19PC9zcGFuPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogb3B0aW9uIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9saT5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93bkl0ZW0ge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBvcHRpb246IFNlbGVjdEl0ZW0gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2VsZWN0ZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZm9jdXNlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgdmlzaWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGl0ZW1TaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBhcmlhUG9zSW5zZXQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFyaWFTZXRTaXplOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBjaGVja21hcms6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Nb3VzZUVudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIG5nT25Jbml0KCkge31cblxuICAgIG9uT3B0aW9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbk9wdGlvbk1vdXNlRW50ZXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25Nb3VzZUVudGVyLmVtaXQoZXZlbnQpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBEcm9wZG93biBhbHNvIGtub3duIGFzIFNlbGVjdCwgaXMgdXNlZCB0byBjaG9vc2UgYW4gaXRlbSBmcm9tIGEgY29sbGVjdGlvbiBvZiBvcHRpb25zLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWRyb3Bkb3duJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW2F0dHIuaWRdPVwiaWRcIiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzc1wiIChjbGljayk9XCJvbkNvbnRhaW5lckNsaWNrKCRldmVudClcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICNmb2N1c0lucHV0XG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiaW5wdXRDbGFzc1wiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhZWRpdGFibGVcIlxuICAgICAgICAgICAgICAgIFtwVG9vbHRpcF09XCJ0b29sdGlwXCJcbiAgICAgICAgICAgICAgICBbdG9vbHRpcFBvc2l0aW9uXT1cInRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgW3Bvc2l0aW9uU3R5bGVdPVwidG9vbHRpcFBvc2l0aW9uU3R5bGVcIlxuICAgICAgICAgICAgICAgIFt0b29sdGlwU3R5bGVDbGFzc109XCJ0b29sdGlwU3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbCB8fCAobGFiZWwoKSA9PT0gJ3AtZW1wdHlsYWJlbCcgPyB1bmRlZmluZWQgOiBsYWJlbCgpKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cIidsaXN0Ym94J1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJvdmVybGF5VmlzaWJsZSA/PyBmYWxzZVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJvdmVybGF5VmlzaWJsZSA/IGlkICsgJ19saXN0JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIiFkaXNhYmxlZCA/IHRhYmluZGV4IDogLTFcIlxuICAgICAgICAgICAgICAgIHBBdXRvRm9jdXNcbiAgICAgICAgICAgICAgICBbYXV0b2ZvY3VzXT1cImF1dG9mb2N1c1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XT1cImZvY3VzZWQgPyBmb2N1c2VkT3B0aW9uSWQgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXNlbGVjdGVkSXRlbVRlbXBsYXRlOyBlbHNlIGRlZmF1bHRQbGFjZWhvbGRlclwiPnt7IGxhYmVsKCkgPT09ICdwLWVtcHR5bGFiZWwnID8gJyZuYnNwOycgOiBsYWJlbCgpIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNlbGVjdGVkSXRlbVRlbXBsYXRlICYmICFpc1NlbGVjdGVkT3B0aW9uRW1wdHkoKVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNlbGVjdGVkSXRlbVRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBzZWxlY3RlZE9wdGlvbiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0UGxhY2Vob2xkZXI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNTZWxlY3RlZE9wdGlvbkVtcHR5KClcIj57eyBsYWJlbCgpID09PSAncC1lbXB0eWxhYmVsJyA/ICcmbmJzcDsnIDogbGFiZWwoKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgKm5nSWY9XCJlZGl0YWJsZVwiXG4gICAgICAgICAgICAgICAgI2VkaXRhYmxlSW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIubWF4bGVuZ3RoXT1cIm1heGxlbmd0aFwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiaW5wdXRDbGFzc1wiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwibGlzdGJveFwiXG4gICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwibW9kZWxWYWx1ZSgpID09PSB1bmRlZmluZWQgfHwgbW9kZWxWYWx1ZSgpID09PSBudWxsID8gcGxhY2Vob2xkZXIoKSA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWwgfHwgKGxhYmVsKCkgPT09ICdwLWVtcHR5bGFiZWwnID8gdW5kZWZpbmVkIDogbGFiZWwoKSlcIlxuICAgICAgICAgICAgICAgIChpbnB1dCk9XCJvbkVkaXRhYmxlSW5wdXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIHBBdXRvRm9jdXNcbiAgICAgICAgICAgICAgICBbYXV0b2ZvY3VzXT1cImF1dG9mb2N1c1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XT1cImZvY3VzZWQgPyBmb2N1c2VkT3B0aW9uSWQgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVmlzaWJsZUNsZWFySWNvblwiPlxuICAgICAgICAgICAgICAgIDxUaW1lc0ljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtZHJvcGRvd24tY2xlYXItaWNvbidcIiAoY2xpY2spPVwiY2xlYXIoJGV2ZW50KVwiICpuZ0lmPVwiIWNsZWFySWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjbGVhcmljb24nXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtZHJvcGRvd24tY2xlYXItaWNvblwiIChjbGljayk9XCJjbGVhcigkZXZlbnQpXCIgKm5nSWY9XCJjbGVhckljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xlYXJpY29uJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjbGVhckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRyb3Bkb3duLXRyaWdnZXJcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cImRyb3Bkb3duIHRyaWdnZXJcIiAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudClcIiBhcmlhLWhhc3BvcHVwPVwibGlzdGJveFwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3ZlcmxheVZpc2libGUgPz8gZmFsc2VcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RyaWdnZXInXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxvYWRpbmc7IGVsc2UgZWxzZUJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibG9hZGluZ0ljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFsb2FkaW5nSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImxvYWRpbmdJY29uXCIgW25nQ2xhc3NdPVwiJ3AtZHJvcGRvd24tdHJpZ2dlci1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhbG9hZGluZ0ljb25cIiBbY2xhc3NdPVwiJ3AtZHJvcGRvd24tdHJpZ2dlci1pY29uIHBpIHBpLXNwaW5uZXIgcGktc3BpbidcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNlbHNlQmxvY2s+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZHJvcGRvd25JY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1kcm9wZG93bi10cmlnZ2VyLWljb25cIiAqbmdJZj1cImRyb3Bkb3duSWNvblwiIFtuZ0NsYXNzXT1cImRyb3Bkb3duSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uRG93bkljb24gKm5nSWY9XCIhZHJvcGRvd25JY29uXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtZHJvcGRvd24tdHJpZ2dlci1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImRyb3Bkb3duSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWRyb3Bkb3duLXRyaWdnZXItaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHJvcGRvd25JY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8cC1vdmVybGF5XG4gICAgICAgICAgICAgICAgI292ZXJsYXlcbiAgICAgICAgICAgICAgICBbKHZpc2libGUpXT1cIm92ZXJsYXlWaXNpYmxlXCJcbiAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJvdmVybGF5T3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgW3RhcmdldF09XCInQHBhcmVudCdcIlxuICAgICAgICAgICAgICAgIFthcHBlbmRUb109XCJhcHBlbmRUb1wiXG4gICAgICAgICAgICAgICAgW2F1dG9aSW5kZXhdPVwiYXV0b1pJbmRleFwiXG4gICAgICAgICAgICAgICAgW2Jhc2VaSW5kZXhdPVwiYmFzZVpJbmRleFwiXG4gICAgICAgICAgICAgICAgW3Nob3dUcmFuc2l0aW9uT3B0aW9uc109XCJzaG93VHJhbnNpdGlvbk9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIFtoaWRlVHJhbnNpdGlvbk9wdGlvbnNdPVwiaGlkZVRyYW5zaXRpb25PcHRpb25zXCJcbiAgICAgICAgICAgICAgICAob25BbmltYXRpb25TdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAob25IaWRlKT1cImhpZGUoKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCIncC1kcm9wZG93bi1wYW5lbCBwLWNvbXBvbmVudCdcIiBbbmdTdHlsZV09XCJwYW5lbFN0eWxlXCIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjZmlyc3RIaWRkZW5Gb2N1c2FibGVFbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZSBwLWhpZGRlbi1mb2N1c2FibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZpcnN0SGlkZGVuRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZGRlbi1hY2Nlc3NpYmxlXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1oaWRkZW4tZm9jdXNhYmxlXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kcm9wZG93bi1oZWFkZXJcIiAqbmdJZj1cImZpbHRlclwiIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZmlsdGVyVGVtcGxhdGU7IGVsc2UgYnVpbHRJbkZpbHRlckVsZW1lbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZpbHRlclRlbXBsYXRlOyBjb250ZXh0OiB7IG9wdGlvbnM6IGZpbHRlck9wdGlvbnMgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnVpbHRJbkZpbHRlckVsZW1lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWRyb3Bkb3duLWZpbHRlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNmaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInNlYXJjaGJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiX2ZpbHRlclZhbHVlKCkgfHwgJydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1kcm9wZG93bi1maWx0ZXIgcC1pbnB1dHRleHQgcC1jb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtdmFyaWFudC1maWxsZWQnOiB2YXJpYW50ID09PSAnZmlsbGVkJyB8fCBjb25maWcuaW5wdXRTdHlsZSgpID09PSAnZmlsbGVkJyB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJmaWx0ZXJQbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1vd25zXT1cImlkICsgJ19saXN0J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uRmlsdGVySW5wdXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhRmlsdGVyTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJmb2N1c2VkT3B0aW9uSWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uRmlsdGVyS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvbkZpbHRlckJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlYXJjaEljb24gKm5nSWY9XCIhZmlsdGVySWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtZHJvcGRvd24tZmlsdGVyLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZmlsdGVySWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWRyb3Bkb3duLWZpbHRlci1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiZmlsdGVySWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1kcm9wZG93bi1pdGVtcy13cmFwcGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogdmlydHVhbFNjcm9sbCA/ICdhdXRvJyA6IHNjcm9sbEhlaWdodCB8fCAnYXV0bydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLXNjcm9sbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwidmlydHVhbFNjcm9sbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNzY3JvbGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbXNdPVwidmlzaWJsZU9wdGlvbnMoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCJ7IGhlaWdodDogc2Nyb2xsSGVpZ2h0IH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbVNpemVdPVwidmlydHVhbFNjcm9sbEl0ZW1TaXplIHx8IF9pdGVtU2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdXRvU2l6ZV09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xhenldPVwibGF6eVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbkxhenlMb2FkKT1cIm9uTGF6eUxvYWQuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW29wdGlvbnNdPVwidmlydHVhbFNjcm9sbE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImNvbnRlbnRcIiBsZXQtaXRlbXMgbGV0LXNjcm9sbGVyT3B0aW9ucz1cIm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJidWlsZEluSXRlbXM7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtcywgb3B0aW9uczogc2Nyb2xsZXJPcHRpb25zIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxvYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwibG9hZGVyXCIgbGV0LXNjcm9sbGVyT3B0aW9ucz1cIm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibG9hZGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgb3B0aW9uczogc2Nyb2xsZXJPcHRpb25zIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcC1zY3JvbGxlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZpcnR1YWxTY3JvbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJ1aWxkSW5JdGVtczsgY29udGV4dDogeyAkaW1wbGljaXQ6IHZpc2libGVPcHRpb25zKCksIG9wdGlvbnM6IHt9IH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnVpbGRJbkl0ZW1zIGxldC1pdGVtcyBsZXQtc2Nyb2xsZXJPcHRpb25zPVwib3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgI2l0ZW1zIFthdHRyLmlkXT1cImlkICsgJ19saXN0J1wiIFthdHRyLmFyaWEtbGFiZWxdPVwibGlzdExhYmVsXCIgY2xhc3M9XCJwLWRyb3Bkb3duLWl0ZW1zXCIgW25nQ2xhc3NdPVwic2Nyb2xsZXJPcHRpb25zLmNvbnRlbnRTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic2Nyb2xsZXJPcHRpb25zLmNvbnRlbnRTdHlsZVwiIHJvbGU9XCJsaXN0Ym94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW9wdGlvbiBbbmdGb3JPZl09XCJpdGVtc1wiIGxldC1pPVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNPcHRpb25Hcm91cChvcHRpb24pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtZHJvcGRvd24taXRlbS1ncm91cFwiIFthdHRyLmlkXT1cImlkICsgJ18nICsgZ2V0T3B0aW9uSW5kZXgoaSwgc2Nyb2xsZXJPcHRpb25zKVwiIFtuZ1N0eWxlXT1cInsgaGVpZ2h0OiBzY3JvbGxlck9wdGlvbnMuaXRlbVNpemUgKyAncHgnIH1cIiByb2xlPVwib3B0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFncm91cFRlbXBsYXRlXCI+e3sgZ2V0T3B0aW9uR3JvdXBMYWJlbChvcHRpb24ub3B0aW9uR3JvdXApIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImdyb3VwVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBvcHRpb24ub3B0aW9uR3JvdXAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNPcHRpb25Hcm91cChvcHRpb24pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLWRyb3Bkb3duSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cImlkICsgJ18nICsgZ2V0T3B0aW9uSW5kZXgoaSwgc2Nyb2xsZXJPcHRpb25zKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbb3B0aW9uXT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2ttYXJrXT1cImNoZWNrbWFya1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYWJlbF09XCJnZXRPcHRpb25MYWJlbChvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc09wdGlvbkRpc2FibGVkKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9jdXNlZF09XCJmb2N1c2VkT3B0aW9uSW5kZXgoKSA9PT0gZ2V0T3B0aW9uSW5kZXgoaSwgc2Nyb2xsZXJPcHRpb25zKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXJpYVBvc0luc2V0XT1cImdldEFyaWFQb3NJbnNldChnZXRPcHRpb25JbmRleChpLCBzY3JvbGxlck9wdGlvbnMpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXJpYVNldFNpemVdPVwiYXJpYVNldFNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9uQ2xpY2spPVwib25PcHRpb25TZWxlY3QoJGV2ZW50LCBvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvbk1vdXNlRW50ZXIpPVwib25PcHRpb25Nb3VzZUVudGVyKCRldmVudCwgZ2V0T3B0aW9uSW5kZXgoaSwgc2Nyb2xsZXJPcHRpb25zKSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9wLWRyb3Bkb3duSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJmaWx0ZXJWYWx1ZSAmJiBpc0VtcHR5KClcIiBjbGFzcz1cInAtZHJvcGRvd24tZW1wdHktbWVzc2FnZVwiIFtuZ1N0eWxlXT1cInsgaGVpZ2h0OiBzY3JvbGxlck9wdGlvbnMuaXRlbVNpemUgKyAncHgnIH1cIiByb2xlPVwib3B0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFlbXB0eUZpbHRlclRlbXBsYXRlICYmICFlbXB0eVRlbXBsYXRlOyBlbHNlIGVtcHR5RmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGVtcHR5RmlsdGVyTWVzc2FnZUxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAjZW1wdHlGaWx0ZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eUZpbHRlclRlbXBsYXRlIHx8IGVtcHR5VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCIhZmlsdGVyVmFsdWUgJiYgaXNFbXB0eSgpXCIgY2xhc3M9XCJwLWRyb3Bkb3duLWVtcHR5LW1lc3NhZ2VcIiBbbmdTdHlsZV09XCJ7IGhlaWdodDogc2Nyb2xsZXJPcHRpb25zLml0ZW1TaXplICsgJ3B4JyB9XCIgcm9sZT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZW1wdHlUZW1wbGF0ZTsgZWxzZSBlbXB0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBlbXB0eU1lc3NhZ2VMYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgI2VtcHR5ICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgI2xhc3RIaWRkZW5Gb2N1c2FibGVFbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZSBwLWhpZGRlbi1mb2N1c2FibGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkxhc3RIaWRkZW5Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtaGlkZGVuLWFjY2Vzc2libGVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZGRlbi1mb2N1c2FibGVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9wLW92ZXJsYXk+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG5cbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50IHAtaW5wdXR3cmFwcGVyJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCgpJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXNlZCB8fCBvdmVybGF5VmlzaWJsZSdcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW0RST1BET1dOX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2Ryb3Bkb3duLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgLyoqXG4gICAgICogVW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGNvbXBvbmVudFxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiBwaXhlbHMsIGEgc2Nyb2xsYmFyIGlzIGRlZmluZWQgaWYgaGVpZ2h0IG9mIGxpc3QgZXhjZWVkcyB0aGlzIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNjcm9sbEhlaWdodDogc3RyaW5nID0gJzIwMHB4JztcbiAgICAvKipcbiAgICAgKiBXaGVuIHNwZWNpZmllZCwgZGlzcGxheXMgYW4gaW5wdXQgZmllbGQgdG8gZmlsdGVyIHRoZSBpdGVtcyBvbiBrZXl1cC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZmlsdGVyOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIG92ZXJsYXkgcGFuZWwgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgb3ZlcmxheSBwYW5lbCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBjYW5ub3QgYmUgZWRpdGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZWFkb25seTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IGFuIGlucHV0IGZpZWxkIG11c3QgYmUgZmlsbGVkIG91dCBiZWZvcmUgc3VibWl0dGluZyB0aGUgZm9ybS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcmVxdWlyZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBjdXN0b20gdmFsdWUgaW5zdGVhZCBvZiBwcmVkZWZpbmVkIG9wdGlvbnMgY2FuIGJlIGVudGVyZWQgdXNpbmcgdGhlIGVkaXRhYmxlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBlZGl0YWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIG92ZXJsYXksIHZhbGlkIHZhbHVlcyBhcmUgXCJib2R5XCIgb3IgYSBsb2NhbCBuZy10ZW1wbGF0ZSB2YXJpYWJsZSBvZiBhbm90aGVyIGVsZW1lbnQgKG5vdGU6IHVzZSBiaW5kaW5nIHdpdGggYnJhY2tldHMgZm9yIHRlbXBsYXRlIHZhcmlhYmxlcywgZS5nLiBbYXBwZW5kVG9dPVwibXlkaXZcIiBmb3IgYSBkaXYgZWxlbWVudCBoYXZpbmcgI215ZGl2IGFzIHZhcmlhYmxlIG5hbWUpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB8IGFueTtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHRhYmluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQgPSAwO1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgdGV4dCB0byBkaXNwbGF5IHdoZW4gbm8gb3B0aW9uIGlzIHNlbGVjdGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNldCBwbGFjZWhvbGRlcih2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5zZXQodmFsKTtcbiAgICB9XG4gICAgZ2V0IHBsYWNlaG9sZGVyKCk6IFNpZ25hbDxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyLmFzUmVhZG9ubHkoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWNvbiB0byBkaXNwbGF5IGluIGxvYWRpbmcgc3RhdGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbG9hZGluZ0ljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBQbGFjZWhvbGRlciB0ZXh0IHRvIHNob3cgd2hlbiBmaWx0ZXIgaW5wdXQgaXMgZW1wdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyUGxhY2Vob2xkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBMb2NhbGUgdG8gdXNlIGluIGZpbHRlcmluZy4gVGhlIGRlZmF1bHQgbG9jYWxlIGlzIHRoZSBob3N0IGVudmlyb25tZW50J3MgY3VycmVudCBsb2NhbGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyTG9jYWxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSBpbnB1dCB2YXJpYW50IG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmFyaWFudDogJ2ZpbGxlZCcgfCAnb3V0bGluZWQnID0gJ291dGxpbmVkJztcbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVyIG9mIHRoZSBhY2Nlc3NpYmxlIGlucHV0IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEEgcHJvcGVydHkgdG8gdW5pcXVlbHkgaWRlbnRpZnkgYSB2YWx1ZSBpbiBvcHRpb25zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRhdGFLZXk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGZpbHRlcmluZyBpcyBlbmFibGVkLCBmaWx0ZXJCeSBkZWNpZGVzIHdoaWNoIGZpZWxkIG9yIGZpZWxkcyAoY29tbWEgc2VwYXJhdGVkKSB0byBzZWFyY2ggYWdhaW5zdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEZpZWxkcyB1c2VkIHdoZW4gZmlsdGVyaW5nIHRoZSBvcHRpb25zLCBkZWZhdWx0cyB0byBvcHRpb25MYWJlbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJGaWVsZHM6IGFueVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYXV0b21hdGljYWxseSBnZXQgZm9jdXMgb24gbG9hZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b2ZvY3VzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZmlsdGVyIHZhbHVlIHdoZW4gaGlkaW5nIHRoZSBkcm9wZG93bi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcmVzZXRGaWx0ZXJPbkhpZGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBzZWxlY3RlZCBvcHRpb24gd2lsbCBiZSBzaG93biB3aXRoIGEgY2hlY2sgbWFyay5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgY2hlY2ttYXJrOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogSWNvbiBjbGFzcyBvZiB0aGUgZHJvcGRvd24gaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkcm9wZG93bkljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBkcm9wZG93biBpcyBpbiBsb2FkaW5nIHN0YXRlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBsb2FkaW5nOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgbGFiZWwgZmllbGQgb2YgYW4gb3B0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9wdGlvbkxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgdmFsdWUgZmllbGQgb2YgYW4gb3B0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9wdGlvblZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgZGlzYWJsZWQgZmllbGQgb2YgYW4gb3B0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9wdGlvbkRpc2FibGVkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgbGFiZWwgZmllbGQgb2YgYW4gb3B0aW9uIGdyb3VwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9wdGlvbkdyb3VwTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZCA9ICdsYWJlbCc7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgb3B0aW9ucyBmaWVsZCBvZiBhbiBvcHRpb24gZ3JvdXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3B0aW9uR3JvdXBDaGlsZHJlbjogc3RyaW5nID0gJ2l0ZW1zJztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgdGhlIGZpcnN0IGl0ZW0gYXMgdGhlIGxhYmVsIGlmIG5vIHBsYWNlaG9sZGVyIGlzIGRlZmluZWQgYW5kIHZhbHVlIGlzIG51bGwuXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjE3LjMuMCwgc2V0IGluaXRpYWwgdmFsdWUgYnkgbW9kZWwgaW5zdGVhZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b0Rpc3BsYXlGaXJzdDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IG9wdGlvbnMgYXMgZ3JvdXBlZCB3aGVuIG5lc3RlZCBvcHRpb25zIGFyZSBwcm92aWRlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZ3JvdXA6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBhIGNsZWFyIGljb24gaXMgZGlzcGxheWVkIHRvIGNsZWFyIHRoZSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd0NsZWFyOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRleHQgdG8gZGlzcGxheSB3aGVuIGZpbHRlcmluZyBkb2VzIG5vdCByZXR1cm4gYW55IHJlc3VsdHMuIERlZmF1bHRzIHRvIGdsb2JhbCB2YWx1ZSBpbiBpMThuIHRyYW5zbGF0aW9uIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZW1wdHlGaWx0ZXJNZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgICAvKipcbiAgICAgKiBUZXh0IHRvIGRpc3BsYXkgd2hlbiB0aGVyZSBpcyBubyBkYXRhLiBEZWZhdWx0cyB0byBnbG9iYWwgdmFsdWUgaW4gaTE4biB0cmFuc2xhdGlvbiBjb25maWd1cmF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nID0gJyc7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBkYXRhIGlzIGxvYWRlZCBhbmQgaW50ZXJhY3RlZCB3aXRoIGluIGxhenkgbWFubmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBsYXp5OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZGF0YSBzaG91bGQgYmUgbG9hZGVkIG9uIGRlbWFuZCBkdXJpbmcgc2Nyb2xsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB2aXJ0dWFsU2Nyb2xsOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiBhbiBpdGVtIGluIHRoZSBsaXN0IGZvciBWaXJ0dWFsU2Nyb2xsaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIHRoZSBzY3JvbGxlciBmZWF0dXJlLiBUaGUgcHJvcGVydGllcyBvZiBzY3JvbGxlciBjb21wb25lbnQgY2FuIGJlIHVzZWQgbGlrZSBhbiBvYmplY3QgaW4gaXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbE9wdGlvbnM6IFNjcm9sbGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBvdmVybGF5IEFQSSBmZWF0dXJlLiBUaGUgcHJvcGVydGllcyBvZiBvdmVybGF5IEFQSSBjYW4gYmUgdXNlZCBsaWtlIGFuIG9iamVjdCBpbiBpdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvdmVybGF5T3B0aW9uczogT3ZlcmxheU9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgZmlsdGVyIGlucHV0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFGaWx0ZXJMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZGVmaW5lIGEgYXJpYSBsYWJlbCBhdHRyaWJ1dGUgdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFc3RhYmxpc2hlcyByZWxhdGlvbnNoaXBzIGJldHdlZW4gdGhlIGNvbXBvbmVudCBhbmQgbGFiZWwocykgd2hlcmUgaXRzIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBlbGVtZW50IElEcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaG93IHRoZSBpdGVtcyBhcmUgZmlsdGVyZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyTWF0Y2hNb2RlOiAnY29udGFpbnMnIHwgJ3N0YXJ0c1dpdGgnIHwgJ2VuZHNXaXRoJyB8ICdlcXVhbHMnIHwgJ25vdEVxdWFscycgfCAnaW4nIHwgJ2x0JyB8ICdsdGUnIHwgJ2d0JyB8ICdndGUnID0gJ2NvbnRhaW5zJztcbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIG51bWJlciBvZiBjaGFyYWN0ZXIgYWxsb3dzIGluIHRoZSBlZGl0YWJsZSBpbnB1dCBmaWVsZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBtYXhsZW5ndGg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBBZHZpc29yeSBpbmZvcm1hdGlvbiB0byBkaXNwbGF5IGluIGEgdG9vbHRpcCBvbiBob3Zlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmcgPSAnJztcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiB0aGUgdG9vbHRpcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb246ICd0b3AnIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdib3R0b20nID0gJ3JpZ2h0JztcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIENTUyBwb3NpdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb25TdHlsZTogc3RyaW5nID0gJ2Fic29sdXRlJztcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgdG9vbHRpcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEZpZWxkcyB1c2VkIHdoZW4gZmlsdGVyaW5nIHRoZSBvcHRpb25zLCBkZWZhdWx0cyB0byBvcHRpb25MYWJlbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZm9jdXNPbkhvdmVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgb3B0aW9uIHdpbGwgYmUgc2VsZWN0ZWQgb24gZm9jdXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNlbGVjdE9uRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGZvY3VzIG9uIHRoZSBmaXJzdCB2aXNpYmxlIG9yIHNlbGVjdGVkIGVsZW1lbnQgd2hlbiB0aGUgb3ZlcmxheSBwYW5lbCBpcyBzaG93bi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b09wdGlvbkZvY3VzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGZvY3VzIHRvIHRoZSBmaWx0ZXIgZWxlbWVudCB3aGVuIHRoZSBvdmVybGF5IGlzIHNob3duLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhdXRvZm9jdXNGaWx0ZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIHBhbmVsIHdpbGwgYmUgc2hvd24gd2hlbiB0aGUgaW5wdXQgaXMgZm9jdXNlZCBhbmQgcmVjZWl2ZXMgYSBjaGFyYWN0ZXIga2V5IGRvd24gZXZlbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGF1dG9TaG93UGFuZWxPblByaW50YWJsZUNoYXJhY3RlcktleURvd246IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gICAgfVxuICAgIHNldCBkaXNhYmxlZChfZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKF9kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gX2Rpc2FibGVkO1xuICAgICAgICBpZiAoISh0aGlzLmNkIGFzIFZpZXdSZWYpLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSXRlbSBzaXplIG9mIGl0ZW0gdG8gYmUgdmlydHVhbCBzY3JvbGxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCB1c2UgdmlydHVhbFNjcm9sbEl0ZW1TaXplIHByb3BlcnR5IGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGl0ZW1TaXplKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtU2l6ZTtcbiAgICB9XG4gICAgc2V0IGl0ZW1TaXplKHZhbDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1TaXplID0gdmFsO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBpdGVtU2l6ZSBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLCB1c2UgdmlydHVhbFNjcm9sbEl0ZW1TaXplIHByb3BlcnR5IGluc3RlYWQuJyk7XG4gICAgfVxuICAgIF9pdGVtU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gYXV0b21hdGljYWxseSBtYW5hZ2UgbGF5ZXJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjE0LjIuMCwgdXNlIG92ZXJsYXlPcHRpb25zIHByb3BlcnR5IGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGF1dG9aSW5kZXgoKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvWkluZGV4O1xuICAgIH1cbiAgICBzZXQgYXV0b1pJbmRleCh2YWw6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fYXV0b1pJbmRleCA9IHZhbDtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgYXV0b1pJbmRleCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICBfYXV0b1pJbmRleDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBCYXNlIHpJbmRleCB2YWx1ZSB0byB1c2UgaW4gbGF5ZXJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjE0LjIuMCwgdXNlIG92ZXJsYXlPcHRpb25zIHByb3BlcnR5IGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGJhc2VaSW5kZXgoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Jhc2VaSW5kZXg7XG4gICAgfVxuICAgIHNldCBiYXNlWkluZGV4KHZhbDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2Jhc2VaSW5kZXggPSB2YWw7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIGJhc2VaSW5kZXggcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wLCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgX2Jhc2VaSW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIHNob3cgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzaG93VHJhbnNpdGlvbk9wdGlvbnMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dUcmFuc2l0aW9uT3B0aW9ucztcbiAgICB9XG4gICAgc2V0IHNob3dUcmFuc2l0aW9uT3B0aW9ucyh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zaG93VHJhbnNpdGlvbk9wdGlvbnMgPSB2YWw7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIHNob3dUcmFuc2l0aW9uT3B0aW9ucyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIHNpbmNlIHYxNC4yLjAsIHVzZSBvdmVybGF5T3B0aW9ucyBwcm9wZXJ0eSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICBfc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBoaWRlIGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wLCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaGlkZVRyYW5zaXRpb25PcHRpb25zKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oaWRlVHJhbnNpdGlvbk9wdGlvbnM7XG4gICAgfVxuICAgIHNldCBoaWRlVHJhbnNpdGlvbk9wdGlvbnModmFsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5faGlkZVRyYW5zaXRpb25PcHRpb25zID0gdmFsO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBoaWRlVHJhbnNpdGlvbk9wdGlvbnMgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBzaW5jZSB2MTQuMi4wLCB1c2Ugb3ZlcmxheU9wdGlvbnMgcHJvcGVydHkgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgX2hpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gc3BlY2lmaWVkLCBmaWx0ZXIgZGlzcGxheXMgd2l0aCB0aGlzIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBmaWx0ZXJWYWx1ZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclZhbHVlKCk7XG4gICAgfVxuICAgIHNldCBmaWx0ZXJWYWx1ZSh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJWYWx1ZS5zZXQodmFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgdG8gZGlzcGxheSBhcyB0aGUgYXZhaWxhYmxlIG9wdGlvbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG9wdGlvbnMoKTogYW55W10gfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucygpO1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG4gICAgc2V0IG9wdGlvbnModmFsOiBhbnlbXSB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIU9iamVjdFV0aWxzLmRlZXBFcXVhbHModmFsLCB0aGlzLl9vcHRpb25zKCkpKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNldCh2YWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHZhbHVlIG9mIGRyb3Bkb3duIGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtEcm9wZG93bkNoYW5nZUV2ZW50fSBldmVudCAtIGN1c3RvbSBjaGFuZ2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RHJvcGRvd25DaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPERyb3Bkb3duQ2hhbmdlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZGF0YSBpcyBmaWx0ZXJlZC5cbiAgICAgKiBAcGFyYW0ge0Ryb3Bkb3duRmlsdGVyRXZlbnR9IGV2ZW50IC0gY3VzdG9tIGZpbHRlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25GaWx0ZXI6IEV2ZW50RW1pdHRlcjxEcm9wZG93bkZpbHRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RHJvcGRvd25GaWx0ZXJFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkcm9wZG93biBnZXRzIGZvY3VzLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZHJvcGRvd24gbG9zZXMgZm9jdXMuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkJsdXI6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGNvbXBvbmVudCBpcyBjbGlja2VkLlxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgLSBNb3VzZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRyb3Bkb3duIG92ZXJsYXkgZ2V0cyB2aXNpYmxlLlxuICAgICAqIEBwYXJhbSB7QW5pbWF0aW9uRXZlbnR9IGV2ZW50IC0gQW5pbWF0aW9uIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEFuaW1hdGlvbkV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRyb3Bkb3duIG92ZXJsYXkgZ2V0cyBoaWRkZW4uXG4gICAgICogQHBhcmFtIHtBbmltYXRpb25FdmVudH0gZXZlbnQgLSBBbmltYXRpb24gZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uSGlkZTogRXZlbnRFbWl0dGVyPEFuaW1hdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZHJvcGRvd24gY2xlYXJzIHRoZSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2xlYXI6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBpbiBsYXp5IG1vZGUgdG8gbG9hZCBuZXcgZGF0YS5cbiAgICAgKiBAcGFyYW0ge0Ryb3Bkb3duTGF6eUxvYWRFdmVudH0gZXZlbnQgLSBMYXp5IGxvYWQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTGF6eUxvYWQ6IEV2ZW50RW1pdHRlcjxEcm9wZG93bkxhenlMb2FkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEcm9wZG93bkxhenlMb2FkRXZlbnQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnZmlsdGVyJykgZmlsdGVyVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2ZvY3VzSW5wdXQnKSBmb2N1c0lucHV0Vmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2VkaXRhYmxlSW5wdXQnKSBlZGl0YWJsZUlucHV0Vmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ2l0ZW1zJykgaXRlbXNWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnc2Nyb2xsZXInKSBzY3JvbGxlcjogTnVsbGFibGU8U2Nyb2xsZXI+O1xuXG4gICAgQFZpZXdDaGlsZCgnb3ZlcmxheScpIG92ZXJsYXlWaWV3Q2hpbGQ6IE51bGxhYmxlPE92ZXJsYXk+O1xuXG4gICAgQFZpZXdDaGlsZCgnZmlyc3RIaWRkZW5Gb2N1c2FibGVFbCcpIGZpcnN0SGlkZGVuRm9jdXNhYmxlRWxlbWVudE9uT3ZlcmxheTogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdsYXN0SGlkZGVuRm9jdXNhYmxlRWwnKSBsYXN0SGlkZGVuRm9jdXNhYmxlRWxlbWVudE9uT3ZlcmxheTogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogTnVsbGFibGU8UXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+PjtcblxuICAgIF9kaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGl0ZW1zV3JhcHBlcjogTnVsbGFibGU8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgaXRlbVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGdyb3VwVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbG9hZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgc2VsZWN0ZWRJdGVtVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZmlsdGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZm9vdGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZW1wdHlGaWx0ZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBlbXB0eVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGRyb3Bkb3duSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGxvYWRpbmdJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY2xlYXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZmlsdGVySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZpbHRlck9wdGlvbnM6IERyb3Bkb3duRmlsdGVyT3B0aW9ucyB8IHVuZGVmaW5lZDtcblxuICAgIF9vcHRpb25zID0gc2lnbmFsPGFueVtdIHwgdW5kZWZpbmVkPihudWxsKTtcblxuICAgIF9wbGFjZWhvbGRlciA9IHNpZ25hbDxzdHJpbmcgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbiAgICBtb2RlbFZhbHVlID0gc2lnbmFsPGFueT4obnVsbCk7XG5cbiAgICB2YWx1ZTogYW55O1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgaG92ZXI6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgZm9jdXNlZDogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBvdmVybGF5VmlzaWJsZTogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBvcHRpb25zQ2hhbmdlZDogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBwYW5lbDogTnVsbGFibGU8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgZGltZW5zaW9uc1VwZGF0ZWQ6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgaG92ZXJlZEl0ZW06IGFueTtcblxuICAgIHNlbGVjdGVkT3B0aW9uVXBkYXRlZDogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBfZmlsdGVyVmFsdWUgPSBzaWduYWw8YW55PihudWxsKTtcblxuICAgIHNlYXJjaFZhbHVlOiBOdWxsYWJsZTxzdHJpbmc+O1xuXG4gICAgc2VhcmNoSW5kZXg6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBzZWFyY2hUaW1lb3V0OiBhbnk7XG5cbiAgICBwcmV2aW91c1NlYXJjaENoYXI6IE51bGxhYmxlPHN0cmluZz47XG5cbiAgICBjdXJyZW50U2VhcmNoQ2hhcjogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIHByZXZlbnRNb2RlbFRvdWNoZWQ6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgZm9jdXNlZE9wdGlvbkluZGV4ID0gc2lnbmFsPG51bWJlcj4oLTEpO1xuXG4gICAgbGFiZWxJZDogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIGxpc3RJZDogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIGNsaWNrZWQgPSBzaWduYWw8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gICAgZ2V0IGVtcHR5TWVzc2FnZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5TWVzc2FnZSB8fCB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuRU1QVFlfTUVTU0FHRSk7XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5RmlsdGVyTWVzc2FnZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5RmlsdGVyTWVzc2FnZSB8fCB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuRU1QVFlfRklMVEVSX01FU1NBR0UpO1xuICAgIH1cblxuICAgIGdldCBpc1Zpc2libGVDbGVhckljb24oKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsVmFsdWUoKSAhPSBudWxsICYmIHRoaXMuaGFzU2VsZWN0ZWRPcHRpb24oKSAmJiB0aGlzLnNob3dDbGVhciAmJiAhdGhpcy5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBnZXQgbGlzdExhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuQVJJQSlbJ2xpc3RMYWJlbCddO1xuICAgIH1cblxuICAgIGdldCBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWRyb3Bkb3duIHAtY29tcG9uZW50IHAtaW5wdXR3cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICdwLWRyb3Bkb3duLWNsZWFyYWJsZSc6IHRoaXMuc2hvd0NsZWFyICYmICF0aGlzLmRpc2FibGVkLFxuICAgICAgICAgICAgJ3AtZm9jdXMnOiB0aGlzLmZvY3VzZWQsXG4gICAgICAgICAgICAncC1pbnB1dHdyYXBwZXItZmlsbGVkJzogdGhpcy5tb2RlbFZhbHVlKCkgIT09IHVuZGVmaW5lZCAmJiB0aGlzLm1vZGVsVmFsdWUoKSAhPT0gbnVsbCAmJiAhdGhpcy5tb2RlbFZhbHVlKCkubGVuZ3RoLFxuICAgICAgICAgICAgJ3AtaW5wdXR3cmFwcGVyLWZvY3VzJzogdGhpcy5mb2N1c2VkIHx8IHRoaXMub3ZlcmxheVZpc2libGUsXG4gICAgICAgICAgICAncC12YXJpYW50LWZpbGxlZCc6IHRoaXMudmFyaWFudCA9PT0gJ2ZpbGxlZCcgfHwgdGhpcy5jb25maWcuaW5wdXRTdHlsZSgpID09PSAnZmlsbGVkJyxcbiAgICAgICAgICAgICdwLWRyb3Bkb3duLW9wZW4nOiB0aGlzLm92ZXJsYXlWaXNpYmxlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0Q2xhc3MoKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5sYWJlbCgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtZHJvcGRvd24tbGFiZWwgcC1pbnB1dHRleHQnOiB0cnVlLFxuICAgICAgICAgICAgJ3AtcGxhY2Vob2xkZXInOiB0aGlzLnBsYWNlaG9sZGVyKCkgJiYgbGFiZWwgPT09IHRoaXMucGxhY2Vob2xkZXIoKSxcbiAgICAgICAgICAgICdwLWRyb3Bkb3duLWxhYmVsLWVtcHR5JzogIXRoaXMuZWRpdGFibGUgJiYgIXRoaXMuc2VsZWN0ZWRJdGVtVGVtcGxhdGUgJiYgKGxhYmVsID09PSB1bmRlZmluZWQgfHwgbGFiZWwgPT09IG51bGwgfHwgbGFiZWwgPT09ICdwLWVtcHR5bGFiZWwnIHx8IGxhYmVsLmxlbmd0aCA9PT0gMClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgcGFuZWxDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWRyb3Bkb3duLXBhbmVsIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWlucHV0LWZpbGxlZCc6IHRoaXMuY29uZmlnLmlucHV0U3R5bGUoKSA9PT0gJ2ZpbGxlZCcsXG4gICAgICAgICAgICAncC1yaXBwbGUtZGlzYWJsZWQnOiB0aGlzLmNvbmZpZy5yaXBwbGUgPT09IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IGZvY3VzZWRPcHRpb25JZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkgIT09IC0xID8gYCR7dGhpcy5pZH1fJHt0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpfWAgOiBudWxsO1xuICAgIH1cblxuICAgIHZpc2libGVPcHRpb25zID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRBbGxWaXNpYmxlQW5kTm9uVmlzaWJsZU9wdGlvbnMoKTtcblxuICAgICAgICBpZiAodGhpcy5fZmlsdGVyVmFsdWUoKSkge1xuICAgICAgICAgICAgY29uc3QgX2ZpbHRlckJ5ID0gdGhpcy5maWx0ZXJCeSB8fCB0aGlzLm9wdGlvbkxhYmVsO1xuXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZE9wdGlvbnMgPVxuICAgICAgICAgICAgICAgICFfZmlsdGVyQnkgJiYgIXRoaXMuZmlsdGVyRmllbGRzICYmICF0aGlzLm9wdGlvblZhbHVlXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5vcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24ubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb24ubGFiZWwudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5fZmlsdGVyVmFsdWUoKS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb24udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGhpcy5fZmlsdGVyVmFsdWUoKS50b0xvd2VyQ2FzZSgpLnRyaW0oKSkgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlcihvcHRpb25zLCB0aGlzLnNlYXJjaEZpZWxkcygpLCB0aGlzLl9maWx0ZXJWYWx1ZSgpLnRyaW0oKSwgdGhpcy5maWx0ZXJNYXRjaE1vZGUsIHRoaXMuZmlsdGVyTG9jYWxlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25Hcm91cHMgPSB0aGlzLm9wdGlvbnMgfHwgW107XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWQgPSBbXTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbkdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cENoaWxkcmVuID0gdGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKGdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRJdGVtcyA9IGdyb3VwQ2hpbGRyZW4uZmlsdGVyKChpdGVtKSA9PiBmaWx0ZXJlZE9wdGlvbnMuaW5jbHVkZXMoaXRlbSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZEl0ZW1zLmxlbmd0aCA+IDApIGZpbHRlcmVkLnB1c2goeyAuLi5ncm91cCwgW3R5cGVvZiB0aGlzLm9wdGlvbkdyb3VwQ2hpbGRyZW4gPT09ICdzdHJpbmcnID8gdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuIDogJ2l0ZW1zJ106IFsuLi5maWx0ZXJlZEl0ZW1zXSB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZsYXRPcHRpb25zKGZpbHRlcmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZE9wdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9KTtcblxuICAgIGxhYmVsID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICAvLyB1c2UgIGdldEFsbFZpc2libGVBbmROb25WaXNpYmxlT3B0aW9ucyB2ZXJzZXMganVzdCB2aXNpYmxlIG9wdGlvbnNcbiAgICAgICAgLy8gdGhpcyB3aWxsIGZpbmQgdGhlIHNlbGVjdGVkIG9wdGlvbiB3aGV0aGVyIG9yIG5vdCB0aGUgdXNlciBpcyBjdXJyZW50bHkgZmlsdGVyaW5nICBiZWNhdXNlIHRoZSBmaWx0ZXJlZCAoaS5lLiB2aXNpYmxlKSBvcHRpb25zLCBhcmUgYSBzdWJzZXQgb2YgYWxsIHRoZSBvcHRpb25zXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldEFsbFZpc2libGVBbmROb25WaXNpYmxlT3B0aW9ucygpO1xuICAgICAgICAvLyB1c2UgaXNPcHRpb25FcXVhbHNNb2RlbFZhbHVlIGZvciB0aGUgdXNlIGNhc2Ugd2hlcmUgdGhlIGRyb3Bkb3duIGlzIGluaXRhbGl6ZWQgd2l0aCBhIGRpc2FibGVkIG9wdGlvblxuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbkluZGV4ID0gb3B0aW9ucy5maW5kSW5kZXgoKG9wdGlvbikgPT4gdGhpcy5pc09wdGlvblZhbHVlRXF1YWxzTW9kZWxWYWx1ZShvcHRpb24pKTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25JbmRleCAhPT0gLTEgPyB0aGlzLmdldE9wdGlvbkxhYmVsKG9wdGlvbnNbc2VsZWN0ZWRPcHRpb25JbmRleF0pIDogdGhpcy5wbGFjZWhvbGRlcigpIHx8ICdwLWVtcHR5bGFiZWwnO1xuICAgIH0pO1xuXG4gICAgZmlsbGVkID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMubW9kZWxWYWx1ZSgpID09PSAnc3RyaW5nJykgcmV0dXJuICEhdGhpcy5tb2RlbFZhbHVlKCk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0QWxsVmlzaWJsZUFuZE5vblZpc2libGVPcHRpb25zKCk7XG4gICAgICAgIGNvbnN0IGlzT3B0aW9uU2VsZWN0ZWQgPSBvcHRpb25zLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzT3B0aW9uVmFsdWVFcXVhbHNNb2RlbFZhbHVlKG9wdGlvbikpICE9PSAtMTtcblxuICAgICAgICByZXR1cm4gdGhpcy5sYWJlbCgpICE9PSAncC1lbXB0eWxhYmVsJyAmJiBpc09wdGlvblNlbGVjdGVkO1xuICAgIH0pO1xuXG4gICAgc2VsZWN0ZWRPcHRpb246IGFueTtcblxuICAgIGVkaXRhYmxlSW5wdXRWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IHRoaXMuZ2V0T3B0aW9uTGFiZWwodGhpcy5zZWxlY3RlZE9wdGlvbikgfHwgdGhpcy5tb2RlbFZhbHVlKCkgfHwgJycpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyB6b25lOiBOZ1pvbmUsXG4gICAgICAgIHB1YmxpYyBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIGVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2RlbFZhbHVlID0gdGhpcy5tb2RlbFZhbHVlKCk7XG4gICAgICAgICAgICBjb25zdCB2aXNpYmxlT3B0aW9ucyA9IHRoaXMudmlzaWJsZU9wdGlvbnMoKTtcblxuICAgICAgICAgICAgaWYgKHZpc2libGVPcHRpb25zICYmIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodmlzaWJsZU9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb25JbmRleCA9IHRoaXMuZmluZFNlbGVjdGVkT3B0aW9uSW5kZXgoKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZE9wdGlvbkluZGV4ICE9PSAtMSB8fCBtb2RlbFZhbHVlID09PSB1bmRlZmluZWQgfHwgKHR5cGVvZiBtb2RlbFZhbHVlID09PSAnc3RyaW5nJyAmJiBtb2RlbFZhbHVlLmxlbmd0aCA9PT0gMCkgfHwgdGhpcy5pc01vZGVsVmFsdWVOb3RTZXQoKSB8fCB0aGlzLmVkaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24gPSB2aXNpYmxlT3B0aW9uc1tzZWxlY3RlZE9wdGlvbkluZGV4XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc0VtcHR5KHZpc2libGVPcHRpb25zKSAmJiAobW9kZWxWYWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuaXNNb2RlbFZhbHVlTm90U2V0KCkpICYmIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5zZWxlY3RlZE9wdGlvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1vZGVsVmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmVkaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFZGl0YWJsZUxhYmVsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTW9kZWxWYWx1ZU5vdFNldCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxWYWx1ZSgpID09PSBudWxsICYmICF0aGlzLmlzT3B0aW9uVmFsdWVFcXVhbHNNb2RlbFZhbHVlKHRoaXMuc2VsZWN0ZWRPcHRpb24pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QWxsVmlzaWJsZUFuZE5vblZpc2libGVPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ncm91cCA/IHRoaXMuZmxhdE9wdGlvbnModGhpcy5vcHRpb25zKSA6IHRoaXMub3B0aW9ucyB8fCBbXTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQgfHwgVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICAgICAgdGhpcy5hdXRvVXBkYXRlTW9kZWwoKTtcblxuICAgICAgICBpZiAodGhpcy5maWx0ZXJCeSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGZpbHRlcjogKHZhbHVlKSA9PiB0aGlzLm9uRmlsdGVySW5wdXRDaGFuZ2UodmFsdWUpLFxuICAgICAgICAgICAgICAgIHJlc2V0OiAoKSA9PiB0aGlzLnJlc2V0RmlsdGVyKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNDaGFuZ2VkICYmIHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpZXdDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5Vmlld0NoaWxkLmFsaWduT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9uVXBkYXRlZCAmJiB0aGlzLml0ZW1zV3JhcHBlcikge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLm92ZXJsYXlWaWV3Q2hpbGQ/Lm92ZXJsYXlWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQsICdsaS5wLWhpZ2hsaWdodCcpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuc2Nyb2xsSW5WaWV3KHRoaXMuaXRlbXNXcmFwcGVyLCBzZWxlY3RlZEl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvblVwZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgKHRoaXMudGVtcGxhdGVzIGFzIFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW0nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc2VsZWN0ZWRJdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHlmaWx0ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5RmlsdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdncm91cCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZHJvcGRvd25pY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bkljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGluZ2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbHRlcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmxhdE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLnJlZHVjZSgocmVzdWx0LCBvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7IG9wdGlvbkdyb3VwOiBvcHRpb24sIGdyb3VwOiB0cnVlLCBpbmRleCB9KTtcblxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uR3JvdXBDaGlsZHJlbiA9IHRoaXMuZ2V0T3B0aW9uR3JvdXBDaGlsZHJlbihvcHRpb24pO1xuXG4gICAgICAgICAgICBvcHRpb25Hcm91cENoaWxkcmVuICYmIG9wdGlvbkdyb3VwQ2hpbGRyZW4uZm9yRWFjaCgobykgPT4gcmVzdWx0LnB1c2gobykpO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgYXV0b1VwZGF0ZU1vZGVsKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RPbkZvY3VzICYmIHRoaXMuYXV0b09wdGlvbkZvY3VzICYmICF0aGlzLmhhc1NlbGVjdGVkT3B0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCh0aGlzLmZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpKTtcbiAgICAgICAgICAgIHRoaXMub25PcHRpb25TZWxlY3QobnVsbCwgdGhpcy52aXNpYmxlT3B0aW9ucygpW3RoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCldLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXV0b0Rpc3BsYXlGaXJzdCAmJiAodGhpcy5tb2RlbFZhbHVlKCkgPT09IG51bGwgfHwgdGhpcy5tb2RlbFZhbHVlKCkgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wbGFjZWhvbGRlcigpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kID0gdGhpcy5maW5kRmlyc3RPcHRpb25JbmRleCgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25PcHRpb25TZWxlY3QobnVsbCwgdGhpcy52aXNpYmxlT3B0aW9ucygpW2luZF0sIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uT3B0aW9uU2VsZWN0KGV2ZW50LCBvcHRpb24sIGlzSGlkZSA9IHRydWUsIHByZXZlbnRDaGFuZ2UgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZChvcHRpb24pKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwodmFsdWUsIGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCh0aGlzLmZpbmRTZWxlY3RlZE9wdGlvbkluZGV4KCkpO1xuICAgICAgICAgICAgcHJldmVudENoYW5nZSA9PT0gZmFsc2UgJiYgdGhpcy5vbkNoYW5nZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNIaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk9wdGlvbk1vdXNlRW50ZXIoZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzT25Ib3Zlcikge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgoZXZlbnQsIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKHZhbHVlLCBldmVudD8pIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodmFsdWUpO1xuICAgICAgICB0aGlzLm1vZGVsVmFsdWUuc2V0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvblVwZGF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSwgZW1pdEV2ZW50OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGaWx0ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKGVtaXRFdmVudCAmJiB0aGlzLmFsbG93TW9kZWxDaGFuZ2UoKSkge1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsVmFsdWUuc2V0KHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUVkaXRhYmxlTGFiZWwoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBhbGxvd01vZGVsQ2hhbmdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdXRvRGlzcGxheUZpcnN0ICYmICF0aGlzLnBsYWNlaG9sZGVyKCkgJiYgKHRoaXMubW9kZWxWYWx1ZSgpID09PSB1bmRlZmluZWQgfHwgdGhpcy5tb2RlbFZhbHVlKCkgPT09IG51bGwpICYmICF0aGlzLmVkaXRhYmxlICYmIHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWRPcHRpb25FbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzRW1wdHkodGhpcy5zZWxlY3RlZE9wdGlvbik7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pICYmIHRoaXMuaXNPcHRpb25WYWx1ZUVxdWFsc01vZGVsVmFsdWUob3B0aW9uKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzT3B0aW9uVmFsdWVFcXVhbHNNb2RlbFZhbHVlKG9wdGlvbjogYW55KSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5lcXVhbHModGhpcy5tb2RlbFZhbHVlKCksIHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKSwgdGhpcy5lcXVhbGl0eUtleSgpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUVkaXRhYmxlTGFiZWwoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVBsYWNlSG9sZGVyRm9yRmxvYXRpbmdMYWJlbCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVBsYWNlSG9sZGVyRm9yRmxvYXRpbmdMYWJlbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3BsYWNlaG9sZGVyKCkgIT09IG51bGwgJiYgdGhpcy5fcGxhY2Vob2xkZXIoKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRvIG92ZXJ3cml0ZSB0aGUgcGxhY2Vob2xkZXIgaWYgaXQncyBhbHJlYWR5IHNldFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgY29uc3QgaXNJbkZsb2F0aW5nTGFiZWwgPSBwYXJlbnRFbGVtZW50Py5jbGFzc0xpc3QuY29udGFpbnMoJ3AtZmxvYXQtbGFiZWwnKTtcbiAgICAgICAgaWYgKHBhcmVudEVsZW1lbnQgJiYgaXNJbkZsb2F0aW5nTGFiZWwgJiYgIXRoaXMuc2VsZWN0ZWRPcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbCcpO1xuICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIuc2V0KGxhYmVsLnRleHRDb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUVkaXRhYmxlTGFiZWwoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRhYmxlSW5wdXRWaWV3Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdGFibGVJbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5nZXRPcHRpb25MYWJlbCh0aGlzLnNlbGVjdGVkT3B0aW9uKSB8fCB0aGlzLm1vZGVsVmFsdWUoKSB8fCAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyRWRpdGFibGVMYWJlbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdGFibGVJbnB1dFZpZXdDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5lZGl0YWJsZUlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE9wdGlvbkluZGV4KGluZGV4LCBzY3JvbGxlck9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlydHVhbFNjcm9sbGVyRGlzYWJsZWQgPyBpbmRleCA6IHNjcm9sbGVyT3B0aW9ucyAmJiBzY3JvbGxlck9wdGlvbnMuZ2V0SXRlbU9wdGlvbnMoaW5kZXgpWydpbmRleCddO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkxhYmVsKG9wdGlvbjogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkxhYmVsICE9PSB1bmRlZmluZWQgJiYgdGhpcy5vcHRpb25MYWJlbCAhPT0gbnVsbCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uLCB0aGlzLm9wdGlvbkxhYmVsKSA6IG9wdGlvbiAmJiBvcHRpb24ubGFiZWwgIT09IHVuZGVmaW5lZCA/IG9wdGlvbi5sYWJlbCA6IG9wdGlvbjtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25WYWx1ZShvcHRpb246IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25WYWx1ZSAmJiB0aGlzLm9wdGlvblZhbHVlICE9PSBudWxsID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb24sIHRoaXMub3B0aW9uVmFsdWUpIDogIXRoaXMub3B0aW9uTGFiZWwgJiYgb3B0aW9uICYmIG9wdGlvbi52YWx1ZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9uLnZhbHVlIDogb3B0aW9uO1xuICAgIH1cblxuICAgIGlzT3B0aW9uRGlzYWJsZWQob3B0aW9uOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0T3B0aW9uVmFsdWUodGhpcy5tb2RlbFZhbHVlKCkpID09PSB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbikgfHwgKHRoaXMuZ2V0T3B0aW9uTGFiZWwodGhpcy5tb2RlbFZhbHVlKCkgPT09IHRoaXMuZ2V0T3B0aW9uTGFiZWwob3B0aW9uKSkgJiYgb3B0aW9uLmRpc2FibGVkID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbkRpc2FibGVkID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb24sIHRoaXMub3B0aW9uRGlzYWJsZWQpIDogb3B0aW9uICYmIG9wdGlvbi5kaXNhYmxlZCAhPT0gdW5kZWZpbmVkID8gb3B0aW9uLmRpc2FibGVkIDogZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRPcHRpb25Hcm91cExhYmVsKG9wdGlvbkdyb3VwOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uR3JvdXBMYWJlbCAhPT0gdW5kZWZpbmVkICYmIHRoaXMub3B0aW9uR3JvdXBMYWJlbCAhPT0gbnVsbCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uR3JvdXAsIHRoaXMub3B0aW9uR3JvdXBMYWJlbCkgOiBvcHRpb25Hcm91cCAmJiBvcHRpb25Hcm91cC5sYWJlbCAhPT0gdW5kZWZpbmVkID8gb3B0aW9uR3JvdXAubGFiZWwgOiBvcHRpb25Hcm91cDtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25Hcm91cENoaWxkcmVuKG9wdGlvbkdyb3VwOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uR3JvdXBDaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMub3B0aW9uR3JvdXBDaGlsZHJlbiAhPT0gbnVsbCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uR3JvdXAsIHRoaXMub3B0aW9uR3JvdXBDaGlsZHJlbikgOiBvcHRpb25Hcm91cC5pdGVtcztcbiAgICB9XG5cbiAgICBnZXRBcmlhUG9zSW5zZXQoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICh0aGlzLm9wdGlvbkdyb3VwTGFiZWxcbiAgICAgICAgICAgICAgICA/IGluZGV4IC1cbiAgICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnMoKVxuICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCBpbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChvcHRpb24pID0+IHRoaXMuaXNPcHRpb25Hcm91cChvcHRpb24pKS5sZW5ndGhcbiAgICAgICAgICAgICAgICA6IGluZGV4KSArIDFcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgYXJpYVNldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVPcHRpb25zKCkuZmlsdGVyKChvcHRpb24pID0+ICF0aGlzLmlzT3B0aW9uR3JvdXAob3B0aW9uKSkubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBmaWx0ZXIgcmVzZXQuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyByZXNldEZpbHRlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZmlsdGVyVmFsdWUuc2V0KG51bGwpO1xuXG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZpZXdDaGlsZCAmJiB0aGlzLmZpbHRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25Db250YWluZXJDbGljayhldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkgfHwgdGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzSW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuXG4gICAgICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ2NsZWFyaWNvbicgfHwgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXBjLXNlY3Rpb249XCJjbGVhcmljb25cIl0nKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm92ZXJsYXlWaWV3Q2hpbGQgfHwgIXRoaXMub3ZlcmxheVZpZXdDaGlsZC5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPyB0aGlzLmhpZGUodHJ1ZSkgOiB0aGlzLnNob3codHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNsaWNrLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLmNsaWNrZWQuc2V0KHRydWUpO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuX29wdGlvbnMoKSB8fCAodGhpcy52aXNpYmxlT3B0aW9ucygpICYmIHRoaXMudmlzaWJsZU9wdGlvbnMoKS5sZW5ndGggPT09IDApO1xuICAgIH1cblxuICAgIG9uRWRpdGFibGVJbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgY29uc3QgbWF0Y2hlZCA9IHRoaXMuc2VhcmNoT3B0aW9ucyhldmVudCwgdmFsdWUpO1xuICAgICAgICAhbWF0Y2hlZCAmJiB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoLTEpO1xuXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwodmFsdWUsIGV2ZW50KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICB9LCAxKTtcblxuICAgICAgICAhdGhpcy5vdmVybGF5VmlzaWJsZSAmJiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHZhbHVlKSAmJiB0aGlzLnNob3coKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcGxheXMgdGhlIHBhbmVsLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdyhpc0ZvY3VzPykge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgZm9jdXNlZE9wdGlvbkluZGV4ID0gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEgPyB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpIDogdGhpcy5hdXRvT3B0aW9uRm9jdXMgPyB0aGlzLmZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpIDogdGhpcy5lZGl0YWJsZSA/IC0xIDogdGhpcy5maW5kU2VsZWN0ZWRPcHRpb25JbmRleCgpO1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoZm9jdXNlZE9wdGlvbkluZGV4KTtcblxuICAgICAgICBpZiAoaXNGb2N1cykge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLmZvY3VzSW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgdGhpcy5pdGVtc1dyYXBwZXIgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5vdmVybGF5Vmlld0NoaWxkPy5vdmVybGF5Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LCB0aGlzLnZpcnR1YWxTY3JvbGwgPyAnLnAtc2Nyb2xsZXInIDogJy5wLWRyb3Bkb3duLWl0ZW1zLXdyYXBwZXInKTtcbiAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbCAmJiB0aGlzLnNjcm9sbGVyPy5zZXRDb250ZW50RWwodGhpcy5pdGVtc1ZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMubW9kZWxWYWx1ZSgpID8gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSA6IC0xO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsZXI/LnNjcm9sbFRvSW5kZXgoc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRMaXN0SXRlbSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLml0ZW1zV3JhcHBlciwgJy5wLWRyb3Bkb3duLWl0ZW0ucC1oaWdobGlnaHQnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRMaXN0SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRMaXN0SXRlbS5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcsIGlubGluZTogJ25lYXJlc3QnIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJWaWV3Q2hpbGQgJiYgdGhpcy5maWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmVudE1vZGVsVG91Y2hlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvZm9jdXNGaWx0ZXIgJiYgIXRoaXMuZWRpdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICd2b2lkJykge1xuICAgICAgICAgICAgdGhpcy5pdGVtc1dyYXBwZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5vbkhpZGUuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIHBhbmVsLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZShpc0ZvY3VzPykge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgIHRoaXMuY2xpY2tlZC5zZXQoZmFsc2UpO1xuICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG5cbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheU9wdGlvbnM/Lm1vZGUgPT09ICdtb2RhbCcpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIudW5ibG9ja0JvZHlTY3JvbGwoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5maWx0ZXIgJiYgdGhpcy5yZXNldEZpbHRlck9uSGlkZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldEZpbHRlcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0ZvY3VzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXModGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRhYmxlICYmIHRoaXMuZWRpdGFibGVJbnB1dFZpZXdDaGlsZCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmZvY3VzKHRoaXMuZWRpdGFibGVJbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAvLyBGb3IgU2NyZWVuUmVhZGVyc1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgZm9jdXNlZE9wdGlvbkluZGV4ID0gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEgPyB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpIDogdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLmF1dG9PcHRpb25Gb2N1cyA/IHRoaXMuZmluZEZpcnN0Rm9jdXNlZE9wdGlvbkluZGV4KCkgOiAtMTtcbiAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KGZvY3VzZWRPcHRpb25JbmRleCk7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5zY3JvbGxJblZpZXcodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSk7XG5cbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByZXZlbnRNb2RlbFRvdWNoZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXZlbnRNb2RlbFRvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgc2VhcmNoOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkgfHwgdGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIC8vZG93blxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy91cFxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93VXBLZXkoZXZlbnQsIHRoaXMuZWRpdGFibGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93TGVmdEtleShldmVudCwgdGhpcy5lZGl0YWJsZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0RlbGV0ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRlbGV0ZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Ib21lS2V5KGV2ZW50LCB0aGlzLmVkaXRhYmxlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW5kS2V5KGV2ZW50LCB0aGlzLmVkaXRhYmxlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25QYWdlRG93bktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblBhZ2VVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vc3BhY2VcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3BhY2VLZXkoZXZlbnQsIHNlYXJjaCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vZW50ZXJcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ051bXBhZEVudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2VzY2FwZSBhbmQgdGFiXG4gICAgICAgICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Fc2NhcGVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdCYWNrc3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub25CYWNrc3BhY2VLZXkoZXZlbnQsIHRoaXMuZWRpdGFibGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdTaGlmdExlZnQnOlxuICAgICAgICAgICAgY2FzZSAnU2hpZnRSaWdodCc6XG4gICAgICAgICAgICAgICAgLy9OT09QXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKCFldmVudC5tZXRhS2V5ICYmIE9iamVjdFV0aWxzLmlzUHJpbnRhYmxlQ2hhcmFjdGVyKGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgIXRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5hdXRvU2hvd1BhbmVsT25QcmludGFibGVDaGFyYWN0ZXJLZXlEb3duICYmIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAhdGhpcy5lZGl0YWJsZSAmJiB0aGlzLnNlYXJjaE9wdGlvbnMoZXZlbnQsIGV2ZW50LmtleSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsaWNrZWQuc2V0KGZhbHNlKTtcbiAgICB9XG5cbiAgICBvbkZpbHRlcktleURvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcEtleShldmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dMZWZ0S2V5KGV2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWVLZXkoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbmRLZXkoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICdOdW1wYWRFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyS2V5KGV2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXNjYXBlS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiS2V5KGV2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRmlsdGVyQmx1cihldmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoLTEpO1xuICAgIH1cblxuICAgIG9uQXJyb3dEb3duS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLmVkaXRhYmxlICYmIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCB0aGlzLmZpbmRTZWxlY3RlZE9wdGlvbkluZGV4KCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uSW5kZXggPSB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSA/IHRoaXMuZmluZE5leHRPcHRpb25JbmRleCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpKSA6IHRoaXMuY2xpY2tlZCgpID8gdGhpcy5maW5kRmlyc3RPcHRpb25JbmRleCgpIDogdGhpcy5maW5kRmlyc3RGb2N1c2VkT3B0aW9uSW5kZXgoKTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgoZXZlbnQsIG9wdGlvbkluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkgIT09IC0xID8gdGhpcy5maW5kTmV4dE9wdGlvbkluZGV4KHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkpIDogdGhpcy5maW5kRmlyc3RGb2N1c2VkT3B0aW9uSW5kZXgoKTtcbiAgICAgICAgLy8gdGhpcy5jaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgoZXZlbnQsIG9wdGlvbkluZGV4KTtcblxuICAgICAgICAvLyAhdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLnNob3coKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCBpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldChpbmRleCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEluVmlldygpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RPbkZvY3VzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy52aXNpYmxlT3B0aW9ucygpW2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KGV2ZW50LCBvcHRpb24sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB2aXJ0dWFsU2Nyb2xsZXJEaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnZpcnR1YWxTY3JvbGw7XG4gICAgfVxuXG4gICAgc2Nyb2xsSW5WaWV3KGluZGV4ID0gLTEpIHtcbiAgICAgICAgY29uc3QgaWQgPSBpbmRleCAhPT0gLTEgPyBgJHt0aGlzLmlkfV8ke2luZGV4fWAgOiB0aGlzLmZvY3VzZWRPcHRpb25JZDtcblxuICAgICAgICBpZiAodGhpcy5pdGVtc1ZpZXdDaGlsZCAmJiB0aGlzLml0ZW1zVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5pdGVtc1ZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCBgbGlbaWQ9XCIke2lkfVwiXWApO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3ICYmIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBibG9jazogJ25lYXJlc3QnLCBpbmxpbmU6ICduZWFyZXN0JyB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMudmlydHVhbFNjcm9sbGVyRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsICYmIHRoaXMuc2Nyb2xsZXI/LnNjcm9sbFRvSW5kZXgoaW5kZXggIT09IC0xID8gaW5kZXggOiB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpKTtcbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc1NlbGVjdGVkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbFZhbHVlKCkgIT09IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpc1ZhbGlkU2VsZWN0ZWRPcHRpb24ob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRPcHRpb24ob3B0aW9uKSAmJiB0aGlzLmlzU2VsZWN0ZWQob3B0aW9uKTtcbiAgICB9XG5cbiAgICBlcXVhbGl0eUtleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uVmFsdWUgPyBudWxsIDogdGhpcy5kYXRhS2V5O1xuICAgIH1cblxuICAgIGZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZmluZFNlbGVjdGVkT3B0aW9uSW5kZXgoKTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkSW5kZXggPCAwID8gdGhpcy5maW5kRmlyc3RPcHRpb25JbmRleCgpIDogc2VsZWN0ZWRJbmRleDtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RPcHRpb25JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnMoKS5maW5kSW5kZXgoKG9wdGlvbikgPT4gdGhpcy5pc1ZhbGlkT3B0aW9uKG9wdGlvbikpO1xuICAgIH1cblxuICAgIGZpbmRTZWxlY3RlZE9wdGlvbkluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNTZWxlY3RlZE9wdGlvbigpID8gdGhpcy52aXNpYmxlT3B0aW9ucygpLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRTZWxlY3RlZE9wdGlvbihvcHRpb24pKSA6IC0xO1xuICAgIH1cblxuICAgIGZpbmROZXh0T3B0aW9uSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlZE9wdGlvbkluZGV4ID1cbiAgICAgICAgICAgIGluZGV4IDwgdGhpcy52aXNpYmxlT3B0aW9ucygpLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICA/IHRoaXMudmlzaWJsZU9wdGlvbnMoKVxuICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRPcHRpb24ob3B0aW9uKSlcbiAgICAgICAgICAgICAgICA6IC0xO1xuICAgICAgICByZXR1cm4gbWF0Y2hlZE9wdGlvbkluZGV4ID4gLTEgPyBtYXRjaGVkT3B0aW9uSW5kZXggKyBpbmRleCArIDEgOiBpbmRleDtcbiAgICB9XG5cbiAgICBmaW5kUHJldk9wdGlvbkluZGV4KGluZGV4KSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRPcHRpb25JbmRleCA9IGluZGV4ID4gMCA/IE9iamVjdFV0aWxzLmZpbmRMYXN0SW5kZXgodGhpcy52aXNpYmxlT3B0aW9ucygpLnNsaWNlKDAsIGluZGV4KSwgKG9wdGlvbikgPT4gdGhpcy5pc1ZhbGlkT3B0aW9uKG9wdGlvbikpIDogLTE7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4IDogaW5kZXg7XG4gICAgfVxuXG4gICAgZmluZExhc3RPcHRpb25JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmZpbmRMYXN0SW5kZXgodGhpcy52aXNpYmxlT3B0aW9ucygpLCAob3B0aW9uKSA9PiB0aGlzLmlzVmFsaWRPcHRpb24ob3B0aW9uKSk7XG4gICAgfVxuXG4gICAgZmluZExhc3RGb2N1c2VkT3B0aW9uSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLmZpbmRTZWxlY3RlZE9wdGlvbkluZGV4KCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkSW5kZXggPCAwID8gdGhpcy5maW5kTGFzdE9wdGlvbkluZGV4KCkgOiBzZWxlY3RlZEluZGV4O1xuICAgIH1cblxuICAgIGlzVmFsaWRPcHRpb24ob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBvcHRpb24gIT09IHVuZGVmaW5lZCAmJiBvcHRpb24gIT09IG51bGwgJiYgISh0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKSB8fCB0aGlzLmlzT3B0aW9uR3JvdXAob3B0aW9uKSk7XG4gICAgfVxuXG4gICAgaXNPcHRpb25Hcm91cChvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uR3JvdXBMYWJlbCAhPT0gdW5kZWZpbmVkICYmIHRoaXMub3B0aW9uR3JvdXBMYWJlbCAhPT0gbnVsbCAmJiBvcHRpb24ub3B0aW9uR3JvdXAgIT09IHVuZGVmaW5lZCAmJiBvcHRpb24ub3B0aW9uR3JvdXAgIT09IG51bGwgJiYgb3B0aW9uLmdyb3VwO1xuICAgIH1cblxuICAgIG9uQXJyb3dVcEtleShldmVudDogS2V5Ym9hcmRFdmVudCwgcHJlc3NlZEluSW5wdXRUZXh0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSAmJiAhcHJlc3NlZEluSW5wdXRUZXh0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSB0aGlzLnZpc2libGVPcHRpb25zKClbdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKV07XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdChldmVudCwgb3B0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEgPyB0aGlzLmZpbmRQcmV2T3B0aW9uSW5kZXgodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSkgOiB0aGlzLmNsaWNrZWQoKSA/IHRoaXMuZmluZExhc3RPcHRpb25JbmRleCgpIDogdGhpcy5maW5kTGFzdEZvY3VzZWRPcHRpb25JbmRleCgpO1xuXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChldmVudCwgb3B0aW9uSW5kZXgpO1xuXG4gICAgICAgICAgICAhdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBvbkFycm93TGVmdEtleShldmVudDogS2V5Ym9hcmRFdmVudCwgcHJlc3NlZEluSW5wdXRUZXh0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgcHJlc3NlZEluSW5wdXRUZXh0ICYmIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgfVxuXG4gICAgb25EZWxldGVLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0NsZWFyKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKGV2ZW50KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoZXZlbnQ6IGFueSwgcHJlc3NlZEluSW5wdXRUZXh0OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHByZXNzZWRJbklucHV0VGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0YXJnZXQudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNldFNlbGVjdGlvblJhbmdlKDAsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChldmVudCwgdGhpcy5maW5kRmlyc3RPcHRpb25JbmRleCgpKTtcblxuICAgICAgICAgICAgIXRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW5kS2V5KGV2ZW50OiBhbnksIHByZXNzZWRJbklucHV0VGV4dCA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChwcmVzc2VkSW5JbnB1dFRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0YXJnZXQudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVuID0gdGFyZ2V0LnZhbHVlLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShsZW4sIGxlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCB0aGlzLmZpbmRMYXN0T3B0aW9uSW5kZXgoKSk7XG5cbiAgICAgICAgICAgICF0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblBhZ2VEb3duS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KHRoaXMudmlzaWJsZU9wdGlvbnMoKS5sZW5ndGggLSAxKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblBhZ2VVcEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLnNjcm9sbEluVmlldygwKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblNwYWNlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50LCBwcmVzc2VkSW5JbnB1dFRleHQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICAhdGhpcy5lZGl0YWJsZSAmJiAhcHJlc3NlZEluSW5wdXRUZXh0ICYmIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgfVxuXG4gICAgb25FbnRlcktleShldmVudCwgcHJlc3NlZEluSW5wdXQgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duS2V5KGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMudmlzaWJsZU9wdGlvbnMoKVt0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpXTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KGV2ZW50LCBvcHRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAhcHJlc3NlZEluSW5wdXQgJiYgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRXNjYXBlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5oaWRlKHRydWUpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uVGFiS2V5KGV2ZW50LCBwcmVzc2VkSW5JbnB1dFRleHQgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXByZXNzZWRJbklucHV0VGV4dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5oYXNGb2N1c2FibGVFbGVtZW50cygpKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyhldmVudC5zaGlmdEtleSA/IHRoaXMubGFzdEhpZGRlbkZvY3VzYWJsZUVsZW1lbnRPbk92ZXJsYXkubmF0aXZlRWxlbWVudCA6IHRoaXMuZmlyc3RIaWRkZW5Gb2N1c2FibGVFbGVtZW50T25PdmVybGF5Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSAmJiB0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMudmlzaWJsZU9wdGlvbnMoKVt0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvblNlbGVjdChldmVudCwgb3B0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLmhpZGUodGhpcy5maWx0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIG9uRmlyc3RIaWRkZW5Gb2N1cyhldmVudCkge1xuICAgICAgICBjb25zdCBmb2N1c2FibGVFbCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQgPT09IHRoaXMuZm9jdXNJbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCA/IERvbUhhbmRsZXIuZ2V0Rmlyc3RGb2N1c2FibGVFbGVtZW50KHRoaXMub3ZlcmxheVZpZXdDaGlsZC5lbD8ubmF0aXZlRWxlbWVudCwgJzpub3QoLnAtaGlkZGVuLWZvY3VzYWJsZSknKSA6IHRoaXMuZm9jdXNJbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgRG9tSGFuZGxlci5mb2N1cyhmb2N1c2FibGVFbCk7XG4gICAgfVxuXG4gICAgb25MYXN0SGlkZGVuRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZm9jdXNhYmxlRWwgPVxuICAgICAgICAgICAgZXZlbnQucmVsYXRlZFRhcmdldCA9PT0gdGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgPyBEb21IYW5kbGVyLmdldExhc3RGb2N1c2FibGVFbGVtZW50KHRoaXMub3ZlcmxheVZpZXdDaGlsZD8ub3ZlcmxheVZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCwgJzpub3QoW2RhdGEtcC1oaWRkZW4tZm9jdXNhYmxlPVwidHJ1ZVwiXSknKVxuICAgICAgICAgICAgICAgIDogdGhpcy5mb2N1c0lucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIERvbUhhbmRsZXIuZm9jdXMoZm9jdXNhYmxlRWwpO1xuICAgIH1cblxuICAgIGhhc0ZvY3VzYWJsZUVsZW1lbnRzKCkge1xuICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5nZXRGb2N1c2FibGVFbGVtZW50cyh0aGlzLm92ZXJsYXlWaWV3Q2hpbGQub3ZlcmxheVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnOm5vdChbZGF0YS1wLWhpZGRlbi1mb2N1c2FibGU9XCJ0cnVlXCJdKTpub3QoW2NsYXNzPVwicC1kcm9wZG93bi1pdGVtcy13cmFwcGVyXCJdKScpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgb25CYWNrc3BhY2VLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIHByZXNzZWRJbklucHV0VGV4dCA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChwcmVzc2VkSW5JbnB1dFRleHQpIHtcbiAgICAgICAgICAgICF0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoRmllbGRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJCeT8uc3BsaXQoJywnKSB8fCB0aGlzLmZpbHRlckZpZWxkcyB8fCBbdGhpcy5vcHRpb25MYWJlbF07XG4gICAgfVxuXG4gICAgc2VhcmNoT3B0aW9ucyhldmVudCwgY2hhcikge1xuICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gKHRoaXMuc2VhcmNoVmFsdWUgfHwgJycpICsgY2hhcjtcblxuICAgICAgICBsZXQgb3B0aW9uSW5kZXggPSAtMTtcbiAgICAgICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIG9wdGlvbkluZGV4ID0gdGhpcy52aXNpYmxlT3B0aW9ucygpXG4gICAgICAgICAgICAgICAgLnNsaWNlKHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkpXG4gICAgICAgICAgICAgICAgLmZpbmRJbmRleCgob3B0aW9uKSA9PiB0aGlzLmlzT3B0aW9uTWF0Y2hlZChvcHRpb24pKTtcbiAgICAgICAgICAgIG9wdGlvbkluZGV4ID1cbiAgICAgICAgICAgICAgICBvcHRpb25JbmRleCA9PT0gLTFcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnZpc2libGVPcHRpb25zKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kSW5kZXgoKG9wdGlvbikgPT4gdGhpcy5pc09wdGlvbk1hdGNoZWQob3B0aW9uKSlcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25JbmRleCArIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25JbmRleCA9IHRoaXMudmlzaWJsZU9wdGlvbnMoKS5maW5kSW5kZXgoKG9wdGlvbikgPT4gdGhpcy5pc09wdGlvbk1hdGNoZWQob3B0aW9uKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25JbmRleCA9PT0gLTEgJiYgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIG9wdGlvbkluZGV4ID0gdGhpcy5maW5kRmlyc3RGb2N1c2VkT3B0aW9uSW5kZXgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCBvcHRpb25JbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWFyY2hUaW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zZWFyY2hUaW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICByZXR1cm4gbWF0Y2hlZDtcbiAgICB9XG5cbiAgICBpc09wdGlvbk1hdGNoZWQob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRPcHRpb24ob3B0aW9uKSAmJiB0aGlzLmdldE9wdGlvbkxhYmVsKG9wdGlvbikudG9TdHJpbmcoKS50b0xvY2FsZUxvd2VyQ2FzZSh0aGlzLmZpbHRlckxvY2FsZSkuc3RhcnRzV2l0aCh0aGlzLnNlYXJjaFZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuZmlsdGVyTG9jYWxlKSk7XG4gICAgfVxuXG4gICAgb25GaWx0ZXJJbnB1dENoYW5nZShldmVudDogRXZlbnQgfCBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgICAgICB0aGlzLl9maWx0ZXJWYWx1ZS5zZXQodmFsdWUpO1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoLTEpO1xuICAgICAgICB0aGlzLm9uRmlsdGVyLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgZmlsdGVyOiB0aGlzLl9maWx0ZXJWYWx1ZSgpIH0pO1xuICAgICAgICAhdGhpcy52aXJ0dWFsU2Nyb2xsZXJEaXNhYmxlZCAmJiB0aGlzLnNjcm9sbGVyLnNjcm9sbFRvSW5kZXgoMCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5Vmlld0NoaWxkLmFsaWduT3ZlcmxheSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBhcHBseUZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5lZGl0YWJsZSkgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy5wLWRyb3Bkb3duLWxhYmVsLnAtaW5wdXR0ZXh0JykuZm9jdXMoKTtcbiAgICAgICAgZWxzZSBEb21IYW5kbGVyLmZvY3VzKHRoaXMuZm9jdXNJbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgZm9jdXMuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hcHBseUZvY3VzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgbW9kZWwuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBjbGVhcihldmVudD86IEV2ZW50KSB7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwobnVsbCwgZXZlbnQpO1xuICAgICAgICB0aGlzLmNsZWFyRWRpdGFibGVMYWJlbCgpO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy52YWx1ZSB9KTtcbiAgICAgICAgdGhpcy5vbkNsZWFyLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLnJlc2V0RmlsdGVyKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIFNoYXJlZE1vZHVsZSwgVG9vbHRpcE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBTY3JvbGxlck1vZHVsZSwgQXV0b0ZvY3VzTW9kdWxlLCBUaW1lc0ljb24sIENoZXZyb25Eb3duSWNvbiwgU2VhcmNoSWNvbiwgQmxhbmtJY29uLCBDaGVja0ljb25dLFxuICAgIGV4cG9ydHM6IFtEcm9wZG93biwgT3ZlcmxheU1vZHVsZSwgU2hhcmVkTW9kdWxlLCBTY3JvbGxlck1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbRHJvcGRvd24sIERyb3Bkb3duSXRlbV1cbn0pXG5leHBvcnQgY2xhc3MgRHJvcGRvd25Nb2R1bGUge31cbiJdfQ==