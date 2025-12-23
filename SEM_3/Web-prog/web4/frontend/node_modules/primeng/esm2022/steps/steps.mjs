import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output, ViewChild, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "primeng/tooltip";
/**
 * Steps components is an indicator for the steps in a wizard workflow.
 * @group Components
 */
export class Steps {
    router;
    route;
    cd;
    /**
     * Index of the active item.
     * @group Props
     */
    activeIndex = 0;
    /**
     * An array of menu items.
     * @group Props
     */
    model;
    /**
     * Whether the items are clickable or not.
     * @group Props
     */
    readonly = true;
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
     * Whether to apply 'router-link-active-exact' class if route exactly matches the item path.
     * @group Props
     */
    exact = true;
    /**
     * Callback to invoke when the new step is selected.
     * @param {number} number - current index.
     * @group Emits
     */
    activeIndexChange = new EventEmitter();
    listViewChild;
    constructor(router, route, cd) {
        this.router = router;
        this.route = route;
        this.cd = cd;
    }
    subscription;
    ngOnInit() {
        this.subscription = this.router.events.subscribe(() => this.cd.markForCheck());
    }
    onItemClick(event, item, i) {
        if (this.readonly || item.disabled) {
            event.preventDefault();
            return;
        }
        this.activeIndexChange.emit(i);
        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item,
                index: i
            });
        }
    }
    onItemKeydown(event, item, i) {
        switch (event.code) {
            case 'ArrowRight': {
                this.navigateToNextItem(event.target);
                event.preventDefault();
                break;
            }
            case 'ArrowLeft': {
                this.navigateToPrevItem(event.target);
                event.preventDefault();
                break;
            }
            case 'Home': {
                this.navigateToFirstItem(event.target);
                event.preventDefault();
                break;
            }
            case 'End': {
                this.navigateToLastItem(event.target);
                event.preventDefault();
                break;
            }
            case 'Tab':
                if (i !== this.activeIndex) {
                    const siblings = DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');
                    siblings[i].children[0].tabIndex = '-1';
                    siblings[this.activeIndex].children[0].tabIndex = '0';
                }
                break;
            case 'Enter':
            case 'Space': {
                this.onItemClick(event, item, i);
                event.preventDefault();
                break;
            }
            default:
                break;
        }
    }
    navigateToNextItem(target) {
        const nextItem = this.findNextItem(target);
        nextItem && this.setFocusToMenuitem(target, nextItem);
    }
    navigateToPrevItem(target) {
        const prevItem = this.findPrevItem(target);
        prevItem && this.setFocusToMenuitem(target, prevItem);
    }
    navigateToFirstItem(target) {
        const firstItem = this.findFirstItem();
        firstItem && this.setFocusToMenuitem(target, firstItem);
    }
    navigateToLastItem(target) {
        const lastItem = this.findLastItem();
        lastItem && this.setFocusToMenuitem(target, lastItem);
    }
    findNextItem(item) {
        const nextItem = item.parentElement.nextElementSibling;
        return nextItem ? nextItem.children[0] : null;
    }
    findPrevItem(item) {
        const prevItem = item.parentElement.previousElementSibling;
        return prevItem ? prevItem.children[0] : null;
    }
    findFirstItem() {
        const firstSibling = DomHandler.findSingle(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');
        return firstSibling ? firstSibling.children[0] : null;
    }
    findLastItem() {
        const siblings = DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');
        return siblings ? siblings[siblings.length - 1].children[0] : null;
    }
    setFocusToMenuitem(target, focusableItem) {
        target.tabIndex = '-1';
        focusableItem.tabIndex = '0';
        focusableItem.focus();
    }
    isClickableRouterLink(item) {
        return item.routerLink && !this.readonly && !item.disabled;
    }
    isActive(item, index) {
        if (item.routerLink) {
            let routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            return this.router.isActive(this.router.createUrlTree(routerLink, { relativeTo: this.route }).toString(), false);
        }
        return index === this.activeIndex;
    }
    getItemTabIndex(item, index) {
        if (item.disabled) {
            return '-1';
        }
        if (!item.disabled && this.activeIndex === index) {
            return item.tabindex || '0';
        }
        return item.tabindex ?? '-1';
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Steps, deps: [{ token: i1.Router }, { token: i1.ActivatedRoute }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: Steps, selector: "p-steps", inputs: { activeIndex: ["activeIndex", "activeIndex", numberAttribute], model: "model", readonly: ["readonly", "readonly", booleanAttribute], style: "style", styleClass: "styleClass", exact: ["exact", "exact", booleanAttribute] }, outputs: { activeIndexChange: "activeIndexChange" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "listViewChild", first: true, predicate: ["list"], descendants: true }], ngImport: i0, template: `
        <nav [ngClass]="{ 'p-steps p-component': true, 'p-readonly': readonly }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'steps'">
            <ul #list [attr.data-pc-section]="'menu'">
                <li
                    *ngFor="let item of model; let i = index"
                    class="p-steps-item"
                    #menuitem
                    [ngStyle]="item.style"
                    [class]="item.styleClass"
                    [attr.aria-current]="isActive(item, i) ? 'step' : undefined"
                    [attr.id]="item.id"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{ 'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i)) }"
                    [attr.data-pc-section]="'menuitem'"
                >
                    <a
                        role="link"
                        *ngIf="isClickableRouterLink(item); else elseBlock"
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        (click)="onItemClick($event, item, i)"
                        (keydown)="onItemKeydown($event, item, i)"
                        [target]="item.target"
                        [attr.tabindex]="getItemTabIndex(item, i)"
                        [attr.aria-disabled]="item.disabled || (readonly && i !== activeIndex)"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                        [attr.aria-current]="i === activeIndex ? 'step' : null"
                    >
                        <span class="p-steps-number">{{ i + 1 }}</span>
                        <span class="p-steps-title" *ngIf="item.escape !== false; else htmlLabel"> {{ item.label }}</span>
                        <ng-template #htmlLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            role="link"
                            [attr.href]="item.url"
                            class="p-menuitem-link"
                            (click)="onItemClick($event, item, i)"
                            (keydown)="onItemKeydown($event, item, i)"
                            [target]="item.target"
                            [attr.tabindex]="getItemTabIndex(item, i)"
                            [attr.aria-disabled]="item.disabled || (readonly && i !== activeIndex)"
                            [attr.aria-current]="i === activeIndex ? 'step' : null"
                        >
                            <span class="p-steps-number">{{ i + 1 }} </span>
                            <span class="p-steps-title" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                            <ng-template #htmlRouteLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </nav>
    `, isInline: true, styles: ["@layer primeng{.p-steps{position:relative}.p-steps ul{padding:0;margin:0;list-style-type:none;display:flex}.p-steps-item{position:relative;display:flex;justify-content:center;flex:1 1 auto}.p-steps-item .p-menuitem-link{display:inline-flex;flex-direction:column;align-items:center;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{display:flex;align-items:center;justify-content:center}.p-steps-title{display:block}}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i1.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i3.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Steps, decorators: [{
            type: Component,
            args: [{ selector: 'p-steps', template: `
        <nav [ngClass]="{ 'p-steps p-component': true, 'p-readonly': readonly }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'steps'">
            <ul #list [attr.data-pc-section]="'menu'">
                <li
                    *ngFor="let item of model; let i = index"
                    class="p-steps-item"
                    #menuitem
                    [ngStyle]="item.style"
                    [class]="item.styleClass"
                    [attr.aria-current]="isActive(item, i) ? 'step' : undefined"
                    [attr.id]="item.id"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{ 'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i)) }"
                    [attr.data-pc-section]="'menuitem'"
                >
                    <a
                        role="link"
                        *ngIf="isClickableRouterLink(item); else elseBlock"
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        (click)="onItemClick($event, item, i)"
                        (keydown)="onItemKeydown($event, item, i)"
                        [target]="item.target"
                        [attr.tabindex]="getItemTabIndex(item, i)"
                        [attr.aria-disabled]="item.disabled || (readonly && i !== activeIndex)"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                        [attr.aria-current]="i === activeIndex ? 'step' : null"
                    >
                        <span class="p-steps-number">{{ i + 1 }}</span>
                        <span class="p-steps-title" *ngIf="item.escape !== false; else htmlLabel"> {{ item.label }}</span>
                        <ng-template #htmlLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            role="link"
                            [attr.href]="item.url"
                            class="p-menuitem-link"
                            (click)="onItemClick($event, item, i)"
                            (keydown)="onItemKeydown($event, item, i)"
                            [target]="item.target"
                            [attr.tabindex]="getItemTabIndex(item, i)"
                            [attr.aria-disabled]="item.disabled || (readonly && i !== activeIndex)"
                            [attr.aria-current]="i === activeIndex ? 'step' : null"
                        >
                            <span class="p-steps-number">{{ i + 1 }} </span>
                            <span class="p-steps-title" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                            <ng-template #htmlRouteLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </nav>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-steps{position:relative}.p-steps ul{padding:0;margin:0;list-style-type:none;display:flex}.p-steps-item{position:relative;display:flex;justify-content:center;flex:1 1 auto}.p-steps-item .p-menuitem-link{display:inline-flex;flex-direction:column;align-items:center;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{display:flex;align-items:center;justify-content:center}.p-steps-title{display:block}}\n"] }]
        }], ctorParameters: () => [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i0.ChangeDetectorRef }], propDecorators: { activeIndex: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], model: [{
                type: Input
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], exact: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], activeIndexChange: [{
                type: Output
            }], listViewChild: [{
                type: ViewChild,
                args: ['list', { static: false }]
            }] } });
export class StepsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: StepsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: StepsModule, declarations: [Steps], imports: [CommonModule, RouterModule, TooltipModule], exports: [Steps, RouterModule, TooltipModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: StepsModule, imports: [CommonModule, RouterModule, TooltipModule, RouterModule, TooltipModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: StepsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule],
                    exports: [Steps, RouterModule, TooltipModule],
                    declarations: [Steps]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3RlcHMvc3RlcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3TixPQUFPLEVBQTBCLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUVoRDs7O0dBR0c7QUF3RUgsTUFBTSxPQUFPLEtBQUs7SUF5Q0Y7SUFDQTtJQUNBO0lBMUNaOzs7T0FHRztJQUNvQyxXQUFXLEdBQVcsQ0FBQyxDQUFDO0lBQy9EOzs7T0FHRztJQUNNLEtBQUssQ0FBeUI7SUFDdkM7OztPQUdHO0lBQ3FDLFFBQVEsR0FBWSxJQUFJLENBQUM7SUFDakU7OztPQUdHO0lBQ00sS0FBSyxDQUE4QztJQUM1RDs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNxQyxLQUFLLEdBQVksSUFBSSxDQUFDO0lBQzlEOzs7O09BSUc7SUFDTyxpQkFBaUIsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUV6QyxhQUFhLENBQXVCO0lBRTFFLFlBQ1ksTUFBYyxFQUNkLEtBQXFCLEVBQ3JCLEVBQXFCO1FBRnJCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtJQUM5QixDQUFDO0lBRUosWUFB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LFdBQVc7cUJBQ3JCO3dJQU9zQyxXQUFXO3NCQUFqRCxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRTtnQkFLNUIsS0FBSztzQkFBYixLQUFLO2dCQUtrQyxRQUFRO3NCQUEvQyxLQUFLO3VCQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO2dCQUs3QixLQUFLO3NCQUFiLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLa0MsS0FBSztzQkFBNUMsS0FBSzt1QkFBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTtnQkFNNUIsaUJBQWlCO3NCQUExQixNQUFNO2dCQUUrQixhQUFhO3NCQUFsRCxTQUFTO3VCQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0FBcUt4QyxNQUFNLE9BQU8sV0FBVzt1R0FBWCxXQUFXO3dHQUFYLFdBQVcsaUJBM01YLEtBQUssYUF1TUosWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLGFBdk0xQyxLQUFLLEVBd01HLFlBQVksRUFBRSxhQUFhO3dHQUduQyxXQUFXLFlBSlYsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQ2xDLFlBQVksRUFBRSxhQUFhOzsyRkFHbkMsV0FBVztrQkFMdkIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQztvQkFDcEQsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7b0JBQzdDLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQztpQkFDeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nTW9kdWxlLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBib29sZWFuQXR0cmlidXRlLCBudW1iZXJBdHRyaWJ1dGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuLyoqXG4gKiBTdGVwcyBjb21wb25lbnRzIGlzIGFuIGluZGljYXRvciBmb3IgdGhlIHN0ZXBzIGluIGEgd2l6YXJkIHdvcmtmbG93LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXN0ZXBzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmF2IFtuZ0NsYXNzXT1cInsgJ3Atc3RlcHMgcC1jb21wb25lbnQnOiB0cnVlLCAncC1yZWFkb25seSc6IHJlYWRvbmx5IH1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidzdGVwcydcIj5cbiAgICAgICAgICAgIDx1bCAjbGlzdCBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21lbnUnXCI+XG4gICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIG1vZGVsOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXN0ZXBzLWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAjbWVudWl0ZW1cbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiaXRlbS5zdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJpdGVtLnN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWN1cnJlbnRdPVwiaXNBY3RpdmUoaXRlbSwgaSkgPyAnc3RlcCcgOiB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJpdGVtLmlkXCJcbiAgICAgICAgICAgICAgICAgICAgcFRvb2x0aXBcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBPcHRpb25zXT1cIml0ZW0udG9vbHRpcE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWhpZ2hsaWdodCBwLXN0ZXBzLWN1cnJlbnQnOiBpc0FjdGl2ZShpdGVtLCBpKSwgJ3AtZGlzYWJsZWQnOiBpdGVtLmRpc2FibGVkIHx8IChyZWFkb25seSAmJiAhaXNBY3RpdmUoaXRlbSwgaSkpIH1cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21lbnVpdGVtJ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cImxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0NsaWNrYWJsZVJvdXRlckxpbmsoaXRlbSk7IGVsc2UgZWxzZUJsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiaXRlbS5xdWVyeVBhcmFtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cIml0ZW0ucm91dGVyTGlua0FjdGl2ZU9wdGlvbnMgfHwgeyBleGFjdDogZmFsc2UgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkl0ZW1LZXlkb3duKCRldmVudCwgaXRlbSwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3RhcmdldF09XCJpdGVtLnRhcmdldFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJnZXRJdGVtVGFiSW5kZXgoaXRlbSwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJpdGVtLmRpc2FibGVkIHx8IChyZWFkb25seSAmJiBpICE9PSBhY3RpdmVJbmRleClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiaXRlbS5xdWVyeVBhcmFtc0hhbmRsaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZUZyYWdtZW50XT1cIml0ZW0ucHJlc2VydmVGcmFnbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cIml0ZW0ucmVwbGFjZVVybFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiaXRlbS5zdGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWN1cnJlbnRdPVwiaSA9PT0gYWN0aXZlSW5kZXggPyAnc3RlcCcgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXN0ZXBzLW51bWJlclwiPnt7IGkgKyAxIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXN0ZXBzLXRpdGxlXCIgKm5nSWY9XCJpdGVtLmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbExhYmVsXCI+IHt7IGl0ZW0ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxMYWJlbD48c3BhbiBjbGFzcz1cInAtc3RlcHMtdGl0bGVcIiBbaW5uZXJIVE1MXT1cIml0ZW0ubGFiZWxcIj48L3NwYW4+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2Vsc2VCbG9jaz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cImxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmhyZWZdPVwiaXRlbS51cmxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LCBpdGVtLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25JdGVtS2V5ZG93bigkZXZlbnQsIGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJnZXRJdGVtVGFiSW5kZXgoaXRlbSwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiaXRlbS5kaXNhYmxlZCB8fCAocmVhZG9ubHkgJiYgaSAhPT0gYWN0aXZlSW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWN1cnJlbnRdPVwiaSA9PT0gYWN0aXZlSW5kZXggPyAnc3RlcCcgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtc3RlcHMtbnVtYmVyXCI+e3sgaSArIDEgfX0gPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1zdGVwcy10aXRsZVwiICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxSb3V0ZUxhYmVsXCI+e3sgaXRlbS5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1zdGVwcy10aXRsZVwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L25hdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc3RlcHMuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFN0ZXBzIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBhY3RpdmUgaXRlbS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBhY3RpdmVJbmRleDogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBtZW51IGl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGl0ZW1zIGFyZSBjbGlja2FibGUgb3Igbm90LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZWFkb25seTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBhcHBseSAncm91dGVyLWxpbmstYWN0aXZlLWV4YWN0JyBjbGFzcyBpZiByb3V0ZSBleGFjdGx5IG1hdGNoZXMgdGhlIGl0ZW0gcGF0aC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZXhhY3Q6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBuZXcgc3RlcCBpcyBzZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gY3VycmVudCBpbmRleC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgYWN0aXZlSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdsaXN0JywgeyBzdGF0aWM6IGZhbHNlIH0pIGxpc3RWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkge31cblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudDogRXZlbnQsIGl0ZW06IE1lbnVJdGVtLCBpOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChpKTtcblxuICAgICAgICBpZiAoIWl0ZW0udXJsICYmICFpdGVtLnJvdXRlckxpbmspIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICAgICAgaW5kZXg6IGlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgaXRlbTogTWVudUl0ZW0sIGk6IG51bWJlcikge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTmV4dEl0ZW0oZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvUHJldkl0ZW0oZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlICdIb21lJzoge1xuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb0ZpcnN0SXRlbShldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9MYXN0SXRlbShldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IHRoaXMuYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2libGluZ3MgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwibWVudWl0ZW1cIl0nKTtcbiAgICAgICAgICAgICAgICAgICAgc2libGluZ3NbaV0uY2hpbGRyZW5bMF0udGFiSW5kZXggPSAnLTEnO1xuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nc1t0aGlzLmFjdGl2ZUluZGV4XS5jaGlsZHJlblswXS50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzoge1xuICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2xpY2soZXZlbnQsIGl0ZW0sIGkpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvTmV4dEl0ZW0odGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IG5leHRJdGVtID0gdGhpcy5maW5kTmV4dEl0ZW0odGFyZ2V0KTtcblxuICAgICAgICBuZXh0SXRlbSAmJiB0aGlzLnNldEZvY3VzVG9NZW51aXRlbSh0YXJnZXQsIG5leHRJdGVtKTtcbiAgICB9XG4gICAgbmF2aWdhdGVUb1ByZXZJdGVtKHRhcmdldCkge1xuICAgICAgICBjb25zdCBwcmV2SXRlbSA9IHRoaXMuZmluZFByZXZJdGVtKHRhcmdldCk7XG5cbiAgICAgICAgcHJldkl0ZW0gJiYgdGhpcy5zZXRGb2N1c1RvTWVudWl0ZW0odGFyZ2V0LCBwcmV2SXRlbSk7XG4gICAgfVxuICAgIG5hdmlnYXRlVG9GaXJzdEl0ZW0odGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IHRoaXMuZmluZEZpcnN0SXRlbSgpO1xuXG4gICAgICAgIGZpcnN0SXRlbSAmJiB0aGlzLnNldEZvY3VzVG9NZW51aXRlbSh0YXJnZXQsIGZpcnN0SXRlbSk7XG4gICAgfVxuICAgIG5hdmlnYXRlVG9MYXN0SXRlbSh0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW0gPSB0aGlzLmZpbmRMYXN0SXRlbSgpO1xuXG4gICAgICAgIGxhc3RJdGVtICYmIHRoaXMuc2V0Rm9jdXNUb01lbnVpdGVtKHRhcmdldCwgbGFzdEl0ZW0pO1xuICAgIH1cbiAgICBmaW5kTmV4dEl0ZW0oaXRlbSkge1xuICAgICAgICBjb25zdCBuZXh0SXRlbSA9IGl0ZW0ucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgcmV0dXJuIG5leHRJdGVtID8gbmV4dEl0ZW0uY2hpbGRyZW5bMF0gOiBudWxsO1xuICAgIH1cbiAgICBmaW5kUHJldkl0ZW0oaXRlbSkge1xuICAgICAgICBjb25zdCBwcmV2SXRlbSA9IGl0ZW0ucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIHJldHVybiBwcmV2SXRlbSA/IHByZXZJdGVtLmNoaWxkcmVuWzBdIDogbnVsbDtcbiAgICB9XG4gICAgZmluZEZpcnN0SXRlbSgpIHtcbiAgICAgICAgY29uc3QgZmlyc3RTaWJsaW5nID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cIm1lbnVpdGVtXCJdJyk7XG5cbiAgICAgICAgcmV0dXJuIGZpcnN0U2libGluZyA/IGZpcnN0U2libGluZy5jaGlsZHJlblswXSA6IG51bGw7XG4gICAgfVxuICAgIGZpbmRMYXN0SXRlbSgpIHtcbiAgICAgICAgY29uc3Qgc2libGluZ3MgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwibWVudWl0ZW1cIl0nKTtcblxuICAgICAgICByZXR1cm4gc2libGluZ3MgPyBzaWJsaW5nc1tzaWJsaW5ncy5sZW5ndGggLSAxXS5jaGlsZHJlblswXSA6IG51bGw7XG4gICAgfVxuICAgIHNldEZvY3VzVG9NZW51aXRlbSh0YXJnZXQsIGZvY3VzYWJsZUl0ZW0pIHtcbiAgICAgICAgdGFyZ2V0LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgZm9jdXNhYmxlSXRlbS50YWJJbmRleCA9ICcwJztcbiAgICAgICAgZm9jdXNhYmxlSXRlbS5mb2N1cygpO1xuICAgIH1cblxuICAgIGlzQ2xpY2thYmxlUm91dGVyTGluayhpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5yb3V0ZXJMaW5rICYmICF0aGlzLnJlYWRvbmx5ICYmICFpdGVtLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGlzQWN0aXZlKGl0ZW06IE1lbnVJdGVtLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpdGVtLnJvdXRlckxpbmspIHtcbiAgICAgICAgICAgIGxldCByb3V0ZXJMaW5rID0gQXJyYXkuaXNBcnJheShpdGVtLnJvdXRlckxpbmspID8gaXRlbS5yb3V0ZXJMaW5rIDogW2l0ZW0ucm91dGVyTGlua107XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlci5pc0FjdGl2ZSh0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKHJvdXRlckxpbmssIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KS50b1N0cmluZygpLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXggPT09IHRoaXMuYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0SXRlbVRhYkluZGV4KGl0ZW06IE1lbnVJdGVtLCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAnLTEnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpdGVtLmRpc2FibGVkICYmIHRoaXMuYWN0aXZlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50YWJpbmRleCB8fCAnMCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXRlbS50YWJpbmRleCA/PyAnLTEnO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBUb29sdGlwTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU3RlcHMsIFJvdXRlck1vZHVsZSwgVG9vbHRpcE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU3RlcHNdXG59KVxuZXhwb3J0IGNsYXNzIFN0ZXBzTW9kdWxlIHt9XG4iXX0=