/*
    Port of jQuery MaskedInput by DigitalBush as a Native Angular2 Component in Typescript without jQuery
    https://github.com/digitalBush/jquery.maskedinput/

    Copyright (c) 2007-2014 Josh Bush (digitalbush.com)

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
*/
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, booleanAttribute, forwardRef, numberAttribute } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { DomHandler } from 'primeng/dom';
import { TimesIcon } from 'primeng/icons/times';
import { InputTextModule } from 'primeng/inputtext';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/inputtext";
import * as i4 from "primeng/autofocus";
export const INPUTMASK_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputMask),
    multi: true
};
/**
 * InputMask component is used to enter input in a certain format such as numeric, date, currency, email and phone.
 * @group Components
 */
export class InputMask {
    document;
    platformId;
    el;
    cd;
    config;
    /**
     * HTML5 input type.
     * @group Props
     */
    type = 'text';
    /**
     * Placeholder character in mask, default is underscore.
     * @group Props
     */
    slotChar = '_';
    /**
     * Clears the incomplete value on blur.
     * @group Props
     */
    autoClear = true;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * Inline style of the input field.
     * @group Props
     */
    style;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Style class of the input field.
     * @group Props
     */
    styleClass;
    /**
     * Advisory information to display on input.
     * @group Props
     */
    placeholder;
    /**
     * Size of the input field.
     * @group Props
     */
    size;
    /**
     * Maximum number of character allows in the input field.
     * @group Props
     */
    maxlength;
    /**
     * Specifies tab order of the element.
     * @group Props
     */
    tabindex;
    /**
     * Title text of the input text.
     * @group Props
     */
    title;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    variant = 'outlined';
    /**
     * Used to define a string that labels the input element.
     * @group Props
     */
    ariaLabel;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Used to indicate that user input is required on an element before a form can be submitted.
     * @group Props
     */
    ariaRequired;
    /**
     * When present, it specifies that the element value cannot be altered.
     * @group Props
     */
    disabled;
    /**
     * When present, it specifies that an input field is read-only.
     * @group Props
     */
    readonly;
    /**
     * Defines if ngModel sets the raw unmasked value to bound value or the formatted mask value.
     * @group Props
     */
    unmask;
    /**
     * Name of the input field.
     * @group Props
     */
    name;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    required;
    /**
     * Regex pattern for alpha characters
     * @group Props
     */
    characterPattern = '[A-Za-z]';
    /**
     * When present, the input gets a focus automatically on load.
     * @group Props
     */
    autofocus;
    /**
     * When present, the input gets a focus automatically on load.
     * @group Props
     * @deprecated Use autofocus property instead.
     */
    set autoFocus(value) {
        this.autofocus = value;
        console.warn('autoFocus is deprecated. Use autofocus property instead.');
    }
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    autocomplete;
    /**
     * When present, it specifies that whether to clean buffer value from model.
     * @group Props
     */
    keepBuffer = false;
    /**
     * Mask pattern.
     * @group Props
     */
    get mask() {
        return this._mask;
    }
    set mask(val) {
        this._mask = val;
        this.initMask();
        this.writeValue('');
        this.onModelChange(this.value);
    }
    /**
     * Callback to invoke when the mask is completed.
     * @group Emits
     */
    onComplete = new EventEmitter();
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
     * Callback to invoke on input.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onInput = new EventEmitter();
    /**
     * Callback to invoke on input key press.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onKeydown = new EventEmitter();
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    onClear = new EventEmitter();
    inputViewChild;
    templates;
    clearIconTemplate;
    value;
    _mask;
    onModelChange = () => { };
    onModelTouched = () => { };
    input;
    filled;
    defs;
    tests;
    partialPosition;
    firstNonMaskPos;
    lastRequiredNonMaskPos;
    len;
    oldVal;
    buffer;
    defaultBuffer;
    focusText;
    caretTimeoutId;
    androidChrome = true;
    focused;
    _variant = 'outlined';
    get inputClass() {
        return {
            'p-inputmask': true
        };
    }
    constructor(document, platformId, el, cd, config) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.cd = cd;
        this.config = config;
    }
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            let ua = navigator.userAgent;
            this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
        }
        this.initMask();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
            }
        });
    }
    initMask() {
        this.tests = [];
        this.partialPosition = this.mask.length;
        this.len = this.mask.length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            a: this.characterPattern,
            '*': `${this.characterPattern}|[0-9]`
        };
        let maskTokens = this.mask.split('');
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c == '?') {
                this.len--;
                this.partialPosition = i;
            }
            else if (this.defs[c]) {
                this.tests.push(new RegExp(this.defs[c]));
                if (this.firstNonMaskPos === null) {
                    this.firstNonMaskPos = this.tests.length - 1;
                }
                if (i < this.partialPosition) {
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
            }
            else {
                this.tests.push(null);
            }
        }
        this.buffer = [];
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c != '?') {
                if (this.defs[c])
                    this.buffer.push(this.getPlaceholder(i));
                else
                    this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');
    }
    writeValue(value) {
        this.value = value;
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.value == undefined || this.value == null)
                this.inputViewChild.nativeElement.value = '';
            else
                this.inputViewChild.nativeElement.value = this.value;
            this.checkVal();
            this.focusText = this.inputViewChild.nativeElement.value;
            this.updateFilledState();
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
    caret(first, last) {
        let range, begin, end;
        if (!this.inputViewChild?.nativeElement.offsetParent || this.inputViewChild.nativeElement !== this.inputViewChild.nativeElement.ownerDocument.activeElement) {
            return;
        }
        if (typeof first == 'number') {
            begin = first;
            end = typeof last === 'number' ? last : begin;
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                this.inputViewChild.nativeElement.setSelectionRange(begin, end);
            }
            else if (this.inputViewChild.nativeElement['createTextRange']) {
                range = this.inputViewChild.nativeElement['createTextRange']();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        }
        else {
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                begin = this.inputViewChild.nativeElement.selectionStart;
                end = this.inputViewChild.nativeElement.selectionEnd;
            }
            else if (this.document && this.document['selection'].createRange) {
                range = this.document.createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return { begin: begin, end: end };
        }
    }
    isCompleted() {
        let completed;
        for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
            if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
                return false;
            }
        }
        return true;
    }
    getPlaceholder(i) {
        if (i < this.slotChar.length) {
            return this.slotChar.charAt(i);
        }
        return this.slotChar.charAt(0);
    }
    seekNext(pos) {
        while (++pos < this.len && !this.tests[pos])
            ;
        return pos;
    }
    seekPrev(pos) {
        while (--pos >= 0 && !this.tests[pos])
            ;
        return pos;
    }
    shiftL(begin, end) {
        let i, j;
        if (begin < 0) {
            return;
        }
        for (i = begin, j = this.seekNext(end); i < this.len; i++) {
            if (this.tests[i]) {
                if (j < this.len && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                }
                else {
                    break;
                }
                j = this.seekNext(j);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos, begin));
    }
    shiftR(pos) {
        let i, c, j, t;
        for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.len && this.tests[j].test(t)) {
                    c = t;
                }
                else {
                    break;
                }
            }
        }
    }
    handleAndroidInput(e) {
        var curVal = this.inputViewChild?.nativeElement.value;
        var pos = this.caret();
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
            // a deletion or backspace happened
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin])
                pos.begin--;
            if (pos.begin === 0) {
                while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin])
                    pos.begin++;
            }
            setTimeout(() => {
                const begin = pos.begin;
                const end = this.seekNext(begin);
                this.caret(begin, begin);
                this.clearBuffer(begin, end - 1);
                if (this.keepBuffer) {
                    this.shiftL(begin, end - 2);
                }
                else {
                    this.shiftL(begin, end - 1);
                }
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
        else {
            this.checkVal(true);
            while (pos.begin < this.len && !this.tests[pos.begin - 1])
                pos.begin++;
            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
    }
    onInputBlur(e) {
        this.focused = false;
        this.onModelTouched();
        if (!this.keepBuffer) {
            this.checkVal();
        }
        this.updateFilledState();
        this.onBlur.emit(e);
        if (this.inputViewChild?.nativeElement.value != this.focusText || this.inputViewChild?.nativeElement.value != this.value) {
            this.updateModel(e);
            let event = this.document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            this.inputViewChild?.nativeElement.dispatchEvent(event);
        }
    }
    onInputKeydown(e) {
        if (this.readonly) {
            return;
        }
        let k = e.which || e.keyCode, pos, begin, end;
        let iPhone;
        if (isPlatformBrowser(this.platformId)) {
            iPhone = /iphone/i.test(DomHandler.getUserAgent());
        }
        this.oldVal = this.inputViewChild?.nativeElement.value;
        this.onKeydown.emit(e);
        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret();
            begin = pos.begin;
            end = pos.end;
            if (end - begin === 0) {
                begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = k === 46 ? this.seekNext(end) : end;
            }
            this.clearBuffer(begin, end);
            if (this.keepBuffer) {
                this.shiftL(begin, end - 2);
            }
            else {
                this.shiftL(begin, end - 1);
            }
            this.updateModel(e);
            this.onInput.emit(e);
            e.preventDefault();
        }
        else if (k === 13) {
            // enter
            this.onInputBlur(e);
            this.updateModel(e);
        }
        else if (k === 27) {
            // escape
            this.inputViewChild.nativeElement.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(e);
            e.preventDefault();
        }
    }
    onKeyPress(e) {
        if (this.readonly) {
            return;
        }
        var k = e.which || e.keyCode, pos = this.caret(), p, c, next, completed;
        if (e.ctrlKey || e.altKey || e.metaKey || k < 32 || (k > 34 && k < 41)) {
            //Ignore
            return;
        }
        else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end - 1);
            }
            p = this.seekNext(pos.begin - 1);
            if (p < this.len) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);
                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);
                    if (DomHandler.isClient() && /android/i.test(DomHandler.getUserAgent())) {
                        let proxy = () => {
                            this.caret(next);
                        };
                        setTimeout(proxy, 0);
                    }
                    else {
                        this.caret(next);
                    }
                    if (pos.begin <= this.lastRequiredNonMaskPos) {
                        completed = this.isCompleted();
                    }
                    this.onInput.emit(e);
                }
            }
            e.preventDefault();
        }
        this.updateModel(e);
        this.updateFilledState();
        if (completed) {
            this.onComplete.emit();
        }
    }
    clearBuffer(start, end) {
        if (!this.keepBuffer) {
            let i;
            for (i = start; i < end && i < this.len; i++) {
                if (this.tests[i]) {
                    this.buffer[i] = this.getPlaceholder(i);
                }
            }
        }
    }
    writeBuffer() {
        this.inputViewChild.nativeElement.value = this.buffer.join('');
    }
    checkVal(allow) {
        //try to place characters where they belong
        let test = this.inputViewChild?.nativeElement.value, lastMatch = -1, i, c, pos;
        for (i = 0, pos = 0; i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
                while (pos++ < test.length) {
                    c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        if (!this.keepBuffer) {
                            this.buffer[i] = c;
                        }
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    this.clearBuffer(i + 1, this.len);
                    break;
                }
            }
            else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if (i < this.partialPosition) {
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        }
        else if (lastMatch + 1 < this.partialPosition) {
            if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if (this.inputViewChild?.nativeElement.value)
                    this.inputViewChild.nativeElement.value = '';
                this.clearBuffer(0, this.len);
            }
            else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        }
        else {
            this.writeBuffer();
            this.inputViewChild.nativeElement.value = this.inputViewChild?.nativeElement.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos);
    }
    onInputFocus(event) {
        if (this.readonly) {
            return;
        }
        this.focused = true;
        clearTimeout(this.caretTimeoutId);
        let pos;
        this.focusText = this.inputViewChild?.nativeElement.value;
        pos = this.keepBuffer ? this.inputViewChild?.nativeElement.value.length : this.checkVal();
        this.caretTimeoutId = setTimeout(() => {
            if (this.inputViewChild?.nativeElement !== this.inputViewChild?.nativeElement.ownerDocument.activeElement) {
                return;
            }
            this.writeBuffer();
            if (pos == this.mask?.replace('?', '').length) {
                this.caret(0, pos);
            }
            else {
                this.caret(pos);
            }
        }, 10);
        this.onFocus.emit(event);
    }
    onInputChange(event) {
        if (this.androidChrome)
            this.handleAndroidInput(event);
        else
            this.handleInputChange(event);
        this.onInput.emit(event);
    }
    handleInputChange(event) {
        if (this.readonly || this.disabled) {
            return;
        }
        setTimeout(() => {
            var pos = this.checkVal(true);
            this.caret(pos);
            this.updateModel(event);
            if (this.isCompleted()) {
                this.onComplete.emit();
            }
        }, 0);
    }
    getUnmaskedValue() {
        let unmaskedBuffer = [];
        for (let i = 0; i < this.buffer.length; i++) {
            let c = this.buffer[i];
            if (this.tests[i] && c != this.getPlaceholder(i)) {
                unmaskedBuffer.push(c);
            }
        }
        return unmaskedBuffer.join('');
    }
    updateModel(e) {
        const updatedValue = this.unmask ? this.getUnmaskedValue() : e.target.value;
        if (updatedValue !== null || updatedValue !== undefined) {
            this.value = updatedValue;
            this.onModelChange(this.value);
        }
    }
    updateFilledState() {
        this.filled = this.inputViewChild?.nativeElement && this.inputViewChild.nativeElement.value != '';
    }
    focus() {
        this.inputViewChild?.nativeElement.focus();
    }
    clear() {
        this.inputViewChild.nativeElement.value = '';
        this.value = null;
        this.onModelChange(this.value);
        this.onClear.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InputMask, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: InputMask, selector: "p-inputMask", inputs: { type: "type", slotChar: "slotChar", autoClear: ["autoClear", "autoClear", booleanAttribute], showClear: ["showClear", "showClear", booleanAttribute], style: "style", inputId: "inputId", styleClass: "styleClass", placeholder: "placeholder", size: ["size", "size", numberAttribute], maxlength: ["maxlength", "maxlength", numberAttribute], tabindex: "tabindex", title: "title", variant: "variant", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", ariaRequired: ["ariaRequired", "ariaRequired", booleanAttribute], disabled: ["disabled", "disabled", booleanAttribute], readonly: ["readonly", "readonly", booleanAttribute], unmask: ["unmask", "unmask", booleanAttribute], name: "name", required: ["required", "required", booleanAttribute], characterPattern: "characterPattern", autofocus: ["autofocus", "autofocus", booleanAttribute], autoFocus: ["autoFocus", "autoFocus", booleanAttribute], autocomplete: "autocomplete", keepBuffer: ["keepBuffer", "keepBuffer", booleanAttribute], mask: "mask" }, outputs: { onComplete: "onComplete", onFocus: "onFocus", onBlur: "onBlur", onInput: "onInput", onKeydown: "onKeydown", onClear: "onClear" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focused", "class.p-inputmask-clearable": "showClear && !disabled" }, classAttribute: "p-element" }, providers: [INPUTMASK_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["input"], descendants: true, static: true }], ngImport: i0, template: `
        <input
            #input
            pInputText
            [class]="styleClass"
            [ngClass]="inputClass"
            [attr.id]="inputId"
            [attr.type]="type"
            [attr.name]="name"
            [ngStyle]="style"
            [attr.placeholder]="placeholder"
            [attr.title]="title"
            [attr.size]="size"
            [attr.autocomplete]="autocomplete"
            [attr.maxlength]="maxlength"
            [attr.tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-required]="ariaRequired"
            [disabled]="disabled"
            [readonly]="readonly"
            [attr.required]="required"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (keydown)="onInputKeydown($event)"
            (keypress)="onKeyPress($event)"
            pAutoFocus
            [variant]="variant"
            [autofocus]="autofocus"
            (input)="onInputChange($event)"
            (paste)="handleInputChange($event)"
            [attr.data-pc-name]="'inputmask'"
            [attr.data-pc-section]="'root'"
        />
        <ng-container *ngIf="value != null && filled && showClear && !disabled">
            <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-inputmask-clear-icon'" (click)="clear()" [attr.data-pc-section]="'clearIcon'" />
            <span *ngIf="clearIconTemplate" class="p-inputmask-clear-icon" (click)="clear()" [attr.data-pc-section]="'clearIcon'">
                <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
            </span>
        </ng-container>
    `, isInline: true, styles: ["@layer primeng{.p-inputmask-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-inputmask-clearable{position:relative}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i3.InputText), selector: "[pInputText]", inputs: ["variant"] }, { kind: "directive", type: i0.forwardRef(() => i4.AutoFocus), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InputMask, decorators: [{
            type: Component,
            args: [{ selector: 'p-inputMask', template: `
        <input
            #input
            pInputText
            [class]="styleClass"
            [ngClass]="inputClass"
            [attr.id]="inputId"
            [attr.type]="type"
            [attr.name]="name"
            [ngStyle]="style"
            [attr.placeholder]="placeholder"
            [attr.title]="title"
            [attr.size]="size"
            [attr.autocomplete]="autocomplete"
            [attr.maxlength]="maxlength"
            [attr.tabindex]="tabindex"
            [attr.aria-label]="ariaLabel"
            [attr.aria-labelledBy]="ariaLabelledBy"
            [attr.aria-required]="ariaRequired"
            [disabled]="disabled"
            [readonly]="readonly"
            [attr.required]="required"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (keydown)="onInputKeydown($event)"
            (keypress)="onKeyPress($event)"
            pAutoFocus
            [variant]="variant"
            [autofocus]="autofocus"
            (input)="onInputChange($event)"
            (paste)="handleInputChange($event)"
            [attr.data-pc-name]="'inputmask'"
            [attr.data-pc-section]="'root'"
        />
        <ng-container *ngIf="value != null && filled && showClear && !disabled">
            <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-inputmask-clear-icon'" (click)="clear()" [attr.data-pc-section]="'clearIcon'" />
            <span *ngIf="clearIconTemplate" class="p-inputmask-clear-icon" (click)="clear()" [attr.data-pc-section]="'clearIcon'">
                <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
            </span>
        </ng-container>
    `, host: {
                        class: 'p-element',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': 'focused',
                        '[class.p-inputmask-clearable]': 'showClear && !disabled'
                    }, providers: [INPUTMASK_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: ["@layer primeng{.p-inputmask-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-inputmask-clearable{position:relative}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }], propDecorators: { type: [{
                type: Input
            }], slotChar: [{
                type: Input
            }], autoClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showClear: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], style: [{
                type: Input
            }], inputId: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], size: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], maxlength: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], tabindex: [{
                type: Input
            }], title: [{
                type: Input
            }], variant: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaRequired: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], readonly: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], unmask: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], name: [{
                type: Input
            }], required: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], characterPattern: [{
                type: Input
            }], autofocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autoFocus: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], autocomplete: [{
                type: Input
            }], keepBuffer: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], mask: [{
                type: Input
            }], onComplete: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onInput: [{
                type: Output
            }], onKeydown: [{
                type: Output
            }], onClear: [{
                type: Output
            }], inputViewChild: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class InputMaskModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InputMaskModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: InputMaskModule, declarations: [InputMask], imports: [CommonModule, InputTextModule, AutoFocusModule, TimesIcon], exports: [InputMask, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InputMaskModule, imports: [CommonModule, InputTextModule, AutoFocusModule, TimesIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InputMaskModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, InputTextModule, AutoFocusModule, TimesIcon],
                    exports: [InputMask, SharedModule],
                    declarations: [InputMask]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRtYXNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2lucHV0bWFzay9pbnB1dG1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMEJFO0FBQ0YsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQ0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUVSLE1BQU0sRUFDTixXQUFXLEVBR1gsU0FBUyxFQUNULGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLGVBQWUsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBaUIsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7QUFJcEQsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQVE7SUFDekMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN4QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFDRjs7O0dBR0c7QUF1REgsTUFBTSxPQUFPLFNBQVM7SUE2T1k7SUFDRztJQUN0QjtJQUNBO0lBQ0E7SUFoUFg7OztP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bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsU0FBUyxDQUFDO29CQUNwRSxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO29CQUNsQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICBQb3J0IG9mIGpRdWVyeSBNYXNrZWRJbnB1dCBieSBEaWdpdGFsQnVzaCBhcyBhIE5hdGl2ZSBBbmd1bGFyMiBDb21wb25lbnQgaW4gVHlwZXNjcmlwdCB3aXRob3V0IGpRdWVyeVxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9kaWdpdGFsQnVzaC9qcXVlcnkubWFza2VkaW5wdXQvXG5cbiAgICBDb3B5cmlnaHQgKGMpIDIwMDctMjAxNCBKb3NoIEJ1c2ggKGRpZ2l0YWxidXNoLmNvbSlcblxuICAgIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gICAgb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAgICBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXRcbiAgICByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSxcbiAgICBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICAgIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxuICAgIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG4gICAgY29uZGl0aW9uczpcblxuICAgIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gICAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuICAgIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuICAgIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG4gICAgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFRcbiAgICBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcbiAgICBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAgICBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SXG4gICAgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIGJvb2xlYW5BdHRyaWJ1dGUsXG4gICAgZm9yd2FyZFJlZixcbiAgICBudW1iZXJBdHRyaWJ1dGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQcmltZU5HQ29uZmlnLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBBdXRvRm9jdXNNb2R1bGUgfSBmcm9tICdwcmltZW5nL2F1dG9mb2N1cyc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgVGltZXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lcyc7XG5pbXBvcnQgeyBJbnB1dFRleHRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2lucHV0dGV4dCc7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBDYXJldCB9IGZyb20gJy4vaW5wdXRtYXNrLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBJTlBVVE1BU0tfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dE1hc2spLFxuICAgIG11bHRpOiB0cnVlXG59O1xuLyoqXG4gKiBJbnB1dE1hc2sgY29tcG9uZW50IGlzIHVzZWQgdG8gZW50ZXIgaW5wdXQgaW4gYSBjZXJ0YWluIGZvcm1hdCBzdWNoIGFzIG51bWVyaWMsIGRhdGUsIGN1cnJlbmN5LCBlbWFpbCBhbmQgcGhvbmUuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtaW5wdXRNYXNrJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICNpbnB1dFxuICAgICAgICAgICAgcElucHV0VGV4dFxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiaW5wdXRDbGFzc1wiXG4gICAgICAgICAgICBbYXR0ci5pZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgIFthdHRyLnR5cGVdPVwidHlwZVwiXG4gICAgICAgICAgICBbYXR0ci5uYW1lXT1cIm5hbWVcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwidGl0bGVcIlxuICAgICAgICAgICAgW2F0dHIuc2l6ZV09XCJzaXplXCJcbiAgICAgICAgICAgIFthdHRyLmF1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIlxuICAgICAgICAgICAgW2F0dHIubWF4bGVuZ3RoXT1cIm1heGxlbmd0aFwiXG4gICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkQnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1yZXF1aXJlZF09XCJhcmlhUmVxdWlyZWRcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgICAgICAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIlxuICAgICAgICAgICAgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAoa2V5ZG93bik9XCJvbklucHV0S2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgIChrZXlwcmVzcyk9XCJvbktleVByZXNzKCRldmVudClcIlxuICAgICAgICAgICAgcEF1dG9Gb2N1c1xuICAgICAgICAgICAgW3ZhcmlhbnRdPVwidmFyaWFudFwiXG4gICAgICAgICAgICBbYXV0b2ZvY3VzXT1cImF1dG9mb2N1c1wiXG4gICAgICAgICAgICAoaW5wdXQpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIChwYXN0ZSk9XCJoYW5kbGVJbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtbmFtZV09XCInaW5wdXRtYXNrJ1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCJcbiAgICAgICAgLz5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZhbHVlICE9IG51bGwgJiYgZmlsbGVkICYmIHNob3dDbGVhciAmJiAhZGlzYWJsZWRcIj5cbiAgICAgICAgICAgIDxUaW1lc0ljb24gKm5nSWY9XCIhY2xlYXJJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1pbnB1dG1hc2stY2xlYXItaWNvbidcIiAoY2xpY2spPVwiY2xlYXIoKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xlYXJJY29uJ1wiIC8+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNsZWFySWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWlucHV0bWFzay1jbGVhci1pY29uXCIgKGNsaWNrKT1cImNsZWFyKClcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NsZWFySWNvbidcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjbGVhckljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCcsXG4gICAgICAgICdbY2xhc3MucC1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnAtaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1c2VkJyxcbiAgICAgICAgJ1tjbGFzcy5wLWlucHV0bWFzay1jbGVhcmFibGVdJzogJ3Nob3dDbGVhciAmJiAhZGlzYWJsZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtJTlBVVE1BU0tfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vaW5wdXRtYXNrLmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIElucHV0TWFzayBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIC8qKlxuICAgICAqIEhUTUw1IGlucHV0IHR5cGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nID0gJ3RleHQnO1xuICAgIC8qKlxuICAgICAqIFBsYWNlaG9sZGVyIGNoYXJhY3RlciBpbiBtYXNrLCBkZWZhdWx0IGlzIHVuZGVyc2NvcmUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2xvdENoYXI6IHN0cmluZyA9ICdfJztcbiAgICAvKipcbiAgICAgKiBDbGVhcnMgdGhlIGluY29tcGxldGUgdmFsdWUgb24gYmx1ci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgYXV0b0NsZWFyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGEgY2xlYXIgaWNvbiBpcyBkaXNwbGF5ZWQgdG8gY2xlYXIgdGhlIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93Q2xlYXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXIgb2YgdGhlIGZvY3VzIGlucHV0IHRvIG1hdGNoIGEgbGFiZWwgZGVmaW5lZCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBBZHZpc29yeSBpbmZvcm1hdGlvbiB0byBkaXNwbGF5IG9uIGlucHV0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU2l6ZSBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGUgfSkgc2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlciBhbGxvd3MgaW4gdGhlIGlucHV0IGZpZWxkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIG1heGxlbmd0aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0YWIgb3JkZXIgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaXRsZSB0ZXh0IG9mIHRoZSBpbnB1dCB0ZXh0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSBpbnB1dCB2YXJpYW50IG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmFyaWFudDogJ2ZpbGxlZCcgfCAnb3V0bGluZWQnID0gJ291dGxpbmVkJztcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGRlZmluZSBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFc3RhYmxpc2hlcyByZWxhdGlvbnNoaXBzIGJldHdlZW4gdGhlIGNvbXBvbmVudCBhbmQgbGFiZWwocykgd2hlcmUgaXRzIHZhbHVlIHNob3VsZCBiZSBvbmUgb3IgbW9yZSBlbGVtZW50IElEcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gaW5kaWNhdGUgdGhhdCB1c2VyIGlucHV0IGlzIHJlcXVpcmVkIG9uIGFuIGVsZW1lbnQgYmVmb3JlIGEgZm9ybSBjYW4gYmUgc3VibWl0dGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhcmlhUmVxdWlyZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgZWxlbWVudCB2YWx1ZSBjYW5ub3QgYmUgYWx0ZXJlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCBhbiBpbnB1dCBmaWVsZCBpcyByZWFkLW9ubHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHJlYWRvbmx5OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgbmdNb2RlbCBzZXRzIHRoZSByYXcgdW5tYXNrZWQgdmFsdWUgdG8gYm91bmQgdmFsdWUgb3IgdGhlIGZvcm1hdHRlZCBtYXNrIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSB1bm1hc2s6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgYW4gaW5wdXQgZmllbGQgbXVzdCBiZSBmaWxsZWQgb3V0IGJlZm9yZSBzdWJtaXR0aW5nIHRoZSBmb3JtLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSByZXF1aXJlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBSZWdleCBwYXR0ZXJuIGZvciBhbHBoYSBjaGFyYWN0ZXJzXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2hhcmFjdGVyUGF0dGVybjogc3RyaW5nID0gJ1tBLVphLXpdJztcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIHRoZSBpbnB1dCBnZXRzIGEgZm9jdXMgYXV0b21hdGljYWxseSBvbiBsb2FkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhdXRvZm9jdXM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCB0aGUgaW5wdXQgZ2V0cyBhIGZvY3VzIGF1dG9tYXRpY2FsbHkgb24gbG9hZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYXV0b2ZvY3VzIHByb3BlcnR5IGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHNldCBhdXRvRm9jdXModmFsdWU6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5hdXRvZm9jdXMgPSB2YWx1ZTtcbiAgICAgICAgY29uc29sZS53YXJuKCdhdXRvRm9jdXMgaXMgZGVwcmVjYXRlZC4gVXNlIGF1dG9mb2N1cyBwcm9wZXJ0eSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGRlZmluZSBhIHN0cmluZyB0aGF0IGF1dG9jb21wbGV0ZSBhdHRyaWJ1dGUgdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhdXRvY29tcGxldGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHdoZXRoZXIgdG8gY2xlYW4gYnVmZmVyIHZhbHVlIGZyb20gbW9kZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIGtlZXBCdWZmZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBNYXNrIHBhdHRlcm4uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG1hc2soKTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXNrO1xuICAgIH1cbiAgICBzZXQgbWFzayh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbWFzayA9IHZhbDtcblxuICAgICAgICB0aGlzLmluaXRNYXNrKCk7XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSgnJyk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIG1hc2sgaXMgY29tcGxldGVkLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNvbXBsZXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBjb21wb25lbnQgcmVjZWl2ZXMgZm9jdXMuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgY29tcG9uZW50IGxvc2VzIGZvY3VzLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gaW5wdXQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbklucHV0OiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gaW5wdXQga2V5IHByZXNzLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25LZXlkb3duOiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBpbnB1dCBmaWVsZCBpcyBjbGVhcmVkLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNsZWFyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBpbnB1dFZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlcyE6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPjtcblxuICAgIGNsZWFySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHZhbHVlOiBOdWxsYWJsZTxzdHJpbmc+O1xuXG4gICAgX21hc2s6IE51bGxhYmxlPHN0cmluZz47XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBpbnB1dDogTnVsbGFibGU8SFRNTElucHV0RWxlbWVudD47XG5cbiAgICBmaWxsZWQ6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgZGVmczogTnVsbGFibGU8eyBba2xhc3M6IHN0cmluZ106IGFueSB9PjtcblxuICAgIHRlc3RzOiBSZWdFeHBbXSB8IGFueTtcblxuICAgIHBhcnRpYWxQb3NpdGlvbjogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIGZpcnN0Tm9uTWFza1BvczogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIGxhc3RSZXF1aXJlZE5vbk1hc2tQb3M6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBsZW46IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBvbGRWYWw6IE51bGxhYmxlPHN0cmluZz47XG5cbiAgICBidWZmZXI6IHN0cmluZ1tdIHwgYW55O1xuXG4gICAgZGVmYXVsdEJ1ZmZlcjogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIGZvY3VzVGV4dDogTnVsbGFibGU8c3RyaW5nPjtcblxuICAgIGNhcmV0VGltZW91dElkOiBhbnk7XG5cbiAgICBhbmRyb2lkQ2hyb21lOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGZvY3VzZWQ6IE51bGxhYmxlPGJvb2xlYW4+O1xuXG4gICAgX3ZhcmlhbnQ6ICdmaWxsZWQnIHwgJ291dGxpbmVkJyA9ICdvdXRsaW5lZCc7XG5cbiAgICBnZXQgaW5wdXRDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWlucHV0bWFzayc6IHRydWVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LFxuICAgICAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWdcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgICAgICB0aGlzLmFuZHJvaWRDaHJvbWUgPSAvY2hyb21lL2kudGVzdCh1YSkgJiYgL2FuZHJvaWQvaS50ZXN0KHVhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdE1hc2soKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjbGVhcmljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFySWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRNYXNrKCkge1xuICAgICAgICB0aGlzLnRlc3RzID0gW107XG4gICAgICAgIHRoaXMucGFydGlhbFBvc2l0aW9uID0gKHRoaXMubWFzayBhcyBzdHJpbmcpLmxlbmd0aDtcbiAgICAgICAgdGhpcy5sZW4gPSAodGhpcy5tYXNrIGFzIHN0cmluZykubGVuZ3RoO1xuICAgICAgICB0aGlzLmZpcnN0Tm9uTWFza1BvcyA9IG51bGw7XG4gICAgICAgIHRoaXMuZGVmcyA9IHtcbiAgICAgICAgICAgICc5JzogJ1swLTldJyxcbiAgICAgICAgICAgIGE6IHRoaXMuY2hhcmFjdGVyUGF0dGVybixcbiAgICAgICAgICAgICcqJzogYCR7dGhpcy5jaGFyYWN0ZXJQYXR0ZXJufXxbMC05XWBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbWFza1Rva2VucyA9ICh0aGlzLm1hc2sgYXMgc3RyaW5nKS5zcGxpdCgnJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFza1Rva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGMgPSBtYXNrVG9rZW5zW2ldO1xuICAgICAgICAgICAgaWYgKGMgPT0gJz8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sZW4tLTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnRpYWxQb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGVmc1tjXSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVzdHMucHVzaChuZXcgUmVnRXhwKHRoaXMuZGVmc1tjXSkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0Tm9uTWFza1BvcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9uTWFza1BvcyA9IHRoaXMudGVzdHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPCB0aGlzLnBhcnRpYWxQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RSZXF1aXJlZE5vbk1hc2tQb3MgPSB0aGlzLnRlc3RzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RzLnB1c2gobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hc2tUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjID0gbWFza1Rva2Vuc1tpXTtcbiAgICAgICAgICAgIGlmIChjICE9ICc/Jykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlZnNbY10pIHRoaXMuYnVmZmVyLnB1c2godGhpcy5nZXRQbGFjZWhvbGRlcihpKSk7XG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLmJ1ZmZlci5wdXNoKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVmYXVsdEJ1ZmZlciA9IHRoaXMuYnVmZmVyLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSA9PSB1bmRlZmluZWQgfHwgdGhpcy52YWx1ZSA9PSBudWxsKSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGVsc2UgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy52YWx1ZTtcblxuICAgICAgICAgICAgdGhpcy5jaGVja1ZhbCgpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RleHQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgY2FyZXQoZmlyc3Q/OiBudW1iZXIsIGxhc3Q/OiBudW1iZXIpOiBDYXJldCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGxldCByYW5nZSwgYmVnaW4sIGVuZDtcblxuICAgICAgICBpZiAoIXRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50IHx8IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCAhPT0gdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmaXJzdCA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgYmVnaW4gPSBmaXJzdDtcbiAgICAgICAgICAgIGVuZCA9IHR5cGVvZiBsYXN0ID09PSAnbnVtYmVyJyA/IGxhc3QgOiBiZWdpbjtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoYmVnaW4sIGVuZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudFsnY3JlYXRlVGV4dFJhbmdlJ10pIHtcbiAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudFsnY3JlYXRlVGV4dFJhbmdlJ10oKTtcbiAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAgICAgICAgICAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBlbmQpO1xuICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgYmVnaW4pO1xuICAgICAgICAgICAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSkge1xuICAgICAgICAgICAgICAgIGJlZ2luID0gdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgICAgIGVuZCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCh0aGlzLmRvY3VtZW50IGFzIGFueVsnc2VsZWN0aW9uJ10pICYmICh0aGlzLmRvY3VtZW50IGFzIGFueSlbJ3NlbGVjdGlvbiddLmNyZWF0ZVJhbmdlKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSAodGhpcy5kb2N1bWVudCBhcyBhbnlbJ3NlbGVjdGlvbiddKS5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgICAgIGJlZ2luID0gMCAtIHJhbmdlLmR1cGxpY2F0ZSgpLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLTEwMDAwMCk7XG4gICAgICAgICAgICAgICAgZW5kID0gYmVnaW4gKyByYW5nZS50ZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHsgYmVnaW46IGJlZ2luLCBlbmQ6IGVuZCB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNDb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjb21wbGV0ZWQ6IGJvb2xlYW47XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmZpcnN0Tm9uTWFza1BvcyBhcyBudW1iZXI7IGkgPD0gKHRoaXMubGFzdFJlcXVpcmVkTm9uTWFza1BvcyBhcyBudW1iZXIpOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldICYmICh0aGlzLmJ1ZmZlciBhcyBzdHJpbmdbXSlbaV0gPT09IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRQbGFjZWhvbGRlcihpOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGkgPCB0aGlzLnNsb3RDaGFyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xvdENoYXIuY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RDaGFyLmNoYXJBdCgwKTtcbiAgICB9XG5cbiAgICBzZWVrTmV4dChwb3M6IG51bWJlcikge1xuICAgICAgICB3aGlsZSAoKytwb3MgPCAodGhpcy5sZW4gYXMgbnVtYmVyKSAmJiAhdGhpcy50ZXN0c1twb3NdKTtcbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICBzZWVrUHJldihwb3M6IG51bWJlcikge1xuICAgICAgICB3aGlsZSAoLS1wb3MgPj0gMCAmJiAhdGhpcy50ZXN0c1twb3NdKTtcbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICBzaGlmdEwoYmVnaW46IG51bWJlciwgZW5kOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGksIGo7XG5cbiAgICAgICAgaWYgKGJlZ2luIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gYmVnaW4sIGogPSB0aGlzLnNlZWtOZXh0KGVuZCk7IGkgPCAodGhpcy5sZW4gYXMgbnVtYmVyKTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSkge1xuICAgICAgICAgICAgICAgIGlmIChqIDwgKHRoaXMubGVuIGFzIG51bWJlcikgJiYgdGhpcy50ZXN0c1tpXS50ZXN0KHRoaXMuYnVmZmVyW2pdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuYnVmZmVyW2pdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltqXSA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaiA9IHRoaXMuc2Vla05leHQoaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmNhcmV0KE1hdGgubWF4KHRoaXMuZmlyc3ROb25NYXNrUG9zIGFzIG51bWJlciwgYmVnaW4pKTtcbiAgICB9XG5cbiAgICBzaGlmdFIocG9zOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGksIGMsIGosIHQ7XG5cbiAgICAgICAgZm9yIChpID0gcG9zLCBjID0gdGhpcy5nZXRQbGFjZWhvbGRlcihwb3MpOyBpIDwgKHRoaXMubGVuIGFzIG51bWJlcik7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0pIHtcbiAgICAgICAgICAgICAgICBqID0gdGhpcy5zZWVrTmV4dChpKTtcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5idWZmZXJbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJbaV0gPSBjO1xuICAgICAgICAgICAgICAgIGlmIChqIDwgKHRoaXMubGVuIGFzIG51bWJlcikgJiYgdGhpcy50ZXN0c1tqXS50ZXN0KHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSB0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUFuZHJvaWRJbnB1dChlOiBFdmVudCkge1xuICAgICAgICB2YXIgY3VyVmFsID0gdGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuY2FyZXQoKSBhcyBDYXJldDtcbiAgICAgICAgaWYgKHRoaXMub2xkVmFsICYmIHRoaXMub2xkVmFsLmxlbmd0aCAmJiB0aGlzLm9sZFZhbC5sZW5ndGggPiBjdXJWYWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBhIGRlbGV0aW9uIG9yIGJhY2tzcGFjZSBoYXBwZW5lZFxuICAgICAgICAgICAgdGhpcy5jaGVja1ZhbCh0cnVlKTtcbiAgICAgICAgICAgIHdoaWxlIChwb3MuYmVnaW4gPiAwICYmICF0aGlzLnRlc3RzW3Bvcy5iZWdpbl0pIHBvcy5iZWdpbi0tO1xuICAgICAgICAgICAgaWYgKHBvcy5iZWdpbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChwb3MuYmVnaW4gPCAodGhpcy5maXJzdE5vbk1hc2tQb3MgYXMgbnVtYmVyKSAmJiAhdGhpcy50ZXN0c1twb3MuYmVnaW5dKSBwb3MuYmVnaW4rKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmVnaW4gPSBwb3MuYmVnaW47XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kID0gdGhpcy5zZWVrTmV4dChiZWdpbik7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJldChiZWdpbiwgYmVnaW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJCdWZmZXIoYmVnaW4sIGVuZCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtlZXBCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlmdEwoYmVnaW4sIGVuZCAtIDIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRMKGJlZ2luLCBlbmQgLSAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbXBsZXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVmFsKHRydWUpO1xuICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA8ICh0aGlzLmxlbiBhcyBudW1iZXIpICYmICF0aGlzLnRlc3RzW3Bvcy5iZWdpbiAtIDFdKSBwb3MuYmVnaW4rKztcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJldChwb3MuYmVnaW4sIHBvcy5iZWdpbik7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbXBsZXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0Qmx1cihlOiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICBpZiAoIXRoaXMua2VlcEJ1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5jaGVja1ZhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChlKTtcblxuICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC52YWx1ZSAhPSB0aGlzLmZvY3VzVGV4dCB8fCB0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LnZhbHVlICE9IHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICAgICAgICBldmVudC5pbml0RXZlbnQoJ2NoYW5nZScsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0S2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgayA9IGUud2hpY2ggfHwgZS5rZXlDb2RlLFxuICAgICAgICAgICAgcG9zLFxuICAgICAgICAgICAgYmVnaW4sXG4gICAgICAgICAgICBlbmQ7XG4gICAgICAgIGxldCBpUGhvbmU7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpUGhvbmUgPSAvaXBob25lL2kudGVzdChEb21IYW5kbGVyLmdldFVzZXJBZ2VudCgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9sZFZhbCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG5cbiAgICAgICAgdGhpcy5vbktleWRvd24uZW1pdChlKTtcblxuICAgICAgICAvL2JhY2tzcGFjZSwgZGVsZXRlLCBhbmQgZXNjYXBlIGdldCBzcGVjaWFsIHRyZWF0bWVudFxuICAgICAgICBpZiAoayA9PT0gOCB8fCBrID09PSA0NiB8fCAoaVBob25lICYmIGsgPT09IDEyNykpIHtcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuY2FyZXQoKSBhcyBDYXJldDtcbiAgICAgICAgICAgIGJlZ2luID0gcG9zLmJlZ2luO1xuICAgICAgICAgICAgZW5kID0gcG9zLmVuZDtcblxuICAgICAgICAgICAgaWYgKGVuZCAtIGJlZ2luID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYmVnaW4gPSBrICE9PSA0NiA/IHRoaXMuc2Vla1ByZXYoYmVnaW4pIDogKGVuZCA9IHRoaXMuc2Vla05leHQoYmVnaW4gLSAxKSk7XG4gICAgICAgICAgICAgICAgZW5kID0gayA9PT0gNDYgPyB0aGlzLnNlZWtOZXh0KGVuZCkgOiBlbmQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXJCdWZmZXIoYmVnaW4sIGVuZCk7XG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwQnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdEwoYmVnaW4sIGVuZCAtIDIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0TChiZWdpbiwgZW5kIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuICAgICAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoZSk7XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChrID09PSAxMykge1xuICAgICAgICAgICAgLy8gZW50ZXJcbiAgICAgICAgICAgIHRoaXMub25JbnB1dEJsdXIoZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGsgPT09IDI3KSB7XG4gICAgICAgICAgICAvLyBlc2NhcGVcbiAgICAgICAgICAgICh0aGlzLmlucHV0Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmZvY3VzVGV4dDtcbiAgICAgICAgICAgIHRoaXMuY2FyZXQoMCwgdGhpcy5jaGVja1ZhbCgpKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5UHJlc3MoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGsgPSBlLndoaWNoIHx8IGUua2V5Q29kZSxcbiAgICAgICAgICAgIHBvcyA9IHRoaXMuY2FyZXQoKSBhcyBDYXJldCxcbiAgICAgICAgICAgIHA6IG51bWJlcixcbiAgICAgICAgICAgIGM6IHN0cmluZyxcbiAgICAgICAgICAgIG5leHQ6IG51bWJlcixcbiAgICAgICAgICAgIGNvbXBsZXRlZCE6IGJvb2xlYW47XG5cbiAgICAgICAgaWYgKGUuY3RybEtleSB8fCBlLmFsdEtleSB8fCBlLm1ldGFLZXkgfHwgayA8IDMyIHx8IChrID4gMzQgJiYgayA8IDQxKSkge1xuICAgICAgICAgICAgLy9JZ25vcmVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChrICYmIGsgIT09IDEzKSB7XG4gICAgICAgICAgICBpZiAocG9zLmVuZCAtIHBvcy5iZWdpbiAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJCdWZmZXIocG9zLmJlZ2luLCBwb3MuZW5kKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0TChwb3MuYmVnaW4sIHBvcy5lbmQgLSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcCA9IHRoaXMuc2Vla05leHQocG9zLmJlZ2luIC0gMSk7XG4gICAgICAgICAgICBpZiAocCA8ICh0aGlzLmxlbiBhcyBudW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoayk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbcF0udGVzdChjKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0UihwKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltwXSA9IGM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuc2Vla05leHQocCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaXNDbGllbnQoKSAmJiAvYW5kcm9pZC9pLnRlc3QoRG9tSGFuZGxlci5nZXRVc2VyQWdlbnQoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm94eSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KG5leHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChwcm94eSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KG5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcy5iZWdpbiA8PSAodGhpcy5sYXN0UmVxdWlyZWROb25NYXNrUG9zIGFzIG51bWJlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZCA9IHRoaXMuaXNDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JbnB1dC5lbWl0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuXG4gICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckJ1ZmZlcihzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcikge1xuICAgICAgICBpZiAoIXRoaXMua2VlcEJ1ZmZlcikge1xuICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZCAmJiBpIDwgKHRoaXMubGVuIGFzIG51bWJlcik7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gdGhpcy5nZXRQbGFjZWhvbGRlcihpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZUJ1ZmZlcigpIHtcbiAgICAgICAgKHRoaXMuaW5wdXRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuYnVmZmVyLmpvaW4oJycpO1xuICAgIH1cblxuICAgIGNoZWNrVmFsKGFsbG93PzogYm9vbGVhbik6IG51bWJlciB7XG4gICAgICAgIC8vdHJ5IHRvIHBsYWNlIGNoYXJhY3RlcnMgd2hlcmUgdGhleSBiZWxvbmdcbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LnZhbHVlLFxuICAgICAgICAgICAgbGFzdE1hdGNoID0gLTEsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgYyxcbiAgICAgICAgICAgIHBvcztcblxuICAgICAgICBmb3IgKGkgPSAwLCBwb3MgPSAwOyBpIDwgKHRoaXMubGVuIGFzIG51bWJlcik7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBvcysrIDwgdGVzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgYyA9IHRlc3QuY2hhckF0KHBvcyAtIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXS50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMua2VlcEJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocG9zID4gdGVzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihpICsgMSwgdGhpcy5sZW4gYXMgbnVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5idWZmZXJbaV0gPT09IHRlc3QuY2hhckF0KHBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpIDwgKHRoaXMucGFydGlhbFBvc2l0aW9uIGFzIG51bWJlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdE1hdGNoID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbG93KSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGFzdE1hdGNoICsgMSA8ICh0aGlzLnBhcnRpYWxQb3NpdGlvbiBhcyBudW1iZXIpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvQ2xlYXIgfHwgdGhpcy5idWZmZXIuam9pbignJykgPT09IHRoaXMuZGVmYXVsdEJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIC8vIEludmFsaWQgdmFsdWUuIFJlbW92ZSBpdCBhbmQgcmVwbGFjZSBpdCB3aXRoIHRoZVxuICAgICAgICAgICAgICAgIC8vIG1hc2ssIHdoaWNoIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW9yLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LnZhbHVlKSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQnVmZmVyKDAsIHRoaXMubGVuIGFzIG51bWJlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEludmFsaWQgdmFsdWUsIGJ1dCB3ZSBvcHQgdG8gc2hvdyB0aGUgdmFsdWUgdG8gdGhlXG4gICAgICAgICAgICAgICAgLy8gdXNlciBhbmQgYWxsb3cgdGhlbSB0byBjb3JyZWN0IHRoZWlyIG1pc3Rha2UuXG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgKHRoaXMuaW5wdXRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKDAsIGxhc3RNYXRjaCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5wYXJ0aWFsUG9zaXRpb24gPyBpIDogdGhpcy5maXJzdE5vbk1hc2tQb3MpIGFzIG51bWJlcjtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNhcmV0VGltZW91dElkKTtcbiAgICAgICAgbGV0IHBvczogbnVtYmVyO1xuXG4gICAgICAgIHRoaXMuZm9jdXNUZXh0ID0gdGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC52YWx1ZTtcblxuICAgICAgICBwb3MgPSB0aGlzLmtlZXBCdWZmZXIgPyB0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aCA6IHRoaXMuY2hlY2tWYWwoKTtcblxuICAgICAgICB0aGlzLmNhcmV0VGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCAhPT0gdGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyKCk7XG4gICAgICAgICAgICBpZiAocG9zID09IHRoaXMubWFzaz8ucmVwbGFjZSgnPycsICcnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KDAsIHBvcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZXQocG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTApO1xuXG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5hbmRyb2lkQ2hyb21lKSB0aGlzLmhhbmRsZUFuZHJvaWRJbnB1dChldmVudCk7XG4gICAgICAgIGVsc2UgdGhpcy5oYW5kbGVJbnB1dENoYW5nZShldmVudCk7XG5cbiAgICAgICAgdGhpcy5vbklucHV0LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmNoZWNrVmFsKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5jYXJldChwb3MpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChldmVudCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0NvbXBsZXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlLmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgZ2V0VW5tYXNrZWRWYWx1ZSgpIHtcbiAgICAgICAgbGV0IHVubWFza2VkQnVmZmVyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjID0gdGhpcy5idWZmZXJbaV07XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSAmJiBjICE9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSkpIHtcbiAgICAgICAgICAgICAgICB1bm1hc2tlZEJ1ZmZlci5wdXNoKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVubWFza2VkQnVmZmVyLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKGU6IEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWRWYWx1ZSA9IHRoaXMudW5tYXNrID8gdGhpcy5nZXRVbm1hc2tlZFZhbHVlKCkgOiAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIGlmICh1cGRhdGVkVmFsdWUgIT09IG51bGwgfHwgdXBkYXRlZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB1cGRhdGVkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5maWxsZWQgPSB0aGlzLmlucHV0Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50ICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSAhPSAnJztcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICAodGhpcy5pbnB1dFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DbGVhci5lbWl0KCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElucHV0VGV4dE1vZHVsZSwgQXV0b0ZvY3VzTW9kdWxlLCBUaW1lc0ljb25dLFxuICAgIGV4cG9ydHM6IFtJbnB1dE1hc2ssIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSW5wdXRNYXNrXVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dE1hc2tNb2R1bGUge31cbiJdfQ==