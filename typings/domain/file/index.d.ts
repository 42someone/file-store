export declare class File {
    private readonly id;
    private readonly viewName;
    private readonly systemName;
    private readonly extension;
    private readonly mimeType;
    private readonly size;
    private readonly uploadDateTime;
    private readonly updateTime;
    private readonly contentType;
    constructor(id: number, viewName: string, systemName: string, extension: string, mimeType: string, size: number, uploadDateTime: Date, updateTime: Date, contentType: string);
    getId(): number;
    getViewName(): string;
    getSystemName(): string;
    getExtension(): string;
    getMimeType(): string;
    getSize(): number;
    getSizeInKB(): number;
    getUploadTime(): Date;
    getUpdateTime(): Date;
    getContentType(): string;
}
