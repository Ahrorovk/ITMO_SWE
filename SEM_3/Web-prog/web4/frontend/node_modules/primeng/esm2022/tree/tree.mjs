import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Inject, Input, NgModule, numberAttribute, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { RippleModule } from 'primeng/ripple';
import { ScrollerModule } from 'primeng/scroller';
import { ObjectUtils } from 'primeng/utils';
import { CheckIcon } from 'primeng/icons/check';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { MinusIcon } from 'primeng/icons/minus';
import { PlusIcon } from 'primeng/icons/plus';
import { SearchIcon } from 'primeng/icons/search';
import { SpinnerIcon } from 'primeng/icons/spinner';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
import * as i3 from "primeng/api";
import * as i4 from "primeng/scroller";
export class UITreeNode {
    static ICON_CLASS = 'p-treenode-icon ';
    rowNode;
    node;
    parentNode;
    root;
    index;
    firstChild;
    lastChild;
    level;
    indentation;
    itemSize;
    loadingMode;
    tree;
    timeout;
    draghoverPrev;
    draghoverNext;
    draghoverNode;
    get ariaSelected() {
        return this.tree.selectionMode === 'single' || this.tree.selectionMode === 'multiple' ? this.isSelected() : undefined;
    }
    get ariaChecked() {
        return this.tree.selectionMode === 'checkbox' ? this.isSelected() : undefined;
    }
    constructor(tree) {
        this.tree = tree;
    }
    ngOnInit() {
        this.node.parent = this.parentNode;
        const nativeElement = this.tree.el.nativeElement;
        const pDialogWrapper = nativeElement.closest('p-dialog');
        if (this.parentNode && !pDialogWrapper) {
            this.setAllNodesTabIndexes();
            this.tree.syncNodeOption(this.node, this.tree.value, 'parent', this.tree.getNodeWithKey(this.parentNode.key, this.tree.value));
        }
    }
    getIcon() {
        let icon;
        if (this.node.icon)
            icon = this.node.icon;
        else
            icon = this.node.expanded && this.node.children && this.node.children?.length ? this.node.expandedIcon : this.node.collapsedIcon;
        return UITreeNode.ICON_CLASS + ' ' + icon;
    }
    isLeaf() {
        return this.tree.isNodeLeaf(this.node);
    }
    toggle(event) {
        if (this.node.expanded)
            this.collapse(event);
        else
            this.expand(event);
        event.stopPropagation();
    }
    expand(event) {
        this.node.expanded = true;
        if (this.tree.virtualScroll) {
            this.tree.updateSerializedValue();
            this.focusVirtualNode();
        }
        this.tree.onNodeExpand.emit({ originalEvent: event, node: this.node });
    }
    collapse(event) {
        this.node.expanded = false;
        if (this.tree.virtualScroll) {
            this.tree.updateSerializedValue();
            this.focusVirtualNode();
        }
        this.tree.onNodeCollapse.emit({ originalEvent: event, node: this.node });
    }
    onNodeClick(event) {
        this.tree.onNodeClick(event, this.node);
    }
    onNodeKeydown(event) {
        if (event.key === 'Enter') {
            this.tree.onNodeClick(event, this.node);
        }
    }
    onNodeTouchEnd() {
        this.tree.onNodeTouchEnd();
    }
    onNodeRightClick(event) {
        this.tree.onNodeRightClick(event, this.node);
    }
    isSelected() {
        return this.tree.isSelected(this.node);
    }
    isSameNode(event) {
        return event.currentTarget && (event.currentTarget.isSameNode(event.target) || event.currentTarget.isSameNode(event.target.closest('[role="treeitem"]')));
    }
    onDropPoint(event, position) {
        event.preventDefault();
        let dragNode = this.tree.dragNode;
        let dragNodeIndex = this.tree.dragNodeIndex;
        let dragNodeScope = this.tree.dragNodeScope;
        let isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? position === 1 || dragNodeIndex !== this.index - 1 : true;
        if (this.tree.allowDrop(dragNode, this.node, dragNodeScope, 'between') && isValidDropPointIndex) {
            let dropParams = { ...this.createDropPointEventMetadata(position) };
            if (this.tree.validateDrop) {
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    dropPoint: 'between',
                    index: this.index,
                    accept: () => {
                        this.processPointDrop(dropParams);
                    }
                });
            }
            else {
                this.processPointDrop(dropParams);
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    dropPoint: 'between',
                    index: this.index
                });
            }
        }
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }
    processPointDrop(event) {
        let newNodeList = event.dropNode.parent ? event.dropNode.parent.children : this.tree.value;
        event.dragNodeSubNodes.splice(event.dragNodeIndex, 1);
        let dropIndex = this.index;
        if (event.position < 0) {
            dropIndex = event.dragNodeSubNodes === newNodeList ? (event.dragNodeIndex > event.index ? event.index : event.index - 1) : event.index;
            newNodeList.splice(dropIndex, 0, event.dragNode);
        }
        else {
            dropIndex = newNodeList.length;
            newNodeList.push(event.dragNode);
        }
        this.tree.dragDropService.stopDrag({
            node: event.dragNode,
            subNodes: event.dropNode.parent ? event.dropNode.parent.children : this.tree.value,
            index: event.dragNodeIndex
        });
    }
    createDropPointEventMetadata(position) {
        return {
            dragNode: this.tree.dragNode,
            dragNodeIndex: this.tree.dragNodeIndex,
            dragNodeSubNodes: this.tree.dragNodeSubNodes,
            dropNode: this.node,
            index: this.index,
            position: position
        };
    }
    onDropPointDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }
    onDropPointDragEnter(event, position) {
        if (this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope, 'between')) {
            if (position < 0)
                this.draghoverPrev = true;
            else
                this.draghoverNext = true;
        }
    }
    onDropPointDragLeave(event) {
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }
    onDragStart(event) {
        if (this.tree.draggableNodes && this.node.draggable !== false) {
            event.dataTransfer.setData('text', 'data');
            this.tree.dragDropService.startDrag({
                tree: this,
                node: this.node,
                subNodes: this.node?.parent ? this.node.parent.children : this.tree.value,
                index: this.index,
                scope: this.tree.draggableScope
            });
        }
        else {
            event.preventDefault();
        }
    }
    onDragStop(event) {
        this.tree.dragDropService.stopDrag({
            node: this.node,
            subNodes: this.node?.parent ? this.node.parent.children : this.tree.value,
            index: this.index
        });
    }
    onDropNodeDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        if (this.tree.droppableNodes) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    onDropNode(event) {
        if (this.tree.droppableNodes && this.node?.droppable !== false) {
            let dragNode = this.tree.dragNode;
            if (this.tree.allowDrop(dragNode, this.node, this.tree.dragNodeScope)) {
                let dropParams = { ...this.createDropNodeEventMetadata() };
                if (this.tree.validateDrop) {
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node,
                        dropPoint: 'node',
                        index: this.index,
                        accept: () => {
                            this.processNodeDrop(dropParams);
                        }
                    });
                }
                else {
                    this.processNodeDrop(dropParams);
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node,
                        dropPoint: 'node',
                        index: this.index
                    });
                }
            }
        }
        event.preventDefault();
        event.stopPropagation();
        this.draghoverNode = false;
    }
    createDropNodeEventMetadata() {
        return {
            dragNode: this.tree.dragNode,
            dragNodeIndex: this.tree.dragNodeIndex,
            dragNodeSubNodes: this.tree.dragNodeSubNodes,
            dropNode: this.node
        };
    }
    processNodeDrop(event) {
        let dragNodeIndex = event.dragNodeIndex;
        event.dragNodeSubNodes.splice(dragNodeIndex, 1);
        if (event.dropNode.children)
            event.dropNode.children.push(event.dragNode);
        else
            event.dropNode.children = [event.dragNode];
        this.tree.dragDropService.stopDrag({
            node: event.dragNode,
            subNodes: event.dropNode.parent ? event.dropNode.parent.children : this.tree.value,
            index: dragNodeIndex
        });
    }
    onDropNodeDragEnter(event) {
        if (this.tree.droppableNodes && this.node?.droppable !== false && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            this.draghoverNode = true;
        }
    }
    onDropNodeDragLeave(event) {
        if (this.tree.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
                this.draghoverNode = false;
            }
        }
    }
    onKeyDown(event) {
        if (!this.isSameNode(event) || (this.tree.contextMenu && this.tree.contextMenu.containerViewChild?.nativeElement.style.display === 'block')) {
            return;
        }
        switch (event.code) {
            //down arrow
            case 'ArrowDown':
                this.onArrowDown(event);
                break;
            //up arrow
            case 'ArrowUp':
                this.onArrowUp(event);
                break;
            //right arrow
            case 'ArrowRight':
                this.onArrowRight(event);
                break;
            //left arrow
            case 'ArrowLeft':
                this.onArrowLeft(event);
                break;
            //enter
            case 'Enter':
            case 'NumpadEnter':
                this.onEnter(event);
                break;
            //space
            case 'Space':
                const nodeName = event.target instanceof HTMLElement && event.target.nodeName;
                if (!['INPUT'].includes(nodeName)) {
                    this.onEnter(event);
                }
                break;
            //tab
            case 'Tab':
                this.setAllNodesTabIndexes();
                break;
            default:
                //no op
                break;
        }
    }
    onArrowUp(event) {
        const nodeElement = event.target.getAttribute('data-pc-section') === 'toggler' ? event.target.closest('[role="treeitem"]') : event.target.parentElement;
        if (nodeElement.previousElementSibling) {
            this.focusRowChange(nodeElement, nodeElement.previousElementSibling, this.findLastVisibleDescendant(nodeElement.previousElementSibling));
        }
        else {
            let parentNodeElement = this.getParentNodeElement(nodeElement);
            if (parentNodeElement) {
                this.focusRowChange(nodeElement, parentNodeElement);
            }
        }
        event.preventDefault();
    }
    onArrowDown(event) {
        const nodeElement = event.target.getAttribute('data-pc-section') === 'toggler' ? event.target.closest('[role="treeitem"]') : event.target;
        const listElement = nodeElement.children[1];
        if (listElement && listElement.children.length > 0) {
            this.focusRowChange(nodeElement, listElement.children[0]);
        }
        else {
            if (nodeElement.parentElement.nextElementSibling) {
                this.focusRowChange(nodeElement, nodeElement.parentElement.nextElementSibling);
            }
            else {
                let nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement.parentElement);
                if (nextSiblingAncestor) {
                    this.focusRowChange(nodeElement, nextSiblingAncestor);
                }
            }
        }
        event.preventDefault();
    }
    onArrowRight(event) {
        if (!this.node?.expanded && !this.tree.isNodeLeaf(this.node)) {
            this.expand(event);
            event.currentTarget.tabIndex = -1;
            setTimeout(() => {
                this.onArrowDown(event);
            }, 1);
        }
        event.preventDefault();
    }
    onArrowLeft(event) {
        const nodeElement = event.target.getAttribute('data-pc-section') === 'toggler' ? event.target.closest('[role="treeitem"]') : event.target;
        if (this.level === 0 && !this.node?.expanded) {
            return false;
        }
        if (this.node?.expanded) {
            this.collapse(event);
            return;
        }
        let parentNodeElement = this.getParentNodeElement(nodeElement.parentElement);
        if (parentNodeElement) {
            this.focusRowChange(event.currentTarget, parentNodeElement);
        }
        event.preventDefault();
    }
    isActionableElement(event) {
        const target = event.target;
        const isActionable = target instanceof HTMLElement && (target.nodeName == 'A' || target.nodeName == 'BUTTON');
        return isActionable;
    }
    onEnter(event) {
        this.tree.onNodeClick(event, this.node);
        this.setTabIndexForSelectionMode(event, this.tree.nodeTouched);
        if (!this.isActionableElement(event)) {
            event.preventDefault();
        }
    }
    setAllNodesTabIndexes() {
        const nodes = DomHandler.find(this.tree.el.nativeElement, '.p-treenode');
        const hasSelectedNode = [...nodes].some((node) => node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true');
        [...nodes].forEach((node) => {
            node.tabIndex = -1;
        });
        if (hasSelectedNode) {
            const selectedNodes = [...nodes].filter((node) => node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true');
            selectedNodes[0].tabIndex = 0;
            return;
        }
        [...nodes][0].tabIndex = 0;
    }
    setTabIndexForSelectionMode(event, nodeTouched) {
        if (this.tree.selectionMode !== null) {
            const elements = [...DomHandler.find(this.tree.el.nativeElement, '.p-treenode')];
            event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;
            if (elements.every((element) => element.tabIndex === -1)) {
                elements[0].tabIndex = 0;
            }
        }
    }
    findNextSiblingOfAncestor(nodeElement) {
        let parentNodeElement = this.getParentNodeElement(nodeElement);
        if (parentNodeElement) {
            if (parentNodeElement.nextElementSibling)
                return parentNodeElement.nextElementSibling;
            else
                return this.findNextSiblingOfAncestor(parentNodeElement);
        }
        else {
            return null;
        }
    }
    findLastVisibleDescendant(nodeElement) {
        const listElement = Array.from(nodeElement.children).find((el) => DomHandler.hasClass(el, 'p-treenode'));
        const childrenListElement = listElement.children[1];
        if (childrenListElement && childrenListElement.children.length > 0) {
            const lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
            return this.findLastVisibleDescendant(lastChildElement);
        }
        else {
            return nodeElement;
        }
    }
    getParentNodeElement(nodeElement) {
        const parentNodeElement = nodeElement.parentElement?.parentElement?.parentElement;
        return parentNodeElement?.tagName === 'P-TREENODE' ? parentNodeElement : null;
    }
    focusNode(element) {
        if (this.tree.droppableNodes)
            element.children[1].focus();
        else
            element.children[0].focus();
    }
    focusRowChange(firstFocusableRow, currentFocusedRow, lastVisibleDescendant) {
        firstFocusableRow.tabIndex = '-1';
        currentFocusedRow.children[0].tabIndex = '0';
        this.focusNode(lastVisibleDescendant || currentFocusedRow);
    }
    focusVirtualNode() {
        this.timeout = setTimeout(() => {
            let node = DomHandler.findSingle(document.body, `[data-id="${this.node?.key ?? this.node?.data}"]`);
            DomHandler.focus(node);
        }, 1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: UITreeNode, deps: [{ token: forwardRef(() => Tree) }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: UITreeNode, selector: "p-treeNode", inputs: { rowNode: "rowNode", node: "node", parentNode: "parentNode", root: ["root", "root", booleanAttribute], index: ["index", "index", numberAttribute], firstChild: ["firstChild", "firstChild", booleanAttribute], lastChild: ["lastChild", "lastChild", booleanAttribute], level: ["level", "level", numberAttribute], indentation: ["indentation", "indentation", numberAttribute], itemSize: ["itemSize", "itemSize", numberAttribute], loadingMode: "loadingMode" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <ng-template [ngIf]="node">
            <li
                *ngIf="tree.droppableNodes"
                class="p-treenode-droppoint"
                [attr.aria-hidden]="true"
                [ngClass]="{ 'p-treenode-droppoint-active': draghoverPrev }"
                (drop)="onDropPoint($event, -1)"
                (dragover)="onDropPointDragOver($event)"
                (dragenter)="onDropPointDragEnter($event, -1)"
                (dragleave)="onDropPointDragLeave($event)"
            ></li>
            <li
                *ngIf="!tree.horizontal"
                [ngClass]="['p-treenode', node.styleClass || '', isLeaf() ? 'p-treenode-leaf' : '']"
                [ngStyle]="{ height: itemSize + 'px' }"
                [style]="node.style"
                [attr.aria-label]="node.label"
                [attr.aria-checked]="ariaChecked"
                [attr.aria-setsize]="node.children ? node.children.length : 0"
                [attr.aria-selected]="ariaSelected"
                [attr.aria-expanded]="node.expanded"
                [attr.aria-posinset]="index + 1"
                [attr.aria-level]="level + 1"
                [attr.tabindex]="index === 0 ? 0 : -1"
                [attr.data-id]="node.key"
                role="treeitem"
                (keydown)="onKeyDown($event)"
            >
                <div
                    class="p-treenode-content"
                    [ngStyle]="{
                        'padding-left': level * indentation + 'rem'
                    }"
                    (click)="onNodeClick($event)"
                    (contextmenu)="onNodeRightClick($event)"
                    (touchend)="onNodeTouchEnd()"
                    (drop)="onDropNode($event)"
                    (dragover)="onDropNodeDragOver($event)"
                    (dragenter)="onDropNodeDragEnter($event)"
                    (dragleave)="onDropNodeDragLeave($event)"
                    [draggable]="tree.draggableNodes"
                    (dragstart)="onDragStart($event)"
                    (dragend)="onDragStop($event)"
                    [ngClass]="{ 'p-treenode-selectable': tree.selectionMode && node.selectable !== false, 'p-treenode-dragover': draghoverNode, 'p-highlight': isSelected() }"
                >
                    <button type="button" [attr.data-pc-section]="'toggler'" class="p-tree-toggler p-link" (click)="toggle($event)" pRipple tabindex="-1">
                        <ng-container *ngIf="!tree.togglerIconTemplate">
                            <ng-container *ngIf="!node.loading">
                                <ChevronRightIcon *ngIf="!node.expanded" [styleClass]="'p-tree-toggler-icon'" />
                                <ChevronDownIcon *ngIf="node.expanded" [styleClass]="'p-tree-toggler-icon'" />
                            </ng-container>
                            <ng-container *ngIf="loadingMode === 'icon' && node.loading">
                                <SpinnerIcon [spin]="true" [styleClass]="'p-tree-node-toggler-icon'" />
                            </ng-container>
                        </ng-container>
                        <span *ngIf="tree.togglerIconTemplate" class="p-tree-toggler-icon">
                            <ng-template *ngTemplateOutlet="tree.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                        </span>
                    </button>
                    <div
                        class="p-checkbox p-component"
                        [ngClass]="{ 'p-checkbox-disabled p-disabled': node.selectable === false, 'p-variant-filled': tree?.config.inputStyle() === 'filled' }"
                        *ngIf="tree.selectionMode == 'checkbox'"
                        aria-hidden="true"
                    >
                        <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': isSelected(), 'p-indeterminate': node.partialSelected }" role="checkbox">
                            <ng-container *ngIf="!tree.checkboxIconTemplate">
                                <CheckIcon *ngIf="!node.partialSelected && isSelected()" [styleClass]="'p-checkbox-icon'" />
                                <MinusIcon *ngIf="node.partialSelected" [styleClass]="'p-checkbox-icon'" />
                            </ng-container>
                            <ng-template *ngTemplateOutlet="tree.checkboxIconTemplate; context: { $implicit: isSelected(), partialSelected: node.partialSelected }"></ng-template>
                        </div>
                    </div>
                    <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon"></span>
                    <span class="p-treenode-label">
                        <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                        <span *ngIf="tree.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                        </span>
                    </span>
                </div>
                <ul
                    class="p-treenode-children"
                    [ngStyle]="{
                        display: node.expanded ? 'block' : 'none'
                    }"
                    *ngIf="!tree.virtualScroll && node.children && node.expanded"
                    role="group"
                >
                    <p-treeNode
                        *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; let index = index; trackBy: tree.trackBy"
                        [node]="childNode"
                        [parentNode]="node"
                        [firstChild]="firstChild"
                        [lastChild]="lastChild"
                        [index]="index"
                        [itemSize]="itemSize"
                        [level]="level + 1"
                        [loadingMode]="loadingMode"
                    ></p-treeNode>
                </ul>
            </li>

            <li
                *ngIf="tree.droppableNodes && lastChild"
                class="p-treenode-droppoint"
                [ngClass]="{ 'p-treenode-droppoint-active': draghoverNext }"
                (drop)="onDropPoint($event, 1)"
                [attr.aria-hidden]="true"
                (dragover)="onDropPointDragOver($event)"
                (dragenter)="onDropPointDragEnter($event, 1)"
                (dragleave)="onDropPointDragLeave($event)"
            ></li>

            <table *ngIf="tree.horizontal" [class]="node.styleClass">
                <tbody>
                    <tr>
                        <td class="p-treenode-connector" *ngIf="!root">
                            <table class="p-treenode-connector-table">
                                <tbody>
                                    <tr>
                                        <td [ngClass]="{ 'p-treenode-connector-line': !firstChild }"></td>
                                    </tr>
                                    <tr>
                                        <td [ngClass]="{ 'p-treenode-connector-line': !lastChild }"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="p-treenode" [ngClass]="{ 'p-treenode-collapsed': !node.expanded }">
                            <div
                                class="p-treenode-content"
                                tabindex="0"
                                [ngClass]="{ 'p-treenode-selectable': tree.selectionMode, 'p-highlight': isSelected() }"
                                (click)="onNodeClick($event)"
                                (contextmenu)="onNodeRightClick($event)"
                                (touchend)="onNodeTouchEnd()"
                                (keydown)="onNodeKeydown($event)"
                            >
                                <span *ngIf="!isLeaf()" [ngClass]="'p-tree-toggler'" (click)="toggle($event)">
                                    <ng-container *ngIf="!tree.togglerIconTemplate">
                                        <PlusIcon *ngIf="!node.expanded" [styleClass]="'p-tree-toggler-icon'" [ariaLabel]="tree.togglerAriaLabel" />
                                        <MinusIcon *ngIf="node.expanded" [styleClass]="'p-tree-toggler-icon'" [ariaLabel]="tree.togglerAriaLabel" />
                                    </ng-container>
                                    <span *ngIf="tree.togglerIconTemplate" class="p-tree-toggler-icon">
                                        <ng-template *ngTemplateOutlet="tree.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                                    </span>
                                </span>
                                <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon"></span>
                                <span class="p-treenode-label">
                                    <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                                    <span *ngIf="tree.getTemplateForNode(node)">
                                        <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                                    </span>
                                </span>
                            </div>
                        </td>
                        <td
                            class="p-treenode-children-container"
                            *ngIf="node.children && node.expanded"
                            [ngStyle]="{
                                display: node.expanded ? 'table-cell' : 'none'
                            }"
                        >
                            <div class="p-treenode-children">
                                <p-treeNode *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; trackBy: tree.trackBy" [node]="childNode" [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronDownIcon), selector: "ChevronDownIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(() => MinusIcon), selector: "MinusIcon" }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }, { kind: "component", type: i0.forwardRef(() => PlusIcon), selector: "PlusIcon" }, { kind: "component", type: i0.forwardRef(() => UITreeNode), selector: "p-treeNode", inputs: ["rowNode", "node", "parentNode", "root", "index", "firstChild", "lastChild", "level", "indentation", "itemSize", "loadingMode"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: UITreeNode, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-treeNode',
                    template: `
        <ng-template [ngIf]="node">
            <li
                *ngIf="tree.droppableNodes"
                class="p-treenode-droppoint"
                [attr.aria-hidden]="true"
                [ngClass]="{ 'p-treenode-droppoint-active': draghoverPrev }"
                (drop)="onDropPoint($event, -1)"
                (dragover)="onDropPointDragOver($event)"
                (dragenter)="onDropPointDragEnter($event, -1)"
                (dragleave)="onDropPointDragLeave($event)"
            ></li>
            <li
                *ngIf="!tree.horizontal"
                [ngClass]="['p-treenode', node.styleClass || '', isLeaf() ? 'p-treenode-leaf' : '']"
                [ngStyle]="{ height: itemSize + 'px' }"
                [style]="node.style"
                [attr.aria-label]="node.label"
                [attr.aria-checked]="ariaChecked"
                [attr.aria-setsize]="node.children ? node.children.length : 0"
                [attr.aria-selected]="ariaSelected"
                [attr.aria-expanded]="node.expanded"
                [attr.aria-posinset]="index + 1"
                [attr.aria-level]="level + 1"
                [attr.tabindex]="index === 0 ? 0 : -1"
                [attr.data-id]="node.key"
                role="treeitem"
                (keydown)="onKeyDown($event)"
            >
                <div
                    class="p-treenode-content"
                    [ngStyle]="{
                        'padding-left': level * indentation + 'rem'
                    }"
                    (click)="onNodeClick($event)"
                    (contextmenu)="onNodeRightClick($event)"
                    (touchend)="onNodeTouchEnd()"
                    (drop)="onDropNode($event)"
                    (dragover)="onDropNodeDragOver($event)"
                    (dragenter)="onDropNodeDragEnter($event)"
                    (dragleave)="onDropNodeDragLeave($event)"
                    [draggable]="tree.draggableNodes"
                    (dragstart)="onDragStart($event)"
                    (dragend)="onDragStop($event)"
                    [ngClass]="{ 'p-treenode-selectable': tree.selectionMode && node.selectable !== false, 'p-treenode-dragover': draghoverNode, 'p-highlight': isSelected() }"
                >
                    <button type="button" [attr.data-pc-section]="'toggler'" class="p-tree-toggler p-link" (click)="toggle($event)" pRipple tabindex="-1">
                        <ng-container *ngIf="!tree.togglerIconTemplate">
                            <ng-container *ngIf="!node.loading">
                                <ChevronRightIcon *ngIf="!node.expanded" [styleClass]="'p-tree-toggler-icon'" />
                                <ChevronDownIcon *ngIf="node.expanded" [styleClass]="'p-tree-toggler-icon'" />
                            </ng-container>
                            <ng-container *ngIf="loadingMode === 'icon' && node.loading">
                                <SpinnerIcon [spin]="true" [styleClass]="'p-tree-node-toggler-icon'" />
                            </ng-container>
                        </ng-container>
                        <span *ngIf="tree.togglerIconTemplate" class="p-tree-toggler-icon">
                            <ng-template *ngTemplateOutlet="tree.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                        </span>
                    </button>
                    <div
                        class="p-checkbox p-component"
                        [ngClass]="{ 'p-checkbox-disabled p-disabled': node.selectable === false, 'p-variant-filled': tree?.config.inputStyle() === 'filled' }"
                        *ngIf="tree.selectionMode == 'checkbox'"
                        aria-hidden="true"
                    >
                        <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': isSelected(), 'p-indeterminate': node.partialSelected }" role="checkbox">
                            <ng-container *ngIf="!tree.checkboxIconTemplate">
                                <CheckIcon *ngIf="!node.partialSelected && isSelected()" [styleClass]="'p-checkbox-icon'" />
                                <MinusIcon *ngIf="node.partialSelected" [styleClass]="'p-checkbox-icon'" />
                            </ng-container>
                            <ng-template *ngTemplateOutlet="tree.checkboxIconTemplate; context: { $implicit: isSelected(), partialSelected: node.partialSelected }"></ng-template>
                        </div>
                    </div>
                    <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon"></span>
                    <span class="p-treenode-label">
                        <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                        <span *ngIf="tree.getTemplateForNode(node)">
                            <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                        </span>
                    </span>
                </div>
                <ul
                    class="p-treenode-children"
                    [ngStyle]="{
                        display: node.expanded ? 'block' : 'none'
                    }"
                    *ngIf="!tree.virtualScroll && node.children && node.expanded"
                    role="group"
                >
                    <p-treeNode
                        *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; let index = index; trackBy: tree.trackBy"
                        [node]="childNode"
                        [parentNode]="node"
                        [firstChild]="firstChild"
                        [lastChild]="lastChild"
                        [index]="index"
                        [itemSize]="itemSize"
                        [level]="level + 1"
                        [loadingMode]="loadingMode"
                    ></p-treeNode>
                </ul>
            </li>

            <li
                *ngIf="tree.droppableNodes && lastChild"
                class="p-treenode-droppoint"
                [ngClass]="{ 'p-treenode-droppoint-active': draghoverNext }"
                (drop)="onDropPoint($event, 1)"
                [attr.aria-hidden]="true"
                (dragover)="onDropPointDragOver($event)"
                (dragenter)="onDropPointDragEnter($event, 1)"
                (dragleave)="onDropPointDragLeave($event)"
            ></li>

            <table *ngIf="tree.horizontal" [class]="node.styleClass">
                <tbody>
                    <tr>
                        <td class="p-treenode-connector" *ngIf="!root">
                            <table class="p-treenode-connector-table">
                                <tbody>
                                    <tr>
                                        <td [ngClass]="{ 'p-treenode-connector-line': !firstChild }"></td>
                                    </tr>
                                    <tr>
                                        <td [ngClass]="{ 'p-treenode-connector-line': !lastChild }"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="p-treenode" [ngClass]="{ 'p-treenode-collapsed': !node.expanded }">
                            <div
                                class="p-treenode-content"
                                tabindex="0"
                                [ngClass]="{ 'p-treenode-selectable': tree.selectionMode, 'p-highlight': isSelected() }"
                                (click)="onNodeClick($event)"
                                (contextmenu)="onNodeRightClick($event)"
                                (touchend)="onNodeTouchEnd()"
                                (keydown)="onNodeKeydown($event)"
                            >
                                <span *ngIf="!isLeaf()" [ngClass]="'p-tree-toggler'" (click)="toggle($event)">
                                    <ng-container *ngIf="!tree.togglerIconTemplate">
                                        <PlusIcon *ngIf="!node.expanded" [styleClass]="'p-tree-toggler-icon'" [ariaLabel]="tree.togglerAriaLabel" />
                                        <MinusIcon *ngIf="node.expanded" [styleClass]="'p-tree-toggler-icon'" [ariaLabel]="tree.togglerAriaLabel" />
                                    </ng-container>
                                    <span *ngIf="tree.togglerIconTemplate" class="p-tree-toggler-icon">
                                        <ng-template *ngTemplateOutlet="tree.togglerIconTemplate; context: { $implicit: node.expanded }"></ng-template>
                                    </span>
                                </span>
                                <span [class]="getIcon()" *ngIf="node.icon || node.expandedIcon || node.collapsedIcon"></span>
                                <span class="p-treenode-label">
                                    <span *ngIf="!tree.getTemplateForNode(node)">{{ node.label }}</span>
                                    <span *ngIf="tree.getTemplateForNode(node)">
                                        <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: { $implicit: node }"></ng-container>
                                    </span>
                                </span>
                            </div>
                        </td>
                        <td
                            class="p-treenode-children-container"
                            *ngIf="node.children && node.expanded"
                            [ngStyle]="{
                                display: node.expanded ? 'table-cell' : 'none'
                            }"
                        >
                            <div class="p-treenode-children">
                                <p-treeNode *ngFor="let childNode of node.children; let firstChild = first; let lastChild = last; trackBy: tree.trackBy" [node]="childNode" [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Tree, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => Tree)]
                }] }], propDecorators: { rowNode: [{
                type: Input
            }], node: [{
                type: Input
            }], parentNode: [{
                type: Input
            }], root: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], index: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], firstChild: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], lastChild: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], level: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], indentation: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], itemSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], loadingMode: [{
                type: Input
            }] } });
/**
 * Tree is used to display hierarchical data.
 * @group Components
 */
export class Tree {
    el;
    dragDropService;
    config;
    cd;
    /**
     * An array of treenodes.
     * @group Props
     */
    value;
    /**
     * Defines the selection mode.
     * @group Props
     */
    selectionMode;
    /**
     * Loading mode display.
     * @group Props
     */
    loadingMode = 'mask';
    /**
     * A single treenode instance or an array to refer to the selections.
     * @group Props
     */
    selection;
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
     * Context menu instance.
     * @group Props
     */
    contextMenu;
    /**
     * Defines the orientation of the tree, valid values are 'vertical' and 'horizontal'.
     * @group Props
     */
    layout = 'vertical';
    /**
     * Scope of the draggable nodes to match a droppableScope.
     * @group Props
     */
    draggableScope;
    /**
     * Scope of the droppable nodes to match a draggableScope.
     * @group Props
     */
    droppableScope;
    /**
     * Whether the nodes are draggable.
     * @group Props
     */
    draggableNodes;
    /**
     * Whether the nodes are droppable.
     * @group Props
     */
    droppableNodes;
    /**
     * Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = false;
    /**
     * Whether checkbox selections propagate to ancestor nodes.
     * @group Props
     */
    propagateSelectionUp = true;
    /**
     * Whether checkbox selections propagate to descendant nodes.
     * @group Props
     */
    propagateSelectionDown = true;
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    loading;
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    loadingIcon;
    /**
     * Text to display when there is no data.
     * @group Props
     */
    emptyMessage = '';
    /**
     * Used to define a string that labels the tree.
     * @group Props
     */
    ariaLabel;
    /**
     * Defines a string that labels the toggler icon for accessibility.
     * @group Props
     */
    togglerAriaLabel;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * When enabled, drop can be accepted or rejected based on condition defined at onNodeDrop.
     * @group Props
     */
    validateDrop;
    /**
     * When specified, displays an input field to filter the items.
     * @group Props
     */
    filter;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy = 'label';
    /**
     * Mode for filtering valid values are "lenient" and "strict". Default is lenient.
     * @group Props
     */
    filterMode = 'lenient';
    /**
     * Placeholder text to show when filter input is empty.
     * @group Props
     */
    filterPlaceholder;
    /**
     * Values after the tree nodes are filtered.
     * @group Props
     */
    filteredNodes;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Height of the scrollable viewport.
     * @group Props
     */
    scrollHeight;
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
     * Indentation factor for spacing of the nested node when virtual scrolling is enabled.
     * @group Props
     */
    indentation = 1.5;
    /**
     * Custom templates of the component.
     * @group Props
     */
    _templateMap;
    /**
     * Function to optimize the node list rendering, default algorithm checks for object identity.
     * @group Props
     */
    trackBy = (index, item) => item;
    /**
     * Height of the node.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    _virtualNodeHeight;
    get virtualNodeHeight() {
        return this._virtualNodeHeight;
    }
    set virtualNodeHeight(val) {
        this._virtualNodeHeight = val;
        console.warn('The virtualNodeHeight property is deprecated, use virtualScrollItemSize property instead.');
    }
    /**
     * Callback to invoke on selection change.
     * @param {(TreeNode<any> | TreeNode<any>[] | null)} event - Custom selection change event.
     * @group Emits
     */
    selectionChange = new EventEmitter();
    /**
     * Callback to invoke when a node is selected.
     * @param {TreeNodeSelectEvent} event - Node select event.
     * @group Emits
     */
    onNodeSelect = new EventEmitter();
    /**
     * Callback to invoke when a node is unselected.
     * @param {TreeNodeUnSelectEvent} event - Node unselect event.
     * @group Emits
     */
    onNodeUnselect = new EventEmitter();
    /**
     * Callback to invoke when a node is expanded.
     * @param {TreeNodeExpandEvent} event - Node expand event.
     * @group Emits
     */
    onNodeExpand = new EventEmitter();
    /**
     * Callback to invoke when a node is collapsed.
     * @param {TreeNodeCollapseEvent} event - Node collapse event.
     * @group Emits
     */
    onNodeCollapse = new EventEmitter();
    /**
     * Callback to invoke when a node is selected with right click.
     * @param {onNodeContextMenuSelect} event - Node context menu select event.
     * @group Emits
     */
    onNodeContextMenuSelect = new EventEmitter();
    /**
     * Callback to invoke when a node is dropped.
     * @param {TreeNodeDropEvent} event - Node drop event.
     * @group Emits
     */
    onNodeDrop = new EventEmitter();
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {TreeLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    /**
     * Callback to invoke in virtual scroll mode when scroll position changes.
     * @param {TreeScrollEvent} event - Custom scroll event.
     * @group Emits
     */
    onScroll = new EventEmitter();
    /**
     * Callback to invoke in virtual scroll mode when scroll position and item's range in view changes.
     * @param {TreeScrollIndexChangeEvent} event - Scroll index change event.
     * @group Emits
     */
    onScrollIndexChange = new EventEmitter();
    /**
     * Callback to invoke when data is filtered.
     * @param {TreeFilterEvent} event - Custom filter event.
     * @group Emits
     */
    onFilter = new EventEmitter();
    templates;
    filterViewChild;
    scroller;
    wrapperViewChild;
    serializedValue;
    headerTemplate;
    footerTemplate;
    loaderTemplate;
    emptyMessageTemplate;
    togglerIconTemplate;
    checkboxIconTemplate;
    loadingIconTemplate;
    filterIconTemplate;
    nodeTouched;
    dragNodeTree;
    dragNode;
    dragNodeSubNodes;
    dragNodeIndex;
    dragNodeScope;
    dragHover;
    dragStartSubscription;
    dragStopSubscription;
    constructor(el, dragDropService, config, cd) {
        this.el = el;
        this.dragDropService = dragDropService;
        this.config = config;
        this.cd = cd;
    }
    ngOnInit() {
        if (this.droppableNodes) {
            this.dragStartSubscription = this.dragDropService.dragStart$.subscribe((event) => {
                this.dragNodeTree = event.tree;
                this.dragNode = event.node;
                this.dragNodeSubNodes = event.subNodes;
                this.dragNodeIndex = event.index;
                this.dragNodeScope = event.scope;
            });
            this.dragStopSubscription = this.dragDropService.dragStop$.subscribe((event) => {
                this.dragNodeTree = null;
                this.dragNode = null;
                this.dragNodeSubNodes = null;
                this.dragNodeIndex = null;
                this.dragNodeScope = null;
                this.dragHover = false;
            });
        }
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.value) {
            this.updateSerializedValue();
            if (this.hasFilterActive()) {
                this._filter(this.filterViewChild.nativeElement.value);
            }
        }
    }
    get horizontal() {
        return this.layout == 'horizontal';
    }
    get emptyMessageLabel() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    ngAfterContentInit() {
        if (this.templates.length) {
            this._templateMap = {};
        }
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyMessageTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'loader':
                    this.loaderTemplate = item.template;
                    break;
                case 'togglericon':
                    this.togglerIconTemplate = item.template;
                    break;
                case 'checkboxicon':
                    this.checkboxIconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;
                default:
                    this._templateMap[item.name] = item.template;
                    break;
            }
        });
    }
    updateSerializedValue() {
        this.serializedValue = [];
        this.serializeNodes(null, this.getRootNode(), 0, true);
    }
    serializeNodes(parent, nodes, level, visible) {
        if (nodes && nodes.length) {
            nodes.forEach((node, index) => {
                node.parent = parent;
                const rowNode = {
                    node: node,
                    parent: parent,
                    level: level,
                    visible: visible && (parent ? parent.expanded : true),
                    lastChild: index === nodes.length - 1,
                    index: index
                };
                this.serializedValue.push(rowNode);
                if (rowNode.visible && node.expanded) {
                    this.serializeNodes(node, node.children, level + 1, rowNode.visible);
                }
            });
        }
    }
    onNodeClick(event, node) {
        let eventTarget = event.target;
        if (DomHandler.hasClass(eventTarget, 'p-tree-toggler') || DomHandler.hasClass(eventTarget, 'p-tree-toggler-icon')) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                node.style = '--p-focus-ring-color: none;';
                return;
            }
            else {
                node.style = '--p-focus-ring-color: var(--primary-color)';
            }
            if (this.hasFilteredNodes()) {
                node = this.getNodeWithKey(node.key, this.filteredNodes);
                if (!node) {
                    return;
                }
            }
            let index = this.findIndexInSelection(node);
            let selected = index >= 0;
            if (this.isCheckboxSelectionMode()) {
                if (selected) {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, false);
                    else
                        this.selection = this.selection.filter((val, i) => i != index);
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, false);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, true);
                    else
                        this.selection = [...(this.selection || []), node];
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, true);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else {
                let metaSelection = this.nodeTouched ? false : this.metaKeySelection;
                if (metaSelection) {
                    let metaKey = event.metaKey || event.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(null);
                        }
                        else {
                            this.selection = this.selection.filter((val, i) => i != index);
                            this.selectionChange.emit(this.selection);
                        }
                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(node);
                        }
                        else if (this.isMultipleSelectionMode()) {
                            this.selection = !metaKey ? [] : this.selection || [];
                            this.selection = [...this.selection, node];
                            this.selectionChange.emit(this.selection);
                        }
                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                }
                else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this.selection = null;
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = node;
                            setTimeout(() => {
                                this.onNodeSelect.emit({ originalEvent: event, node: node });
                            });
                        }
                    }
                    else {
                        if (selected) {
                            this.selection = this.selection.filter((val, i) => i != index);
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = [...(this.selection || []), node];
                            setTimeout(() => {
                                this.onNodeSelect.emit({ originalEvent: event, node: node });
                            });
                        }
                    }
                    this.selectionChange.emit(this.selection);
                }
            }
        }
        this.nodeTouched = false;
    }
    onNodeTouchEnd() {
        this.nodeTouched = true;
    }
    onNodeRightClick(event, node) {
        if (this.contextMenu) {
            let eventTarget = event.target;
            let className = eventTarget.getAttribute('class');
            if (className && className.includes('p-tree-toggler')) {
                return;
            }
            else {
                let index = this.findIndexInSelection(node);
                let selected = index >= 0;
                if (!selected) {
                    if (this.isSingleSelectionMode())
                        this.selectionChange.emit(node);
                    else
                        this.selectionChange.emit([node]);
                }
                this.contextMenu.show(event);
                this.onNodeContextMenuSelect.emit({ originalEvent: event, node: node });
            }
        }
    }
    findIndexInSelection(node) {
        if (this.selectionMode && this.selection) {
            const selection = this.isSingleSelectionMode() ? [this.selection] : this.selection;
            return selection.findIndex((selectedNode) => selectedNode === node || (selectedNode.key === node.key && selectedNode.key !== undefined));
        }
        return -1;
    }
    syncNodeOption(node, parentNodes, option, value) {
        // to synchronize the node option between the filtered nodes and the original nodes(this.value)
        const _node = this.hasFilteredNodes() ? this.getNodeWithKey(node.key, parentNodes) : null;
        if (_node) {
            _node[option] = value || node[option];
        }
    }
    hasFilteredNodes() {
        return this.filter && this.filteredNodes && this.filteredNodes.length;
    }
    hasFilterActive() {
        return this.filter && this.filterViewChild?.nativeElement?.value.length > 0;
    }
    getNodeWithKey(key, nodes) {
        for (let node of nodes) {
            if (node.key === key) {
                return node;
            }
            if (node.children) {
                let matchedNode = this.getNodeWithKey(key, node.children);
                if (matchedNode) {
                    return matchedNode;
                }
            }
        }
    }
    propagateUp(node, select) {
        if (node.children && node.children.length) {
            let selectedCount = 0;
            let childPartialSelected = false;
            for (let child of node.children) {
                if (this.isSelected(child)) {
                    selectedCount++;
                }
                else if (child.partialSelected) {
                    childPartialSelected = true;
                }
            }
            if (select && selectedCount == node.children.length) {
                this.selection = [...(this.selection || []), node];
                node.partialSelected = false;
            }
            else {
                if (!select) {
                    let index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this.selection = this.selection.filter((val, i) => i != index);
                    }
                }
                if (childPartialSelected || (selectedCount > 0 && selectedCount != node.children.length))
                    node.partialSelected = true;
                else
                    node.partialSelected = false;
            }
            this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        }
        let parent = node.parent;
        if (parent) {
            this.propagateUp(parent, select);
        }
    }
    propagateDown(node, select) {
        let index = this.findIndexInSelection(node);
        if (select && index == -1 && node.selectable !== false) {
            this.selection = [...(this.selection || []), this.filterUnselectableChildren(node)];
        }
        else if (!select && index > -1) {
            this.selection = this.selection.filter((val, i) => i != index);
        }
        node.partialSelected = false;
        this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateDown(child, select);
            }
        }
    }
    filterUnselectableChildren(node) {
        let clonedNode = Object.assign({}, node);
        if (clonedNode.children && clonedNode.children.length) {
            for (let child of clonedNode.children) {
                if (child.selectable === false) {
                    clonedNode.children = clonedNode.children.filter((val) => val != child);
                }
                child = this.filterUnselectableChildren(child);
            }
        }
        return clonedNode;
    }
    isSelected(node) {
        return this.findIndexInSelection(node) != -1;
    }
    isSingleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'single';
    }
    isMultipleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'multiple';
    }
    isCheckboxSelectionMode() {
        return this.selectionMode && this.selectionMode == 'checkbox';
    }
    isNodeLeaf(node) {
        return node.leaf == false ? false : !(node.children && node.children.length);
    }
    getRootNode() {
        return this.filteredNodes ? this.filteredNodes : this.value;
    }
    getTemplateForNode(node) {
        if (this._templateMap)
            return node.type ? this._templateMap[node.type] : this._templateMap['default'];
        else
            return null;
    }
    onDragOver(event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.dataTransfer.dropEffect = 'move';
            event.preventDefault();
        }
    }
    onDrop(event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.preventDefault();
            let dragNode = this.dragNode;
            if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
                let dragNodeIndex = this.dragNodeIndex;
                this.value = this.value || [];
                if (this.validateDrop) {
                    this.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: null,
                        index: dragNodeIndex,
                        accept: () => {
                            this.processTreeDrop(dragNode, dragNodeIndex);
                        }
                    });
                }
                else {
                    this.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: null,
                        index: dragNodeIndex
                    });
                    this.processTreeDrop(dragNode, dragNodeIndex);
                }
            }
        }
    }
    processTreeDrop(dragNode, dragNodeIndex) {
        this.dragNodeSubNodes.splice(dragNodeIndex, 1);
        this.value.push(dragNode);
        this.dragDropService.stopDrag({
            node: dragNode
        });
    }
    onDragEnter() {
        if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
            this.dragHover = true;
        }
    }
    onDragLeave(event) {
        if (this.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
                this.dragHover = false;
            }
        }
    }
    allowDrop(dragNode, dropNode, dragNodeScope, dropPoint = 'node') {
        if (!dragNode) {
            //prevent random html elements to be dragged
            return false;
        }
        else if (this.isValidDragScope(dragNodeScope)) {
            let allow = true;
            if (dropNode) {
                if (dragNode === dropNode) {
                    allow = false;
                }
                else {
                    let parent = dropNode.parent;
                    while (parent != null) {
                        if (parent === dragNode) {
                            allow = false;
                            break;
                        }
                        parent = parent.parent;
                    }
                }
            }
            return allow;
        }
        else {
            return false;
        }
    }
    isValidDragScope(dragScope) {
        let dropScope = this.droppableScope;
        if (dropScope) {
            if (typeof dropScope === 'string') {
                if (typeof dragScope === 'string')
                    return dropScope === dragScope;
                else if (Array.isArray(dragScope))
                    return dragScope.indexOf(dropScope) != -1;
            }
            else if (Array.isArray(dropScope)) {
                if (typeof dragScope === 'string') {
                    return dropScope.indexOf(dragScope) != -1;
                }
                else if (Array.isArray(dragScope)) {
                    for (let s of dropScope) {
                        for (let ds of dragScope) {
                            if (s === ds) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    }
    _filter(value) {
        let filterValue = value;
        if (filterValue === '') {
            this.filteredNodes = null;
        }
        else {
            this.filteredNodes = [];
            const searchFields = this.filterBy.split(',');
            const filterText = ObjectUtils.removeAccents(filterValue).toLocaleLowerCase(this.filterLocale);
            const isStrictMode = this.filterMode === 'strict';
            for (let node of this.value) {
                let copyNode = { ...node };
                let paramsWithoutNode = { searchFields, filterText, isStrictMode };
                if ((isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                    (!isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))) {
                    this.filteredNodes.push(copyNode);
                }
            }
        }
        this.updateSerializedValue();
        this.onFilter.emit({
            filter: filterValue,
            filteredValue: this.filteredNodes
        });
    }
    /**
     * Resets filter.
     * @group Method
     */
    resetFilter() {
        this.filteredNodes = null;
        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }
    }
    /**
     * Scrolls to virtual index.
     * @param {number} number - Index to be scrolled.
     * @group Method
     */
    scrollToVirtualIndex(index) {
        this.virtualScroll && this.scroller?.scrollToIndex(index);
    }
    /**
     * Scrolls to virtual index.
     * @param {ScrollToOptions} options - Scroll options.
     * @group Method
     */
    scrollTo(options) {
        if (this.virtualScroll) {
            this.scroller?.scrollTo(options);
        }
        else if (this.wrapperViewChild && this.wrapperViewChild.nativeElement) {
            if (this.wrapperViewChild.nativeElement.scrollTo) {
                this.wrapperViewChild.nativeElement.scrollTo(options);
            }
            else {
                this.wrapperViewChild.nativeElement.scrollLeft = options.left;
                this.wrapperViewChild.nativeElement.scrollTop = options.top;
            }
        }
    }
    findFilteredNodes(node, paramsWithoutNode) {
        if (node) {
            let matched = false;
            if (node.children) {
                let childNodes = [...node.children];
                node.children = [];
                for (let childNode of childNodes) {
                    let copyChildNode = { ...childNode };
                    if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                        matched = true;
                        node.children.push(copyChildNode);
                    }
                }
            }
            if (matched) {
                node.expanded = true;
                return true;
            }
        }
    }
    isFilterMatched(node, params) {
        let { searchFields, filterText, isStrictMode } = params;
        let matched = false;
        for (let field of searchFields) {
            let fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(node, field))).toLocaleLowerCase(this.filterLocale);
            if (fieldValue.indexOf(filterText) > -1) {
                matched = true;
            }
        }
        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched = this.findFilteredNodes(node, { searchFields, filterText, isStrictMode }) || matched;
        }
        return matched;
    }
    getIndex(options, index) {
        const getItemOptions = options['getItemOptions'];
        return getItemOptions ? getItemOptions(index).index : index;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    ngOnDestroy() {
        if (this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }
        if (this.dragStopSubscription) {
            this.dragStopSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Tree, deps: [{ token: i0.ElementRef }, { token: i3.TreeDragDropService, optional: true }, { token: i3.PrimeNGConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: Tree, selector: "p-tree", inputs: { value: "value", selectionMode: "selectionMode", loadingMode: "loadingMode", selection: "selection", style: "style", styleClass: "styleClass", contextMenu: "contextMenu", layout: "layout", draggableScope: "draggableScope", droppableScope: "droppableScope", draggableNodes: ["draggableNodes", "draggableNodes", booleanAttribute], droppableNodes: ["droppableNodes", "droppableNodes", booleanAttribute], metaKeySelection: ["metaKeySelection", "metaKeySelection", booleanAttribute], propagateSelectionUp: ["propagateSelectionUp", "propagateSelectionUp", booleanAttribute], propagateSelectionDown: ["propagateSelectionDown", "propagateSelectionDown", booleanAttribute], loading: ["loading", "loading", booleanAttribute], loadingIcon: "loadingIcon", emptyMessage: "emptyMessage", ariaLabel: "ariaLabel", togglerAriaLabel: "togglerAriaLabel", ariaLabelledBy: "ariaLabelledBy", validateDrop: ["validateDrop", "validateDrop", booleanAttribute], filter: ["filter", "filter", booleanAttribute], filterBy: "filterBy", filterMode: "filterMode", filterPlaceholder: "filterPlaceholder", filteredNodes: "filteredNodes", filterLocale: "filterLocale", scrollHeight: "scrollHeight", lazy: ["lazy", "lazy", booleanAttribute], virtualScroll: ["virtualScroll", "virtualScroll", booleanAttribute], virtualScrollItemSize: ["virtualScrollItemSize", "virtualScrollItemSize", numberAttribute], virtualScrollOptions: "virtualScrollOptions", indentation: ["indentation", "indentation", numberAttribute], _templateMap: "_templateMap", trackBy: "trackBy", virtualNodeHeight: "virtualNodeHeight" }, outputs: { selectionChange: "selectionChange", onNodeSelect: "onNodeSelect", onNodeUnselect: "onNodeUnselect", onNodeExpand: "onNodeExpand", onNodeCollapse: "onNodeCollapse", onNodeContextMenuSelect: "onNodeContextMenuSelect", onNodeDrop: "onNodeDrop", onLazyLoad: "onLazyLoad", onScroll: "onScroll", onScrollIndexChange: "onScrollIndexChange", onFilter: "onFilter" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "filterViewChild", first: true, predicate: ["filter"], descendants: true }, { propertyName: "scroller", first: true, predicate: ["scroller"], descendants: true }, { propertyName: "wrapperViewChild", first: true, predicate: ["wrapper"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div
            [ngClass]="{ 'p-tree p-component': true, 'p-tree-selectable': selectionMode, 'p-treenode-dragover': dragHover, 'p-tree-loading': loading, 'p-tree-flex-scrollable': scrollHeight === 'flex' }"
            [ngStyle]="style"
            [class]="styleClass"
            *ngIf="!horizontal"
            (drop)="onDrop($event)"
            (dragover)="onDragOver($event)"
            (dragenter)="onDragEnter()"
            (dragleave)="onDragLeave($event)"
        >
            <div class="p-tree-loading-overlay p-component-overlay" *ngIf="loading && loadingMode === 'mask'">
                <i *ngIf="loadingIcon" [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-tree-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-tree-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <div *ngIf="filter" class="p-tree-filter-container">
                <input #filter type="search" autocomplete="off" class="p-tree-filter p-inputtext p-component" [attr.placeholder]="filterPlaceholder" (keydown.enter)="$event.preventDefault()" (input)="_filter($event.target.value)" />
                <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-tree-filter-icon'" />
                <span *ngIf="filterIconTemplate" class="p-tree-filter-icon">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </div>
            <ng-container *ngIf="getRootNode()?.length">
                <p-scroller
                    #scroller
                    *ngIf="virtualScroll"
                    [items]="serializedValue"
                    [tabindex]="-1"
                    styleClass="p-tree-wrapper"
                    [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                    [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                    [itemSize]="virtualScrollItemSize || _virtualNodeHeight"
                    [lazy]="lazy"
                    (onScroll)="onScroll.emit($event)"
                    (onScrollIndexChange)="onScrollIndexChange.emit($event)"
                    (onLazyLoad)="onLazyLoad.emit($event)"
                    [options]="virtualScrollOptions"
                >
                    <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                        <ul *ngIf="items" class="p-tree-container" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                            <p-treeNode
                                #treeNode
                                *ngFor="let rowNode of items; let firstChild = first; trackBy: trackBy"
                                [level]="rowNode.level"
                                [rowNode]="rowNode"
                                [node]="rowNode.node"
                                [parentNode]="rowNode.parent"
                                [firstChild]="firstChild"
                                [lastChild]="rowNode.lastChild"
                                [index]="rowNode.index"
                                [itemSize]="scrollerOptions.itemSize"
                                [indentation]="indentation"
                                [loadingMode]="loadingMode"
                            ></p-treeNode>
                        </ul>
                    </ng-template>
                    <ng-container *ngIf="loaderTemplate">
                        <ng-template pTemplate="loader" let-scrollerOptions="options">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                        </ng-template>
                    </ng-container>
                </p-scroller>
                <ng-container *ngIf="!virtualScroll">
                    <div #wrapper class="p-tree-wrapper" [ngStyle]="{ 'max-height': scrollHeight }">
                        <ul class="p-tree-container" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                            <p-treeNode
                                *ngFor="let node of getRootNode(); let firstChild = first; let lastChild = last; let index = index; trackBy: trackBy"
                                [node]="node"
                                [firstChild]="firstChild"
                                [lastChild]="lastChild"
                                [index]="index"
                                [level]="0"
                                [loadingMode]="loadingMode"
                            ></p-treeNode>
                        </ul>
                    </div>
                </ng-container>
            </ng-container>

            <div class="p-tree-empty-message" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)">
                <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                    {{ emptyMessageLabel }}
                </ng-container>
                <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
        <div [ngClass]="{ 'p-tree p-tree-horizontal p-component': true, 'p-tree-selectable': selectionMode }" [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <div class="p-tree-loading-mask p-component-overlay" *ngIf="loading">
                <i *ngIf="loadingIcon" [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-tree-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-tree-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <table *ngIf="value && value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
            <div class="p-tree-empty-message" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)">
                <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                    {{ emptyMessageLabel }}
                </ng-container>
                <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-tree-container{margin:0;padding:0;list-style-type:none;overflow:auto}.p-treenode-children{margin:0;padding:0;list-style-type:none}.p-tree-wrapper{overflow:auto}.p-treenode-selectable{cursor:pointer;-webkit-user-select:none;user-select:none}.p-tree-toggler{cursor:pointer;-webkit-user-select:none;user-select:none;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative;flex-shrink:0}.p-treenode-leaf>.p-treenode-content .p-tree-toggler{visibility:hidden}.p-treenode-content{display:flex;align-items:center}.p-tree-filter{width:100%}.p-tree-filter-container{position:relative;display:block;width:100%}.p-tree-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-tree-loading{position:relative;min-height:4rem}.p-tree .p-tree-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}.p-tree-flex-scrollable{display:flex;flex:1;height:100%;flex-direction:column}.p-tree-flex-scrollable .p-tree-wrapper{flex:1}.p-tree .p-treenode-droppoint{height:4px;list-style-type:none}.p-tree .p-treenode-droppoint-active{border:0 none}.p-tree-horizontal{width:auto;padding-left:0;padding-right:0;overflow:auto}.p-tree.p-tree-horizontal table,.p-tree.p-tree-horizontal tr,.p-tree.p-tree-horizontal td{border-collapse:collapse;margin:0;padding:0;vertical-align:middle}.p-tree-horizontal .p-treenode-content{font-weight:400;padding:.4em 1em .4em .2em;display:flex;align-items:center}.p-tree-horizontal .p-treenode-parent .p-treenode-content{font-weight:400;white-space:nowrap}.p-tree.p-tree-horizontal .p-treenode{background:url(data:image/gif;base64,R0lGODlhAQABAIAAALGxsf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAxMC0wMy0xMVQxMDoxNjo0MVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAxMC0wMy0xMVQxMjo0NDoxOVo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9naWY8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PAA6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQABwD/ACwAAAAAAQABAAACAkQBADs=) repeat-x scroll center center transparent;padding:.25rem 2.5rem}.p-tree.p-tree-horizontal .p-treenode.p-treenode-leaf,.p-tree.p-tree-horizontal .p-treenode.p-treenode-collapsed{padding-right:0}.p-tree.p-tree-horizontal .p-treenode-children{padding:0;margin:0}.p-tree.p-tree-horizontal .p-treenode-connector{width:1px}.p-tree.p-tree-horizontal .p-treenode-connector-table{height:100%;width:1px}.p-tree.p-tree-horizontal .p-treenode-connector-line{background:url(data:image/gif;base64,R0lGODlhAQABAIAAALGxsf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAxMC0wMy0xMVQxMDoxNjo0MVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAxMC0wMy0xMVQxMjo0NDoxOVo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9naWY8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PAA6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQABwD/ACwAAAAAAQABAAACAkQBADs=) repeat-y scroll 0 0 transparent;width:1px}.p-tree.p-tree-horizontal table{height:0}.p-scroller .p-tree-container{overflow:visible}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "component", type: i0.forwardRef(() => i4.Scroller), selector: "p-scroller", inputs: ["id", "style", "styleClass", "tabindex", "items", "itemSize", "scrollHeight", "scrollWidth", "orientation", "step", "delay", "resizeDelay", "appendOnly", "inline", "lazy", "disabled", "loaderDisabled", "columns", "showSpacer", "showLoader", "numToleratedItems", "loading", "autoSize", "trackBy", "options"], outputs: ["onLazyLoad", "onScroll", "onScrollIndexChange"] }, { kind: "component", type: i0.forwardRef(() => SearchIcon), selector: "SearchIcon" }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }, { kind: "component", type: i0.forwardRef(() => UITreeNode), selector: "p-treeNode", inputs: ["rowNode", "node", "parentNode", "root", "index", "firstChild", "lastChild", "level", "indentation", "itemSize", "loadingMode"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Tree, decorators: [{
            type: Component,
            args: [{ selector: 'p-tree', template: `
        <div
            [ngClass]="{ 'p-tree p-component': true, 'p-tree-selectable': selectionMode, 'p-treenode-dragover': dragHover, 'p-tree-loading': loading, 'p-tree-flex-scrollable': scrollHeight === 'flex' }"
            [ngStyle]="style"
            [class]="styleClass"
            *ngIf="!horizontal"
            (drop)="onDrop($event)"
            (dragover)="onDragOver($event)"
            (dragenter)="onDragEnter()"
            (dragleave)="onDragLeave($event)"
        >
            <div class="p-tree-loading-overlay p-component-overlay" *ngIf="loading && loadingMode === 'mask'">
                <i *ngIf="loadingIcon" [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-tree-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-tree-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <div *ngIf="filter" class="p-tree-filter-container">
                <input #filter type="search" autocomplete="off" class="p-tree-filter p-inputtext p-component" [attr.placeholder]="filterPlaceholder" (keydown.enter)="$event.preventDefault()" (input)="_filter($event.target.value)" />
                <SearchIcon *ngIf="!filterIconTemplate" [styleClass]="'p-tree-filter-icon'" />
                <span *ngIf="filterIconTemplate" class="p-tree-filter-icon">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </div>
            <ng-container *ngIf="getRootNode()?.length">
                <p-scroller
                    #scroller
                    *ngIf="virtualScroll"
                    [items]="serializedValue"
                    [tabindex]="-1"
                    styleClass="p-tree-wrapper"
                    [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                    [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                    [itemSize]="virtualScrollItemSize || _virtualNodeHeight"
                    [lazy]="lazy"
                    (onScroll)="onScroll.emit($event)"
                    (onScrollIndexChange)="onScrollIndexChange.emit($event)"
                    (onLazyLoad)="onLazyLoad.emit($event)"
                    [options]="virtualScrollOptions"
                >
                    <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                        <ul *ngIf="items" class="p-tree-container" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                            <p-treeNode
                                #treeNode
                                *ngFor="let rowNode of items; let firstChild = first; trackBy: trackBy"
                                [level]="rowNode.level"
                                [rowNode]="rowNode"
                                [node]="rowNode.node"
                                [parentNode]="rowNode.parent"
                                [firstChild]="firstChild"
                                [lastChild]="rowNode.lastChild"
                                [index]="rowNode.index"
                                [itemSize]="scrollerOptions.itemSize"
                                [indentation]="indentation"
                                [loadingMode]="loadingMode"
                            ></p-treeNode>
                        </ul>
                    </ng-template>
                    <ng-container *ngIf="loaderTemplate">
                        <ng-template pTemplate="loader" let-scrollerOptions="options">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                        </ng-template>
                    </ng-container>
                </p-scroller>
                <ng-container *ngIf="!virtualScroll">
                    <div #wrapper class="p-tree-wrapper" [ngStyle]="{ 'max-height': scrollHeight }">
                        <ul class="p-tree-container" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                            <p-treeNode
                                *ngFor="let node of getRootNode(); let firstChild = first; let lastChild = last; let index = index; trackBy: trackBy"
                                [node]="node"
                                [firstChild]="firstChild"
                                [lastChild]="lastChild"
                                [index]="index"
                                [level]="0"
                                [loadingMode]="loadingMode"
                            ></p-treeNode>
                        </ul>
                    </div>
                </ng-container>
            </ng-container>

            <div class="p-tree-empty-message" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)">
                <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                    {{ emptyMessageLabel }}
                </ng-container>
                <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
        <div [ngClass]="{ 'p-tree p-tree-horizontal p-component': true, 'p-tree-selectable': selectionMode }" [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            <div class="p-tree-loading-mask p-component-overlay" *ngIf="loading">
                <i *ngIf="loadingIcon" [class]="'p-tree-loading-icon pi-spin ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-tree-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-tree-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <table *ngIf="value && value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
            <div class="p-tree-empty-message" *ngIf="!loading && (getRootNode() == null || getRootNode().length === 0)">
                <ng-container *ngIf="!emptyMessageTemplate; else emptyFilter">
                    {{ emptyMessageLabel }}
                </ng-container>
                <ng-container #emptyFilter *ngTemplateOutlet="emptyMessageTemplate"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
    `, changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-tree-container{margin:0;padding:0;list-style-type:none;overflow:auto}.p-treenode-children{margin:0;padding:0;list-style-type:none}.p-tree-wrapper{overflow:auto}.p-treenode-selectable{cursor:pointer;-webkit-user-select:none;user-select:none}.p-tree-toggler{cursor:pointer;-webkit-user-select:none;user-select:none;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative;flex-shrink:0}.p-treenode-leaf>.p-treenode-content .p-tree-toggler{visibility:hidden}.p-treenode-content{display:flex;align-items:center}.p-tree-filter{width:100%}.p-tree-filter-container{position:relative;display:block;width:100%}.p-tree-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-tree-loading{position:relative;min-height:4rem}.p-tree .p-tree-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:2}.p-tree-flex-scrollable{display:flex;flex:1;height:100%;flex-direction:column}.p-tree-flex-scrollable .p-tree-wrapper{flex:1}.p-tree .p-treenode-droppoint{height:4px;list-style-type:none}.p-tree .p-treenode-droppoint-active{border:0 none}.p-tree-horizontal{width:auto;padding-left:0;padding-right:0;overflow:auto}.p-tree.p-tree-horizontal table,.p-tree.p-tree-horizontal tr,.p-tree.p-tree-horizontal td{border-collapse:collapse;margin:0;padding:0;vertical-align:middle}.p-tree-horizontal .p-treenode-content{font-weight:400;padding:.4em 1em .4em .2em;display:flex;align-items:center}.p-tree-horizontal .p-treenode-parent .p-treenode-content{font-weight:400;white-space:nowrap}.p-tree.p-tree-horizontal .p-treenode{background:url(data:image/gif;base64,R0lGODlhAQABAIAAALGxsf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAxMC0wMy0xMVQxMDoxNjo0MVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAxMC0wMy0xMVQxMjo0NDoxOVo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9naWY8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PAA6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQABwD/ACwAAAAAAQABAAACAkQBADs=) repeat-x scroll center center transparent;padding:.25rem 2.5rem}.p-tree.p-tree-horizontal .p-treenode.p-treenode-leaf,.p-tree.p-tree-horizontal .p-treenode.p-treenode-collapsed{padding-right:0}.p-tree.p-tree-horizontal .p-treenode-children{padding:0;margin:0}.p-tree.p-tree-horizontal .p-treenode-connector{width:1px}.p-tree.p-tree-horizontal .p-treenode-connector-table{height:100%;width:1px}.p-tree.p-tree-horizontal .p-treenode-connector-line{background:url(data:image/gif;base64,R0lGODlhAQABAIAAALGxsf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAxMC0wMy0xMVQxMDoxNjo0MVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAxMC0wMy0xMVQxMjo0NDoxOVo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9naWY8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PAA6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQABwD/ACwAAAAAAQABAAACAkQBADs=) repeat-y scroll 0 0 transparent;width:1px}.p-tree.p-tree-horizontal table{height:0}.p-scroller .p-tree-container{overflow:visible}}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i3.TreeDragDropService, decorators: [{
                    type: Optional
                }] }, { type: i3.PrimeNGConfig }, { type: i0.ChangeDetectorRef }], propDecorators: { value: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], loadingMode: [{
                type: Input
            }], selection: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], contextMenu: [{
                type: Input
            }], layout: [{
                type: Input
            }], draggableScope: [{
                type: Input
            }], droppableScope: [{
                type: Input
            }], draggableNodes: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], droppableNodes: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], metaKeySelection: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], propagateSelectionUp: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], propagateSelectionDown: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loading: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], loadingIcon: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], togglerAriaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], validateDrop: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filter: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], filterBy: [{
                type: Input
            }], filterMode: [{
                type: Input
            }], filterPlaceholder: [{
                type: Input
            }], filteredNodes: [{
                type: Input
            }], filterLocale: [{
                type: Input
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
            }], indentation: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], _templateMap: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], virtualNodeHeight: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], onNodeSelect: [{
                type: Output
            }], onNodeUnselect: [{
                type: Output
            }], onNodeExpand: [{
                type: Output
            }], onNodeCollapse: [{
                type: Output
            }], onNodeContextMenuSelect: [{
                type: Output
            }], onNodeDrop: [{
                type: Output
            }], onLazyLoad: [{
                type: Output
            }], onScroll: [{
                type: Output
            }], onScrollIndexChange: [{
                type: Output
            }], onFilter: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], filterViewChild: [{
                type: ViewChild,
                args: ['filter']
            }], scroller: [{
                type: ViewChild,
                args: ['scroller']
            }], wrapperViewChild: [{
                type: ViewChild,
                args: ['wrapper']
            }] } });
export class TreeModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: TreeModule, declarations: [Tree, UITreeNode], imports: [CommonModule, SharedModule, RippleModule, ScrollerModule, CheckIcon, ChevronDownIcon, ChevronRightIcon, MinusIcon, SearchIcon, SpinnerIcon, PlusIcon], exports: [Tree, SharedModule, ScrollerModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TreeModule, imports: [CommonModule, SharedModule, RippleModule, ScrollerModule, CheckIcon, ChevronDownIcon, ChevronRightIcon, MinusIcon, SearchIcon, SpinnerIcon, PlusIcon, SharedModule, ScrollerModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, RippleModule, ScrollerModule, CheckIcon, ChevronDownIcon, ChevronRightIcon, MinusIcon, SearchIcon, SpinnerIcon, PlusIcon],
                    exports: [Tree, SharedModule, ScrollerModule],
                    declarations: [Tree, UITreeNode]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90cmVlL3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFSCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixlQUFlLEVBSWYsUUFBUSxFQUNSLE1BQU0sRUFJTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBOEIsYUFBYSxFQUFtQixZQUFZLEVBQUUsZUFBZSxFQUFpQyxNQUFNLGFBQWEsQ0FBQztBQUN2SixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQVksY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBb01wRCxNQUFNLE9B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LGdCQUFnQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFDOUksWUFBWSxFQUFFLGNBQWM7OzJGQUduQyxVQUFVO2tCQUx0QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQztvQkFDL0osT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUM7b0JBQzdDLFlBQVksRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBib29sZWFuQXR0cmlidXRlLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgbnVtYmVyQXR0cmlidXRlLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCbG9ja2FibGVVSSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2Nyb2xsZXJPcHRpb25zLCBTaGFyZWRNb2R1bGUsIFRyYW5zbGF0aW9uS2V5cywgVHJlZURyYWdEcm9wU2VydmljZSwgVHJlZU5vZGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgU2Nyb2xsZXIsIFNjcm9sbGVyTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9zY3JvbGxlcic7XG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgZmlyc3QsIGxhc3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ2hlY2tJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGVjayc7XG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25kb3duJztcbmltcG9ydCB7IENoZXZyb25SaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25yaWdodCc7XG5pbXBvcnQgeyBNaW51c0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL21pbnVzJztcbmltcG9ydCB7IFBsdXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9wbHVzJztcbmltcG9ydCB7IFNlYXJjaEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NlYXJjaCc7XG5pbXBvcnQgeyBTcGlubmVySWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc3Bpbm5lcic7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQge1xuICAgIFRyZWVGaWx0ZXJFdmVudCxcbiAgICBUcmVlTGF6eUxvYWRFdmVudCxcbiAgICBUcmVlTm9kZUNvbGxhcHNlRXZlbnQsXG4gICAgVHJlZU5vZGVDb250ZXh0TWVudVNlbGVjdEV2ZW50LFxuICAgIFRyZWVOb2RlRHJvcEV2ZW50LFxuICAgIFRyZWVOb2RlRXhwYW5kRXZlbnQsXG4gICAgVHJlZU5vZGVTZWxlY3RFdmVudCxcbiAgICBUcmVlTm9kZVVuU2VsZWN0RXZlbnQsXG4gICAgVHJlZVNjcm9sbEV2ZW50LFxuICAgIFRyZWVTY3JvbGxJbmRleENoYW5nZUV2ZW50XG59IGZyb20gJy4vdHJlZS5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZU5vZGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJub2RlXCI+XG4gICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAqbmdJZj1cInRyZWUuZHJvcHBhYmxlTm9kZXNcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC10cmVlbm9kZS1kcm9wcG9pbnRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtdHJlZW5vZGUtZHJvcHBvaW50LWFjdGl2ZSc6IGRyYWdob3ZlclByZXYgfVwiXG4gICAgICAgICAgICAgICAgKGRyb3ApPVwib25Ecm9wUG9pbnQoJGV2ZW50LCAtMSlcIlxuICAgICAgICAgICAgICAgIChkcmFnb3Zlcik9XCJvbkRyb3BQb2ludERyYWdPdmVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChkcmFnZW50ZXIpPVwib25Ecm9wUG9pbnREcmFnRW50ZXIoJGV2ZW50LCAtMSlcIlxuICAgICAgICAgICAgICAgIChkcmFnbGVhdmUpPVwib25Ecm9wUG9pbnREcmFnTGVhdmUoJGV2ZW50KVwiXG4gICAgICAgICAgICA+PC9saT5cbiAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICpuZ0lmPVwiIXRyZWUuaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiWydwLXRyZWVub2RlJywgbm9kZS5zdHlsZUNsYXNzIHx8ICcnLCBpc0xlYWYoKSA/ICdwLXRyZWVub2RlLWxlYWYnIDogJyddXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGhlaWdodDogaXRlbVNpemUgKyAncHgnIH1cIlxuICAgICAgICAgICAgICAgIFtzdHlsZV09XCJub2RlLnN0eWxlXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5vZGUubGFiZWxcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY2hlY2tlZF09XCJhcmlhQ2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZXRzaXplXT1cIm5vZGUuY2hpbGRyZW4gPyBub2RlLmNoaWxkcmVuLmxlbmd0aCA6IDBcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiYXJpYVNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm5vZGUuZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtcG9zaW5zZXRdPVwiaW5kZXggKyAxXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxldmVsXT1cImxldmVsICsgMVwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiaW5kZXggPT09IDAgPyAwIDogLTFcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtaWRdPVwibm9kZS5rZXlcIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJ0cmVlaXRlbVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRyZWVub2RlLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAncGFkZGluZy1sZWZ0JzogbGV2ZWwgKiBpbmRlbnRhdGlvbiArICdyZW0nXG4gICAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25Ob2RlQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChjb250ZXh0bWVudSk9XCJvbk5vZGVSaWdodENsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAodG91Y2hlbmQpPVwib25Ob2RlVG91Y2hFbmQoKVwiXG4gICAgICAgICAgICAgICAgICAgIChkcm9wKT1cIm9uRHJvcE5vZGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChkcmFnb3Zlcik9XCJvbkRyb3BOb2RlRHJhZ092ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChkcmFnZW50ZXIpPVwib25Ecm9wTm9kZURyYWdFbnRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKGRyYWdsZWF2ZSk9XCJvbkRyb3BOb2RlRHJhZ0xlYXZlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbZHJhZ2dhYmxlXT1cInRyZWUuZHJhZ2dhYmxlTm9kZXNcIlxuICAgICAgICAgICAgICAgICAgICAoZHJhZ3N0YXJ0KT1cIm9uRHJhZ1N0YXJ0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoZHJhZ2VuZCk9XCJvbkRyYWdTdG9wKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXRyZWVub2RlLXNlbGVjdGFibGUnOiB0cmVlLnNlbGVjdGlvbk1vZGUgJiYgbm9kZS5zZWxlY3RhYmxlICE9PSBmYWxzZSwgJ3AtdHJlZW5vZGUtZHJhZ292ZXInOiBkcmFnaG92ZXJOb2RlLCAncC1oaWdobGlnaHQnOiBpc1NlbGVjdGVkKCkgfVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RvZ2dsZXInXCIgY2xhc3M9XCJwLXRyZWUtdG9nZ2xlciBwLWxpbmtcIiAoY2xpY2spPVwidG9nZ2xlKCRldmVudClcIiBwUmlwcGxlIHRhYmluZGV4PVwiLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdHJlZS50b2dnbGVySWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFub2RlLmxvYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25SaWdodEljb24gKm5nSWY9XCIhbm9kZS5leHBhbmRlZFwiIFtzdHlsZUNsYXNzXT1cIidwLXRyZWUtdG9nZ2xlci1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uRG93bkljb24gKm5nSWY9XCJub2RlLmV4cGFuZGVkXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtdHJlZS10b2dnbGVyLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibG9hZGluZ01vZGUgPT09ICdpY29uJyAmJiBub2RlLmxvYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uIFtzcGluXT1cInRydWVcIiBbc3R5bGVDbGFzc109XCIncC10cmVlLW5vZGUtdG9nZ2xlci1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidHJlZS50b2dnbGVySWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLXRyZWUtdG9nZ2xlci1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidHJlZS50b2dnbGVySWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogbm9kZS5leHBhbmRlZCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1jaGVja2JveCBwLWNvbXBvbmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWNoZWNrYm94LWRpc2FibGVkIHAtZGlzYWJsZWQnOiBub2RlLnNlbGVjdGFibGUgPT09IGZhbHNlLCAncC12YXJpYW50LWZpbGxlZCc6IHRyZWU/LmNvbmZpZy5pbnB1dFN0eWxlKCkgPT09ICdmaWxsZWQnIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJ0cmVlLnNlbGVjdGlvbk1vZGUgPT0gJ2NoZWNrYm94J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jaGVja2JveC1ib3hcIiBbbmdDbGFzc109XCJ7ICdwLWhpZ2hsaWdodCc6IGlzU2VsZWN0ZWQoKSwgJ3AtaW5kZXRlcm1pbmF0ZSc6IG5vZGUucGFydGlhbFNlbGVjdGVkIH1cIiByb2xlPVwiY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXRyZWUuY2hlY2tib3hJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrSWNvbiAqbmdJZj1cIiFub2RlLnBhcnRpYWxTZWxlY3RlZCAmJiBpc1NlbGVjdGVkKClcIiBbc3R5bGVDbGFzc109XCIncC1jaGVja2JveC1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNaW51c0ljb24gKm5nSWY9XCJub2RlLnBhcnRpYWxTZWxlY3RlZFwiIFtzdHlsZUNsYXNzXT1cIidwLWNoZWNrYm94LWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmVlLmNoZWNrYm94SWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXNTZWxlY3RlZCgpLCBwYXJ0aWFsU2VsZWN0ZWQ6IG5vZGUucGFydGlhbFNlbGVjdGVkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiZ2V0SWNvbigpXCIgKm5nSWY9XCJub2RlLmljb24gfHwgbm9kZS5leHBhbmRlZEljb24gfHwgbm9kZS5jb2xsYXBzZWRJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtdHJlZW5vZGUtbGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRyZWUuZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGUpXCI+e3sgbm9kZS5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidHJlZS5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidHJlZS5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSk7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBub2RlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtdHJlZW5vZGUtY2hpbGRyZW5cIlxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBub2RlLmV4cGFuZGVkID8gJ2Jsb2NrJyA6ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhdHJlZS52aXJ0dWFsU2Nyb2xsICYmIG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5leHBhbmRlZFwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJncm91cFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8cC10cmVlTm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNoaWxkTm9kZSBvZiBub2RlLmNoaWxkcmVuOyBsZXQgZmlyc3RDaGlsZCA9IGZpcnN0OyBsZXQgbGFzdENoaWxkID0gbGFzdDsgbGV0IGluZGV4ID0gaW5kZXg7IHRyYWNrQnk6IHRyZWUudHJhY2tCeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbm9kZV09XCJjaGlsZE5vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3BhcmVudE5vZGVdPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZmlyc3RDaGlsZF09XCJmaXJzdENoaWxkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtsYXN0Q2hpbGRdPVwibGFzdENoaWxkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtpbmRleF09XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbaXRlbVNpemVdPVwiaXRlbVNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2xldmVsXT1cImxldmVsICsgMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbG9hZGluZ01vZGVdPVwibG9hZGluZ01vZGVcIlxuICAgICAgICAgICAgICAgICAgICA+PC9wLXRyZWVOb2RlPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAqbmdJZj1cInRyZWUuZHJvcHBhYmxlTm9kZXMgJiYgbGFzdENoaWxkXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtdHJlZW5vZGUtZHJvcHBvaW50XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXRyZWVub2RlLWRyb3Bwb2ludC1hY3RpdmUnOiBkcmFnaG92ZXJOZXh0IH1cIlxuICAgICAgICAgICAgICAgIChkcm9wKT1cIm9uRHJvcFBvaW50KCRldmVudCwgMSlcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgIChkcmFnb3Zlcik9XCJvbkRyb3BQb2ludERyYWdPdmVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChkcmFnZW50ZXIpPVwib25Ecm9wUG9pbnREcmFnRW50ZXIoJGV2ZW50LCAxKVwiXG4gICAgICAgICAgICAgICAgKGRyYWdsZWF2ZSk9XCJvbkRyb3BQb2ludERyYWdMZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgID48L2xpPlxuXG4gICAgICAgICAgICA8dGFibGUgKm5nSWY9XCJ0cmVlLmhvcml6b250YWxcIiBbY2xhc3NdPVwibm9kZS5zdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJwLXRyZWVub2RlLWNvbm5lY3RvclwiICpuZ0lmPVwiIXJvb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3M9XCJwLXRyZWVub2RlLWNvbm5lY3Rvci10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIFtuZ0NsYXNzXT1cInsgJ3AtdHJlZW5vZGUtY29ubmVjdG9yLWxpbmUnOiAhZmlyc3RDaGlsZCB9XCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIFtuZ0NsYXNzXT1cInsgJ3AtdHJlZW5vZGUtY29ubmVjdG9yLWxpbmUnOiAhbGFzdENoaWxkIH1cIj48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInAtdHJlZW5vZGVcIiBbbmdDbGFzc109XCJ7ICdwLXRyZWVub2RlLWNvbGxhcHNlZCc6ICFub2RlLmV4cGFuZGVkIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC10cmVlbm9kZS1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC10cmVlbm9kZS1zZWxlY3RhYmxlJzogdHJlZS5zZWxlY3Rpb25Nb2RlLCAncC1oaWdobGlnaHQnOiBpc1NlbGVjdGVkKCkgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbk5vZGVDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNvbnRleHRtZW51KT1cIm9uTm9kZVJpZ2h0Q2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b3VjaGVuZCk9XCJvbk5vZGVUb3VjaEVuZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Ob2RlS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWlzTGVhZigpXCIgW25nQ2xhc3NdPVwiJ3AtdHJlZS10b2dnbGVyJ1wiIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0cmVlLnRvZ2dsZXJJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGx1c0ljb24gKm5nSWY9XCIhbm9kZS5leHBhbmRlZFwiIFtzdHlsZUNsYXNzXT1cIidwLXRyZWUtdG9nZ2xlci1pY29uJ1wiIFthcmlhTGFiZWxdPVwidHJlZS50b2dnbGVyQXJpYUxhYmVsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TWludXNJY29uICpuZ0lmPVwibm9kZS5leHBhbmRlZFwiIFtzdHlsZUNsYXNzXT1cIidwLXRyZWUtdG9nZ2xlci1pY29uJ1wiIFthcmlhTGFiZWxdPVwidHJlZS50b2dnbGVyQXJpYUxhYmVsXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0cmVlLnRvZ2dsZXJJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtdHJlZS10b2dnbGVyLWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmVlLnRvZ2dsZXJJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBub2RlLmV4cGFuZGVkIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJnZXRJY29uKClcIiAqbmdJZj1cIm5vZGUuaWNvbiB8fCBub2RlLmV4cGFuZGVkSWNvbiB8fCBub2RlLmNvbGxhcHNlZEljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC10cmVlbm9kZS1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhdHJlZS5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSlcIj57eyBub2RlLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKTsgY29udGV4dDogeyAkaW1wbGljaXQ6IG5vZGUgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRyZWVub2RlLWNoaWxkcmVuLWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJub2RlLmNoaWxkcmVuICYmIG5vZGUuZXhwYW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogbm9kZS5leHBhbmRlZCA/ICd0YWJsZS1jZWxsJyA6ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRyZWVub2RlLWNoaWxkcmVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlICpuZ0Zvcj1cImxldCBjaGlsZE5vZGUgb2Ygbm9kZS5jaGlsZHJlbjsgbGV0IGZpcnN0Q2hpbGQgPSBmaXJzdDsgbGV0IGxhc3RDaGlsZCA9IGxhc3Q7IHRyYWNrQnk6IHRyZWUudHJhY2tCeVwiIFtub2RlXT1cImNoaWxkTm9kZVwiIFtmaXJzdENoaWxkXT1cImZpcnN0Q2hpbGRcIiBbbGFzdENoaWxkXT1cImxhc3RDaGlsZFwiPjwvcC10cmVlTm9kZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgYCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBVSVRyZWVOb2RlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzdGF0aWMgSUNPTl9DTEFTUzogc3RyaW5nID0gJ3AtdHJlZW5vZGUtaWNvbiAnO1xuXG4gICAgQElucHV0KCkgcm93Tm9kZTogYW55O1xuXG4gICAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHBhcmVudE5vZGU6IFRyZWVOb2RlPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgcm9vdDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZmlyc3RDaGlsZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBsYXN0Q2hpbGQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBsZXZlbDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgaW5kZW50YXRpb246IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIGl0ZW1TaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBsb2FkaW5nTW9kZTogc3RyaW5nO1xuXG4gICAgdHJlZTogVHJlZTtcblxuICAgIHRpbWVvdXQ6IGFueTtcblxuICAgIGRyYWdob3ZlclByZXY6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBkcmFnaG92ZXJOZXh0OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZHJhZ2hvdmVyTm9kZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGdldCBhcmlhU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZScgfHwgdGhpcy50cmVlLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZScgPyB0aGlzLmlzU2VsZWN0ZWQoKSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgYXJpYUNoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZSA9PT0gJ2NoZWNrYm94JyA/IHRoaXMuaXNTZWxlY3RlZCgpIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBUcmVlKSkgdHJlZTogVHJlZSkge1xuICAgICAgICB0aGlzLnRyZWUgPSB0cmVlIGFzIFRyZWU7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgICg8VHJlZU5vZGU+dGhpcy5ub2RlKS5wYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLnRyZWUuZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3QgcERpYWxvZ1dyYXBwZXIgPSBuYXRpdmVFbGVtZW50LmNsb3Nlc3QoJ3AtZGlhbG9nJyk7XG5cbiAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSAmJiAhcERpYWxvZ1dyYXBwZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWxsTm9kZXNUYWJJbmRleGVzKCk7XG4gICAgICAgICAgICB0aGlzLnRyZWUuc3luY05vZGVPcHRpb24oPFRyZWVOb2RlPnRoaXMubm9kZSwgPFRyZWVOb2RlPGFueT5bXT50aGlzLnRyZWUudmFsdWUsICdwYXJlbnQnLCB0aGlzLnRyZWUuZ2V0Tm9kZVdpdGhLZXkoPHN0cmluZz50aGlzLnBhcmVudE5vZGUua2V5LCA8VHJlZU5vZGU8YW55PltdPnRoaXMudHJlZS52YWx1ZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SWNvbigpIHtcbiAgICAgICAgbGV0IGljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoKDxUcmVlTm9kZT50aGlzLm5vZGUpLmljb24pIGljb24gPSAoPFRyZWVOb2RlPnRoaXMubm9kZSkuaWNvbiBhcyBzdHJpbmc7XG4gICAgICAgIGVsc2UgaWNvbiA9ICg8VHJlZU5vZGU+dGhpcy5ub2RlKS5leHBhbmRlZCAmJiAoPFRyZWVOb2RlPnRoaXMubm9kZSkuY2hpbGRyZW4gJiYgKDxUcmVlTm9kZT50aGlzLm5vZGUpLmNoaWxkcmVuPy5sZW5ndGggPyAoPFRyZWVOb2RlPnRoaXMubm9kZSkuZXhwYW5kZWRJY29uIDogKDxUcmVlTm9kZT50aGlzLm5vZGUpLmNvbGxhcHNlZEljb247XG5cbiAgICAgICAgcmV0dXJuIFVJVHJlZU5vZGUuSUNPTl9DTEFTUyArICcgJyArIGljb247XG4gICAgfVxuXG4gICAgaXNMZWFmKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlLmlzTm9kZUxlYWYoPFRyZWVOb2RlPnRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoKDxUcmVlTm9kZT50aGlzLm5vZGUpLmV4cGFuZGVkKSB0aGlzLmNvbGxhcHNlKGV2ZW50KTtcbiAgICAgICAgZWxzZSB0aGlzLmV4cGFuZChldmVudCk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgZXhwYW5kKGV2ZW50OiBFdmVudCkge1xuICAgICAgICAoPFRyZWVOb2RlPnRoaXMubm9kZSkuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy50cmVlLnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJlZS51cGRhdGVTZXJpYWxpemVkVmFsdWUoKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNWaXJ0dWFsTm9kZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVFeHBhbmQuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiA8VHJlZU5vZGU+dGhpcy5ub2RlIH0pO1xuICAgIH1cblxuICAgIGNvbGxhcHNlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICAoPFRyZWVOb2RlPnRoaXMubm9kZSkuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMudHJlZS52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUudXBkYXRlU2VyaWFsaXplZFZhbHVlKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVmlydHVhbE5vZGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyZWUub25Ob2RlQ29sbGFwc2UuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiA8VHJlZU5vZGU+dGhpcy5ub2RlIH0pO1xuICAgIH1cblxuICAgIG9uTm9kZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVDbGljayhldmVudCwgPFRyZWVOb2RlPnRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgb25Ob2RlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlQ2xpY2soZXZlbnQsIDxUcmVlTm9kZT50aGlzLm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ob2RlVG91Y2hFbmQoKSB7XG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVUb3VjaEVuZCgpO1xuICAgIH1cblxuICAgIG9uTm9kZVJpZ2h0Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy50cmVlLm9uTm9kZVJpZ2h0Q2xpY2soZXZlbnQsIDxUcmVlTm9kZT50aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUuaXNTZWxlY3RlZCg8VHJlZU5vZGU+dGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBpc1NhbWVOb2RlKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC5jdXJyZW50VGFyZ2V0ICYmIChldmVudC5jdXJyZW50VGFyZ2V0LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSB8fCBldmVudC5jdXJyZW50VGFyZ2V0LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tyb2xlPVwidHJlZWl0ZW1cIl0nKSkpO1xuICAgIH1cblxuICAgIG9uRHJvcFBvaW50KGV2ZW50OiBEcmFnRXZlbnQsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGRyYWdOb2RlID0gdGhpcy50cmVlLmRyYWdOb2RlO1xuICAgICAgICBsZXQgZHJhZ05vZGVJbmRleCA9IHRoaXMudHJlZS5kcmFnTm9kZUluZGV4O1xuICAgICAgICBsZXQgZHJhZ05vZGVTY29wZSA9IHRoaXMudHJlZS5kcmFnTm9kZVNjb3BlO1xuICAgICAgICBsZXQgaXNWYWxpZERyb3BQb2ludEluZGV4ID0gdGhpcy50cmVlLmRyYWdOb2RlVHJlZSA9PT0gdGhpcy50cmVlID8gcG9zaXRpb24gPT09IDEgfHwgZHJhZ05vZGVJbmRleCAhPT0gPG51bWJlcj50aGlzLmluZGV4IC0gMSA6IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMudHJlZS5hbGxvd0Ryb3AoPFRyZWVOb2RlPmRyYWdOb2RlLCA8VHJlZU5vZGU+dGhpcy5ub2RlLCBkcmFnTm9kZVNjb3BlLCAnYmV0d2VlbicpICYmIGlzVmFsaWREcm9wUG9pbnRJbmRleCkge1xuICAgICAgICAgICAgbGV0IGRyb3BQYXJhbXMgPSB7IC4uLnRoaXMuY3JlYXRlRHJvcFBvaW50RXZlbnRNZXRhZGF0YSg8bnVtYmVyPnBvc2l0aW9uKSB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy50cmVlLnZhbGlkYXRlRHJvcCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJlZS5vbk5vZGVEcm9wLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgZHJhZ05vZGU6IGRyYWdOb2RlLFxuICAgICAgICAgICAgICAgICAgICBkcm9wTm9kZTogdGhpcy5ub2RlLFxuICAgICAgICAgICAgICAgICAgICBkcm9wUG9pbnQ6ICdiZXR3ZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUG9pbnREcm9wKGRyb3BQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc1BvaW50RHJvcChkcm9wUGFyYW1zKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlRHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgZHJvcE5vZGU6IHRoaXMubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgZHJvcFBvaW50OiAnYmV0d2VlbicsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYWdob3ZlclByZXYgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnaG92ZXJOZXh0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1BvaW50RHJvcChldmVudDogYW55KSB7XG4gICAgICAgIGxldCBuZXdOb2RlTGlzdCA9IGV2ZW50LmRyb3BOb2RlLnBhcmVudCA/IGV2ZW50LmRyb3BOb2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZTtcbiAgICAgICAgZXZlbnQuZHJhZ05vZGVTdWJOb2Rlcy5zcGxpY2UoZXZlbnQuZHJhZ05vZGVJbmRleCwgMSk7XG4gICAgICAgIGxldCBkcm9wSW5kZXggPSB0aGlzLmluZGV4O1xuXG4gICAgICAgIGlmIChldmVudC5wb3NpdGlvbiA8IDApIHtcbiAgICAgICAgICAgIGRyb3BJbmRleCA9IGV2ZW50LmRyYWdOb2RlU3ViTm9kZXMgPT09IG5ld05vZGVMaXN0ID8gKGV2ZW50LmRyYWdOb2RlSW5kZXggPiBldmVudC5pbmRleCA/IGV2ZW50LmluZGV4IDogZXZlbnQuaW5kZXggLSAxKSA6IGV2ZW50LmluZGV4O1xuICAgICAgICAgICAgbmV3Tm9kZUxpc3Quc3BsaWNlKGRyb3BJbmRleCwgMCwgZXZlbnQuZHJhZ05vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJvcEluZGV4ID0gbmV3Tm9kZUxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbmV3Tm9kZUxpc3QucHVzaChldmVudC5kcmFnTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyZWUuZHJhZ0Ryb3BTZXJ2aWNlLnN0b3BEcmFnKHtcbiAgICAgICAgICAgIG5vZGU6IGV2ZW50LmRyYWdOb2RlLFxuICAgICAgICAgICAgc3ViTm9kZXM6IGV2ZW50LmRyb3BOb2RlLnBhcmVudCA/IGV2ZW50LmRyb3BOb2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZSxcbiAgICAgICAgICAgIGluZGV4OiBldmVudC5kcmFnTm9kZUluZGV4XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZURyb3BQb2ludEV2ZW50TWV0YWRhdGEocG9zaXRpb246IG51bWJlcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZHJhZ05vZGU6IHRoaXMudHJlZS5kcmFnTm9kZSxcbiAgICAgICAgICAgIGRyYWdOb2RlSW5kZXg6IHRoaXMudHJlZS5kcmFnTm9kZUluZGV4LFxuICAgICAgICAgICAgZHJhZ05vZGVTdWJOb2RlczogdGhpcy50cmVlLmRyYWdOb2RlU3ViTm9kZXMsXG4gICAgICAgICAgICBkcm9wTm9kZTogdGhpcy5ub2RlLFxuICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb25cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvbkRyb3BQb2ludERyYWdPdmVyKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Ecm9wUG9pbnREcmFnRW50ZXIoZXZlbnQ6IEV2ZW50LCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnRyZWUuYWxsb3dEcm9wKDxUcmVlTm9kZT50aGlzLnRyZWUuZHJhZ05vZGUsIDxUcmVlTm9kZT50aGlzLm5vZGUsIHRoaXMudHJlZS5kcmFnTm9kZVNjb3BlLCAnYmV0d2VlbicpKSB7XG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB0aGlzLmRyYWdob3ZlclByZXYgPSB0cnVlO1xuICAgICAgICAgICAgZWxzZSB0aGlzLmRyYWdob3Zlck5leHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wUG9pbnREcmFnTGVhdmUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZHJhZ2hvdmVyUHJldiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWdob3Zlck5leHQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkRyYWdTdGFydChldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnRyZWUuZHJhZ2dhYmxlTm9kZXMgJiYgKDxUcmVlTm9kZT50aGlzLm5vZGUpLmRyYWdnYWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ2RhdGEnKTtcblxuICAgICAgICAgICAgdGhpcy50cmVlLmRyYWdEcm9wU2VydmljZS5zdGFydERyYWcoe1xuICAgICAgICAgICAgICAgIHRyZWU6IHRoaXMsXG4gICAgICAgICAgICAgICAgbm9kZTogdGhpcy5ub2RlLFxuICAgICAgICAgICAgICAgIHN1Yk5vZGVzOiB0aGlzLm5vZGU/LnBhcmVudCA/IHRoaXMubm9kZS5wYXJlbnQuY2hpbGRyZW4gOiB0aGlzLnRyZWUudmFsdWUsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICAgICAgc2NvcGU6IHRoaXMudHJlZS5kcmFnZ2FibGVTY29wZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmFnU3RvcChldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMudHJlZS5kcmFnRHJvcFNlcnZpY2Uuc3RvcERyYWcoe1xuICAgICAgICAgICAgbm9kZTogdGhpcy5ub2RlLFxuICAgICAgICAgICAgc3ViTm9kZXM6IHRoaXMubm9kZT8ucGFyZW50ID8gdGhpcy5ub2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZSxcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRHJvcE5vZGVEcmFnT3ZlcihldmVudDogYW55KSB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgICAgICBpZiAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyb3BOb2RlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5kcm9wcGFibGVOb2RlcyAmJiB0aGlzLm5vZGU/LmRyb3BwYWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCBkcmFnTm9kZSA9IHRoaXMudHJlZS5kcmFnTm9kZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudHJlZS5hbGxvd0Ryb3AoPFRyZWVOb2RlPmRyYWdOb2RlLCA8VHJlZU5vZGU+dGhpcy5ub2RlLCB0aGlzLnRyZWUuZHJhZ05vZGVTY29wZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZHJvcFBhcmFtcyA9IHsgLi4udGhpcy5jcmVhdGVEcm9wTm9kZUV2ZW50TWV0YWRhdGEoKSB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJlZS52YWxpZGF0ZURyb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZURyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wUG9pbnQ6ICdub2RlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTm9kZURyb3AoZHJvcFBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc05vZGVEcm9wKGRyb3BQYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlRHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ05vZGU6IGRyYWdOb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE5vZGU6IHRoaXMubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BQb2ludDogJ25vZGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuZHJhZ2hvdmVyTm9kZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNyZWF0ZURyb3BOb2RlRXZlbnRNZXRhZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRyYWdOb2RlOiB0aGlzLnRyZWUuZHJhZ05vZGUsXG4gICAgICAgICAgICBkcmFnTm9kZUluZGV4OiB0aGlzLnRyZWUuZHJhZ05vZGVJbmRleCxcbiAgICAgICAgICAgIGRyYWdOb2RlU3ViTm9kZXM6IHRoaXMudHJlZS5kcmFnTm9kZVN1Yk5vZGVzLFxuICAgICAgICAgICAgZHJvcE5vZGU6IHRoaXMubm9kZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb2Nlc3NOb2RlRHJvcChldmVudDogYW55KSB7XG4gICAgICAgIGxldCBkcmFnTm9kZUluZGV4ID0gZXZlbnQuZHJhZ05vZGVJbmRleDtcbiAgICAgICAgZXZlbnQuZHJhZ05vZGVTdWJOb2Rlcy5zcGxpY2UoZHJhZ05vZGVJbmRleCwgMSk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmRyb3BOb2RlLmNoaWxkcmVuKSBldmVudC5kcm9wTm9kZS5jaGlsZHJlbi5wdXNoKGV2ZW50LmRyYWdOb2RlKTtcbiAgICAgICAgZWxzZSBldmVudC5kcm9wTm9kZS5jaGlsZHJlbiA9IFtldmVudC5kcmFnTm9kZV07XG5cbiAgICAgICAgdGhpcy50cmVlLmRyYWdEcm9wU2VydmljZS5zdG9wRHJhZyh7XG4gICAgICAgICAgICBub2RlOiBldmVudC5kcmFnTm9kZSxcbiAgICAgICAgICAgIHN1Yk5vZGVzOiBldmVudC5kcm9wTm9kZS5wYXJlbnQgPyBldmVudC5kcm9wTm9kZS5wYXJlbnQuY2hpbGRyZW4gOiB0aGlzLnRyZWUudmFsdWUsXG4gICAgICAgICAgICBpbmRleDogZHJhZ05vZGVJbmRleFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRyb3BOb2RlRHJhZ0VudGVyKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5kcm9wcGFibGVOb2RlcyAmJiB0aGlzLm5vZGU/LmRyb3BwYWJsZSAhPT0gZmFsc2UgJiYgdGhpcy50cmVlLmFsbG93RHJvcCg8VHJlZU5vZGU+dGhpcy50cmVlLmRyYWdOb2RlLCA8VHJlZU5vZGU+dGhpcy5ub2RlLCB0aGlzLnRyZWUuZHJhZ05vZGVTY29wZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2hvdmVyTm9kZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyb3BOb2RlRHJhZ0xlYXZlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5kcm9wcGFibGVOb2Rlcykge1xuICAgICAgICAgICAgbGV0IHJlY3QgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnggPiByZWN0LmxlZnQgKyByZWN0LndpZHRoIHx8IGV2ZW50LnggPCByZWN0LmxlZnQgfHwgZXZlbnQueSA+PSBNYXRoLmZsb29yKHJlY3QudG9wICsgcmVjdC5oZWlnaHQpIHx8IGV2ZW50LnkgPCByZWN0LnRvcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2hvdmVyTm9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1NhbWVOb2RlKGV2ZW50KSB8fCAodGhpcy50cmVlLmNvbnRleHRNZW51ICYmIHRoaXMudHJlZS5jb250ZXh0TWVudS5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgLy9kb3duIGFycm93XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3VwIGFycm93XG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1JpZ2h0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9sZWZ0IGFycm93XG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0xlZnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICdOdW1wYWRFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9zcGFjZVxuICAgICAgICAgICAgY2FzZSAnU3BhY2UnOlxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVOYW1lID0gZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lO1xuICAgICAgICAgICAgICAgIGlmICghWydJTlBVVCddLmluY2x1ZGVzKG5vZGVOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRW50ZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy90YWJcbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBbGxOb2Rlc1RhYkluZGV4ZXMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFycm93VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3Qgbm9kZUVsZW1lbnQgPSAoPEhUTUxEaXZFbGVtZW50PmV2ZW50LnRhcmdldCkuZ2V0QXR0cmlidXRlKCdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ3RvZ2dsZXInID8gKDxIVE1MRGl2RWxlbWVudD5ldmVudC50YXJnZXQpLmNsb3Nlc3QoJ1tyb2xlPVwidHJlZWl0ZW1cIl0nKSA6ICg8SFRNTERpdkVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIGlmIChub2RlRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzUm93Q2hhbmdlKG5vZGVFbGVtZW50LCBub2RlRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLCB0aGlzLmZpbmRMYXN0VmlzaWJsZURlc2NlbmRhbnQobm9kZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBhcmVudE5vZGVFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlRWxlbWVudChub2RlRWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNSb3dDaGFuZ2Uobm9kZUVsZW1lbnQsIHBhcmVudE5vZGVFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd0Rvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3Qgbm9kZUVsZW1lbnQgPSAoPEhUTUxEaXZFbGVtZW50PmV2ZW50LnRhcmdldCkuZ2V0QXR0cmlidXRlKCdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ3RvZ2dsZXInID8gKDxIVE1MRGl2RWxlbWVudD5ldmVudC50YXJnZXQpLmNsb3Nlc3QoJ1tyb2xlPVwidHJlZWl0ZW1cIl0nKSA6IDxIVE1MRGl2RWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gbm9kZUVsZW1lbnQuY2hpbGRyZW5bMV07XG5cbiAgICAgICAgaWYgKGxpc3RFbGVtZW50ICYmIGxpc3RFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNSb3dDaGFuZ2Uobm9kZUVsZW1lbnQsIGxpc3RFbGVtZW50LmNoaWxkcmVuWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChub2RlRWxlbWVudC5wYXJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNSb3dDaGFuZ2Uobm9kZUVsZW1lbnQsIG5vZGVFbGVtZW50LnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRTaWJsaW5nQW5jZXN0b3IgPSB0aGlzLmZpbmROZXh0U2libGluZ09mQW5jZXN0b3Iobm9kZUVsZW1lbnQucGFyZW50RWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV4dFNpYmxpbmdBbmNlc3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzUm93Q2hhbmdlKG5vZGVFbGVtZW50LCBuZXh0U2libGluZ0FuY2VzdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkFycm93UmlnaHQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vZGU/LmV4cGFuZGVkICYmICF0aGlzLnRyZWUuaXNOb2RlTGVhZig8VHJlZU5vZGU+dGhpcy5ub2RlKSkge1xuICAgICAgICAgICAgdGhpcy5leHBhbmQoZXZlbnQpO1xuICAgICAgICAgICAgKDxIVE1MRGl2RWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0KS50YWJJbmRleCA9IC0xO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duKGV2ZW50KTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd0xlZnQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3Qgbm9kZUVsZW1lbnQgPSAoPEhUTUxEaXZFbGVtZW50PmV2ZW50LnRhcmdldCkuZ2V0QXR0cmlidXRlKCdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ3RvZ2dsZXInID8gKDxIVE1MRGl2RWxlbWVudD5ldmVudC50YXJnZXQpLmNsb3Nlc3QoJ1tyb2xlPVwidHJlZWl0ZW1cIl0nKSA6IDxIVE1MRGl2RWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPT09IDAgJiYgIXRoaXMubm9kZT8uZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm5vZGU/LmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKGV2ZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnROb2RlRWxlbWVudCA9IHRoaXMuZ2V0UGFyZW50Tm9kZUVsZW1lbnQobm9kZUVsZW1lbnQucGFyZW50RWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHBhcmVudE5vZGVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzUm93Q2hhbmdlKGV2ZW50LmN1cnJlbnRUYXJnZXQsIHBhcmVudE5vZGVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaXNBY3Rpb25hYmxlRWxlbWVudChldmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgY29uc3QgaXNBY3Rpb25hYmxlID0gdGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgKHRhcmdldC5ub2RlTmFtZSA9PSAnQScgfHwgdGFyZ2V0Lm5vZGVOYW1lID09ICdCVVRUT04nKTtcblxuICAgICAgICByZXR1cm4gaXNBY3Rpb25hYmxlO1xuICAgIH1cblxuICAgIG9uRW50ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy50cmVlLm9uTm9kZUNsaWNrKGV2ZW50LCA8VHJlZU5vZGU+dGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5zZXRUYWJJbmRleEZvclNlbGVjdGlvbk1vZGUoZXZlbnQsIHRoaXMudHJlZS5ub2RlVG91Y2hlZCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQWN0aW9uYWJsZUVsZW1lbnQoZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0QWxsTm9kZXNUYWJJbmRleGVzKCkge1xuICAgICAgICBjb25zdCBub2RlcyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLnRyZWUuZWwubmF0aXZlRWxlbWVudCwgJy5wLXRyZWVub2RlJyk7XG5cbiAgICAgICAgY29uc3QgaGFzU2VsZWN0ZWROb2RlID0gWy4uLm5vZGVzXS5zb21lKChub2RlKSA9PiBub2RlLmdldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpID09PSAndHJ1ZScgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY2hlY2tlZCcpID09PSAndHJ1ZScpO1xuXG4gICAgICAgIFsuLi5ub2Rlc10uZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS50YWJJbmRleCA9IC0xO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaGFzU2VsZWN0ZWROb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE5vZGVzID0gWy4uLm5vZGVzXS5maWx0ZXIoKG5vZGUpID0+IG5vZGUuZ2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJykgPT09ICd0cnVlJyB8fCBub2RlLmdldEF0dHJpYnV0ZSgnYXJpYS1jaGVja2VkJykgPT09ICd0cnVlJyk7XG5cbiAgICAgICAgICAgIHNlbGVjdGVkTm9kZXNbMF0udGFiSW5kZXggPSAwO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBbLi4ubm9kZXNdWzBdLnRhYkluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBzZXRUYWJJbmRleEZvclNlbGVjdGlvbk1vZGUoZXZlbnQsIG5vZGVUb3VjaGVkKSB7XG4gICAgICAgIGlmICh0aGlzLnRyZWUuc2VsZWN0aW9uTW9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSBbLi4uRG9tSGFuZGxlci5maW5kKHRoaXMudHJlZS5lbC5uYXRpdmVFbGVtZW50LCAnLnAtdHJlZW5vZGUnKV07XG5cbiAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudGFiSW5kZXggPSBub2RlVG91Y2hlZCA9PT0gZmFsc2UgPyAtMSA6IDA7XG5cbiAgICAgICAgICAgIGlmIChlbGVtZW50cy5ldmVyeSgoZWxlbWVudCkgPT4gZWxlbWVudC50YWJJbmRleCA9PT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbMF0udGFiSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZE5leHRTaWJsaW5nT2ZBbmNlc3Rvcihub2RlRWxlbWVudDogYW55KTogYW55IHtcbiAgICAgICAgbGV0IHBhcmVudE5vZGVFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlRWxlbWVudChub2RlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHBhcmVudE5vZGVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZUVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKSByZXR1cm4gcGFyZW50Tm9kZUVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5maW5kTmV4dFNpYmxpbmdPZkFuY2VzdG9yKHBhcmVudE5vZGVFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZExhc3RWaXNpYmxlRGVzY2VuZGFudChub2RlRWxlbWVudDogYW55KTogYW55IHtcbiAgICAgICAgY29uc3QgbGlzdEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+QXJyYXkuZnJvbShub2RlRWxlbWVudC5jaGlsZHJlbikuZmluZCgoZWwpID0+IERvbUhhbmRsZXIuaGFzQ2xhc3MoZWwsICdwLXRyZWVub2RlJykpO1xuICAgICAgICBjb25zdCBjaGlsZHJlbkxpc3RFbGVtZW50ID0gbGlzdEVsZW1lbnQuY2hpbGRyZW5bMV07XG4gICAgICAgIGlmIChjaGlsZHJlbkxpc3RFbGVtZW50ICYmIGNoaWxkcmVuTGlzdEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbGFzdENoaWxkRWxlbWVudCA9IGNoaWxkcmVuTGlzdEVsZW1lbnQuY2hpbGRyZW5bY2hpbGRyZW5MaXN0RWxlbWVudC5jaGlsZHJlbi5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZExhc3RWaXNpYmxlRGVzY2VuZGFudChsYXN0Q2hpbGRFbGVtZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlRWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhcmVudE5vZGVFbGVtZW50KG5vZGVFbGVtZW50OiBIVE1MRWxlbWVudCB8IEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZUVsZW1lbnQgPSBub2RlRWxlbWVudC5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIHJldHVybiBwYXJlbnROb2RlRWxlbWVudD8udGFnTmFtZSA9PT0gJ1AtVFJFRU5PREUnID8gcGFyZW50Tm9kZUVsZW1lbnQgOiBudWxsO1xuICAgIH1cblxuICAgIGZvY3VzTm9kZShlbGVtZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5kcm9wcGFibGVOb2RlcykgKGVsZW1lbnQuY2hpbGRyZW5bMV0gYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgICAgIGVsc2UgKGVsZW1lbnQuY2hpbGRyZW5bMF0gYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXNSb3dDaGFuZ2UoZmlyc3RGb2N1c2FibGVSb3csIGN1cnJlbnRGb2N1c2VkUm93LCBsYXN0VmlzaWJsZURlc2NlbmRhbnQ/KSB7XG4gICAgICAgIGZpcnN0Rm9jdXNhYmxlUm93LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgY3VycmVudEZvY3VzZWRSb3cuY2hpbGRyZW5bMF0udGFiSW5kZXggPSAnMCc7XG5cbiAgICAgICAgdGhpcy5mb2N1c05vZGUobGFzdFZpc2libGVEZXNjZW5kYW50IHx8IGN1cnJlbnRGb2N1c2VkUm93KTtcbiAgICB9XG5cbiAgICBmb2N1c1ZpcnR1YWxOb2RlKCkge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKGRvY3VtZW50LmJvZHksIGBbZGF0YS1pZD1cIiR7PFRyZWVOb2RlPnRoaXMubm9kZT8ua2V5ID8/IDxUcmVlTm9kZT50aGlzLm5vZGU/LmRhdGF9XCJdYCk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmZvY3VzKG5vZGUpO1xuICAgICAgICB9LCAxKTtcbiAgICB9XG59XG4vKipcbiAqIFRyZWUgaXMgdXNlZCB0byBkaXNwbGF5IGhpZXJhcmNoaWNhbCBkYXRhLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRyZWUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtdHJlZSBwLWNvbXBvbmVudCc6IHRydWUsICdwLXRyZWUtc2VsZWN0YWJsZSc6IHNlbGVjdGlvbk1vZGUsICdwLXRyZWVub2RlLWRyYWdvdmVyJzogZHJhZ0hvdmVyLCAncC10cmVlLWxvYWRpbmcnOiBsb2FkaW5nLCAncC10cmVlLWZsZXgtc2Nyb2xsYWJsZSc6IHNjcm9sbEhlaWdodCA9PT0gJ2ZsZXgnIH1cIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgKm5nSWY9XCIhaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAoZHJvcCk9XCJvbkRyb3AoJGV2ZW50KVwiXG4gICAgICAgICAgICAoZHJhZ292ZXIpPVwib25EcmFnT3ZlcigkZXZlbnQpXCJcbiAgICAgICAgICAgIChkcmFnZW50ZXIpPVwib25EcmFnRW50ZXIoKVwiXG4gICAgICAgICAgICAoZHJhZ2xlYXZlKT1cIm9uRHJhZ0xlYXZlKCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10cmVlLWxvYWRpbmctb3ZlcmxheSBwLWNvbXBvbmVudC1vdmVybGF5XCIgKm5nSWY9XCJsb2FkaW5nICYmIGxvYWRpbmdNb2RlID09PSAnbWFzaydcIj5cbiAgICAgICAgICAgICAgICA8aSAqbmdJZj1cImxvYWRpbmdJY29uXCIgW2NsYXNzXT1cIidwLXRyZWUtbG9hZGluZy1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbG9hZGluZ0ljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uICpuZ0lmPVwiIWxvYWRpbmdJY29uVGVtcGxhdGVcIiBbc3Bpbl09XCJ0cnVlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtdHJlZS1sb2FkaW5nLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLXRyZWUtbG9hZGluZy1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmaWx0ZXJcIiBjbGFzcz1cInAtdHJlZS1maWx0ZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNmaWx0ZXIgdHlwZT1cInNlYXJjaFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGNsYXNzPVwicC10cmVlLWZpbHRlciBwLWlucHV0dGV4dCBwLWNvbXBvbmVudFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cImZpbHRlclBsYWNlaG9sZGVyXCIgKGtleWRvd24uZW50ZXIpPVwiJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIiAoaW5wdXQpPVwiX2ZpbHRlcigkZXZlbnQudGFyZ2V0LnZhbHVlKVwiIC8+XG4gICAgICAgICAgICAgICAgPFNlYXJjaEljb24gKm5nSWY9XCIhZmlsdGVySWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtdHJlZS1maWx0ZXItaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZmlsdGVySWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLXRyZWUtZmlsdGVyLWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiZmlsdGVySWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJnZXRSb290Tm9kZSgpPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICA8cC1zY3JvbGxlclxuICAgICAgICAgICAgICAgICAgICAjc2Nyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJ2aXJ0dWFsU2Nyb2xsXCJcbiAgICAgICAgICAgICAgICAgICAgW2l0ZW1zXT1cInNlcmlhbGl6ZWRWYWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFt0YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlQ2xhc3M9XCJwLXRyZWUtd3JhcHBlclwiXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCJ7IGhlaWdodDogc2Nyb2xsSGVpZ2h0ICE9PSAnZmxleCcgPyBzY3JvbGxIZWlnaHQgOiB1bmRlZmluZWQgfVwiXG4gICAgICAgICAgICAgICAgICAgIFtzY3JvbGxIZWlnaHRdPVwic2Nyb2xsSGVpZ2h0ICE9PSAnZmxleCcgPyB1bmRlZmluZWQgOiAnMTAwJSdcIlxuICAgICAgICAgICAgICAgICAgICBbaXRlbVNpemVdPVwidmlydHVhbFNjcm9sbEl0ZW1TaXplIHx8IF92aXJ0dWFsTm9kZUhlaWdodFwiXG4gICAgICAgICAgICAgICAgICAgIFtsYXp5XT1cImxhenlcIlxuICAgICAgICAgICAgICAgICAgICAob25TY3JvbGwpPVwib25TY3JvbGwuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uU2Nyb2xsSW5kZXhDaGFuZ2UpPVwib25TY3JvbGxJbmRleENoYW5nZS5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAob25MYXp5TG9hZCk9XCJvbkxhenlMb2FkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cInZpcnR1YWxTY3JvbGxPcHRpb25zXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJjb250ZW50XCIgbGV0LWl0ZW1zIGxldC1zY3JvbGxlck9wdGlvbnM9XCJvcHRpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgKm5nSWY9XCJpdGVtc1wiIGNsYXNzPVwicC10cmVlLWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cInNjcm9sbGVyT3B0aW9ucy5jb250ZW50U3R5bGVDbGFzc1wiIFtzdHlsZV09XCJzY3JvbGxlck9wdGlvbnMuY29udGVudFN0eWxlXCIgcm9sZT1cInRyZWVcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICN0cmVlTm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgcm93Tm9kZSBvZiBpdGVtczsgbGV0IGZpcnN0Q2hpbGQgPSBmaXJzdDsgdHJhY2tCeTogdHJhY2tCeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsZXZlbF09XCJyb3dOb2RlLmxldmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Jvd05vZGVdPVwicm93Tm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtub2RlXT1cInJvd05vZGUubm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwYXJlbnROb2RlXT1cInJvd05vZGUucGFyZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZpcnN0Q2hpbGRdPVwiZmlyc3RDaGlsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYXN0Q2hpbGRdPVwicm93Tm9kZS5sYXN0Q2hpbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5kZXhdPVwicm93Tm9kZS5pbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpdGVtU2l6ZV09XCJzY3JvbGxlck9wdGlvbnMuaXRlbVNpemVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5kZW50YXRpb25dPVwiaW5kZW50YXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbG9hZGluZ01vZGVdPVwibG9hZGluZ01vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3AtdHJlZU5vZGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibG9hZGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJsb2FkZXJcIiBsZXQtc2Nyb2xsZXJPcHRpb25zPVwib3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsb2FkZXJUZW1wbGF0ZTsgY29udGV4dDogeyBvcHRpb25zOiBzY3JvbGxlck9wdGlvbnMgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9wLXNjcm9sbGVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdmlydHVhbFNjcm9sbFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICN3cmFwcGVyIGNsYXNzPVwicC10cmVlLXdyYXBwZXJcIiBbbmdTdHlsZV09XCJ7ICdtYXgtaGVpZ2h0Jzogc2Nyb2xsSGVpZ2h0IH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInAtdHJlZS1jb250YWluZXJcIiAqbmdJZj1cImdldFJvb3ROb2RlKClcIiByb2xlPVwidHJlZVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtdHJlZU5vZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgZ2V0Um9vdE5vZGUoKTsgbGV0IGZpcnN0Q2hpbGQgPSBmaXJzdDsgbGV0IGxhc3RDaGlsZCA9IGxhc3Q7IGxldCBpbmRleCA9IGluZGV4OyB0cmFja0J5OiB0cmFja0J5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25vZGVdPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmaXJzdENoaWxkXT1cImZpcnN0Q2hpbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGFzdENoaWxkXT1cImxhc3RDaGlsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbmRleF09XCJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsZXZlbF09XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xvYWRpbmdNb2RlXT1cImxvYWRpbmdNb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9wLXRyZWVOb2RlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtdHJlZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCIhbG9hZGluZyAmJiAoZ2V0Um9vdE5vZGUoKSA9PSBudWxsIHx8IGdldFJvb3ROb2RlKCkubGVuZ3RoID09PSAwKVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZW1wdHlNZXNzYWdlVGVtcGxhdGU7IGVsc2UgZW1wdHlGaWx0ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgZW1wdHlNZXNzYWdlTGFiZWwgfX1cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICNlbXB0eUZpbHRlciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7ICdwLXRyZWUgcC10cmVlLWhvcml6b250YWwgcC1jb21wb25lbnQnOiB0cnVlLCAncC10cmVlLXNlbGVjdGFibGUnOiBzZWxlY3Rpb25Nb2RlIH1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKm5nSWY9XCJob3Jpem9udGFsXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRyZWUtbG9hZGluZy1tYXNrIHAtY29tcG9uZW50LW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmdcIj5cbiAgICAgICAgICAgICAgICA8aSAqbmdJZj1cImxvYWRpbmdJY29uXCIgW2NsYXNzXT1cIidwLXRyZWUtbG9hZGluZy1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbG9hZGluZ0ljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uICpuZ0lmPVwiIWxvYWRpbmdJY29uVGVtcGxhdGVcIiBbc3Bpbl09XCJ0cnVlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtdHJlZS1sb2FkaW5nLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLXRyZWUtbG9hZGluZy1pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dGFibGUgKm5nSWY9XCJ2YWx1ZSAmJiB2YWx1ZVswXVwiPlxuICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlIFtub2RlXT1cInZhbHVlWzBdXCIgW3Jvb3RdPVwidHJ1ZVwiPjwvcC10cmVlTm9kZT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10cmVlLWVtcHR5LW1lc3NhZ2VcIiAqbmdJZj1cIiFsb2FkaW5nICYmIChnZXRSb290Tm9kZSgpID09IG51bGwgfHwgZ2V0Um9vdE5vZGUoKS5sZW5ndGggPT09IDApXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFlbXB0eU1lc3NhZ2VUZW1wbGF0ZTsgZWxzZSBlbXB0eUZpbHRlclwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBlbXB0eU1lc3NhZ2VMYWJlbCB9fVxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgI2VtcHR5RmlsdGVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZW1wdHlNZXNzYWdlVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vdHJlZS5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVHJlZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEJsb2NrYWJsZVVJIHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiB0cmVlbm9kZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmFsdWU6IFRyZWVOb2RlPGFueT4gfCBUcmVlTm9kZTxhbnk+W10gfCBhbnlbXSB8IGFueTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBzZWxlY3Rpb24gbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiAnc2luZ2xlJyB8ICdtdWx0aXBsZScgfCAnY2hlY2tib3gnIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBMb2FkaW5nIG1vZGUgZGlzcGxheS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsb2FkaW5nTW9kZTogJ21hc2snIHwgJ2ljb24nID0gJ21hc2snO1xuICAgIC8qKlxuICAgICAqIEEgc2luZ2xlIHRyZWVub2RlIGluc3RhbmNlIG9yIGFuIGFycmF5IHRvIHJlZmVyIHRvIHRoZSBzZWxlY3Rpb25zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNlbGVjdGlvbjogYW55O1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENvbnRleHQgbWVudSBpbnN0YW5jZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb250ZXh0TWVudTogYW55O1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSB0cmVlLCB2YWxpZCB2YWx1ZXMgYXJlICd2ZXJ0aWNhbCcgYW5kICdob3Jpem9udGFsJy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsYXlvdXQ6IHN0cmluZyA9ICd2ZXJ0aWNhbCc7XG4gICAgLyoqXG4gICAgICogU2NvcGUgb2YgdGhlIGRyYWdnYWJsZSBub2RlcyB0byBtYXRjaCBhIGRyb3BwYWJsZVNjb3BlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyYWdnYWJsZVNjb3BlOiBhbnk7XG4gICAgLyoqXG4gICAgICogU2NvcGUgb2YgdGhlIGRyb3BwYWJsZSBub2RlcyB0byBtYXRjaCBhIGRyYWdnYWJsZVNjb3BlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyb3BwYWJsZVNjb3BlOiBhbnk7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgbm9kZXMgYXJlIGRyYWdnYWJsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZHJhZ2dhYmxlTm9kZXM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgbm9kZXMgYXJlIGRyb3BwYWJsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZHJvcHBhYmxlTm9kZXM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBob3cgbXVsdGlwbGUgaXRlbXMgY2FuIGJlIHNlbGVjdGVkLCB3aGVuIHRydWUgbWV0YUtleSBuZWVkcyB0byBiZSBwcmVzc2VkIHRvIHNlbGVjdCBvciB1bnNlbGVjdCBhbiBpdGVtIGFuZCB3aGVuIHNldCB0byBmYWxzZSBzZWxlY3Rpb24gb2YgZWFjaCBpdGVtIGNhbiBiZSB0b2dnbGVkIGluZGl2aWR1YWxseS4gT24gdG91Y2ggZW5hYmxlZCBkZXZpY2VzLCBtZXRhS2V5U2VsZWN0aW9uIGlzIHR1cm5lZCBvZmYgYXV0b21hdGljYWxseS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgbWV0YUtleVNlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgY2hlY2tib3ggc2VsZWN0aW9ucyBwcm9wYWdhdGUgdG8gYW5jZXN0b3Igbm9kZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHByb3BhZ2F0ZVNlbGVjdGlvblVwOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGNoZWNrYm94IHNlbGVjdGlvbnMgcHJvcGFnYXRlIHRvIGRlc2NlbmRhbnQgbm9kZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHByb3BhZ2F0ZVNlbGVjdGlvbkRvd246IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERpc3BsYXlzIGEgbG9hZGVyIHRvIGluZGljYXRlIGRhdGEgbG9hZCBpcyBpbiBwcm9ncmVzcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgbG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaGUgaWNvbiB0byBzaG93IHdoaWxlIGluZGljYXRpbmcgZGF0YSBsb2FkIGlzIGluIHByb2dyZXNzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxvYWRpbmdJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGV4dCB0byBkaXNwbGF5IHdoZW4gdGhlcmUgaXMgbm8gZGF0YS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBlbXB0eU1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZGVmaW5lIGEgc3RyaW5nIHRoYXQgbGFiZWxzIHRoZSB0cmVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdGhhdCBsYWJlbHMgdGhlIHRvZ2dsZXIgaWNvbiBmb3IgYWNjZXNzaWJpbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b2dnbGVyQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRXN0YWJsaXNoZXMgcmVsYXRpb25zaGlwcyBiZXR3ZWVuIHRoZSBjb21wb25lbnQgYW5kIGxhYmVsKHMpIHdoZXJlIGl0cyB2YWx1ZSBzaG91bGQgYmUgb25lIG9yIG1vcmUgZWxlbWVudCBJRHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGRyb3AgY2FuIGJlIGFjY2VwdGVkIG9yIHJlamVjdGVkIGJhc2VkIG9uIGNvbmRpdGlvbiBkZWZpbmVkIGF0IG9uTm9kZURyb3AuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHZhbGlkYXRlRHJvcDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHNwZWNpZmllZCwgZGlzcGxheXMgYW4gaW5wdXQgZmllbGQgdG8gZmlsdGVyIHRoZSBpdGVtcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZmlsdGVyOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZmlsdGVyaW5nIGlzIGVuYWJsZWQsIGZpbHRlckJ5IGRlY2lkZXMgd2hpY2ggZmllbGQgb3IgZmllbGRzIChjb21tYSBzZXBhcmF0ZWQpIHRvIHNlYXJjaCBhZ2FpbnN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGZpbHRlckJ5OiBzdHJpbmcgPSAnbGFiZWwnO1xuICAgIC8qKlxuICAgICAqIE1vZGUgZm9yIGZpbHRlcmluZyB2YWxpZCB2YWx1ZXMgYXJlIFwibGVuaWVudFwiIGFuZCBcInN0cmljdFwiLiBEZWZhdWx0IGlzIGxlbmllbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyTW9kZTogc3RyaW5nID0gJ2xlbmllbnQnO1xuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIHRleHQgdG8gc2hvdyB3aGVuIGZpbHRlciBpbnB1dCBpcyBlbXB0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJQbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFZhbHVlcyBhZnRlciB0aGUgdHJlZSBub2RlcyBhcmUgZmlsdGVyZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyZWROb2RlczogVHJlZU5vZGU8YW55PltdIHwgdW5kZWZpbmVkIHwgbnVsbDtcbiAgICAvKipcbiAgICAgKiBMb2NhbGUgdG8gdXNlIGluIGZpbHRlcmluZy4gVGhlIGRlZmF1bHQgbG9jYWxlIGlzIHRoZSBob3N0IGVudmlyb25tZW50J3MgY3VycmVudCBsb2NhbGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmlsdGVyTG9jYWxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIHRoZSBzY3JvbGxhYmxlIHZpZXdwb3J0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNjcm9sbEhlaWdodDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgZGF0YSBpcyBsb2FkZWQgYW5kIGludGVyYWN0ZWQgd2l0aCBpbiBsYXp5IG1hbm5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgbGF6eTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGRhdGEgc2hvdWxkIGJlIGxvYWRlZCBvbiBkZW1hbmQgZHVyaW5nIHNjcm9sbC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgdmlydHVhbFNjcm9sbDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBIZWlnaHQgb2YgYW4gaXRlbSBpbiB0aGUgbGlzdCBmb3IgVmlydHVhbFNjcm9sbGluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSB2aXJ0dWFsU2Nyb2xsSXRlbVNpemU6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSB0aGUgc2Nyb2xsZXIgZmVhdHVyZS4gVGhlIHByb3BlcnRpZXMgb2Ygc2Nyb2xsZXIgY29tcG9uZW50IGNhbiBiZSB1c2VkIGxpa2UgYW4gb2JqZWN0IGluIGl0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHZpcnR1YWxTY3JvbGxPcHRpb25zOiBTY3JvbGxlck9wdGlvbnMgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5kZW50YXRpb24gZmFjdG9yIGZvciBzcGFjaW5nIG9mIHRoZSBuZXN0ZWQgbm9kZSB3aGVuIHZpcnR1YWwgc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgaW5kZW50YXRpb246IG51bWJlciA9IDEuNTtcbiAgICAvKipcbiAgICAgKiBDdXN0b20gdGVtcGxhdGVzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgX3RlbXBsYXRlTWFwOiBhbnk7XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gb3B0aW1pemUgdGhlIG5vZGUgbGlzdCByZW5kZXJpbmcsIGRlZmF1bHQgYWxnb3JpdGhtIGNoZWNrcyBmb3Igb2JqZWN0IGlkZW50aXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcbiAgICAvKipcbiAgICAgKiBIZWlnaHQgb2YgdGhlIG5vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZSBwcm9wZXJ0eSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIF92aXJ0dWFsTm9kZUhlaWdodDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIEBJbnB1dCgpIGdldCB2aXJ0dWFsTm9kZUhlaWdodCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlydHVhbE5vZGVIZWlnaHQ7XG4gICAgfVxuICAgIHNldCB2aXJ0dWFsTm9kZUhlaWdodCh2YWw6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl92aXJ0dWFsTm9kZUhlaWdodCA9IHZhbDtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgdmlydHVhbE5vZGVIZWlnaHQgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCwgdXNlIHZpcnR1YWxTY3JvbGxJdGVtU2l6ZSBwcm9wZXJ0eSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gc2VsZWN0aW9uIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0geyhUcmVlTm9kZTxhbnk+IHwgVHJlZU5vZGU8YW55PltdIHwgbnVsbCl9IGV2ZW50IC0gQ3VzdG9tIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPFRyZWVOb2RlPGFueT4gfCBUcmVlTm9kZTxhbnk+W10gfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJlZU5vZGU8YW55PiB8IFRyZWVOb2RlPGFueT5bXSB8IG51bGw+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBub2RlIGlzIHNlbGVjdGVkLlxuICAgICAqIEBwYXJhbSB7VHJlZU5vZGVTZWxlY3RFdmVudH0gZXZlbnQgLSBOb2RlIHNlbGVjdCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Ob2RlU2VsZWN0OiBFdmVudEVtaXR0ZXI8VHJlZU5vZGVTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVOb2RlU2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBub2RlIGlzIHVuc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIHtUcmVlTm9kZVVuU2VsZWN0RXZlbnR9IGV2ZW50IC0gTm9kZSB1bnNlbGVjdCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Ob2RlVW5zZWxlY3Q6IEV2ZW50RW1pdHRlcjxUcmVlTm9kZVVuU2VsZWN0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlTm9kZVVuU2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBub2RlIGlzIGV4cGFuZGVkLlxuICAgICAqIEBwYXJhbSB7VHJlZU5vZGVFeHBhbmRFdmVudH0gZXZlbnQgLSBOb2RlIGV4cGFuZCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Ob2RlRXhwYW5kOiBFdmVudEVtaXR0ZXI8VHJlZU5vZGVFeHBhbmRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVOb2RlRXhwYW5kRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBub2RlIGlzIGNvbGxhcHNlZC5cbiAgICAgKiBAcGFyYW0ge1RyZWVOb2RlQ29sbGFwc2VFdmVudH0gZXZlbnQgLSBOb2RlIGNvbGxhcHNlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbk5vZGVDb2xsYXBzZTogRXZlbnRFbWl0dGVyPFRyZWVOb2RlQ29sbGFwc2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVOb2RlQ29sbGFwc2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5vZGUgaXMgc2VsZWN0ZWQgd2l0aCByaWdodCBjbGljay5cbiAgICAgKiBAcGFyYW0ge29uTm9kZUNvbnRleHRNZW51U2VsZWN0fSBldmVudCAtIE5vZGUgY29udGV4dCBtZW51IHNlbGVjdCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Ob2RlQ29udGV4dE1lbnVTZWxlY3Q6IEV2ZW50RW1pdHRlcjxUcmVlTm9kZUNvbnRleHRNZW51U2VsZWN0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlTm9kZUNvbnRleHRNZW51U2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBub2RlIGlzIGRyb3BwZWQuXG4gICAgICogQHBhcmFtIHtUcmVlTm9kZURyb3BFdmVudH0gZXZlbnQgLSBOb2RlIGRyb3AgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTm9kZURyb3A6IEV2ZW50RW1pdHRlcjxUcmVlTm9kZURyb3BFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVOb2RlRHJvcEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBpbiBsYXp5IG1vZGUgdG8gbG9hZCBuZXcgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1RyZWVMYXp5TG9hZEV2ZW50fSBldmVudCAtIEN1c3RvbSBsYXp5IGxvYWQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTGF6eUxvYWQ6IEV2ZW50RW1pdHRlcjxUcmVlTGF6eUxvYWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRyZWVMYXp5TG9hZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBpbiB2aXJ0dWFsIHNjcm9sbCBtb2RlIHdoZW4gc2Nyb2xsIHBvc2l0aW9uIGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtUcmVlU2Nyb2xsRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHNjcm9sbCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25TY3JvbGw6IEV2ZW50RW1pdHRlcjxUcmVlU2Nyb2xsRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlU2Nyb2xsRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGluIHZpcnR1YWwgc2Nyb2xsIG1vZGUgd2hlbiBzY3JvbGwgcG9zaXRpb24gYW5kIGl0ZW0ncyByYW5nZSBpbiB2aWV3IGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtUcmVlU2Nyb2xsSW5kZXhDaGFuZ2VFdmVudH0gZXZlbnQgLSBTY3JvbGwgaW5kZXggY2hhbmdlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNjcm9sbEluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8VHJlZVNjcm9sbEluZGV4Q2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUcmVlU2Nyb2xsSW5kZXhDaGFuZ2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkYXRhIGlzIGZpbHRlcmVkLlxuICAgICAqIEBwYXJhbSB7VHJlZUZpbHRlckV2ZW50fSBldmVudCAtIEN1c3RvbSBmaWx0ZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRmlsdGVyOiBFdmVudEVtaXR0ZXI8VHJlZUZpbHRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VHJlZUZpbHRlckV2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IE51bGxhYmxlPFF1ZXJ5TGlzdDxhbnk+PjtcblxuICAgIEBWaWV3Q2hpbGQoJ2ZpbHRlcicpIGZpbHRlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxlcicpIHNjcm9sbGVyOiBOdWxsYWJsZTxTY3JvbGxlcj47XG5cbiAgICBAVmlld0NoaWxkKCd3cmFwcGVyJykgd3JhcHBlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBzZXJpYWxpemVkVmFsdWU6IE51bGxhYmxlPFRyZWVOb2RlPGFueT5bXT47XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBmb290ZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBsb2FkZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBlbXB0eU1lc3NhZ2VUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICB0b2dnbGVySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGNoZWNrYm94SWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGxvYWRpbmdJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZmlsdGVySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHB1YmxpYyBub2RlVG91Y2hlZDogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBwdWJsaWMgZHJhZ05vZGVUcmVlOiBUcmVlIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHB1YmxpYyBkcmFnTm9kZTogVHJlZU5vZGU8YW55PiB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBwdWJsaWMgZHJhZ05vZGVTdWJOb2RlczogVHJlZU5vZGU8YW55PltdIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHB1YmxpYyBkcmFnTm9kZUluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgcHVibGljIGRyYWdOb2RlU2NvcGU6IGFueTtcblxuICAgIHB1YmxpYyBkcmFnSG92ZXI6IGJvb2xlYW4gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgcHVibGljIGRyYWdTdGFydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIHB1YmxpYyBkcmFnU3RvcFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHB1YmxpYyBkcmFnRHJvcFNlcnZpY2U6IFRyZWVEcmFnRHJvcFNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsXG4gICAgICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdTdGFydFN1YnNjcmlwdGlvbiA9IHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmRyYWdTdGFydCQuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVUcmVlID0gZXZlbnQudHJlZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlID0gZXZlbnQubm9kZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlU3ViTm9kZXMgPSBldmVudC5zdWJOb2RlcztcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlSW5kZXggPSBldmVudC5pbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlU2NvcGUgPSBldmVudC5zY29wZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdTdG9wU3Vic2NyaXB0aW9uID0gdGhpcy5kcmFnRHJvcFNlcnZpY2UuZHJhZ1N0b3AkLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlVHJlZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZVN1Yk5vZGVzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlSW5kZXggPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVTY29wZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnSG92ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VyaWFsaXplZFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXJBY3RpdmUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcih0aGlzLmZpbHRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBob3Jpem9udGFsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT0gJ2hvcml6b250YWwnO1xuICAgIH1cblxuICAgIGdldCBlbXB0eU1lc3NhZ2VMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eU1lc3NhZ2UgfHwgdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkVNUFRZX01FU1NBR0UpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYgKCh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fdGVtcGxhdGVNYXAgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1wdHlNZXNzYWdlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xvYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RvZ2dsZXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVySWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrYm94SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsb2FkaW5naWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsdGVyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVySWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZW1wbGF0ZU1hcFs8YW55Pml0ZW0ubmFtZV0gPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VyaWFsaXplZFZhbHVlKCkge1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZWRWYWx1ZSA9IFtdO1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZU5vZGVzKG51bGwsIHRoaXMuZ2V0Um9vdE5vZGUoKSwgMCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgc2VyaWFsaXplTm9kZXMocGFyZW50OiBUcmVlTm9kZTxhbnk+IHwgbnVsbCwgbm9kZXM6IFRyZWVOb2RlPGFueT5bXSB8IGFueSwgbGV2ZWw6IG51bWJlciwgdmlzaWJsZTogYm9vbGVhbikge1xuICAgICAgICBpZiAobm9kZXMgJiYgbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKChub2RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvd05vZGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgICAgICAgICAgICBsZXZlbDogbGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHZpc2libGUgJiYgKHBhcmVudCA/IHBhcmVudC5leHBhbmRlZCA6IHRydWUpLFxuICAgICAgICAgICAgICAgICAgICBsYXN0Q2hpbGQ6IGluZGV4ID09PSBub2Rlcy5sZW5ndGggLSAxLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXhcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICh0aGlzLnNlcmlhbGl6ZWRWYWx1ZSBhcyBUcmVlTm9kZTxhbnk+W10pLnB1c2goPFRyZWVOb2RlPnJvd05vZGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJvd05vZGUudmlzaWJsZSAmJiBub2RlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VyaWFsaXplTm9kZXMobm9kZSwgbm9kZS5jaGlsZHJlbiwgbGV2ZWwgKyAxLCByb3dOb2RlLnZpc2libGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ob2RlQ2xpY2soZXZlbnQ6IEV2ZW50LCBub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICBsZXQgZXZlbnRUYXJnZXQgPSA8RWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50VGFyZ2V0LCAncC10cmVlLXRvZ2dsZXInKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50VGFyZ2V0LCAncC10cmVlLXRvZ2dsZXItaWNvbicpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5zZWxlY3RhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUgPSAnLS1wLWZvY3VzLXJpbmctY29sb3I6IG5vbmU7JztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUgPSAnLS1wLWZvY3VzLXJpbmctY29sb3I6IHZhcigtLXByaW1hcnktY29sb3IpJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzRmlsdGVyZWROb2RlcygpKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuZ2V0Tm9kZVdpdGhLZXkoPHN0cmluZz5ub2RlLmtleSwgPFRyZWVOb2RlPGFueT5bXT50aGlzLmZpbHRlcmVkTm9kZXMpIGFzIFRyZWVOb2RlO1xuICAgICAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gaW5kZXggPj0gMDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDaGVja2JveFNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wYWdhdGVTZWxlY3Rpb25Eb3duKSB0aGlzLnByb3BhZ2F0ZURvd24obm9kZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWw6IFRyZWVOb2RlLCBpOiBudW1iZXIpID0+IGkgIT0gaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BhZ2F0ZVNlbGVjdGlvblVwICYmIG5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZVVwKG5vZGUucGFyZW50LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcGFnYXRlU2VsZWN0aW9uRG93bikgdGhpcy5wcm9wYWdhdGVEb3duKG5vZGUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2VsZWN0aW9uID0gWy4uLih0aGlzLnNlbGVjdGlvbiB8fCBbXSksIG5vZGVdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BhZ2F0ZVNlbGVjdGlvblVwICYmIG5vZGUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZVVwKG5vZGUucGFyZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbWV0YVNlbGVjdGlvbiA9IHRoaXMubm9kZVRvdWNoZWQgPyBmYWxzZSA6IHRoaXMubWV0YUtleVNlbGVjdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRhU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKDxLZXlib2FyZEV2ZW50PmV2ZW50KS5tZXRhS2V5IHx8ICg8S2V5Ym9hcmRFdmVudD5ldmVudCkuY3RybEtleTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsOiBUcmVlTm9kZSwgaTogbnVtYmVyKSA9PiBpICE9IGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoPFRyZWVOb2RlPm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9ICFtZXRhS2V5ID8gW10gOiB0aGlzLnNlbGVjdGlvbiB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbiwgbm9kZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbDogVHJlZU5vZGUsIGk6IG51bWJlcikgPT4gaSAhPSBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gWy4uLih0aGlzLnNlbGVjdGlvbiB8fCBbXSksIG5vZGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5vZGVUb3VjaGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25Ob2RlVG91Y2hFbmQoKSB7XG4gICAgICAgIHRoaXMubm9kZVRvdWNoZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uTm9kZVJpZ2h0Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIG5vZGU6IFRyZWVOb2RlPGFueT4pIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnUpIHtcbiAgICAgICAgICAgIGxldCBldmVudFRhcmdldCA9IDxFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBldmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUgJiYgY2xhc3NOYW1lLmluY2x1ZGVzKCdwLXRyZWUtdG9nZ2xlcicpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IGluZGV4ID49IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQoW25vZGVdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LnNob3coZXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlQ29udGV4dE1lbnVTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZTogVHJlZU5vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSAmJiB0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSA/IFt0aGlzLnNlbGVjdGlvbl0gOiB0aGlzLnNlbGVjdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb24uZmluZEluZGV4KChzZWxlY3RlZE5vZGUpID0+IHNlbGVjdGVkTm9kZSA9PT0gbm9kZSB8fCAoc2VsZWN0ZWROb2RlLmtleSA9PT0gbm9kZS5rZXkgJiYgc2VsZWN0ZWROb2RlLmtleSAhPT0gdW5kZWZpbmVkKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHN5bmNOb2RlT3B0aW9uKG5vZGU6IFRyZWVOb2RlLCBwYXJlbnROb2RlczogVHJlZU5vZGU8YW55PltdLCBvcHRpb246IGFueSwgdmFsdWU/OiBhbnkpIHtcbiAgICAgICAgLy8gdG8gc3luY2hyb25pemUgdGhlIG5vZGUgb3B0aW9uIGJldHdlZW4gdGhlIGZpbHRlcmVkIG5vZGVzIGFuZCB0aGUgb3JpZ2luYWwgbm9kZXModGhpcy52YWx1ZSlcbiAgICAgICAgY29uc3QgX25vZGUgPSB0aGlzLmhhc0ZpbHRlcmVkTm9kZXMoKSA/IHRoaXMuZ2V0Tm9kZVdpdGhLZXkoPHN0cmluZz5ub2RlLmtleSwgcGFyZW50Tm9kZXMpIDogbnVsbDtcbiAgICAgICAgaWYgKF9ub2RlKSB7XG4gICAgICAgICAgICAoPGFueT5fbm9kZSlbb3B0aW9uXSA9IHZhbHVlIHx8ICg8YW55Pm5vZGUpW29wdGlvbl07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNGaWx0ZXJlZE5vZGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXJlZE5vZGVzICYmIHRoaXMuZmlsdGVyZWROb2Rlcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgaGFzRmlsdGVyQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQ/LnZhbHVlLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZVdpdGhLZXkoa2V5OiBzdHJpbmcsIG5vZGVzOiBUcmVlTm9kZTxhbnk+W10pOiBUcmVlTm9kZTxhbnk+IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgaWYgKG5vZGUua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hlZE5vZGUgPSB0aGlzLmdldE5vZGVXaXRoS2V5KGtleSwgbm9kZS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZWROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVkTm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9wYWdhdGVVcChub2RlOiBUcmVlTm9kZSwgc2VsZWN0OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDb3VudDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGxldCBjaGlsZFBhcnRpYWxTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ291bnQrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkLnBhcnRpYWxTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZFBhcnRpYWxTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ICYmIHNlbGVjdGVkQ291bnQgPT0gbm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi4odGhpcy5zZWxlY3Rpb24gfHwgW10pLCBub2RlXTtcbiAgICAgICAgICAgICAgICBub2RlLnBhcnRpYWxTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbDogVHJlZU5vZGUsIGk6IG51bWJlcikgPT4gaSAhPSBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRQYXJ0aWFsU2VsZWN0ZWQgfHwgKHNlbGVjdGVkQ291bnQgPiAwICYmIHNlbGVjdGVkQ291bnQgIT0gbm9kZS5jaGlsZHJlbi5sZW5ndGgpKSBub2RlLnBhcnRpYWxTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZWxzZSBub2RlLnBhcnRpYWxTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN5bmNOb2RlT3B0aW9uKG5vZGUsIDxUcmVlTm9kZTxhbnk+W10+dGhpcy5maWx0ZXJlZE5vZGVzLCAncGFydGlhbFNlbGVjdGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlVXAocGFyZW50LCBzZWxlY3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvcGFnYXRlRG93bihub2RlOiBUcmVlTm9kZSwgc2VsZWN0OiBib29sZWFuKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZSk7XG5cbiAgICAgICAgaWYgKHNlbGVjdCAmJiBpbmRleCA9PSAtMSAmJiBub2RlLnNlbGVjdGFibGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi4odGhpcy5zZWxlY3Rpb24gfHwgW10pLCB0aGlzLmZpbHRlclVuc2VsZWN0YWJsZUNoaWxkcmVuKG5vZGUpXTtcbiAgICAgICAgfSBlbHNlIGlmICghc2VsZWN0ICYmIGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWw6IFRyZWVOb2RlLCBpOiBudW1iZXIpID0+IGkgIT0gaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5wYXJ0aWFsU2VsZWN0ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnN5bmNOb2RlT3B0aW9uKG5vZGUsIDxUcmVlTm9kZTxhbnk+W10+dGhpcy5maWx0ZXJlZE5vZGVzLCAncGFydGlhbFNlbGVjdGVkJyk7XG5cbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZURvd24oY2hpbGQsIHNlbGVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaWx0ZXJVbnNlbGVjdGFibGVDaGlsZHJlbihub2RlOiBUcmVlTm9kZSk6IFRyZWVOb2RlIHtcbiAgICAgICAgbGV0IGNsb25lZE5vZGUgPSBPYmplY3QuYXNzaWduKHt9LCBub2RlKTtcblxuICAgICAgICBpZiAoY2xvbmVkTm9kZS5jaGlsZHJlbiAmJiBjbG9uZWROb2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2xvbmVkTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5zZWxlY3RhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBjbG9uZWROb2RlLmNoaWxkcmVuID0gY2xvbmVkTm9kZS5jaGlsZHJlbi5maWx0ZXIoKHZhbDogVHJlZU5vZGUpID0+IHZhbCAhPSBjaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoaWxkID0gdGhpcy5maWx0ZXJVbnNlbGVjdGFibGVDaGlsZHJlbihjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xvbmVkTm9kZTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpICE9IC0xO1xuICAgIH1cblxuICAgIGlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09ICdtdWx0aXBsZSc7XG4gICAgfVxuXG4gICAgaXNDaGVja2JveFNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09ICdjaGVja2JveCc7XG4gICAgfVxuXG4gICAgaXNOb2RlTGVhZihub2RlOiBUcmVlTm9kZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbm9kZS5sZWFmID09IGZhbHNlID8gZmFsc2UgOiAhKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xuICAgIH1cblxuICAgIGdldFJvb3ROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZE5vZGVzID8gdGhpcy5maWx0ZXJlZE5vZGVzIDogdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXRUZW1wbGF0ZUZvck5vZGUobm9kZTogVHJlZU5vZGUpOiBUZW1wbGF0ZVJlZjxhbnk+IHwgbnVsbCB7XG4gICAgICAgIGlmICh0aGlzLl90ZW1wbGF0ZU1hcCkgcmV0dXJuIG5vZGUudHlwZSA/IHRoaXMuX3RlbXBsYXRlTWFwW25vZGUudHlwZV0gOiB0aGlzLl90ZW1wbGF0ZU1hcFsnZGVmYXVsdCddO1xuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIG9uRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kcm9wcGFibGVOb2RlcyAmJiAoIXRoaXMudmFsdWUgfHwgKDxhbnk+dGhpcy52YWx1ZSkubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgKDxhbnk+ZXZlbnQpLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJvcChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU5vZGVzICYmICghdGhpcy52YWx1ZSB8fCAoPGFueT50aGlzLnZhbHVlKS5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IGRyYWdOb2RlID0gdGhpcy5kcmFnTm9kZSBhcyBUcmVlTm9kZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYWxsb3dEcm9wKGRyYWdOb2RlLCBudWxsLCB0aGlzLmRyYWdOb2RlU2NvcGUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRyYWdOb2RlSW5kZXggPSA8bnVtYmVyPnRoaXMuZHJhZ05vZGVJbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSB8fCBbXTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlRHJvcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZURyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGRyYWdOb2RlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NUcmVlRHJvcChkcmFnTm9kZSwgZHJhZ05vZGVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlRHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ05vZGU6IGRyYWdOb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE5vZGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogZHJhZ05vZGVJbmRleFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NUcmVlRHJvcChkcmFnTm9kZSwgZHJhZ05vZGVJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc1RyZWVEcm9wKGRyYWdOb2RlOiBUcmVlTm9kZSwgZHJhZ05vZGVJbmRleDogbnVtYmVyKSB7XG4gICAgICAgICg8VHJlZU5vZGU8YW55PltdPnRoaXMuZHJhZ05vZGVTdWJOb2Rlcykuc3BsaWNlKGRyYWdOb2RlSW5kZXgsIDEpO1xuICAgICAgICAodGhpcy52YWx1ZSBhcyBUcmVlTm9kZTxhbnk+W10pLnB1c2goZHJhZ05vZGUpO1xuICAgICAgICB0aGlzLmRyYWdEcm9wU2VydmljZS5zdG9wRHJhZyh7XG4gICAgICAgICAgICBub2RlOiBkcmFnTm9kZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRyYWdFbnRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTm9kZXMgJiYgdGhpcy5hbGxvd0Ryb3AoPFRyZWVOb2RlPnRoaXMuZHJhZ05vZGUsIG51bGwsIHRoaXMuZHJhZ05vZGVTY29wZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0hvdmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTm9kZXMpIHtcbiAgICAgICAgICAgIGxldCByZWN0ID0gKGV2ZW50LmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnggPiByZWN0LmxlZnQgKyByZWN0LndpZHRoIHx8IGV2ZW50LnggPCByZWN0LmxlZnQgfHwgZXZlbnQueSA+IHJlY3QudG9wICsgcmVjdC5oZWlnaHQgfHwgZXZlbnQueSA8IHJlY3QudG9wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnSG92ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFsbG93RHJvcChkcmFnTm9kZTogVHJlZU5vZGUsIGRyb3BOb2RlOiBUcmVlTm9kZTxhbnk+IHwgbnVsbCwgZHJhZ05vZGVTY29wZTogYW55LCBkcm9wUG9pbnQ6ICdub2RlJyB8ICdiZXR3ZWVuJyA9ICdub2RlJyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWRyYWdOb2RlKSB7XG4gICAgICAgICAgICAvL3ByZXZlbnQgcmFuZG9tIGh0bWwgZWxlbWVudHMgdG8gYmUgZHJhZ2dlZFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNWYWxpZERyYWdTY29wZShkcmFnTm9kZVNjb3BlKSkge1xuICAgICAgICAgICAgbGV0IGFsbG93OiBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChkcm9wTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChkcmFnTm9kZSA9PT0gZHJvcE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gZHJvcE5vZGUucGFyZW50O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAocGFyZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IGRyYWdOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhbGxvdztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVmFsaWREcmFnU2NvcGUoZHJhZ1Njb3BlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGRyb3BTY29wZSA9IHRoaXMuZHJvcHBhYmxlU2NvcGU7XG5cbiAgICAgICAgaWYgKGRyb3BTY29wZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkcm9wU2NvcGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkcmFnU2NvcGUgPT09ICdzdHJpbmcnKSByZXR1cm4gZHJvcFNjb3BlID09PSBkcmFnU2NvcGU7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkcmFnU2NvcGUpKSByZXR1cm4gKDxBcnJheTxhbnk+PmRyYWdTY29wZSkuaW5kZXhPZihkcm9wU2NvcGUpICE9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRyb3BTY29wZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRyYWdTY29wZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8QXJyYXk8YW55Pj5kcm9wU2NvcGUpLmluZGV4T2YoZHJhZ1Njb3BlKSAhPSAtMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZHJhZ1Njb3BlKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBzIG9mIGRyb3BTY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZHMgb2YgZHJhZ1Njb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgPT09IGRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIF9maWx0ZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKGZpbHRlclZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZE5vZGVzID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROb2RlcyA9IFtdO1xuICAgICAgICAgICAgY29uc3Qgc2VhcmNoRmllbGRzOiBzdHJpbmdbXSA9IHRoaXMuZmlsdGVyQnkuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlclRleHQgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKGZpbHRlclZhbHVlKS50b0xvY2FsZUxvd2VyQ2FzZSh0aGlzLmZpbHRlckxvY2FsZSk7XG4gICAgICAgICAgICBjb25zdCBpc1N0cmljdE1vZGUgPSB0aGlzLmZpbHRlck1vZGUgPT09ICdzdHJpY3QnO1xuICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiA8VHJlZU5vZGU8YW55PltdPnRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29weU5vZGUgPSB7IC4uLm5vZGUgfTtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zV2l0aG91dE5vZGUgPSB7IHNlYXJjaEZpZWxkcywgZmlsdGVyVGV4dCwgaXNTdHJpY3RNb2RlIH07XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAoaXNTdHJpY3RNb2RlICYmICh0aGlzLmZpbmRGaWx0ZXJlZE5vZGVzKGNvcHlOb2RlLCBwYXJhbXNXaXRob3V0Tm9kZSkgfHwgdGhpcy5pc0ZpbHRlck1hdGNoZWQoY29weU5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkpIHx8XG4gICAgICAgICAgICAgICAgICAgICghaXNTdHJpY3RNb2RlICYmICh0aGlzLmlzRmlsdGVyTWF0Y2hlZChjb3B5Tm9kZSwgcGFyYW1zV2l0aG91dE5vZGUpIHx8IHRoaXMuZmluZEZpbHRlcmVkTm9kZXMoY29weU5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROb2Rlcy5wdXNoKGNvcHlOb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVNlcmlhbGl6ZWRWYWx1ZSgpO1xuICAgICAgICB0aGlzLm9uRmlsdGVyLmVtaXQoe1xuICAgICAgICAgICAgZmlsdGVyOiBmaWx0ZXJWYWx1ZSxcbiAgICAgICAgICAgIGZpbHRlcmVkVmFsdWU6IHRoaXMuZmlsdGVyZWROb2Rlc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldHMgZmlsdGVyLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVzZXRGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyZWROb2RlcyA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmlld0NoaWxkICYmIHRoaXMuZmlsdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY3JvbGxzIHRvIHZpcnR1YWwgaW5kZXguXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciAtIEluZGV4IHRvIGJlIHNjcm9sbGVkLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgc2Nyb2xsVG9WaXJ0dWFsSW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGwgJiYgdGhpcy5zY3JvbGxlcj8uc2Nyb2xsVG9JbmRleChpbmRleCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjcm9sbHMgdG8gdmlydHVhbCBpbmRleC5cbiAgICAgKiBAcGFyYW0ge1Njcm9sbFRvT3B0aW9uc30gb3B0aW9ucyAtIFNjcm9sbCBvcHRpb25zLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgc2Nyb2xsVG8ob3B0aW9uczogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsZXI/LnNjcm9sbFRvKG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMud3JhcHBlclZpZXdDaGlsZCAmJiB0aGlzLndyYXBwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMud3JhcHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG8ob3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBvcHRpb25zLmxlZnQ7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gb3B0aW9ucy50b3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kRmlsdGVyZWROb2Rlcyhub2RlOiBUcmVlTm9kZSwgcGFyYW1zV2l0aG91dE5vZGU6IGFueSkge1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkTm9kZXMgPSBbLi4ubm9kZS5jaGlsZHJlbl07XG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkTm9kZSBvZiBjaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3B5Q2hpbGROb2RlID0geyAuLi5jaGlsZE5vZGUgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNGaWx0ZXJNYXRjaGVkKGNvcHlDaGlsZE5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goY29weUNoaWxkTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZpbHRlck1hdGNoZWQobm9kZTogVHJlZU5vZGUsIHBhcmFtczogYW55KSB7XG4gICAgICAgIGxldCB7IHNlYXJjaEZpZWxkcywgZmlsdGVyVGV4dCwgaXNTdHJpY3RNb2RlIH0gPSBwYXJhbXM7XG4gICAgICAgIGxldCBtYXRjaGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGZpZWxkIG9mIHNlYXJjaEZpZWxkcykge1xuICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG5vZGUsIGZpZWxkKSkpLnRvTG9jYWxlTG93ZXJDYXNlKHRoaXMuZmlsdGVyTG9jYWxlKTtcbiAgICAgICAgICAgIGlmIChmaWVsZFZhbHVlLmluZGV4T2YoZmlsdGVyVGV4dCkgPiAtMSkge1xuICAgICAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtYXRjaGVkIHx8IChpc1N0cmljdE1vZGUgJiYgIXRoaXMuaXNOb2RlTGVhZihub2RlKSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0aGlzLmZpbmRGaWx0ZXJlZE5vZGVzKG5vZGUsIHsgc2VhcmNoRmllbGRzLCBmaWx0ZXJUZXh0LCBpc1N0cmljdE1vZGUgfSkgfHwgbWF0Y2hlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgIH1cblxuICAgIGdldEluZGV4KG9wdGlvbnM6IGFueSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBnZXRJdGVtT3B0aW9ucyA9IG9wdGlvbnNbJ2dldEl0ZW1PcHRpb25zJ107XG4gICAgICAgIHJldHVybiBnZXRJdGVtT3B0aW9ucyA/IGdldEl0ZW1PcHRpb25zKGluZGV4KS5pbmRleCA6IGluZGV4O1xuICAgIH1cblxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnU3RhcnRTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnU3RvcFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RvcFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFJpcHBsZU1vZHVsZSwgU2Nyb2xsZXJNb2R1bGUsIENoZWNrSWNvbiwgQ2hldnJvbkRvd25JY29uLCBDaGV2cm9uUmlnaHRJY29uLCBNaW51c0ljb24sIFNlYXJjaEljb24sIFNwaW5uZXJJY29uLCBQbHVzSWNvbl0sXG4gICAgZXhwb3J0czogW1RyZWUsIFNoYXJlZE1vZHVsZSwgU2Nyb2xsZXJNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1RyZWUsIFVJVHJlZU5vZGVdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVNb2R1bGUge31cbiJdfQ==