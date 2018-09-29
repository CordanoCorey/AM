export class Announcements extends Collection<Announcement> {
    dashboard: number[] = [];

    constructor() {
        super(Announcement);
    }
}

export class Announcement extends BaseEntity {
    accountId = 0;
    announcementTypeId = 0;
    description = '';
    groupId = 0;
    subject = '';
    signature = '';
    startDate: Date = new Date();
    endDate: Date = new Date();
    attachments: File[] = [];

    _announcementTypeName = '';

    get announcementTypeName(): string {
        let typeName = this._announcementTypeName;

        switch (this.announcementTypeId) {
            case 0:
                typeName = 'System Admin';
                break;
            case 1:
                typeName = 'System';
                break;
            case 2:
                typeName = 'Account';
                break;
            case 3:
                typeName = 'Group';
                break;
        }
        return typeName;
    }

    set announcementTypeName(value: string) {
        this._announcementTypeName = value;
    }

    get hasAttachments(): boolean {
        return this.attachments.length > 0;
    }
}

export class SysAdminAnnouncement extends BaseEntity {
    subject = '';
    message = '';
    startDate: Date = new Date();
    endDate: Date = new Date();
}

export enum AnnouncementType {
    DEFAULT,
    SYSTEM_WIDE,
    ACCOUNT_ONLY,
    GROUP
}

export class AnnouncementRow {

    constructor(private _announcement: Announcement) {
    }

    get announcement(): Announcement {
        return build(Announcement, this._announcement);
    }

    get announcementId(): number {
        return this.announcement.id;
    }

    get endDate(): Date {
        return new Date(this.announcement.endDate);
    }

    get startDate(): Date {
        return new Date(this.announcement.startDate);
    }

    get subject(): string {
        return this.announcement.subject;
    }

    get type(): string {
        return this.announcement.announcementTypeName;
    }
}

export class AnnouncementEdit {

    announcementTypeId = 0;
    description = '';
    groupId = 0;
    subject = '';
    signature = '';
    dateRange: DateRange = new DateRange();
    attachments: FileUpload[] = [];
    metadata: Metadata = {
        ignore: ['_announcement', 'announcement'],
        controls: ['dateRange']
    };

    static Build(announcement: Announcement, props: any = {}): AnnouncementEdit {
        return Object.assign(new AnnouncementEdit(announcement), props);
    }

    static BuildAnnouncement(announcement: Announcement, props: any = {}): Announcement {
        return AnnouncementEdit.Build(announcement, props).announcement;
    }

    constructor(private _announcement: Announcement = new Announcement) {
        this.announcementTypeId = this._announcement.announcementTypeId;
        this.description = this._announcement.description;
        this.groupId = this._announcement.groupId;
        this.subject = this._announcement.subject;
        this.signature = this._announcement.signature;
        this.dateRange.startDate = this._announcement.startDate;
        this.dateRange.endDate = this._announcement.endDate;
    }

    get announcement(): Announcement {
        return build(Announcement, this._announcement, {
            announcementTypeId: this.announcementTypeId,
            attachments: this.attachments.map(upload => {
                const file = this._announcement.attachments ?
                    this._announcement.attachments.find(f => f.fileName === upload.name) : null;
                return mapFileUpload(upload, file);
            }),
            description: this.description,
            groupId: this.groupId,
            subject: this.subject,
            signature: this.signature,
            startDate: this.dateRange.startDate,
            endDate: this.dateRange.endDate
        });
    }
}
