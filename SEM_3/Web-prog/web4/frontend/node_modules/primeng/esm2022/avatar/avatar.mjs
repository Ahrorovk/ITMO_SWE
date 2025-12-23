import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Avatar represents people using icons, labels and images.
 * @group Components
 */
export class Avatar {
    /**
     * Defines the text to display.
     * @group Props
     */
    label;
    /**
     * Defines the icon to display.
     * @group Props
     */
    icon;
    /**
     * Defines the image to display.
     * @group Props
     */
    image;
    /**
     * Size of the element.
     * @group Props
     */
    size = 'normal';
    /**
     * Shape of the element.
     * @group Props
     */
    shape = 'square';
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
     * Establishes a string value that labels the component.
     * @group Props
     */
    ariaLabel;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onImageError = new EventEmitter();
    /**
     * Holds the current style of the component to allow dynamic updates.
     */
    currentStyle = {};
    containerClass() {
        return {
            'p-avatar p-component': true,
            'p-avatar-image': this.image != null,
            'p-avatar-circle': this.shape === 'circle',
            'p-avatar-lg': this.size === 'large',
            'p-avatar-xl': this.size === 'xlarge'
        };
    }
    /**
     * Lifecycle hook to detect changes in inputs.
     */
    ngOnChanges(changes) {
        if (changes['style']) {
            this.currentStyle = { ...changes['style'].currentValue };
        }
    }
    imageError(event) {
        this.onImageError.emit(event);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Avatar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: Avatar, selector: "p-avatar", inputs: { label: "label", icon: "icon", image: "image", size: "size", shape: "shape", style: "style", styleClass: "styleClass", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy" }, outputs: { onImageError: "onImageError" }, host: { classAttribute: "p-element" }, usesOnChanges: true, ngImport: i0, template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="currentStyle" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel" [attr.data-pc-name]="'avatar'">
            <ng-content></ng-content>
            <span class="p-avatar-text" *ngIf="label; else iconTemplate">{{ label }}</span>
            <ng-template #iconTemplate><span [class]="icon" [ngClass]="'p-avatar-icon'" *ngIf="icon; else imageTemplate"></span></ng-template>
            <ng-template #imageTemplate><img [src]="image" *ngIf="image" (error)="imageError($event)" [attr.aria-label]="ariaLabel" /></ng-template>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-avatar{display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;font-size:1rem}.p-avatar.p-avatar-image{background-color:transparent}.p-avatar.p-avatar-circle{border-radius:50%;overflow:hidden}.p-avatar .p-avatar-icon{font-size:1rem}.p-avatar img{width:100%;height:100%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: Avatar, decorators: [{
            type: Component,
            args: [{ selector: 'p-avatar', template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="currentStyle" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel" [attr.data-pc-name]="'avatar'">
            <ng-content></ng-content>
            <span class="p-avatar-text" *ngIf="label; else iconTemplate">{{ label }}</span>
            <ng-template #iconTemplate><span [class]="icon" [ngClass]="'p-avatar-icon'" *ngIf="icon; else imageTemplate"></span></ng-template>
            <ng-template #imageTemplate><img [src]="image" *ngIf="image" (error)="imageError($event)" [attr.aria-label]="ariaLabel" /></ng-template>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-avatar{display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;font-size:1rem}.p-avatar.p-avatar-image{background-color:transparent}.p-avatar.p-avatar-circle{border-radius:50%;overflow:hidden}.p-avatar .p-avatar-icon{font-size:1rem}.p-avatar img{width:100%;height:100%}}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], icon: [{
                type: Input
            }], image: [{
                type: Input
            }], size: [{
                type: Input
            }], shape: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], onImageError: [{
                type: Output
            }] } });
export class AvatarModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AvatarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: AvatarModule, declarations: [Avatar], imports: [CommonModule], exports: [Avatar] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AvatarModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AvatarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Avatar],
                    declarations: [Avatar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2F2YXRhci9hdmF0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUE0QixNQUFNLGVBQWUsQ0FBQzs7O0FBRXZKOzs7R0FHRztBQWtCSCxNQUFNLE9BQU8sTUFBTTtJQUNmOzs7T0FHRztJQUNNLEtBQUssQ0FBcUI7SUFDbkM7OztPQUdHO0lBQ00sSUFBSSxDQUFxQjtJQUNsQzs7O09BR0c7SUFDTSxLQUFLLENBQXFCO0lBQ25DOzs7T0FHRztJQUNNLElBQUksR0FBOEMsUUFBUSxDQUFDO0lBQ3BFOzs7T0FHRztJQUNNLEtBQUssR0FBb0MsUUFBUSxDQUFDO0lBQzNEOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxTQUFTLENBQXFCO0lBQ3ZDOzs7T0FHRztJQUNNLGNBQWMsQ0FBcUI7SUFDNUM7Ozs7T0FJRztJQUNPLFlBQVksR0FBd0IsSUFBSSxZQUFZLEVBQVMsQ0FBQztJQUV4RTs7T0FFRztJQUNILFlBQVksR0FBZ0QsRUFBRSxDQUFDO0lBRS9ELGNBQWM7UUFDVixPQUFPO1lBQ0gsc0JBQXNCLEVBQUUsSUFBSTtZQUM1QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7WUFDcEMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRO1lBQzFDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU87WUFDcEMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUTtTQUN4QyxDQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdELENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQVk7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQzt1R0EvRVEsTUFBTTsyRkFBTixNQUFNLG1WQWZMOzs7Ozs7O0tBT1Q7OzJGQVFRLE1BQU07a0JBakJsQixTQUFTOytCQUNJLFVBQVUsWUFDVjs7Ozs7OztLQU9ULG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBRS9CO3dCQUNGLEtBQUssRUFBRSxXQUFXO3FCQUNyQjs4QkFPUSxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csSUFBSTtzQkFBWixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxJQUFJO3NCQUFaLEtBQUs7Z0JBS0csS0FBSztzQkFBYixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBS0csY0FBYztzQkFBdEIsS0FBSztnQkFNSSxZQUFZO3NCQUFyQixNQUFNOztBQW9DWCxNQUFNLE9BQU8sWUFBWTt1R0FBWixZQUFZO3dHQUFaLFlBQVksaUJBdkZaLE1BQU0sYUFtRkwsWUFBWSxhQW5GYixNQUFNO3dHQXVGTixZQUFZLFlBSlgsWUFBWTs7MkZBSWIsWUFBWTtrQkFMeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztvQkFDakIsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ01vZHVsZSwgT3V0cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQXZhdGFyIHJlcHJlc2VudHMgcGVvcGxlIHVzaW5nIGljb25zLCBsYWJlbHMgYW5kIGltYWdlcy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1hdmF0YXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiY3VycmVudFN0eWxlXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2F2YXRhcidcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1hdmF0YXItdGV4dFwiICpuZ0lmPVwibGFiZWw7IGVsc2UgaWNvblRlbXBsYXRlXCI+e3sgbGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2ljb25UZW1wbGF0ZT48c3BhbiBbY2xhc3NdPVwiaWNvblwiIFtuZ0NsYXNzXT1cIidwLWF2YXRhci1pY29uJ1wiICpuZ0lmPVwiaWNvbjsgZWxzZSBpbWFnZVRlbXBsYXRlXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2ltYWdlVGVtcGxhdGU+PGltZyBbc3JjXT1cImltYWdlXCIgKm5nSWY9XCJpbWFnZVwiIChlcnJvcik9XCJpbWFnZUVycm9yKCRldmVudClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIC8+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2F2YXRhci5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQXZhdGFyIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSB0ZXh0IHRvIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBpY29uIHRvIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGltYWdlIHRvIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW1hZ2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTaXplIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNpemU6ICdub3JtYWwnIHwgJ2xhcmdlJyB8ICd4bGFyZ2UnIHwgdW5kZWZpbmVkID0gJ25vcm1hbCc7XG4gICAgLyoqXG4gICAgICogU2hhcGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hhcGU6ICdzcXVhcmUnIHwgJ2NpcmNsZScgfCB1bmRlZmluZWQgPSAnc3F1YXJlJztcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEVzdGFibGlzaGVzIGEgc3RyaW5nIHZhbHVlIHRoYXQgbGFiZWxzIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRXN0YWJsaXNoZXMgcmVsYXRpb25zaGlwcyBiZXR3ZWVuIHRoZSBjb21wb25lbnQgYW5kIGxhYmVsKHMpIHdoZXJlIGl0cyB2YWx1ZSBzaG91bGQgYmUgb25lIG9yIG1vcmUgZWxlbWVudCBJRHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaGlzIGV2ZW50IGlzIHRyaWdnZXJlZCBpZiBhbiBlcnJvciBvY2N1cnMgd2hpbGUgbG9hZGluZyBhbiBpbWFnZSBmaWxlLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25JbWFnZUVycm9yOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIEhvbGRzIHRoZSBjdXJyZW50IHN0eWxlIG9mIHRoZSBjb21wb25lbnQgdG8gYWxsb3cgZHluYW1pYyB1cGRhdGVzLlxuICAgICAqL1xuICAgIGN1cnJlbnRTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZCA9IHt9O1xuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1hdmF0YXIgcC1jb21wb25lbnQnOiB0cnVlLFxuICAgICAgICAgICAgJ3AtYXZhdGFyLWltYWdlJzogdGhpcy5pbWFnZSAhPSBudWxsLFxuICAgICAgICAgICAgJ3AtYXZhdGFyLWNpcmNsZSc6IHRoaXMuc2hhcGUgPT09ICdjaXJjbGUnLFxuICAgICAgICAgICAgJ3AtYXZhdGFyLWxnJzogdGhpcy5zaXplID09PSAnbGFyZ2UnLFxuICAgICAgICAgICAgJ3AtYXZhdGFyLXhsJzogdGhpcy5zaXplID09PSAneGxhcmdlJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpZmVjeWNsZSBob29rIHRvIGRldGVjdCBjaGFuZ2VzIGluIGlucHV0cy5cbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydzdHlsZSddKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdHlsZSA9IHsgLi4uY2hhbmdlc1snc3R5bGUnXS5jdXJyZW50VmFsdWUgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGltYWdlRXJyb3IoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25JbWFnZUVycm9yLmVtaXQoZXZlbnQpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQXZhdGFyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtBdmF0YXJdXG59KVxuZXhwb3J0IGNsYXNzIEF2YXRhck1vZHVsZSB7fVxuIl19