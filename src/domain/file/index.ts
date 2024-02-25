export class File {
    constructor(
        private readonly id: number,
        private readonly viewName: string,
        private readonly systemName: string,
        private readonly extension: string,
        private readonly mimeType: string,
        private readonly size: number,
        private readonly uploadDateTime: Date,
        private readonly updateTime: Date,
        private readonly contentType: string,
    ) {}

    public getId(): number {
        return this.id
    }

    public getViewName(): string {
        return this.viewName
    }
    public getSystemName(): string {
        return this.systemName
    }
    public getExtension(): string {
        return this.extension
    }
    public getMimeType(): string {
        return this.mimeType
    }
    public getSize() {
        return this.size
    }
    public getSizeInKB() {
        return this.size / 1000
    }
    public getUploadTime() {
        return this.uploadDateTime
    }
    public getUpdateTime() {
        return this.updateTime
    }

    public getContentType(): string {
        return this.contentType
    }

}