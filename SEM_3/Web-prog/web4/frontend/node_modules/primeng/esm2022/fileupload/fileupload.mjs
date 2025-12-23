import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, LOCALE_ID, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, booleanAttribute, numberAttribute } from '@angular/core';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { PlusIcon } from 'primeng/icons/plus';
import { TimesIcon } from 'primeng/icons/times';
import { UploadIcon } from 'primeng/icons/upload';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common/http";
import * as i3 from "primeng/api";
import * as i4 from "@angular/common";
import * as i5 from "primeng/button";
import * as i6 from "primeng/progressbar";
import * as i7 from "primeng/messages";
import * as i8 from "primeng/ripple";
/**
 * FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.
 * @group Components
 */
export class FileUpload {
    document;
    platformId;
    locale;
    renderer;
    el;
    sanitizer;
    zone;
    http;
    cd;
    config;
    /**
     * Name of the request parameter to identify the files at backend.
     * @group Props
     */
    name;
    /**
     * Remote url to upload the files.
     * @group Props
     */
    url;
    /**
     * HTTP method to send the files to the url such as "post" and "put".
     * @group Props
     */
    method = 'post';
    /**
     * Used to select multiple files at once from file dialog.
     * @group Props
     */
    multiple;
    /**
     * Comma-separated list of pattern to restrict the allowed file types. Can be any combination of either the MIME types (such as "image/*") or the file extensions (such as ".jpg").
     * @group Props
     */
    accept;
    /**
     * Disables the upload functionality.
     * @group Props
     */
    disabled;
    /**
     * When enabled, upload begins automatically after selection is completed.
     * @group Props
     */
    auto;
    /**
     * Cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates.
     * @group Props
     */
    withCredentials;
    /**
     * Maximum file size allowed in bytes.
     * @group Props
     */
    maxFileSize;
    /**
     * Summary message of the invalid file size.
     * @group Props
     */
    invalidFileSizeMessageSummary = '{0}: Invalid file size, ';
    /**
     * Detail message of the invalid file size.
     * @group Props
     */
    invalidFileSizeMessageDetail = 'maximum upload size is {0}.';
    /**
     * Summary message of the invalid file type.
     * @group Props
     */
    invalidFileTypeMessageSummary = '{0}: Invalid file type, ';
    /**
     * Detail message of the invalid file type.
     * @group Props
     */
    invalidFileTypeMessageDetail = 'allowed file types: {0}.';
    /**
     * Detail message of the invalid file type.
     * @group Props
     */
    invalidFileLimitMessageDetail = 'limit is {0} at most.';
    /**
     * Summary message of the invalid file type.
     * @group Props
     */
    invalidFileLimitMessageSummary = 'Maximum number of files exceeded, ';
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
     * Width of the image thumbnail in pixels.
     * @group Props
     */
    previewWidth = 50;
    /**
     * Label of the choose button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    chooseLabel;
    /**
     * Label of the upload button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    uploadLabel;
    /**
     * Label of the cancel button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    cancelLabel;
    /**
     * Icon of the choose button.
     * @group Props
     */
    chooseIcon;
    /**
     * Icon of the upload button.
     * @group Props
     */
    uploadIcon;
    /**
     * Icon of the cancel button.
     * @group Props
     */
    cancelIcon;
    /**
     * Whether to show the upload button.
     * @group Props
     */
    showUploadButton = true;
    /**
     * Whether to show the cancel button.
     * @group Props
     */
    showCancelButton = true;
    /**
     * Defines the UI of the component.
     * @group Props
     */
    mode = 'advanced';
    /**
     * HttpHeaders class represents the header configuration options for an HTTP request.
     * @group Props
     */
    headers;
    /**
     * Whether to use the default upload or a manual implementation defined in uploadHandler callback. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    customUpload;
    /**
     * Maximum number of files that can be uploaded.
     * @group Props
     */
    fileLimit;
    /**
     * Style class of the upload button.
     * @group Props
     */
    uploadStyleClass;
    /**
     * Style class of the cancel button.
     * @group Props
     */
    cancelStyleClass;
    /**
     * Style class of the remove button.
     * @group Props
     */
    removeStyleClass;
    /**
     * Style class of the choose button.
     * @group Props
     */
    chooseStyleClass;
    /**
     * Callback to invoke before file upload is initialized.
     * @param {FileBeforeUploadEvent} event - Custom upload event.
     * @group Emits
     */
    onBeforeUpload = new EventEmitter();
    /**
     * An event indicating that the request was sent to the server. Useful when a request may be retried multiple times, to distinguish between retries on the final event stream.
     * @param {FileSendEvent} event - Custom send event.
     * @group Emits
     */
    onSend = new EventEmitter();
    /**
     * Callback to invoke when file upload is complete.
     * @param {FileUploadEvent} event - Custom upload event.
     * @group Emits
     */
    onUpload = new EventEmitter();
    /**
     * Callback to invoke if file upload fails.
     * @param {FileUploadErrorEvent} event - Custom error event.
     * @group Emits
     */
    onError = new EventEmitter();
    /**
     * Callback to invoke when files in queue are removed without uploading using clear all button.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke when a file is removed without uploading using clear button of a file.
     * @param {FileRemoveEvent} event - Remove event.
     * @group Emits
     */
    onRemove = new EventEmitter();
    /**
     * Callback to invoke when files are selected.
     * @param {FileSelectEvent} event - Select event.
     * @group Emits
     */
    onSelect = new EventEmitter();
    /**
     * Callback to invoke when files are being uploaded.
     * @param {FileProgressEvent} event - Progress event.
     * @group Emits
     */
    onProgress = new EventEmitter();
    /**
     * Callback to invoke in custom upload mode to upload the files manually.
     * @param {FileUploadHandlerEvent} event - Upload handler event.
     * @group Emits
     */
    uploadHandler = new EventEmitter();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onImageError = new EventEmitter();
    /**
     * This event is triggered if an error occurs while removing an uploaded file.
     * @param {RemoveUploadedFileEvent} event - Remove event.
     * @group Emits
     */
    onRemoveUploadedFile = new EventEmitter();
    templates;
    advancedFileInput;
    basicFileInput;
    content;
    set files(files) {
        this._files = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (this.validate(file)) {
                if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
                }
                this._files.push(files[i]);
            }
        }
    }
    get files() {
        return this._files;
    }
    get basicButtonLabel() {
        if (this.auto || !this.hasFiles()) {
            return this.chooseLabel;
        }
        return this.uploadLabel ?? this.files[0].name;
    }
    _files = [];
    progress = 0;
    dragHighlight;
    msgs;
    fileTemplate;
    headerTemplate;
    contentTemplate;
    toolbarTemplate;
    chooseIconTemplate;
    uploadIconTemplate;
    cancelIconTemplate;
    emptyTemplate;
    uploadedFileCount = 0;
    focus;
    uploading;
    duplicateIEEvent; // flag to recognize duplicate onchange event for file input
    translationSubscription;
    dragOverListener;
    uploadedFiles = [];
    fileUploadSubcription;
    formatter;
    constructor(document, platformId, locale, renderer, el, sanitizer, zone, http, cd, config) {
        this.document = document;
        this.platformId = platformId;
        this.locale = locale;
        this.renderer = renderer;
        this.el = el;
        this.sanitizer = sanitizer;
        this.zone = zone;
        this.http = http;
        this.cd = cd;
        this.config = config;
        this.formatter = new Intl.NumberFormat(this.locale, { maximumFractionDigits: 3 });
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'file':
                    this.fileTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'toolbar':
                    this.toolbarTemplate = item.template;
                    break;
                case 'chooseicon':
                    this.chooseIconTemplate = item.template;
                    break;
                case 'uploadicon':
                    this.uploadIconTemplate = item.template;
                    break;
                case 'cancelicon':
                    this.cancelIconTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
                    break;
                default:
                    this.fileTemplate = item.template;
                    break;
            }
        });
    }
    ngOnInit() {
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.cd.markForCheck();
        });
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.mode === 'advanced') {
                this.zone.runOutsideAngular(() => {
                    if (this.content) {
                        this.dragOverListener = this.renderer.listen(this.content.nativeElement, 'dragover', this.onDragOver.bind(this));
                    }
                });
            }
        }
    }
    getTranslation(option) {
        return this.config.getTranslation(option);
    }
    choose() {
        this.advancedFileInput?.nativeElement.click();
    }
    onFileSelect(event) {
        if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
            this.duplicateIEEvent = false;
            return;
        }
        this.msgs = [];
        if (!this.multiple) {
            this.files = [];
        }
        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!this.isFileSelected(file)) {
                if (this.validate(file)) {
                    if (this.isImage(file)) {
                        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
                    }
                    this.files.push(files[i]);
                }
            }
        }
        this.onSelect.emit({ originalEvent: event, files: files, currentFiles: this.files });
        // this will check the fileLimit with the uploaded files
        this.checkFileLimit(files);
        if (this.hasFiles() && this.auto && (this.mode !== 'advanced' || !this.isFileLimitExceeded())) {
            this.upload();
        }
        if (event.type !== 'drop' && this.isIE11()) {
            this.clearIEInput();
        }
        else {
            this.clearInputElement();
        }
    }
    isFileSelected(file) {
        for (let sFile of this.files) {
            if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size) {
                return true;
            }
        }
        return false;
    }
    isIE11() {
        if (isPlatformBrowser(this.platformId)) {
            return !!this.document.defaultView['MSInputMethodContext'] && !!this.document['documentMode'];
        }
    }
    validate(file) {
        this.msgs = this.msgs || [];
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
            });
            return false;
        }
        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            return false;
        }
        return true;
    }
    isFileTypeValid(file) {
        let acceptableTypes = this.accept?.split(',').map((type) => type.trim());
        for (let type of acceptableTypes) {
            let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type) : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
            if (acceptable) {
                return true;
            }
        }
        return false;
    }
    getTypeClass(fileType) {
        return fileType.substring(0, fileType.indexOf('/'));
    }
    isWildcard(fileType) {
        return fileType.indexOf('*') !== -1;
    }
    getFileExtension(file) {
        return '.' + file.name.split('.').pop();
    }
    isImage(file) {
        return /^image\//.test(file.type);
    }
    onImageLoad(img) {
        window.URL.revokeObjectURL(img.src);
    }
    /**
     * Uploads the selected files.
     * @group Method
     */
    upload() {
        if (this.customUpload) {
            if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
            }
            this.uploadHandler.emit({
                files: this.files
            });
            this.cd.markForCheck();
        }
        else {
            this.uploading = true;
            this.msgs = [];
            let formData = new FormData();
            this.onBeforeUpload.emit({
                formData: formData
            });
            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i], this.files[i].name);
            }
            // If the previous upload hasn't been finished, it is aborted.
            this.cancelUploadRequest();
            this.fileUploadSubcription = this.http
                .request(this.method, this.url, {
                body: formData,
                headers: this.headers,
                reportProgress: true,
                observe: 'events',
                withCredentials: this.withCredentials
            })
                .subscribe((event) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        this.onSend.emit({
                            originalEvent: event,
                            formData: formData
                        });
                        break;
                    case HttpEventType.Response:
                        this.uploading = false;
                        this.progress = 0;
                        if (event['status'] >= 200 && event['status'] < 300) {
                            if (this.fileLimit) {
                                this.uploadedFileCount += this.files.length;
                            }
                            this.onUpload.emit({ originalEvent: event, files: this.files });
                        }
                        else {
                            this.onError.emit({ files: this.files });
                        }
                        this.uploadedFiles.push(...this.files);
                        this.clear();
                        break;
                    case HttpEventType.UploadProgress: {
                        if (event['loaded']) {
                            this.progress = Math.round((event['loaded'] * 100) / event['total']);
                        }
                        this.onProgress.emit({ originalEvent: event, progress: this.progress });
                        break;
                    }
                }
                this.cd.markForCheck();
            }, (error) => {
                this.uploading = false;
                this.onError.emit({ files: this.files, error: error });
            });
        }
    }
    /**
     * Clears the files list.
     * @group Method
     */
    clear() {
        this.files = [];
        this.uploadedFileCount = 0;
        this.cancelUploadRequest();
        this.onClear.emit();
        this.clearInputElement();
        this.cd.markForCheck();
    }
    /**
     * Removes a single file.
     * @param {Event} event - Browser event.
     * @param {Number} index - Index of the file.
     * @group Method
     */
    remove(event, index) {
        this.cancelUploadRequest();
        this.clearInputElement();
        this.onRemove.emit({ originalEvent: event, file: this.files[index] });
        this.files.splice(index, 1);
        this.checkFileLimit(this.files);
    }
    /**
     * Removes uploaded file.
     * @param {Number} index - Index of the file to be removed.
     * @group Method
     */
    removeUploadedFile(index) {
        let removedFile = this.uploadedFiles.splice(index, 1)[0];
        this.uploadedFiles = [...this.uploadedFiles];
        this.onRemoveUploadedFile.emit({ file: removedFile, files: this.uploadedFiles });
    }
    /**
     * Cancel upload file request.
     * */
    cancelUploadRequest() {
        if (this.fileUploadSubcription) {
            this.fileUploadSubcription.unsubscribe();
            this.fileUploadSubcription = undefined;
        }
    }
    isFileLimitExceeded() {
        const isAutoMode = this.auto;
        const totalFileCount = isAutoMode ? this.files.length : this.files.length + this.uploadedFileCount;
        if (this.fileLimit && this.fileLimit <= totalFileCount && this.focus) {
            this.focus = false;
        }
        return this.fileLimit && this.fileLimit < totalFileCount;
    }
    isChooseDisabled() {
        if (this.auto) {
            return this.fileLimit && this.fileLimit <= this.files.length;
        }
        else {
            return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
        }
    }
    checkFileLimit(files) {
        this.msgs ??= [];
        const hasExistingValidationMessages = this.msgs.length > 0 && this.fileLimit < files.length;
        if (this.isFileLimitExceeded() || hasExistingValidationMessages) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileLimitMessageSummary.replace('{0}', this.fileLimit.toString()),
                detail: this.invalidFileLimitMessageDetail.replace('{0}', this.fileLimit.toString())
            });
        }
    }
    clearInputElement() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.advancedFileInput.nativeElement.value = '';
        }
        if (this.basicFileInput && this.basicFileInput.nativeElement) {
            this.basicFileInput.nativeElement.value = '';
        }
    }
    clearIEInput() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
            this.advancedFileInput.nativeElement.value = '';
        }
    }
    hasFiles() {
        return this.files && this.files.length > 0;
    }
    hasUploadedFiles() {
        return this.uploadedFiles && this.uploadedFiles.length > 0;
    }
    onDragEnter(e) {
        if (!this.disabled) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    onDragOver(e) {
        if (!this.disabled) {
            DomHandler.addClass(this.content?.nativeElement, 'p-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    }
    onDragLeave(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content?.nativeElement, 'p-fileupload-highlight');
        }
    }
    onDrop(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content?.nativeElement, 'p-fileupload-highlight');
            event.stopPropagation();
            event.preventDefault();
            let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            let allowDrop = this.multiple || (files && files.length === 1);
            if (allowDrop) {
                this.onFileSelect(event);
            }
        }
    }
    onFocus() {
        this.focus = true;
    }
    onBlur() {
        this.focus = false;
    }
    formatSize(bytes) {
        const k = 1024;
        const sizes = this.getTranslation(TranslationKeys.FILE_SIZE_TYPES);
        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = this.formatter.format(bytes / Math.pow(k, i));
        return `${formattedSize} ${sizes[i]}`;
    }
    onBasicUploaderClick() {
        if (this.hasFiles())
            this.upload();
        else
            this.basicFileInput?.nativeElement.click();
    }
    onBasicKeydown(event) {
        switch (event.code) {
            case 'Space':
            case 'Enter':
                this.onBasicUploaderClick();
                event.preventDefault();
                break;
        }
    }
    imageError(event) {
        this.onImageError.emit(event);
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    get chooseButtonLabel() {
        return this.chooseLabel || this.config.getTranslation(TranslationKeys.CHOOSE);
    }
    get uploadButtonLabel() {
        return this.uploadLabel || this.config.getTranslation(TranslationKeys.UPLOAD);
    }
    get cancelButtonLabel() {
        return this.cancelLabel || this.config.getTranslation(TranslationKeys.CANCEL);
    }
    get browseFilesLabel() {
        return this.config.getTranslation(TranslationKeys.ARIA)[TranslationKeys.BROWSE_FILES];
    }
    ngOnDestroy() {
        if (this.content && this.content.nativeElement) {
            if (this.dragOverListener) {
                this.dragOverListener();
                this.dragOverListener = null;
            }
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: FileUpload, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: LOCALE_ID }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.DomSanitizer }, { token: i0.NgZone }, { token: i2.HttpClient }, { token: i0.ChangeDetectorRef }, { token: i3.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.1", type: FileUpload, selector: "p-fileUpload", inputs: { name: "name", url: "url", method: "method", multiple: ["multiple", "multiple", booleanAttribute], accept: "accept", disabled: ["disabled", "disabled", booleanAttribute], auto: ["auto", "auto", booleanAttribute], withCredentials: ["withCredentials", "withCredentials", booleanAttribute], maxFileSize: ["maxFileSize", "maxFileSize", numberAttribute], invalidFileSizeMessageSummary: "invalidFileSizeMessageSummary", invalidFileSizeMessageDetail: "invalidFileSizeMessageDetail", invalidFileTypeMessageSummary: "invalidFileTypeMessageSummary", invalidFileTypeMessageDetail: "invalidFileTypeMessageDetail", invalidFileLimitMessageDetail: "invalidFileLimitMessageDetail", invalidFileLimitMessageSummary: "invalidFileLimitMessageSummary", style: "style", styleClass: "styleClass", previewWidth: ["previewWidth", "previewWidth", numberAttribute], chooseLabel: "chooseLabel", uploadLabel: "uploadLabel", cancelLabel: "cancelLabel", chooseIcon: "chooseIcon", uploadIcon: "uploadIcon", cancelIcon: "cancelIcon", showUploadButton: ["showUploadButton", "showUploadButton", booleanAttribute], showCancelButton: ["showCancelButton", "showCancelButton", booleanAttribute], mode: "mode", headers: "headers", customUpload: ["customUpload", "customUpload", booleanAttribute], fileLimit: ["fileLimit", "fileLimit", (value) => numberAttribute(value, null)], uploadStyleClass: "uploadStyleClass", cancelStyleClass: "cancelStyleClass", removeStyleClass: "removeStyleClass", chooseStyleClass: "chooseStyleClass", files: "files" }, outputs: { onBeforeUpload: "onBeforeUpload", onSend: "onSend", onUpload: "onUpload", onError: "onError", onClear: "onClear", onRemove: "onRemove", onSelect: "onSelect", onProgress: "onProgress", uploadHandler: "uploadHandler", onImageError: "onImageError", onRemoveUploadedFile: "onRemoveUploadedFile" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "advancedFileInput", first: true, predicate: ["advancedfileinput"], descendants: true }, { propertyName: "basicFileInput", first: true, predicate: ["basicfileinput"], descendants: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true }], ngImport: i0, template: `
        <div [ngClass]="'p-fileupload p-fileupload-advanced p-component'" [ngStyle]="style" [class]="styleClass" *ngIf="mode === 'advanced'" [attr.data-pc-name]="'fileupload'" [attr.data-pc-section]="'root'">
            <input
                [attr.aria-label]="browseFilesLabel"
                #advancedfileinput
                type="file"
                (change)="onFileSelect($event)"
                [multiple]="multiple"
                [accept]="accept"
                [disabled]="disabled || isChooseDisabled()"
                [attr.title]="''"
                [attr.data-pc-section]="'input'"
                [style.display]="'none'"
            />
            <div class="p-fileupload-buttonbar" [attr.data-pc-section]="'buttonbar'">
                <ng-container *ngIf="!headerTemplate">
                    <span
                        class="p-button p-component p-fileupload-choose"
                        [ngClass]="{ 'p-focus': focus, 'p-disabled': disabled || isChooseDisabled() }"
                        (focus)="onFocus()"
                        (blur)="onBlur()"
                        pRipple
                        (click)="choose()"
                        (keydown.enter)="choose()"
                        tabindex="0"
                        [class]="chooseStyleClass"
                        [attr.data-pc-section]="'choosebutton'"
                    >
                        <input
                            [attr.aria-label]="browseFilesLabel"
                            #advancedfileinput
                            type="file"
                            (change)="onFileSelect($event)"
                            [multiple]="multiple"
                            [accept]="accept"
                            [disabled]="disabled || isChooseDisabled()"
                            [attr.title]="''"
                            [attr.data-pc-section]="'input'"
                        />
                        <span *ngIf="chooseIcon" [ngClass]="'p-button-icon p-button-icon-left'" [class]="chooseIcon" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'"></span>
                        <ng-container *ngIf="!chooseIcon">
                            <PlusIcon *ngIf="!chooseIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'" />
                            <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'">
                                <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                        <span class="p-button-label" [attr.data-pc-section]="'choosebuttonlabel'">{{ chooseButtonLabel }}</span>
                    </span>

                    <p-button *ngIf="!auto && showUploadButton" type="button" [label]="uploadButtonLabel" (onClick)="upload()" [disabled]="!hasFiles() || isFileLimitExceeded()" [styleClass]="uploadStyleClass">
                        <span *ngIf="uploadIcon" [ngClass]="uploadIcon" [attr.aria-hidden]="true" class="p-button-icon p-button-icon-left"></span>
                        <ng-container *ngIf="!uploadIcon">
                            <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                            <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                                <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </p-button>
                    <p-button *ngIf="!auto && showCancelButton" type="button" [label]="cancelButtonLabel" (onClick)="clear()" [disabled]="!hasFiles() || uploading" [styleClass]="cancelStyleClass">
                        <span *ngIf="cancelIcon" [ngClass]="cancelIcon" class="p-button-icon p-button-icon-left"></span>
                        <ng-container *ngIf="!cancelIcon">
                            <TimesIcon *ngIf="!cancelIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-hidden]="true" />
                            <span *ngIf="cancelIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                                <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </p-button>
                </ng-container>
                <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: files, uploadedFiles: uploadedFiles, chooseCallback: choose.bind(this), clearCallback: clear.bind(this), uploadCallback: upload.bind(this) }"></ng-container>
                <ng-container *ngTemplateOutlet="toolbarTemplate"></ng-container>
            </div>
            <div #content class="p-fileupload-content" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)" [attr.data-pc-section]="'content'">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>

                <p-messages [value]="msgs" [enableService]="false"></p-messages>

                <div class="p-fileupload-files" *ngIf="hasFiles()">
                    <div *ngIf="!fileTemplate">
                        <div class="p-fileupload-row" *ngFor="let file of files; let i = index">
                            <div *ngIf="isImage(file)"><img [src]="file.objectURL" [width]="previewWidth" (error)="imageError($event)" /></div>
                            <div class="p-fileupload-filename">{{ file.name }}</div>
                            <div>{{ formatSize(file.size) }}</div>
                            <div>
                                <button type="button" pButton (click)="remove($event, i)" [disabled]="uploading" class="p-button-icon-only" [class]="removeStyleClass">
                                    <TimesIcon *ngIf="!cancelIconTemplate" />
                                    <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="fileTemplate">
                        <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></ng-template>
                    </div>
                </div>
                <ng-container
                    *ngTemplateOutlet="
                        contentTemplate;
                        context: {
                            $implicit: files,
                            uploadedFiles: uploadedFiles,
                            chooseCallback: choose.bind(this),
                            clearCallback: clear.bind(this),
                            removeUploadedFileCallback: removeUploadedFile.bind(this),
                            removeFileCallback: remove.bind(this),
                            progress: progress,
                            messages: msgs
                        }
                    "
                ></ng-container>
                <div *ngIf="emptyTemplate && !hasFiles() && !hasUploadedFiles()" class="p-fileupload-empty">
                    <ng-container *ngTemplateOutlet="emptyTemplate"></ng-container>
                </div>
            </div>
        </div>
        <div class="p-fileupload p-fileupload-basic p-component" *ngIf="mode === 'basic'" [attr.data-pc-name]="'fileupload'">
            <p-messages [value]="msgs" [enableService]="false"></p-messages>
            <span
                [ngClass]="{ 'p-button p-component p-fileupload-choose': true, 'p-button-icon-only': !basicButtonLabel, 'p-fileupload-choose-selected': hasFiles(), 'p-focus': focus, 'p-disabled': disabled }"
                [ngStyle]="style"
                [class]="styleClass"
                (click)="onBasicUploaderClick()"
                (keydown)="onBasicKeydown($event)"
                tabindex="0"
                pRipple
                [attr.data-pc-section]="'choosebutton'"
            >
                <ng-container *ngIf="hasFiles() && !auto; else chooseSection">
                    <span *ngIf="uploadIcon" class="p-button-icon p-button-icon-left" [ngClass]="uploadIcon"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-container>
                <ng-template #chooseSection>
                    <span *ngIf="chooseIcon" class="p-button-icon p-button-icon-left pi" [ngClass]="chooseIcon"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon [styleClass]="'p-button-icon p-button-icon-left pi'" *ngIf="!chooseIconTemplate" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'" />
                        <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left pi" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'">
                            <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-template>
                <span *ngIf="basicButtonLabel" class="p-button-label" [attr.data-pc-section]="'label'">{{ basicButtonLabel }}</span>
                <input
                    [attr.aria-label]="browseFilesLabel"
                    #basicfileinput
                    type="file"
                    [accept]="accept"
                    [multiple]="multiple"
                    [disabled]="disabled"
                    (change)="onFileSelect($event)"
                    *ngIf="!hasFiles()"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [attr.data-pc-section]="'input'"
                />
            </span>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-fileupload-content{position:relative}.p-fileupload-row{display:flex;align-items:center}.p-fileupload-row>div{flex:1 1 auto;width:25%}.p-fileupload-row>div:last-child{text-align:right}.p-fileupload-content .p-progressbar{width:100%;position:absolute;top:0;left:0}.p-button.p-fileupload-choose{position:relative;overflow:hidden}.p-button.p-fileupload-choose input[type=file],.p-fileupload-choose.p-fileupload-choose-selected input[type=file]{display:none}.p-fluid .p-fileupload .p-button{width:auto}.p-fileupload-filename{word-break:break-all}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i4.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i5.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading", "severity", "raised", "rounded", "text", "outlined", "size", "plain"] }, { kind: "component", type: i0.forwardRef(() => i5.Button), selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "raised", "rounded", "text", "plain", "severity", "outlined", "link", "tabindex", "size", "style", "styleClass", "badgeClass", "ariaLabel", "autofocus"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "component", type: i0.forwardRef(() => i6.ProgressBar), selector: "p-progressBar", inputs: ["value", "showValue", "styleClass", "style", "unit", "mode", "color"] }, { kind: "component", type: i0.forwardRef(() => i7.Messages), selector: "p-messages", inputs: ["value", "closable", "style", "styleClass", "enableService", "key", "escape", "severity", "showTransitionOptions", "hideTransitionOptions"], outputs: ["valueChange", "onClose"] }, { kind: "directive", type: i0.forwardRef(() => i8.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => PlusIcon), selector: "PlusIcon" }, { kind: "component", type: i0.forwardRef(() => UploadIcon), selector: "UploadIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: FileUpload, decorators: [{
            type: Component,
            args: [{ selector: 'p-fileUpload', template: `
        <div [ngClass]="'p-fileupload p-fileupload-advanced p-component'" [ngStyle]="style" [class]="styleClass" *ngIf="mode === 'advanced'" [attr.data-pc-name]="'fileupload'" [attr.data-pc-section]="'root'">
            <input
                [attr.aria-label]="browseFilesLabel"
                #advancedfileinput
                type="file"
                (change)="onFileSelect($event)"
                [multiple]="multiple"
                [accept]="accept"
                [disabled]="disabled || isChooseDisabled()"
                [attr.title]="''"
                [attr.data-pc-section]="'input'"
                [style.display]="'none'"
            />
            <div class="p-fileupload-buttonbar" [attr.data-pc-section]="'buttonbar'">
                <ng-container *ngIf="!headerTemplate">
                    <span
                        class="p-button p-component p-fileupload-choose"
                        [ngClass]="{ 'p-focus': focus, 'p-disabled': disabled || isChooseDisabled() }"
                        (focus)="onFocus()"
                        (blur)="onBlur()"
                        pRipple
                        (click)="choose()"
                        (keydown.enter)="choose()"
                        tabindex="0"
                        [class]="chooseStyleClass"
                        [attr.data-pc-section]="'choosebutton'"
                    >
                        <input
                            [attr.aria-label]="browseFilesLabel"
                            #advancedfileinput
                            type="file"
                            (change)="onFileSelect($event)"
                            [multiple]="multiple"
                            [accept]="accept"
                            [disabled]="disabled || isChooseDisabled()"
                            [attr.title]="''"
                            [attr.data-pc-section]="'input'"
                        />
                        <span *ngIf="chooseIcon" [ngClass]="'p-button-icon p-button-icon-left'" [class]="chooseIcon" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'"></span>
                        <ng-container *ngIf="!chooseIcon">
                            <PlusIcon *ngIf="!chooseIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'" />
                            <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'">
                                <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                        <span class="p-button-label" [attr.data-pc-section]="'choosebuttonlabel'">{{ chooseButtonLabel }}</span>
                    </span>

                    <p-button *ngIf="!auto && showUploadButton" type="button" [label]="uploadButtonLabel" (onClick)="upload()" [disabled]="!hasFiles() || isFileLimitExceeded()" [styleClass]="uploadStyleClass">
                        <span *ngIf="uploadIcon" [ngClass]="uploadIcon" [attr.aria-hidden]="true" class="p-button-icon p-button-icon-left"></span>
                        <ng-container *ngIf="!uploadIcon">
                            <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                            <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                                <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </p-button>
                    <p-button *ngIf="!auto && showCancelButton" type="button" [label]="cancelButtonLabel" (onClick)="clear()" [disabled]="!hasFiles() || uploading" [styleClass]="cancelStyleClass">
                        <span *ngIf="cancelIcon" [ngClass]="cancelIcon" class="p-button-icon p-button-icon-left"></span>
                        <ng-container *ngIf="!cancelIcon">
                            <TimesIcon *ngIf="!cancelIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-hidden]="true" />
                            <span *ngIf="cancelIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                                <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                            </span>
                        </ng-container>
                    </p-button>
                </ng-container>
                <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: files, uploadedFiles: uploadedFiles, chooseCallback: choose.bind(this), clearCallback: clear.bind(this), uploadCallback: upload.bind(this) }"></ng-container>
                <ng-container *ngTemplateOutlet="toolbarTemplate"></ng-container>
            </div>
            <div #content class="p-fileupload-content" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)" [attr.data-pc-section]="'content'">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>

                <p-messages [value]="msgs" [enableService]="false"></p-messages>

                <div class="p-fileupload-files" *ngIf="hasFiles()">
                    <div *ngIf="!fileTemplate">
                        <div class="p-fileupload-row" *ngFor="let file of files; let i = index">
                            <div *ngIf="isImage(file)"><img [src]="file.objectURL" [width]="previewWidth" (error)="imageError($event)" /></div>
                            <div class="p-fileupload-filename">{{ file.name }}</div>
                            <div>{{ formatSize(file.size) }}</div>
                            <div>
                                <button type="button" pButton (click)="remove($event, i)" [disabled]="uploading" class="p-button-icon-only" [class]="removeStyleClass">
                                    <TimesIcon *ngIf="!cancelIconTemplate" />
                                    <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="fileTemplate">
                        <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></ng-template>
                    </div>
                </div>
                <ng-container
                    *ngTemplateOutlet="
                        contentTemplate;
                        context: {
                            $implicit: files,
                            uploadedFiles: uploadedFiles,
                            chooseCallback: choose.bind(this),
                            clearCallback: clear.bind(this),
                            removeUploadedFileCallback: removeUploadedFile.bind(this),
                            removeFileCallback: remove.bind(this),
                            progress: progress,
                            messages: msgs
                        }
                    "
                ></ng-container>
                <div *ngIf="emptyTemplate && !hasFiles() && !hasUploadedFiles()" class="p-fileupload-empty">
                    <ng-container *ngTemplateOutlet="emptyTemplate"></ng-container>
                </div>
            </div>
        </div>
        <div class="p-fileupload p-fileupload-basic p-component" *ngIf="mode === 'basic'" [attr.data-pc-name]="'fileupload'">
            <p-messages [value]="msgs" [enableService]="false"></p-messages>
            <span
                [ngClass]="{ 'p-button p-component p-fileupload-choose': true, 'p-button-icon-only': !basicButtonLabel, 'p-fileupload-choose-selected': hasFiles(), 'p-focus': focus, 'p-disabled': disabled }"
                [ngStyle]="style"
                [class]="styleClass"
                (click)="onBasicUploaderClick()"
                (keydown)="onBasicKeydown($event)"
                tabindex="0"
                pRipple
                [attr.data-pc-section]="'choosebutton'"
            >
                <ng-container *ngIf="hasFiles() && !auto; else chooseSection">
                    <span *ngIf="uploadIcon" class="p-button-icon p-button-icon-left" [ngClass]="uploadIcon"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-container>
                <ng-template #chooseSection>
                    <span *ngIf="chooseIcon" class="p-button-icon p-button-icon-left pi" [ngClass]="chooseIcon"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon [styleClass]="'p-button-icon p-button-icon-left pi'" *ngIf="!chooseIconTemplate" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'" />
                        <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left pi" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'">
                            <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-template>
                <span *ngIf="basicButtonLabel" class="p-button-label" [attr.data-pc-section]="'label'">{{ basicButtonLabel }}</span>
                <input
                    [attr.aria-label]="browseFilesLabel"
                    #basicfileinput
                    type="file"
                    [accept]="accept"
                    [multiple]="multiple"
                    [disabled]="disabled"
                    (change)="onFileSelect($event)"
                    *ngIf="!hasFiles()"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [attr.data-pc-section]="'input'"
                />
            </span>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-fileupload-content{position:relative}.p-fileupload-row{display:flex;align-items:center}.p-fileupload-row>div{flex:1 1 auto;width:25%}.p-fileupload-row>div:last-child{text-align:right}.p-fileupload-content .p-progressbar{width:100%;position:absolute;top:0;left:0}.p-button.p-fileupload-choose{position:relative;overflow:hidden}.p-button.p-fileupload-choose input[type=file],.p-fileupload-choose.p-fileupload-choose-selected input[type=file]{display:none}.p-fluid .p-fileupload .p-button{width:auto}.p-fileupload-filename{word-break:break-all}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LOCALE_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.DomSanitizer }, { type: i0.NgZone }, { type: i2.HttpClient }, { type: i0.ChangeDetectorRef }, { type: i3.PrimeNGConfig }], propDecorators: { name: [{
                type: Input
            }], url: [{
                type: Input
            }], method: [{
                type: Input
            }], multiple: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], accept: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], auto: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], withCredentials: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], maxFileSize: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], invalidFileSizeMessageSummary: [{
                type: Input
            }], invalidFileSizeMessageDetail: [{
                type: Input
            }], invalidFileTypeMessageSummary: [{
                type: Input
            }], invalidFileTypeMessageDetail: [{
                type: Input
            }], invalidFileLimitMessageDetail: [{
                type: Input
            }], invalidFileLimitMessageSummary: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], previewWidth: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], chooseLabel: [{
                type: Input
            }], uploadLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], chooseIcon: [{
                type: Input
            }], uploadIcon: [{
                type: Input
            }], cancelIcon: [{
                type: Input
            }], showUploadButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], showCancelButton: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], mode: [{
                type: Input
            }], headers: [{
                type: Input
            }], customUpload: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], fileLimit: [{
                type: Input,
                args: [{ transform: (value) => numberAttribute(value, null) }]
            }], uploadStyleClass: [{
                type: Input
            }], cancelStyleClass: [{
                type: Input
            }], removeStyleClass: [{
                type: Input
            }], chooseStyleClass: [{
                type: Input
            }], onBeforeUpload: [{
                type: Output
            }], onSend: [{
                type: Output
            }], onUpload: [{
                type: Output
            }], onError: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onRemove: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onProgress: [{
                type: Output
            }], uploadHandler: [{
                type: Output
            }], onImageError: [{
                type: Output
            }], onRemoveUploadedFile: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], advancedFileInput: [{
                type: ViewChild,
                args: ['advancedfileinput']
            }], basicFileInput: [{
                type: ViewChild,
                args: ['basicfileinput']
            }], content: [{
                type: ViewChild,
                args: ['content']
            }], files: [{
                type: Input
            }] } });
export class FileUploadModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: FileUploadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: FileUploadModule, declarations: [FileUpload], imports: [CommonModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule, PlusIcon, UploadIcon, TimesIcon], exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: FileUploadModule, imports: [CommonModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule, PlusIcon, UploadIcon, TimesIcon, SharedModule, ButtonModule, ProgressBarModule, MessagesModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: FileUploadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule, PlusIcon, UploadIcon, TimesIcon],
                    exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
                    declarations: [FileUpload]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXVwbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9maWxldXBsb2FkL2ZpbGV1cGxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQXlCLGFBQWEsRUFBZSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pGLE9BQU8sRUFHSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUlSLE1BQU0sRUFDTixXQUFXLEVBSVgsU0FBUyxFQUNULGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUVsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQXVDLGFBQWEsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2hILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7QUFJOUM7OztHQUdHO0FBMktILE1BQU0sT0FBTyxVQUFVO0lBNlRXO0lBQ0c7SUFDRjtJQUNu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QkFBZ0IsWUFKZixZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUM5RyxZQUFZLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGNBQWM7OzJGQUcxRSxnQkFBZ0I7a0JBTDVCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQztvQkFDckksT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO29CQUNwRixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEV2ZW50LCBIdHRwRXZlbnRUeXBlLCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIExPQ0FMRV9JRCxcbiAgICBOZ01vZHVsZSxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgICBudW1iZXJBdHRyaWJ1dGUsXG4gICAgc2lnbmFsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBCbG9ja2FibGVVSSwgTWVzc2FnZSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlLCBUcmFuc2xhdGlvbktleXMgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgUGx1c0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3BsdXMnO1xuaW1wb3J0IHsgVGltZXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lcyc7XG5pbXBvcnQgeyBVcGxvYWRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy91cGxvYWQnO1xuaW1wb3J0IHsgTWVzc2FnZXNNb2R1bGUgfSBmcm9tICdwcmltZW5nL21lc3NhZ2VzJztcbmltcG9ydCB7IFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9wcm9ncmVzc2Jhcic7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBWb2lkTGlzdGVuZXIgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWxlQmVmb3JlVXBsb2FkRXZlbnQsIEZpbGVQcm9ncmVzc0V2ZW50LCBGaWxlUmVtb3ZlRXZlbnQsIEZpbGVTZWxlY3RFdmVudCwgRmlsZVNlbmRFdmVudCwgRmlsZVVwbG9hZEVycm9yRXZlbnQsIEZpbGVVcGxvYWRFdmVudCwgRmlsZVVwbG9hZEhhbmRsZXJFdmVudCwgUmVtb3ZlVXBsb2FkZWRGaWxlRXZlbnQgfSBmcm9tICcuL2ZpbGV1cGxvYWQuaW50ZXJmYWNlJztcbi8qKlxuICogRmlsZVVwbG9hZCBpcyBhbiBhZHZhbmNlZCB1cGxvYWRlciB3aXRoIGRyYWdkcm9wIHN1cHBvcnQsIG11bHRpIGZpbGUgdXBsb2FkcywgYXV0byB1cGxvYWRpbmcsIHByb2dyZXNzIHRyYWNraW5nIGFuZCB2YWxpZGF0aW9ucy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1maWxlVXBsb2FkJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIidwLWZpbGV1cGxvYWQgcC1maWxldXBsb2FkLWFkdmFuY2VkIHAtY29tcG9uZW50J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cIm1vZGUgPT09ICdhZHZhbmNlZCdcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2ZpbGV1cGxvYWQnXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJicm93c2VGaWxlc0xhYmVsXCJcbiAgICAgICAgICAgICAgICAjYWR2YW5jZWRmaWxlaW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbkZpbGVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW211bHRpcGxlXT1cIm11bHRpcGxlXCJcbiAgICAgICAgICAgICAgICBbYWNjZXB0XT1cImFjY2VwdFwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGlzQ2hvb3NlRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiJydcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaW5wdXQnXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCInbm9uZSdcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWZpbGV1cGxvYWQtYnV0dG9uYmFyXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIididXR0b25iYXInXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFoZWFkZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbiBwLWNvbXBvbmVudCBwLWZpbGV1cGxvYWQtY2hvb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZm9jdXMnOiBmb2N1cywgJ3AtZGlzYWJsZWQnOiBkaXNhYmxlZCB8fCBpc0Nob29zZURpc2FibGVkKCkgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uQmx1cigpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaG9vc2UoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJjaG9vc2UoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImNob29zZVN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjaG9vc2VidXR0b24nXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJicm93c2VGaWxlc0xhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjYWR2YW5jZWRmaWxlaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbkZpbGVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW211bHRpcGxlXT1cIm11bHRpcGxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYWNjZXB0XT1cImFjY2VwdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGlzQ2hvb3NlRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiJydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaW5wdXQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNob29zZUljb25cIiBbbmdDbGFzc109XCIncC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnQnXCIgW2NsYXNzXT1cImNob29zZUljb25cIiBbYXR0ci5hcmlhLWxhYmVsXT1cInRydWVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2Nob29zZWljb24nXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjaG9vc2VJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBsdXNJY29uICpuZ0lmPVwiIWNob29zZUljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdCdcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInRydWVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2Nob29zZWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNob29zZUljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnRcIiBbYXR0ci5hcmlhLWxhYmVsXT1cInRydWVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2Nob29zZWljb24nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNob29zZUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtYnV0dG9uLWxhYmVsXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjaG9vc2VidXR0b25sYWJlbCdcIj57eyBjaG9vc2VCdXR0b25MYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgIDxwLWJ1dHRvbiAqbmdJZj1cIiFhdXRvICYmIHNob3dVcGxvYWRCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgW2xhYmVsXT1cInVwbG9hZEJ1dHRvbkxhYmVsXCIgKG9uQ2xpY2spPVwidXBsb2FkKClcIiBbZGlzYWJsZWRdPVwiIWhhc0ZpbGVzKCkgfHwgaXNGaWxlTGltaXRFeGNlZWRlZCgpXCIgW3N0eWxlQ2xhc3NdPVwidXBsb2FkU3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ1cGxvYWRJY29uXCIgW25nQ2xhc3NdPVwidXBsb2FkSWNvblwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF1cGxvYWRJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFVwbG9hZEljb24gKm5nSWY9XCIhdXBsb2FkSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0J1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ1cGxvYWRJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ1cGxvYWRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L3AtYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8cC1idXR0b24gKm5nSWY9XCIhYXV0byAmJiBzaG93Q2FuY2VsQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIFtsYWJlbF09XCJjYW5jZWxCdXR0b25MYWJlbFwiIChvbkNsaWNrKT1cImNsZWFyKClcIiBbZGlzYWJsZWRdPVwiIWhhc0ZpbGVzKCkgfHwgdXBsb2FkaW5nXCIgW3N0eWxlQ2xhc3NdPVwiY2FuY2VsU3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjYW5jZWxJY29uXCIgW25nQ2xhc3NdPVwiY2FuY2VsSWNvblwiIGNsYXNzPVwicC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNhbmNlbEljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGltZXNJY29uICpuZ0lmPVwiIWNhbmNlbEljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdCdcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNhbmNlbEljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnRcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNhbmNlbEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvcC1idXR0b24+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImhlYWRlclRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogZmlsZXMsIHVwbG9hZGVkRmlsZXM6IHVwbG9hZGVkRmlsZXMsIGNob29zZUNhbGxiYWNrOiBjaG9vc2UuYmluZCh0aGlzKSwgY2xlYXJDYWxsYmFjazogY2xlYXIuYmluZCh0aGlzKSwgdXBsb2FkQ2FsbGJhY2s6IHVwbG9hZC5iaW5kKHRoaXMpIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidG9vbGJhclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgY2xhc3M9XCJwLWZpbGV1cGxvYWQtY29udGVudFwiIChkcmFnZW50ZXIpPVwib25EcmFnRW50ZXIoJGV2ZW50KVwiIChkcmFnbGVhdmUpPVwib25EcmFnTGVhdmUoJGV2ZW50KVwiIChkcm9wKT1cIm9uRHJvcCgkZXZlbnQpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjb250ZW50J1wiPlxuICAgICAgICAgICAgICAgIDxwLXByb2dyZXNzQmFyIFt2YWx1ZV09XCJwcm9ncmVzc1wiIFtzaG93VmFsdWVdPVwiZmFsc2VcIiAqbmdJZj1cImhhc0ZpbGVzKClcIj48L3AtcHJvZ3Jlc3NCYXI+XG5cbiAgICAgICAgICAgICAgICA8cC1tZXNzYWdlcyBbdmFsdWVdPVwibXNnc1wiIFtlbmFibGVTZXJ2aWNlXT1cImZhbHNlXCI+PC9wLW1lc3NhZ2VzPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZmlsZXVwbG9hZC1maWxlc1wiICpuZ0lmPVwiaGFzRmlsZXMoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWZpbGVUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZmlsZXVwbG9hZC1yb3dcIiAqbmdGb3I9XCJsZXQgZmlsZSBvZiBmaWxlczsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc0ltYWdlKGZpbGUpXCI+PGltZyBbc3JjXT1cImZpbGUub2JqZWN0VVJMXCIgW3dpZHRoXT1cInByZXZpZXdXaWR0aFwiIChlcnJvcik9XCJpbWFnZUVycm9yKCRldmVudClcIiAvPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWZpbGV1cGxvYWQtZmlsZW5hbWVcIj57eyBmaWxlLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pnt7IGZvcm1hdFNpemUoZmlsZS5zaXplKSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gKGNsaWNrKT1cInJlbW92ZSgkZXZlbnQsIGkpXCIgW2Rpc2FibGVkXT1cInVwbG9hZGluZ1wiIGNsYXNzPVwicC1idXR0b24taWNvbi1vbmx5XCIgW2NsYXNzXT1cInJlbW92ZVN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUaW1lc0ljb24gKm5nSWY9XCIhY2FuY2VsSWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNhbmNlbEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZmlsZVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiZmlsZXNcIiBbbmdGb3JUZW1wbGF0ZV09XCJmaWxlVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50VGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGltcGxpY2l0OiBmaWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGxvYWRlZEZpbGVzOiB1cGxvYWRlZEZpbGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNob29zZUNhbGxiYWNrOiBjaG9vc2UuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckNhbGxiYWNrOiBjbGVhci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZVVwbG9hZGVkRmlsZUNhbGxiYWNrOiByZW1vdmVVcGxvYWRlZEZpbGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVGaWxlQ2FsbGJhY2s6IHJlbW92ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogbXNnc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZW1wdHlUZW1wbGF0ZSAmJiAhaGFzRmlsZXMoKSAmJiAhaGFzVXBsb2FkZWRGaWxlcygpXCIgY2xhc3M9XCJwLWZpbGV1cGxvYWQtZW1wdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInAtZmlsZXVwbG9hZCBwLWZpbGV1cGxvYWQtYmFzaWMgcC1jb21wb25lbnRcIiAqbmdJZj1cIm1vZGUgPT09ICdiYXNpYydcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2ZpbGV1cGxvYWQnXCI+XG4gICAgICAgICAgICA8cC1tZXNzYWdlcyBbdmFsdWVdPVwibXNnc1wiIFtlbmFibGVTZXJ2aWNlXT1cImZhbHNlXCI+PC9wLW1lc3NhZ2VzPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWJ1dHRvbiBwLWNvbXBvbmVudCBwLWZpbGV1cGxvYWQtY2hvb3NlJzogdHJ1ZSwgJ3AtYnV0dG9uLWljb24tb25seSc6ICFiYXNpY0J1dHRvbkxhYmVsLCAncC1maWxldXBsb2FkLWNob29zZS1zZWxlY3RlZCc6IGhhc0ZpbGVzKCksICdwLWZvY3VzJzogZm9jdXMsICdwLWRpc2FibGVkJzogZGlzYWJsZWQgfVwiXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgICAgIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25CYXNpY1VwbG9hZGVyQ2xpY2soKVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25CYXNpY0tleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjaG9vc2VidXR0b24nXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaGFzRmlsZXMoKSAmJiAhYXV0bzsgZWxzZSBjaG9vc2VTZWN0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidXBsb2FkSWNvblwiIGNsYXNzPVwicC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnRcIiBbbmdDbGFzc109XCJ1cGxvYWRJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXVwbG9hZEljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxVcGxvYWRJY29uICpuZ0lmPVwiIXVwbG9hZEljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdCdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ1cGxvYWRJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidXBsb2FkSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNjaG9vc2VTZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNob29zZUljb25cIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0IHBpXCIgW25nQ2xhc3NdPVwiY2hvb3NlSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjaG9vc2VJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGx1c0ljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0IHBpJ1wiICpuZ0lmPVwiIWNob29zZUljb25UZW1wbGF0ZVwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3VwbG9hZGljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2hvb3NlSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdCBwaVwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3VwbG9hZGljb24nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2hvb3NlSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImJhc2ljQnV0dG9uTGFiZWxcIiBjbGFzcz1cInAtYnV0dG9uLWxhYmVsXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsYWJlbCdcIj57eyBiYXNpY0J1dHRvbkxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImJyb3dzZUZpbGVzTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAjYmFzaWNmaWxlaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICBbYWNjZXB0XT1cImFjY2VwdFwiXG4gICAgICAgICAgICAgICAgICAgIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwib25GaWxlU2VsZWN0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFoYXNGaWxlcygpXCJcbiAgICAgICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoKVwiXG4gICAgICAgICAgICAgICAgICAgIChibHVyKT1cIm9uQmx1cigpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpbnB1dCdcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9maWxldXBsb2FkLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3ksIEJsb2NrYWJsZVVJIHtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSByZXF1ZXN0IHBhcmFtZXRlciB0byBpZGVudGlmeSB0aGUgZmlsZXMgYXQgYmFja2VuZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogUmVtb3RlIHVybCB0byB1cGxvYWQgdGhlIGZpbGVzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEhUVFAgbWV0aG9kIHRvIHNlbmQgdGhlIGZpbGVzIHRvIHRoZSB1cmwgc3VjaCBhcyBcInBvc3RcIiBhbmQgXCJwdXRcIi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtZXRob2Q6ICdwb3N0JyB8ICdwdXQnIHwgdW5kZWZpbmVkID0gJ3Bvc3QnO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gc2VsZWN0IG11bHRpcGxlIGZpbGVzIGF0IG9uY2UgZnJvbSBmaWxlIGRpYWxvZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgbXVsdGlwbGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgcGF0dGVybiB0byByZXN0cmljdCB0aGUgYWxsb3dlZCBmaWxlIHR5cGVzLiBDYW4gYmUgYW55IGNvbWJpbmF0aW9uIG9mIGVpdGhlciB0aGUgTUlNRSB0eXBlcyAoc3VjaCBhcyBcImltYWdlLypcIikgb3IgdGhlIGZpbGUgZXh0ZW5zaW9ucyAoc3VjaCBhcyBcIi5qcGdcIikuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYWNjZXB0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgdGhlIHVwbG9hZCBmdW5jdGlvbmFsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIHVwbG9hZCBiZWdpbnMgYXV0b21hdGljYWxseSBhZnRlciBzZWxlY3Rpb24gaXMgY29tcGxldGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBhdXRvOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENyb3NzLXNpdGUgQWNjZXNzLUNvbnRyb2wgcmVxdWVzdHMgc2hvdWxkIGJlIG1hZGUgdXNpbmcgY3JlZGVudGlhbHMgc3VjaCBhcyBjb29raWVzLCBhdXRob3JpemF0aW9uIGhlYWRlcnMgb3IgVExTIGNsaWVudCBjZXJ0aWZpY2F0ZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIGZpbGUgc2l6ZSBhbGxvd2VkIGluIGJ5dGVzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogbnVtYmVyQXR0cmlidXRlIH0pIG1heEZpbGVTaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3VtbWFyeSBtZXNzYWdlIG9mIHRoZSBpbnZhbGlkIGZpbGUgc2l6ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnZhbGlkRmlsZVNpemVNZXNzYWdlU3VtbWFyeTogc3RyaW5nID0gJ3swfTogSW52YWxpZCBmaWxlIHNpemUsICc7XG4gICAgLyoqXG4gICAgICogRGV0YWlsIG1lc3NhZ2Ugb2YgdGhlIGludmFsaWQgZmlsZSBzaXplLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGludmFsaWRGaWxlU2l6ZU1lc3NhZ2VEZXRhaWw6IHN0cmluZyA9ICdtYXhpbXVtIHVwbG9hZCBzaXplIGlzIHswfS4nO1xuICAgIC8qKlxuICAgICAqIFN1bW1hcnkgbWVzc2FnZSBvZiB0aGUgaW52YWxpZCBmaWxlIHR5cGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW52YWxpZEZpbGVUeXBlTWVzc2FnZVN1bW1hcnk6IHN0cmluZyA9ICd7MH06IEludmFsaWQgZmlsZSB0eXBlLCAnO1xuICAgIC8qKlxuICAgICAqIERldGFpbCBtZXNzYWdlIG9mIHRoZSBpbnZhbGlkIGZpbGUgdHlwZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnZhbGlkRmlsZVR5cGVNZXNzYWdlRGV0YWlsOiBzdHJpbmcgPSAnYWxsb3dlZCBmaWxlIHR5cGVzOiB7MH0uJztcbiAgICAvKipcbiAgICAgKiBEZXRhaWwgbWVzc2FnZSBvZiB0aGUgaW52YWxpZCBmaWxlIHR5cGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW52YWxpZEZpbGVMaW1pdE1lc3NhZ2VEZXRhaWw6IHN0cmluZyA9ICdsaW1pdCBpcyB7MH0gYXQgbW9zdC4nO1xuICAgIC8qKlxuICAgICAqIFN1bW1hcnkgbWVzc2FnZSBvZiB0aGUgaW52YWxpZCBmaWxlIHR5cGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW52YWxpZEZpbGVMaW1pdE1lc3NhZ2VTdW1tYXJ5OiBzdHJpbmcgPSAnTWF4aW11bSBudW1iZXIgb2YgZmlsZXMgZXhjZWVkZWQsICc7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaWR0aCBvZiB0aGUgaW1hZ2UgdGh1bWJuYWlsIGluIHBpeGVscy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZSB9KSBwcmV2aWV3V2lkdGg6IG51bWJlciA9IDUwO1xuICAgIC8qKlxuICAgICAqIExhYmVsIG9mIHRoZSBjaG9vc2UgYnV0dG9uLiBEZWZhdWx0cyB0byBQcmltZU5HIExvY2FsZSBjb25maWd1cmF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNob29zZUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTGFiZWwgb2YgdGhlIHVwbG9hZCBidXR0b24uIERlZmF1bHRzIHRvIFByaW1lTkcgTG9jYWxlIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdXBsb2FkTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBMYWJlbCBvZiB0aGUgY2FuY2VsIGJ1dHRvbi4gRGVmYXVsdHMgdG8gUHJpbWVORyBMb2NhbGUgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjYW5jZWxMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEljb24gb2YgdGhlIGNob29zZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2hvb3NlSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEljb24gb2YgdGhlIHVwbG9hZCBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdXBsb2FkSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEljb24gb2YgdGhlIGNhbmNlbCBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2FuY2VsSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgdXBsb2FkIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgc2hvd1VwbG9hZEJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBjYW5jZWwgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KSBzaG93Q2FuY2VsQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBVSSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGU6ICdhZHZhbmNlZCcgfCAnYmFzaWMnIHwgdW5kZWZpbmVkID0gJ2FkdmFuY2VkJztcbiAgICAvKipcbiAgICAgKiBIdHRwSGVhZGVycyBjbGFzcyByZXByZXNlbnRzIHRoZSBoZWFkZXIgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciBhbiBIVFRQIHJlcXVlc3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGVhZGVyczogSHR0cEhlYWRlcnMgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgdGhlIGRlZmF1bHQgdXBsb2FkIG9yIGEgbWFudWFsIGltcGxlbWVudGF0aW9uIGRlZmluZWQgaW4gdXBsb2FkSGFuZGxlciBjYWxsYmFjay4gRGVmYXVsdHMgdG8gUHJpbWVORyBMb2NhbGUgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSkgY3VzdG9tVXBsb2FkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIE1heGltdW0gbnVtYmVyIG9mIGZpbGVzIHRoYXQgY2FuIGJlIHVwbG9hZGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCh7IHRyYW5zZm9ybTogKHZhbHVlOiB1bmtub3duKSA9PiBudW1iZXJBdHRyaWJ1dGUodmFsdWUsIG51bGwpIH0pIGZpbGVMaW1pdDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSB1cGxvYWQgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVwbG9hZFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY2FuY2VsIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjYW5jZWxTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIHJlbW92ZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmVtb3ZlU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjaG9vc2UgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNob29zZVN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2UgYmVmb3JlIGZpbGUgdXBsb2FkIGlzIGluaXRpYWxpemVkLlxuICAgICAqIEBwYXJhbSB7RmlsZUJlZm9yZVVwbG9hZEV2ZW50fSBldmVudCAtIEN1c3RvbSB1cGxvYWQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQmVmb3JlVXBsb2FkOiBFdmVudEVtaXR0ZXI8RmlsZUJlZm9yZVVwbG9hZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZUJlZm9yZVVwbG9hZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIEFuIGV2ZW50IGluZGljYXRpbmcgdGhhdCB0aGUgcmVxdWVzdCB3YXMgc2VudCB0byB0aGUgc2VydmVyLiBVc2VmdWwgd2hlbiBhIHJlcXVlc3QgbWF5IGJlIHJldHJpZWQgbXVsdGlwbGUgdGltZXMsIHRvIGRpc3Rpbmd1aXNoIGJldHdlZW4gcmV0cmllcyBvbiB0aGUgZmluYWwgZXZlbnQgc3RyZWFtLlxuICAgICAqIEBwYXJhbSB7RmlsZVNlbmRFdmVudH0gZXZlbnQgLSBDdXN0b20gc2VuZCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25TZW5kOiBFdmVudEVtaXR0ZXI8RmlsZVNlbmRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVTZW5kRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZmlsZSB1cGxvYWQgaXMgY29tcGxldGUuXG4gICAgICogQHBhcmFtIHtGaWxlVXBsb2FkRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHVwbG9hZCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25VcGxvYWQ6IEV2ZW50RW1pdHRlcjxGaWxlVXBsb2FkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlVXBsb2FkRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGlmIGZpbGUgdXBsb2FkIGZhaWxzLlxuICAgICAqIEBwYXJhbSB7RmlsZVVwbG9hZEVycm9yRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIGVycm9yIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkVycm9yOiBFdmVudEVtaXR0ZXI8RmlsZVVwbG9hZEVycm9yRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlVXBsb2FkRXJyb3JFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBmaWxlcyBpbiBxdWV1ZSBhcmUgcmVtb3ZlZCB3aXRob3V0IHVwbG9hZGluZyB1c2luZyBjbGVhciBhbGwgYnV0dG9uLlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gQnJvd3NlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbGVhcjogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBmaWxlIGlzIHJlbW92ZWQgd2l0aG91dCB1cGxvYWRpbmcgdXNpbmcgY2xlYXIgYnV0dG9uIG9mIGEgZmlsZS5cbiAgICAgKiBAcGFyYW0ge0ZpbGVSZW1vdmVFdmVudH0gZXZlbnQgLSBSZW1vdmUgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUmVtb3ZlOiBFdmVudEVtaXR0ZXI8RmlsZVJlbW92ZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVJlbW92ZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGZpbGVzIGFyZSBzZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0ge0ZpbGVTZWxlY3RFdmVudH0gZXZlbnQgLSBTZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8RmlsZVNlbGVjdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVNlbGVjdEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGZpbGVzIGFyZSBiZWluZyB1cGxvYWRlZC5cbiAgICAgKiBAcGFyYW0ge0ZpbGVQcm9ncmVzc0V2ZW50fSBldmVudCAtIFByb2dyZXNzIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblByb2dyZXNzOiBFdmVudEVtaXR0ZXI8RmlsZVByb2dyZXNzRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlUHJvZ3Jlc3NFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2UgaW4gY3VzdG9tIHVwbG9hZCBtb2RlIHRvIHVwbG9hZCB0aGUgZmlsZXMgbWFudWFsbHkuXG4gICAgICogQHBhcmFtIHtGaWxlVXBsb2FkSGFuZGxlckV2ZW50fSBldmVudCAtIFVwbG9hZCBoYW5kbGVyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSB1cGxvYWRIYW5kbGVyOiBFdmVudEVtaXR0ZXI8RmlsZVVwbG9hZEhhbmRsZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVVcGxvYWRIYW5kbGVyRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyB0cmlnZ2VyZWQgaWYgYW4gZXJyb3Igb2NjdXJzIHdoaWxlIGxvYWRpbmcgYW4gaW1hZ2UgZmlsZS5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uSW1hZ2VFcnJvcjogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogVGhpcyBldmVudCBpcyB0cmlnZ2VyZWQgaWYgYW4gZXJyb3Igb2NjdXJzIHdoaWxlIHJlbW92aW5nIGFuIHVwbG9hZGVkIGZpbGUuXG4gICAgICogQHBhcmFtIHtSZW1vdmVVcGxvYWRlZEZpbGVFdmVudH0gZXZlbnQgLSBSZW1vdmUgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUmVtb3ZlVXBsb2FkZWRGaWxlOiBFdmVudEVtaXR0ZXI8UmVtb3ZlVXBsb2FkZWRGaWxlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxSZW1vdmVVcGxvYWRlZEZpbGVFdmVudD4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCdhZHZhbmNlZGZpbGVpbnB1dCcpIGFkdmFuY2VkRmlsZUlucHV0OiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkIHwgYW55O1xuXG4gICAgQFZpZXdDaGlsZCgnYmFzaWNmaWxlaW5wdXQnKSBiYXNpY0ZpbGVJbnB1dDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50OiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgc2V0IGZpbGVzKGZpbGVzKSB7XG4gICAgICAgIHRoaXMuX2ZpbGVzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBmaWxlc1tpXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGUoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ltYWdlKGZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PmZpbGUpLm9iamVjdFVSTCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwod2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZXNbaV0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9maWxlcy5wdXNoKGZpbGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBmaWxlcygpOiBGaWxlW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBiYXNpY0J1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmF1dG8gfHwgIXRoaXMuaGFzRmlsZXMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hvb3NlTGFiZWwgYXMgc3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkTGFiZWwgPz8gdGhpcy5maWxlc1swXS5uYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBfZmlsZXM6IEZpbGVbXSA9IFtdO1xuXG4gICAgcHVibGljIHByb2dyZXNzOiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIGRyYWdIaWdobGlnaHQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgbXNnczogTWVzc2FnZVtdIHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIGZpbGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgdG9vbGJhclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgY2hvb3NlSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgdXBsb2FkSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgY2FuY2VsSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgZW1wdHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyB1cGxvYWRlZEZpbGVDb3VudDogbnVtYmVyID0gMDtcblxuICAgIGZvY3VzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgdXBsb2FkaW5nOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZHVwbGljYXRlSUVFdmVudDogYm9vbGVhbiB8IHVuZGVmaW5lZDsgLy8gZmxhZyB0byByZWNvZ25pemUgZHVwbGljYXRlIG9uY2hhbmdlIGV2ZW50IGZvciBmaWxlIGlucHV0XG5cbiAgICB0cmFuc2xhdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgZHJhZ092ZXJMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgcHVibGljIHVwbG9hZGVkRmlsZXMgPSBbXTtcblxuICAgIHByaXZhdGUgZmlsZVVwbG9hZFN1YmNyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBwcml2YXRlIGZvcm1hdHRlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgICAgIEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZTogc3RyaW5nLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICAgICAgcHVibGljIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZm9ybWF0dGVyID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHRoaXMubG9jYWxlLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMyB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3Rvb2xiYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2xiYXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2hvb3NlaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd1cGxvYWRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5jb25maWcudHJhbnNsYXRpb25PYnNlcnZlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2FkdmFuY2VkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LCAnZHJhZ292ZXInLCB0aGlzLm9uRHJhZ092ZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRyYW5zbGF0aW9uKG9wdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihvcHRpb24pO1xuICAgIH1cblxuICAgIGNob29zZSgpIHtcbiAgICAgICAgdGhpcy5hZHZhbmNlZEZpbGVJbnB1dD8ubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIH1cblxuICAgIG9uRmlsZVNlbGVjdChldmVudDogYW55KSB7XG4gICAgICAgIGlmIChldmVudC50eXBlICE9PSAnZHJvcCcgJiYgdGhpcy5pc0lFMTEoKSAmJiB0aGlzLmR1cGxpY2F0ZUlFRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZHVwbGljYXRlSUVFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tc2dzID0gW107XG4gICAgICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5maWxlcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbGVzID0gZXZlbnQuZGF0YVRyYW5zZmVyID8gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzIDogZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNGaWxlU2VsZWN0ZWQoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZShmaWxlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ltYWdlKGZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlLm9iamVjdFVSTCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwod2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZXNbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGZpbGVzOiBmaWxlcywgY3VycmVudEZpbGVzOiB0aGlzLmZpbGVzIH0pO1xuXG4gICAgICAgIC8vIHRoaXMgd2lsbCBjaGVjayB0aGUgZmlsZUxpbWl0IHdpdGggdGhlIHVwbG9hZGVkIGZpbGVzXG4gICAgICAgIHRoaXMuY2hlY2tGaWxlTGltaXQoZmlsZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmhhc0ZpbGVzKCkgJiYgdGhpcy5hdXRvICYmICh0aGlzLm1vZGUgIT09ICdhZHZhbmNlZCcgfHwgIXRoaXMuaXNGaWxlTGltaXRFeGNlZWRlZCgpKSkge1xuICAgICAgICAgICAgdGhpcy51cGxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC50eXBlICE9PSAnZHJvcCcgJiYgdGhpcy5pc0lFMTEoKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcklFSW5wdXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJJbnB1dEVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRmlsZVNlbGVjdGVkKGZpbGU6IEZpbGUpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgc0ZpbGUgb2YgdGhpcy5maWxlcykge1xuICAgICAgICAgICAgaWYgKHNGaWxlLm5hbWUgKyBzRmlsZS50eXBlICsgc0ZpbGUuc2l6ZSA9PT0gZmlsZS5uYW1lICsgZmlsZS50eXBlICsgZmlsZS5zaXplKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJRTExKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgcmV0dXJuICEhKHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgYXMgYW55KVsnTVNJbnB1dE1ldGhvZENvbnRleHQnXSAmJiAhISh0aGlzLmRvY3VtZW50IGFzIGFueSlbJ2RvY3VtZW50TW9kZSddO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLm1zZ3MgPSB0aGlzLm1zZ3MgfHwgW107XG4gICAgICAgIGlmICh0aGlzLmFjY2VwdCAmJiAhdGhpcy5pc0ZpbGVUeXBlVmFsaWQoZmlsZSkpIHtcbiAgICAgICAgICAgIHRoaXMubXNncy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZXZlcml0eTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OiB0aGlzLmludmFsaWRGaWxlVHlwZU1lc3NhZ2VTdW1tYXJ5LnJlcGxhY2UoJ3swfScsIGZpbGUubmFtZSksXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzLmludmFsaWRGaWxlVHlwZU1lc3NhZ2VEZXRhaWwucmVwbGFjZSgnezB9JywgdGhpcy5hY2NlcHQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heEZpbGVTaXplICYmIGZpbGUuc2l6ZSA+IHRoaXMubWF4RmlsZVNpemUpIHtcbiAgICAgICAgICAgIHRoaXMubXNncy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZXZlcml0eTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OiB0aGlzLmludmFsaWRGaWxlU2l6ZU1lc3NhZ2VTdW1tYXJ5LnJlcGxhY2UoJ3swfScsIGZpbGUubmFtZSksXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzLmludmFsaWRGaWxlU2l6ZU1lc3NhZ2VEZXRhaWwucmVwbGFjZSgnezB9JywgdGhpcy5mb3JtYXRTaXplKHRoaXMubWF4RmlsZVNpemUpKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRmlsZVR5cGVWYWxpZChmaWxlOiBGaWxlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBhY2NlcHRhYmxlVHlwZXMgPSB0aGlzLmFjY2VwdD8uc3BsaXQoJywnKS5tYXAoKHR5cGUpID0+IHR5cGUudHJpbSgpKTtcbiAgICAgICAgZm9yIChsZXQgdHlwZSBvZiBhY2NlcHRhYmxlVHlwZXMhKSB7XG4gICAgICAgICAgICBsZXQgYWNjZXB0YWJsZSA9IHRoaXMuaXNXaWxkY2FyZCh0eXBlKSA/IHRoaXMuZ2V0VHlwZUNsYXNzKGZpbGUudHlwZSkgPT09IHRoaXMuZ2V0VHlwZUNsYXNzKHR5cGUpIDogZmlsZS50eXBlID09IHR5cGUgfHwgdGhpcy5nZXRGaWxlRXh0ZW5zaW9uKGZpbGUpLnRvTG93ZXJDYXNlKCkgPT09IHR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYgKGFjY2VwdGFibGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRUeXBlQ2xhc3MoZmlsZVR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBmaWxlVHlwZS5zdWJzdHJpbmcoMCwgZmlsZVR5cGUuaW5kZXhPZignLycpKTtcbiAgICB9XG5cbiAgICBpc1dpbGRjYXJkKGZpbGVUeXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZpbGVUeXBlLmluZGV4T2YoJyonKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgZ2V0RmlsZUV4dGVuc2lvbihmaWxlOiBGaWxlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICcuJyArIGZpbGUubmFtZS5zcGxpdCgnLicpLnBvcCgpO1xuICAgIH1cblxuICAgIGlzSW1hZ2UoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gL15pbWFnZVxcLy8udGVzdChmaWxlLnR5cGUpO1xuICAgIH1cblxuICAgIG9uSW1hZ2VMb2FkKGltZzogYW55KSB7XG4gICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltZy5zcmMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGxvYWRzIHRoZSBzZWxlY3RlZCBmaWxlcy5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgdXBsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5jdXN0b21VcGxvYWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbGVMaW1pdCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkZWRGaWxlQ291bnQgKz0gdGhpcy5maWxlcy5sZW5ndGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXBsb2FkSGFuZGxlci5lbWl0KHtcbiAgICAgICAgICAgICAgICBmaWxlczogdGhpcy5maWxlc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlVXBsb2FkLmVtaXQoe1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhOiBmb3JtRGF0YVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCh0aGlzLm5hbWUhLCB0aGlzLmZpbGVzW2ldLCB0aGlzLmZpbGVzW2ldLm5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB0aGUgcHJldmlvdXMgdXBsb2FkIGhhc24ndCBiZWVuIGZpbmlzaGVkLCBpdCBpcyBhYm9ydGVkLlxuICAgICAgICAgICAgdGhpcy5jYW5jZWxVcGxvYWRSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZmlsZVVwbG9hZFN1YmNyaXB0aW9uID0gdGhpcy5odHRwXG4gICAgICAgICAgICAgICAgLnJlcXVlc3QoPHN0cmluZz50aGlzLm1ldGhvZCwgdGhpcy51cmwgYXMgc3RyaW5nLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGZvcm1EYXRhLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFByb2dyZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlOiAnZXZlbnRzJyxcbiAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFsc1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKGV2ZW50OiBIdHRwRXZlbnQ8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBIdHRwRXZlbnRUeXBlLlNlbnQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25TZW5kLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YTogZm9ybURhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSHR0cEV2ZW50VHlwZS5SZXNwb25zZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50WydzdGF0dXMnXSA+PSAyMDAgJiYgZXZlbnRbJ3N0YXR1cyddIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWxlTGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGVkRmlsZUNvdW50ICs9IHRoaXMuZmlsZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVXBsb2FkLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgZmlsZXM6IHRoaXMuZmlsZXMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdCh7IGZpbGVzOiB0aGlzLmZpbGVzIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkZWRGaWxlcy5wdXNoKC4uLnRoaXMuZmlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRbJ2xvYWRlZCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5yb3VuZCgoZXZlbnRbJ2xvYWRlZCddICogMTAwKSAvIGV2ZW50Wyd0b3RhbCddISk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUHJvZ3Jlc3MuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9ncmVzczogdGhpcy5wcm9ncmVzcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IEVycm9yRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdCh7IGZpbGVzOiB0aGlzLmZpbGVzLCBlcnJvcjogZXJyb3IgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZmlsZXMgbGlzdC5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy51cGxvYWRlZEZpbGVDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuY2FuY2VsVXBsb2FkUmVxdWVzdCgpO1xuICAgICAgICB0aGlzLm9uQ2xlYXIuZW1pdCgpO1xuICAgICAgICB0aGlzLmNsZWFySW5wdXRFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBzaW5nbGUgZmlsZS5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IC0gSW5kZXggb2YgdGhlIGZpbGUuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHJlbW92ZShldmVudDogRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxVcGxvYWRSZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMuY2xlYXJJbnB1dEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGZpbGU6IHRoaXMuZmlsZXNbaW5kZXhdIH0pO1xuICAgICAgICB0aGlzLmZpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuY2hlY2tGaWxlTGltaXQodGhpcy5maWxlcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdXBsb2FkZWQgZmlsZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggLSBJbmRleCBvZiB0aGUgZmlsZSB0byBiZSByZW1vdmVkLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICByZW1vdmVVcGxvYWRlZEZpbGUoaW5kZXgpIHtcbiAgICAgICAgbGV0IHJlbW92ZWRGaWxlID0gdGhpcy51cGxvYWRlZEZpbGVzLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgICAgIHRoaXMudXBsb2FkZWRGaWxlcyA9IFsuLi50aGlzLnVwbG9hZGVkRmlsZXNdO1xuICAgICAgICB0aGlzLm9uUmVtb3ZlVXBsb2FkZWRGaWxlLmVtaXQoeyBmaWxlOiByZW1vdmVkRmlsZSwgZmlsZXM6IHRoaXMudXBsb2FkZWRGaWxlcyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYW5jZWwgdXBsb2FkIGZpbGUgcmVxdWVzdC5cbiAgICAgKiAqL1xuICAgIGNhbmNlbFVwbG9hZFJlcXVlc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbGVVcGxvYWRTdWJjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5maWxlVXBsb2FkU3ViY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuZmlsZVVwbG9hZFN1YmNyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNGaWxlTGltaXRFeGNlZWRlZCgpIHtcbiAgICAgICAgY29uc3QgaXNBdXRvTW9kZSA9IHRoaXMuYXV0bztcbiAgICAgICAgY29uc3QgdG90YWxGaWxlQ291bnQgPSBpc0F1dG9Nb2RlID8gdGhpcy5maWxlcy5sZW5ndGggOiB0aGlzLmZpbGVzLmxlbmd0aCArIHRoaXMudXBsb2FkZWRGaWxlQ291bnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsZUxpbWl0ICYmIHRoaXMuZmlsZUxpbWl0IDw9IHRvdGFsRmlsZUNvdW50ICYmIHRoaXMuZm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVMaW1pdCAmJiB0aGlzLmZpbGVMaW1pdCA8IHRvdGFsRmlsZUNvdW50O1xuICAgIH1cblxuICAgIGlzQ2hvb3NlRGlzYWJsZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG8pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGVMaW1pdCAmJiB0aGlzLmZpbGVMaW1pdCA8PSB0aGlzLmZpbGVzLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGVMaW1pdCAmJiB0aGlzLmZpbGVMaW1pdCA8PSB0aGlzLmZpbGVzLmxlbmd0aCArIHRoaXMudXBsb2FkZWRGaWxlQ291bnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0ZpbGVMaW1pdChmaWxlczogRmlsZVtdKSB7XG4gICAgICAgIHRoaXMubXNncyA/Pz0gW107XG4gICAgICAgIGNvbnN0IGhhc0V4aXN0aW5nVmFsaWRhdGlvbk1lc3NhZ2VzID0gdGhpcy5tc2dzLmxlbmd0aCA+IDAgJiYgdGhpcy5maWxlTGltaXQgPCBmaWxlcy5sZW5ndGg7XG4gICAgICAgIGlmICh0aGlzLmlzRmlsZUxpbWl0RXhjZWVkZWQoKSB8fCBoYXNFeGlzdGluZ1ZhbGlkYXRpb25NZXNzYWdlcykge1xuICAgICAgICAgICAgdGhpcy5tc2dzLnB1c2goe1xuICAgICAgICAgICAgICAgIHNldmVyaXR5OiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIHN1bW1hcnk6IHRoaXMuaW52YWxpZEZpbGVMaW1pdE1lc3NhZ2VTdW1tYXJ5LnJlcGxhY2UoJ3swfScsICh0aGlzLmZpbGVMaW1pdCBhcyBudW1iZXIpLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgICAgIGRldGFpbDogdGhpcy5pbnZhbGlkRmlsZUxpbWl0TWVzc2FnZURldGFpbC5yZXBsYWNlKCd7MH0nLCAodGhpcy5maWxlTGltaXQgYXMgbnVtYmVyKS50b1N0cmluZygpKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcklucHV0RWxlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWR2YW5jZWRGaWxlSW5wdXQgJiYgdGhpcy5hZHZhbmNlZEZpbGVJbnB1dC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2VkRmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJhc2ljRmlsZUlucHV0ICYmIHRoaXMuYmFzaWNGaWxlSW5wdXQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5iYXNpY0ZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcklFSW5wdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFkdmFuY2VkRmlsZUlucHV0ICYmIHRoaXMuYWR2YW5jZWRGaWxlSW5wdXQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5kdXBsaWNhdGVJRUV2ZW50ID0gdHJ1ZTsgLy9JRTExIGZpeCB0byBwcmV2ZW50IG9uRmlsZUNoYW5nZSB0cmlnZ2VyIGFnYWluXG4gICAgICAgICAgICB0aGlzLmFkdmFuY2VkRmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0ZpbGVzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlcyAmJiB0aGlzLmZpbGVzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgaGFzVXBsb2FkZWRGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkZWRGaWxlcyAmJiB0aGlzLnVwbG9hZGVkRmlsZXMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBvbkRyYWdFbnRlcihlOiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmFnT3ZlcihlOiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuY29udGVudD8ubmF0aXZlRWxlbWVudCwgJ3AtZmlsZXVwbG9hZC1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0hpZ2hsaWdodCA9IHRydWU7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmFnTGVhdmUoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250ZW50Py5uYXRpdmVFbGVtZW50LCAncC1maWxldXBsb2FkLWhpZ2hsaWdodCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGVudD8ubmF0aXZlRWxlbWVudCwgJ3AtZmlsZXVwbG9hZC1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbGV0IGZpbGVzID0gZXZlbnQuZGF0YVRyYW5zZmVyID8gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzIDogZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgICAgICAgbGV0IGFsbG93RHJvcCA9IHRoaXMubXVsdGlwbGUgfHwgKGZpbGVzICYmIGZpbGVzLmxlbmd0aCA9PT0gMSk7XG5cbiAgICAgICAgICAgIGlmIChhbGxvd0Ryb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRmlsZVNlbGVjdChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3JtYXRTaXplKGJ5dGVzOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgayA9IDEwMjQ7XG4gICAgICAgIGNvbnN0IHNpemVzID0gdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuRklMRV9TSVpFX1RZUEVTKTtcblxuICAgICAgICBpZiAoYnl0ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBgMCAke3NpemVzWzBdfWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZyhrKSk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFNpemUgPSB0aGlzLmZvcm1hdHRlci5mb3JtYXQoYnl0ZXMgLyBNYXRoLnBvdyhrLCBpKSk7XG5cbiAgICAgICAgcmV0dXJuIGAke2Zvcm1hdHRlZFNpemV9ICR7c2l6ZXNbaV19YDtcbiAgICB9XG5cbiAgICBvbkJhc2ljVXBsb2FkZXJDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzRmlsZXMoKSkgdGhpcy51cGxvYWQoKTtcbiAgICAgICAgZWxzZSB0aGlzLmJhc2ljRmlsZUlucHV0Py5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuXG4gICAgb25CYXNpY0tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkJhc2ljVXBsb2FkZXJDbGljaygpO1xuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGltYWdlRXJyb3IoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25JbWFnZUVycm9yLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIGdldCBjaG9vc2VCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jaG9vc2VMYWJlbCB8fCB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuQ0hPT1NFKTtcbiAgICB9XG5cbiAgICBnZXQgdXBsb2FkQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkTGFiZWwgfHwgdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLlVQTE9BRCk7XG4gICAgfVxuXG4gICAgZ2V0IGNhbmNlbEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbmNlbExhYmVsIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5DQU5DRUwpO1xuICAgIH1cblxuICAgIGdldCBicm93c2VGaWxlc0xhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuQVJJQSlbVHJhbnNsYXRpb25LZXlzLkJST1dTRV9GSUxFU107XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQgJiYgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdPdmVyTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIEJ1dHRvbk1vZHVsZSwgUHJvZ3Jlc3NCYXJNb2R1bGUsIE1lc3NhZ2VzTW9kdWxlLCBSaXBwbGVNb2R1bGUsIFBsdXNJY29uLCBVcGxvYWRJY29uLCBUaW1lc0ljb25dLFxuICAgIGV4cG9ydHM6IFtGaWxlVXBsb2FkLCBTaGFyZWRNb2R1bGUsIEJ1dHRvbk1vZHVsZSwgUHJvZ3Jlc3NCYXJNb2R1bGUsIE1lc3NhZ2VzTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtGaWxlVXBsb2FkXVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkTW9kdWxlIHt9XG4iXX0=