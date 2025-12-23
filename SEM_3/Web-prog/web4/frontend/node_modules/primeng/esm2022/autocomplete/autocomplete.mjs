import { CommonModule, DOCUMENT } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ContentChildren, effect, EventEmitter, forwardRef, Inject, Input, NgModule, numberAttribute, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayModule } from 'primeng/overlay';
import { RippleModule } from 'primeng/ripple';
import { ScrollerModule } from 'primeng/scroller';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { TimesIcon } from 'primeng/icons/times';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/overlay";
import * as i4 from "primeng/button";
import * as i5 from "primeng/ripple";
import * as i6 from "primeng/scroller";
import * as i7 from "primeng/autofocus";
export const AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoComplete),
    multi: true
};
/**
 * AutoComplete is an input component that provides real-time suggestions when being typed.
 * @group Components
 */
export class AutoComplete {
    document;
    el;
    renderer;
    cd;
    config;
    overlayService;
    zone;
    /**
     * Minimum number of characters to initiate a search.
     * @group Props
     */
    minLength = 1;
    /**
     * Delay between keystrokes to wait before sending a query.
     * @group Props
     */
    delay = 300;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Inline style of the overlay panel element.
     * @group Props
     */
    panelStyle;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    panelStyleClass;
    /**
     * Inline style of the input field.
     * @group Props
     */
    inputStyle;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Inline style of the input field.
     * @group Props
     */
    inputStyleClass;
    /**
     * Hint text for the input field.
     * @group Props
     */
    placeholder;
    /**
     * When present, it specifies that the input cannot be typed.
     * @group Props
     */
    readonly;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Maximum height of the suggestions panel.
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
     * Maximum number of character allows in the input field.
     * @group Props
     */
    maxlength;
    /**
     * Name of the input element.
     * @group Props
     */
    name;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    required;
    /**
     * Size of the input field.
     * @group Props
     */
    size;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * When enabled, highlights the first item in the list by default.
     * @group Props
     */
    autoHighlight;
    /**
     * When present, autocomplete clears the manual input if it does not match of the suggestions to force only accepting values from the suggestions.
     * @group Props
     */
    forceSelection;
    /**
     * Type of the input, defaults to "text".
     * @group Props
     */
    type = 'text';
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel;
    /**
     * Defines a string that labels the dropdown button for accessibility.
     * @group Props
     */
    dropdownAriaLabel;
    /**
     * Specifies one or more IDs in the DOM that labels the input field.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Icon class of the dropdown icon.
     * @group Props
     */
    dropdownIcon;
    /**
     * Ensures uniqueness of selected items on multiple mode.
     * @group Props
     */
    unique = true;
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    group;
    /**
     * Whether to run a query when input receives focus.
     * @group Props
     */
    completeOnFocus = false;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * Field of a suggested object to resolve and display.
     * @group Props
     * @deprecated use optionLabel property instead
     */
    field;
    /**
     * Displays a button next to the input field when enabled.
     * @group Props
     */
    dropdown;
    /**
     * Whether to show the empty message or not.
     * @group Props
     */
    showEmptyMessage = true;
    /**
     * Specifies the behavior dropdown button. Default "blank" mode sends an empty string and "current" mode sends the input value.
     * @group Props
     */
    dropdownMode = 'blank';
    /**
     * Specifies if multiple values can be selected.
     * @group Props
     */
    multiple;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey;
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage;
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
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    autocomplete = 'off';
    /**
     * Name of the options field of an option group.
     * @group Props
     */
    optionGroupChildren = 'items';
    /**
     * Name of the label field of an option group.
     * @group Props
     */
    optionGroupLabel = 'label';
    /**
     * Options for the overlay element.
     * @group Props
     */
    overlayOptions;
    /**
     * An array of suggestions to display.
     * @group Props
     */
    get suggestions() {
        return this._suggestions();
    }
    set suggestions(value) {
        this._suggestions.set(value);
        this.handleSuggestionsChange();
    }
    /**
     * Element dimensions of option for virtual scrolling.
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
     * Property name or getter function to use as the label of an option.
     * @group Props
     */
    optionLabel;
    /**
     * Property name or getter function to use as the value of an option.
     * @group Props
     */
    optionValue;
    /**
     * Unique identifier of the component.
     * @group Props
     */
    id;
    /**
     * Text to display when the search is active. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue '{0} results are available'
     */
    searchMessage;
    /**
     * Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue 'No selected item'
     */
    emptySelectionMessage;
    /**
     * Text to be displayed in hidden accessible field when options are selected. Defaults to global value in i18n translation configuration.
     * @group Props
     * @defaultValue '{0} items selected'
     */
    selectionMessage;
    /**
     * Whether to focus on the first visible or selected element when the overlay panel is shown.
     * @group Props
     */
    autoOptionFocus = false;
    /**
     * When enabled, the focused option is selected.
     * @group Props
     */
    selectOnFocus;
    /**
     * Locale to use in searching. The default locale is the host environment's current locale.
     * @group Props
     */
    searchLocale;
    /**
     * Property name or getter function to use as the disabled flag of an option, defaults to false when not defined.
     * @group Props
     */
    optionDisabled;
    /**
     * When enabled, the hovered option will be focused.
     * @group Props
     */
    focusOnHover;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant = 'outlined';
    /**
     * Callback to invoke to search for suggestions.
     * @param {AutoCompleteCompleteEvent} event - Custom complete event.
     * @group Emits
     */
    completeMethod = new EventEmitter();
    /**
     * Callback to invoke when a suggestion is selected.
     * @param {AutoCompleteSelectEvent} event - custom select event.
     * @group Emits
     */
    onSelect = new EventEmitter();
    /**
     * Callback to invoke when a selected value is removed.
     * @param {AutoCompleteUnselectEvent} event - custom unselect event.
     * @group Emits
     */
    onUnselect = new EventEmitter();
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    /**
     * Callback to invoke to when dropdown button is clicked.
     * @param {AutoCompleteDropdownClickEvent} event - custom dropdown click event.
     * @group Emits
     */
    onDropdownClick = new EventEmitter();
    /**
     * Callback to invoke when clear button is clicked.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke on input key up.
     * @param {KeyboardEvent} event - Keyboard event.
     * @group Emits
     */
    onKeyUp = new EventEmitter();
    /**
     * Callback to invoke on overlay is shown.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Callback to invoke on overlay is hidden.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onHide = new EventEmitter();
    /**
     * Callback to invoke on lazy load data.
     * @param {AutoCompleteLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    containerEL;
    inputEL;
    multiInputEl;
    multiContainerEL;
    dropdownButton;
    itemsViewChild;
    scroller;
    overlayViewChild;
    templates;
    _itemSize;
    itemsWrapper;
    itemTemplate;
    emptyTemplate;
    headerTemplate;
    footerTemplate;
    selectedItemTemplate;
    groupTemplate;
    loaderTemplate;
    removeIconTemplate;
    loadingIconTemplate;
    clearIconTemplate;
    dropdownIconTemplate;
    value;
    _suggestions = signal(null);
    onModelChange = () => { };
    onModelTouched = () => { };
    timeout;
    overlayVisible;
    suggestionsUpdated;
    highlightOption;
    highlightOptionChanged;
    focused = false;
    _filled;
    get filled() {
        return this._filled;
    }
    set filled(value) {
        this._filled = value;
    }
    loading;
    scrollHandler;
    listId;
    searchTimeout;
    dirty = false;
    modelValue = signal(null);
    focusedMultipleOptionIndex = signal(-1);
    focusedOptionIndex = signal(-1);
    visibleOptions = computed(() => {
        return this.group ? this.flatOptions(this._suggestions()) : this._suggestions() || [];
    });
    inputValue = computed(() => {
        const modelValue = this.modelValue();
        const selectedOption = this.getSelectedOption(modelValue);
        if (modelValue) {
            if (typeof modelValue === 'object' || this.optionValue) {
                const label = this.getOptionLabel(selectedOption);
                return label != null ? label : modelValue;
            }
            else {
                return modelValue;
            }
        }
        else {
            return '';
        }
    });
    get focusedMultipleOptionId() {
        return this.focusedMultipleOptionIndex() !== -1 ? `${this.id}_multiple_option_${this.focusedMultipleOptionIndex()}` : null;
    }
    get focusedOptionId() {
        return this.focusedOptionIndex() !== -1 ? `${this.id}_${this.focusedOptionIndex()}` : null;
    }
    get containerClass() {
        return {
            'p-autocomplete p-component p-inputwrapper': true,
            'p-disabled': this.disabled,
            'p-focus': this.focused,
            'p-autocomplete-dd': this.dropdown,
            'p-autocomplete-multiple': this.multiple,
            'p-inputwrapper-focus': this.focused,
            'p-overlay-open': this.overlayVisible
        };
    }
    get multiContainerClass() {
        return { 'p-autocomplete-multiple-container p-component p-inputtext': true, 'p-variant-filled': this.variant === 'filled' || this.config.inputStyle() === 'filled' };
    }
    get panelClass() {
        return {
            'p-autocomplete-panel p-component': true,
            'p-input-filled': this.config.inputStyle() === 'filled',
            'p-ripple-disabled': this.config.ripple === false
        };
    }
    get panelStyles() {
        return {
            'max-height': this.virtualScroll ? 'auto' : this.scrollHeight,
            ...this.panelStyle
        };
    }
    get inputClass() {
        return {
            'p-autocomplete-input p-inputtext p-component': !this.multiple,
            'p-autocomplete-dd-input': this.dropdown,
            'p-variant-filled': this.variant === 'filled' || this.config.inputStyle() === 'filled'
        };
    }
    get searchResultMessageText() {
        return ObjectUtils.isNotEmpty(this.visibleOptions()) && this.overlayVisible ? this.searchMessageText.replaceAll('{0}', this.visibleOptions().length) : this.emptySearchMessageText;
    }
    get searchMessageText() {
        return this.searchMessage || this.config.translation.searchMessage || '';
    }
    get emptySearchMessageText() {
        return this.emptyMessage || this.config.translation.emptySearchMessage || '';
    }
    get selectionMessageText() {
        return this.selectionMessage || this.config.translation.selectionMessage || '';
    }
    get emptySelectionMessageText() {
        return this.emptySelectionMessage || this.config.translation.emptySelectionMessage || '';
    }
    get selectedMessageText() {
        return this.hasSelectedOption() ? this.selectionMessageText.replaceAll('{0}', this.multiple ? this.modelValue().length : '1') : this.emptySelectionMessageText;
    }
    get ariaSetSize() {
        return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
    }
    get listLabel() {
        return this.config.getTranslation(TranslationKeys.ARIA)['listLabel'];
    }
    get virtualScrollerDisabled() {
        return !this.virtualScroll;
    }
    get optionValueSelected() {
        return typeof this.modelValue() === 'string' && this.optionValue;
    }
    get isVisibleClearIcon() {
        return this.modelValue() != null && this.hasSelectedOption() && this.showClear && !this.disabled && !this.loading;
    }
    constructor(document, el, renderer, cd, config, overlayService, zone) {
        this.document = document;
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.config = config;
        this.overlayService = overlayService;
        this.zone = zone;
        effect(() => {
            this.filled = ObjectUtils.isNotEmpty(this.modelValue());
        });
    }
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
        this.cd.detectChanges();
    }
    ngAfterViewChecked() {
        //Use timeouts as since Angular 4.2, AfterViewChecked is broken and not called after panel is updated
        if (this.suggestionsUpdated && this.overlayViewChild) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    if (this.overlayViewChild) {
                        this.overlayViewChild.alignOverlay();
                    }
                }, 1);
                this.suggestionsUpdated = false;
            });
        }
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
                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
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
                case 'removetokenicon':
                    this.removeIconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    handleSuggestionsChange() {
        if (this.loading) {
            this._suggestions().length > 0 || this.showEmptyMessage ? this.show() : !!this.emptyTemplate ? this.show() : this.hide();
            const focusedOptionIndex = this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
            this.focusedOptionIndex.set(focusedOptionIndex);
            this.suggestionsUpdated = true;
            this.loading = false;
            this.cd.markForCheck();
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
    isOptionGroup(option) {
        return this.optionGroupLabel && option.optionGroup && option.group;
    }
    findFirstOptionIndex() {
        return this.visibleOptions().findIndex((option) => this.isValidOption(option));
    }
    findLastOptionIndex() {
        return ObjectUtils.findLastIndex(this.visibleOptions(), (option) => this.isValidOption(option));
    }
    findFirstFocusedOptionIndex() {
        const selectedIndex = this.findSelectedOptionIndex();
        return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    }
    findLastFocusedOptionIndex() {
        const selectedIndex = this.findSelectedOptionIndex();
        return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
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
    isValidSelectedOption(option) {
        return this.isValidOption(option) && this.isSelected(option);
    }
    isValidOption(option) {
        return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    }
    isOptionDisabled(option) {
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
    }
    isSelected(option) {
        if (this.multiple) {
            return this.unique ? this.modelValue()?.find((model) => ObjectUtils.equals(model, this.getOptionValue(option), this.equalityKey())) : false;
        }
        return ObjectUtils.equals(this.modelValue(), this.getOptionValue(option), this.equalityKey());
    }
    isOptionMatched(option, value) {
        return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.searchLocale) === value.toLocaleLowerCase(this.searchLocale);
    }
    isInputClicked(event) {
        return event.target === this.inputEL.nativeElement;
    }
    isDropdownClicked(event) {
        return this.dropdownButton?.nativeElement ? event.target === this.dropdownButton.nativeElement || this.dropdownButton.nativeElement.contains(event.target) : false;
    }
    equalityKey() {
        return this.dataKey; // TODO: The 'optionValue' properties can be added.
    }
    onContainerClick(event) {
        if (this.disabled || this.loading || this.isInputClicked(event) || this.isDropdownClicked(event)) {
            return;
        }
        if (!this.overlayViewChild || !this.overlayViewChild.overlayViewChild?.nativeElement.contains(event.target)) {
            DomHandler.focus(this.inputEL.nativeElement);
        }
    }
    handleDropdownClick(event) {
        let query = undefined;
        if (this.overlayVisible) {
            this.hide(true);
        }
        else {
            DomHandler.focus(this.inputEL.nativeElement);
            query = this.inputEL.nativeElement.value;
            if (this.dropdownMode === 'blank')
                this.search(event, '', 'dropdown');
            else if (this.dropdownMode === 'current')
                this.search(event, query, 'dropdown');
        }
        this.onDropdownClick.emit({ originalEvent: event, query });
    }
    onInput(event) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        let query = event.target.value;
        if (this.maxlength !== null) {
            query = query.split('').slice(0, this.maxlength).join('');
        }
        if (!this.multiple && !this.forceSelection) {
            this.updateModel(query);
        }
        if (query.length === 0 && !this.multiple && !this.completeOnFocus) {
            this.onClear.emit();
            this.hide();
        }
        else {
            if (query.length >= this.minLength) {
                this.focusedOptionIndex.set(-1);
                this.searchTimeout = setTimeout(() => {
                    this.search(event, query, 'input');
                }, this.delay);
            }
            else {
                this.hide();
            }
        }
    }
    onInputChange(event) {
        if (this.forceSelection) {
            let valid = false;
            if (this.visibleOptions()) {
                const matchedValue = this.visibleOptions().find((option) => this.isOptionMatched(option, this.inputEL.nativeElement.value || ''));
                if (matchedValue !== undefined) {
                    valid = true;
                    !this.isSelected(matchedValue) && this.onOptionSelect(event, matchedValue);
                }
            }
            if (!valid) {
                this.inputEL.nativeElement.value = '';
                !this.multiple && this.updateModel(null);
            }
        }
    }
    onInputFocus(event) {
        if (this.disabled) {
            // For ScreenReaders
            return;
        }
        if (!this.dirty && this.completeOnFocus) {
            this.search(event, event.target.value, 'focus');
            this.show();
        }
        this.dirty = true;
        this.focused = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        this.overlayVisible && this.scrollInView(this.focusedOptionIndex());
        this.onFocus.emit(event);
    }
    onMultipleContainerFocus(event) {
        if (this.disabled) {
            // For ScreenReaders
            return;
        }
        this.focused = true;
    }
    onMultipleContainerBlur(event) {
        this.focusedMultipleOptionIndex.set(-1);
        this.focused = false;
    }
    onMultipleContainerKeyDown(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        switch (event.code) {
            case 'ArrowLeft':
                this.onArrowLeftKeyOnMultiple(event);
                break;
            case 'ArrowRight':
                this.onArrowRightKeyOnMultiple(event);
                break;
            case 'Backspace':
                this.onBackspaceKeyOnMultiple(event);
                break;
            default:
                break;
        }
    }
    onInputBlur(event) {
        this.dirty = false;
        this.focused = false;
        this.focusedOptionIndex.set(-1);
        /** triggered only if user can input freely text
         * Later on it must set touched also onSelect */
        if (!this.forceSelection) {
            this.onModelTouched();
        }
        this.onBlur.emit(event);
    }
    onInputPaste(event) {
        this.onKeyDown(event);
    }
    onInputKeyUp(event) {
        this.onKeyUp.emit(event);
    }
    onKeyDown(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;
            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;
            case 'ArrowRight':
                this.onArrowRightKey(event);
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
            case 'NumpadEnter':
                this.onEnterKey(event);
                break;
            case 'Escape':
                this.onEscapeKey(event);
                break;
            case 'Tab':
                this.onTabKey(event);
                break;
            case 'Backspace':
                this.onBackspaceKey(event);
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;
            default:
                break;
        }
    }
    onArrowDownKey(event) {
        if (!this.overlayVisible) {
            return;
        }
        const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();
        this.changeFocusedOptionIndex(event, optionIndex);
        event.preventDefault();
        event.stopPropagation();
    }
    onArrowUpKey(event) {
        if (!this.overlayVisible) {
            return;
        }
        if (event.altKey) {
            if (this.focusedOptionIndex() !== -1) {
                this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
            }
            this.overlayVisible && this.hide();
            event.preventDefault();
        }
        else {
            const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();
            this.changeFocusedOptionIndex(event, optionIndex);
            event.preventDefault();
            event.stopPropagation();
        }
    }
    onArrowLeftKey(event) {
        const target = event.currentTarget;
        this.focusedOptionIndex.set(-1);
        if (this.multiple) {
            if (ObjectUtils.isEmpty(target.value) && this.hasSelectedOption()) {
                DomHandler.focus(this.multiContainerEL.nativeElement);
                this.focusedMultipleOptionIndex.set(this.modelValue().length);
            }
            else {
                event.stopPropagation(); // To prevent onArrowLeftKeyOnMultiple method
            }
        }
    }
    onArrowRightKey(event) {
        this.focusedOptionIndex.set(-1);
        this.multiple && event.stopPropagation(); // To prevent onArrowRightKeyOnMultiple method
    }
    onHomeKey(event) {
        const { currentTarget } = event;
        const len = currentTarget.value.length;
        currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
        this.focusedOptionIndex.set(-1);
        event.preventDefault();
    }
    onEndKey(event) {
        const { currentTarget } = event;
        const len = currentTarget.value.length;
        currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
        this.focusedOptionIndex.set(-1);
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
                this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
                event.preventDefault();
            }
            this.hide();
        }
    }
    onEscapeKey(event) {
        this.overlayVisible && this.hide(true);
        event.preventDefault();
    }
    onTabKey(event) {
        if (this.focusedOptionIndex() !== -1) {
            this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
        }
        this.overlayVisible && this.hide();
    }
    onBackspaceKey(event) {
        if (this.multiple) {
            if (ObjectUtils.isNotEmpty(this.modelValue()) && !this.inputEL.nativeElement.value) {
                const removedValue = this.modelValue()[this.modelValue().length - 1];
                const newValue = this.modelValue().slice(0, -1);
                this.updateModel(newValue);
                this.onUnselect.emit({ originalEvent: event, value: removedValue });
            }
            event.stopPropagation(); // To prevent onBackspaceKeyOnMultiple method
        }
    }
    onArrowLeftKeyOnMultiple(event) {
        const optionIndex = this.focusedMultipleOptionIndex() < 1 ? 0 : this.focusedMultipleOptionIndex() - 1;
        this.focusedMultipleOptionIndex.set(optionIndex);
    }
    onArrowRightKeyOnMultiple(event) {
        let optionIndex = this.focusedMultipleOptionIndex();
        optionIndex++;
        this.focusedMultipleOptionIndex.set(optionIndex);
        if (optionIndex > this.modelValue().length - 1) {
            this.focusedMultipleOptionIndex.set(-1);
            DomHandler.focus(this.inputEL.nativeElement);
        }
    }
    onBackspaceKeyOnMultiple(event) {
        if (this.focusedMultipleOptionIndex() !== -1) {
            this.removeOption(event, this.focusedMultipleOptionIndex());
        }
    }
    onOptionSelect(event, option, isHide = true) {
        const value = this.getOptionValue(option);
        if (this.multiple) {
            this.inputEL.nativeElement.value = '';
            if (!this.isSelected(option)) {
                this.updateModel([...(this.modelValue() || []), value]);
            }
        }
        else {
            this.updateModel(value);
        }
        /** triggers model touched to update FormControl
         * value in case updateOn is set to "blur" */
        this.onModelTouched();
        this.onSelect.emit({ originalEvent: event, value: option });
        isHide && this.hide(true);
    }
    onOptionMouseEnter(event, index) {
        if (this.focusOnHover) {
            this.changeFocusedOptionIndex(event, index);
        }
    }
    search(event, query, source) {
        //allow empty string but not undefined or null
        if (query === undefined || query === null) {
            return;
        }
        //do not search on input change if minLength is not met
        if (source === 'input' && query.trim().length < this.minLength) {
            return;
        }
        this.loading = true;
        this.completeMethod.emit({ originalEvent: event, query });
    }
    removeOption(event, index) {
        event.stopPropagation();
        const removedOption = this.modelValue()[index];
        const value = this.modelValue()
            .filter((_, i) => i !== index)
            .map((option) => this.getOptionValue(option));
        this.updateModel(value);
        this.onUnselect.emit({ originalEvent: event, value: removedOption });
        DomHandler.focus(this.inputEL.nativeElement);
    }
    updateModel(value) {
        this.value = value;
        this.modelValue.set(value);
        this.onModelChange(value);
        this.updateInputValue();
        this.cd.markForCheck();
    }
    updateInputValue() {
        if (this.inputEL && this.inputEL.nativeElement) {
            if (!this.multiple) {
                this.inputEL.nativeElement.value = this.inputValue();
            }
            else {
                this.inputEL.nativeElement.value = '';
            }
        }
    }
    autoUpdateModel() {
        if ((this.selectOnFocus || this.autoHighlight) && this.autoOptionFocus && !this.hasSelectedOption()) {
            const focusedOptionIndex = this.findFirstFocusedOptionIndex();
            this.focusedOptionIndex.set(focusedOptionIndex);
            this.onOptionSelect(null, this.visibleOptions()[this.focusedOptionIndex()], false);
        }
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
    changeFocusedOptionIndex(event, index) {
        if (this.focusedOptionIndex() !== index) {
            this.focusedOptionIndex.set(index);
            this.scrollInView();
            if (this.selectOnFocus) {
                this.onOptionSelect(event, this.visibleOptions()[index], false);
            }
        }
    }
    show(isFocus = false) {
        this.dirty = true;
        this.overlayVisible = true;
        const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
        this.focusedOptionIndex.set(focusedOptionIndex);
        isFocus && DomHandler.focus(this.inputEL.nativeElement);
        if (isFocus) {
            DomHandler.focus(this.inputEL.nativeElement);
        }
        this.onShow.emit();
        this.cd.markForCheck();
    }
    hide(isFocus = false) {
        const _hide = () => {
            this.dirty = isFocus;
            this.overlayVisible = false;
            this.focusedOptionIndex.set(-1);
            isFocus && DomHandler.focus(this.inputEL.nativeElement);
            this.onHide.emit();
            this.cd.markForCheck();
        };
        // Added to adjust the scroller's content position when the dropdown closes.
        if (this.virtualScroll) {
            this.scroller.onScrollChange(event);
        }
        setTimeout(() => {
            _hide();
        }, 0); // For ScreenReaders
    }
    clear() {
        this.updateModel(null);
        this.inputEL.nativeElement.value = '';
        this.onClear.emit();
    }
    writeValue(value) {
        this.value = value;
        this.modelValue.set(value);
        this.updateInputValue();
        this.cd.markForCheck();
    }
    hasSelectedOption() {
        return ObjectUtils.isNotEmpty(this.modelValue());
    }
    getAriaPosInset(index) {
        return ((this.optionGroupLabel
            ? index -
                this.visibleOptions()
                    .slice(0, index)
                    .filter((option) => this.isOptionGroup(option)).length
            : index) + 1);
    }
    getOptionLabel(option) {
        return this.field || this.optionLabel ? ObjectUtils.resolveFieldData(option, this.field || this.optionLabel) : option && option.label != undefined ? option.label : option;
    }
    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    }
    getOptionIndex(index, scrollerOptions) {
        return this.virtualScrollerDisabled ? index : scrollerOptions && scrollerOptions.getItemOptions(index)['index'];
    }
    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label != undefined ? optionGroup.label : optionGroup;
    }
    getOptionGroupChildren(optionGroup) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }
    getSelectedOption(modelValue) {
        if (!this.optionValue) {
            return modelValue;
        }
        return (this.suggestions || []).find((item) => ObjectUtils.resolveFieldData(item, this.optionValue) === modelValue);
    }
    getMultipleLabel(option) {
        let selected = this.getSelectedOption(option);
        return this.getOptionLabel(selected);
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
    onOverlayAnimationStart(event) {
        if (event.toState === 'visible') {
            this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild.overlayViewChild?.nativeElement, this.virtualScroll ? '.p-scroller' : '.p-autocomplete-panel');
            if (this.virtualScroll) {
                this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);
                this.scroller.viewInit();
            }
            if (this.visibleOptions() && this.visibleOptions().length) {
                if (this.virtualScroll) {
                    const selectedIndex = this.modelValue() ? this.focusedOptionIndex() : -1;
                    if (selectedIndex !== -1) {
                        this.scroller?.scrollToIndex(selectedIndex);
                    }
                }
                else {
                    let selectedListItem = DomHandler.findSingle(this.itemsWrapper, '.p-autocomplete-item.p-highlight');
                    if (selectedListItem) {
                        selectedListItem.scrollIntoView({ block: 'nearest', inline: 'center' });
                    }
                }
            }
        }
    }
    ngOnDestroy() {
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AutoComplete, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: AutoComplete, selector: "p-autoComplete", inputs: { minLength: ["minLength", "minLength", numberAttribute], delay: ["delay", "delay", numberAttribute], style: "style", panelStyle: "panelStyle", styleClass: "styleClass", panelStyleClass: "panelStyleClass", inputStyle: "inputStyle", inputId: "inputId", inputStyleClass: "inputStyleClass", placeholder: "placeholder", readonly: ["readonly", "readonly", booleanAttribute], disabled: ["disabled", "disabled", booleanAttribute], scrollHeight: "scrollHeight", lazy: ["lazy", "lazy", booleanAttribute], virtualScroll: ["virtualScroll", "virtualScroll", booleanAttribute], virtualScrollItemSize: ["virtualScrollItemSize", "virtualScrollItemSize", numberAttribute], virtualScrollOptions: "virtualScrollOptions", maxlength: ["maxlength", "maxlength", (value) => numberAttribute(value, null)], name: "name", required: ["required", "required", booleanAttribute], size: ["size", "size", numberAttribute], appendTo: "appendTo", autoHighlight: ["autoHighlight", "autoHighlight", booleanAttribute], forceSelection: ["forceSelection", "forceSelection", booleanAttribute], type: "type", autoZIndex: ["autoZIndex", "autoZIndex", booleanAttribute], baseZIndex: ["baseZIndex", "baseZIndex", numberAttribute], ariaLabel: "ariaLabel", dropdownAriaLabel: "dropdownAriaLabel", ariaLabelledBy: "ariaLabelledBy", dropdownIcon: "dropdownIcon", unique: ["unique", "unique", booleanAttribute], group: ["group", "group", booleanAttribute], completeOnFocus: ["completeOnFocus", "completeOnFocus", booleanAttribute], showClear: ["showClear", "showClear", booleanAttribute], field: "field", dropdown: ["dropdown", "dropdown", booleanAttribute], showEmptyMessage: ["showEmptyMessage", "showEmptyMessage", booleanAttribute], dropdownMode: "dropdownMode", multiple: ["multiple", "multiple", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute], dataKey: "dataKey", emptyMessage: "emptyMessage", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", autofocus: ["autofocus", "autofocus", booleanAttribute], autocomplete: "autocomplete", optionGroupChildren: "optionGroupChildren", optionGroupLabel: "optionGroupLabel", overlayOptions: "overlayOptions", suggestions: "suggestions", itemSize: "itemSize", optionLabel: "optionLabel", optionValue: "optionValue", id: "id", searchMessage: "searchMessage", emptySelectionMessage: "emptySelectionMessage", selectionMessage: "selectionMessage", autoOptionFocus: ["autoOptionFocus", "autoOptionFocus", booleanAttribute], selectOnFocus: ["selectOnFocus", "selectOnFocus", booleanAttribute], searchLocale: ["searchLocale", "searchLocale", booleanAttribute], optionDisabled: "optionDisabled", focusOnHover: ["focusOnHover", "focusOnHover", booleanAttribute], variant: "variant" }, outputs: { completeMethod: "completeMethod", onSelect: "onSelect", onUnselect: "onUnselect", onFocus: "onFocus", onBlur: "onBlur", onDropdownClick: "onDropdownClick", onClear: "onClear", onKeyUp: "onKeyUp", onShow: "onShow", onHide: "onHide", onLazyLoad: "onLazyLoad" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "((focused && !disabled) || autofocus) || overlayVisible", "class.p-autocomplete-clearable": "showClear && !disabled" }, classAttribute: "p-element p-inputwrapper" }, providers: [AUTOCOMPLETE_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerEL", first: true, predicate: ["container"], descendants: true }, { propertyName: "inputEL", first: true, predicate: ["focusInput"], descendants: true }, { propertyName: "multiInputEl", first: true, predicate: ["multiIn"], descendants: true }, { propertyName: "multiContainerEL", first: true, predicate: ["multiContainer"], descendants: true }, { propertyName: "dropdownButton", first: true, predicate: ["ddBtn"], descendants: true }, { propertyName: "itemsViewChild", first: true, predicate: ["items"], descendants: true }, { propertyName: "scroller", first: true, predicate: ["scroller"], descendants: true }, { propertyName: "overlayViewChild", first: true, predicate: ["overlay"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick($event)">
            <input
                *ngIf="!multiple"
                #focusInput
                pAutoFocus
                [autofocus]="autofocus"
                [ngClass]="inputClass"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [type]="type"
                [attr.value]="inputValue()"
                [attr.id]="inputId"
                [autocomplete]="autocomplete"
                [required]="required"
                [name]="name"
                aria-autocomplete="list"
                role="combobox"
                [attr.placeholder]="placeholder"
                [attr.size]="size"
                [attr.maxlength]="maxlength"
                [tabindex]="!disabled ? tabindex : -1"
                [readonly]="readonly"
                [disabled]="disabled"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-required]="required"
                [attr.aria-expanded]="overlayVisible ?? false"
                [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (input)="onInput($event)"
                (keydown)="onKeyDown($event)"
                (change)="onInputChange($event)"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (paste)="onInputPaste($event)"
                (keyup)="onInputKeyUp($event)"
            />
            <ng-container *ngIf="isVisibleClearIcon">
                <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-autocomplete-clear-icon'" (click)="clear()" [attr.aria-hidden]="true" />
                <span *ngIf="clearIconTemplate" class="p-autocomplete-clear-icon" (click)="clear()" [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>

            <ul
                *ngIf="multiple"
                #multiContainer
                [ngClass]="multiContainerClass"
                [tabindex]="-1"
                role="listbox"
                [attr.aria-orientation]="'horizontal'"
                [attr.aria-activedescendant]="focused ? focusedMultipleOptionId : undefined"
                (focus)="onMultipleContainerFocus($event)"
                (blur)="onMultipleContainerBlur($event)"
                (keydown)="onMultipleContainerKeyDown($event)"
            >
                <li
                    #token
                    *ngFor="let option of modelValue(); let i = index"
                    [ngClass]="{ 'p-autocomplete-token': true, 'p-focus': focusedMultipleOptionIndex() === i }"
                    [attr.id]="id + '_multiple_option_' + i"
                    role="option"
                    [attr.aria-label]="getOptionLabel(option)"
                    [attr.aria-setsize]="modelValue().length"
                    [attr.aria-posinset]="i + 1"
                    [attr.aria-selected]="true"
                >
                    <ng-container *ngTemplateOutlet="selectedItemTemplate; context: { $implicit: option }"></ng-container>
                    <span *ngIf="!selectedItemTemplate" class="p-autocomplete-token-label">{{ getMultipleLabel(option) }}</span>
                    <span class="p-autocomplete-token-icon" (click)="!readonly ? removeOption($event, i) : ''">
                        <TimesCircleIcon [styleClass]="'p-autocomplete-token-icon'" *ngIf="!removeIconTemplate" [attr.aria-hidden]="true" />
                        <span *ngIf="removeIconTemplate" class="p-autocomplete-token-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="removeIconTemplate"></ng-template>
                        </span>
                    </span>
                </li>
                <li class="p-autocomplete-input-token" role="option">
                    <input
                        #focusInput
                        pAutoFocus
                        [autofocus]="autofocus"
                        [ngClass]="inputClass"
                        [ngStyle]="inputStyle"
                        [class]="inputStyleClass"
                        [attr.type]="type"
                        [attr.id]="inputId"
                        [autocomplete]="autocomplete"
                        [required]="required"
                        [attr.name]="name"
                        role="combobox"
                        [attr.placeholder]="!filled ? placeholder : null"
                        [attr.size]="size"
                        aria-autocomplete="list"
                        [attr.maxlength]="maxlength"
                        [tabindex]="!disabled ? tabindex : -1"
                        [readonly]="readonly"
                        [disabled]="disabled"
                        [attr.aria-label]="ariaLabel"
                        [attr.aria-labelledby]="ariaLabelledBy"
                        [attr.aria-required]="required"
                        [attr.aria-expanded]="overlayVisible ?? false"
                        [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                        [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                        (input)="onInput($event)"
                        (keydown)="onKeyDown($event)"
                        (change)="onInputChange($event)"
                        (focus)="onInputFocus($event)"
                        (blur)="onInputBlur($event)"
                        (paste)="onInputPaste($event)"
                        (keyup)="onInputKeyUp($event)"
                    />
                </li>
            </ul>
            <ng-container *ngIf="loading">
                <SpinnerIcon *ngIf="!loadingIconTemplate" [styleClass]="'p-autocomplete-loader'" [spin]="true" [attr.aria-hidden]="true" />
                <span *ngIf="loadingIconTemplate" class="p-autocomplete-loader pi-spin " [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <button #ddBtn type="button" pButton [attr.aria-label]="dropdownAriaLabel" class="p-autocomplete-dropdown p-button-icon-only" [disabled]="disabled" pRipple (click)="handleDropdownClick($event)" *ngIf="dropdown" [attr.tabindex]="tabindex">
                <span *ngIf="dropdownIcon" [ngClass]="dropdownIcon" [attr.aria-hidden]="true"></span>
                <ng-container *ngIf="!dropdownIcon">
                    <ChevronDownIcon *ngIf="!dropdownIconTemplate" />
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </ng-container>
            </button>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onHide)="hide()"
            >
                <div [ngClass]="panelClass" [ngStyle]="panelStyles" [class]="panelStyleClass">
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
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
                        <ul #items class="p-autocomplete-items" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox" [attr.id]="id + '_list'" [attr.aria-label]="listLabel">
                            <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                <ng-container *ngIf="isOptionGroup(option)">
                                    <li [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" class="p-autocomplete-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                        <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                    </li>
                                </ng-container>
                                <ng-container *ngIf="!isOptionGroup(option)">
                                    <li
                                        class="p-autocomplete-item"
                                        pRipple
                                        [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }"
                                        [ngClass]="{ 'p-highlight': isSelected(option), 'p-focus': focusedOptionIndex() === getOptionIndex(i, scrollerOptions), 'p-disabled': isOptionDisabled(option) }"
                                        [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                        role="option"
                                        [attr.aria-label]="getOptionLabel(option)"
                                        [attr.aria-selected]="isSelected(option)"
                                        [attr.aria-disabled]="isOptionDisabled(option)"
                                        [attr.data-p-focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                        [attr.aria-setsize]="ariaSetSize"
                                        [attr.aria-posinset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                        (mousedown)="onOptionSelect($event, option)"
                                        (mouseenter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                    >
                                        <span *ngIf="!itemTemplate">{{ getOptionLabel(option) }}</span>
                                        <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: option, index: scrollerOptions.getOptions ? scrollerOptions.getOptions(i) : i }"></ng-container>
                                    </li>
                                </ng-container>
                            </ng-template>
                            <li *ngIf="!items || (items && items.length === 0 && showEmptyMessage)" class="p-autocomplete-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                <ng-container *ngIf="!emptyTemplate; else empty">
                                    {{ searchResultMessageText }}
                                </ng-container>
                                <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                            </li>
                        </ul>
                    </ng-template>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
                <span role="status" aria-live="polite" class="p-hidden-accessible">
                    {{ selectedMessageText }}
                </span>
            </p-overlay>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-autocomplete{display:inline-flex;position:relative}.p-autocomplete-loader{position:absolute;top:50%;margin-top:-.5rem}.p-autocomplete-dd .p-autocomplete-input{flex:1 1 auto;width:1%}.p-autocomplete-dd .p-autocomplete-input,.p-autocomplete-dd .p-autocomplete-multiple-container{border-top-right-radius:0;border-bottom-right-radius:0}.p-autocomplete-dd .p-autocomplete-dropdown{border-top-left-radius:0;border-bottom-left-radius:0}.p-autocomplete-panel{overflow:auto}.p-autocomplete-items{margin:0;padding:0;list-style-type:none}.p-autocomplete-item{cursor:pointer;white-space:nowrap;position:relative;overflow:hidden}.p-autocomplete-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-autocomplete-token{width:fit-content;cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-autocomplete-token-icon{display:flex;cursor:pointer}.p-autocomplete-input-token{flex:1 1 auto;display:inline-flex}.p-autocomplete-input-token input{border:0 none;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-autocomplete{display:flex}.p-fluid .p-autocomplete-dd .p-autocomplete-input{width:1%}.p-autocomplete-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-autocomplete-clearable{position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => i3.Overlay), selector: "p-overlay", inputs: ["visible", "mode", "style", "styleClass", "contentStyle", "contentStyleClass", "target", "appendTo", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "listener", "responsive", "options"], outputs: ["visibleChange", "onBeforeShow", "onShow", "onBeforeHide", "onHide", "onAnimationStart", "onAnimationDone"] }, { kind: "directive", type: i0.forwardRef(() => i1.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i4.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading", "severity", "raised", "rounded", "text", "outlined", "size", "plain"] }, { kind: "directive", type: i0.forwardRef(() => i5.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => i6.Scroller), selector: "p-scroller", inputs: ["id", "style", "styleClass", "tabindex", "items", "itemSize", "scrollHeight", "scrollWidth", "orientation", "step", "delay", "resizeDelay", "appendOnly", "inline", "lazy", "disabled", "loaderDisabled", "columns", "showSpacer", "showLoader", "numToleratedItems", "loading", "autoSize", "trackBy", "options"], outputs: ["onLazyLoad", "onScroll", "onScrollIndexChange"] }, { kind: "directive", type: i0.forwardRef(() => i7.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(() => TimesCircleIcon), selector: "TimesCircleIcon" }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AutoComplete, decorators: [{
            type: Component,
            args: [{ selector: 'p-autoComplete', template: `
        <div #container [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick($event)">
            <input
                *ngIf="!multiple"
                #focusInput
                pAutoFocus
                [autofocus]="autofocus"
                [ngClass]="inputClass"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [type]="type"
                [attr.value]="inputValue()"
                [attr.id]="inputId"
                [autocomplete]="autocomplete"
                [required]="required"
                [name]="name"
                aria-autocomplete="list"
                role="combobox"
                [attr.placeholder]="placeholder"
                [attr.size]="size"
                [attr.maxlength]="maxlength"
                [tabindex]="!disabled ? tabindex : -1"
                [readonly]="readonly"
                [disabled]="disabled"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-required]="required"
                [attr.aria-expanded]="overlayVisible ?? false"
                [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                (input)="onInput($event)"
                (keydown)="onKeyDown($event)"
                (change)="onInputChange($event)"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (paste)="onInputPaste($event)"
                (keyup)="onInputKeyUp($event)"
            />
            <ng-container *ngIf="isVisibleClearIcon">
                <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-autocomplete-clear-icon'" (click)="clear()" [attr.aria-hidden]="true" />
                <span *ngIf="clearIconTemplate" class="p-autocomplete-clear-icon" (click)="clear()" [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>

            <ul
                *ngIf="multiple"
                #multiContainer
                [ngClass]="multiContainerClass"
                [tabindex]="-1"
                role="listbox"
                [attr.aria-orientation]="'horizontal'"
                [attr.aria-activedescendant]="focused ? focusedMultipleOptionId : undefined"
                (focus)="onMultipleContainerFocus($event)"
                (blur)="onMultipleContainerBlur($event)"
                (keydown)="onMultipleContainerKeyDown($event)"
            >
                <li
                    #token
                    *ngFor="let option of modelValue(); let i = index"
                    [ngClass]="{ 'p-autocomplete-token': true, 'p-focus': focusedMultipleOptionIndex() === i }"
                    [attr.id]="id + '_multiple_option_' + i"
                    role="option"
                    [attr.aria-label]="getOptionLabel(option)"
                    [attr.aria-setsize]="modelValue().length"
                    [attr.aria-posinset]="i + 1"
                    [attr.aria-selected]="true"
                >
                    <ng-container *ngTemplateOutlet="selectedItemTemplate; context: { $implicit: option }"></ng-container>
                    <span *ngIf="!selectedItemTemplate" class="p-autocomplete-token-label">{{ getMultipleLabel(option) }}</span>
                    <span class="p-autocomplete-token-icon" (click)="!readonly ? removeOption($event, i) : ''">
                        <TimesCircleIcon [styleClass]="'p-autocomplete-token-icon'" *ngIf="!removeIconTemplate" [attr.aria-hidden]="true" />
                        <span *ngIf="removeIconTemplate" class="p-autocomplete-token-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="removeIconTemplate"></ng-template>
                        </span>
                    </span>
                </li>
                <li class="p-autocomplete-input-token" role="option">
                    <input
                        #focusInput
                        pAutoFocus
                        [autofocus]="autofocus"
                        [ngClass]="inputClass"
                        [ngStyle]="inputStyle"
                        [class]="inputStyleClass"
                        [attr.type]="type"
                        [attr.id]="inputId"
                        [autocomplete]="autocomplete"
                        [required]="required"
                        [attr.name]="name"
                        role="combobox"
                        [attr.placeholder]="!filled ? placeholder : null"
                        [attr.size]="size"
                        aria-autocomplete="list"
                        [attr.maxlength]="maxlength"
                        [tabindex]="!disabled ? tabindex : -1"
                        [readonly]="readonly"
                        [disabled]="disabled"
                        [attr.aria-label]="ariaLabel"
                        [attr.aria-labelledby]="ariaLabelledBy"
                        [attr.aria-required]="required"
                        [attr.aria-expanded]="overlayVisible ?? false"
                        [attr.aria-controls]="overlayVisible ? id + '_list' : null"
                        [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                        (input)="onInput($event)"
                        (keydown)="onKeyDown($event)"
                        (change)="onInputChange($event)"
                        (focus)="onInputFocus($event)"
                        (blur)="onInputBlur($event)"
                        (paste)="onInputPaste($event)"
                        (keyup)="onInputKeyUp($event)"
                    />
                </li>
            </ul>
            <ng-container *ngIf="loading">
                <SpinnerIcon *ngIf="!loadingIconTemplate" [styleClass]="'p-autocomplete-loader'" [spin]="true" [attr.aria-hidden]="true" />
                <span *ngIf="loadingIconTemplate" class="p-autocomplete-loader pi-spin " [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <button #ddBtn type="button" pButton [attr.aria-label]="dropdownAriaLabel" class="p-autocomplete-dropdown p-button-icon-only" [disabled]="disabled" pRipple (click)="handleDropdownClick($event)" *ngIf="dropdown" [attr.tabindex]="tabindex">
                <span *ngIf="dropdownIcon" [ngClass]="dropdownIcon" [attr.aria-hidden]="true"></span>
                <ng-container *ngIf="!dropdownIcon">
                    <ChevronDownIcon *ngIf="!dropdownIconTemplate" />
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </ng-container>
            </button>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onHide)="hide()"
            >
                <div [ngClass]="panelClass" [ngStyle]="panelStyles" [class]="panelStyleClass">
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
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
                        <ul #items class="p-autocomplete-items" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox" [attr.id]="id + '_list'" [attr.aria-label]="listLabel">
                            <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                <ng-container *ngIf="isOptionGroup(option)">
                                    <li [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" class="p-autocomplete-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                        <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                        <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                    </li>
                                </ng-container>
                                <ng-container *ngIf="!isOptionGroup(option)">
                                    <li
                                        class="p-autocomplete-item"
                                        pRipple
                                        [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }"
                                        [ngClass]="{ 'p-highlight': isSelected(option), 'p-focus': focusedOptionIndex() === getOptionIndex(i, scrollerOptions), 'p-disabled': isOptionDisabled(option) }"
                                        [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                        role="option"
                                        [attr.aria-label]="getOptionLabel(option)"
                                        [attr.aria-selected]="isSelected(option)"
                                        [attr.aria-disabled]="isOptionDisabled(option)"
                                        [attr.data-p-focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                        [attr.aria-setsize]="ariaSetSize"
                                        [attr.aria-posinset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                        (mousedown)="onOptionSelect($event, option)"
                                        (mouseenter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                    >
                                        <span *ngIf="!itemTemplate">{{ getOptionLabel(option) }}</span>
                                        <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: option, index: scrollerOptions.getOptions ? scrollerOptions.getOptions(i) : i }"></ng-container>
                                    </li>
                                </ng-container>
                            </ng-template>
                            <li *ngIf="!items || (items && items.length === 0 && showEmptyMessage)" class="p-autocomplete-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                <ng-container *ngIf="!emptyTemplate; else empty">
                                    {{ searchResultMessageText }}
                                </ng-container>
                                <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                            </li>
                        </ul>
                    </ng-template>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
                <span role="status" aria-live="polite" class="p-hidden-accessible">
                    {{ selectedMessageText }}
                </span>
            </p-overlay>
        </div>
    `, host: {
                        class: 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': '((focused && !disabled) || autofocus) || overlayVisible',
                        '[class.p-autocomplete-clearable]': 'showClear && !disabled'
                    }, providers: [AUTOCOMPLETE_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.p-autocomplete{display:inline-flex;position:relative}.p-autocomplete-loader{position:absolute;top:50%;margin-top:-.5rem}.p-autocomplete-dd .p-autocomplete-input{flex:1 1 auto;width:1%}.p-autocomplete-dd .p-autocomplete-input,.p-autocomplete-dd .p-autocomplete-multiple-container{border-top-right-radius:0;border-bottom-right-radius:0}.p-autocomplete-dd .p-autocomplete-dropdown{border-top-left-radius:0;border-bottom-left-radius:0}.p-autocomplete-panel{overflow:auto}.p-autocomplete-items{margin:0;padding:0;list-style-type:none}.p-autocomplete-item{cursor:pointer;white-space:nowrap;position:relative;overflow:hidden}.p-autocomplete-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-autocomplete-token{width:fit-content;cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-autocomplete-token-icon{display:flex;cursor:pointer}.p-autocomplete-input-token{flex:1 1 auto;display:inline-flex}.p-autocomplete-input-token input{border:0 none;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-autocomplete{display:flex}.p-fluid .p-autocomplete-dd .p-autocomplete-input{width:1%}.p-autocomplete-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-autocomplete-clearable{position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }, { type: i0.NgZone }], propDecorators: { minLength: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], delay: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], style: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputId: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], scrollHeight: [{
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
            }], maxlength: [{
                type: Input,
                args: [{ transform: (value) => numberAttribute(value, null) }]
            }], name: [{
                type: Input
            }], required: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], size: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], appendTo: [{
                type: Input
            }], autoHighlight: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], forceSelection: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], type: [{
                type: Input
            }], autoZIndex: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], baseZIndex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], ariaLabel: [{
                type: Input
            }], dropdownAriaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], dropdownIcon: [{
                type: Input
            }], unique: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], group: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], completeOnFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], field: [{
                type: Input
            }], dropdown: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showEmptyMessage: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dropdownMode: [{
                type: Input
            }], multiple: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], dataKey: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autocomplete: [{
                type: Input
            }], optionGroupChildren: [{
                type: Input
            }], optionGroupLabel: [{
                type: Input
            }], overlayOptions: [{
                type: Input
            }], suggestions: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], optionLabel: [{
                type: Input
            }], optionValue: [{
                type: Input
            }], id: [{
                type: Input
            }], searchMessage: [{
                type: Input
            }], emptySelectionMessage: [{
                type: Input
            }], selectionMessage: [{
                type: Input
            }], autoOptionFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], selectOnFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], searchLocale: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], optionDisabled: [{
                type: Input
            }], focusOnHover: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], variant: [{
                type: Input
            }], completeMethod: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onUnselect: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onDropdownClick: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onKeyUp: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], onLazyLoad: [{
                type: Output
            }], containerEL: [{
                type: ViewChild,
                args: ['container']
            }], inputEL: [{
                type: ViewChild,
                args: ['focusInput']
            }], multiInputEl: [{
                type: ViewChild,
                args: ['multiIn']
            }], multiContainerEL: [{
                type: ViewChild,
                args: ['multiContainer']
            }], dropdownButton: [{
                type: ViewChild,
                args: ['ddBtn']
            }], itemsViewChild: [{
                type: ViewChild,
                args: ['items']
            }], scroller: [{
                type: ViewChild,
                args: ['scroller']
            }], overlayViewChild: [{
                type: ViewChild,
                args: ['overlay']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class AutoCompleteModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AutoCompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: AutoCompleteModule, declarations: [AutoComplete], imports: [CommonModule, OverlayModule, InputTextModule, ButtonModule, SharedModule, RippleModule, ScrollerModule, AutoFocusModule, TimesCircleIcon, SpinnerIcon, TimesIcon, ChevronDownIcon], exports: [AutoComplete, OverlayModule, SharedModule, ScrollerModule, AutoFocusModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AutoCompleteModule, imports: [CommonModule, OverlayModule, InputTextModule, ButtonModule, SharedModule, RippleModule, ScrollerModule, AutoFocusModule, TimesCircleIcon, SpinnerIcon, TimesIcon, ChevronDownIcon, OverlayModule, SharedModule, ScrollerModule, AutoFocusModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AutoCompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, InputTextModule, ButtonModule, SharedModule, RippleModule, ScrollerModule, AutoFocusModule, TimesCircleIcon, SpinnerIcon, TimesIcon, ChevronDownIcon],
                    exports: [AutoComplete, OverlayModule, SharedModule, ScrollerModule, AutoFocusModule],
                    declarations: [AutoComplete]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBR0gsZ0JBQWdCLEVBQ2hCLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsUUFBUSxFQUNSLGVBQWUsRUFDZixNQUFNLEVBRU4sWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFFUixlQUFlLEVBRWYsTUFBTSxFQUdOLE1BQU0sRUFFTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQWlELGFBQWEsRUFBbUIsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzSSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBaUMsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQVcsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBWSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIs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RUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQztvQkFDNUwsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQztvQkFDckYsWUFBWSxFQUFFLENBQUMsWUFBWSxDQUFDO2lCQUMvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIGNvbXB1dGVkLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBlZmZlY3QsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgTmdab25lLFxuICAgIG51bWJlckF0dHJpYnV0ZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgc2lnbmFsLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE92ZXJsYXlPcHRpb25zLCBPdmVybGF5U2VydmljZSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2Nyb2xsZXJPcHRpb25zLCBTaGFyZWRNb2R1bGUsIFRyYW5zbGF0aW9uS2V5cyB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEF1dG9Gb2N1c01vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXV0b2ZvY3VzJztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7IENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyLCBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgSW5wdXRUZXh0TW9kdWxlIH0gZnJvbSAncHJpbWVuZy9pbnB1dHRleHQnO1xuaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvb3ZlcmxheSc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBTY3JvbGxlciwgU2Nyb2xsZXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Njcm9sbGVyJztcbmltcG9ydCB7IE9iamVjdFV0aWxzLCBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgVGltZXNDaXJjbGVJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lc2NpcmNsZSc7XG5pbXBvcnQgeyBTcGlubmVySWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc3Bpbm5lcic7XG5pbXBvcnQgeyBUaW1lc0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3RpbWVzJztcbmltcG9ydCB7IENoZXZyb25Eb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbmRvd24nO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgQXV0b0NvbXBsZXRlQ29tcGxldGVFdmVudCwgQXV0b0NvbXBsZXRlRHJvcGRvd25DbGlja0V2ZW50LCBBdXRvQ29tcGxldGVMYXp5TG9hZEV2ZW50LCBBdXRvQ29tcGxldGVTZWxlY3RFdmVudCwgQXV0b0NvbXBsZXRlVW5zZWxlY3RFdmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBdXRvQ29tcGxldGUpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuLyoqXG4gKiBBdXRvQ29tcGxldGUgaXMgYW4gaW5wdXQgY29tcG9uZW50IHRoYXQgcHJvdmlkZXMgcmVhbC10aW1lIHN1Z2dlc3Rpb25zIHdoZW4gYmVpbmcgdHlwZWQuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYXV0b0NvbXBsZXRlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKGNsaWNrKT1cIm9uQ29udGFpbmVyQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhbXVsdGlwbGVcIlxuICAgICAgICAgICAgICAgICNmb2N1c0lucHV0XG4gICAgICAgICAgICAgICAgcEF1dG9Gb2N1c1xuICAgICAgICAgICAgICAgIFthdXRvZm9jdXNdPVwiYXV0b2ZvY3VzXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJpbnB1dENsYXNzXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwiaW5wdXRTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbdHlwZV09XCJ0eXBlXCJcbiAgICAgICAgICAgICAgICBbYXR0ci52YWx1ZV09XCJpbnB1dFZhbHVlKClcIlxuICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImlucHV0SWRcIlxuICAgICAgICAgICAgICAgIFthdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgIGFyaWEtYXV0b2NvbXBsZXRlPVwibGlzdFwiXG4gICAgICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgW2F0dHIuc2l6ZV09XCJzaXplXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5tYXhsZW5ndGhdPVwibWF4bGVuZ3RoXCJcbiAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwiIWRpc2FibGVkID8gdGFiaW5kZXggOiAtMVwiXG4gICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3ZlcmxheVZpc2libGUgPz8gZmFsc2VcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwib3ZlcmxheVZpc2libGUgPyBpZCArICdfbGlzdCcgOiBudWxsXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiZm9jdXNlZCA/IGZvY3VzZWRPcHRpb25JZCA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChwYXN0ZSk9XCJvbklucHV0UGFzdGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleXVwKT1cIm9uSW5wdXRLZXlVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNWaXNpYmxlQ2xlYXJJY29uXCI+XG4gICAgICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFjbGVhckljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWF1dG9jb21wbGV0ZS1jbGVhci1pY29uJ1wiIChjbGljayk9XCJjbGVhcigpXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjbGVhckljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1hdXRvY29tcGxldGUtY2xlYXItaWNvblwiIChjbGljayk9XCJjbGVhcigpXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjbGVhckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICAgICpuZ0lmPVwibXVsdGlwbGVcIlxuICAgICAgICAgICAgICAgICNtdWx0aUNvbnRhaW5lclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIm11bHRpQ29udGFpbmVyQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFt0YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtb3JpZW50YXRpb25dPVwiJ2hvcml6b250YWwnXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiZm9jdXNlZCA/IGZvY3VzZWRNdWx0aXBsZU9wdGlvbklkIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25NdWx0aXBsZUNvbnRhaW5lckZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChibHVyKT1cIm9uTXVsdGlwbGVDb250YWluZXJCbHVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uTXVsdGlwbGVDb250YWluZXJLZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAjdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBtb2RlbFZhbHVlKCk7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWF1dG9jb21wbGV0ZS10b2tlbic6IHRydWUsICdwLWZvY3VzJzogZm9jdXNlZE11bHRpcGxlT3B0aW9uSW5kZXgoKSA9PT0gaSB9XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaWQgKyAnX211bHRpcGxlX29wdGlvbl8nICsgaVwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldE9wdGlvbkxhYmVsKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNldHNpemVdPVwibW9kZWxWYWx1ZSgpLmxlbmd0aFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtcG9zaW5zZXRdPVwiaSArIDFcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInRydWVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNlbGVjdGVkSXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogb3B0aW9uIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhc2VsZWN0ZWRJdGVtVGVtcGxhdGVcIiBjbGFzcz1cInAtYXV0b2NvbXBsZXRlLXRva2VuLWxhYmVsXCI+e3sgZ2V0TXVsdGlwbGVMYWJlbChvcHRpb24pIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtYXV0b2NvbXBsZXRlLXRva2VuLWljb25cIiAoY2xpY2spPVwiIXJlYWRvbmx5ID8gcmVtb3ZlT3B0aW9uKCRldmVudCwgaSkgOiAnJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVzQ2lyY2xlSWNvbiBbc3R5bGVDbGFzc109XCIncC1hdXRvY29tcGxldGUtdG9rZW4taWNvbidcIiAqbmdJZj1cIiFyZW1vdmVJY29uVGVtcGxhdGVcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicmVtb3ZlSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWF1dG9jb21wbGV0ZS10b2tlbi1pY29uXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInJlbW92ZUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtYXV0b2NvbXBsZXRlLWlucHV0LXRva2VuXCIgcm9sZT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICNmb2N1c0lucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICBwQXV0b0ZvY3VzXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXV0b2ZvY3VzXT1cImF1dG9mb2N1c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJpbnB1dENsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImlucHV0U3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50eXBlXT1cInR5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCIhZmlsbGVkID8gcGxhY2Vob2xkZXIgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnNpemVdPVwic2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIubWF4bGVuZ3RoXT1cIm1heGxlbmd0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwiIWRpc2FibGVkID8gdGFiaW5kZXggOiAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3ZlcmxheVZpc2libGUgPz8gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJvdmVybGF5VmlzaWJsZSA/IGlkICsgJ19saXN0JyA6IG51bGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XT1cImZvY3VzZWQgPyBmb2N1c2VkT3B0aW9uSWQgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm9uSW5wdXRDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAocGFzdGUpPVwib25JbnB1dFBhc3RlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwKT1cIm9uSW5wdXRLZXlVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uICpuZ0lmPVwiIWxvYWRpbmdJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1hdXRvY29tcGxldGUtbG9hZGVyJ1wiIFtzcGluXT1cInRydWVcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImxvYWRpbmdJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtYXV0b2NvbXBsZXRlLWxvYWRlciBwaS1zcGluIFwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibG9hZGluZ0ljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8YnV0dG9uICNkZEJ0biB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBbYXR0ci5hcmlhLWxhYmVsXT1cImRyb3Bkb3duQXJpYUxhYmVsXCIgY2xhc3M9XCJwLWF1dG9jb21wbGV0ZS1kcm9wZG93biBwLWJ1dHRvbi1pY29uLW9ubHlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBwUmlwcGxlIChjbGljayk9XCJoYW5kbGVEcm9wZG93bkNsaWNrKCRldmVudClcIiAqbmdJZj1cImRyb3Bkb3duXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImRyb3Bkb3duSWNvblwiIFtuZ0NsYXNzXT1cImRyb3Bkb3duSWNvblwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkcm9wZG93bkljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cIiFkcm9wZG93bkljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImRyb3Bkb3duSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHAtb3ZlcmxheVxuICAgICAgICAgICAgICAgICNvdmVybGF5XG4gICAgICAgICAgICAgICAgWyh2aXNpYmxlKV09XCJvdmVybGF5VmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgW29wdGlvbnNdPVwib3ZlcmxheU9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiJ0BwYXJlbnQnXCJcbiAgICAgICAgICAgICAgICBbYXBwZW5kVG9dPVwiYXBwZW5kVG9cIlxuICAgICAgICAgICAgICAgIFtzaG93VHJhbnNpdGlvbk9wdGlvbnNdPVwic2hvd1RyYW5zaXRpb25PcHRpb25zXCJcbiAgICAgICAgICAgICAgICBbaGlkZVRyYW5zaXRpb25PcHRpb25zXT1cImhpZGVUcmFuc2l0aW9uT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgKG9uQW5pbWF0aW9uU3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG9uSGlkZSk9XCJoaWRlKClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwicGFuZWxDbGFzc1wiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVzXCIgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPHAtc2Nyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwidmlydHVhbFNjcm9sbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAjc2Nyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpdGVtc109XCJ2aXNpYmxlT3B0aW9ucygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCJ7IGhlaWdodDogc2Nyb2xsSGVpZ2h0IH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1TaXplXT1cInZpcnR1YWxTY3JvbGxJdGVtU2l6ZSB8fCBfaXRlbVNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F1dG9TaXplXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2xhenldPVwibGF6eVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAob25MYXp5TG9hZCk9XCJvbkxhenlMb2FkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJ2aXJ0dWFsU2Nyb2xsT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJjb250ZW50XCIgbGV0LWl0ZW1zIGxldC1zY3JvbGxlck9wdGlvbnM9XCJvcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJ1aWxkSW5JdGVtczsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW1zLCBvcHRpb25zOiBzY3JvbGxlck9wdGlvbnMgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJsb2FkZXJcIiBsZXQtc2Nyb2xsZXJPcHRpb25zPVwib3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibG9hZGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgb3B0aW9uczogc2Nyb2xsZXJPcHRpb25zIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvcC1zY3JvbGxlcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF2aXJ0dWFsU2Nyb2xsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiYnVpbGRJbkl0ZW1zOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogdmlzaWJsZU9wdGlvbnMoKSwgb3B0aW9uczoge30gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWxkSW5JdGVtcyBsZXQtaXRlbXMgbGV0LXNjcm9sbGVyT3B0aW9ucz1cIm9wdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCAjaXRlbXMgY2xhc3M9XCJwLWF1dG9jb21wbGV0ZS1pdGVtc1wiIFtuZ0NsYXNzXT1cInNjcm9sbGVyT3B0aW9ucy5jb250ZW50U3R5bGVDbGFzc1wiIFtzdHlsZV09XCJzY3JvbGxlck9wdGlvbnMuY29udGVudFN0eWxlXCIgcm9sZT1cImxpc3Rib3hcIiBbYXR0ci5pZF09XCJpZCArICdfbGlzdCdcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImxpc3RMYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtb3B0aW9uIFtuZ0Zvck9mXT1cIml0ZW1zXCIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNPcHRpb25Hcm91cChvcHRpb24pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgW2F0dHIuaWRdPVwiaWQgKyAnXycgKyBnZXRPcHRpb25JbmRleChpLCBzY3JvbGxlck9wdGlvbnMpXCIgY2xhc3M9XCJwLWF1dG9jb21wbGV0ZS1pdGVtLWdyb3VwXCIgW25nU3R5bGVdPVwieyBoZWlnaHQ6IHNjcm9sbGVyT3B0aW9ucy5pdGVtU2l6ZSArICdweCcgfVwiIHJvbGU9XCJvcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFncm91cFRlbXBsYXRlXCI+e3sgZ2V0T3B0aW9uR3JvdXBMYWJlbChvcHRpb24ub3B0aW9uR3JvdXApIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJncm91cFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogb3B0aW9uLm9wdGlvbkdyb3VwIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzT3B0aW9uR3JvdXAob3B0aW9uKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWF1dG9jb21wbGV0ZS1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieyBoZWlnaHQ6IHNjcm9sbGVyT3B0aW9ucy5pdGVtU2l6ZSArICdweCcgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1oaWdobGlnaHQnOiBpc1NlbGVjdGVkKG9wdGlvbiksICdwLWZvY3VzJzogZm9jdXNlZE9wdGlvbkluZGV4KCkgPT09IGdldE9wdGlvbkluZGV4KGksIHNjcm9sbGVyT3B0aW9ucyksICdwLWRpc2FibGVkJzogaXNPcHRpb25EaXNhYmxlZChvcHRpb24pIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImlkICsgJ18nICsgZ2V0T3B0aW9uSW5kZXgoaSwgc2Nyb2xsZXJPcHRpb25zKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRPcHRpb25MYWJlbChvcHRpb24pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWQob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJpc09wdGlvbkRpc2FibGVkKG9wdGlvbilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1mb2N1c2VkXT1cImZvY3VzZWRPcHRpb25JbmRleCgpID09PSBnZXRPcHRpb25JbmRleChpLCBzY3JvbGxlck9wdGlvbnMpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNldHNpemVdPVwiYXJpYVNldFNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtcG9zaW5zZXRdPVwiZ2V0QXJpYVBvc0luc2V0KGdldE9wdGlvbkluZGV4KGksIHNjcm9sbGVyT3B0aW9ucykpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uT3B0aW9uU2VsZWN0KCRldmVudCwgb3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib25PcHRpb25Nb3VzZUVudGVyKCRldmVudCwgZ2V0T3B0aW9uSW5kZXgoaSwgc2Nyb2xsZXJPcHRpb25zKSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWl0ZW1UZW1wbGF0ZVwiPnt7IGdldE9wdGlvbkxhYmVsKG9wdGlvbikgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IG9wdGlvbiwgaW5kZXg6IHNjcm9sbGVyT3B0aW9ucy5nZXRPcHRpb25zID8gc2Nyb2xsZXJPcHRpb25zLmdldE9wdGlvbnMoaSkgOiBpIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiIWl0ZW1zIHx8IChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPT09IDAgJiYgc2hvd0VtcHR5TWVzc2FnZSlcIiBjbGFzcz1cInAtYXV0b2NvbXBsZXRlLWVtcHR5LW1lc3NhZ2VcIiBbbmdTdHlsZV09XCJ7IGhlaWdodDogc2Nyb2xsZXJPcHRpb25zLml0ZW1TaXplICsgJ3B4JyB9XCIgcm9sZT1cIm9wdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWVtcHR5VGVtcGxhdGU7IGVsc2UgZW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IHNlYXJjaFJlc3VsdE1lc3NhZ2VUZXh0IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICNlbXB0eSAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gcm9sZT1cInN0YXR1c1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBzZWxlY3RlZE1lc3NhZ2VUZXh0IH19XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9wLW92ZXJsYXk+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCBwLWlucHV0d3JhcHBlcicsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICcoKGZvY3VzZWQgJiYgIWRpc2FibGVkKSB8fCBhdXRvZm9jdXMpIHx8IG92ZXJsYXlWaXNpYmxlJyxcbiAgICAgICAgJ1tjbGFzcy5wLWF1dG9jb21wbGV0ZS1jbGVhcmFibGVdJzogJ3Nob3dDbGVhciAmJiAhZGlzYWJsZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtBVVRPQ09NUExFVEVfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vYXV0b2NvbXBsZXRlLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIC8qKlxuICAgICAqIE1pbmltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdG8gaW5pdGlhdGUgYSBzZWFyY2guXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgbWluTGVuZ3RoOiBudW1iZXIgPSAxO1xuICAgIC8qKlxuICAgICAqIERlbGF5IGJldHdlZW4ga2V5c3Ryb2tlcyB0byB3YWl0IGJlZm9yZSBzZW5kaW5nIGEgcXVlcnkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgZGVsYXk6IG51bWJlciA9IDMwMDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIG92ZXJsYXkgcGFuZWwgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYW5lbFN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBvdmVybGF5IHBhbmVsIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXIgb2YgdGhlIGZvY3VzIGlucHV0IHRvIG1hdGNoIGEgbGFiZWwgZGVmaW5lZCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBIaW50IHRleHQgZm9yIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGlucHV0IGNhbm5vdCBiZSB0eXBlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcmVhZG9ubHk6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTWF4aW11bSBoZWlnaHQgb2YgdGhlIHN1Z2dlc3Rpb25zIHBhbmVsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNjcm9sbEhlaWdodDogc3RyaW5nID0gJzIwMHB4JztcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIGRhdGEgaXMgbG9hZGVkIGFuZCBpbnRlcmFjdGVkIHdpdGggaW4gbGF6eSBtYW5uZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGxhenk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBkYXRhIHNob3VsZCBiZSBsb2FkZWQgb24gZGVtYW5kIGR1cmluZyBzY3JvbGwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHZpcnR1YWxTY3JvbGw6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIGFuIGl0ZW0gaW4gdGhlIGxpc3QgZm9yIFZpcnR1YWxTY3JvbGxpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgdmlydHVhbFNjcm9sbEl0ZW1TaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgdGhlIHNjcm9sbGVyIGZlYXR1cmUuIFRoZSBwcm9wZXJ0aWVzIG9mIHNjcm9sbGVyIGNvbXBvbmVudCBjYW4gYmUgdXNlZCBsaWtlIGFuIG9iamVjdCBpbiBpdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB2aXJ0dWFsU2Nyb2xsT3B0aW9uczogU2Nyb2xsZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlciBhbGxvd3MgaW4gdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogKHZhbHVlOiB1bmtub3duKSA9PiBudW1iZXJBdHRyaWJ1dGUodmFsdWUsIG51bGwpIH0pIG1heGxlbmd0aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgYW4gaW5wdXQgZmllbGQgbXVzdCBiZSBmaWxsZWQgb3V0IGJlZm9yZSBzdWJtaXR0aW5nIHRoZSBmb3JtLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZXF1aXJlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTaXplIG9mIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBzaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBvdmVybGF5LCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nICNteWRpdiBhcyB2YXJpYWJsZSBuYW1lKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgfCBhbnk7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBoaWdobGlnaHRzIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBsaXN0IGJ5IGRlZmF1bHQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGF1dG9IaWdobGlnaHQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBhdXRvY29tcGxldGUgY2xlYXJzIHRoZSBtYW51YWwgaW5wdXQgaWYgaXQgZG9lcyBub3QgbWF0Y2ggb2YgdGhlIHN1Z2dlc3Rpb25zIHRvIGZvcmNlIG9ubHkgYWNjZXB0aW5nIHZhbHVlcyBmcm9tIHRoZSBzdWdnZXN0aW9ucy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZm9yY2VTZWxlY3Rpb246IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiB0aGUgaW5wdXQsIGRlZmF1bHRzIHRvIFwidGV4dFwiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9ICd0ZXh0JztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGF1dG9tYXRpY2FsbHkgbWFuYWdlIGxheWVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBCYXNlIHpJbmRleCB2YWx1ZSB0byB1c2UgaW4gbGF5ZXJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBpbnB1dCBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBkcm9wZG93biBidXR0b24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZHJvcGRvd25BcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgb25lIG9yIG1vcmUgSURzIGluIHRoZSBET00gdGhhdCBsYWJlbHMgdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSWNvbiBjbGFzcyBvZiB0aGUgZHJvcGRvd24gaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkcm9wZG93bkljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFbnN1cmVzIHVuaXF1ZW5lc3Mgb2Ygc2VsZWN0ZWQgaXRlbXMgb24gbXVsdGlwbGUgbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgdW5pcXVlOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgb3B0aW9ucyBhcyBncm91cGVkIHdoZW4gbmVzdGVkIG9wdGlvbnMgYXJlIHByb3ZpZGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBncm91cDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHJ1biBhIHF1ZXJ5IHdoZW4gaW5wdXQgcmVjZWl2ZXMgZm9jdXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGNvbXBsZXRlT25Gb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgYSBjbGVhciBpY29uIGlzIGRpc3BsYXllZCB0byBjbGVhciB0aGUgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dDbGVhcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEZpZWxkIG9mIGEgc3VnZ2VzdGVkIG9iamVjdCB0byByZXNvbHZlIGFuZCBkaXNwbGF5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIHVzZSBvcHRpb25MYWJlbCBwcm9wZXJ0eSBpbnN0ZWFkXG4gICAgICovXG4gICAgQElucHV0KCkgZmllbGQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyBhIGJ1dHRvbiBuZXh0IHRvIHRoZSBpbnB1dCBmaWVsZCB3aGVuIGVuYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGRyb3Bkb3duOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgZW1wdHkgbWVzc2FnZSBvciBub3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dFbXB0eU1lc3NhZ2U6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgYmVoYXZpb3IgZHJvcGRvd24gYnV0dG9uLiBEZWZhdWx0IFwiYmxhbmtcIiBtb2RlIHNlbmRzIGFuIGVtcHR5IHN0cmluZyBhbmQgXCJjdXJyZW50XCIgbW9kZSBzZW5kcyB0aGUgaW5wdXQgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZHJvcGRvd25Nb2RlOiBzdHJpbmcgPSAnYmxhbmsnO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyBpZiBtdWx0aXBsZSB2YWx1ZXMgY2FuIGJlIHNlbGVjdGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBtdWx0aXBsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHRhYmluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQSBwcm9wZXJ0eSB0byB1bmlxdWVseSBpZGVudGlmeSBhIHZhbHVlIGluIG9wdGlvbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGF0YUtleTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRleHQgdG8gZGlzcGxheSB3aGVuIHRoZXJlIGlzIG5vIGRhdGEuIERlZmF1bHRzIHRvIGdsb2JhbCB2YWx1ZSBpbiBpMThuIHRyYW5zbGF0aW9uIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZW1wdHlNZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBzaG93IGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMTJzIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIGhpZGUgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xcyBsaW5lYXInO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYXV0b21hdGljYWxseSBnZXQgZm9jdXMgb24gbG9hZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b2ZvY3VzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZGVmaW5lIGEgc3RyaW5nIHRoYXQgYXV0b2NvbXBsZXRlIGF0dHJpYnV0ZSB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9jb21wbGV0ZTogc3RyaW5nID0gJ29mZic7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgb3B0aW9ucyBmaWVsZCBvZiBhbiBvcHRpb24gZ3JvdXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3B0aW9uR3JvdXBDaGlsZHJlbjogc3RyaW5nIHwgdW5kZWZpbmVkID0gJ2l0ZW1zJztcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBsYWJlbCBmaWVsZCBvZiBhbiBvcHRpb24gZ3JvdXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3B0aW9uR3JvdXBMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkID0gJ2xhYmVsJztcbiAgICAvKipcbiAgICAgKiBPcHRpb25zIGZvciB0aGUgb3ZlcmxheSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG92ZXJsYXlPcHRpb25zOiBPdmVybGF5T3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBzdWdnZXN0aW9ucyB0byBkaXNwbGF5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzdWdnZXN0aW9ucygpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdWdnZXN0aW9ucygpO1xuICAgIH1cbiAgICBzZXQgc3VnZ2VzdGlvbnModmFsdWU6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuX3N1Z2dlc3Rpb25zLnNldCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuaGFuZGxlU3VnZ2VzdGlvbnNDaGFuZ2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRWxlbWVudCBkaW1lbnNpb25zIG9mIG9wdGlvbiBmb3IgdmlydHVhbCBzY3JvbGxpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZSBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBpdGVtU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbVNpemUgYXMgbnVtYmVyO1xuICAgIH1cbiAgICBzZXQgaXRlbVNpemUodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5faXRlbVNpemUgPSB2YWw7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlIGl0ZW1TaXplIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQsIHVzZSB2aXJ0dWFsU2Nyb2xsSXRlbVNpemUgcHJvcGVydHkgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvcGVydHkgbmFtZSBvciBnZXR0ZXIgZnVuY3Rpb24gdG8gdXNlIGFzIHRoZSBsYWJlbCBvZiBhbiBvcHRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3B0aW9uTGFiZWw6IHN0cmluZyB8ICgoaXRlbTogYW55KSA9PiBzdHJpbmcpIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFByb3BlcnR5IG5hbWUgb3IgZ2V0dGVyIGZ1bmN0aW9uIHRvIHVzZSBhcyB0aGUgdmFsdWUgb2YgYW4gb3B0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9wdGlvblZhbHVlOiBzdHJpbmcgfCAoKGl0ZW06IGFueSkgPT4gc3RyaW5nKSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBVbmlxdWUgaWRlbnRpZmllciBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGV4dCB0byBkaXNwbGF5IHdoZW4gdGhlIHNlYXJjaCBpcyBhY3RpdmUuIERlZmF1bHRzIHRvIGdsb2JhbCB2YWx1ZSBpbiBpMThuIHRyYW5zbGF0aW9uIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlZmF1bHRWYWx1ZSAnezB9IHJlc3VsdHMgYXJlIGF2YWlsYWJsZSdcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWFyY2hNZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGV4dCB0byBkaXNwbGF5IHdoZW4gZmlsdGVyaW5nIGRvZXMgbm90IHJldHVybiBhbnkgcmVzdWx0cy4gRGVmYXVsdHMgdG8gZ2xvYmFsIHZhbHVlIGluIGkxOG4gdHJhbnNsYXRpb24gY29uZmlndXJhdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVmYXVsdFZhbHVlICdObyBzZWxlY3RlZCBpdGVtJ1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGVtcHR5U2VsZWN0aW9uTWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRleHQgdG8gYmUgZGlzcGxheWVkIGluIGhpZGRlbiBhY2Nlc3NpYmxlIGZpZWxkIHdoZW4gb3B0aW9ucyBhcmUgc2VsZWN0ZWQuIERlZmF1bHRzIHRvIGdsb2JhbCB2YWx1ZSBpbiBpMThuIHRyYW5zbGF0aW9uIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlZmF1bHRWYWx1ZSAnezB9IGl0ZW1zIHNlbGVjdGVkJ1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGZvY3VzIG9uIHRoZSBmaXJzdCB2aXNpYmxlIG9yIHNlbGVjdGVkIGVsZW1lbnQgd2hlbiB0aGUgb3ZlcmxheSBwYW5lbCBpcyBzaG93bi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b09wdGlvbkZvY3VzOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCB0aGUgZm9jdXNlZCBvcHRpb24gaXMgc2VsZWN0ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNlbGVjdE9uRm9jdXM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTG9jYWxlIHRvIHVzZSBpbiBzZWFyY2hpbmcuIFRoZSBkZWZhdWx0IGxvY2FsZSBpcyB0aGUgaG9zdCBlbnZpcm9ubWVudCdzIGN1cnJlbnQgbG9jYWxlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzZWFyY2hMb2NhbGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogUHJvcGVydHkgbmFtZSBvciBnZXR0ZXIgZnVuY3Rpb24gdG8gdXNlIGFzIHRoZSBkaXNhYmxlZCBmbGFnIG9mIGFuIG9wdGlvbiwgZGVmYXVsdHMgdG8gZmFsc2Ugd2hlbiBub3QgZGVmaW5lZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBvcHRpb25EaXNhYmxlZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgdGhlIGhvdmVyZWQgb3B0aW9uIHdpbGwgYmUgZm9jdXNlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZm9jdXNPbkhvdmVyOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgaW5wdXQgdmFyaWFudCBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHZhcmlhbnQ6ICdmaWxsZWQnIHwgJ291dGxpbmVkJyA9ICdvdXRsaW5lZCc7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHRvIHNlYXJjaCBmb3Igc3VnZ2VzdGlvbnMuXG4gICAgICogQHBhcmFtIHtBdXRvQ29tcGxldGVDb21wbGV0ZUV2ZW50fSBldmVudCAtIEN1c3RvbSBjb21wbGV0ZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgY29tcGxldGVNZXRob2Q6IEV2ZW50RW1pdHRlcjxBdXRvQ29tcGxldGVDb21wbGV0ZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0b0NvbXBsZXRlQ29tcGxldGVFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIHN1Z2dlc3Rpb24gaXMgc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIHtBdXRvQ29tcGxldGVTZWxlY3RFdmVudH0gZXZlbnQgLSBjdXN0b20gc2VsZWN0IGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPEF1dG9Db21wbGV0ZVNlbGVjdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0b0NvbXBsZXRlU2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBzZWxlY3RlZCB2YWx1ZSBpcyByZW1vdmVkLlxuICAgICAqIEBwYXJhbSB7QXV0b0NvbXBsZXRlVW5zZWxlY3RFdmVudH0gZXZlbnQgLSBjdXN0b20gdW5zZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uVW5zZWxlY3Q6IEV2ZW50RW1pdHRlcjxBdXRvQ29tcGxldGVVbnNlbGVjdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0b0NvbXBsZXRlVW5zZWxlY3RFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgY29tcG9uZW50IHJlY2VpdmVzIGZvY3VzLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgY29tcG9uZW50IGxvc2VzIGZvY3VzLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB0byB3aGVuIGRyb3Bkb3duIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqIEBwYXJhbSB7QXV0b0NvbXBsZXRlRHJvcGRvd25DbGlja0V2ZW50fSBldmVudCAtIGN1c3RvbSBkcm9wZG93biBjbGljayBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Ecm9wZG93bkNsaWNrOiBFdmVudEVtaXR0ZXI8QXV0b0NvbXBsZXRlRHJvcGRvd25DbGlja0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXV0b0NvbXBsZXRlRHJvcGRvd25DbGlja0V2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGNsZWFyIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGVhcjogRXZlbnRFbWl0dGVyPEV2ZW50IHwgdW5kZWZpbmVkPiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQgfCB1bmRlZmluZWQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIGlucHV0IGtleSB1cC5cbiAgICAgKiBAcGFyYW0ge0tleWJvYXJkRXZlbnR9IGV2ZW50IC0gS2V5Ym9hcmQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uS2V5VXA6IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gb3ZlcmxheSBpcyBzaG93bi5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIG92ZXJsYXkgaXMgaGlkZGVuLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gbGF6eSBsb2FkIGRhdGEuXG4gICAgICogQHBhcmFtIHtBdXRvQ29tcGxldGVMYXp5TG9hZEV2ZW50fSBldmVudCAtIExhenkgbG9hZCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25MYXp5TG9hZDogRXZlbnRFbWl0dGVyPEF1dG9Db21wbGV0ZUxhenlMb2FkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxBdXRvQ29tcGxldGVMYXp5TG9hZEV2ZW50PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyRUw6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnZm9jdXNJbnB1dCcpIGlucHV0RUw6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnbXVsdGlJbicpIG11bHRpSW5wdXRFbDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdtdWx0aUNvbnRhaW5lcicpIG11bHRpQ29udGFpbmVyRUw6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnZGRCdG4nKSBkcm9wZG93bkJ1dHRvbjogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdpdGVtcycpIGl0ZW1zVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbGVyJykgc2Nyb2xsZXI6IE51bGxhYmxlPFNjcm9sbGVyPjtcblxuICAgIEBWaWV3Q2hpbGQoJ292ZXJsYXknKSBvdmVybGF5Vmlld0NoaWxkITogT3ZlcmxheTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBOdWxsYWJsZTxRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4+O1xuXG4gICAgX2l0ZW1TaXplOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgaXRlbXNXcmFwcGVyOiBOdWxsYWJsZTxIVE1MRGl2RWxlbWVudD47XG5cbiAgICBpdGVtVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZW1wdHlUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBmb290ZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBzZWxlY3RlZEl0ZW1UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBncm91cFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGxvYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHJlbW92ZUljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBsb2FkaW5nSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGNsZWFySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGRyb3Bkb3duSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHZhbHVlOiBzdHJpbmcgfCBhbnk7XG5cbiAgICBfc3VnZ2VzdGlvbnMgPSBzaWduYWw8YW55PihudWxsKTtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIHRpbWVvdXQ6IE51bGxhYmxlPGFueT47XG5cbiAgICBvdmVybGF5VmlzaWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHN1Z2dlc3Rpb25zVXBkYXRlZDogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBoaWdobGlnaHRPcHRpb246IGFueTtcblxuICAgIGhpZ2hsaWdodE9wdGlvbkNoYW5nZWQ6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX2ZpbGxlZDogYm9vbGVhbjtcblxuICAgIGdldCBmaWxsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWxsZWQ7XG4gICAgfVxuICAgIHNldCBmaWxsZWQodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9maWxsZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBsb2FkaW5nOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIHNjcm9sbEhhbmRsZXI6IE51bGxhYmxlPENvbm5lY3RlZE92ZXJsYXlTY3JvbGxIYW5kbGVyPjtcblxuICAgIGxpc3RJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgc2VhcmNoVGltZW91dDogYW55O1xuXG4gICAgZGlydHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG1vZGVsVmFsdWUgPSBzaWduYWw8YW55PihudWxsKTtcblxuICAgIGZvY3VzZWRNdWx0aXBsZU9wdGlvbkluZGV4ID0gc2lnbmFsPG51bWJlcj4oLTEpO1xuXG4gICAgZm9jdXNlZE9wdGlvbkluZGV4ID0gc2lnbmFsPG51bWJlcj4oLTEpO1xuXG4gICAgdmlzaWJsZU9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwID8gdGhpcy5mbGF0T3B0aW9ucyh0aGlzLl9zdWdnZXN0aW9ucygpKSA6IHRoaXMuX3N1Z2dlc3Rpb25zKCkgfHwgW107XG4gICAgfSk7XG5cbiAgICBpbnB1dFZhbHVlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbFZhbHVlID0gdGhpcy5tb2RlbFZhbHVlKCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uID0gdGhpcy5nZXRTZWxlY3RlZE9wdGlvbihtb2RlbFZhbHVlKTtcblxuICAgICAgICBpZiAobW9kZWxWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtb2RlbFZhbHVlID09PSAnb2JqZWN0JyB8fCB0aGlzLm9wdGlvblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdldE9wdGlvbkxhYmVsKHNlbGVjdGVkT3B0aW9uKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBsYWJlbCAhPSBudWxsID8gbGFiZWwgOiBtb2RlbFZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWxWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZ2V0IGZvY3VzZWRNdWx0aXBsZU9wdGlvbklkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkTXVsdGlwbGVPcHRpb25JbmRleCgpICE9PSAtMSA/IGAke3RoaXMuaWR9X211bHRpcGxlX29wdGlvbl8ke3RoaXMuZm9jdXNlZE11bHRpcGxlT3B0aW9uSW5kZXgoKX1gIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgZm9jdXNlZE9wdGlvbklkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEgPyBgJHt0aGlzLmlkfV8ke3RoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCl9YCA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtYXV0b2NvbXBsZXRlIHAtY29tcG9uZW50IHAtaW5wdXR3cmFwcGVyJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgICAgICdwLWZvY3VzJzogdGhpcy5mb2N1c2VkLFxuICAgICAgICAgICAgJ3AtYXV0b2NvbXBsZXRlLWRkJzogdGhpcy5kcm9wZG93bixcbiAgICAgICAgICAgICdwLWF1dG9jb21wbGV0ZS1tdWx0aXBsZSc6IHRoaXMubXVsdGlwbGUsXG4gICAgICAgICAgICAncC1pbnB1dHdyYXBwZXItZm9jdXMnOiB0aGlzLmZvY3VzZWQsXG4gICAgICAgICAgICAncC1vdmVybGF5LW9wZW4nOiB0aGlzLm92ZXJsYXlWaXNpYmxlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IG11bHRpQ29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7ICdwLWF1dG9jb21wbGV0ZS1tdWx0aXBsZS1jb250YWluZXIgcC1jb21wb25lbnQgcC1pbnB1dHRleHQnOiB0cnVlLCAncC12YXJpYW50LWZpbGxlZCc6IHRoaXMudmFyaWFudCA9PT0gJ2ZpbGxlZCcgfHwgdGhpcy5jb25maWcuaW5wdXRTdHlsZSgpID09PSAnZmlsbGVkJyB9O1xuICAgIH1cblxuICAgIGdldCBwYW5lbENsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtYXV0b2NvbXBsZXRlLXBhbmVsIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWlucHV0LWZpbGxlZCc6IHRoaXMuY29uZmlnLmlucHV0U3R5bGUoKSA9PT0gJ2ZpbGxlZCcsXG4gICAgICAgICAgICAncC1yaXBwbGUtZGlzYWJsZWQnOiB0aGlzLmNvbmZpZy5yaXBwbGUgPT09IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IHBhbmVsU3R5bGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ21heC1oZWlnaHQnOiB0aGlzLnZpcnR1YWxTY3JvbGwgPyAnYXV0bycgOiB0aGlzLnNjcm9sbEhlaWdodCxcbiAgICAgICAgICAgIC4uLnRoaXMucGFuZWxTdHlsZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldCBpbnB1dENsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtYXV0b2NvbXBsZXRlLWlucHV0IHAtaW5wdXR0ZXh0IHAtY29tcG9uZW50JzogIXRoaXMubXVsdGlwbGUsXG4gICAgICAgICAgICAncC1hdXRvY29tcGxldGUtZGQtaW5wdXQnOiB0aGlzLmRyb3Bkb3duLFxuICAgICAgICAgICAgJ3AtdmFyaWFudC1maWxsZWQnOiB0aGlzLnZhcmlhbnQgPT09ICdmaWxsZWQnIHx8IHRoaXMuY29uZmlnLmlucHV0U3R5bGUoKSA9PT0gJ2ZpbGxlZCdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgc2VhcmNoUmVzdWx0TWVzc2FnZVRleHQoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMudmlzaWJsZU9wdGlvbnMoKSkgJiYgdGhpcy5vdmVybGF5VmlzaWJsZSA/IHRoaXMuc2VhcmNoTWVzc2FnZVRleHQucmVwbGFjZUFsbCgnezB9JywgdGhpcy52aXNpYmxlT3B0aW9ucygpLmxlbmd0aCkgOiB0aGlzLmVtcHR5U2VhcmNoTWVzc2FnZVRleHQ7XG4gICAgfVxuXG4gICAgZ2V0IHNlYXJjaE1lc3NhZ2VUZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hNZXNzYWdlIHx8IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLnNlYXJjaE1lc3NhZ2UgfHwgJyc7XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5U2VhcmNoTWVzc2FnZVRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5TWVzc2FnZSB8fCB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5lbXB0eVNlYXJjaE1lc3NhZ2UgfHwgJyc7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGlvbk1lc3NhZ2VUZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25NZXNzYWdlIHx8IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLnNlbGVjdGlvbk1lc3NhZ2UgfHwgJyc7XG4gICAgfVxuXG4gICAgZ2V0IGVtcHR5U2VsZWN0aW9uTWVzc2FnZVRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVtcHR5U2VsZWN0aW9uTWVzc2FnZSB8fCB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5lbXB0eVNlbGVjdGlvbk1lc3NhZ2UgfHwgJyc7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkTWVzc2FnZVRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1NlbGVjdGVkT3B0aW9uKCkgPyB0aGlzLnNlbGVjdGlvbk1lc3NhZ2VUZXh0LnJlcGxhY2VBbGwoJ3swfScsIHRoaXMubXVsdGlwbGUgPyB0aGlzLm1vZGVsVmFsdWUoKS5sZW5ndGggOiAnMScpIDogdGhpcy5lbXB0eVNlbGVjdGlvbk1lc3NhZ2VUZXh0O1xuICAgIH1cblxuICAgIGdldCBhcmlhU2V0U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnMoKS5maWx0ZXIoKG9wdGlvbikgPT4gIXRoaXMuaXNPcHRpb25Hcm91cChvcHRpb24pKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IGxpc3RMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkFSSUEpWydsaXN0TGFiZWwnXTtcbiAgICB9XG5cbiAgICBnZXQgdmlydHVhbFNjcm9sbGVyRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy52aXJ0dWFsU2Nyb2xsO1xuICAgIH1cblxuICAgIGdldCBvcHRpb25WYWx1ZVNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMubW9kZWxWYWx1ZSgpID09PSAnc3RyaW5nJyAmJiB0aGlzLm9wdGlvblZhbHVlO1xuICAgIH1cblxuICAgIGdldCBpc1Zpc2libGVDbGVhckljb24oKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsVmFsdWUoKSAhPSBudWxsICYmIHRoaXMuaGFzU2VsZWN0ZWRPcHRpb24oKSAmJiB0aGlzLnNob3dDbGVhciAmJiAhdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5sb2FkaW5nO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICAgICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZyxcbiAgICAgICAgcHVibGljIG92ZXJsYXlTZXJ2aWNlOiBPdmVybGF5U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgICApIHtcbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsbGVkID0gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLm1vZGVsVmFsdWUoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlkID0gdGhpcy5pZCB8fCBVbmlxdWVDb21wb25lbnRJZCgpO1xuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIC8vVXNlIHRpbWVvdXRzIGFzIHNpbmNlIEFuZ3VsYXIgNC4yLCBBZnRlclZpZXdDaGVja2VkIGlzIGJyb2tlbiBhbmQgbm90IGNhbGxlZCBhZnRlciBwYW5lbCBpcyB1cGRhdGVkXG4gICAgICAgIGlmICh0aGlzLnN1Z2dlc3Rpb25zVXBkYXRlZCAmJiB0aGlzLm92ZXJsYXlWaWV3Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaWV3Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpZXdDaGlsZC5hbGlnbk92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNVcGRhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgKHRoaXMudGVtcGxhdGVzIGFzIFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPikuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW0nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlbGVjdGVkSXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsb2FkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmV0b2tlbmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGluZ2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Ryb3Bkb3duaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcGRvd25JY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVN1Z2dlc3Rpb25zQ2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWdnZXN0aW9ucygpLmxlbmd0aCA+IDAgfHwgdGhpcy5zaG93RW1wdHlNZXNzYWdlID8gdGhpcy5zaG93KCkgOiAhIXRoaXMuZW1wdHlUZW1wbGF0ZSA/IHRoaXMuc2hvdygpIDogdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkT3B0aW9uSW5kZXggPSB0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuYXV0b09wdGlvbkZvY3VzID8gdGhpcy5maW5kRmlyc3RGb2N1c2VkT3B0aW9uSW5kZXgoKSA6IC0xO1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KGZvY3VzZWRPcHRpb25JbmRleCk7XG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zVXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmbGF0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkucmVkdWNlKChyZXN1bHQsIG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgb3B0aW9uR3JvdXA6IG9wdGlvbiwgZ3JvdXA6IHRydWUsIGluZGV4IH0pO1xuXG4gICAgICAgICAgICBjb25zdCBvcHRpb25Hcm91cENoaWxkcmVuID0gdGhpcy5nZXRPcHRpb25Hcm91cENoaWxkcmVuKG9wdGlvbik7XG5cbiAgICAgICAgICAgIG9wdGlvbkdyb3VwQ2hpbGRyZW4gJiYgb3B0aW9uR3JvdXBDaGlsZHJlbi5mb3JFYWNoKChvKSA9PiByZXN1bHQucHVzaChvKSk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBpc09wdGlvbkdyb3VwKG9wdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25Hcm91cExhYmVsICYmIG9wdGlvbi5vcHRpb25Hcm91cCAmJiBvcHRpb24uZ3JvdXA7XG4gICAgfVxuXG4gICAgZmluZEZpcnN0T3B0aW9uSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVPcHRpb25zKCkuZmluZEluZGV4KChvcHRpb24pID0+IHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pKTtcbiAgICB9XG5cbiAgICBmaW5kTGFzdE9wdGlvbkluZGV4KCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuZmluZExhc3RJbmRleCh0aGlzLnZpc2libGVPcHRpb25zKCksIChvcHRpb24pID0+IHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pKTtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RGb2N1c2VkT3B0aW9uSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLmZpbmRTZWxlY3RlZE9wdGlvbkluZGV4KCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkSW5kZXggPCAwID8gdGhpcy5maW5kRmlyc3RPcHRpb25JbmRleCgpIDogc2VsZWN0ZWRJbmRleDtcbiAgICB9XG5cbiAgICBmaW5kTGFzdEZvY3VzZWRPcHRpb25JbmRleCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZmluZFNlbGVjdGVkT3B0aW9uSW5kZXgoKTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJbmRleCA8IDAgPyB0aGlzLmZpbmRMYXN0T3B0aW9uSW5kZXgoKSA6IHNlbGVjdGVkSW5kZXg7XG4gICAgfVxuXG4gICAgZmluZFNlbGVjdGVkT3B0aW9uSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1NlbGVjdGVkT3B0aW9uKCkgPyB0aGlzLnZpc2libGVPcHRpb25zKCkuZmluZEluZGV4KChvcHRpb24pID0+IHRoaXMuaXNWYWxpZFNlbGVjdGVkT3B0aW9uKG9wdGlvbikpIDogLTE7XG4gICAgfVxuXG4gICAgZmluZE5leHRPcHRpb25JbmRleChpbmRleCkge1xuICAgICAgICBjb25zdCBtYXRjaGVkT3B0aW9uSW5kZXggPVxuICAgICAgICAgICAgaW5kZXggPCB0aGlzLnZpc2libGVPcHRpb25zKCkubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgID8gdGhpcy52aXNpYmxlT3B0aW9ucygpXG4gICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAuZmluZEluZGV4KChvcHRpb24pID0+IHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pKVxuICAgICAgICAgICAgICAgIDogLTE7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4ICsgaW5kZXggKyAxIDogaW5kZXg7XG4gICAgfVxuXG4gICAgZmluZFByZXZPcHRpb25JbmRleChpbmRleCkge1xuICAgICAgICBjb25zdCBtYXRjaGVkT3B0aW9uSW5kZXggPSBpbmRleCA+IDAgPyBPYmplY3RVdGlscy5maW5kTGFzdEluZGV4KHRoaXMudmlzaWJsZU9wdGlvbnMoKS5zbGljZSgwLCBpbmRleCksIChvcHRpb24pID0+IHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pKSA6IC0xO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkT3B0aW9uSW5kZXggPiAtMSA/IG1hdGNoZWRPcHRpb25JbmRleCA6IGluZGV4O1xuICAgIH1cblxuICAgIGlzVmFsaWRTZWxlY3RlZE9wdGlvbihvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pICYmIHRoaXMuaXNTZWxlY3RlZChvcHRpb24pO1xuICAgIH1cblxuICAgIGlzVmFsaWRPcHRpb24ob3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBvcHRpb24gJiYgISh0aGlzLmlzT3B0aW9uRGlzYWJsZWQob3B0aW9uKSB8fCB0aGlzLmlzT3B0aW9uR3JvdXAob3B0aW9uKSk7XG4gICAgfVxuXG4gICAgaXNPcHRpb25EaXNhYmxlZChvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uRGlzYWJsZWQgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5vcHRpb25EaXNhYmxlZCkgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKG9wdGlvbikge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudW5pcXVlID8gdGhpcy5tb2RlbFZhbHVlKCk/LmZpbmQoKG1vZGVsKSA9PiBPYmplY3RVdGlscy5lcXVhbHMobW9kZWwsIHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKSwgdGhpcy5lcXVhbGl0eUtleSgpKSkgOiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuZXF1YWxzKHRoaXMubW9kZWxWYWx1ZSgpLCB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbiksIHRoaXMuZXF1YWxpdHlLZXkoKSk7XG4gICAgfVxuXG4gICAgaXNPcHRpb25NYXRjaGVkKG9wdGlvbiwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZE9wdGlvbihvcHRpb24pICYmIHRoaXMuZ2V0T3B0aW9uTGFiZWwob3B0aW9uKS50b0xvY2FsZUxvd2VyQ2FzZSh0aGlzLnNlYXJjaExvY2FsZSkgPT09IHZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuc2VhcmNoTG9jYWxlKTtcbiAgICB9XG5cbiAgICBpc0lucHV0Q2xpY2tlZChldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0ID09PSB0aGlzLmlucHV0RUwubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgaXNEcm9wZG93bkNsaWNrZWQoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd25CdXR0b24/Lm5hdGl2ZUVsZW1lbnQgPyBldmVudC50YXJnZXQgPT09IHRoaXMuZHJvcGRvd25CdXR0b24ubmF0aXZlRWxlbWVudCB8fCB0aGlzLmRyb3Bkb3duQnV0dG9uLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSA6IGZhbHNlO1xuICAgIH1cbiAgICBlcXVhbGl0eUtleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YUtleTsgLy8gVE9ETzogVGhlICdvcHRpb25WYWx1ZScgcHJvcGVydGllcyBjYW4gYmUgYWRkZWQuXG4gICAgfVxuXG4gICAgb25Db250YWluZXJDbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmxvYWRpbmcgfHwgdGhpcy5pc0lucHV0Q2xpY2tlZChldmVudCkgfHwgdGhpcy5pc0Ryb3Bkb3duQ2xpY2tlZChldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5Vmlld0NoaWxkIHx8ICF0aGlzLm92ZXJsYXlWaWV3Q2hpbGQub3ZlcmxheVZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmZvY3VzKHRoaXMuaW5wdXRFTC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZURyb3Bkb3duQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmZvY3VzKHRoaXMuaW5wdXRFTC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIHF1ZXJ5ID0gdGhpcy5pbnB1dEVMLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyb3Bkb3duTW9kZSA9PT0gJ2JsYW5rJykgdGhpcy5zZWFyY2goZXZlbnQsICcnLCAnZHJvcGRvd24nKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZHJvcGRvd25Nb2RlID09PSAnY3VycmVudCcpIHRoaXMuc2VhcmNoKGV2ZW50LCBxdWVyeSwgJ2Ryb3Bkb3duJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uRHJvcGRvd25DbGljay5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHF1ZXJ5IH0pO1xuICAgIH1cblxuICAgIG9uSW5wdXQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VhcmNoVGltZW91dCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcXVlcnkgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGlmICh0aGlzLm1heGxlbmd0aCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcXVlcnkgPSBxdWVyeS5zcGxpdCgnJykuc2xpY2UoMCwgdGhpcy5tYXhsZW5ndGgpLmpvaW4oJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlICYmICF0aGlzLmZvcmNlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHF1ZXJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChxdWVyeS5sZW5ndGggPT09IDAgJiYgIXRoaXMubXVsdGlwbGUgJiYgIXRoaXMuY29tcGxldGVPbkZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xlYXIuZW1pdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGggPj0gdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoLTEpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoKGV2ZW50LCBxdWVyeSwgJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5kZWxheSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dENoYW5nZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5mb3JjZVNlbGVjdGlvbikge1xuICAgICAgICAgICAgbGV0IHZhbGlkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGVPcHRpb25zKCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVkVmFsdWUgPSB0aGlzLnZpc2libGVPcHRpb25zKCkuZmluZCgob3B0aW9uKSA9PiB0aGlzLmlzT3B0aW9uTWF0Y2hlZChvcHRpb24sIHRoaXMuaW5wdXRFTC5uYXRpdmVFbGVtZW50LnZhbHVlIHx8ICcnKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc1NlbGVjdGVkKG1hdGNoZWRWYWx1ZSkgJiYgdGhpcy5vbk9wdGlvblNlbGVjdChldmVudCwgbWF0Y2hlZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0RUwubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICF0aGlzLm11bHRpcGxlICYmIHRoaXMudXBkYXRlTW9kZWwobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIC8vIEZvciBTY3JlZW5SZWFkZXJzXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuZGlydHkgJiYgdGhpcy5jb21wbGV0ZU9uRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoKGV2ZW50LCBldmVudC50YXJnZXQudmFsdWUsICdmb2N1cycpO1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRPcHRpb25JbmRleCA9IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkgIT09IC0xID8gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSA6IHRoaXMub3ZlcmxheVZpc2libGUgJiYgdGhpcy5hdXRvT3B0aW9uRm9jdXMgPyB0aGlzLmZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpIDogLTE7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldChmb2N1c2VkT3B0aW9uSW5kZXgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuc2Nyb2xsSW5WaWV3KHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkpO1xuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25NdWx0aXBsZUNvbnRhaW5lckZvY3VzKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAvLyBGb3IgU2NyZWVuUmVhZGVyc1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbk11bHRpcGxlQ29udGFpbmVyQmx1cihldmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWRNdWx0aXBsZU9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uTXVsdGlwbGVDb250YWluZXJLZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93TGVmdEtleU9uTXVsdGlwbGUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dSaWdodEtleU9uTXVsdGlwbGUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdCYWNrc3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub25CYWNrc3BhY2VLZXlPbk11bHRpcGxlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgIC8qKiB0cmlnZ2VyZWQgb25seSBpZiB1c2VyIGNhbiBpbnB1dCBmcmVlbHkgdGV4dFxuICAgICAgICAgKiBMYXRlciBvbiBpdCBtdXN0IHNldCB0b3VjaGVkIGFsc28gb25TZWxlY3QgKi9cbiAgICAgICAgaWYgKCF0aGlzLmZvcmNlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dFBhc3RlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25LZXlEb3duKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbklucHV0S2V5VXAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbktleVVwLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93TGVmdEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1JpZ2h0S2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbmRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5vblBhZ2VEb3duS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uUGFnZVVwS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnTnVtcGFkRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVzY2FwZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkJhY2tzcGFjZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1NoaWZ0TGVmdCc6XG4gICAgICAgICAgICBjYXNlICdTaGlmdFJpZ2h0JzpcbiAgICAgICAgICAgICAgICAvL05PT1BcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dEb3duS2V5KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uSW5kZXggPSB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSAtMSA/IHRoaXMuZmluZE5leHRPcHRpb25JbmRleCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpKSA6IHRoaXMuZmluZEZpcnN0Rm9jdXNlZE9wdGlvbkluZGV4KCk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgoZXZlbnQsIG9wdGlvbkluZGV4KTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBvbkFycm93VXBLZXkoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KGV2ZW50LCB0aGlzLnZpc2libGVPcHRpb25zKClbdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEgPyB0aGlzLmZpbmRQcmV2T3B0aW9uSW5kZXgodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSkgOiB0aGlzLmZpbmRMYXN0Rm9jdXNlZE9wdGlvbkluZGV4KCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCBvcHRpb25JbmRleCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dMZWZ0S2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNFbXB0eSh0YXJnZXQudmFsdWUpICYmIHRoaXMuaGFzU2VsZWN0ZWRPcHRpb24oKSkge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXModGhpcy5tdWx0aUNvbnRhaW5lckVMLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZE11bHRpcGxlT3B0aW9uSW5kZXguc2V0KHRoaXMubW9kZWxWYWx1ZSgpLmxlbmd0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAvLyBUbyBwcmV2ZW50IG9uQXJyb3dMZWZ0S2V5T25NdWx0aXBsZSBtZXRob2RcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dSaWdodEtleShldmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoLTEpO1xuXG4gICAgICAgIHRoaXMubXVsdGlwbGUgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFRvIHByZXZlbnQgb25BcnJvd1JpZ2h0S2V5T25NdWx0aXBsZSBtZXRob2RcbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VGFyZ2V0IH0gPSBldmVudDtcbiAgICAgICAgY29uc3QgbGVuID0gY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgY3VycmVudFRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZSgwLCBldmVudC5zaGlmdEtleSA/IGxlbiA6IDApO1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoLTEpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25FbmRLZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VGFyZ2V0IH0gPSBldmVudDtcbiAgICAgICAgY29uc3QgbGVuID0gY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgY3VycmVudFRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShldmVudC5zaGlmdEtleSA/IDAgOiBsZW4sIGxlbik7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LnNldCgtMSk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblBhZ2VEb3duS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KHRoaXMudmlzaWJsZU9wdGlvbnMoKS5sZW5ndGggLSAxKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblBhZ2VVcEtleShldmVudCkge1xuICAgICAgICB0aGlzLnNjcm9sbEluVmlldygwKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkVudGVyS2V5KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bktleShldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KGV2ZW50LCB0aGlzLnZpc2libGVPcHRpb25zKClbdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKV0pO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Fc2NhcGVLZXkoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLmhpZGUodHJ1ZSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UYWJLZXkoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KGV2ZW50LCB0aGlzLnZpc2libGVPcHRpb25zKClbdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSAmJiB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBvbkJhY2tzcGFjZUtleShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5tb2RlbFZhbHVlKCkpICYmICF0aGlzLmlucHV0RUwubmF0aXZlRWxlbWVudC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZWRWYWx1ZSA9IHRoaXMubW9kZWxWYWx1ZSgpW3RoaXMubW9kZWxWYWx1ZSgpLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5tb2RlbFZhbHVlKCkuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwobmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMub25VbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiByZW1vdmVkVmFsdWUgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAvLyBUbyBwcmV2ZW50IG9uQmFja3NwYWNlS2V5T25NdWx0aXBsZSBtZXRob2RcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dMZWZ0S2V5T25NdWx0aXBsZShldmVudCkge1xuICAgICAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuZm9jdXNlZE11bHRpcGxlT3B0aW9uSW5kZXgoKSA8IDEgPyAwIDogdGhpcy5mb2N1c2VkTXVsdGlwbGVPcHRpb25JbmRleCgpIC0gMTtcbiAgICAgICAgdGhpcy5mb2N1c2VkTXVsdGlwbGVPcHRpb25JbmRleC5zZXQob3B0aW9uSW5kZXgpO1xuICAgIH1cblxuICAgIG9uQXJyb3dSaWdodEtleU9uTXVsdGlwbGUoZXZlbnQpIHtcbiAgICAgICAgbGV0IG9wdGlvbkluZGV4ID0gdGhpcy5mb2N1c2VkTXVsdGlwbGVPcHRpb25JbmRleCgpO1xuICAgICAgICBvcHRpb25JbmRleCsrO1xuXG4gICAgICAgIHRoaXMuZm9jdXNlZE11bHRpcGxlT3B0aW9uSW5kZXguc2V0KG9wdGlvbkluZGV4KTtcbiAgICAgICAgaWYgKG9wdGlvbkluZGV4ID4gdGhpcy5tb2RlbFZhbHVlKCkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkTXVsdGlwbGVPcHRpb25JbmRleC5zZXQoLTEpO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLmlucHV0RUwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkJhY2tzcGFjZUtleU9uTXVsdGlwbGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZE11bHRpcGxlT3B0aW9uSW5kZXgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlT3B0aW9uKGV2ZW50LCB0aGlzLmZvY3VzZWRNdWx0aXBsZU9wdGlvbkluZGV4KCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PcHRpb25TZWxlY3QoZXZlbnQsIG9wdGlvbiwgaXNIaWRlID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKTtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEVMLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWQob3B0aW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoWy4uLih0aGlzLm1vZGVsVmFsdWUoKSB8fCBbXSksIHZhbHVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiB0cmlnZ2VycyBtb2RlbCB0b3VjaGVkIHRvIHVwZGF0ZSBGb3JtQ29udHJvbFxuICAgICAgICAgKiB2YWx1ZSBpbiBjYXNlIHVwZGF0ZU9uIGlzIHNldCB0byBcImJsdXJcIiAqL1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogb3B0aW9uIH0pO1xuXG4gICAgICAgIGlzSGlkZSAmJiB0aGlzLmhpZGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgb25PcHRpb25Nb3VzZUVudGVyKGV2ZW50LCBpbmRleCkge1xuICAgICAgICBpZiAodGhpcy5mb2N1c09uSG92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGV2ZW50LCBpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWFyY2goZXZlbnQsIHF1ZXJ5LCBzb3VyY2UpIHtcbiAgICAgICAgLy9hbGxvdyBlbXB0eSBzdHJpbmcgYnV0IG5vdCB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICBpZiAocXVlcnkgPT09IHVuZGVmaW5lZCB8fCBxdWVyeSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9kbyBub3Qgc2VhcmNoIG9uIGlucHV0IGNoYW5nZSBpZiBtaW5MZW5ndGggaXMgbm90IG1ldFxuICAgICAgICBpZiAoc291cmNlID09PSAnaW5wdXQnICYmIHF1ZXJ5LnRyaW0oKS5sZW5ndGggPCB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tcGxldGVNZXRob2QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBxdWVyeSB9KTtcbiAgICB9XG5cbiAgICByZW1vdmVPcHRpb24oZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZWRPcHRpb24gPSB0aGlzLm1vZGVsVmFsdWUoKVtpbmRleF07XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5tb2RlbFZhbHVlKClcbiAgICAgICAgICAgIC5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgICAgICAgLm1hcCgob3B0aW9uKSA9PiB0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbikpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwodmFsdWUpO1xuICAgICAgICB0aGlzLm9uVW5zZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogcmVtb3ZlZE9wdGlvbiB9KTtcbiAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLmlucHV0RUwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgdXBkYXRlTW9kZWwodmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm1vZGVsVmFsdWUuc2V0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSW5wdXRWYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRFTCAmJiB0aGlzLmlucHV0RUwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEVMLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmlucHV0VmFsdWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dEVMLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF1dG9VcGRhdGVNb2RlbCgpIHtcbiAgICAgICAgaWYgKCh0aGlzLnNlbGVjdE9uRm9jdXMgfHwgdGhpcy5hdXRvSGlnaGxpZ2h0KSAmJiB0aGlzLmF1dG9PcHRpb25Gb2N1cyAmJiAhdGhpcy5oYXNTZWxlY3RlZE9wdGlvbigpKSB7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkT3B0aW9uSW5kZXggPSB0aGlzLmZpbmRGaXJzdEZvY3VzZWRPcHRpb25JbmRleCgpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KGZvY3VzZWRPcHRpb25JbmRleCk7XG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KG51bGwsIHRoaXMudmlzaWJsZU9wdGlvbnMoKVt0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpXSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2Nyb2xsSW5WaWV3KGluZGV4ID0gLTEpIHtcbiAgICAgICAgY29uc3QgaWQgPSBpbmRleCAhPT0gLTEgPyBgJHt0aGlzLmlkfV8ke2luZGV4fWAgOiB0aGlzLmZvY3VzZWRPcHRpb25JZDtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXNWaWV3Q2hpbGQgJiYgdGhpcy5pdGVtc1ZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuaXRlbXNWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgYGxpW2lkPVwiJHtpZH1cIl1gKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyAmJiBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JywgaW5saW5lOiAnbmVhcmVzdCcgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnZpcnR1YWxTY3JvbGxlckRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbCAmJiB0aGlzLnNjcm9sbGVyPy5zY3JvbGxUb0luZGV4KGluZGV4ICE9PSAtMSA/IGluZGV4IDogdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgoZXZlbnQsIGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCgpICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdE9uRm9jdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uU2VsZWN0KGV2ZW50LCB0aGlzLnZpc2libGVPcHRpb25zKClbaW5kZXhdLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KGlzRm9jdXMgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRPcHRpb25JbmRleCA9IHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4KCkgIT09IC0xID8gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSA6IHRoaXMuYXV0b09wdGlvbkZvY3VzID8gdGhpcy5maW5kRmlyc3RGb2N1c2VkT3B0aW9uSW5kZXgoKSA6IC0xO1xuICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleC5zZXQoZm9jdXNlZE9wdGlvbkluZGV4KTtcbiAgICAgICAgaXNGb2N1cyAmJiBEb21IYW5kbGVyLmZvY3VzKHRoaXMuaW5wdXRFTC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgaWYgKGlzRm9jdXMpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXModGhpcy5pbnB1dEVMLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25TaG93LmVtaXQoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBoaWRlKGlzRm9jdXMgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBfaGlkZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlydHkgPSBpc0ZvY3VzO1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXguc2V0KC0xKTtcbiAgICAgICAgICAgIGlzRm9jdXMgJiYgRG9tSGFuZGxlci5mb2N1cyh0aGlzLmlucHV0RUwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KCk7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFkZGVkIHRvIGFkanVzdCB0aGUgc2Nyb2xsZXIncyBjb250ZW50IHBvc2l0aW9uIHdoZW4gdGhlIGRyb3Bkb3duIGNsb3Nlcy5cbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxlci5vblNjcm9sbENoYW5nZShldmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIF9oaWRlKCk7XG4gICAgICAgIH0sIDApOyAvLyBGb3IgU2NyZWVuUmVhZGVyc1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKG51bGwpO1xuICAgICAgICB0aGlzLmlucHV0RUwubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLm9uQ2xlYXIuZW1pdCgpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubW9kZWxWYWx1ZS5zZXQodmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBoYXNTZWxlY3RlZE9wdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5tb2RlbFZhbHVlKCkpO1xuICAgIH1cblxuICAgIGdldEFyaWFQb3NJbnNldChpbmRleCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgKHRoaXMub3B0aW9uR3JvdXBMYWJlbFxuICAgICAgICAgICAgICAgID8gaW5kZXggLVxuICAgICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9ucygpXG4gICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbikgPT4gdGhpcy5pc09wdGlvbkdyb3VwKG9wdGlvbikpLmxlbmd0aFxuICAgICAgICAgICAgICAgIDogaW5kZXgpICsgMVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkxhYmVsKG9wdGlvbjogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkIHx8IHRoaXMub3B0aW9uTGFiZWwgPyBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG9wdGlvbiwgdGhpcy5maWVsZCB8fCB0aGlzLm9wdGlvbkxhYmVsKSA6IG9wdGlvbiAmJiBvcHRpb24ubGFiZWwgIT0gdW5kZWZpbmVkID8gb3B0aW9uLmxhYmVsIDogb3B0aW9uO1xuICAgIH1cblxuICAgIGdldE9wdGlvblZhbHVlKG9wdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25WYWx1ZSA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uLCB0aGlzLm9wdGlvblZhbHVlKSA6IG9wdGlvbjtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25JbmRleChpbmRleCwgc2Nyb2xsZXJPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpcnR1YWxTY3JvbGxlckRpc2FibGVkID8gaW5kZXggOiBzY3JvbGxlck9wdGlvbnMgJiYgc2Nyb2xsZXJPcHRpb25zLmdldEl0ZW1PcHRpb25zKGluZGV4KVsnaW5kZXgnXTtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25Hcm91cExhYmVsKG9wdGlvbkdyb3VwOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9uR3JvdXBMYWJlbCA/IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEob3B0aW9uR3JvdXAsIHRoaXMub3B0aW9uR3JvdXBMYWJlbCkgOiBvcHRpb25Hcm91cCAmJiBvcHRpb25Hcm91cC5sYWJlbCAhPSB1bmRlZmluZWQgPyBvcHRpb25Hcm91cC5sYWJlbCA6IG9wdGlvbkdyb3VwO1xuICAgIH1cblxuICAgIGdldE9wdGlvbkdyb3VwQ2hpbGRyZW4ob3B0aW9uR3JvdXA6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuID8gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShvcHRpb25Hcm91cCwgdGhpcy5vcHRpb25Hcm91cENoaWxkcmVuKSA6IG9wdGlvbkdyb3VwLml0ZW1zO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkT3B0aW9uKG1vZGVsVmFsdWU6IGFueSkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9uVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RlbFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICh0aGlzLnN1Z2dlc3Rpb25zIHx8IFtdKS5maW5kKChpdGVtOiBhbnkpID0+IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoaXRlbSwgdGhpcy5vcHRpb25WYWx1ZSkgPT09IG1vZGVsVmFsdWUpO1xuICAgIH1cblxuICAgIGdldE11bHRpcGxlTGFiZWwob3B0aW9uOiBhbnkpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5nZXRTZWxlY3RlZE9wdGlvbihvcHRpb24pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9wdGlvbkxhYmVsKHNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNXcmFwcGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMub3ZlcmxheVZpZXdDaGlsZC5vdmVybGF5Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LCB0aGlzLnZpcnR1YWxTY3JvbGwgPyAnLnAtc2Nyb2xsZXInIDogJy5wLWF1dG9jb21wbGV0ZS1wYW5lbCcpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxlcj8uc2V0Q29udGVudEVsKHRoaXMuaXRlbXNWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsZXIudmlld0luaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGVPcHRpb25zKCkgJiYgdGhpcy52aXNpYmxlT3B0aW9ucygpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMubW9kZWxWYWx1ZSgpID8gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXgoKSA6IC0xO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxlcj8uc2Nyb2xsVG9JbmRleChzZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZExpc3RJdGVtID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuaXRlbXNXcmFwcGVyLCAnLnAtYXV0b2NvbXBsZXRlLWl0ZW0ucC1oaWdobGlnaHQnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRMaXN0SXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRMaXN0SXRlbS5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcsIGlubGluZTogJ2NlbnRlcicgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgSW5wdXRUZXh0TW9kdWxlLCBCdXR0b25Nb2R1bGUsIFNoYXJlZE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBTY3JvbGxlck1vZHVsZSwgQXV0b0ZvY3VzTW9kdWxlLCBUaW1lc0NpcmNsZUljb24sIFNwaW5uZXJJY29uLCBUaW1lc0ljb24sIENoZXZyb25Eb3duSWNvbl0sXG4gICAgZXhwb3J0czogW0F1dG9Db21wbGV0ZSwgT3ZlcmxheU1vZHVsZSwgU2hhcmVkTW9kdWxlLCBTY3JvbGxlck1vZHVsZSwgQXV0b0ZvY3VzTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtBdXRvQ29tcGxldGVdXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZU1vZHVsZSB7fVxuIl19