import { Collection } from '@caiu/library';

export class Agenda extends BaseEntity {
    agendaDate: Date = undefined;
    createdByName = '';
    deleted = false;
    description = '';
    displayMinutes = false;
    displayOrder = 0;
    groupId = 0;
    groupName = '';
    hasChildren = 0;
    markedForDelete: Date = null;
    meetingId = 0;
    name = '';
    rollcallTaken = false;
    securityStatusId = 0;
    timeframeId = 0;

    agendaItems: AgendaItem[] = [];
    attachments: Attachment[] = [];
    group: Group = new Group();
    meeting: Meeting = new Meeting();
    securityStatus = '';

    get accountId(): number {
        return this.meeting.accountId;
    }

    get accountName(): string {
        return this.meeting.accountName;
    }

    set accountName(value: string) {
        this.meeting.accountName = value;
    }

    get meetingDeleted(): boolean {
        return this.meeting.markedForDelete ? true : false;
    }

    get visibility(): string {
        switch (this.securityStatusId) {
            case 1:
                return 'only those with edit permissions.';
            case 2:
                return 'all group members.';
            case 3:
                return 'members of this account.';
            case 4:
                return 'the public.';
            default:
                return 'only those with edit permissions.';
        }
    }

    buildTemplate(templateName: string): Agenda {
        return build(Agenda, this, { name: templateName });
    }
}

export class AgendaAttendance {
    agendaId = 0;
    attendee = '';
    createdOn = '';
    isPresent = false;
    writeIn = '';
}

export class Agendas extends Collection<Agenda> {
    showAgenda = true;

    constructor() {
        super(Agenda);
    }
}

export class AgendaEdit {

    agendaDescription = '';
    agendaName = '';
    displayMinutes = false;
    isPrivate = true;
    timeframeId = 0;
    metadata: Metadata = {
        ignore: ['_agenda', 'agenda', 'id'],
        agendaName: {
            validators: [Validators.required, Validators.maxLength(150)]
        }
    };

    static Build(agenda: Agenda, props: any = {}): AgendaEdit {
        return Object.assign(new AgendaEdit(agenda), props);
    }

    static BuildAgenda(agenda: Agenda, props: any = {}): Agenda {
        return AgendaEdit.Build(agenda, props).agenda;
    }

    constructor(private _agenda: Agenda = new Agenda()) {
        this.agendaDescription = this._agenda.description;
        this.agendaName = this._agenda.name;
        this.displayMinutes = this._agenda.displayMinutes;
        this.isPrivate = this._agenda.securityStatusId === 1;
        this.timeframeId = this._agenda.timeframeId;
    }

    get agenda(): Agenda {
        return build(Agenda, this._agenda, {
            description: this.agendaDescription,
            displayMinutes: this.displayMinutes,
            name: this.agendaName,
            securityStatusId: this.isPrivate ? 1 : 4, // 1=private, 4=public
            timeframeId: typeof (this.timeframeId) === 'string' ? str2int(this.timeframeId) : this.timeframeId
        });
    }

    get id(): number {
        return this.agenda.id;
    }
}
