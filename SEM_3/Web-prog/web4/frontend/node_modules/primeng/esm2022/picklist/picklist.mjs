import { CDK_DRAG_CONFIG, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { AngleDoubleDownIcon } from 'primeng/icons/angledoubledown';
import { AngleDoubleLeftIcon } from 'primeng/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primeng/icons/angledoubleright';
import { AngleDoubleUpIcon } from 'primeng/icons/angledoubleup';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleLeftIcon } from 'primeng/icons/angleleft';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { AngleUpIcon } from 'primeng/icons/angleup';
import { HomeIcon } from 'primeng/icons/home';
import { SearchIcon } from 'primeng/icons/search';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/button";
import * as i4 from "primeng/ripple";
import * as i5 from "@angular/cdk/drag-drop";
/**
 * PickList is used to reorder items between different lists.
 * @group Components
 */
export class PickList {
    document;
    platformId;
    renderer;
    el;
    cd;
    filterService;
    config;
    /**
     * An array of objects for the source list.
     * @group Props
     */
    source;
    /**
     * An array of objects for the target list.
     * @group Props
     */
    target;
    /**
     * Text for the source list caption
     * @group Props
     */
    sourceHeader;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Defines a string that labels the move to right button for accessibility.
     * @group Props
     */
    rightButtonAriaLabel;
    /**
     * Defines a string that labels the move to left button for accessibility.
     * @group Props
     */
    leftButtonAriaLabel;
    /**
     * Defines a string that labels the move to all right button for accessibility.
     * @group Props
     */
    allRightButtonAriaLabel;
    /**
     * Defines a string that labels the move to all left button for accessibility.
     * @group Props
     */
    allLeftButtonAriaLabel;
    /**
     * Defines a string that labels the move to up button for accessibility.
     * @group Props
     */
    upButtonAriaLabel;
    /**
     * Defines a string that labels the move to down button for accessibility.
     * @group Props
     */
    downButtonAriaLabel;
    /**
     * Defines a string that labels the move to top button for accessibility.
     * @group Props
     */
    topButtonAriaLabel;
    /**
     * Defines a string that labels the move to bottom button for accessibility.
     * @group Props
     */
    bottomButtonAriaLabel;
    /**
     * Text for the target list caption
     * @group Props
     */
    targetHeader;
    /**
     * When enabled orderlist adjusts its controls based on screen size.
     * @group Props
     */
    responsive;
    /**
     * When specified displays an input field to filter the items on keyup and decides which field to search (Accepts multiple fields with a comma).
     * @group Props
     */
    filterBy;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. Use sourceTrackBy or targetTrackBy in case different algorithms are needed per list.
     * @group Props
     */
    trackBy = (index, item) => item;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy in source list, default algorithm checks for object identity.
     * @group Props
     */
    sourceTrackBy;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy in target list, default algorithm checks for object identity.
     * @group Props
     */
    targetTrackBy;
    /**
     * Whether to show filter input for source list when filterBy is enabled.
     * @group Props
     */
    showSourceFilter = true;
    /**
     * Whether to show filter input for target list when filterBy is enabled.
     * @group Props
     */
    showTargetFilter = true;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = false;
    /**
     * Whether to enable dragdrop based reordering.
     * @group Props
     */
    dragdrop = false;
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
     * Inline style of the source list element.
     * @group Props
     */
    sourceStyle;
    /**
     * Inline style of the target list element.
     * @group Props
     */
    targetStyle;
    /**
     * Whether to show buttons of source list.
     * @group Props
     */
    showSourceControls = true;
    /**
     * Whether to show buttons of target list.
     * @group Props
     */
    showTargetControls = true;
    /**
     * Placeholder text on source filter input.
     * @group Props
     */
    sourceFilterPlaceholder;
    /**
     * Placeholder text on target filter input.
     * @group Props
     */
    targetFilterPlaceholder;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = false;
    /**
     * Defines a string that labels the filter input of source list.
     * @group Props
     */
    ariaSourceFilterLabel;
    /**
     * Defines a string that labels the filter input of target list.
     * @group Props
     */
    ariaTargetFilterLabel;
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode = 'contains';
    /**
     * Whether to displays rows with alternating colors.
     * @group Props
     */
    stripedRows;
    /**
     * Keeps selection on the transfer list.
     * @group Props
     */
    keepSelection = false;
    /**
     * Indicates the width of the screen at which the component should change its behavior.
     * @group Props
     */
    get breakpoint() {
        return this._breakpoint;
    }
    set breakpoint(value) {
        if (value !== this._breakpoint) {
            this._breakpoint = value;
            if (isPlatformBrowser(this.platformId)) {
                this.destroyMedia();
                this.initMedia();
            }
        }
    }
    /**
     * Callback to invoke when items are moved from target to source.
     * @param {PickListMoveToSourceEvent} event - Custom move to source event.
     * @group Emits
     */
    onMoveToSource = new EventEmitter();
    /**
     * Callback to invoke when all items are moved from target to source.
     * @param {PickListMoveAllToSourceEvent} event - Custom move all to source event.
     * @group Emits
     */
    onMoveAllToSource = new EventEmitter();
    /**
     * Callback to invoke when all items are moved from source to target.
     * @param {PickListMoveAllToTargetEvent} event - Custom move all to target event.
     * @group Emits
     */
    onMoveAllToTarget = new EventEmitter();
    /**
     * Callback to invoke when items are moved from source to target.
     * @param {PickListMoveToTargetEvent} event - Custom move to target event.
     * @group Emits
     */
    onMoveToTarget = new EventEmitter();
    /**
     * Callback to invoke when items are reordered within source list.
     * @param {PickListSourceReorderEvent} event - Custom source reorder event.
     * @group Emits
     */
    onSourceReorder = new EventEmitter();
    /**
     * Callback to invoke when items are reordered within target list.
     * @param {PickListTargetReorderEvent} event - Custom target reorder event.
     * @group Emits
     */
    onTargetReorder = new EventEmitter();
    /**
     * Callback to invoke when items are selected within source list.
     * @param {PickListSourceSelectEvent} event - Custom source select event.
     * @group Emits
     */
    onSourceSelect = new EventEmitter();
    /**
     * Callback to invoke when items are selected within target list.
     * @param {PickListTargetSelectEvent} event - Custom target select event.
     * @group Emits
     */
    onTargetSelect = new EventEmitter();
    /**
     * Callback to invoke when the source list is filtered
     * @param {PickListSourceFilterEvent} event - Custom source filter event.
     * @group Emits
     */
    onSourceFilter = new EventEmitter();
    /**
     * Callback to invoke when the target list is filtered
     * @param {PickListTargetFilterEvent} event - Custom target filter event.
     * @group Emits
     */
    onTargetFilter = new EventEmitter();
    /**
     * Callback to invoke when the list is focused
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when the list is blurred
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    listViewSourceChild;
    listViewTargetChild;
    sourceFilterViewChild;
    targetFilterViewChild;
    templates;
    get moveUpAriaLabel() {
        return this.upButtonAriaLabel ? this.upButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveUp : undefined;
    }
    get moveTopAriaLabel() {
        return this.topButtonAriaLabel ? this.topButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveTop : undefined;
    }
    get moveDownAriaLabel() {
        return this.downButtonAriaLabel ? this.downButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveDown : undefined;
    }
    get moveBottomAriaLabel() {
        return this.bottomButtonAriaLabel ? this.bottomButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveBottom : undefined;
    }
    get moveToTargetAriaLabel() {
        return this.rightButtonAriaLabel ? this.rightButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveToTarget : undefined;
    }
    get moveAllToTargetAriaLabel() {
        return this.allRightButtonAriaLabel ? this.allRightButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveAllToTarget : undefined;
    }
    get moveToSourceAriaLabel() {
        return this.leftButtonAriaLabel ? this.leftButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveToSource : undefined;
    }
    get moveAllToSourceAriaLabel() {
        return this.allLeftButtonAriaLabel ? this.allLeftButtonAriaLabel : this.config.translation.aria ? this.config.translation.aria.moveAllToSource : undefined;
    }
    get idSource() {
        return this.id + '_source';
    }
    get idTarget() {
        return this.id + '_target';
    }
    get focusedOptionId() {
        return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }
    _breakpoint = '960px';
    itemTemplate;
    moveTopIconTemplate;
    moveUpIconTemplate;
    moveDownIconTemplate;
    moveBottomIconTemplate;
    moveToTargetIconTemplate;
    moveAllToTargetIconTemplate;
    moveToSourceIconTemplate;
    moveAllToSourceIconTemplate;
    targetFilterIconTemplate;
    sourceFilterIconTemplate;
    visibleOptionsSource;
    visibleOptionsTarget;
    selectedItemsSource = [];
    selectedItemsTarget = [];
    reorderedListElement;
    movedUp;
    movedDown;
    itemTouched;
    styleElement;
    id = UniqueComponentId();
    filterValueSource;
    filterValueTarget;
    fromListType;
    emptyMessageSourceTemplate;
    emptyFilterMessageSourceTemplate;
    emptyMessageTargetTemplate;
    emptyFilterMessageTargetTemplate;
    sourceHeaderTemplate;
    targetHeaderTemplate;
    sourceFilterTemplate;
    targetFilterTemplate;
    sourceFilterOptions;
    targetFilterOptions;
    SOURCE_LIST = -1;
    TARGET_LIST = 1;
    window;
    media;
    viewChanged;
    focusedOptionIndex = -1;
    focusedOption;
    focused = {
        sourceList: false,
        targetList: false
    };
    mediaChangeListener;
    constructor(document, platformId, renderer, el, cd, filterService, config) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.el = el;
        this.cd = cd;
        this.filterService = filterService;
        this.config = config;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        if (this.responsive) {
            this.createStyle();
            this.initMedia();
        }
        if (this.filterBy) {
            this.sourceFilterOptions = {
                filter: (value) => this.filterSource(value),
                reset: () => this.resetSourceFilter()
            };
            this.targetFilterOptions = {
                filter: (value) => this.filterTarget(value),
                reset: () => this.resetTargetFilter()
            };
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'sourceHeader':
                    this.sourceHeaderTemplate = item.template;
                    break;
                case 'targetHeader':
                    this.targetHeaderTemplate = item.template;
                    break;
                case 'sourceFilter':
                    this.sourceFilterTemplate = item.template;
                    break;
                case 'targetFilter':
                    this.targetFilterTemplate = item.template;
                    break;
                case 'emptymessagesource':
                    this.emptyMessageSourceTemplate = item.template;
                    break;
                case 'emptyfiltermessagesource':
                    this.emptyFilterMessageSourceTemplate = item.template;
                    break;
                case 'emptymessagetarget':
                    this.emptyMessageTargetTemplate = item.template;
                    break;
                case 'emptyfiltermessagetarget':
                    this.emptyFilterMessageTargetTemplate = item.template;
                    break;
                case 'moveupicon':
                    this.moveUpIconTemplate = item.template;
                    break;
                case 'movetopicon':
                    this.moveTopIconTemplate = item.template;
                    break;
                case 'movedownicon':
                    this.moveDownIconTemplate = item.template;
                    break;
                case 'movebottomicon':
                    this.moveBottomIconTemplate = item.template;
                    break;
                case 'movetotargeticon':
                    this.moveToTargetIconTemplate = item.template;
                    break;
                case 'movealltotargeticon':
                    this.moveAllToTargetIconTemplate = item.template;
                    break;
                case 'movetosourceicon':
                    this.moveToSourceIconTemplate = item.template;
                    break;
                case 'movealltosourceicon':
                    this.moveAllToSourceIconTemplate = item.template;
                    break;
                case 'targetfiltericon':
                    this.targetFilterIconTemplate = item.template;
                    break;
                case 'sourcefiltericon':
                    this.sourceFilterIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            let listItems = DomHandler.find(this.reorderedListElement, 'li.p-highlight');
            let listItem;
            if (this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            DomHandler.scrollInView(this.reorderedListElement, listItem);
            this.movedUp = false;
            this.movedDown = false;
            this.reorderedListElement = null;
        }
    }
    onItemClick(event, item, selectedItems, listType, callback, itemId) {
        if (this.disabled) {
            return;
        }
        let index = this.findIndexInList(item, selectedItems);
        if (itemId)
            this.focusedOptionIndex = itemId;
        let selected = index != -1;
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = event.metaKey || event.ctrlKey || event.shiftKey;
            if (selected && metaKey) {
                selectedItems = selectedItems.filter((_, i) => i !== index);
            }
            else {
                if (!metaKey) {
                    selectedItems = [];
                }
                selectedItems.push(item);
            }
        }
        else {
            if (selected) {
                selectedItems = selectedItems.filter((_, i) => i !== index); // Creating a new array without the selected item
            }
            else {
                selectedItems.push(item);
            }
        }
        this.setSelectionList(listType, selectedItems);
        callback.emit({ originalEvent: event, items: selectedItems });
        this.itemTouched = false;
    }
    onOptionMouseDown(index, listType) {
        this.focused[listType === this.SOURCE_LIST ? 'sourceList' : 'targetList'] = true;
        this.focusedOptionIndex = index;
    }
    onSourceItemDblClick() {
        if (this.disabled) {
            return;
        }
        this.moveRight();
    }
    onTargetItemDblClick() {
        if (this.disabled) {
            return;
        }
        this.moveLeft();
    }
    onFilter(event, listType) {
        let query = event.target.value;
        if (listType === this.SOURCE_LIST)
            this.filterSource(query);
        else if (listType === this.TARGET_LIST)
            this.filterTarget(query);
    }
    filterSource(value = '') {
        this.filterValueSource = value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(this.source, this.SOURCE_LIST);
    }
    filterTarget(value = '') {
        this.filterValueTarget = value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(this.target, this.TARGET_LIST);
    }
    filter(data, listType) {
        let searchFields = this.filterBy.split(',');
        if (listType === this.SOURCE_LIST) {
            this.visibleOptionsSource = this.filterService.filter(data, searchFields, this.filterValueSource, this.filterMatchMode, this.filterLocale);
            this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
        }
        else if (listType === this.TARGET_LIST) {
            this.visibleOptionsTarget = this.filterService.filter(data, searchFields, this.filterValueTarget, this.filterMatchMode, this.filterLocale);
            this.onTargetFilter.emit({ query: this.filterValueTarget, value: this.visibleOptionsTarget });
        }
    }
    isItemVisible(item, listType) {
        if (listType == this.SOURCE_LIST)
            return this.isVisibleInList(this.visibleOptionsSource, item, this.filterValueSource);
        else
            return this.isVisibleInList(this.visibleOptionsTarget, item, this.filterValueTarget);
    }
    isEmpty(listType) {
        if (listType == this.SOURCE_LIST)
            return this.filterValueSource ? !this.visibleOptionsSource || this.visibleOptionsSource.length === 0 : !this.source || this.source.length === 0;
        else
            return this.filterValueTarget ? !this.visibleOptionsTarget || this.visibleOptionsTarget.length === 0 : !this.target || this.target.length === 0;
    }
    isVisibleInList(data, item, filterValue) {
        if (filterValue && filterValue.trim().length) {
            for (let i = 0; i < data.length; i++) {
                if (item == data[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    onItemTouchEnd() {
        if (this.disabled) {
            return;
        }
        this.itemTouched = true;
    }
    sortByIndexInList(items, list) {
        return items.sort((item1, item2) => ObjectUtils.findIndexInList(item1, list) - ObjectUtils.findIndexInList(item2, list));
    }
    moveUp(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex - 1];
                    list[selectedItemIndex - 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            this.movedUp = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }
    moveTop(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = 0; i < selectedItems.length; i++) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            listElement.scrollTop = 0;
            callback.emit({ items: selectedItems });
        }
    }
    moveDown(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list[selectedItemIndex];
                    let temp = list[selectedItemIndex + 1];
                    list[selectedItemIndex + 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            this.movedDown = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    }
    moveBottom(listElement, list, selectedItems, callback, listType) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                let selectedItem = selectedItems[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, list);
                if (selectedItemIndex != list.length - 1) {
                    let movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.push(movedItem);
                }
                else {
                    break;
                }
            }
            if (this.dragdrop && ((this.filterValueSource && listType === this.SOURCE_LIST) || (this.filterValueTarget && listType === this.TARGET_LIST)))
                this.filter(list, listType);
            listElement.scrollTop = listElement.scrollHeight;
            callback.emit({ items: selectedItems });
        }
    }
    moveRight() {
        if (this.selectedItemsSource && this.selectedItemsSource.length) {
            const selectedItemsCopy = [...this.selectedItemsSource];
            for (let i = 0; i < selectedItemsCopy.length; i++) {
                let selectedItem = selectedItemsCopy[i];
                if (ObjectUtils.findIndexInList(selectedItem, this.target) == -1) {
                    let indexInSource = ObjectUtils.findIndexInList(selectedItem, this.source);
                    if (indexInSource !== -1) {
                        this.target?.push(this.source?.splice(indexInSource, 1)[0]);
                    }
                    if (this.visibleOptionsSource?.includes(selectedItem)) {
                        this.visibleOptionsSource.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsSource), 1);
                    }
                }
            }
            this.onMoveToTarget.emit({
                items: this.selectedItemsSource
            });
            if (this.keepSelection) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
        }
    }
    moveAllRight() {
        if (this.source) {
            let movedItems = [];
            for (let i = 0; i < this.source.length; i++) {
                if (this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
                    let removedItem = this.source.splice(i, 1)[0];
                    this.target?.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToTarget.emit({
                items: movedItems
            });
            if (this.keepSelection) {
                this.selectedItemsTarget = [...this.selectedItemsTarget, ...this.selectedItemsSource];
            }
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
            this.visibleOptionsSource = [];
        }
    }
    moveLeft() {
        if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
            const selectedItemsCopy = [...this.selectedItemsTarget];
            for (let i = 0; i < selectedItemsCopy.length; i++) {
                let selectedItem = selectedItemsCopy[i];
                if (ObjectUtils.findIndexInList(selectedItem, this.source) == -1) {
                    let indexInTarget = ObjectUtils.findIndexInList(selectedItem, this.target);
                    if (indexInTarget !== -1) {
                        this.source?.push(this.target?.splice(indexInTarget, 1)[0]);
                    }
                    if (this.visibleOptionsTarget?.includes(selectedItem)) {
                        this.visibleOptionsTarget.splice(ObjectUtils.findIndexInList(selectedItem, this.visibleOptionsTarget), 1)[0];
                    }
                }
            }
            this.onMoveToSource.emit({
                items: this.selectedItemsTarget
            });
            if (this.keepSelection) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
        }
    }
    moveAllLeft() {
        if (this.target) {
            let movedItems = [];
            for (let i = 0; i < this.target.length; i++) {
                if (this.isItemVisible(this.target[i], this.TARGET_LIST)) {
                    let removedItem = this.target.splice(i, 1)[0];
                    this.source?.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveAllToSource.emit({
                items: movedItems
            });
            if (this.keepSelection) {
                this.selectedItemsSource = [...this.selectedItemsSource, ...this.selectedItemsTarget];
            }
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
            this.visibleOptionsTarget = [];
        }
    }
    isSelected(item, selectedItems) {
        return this.findIndexInList(item, selectedItems) != -1;
    }
    itemClass(item, id, selectedItems) {
        return {
            'p-picklist-item': true,
            'p-highlight': this.isSelected(item, selectedItems),
            'p-focus': id === this.focusedOptionId,
            'p-disabled': this.disabled
        };
    }
    findIndexInList(item, selectedItems) {
        return ObjectUtils.findIndexInList(item, selectedItems);
    }
    onDrop(event, listType) {
        let isTransfer = event.previousContainer !== event.container;
        let dropIndexes = this.getDropIndexes(event.previousIndex, event.currentIndex, listType, isTransfer, event.item.data);
        if (listType === this.SOURCE_LIST) {
            if (isTransfer) {
                transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsTarget);
                if (selectedItemIndex != -1) {
                    this.selectedItemsTarget.splice(selectedItemIndex, 1);
                    if (this.keepSelection) {
                        this.selectedItemsTarget.push(event.item.data);
                    }
                }
                if (this.visibleOptionsTarget)
                    this.visibleOptionsTarget.splice(event.previousIndex, 1);
                this.onMoveToSource.emit({ items: [event.item.data] });
            }
            else {
                moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                this.onSourceReorder.emit({ items: [event.item.data] });
            }
            if (this.filterValueSource) {
                this.filter(this.source, this.SOURCE_LIST);
            }
        }
        else {
            if (isTransfer) {
                transferArrayItem(event.previousContainer.data, event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                let selectedItemIndex = ObjectUtils.findIndexInList(event.item.data, this.selectedItemsSource);
                if (selectedItemIndex != -1) {
                    this.selectedItemsSource.splice(selectedItemIndex, 1);
                    if (this.keepSelection) {
                        this.selectedItemsTarget.push(event.item.data);
                    }
                }
                if (this.visibleOptionsSource)
                    this.visibleOptionsSource.splice(event.previousIndex, 1);
                this.onMoveToTarget.emit({ items: [event.item.data] });
            }
            else {
                moveItemInArray(event.container.data, dropIndexes.previousIndex, dropIndexes.currentIndex);
                this.onTargetReorder.emit({ items: [event.item.data] });
            }
            if (this.filterValueTarget) {
                this.filter(this.target, this.TARGET_LIST);
            }
        }
    }
    onListFocus(event, listType) {
        let listElement = this.getListElement(listType);
        const selectedFirstItem = DomHandler.findSingle(listElement, 'li.p-picklist-item.p-highlight') || DomHandler.findSingle(listElement, 'li.p-picklist-item');
        const findIndex = ObjectUtils.findIndexInList(selectedFirstItem, listElement.children);
        this.focused[listType === this.SOURCE_LIST ? 'sourceList' : 'targetList'] = true;
        const sourceIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : selectedFirstItem ? findIndex : -1;
        const filteredIndex = ObjectUtils.isNotEmpty(this.visibleOptionsSource) ? this.findIndexInList(this.source[sourceIndex], this.visibleOptionsSource) : sourceIndex;
        this.changeFocusedOptionIndex(filteredIndex, listType);
        this.onFocus.emit(event);
    }
    onListBlur(event, listType) {
        this.focused[listType === this.SOURCE_LIST ? 'sourceList' : 'targetList'] = false;
        this.focusedOptionIndex = -1;
        this.focusedOption = null;
        this.onBlur.emit(event);
    }
    getListElement(listType) {
        return listType === this.SOURCE_LIST ? this.listViewSourceChild?.nativeElement : this.listViewTargetChild?.nativeElement;
    }
    getListItems(listType) {
        let listElemet = this.getListElement(listType);
        return DomHandler.find(listElemet, 'li.p-picklist-item');
    }
    getLatestSelectedVisibleOptionIndex(visibleList, selectedItems) {
        const latestSelectedItem = [...selectedItems].reverse().find((item) => visibleList.includes(item));
        return latestSelectedItem !== undefined ? visibleList.indexOf(latestSelectedItem) : -1;
    }
    getVisibleList(listType) {
        if (listType === this.SOURCE_LIST) {
            return this.visibleOptionsSource && this.visibleOptionsSource.length > 0 ? this.visibleOptionsSource : this.source && this.source.length > 0 ? this.source : null;
        }
        return this.visibleOptionsTarget && this.visibleOptionsTarget.length > 0 ? this.visibleOptionsTarget : this.target && this.target.length > 0 ? this.target : null;
    }
    setSelectionList(listType, selectedItems) {
        if (listType === this.SOURCE_LIST) {
            this.selectedItemsSource = selectedItems;
        }
        else {
            this.selectedItemsTarget = selectedItems;
        }
    }
    findNextOptionIndex(index, listType) {
        const items = this.getListItems(listType);
        const matchedOptionIndex = [...items].findIndex((link) => link.id === index);
        return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    }
    findPrevOptionIndex(index, listType) {
        const items = this.getListItems(listType);
        const matchedOptionIndex = [...items].findIndex((link) => link.id === index);
        return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    }
    onItemKeyDown(event, selectedItems, callback, listType) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event, selectedItems, callback, listType);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event, selectedItems, callback, listType);
                break;
            case 'Home':
                this.onHomeKey(event, selectedItems, callback, listType);
                break;
            case 'End':
                this.onEndKey(event, selectedItems, callback, listType);
                break;
            case 'Enter':
                this.onEnterKey(event, selectedItems, callback, listType);
                break;
            case 'Space':
                this.onSpaceKey(event, selectedItems, callback, listType);
                break;
            case 'KeyA':
                if (event.ctrlKey) {
                    this.setSelectionList(listType, this.getVisibleList(listType));
                    callback.emit({ items: selectedItems });
                    event.preventDefault();
                }
            default:
                break;
        }
    }
    getFocusedOption(index, listType) {
        if (index === -1)
            return null;
        if (listType === this.SOURCE_LIST) {
            return this.visibleOptionsSource && this.visibleOptionsSource.length ? this.visibleOptionsSource[index] : this.source && this.source.length ? this.source[index] : null;
        }
        return this.visibleOptionsTarget && this.visibleOptionsTarget.length ? this.visibleOptionsTarget[index] : this.target && this.target.length ? this.target[index] : null;
    }
    changeFocusedOptionIndex(index, listType) {
        const items = this.getListItems(listType);
        if (items?.length > 0) {
            let order = index >= items.length ? items.length - 1 : index < 0 ? 0 : index;
            this.focusedOptionIndex = items[order].getAttribute('id');
            this.focusedOption = this.getFocusedOption(order, listType);
            this.scrollInView(items[order].getAttribute('id'), listType);
        }
    }
    scrollInView(id, listType) {
        const element = DomHandler.findSingle(this.getListElement(listType), `li[id="${id}"]`);
        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }
    onArrowDownKey(event, selectedItems, callback, listType) {
        const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex, listType);
        this.changeFocusedOptionIndex(optionIndex, listType);
        if (event.shiftKey) {
            this.onEnterKey(event, selectedItems, callback, listType);
        }
        event.preventDefault();
    }
    onArrowUpKey(event, selectedItems, callback, listType) {
        const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex, listType);
        this.changeFocusedOptionIndex(optionIndex, listType);
        if (event.shiftKey) {
            this.onEnterKey(event, selectedItems, callback, listType);
        }
        event.preventDefault();
    }
    onEnterKey(event, selectedItems, callback, listType) {
        this.onItemClick(event, this.focusedOption, selectedItems, listType, callback);
        event.preventDefault();
    }
    onSpaceKey(event, selectedItems, callback, listType) {
        event.preventDefault();
        if (event.shiftKey && selectedItems && selectedItems.length > 0) {
            let visibleList = this.getVisibleList(listType);
            let lastSelectedIndex = this.getLatestSelectedVisibleOptionIndex(visibleList, selectedItems);
            if (lastSelectedIndex !== -1) {
                let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
                selectedItems = [...visibleList.slice(Math.min(lastSelectedIndex, focusedIndex), Math.max(lastSelectedIndex, focusedIndex) + 1)];
                this.setSelectionList(listType, selectedItems);
                callback.emit({ items: selectedItems });
                return;
            }
        }
        this.onEnterKey(event, selectedItems, callback, listType);
    }
    onHomeKey(event, selectedItems, callback, listType) {
        if (event.ctrlKey && event.shiftKey) {
            let visibleList = this.getVisibleList(listType);
            let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
            selectedItems = [...visibleList.slice(0, focusedIndex + 1)];
            this.setSelectionList(listType, selectedItems);
            callback.emit({ items: selectedItems });
        }
        else {
            this.changeFocusedOptionIndex(0, listType);
        }
        event.preventDefault();
    }
    onEndKey(event, selectedItems, callback, listType) {
        let visibleList = this.getVisibleList(listType);
        let lastIndex = visibleList && visibleList.length > 0 ? visibleList.length - 1 : null;
        if (lastIndex === null)
            return;
        if (event.ctrlKey && event.shiftKey) {
            let focusedIndex = ObjectUtils.findIndexInList(this.focusedOption, visibleList);
            selectedItems = [...visibleList.slice(focusedIndex, lastIndex)];
            this.setSelectionList(listType, selectedItems);
            callback.emit({ items: selectedItems });
        }
        else {
            this.changeFocusedOptionIndex(lastIndex, listType);
        }
        event.preventDefault();
    }
    getDropIndexes(fromIndex, toIndex, droppedList, isTransfer, data) {
        let previousIndex, currentIndex;
        if (droppedList === this.SOURCE_LIST) {
            previousIndex = isTransfer ? (this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex) : this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex;
            currentIndex = this.filterValueSource ? this.findFilteredCurrentIndex(this.visibleOptionsSource, toIndex, this.source) : toIndex;
        }
        else {
            previousIndex = isTransfer ? (this.filterValueSource ? ObjectUtils.findIndexInList(data, this.source) : fromIndex) : this.filterValueTarget ? ObjectUtils.findIndexInList(data, this.target) : fromIndex;
            currentIndex = this.filterValueTarget ? this.findFilteredCurrentIndex(this.visibleOptionsTarget, toIndex, this.target) : toIndex;
        }
        return { previousIndex, currentIndex };
    }
    findFilteredCurrentIndex(visibleOptions, index, options) {
        if (visibleOptions.length === index) {
            let toIndex = ObjectUtils.findIndexInList(visibleOptions[index - 1], options);
            return toIndex + 1;
        }
        else {
            return ObjectUtils.findIndexInList(visibleOptions[index], options);
        }
    }
    resetSourceFilter() {
        this.visibleOptionsSource = null;
        this.filterValueSource = null;
        this.sourceFilterViewChild && (this.sourceFilterViewChild.nativeElement.value = '');
    }
    resetTargetFilter() {
        this.visibleOptionsTarget = null;
        this.filterValueTarget = null;
        this.targetFilterViewChild && (this.targetFilterViewChild.nativeElement.value = '');
    }
    resetFilter() {
        this.resetSourceFilter();
        this.resetTargetFilter();
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return !DomHandler.hasClass(nextItem, 'p-picklist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return !DomHandler.hasClass(prevItem, 'p-picklist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
    initMedia() {
        if (isPlatformBrowser(this.platformId)) {
            this.media = this.window.matchMedia(`(max-width: ${this.breakpoint})`);
            this.viewChanged = this.media.matches;
            this.bindMediaChangeListener();
        }
    }
    destroyMedia() {
        this.unbindMediaChangeListener();
    }
    bindMediaChangeListener() {
        if (this.media && !this.mediaChangeListener) {
            this.mediaChangeListener = this.renderer.listen(this.media, 'change', (event) => {
                this.viewChanged = event.matches;
                this.cd.markForCheck();
            });
        }
    }
    unbindMediaChangeListener() {
        if (this.mediaChangeListener) {
            this.mediaChangeListener();
            this.mediaChangeListener = null;
        }
    }
    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.renderer.setAttribute(this.el.nativeElement.children[0], this.id, '');
                this.styleElement = this.renderer.createElement('style');
                this.renderer.setAttribute(this.styleElement, 'type', 'text/css');
                DomHandler.setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
                this.renderer.appendChild(this.document.head, this.styleElement);
                let innerHTML = `
                @media screen and (max-width: ${this.breakpoint}) {
                    .p-picklist[${this.id}] {
                        flex-direction: column;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons {
                        padding: var(--content-padding);
                        flex-direction: row;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons .p-button {
                        margin-right: var(--inline-spacing);
                        margin-bottom: 0;
                    }

                    .p-picklist[${this.id}] .p-picklist-buttons .p-button:last-child {
                        margin-right: 0;
                    }
                }`;
                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
            }
        }
    }
    sourceMoveDisabled() {
        if (this.disabled || !this.selectedItemsSource.length) {
            return true;
        }
    }
    targetMoveDisabled() {
        if (this.disabled || !this.selectedItemsTarget.length) {
            return true;
        }
    }
    moveRightDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.selectedItemsSource);
    }
    moveLeftDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.selectedItemsTarget);
    }
    moveAllRightDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.source);
    }
    moveAllLeftDisabled() {
        return this.disabled || ObjectUtils.isEmpty(this.target);
    }
    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
            ``;
        }
    }
    ngOnDestroy() {
        this.destroyStyle();
        this.destroyMedia();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PickList, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.FilterService }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: PickList, selector: "p-pickList", inputs: { source: "source", target: "target", sourceHeader: "sourceHeader", tabindex: ["tabindex", "tabindex", numberAttribute], rightButtonAriaLabel: "rightButtonAriaLabel", leftButtonAriaLabel: "leftButtonAriaLabel", allRightButtonAriaLabel: "allRightButtonAriaLabel", allLeftButtonAriaLabel: "allLeftButtonAriaLabel", upButtonAriaLabel: "upButtonAriaLabel", downButtonAriaLabel: "downButtonAriaLabel", topButtonAriaLabel: "topButtonAriaLabel", bottomButtonAriaLabel: "bottomButtonAriaLabel", targetHeader: "targetHeader", responsive: ["responsive", "responsive", booleanAttribute], filterBy: "filterBy", filterLocale: "filterLocale", trackBy: "trackBy", sourceTrackBy: "sourceTrackBy", targetTrackBy: "targetTrackBy", showSourceFilter: ["showSourceFilter", "showSourceFilter", booleanAttribute], showTargetFilter: ["showTargetFilter", "showTargetFilter", booleanAttribute], metaKeySelection: ["metaKeySelection", "metaKeySelection", booleanAttribute], dragdrop: ["dragdrop", "dragdrop", booleanAttribute], style: "style", styleClass: "styleClass", sourceStyle: "sourceStyle", targetStyle: "targetStyle", showSourceControls: ["showSourceControls", "showSourceControls", booleanAttribute], showTargetControls: ["showTargetControls", "showTargetControls", booleanAttribute], sourceFilterPlaceholder: "sourceFilterPlaceholder", targetFilterPlaceholder: "targetFilterPlaceholder", disabled: ["disabled", "disabled", booleanAttribute], ariaSourceFilterLabel: "ariaSourceFilterLabel", ariaTargetFilterLabel: "ariaTargetFilterLabel", filterMatchMode: "filterMatchMode", stripedRows: ["stripedRows", "stripedRows", booleanAttribute], keepSelection: ["keepSelection", "keepSelection", booleanAttribute], breakpoint: "breakpoint" }, outputs: { onMoveToSource: "onMoveToSource", onMoveAllToSource: "onMoveAllToSource", onMoveAllToTarget: "onMoveAllToTarget", onMoveToTarget: "onMoveToTarget", onSourceReorder: "onSourceReorder", onTargetReorder: "onTargetReorder", onSourceSelect: "onSourceSelect", onTargetSelect: "onTargetSelect", onSourceFilter: "onSourceFilter", onTargetFilter: "onTargetFilter", onFocus: "onFocus", onBlur: "onBlur" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "listViewSourceChild", first: true, predicate: ["sourcelist"], descendants: true }, { propertyName: "listViewTargetChild", first: true, predicate: ["targetlist"], descendants: true }, { propertyName: "sourceFilterViewChild", first: true, predicate: ["sourceFilter"], descendants: true }, { propertyName: "targetFilterViewChild", first: true, predicate: ["targetFilter"], descendants: true }], ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{ 'p-picklist p-component': true, 'p-picklist-striped': stripedRows }" cdkDropListGroup [attr.data-pc-name]="'picklist'" [attr.data-pc-section]="'root'">
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls" [attr.data-pc-section]="'sourceControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveUp(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveTop(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveDown(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveBottom(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper" [attr.data-pc-section]="'sourceWrapper'" [attr.data-pc-group-section]="'listWrapper'">
                <div [id]="idSource + '_header'" class="p-picklist-header" *ngIf="sourceHeader || sourceHeaderTemplate" [attr.data-pc-section]="'sourceHeader'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!sourceHeaderTemplate">{{ sourceHeader }}</div>
                    <ng-container *ngTemplateOutlet="sourceHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false" [attr.data-pc-section]="'sourceFilterContainer'">
                    <ng-container *ngIf="sourceFilterTemplate; else builtInSourceElement">
                        <ng-container *ngTemplateOutlet="sourceFilterTemplate; context: { options: sourceFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInSourceElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'sourceFilter'">
                            <input
                                #sourceFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, SOURCE_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="sourceFilterPlaceholder"
                                [attr.aria-label]="ariaSourceFilterLabel"
                                [attr.data-pc-section]="'sourceFilterInput'"
                            />
                            <SearchIcon *ngIf="!sourceFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'sourcefilterIcon'" />
                            <span class="p-picklist-filter-icon" *ngIf="sourceFilterIconTemplate" [attr.data-pc-section]="'sourcefilterIcon'">
                                <ng-template *ngTemplateOutlet="sourceFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>

                <ul
                    #sourcelist
                    class="p-picklist-list p-picklist-source"
                    [id]="idSource + '_list'"
                    [attr.aria-labelledby]="idSource + '_header'"
                    (keydown)="onItemKeyDown($event, selectedItemsSource, onSourceSelect, SOURCE_LIST)"
                    (focus)="onListFocus($event, SOURCE_LIST)"
                    (blur)="onListBlur($event, SOURCE_LIST)"
                    cdkDropList
                    [cdkDropListData]="source"
                    (cdkDropListDropped)="onDrop($event, SOURCE_LIST)"
                    [ngStyle]="sourceStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['sourceList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="source && source.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'sourceList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            pRipple
                            cdkDrag
                            [id]="idSource + '_' + i"
                            [ngClass]="itemClass(item, idSource + '_' + i, selectedItemsSource)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsSource, SOURCE_LIST, onSourceSelect, idSource + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, SOURCE_LIST)"
                            (dblclick)="onSourceItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, SOURCE_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsSource)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueSource || !emptyFilterMessageSourceTemplate" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueSource" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons" [attr.data-pc-section]="'buttons'" [attr.data-pc-group-section]="'controls'">
                <button type="button" [attr.aria-label]="moveToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveRightDisabled()" (click)="moveRight()" [attr.data-pc-section]="'moveToTargetButton'">
                    <ng-container *ngIf="!moveToTargetIconTemplate">
                        <AngleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                        <AngleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllRightDisabled()" (click)="moveAllRight()" [attr.data-pc-section]="'moveAllToTargetButton'">
                    <ng-container *ngIf="!moveAllToTargetIconTemplate">
                        <AngleDoubleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                        <AngleDoubleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveLeftDisabled()" (click)="moveLeft()" [attr.data-pc-section]="'moveToSourceButton'">
                    <ng-container *ngIf="!moveToSourceIconTemplate">
                        <AngleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                        <AngleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllLeftDisabled()" (click)="moveAllLeft()" [attr.data-pc-section]="'moveAllToSourceButton'">
                    <ng-container *ngIf="!moveAllToSourceIconTemplate">
                        <AngleDoubleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                        <AngleDoubleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper" [attr.data-pc-section]="'targetWrapper'" [attr.data-pc-group-section]="'listwrapper'">
                <div [id]="idTarget + '_header'" class="p-picklist-header" *ngIf="targetHeader || targetHeaderTemplate" [attr.data-pc-section]="'targetHead'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!targetHeaderTemplate">{{ targetHeader }}</div>
                    <ng-container *ngTemplateOutlet="targetHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false" [attr.data-pc-section]="'targetFilterContainer'">
                    <ng-container *ngIf="targetFilterTemplate; else builtInTargetElement">
                        <ng-container *ngTemplateOutlet="targetFilterTemplate; context: { options: targetFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInTargetElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'targetFilter'">
                            <input
                                #targetFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, TARGET_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="targetFilterPlaceholder"
                                [attr.aria-label]="ariaTargetFilterLabel"
                                [attr.data-pc-section]="'targetFilterInput'"
                            />
                            <SearchIcon *ngIf="!targetFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'targetfiltericon'" />
                            <span class="p-picklist-filter-icon" *ngIf="targetFilterIconTemplate" [attr.data-pc-section]="'targetfiltericon'">
                                <ng-template *ngTemplateOutlet="targetFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>
                <ul
                    #targetlist
                    class="p-picklist-list p-picklist-target"
                    [id]="idTarget + '_list'"
                    [attr.aria-labelledby]="idTarget + '_header'"
                    (keydown)="onItemKeyDown($event, selectedItemsTarget, onTargetSelect, TARGET_LIST)"
                    (focus)="onListFocus($event, TARGET_LIST)"
                    (blur)="onListBlur($event, TARGET_LIST)"
                    cdkDropList
                    [cdkDropListData]="target"
                    (cdkDropListDropped)="onDrop($event, TARGET_LIST)"
                    [ngStyle]="targetStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['targetList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="target && target.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'targetList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            pRipple
                            cdkDrag
                            [id]="idTarget + '_' + i"
                            [ngClass]="itemClass(item, idTarget + '_' + i, selectedItemsTarget)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsTarget, TARGET_LIST, onTargetSelect, idTarget + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, TARGET_LIST)"
                            (dblclick)="onTargetItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, TARGET_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsTarget)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueTarget || !emptyFilterMessageTargetTemplate" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueTarget" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls" [attr.data-pc-section]="'targetControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveUp(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveTop(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveDown(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveBottom(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;padding:0;overflow:auto;min-height:12rem}.p-picklist-item{display:block;cursor:pointer;overflow:hidden;position:relative}.p-picklist-item:not(.cdk-drag-disabled){cursor:move}.p-picklist-item.cdk-drag-placeholder{opacity:0}.p-picklist-item.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.p-picklist-filter{position:relative}.p-picklist-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-picklist-filter-input{width:100%}.p-picklist-list.cdk-drop-list-dragging .p-picklist-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading", "severity", "raised", "rounded", "text", "outlined", "size", "plain"] }, { kind: "directive", type: i0.forwardRef(() => i4.Ripple), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(() => i5.CdkDropList), selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { kind: "directive", type: i0.forwardRef(() => i5.CdkDropListGroup), selector: "[cdkDropListGroup]", inputs: ["cdkDropListGroupDisabled"], exportAs: ["cdkDropListGroup"] }, { kind: "directive", type: i0.forwardRef(() => i5.CdkDrag), selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "component", type: i0.forwardRef(() => AngleDoubleDownIcon), selector: "AngleDoubleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleLeftIcon), selector: "AngleDoubleLeftIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleRightIcon), selector: "AngleDoubleRightIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDoubleUpIcon), selector: "AngleDoubleUpIcon" }, { kind: "component", type: i0.forwardRef(() => AngleDownIcon), selector: "AngleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleLeftIcon), selector: "AngleLeftIcon" }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(() => AngleUpIcon), selector: "AngleUpIcon" }, { kind: "component", type: i0.forwardRef(() => SearchIcon), selector: "SearchIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PickList, decorators: [{
            type: Component,
            args: [{ selector: 'p-pickList', template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="{ 'p-picklist p-component': true, 'p-picklist-striped': stripedRows }" cdkDropListGroup [attr.data-pc-name]="'picklist'" [attr.data-pc-section]="'root'">
            <div class="p-picklist-buttons p-picklist-source-controls" *ngIf="showSourceControls" [attr.data-pc-section]="'sourceControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveUp(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveTop(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveDown(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="sourceMoveDisabled()"
                    (click)="moveBottom(sourcelist, source, selectedItemsSource, onSourceReorder, SOURCE_LIST)"
                    [attr.data-pc-section]="'sourceMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-source-wrapper" [attr.data-pc-section]="'sourceWrapper'" [attr.data-pc-group-section]="'listWrapper'">
                <div [id]="idSource + '_header'" class="p-picklist-header" *ngIf="sourceHeader || sourceHeaderTemplate" [attr.data-pc-section]="'sourceHeader'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!sourceHeaderTemplate">{{ sourceHeader }}</div>
                    <ng-container *ngTemplateOutlet="sourceHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showSourceFilter !== false" [attr.data-pc-section]="'sourceFilterContainer'">
                    <ng-container *ngIf="sourceFilterTemplate; else builtInSourceElement">
                        <ng-container *ngTemplateOutlet="sourceFilterTemplate; context: { options: sourceFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInSourceElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'sourceFilter'">
                            <input
                                #sourceFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, SOURCE_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="sourceFilterPlaceholder"
                                [attr.aria-label]="ariaSourceFilterLabel"
                                [attr.data-pc-section]="'sourceFilterInput'"
                            />
                            <SearchIcon *ngIf="!sourceFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'sourcefilterIcon'" />
                            <span class="p-picklist-filter-icon" *ngIf="sourceFilterIconTemplate" [attr.data-pc-section]="'sourcefilterIcon'">
                                <ng-template *ngTemplateOutlet="sourceFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>

                <ul
                    #sourcelist
                    class="p-picklist-list p-picklist-source"
                    [id]="idSource + '_list'"
                    [attr.aria-labelledby]="idSource + '_header'"
                    (keydown)="onItemKeyDown($event, selectedItemsSource, onSourceSelect, SOURCE_LIST)"
                    (focus)="onListFocus($event, SOURCE_LIST)"
                    (blur)="onListBlur($event, SOURCE_LIST)"
                    cdkDropList
                    [cdkDropListData]="source"
                    (cdkDropListDropped)="onDrop($event, SOURCE_LIST)"
                    [ngStyle]="sourceStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['sourceList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="source && source.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'sourceList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="source" [ngForTrackBy]="sourceTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            pRipple
                            cdkDrag
                            [id]="idSource + '_' + i"
                            [ngClass]="itemClass(item, idSource + '_' + i, selectedItemsSource)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsSource, SOURCE_LIST, onSourceSelect, idSource + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, SOURCE_LIST)"
                            (dblclick)="onSourceItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, SOURCE_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsSource)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(SOURCE_LIST) && (emptyMessageSourceTemplate || emptyFilterMessageSourceTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueSource || !emptyFilterMessageSourceTemplate" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageSourceTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueSource" [attr.data-pc-section]="'sourceEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageSourceTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-transfer-buttons" [attr.data-pc-section]="'buttons'" [attr.data-pc-group-section]="'controls'">
                <button type="button" [attr.aria-label]="moveToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveRightDisabled()" (click)="moveRight()" [attr.data-pc-section]="'moveToTargetButton'">
                    <ng-container *ngIf="!moveToTargetIconTemplate">
                        <AngleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                        <AngleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movetotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToTargetAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllRightDisabled()" (click)="moveAllRight()" [attr.data-pc-section]="'moveAllToTargetButton'">
                    <ng-container *ngIf="!moveAllToTargetIconTemplate">
                        <AngleDoubleRightIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                        <AngleDoubleDownIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltotargeticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToTargetIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveLeftDisabled()" (click)="moveLeft()" [attr.data-pc-section]="'moveToSourceButton'">
                    <ng-container *ngIf="!moveToSourceIconTemplate">
                        <AngleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                        <AngleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movedownsourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
                <button type="button" [attr.aria-label]="moveAllToSourceAriaLabel" pButton pRipple class="p-button-icon-only" [disabled]="moveAllLeftDisabled()" (click)="moveAllLeft()" [attr.data-pc-section]="'moveAllToSourceButton'">
                    <ng-container *ngIf="!moveAllToSourceIconTemplate">
                        <AngleDoubleLeftIcon *ngIf="!viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                        <AngleDoubleUpIcon *ngIf="viewChanged" [attr.data-pc-section]="'movealltosourceticon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="moveAllToSourceIconTemplate; context: { $implicit: viewChanged }"></ng-template>
                </button>
            </div>
            <div class="p-picklist-list-wrapper p-picklist-target-wrapper" [attr.data-pc-section]="'targetWrapper'" [attr.data-pc-group-section]="'listwrapper'">
                <div [id]="idTarget + '_header'" class="p-picklist-header" *ngIf="targetHeader || targetHeaderTemplate" [attr.data-pc-section]="'targetHead'" [attr.data-pc-group-section]="'header'">
                    <div class="p-picklist-title" *ngIf="!targetHeaderTemplate">{{ targetHeader }}</div>
                    <ng-container *ngTemplateOutlet="targetHeaderTemplate"></ng-container>
                </div>
                <div class="p-picklist-filter-container" *ngIf="filterBy && showTargetFilter !== false" [attr.data-pc-section]="'targetFilterContainer'">
                    <ng-container *ngIf="targetFilterTemplate; else builtInTargetElement">
                        <ng-container *ngTemplateOutlet="targetFilterTemplate; context: { options: targetFilterOptions }"></ng-container>
                    </ng-container>
                    <ng-template #builtInTargetElement>
                        <div class="p-picklist-filter" [attr.data-pc-section]="'targetFilter'">
                            <input
                                #targetFilter
                                type="text"
                                role="textbox"
                                (keyup)="onFilter($event, TARGET_LIST)"
                                class="p-picklist-filter-input p-inputtext p-component"
                                [disabled]="disabled"
                                [attr.placeholder]="targetFilterPlaceholder"
                                [attr.aria-label]="ariaTargetFilterLabel"
                                [attr.data-pc-section]="'targetFilterInput'"
                            />
                            <SearchIcon *ngIf="!targetFilterIconTemplate" [styleClass]="'p-picklist-filter-icon'" [attr.data-pc-section]="'targetfiltericon'" />
                            <span class="p-picklist-filter-icon" *ngIf="targetFilterIconTemplate" [attr.data-pc-section]="'targetfiltericon'">
                                <ng-template *ngTemplateOutlet="targetFilterIconTemplate"></ng-template>
                            </span>
                        </div>
                    </ng-template>
                </div>
                <ul
                    #targetlist
                    class="p-picklist-list p-picklist-target"
                    [id]="idTarget + '_list'"
                    [attr.aria-labelledby]="idTarget + '_header'"
                    (keydown)="onItemKeyDown($event, selectedItemsTarget, onTargetSelect, TARGET_LIST)"
                    (focus)="onListFocus($event, TARGET_LIST)"
                    (blur)="onListBlur($event, TARGET_LIST)"
                    cdkDropList
                    [cdkDropListData]="target"
                    (cdkDropListDropped)="onDrop($event, TARGET_LIST)"
                    [ngStyle]="targetStyle"
                    role="listbox"
                    aria-multiselectable="true"
                    [attr.aria-activedescendant]="focused['targetList'] ? focusedOptionId : undefined"
                    [attr.tabindex]="target && target.length > 0 ? tabindex : -1"
                    [attr.data-pc-section]="'targetList'"
                    [attr.data-pc-group-section]="'list'"
                >
                    <ng-template ngFor let-item [ngForOf]="target" [ngForTrackBy]="targetTrackBy || trackBy" let-i="index" let-l="last">
                        <li
                            pRipple
                            cdkDrag
                            [id]="idTarget + '_' + i"
                            [ngClass]="itemClass(item, idTarget + '_' + i, selectedItemsTarget)"
                            [cdkDragData]="item"
                            [cdkDragDisabled]="!dragdrop"
                            (click)="onItemClick($event, item, selectedItemsTarget, TARGET_LIST, onTargetSelect, idTarget + '_' + i)"
                            (mousedown)="onOptionMouseDown(i, TARGET_LIST)"
                            (dblclick)="onTargetItemDblClick()"
                            (touchend)="onItemTouchEnd()"
                            *ngIf="isItemVisible(item, TARGET_LIST)"
                            role="option"
                            [attr.data-pc-section]="'item'"
                            [attr.aria-selected]="isSelected(item, selectedItemsTarget)"
                        >
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                        </li>
                    </ng-template>
                    <ng-container *ngIf="isEmpty(TARGET_LIST) && (emptyMessageTargetTemplate || emptyFilterMessageTargetTemplate)">
                        <li class="p-picklist-empty-message" *ngIf="!filterValueTarget || !emptyFilterMessageTargetTemplate" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyMessageTargetTemplate"></ng-container>
                        </li>
                        <li class="p-picklist-empty-message" *ngIf="filterValueTarget" [attr.data-pc-section]="'targetEmptyMessage'">
                            <ng-container *ngTemplateOutlet="emptyFilterMessageTargetTemplate"></ng-container>
                        </li>
                    </ng-container>
                </ul>
            </div>
            <div class="p-picklist-buttons p-picklist-target-controls" *ngIf="showTargetControls" [attr.data-pc-section]="'targetControls'" [attr.data-pc-group-section]="'controls'">
                <button
                    type="button"
                    [attr.aria-label]="moveUpAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveUp(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveUpButton'"
                >
                    <AngleUpIcon *ngIf="!moveUpIconTemplate" [attr.data-pc-section]="'moveupicon'" />
                    <ng-template *ngTemplateOutlet="moveUpIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveTopAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveTop(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveTopButton'"
                >
                    <AngleDoubleUpIcon *ngIf="!moveTopIconTemplate" [attr.data-pc-section]="'movetopicon'" />
                    <ng-template *ngTemplateOutlet="moveTopIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveDownAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveDown(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveDownButton'"
                >
                    <AngleDownIcon *ngIf="!moveDownIconTemplate" [attr.data-pc-section]="'movedownicon'" />
                    <ng-template *ngTemplateOutlet="moveDownIconTemplate"></ng-template>
                </button>
                <button
                    type="button"
                    [attr.aria-label]="moveBottomAriaLabel"
                    pButton
                    pRipple
                    class="p-button-icon-only"
                    [disabled]="targetMoveDisabled()"
                    (click)="moveBottom(targetlist, target, selectedItemsTarget, onTargetReorder, TARGET_LIST)"
                    [attr.data-pc-section]="'targetMoveBottomButton'"
                >
                    <AngleDoubleDownIcon *ngIf="!moveBottomIconTemplate" [attr.data-pc-section]="'movebottomicon'" />
                    <ng-template *ngTemplateOutlet="moveBottomIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-picklist{display:flex}.p-picklist-buttons{display:flex;flex-direction:column;justify-content:center}.p-picklist-list-wrapper{flex:1 1 50%}.p-picklist-list{list-style-type:none;margin:0;padding:0;overflow:auto;min-height:12rem}.p-picklist-item{display:block;cursor:pointer;overflow:hidden;position:relative}.p-picklist-item:not(.cdk-drag-disabled){cursor:move}.p-picklist-item.cdk-drag-placeholder{opacity:0}.p-picklist-item.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.p-picklist-filter{position:relative}.p-picklist-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-picklist-filter-input{width:100%}.p-picklist-list.cdk-drop-list-dragging .p-picklist-item:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.FilterService }, { type: i1.PrimeNGConfig }], propDecorators: { source: [{
                type: Input
            }], target: [{
                type: Input
            }], sourceHeader: [{
                type: Input
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], rightButtonAriaLabel: [{
                type: Input
            }], leftButtonAriaLabel: [{
                type: Input
            }], allRightButtonAriaLabel: [{
                type: Input
            }], allLeftButtonAriaLabel: [{
                type: Input
            }], upButtonAriaLabel: [{
                type: Input
            }], downButtonAriaLabel: [{
                type: Input
            }], topButtonAriaLabel: [{
                type: Input
            }], bottomButtonAriaLabel: [{
                type: Input
            }], targetHeader: [{
                type: Input
            }], responsive: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filterBy: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], sourceTrackBy: [{
                type: Input
            }], targetTrackBy: [{
                type: Input
            }], showSourceFilter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showTargetFilter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], metaKeySelection: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], dragdrop: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], sourceStyle: [{
                type: Input
            }], targetStyle: [{
                type: Input
            }], showSourceControls: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showTargetControls: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], sourceFilterPlaceholder: [{
                type: Input
            }], targetFilterPlaceholder: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], ariaSourceFilterLabel: [{
                type: Input
            }], ariaTargetFilterLabel: [{
                type: Input
            }], filterMatchMode: [{
                type: Input
            }], stripedRows: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], keepSelection: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], breakpoint: [{
                type: Input
            }], onMoveToSource: [{
                type: Output
            }], onMoveAllToSource: [{
                type: Output
            }], onMoveAllToTarget: [{
                type: Output
            }], onMoveToTarget: [{
                type: Output
            }], onSourceReorder: [{
                type: Output
            }], onTargetReorder: [{
                type: Output
            }], onSourceSelect: [{
                type: Output
            }], onTargetSelect: [{
                type: Output
            }], onSourceFilter: [{
                type: Output
            }], onTargetFilter: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], listViewSourceChild: [{
                type: ViewChild,
                args: ['sourcelist']
            }], listViewTargetChild: [{
                type: ViewChild,
                args: ['targetlist']
            }], sourceFilterViewChild: [{
                type: ViewChild,
                args: ['sourceFilter']
            }], targetFilterViewChild: [{
                type: ViewChild,
                args: ['targetFilter']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
const DragConfig = {
    zIndex: 1200
};
export class PickListModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PickListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: PickListModule, declarations: [PickList], imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon], exports: [PickList, SharedModule, DragDropModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PickListModule, providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }], imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon, SharedModule, DragDropModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PickListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, SharedModule, RippleModule, DragDropModule, AngleDoubleDownIcon, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleDoubleUpIcon, AngleDownIcon, AngleLeftIcon, AngleRightIcon, AngleUpIcon, SearchIcon, HomeIcon],
                    exports: [PickList, SharedModule, DragDropModule],
                    declarations: [PickList],
                    providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2xpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvcGlja2xpc3QvcGlja2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBZSxjQUFjLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUgsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBSVgsU0FBUyxFQUNULGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdDLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFjL0Q7OztHQUdHO0FBcVRILE1BQU0sT0FBTyxRQUFRO0lBdWFhO0lBQ0c7SUFDckI7SUFDRDtJQUNBO0lBQ0E7SUFDQTtJQTVhWDs7O09BR0c7SUFDTSxNQUFNLENBQW9CO0lBQ25DOzs7T0FHRztJQUNNLE1BQU0sQ0FBb0I7SUFDbkM7OztPQUdHO0lBQ00sWUFBWSxDQUFxQjtJQUMxQzs7O09BR0c7SUFDb0MsUUFBUSxHQUF1QixDQUFDLENBQUM7SUFDeEU7OztPQUdHO0lBQ00sb0JBQW9CLENBQXFCO0lBQ2xEOzs7T0FHRztJQUNNLG1CQUFtQixDQUFxQjtJQUNqRDs7O09BR0c7SUFDTSx1QkFBdUIsQ0FBcUI7SUFDckQ7OztPQUdHO0lBQ00sc0JBQXNCLENBQXFCO0lBQ3BEOzs7T0FHRztJQUNNLGlCQUFpQixDQUFxQjtJQUMvQzs7O09BR0c7SUFDTSxtQkFBbUIsQ0FBcUI7SUFDakQ7OztPQUdHO0lBQ00sa0JBQWtCLENBQXFCO0lBQ2hEOzs7T0FHRztJQUNNLHFCQUFxQixDQUFxQjtJQUNuRDs7O09BR0c7SUFDTSxZQUFZLENBQXFCO0lBQzFDOzs7T0FHRztJQUNxQyxVQUFVLENBQXNCO0lBQ3hFOzs7T0FHRztJQUNNLFFBQVEsQ0FBcUI7SUFDdEM7OztPQUdHO0lBQ00sWUFBWSxDQUFxQjtJQUMxQzs7O09BR0c7SUFDTSxPQUFPLEdBQWEsQ0FBQyxLQUFhLEVBQUUsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDaEU7OztPQUdHO0lBQ00sYUFBYSxDQUF1QjtJQUM3Qzs7O09BR0c7SUFDTSxhQUFhLENBQXVCO0lBQzdDOzs7T0FHRztJQUNxQyxnQkFBZ0IsR0FBWSxJQUFJLENBQUM7SUFDekU7OztPQUdHO0lBQ3FDLGdCQUFnQixHQUFZLElBQUksQ0FBQztJQUN6RTs7O09BR0c7SUFDcUMsZ0JBQWdCLEdBQVksS0FBSyxDQUFDO0lBQzFFOzs7T0FHRztJQUNxQyxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQ2xFOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxXQUFXLENBQU07SUFDMUI7OztPQUdHO0lBQ00sV0FBVyxDQUFNO0lBQzFCOzs7T0FHRztJQUNxQyxrQkFBa0IsR0FBWSxJQUFJLENBQUM7SUFDM0U7OztPQUdHO0lBQ3FDLGtCQUFrQixHQUFZLElBQUksQ0FBQztJQUMzRTs7O09BR0c7SUFDTSx1QkFBdUIsQ0FBcUI7SUFDckQ7OztPQUdHO0lBQ00sdUJBQXVCLENBQXFCO0lBQ3JEOzs7T0FHRztJQUNxQyxRQUFRLEdBQVksS0FBSyxDQUFDO0lBQ2xFOzs7T0FHRztJQUNNLHFCQUFxQixDQUFxQjtJQUNuRDs7O09BR0c7SUFDTSxxQkFBcUIsQ0FBcUI7SUFDbkQ7OztPQUdHO0lBQ00sZUFBZSxHQUF5RyxVQUFVLENBQUM7SUFDNUk7OztPQUdHO0lBQ3FDLFdBQVcsQ0FBc0I7SUFDekU7OztPQUdHO0lBQ3FDLGFBQWEsR0FBWSxLQUFLLENBQUM7SUFDdkU7OztPQUdHO0lBQ0gsSUFBYSxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsS0FBYTtRQUN4QixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNPLGNBQWMsR0FBNEMsSUFBSSxZQUFZLEVBQTZCLENBQUM7SUFDbEg7Ozs7T0FJRztJQUNPLGlCQUFpQixHQUErQyxJQUFJLFlBQVksRUFBZ0MsQ0FBQztJQUMzSDs7OztPQUlHO0lBQ08saUJBQWlCLEdBQStDLElBQUksWUFBWSxFQUFnQyxDQUFDO0lBQzNIOzs7O09BSUc7SUFDTyxjQUFjLEdBQTRDLElBQUksWUFBWSxFQUE2QixDQUFDO0lBQ2xIOzs7O09BSUc7SUFDTyxlQUFlLEdBQTZDLElBQUksWUFBWSxFQUE4QixDQUFDO0lBQ3JIOzs7O09BSUc7SUFDTyxlQUFlLEdBQTZDLElBQUksWUFBWSxFQUE4QixDQUFDO0lBQ3JIOzs7O09BSUc7SUFDTyxjQUFjLEdBQTRDLElBQUksWUFBWSxFQUE2QixDQUFDO0lBQ2xIOzs7O09BSUc7SUFDTyxjQUFjLEdBQTRDLElBQUksWUFBWSxFQUE2QixDQUFDO0lBQ2xIOzs7O09BSUc7SUFDTyxjQUFjLEdBQTRDLElBQUksWUFBWSxFQUE2QixDQUFDO0lBQ2xIOzs7O09BSUc7SUFDTyxjQUFjLEdBQTRDLElBQUksWUFBWSxFQUE2QixDQUFDO0lBRWxIOzs7O09BSUc7SUFDTyxPQUFPLEdBQXdCLElBQUksWUFBWSxFQUFTLENBQUM7SUFFbkU7Ozs7T0FJRztJQUNPLE1BQU0sR0FBd0IsSUFBSSxZQUFZLEVBQVMsQ0FBQztJQUV6QyxtQkFBbUIsQ0FBdUI7SUFFMUMsbUJBQW1CLENBQXVCO0lBRXhDLHFCQUFxQixDQUF1QjtJQUU1QyxxQkFBcUIsQ0FBdUI7SUFFdkMsU0FBUyxDQUFxQztJQUU5RSxJQUFJLGVBQWU7UUFDZixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM1SSxDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDL0ksQ0FBQztJQUVELElBQUksaUJBQWlCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2xKLENBQUM7SUFFRCxJQUFJLG1CQUFtQjtRQUNuQixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN4SixDQUFDO0lBRUQsSUFBSSxxQkFBcUI7UUFDckIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDeEosQ0FBQztJQUVELElBQUksd0JBQXdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2pLLENBQUM7SUFFRCxJQUFJLHFCQUFxQjtRQUNyQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN0SixDQUFDO0lBRUQsSUFBSSx3QkFBd0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDL0osQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksZUFBZTtRQUNmLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMzRSxDQUFDO0lBRUQsV0FBVyxHQUFXLE9BQU8sQ0FBQztJQUV2QixZQUFZLENBQStCO0lBRWxELG1CQUFtQixDQUE2QjtJQUVoRCxrQkFBa0IsQ0FBNkI7SUFFL0Msb0JBQW9CLENBQTZCO0lBRWpELHNCQUFzQixDQUE2QjtJQUVuRCx3QkFBd0IsQ0FBNkI7SUFFckQsMkJBQTJCLENBQTZCO0lBRXhELHdCQUF3QixDQUE2QjtJQUVyRCwyQkFBMkIsQ0FBNkI7SUFFeEQsd0JBQXdCLENBQTZCO0lBRXJELHdCQUF3QixDQUE2QjtJQUU5QyxvQkFBb0IsQ0FBMkI7SUFFL0Msb0JBQW9CLENBQTJCO0lBRXRELG1CQUFtQixHQUFVLEVBQUUsQ0FBQztJQUVoQyxtQkFBbUIsR0FBVSxFQUFFLENBQUM7SUFFaEMsb0JBQW9CLENBQU07SUFFMUIsT0FBTyxDQUFvQjtJQUUzQixTQUFTLENBQW9CO0lBRTdCLFdBQVcsQ0FBb0I7SUFFL0IsWUFBWSxDQUFNO0lBRWxCLEVBQUUsR0FBVyxpQkFBaUIsRUFBRSxDQUFDO0lBRWpDLGlCQUFpQixDQUFtQjtJQUVwQyxpQkFBaUIsQ0FBbUI7SUFFcEMsWUFBWSxDQUFtQjtJQUUvQiwwQkFBMEIsQ0FBNkI7SUFFdkQsZ0NBQWdDLENBQTZCO0lBRTdELDBCQUEwQixDQUE2QjtJQUV2RCxnQ0FBZ0MsQ0FBNkI7SUFFN0Qsb0JBQW9CLENBQTZCO0lBRWpELG9CQUFvQixDQUE2QjtJQUVqRCxvQkFBb0IsQ0FBNkI7SUFFakQsb0JBQW9CLENBQTZCO0lBRWpELG1CQUFtQixDQUFrQztJQUVyRCxtQkFBbUIsQ0FBa0M7SUFFNUMsV0FBVyxHQUFXLENBQUMsQ0FBQyxDQUFDO0lBRXpCLFdBQVcsR0FBVyxDQUFDLENBQUM7SUFFakMsTUFBTSxDQUFTO0lBRWYsS0FBSyxDQUFvQztJQUV6QyxXQUFXLENBQXNCO0lBRWpDLGtCQUFrQixHQUFRLENBQUMsQ0FBQyxDQUFDO0lBRTdCLGFBQWEsQ0FBa0I7SUFFL0IsT0FBTyxHQUFRO1FBQ1gsVUFBVSxFQUFFLEtBQUs7UUFDakIsVUFBVSxFQUFFLEtBQUs7S0FDcEIsQ0FBQztJQUVGLG1CQUFtQixDQUFlO0lBRWxDLFlBQzhCLFFBQWtCLEVBQ2YsVUFBZSxFQUNwQyxRQUFtQixFQUNwQixFQUFjLEVBQ2QsRUFBcUIsRUFDckIsYUFBNEIsRUFDNUIsTUFBcUI7UUFORixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2YsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQUNwQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ3BCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBRTVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFxQixDQUFDO0lBQ3RELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHO2dCQUN2QixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUMzQyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO2FBQ3hDLENBQUM7WUFFRixJQUFJLENBQUMsbUJBQW1CLEdBQUc7Z0JBQ3ZCLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQzNDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7YUFDeEMsQ0FBQztRQUNOLENBQUM7SUFDTCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2IsSUFBSSxDQUFDLFNBQXNDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDMUQsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztnQkFDckIsS0FBSyxNQUFNO29CQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDbEMsTUFBTTtnQkFFVixLQUFLLGNBQWM7b0JBQ2YsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQzFDLE1BQU07Z0JBRVYsS0FBSyxjQUFjO29CQUNmLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUMxQyxNQUFNO2dCQUVWLEtBQUssY0FBYztvQkFDZixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDMUMsTUFBTTtnQkFFVixLQUFLLGNBQWM7b0JBQ2YsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQzFDLE1BQU07Z0JBRVYsS0FBSyxvQkFBb0I7b0JBQ3JCLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNoRCxNQUFNO2dCQUVWLEtBQUssMEJBQTBCO29CQUMzQixJQUFJLENBQUMsZ0NBQWdDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDdEQsTUFBTTtnQkFFVixLQUFLLG9CQUFvQjtvQkFDckIsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ2hELE1BQU07Z0JBRVYsS0FBSywwQkFBMEI7b0JBQzNCLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUN0RCxNQUFNO2dCQUVWLEtBQUssWUFBWTtvQkFDYixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDeEMsTUFBTTtnQkFFVixLQUFLLGFBQWE7b0JBQ2QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3pDLE1BQU07Z0JBRVYsS0FBSyxjQUFjO29CQUNmLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUMxQyxNQUFNO2dCQUVWLEtBQUssZ0JBQWdCO29CQUNqQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDNUMsTUFBTTtnQkFFVixLQUFLLGtCQUFrQjtvQkFDbkIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQzlDLE1BQU07Z0JBRVYsS0FBSyxxQkFBcUI7b0JBQ3RCLElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNqRCxNQUFNO2dCQUVWLEtBQUssa0JBQWtCO29CQUNuQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDOUMsTUFBTTtnQkFFVixLQUFLLHFCQUFxQjtvQkFDdEIsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ2pELE1BQU07Z0JBRVYsS0FBSyxrQkFBa0I7b0JBQ25CLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUM5QyxNQUFNO2dCQUVWLEtBQUssa0JBQWtCO29CQUNuQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDOUMsTUFBTTtnQkFFVjtvQkFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ2xDLE1BQU07WUFDZCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzdFLElBQUksUUFBUSxDQUFDO1lBRWIsSUFBSSxJQUFJLENBQUMsT0FBTztnQkFBRSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDckMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRWhELFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDckMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBa0IsRUFBRSxJQUFTLEVBQUUsYUFBb0IsRUFBRSxRQUFnQixFQUFFLFFBQTJCLEVBQUUsTUFBZTtRQUMzSCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixPQUFPO1FBQ1gsQ0FBQztRQUVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3RELElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUM7UUFDN0MsSUFBSSxRQUFRLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBRXJFLElBQUksYUFBYSxFQUFFLENBQUM7WUFDaEIsSUFBSSxPQUFPLEdBQW1CLEtBQU0sQ0FBQyxPQUFPLElBQW9CLEtBQU0sQ0FBQyxPQUFPLElBQW9CLEtBQU0sQ0FBQyxRQUFRLENBQUM7WUFFbEgsSUFBSSxRQUFRLElBQUksT0FBTyxFQUFFLENBQUM7Z0JBQ3RCLGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLENBQUM7aUJBQU0sQ0FBQztnQkFDSixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ1gsYUFBYSxHQUFHLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQztnQkFDRCxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLENBQUM7UUFDTCxDQUFDO2FBQU0sQ0FBQztZQUNKLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ1gsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxpREFBaUQ7WUFDbEgsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsUUFBZ0I7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDakYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU87UUFDWCxDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvQkFBb0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsT0FBTztRQUNYLENBQUM7UUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFvQixFQUFFLFFBQWdCO1FBQzNDLElBQUksS0FBSyxHQUFzQixLQUFLLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsV0FBVztZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkQsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFdBQVc7WUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBYSxFQUFFO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxNQUFNLENBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFlBQVksQ0FBQyxRQUFhLEVBQUU7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLE1BQU0sQ0FBUSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVcsRUFBRSxRQUFnQjtRQUNoQyxJQUFJLFlBQVksR0FBWSxJQUFJLENBQUMsUUFBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0RCxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUNsRyxDQUFDO2FBQU0sSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDbEcsQ0FBQztJQUNMLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBUyxFQUFFLFFBQWdCO1FBQ3JDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFRLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQVUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O1lBQ2pJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBUSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFVLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdHLENBQUM7SUFFRCxPQUFPLENBQUMsUUFBZ0I7UUFDcEIsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7O1lBQzdLLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUN6SixDQUFDO0lBRUQsZUFBZSxDQUFDLElBQVcsRUFBRSxJQUFTLEVBQUUsV0FBbUI7UUFDdkQsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ25DLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNsQixPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO2FBQU0sQ0FBQztZQUNKLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDTCxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU87UUFDWCxDQUFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEtBQVksRUFBRSxJQUFTO1FBQzdDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUF3QixFQUFFLElBQVcsRUFBRSxhQUFvQixFQUFFLFFBQTJCLEVBQUUsUUFBZ0I7UUFDN0csSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzVDLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxpQkFBaUIsR0FBVyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFaEYsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQ3hDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNuQyxDQUFDO3FCQUFNLENBQUM7b0JBQ0osTUFBTTtnQkFDVixDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUzSyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsV0FBVyxDQUFDO1lBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxXQUF3QixFQUFFLElBQVcsRUFBRSxhQUFvQixFQUFFLFFBQTJCLEVBQUUsUUFBZ0I7UUFDOUcsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzVDLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxpQkFBaUIsR0FBVyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFaEYsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztxQkFBTSxDQUFDO29CQUNKLE1BQU07Z0JBQ1YsQ0FBQztZQUNMLENBQUM7WUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFM0ssV0FBVyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLFdBQXdCLEVBQUUsSUFBVyxFQUFFLGFBQW9CLEVBQUUsUUFBMkIsRUFBRSxRQUFnQjtRQUMvRyxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pELElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxpQkFBaUIsR0FBVyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFaEYsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO29CQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ25DLENBQUM7cUJBQU0sQ0FBQztvQkFDSixNQUFNO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRTNLLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxXQUFXLENBQUM7WUFDeEMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLFdBQXdCLEVBQUUsSUFBVyxFQUFFLGFBQW9CLEVBQUUsUUFBMkIsRUFBRSxRQUFnQjtRQUNqSCxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pELElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxpQkFBaUIsR0FBVyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFaEYsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6QixDQUFDO3FCQUFNLENBQUM7b0JBQ0osTUFBTTtnQkFDVixDQUFDO1lBQ0wsQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUzSyxXQUFXLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUM7WUFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM5RCxNQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2hELElBQUksWUFBWSxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLFdBQVcsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUMvRCxJQUFJLGFBQWEsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzNFLElBQUksYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxDQUFDO29CQUNELElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO3dCQUNwRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5RyxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsbUJBQW1CO2FBQ2xDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzFGLENBQUM7WUFFRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1lBRTlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEQsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztvQkFDdkQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDL0IsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDN0IsQ0FBQyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQztZQUNMLENBQUM7WUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2dCQUN4QixLQUFLLEVBQUUsVUFBVTthQUNwQixDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMxRixDQUFDO1lBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztZQUU5QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFRLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELENBQUM7WUFFRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM5RCxNQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUN4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2hELElBQUksWUFBWSxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLFdBQVcsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUMvRCxJQUFJLGFBQWEsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzNFLElBQUksYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxDQUFDO29CQUNELElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO3dCQUNwRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqSCxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsbUJBQW1CO2FBQ2xDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzFGLENBQUM7WUFFRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO1lBRTlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEQsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztvQkFDdkQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDL0IsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDN0IsQ0FBQyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQztZQUNMLENBQUM7WUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2dCQUN4QixLQUFLLEVBQUUsVUFBVTthQUNwQixDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMxRixDQUFDO1lBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztZQUU5QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFRLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELENBQUM7WUFFRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVMsRUFBRSxhQUFvQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxhQUFhO1FBQzdCLE9BQU87WUFDSCxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUM7WUFDbkQsU0FBUyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsZUFBZTtZQUN0QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDOUIsQ0FBQztJQUNOLENBQUM7SUFFRCxlQUFlLENBQUMsSUFBUyxFQUFFLGFBQW9CO1FBQzNDLE9BQU8sV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUE0QixFQUFFLFFBQWdCO1FBQ2pELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQzdELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0SCxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEMsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDYixpQkFBaUIsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzSCxJQUFJLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBRS9GLElBQUksaUJBQWlCLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFdEQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkQsQ0FBQztnQkFDTCxDQUFDO2dCQUVELElBQUksSUFBSSxDQUFDLG9CQUFvQjtvQkFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXhGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0QsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLGVBQWUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDM0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1RCxDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBUSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0RCxDQUFDO1FBQ0wsQ0FBQzthQUFNLENBQUM7WUFDSixJQUFJLFVBQVUsRUFBRSxDQUFDO2dCQUNiLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRTNILElBQUksaUJBQWlCLEdBQUcsV0FBVyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFFL0YsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUV0RCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNuRCxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsSUFBSSxJQUFJLENBQUMsb0JBQW9CO29CQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFeEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzRCxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osZUFBZSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVELENBQUM7WUFFRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFRLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUTtRQUN2QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0saUJBQWlCLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsZ0NBQWdDLENBQUMsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQzNKLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRWpGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsSCxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUVsSyxJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSyxFQUFFLFFBQVE7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDbEYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxjQUFjLENBQUMsUUFBZ0I7UUFDM0IsT0FBTyxRQUFRLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQztJQUM3SCxDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWdCO1FBQ3pCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0MsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtQ0FBbUMsQ0FBQyxXQUFrQixFQUFFLGFBQW9CO1FBQ3hFLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25HLE9BQU8sa0JBQWtCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCxjQUFjLENBQUMsUUFBZ0I7UUFDM0IsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdEssQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEssQ0FBQztJQUVELGdCQUFnQixDQUFDLFFBQWdCLEVBQUUsYUFBb0I7UUFDbkQsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxhQUFhLENBQUM7UUFDN0MsQ0FBQzthQUFNLENBQUM7WUFDSixJQUFJLENBQUMsbUJBQW1CLEdBQUcsYUFBYSxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQy9DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUMsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDO1FBRTdFLE9BQU8sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7UUFDL0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxNQUFNLGtCQUFrQixHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUM7UUFFN0UsT0FBTyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFrQixFQUFFLGFBQW9CLEVBQUUsUUFBMkIsRUFBRSxRQUFnQjtRQUNqRyxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqQixLQUFLLFdBQVc7Z0JBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDOUQsTUFBTTtZQUVWLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNO1lBRVYsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3pELE1BQU07WUFFVixLQUFLLEtBQUs7Z0JBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDeEQsTUFBTTtZQUVWLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMxRCxNQUFNO1lBRVYsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzFELE1BQU07WUFFVixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7b0JBQ3hDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQztZQUVMO2dCQUNJLE1BQU07UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQWEsRUFBRSxRQUFnQjtRQUM1QyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUU5QixJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDNUssQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVLLENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsUUFBUTtRQUNwQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksS0FBSyxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNwQixJQUFJLEtBQUssR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRTdFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakUsQ0FBQztJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBRSxFQUFFLFFBQVE7UUFDckIsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV2RixJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTyxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUM1RixDQUFDO0lBQ0wsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFrQixFQUFFLGFBQW9CLEVBQUUsUUFBMkIsRUFBRSxRQUFnQjtRQUNsRyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWhGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFckQsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBa0IsRUFBRSxhQUFvQixFQUFFLFFBQTJCLEVBQUUsUUFBZ0I7UUFDaEcsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoRixJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXJELElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWtCLEVBQUUsYUFBb0IsRUFBRSxRQUEyQixFQUFFLFFBQWdCO1FBQzlGLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMvRSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFrQixFQUFFLGFBQW9CLEVBQUUsUUFBMkIsRUFBRSxRQUFnQjtRQUM5RixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkIsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzlELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsbUNBQW1DLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRTdGLElBQUksaUJBQWlCLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUVoRixhQUFhLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBRS9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztnQkFDeEMsT0FBTztZQUNYLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWtCLEVBQUUsYUFBb0IsRUFBRSxRQUEyQixFQUFFLFFBQWdCO1FBQzdGLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxJQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFaEYsYUFBYSxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQy9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDO2FBQU0sQ0FBQztZQUNKLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWtCLEVBQUUsYUFBb0IsRUFBRSxRQUEyQixFQUFFLFFBQWdCO1FBQzVGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBSSxTQUFTLEdBQUcsV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3RGLElBQUksU0FBUyxLQUFLLElBQUk7WUFBRSxPQUFPO1FBRS9CLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsSUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ2hGLGFBQWEsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUVoRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQy9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDO2FBQU0sQ0FBQztZQUNKLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsY0FBYyxDQUFDLFNBQWlCLEVBQUUsT0FBZSxFQUFFLFdBQW1CLEVBQUUsVUFBbUIsRUFBRSxJQUFpQjtRQUMxRyxJQUFJLGFBQWEsRUFBRSxZQUFZLENBQUM7UUFFaEMsSUFBSSxXQUFXLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25DLGFBQWEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3pNLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBUSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzVJLENBQUM7YUFBTSxDQUFDO1lBQ0osYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDek0sWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFRLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDNUksQ0FBQztRQUVELE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELHdCQUF3QixDQUFDLGNBQXFCLEVBQUUsS0FBYSxFQUFFLE9BQVk7UUFDdkUsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ2xDLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUU5RSxPQUFPLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQzthQUFNLENBQUM7WUFDSixPQUFPLFdBQVcsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxDQUFvQixJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxDQUFvQixJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBUztRQUNsQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFFdkMsSUFBSSxRQUFRO1lBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDOztZQUM1SSxPQUFPLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsWUFBWSxDQUFDLElBQVM7UUFDbEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBRTNDLElBQUksUUFBUTtZQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQzs7WUFDNUksT0FBTyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsZUFBZSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3RDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCx1QkFBdUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzVFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDakMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRUQseUJBQXlCO1FBQ3JCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNwQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDbEUsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMvRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRWpFLElBQUksU0FBUyxHQUFHO2dEQUNnQixJQUFJLENBQUMsVUFBVTtrQ0FDN0IsSUFBSSxDQUFDLEVBQUU7Ozs7a0NBSVAsSUFBSSxDQUFDLEVBQUU7Ozs7O2tDQUtQLElBQUksQ0FBQyxFQUFFOzs7OztrQ0FLUCxJQUFJLENBQUMsRUFBRTs7O2tCQUd2QixDQUFDO2dCQUVILElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3pFLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQjtRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLEVBQUUsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQzt1R0F6ekNRLFFBQVEsa0JBdWFMLFFBQVEsYUFDUixXQUFXOzJGQXhhZCxRQUFRLHlJQW9CRyxlQUFlLHdiQWtEZixnQkFBZ0Isc01BOEJoQixnQkFBZ0IsOERBS2hCLGdCQUFnQiw4REFLaEIsZ0JBQWdCLHNDQUtoQixnQkFBZ0Isc0tBeUJoQixnQkFBZ0Isb0VBS2hCLGdCQUFnQiw4SUFlaEIsZ0JBQWdCLG1MQW9CaEIsZ0JBQWdCLHFEQUtoQixnQkFBZ0IsK2dCQW9HbkIsYUFBYSxvY0Eva0JwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTBTVCxrOUZBeTBDaUYsbUJBQW1CLHFGQUFFLG1CQUFtQixxRkFBRSxvQkFBb0Isc0ZBQUUsaUJBQWlCLG1GQUFFLGFBQWEsK0VBQUUsYUFBYSwrRUFBRSxjQUFjLGdGQUFFLFdBQVcsNkVBQUUsVUFBVTs7MkZBajBDak8sUUFBUTtrQkFwVHBCLFNBQVM7K0JBQ0ksWUFBWSxZQUNaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMFNULG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBRS9CO3dCQUNGLEtBQUssRUFBRSxXQUFXO3FCQUNyQjs7MEJBeWFJLE1BQU07MkJBQUMsUUFBUTs7MEJBQ2YsTUFBTTsyQkFBQyxXQUFXO2tMQW5hZCxNQUFNO3NCQUFkLEtBQUs7Z0JBS0csTUFBTTtzQkFBZCxLQUFLO2dCQUtHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBS2lDLFFBQVE7c0JBQTlDLEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFO2dCQUs1QixvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBS0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUtHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFLRyxzQkFBc0I7c0JBQTlCLEtBQUs7Z0JBS0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUtHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFLRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBS0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUtHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBS2tDLFVBQVU7c0JBQWpELEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBSzdCLFFBQVE7c0JBQWhCLEtBQUs7Z0JBS0csWUFBWTtzQkFBcEIsS0FBSztnQkFLRyxPQUFPO3NCQUFmLEtBQUs7Z0JBS0csYUFBYTtzQkFBckIsS0FBSztnQkFLRyxhQUFhO3NCQUFyQixLQUFLO2dCQUtrQyxnQkFBZ0I7c0JBQXZELEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBS0UsZ0JBQWdCO3NCQUF2RCxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQUtFLGdCQUFnQjtzQkFBdkQsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTtnQkFLRSxRQUFRO3NCQUEvQyxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQUs3QixLQUFLO3NCQUFiLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxXQUFXO3NCQUFuQixLQUFLO2dCQUtHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS2tDLGtCQUFrQjtzQkFBekQsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTtnQkFLRSxrQkFBa0I7c0JBQXpELEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBSzdCLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFLRyx1QkFBdUI7c0JBQS9CLEtBQUs7Z0JBS2tDLFFBQVE7c0JBQS9DLEtBQUs7dUJBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBSzdCLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFLRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBS0csZUFBZTtzQkFBdkIsS0FBSztnQkFLa0MsV0FBVztzQkFBbEQsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTtnQkFLRSxhQUFhO3NCQUFwRCxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQUt6QixVQUFVO3NCQUF0QixLQUFLO2dCQWlCSSxjQUFjO3NCQUF2QixNQUFNO2dCQU1HLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFNRyxpQkFBaUI7c0JBQTFCLE1BQU07Z0JBTUcsY0FBYztzQkFBdkIsTUFBTTtnQkFNRyxlQUFlO3NCQUF4QixNQUFNO2dCQU1HLGVBQWU7c0JBQXhCLE1BQU07Z0JBTUcsY0FBYztzQkFBdkIsTUFBTTtnQkFNRyxjQUFjO3NCQUF2QixNQUFNO2dCQU1HLGNBQWM7c0JBQXZCLE1BQU07Z0JBTUcsY0FBYztzQkFBdkIsTUFBTTtnQkFPRyxPQUFPO3NCQUFoQixNQUFNO2dCQU9HLE1BQU07c0JBQWYsTUFBTTtnQkFFa0IsbUJBQW1CO3NCQUEzQyxTQUFTO3VCQUFDLFlBQVk7Z0JBRUUsbUJBQW1CO3NCQUEzQyxTQUFTO3VCQUFDLFlBQVk7Z0JBRUkscUJBQXFCO3NCQUEvQyxTQUFTO3VCQUFDLGNBQWM7Z0JBRUUscUJBQXFCO3NCQUEvQyxTQUFTO3VCQUFDLGNBQWM7Z0JBRU8sU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQStoQ2xDLE1BQU0sVUFBVSxHQUFHO0lBQ2YsTUFBTSxFQUFFLElBQUk7Q0FDZixDQUFDO0FBUUYsTUFBTSxPQUFPLGNBQWM7dUdBQWQsY0FBYzt3R0FBZCxjQUFjLGlCQXQwQ2QsUUFBUSxhQWkwQ1AsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsYUFqMEMzTyxRQUFRLEVBazBDRyxZQUFZLEVBQUUsY0FBYzt3R0FJdkMsY0FBYyxhQUZaLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxZQUhyRCxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUNoTyxZQUFZLEVBQUUsY0FBYzs7MkZBSXZDLGNBQWM7a0JBTjFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQztvQkFDclAsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUM7b0JBQ2pELFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztvQkFDeEIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQztpQkFDbEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDREtfRFJBR19DT05GSUcsIENka0RyYWdEcm9wLCBEcmFnRHJvcE1vZHVsZSwgbW92ZUl0ZW1JbkFycmF5LCB0cmFuc2ZlckFycmF5SXRlbSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgT3V0cHV0LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgbnVtYmVyQXR0cmlidXRlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IEFuZ2xlRG91YmxlRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG91YmxlZG93bic7XG5pbXBvcnQgeyBBbmdsZURvdWJsZUxlZnRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZWRvdWJsZWxlZnQnO1xuaW1wb3J0IHsgQW5nbGVEb3VibGVSaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG91YmxlcmlnaHQnO1xuaW1wb3J0IHsgQW5nbGVEb3VibGVVcEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG91YmxldXAnO1xuaW1wb3J0IHsgQW5nbGVEb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3duJztcbmltcG9ydCB7IEFuZ2xlTGVmdEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlbGVmdCc7XG5pbXBvcnQgeyBBbmdsZVJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVyaWdodCc7XG5pbXBvcnQgeyBBbmdsZVVwSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGV1cCc7XG5pbXBvcnQgeyBIb21lSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvaG9tZSc7XG5pbXBvcnQgeyBTZWFyY2hJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9zZWFyY2gnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgTnVsbGFibGUsIFZvaWRMaXN0ZW5lciB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBPYmplY3RVdGlscywgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7XG4gICAgUGlja0xpc3RGaWx0ZXJPcHRpb25zLFxuICAgIFBpY2tMaXN0TW92ZUFsbFRvU291cmNlRXZlbnQsXG4gICAgUGlja0xpc3RNb3ZlQWxsVG9UYXJnZXRFdmVudCxcbiAgICBQaWNrTGlzdE1vdmVUb1NvdXJjZUV2ZW50LFxuICAgIFBpY2tMaXN0TW92ZVRvVGFyZ2V0RXZlbnQsXG4gICAgUGlja0xpc3RTb3VyY2VGaWx0ZXJFdmVudCxcbiAgICBQaWNrTGlzdFNvdXJjZVJlb3JkZXJFdmVudCxcbiAgICBQaWNrTGlzdFNvdXJjZVNlbGVjdEV2ZW50LFxuICAgIFBpY2tMaXN0VGFyZ2V0RmlsdGVyRXZlbnQsXG4gICAgUGlja0xpc3RUYXJnZXRSZW9yZGVyRXZlbnQsXG4gICAgUGlja0xpc3RUYXJnZXRTZWxlY3RFdmVudFxufSBmcm9tICcuL3BpY2tsaXN0LmludGVyZmFjZSc7XG4vKipcbiAqIFBpY2tMaXN0IGlzIHVzZWQgdG8gcmVvcmRlciBpdGVtcyBiZXR3ZWVuIGRpZmZlcmVudCBsaXN0cy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1waWNrTGlzdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwieyAncC1waWNrbGlzdCBwLWNvbXBvbmVudCc6IHRydWUsICdwLXBpY2tsaXN0LXN0cmlwZWQnOiBzdHJpcGVkUm93cyB9XCIgY2RrRHJvcExpc3RHcm91cCBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3BpY2tsaXN0J1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncm9vdCdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LWJ1dHRvbnMgcC1waWNrbGlzdC1zb3VyY2UtY29udHJvbHNcIiAqbmdJZj1cInNob3dTb3VyY2VDb250cm9sc1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlQ29udHJvbHMnXCIgW2F0dHIuZGF0YS1wYy1ncm91cC1zZWN0aW9uXT1cIidjb250cm9scydcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vdmVVcEFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJzb3VyY2VNb3ZlRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVXAoc291cmNlbGlzdCwgc291cmNlLCBzZWxlY3RlZEl0ZW1zU291cmNlLCBvblNvdXJjZVJlb3JkZXIsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlTW92ZVVwQnV0dG9uJ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8QW5nbGVVcEljb24gKm5nSWY9XCIhbW92ZVVwSWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZldXBpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVVcEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlVG9wQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInNvdXJjZU1vdmVEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVUb3Aoc291cmNlbGlzdCwgc291cmNlLCBzZWxlY3RlZEl0ZW1zU291cmNlLCBvblNvdXJjZVJlb3JkZXIsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlTW92ZVRvcEJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG91YmxlVXBJY29uICpuZ0lmPVwiIW1vdmVUb3BJY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmV0b3BpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVUb3BJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZURvd25BcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwic291cmNlTW92ZURpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZURvd24oc291cmNlbGlzdCwgc291cmNlLCBzZWxlY3RlZEl0ZW1zU291cmNlLCBvblNvdXJjZVJlb3JkZXIsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlTW92ZURvd25CdXR0b24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxBbmdsZURvd25JY29uICpuZ0lmPVwiIW1vdmVEb3duSWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlZG93bmljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZURvd25JY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZUJvdHRvbUFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJzb3VyY2VNb3ZlRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlQm90dG9tKHNvdXJjZWxpc3QsIHNvdXJjZSwgc2VsZWN0ZWRJdGVtc1NvdXJjZSwgb25Tb3VyY2VSZW9yZGVyLCBTT1VSQ0VfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZU1vdmVCb3R0b21CdXR0b24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZURvd25JY29uICpuZ0lmPVwiIW1vdmVCb3R0b21JY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVib3R0b21pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVCb3R0b21JY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1saXN0LXdyYXBwZXIgcC1waWNrbGlzdC1zb3VyY2Utd3JhcHBlclwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlV3JhcHBlcidcIiBbYXR0ci5kYXRhLXBjLWdyb3VwLXNlY3Rpb25dPVwiJ2xpc3RXcmFwcGVyJ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgW2lkXT1cImlkU291cmNlICsgJ19oZWFkZXInXCIgY2xhc3M9XCJwLXBpY2tsaXN0LWhlYWRlclwiICpuZ0lmPVwic291cmNlSGVhZGVyIHx8IHNvdXJjZUhlYWRlclRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VIZWFkZXInXCIgW2F0dHIuZGF0YS1wYy1ncm91cC1zZWN0aW9uXT1cIidoZWFkZXInXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBpY2tsaXN0LXRpdGxlXCIgKm5nSWY9XCIhc291cmNlSGVhZGVyVGVtcGxhdGVcIj57eyBzb3VyY2VIZWFkZXIgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInNvdXJjZUhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyQnkgJiYgc2hvd1NvdXJjZUZpbHRlciAhPT0gZmFsc2VcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZUZpbHRlckNvbnRhaW5lcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNvdXJjZUZpbHRlclRlbXBsYXRlOyBlbHNlIGJ1aWx0SW5Tb3VyY2VFbGVtZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic291cmNlRmlsdGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgb3B0aW9uczogc291cmNlRmlsdGVyT3B0aW9ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWx0SW5Tb3VyY2VFbGVtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VGaWx0ZXInXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICNzb3VyY2VGaWx0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwidGV4dGJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXl1cCk9XCJvbkZpbHRlcigkZXZlbnQsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXItaW5wdXQgcC1pbnB1dHRleHQgcC1jb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5wbGFjZWhvbGRlcl09XCJzb3VyY2VGaWx0ZXJQbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVNvdXJjZUZpbHRlckxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VGaWx0ZXJJbnB1dCdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlYXJjaEljb24gKm5nSWY9XCIhc291cmNlRmlsdGVySWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtcGlja2xpc3QtZmlsdGVyLWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VmaWx0ZXJJY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlci1pY29uXCIgKm5nSWY9XCJzb3VyY2VGaWx0ZXJJY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3NvdXJjZWZpbHRlckljb24nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInNvdXJjZUZpbHRlckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8dWxcbiAgICAgICAgICAgICAgICAgICAgI3NvdXJjZWxpc3RcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBpY2tsaXN0LWxpc3QgcC1waWNrbGlzdC1zb3VyY2VcIlxuICAgICAgICAgICAgICAgICAgICBbaWRdPVwiaWRTb3VyY2UgKyAnX2xpc3QnXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImlkU291cmNlICsgJ19oZWFkZXInXCJcbiAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JdGVtS2V5RG93bigkZXZlbnQsIHNlbGVjdGVkSXRlbXNTb3VyY2UsIG9uU291cmNlU2VsZWN0LCBTT1VSQ0VfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25MaXN0Rm9jdXMoJGV2ZW50LCBTT1VSQ0VfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvbkxpc3RCbHVyKCRldmVudCwgU09VUkNFX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgY2RrRHJvcExpc3RcbiAgICAgICAgICAgICAgICAgICAgW2Nka0Ryb3BMaXN0RGF0YV09XCJzb3VyY2VcIlxuICAgICAgICAgICAgICAgICAgICAoY2RrRHJvcExpc3REcm9wcGVkKT1cIm9uRHJvcCgkZXZlbnQsIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNvdXJjZVN0eWxlXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLW11bHRpc2VsZWN0YWJsZT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiZm9jdXNlZFsnc291cmNlTGlzdCddID8gZm9jdXNlZE9wdGlvbklkIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwic291cmNlICYmIHNvdXJjZS5sZW5ndGggPiAwID8gdGFiaW5kZXggOiAtMVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlTGlzdCdcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLWdyb3VwLXNlY3Rpb25dPVwiJ2xpc3QnXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJzb3VyY2VcIiBbbmdGb3JUcmFja0J5XT1cInNvdXJjZVRyYWNrQnkgfHwgdHJhY2tCeVwiIGxldC1pPVwiaW5kZXhcIiBsZXQtbD1cImxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZGtEcmFnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cImlkU291cmNlICsgJ18nICsgaVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiaXRlbUNsYXNzKGl0ZW0sIGlkU291cmNlICsgJ18nICsgaSwgc2VsZWN0ZWRJdGVtc1NvdXJjZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjZGtEcmFnRGF0YV09XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2RrRHJhZ0Rpc2FibGVkXT1cIiFkcmFnZHJvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSwgc2VsZWN0ZWRJdGVtc1NvdXJjZSwgU09VUkNFX0xJU1QsIG9uU291cmNlU2VsZWN0LCBpZFNvdXJjZSArICdfJyArIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uT3B0aW9uTW91c2VEb3duKGksIFNPVVJDRV9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRibGNsaWNrKT1cIm9uU291cmNlSXRlbURibENsaWNrKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b3VjaGVuZCk9XCJvbkl0ZW1Ub3VjaEVuZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzSXRlbVZpc2libGUoaXRlbSwgU09VUkNFX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2l0ZW0nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWQoaXRlbSwgc2VsZWN0ZWRJdGVtc1NvdXJjZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtLCBpbmRleDogaSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNFbXB0eShTT1VSQ0VfTElTVCkgJiYgKGVtcHR5TWVzc2FnZVNvdXJjZVRlbXBsYXRlIHx8IGVtcHR5RmlsdGVyTWVzc2FnZVNvdXJjZVRlbXBsYXRlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1waWNrbGlzdC1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCIhZmlsdGVyVmFsdWVTb3VyY2UgfHwgIWVtcHR5RmlsdGVyTWVzc2FnZVNvdXJjZVRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzb3VyY2VFbXB0eU1lc3NhZ2UnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVNvdXJjZVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1waWNrbGlzdC1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJmaWx0ZXJWYWx1ZVNvdXJjZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc291cmNlRW1wdHlNZXNzYWdlJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eUZpbHRlck1lc3NhZ2VTb3VyY2VUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtYnV0dG9ucyBwLXBpY2tsaXN0LXRyYW5zZmVyLWJ1dHRvbnNcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2J1dHRvbnMnXCIgW2F0dHIuZGF0YS1wYy1ncm91cC1zZWN0aW9uXT1cIidjb250cm9scydcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vdmVUb1RhcmdldEFyaWFMYWJlbFwiIHBCdXR0b24gcFJpcHBsZSBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiIFtkaXNhYmxlZF09XCJtb3ZlUmlnaHREaXNhYmxlZCgpXCIgKGNsaWNrKT1cIm1vdmVSaWdodCgpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlVG9UYXJnZXRCdXR0b24nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbW92ZVRvVGFyZ2V0SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVSaWdodEljb24gKm5nSWY9XCIhdmlld0NoYW5nZWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmV0b3RhcmdldGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZURvd25JY29uICpuZ0lmPVwidmlld0NoYW5nZWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmV0b3RhcmdldGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm1vdmVUb1RhcmdldEljb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHZpZXdDaGFuZ2VkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZUFsbFRvVGFyZ2V0QXJpYUxhYmVsXCIgcEJ1dHRvbiBwUmlwcGxlIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCIgW2Rpc2FibGVkXT1cIm1vdmVBbGxSaWdodERpc2FibGVkKClcIiAoY2xpY2spPVwibW92ZUFsbFJpZ2h0KClcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVBbGxUb1RhcmdldEJ1dHRvbidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtb3ZlQWxsVG9UYXJnZXRJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZVJpZ2h0SWNvbiAqbmdJZj1cIiF2aWV3Q2hhbmdlZFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWFsbHRvdGFyZ2V0aWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG91YmxlRG93bkljb24gKm5nSWY9XCJ2aWV3Q2hhbmdlZFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWFsbHRvdGFyZ2V0aWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZUFsbFRvVGFyZ2V0SWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogdmlld0NoYW5nZWQgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlVG9Tb3VyY2VBcmlhTGFiZWxcIiBwQnV0dG9uIHBSaXBwbGUgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIiBbZGlzYWJsZWRdPVwibW92ZUxlZnREaXNhYmxlZCgpXCIgKGNsaWNrKT1cIm1vdmVMZWZ0KClcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVUb1NvdXJjZUJ1dHRvbidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtb3ZlVG9Tb3VyY2VJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZUxlZnRJY29uICpuZ0lmPVwiIXZpZXdDaGFuZ2VkXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlZG93bnNvdXJjZXRpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVVcEljb24gKm5nSWY9XCJ2aWV3Q2hhbmdlZFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWRvd25zb3VyY2V0aWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZVRvU291cmNlSWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogdmlld0NoYW5nZWQgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlQWxsVG9Tb3VyY2VBcmlhTGFiZWxcIiBwQnV0dG9uIHBSaXBwbGUgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIiBbZGlzYWJsZWRdPVwibW92ZUFsbExlZnREaXNhYmxlZCgpXCIgKGNsaWNrKT1cIm1vdmVBbGxMZWZ0KClcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVBbGxUb1NvdXJjZUJ1dHRvbidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtb3ZlQWxsVG9Tb3VyY2VJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZUxlZnRJY29uICpuZ0lmPVwiIXZpZXdDaGFuZ2VkXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtb3ZlYWxsdG9zb3VyY2V0aWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG91YmxlVXBJY29uICpuZ0lmPVwidmlld0NoYW5nZWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVhbGx0b3NvdXJjZXRpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb3ZlQWxsVG9Tb3VyY2VJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiB2aWV3Q2hhbmdlZCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtbGlzdC13cmFwcGVyIHAtcGlja2xpc3QtdGFyZ2V0LXdyYXBwZXJcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldFdyYXBwZXInXCIgW2F0dHIuZGF0YS1wYy1ncm91cC1zZWN0aW9uXT1cIidsaXN0d3JhcHBlcidcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IFtpZF09XCJpZFRhcmdldCArICdfaGVhZGVyJ1wiIGNsYXNzPVwicC1waWNrbGlzdC1oZWFkZXJcIiAqbmdJZj1cInRhcmdldEhlYWRlciB8fCB0YXJnZXRIZWFkZXJUZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndGFyZ2V0SGVhZCdcIiBbYXR0ci5kYXRhLXBjLWdyb3VwLXNlY3Rpb25dPVwiJ2hlYWRlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtdGl0bGVcIiAqbmdJZj1cIiF0YXJnZXRIZWFkZXJUZW1wbGF0ZVwiPnt7IHRhcmdldEhlYWRlciB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFyZ2V0SGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXItY29udGFpbmVyXCIgKm5nSWY9XCJmaWx0ZXJCeSAmJiBzaG93VGFyZ2V0RmlsdGVyICE9PSBmYWxzZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndGFyZ2V0RmlsdGVyQ29udGFpbmVyJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidGFyZ2V0RmlsdGVyVGVtcGxhdGU7IGVsc2UgYnVpbHRJblRhcmdldEVsZW1lbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YXJnZXRGaWx0ZXJUZW1wbGF0ZTsgY29udGV4dDogeyBvcHRpb25zOiB0YXJnZXRGaWx0ZXJPcHRpb25zIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnVpbHRJblRhcmdldEVsZW1lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1waWNrbGlzdC1maWx0ZXJcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldEZpbHRlcidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI3RhcmdldEZpbHRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0ZXh0Ym94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleXVwKT1cIm9uRmlsdGVyKCRldmVudCwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBpY2tsaXN0LWZpbHRlci1pbnB1dCBwLWlucHV0dGV4dCBwLWNvbXBvbmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnBsYWNlaG9sZGVyXT1cInRhcmdldEZpbHRlclBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhVGFyZ2V0RmlsdGVyTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldEZpbHRlcklucHV0J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2VhcmNoSWNvbiAqbmdJZj1cIiF0YXJnZXRGaWx0ZXJJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1waWNrbGlzdC1maWx0ZXItaWNvbidcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RhcmdldGZpbHRlcmljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtcGlja2xpc3QtZmlsdGVyLWljb25cIiAqbmdJZj1cInRhcmdldEZpbHRlckljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndGFyZ2V0ZmlsdGVyaWNvbidcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFyZ2V0RmlsdGVySWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8dWxcbiAgICAgICAgICAgICAgICAgICAgI3RhcmdldGxpc3RcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBpY2tsaXN0LWxpc3QgcC1waWNrbGlzdC10YXJnZXRcIlxuICAgICAgICAgICAgICAgICAgICBbaWRdPVwiaWRUYXJnZXQgKyAnX2xpc3QnXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImlkVGFyZ2V0ICsgJ19oZWFkZXInXCJcbiAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JdGVtS2V5RG93bigkZXZlbnQsIHNlbGVjdGVkSXRlbXNUYXJnZXQsIG9uVGFyZ2V0U2VsZWN0LCBUQVJHRVRfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25MaXN0Rm9jdXMoJGV2ZW50LCBUQVJHRVRfTElTVClcIlxuICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvbkxpc3RCbHVyKCRldmVudCwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgY2RrRHJvcExpc3RcbiAgICAgICAgICAgICAgICAgICAgW2Nka0Ryb3BMaXN0RGF0YV09XCJ0YXJnZXRcIlxuICAgICAgICAgICAgICAgICAgICAoY2RrRHJvcExpc3REcm9wcGVkKT1cIm9uRHJvcCgkZXZlbnQsIFRBUkdFVF9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInRhcmdldFN0eWxlXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLW11bHRpc2VsZWN0YWJsZT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiZm9jdXNlZFsndGFyZ2V0TGlzdCddID8gZm9jdXNlZE9wdGlvbklkIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwidGFyZ2V0ICYmIHRhcmdldC5sZW5ndGggPiAwID8gdGFiaW5kZXggOiAtMVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndGFyZ2V0TGlzdCdcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLWdyb3VwLXNlY3Rpb25dPVwiJ2xpc3QnXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJ0YXJnZXRcIiBbbmdGb3JUcmFja0J5XT1cInRhcmdldFRyYWNrQnkgfHwgdHJhY2tCeVwiIGxldC1pPVwiaW5kZXhcIiBsZXQtbD1cImxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZGtEcmFnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lkXT1cImlkVGFyZ2V0ICsgJ18nICsgaVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiaXRlbUNsYXNzKGl0ZW0sIGlkVGFyZ2V0ICsgJ18nICsgaSwgc2VsZWN0ZWRJdGVtc1RhcmdldClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjZGtEcmFnRGF0YV09XCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2RrRHJhZ0Rpc2FibGVkXT1cIiFkcmFnZHJvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSwgc2VsZWN0ZWRJdGVtc1RhcmdldCwgVEFSR0VUX0xJU1QsIG9uVGFyZ2V0U2VsZWN0LCBpZFRhcmdldCArICdfJyArIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uT3B0aW9uTW91c2VEb3duKGksIFRBUkdFVF9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRibGNsaWNrKT1cIm9uVGFyZ2V0SXRlbURibENsaWNrKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b3VjaGVuZCk9XCJvbkl0ZW1Ub3VjaEVuZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImlzSXRlbVZpc2libGUoaXRlbSwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2l0ZW0nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWQoaXRlbSwgc2VsZWN0ZWRJdGVtc1RhcmdldClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtLCBpbmRleDogaSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNFbXB0eShUQVJHRVRfTElTVCkgJiYgKGVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlIHx8IGVtcHR5RmlsdGVyTWVzc2FnZVRhcmdldFRlbXBsYXRlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1waWNrbGlzdC1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCIhZmlsdGVyVmFsdWVUYXJnZXQgfHwgIWVtcHR5RmlsdGVyTWVzc2FnZVRhcmdldFRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRFbXB0eU1lc3NhZ2UnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicC1waWNrbGlzdC1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCJmaWx0ZXJWYWx1ZVRhcmdldFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndGFyZ2V0RW1wdHlNZXNzYWdlJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbXB0eUZpbHRlck1lc3NhZ2VUYXJnZXRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGlja2xpc3QtYnV0dG9ucyBwLXBpY2tsaXN0LXRhcmdldC1jb250cm9sc1wiICpuZ0lmPVwic2hvd1RhcmdldENvbnRyb2xzXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRDb250cm9scydcIiBbYXR0ci5kYXRhLXBjLWdyb3VwLXNlY3Rpb25dPVwiJ2NvbnRyb2xzJ1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibW92ZVVwQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInRhcmdldE1vdmVEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVVcCh0YXJnZXRsaXN0LCB0YXJnZXQsIHNlbGVjdGVkSXRlbXNUYXJnZXQsIG9uVGFyZ2V0UmVvcmRlciwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRNb3ZlVXBCdXR0b24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxBbmdsZVVwSWNvbiAqbmdJZj1cIiFtb3ZlVXBJY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmV1cGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZVVwSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm1vdmVUb3BBcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwidGFyZ2V0TW92ZURpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvcCh0YXJnZXRsaXN0LCB0YXJnZXQsIHNlbGVjdGVkSXRlbXNUYXJnZXQsIG9uVGFyZ2V0UmVvcmRlciwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRNb3ZlVG9wQnV0dG9uJ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3VibGVVcEljb24gKm5nSWY9XCIhbW92ZVRvcEljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZXRvcGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZVRvcEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlRG93bkFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLWljb24tb25seVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJ0YXJnZXRNb3ZlRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlRG93bih0YXJnZXRsaXN0LCB0YXJnZXQsIHNlbGVjdGVkSXRlbXNUYXJnZXQsIG9uVGFyZ2V0UmVvcmRlciwgVEFSR0VUX0xJU1QpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid0YXJnZXRNb3ZlRG93bkJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG93bkljb24gKm5nSWY9XCIhbW92ZURvd25JY29uVGVtcGxhdGVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21vdmVkb3duaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb3ZlRG93bkljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJtb3ZlQm90dG9tQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInRhcmdldE1vdmVEaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVCb3R0b20odGFyZ2V0bGlzdCwgdGFyZ2V0LCBzZWxlY3RlZEl0ZW1zVGFyZ2V0LCBvblRhcmdldFJlb3JkZXIsIFRBUkdFVF9MSVNUKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndGFyZ2V0TW92ZUJvdHRvbUJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG91YmxlRG93bkljb24gKm5nSWY9XCIhbW92ZUJvdHRvbUljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbW92ZWJvdHRvbWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibW92ZUJvdHRvbUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3BpY2tsaXN0LmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBQaWNrTGlzdCBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIEFmdGVyQ29udGVudEluaXQge1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgZm9yIHRoZSBzb3VyY2UgbGlzdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3VyY2U6IGFueVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgZm9yIHRoZSB0YXJnZXQgbGlzdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YXJnZXQ6IGFueVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRleHQgZm9yIHRoZSBzb3VyY2UgbGlzdCBjYXB0aW9uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc291cmNlSGVhZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGFiYmluZyBvcmRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSB0YWJpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkID0gMDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBtb3ZlIHRvIHJpZ2h0IGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByaWdodEJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gbGVmdCBidXR0b24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbGVmdEJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gYWxsIHJpZ2h0IGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhbGxSaWdodEJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gYWxsIGxlZnQgYnV0dG9uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFsbExlZnRCdXR0b25BcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBtb3ZlIHRvIHVwIGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB1cEJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gZG93biBidXR0b24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZG93bkJ1dHRvbkFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIG1vdmUgdG8gdG9wIGJ1dHRvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b3BCdXR0b25BcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSBtb3ZlIHRvIGJvdHRvbSBidXR0b24gZm9yIGFjY2Vzc2liaWxpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYm90dG9tQnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGV4dCBmb3IgdGhlIHRhcmdldCBsaXN0IGNhcHRpb25cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YXJnZXRIZWFkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQgb3JkZXJsaXN0IGFkanVzdHMgaXRzIGNvbnRyb2xzIGJhc2VkIG9uIHNjcmVlbiBzaXplLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZXNwb25zaXZlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gc3BlY2lmaWVkIGRpc3BsYXlzIGFuIGlucHV0IGZpZWxkIHRvIGZpbHRlciB0aGUgaXRlbXMgb24ga2V5dXAgYW5kIGRlY2lkZXMgd2hpY2ggZmllbGQgdG8gc2VhcmNoIChBY2NlcHRzIG11bHRpcGxlIGZpZWxkcyB3aXRoIGEgY29tbWEpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlckJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTG9jYWxlIHRvIHVzZSBpbiBmaWx0ZXJpbmcuIFRoZSBkZWZhdWx0IGxvY2FsZSBpcyB0aGUgaG9zdCBlbnZpcm9ubWVudCdzIGN1cnJlbnQgbG9jYWxlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlckxvY2FsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIG9wdGltaXplIHRoZSBkb20gb3BlcmF0aW9ucyBieSBkZWxlZ2F0aW5nIHRvIG5nRm9yVHJhY2tCeSwgZGVmYXVsdCBhbGdvcml0aG0gY2hlY2tzIGZvciBvYmplY3QgaWRlbnRpdHkuIFVzZSBzb3VyY2VUcmFja0J5IG9yIHRhcmdldFRyYWNrQnkgaW4gY2FzZSBkaWZmZXJlbnQgYWxnb3JpdGhtcyBhcmUgbmVlZGVkIHBlciBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBvcHRpbWl6ZSB0aGUgZG9tIG9wZXJhdGlvbnMgYnkgZGVsZWdhdGluZyB0byBuZ0ZvclRyYWNrQnkgaW4gc291cmNlIGxpc3QsIGRlZmF1bHQgYWxnb3JpdGhtIGNoZWNrcyBmb3Igb2JqZWN0IGlkZW50aXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvdXJjZVRyYWNrQnk6IEZ1bmN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIG9wdGltaXplIHRoZSBkb20gb3BlcmF0aW9ucyBieSBkZWxlZ2F0aW5nIHRvIG5nRm9yVHJhY2tCeSBpbiB0YXJnZXQgbGlzdCwgZGVmYXVsdCBhbGdvcml0aG0gY2hlY2tzIGZvciBvYmplY3QgaWRlbnRpdHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFyZ2V0VHJhY2tCeTogRnVuY3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IGZpbHRlciBpbnB1dCBmb3Igc291cmNlIGxpc3Qgd2hlbiBmaWx0ZXJCeSBpcyBlbmFibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93U291cmNlRmlsdGVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgZmlsdGVyIGlucHV0IGZvciB0YXJnZXQgbGlzdCB3aGVuIGZpbHRlckJ5IGlzIGVuYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNob3dUYXJnZXRGaWx0ZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaG93IG11bHRpcGxlIGl0ZW1zIGNhbiBiZSBzZWxlY3RlZCwgd2hlbiB0cnVlIG1ldGFLZXkgbmVlZHMgdG8gYmUgcHJlc3NlZCB0byBzZWxlY3Qgb3IgdW5zZWxlY3QgYW4gaXRlbSBhbmQgd2hlbiBzZXQgdG8gZmFsc2Ugc2VsZWN0aW9uIG9mIGVhY2ggaXRlbSBjYW4gYmUgdG9nZ2xlZCBpbmRpdmlkdWFsbHkuIE9uIHRvdWNoIGVuYWJsZWQgZGV2aWNlcywgbWV0YUtleVNlbGVjdGlvbiBpcyB0dXJuZWQgb2ZmIGF1dG9tYXRpY2FsbHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIG1ldGFLZXlTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGVuYWJsZSBkcmFnZHJvcCBiYXNlZCByZW9yZGVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBkcmFnZHJvcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgc291cmNlIGxpc3QgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3VyY2VTdHlsZTogYW55O1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgdGFyZ2V0IGxpc3QgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YXJnZXRTdHlsZTogYW55O1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBidXR0b25zIG9mIHNvdXJjZSBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93U291cmNlQ29udHJvbHM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBidXR0b25zIG9mIHRhcmdldCBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93VGFyZ2V0Q29udHJvbHM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRleHQgb24gc291cmNlIGZpbHRlciBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3VyY2VGaWx0ZXJQbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRleHQgb24gdGFyZ2V0IGZpbHRlciBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YXJnZXRGaWx0ZXJQbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgZmlsdGVyIGlucHV0IG9mIHNvdXJjZSBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFTb3VyY2VGaWx0ZXJMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIGZpbHRlciBpbnB1dCBvZiB0YXJnZXQgbGlzdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhVGFyZ2V0RmlsdGVyTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGhvdyB0aGUgaXRlbXMgYXJlIGZpbHRlcmVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlck1hdGNoTW9kZTogJ2NvbnRhaW5zJyB8ICdzdGFydHNXaXRoJyB8ICdlbmRzV2l0aCcgfCAnZXF1YWxzJyB8ICdub3RFcXVhbHMnIHwgJ2luJyB8ICdsdCcgfCAnbHRlJyB8ICdndCcgfCAnZ3RlJyA9ICdjb250YWlucyc7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5cyByb3dzIHdpdGggYWx0ZXJuYXRpbmcgY29sb3JzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzdHJpcGVkUm93czogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBLZWVwcyBzZWxlY3Rpb24gb24gdGhlIHRyYW5zZmVyIGxpc3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGtlZXBTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBzY3JlZW4gYXQgd2hpY2ggdGhlIGNvbXBvbmVudCBzaG91bGQgY2hhbmdlIGl0cyBiZWhhdmlvci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgYnJlYWtwb2ludCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnJlYWtwb2ludDtcbiAgICB9XG4gICAgc2V0IGJyZWFrcG9pbnQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2JyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2JyZWFrcG9pbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95TWVkaWEoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRNZWRpYSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGl0ZW1zIGFyZSBtb3ZlZCBmcm9tIHRhcmdldCB0byBzb3VyY2UuXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdE1vdmVUb1NvdXJjZUV2ZW50fSBldmVudCAtIEN1c3RvbSBtb3ZlIHRvIHNvdXJjZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Nb3ZlVG9Tb3VyY2U6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdE1vdmVUb1NvdXJjZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlVG9Tb3VyY2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbGwgaXRlbXMgYXJlIG1vdmVkIGZyb20gdGFyZ2V0IHRvIHNvdXJjZS5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0TW92ZUFsbFRvU291cmNlRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIG1vdmUgYWxsIHRvIHNvdXJjZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Nb3ZlQWxsVG9Tb3VyY2U6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdE1vdmVBbGxUb1NvdXJjZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlQWxsVG9Tb3VyY2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbGwgaXRlbXMgYXJlIG1vdmVkIGZyb20gc291cmNlIHRvIHRhcmdldC5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0TW92ZUFsbFRvVGFyZ2V0RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIG1vdmUgYWxsIHRvIHRhcmdldCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Nb3ZlQWxsVG9UYXJnZXQ6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdE1vdmVBbGxUb1RhcmdldEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlQWxsVG9UYXJnZXRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBpdGVtcyBhcmUgbW92ZWQgZnJvbSBzb3VyY2UgdG8gdGFyZ2V0LlxuICAgICAqIEBwYXJhbSB7UGlja0xpc3RNb3ZlVG9UYXJnZXRFdmVudH0gZXZlbnQgLSBDdXN0b20gbW92ZSB0byB0YXJnZXQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTW92ZVRvVGFyZ2V0OiBFdmVudEVtaXR0ZXI8UGlja0xpc3RNb3ZlVG9UYXJnZXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpY2tMaXN0TW92ZVRvVGFyZ2V0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHJlb3JkZXJlZCB3aXRoaW4gc291cmNlIGxpc3QuXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdFNvdXJjZVJlb3JkZXJFdmVudH0gZXZlbnQgLSBDdXN0b20gc291cmNlIHJlb3JkZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU291cmNlUmVvcmRlcjogRXZlbnRFbWl0dGVyPFBpY2tMaXN0U291cmNlUmVvcmRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RTb3VyY2VSZW9yZGVyRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHJlb3JkZXJlZCB3aXRoaW4gdGFyZ2V0IGxpc3QuXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdFRhcmdldFJlb3JkZXJFdmVudH0gZXZlbnQgLSBDdXN0b20gdGFyZ2V0IHJlb3JkZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uVGFyZ2V0UmVvcmRlcjogRXZlbnRFbWl0dGVyPFBpY2tMaXN0VGFyZ2V0UmVvcmRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RUYXJnZXRSZW9yZGVyRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHNlbGVjdGVkIHdpdGhpbiBzb3VyY2UgbGlzdC5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0U291cmNlU2VsZWN0RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHNvdXJjZSBzZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU291cmNlU2VsZWN0OiBFdmVudEVtaXR0ZXI8UGlja0xpc3RTb3VyY2VTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpY2tMaXN0U291cmNlU2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gaXRlbXMgYXJlIHNlbGVjdGVkIHdpdGhpbiB0YXJnZXQgbGlzdC5cbiAgICAgKiBAcGFyYW0ge1BpY2tMaXN0VGFyZ2V0U2VsZWN0RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHRhcmdldCBzZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uVGFyZ2V0U2VsZWN0OiBFdmVudEVtaXR0ZXI8UGlja0xpc3RUYXJnZXRTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBpY2tMaXN0VGFyZ2V0U2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIHNvdXJjZSBsaXN0IGlzIGZpbHRlcmVkXG4gICAgICogQHBhcmFtIHtQaWNrTGlzdFNvdXJjZUZpbHRlckV2ZW50fSBldmVudCAtIEN1c3RvbSBzb3VyY2UgZmlsdGVyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNvdXJjZUZpbHRlcjogRXZlbnRFbWl0dGVyPFBpY2tMaXN0U291cmNlRmlsdGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQaWNrTGlzdFNvdXJjZUZpbHRlckV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSB0YXJnZXQgbGlzdCBpcyBmaWx0ZXJlZFxuICAgICAqIEBwYXJhbSB7UGlja0xpc3RUYXJnZXRGaWx0ZXJFdmVudH0gZXZlbnQgLSBDdXN0b20gdGFyZ2V0IGZpbHRlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25UYXJnZXRGaWx0ZXI6IEV2ZW50RW1pdHRlcjxQaWNrTGlzdFRhcmdldEZpbHRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGlja0xpc3RUYXJnZXRGaWx0ZXJFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBsaXN0IGlzIGZvY3VzZWRcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIGxpc3QgaXMgYmx1cnJlZFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ3NvdXJjZWxpc3QnKSBsaXN0Vmlld1NvdXJjZUNoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RhcmdldGxpc3QnKSBsaXN0Vmlld1RhcmdldENoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3NvdXJjZUZpbHRlcicpIHNvdXJjZUZpbHRlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCd0YXJnZXRGaWx0ZXInKSB0YXJnZXRGaWx0ZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IE51bGxhYmxlPFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPj47XG5cbiAgICBnZXQgbW92ZVVwQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMudXBCdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlVXAgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IG1vdmVUb3BBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvcEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMudG9wQnV0dG9uQXJpYUxhYmVsIDogdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEubW92ZVRvcCA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbW92ZURvd25BcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvd25CdXR0b25BcmlhTGFiZWwgPyB0aGlzLmRvd25CdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlRG93biA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbW92ZUJvdHRvbUFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm90dG9tQnV0dG9uQXJpYUxhYmVsID8gdGhpcy5ib3R0b21CdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlQm90dG9tIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBtb3ZlVG9UYXJnZXRBcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJpZ2h0QnV0dG9uQXJpYUxhYmVsID8gdGhpcy5yaWdodEJ1dHRvbkFyaWFMYWJlbCA6IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLm1vdmVUb1RhcmdldCA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbW92ZUFsbFRvVGFyZ2V0QXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxSaWdodEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMuYWxsUmlnaHRCdXR0b25BcmlhTGFiZWwgOiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5tb3ZlQWxsVG9UYXJnZXQgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IG1vdmVUb1NvdXJjZUFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGVmdEJ1dHRvbkFyaWFMYWJlbCA/IHRoaXMubGVmdEJ1dHRvbkFyaWFMYWJlbCA6IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLm1vdmVUb1NvdXJjZSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbW92ZUFsbFRvU291cmNlQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxMZWZ0QnV0dG9uQXJpYUxhYmVsID8gdGhpcy5hbGxMZWZ0QnV0dG9uQXJpYUxhYmVsIDogdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEubW92ZUFsbFRvU291cmNlIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBpZFNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyAnX3NvdXJjZSc7XG4gICAgfVxuXG4gICAgZ2V0IGlkVGFyZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCArICdfdGFyZ2V0JztcbiAgICB9XG5cbiAgICBnZXQgZm9jdXNlZE9wdGlvbklkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXggIT09IC0xID8gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXggOiBudWxsO1xuICAgIH1cblxuICAgIF9icmVha3BvaW50OiBzdHJpbmcgPSAnOTYwcHgnO1xuXG4gICAgcHVibGljIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIG1vdmVUb3BJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbW92ZVVwSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1vdmVEb3duSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1vdmVCb3R0b21JY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbW92ZVRvVGFyZ2V0SWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1vdmVBbGxUb1RhcmdldEljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBtb3ZlVG9Tb3VyY2VJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbW92ZUFsbFRvU291cmNlSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHRhcmdldEZpbHRlckljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBzb3VyY2VGaWx0ZXJJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcHVibGljIHZpc2libGVPcHRpb25zU291cmNlOiBhbnlbXSB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBwdWJsaWMgdmlzaWJsZU9wdGlvbnNUYXJnZXQ6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHNlbGVjdGVkSXRlbXNTb3VyY2U6IGFueVtdID0gW107XG5cbiAgICBzZWxlY3RlZEl0ZW1zVGFyZ2V0OiBhbnlbXSA9IFtdO1xuXG4gICAgcmVvcmRlcmVkTGlzdEVsZW1lbnQ6IGFueTtcblxuICAgIG1vdmVkVXA6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgbW92ZWREb3duOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIGl0ZW1Ub3VjaGVkOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIHN0eWxlRWxlbWVudDogYW55O1xuXG4gICAgaWQ6IHN0cmluZyA9IFVuaXF1ZUNvbXBvbmVudElkKCk7XG5cbiAgICBmaWx0ZXJWYWx1ZVNvdXJjZTogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIGZpbHRlclZhbHVlVGFyZ2V0OiBOdWxsYWJsZTxzdHJpbmc+O1xuXG4gICAgZnJvbUxpc3RUeXBlOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgZW1wdHlNZXNzYWdlU291cmNlVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZW1wdHlGaWx0ZXJNZXNzYWdlU291cmNlVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZW1wdHlNZXNzYWdlVGFyZ2V0VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZW1wdHlGaWx0ZXJNZXNzYWdlVGFyZ2V0VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgc291cmNlSGVhZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgdGFyZ2V0SGVhZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgc291cmNlRmlsdGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgdGFyZ2V0RmlsdGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgc291cmNlRmlsdGVyT3B0aW9uczogTnVsbGFibGU8UGlja0xpc3RGaWx0ZXJPcHRpb25zPjtcblxuICAgIHRhcmdldEZpbHRlck9wdGlvbnM6IE51bGxhYmxlPFBpY2tMaXN0RmlsdGVyT3B0aW9ucz47XG5cbiAgICByZWFkb25seSBTT1VSQ0VfTElTVDogbnVtYmVyID0gLTE7XG5cbiAgICByZWFkb25seSBUQVJHRVRfTElTVDogbnVtYmVyID0gMTtcblxuICAgIHdpbmRvdzogV2luZG93O1xuXG4gICAgbWVkaWE6IE1lZGlhUXVlcnlMaXN0IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIHZpZXdDaGFuZ2VkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9jdXNlZE9wdGlvbkluZGV4OiBhbnkgPSAtMTtcblxuICAgIGZvY3VzZWRPcHRpb246IGFueSB8IHVuZGVmaW5lZDtcblxuICAgIGZvY3VzZWQ6IGFueSA9IHtcbiAgICAgICAgc291cmNlTGlzdDogZmFsc2UsXG4gICAgICAgIHRhcmdldExpc3Q6IGZhbHNlXG4gICAgfTtcblxuICAgIG1lZGlhQ2hhbmdlTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSxcbiAgICAgICAgcHVibGljIGNvbmZpZzogUHJpbWVOR0NvbmZpZ1xuICAgICkge1xuICAgICAgICB0aGlzLndpbmRvdyA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgYXMgV2luZG93O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5yZXNwb25zaXZlKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRNZWRpYSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyQnkpIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlRmlsdGVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXI6ICh2YWx1ZSkgPT4gdGhpcy5maWx0ZXJTb3VyY2UodmFsdWUpLFxuICAgICAgICAgICAgICAgIHJlc2V0OiAoKSA9PiB0aGlzLnJlc2V0U291cmNlRmlsdGVyKClcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RmlsdGVyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBmaWx0ZXI6ICh2YWx1ZSkgPT4gdGhpcy5maWx0ZXJUYXJnZXQodmFsdWUpLFxuICAgICAgICAgICAgICAgIHJlc2V0OiAoKSA9PiB0aGlzLnJlc2V0VGFyZ2V0RmlsdGVyKClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3NvdXJjZUhlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlSGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RhcmdldEhlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0SGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3NvdXJjZUZpbHRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlRmlsdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RhcmdldEZpbHRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0RmlsdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5bWVzc2FnZXNvdXJjZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlNZXNzYWdlU291cmNlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5ZmlsdGVybWVzc2FnZXNvdXJjZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlGaWx0ZXJNZXNzYWdlU291cmNlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5bWVzc2FnZXRhcmdldCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlNZXNzYWdlVGFyZ2V0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5ZmlsdGVybWVzc2FnZXRhcmdldCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlGaWx0ZXJNZXNzYWdlVGFyZ2V0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ21vdmV1cGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVVcEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbW92ZXRvcGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb3BJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ21vdmVkb3duaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZURvd25JY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ21vdmVib3R0b21pY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQm90dG9tSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtb3ZldG90YXJnZXRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9UYXJnZXRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ21vdmVhbGx0b3RhcmdldGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVBbGxUb1RhcmdldEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbW92ZXRvc291cmNlaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVRvU291cmNlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtb3ZlYWxsdG9zb3VyY2VpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlQWxsVG9Tb3VyY2VJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RhcmdldGZpbHRlcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldEZpbHRlckljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc291cmNlZmlsdGVyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlRmlsdGVySWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVkVXAgfHwgdGhpcy5tb3ZlZERvd24pIHtcbiAgICAgICAgICAgIGxldCBsaXN0SXRlbXMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5yZW9yZGVyZWRMaXN0RWxlbWVudCwgJ2xpLnAtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICBsZXQgbGlzdEl0ZW07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vdmVkVXApIGxpc3RJdGVtID0gbGlzdEl0ZW1zWzBdO1xuICAgICAgICAgICAgZWxzZSBsaXN0SXRlbSA9IGxpc3RJdGVtc1tsaXN0SXRlbXMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICAgIERvbUhhbmRsZXIuc2Nyb2xsSW5WaWV3KHRoaXMucmVvcmRlcmVkTGlzdEVsZW1lbnQsIGxpc3RJdGVtKTtcbiAgICAgICAgICAgIHRoaXMubW92ZWRVcCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tb3ZlZERvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucmVvcmRlcmVkTGlzdEVsZW1lbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtQ2xpY2soZXZlbnQ6IEV2ZW50IHwgYW55LCBpdGVtOiBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBsaXN0VHlwZTogbnVtYmVyLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4sIGl0ZW1JZD86IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maW5kSW5kZXhJbkxpc3QoaXRlbSwgc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgIGlmIChpdGVtSWQpIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4ID0gaXRlbUlkO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSBpbmRleCAhPSAtMTtcbiAgICAgICAgbGV0IG1ldGFTZWxlY3Rpb24gPSB0aGlzLml0ZW1Ub3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XG5cbiAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKDxLZXlib2FyZEV2ZW50PmV2ZW50KS5tZXRhS2V5IHx8ICg8S2V5Ym9hcmRFdmVudD5ldmVudCkuY3RybEtleSB8fCAoPEtleWJvYXJkRXZlbnQ+ZXZlbnQpLnNoaWZ0S2V5O1xuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbWV0YUtleSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSBzZWxlY3RlZEl0ZW1zLmZpbHRlcigoXywgaSkgPT4gaSAhPT0gaW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRJdGVtcy5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGluZGV4KTsgLy8gQ3JlYXRpbmcgYSBuZXcgYXJyYXkgd2l0aG91dCB0aGUgc2VsZWN0ZWQgaXRlbVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25MaXN0KGxpc3RUeXBlLCBzZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgY2FsbGJhY2suZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpdGVtczogc2VsZWN0ZWRJdGVtcyB9KTtcblxuICAgICAgICB0aGlzLml0ZW1Ub3VjaGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25PcHRpb25Nb3VzZURvd24oaW5kZXgsIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkW2xpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUID8gJ3NvdXJjZUxpc3QnIDogJ3RhcmdldExpc3QnXSA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgb25Tb3VyY2VJdGVtRGJsQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vdmVSaWdodCgpO1xuICAgIH1cblxuICAgIG9uVGFyZ2V0SXRlbURibENsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlTGVmdCgpO1xuICAgIH1cblxuICAgIG9uRmlsdGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBxdWVyeSA9ICg8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQpLnZhbHVlO1xuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHRoaXMuZmlsdGVyU291cmNlKHF1ZXJ5KTtcbiAgICAgICAgZWxzZSBpZiAobGlzdFR5cGUgPT09IHRoaXMuVEFSR0VUX0xJU1QpIHRoaXMuZmlsdGVyVGFyZ2V0KHF1ZXJ5KTtcbiAgICB9XG5cbiAgICBmaWx0ZXJTb3VyY2UodmFsdWU6IGFueSA9ICcnKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgPSB2YWx1ZS50cmltKCkudG9Mb2NhbGVMb3dlckNhc2UodGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICB0aGlzLmZpbHRlcig8YW55W10+dGhpcy5zb3VyY2UsIHRoaXMuU09VUkNFX0xJU1QpO1xuICAgIH1cblxuICAgIGZpbHRlclRhcmdldCh2YWx1ZTogYW55ID0gJycpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA9IHZhbHVlLnRyaW0oKS50b0xvY2FsZUxvd2VyQ2FzZSh0aGlzLmZpbHRlckxvY2FsZSk7XG4gICAgICAgIHRoaXMuZmlsdGVyKDxhbnlbXT50aGlzLnRhcmdldCwgdGhpcy5UQVJHRVRfTElTVCk7XG4gICAgfVxuXG4gICAgZmlsdGVyKGRhdGE6IGFueVtdLCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzZWFyY2hGaWVsZHMgPSAoPHN0cmluZz50aGlzLmZpbHRlckJ5KS5zcGxpdCgnLCcpO1xuXG4gICAgICAgIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkge1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSA9IHRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXIoZGF0YSwgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlU291cmNlLCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgICAgICAgICAgdGhpcy5vblNvdXJjZUZpbHRlci5lbWl0KHsgcXVlcnk6IHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UsIHZhbHVlOiB0aGlzLnZpc2libGVPcHRpb25zU291cmNlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGxpc3RUeXBlID09PSB0aGlzLlRBUkdFVF9MSVNUKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0ID0gdGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlcihkYXRhLCBzZWFyY2hGaWVsZHMsIHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQsIHRoaXMuZmlsdGVyTWF0Y2hNb2RlLCB0aGlzLmZpbHRlckxvY2FsZSk7XG4gICAgICAgICAgICB0aGlzLm9uVGFyZ2V0RmlsdGVyLmVtaXQoeyBxdWVyeTogdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCwgdmFsdWU6IHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0l0ZW1WaXNpYmxlKGl0ZW06IGFueSwgbGlzdFR5cGU6IG51bWJlcik6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAobGlzdFR5cGUgPT0gdGhpcy5TT1VSQ0VfTElTVCkgcmV0dXJuIHRoaXMuaXNWaXNpYmxlSW5MaXN0KDxhbnlbXT50aGlzLnZpc2libGVPcHRpb25zU291cmNlLCBpdGVtLCA8c3RyaW5nPnRoaXMuZmlsdGVyVmFsdWVTb3VyY2UpO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLmlzVmlzaWJsZUluTGlzdCg8YW55W10+dGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCwgaXRlbSwgPHN0cmluZz50aGlzLmZpbHRlclZhbHVlVGFyZ2V0KTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGxpc3RUeXBlID09IHRoaXMuU09VUkNFX0xJU1QpIHJldHVybiB0aGlzLmZpbHRlclZhbHVlU291cmNlID8gIXRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UgfHwgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZS5sZW5ndGggPT09IDAgOiAhdGhpcy5zb3VyY2UgfHwgdGhpcy5zb3VyY2UubGVuZ3RoID09PSAwO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLmZpbHRlclZhbHVlVGFyZ2V0ID8gIXRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQgfHwgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldC5sZW5ndGggPT09IDAgOiAhdGhpcy50YXJnZXQgfHwgdGhpcy50YXJnZXQubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIGlzVmlzaWJsZUluTGlzdChkYXRhOiBhbnlbXSwgaXRlbTogYW55LCBmaWx0ZXJWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmIChmaWx0ZXJWYWx1ZSAmJiBmaWx0ZXJWYWx1ZS50cmltKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PSBkYXRhW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtVG91Y2hFbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLml0ZW1Ub3VjaGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNvcnRCeUluZGV4SW5MaXN0KGl0ZW1zOiBhbnlbXSwgbGlzdDogYW55KSB7XG4gICAgICAgIHJldHVybiBpdGVtcy5zb3J0KChpdGVtMSwgaXRlbTIpID0+IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChpdGVtMSwgbGlzdCkgLSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoaXRlbTIsIGxpc3QpKTtcbiAgICB9XG5cbiAgICBtb3ZlVXAobGlzdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBsaXN0OiBhbnlbXSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtcyAmJiBzZWxlY3RlZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuc29ydEJ5SW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtcywgbGlzdCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXg6IG51bWJlciA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIGxpc3QpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IGxpc3Rbc2VsZWN0ZWRJdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IGxpc3Rbc2VsZWN0ZWRJdGVtSW5kZXggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleCAtIDFdID0gbW92ZWRJdGVtO1xuICAgICAgICAgICAgICAgICAgICBsaXN0W3NlbGVjdGVkSXRlbUluZGV4XSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnZHJvcCAmJiAoKHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgJiYgbGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHx8ICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0ICYmIGxpc3RUeXBlID09PSB0aGlzLlRBUkdFVF9MSVNUKSkpIHRoaXMuZmlsdGVyKGxpc3QsIGxpc3RUeXBlKTtcblxuICAgICAgICAgICAgdGhpcy5tb3ZlZFVwID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVvcmRlcmVkTGlzdEVsZW1lbnQgPSBsaXN0RWxlbWVudDtcbiAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoeyBpdGVtczogc2VsZWN0ZWRJdGVtcyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVUb3AobGlzdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBsaXN0OiBhbnlbXSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtcyAmJiBzZWxlY3RlZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuc29ydEJ5SW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtcywgbGlzdCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXg6IG51bWJlciA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIGxpc3QpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IGxpc3Quc3BsaWNlKHNlbGVjdGVkSXRlbUluZGV4LCAxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC51bnNoaWZ0KG1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnZHJvcCAmJiAoKHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgJiYgbGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHx8ICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0ICYmIGxpc3RUeXBlID09PSB0aGlzLlRBUkdFVF9MSVNUKSkpIHRoaXMuZmlsdGVyKGxpc3QsIGxpc3RUeXBlKTtcblxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoeyBpdGVtczogc2VsZWN0ZWRJdGVtcyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVEb3duKGxpc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgbGlzdDogYW55W10sIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHNlbGVjdGVkSXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXg6IG51bWJlciA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIGxpc3QpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleCArIDFdO1xuICAgICAgICAgICAgICAgICAgICBsaXN0W3NlbGVjdGVkSXRlbUluZGV4ICsgMV0gPSBtb3ZlZEl0ZW07XG4gICAgICAgICAgICAgICAgICAgIGxpc3Rbc2VsZWN0ZWRJdGVtSW5kZXhdID0gdGVtcDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdkcm9wICYmICgodGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSAmJiBsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkgfHwgKHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgJiYgbGlzdFR5cGUgPT09IHRoaXMuVEFSR0VUX0xJU1QpKSkgdGhpcy5maWx0ZXIobGlzdCwgbGlzdFR5cGUpO1xuXG4gICAgICAgICAgICB0aGlzLm1vdmVkRG93biA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50ID0gbGlzdEVsZW1lbnQ7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHsgaXRlbXM6IHNlbGVjdGVkSXRlbXMgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQm90dG9tKGxpc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgbGlzdDogYW55W10sIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHNlbGVjdGVkSXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXg6IG51bWJlciA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIGxpc3QpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdC5zcGxpY2Uoc2VsZWN0ZWRJdGVtSW5kZXgsIDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2gobW92ZWRJdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdkcm9wICYmICgodGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSAmJiBsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkgfHwgKHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgJiYgbGlzdFR5cGUgPT09IHRoaXMuVEFSR0VUX0xJU1QpKSkgdGhpcy5maWx0ZXIobGlzdCwgbGlzdFR5cGUpO1xuXG4gICAgICAgICAgICBsaXN0RWxlbWVudC5zY3JvbGxUb3AgPSBsaXN0RWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHsgaXRlbXM6IHNlbGVjdGVkSXRlbXMgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlUmlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UgJiYgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtc0NvcHkgPSBbLi4udGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRJdGVtc0NvcHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc0NvcHlbaV07XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMudGFyZ2V0KSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXhJblNvdXJjZSA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMuc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4SW5Tb3VyY2UgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldD8ucHVzaCh0aGlzLnNvdXJjZT8uc3BsaWNlKGluZGV4SW5Tb3VyY2UsIDEpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZT8uaW5jbHVkZXMoc2VsZWN0ZWRJdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZS5zcGxpY2UoT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSksIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uTW92ZVRvVGFyZ2V0LmVtaXQoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2VcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0ID0gWy4uLnRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCwgLi4udGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMudGFyZ2V0LCB0aGlzLlRBUkdFVF9MSVNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVBbGxSaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICAgICAgICBsZXQgbW92ZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmlzaWJsZSh0aGlzLnNvdXJjZVtpXSwgdGhpcy5TT1VSQ0VfTElTVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbW92ZWRJdGVtID0gdGhpcy5zb3VyY2Uuc3BsaWNlKGksIDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldD8ucHVzaChyZW1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVkSXRlbXMucHVzaChyZW1vdmVkSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Nb3ZlQWxsVG9UYXJnZXQuZW1pdCh7XG4gICAgICAgICAgICAgICAgaXRlbXM6IG1vdmVkSXRlbXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0ID0gWy4uLnRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCwgLi4udGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMudGFyZ2V0LCB0aGlzLlRBUkdFVF9MSVNUKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgJiYgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtc0NvcHkgPSBbLi4udGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0XTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRJdGVtc0NvcHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc0NvcHlbaV07XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMuc291cmNlKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXhJblRhcmdldCA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4SW5UYXJnZXQgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZT8ucHVzaCh0aGlzLnRhcmdldD8uc3BsaWNlKGluZGV4SW5UYXJnZXQsIDEpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldD8uaW5jbHVkZXMoc2VsZWN0ZWRJdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldC5zcGxpY2UoT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCksIDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uTW92ZVRvU291cmNlLmVtaXQoe1xuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlID0gWy4uLnRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSwgLi4udGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0ID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMuc291cmNlLCB0aGlzLlNPVVJDRV9MSVNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVBbGxMZWZ0KCkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW1zID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YXJnZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0l0ZW1WaXNpYmxlKHRoaXMudGFyZ2V0W2ldLCB0aGlzLlRBUkdFVF9MSVNUKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlZEl0ZW0gPSB0aGlzLnRhcmdldC5zcGxpY2UoaSwgMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlPy5wdXNoKHJlbW92ZWRJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgbW92ZWRJdGVtcy5wdXNoKHJlbW92ZWRJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbk1vdmVBbGxUb1NvdXJjZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBpdGVtczogbW92ZWRJdGVtc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmtlZXBTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UgPSBbLi4udGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlLCAuLi50aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgPSBbXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcig8YW55W10+dGhpcy5zb3VyY2UsIHRoaXMuU09VUkNFX0xJU1QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0ID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKGl0ZW06IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZEluZGV4SW5MaXN0KGl0ZW0sIHNlbGVjdGVkSXRlbXMpICE9IC0xO1xuICAgIH1cblxuICAgIGl0ZW1DbGFzcyhpdGVtLCBpZCwgc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtcGlja2xpc3QtaXRlbSc6IHRydWUsXG4gICAgICAgICAgICAncC1oaWdobGlnaHQnOiB0aGlzLmlzU2VsZWN0ZWQoaXRlbSwgc2VsZWN0ZWRJdGVtcyksXG4gICAgICAgICAgICAncC1mb2N1cyc6IGlkID09PSB0aGlzLmZvY3VzZWRPcHRpb25JZCxcbiAgICAgICAgICAgICdwLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZpbmRJbmRleEluTGlzdChpdGVtOiBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChpdGVtLCBzZWxlY3RlZEl0ZW1zKTtcbiAgICB9XG5cbiAgICBvbkRyb3AoZXZlbnQ6IENka0RyYWdEcm9wPHN0cmluZ1tdPiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBsZXQgaXNUcmFuc2ZlciA9IGV2ZW50LnByZXZpb3VzQ29udGFpbmVyICE9PSBldmVudC5jb250YWluZXI7XG4gICAgICAgIGxldCBkcm9wSW5kZXhlcyA9IHRoaXMuZ2V0RHJvcEluZGV4ZXMoZXZlbnQucHJldmlvdXNJbmRleCwgZXZlbnQuY3VycmVudEluZGV4LCBsaXN0VHlwZSwgaXNUcmFuc2ZlciwgZXZlbnQuaXRlbS5kYXRhKTtcblxuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgIGlmIChpc1RyYW5zZmVyKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmZXJBcnJheUl0ZW0oZXZlbnQucHJldmlvdXNDb250YWluZXIuZGF0YSwgZXZlbnQuY29udGFpbmVyLmRhdGEsIGRyb3BJbmRleGVzLnByZXZpb3VzSW5kZXgsIGRyb3BJbmRleGVzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4ID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KGV2ZW50Lml0ZW0uZGF0YSwgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQuc3BsaWNlKHNlbGVjdGVkSXRlbUluZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rZWVwU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQucHVzaChldmVudC5pdGVtLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQpIHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQuc3BsaWNlKGV2ZW50LnByZXZpb3VzSW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vdmVUb1NvdXJjZS5lbWl0KHsgaXRlbXM6IFtldmVudC5pdGVtLmRhdGFdIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb3ZlSXRlbUluQXJyYXkoZXZlbnQuY29udGFpbmVyLmRhdGEsIGRyb3BJbmRleGVzLnByZXZpb3VzSW5kZXgsIGRyb3BJbmRleGVzLmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNvdXJjZVJlb3JkZXIuZW1pdCh7IGl0ZW1zOiBbZXZlbnQuaXRlbS5kYXRhXSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcig8YW55W10+dGhpcy5zb3VyY2UsIHRoaXMuU09VUkNFX0xJU1QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlzVHJhbnNmZXIpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2ZlckFycmF5SXRlbShldmVudC5wcmV2aW91c0NvbnRhaW5lci5kYXRhLCBldmVudC5jb250YWluZXIuZGF0YSwgZHJvcEluZGV4ZXMucHJldmlvdXNJbmRleCwgZHJvcEluZGV4ZXMuY3VycmVudEluZGV4KTtcblxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleCA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChldmVudC5pdGVtLmRhdGEsIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlLnNwbGljZShzZWxlY3RlZEl0ZW1JbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMua2VlcFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0LnB1c2goZXZlbnQuaXRlbS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGVPcHRpb25zU291cmNlKSB0aGlzLnZpc2libGVPcHRpb25zU291cmNlLnNwbGljZShldmVudC5wcmV2aW91c0luZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25Nb3ZlVG9UYXJnZXQuZW1pdCh7IGl0ZW1zOiBbZXZlbnQuaXRlbS5kYXRhXSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbW92ZUl0ZW1JbkFycmF5KGV2ZW50LmNvbnRhaW5lci5kYXRhLCBkcm9wSW5kZXhlcy5wcmV2aW91c0luZGV4LCBkcm9wSW5kZXhlcy5jdXJyZW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25UYXJnZXRSZW9yZGVyLmVtaXQoeyBpdGVtczogW2V2ZW50Lml0ZW0uZGF0YV0gfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIoPGFueVtdPnRoaXMudGFyZ2V0LCB0aGlzLlRBUkdFVF9MSVNUKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTGlzdEZvY3VzKGV2ZW50LCBsaXN0VHlwZSkge1xuICAgICAgICBsZXQgbGlzdEVsZW1lbnQgPSB0aGlzLmdldExpc3RFbGVtZW50KGxpc3RUeXBlKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRGaXJzdEl0ZW0gPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUobGlzdEVsZW1lbnQsICdsaS5wLXBpY2tsaXN0LWl0ZW0ucC1oaWdobGlnaHQnKSB8fCBEb21IYW5kbGVyLmZpbmRTaW5nbGUobGlzdEVsZW1lbnQsICdsaS5wLXBpY2tsaXN0LWl0ZW0nKTtcbiAgICAgICAgY29uc3QgZmluZEluZGV4ID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkRmlyc3RJdGVtLCBsaXN0RWxlbWVudC5jaGlsZHJlbik7XG4gICAgICAgIHRoaXMuZm9jdXNlZFtsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCA/ICdzb3VyY2VMaXN0JyA6ICd0YXJnZXRMaXN0J10gPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZUluZGV4ID0gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXggIT09IC0xID8gdGhpcy5mb2N1c2VkT3B0aW9uSW5kZXggOiBzZWxlY3RlZEZpcnN0SXRlbSA/IGZpbmRJbmRleCA6IC0xO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZEluZGV4ID0gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLnZpc2libGVPcHRpb25zU291cmNlKSA/IHRoaXMuZmluZEluZGV4SW5MaXN0KHRoaXMuc291cmNlW3NvdXJjZUluZGV4XSwgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSkgOiBzb3VyY2VJbmRleDtcblxuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChmaWx0ZXJlZEluZGV4LCBsaXN0VHlwZSk7XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkxpc3RCbHVyKGV2ZW50LCBsaXN0VHlwZSkge1xuICAgICAgICB0aGlzLmZvY3VzZWRbbGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QgPyAnc291cmNlTGlzdCcgOiAndGFyZ2V0TGlzdCddID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuZm9jdXNlZE9wdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGdldExpc3RFbGVtZW50KGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUID8gdGhpcy5saXN0Vmlld1NvdXJjZUNoaWxkPy5uYXRpdmVFbGVtZW50IDogdGhpcy5saXN0Vmlld1RhcmdldENoaWxkPy5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGdldExpc3RJdGVtcyhsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBsaXN0RWxlbWV0ID0gdGhpcy5nZXRMaXN0RWxlbWVudChsaXN0VHlwZSk7XG5cbiAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuZmluZChsaXN0RWxlbWV0LCAnbGkucC1waWNrbGlzdC1pdGVtJyk7XG4gICAgfVxuXG4gICAgZ2V0TGF0ZXN0U2VsZWN0ZWRWaXNpYmxlT3B0aW9uSW5kZXgodmlzaWJsZUxpc3Q6IGFueVtdLCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGxhdGVzdFNlbGVjdGVkSXRlbSA9IFsuLi5zZWxlY3RlZEl0ZW1zXS5yZXZlcnNlKCkuZmluZCgoaXRlbSkgPT4gdmlzaWJsZUxpc3QuaW5jbHVkZXMoaXRlbSkpO1xuICAgICAgICByZXR1cm4gbGF0ZXN0U2VsZWN0ZWRJdGVtICE9PSB1bmRlZmluZWQgPyB2aXNpYmxlTGlzdC5pbmRleE9mKGxhdGVzdFNlbGVjdGVkSXRlbSkgOiAtMTtcbiAgICB9XG5cbiAgICBnZXRWaXNpYmxlTGlzdChsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UgJiYgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZS5sZW5ndGggPiAwID8gdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSA6IHRoaXMuc291cmNlICYmIHRoaXMuc291cmNlLmxlbmd0aCA+IDAgPyB0aGlzLnNvdXJjZSA6IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCAmJiB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0Lmxlbmd0aCA+IDAgPyB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0IDogdGhpcy50YXJnZXQgJiYgdGhpcy50YXJnZXQubGVuZ3RoID4gMCA/IHRoaXMudGFyZ2V0IDogbnVsbDtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3Rpb25MaXN0KGxpc3RUeXBlOiBudW1iZXIsIHNlbGVjdGVkSXRlbXM6IGFueVtdKSB7XG4gICAgICAgIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zU291cmNlID0gc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCA9IHNlbGVjdGVkSXRlbXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dE9wdGlvbkluZGV4KGluZGV4OiBudW1iZXIsIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldExpc3RJdGVtcyhsaXN0VHlwZSk7XG5cbiAgICAgICAgY29uc3QgbWF0Y2hlZE9wdGlvbkluZGV4ID0gWy4uLml0ZW1zXS5maW5kSW5kZXgoKGxpbmspID0+IGxpbmsuaWQgPT09IGluZGV4KTtcblxuICAgICAgICByZXR1cm4gbWF0Y2hlZE9wdGlvbkluZGV4ID4gLTEgPyBtYXRjaGVkT3B0aW9uSW5kZXggKyAxIDogMDtcbiAgICB9XG5cbiAgICBmaW5kUHJldk9wdGlvbkluZGV4KGluZGV4OiBudW1iZXIsIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLmdldExpc3RJdGVtcyhsaXN0VHlwZSk7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRPcHRpb25JbmRleCA9IFsuLi5pdGVtc10uZmluZEluZGV4KChsaW5rKSA9PiBsaW5rLmlkID09PSBpbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWRPcHRpb25JbmRleCA+IC0xID8gbWF0Y2hlZE9wdGlvbkluZGV4IC0gMSA6IDA7XG4gICAgfVxuXG4gICAgb25JdGVtS2V5RG93bihldmVudDogRXZlbnQgfCBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdLCBjYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4sIGxpc3RUeXBlOiBudW1iZXIpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd25LZXkoZXZlbnQsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrLCBsaXN0VHlwZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1VwS2V5KGV2ZW50LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaywgbGlzdFR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZUtleShldmVudCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2ssIGxpc3RUeXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW5kS2V5KGV2ZW50LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaywgbGlzdFR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyS2V5KGV2ZW50LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaywgbGlzdFR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblNwYWNlS2V5KGV2ZW50LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaywgbGlzdFR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdLZXlBJzpcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkxpc3QobGlzdFR5cGUsIHRoaXMuZ2V0VmlzaWJsZUxpc3QobGlzdFR5cGUpKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7IGl0ZW1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZvY3VzZWRPcHRpb24oaW5kZXg6IG51bWJlciwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpc2libGVPcHRpb25zU291cmNlICYmIHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UubGVuZ3RoID8gdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZVtpbmRleF0gOiB0aGlzLnNvdXJjZSAmJiB0aGlzLnNvdXJjZS5sZW5ndGggPyB0aGlzLnNvdXJjZVtpbmRleF0gOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQgJiYgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldC5sZW5ndGggPyB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0W2luZGV4XSA6IHRoaXMudGFyZ2V0ICYmIHRoaXMudGFyZ2V0Lmxlbmd0aCA/IHRoaXMudGFyZ2V0W2luZGV4XSA6IG51bGw7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KGluZGV4LCBsaXN0VHlwZSkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuZ2V0TGlzdEl0ZW1zKGxpc3RUeXBlKTtcbiAgICAgICAgaWYgKGl0ZW1zPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgb3JkZXIgPSBpbmRleCA+PSBpdGVtcy5sZW5ndGggPyBpdGVtcy5sZW5ndGggLSAxIDogaW5kZXggPCAwID8gMCA6IGluZGV4O1xuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb25JbmRleCA9IGl0ZW1zW29yZGVyXS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRPcHRpb24gPSB0aGlzLmdldEZvY3VzZWRPcHRpb24ob3JkZXIsIGxpc3RUeXBlKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KGl0ZW1zW29yZGVyXS5nZXRBdHRyaWJ1dGUoJ2lkJyksIGxpc3RUeXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjcm9sbEluVmlldyhpZCwgbGlzdFR5cGUpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmdldExpc3RFbGVtZW50KGxpc3RUeXBlKSwgYGxpW2lkPVwiJHtpZH1cIl1gKTtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyAmJiBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JywgaW5saW5lOiAnc3RhcnQnIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BcnJvd0Rvd25LZXkoZXZlbnQ6IEV2ZW50IHwgYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbkluZGV4ID0gdGhpcy5maW5kTmV4dE9wdGlvbkluZGV4KHRoaXMuZm9jdXNlZE9wdGlvbkluZGV4LCBsaXN0VHlwZSk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkT3B0aW9uSW5kZXgob3B0aW9uSW5kZXgsIGxpc3RUeXBlKTtcblxuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIHRoaXMub25FbnRlcktleShldmVudCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2ssIGxpc3RUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd1VwS2V5KGV2ZW50OiBFdmVudCB8IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuZmluZFByZXZPcHRpb25JbmRleCh0aGlzLmZvY3VzZWRPcHRpb25JbmRleCwgbGlzdFR5cGUpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KG9wdGlvbkluZGV4LCBsaXN0VHlwZSk7XG5cbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQsIHNlbGVjdGVkSXRlbXMsIGNhbGxiYWNrLCBsaXN0VHlwZSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW50ZXJLZXkoZXZlbnQ6IEV2ZW50IHwgYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25JdGVtQ2xpY2soZXZlbnQsIHRoaXMuZm9jdXNlZE9wdGlvbiwgc2VsZWN0ZWRJdGVtcywgbGlzdFR5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblNwYWNlS2V5KGV2ZW50OiBFdmVudCB8IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiwgbGlzdFR5cGU6IG51bWJlcikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSAmJiBzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHZpc2libGVMaXN0ID0gdGhpcy5nZXRWaXNpYmxlTGlzdChsaXN0VHlwZSk7XG4gICAgICAgICAgICBsZXQgbGFzdFNlbGVjdGVkSW5kZXggPSB0aGlzLmdldExhdGVzdFNlbGVjdGVkVmlzaWJsZU9wdGlvbkluZGV4KHZpc2libGVMaXN0LCBzZWxlY3RlZEl0ZW1zKTtcblxuICAgICAgICAgICAgaWYgKGxhc3RTZWxlY3RlZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c2VkSW5kZXggPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QodGhpcy5mb2N1c2VkT3B0aW9uLCB2aXNpYmxlTGlzdCk7XG5cbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gWy4uLnZpc2libGVMaXN0LnNsaWNlKE1hdGgubWluKGxhc3RTZWxlY3RlZEluZGV4LCBmb2N1c2VkSW5kZXgpLCBNYXRoLm1heChsYXN0U2VsZWN0ZWRJbmRleCwgZm9jdXNlZEluZGV4KSArIDEpXTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNlbGVjdGlvbkxpc3QobGlzdFR5cGUsIHNlbGVjdGVkSXRlbXMpO1xuXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7IGl0ZW1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25FbnRlcktleShldmVudCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2ssIGxpc3RUeXBlKTtcbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoZXZlbnQ6IEV2ZW50IHwgYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBsZXQgdmlzaWJsZUxpc3QgPSB0aGlzLmdldFZpc2libGVMaXN0KGxpc3RUeXBlKTtcbiAgICAgICAgICAgIGxldCBmb2N1c2VkSW5kZXggPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QodGhpcy5mb2N1c2VkT3B0aW9uLCB2aXNpYmxlTGlzdCk7XG5cbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSBbLi4udmlzaWJsZUxpc3Quc2xpY2UoMCwgZm9jdXNlZEluZGV4ICsgMSldO1xuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25MaXN0KGxpc3RUeXBlLCBzZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoeyBpdGVtczogc2VsZWN0ZWRJdGVtcyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZE9wdGlvbkluZGV4KDAsIGxpc3RUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25FbmRLZXkoZXZlbnQ6IEV2ZW50IHwgYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+LCBsaXN0VHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCB2aXNpYmxlTGlzdCA9IHRoaXMuZ2V0VmlzaWJsZUxpc3QobGlzdFR5cGUpO1xuICAgICAgICBsZXQgbGFzdEluZGV4ID0gdmlzaWJsZUxpc3QgJiYgdmlzaWJsZUxpc3QubGVuZ3RoID4gMCA/IHZpc2libGVMaXN0Lmxlbmd0aCAtIDEgOiBudWxsO1xuICAgICAgICBpZiAobGFzdEluZGV4ID09PSBudWxsKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGxldCBmb2N1c2VkSW5kZXggPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QodGhpcy5mb2N1c2VkT3B0aW9uLCB2aXNpYmxlTGlzdCk7XG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gWy4uLnZpc2libGVMaXN0LnNsaWNlKGZvY3VzZWRJbmRleCwgbGFzdEluZGV4KV07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0aW9uTGlzdChsaXN0VHlwZSwgc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHsgaXRlbXM6IHNlbGVjdGVkSXRlbXMgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRPcHRpb25JbmRleChsYXN0SW5kZXgsIGxpc3RUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZ2V0RHJvcEluZGV4ZXMoZnJvbUluZGV4OiBudW1iZXIsIHRvSW5kZXg6IG51bWJlciwgZHJvcHBlZExpc3Q6IG51bWJlciwgaXNUcmFuc2ZlcjogYm9vbGVhbiwgZGF0YTogYW55W10gfCBhbnkpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzSW5kZXgsIGN1cnJlbnRJbmRleDtcblxuICAgICAgICBpZiAoZHJvcHBlZExpc3QgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcbiAgICAgICAgICAgIHByZXZpb3VzSW5kZXggPSBpc1RyYW5zZmVyID8gKHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQgPyBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoZGF0YSwgdGhpcy50YXJnZXQpIDogZnJvbUluZGV4KSA6IHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgPyBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoZGF0YSwgdGhpcy5zb3VyY2UpIDogZnJvbUluZGV4O1xuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSA/IHRoaXMuZmluZEZpbHRlcmVkQ3VycmVudEluZGV4KDxhbnlbXT50aGlzLnZpc2libGVPcHRpb25zU291cmNlLCB0b0luZGV4LCB0aGlzLnNvdXJjZSkgOiB0b0luZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJldmlvdXNJbmRleCA9IGlzVHJhbnNmZXIgPyAodGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSA/IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChkYXRhLCB0aGlzLnNvdXJjZSkgOiBmcm9tSW5kZXgpIDogdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA/IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChkYXRhLCB0aGlzLnRhcmdldCkgOiBmcm9tSW5kZXg7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSB0aGlzLmZpbHRlclZhbHVlVGFyZ2V0ID8gdGhpcy5maW5kRmlsdGVyZWRDdXJyZW50SW5kZXgoPGFueVtdPnRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQsIHRvSW5kZXgsIHRoaXMudGFyZ2V0KSA6IHRvSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXggfTtcbiAgICB9XG5cbiAgICBmaW5kRmlsdGVyZWRDdXJyZW50SW5kZXgodmlzaWJsZU9wdGlvbnM6IGFueVtdLCBpbmRleDogbnVtYmVyLCBvcHRpb25zOiBhbnkpIHtcbiAgICAgICAgaWYgKHZpc2libGVPcHRpb25zLmxlbmd0aCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIGxldCB0b0luZGV4ID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHZpc2libGVPcHRpb25zW2luZGV4IC0gMV0sIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdG9JbmRleCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHZpc2libGVPcHRpb25zW2luZGV4XSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldFNvdXJjZUZpbHRlcigpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLnNvdXJjZUZpbHRlclZpZXdDaGlsZCAmJiAoKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuc291cmNlRmlsdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gJycpO1xuICAgIH1cblxuICAgIHJlc2V0VGFyZ2V0RmlsdGVyKCkge1xuICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA9IG51bGw7XG4gICAgICAgIHRoaXMudGFyZ2V0RmlsdGVyVmlld0NoaWxkICYmICgoPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy50YXJnZXRGaWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkudmFsdWUgPSAnJyk7XG4gICAgfVxuXG4gICAgcmVzZXRGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMucmVzZXRTb3VyY2VGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5yZXNldFRhcmdldEZpbHRlcigpO1xuICAgIH1cblxuICAgIGZpbmROZXh0SXRlbShpdGVtOiBhbnkpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBpdGVtLm5leHRFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAobmV4dEl0ZW0pIHJldHVybiAhRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0SXRlbSwgJ3AtcGlja2xpc3QtaXRlbScpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4obmV4dEl0ZW0pID8gdGhpcy5maW5kTmV4dEl0ZW0obmV4dEl0ZW0pIDogbmV4dEl0ZW07XG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZmluZFByZXZJdGVtKGl0ZW06IGFueSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBwcmV2SXRlbSA9IGl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAocHJldkl0ZW0pIHJldHVybiAhRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2SXRlbSwgJ3AtcGlja2xpc3QtaXRlbScpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4ocHJldkl0ZW0pID8gdGhpcy5maW5kUHJldkl0ZW0ocHJldkl0ZW0pIDogcHJldkl0ZW07XG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaW5pdE1lZGlhKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy5tZWRpYSA9IHRoaXMud2luZG93Lm1hdGNoTWVkaWEoYChtYXgtd2lkdGg6ICR7dGhpcy5icmVha3BvaW50fSlgKTtcbiAgICAgICAgICAgIHRoaXMudmlld0NoYW5nZWQgPSB0aGlzLm1lZGlhLm1hdGNoZXM7XG4gICAgICAgICAgICB0aGlzLmJpbmRNZWRpYUNoYW5nZUxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXN0cm95TWVkaWEoKSB7XG4gICAgICAgIHRoaXMudW5iaW5kTWVkaWFDaGFuZ2VMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIGJpbmRNZWRpYUNoYW5nZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5tZWRpYSAmJiAhdGhpcy5tZWRpYUNoYW5nZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1lZGlhQ2hhbmdlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLm1lZGlhLCAnY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q2hhbmdlZCA9IGV2ZW50Lm1hdGNoZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kTWVkaWFDaGFuZ2VMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMubWVkaWFDaGFuZ2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZWRpYUNoYW5nZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm1lZGlhQ2hhbmdlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlU3R5bGUoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCB0aGlzLmlkLCAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5zdHlsZUVsZW1lbnQsICd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5zZXRBdHRyaWJ1dGUodGhpcy5zdHlsZUVsZW1lbnQsICdub25jZScsIHRoaXMuY29uZmlnPy5jc3AoKT8ubm9uY2UpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCB0aGlzLnN0eWxlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7dGhpcy5icmVha3BvaW50fSkge1xuICAgICAgICAgICAgICAgICAgICAucC1waWNrbGlzdFske3RoaXMuaWR9XSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLnAtcGlja2xpc3RbJHt0aGlzLmlkfV0gLnAtcGlja2xpc3QtYnV0dG9ucyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiB2YXIoLS1jb250ZW50LXBhZGRpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC5wLXBpY2tsaXN0WyR7dGhpcy5pZH1dIC5wLXBpY2tsaXN0LWJ1dHRvbnMgLnAtYnV0dG9uIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogdmFyKC0taW5saW5lLXNwYWNpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC5wLXBpY2tsaXN0WyR7dGhpcy5pZH1dIC5wLXBpY2tsaXN0LWJ1dHRvbnMgLnAtYnV0dG9uOmxhc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWA7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc3R5bGVFbGVtZW50LCAnaW5uZXJIVE1MJywgaW5uZXJIVE1MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNvdXJjZU1vdmVEaXNhYmxlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGFyZ2V0TW92ZURpc2FibGVkKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlUmlnaHREaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgT2JqZWN0VXRpbHMuaXNFbXB0eSh0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UpO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0RGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8IE9iamVjdFV0aWxzLmlzRW1wdHkodGhpcy5zZWxlY3RlZEl0ZW1zVGFyZ2V0KTtcbiAgICB9XG5cbiAgICBtb3ZlQWxsUmlnaHREaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgT2JqZWN0VXRpbHMuaXNFbXB0eSh0aGlzLnNvdXJjZSk7XG4gICAgfVxuXG4gICAgbW92ZUFsbExlZnREaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgT2JqZWN0VXRpbHMuaXNFbXB0eSh0aGlzLnRhcmdldCk7XG4gICAgfVxuXG4gICAgZGVzdHJveVN0eWxlKCkge1xuICAgICAgICBpZiAodGhpcy5zdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCB0aGlzLnN0eWxlRWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnN0eWxlRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICBgYDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3lTdHlsZSgpO1xuICAgICAgICB0aGlzLmRlc3Ryb3lNZWRpYSgpO1xuICAgIH1cbn1cblxuY29uc3QgRHJhZ0NvbmZpZyA9IHtcbiAgICB6SW5kZXg6IDEyMDBcbn07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQnV0dG9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFJpcHBsZU1vZHVsZSwgRHJhZ0Ryb3BNb2R1bGUsIEFuZ2xlRG91YmxlRG93bkljb24sIEFuZ2xlRG91YmxlTGVmdEljb24sIEFuZ2xlRG91YmxlUmlnaHRJY29uLCBBbmdsZURvdWJsZVVwSWNvbiwgQW5nbGVEb3duSWNvbiwgQW5nbGVMZWZ0SWNvbiwgQW5nbGVSaWdodEljb24sIEFuZ2xlVXBJY29uLCBTZWFyY2hJY29uLCBIb21lSWNvbl0sXG4gICAgZXhwb3J0czogW1BpY2tMaXN0LCBTaGFyZWRNb2R1bGUsIERyYWdEcm9wTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQaWNrTGlzdF0sXG4gICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBDREtfRFJBR19DT05GSUcsIHVzZVZhbHVlOiBEcmFnQ29uZmlnIH1dXG59KVxuZXhwb3J0IGNsYXNzIFBpY2tMaXN0TW9kdWxlIHt9XG4iXX0=