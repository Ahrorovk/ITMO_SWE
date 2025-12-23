import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, ViewChild, ViewEncapsulation, booleanAttribute, computed, forwardRef, numberAttribute, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/tooltip";
export class PanelMenuSub {
    panelMenu;
    el;
    panelId;
    focusedItemId;
    items;
    itemTemplate;
    level = 0;
    activeItemPath;
    root;
    tabindex;
    transitionOptions;
    parentExpanded;
    itemToggle = new EventEmitter();
    menuFocus = new EventEmitter();
    menuBlur = new EventEmitter();
    menuKeyDown = new EventEmitter();
    listViewChild;
    animating;
    constructor(panelMenu, el) {
        this.panelMenu = panelMenu;
        this.el = el;
    }
    getItemId(processedItem) {
        return processedItem.item?.id ?? `${this.panelId}_${processedItem.key}`;
    }
    getItemKey(processedItem) {
        return this.getItemId(processedItem);
    }
    getItemClass(processedItem) {
        return {
            'p-menuitem': true,
            'p-disabled': this.isItemDisabled(processedItem)
        };
    }
    getItemProp(processedItem, name, params) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }
    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }
    isItemExpanded(processedItem) {
        return processedItem.expanded;
    }
    isItemActive(processedItem) {
        return this.isItemExpanded(processedItem) || this.activeItemPath.some((path) => path && path.key === processedItem.key);
    }
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }
    isItemFocused(processedItem) {
        return this.focusedItemId === this.getItemId(processedItem);
    }
    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }
    getAnimation(processedItem) {
        return this.isItemActive(processedItem) ? { value: 'visible', params: { transitionParams: this.transitionOptions, height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }
    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }
    getAriaPosInset(index) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }
    onItemClick(event, processedItem) {
        if (!this.isItemDisabled(processedItem)) {
            this.animating = true;
            this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
            this.itemToggle.emit({ processedItem, expanded: !this.isItemActive(processedItem) });
        }
    }
    onItemToggle(event) {
        this.itemToggle.emit(event);
    }
    onToggleDone() {
        this.animating = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PanelMenuSub, deps: [{ token: forwardRef(() => PanelMenu) }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: PanelMenuSub, selector: "p-panelMenuSub", inputs: { panelId: "panelId", focusedItemId: "focusedItemId", items: "items", itemTemplate: "itemTemplate", level: ["level", "level", numberAttribute], activeItemPath: "activeItemPath", root: ["root", "root", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute], transitionOptions: "transitionOptions", parentExpanded: ["parentExpanded", "parentExpanded", booleanAttribute] }, outputs: { itemToggle: "itemToggle", menuFocus: "menuFocus", menuBlur: "menuBlur", menuKeyDown: "menuKeyDown" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "listViewChild", first: true, predicate: ["list"], descendants: true }], ngImport: i0, template: `
        <ul
            #list
            [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-list': root }"
            role="tree"
            [tabindex]="-1"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="'menu'"
            [attr.aria-hidden]="!parentExpanded"
            (focusin)="menuFocus.emit($event)"
            (focusout)="menuBlur.emit($event)"
            (keydown)="menuKeyDown.emit($event)"
        >
            <ng-template ngFor let-processedItem let-index="index" [ngForOf]="items">
                <li *ngIf="processedItem.separator" class="p-menuitem-separator" role="separator"></li>
                <li
                    *ngIf="!processedItem.separator && isItemVisible(processedItem)"
                    [ngClass]="getItemClass(processedItem)"
                    role="treeitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.aria-label]="getItemProp(processedItem, 'label')"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    [class.p-hidden]="processedItem.visible === false"
                    [class.p-focus]="isItemFocused(processedItem) && !isItemDisabled(processedItem)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [pTooltip]="getItemProp(processedItem, 'tooltip')"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" (click)="onItemClick($event, processedItem)">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="processedItem.item?.escape !== false; else htmlLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="processedItem.badgeStyleClass">{{ processedItem.badge }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.title]="getItemProp(processedItem, 'title')"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon *ngIf="isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon *ngIf="!isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div class="p-toggleable-content" [@submenu]="getAnimation(processedItem)" (@submenu.done)="onToggleDone()">
                        <p-panelMenuSub
                            *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem) && (isItemExpanded(processedItem) || animating)"
                            [id]="getItemId(processedItem) + '_list'"
                            [panelId]="panelId"
                            [items]="processedItem?.items"
                            [itemTemplate]="itemTemplate"
                            [transitionOptions]="transitionOptions"
                            [focusedItemId]="focusedItemId"
                            [activeItemPath]="activeItemPath"
                            [level]="level + 1"
                            [parentExpanded]="!!parentExpanded && isItemExpanded(processedItem)"
                            (itemToggle)="onItemToggle($event)"
                        ></p-panelMenuSub>
                    </div>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLinkActive), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(() => i3.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => AngleDownIcon), selector: "AngleDownIcon" }, { kind: "component", type: i0.forwardRef(() => AngleRightIcon), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(() => PanelMenuSub), selector: "p-panelMenuSub", inputs: ["panelId", "focusedItemId", "items", "itemTemplate", "level", "activeItemPath", "root", "tabindex", "transitionOptions", "parentExpanded"], outputs: ["itemToggle", "menuFocus", "menuBlur", "menuKeyDown"] }], animations: [
            trigger('submenu', [
                state('hidden', style({
                    height: '0'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                transition('void => *', animate(0))
            ])
        ], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PanelMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-panelMenuSub',
                    template: `
        <ul
            #list
            [ngClass]="{ 'p-submenu-list': true, 'p-panelmenu-root-list': root }"
            role="tree"
            [tabindex]="-1"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="'menu'"
            [attr.aria-hidden]="!parentExpanded"
            (focusin)="menuFocus.emit($event)"
            (focusout)="menuBlur.emit($event)"
            (keydown)="menuKeyDown.emit($event)"
        >
            <ng-template ngFor let-processedItem let-index="index" [ngForOf]="items">
                <li *ngIf="processedItem.separator" class="p-menuitem-separator" role="separator"></li>
                <li
                    *ngIf="!processedItem.separator && isItemVisible(processedItem)"
                    [ngClass]="getItemClass(processedItem)"
                    role="treeitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.aria-label]="getItemProp(processedItem, 'label')"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    [class.p-hidden]="processedItem.visible === false"
                    [class.p-focus]="isItemFocused(processedItem) && !isItemDisabled(processedItem)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [pTooltip]="getItemProp(processedItem, 'tooltip')"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" (click)="onItemClick($event, processedItem)">
                        <ng-container *ngIf="!itemTemplate">
                            <a
                                *ngIf="!getItemProp(processedItem, 'routerLink')"
                                [attr.href]="getItemProp(processedItem, 'url')"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(processedItem)" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="processedItem.item?.escape !== false; else htmlLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="processedItem.badgeStyleClass">{{ processedItem.badge }}</span>
                            </a>
                            <a
                                *ngIf="getItemProp(processedItem, 'routerLink')"
                                [routerLink]="getItemProp(processedItem, 'routerLink')"
                                [queryParams]="getItemProp(processedItem, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                                class="p-menuitem-link"
                                [ngClass]="{ 'p-disabled': getItemProp(processedItem, 'disabled') }"
                                [target]="getItemProp(processedItem, 'target')"
                                [attr.title]="getItemProp(processedItem, 'title')"
                                [fragment]="getItemProp(processedItem, 'fragment')"
                                [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                [state]="getItemProp(processedItem, 'state')"
                                [attr.data-pc-section]="'action'"
                                [attr.tabindex]="!!parentExpanded ? '0' : '-1'"
                            >
                                <ng-container *ngIf="isItemGroup(processedItem)">
                                    <ng-container *ngIf="!panelMenu.submenuIconTemplate">
                                        <AngleDownIcon *ngIf="isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                        <AngleRightIcon *ngIf="!isItemActive(processedItem)" [styleClass]="'p-submenu-icon'" [ngStyle]="getItemProp(processedItem, 'iconStyle')" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="panelMenu.submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="processedItem.icon" *ngIf="processedItem.icon" [ngStyle]="getItemProp(processedItem, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(processedItem, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(processedItem, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="processedItem.badge" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                            </a>
                        </ng-container>
                        <ng-container *ngIf="itemTemplate">
                            <ng-template *ngTemplateOutlet="itemTemplate; context: { $implicit: processedItem.item }"></ng-template>
                        </ng-container>
                    </div>
                    <div class="p-toggleable-content" [@submenu]="getAnimation(processedItem)" (@submenu.done)="onToggleDone()">
                        <p-panelMenuSub
                            *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem) && (isItemExpanded(processedItem) || animating)"
                            [id]="getItemId(processedItem) + '_list'"
                            [panelId]="panelId"
                            [items]="processedItem?.items"
                            [itemTemplate]="itemTemplate"
                            [transitionOptions]="transitionOptions"
                            [focusedItemId]="focusedItemId"
                            [activeItemPath]="activeItemPath"
                            [level]="level + 1"
                            [parentExpanded]="!!parentExpanded && isItemExpanded(processedItem)"
                            (itemToggle)="onItemToggle($event)"
                        ></p-panelMenuSub>
                    </div>
                </li>
            </ng-template>
        </ul>
    `,
                    animations: [
                        trigger('submenu', [
                            state('hidden', style({
                                height: '0'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: PanelMenu, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => PanelMenu)]
                }] }, { type: i0.ElementRef }], propDecorators: { panelId: [{
                type: Input
            }], focusedItemId: [{
                type: Input
            }], items: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], level: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], activeItemPath: [{
                type: Input
            }], root: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], transitionOptions: [{
                type: Input
            }], parentExpanded: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], itemToggle: [{
                type: Output
            }], menuFocus: [{
                type: Output
            }], menuBlur: [{
                type: Output
            }], menuKeyDown: [{
                type: Output
            }], listViewChild: [{
                type: ViewChild,
                args: ['list']
            }] } });
export class PanelMenuList {
    el;
    panelId;
    id;
    items;
    itemTemplate;
    parentExpanded;
    expanded;
    transitionOptions;
    root;
    tabindex;
    activeItem;
    itemToggle = new EventEmitter();
    headerFocus = new EventEmitter();
    subMenuViewChild;
    searchTimeout;
    searchValue;
    focused;
    focusedItem = signal(null);
    activeItemPath = signal([]);
    processedItems = signal([]);
    visibleItems = computed(() => {
        const processedItems = this.processedItems();
        return this.flatItems(processedItems);
    });
    get focusedItemId() {
        const focusedItem = this.focusedItem();
        return focusedItem && focusedItem.item?.id ? focusedItem.item.id : ObjectUtils.isNotEmpty(this.focusedItem()) ? `${this.panelId}_${this.focusedItem().key}` : undefined;
    }
    constructor(el) {
        this.el = el;
    }
    ngOnChanges(changes) {
        const hasItems = !!changes?.items?.currentValue;
        if (hasItems) {
            this.processedItems.set(this.createProcessedItems(changes?.items?.currentValue || this.items || []));
            return;
        }
        // Update and keep `expanded` property from previous data
        else {
            this.processedItems.update((prev) => prev.map((i) => ({ ...i, expanded: i.expanded })));
        }
    }
    getItemProp(processedItem, name) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
    }
    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }
    isItemActive(processedItem) {
        return this.activeItemPath().some((path) => path.key === processedItem.parentKey);
    }
    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }
    isElementInPanel(event, element) {
        const panel = event.currentTarget.closest('[data-pc-section="panel"]');
        return panel && panel.contains(element);
    }
    isItemMatched(processedItem) {
        return this.isValidItem(processedItem) && this.getItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }
    isVisibleItem(processedItem) {
        return !!processedItem && (processedItem.level === 0 || this.isItemActive(processedItem)) && this.isItemVisible(processedItem);
    }
    isValidItem(processedItem) {
        return !!processedItem && !this.isItemDisabled(processedItem) && !processedItem.separator;
    }
    findFirstItem() {
        return this.visibleItems().find((processedItem) => this.isValidItem(processedItem));
    }
    findLastItem() {
        return ObjectUtils.findLast(this.visibleItems(), (processedItem) => this.isValidItem(processedItem));
    }
    findItemByEventTarget(target) {
        let parentNode = target;
        while (parentNode && parentNode.tagName?.toLowerCase() !== 'li') {
            parentNode = parentNode?.parentNode;
        }
        return parentNode?.id && this.visibleItems().find((processedItem) => this.isValidItem(processedItem) && `${this.panelId}_${processedItem.key}` === parentNode.id);
    }
    createProcessedItems(items, level = 0, parent = {}, parentKey = '') {
        const processedItems = [];
        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newItem = {
                    icon: item.icon,
                    expanded: item.expanded,
                    separator: item.separator,
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };
                newItem['items'] = this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }
    findProcessedItemByItemKey(key, processedItems, level = 0) {
        processedItems = processedItems || this.processedItems();
        if (processedItems && processedItems.length) {
            for (let i = 0; i < processedItems.length; i++) {
                const processedItem = processedItems[i];
                if (this.getItemProp(processedItem, 'key') === key)
                    return processedItem;
                const matchedItem = this.findProcessedItemByItemKey(key, processedItem.items, level + 1);
                if (matchedItem)
                    return matchedItem;
            }
        }
    }
    flatItems(processedItems, processedFlattenItems = []) {
        processedItems &&
            processedItems.forEach((processedItem) => {
                if (this.isVisibleItem(processedItem)) {
                    processedFlattenItems.push(processedItem);
                    this.flatItems(processedItem.items, processedFlattenItems);
                }
            });
        return processedFlattenItems;
    }
    changeFocusedItem(event) {
        const { originalEvent, processedItem, focusOnNext, selfCheck, allowHeaderFocus = true } = event;
        if (ObjectUtils.isNotEmpty(this.focusedItem()) && this.focusedItem().key !== processedItem.key) {
            this.focusedItem.set(processedItem);
            this.scrollInView();
        }
        else if (allowHeaderFocus) {
            this.headerFocus.emit({ originalEvent, focusOnNext, selfCheck });
        }
    }
    scrollInView() {
        const element = DomHandler.findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }
    onFocus(event) {
        if (!this.focused) {
            this.focused = true;
            const focusedItem = this.focusedItem() || (this.isElementInPanel(event, event.relatedTarget) ? this.findItemByEventTarget(event.target) || this.findFirstItem() : this.findLastItem());
            if (event.relatedTarget !== null)
                this.focusedItem.set(focusedItem);
        }
    }
    onBlur(event) {
        const target = event.relatedTarget;
        if (this.focused && !this.el.nativeElement.contains(target)) {
            this.focused = false;
            this.focusedItem.set(null);
            this.searchValue = '';
        }
    }
    onItemToggle(event) {
        const { processedItem, expanded } = event;
        processedItem.expanded = !processedItem.expanded;
        const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== processedItem.parentKey);
        expanded && activeItemPath.push(processedItem);
        this.activeItemPath.set(activeItemPath);
        this.processedItems.update((value) => value.map((i) => (i === processedItem ? processedItem : i)));
        this.focusedItem.set(processedItem);
    }
    onKeyDown(event) {
        const metaKey = event.metaKey || event.ctrlKey;
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
            case 'Space':
                this.onSpaceKey(event);
                break;
            case 'Enter':
                this.onEnterKey(event);
                break;
            case 'Escape':
            case 'Tab':
            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;
            default:
                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }
                break;
        }
    }
    onArrowDownKey(event) {
        const processedItem = ObjectUtils.isNotEmpty(this.focusedItem()) ? this.findNextItem(this.focusedItem()) : this.findFirstItem();
        this.changeFocusedItem({ originalEvent: event, processedItem, focusOnNext: true });
        event.preventDefault();
    }
    onArrowUpKey(event) {
        const processedItem = ObjectUtils.isNotEmpty(this.focusedItem()) ? this.findPrevItem(this.focusedItem()) : this.findLastItem();
        this.changeFocusedItem({ originalEvent: event, processedItem, selfCheck: true });
        event.preventDefault();
    }
    onArrowLeftKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);
            if (matched) {
                const activeItemPath = this.activeItemPath().filter((p) => p.key !== this.focusedItem().key);
                this.activeItemPath.set(activeItemPath);
            }
            else {
                const focusedItem = ObjectUtils.isNotEmpty(this.focusedItem().parent) ? this.focusedItem().parent : this.focusedItem();
                this.focusedItem.set(focusedItem);
            }
            event.preventDefault();
        }
    }
    onArrowRightKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const grouped = this.isItemGroup(this.focusedItem());
            if (grouped) {
                const matched = this.activeItemPath().some((p) => p.key === this.focusedItem().key);
                if (matched) {
                    this.onArrowDownKey(event);
                }
                else {
                    const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItem().parentKey);
                    activeItemPath.push(this.focusedItem());
                    this.activeItemPath.set(activeItemPath);
                }
            }
            event.preventDefault();
        }
    }
    onHomeKey(event) {
        this.changeFocusedItem({ originalEvent: event, processedItem: this.findFirstItem(), allowHeaderFocus: false });
        event.preventDefault();
    }
    onEndKey(event) {
        this.changeFocusedItem({ originalEvent: event, processedItem: this.findLastItem(), focusOnNext: true, allowHeaderFocus: false });
        event.preventDefault();
    }
    onEnterKey(event) {
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const element = DomHandler.findSingle(this.subMenuViewChild.listViewChild.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && (DomHandler.findSingle(element, '[data-pc-section="action"]') || DomHandler.findSingle(element, 'a,button'));
            anchorElement ? anchorElement.click() : element && element.click();
        }
        event.preventDefault();
    }
    onSpaceKey(event) {
        this.onEnterKey(event);
    }
    findNextItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index < this.visibleItems().length - 1
            ? this.visibleItems()
                .slice(index + 1)
                .find((pItem) => this.isValidItem(pItem))
            : undefined;
        return matchedItem || processedItem;
    }
    findPrevItem(processedItem) {
        const index = this.visibleItems().findIndex((item) => item.key === processedItem.key);
        const matchedItem = index > 0 ? ObjectUtils.findLast(this.visibleItems().slice(0, index), (pItem) => this.isValidItem(pItem)) : undefined;
        return matchedItem || processedItem;
    }
    searchItems(event, char) {
        this.searchValue = (this.searchValue || '') + char;
        let matchedItem = null;
        let matched = false;
        if (ObjectUtils.isNotEmpty(this.focusedItem())) {
            const focusedItemIndex = this.visibleItems().findIndex((processedItem) => processedItem.key === this.focusedItem().key);
            matchedItem = this.visibleItems()
                .slice(focusedItemIndex)
                .find((processedItem) => this.isItemMatched(processedItem));
            matchedItem = ObjectUtils.isEmpty(matchedItem)
                ? this.visibleItems()
                    .slice(0, focusedItemIndex)
                    .find((processedItem) => this.isItemMatched(processedItem))
                : matchedItem;
        }
        else {
            matchedItem = this.visibleItems().find((processedItem) => this.isItemMatched(processedItem));
        }
        if (ObjectUtils.isNotEmpty(matchedItem)) {
            matched = true;
        }
        if (ObjectUtils.isEmpty(matchedItem) && ObjectUtils.isEmpty(this.focusedItem())) {
            matchedItem = this.findFirstItem();
        }
        if (ObjectUtils.isNotEmpty(matchedItem)) {
            this.changeFocusedItem({
                originalEvent: event,
                processedItem: matchedItem,
                allowHeaderFocus: false
            });
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PanelMenuList, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: PanelMenuList, selector: "p-panelMenuList", inputs: { panelId: "panelId", id: "id", items: "items", itemTemplate: "itemTemplate", parentExpanded: ["parentExpanded", "parentExpanded", booleanAttribute], expanded: ["expanded", "expanded", booleanAttribute], transitionOptions: "transitionOptions", root: ["root", "root", booleanAttribute], tabindex: ["tabindex", "tabindex", numberAttribute], activeItem: "activeItem" }, outputs: { itemToggle: "itemToggle", headerFocus: "headerFocus" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "subMenuViewChild", first: true, predicate: ["submenu"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <p-panelMenuSub
            #submenu
            [root]="true"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [itemTemplate]="itemTemplate"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems()"
            [parentExpanded]="parentExpanded"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
        ></p-panelMenuSub>
    `, isInline: true, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"], dependencies: [{ kind: "component", type: PanelMenuSub, selector: "p-panelMenuSub", inputs: ["panelId", "focusedItemId", "items", "itemTemplate", "level", "activeItemPath", "root", "tabindex", "transitionOptions", "parentExpanded"], outputs: ["itemToggle", "menuFocus", "menuBlur", "menuKeyDown"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PanelMenuList, decorators: [{
            type: Component,
            args: [{ selector: 'p-panelMenuList', template: `
        <p-panelMenuSub
            #submenu
            [root]="true"
            [id]="panelId + '_list'"
            [panelId]="panelId"
            [tabindex]="tabindex"
            [itemTemplate]="itemTemplate"
            [focusedItemId]="focused ? focusedItemId : undefined"
            [activeItemPath]="activeItemPath()"
            [transitionOptions]="transitionOptions"
            [items]="processedItems()"
            [parentExpanded]="parentExpanded"
            (itemToggle)="onItemToggle($event)"
            (keydown)="onKeyDown($event)"
            (menuFocus)="onFocus($event)"
            (menuBlur)="onBlur($event)"
        ></p-panelMenuSub>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { panelId: [{
                type: Input
            }], id: [{
                type: Input
            }], items: [{
                type: Input
            }], itemTemplate: [{
                type: Input
            }], parentExpanded: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], expanded: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], transitionOptions: [{
                type: Input
            }], root: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], activeItem: [{
                type: Input
            }], itemToggle: [{
                type: Output
            }], headerFocus: [{
                type: Output
            }], subMenuViewChild: [{
                type: ViewChild,
                args: ['submenu']
            }] } });
/**
 * PanelMenu is a hybrid of Accordion and Tree components.
 * @group Components
 */
export class PanelMenu {
    cd;
    /**
     * An array of menuitems.
     * @group Props
     */
    model;
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
     * Whether multiple tabs can be activated at the same time or not.
     * @group Props
     */
    multiple = false;
    /**
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Current id state as a string.
     * @group Props
     */
    id;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    templates;
    containerViewChild;
    submenuIconTemplate;
    itemTemplate;
    animating;
    activeItem = signal(null);
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    constructor(cd) {
        this.cd = cd;
    }
    /**
     * Collapses open panels.
     * @group Method
     */
    collapseAll() {
        for (let item of this.model) {
            if (item.expanded) {
                item.expanded = false;
            }
        }
        this.cd.detectChanges();
    }
    onToggleDone() {
        this.animating = false;
        this.cd.markForCheck();
    }
    changeActiveItem(event, item, index, selfActive = false) {
        if (!this.isItemDisabled(item)) {
            const activeItem = selfActive ? item : this.activeItem && ObjectUtils.equals(item, this.activeItem) ? null : item;
            this.activeItem.set(activeItem);
        }
    }
    getAnimation(item) {
        return item.expanded ? { value: 'visible', params: { transitionParams: this.animating ? this.transitionOptions : '0ms', height: '*' } } : { value: 'hidden', params: { transitionParams: this.transitionOptions, height: '0' } };
    }
    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }
    getItemLabel(item) {
        return this.getItemProp(item, 'label');
    }
    isItemActive(item) {
        return item.expanded;
    }
    isItemVisible(item) {
        return this.getItemProp(item, 'visible') !== false;
    }
    isItemDisabled(item) {
        return this.getItemProp(item, 'disabled');
    }
    isItemGroup(item) {
        return ObjectUtils.isNotEmpty(item.items);
    }
    getPanelId(index, item) {
        return item && item.id ? item.id : `${this.id}_${index}`;
    }
    getHeaderId(item, index) {
        return item.id ? item.id + '_header' : `${this.getPanelId(index)}_header`;
    }
    getContentId(item, index) {
        return item.id ? item.id + '_content' : `${this.getPanelId(index)}_content`;
    }
    updateFocusedHeader(event) {
        const { originalEvent, focusOnNext, selfCheck } = event;
        const panelElement = originalEvent.currentTarget.closest('[data-pc-section="panel"]');
        const header = selfCheck ? DomHandler.findSingle(panelElement, '[data-pc-section="header"]') : focusOnNext ? this.findNextHeader(panelElement) : this.findPrevHeader(panelElement);
        header ? this.changeFocusedHeader(originalEvent, header) : focusOnNext ? this.onHeaderHomeKey(originalEvent) : this.onHeaderEndKey(originalEvent);
    }
    changeFocusedHeader(event, element) {
        element && DomHandler.focus(element);
    }
    findNextHeader(panelElement, selfCheck = false) {
        const nextPanelElement = selfCheck ? panelElement : panelElement.nextElementSibling;
        const headerElement = DomHandler.findSingle(nextPanelElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeader(headerElement.parentElement) : headerElement) : null;
    }
    findPrevHeader(panelElement, selfCheck = false) {
        const prevPanelElement = selfCheck ? panelElement : panelElement.previousElementSibling;
        const headerElement = DomHandler.findSingle(prevPanelElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeader(headerElement.parentElement) : headerElement) : null;
    }
    findFirstHeader() {
        return this.findNextHeader(this.containerViewChild.nativeElement.firstElementChild, true);
    }
    findLastHeader() {
        return this.findPrevHeader(this.containerViewChild.nativeElement.lastElementChild, true);
    }
    onHeaderClick(event, item, index) {
        if (this.isItemDisabled(item)) {
            event.preventDefault();
            return;
        }
        if (item.command) {
            item.command({ originalEvent: event, item });
        }
        if (!this.multiple) {
            for (let modelItem of this.model) {
                if (item !== modelItem && modelItem.expanded) {
                    modelItem.expanded = false;
                }
            }
        }
        item.expanded = !item.expanded;
        this.changeActiveItem(event, item, index);
        this.animating = true;
        DomHandler.focus(event.currentTarget);
    }
    onHeaderKeyDown(event, item, index) {
        switch (event.code) {
            case 'ArrowDown':
                this.onHeaderArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onHeaderArrowUpKey(event);
                break;
            case 'Home':
                this.onHeaderHomeKey(event);
                break;
            case 'End':
                this.onHeaderEndKey(event);
                break;
            case 'Enter':
            case 'Space':
                this.onHeaderEnterKey(event, item, index);
                break;
            default:
                break;
        }
    }
    onHeaderArrowDownKey(event) {
        const rootList = DomHandler.getAttribute(event.currentTarget, 'data-p-highlight') === true ? DomHandler.findSingle(event.currentTarget.nextElementSibling, '[data-pc-section="menu"]') : null;
        rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: true });
        event.preventDefault();
    }
    onHeaderArrowUpKey(event) {
        const prevHeader = this.findPrevHeader(event.currentTarget.parentElement) || this.findLastHeader();
        const rootList = DomHandler.getAttribute(prevHeader, 'data-p-highlight') === true ? DomHandler.findSingle(prevHeader.nextElementSibling, '[data-pc-section="menu"]') : null;
        rootList ? DomHandler.focus(rootList) : this.updateFocusedHeader({ originalEvent: event, focusOnNext: false });
        event.preventDefault();
    }
    onHeaderHomeKey(event) {
        this.changeFocusedHeader(event, this.findFirstHeader());
        event.preventDefault();
    }
    onHeaderEndKey(event) {
        this.changeFocusedHeader(event, this.findLastHeader());
        event.preventDefault();
    }
    onHeaderEnterKey(event, item, index) {
        const headerAction = DomHandler.findSingle(event.currentTarget, '[data-pc-section="headeraction"]');
        headerAction ? headerAction.click() : this.onHeaderClick(event, item, index);
        event.preventDefault();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PanelMenu, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: PanelMenu, selector: "p-panelMenu", inputs: { model: "model", style: "style", styleClass: "styleClass", multiple: ["multiple", "multiple", booleanAttribute], transitionOptions: "transitionOptions", id: "id", tabindex: ["tabindex", "tabindex", numberAttribute] }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'" #container>
            <ng-container *ngFor="let item of model; let f = first; let l = last; let i = index">
                <div *ngIf="isItemVisible(item)" class="p-panelmenu-panel" [ngClass]="getItemProp(item, 'headerClass')" [ngStyle]="getItemProp(item, 'style')" [attr.data-pc-section]="'panel'">
                    <div
                        [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': isItemActive(item), 'p-disabled': isItemDisabled(item) }"
                        [class]="getItemProp(item, 'styleClass')"
                        [ngStyle]="getItemProp(item, 'style')"
                        [pTooltip]="getItemProp(item, 'tooltip')"
                        [attr.id]="getHeaderId(item, i)"
                        [tabindex]="0"
                        role="button"
                        [tooltipOptions]="getItemProp(item, 'tooltipOptions')"
                        [attr.aria-expanded]="isItemActive(item)"
                        [attr.aria-label]="getItemProp(item, 'label')"
                        [attr.aria-controls]="getContentId(item, i)"
                        [attr.aria-disabled]="isItemDisabled(item)"
                        [attr.data-p-highlight]="isItemActive(item)"
                        [attr.data-p-disabled]="isItemDisabled(item)"
                        [attr.data-pc-section]="'header'"
                        (click)="onHeaderClick($event, item, i)"
                        (keydown)="onHeaderKeyDown($event, item, i)"
                    >
                        <div class="p-panelmenu-header-content">
                            <ng-container *ngIf="!itemTemplate">
                                <a
                                    *ngIf="!getItemProp(item, 'routerLink')"
                                    [attr.href]="getItemProp(item, 'url')"
                                    [attr.tabindex]="-1"
                                    [target]="getItemProp(item, 'target')"
                                    [attr.title]="getItemProp(item, 'title')"
                                    class="p-panelmenu-header-action"
                                    [attr.data-pc-section]="'headeraction'"
                                >
                                    <ng-container *ngIf="isItemGroup(item)">
                                        <ng-container *ngIf="!submenuIconTemplate">
                                            <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                            <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                        </ng-container>
                                        <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                    </ng-container>
                                    <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                    <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlLabel">{{ getItemProp(item, 'label') }}</span>
                                    <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                    <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                                </a>
                            </ng-container>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            <a
                                *ngIf="getItemProp(item, 'routerLink')"
                                [routerLink]="getItemProp(item, 'routerLink')"
                                [queryParams]="getItemProp(item, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(item, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(item, 'target')"
                                class="p-panelmenu-header-action"
                                [attr.tabindex]="-1"
                                [fragment]="getItemProp(item, 'fragment')"
                                [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(item, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(item, 'replaceUrl')"
                                [state]="getItemProp(item, 'state')"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                        </div>
                    </div>
                    <div
                        *ngIf="isItemGroup(item)"
                        class="p-toggleable-content"
                        [ngClass]="{ 'p-panelmenu-expanded': isItemActive(item) }"
                        [@rootItem]="getAnimation(item)"
                        (@rootItem.done)="onToggleDone()"
                        role="region"
                        [attr.id]="getContentId(item, i)"
                        [attr.aria-labelledby]="getHeaderId(item, i)"
                        [attr.data-pc-section]="'toggleablecontent'"
                    >
                        <div class="p-panelmenu-content" [attr.data-pc-section]="'menucontent'">
                            <p-panelMenuList
                                [panelId]="getPanelId(i, item)"
                                [items]="getItemProp(item, 'items')"
                                [itemTemplate]="itemTemplate"
                                [transitionOptions]="transitionOptions"
                                [root]="true"
                                [activeItem]="activeItem()"
                                [tabindex]="tabindex"
                                [parentExpanded]="isItemActive(item)"
                                (headerFocus)="updateFocusedHeader($event)"
                            ></p-panelMenuList>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLink), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(() => i2.RouterLinkActive), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(() => i3.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => PanelMenuList), selector: "p-panelMenuList", inputs: ["panelId", "id", "items", "itemTemplate", "parentExpanded", "expanded", "transitionOptions", "root", "tabindex", "activeItem"], outputs: ["itemToggle", "headerFocus"] }], animations: [
            trigger('rootItem', [
                state('hidden', style({
                    height: '0'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                transition('void => *', animate(0))
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PanelMenu, decorators: [{
            type: Component,
            args: [{ selector: 'p-panelMenu', template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'" #container>
            <ng-container *ngFor="let item of model; let f = first; let l = last; let i = index">
                <div *ngIf="isItemVisible(item)" class="p-panelmenu-panel" [ngClass]="getItemProp(item, 'headerClass')" [ngStyle]="getItemProp(item, 'style')" [attr.data-pc-section]="'panel'">
                    <div
                        [ngClass]="{ 'p-component p-panelmenu-header': true, 'p-highlight': isItemActive(item), 'p-disabled': isItemDisabled(item) }"
                        [class]="getItemProp(item, 'styleClass')"
                        [ngStyle]="getItemProp(item, 'style')"
                        [pTooltip]="getItemProp(item, 'tooltip')"
                        [attr.id]="getHeaderId(item, i)"
                        [tabindex]="0"
                        role="button"
                        [tooltipOptions]="getItemProp(item, 'tooltipOptions')"
                        [attr.aria-expanded]="isItemActive(item)"
                        [attr.aria-label]="getItemProp(item, 'label')"
                        [attr.aria-controls]="getContentId(item, i)"
                        [attr.aria-disabled]="isItemDisabled(item)"
                        [attr.data-p-highlight]="isItemActive(item)"
                        [attr.data-p-disabled]="isItemDisabled(item)"
                        [attr.data-pc-section]="'header'"
                        (click)="onHeaderClick($event, item, i)"
                        (keydown)="onHeaderKeyDown($event, item, i)"
                    >
                        <div class="p-panelmenu-header-content">
                            <ng-container *ngIf="!itemTemplate">
                                <a
                                    *ngIf="!getItemProp(item, 'routerLink')"
                                    [attr.href]="getItemProp(item, 'url')"
                                    [attr.tabindex]="-1"
                                    [target]="getItemProp(item, 'target')"
                                    [attr.title]="getItemProp(item, 'title')"
                                    class="p-panelmenu-header-action"
                                    [attr.data-pc-section]="'headeraction'"
                                >
                                    <ng-container *ngIf="isItemGroup(item)">
                                        <ng-container *ngIf="!submenuIconTemplate">
                                            <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                            <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                        </ng-container>
                                        <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                    </ng-container>
                                    <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                    <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlLabel">{{ getItemProp(item, 'label') }}</span>
                                    <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                    <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                                </a>
                            </ng-container>
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
                            <a
                                *ngIf="getItemProp(item, 'routerLink')"
                                [routerLink]="getItemProp(item, 'routerLink')"
                                [queryParams]="getItemProp(item, 'queryParams')"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="getItemProp(item, 'routerLinkActiveOptions') || { exact: false }"
                                [target]="getItemProp(item, 'target')"
                                class="p-panelmenu-header-action"
                                [attr.tabindex]="-1"
                                [fragment]="getItemProp(item, 'fragment')"
                                [queryParamsHandling]="getItemProp(item, 'queryParamsHandling')"
                                [preserveFragment]="getItemProp(item, 'preserveFragment')"
                                [skipLocationChange]="getItemProp(item, 'skipLocationChange')"
                                [replaceUrl]="getItemProp(item, 'replaceUrl')"
                                [state]="getItemProp(item, 'state')"
                                [attr.data-pc-section]="'headeraction'"
                            >
                                <ng-container *ngIf="isItemGroup(item)">
                                    <ng-container *ngIf="!submenuIconTemplate">
                                        <ChevronDownIcon [styleClass]="'p-submenu-icon'" *ngIf="isItemActive(item)" />
                                        <ChevronRightIcon [styleClass]="'p-submenu-icon'" *ngIf="!isItemActive(item)" />
                                    </ng-container>
                                    <ng-template *ngTemplateOutlet="submenuIconTemplate"></ng-template>
                                </ng-container>
                                <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="getItemProp(item, 'iconStyle')"></span>
                                <span class="p-menuitem-text" *ngIf="getItemProp(item, 'escape') !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                <span class="p-menuitem-badge" *ngIf="getItemProp(item, 'badge')" [ngClass]="getItemProp(item, 'badgeStyleClass')">{{ getItemProp(item, 'badge') }}</span>
                            </a>
                        </div>
                    </div>
                    <div
                        *ngIf="isItemGroup(item)"
                        class="p-toggleable-content"
                        [ngClass]="{ 'p-panelmenu-expanded': isItemActive(item) }"
                        [@rootItem]="getAnimation(item)"
                        (@rootItem.done)="onToggleDone()"
                        role="region"
                        [attr.id]="getContentId(item, i)"
                        [attr.aria-labelledby]="getHeaderId(item, i)"
                        [attr.data-pc-section]="'toggleablecontent'"
                    >
                        <div class="p-panelmenu-content" [attr.data-pc-section]="'menucontent'">
                            <p-panelMenuList
                                [panelId]="getPanelId(i, item)"
                                [items]="getItemProp(item, 'items')"
                                [itemTemplate]="itemTemplate"
                                [transitionOptions]="transitionOptions"
                                [root]="true"
                                [activeItem]="activeItem()"
                                [tabindex]="tabindex"
                                [parentExpanded]="isItemActive(item)"
                                (headerFocus)="updateFocusedHeader($event)"
                            ></p-panelMenuList>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `, animations: [
                        trigger('rootItem', [
                            state('hidden', style({
                                height: '0'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-panelmenu .p-panelmenu-header-action{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;position:relative;text-decoration:none}.p-panelmenu .p-panelmenu-header-action:focus{z-index:1}.p-panelmenu .p-submenu-list{margin:0;padding:0;list-style:none}.p-panelmenu .p-menuitem-link{display:flex;align-items:center;-webkit-user-select:none;user-select:none;cursor:pointer;text-decoration:none;position:relative;overflow:hidden;outline:none}.p-panelmenu .p-menuitem-text{line-height:1}.p-panelmenu-expanded.p-toggleable-content:not(.ng-animating),.p-panelmenu .p-submenu-expanded:not(.ng-animating){overflow:visible}.p-panelmenu .p-toggleable-content,.p-panelmenu .p-submenu-list{overflow:hidden}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], multiple: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], transitionOptions: [{
                type: Input
            }], id: [{
                type: Input
            }], tabindex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }] } });
export class PanelMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PanelMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: PanelMenuModule, declarations: [PanelMenu, PanelMenuSub, PanelMenuList], imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon], exports: [PanelMenu, RouterModule, TooltipModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PanelMenuModule, imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon, RouterModule, TooltipModule, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PanelMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, ChevronDownIcon, ChevronRightIcon],
                    exports: [PanelMenu, RouterModule, TooltipModule, SharedModule],
                    declarations: [PanelMenu, PanelMenuSub, PanelMenuList]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWxtZW51LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3BhbmVsbWVudS9wYW5lbG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVILHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFFUixNQUFNLEVBSU4sU0FBUyxFQUNULGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLFVBQVUsRUFDVixlQUFlLEVBQ2YsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQVksYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQTBJL0QsTUFBTSxPQUFPLFlBQVk7SUFrQzJCO0lBQ3JDO0lB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QUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3BJLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDL0QsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7aUJBQ3pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgY29tcHV0ZWQsXG4gICAgZm9yd2FyZFJlZixcbiAgICBudW1iZXJBdHRyaWJ1dGUsXG4gICAgc2lnbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1lbnVJdGVtLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgQW5nbGVEb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3duJztcbmltcG9ydCB7IEFuZ2xlUmlnaHRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZXJpZ2h0JztcbmltcG9ydCB7IENoZXZyb25Eb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbmRvd24nO1xuaW1wb3J0IHsgQ2hldnJvblJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbnJpZ2h0JztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnVTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bFxuICAgICAgICAgICAgI2xpc3RcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3Atc3VibWVudS1saXN0JzogdHJ1ZSwgJ3AtcGFuZWxtZW51LXJvb3QtbGlzdCc6IHJvb3QgfVwiXG4gICAgICAgICAgICByb2xlPVwidHJlZVwiXG4gICAgICAgICAgICBbdGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50XT1cImZvY3VzZWRJdGVtSWRcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtZW51J1wiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhcGFyZW50RXhwYW5kZWRcIlxuICAgICAgICAgICAgKGZvY3VzaW4pPVwibWVudUZvY3VzLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZm9jdXNvdXQpPVwibWVudUJsdXIuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm1lbnVLZXlEb3duLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcHJvY2Vzc2VkSXRlbSBsZXQtaW5kZXg9XCJpbmRleFwiIFtuZ0Zvck9mXT1cIml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwicHJvY2Vzc2VkSXRlbS5zZXBhcmF0b3JcIiBjbGFzcz1cInAtbWVudWl0ZW0tc2VwYXJhdG9yXCIgcm9sZT1cInNlcGFyYXRvclwiPjwvbGk+XG4gICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIXByb2Nlc3NlZEl0ZW0uc2VwYXJhdG9yICYmIGlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRJdGVtQ2xhc3MocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwidHJlZWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRJdGVtSWQocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdsYWJlbCcpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKSA/IGlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKSA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGV2ZWxdPVwibGV2ZWwgKyAxXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZXRzaXplXT1cImdldEFyaWFTZXRTaXplKClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXBvc2luc2V0XT1cImdldEFyaWFQb3NJbnNldChpbmRleClcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3N0eWxlQ2xhc3MnKVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5wLWhpZGRlbl09XCJwcm9jZXNzZWRJdGVtLnZpc2libGUgPT09IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLnAtZm9jdXNdPVwiaXNJdGVtRm9jdXNlZChwcm9jZXNzZWRJdGVtKSAmJiAhaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc3R5bGUnKVwiXG4gICAgICAgICAgICAgICAgICAgIFtwVG9vbHRpcF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndG9vbHRpcCcpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWRpc2FibGVkXT1cImlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBPcHRpb25zXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0b29sdGlwT3B0aW9ucycpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1lbnVpdGVtLWNvbnRlbnRcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBwcm9jZXNzZWRJdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncm91dGVyTGluaycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaHJlZl09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZGlzYWJsZWQnKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhcmdldF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAndGFyZ2V0JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2FjdGlvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCIhIXBhcmVudEV4cGFuZGVkID8gJzAnIDogJy0xJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcGFuZWxNZW51LnN1Ym1lbnVJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3duSWNvbiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgKm5nSWY9XCJpc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSlcIiBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvblN0eWxlJylcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZVJpZ2h0SWNvbiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgKm5nSWY9XCIhaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pXCIgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb25TdHlsZScpXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFuZWxNZW51LnN1Ym1lbnVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJwcm9jZXNzZWRJdGVtLmljb25cIiAqbmdJZj1cInByb2Nlc3NlZEl0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uU3R5bGUnKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cInByb2Nlc3NlZEl0ZW0uaXRlbT8uZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sTGFiZWxcIj57eyBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sTGFiZWw+PHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdsYWJlbCcpXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1iYWRnZVwiICpuZ0lmPVwicHJvY2Vzc2VkSXRlbS5iYWRnZVwiIFtuZ0NsYXNzXT1cInByb2Nlc3NlZEl0ZW0uYmFkZ2VTdHlsZUNsYXNzXCI+e3sgcHJvY2Vzc2VkSXRlbS5iYWRnZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncm91dGVyTGluaycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtxdWVyeVBhcmFtc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncXVlcnlQYXJhbXMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIidwLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncm91dGVyTGlua0FjdGl2ZU9wdGlvbnMnKSB8fCB7IGV4YWN0OiBmYWxzZSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWRpc2FibGVkJzogZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2Rpc2FibGVkJykgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3RhcmdldCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3RpdGxlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ZyYWdtZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncXVlcnlQYXJhbXNIYW5kbGluZycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ByZXNlcnZlRnJhZ21lbnRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3ByZXNlcnZlRnJhZ21lbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3NraXBMb2NhdGlvbkNoYW5nZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JlcGxhY2VVcmxdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JlcGxhY2VVcmwnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdGF0ZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc3RhdGUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInYWN0aW9uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIiEhcGFyZW50RXhwYW5kZWQgPyAnMCcgOiAnLTEnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFwYW5lbE1lbnUuc3VibWVudUljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZURvd25JY29uICpuZ0lmPVwiaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pXCIgW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uU3R5bGUnKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlUmlnaHRJY29uICpuZ0lmPVwiIWlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKVwiIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvblN0eWxlJylcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYW5lbE1lbnUuc3VibWVudUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cInByb2Nlc3NlZEl0ZW0uaWNvblwiICpuZ0lmPVwicHJvY2Vzc2VkSXRlbS5pY29uXCIgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb25TdHlsZScpXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2VzY2FwZScpICE9PSBmYWxzZTsgZWxzZSBodG1sUm91dGVMYWJlbFwiPnt7IGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdsYWJlbCcpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKVwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tYmFkZ2VcIiAqbmdJZj1cInByb2Nlc3NlZEl0ZW0uYmFkZ2VcIiBbbmdDbGFzc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYmFkZ2VTdHlsZUNsYXNzJylcIj57eyBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYmFkZ2UnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpdGVtVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBwcm9jZXNzZWRJdGVtLml0ZW0gfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRvZ2dsZWFibGUtY29udGVudFwiIFtAc3VibWVudV09XCJnZXRBbmltYXRpb24ocHJvY2Vzc2VkSXRlbSlcIiAoQHN1Ym1lbnUuZG9uZSk9XCJvblRvZ2dsZURvbmUoKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAtcGFuZWxNZW51U3ViXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmIGlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pICYmIChpc0l0ZW1FeHBhbmRlZChwcm9jZXNzZWRJdGVtKSB8fCBhbmltYXRpbmcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaWRdPVwiZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pICsgJ19saXN0J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BhbmVsSWRdPVwicGFuZWxJZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2l0ZW1zXT1cInByb2Nlc3NlZEl0ZW0/Lml0ZW1zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbVRlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RyYW5zaXRpb25PcHRpb25zXT1cInRyYW5zaXRpb25PcHRpb25zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9jdXNlZEl0ZW1JZF09XCJmb2N1c2VkSXRlbUlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYWN0aXZlSXRlbVBhdGhdPVwiYWN0aXZlSXRlbVBhdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwYXJlbnRFeHBhbmRlZF09XCIhIXBhcmVudEV4cGFuZGVkICYmIGlzSXRlbUV4cGFuZGVkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaXRlbVRvZ2dsZSk9XCJvbkl0ZW1Ub2dnbGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC9wLXBhbmVsTWVudVN1Yj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvdWw+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3N1Ym1lbnUnLCBbXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzAnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAndmlzaWJsZScsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA8PT4gaGlkZGVuJywgW2FuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JyldKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoMCkpXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbE1lbnVTdWIge1xuICAgIEBJbnB1dCgpIHBhbmVsSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGZvY3VzZWRJdGVtSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGl0ZW1zOiBhbnlbXTtcblxuICAgIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBsZXZlbDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIGFjdGl2ZUl0ZW1QYXRoOiBhbnlbXTtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByb290OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcGFyZW50RXhwYW5kZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBAT3V0cHV0KCkgaXRlbVRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBPdXRwdXQoKSBtZW51Rm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAT3V0cHV0KCkgbWVudUJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAT3V0cHV0KCkgbWVudUtleURvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdsaXN0JykgbGlzdFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIGFuaW1hdGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gUGFuZWxNZW51KSkgcHVibGljIHBhbmVsTWVudTogUGFuZWxNZW51LFxuICAgICAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWZcbiAgICApIHt9XG5cbiAgICBnZXRJdGVtSWQocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbS5pdGVtPy5pZCA/PyBgJHt0aGlzLnBhbmVsSWR9XyR7cHJvY2Vzc2VkSXRlbS5rZXl9YDtcbiAgICB9XG5cbiAgICBnZXRJdGVtS2V5KHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pO1xuICAgIH1cblxuICAgIGdldEl0ZW1DbGFzcyhwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1tZW51aXRlbSc6IHRydWUsXG4gICAgICAgICAgICAncC1kaXNhYmxlZCc6IHRoaXMuaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCBuYW1lPywgcGFyYW1zPykge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbSAmJiBwcm9jZXNzZWRJdGVtLml0ZW0gPyBPYmplY3RVdGlscy5nZXRJdGVtVmFsdWUocHJvY2Vzc2VkSXRlbS5pdGVtW25hbWVdLCBwYXJhbXMpIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdsYWJlbCcpO1xuICAgIH1cblxuICAgIGlzSXRlbUV4cGFuZGVkKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0uZXhwYW5kZWQ7XG4gICAgfVxuXG4gICAgaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJdGVtRXhwYW5kZWQocHJvY2Vzc2VkSXRlbSkgfHwgdGhpcy5hY3RpdmVJdGVtUGF0aC5zb21lKChwYXRoKSA9PiBwYXRoICYmIHBhdGgua2V5ID09PSBwcm9jZXNzZWRJdGVtLmtleSk7XG4gICAgfVxuXG4gICAgaXNJdGVtVmlzaWJsZShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd2aXNpYmxlJykgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIGlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgaXNJdGVtRm9jdXNlZChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvY3VzZWRJdGVtSWQgPT09IHRoaXMuZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW0pO1xuICAgIH1cblxuICAgIGlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkocHJvY2Vzc2VkSXRlbS5pdGVtcyk7XG4gICAgfVxuXG4gICAgZ2V0QW5pbWF0aW9uKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pID8geyB2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHsgdHJhbnNpdGlvblBhcmFtczogdGhpcy50cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnKicgfSB9IDogeyB2YWx1ZTogJ2hpZGRlbicsIHBhcmFtczogeyB0cmFuc2l0aW9uUGFyYW1zOiB0aGlzLnRyYW5zaXRpb25PcHRpb25zLCBoZWlnaHQ6ICcwJyB9IH07XG4gICAgfVxuXG4gICAgZ2V0QXJpYVNldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcigocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmICF0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzZXBhcmF0b3InKSkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldEFyaWFQb3NJbnNldChpbmRleCkge1xuICAgICAgICByZXR1cm4gaW5kZXggLSB0aGlzLml0ZW1zLnNsaWNlKDAsIGluZGV4KS5maWx0ZXIoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNJdGVtVmlzaWJsZShwcm9jZXNzZWRJdGVtKSAmJiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzZXBhcmF0b3InKSkubGVuZ3RoICsgMTtcbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudCwgcHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2NvbW1hbmQnLCB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpdGVtOiBwcm9jZXNzZWRJdGVtLml0ZW0gfSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1Ub2dnbGUuZW1pdCh7IHByb2Nlc3NlZEl0ZW0sIGV4cGFuZGVkOiAhdGhpcy5pc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSkgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1Ub2dnbGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5pdGVtVG9nZ2xlLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uVG9nZ2xlRG9uZSgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnVMaXN0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8cC1wYW5lbE1lbnVTdWJcbiAgICAgICAgICAgICNzdWJtZW51XG4gICAgICAgICAgICBbcm9vdF09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtpZF09XCJwYW5lbElkICsgJ19saXN0J1wiXG4gICAgICAgICAgICBbcGFuZWxJZF09XCJwYW5lbElkXCJcbiAgICAgICAgICAgIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICBbaXRlbVRlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiXG4gICAgICAgICAgICBbZm9jdXNlZEl0ZW1JZF09XCJmb2N1c2VkID8gZm9jdXNlZEl0ZW1JZCA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICBbYWN0aXZlSXRlbVBhdGhdPVwiYWN0aXZlSXRlbVBhdGgoKVwiXG4gICAgICAgICAgICBbdHJhbnNpdGlvbk9wdGlvbnNdPVwidHJhbnNpdGlvbk9wdGlvbnNcIlxuICAgICAgICAgICAgW2l0ZW1zXT1cInByb2Nlc3NlZEl0ZW1zKClcIlxuICAgICAgICAgICAgW3BhcmVudEV4cGFuZGVkXT1cInBhcmVudEV4cGFuZGVkXCJcbiAgICAgICAgICAgIChpdGVtVG9nZ2xlKT1cIm9uSXRlbVRvZ2dsZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgIChtZW51Rm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgIChtZW51Qmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXG4gICAgICAgID48L3AtcGFuZWxNZW51U3ViPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wYW5lbG1lbnUuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsTWVudUxpc3QgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHBhbmVsSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBpdGVtczogYW55W107XG5cbiAgICBASW5wdXQoKSBpdGVtVGVtcGxhdGU6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHBhcmVudEV4cGFuZGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGV4cGFuZGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByb290OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgdGFiaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFjdGl2ZUl0ZW06IGFueTtcblxuICAgIEBPdXRwdXQoKSBpdGVtVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgpIGhlYWRlckZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnc3VibWVudScpIHN1Yk1lbnVWaWV3Q2hpbGQ6IFBhbmVsTWVudVN1YjtcblxuICAgIHNlYXJjaFRpbWVvdXQ6IGFueTtcblxuICAgIHNlYXJjaFZhbHVlOiBhbnk7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9jdXNlZEl0ZW0gPSBzaWduYWw8YW55PihudWxsKTtcblxuICAgIGFjdGl2ZUl0ZW1QYXRoID0gc2lnbmFsPGFueVtdPihbXSk7XG5cbiAgICBwcm9jZXNzZWRJdGVtcyA9IHNpZ25hbDxhbnlbXT4oW10pO1xuXG4gICAgdmlzaWJsZUl0ZW1zID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtcyA9IHRoaXMucHJvY2Vzc2VkSXRlbXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmxhdEl0ZW1zKHByb2Nlc3NlZEl0ZW1zKTtcbiAgICB9KTtcblxuICAgIGdldCBmb2N1c2VkSXRlbUlkKCkge1xuICAgICAgICBjb25zdCBmb2N1c2VkSXRlbSA9IHRoaXMuZm9jdXNlZEl0ZW0oKTtcbiAgICAgICAgcmV0dXJuIGZvY3VzZWRJdGVtICYmIGZvY3VzZWRJdGVtLml0ZW0/LmlkID8gZm9jdXNlZEl0ZW0uaXRlbS5pZCA6IE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSA/IGAke3RoaXMucGFuZWxJZH1fJHt0aGlzLmZvY3VzZWRJdGVtKCkua2V5fWAgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgY29uc3QgaGFzSXRlbXMgPSAhIWNoYW5nZXM/Lml0ZW1zPy5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgaWYgKGhhc0l0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NlZEl0ZW1zLnNldCh0aGlzLmNyZWF0ZVByb2Nlc3NlZEl0ZW1zKGNoYW5nZXM/Lml0ZW1zPy5jdXJyZW50VmFsdWUgfHwgdGhpcy5pdGVtcyB8fCBbXSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIGFuZCBrZWVwIGBleHBhbmRlZGAgcHJvcGVydHkgZnJvbSBwcmV2aW91cyBkYXRhXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWRJdGVtcy51cGRhdGUoKHByZXYpID0+IHByZXYubWFwKChpKSA9PiAoeyAuLi5pLCBleHBhbmRlZDogaS5leHBhbmRlZCB9KSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbSAmJiBwcm9jZXNzZWRJdGVtLml0ZW0gPyBPYmplY3RVdGlscy5nZXRJdGVtVmFsdWUocHJvY2Vzc2VkSXRlbS5pdGVtW25hbWVdKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnbGFiZWwnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3Zpc2libGUnKSAhPT0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVJdGVtUGF0aCgpLnNvbWUoKHBhdGgpID0+IHBhdGgua2V5ID09PSBwcm9jZXNzZWRJdGVtLnBhcmVudEtleSk7XG4gICAgfVxuXG4gICAgaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShwcm9jZXNzZWRJdGVtLml0ZW1zKTtcbiAgICB9XG5cbiAgICBpc0VsZW1lbnRJblBhbmVsKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHBhbmVsID0gZXZlbnQuY3VycmVudFRhcmdldC5jbG9zZXN0KCdbZGF0YS1wYy1zZWN0aW9uPVwicGFuZWxcIl0nKTtcblxuICAgICAgICByZXR1cm4gcGFuZWwgJiYgcGFuZWwuY29udGFpbnMoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pICYmIHRoaXMuZ2V0SXRlbUxhYmVsKHByb2Nlc3NlZEl0ZW0pLnRvTG9jYWxlTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0aGlzLnNlYXJjaFZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIGlzVmlzaWJsZUl0ZW0ocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gISFwcm9jZXNzZWRJdGVtICYmIChwcm9jZXNzZWRJdGVtLmxldmVsID09PSAwIHx8IHRoaXMuaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pKSAmJiB0aGlzLmlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbSk7XG4gICAgfVxuXG4gICAgaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkge1xuICAgICAgICByZXR1cm4gISFwcm9jZXNzZWRJdGVtICYmICF0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pICYmICFwcm9jZXNzZWRJdGVtLnNlcGFyYXRvcjtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RJdGVtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlSXRlbXMoKS5maW5kKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pKTtcbiAgICB9XG5cbiAgICBmaW5kTGFzdEl0ZW0oKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5maW5kTGFzdCh0aGlzLnZpc2libGVJdGVtcygpLCAocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSk7XG4gICAgfVxuXG4gICAgZmluZEl0ZW1CeUV2ZW50VGFyZ2V0KHRhcmdldDogRXZlbnRUYXJnZXQpOiB1bmRlZmluZWQgfCBhbnkge1xuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRhcmdldCBhcyBQYXJlbnROb2RlICYgRWxlbWVudDtcblxuICAgICAgICB3aGlsZSAocGFyZW50Tm9kZSAmJiBwYXJlbnROb2RlLnRhZ05hbWU/LnRvTG93ZXJDYXNlKCkgIT09ICdsaScpIHtcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlPy5wYXJlbnROb2RlIGFzIEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyZW50Tm9kZT8uaWQgJiYgdGhpcy52aXNpYmxlSXRlbXMoKS5maW5kKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pICYmIGAke3RoaXMucGFuZWxJZH1fJHtwcm9jZXNzZWRJdGVtLmtleX1gID09PSBwYXJlbnROb2RlLmlkKTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9jZXNzZWRJdGVtcyhpdGVtcywgbGV2ZWwgPSAwLCBwYXJlbnQgPSB7fSwgcGFyZW50S2V5ID0gJycpIHtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbXMgPSBbXTtcbiAgICAgICAgaXRlbXMgJiZcbiAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gKHBhcmVudEtleSAhPT0gJycgPyBwYXJlbnRLZXkgKyAnXycgOiAnJykgKyBpbmRleDtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICBpY29uOiBpdGVtLmljb24sXG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkOiBpdGVtLmV4cGFuZGVkLFxuICAgICAgICAgICAgICAgICAgICBzZXBhcmF0b3I6IGl0ZW0uc2VwYXJhdG9yLFxuICAgICAgICAgICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRLZXlcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbmV3SXRlbVsnaXRlbXMnXSA9IHRoaXMuY3JlYXRlUHJvY2Vzc2VkSXRlbXMoaXRlbS5pdGVtcywgbGV2ZWwgKyAxLCBuZXdJdGVtLCBrZXkpO1xuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEl0ZW1zLnB1c2gobmV3SXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW1zO1xuICAgIH1cblxuICAgIGZpbmRQcm9jZXNzZWRJdGVtQnlJdGVtS2V5KGtleSwgcHJvY2Vzc2VkSXRlbXM/LCBsZXZlbCA9IDApIHtcbiAgICAgICAgcHJvY2Vzc2VkSXRlbXMgPSBwcm9jZXNzZWRJdGVtcyB8fCB0aGlzLnByb2Nlc3NlZEl0ZW1zKCk7XG4gICAgICAgIGlmIChwcm9jZXNzZWRJdGVtcyAmJiBwcm9jZXNzZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvY2Vzc2VkSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gcHJvY2Vzc2VkSXRlbXNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAna2V5JykgPT09IGtleSkgcmV0dXJuIHByb2Nlc3NlZEl0ZW07XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlZEl0ZW0gPSB0aGlzLmZpbmRQcm9jZXNzZWRJdGVtQnlJdGVtS2V5KGtleSwgcHJvY2Vzc2VkSXRlbS5pdGVtcywgbGV2ZWwgKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZEl0ZW0pIHJldHVybiBtYXRjaGVkSXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZsYXRJdGVtcyhwcm9jZXNzZWRJdGVtcywgcHJvY2Vzc2VkRmxhdHRlbkl0ZW1zID0gW10pIHtcbiAgICAgICAgcHJvY2Vzc2VkSXRlbXMgJiZcbiAgICAgICAgICAgIHByb2Nlc3NlZEl0ZW1zLmZvckVhY2goKHByb2Nlc3NlZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Zpc2libGVJdGVtKHByb2Nlc3NlZEl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NlZEZsYXR0ZW5JdGVtcy5wdXNoKHByb2Nlc3NlZEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYXRJdGVtcyhwcm9jZXNzZWRJdGVtLml0ZW1zLCBwcm9jZXNzZWRGbGF0dGVuSXRlbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRGbGF0dGVuSXRlbXM7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZEl0ZW0oZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBvcmlnaW5hbEV2ZW50LCBwcm9jZXNzZWRJdGVtLCBmb2N1c09uTmV4dCwgc2VsZkNoZWNrLCBhbGxvd0hlYWRlckZvY3VzID0gdHJ1ZSB9ID0gZXZlbnQ7XG5cbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSAmJiB0aGlzLmZvY3VzZWRJdGVtKCkua2V5ICE9PSBwcm9jZXNzZWRJdGVtLmtleSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbS5zZXQocHJvY2Vzc2VkSXRlbSk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEluVmlldygpO1xuICAgICAgICB9IGVsc2UgaWYgKGFsbG93SGVhZGVyRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyRm9jdXMuZW1pdCh7IG9yaWdpbmFsRXZlbnQsIGZvY3VzT25OZXh0LCBzZWxmQ2hlY2sgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxJblZpZXcoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5zdWJNZW51Vmlld0NoaWxkLmxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgYGxpW2lkPVwiJHtgJHt0aGlzLmZvY3VzZWRJdGVtSWR9YH1cIl1gKTtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyAmJiBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JywgaW5saW5lOiAnbmVhcmVzdCcgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgZm9jdXNlZEl0ZW0gPSB0aGlzLmZvY3VzZWRJdGVtKCkgfHwgKHRoaXMuaXNFbGVtZW50SW5QYW5lbChldmVudCwgZXZlbnQucmVsYXRlZFRhcmdldCkgPyB0aGlzLmZpbmRJdGVtQnlFdmVudFRhcmdldChldmVudC50YXJnZXQpIHx8IHRoaXMuZmluZEZpcnN0SXRlbSgpIDogdGhpcy5maW5kTGFzdEl0ZW0oKSk7XG4gICAgICAgICAgICBpZiAoZXZlbnQucmVsYXRlZFRhcmdldCAhPT0gbnVsbCkgdGhpcy5mb2N1c2VkSXRlbS5zZXQoZm9jdXNlZEl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25CbHVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCAmJiAhdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbS5zZXQobnVsbCk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1Ub2dnbGUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBwcm9jZXNzZWRJdGVtLCBleHBhbmRlZCB9ID0gZXZlbnQ7XG4gICAgICAgIHByb2Nlc3NlZEl0ZW0uZXhwYW5kZWQgPSAhcHJvY2Vzc2VkSXRlbS5leHBhbmRlZDtcblxuICAgICAgICBjb25zdCBhY3RpdmVJdGVtUGF0aCA9IHRoaXMuYWN0aXZlSXRlbVBhdGgoKS5maWx0ZXIoKHApID0+IHAucGFyZW50S2V5ICE9PSBwcm9jZXNzZWRJdGVtLnBhcmVudEtleSk7XG4gICAgICAgIGV4cGFuZGVkICYmIGFjdGl2ZUl0ZW1QYXRoLnB1c2gocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtUGF0aC5zZXQoYWN0aXZlSXRlbVBhdGgpO1xuICAgICAgICB0aGlzLnByb2Nlc3NlZEl0ZW1zLnVwZGF0ZSgodmFsdWUpID0+IHZhbHVlLm1hcCgoaSkgPT4gKGkgPT09IHByb2Nlc3NlZEl0ZW0gPyBwcm9jZXNzZWRJdGVtIDogaSkpKTtcbiAgICAgICAgdGhpcy5mb2N1c2VkSXRlbS5zZXQocHJvY2Vzc2VkSXRlbSk7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1ldGFLZXkgPSBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXk7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93TGVmdEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1JpZ2h0S2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbmRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblNwYWNlS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgY2FzZSAnUGFnZURvd24nOlxuICAgICAgICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XG4gICAgICAgICAgICBjYXNlICdTaGlmdExlZnQnOlxuICAgICAgICAgICAgY2FzZSAnU2hpZnRSaWdodCc6XG4gICAgICAgICAgICAgICAgLy9OT09QXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5ICYmIE9iamVjdFV0aWxzLmlzUHJpbnRhYmxlQ2hhcmFjdGVyKGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJdGVtcyhldmVudCwgZXZlbnQua2V5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dEb3duS2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuZm9jdXNlZEl0ZW0oKSkgPyB0aGlzLmZpbmROZXh0SXRlbSh0aGlzLmZvY3VzZWRJdGVtKCkpIDogdGhpcy5maW5kRmlyc3RJdGVtKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW0oeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbSwgZm9jdXNPbk5leHQ6IHRydWUgfSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIG9uQXJyb3dVcEtleShldmVudCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmZvY3VzZWRJdGVtKCkpID8gdGhpcy5maW5kUHJldkl0ZW0odGhpcy5mb2N1c2VkSXRlbSgpKSA6IHRoaXMuZmluZExhc3RJdGVtKCk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbSh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9jZXNzZWRJdGVtLCBzZWxmQ2hlY2s6IHRydWUgfSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd0xlZnRLZXkoZXZlbnQpIHtcbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlZCA9IHRoaXMuYWN0aXZlSXRlbVBhdGgoKS5zb21lKChwKSA9PiBwLmtleSA9PT0gdGhpcy5mb2N1c2VkSXRlbSgpLmtleSk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbVBhdGggPSB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCkuZmlsdGVyKChwKSA9PiBwLmtleSAhPT0gdGhpcy5mb2N1c2VkSXRlbSgpLmtleSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtUGF0aC5zZXQoYWN0aXZlSXRlbVBhdGgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb2N1c2VkSXRlbSA9IE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpLnBhcmVudCkgPyB0aGlzLmZvY3VzZWRJdGVtKCkucGFyZW50IDogdGhpcy5mb2N1c2VkSXRlbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW0uc2V0KGZvY3VzZWRJdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dSaWdodEtleShldmVudCkge1xuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmZvY3VzZWRJdGVtKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc0l0ZW1Hcm91cCh0aGlzLmZvY3VzZWRJdGVtKCkpO1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXBlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWQgPSB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCkuc29tZSgocCkgPT4gcC5rZXkgPT09IHRoaXMuZm9jdXNlZEl0ZW0oKS5rZXkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkFycm93RG93bktleShldmVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlSXRlbVBhdGggPSB0aGlzLmFjdGl2ZUl0ZW1QYXRoKCkuZmlsdGVyKChwKSA9PiBwLnBhcmVudEtleSAhPT0gdGhpcy5mb2N1c2VkSXRlbSgpLnBhcmVudEtleSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW1QYXRoLnB1c2godGhpcy5mb2N1c2VkSXRlbSgpKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW1QYXRoLnNldChhY3RpdmVJdGVtUGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ib21lS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW0oeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbTogdGhpcy5maW5kRmlyc3RJdGVtKCksIGFsbG93SGVhZGVyRm9jdXM6IGZhbHNlIH0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW5kS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW0oeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbTogdGhpcy5maW5kTGFzdEl0ZW0oKSwgZm9jdXNPbk5leHQ6IHRydWUsIGFsbG93SGVhZGVyRm9jdXM6IGZhbHNlIH0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW50ZXJLZXkoZXZlbnQpIHtcbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLnN1Yk1lbnVWaWV3Q2hpbGQubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCBgbGlbaWQ9XCIke2Ake3RoaXMuZm9jdXNlZEl0ZW1JZH1gfVwiXWApO1xuICAgICAgICAgICAgY29uc3QgYW5jaG9yRWxlbWVudCA9IGVsZW1lbnQgJiYgKERvbUhhbmRsZXIuZmluZFNpbmdsZShlbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImFjdGlvblwiXScpIHx8IERvbUhhbmRsZXIuZmluZFNpbmdsZShlbGVtZW50LCAnYSxidXR0b24nKSk7XG5cbiAgICAgICAgICAgIGFuY2hvckVsZW1lbnQgPyBhbmNob3JFbGVtZW50LmNsaWNrKCkgOiBlbGVtZW50ICYmIGVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25TcGFjZUtleShldmVudCkge1xuICAgICAgICB0aGlzLm9uRW50ZXJLZXkoZXZlbnQpO1xuICAgIH1cblxuICAgIGZpbmROZXh0SXRlbShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy52aXNpYmxlSXRlbXMoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0ua2V5ID09PSBwcm9jZXNzZWRJdGVtLmtleSk7XG5cbiAgICAgICAgY29uc3QgbWF0Y2hlZEl0ZW0gPVxuICAgICAgICAgICAgaW5kZXggPCB0aGlzLnZpc2libGVJdGVtcygpLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICA/IHRoaXMudmlzaWJsZUl0ZW1zKClcbiAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgIC5maW5kKChwSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwSXRlbSkpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBtYXRjaGVkSXRlbSB8fCBwcm9jZXNzZWRJdGVtO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy52aXNpYmxlSXRlbXMoKS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0ua2V5ID09PSBwcm9jZXNzZWRJdGVtLmtleSk7XG4gICAgICAgIGNvbnN0IG1hdGNoZWRJdGVtID0gaW5kZXggPiAwID8gT2JqZWN0VXRpbHMuZmluZExhc3QodGhpcy52aXNpYmxlSXRlbXMoKS5zbGljZSgwLCBpbmRleCksIChwSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwSXRlbSkpIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkSXRlbSB8fCBwcm9jZXNzZWRJdGVtO1xuICAgIH1cblxuICAgIHNlYXJjaEl0ZW1zKGV2ZW50LCBjaGFyKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAodGhpcy5zZWFyY2hWYWx1ZSB8fCAnJykgKyBjaGFyO1xuXG4gICAgICAgIGxldCBtYXRjaGVkSXRlbSA9IG51bGw7XG4gICAgICAgIGxldCBtYXRjaGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbSgpKSkge1xuICAgICAgICAgICAgY29uc3QgZm9jdXNlZEl0ZW1JbmRleCA9IHRoaXMudmlzaWJsZUl0ZW1zKCkuZmluZEluZGV4KChwcm9jZXNzZWRJdGVtKSA9PiBwcm9jZXNzZWRJdGVtLmtleSA9PT0gdGhpcy5mb2N1c2VkSXRlbSgpLmtleSk7XG5cbiAgICAgICAgICAgIG1hdGNoZWRJdGVtID0gdGhpcy52aXNpYmxlSXRlbXMoKVxuICAgICAgICAgICAgICAgIC5zbGljZShmb2N1c2VkSXRlbUluZGV4KVxuICAgICAgICAgICAgICAgIC5maW5kKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbSkpO1xuICAgICAgICAgICAgbWF0Y2hlZEl0ZW0gPSBPYmplY3RVdGlscy5pc0VtcHR5KG1hdGNoZWRJdGVtKVxuICAgICAgICAgICAgICAgID8gdGhpcy52aXNpYmxlSXRlbXMoKVxuICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCBmb2N1c2VkSXRlbUluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgIC5maW5kKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbSkpXG4gICAgICAgICAgICAgICAgOiBtYXRjaGVkSXRlbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoZWRJdGVtID0gdGhpcy52aXNpYmxlSXRlbXMoKS5maW5kKChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkobWF0Y2hlZEl0ZW0pKSB7XG4gICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3RVdGlscy5pc0VtcHR5KG1hdGNoZWRJdGVtKSAmJiBPYmplY3RVdGlscy5pc0VtcHR5KHRoaXMuZm9jdXNlZEl0ZW0oKSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWRJdGVtID0gdGhpcy5maW5kRmlyc3RJdGVtKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShtYXRjaGVkSXRlbSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW0oe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEl0ZW06IG1hdGNoZWRJdGVtLFxuICAgICAgICAgICAgICAgIGFsbG93SGVhZGVyRm9jdXM6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaFRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNlYXJjaFRpbWVvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgIH1cbn1cblxuLyoqXG4gKiBQYW5lbE1lbnUgaXMgYSBoeWJyaWQgb2YgQWNjb3JkaW9uIGFuZCBUcmVlIGNvbXBvbmVudHMuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtcGFuZWxNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCIncC1wYW5lbG1lbnUgcC1jb21wb25lbnQnXCIgI2NvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbW9kZWw7IGxldCBmID0gZmlyc3Q7IGxldCBsID0gbGFzdDsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc0l0ZW1WaXNpYmxlKGl0ZW0pXCIgY2xhc3M9XCJwLXBhbmVsbWVudS1wYW5lbFwiIFtuZ0NsYXNzXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdoZWFkZXJDbGFzcycpXCIgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3N0eWxlJylcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3BhbmVsJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWNvbXBvbmVudCBwLXBhbmVsbWVudS1oZWFkZXInOiB0cnVlLCAncC1oaWdobGlnaHQnOiBpc0l0ZW1BY3RpdmUoaXRlbSksICdwLWRpc2FibGVkJzogaXNJdGVtRGlzYWJsZWQoaXRlbSkgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3N0eWxlQ2xhc3MnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChpdGVtLCAnc3R5bGUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcFRvb2x0aXBdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3Rvb2x0aXAnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRIZWFkZXJJZChpdGVtLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwT3B0aW9uc109XCJnZXRJdGVtUHJvcChpdGVtLCAndG9vbHRpcE9wdGlvbnMnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImlzSXRlbUFjdGl2ZShpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdsYWJlbCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiZ2V0Q29udGVudElkKGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiaXNJdGVtRGlzYWJsZWQoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZ2hsaWdodF09XCJpc0l0ZW1BY3RpdmUoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWRpc2FibGVkXT1cImlzSXRlbURpc2FibGVkKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGVhZGVyJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25IZWFkZXJDbGljaygkZXZlbnQsIGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uSGVhZGVyS2V5RG93bigkZXZlbnQsIGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGFuZWxtZW51LWhlYWRlci1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIWdldEl0ZW1Qcm9wKGl0ZW0sICdyb3V0ZXJMaW5rJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaHJlZl09XCJnZXRJdGVtUHJvcChpdGVtLCAndXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhcmdldF09XCJnZXRJdGVtUHJvcChpdGVtLCAndGFyZ2V0JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3RpdGxlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXBhbmVsbWVudS1oZWFkZXItYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGVhZGVyYWN0aW9uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0l0ZW1Hcm91cChpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc3VibWVudUljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkRvd25JY29uIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiAqbmdJZj1cImlzSXRlbUFjdGl2ZShpdGVtKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHRJY29uIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiAqbmdJZj1cIiFpc0l0ZW1BY3RpdmUoaXRlbSlcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInN1Ym1lbnVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2ljb25TdHlsZScpXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKGl0ZW0sICdlc2NhcGUnKSAhPT0gZmFsc2U7IGVsc2UgaHRtbExhYmVsXCI+e3sgZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJylcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1iYWRnZVwiICpuZ0lmPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2JhZGdlJylcIiBbbmdDbGFzc109XCJnZXRJdGVtUHJvcChpdGVtLCAnYmFkZ2VTdHlsZUNsYXNzJylcIj57eyBnZXRJdGVtUHJvcChpdGVtLCAnYmFkZ2UnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImdldEl0ZW1Qcm9wKGl0ZW0sICdyb3V0ZXJMaW5rJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua109XCJnZXRJdGVtUHJvcChpdGVtLCAncm91dGVyTGluaycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdxdWVyeVBhcmFtcycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3AtbWVudWl0ZW0tbGluay1hY3RpdmUnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdyb3V0ZXJMaW5rQWN0aXZlT3B0aW9ucycpIHx8IHsgZXhhY3Q6IGZhbHNlIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cImdldEl0ZW1Qcm9wKGl0ZW0sICd0YXJnZXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1wYW5lbG1lbnUtaGVhZGVyLWFjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIi0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdmcmFnbWVudCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3F1ZXJ5UGFyYW1zSGFuZGxpbmcnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdwcmVzZXJ2ZUZyYWdtZW50JylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdza2lwTG9jYXRpb25DaGFuZ2UnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdyZXBsYWNlVXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ3N0YXRlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2hlYWRlcmFjdGlvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSXRlbUdyb3VwKGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXN1Ym1lbnVJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkRvd25JY29uIFtzdHlsZUNsYXNzXT1cIidwLXN1Ym1lbnUtaWNvbidcIiAqbmdJZj1cImlzSXRlbUFjdGl2ZShpdGVtKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25SaWdodEljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiICpuZ0lmPVwiIWlzSXRlbUFjdGl2ZShpdGVtKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInN1Ym1lbnVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdpY29uU3R5bGUnKVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKGl0ZW0sICdlc2NhcGUnKSAhPT0gZmFsc2U7IGVsc2UgaHRtbFJvdXRlTGFiZWxcIj57eyBnZXRJdGVtUHJvcChpdGVtLCAnbGFiZWwnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNodG1sUm91dGVMYWJlbD48c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFtpbm5lckhUTUxdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJylcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWJhZGdlXCIgKm5nSWY9XCJnZXRJdGVtUHJvcChpdGVtLCAnYmFkZ2UnKVwiIFtuZ0NsYXNzXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdiYWRnZVN0eWxlQ2xhc3MnKVwiPnt7IGdldEl0ZW1Qcm9wKGl0ZW0sICdiYWRnZScpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0l0ZW1Hcm91cChpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtdG9nZ2xlYWJsZS1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtcGFuZWxtZW51LWV4cGFuZGVkJzogaXNJdGVtQWN0aXZlKGl0ZW0pIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW0Byb290SXRlbV09XCJnZXRBbmltYXRpb24oaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKEByb290SXRlbS5kb25lKT1cIm9uVG9nZ2xlRG9uZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJyZWdpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiZ2V0Q29udGVudElkKGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJnZXRIZWFkZXJJZChpdGVtLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RvZ2dsZWFibGVjb250ZW50J1wiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBhbmVsbWVudS1jb250ZW50XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtZW51Y29udGVudCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC1wYW5lbE1lbnVMaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwYW5lbElkXT1cImdldFBhbmVsSWQoaSwgaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbXNdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2l0ZW1zJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbVRlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0cmFuc2l0aW9uT3B0aW9uc109XCJ0cmFuc2l0aW9uT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb290XT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYWN0aXZlSXRlbV09XCJhY3RpdmVJdGVtKClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGFyZW50RXhwYW5kZWRdPVwiaXNJdGVtQWN0aXZlKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGhlYWRlckZvY3VzKT1cInVwZGF0ZUZvY3VzZWRIZWFkZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPjwvcC1wYW5lbE1lbnVMaXN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdyb290SXRlbScsIFtcbiAgICAgICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgICAgICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgICAgICd2aXNpYmxlJyxcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJyonXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlIDw9PiBoaWRkZW4nLCBbYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKV0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgYW5pbWF0ZSgwKSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGFuZWxtZW51LmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbE1lbnUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBtZW51aXRlbXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciBtdWx0aXBsZSB0YWJzIGNhbiBiZSBhY3RpdmF0ZWQgYXQgdGhlIHNhbWUgdGltZSBvciBub3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIG11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICc0MDBtcyBjdWJpYy1iZXppZXIoMC44NiwgMCwgMC4wNywgMSknO1xuICAgIC8qKlxuICAgICAqIEN1cnJlbnQgaWQgc3RhdGUgYXMgYSBzdHJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIHRhYmluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQgPSAwO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIHN1Ym1lbnVJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgYW5pbWF0aW5nOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgYWN0aXZlSXRlbSA9IHNpZ25hbDxhbnk+KG51bGwpO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmlkIHx8IFVuaXF1ZUNvbXBvbmVudElkKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N1Ym1lbnVpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJtZW51SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgLyoqXG4gICAgICogQ29sbGFwc2VzIG9wZW4gcGFuZWxzLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBjb2xsYXBzZUFsbCgpIHtcbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLm1vZGVsISkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZURvbmUoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgY2hhbmdlQWN0aXZlSXRlbShldmVudCwgaXRlbSwgaW5kZXg/OiBudW1iZXIsIHNlbGZBY3RpdmUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJdGVtRGlzYWJsZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSBzZWxmQWN0aXZlID8gaXRlbSA6IHRoaXMuYWN0aXZlSXRlbSAmJiBPYmplY3RVdGlscy5lcXVhbHMoaXRlbSwgdGhpcy5hY3RpdmVJdGVtKSA/IG51bGwgOiBpdGVtO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChhY3RpdmVJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFuaW1hdGlvbihpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5leHBhbmRlZCA/IHsgdmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRoaXMuYW5pbWF0aW5nID8gdGhpcy50cmFuc2l0aW9uT3B0aW9ucyA6ICcwbXMnLCBoZWlnaHQ6ICcqJyB9IH0gOiB7IHZhbHVlOiAnaGlkZGVuJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRoaXMudHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJzAnIH0gfTtcbiAgICB9XG5cbiAgICBnZXRJdGVtUHJvcChpdGVtLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBpdGVtID8gT2JqZWN0VXRpbHMuZ2V0SXRlbVZhbHVlKGl0ZW1bbmFtZV0pIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldEl0ZW1MYWJlbChpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKGl0ZW0sICdsYWJlbCcpO1xuICAgIH1cblxuICAgIGlzSXRlbUFjdGl2ZShpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtLmV4cGFuZGVkO1xuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChpdGVtLCAndmlzaWJsZScpICE9PSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0l0ZW1EaXNhYmxlZChpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKGl0ZW0sICdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlzSXRlbUdyb3VwKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkoaXRlbS5pdGVtcyk7XG4gICAgfVxuXG4gICAgZ2V0UGFuZWxJZChpbmRleCwgaXRlbT8pIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gJiYgaXRlbS5pZCA/IGl0ZW0uaWQgOiBgJHt0aGlzLmlkfV8ke2luZGV4fWA7XG4gICAgfVxuXG4gICAgZ2V0SGVhZGVySWQoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPyBpdGVtLmlkICsgJ19oZWFkZXInIDogYCR7dGhpcy5nZXRQYW5lbElkKGluZGV4KX1faGVhZGVyYDtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50SWQoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPyBpdGVtLmlkICsgJ19jb250ZW50JyA6IGAke3RoaXMuZ2V0UGFuZWxJZChpbmRleCl9X2NvbnRlbnRgO1xuICAgIH1cblxuICAgIHVwZGF0ZUZvY3VzZWRIZWFkZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBvcmlnaW5hbEV2ZW50LCBmb2N1c09uTmV4dCwgc2VsZkNoZWNrIH0gPSBldmVudDtcbiAgICAgICAgY29uc3QgcGFuZWxFbGVtZW50ID0gb3JpZ2luYWxFdmVudC5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXBjLXNlY3Rpb249XCJwYW5lbFwiXScpO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBzZWxmQ2hlY2sgPyBEb21IYW5kbGVyLmZpbmRTaW5nbGUocGFuZWxFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlclwiXScpIDogZm9jdXNPbk5leHQgPyB0aGlzLmZpbmROZXh0SGVhZGVyKHBhbmVsRWxlbWVudCkgOiB0aGlzLmZpbmRQcmV2SGVhZGVyKHBhbmVsRWxlbWVudCk7XG5cbiAgICAgICAgaGVhZGVyID8gdGhpcy5jaGFuZ2VGb2N1c2VkSGVhZGVyKG9yaWdpbmFsRXZlbnQsIGhlYWRlcikgOiBmb2N1c09uTmV4dCA/IHRoaXMub25IZWFkZXJIb21lS2V5KG9yaWdpbmFsRXZlbnQpIDogdGhpcy5vbkhlYWRlckVuZEtleShvcmlnaW5hbEV2ZW50KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VGb2N1c2VkSGVhZGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQgJiYgRG9tSGFuZGxlci5mb2N1cyhlbGVtZW50KTtcbiAgICB9XG5cbiAgICBmaW5kTmV4dEhlYWRlcihwYW5lbEVsZW1lbnQsIHNlbGZDaGVjayA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG5leHRQYW5lbEVsZW1lbnQgPSBzZWxmQ2hlY2sgPyBwYW5lbEVsZW1lbnQgOiBwYW5lbEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKG5leHRQYW5lbEVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiaGVhZGVyXCJdJyk7XG5cbiAgICAgICAgcmV0dXJuIGhlYWRlckVsZW1lbnQgPyAoRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoaGVhZGVyRWxlbWVudCwgJ2RhdGEtcC1kaXNhYmxlZCcpID8gdGhpcy5maW5kTmV4dEhlYWRlcihoZWFkZXJFbGVtZW50LnBhcmVudEVsZW1lbnQpIDogaGVhZGVyRWxlbWVudCkgOiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SGVhZGVyKHBhbmVsRWxlbWVudCwgc2VsZkNoZWNrID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgcHJldlBhbmVsRWxlbWVudCA9IHNlbGZDaGVjayA/IHBhbmVsRWxlbWVudCA6IHBhbmVsRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHByZXZQYW5lbEVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiaGVhZGVyXCJdJyk7XG5cbiAgICAgICAgcmV0dXJuIGhlYWRlckVsZW1lbnQgPyAoRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoaGVhZGVyRWxlbWVudCwgJ2RhdGEtcC1kaXNhYmxlZCcpID8gdGhpcy5maW5kUHJldkhlYWRlcihoZWFkZXJFbGVtZW50LnBhcmVudEVsZW1lbnQpIDogaGVhZGVyRWxlbWVudCkgOiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRGaXJzdEhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE5leHRIZWFkZXIodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZmluZExhc3RIZWFkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRQcmV2SGVhZGVyKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgb25IZWFkZXJDbGljayhldmVudCwgaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJdGVtRGlzYWJsZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHtcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpdGVtIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBtb2RlbEl0ZW0gb2YgdGhpcy5tb2RlbCEpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gbW9kZWxJdGVtICYmIG1vZGVsSXRlbS5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgICAgICBtb2RlbEl0ZW0uZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmV4cGFuZGVkID0gIWl0ZW0uZXhwYW5kZWQ7XG4gICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlSXRlbShldmVudCwgaXRlbSwgaW5kZXgpO1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIERvbUhhbmRsZXIuZm9jdXMoZXZlbnQuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgfVxuXG4gICAgb25IZWFkZXJLZXlEb3duKGV2ZW50LCBpdGVtLCBpbmRleCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhlYWRlckFycm93RG93bktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25IZWFkZXJBcnJvd1VwS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhlYWRlckhvbWVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25IZWFkZXJFbmRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhlYWRlckVudGVyS2V5KGV2ZW50LCBpdGVtLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhlYWRlckFycm93RG93bktleShldmVudCkge1xuICAgICAgICBjb25zdCByb290TGlzdCA9IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGV2ZW50LmN1cnJlbnRUYXJnZXQsICdkYXRhLXAtaGlnaGxpZ2h0JykgPT09IHRydWUgPyBEb21IYW5kbGVyLmZpbmRTaW5nbGUoZXZlbnQuY3VycmVudFRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcsICdbZGF0YS1wYy1zZWN0aW9uPVwibWVudVwiXScpIDogbnVsbDtcblxuICAgICAgICByb290TGlzdCA/IERvbUhhbmRsZXIuZm9jdXMocm9vdExpc3QpIDogdGhpcy51cGRhdGVGb2N1c2VkSGVhZGVyKHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGZvY3VzT25OZXh0OiB0cnVlIH0pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uSGVhZGVyQXJyb3dVcEtleShldmVudCkge1xuICAgICAgICBjb25zdCBwcmV2SGVhZGVyID0gdGhpcy5maW5kUHJldkhlYWRlcihldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQpIHx8IHRoaXMuZmluZExhc3RIZWFkZXIoKTtcbiAgICAgICAgY29uc3Qgcm9vdExpc3QgPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShwcmV2SGVhZGVyLCAnZGF0YS1wLWhpZ2hsaWdodCcpID09PSB0cnVlID8gRG9tSGFuZGxlci5maW5kU2luZ2xlKHByZXZIZWFkZXIubmV4dEVsZW1lbnRTaWJsaW5nLCAnW2RhdGEtcGMtc2VjdGlvbj1cIm1lbnVcIl0nKSA6IG51bGw7XG5cbiAgICAgICAgcm9vdExpc3QgPyBEb21IYW5kbGVyLmZvY3VzKHJvb3RMaXN0KSA6IHRoaXMudXBkYXRlRm9jdXNlZEhlYWRlcih7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBmb2N1c09uTmV4dDogZmFsc2UgfSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25IZWFkZXJIb21lS2V5KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEhlYWRlcihldmVudCwgdGhpcy5maW5kRmlyc3RIZWFkZXIoKSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25IZWFkZXJFbmRLZXkoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSGVhZGVyKGV2ZW50LCB0aGlzLmZpbmRMYXN0SGVhZGVyKCkpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uSGVhZGVyRW50ZXJLZXkoZXZlbnQsIGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckFjdGlvbiA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShldmVudC5jdXJyZW50VGFyZ2V0LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlcmFjdGlvblwiXScpO1xuXG4gICAgICAgIGhlYWRlckFjdGlvbiA/IGhlYWRlckFjdGlvbi5jbGljaygpIDogdGhpcy5vbkhlYWRlckNsaWNrKGV2ZW50LCBpdGVtLCBpbmRleCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFNoYXJlZE1vZHVsZSwgQW5nbGVEb3duSWNvbiwgQW5nbGVSaWdodEljb24sIENoZXZyb25Eb3duSWNvbiwgQ2hldnJvblJpZ2h0SWNvbl0sXG4gICAgZXhwb3J0czogW1BhbmVsTWVudSwgUm91dGVyTW9kdWxlLCBUb29sdGlwTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1BhbmVsTWVudSwgUGFuZWxNZW51U3ViLCBQYW5lbE1lbnVMaXN0XVxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbE1lbnVNb2R1bGUge31cbiJdfQ==