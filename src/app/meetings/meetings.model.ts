export class Meeting extends BaseEntity {
    accountId = 0;
    attendanceTakerId = 0;
    comments = '';
    conferenceId = 0;
    date: Date = new Date();
    endTime: Date = new Date();
    groupId = 0;
    location = '';
    markedForDelete: Date = new Date();
    minuteTakerId = 0;
    name = '';
    startTime: Date = new Date();
    securityStatusId = 0;
    typeId = 0;
    voteTakerId = 0;

    account: Account = new Account();
    agendas: Agenda[] = [];
    durationHour = 0;
    durationMinutes = 0;
    email: EmailItem[] = [];
    generalInfo = '';
    groupMembers: GroupMember[] = [];
    groupName = '';
    groups: Group[] = [];
    securityStatusName = '';
    startHour = 0;
    startMinutes = 0;
    startMeridian: 'AM' | 'PM' = 'AM';

    get accountName(): string {
        return this.account.name;
    }

    set accountName(value: string) {
        if (this.account) {
            this.account.name = value;
        }
    }
}

export class Meetings extends Collection<Meeting> {
    dashboard: number[] = [];

    constructor() {
        super(Meeting);
    }
}

export class MeetingsSearch extends QueryModel<Meeting> {
    private _dateRangeId = 0;
    private _dateRange: DateRange = new DateRange();
    groupId = 0;
    metadata: Metadata = {
        controls: ['dateRange'],
        ignore: [...['_dateRangeId', '_dateRange', 'today', 'month', 'year', 'query'], ...this.keys]
    };

    get dateRangeId(): number {
        return this._dateRangeId;
    }

    set dateRangeId(value: number) {
        this._dateRangeId = value;
        if (value !== 1) {
            this.setDateRange(value);
        }
    }

    get dateRange(): DateRange {
        return this._dateRange;
    }

    set dateRange(value: DateRange) {
        this._dateRange = value;
        this.dateRangeId = 1;
    }

    get query() {
        return {
            dateRange: this.dateRange,
            dateRangeId: this.dateRangeId,
            groupId: this.groupId
        };
    }

    setDateRange(dateRangeId: number) {
        this._dateRange = DateHelper.BuildDateRange(dateRangeId);
    }
}

export class MeetingRow {

    constructor(public meeting: Meeting, public accountUrl) {
    }

    get agendas(): Agenda[] {
        return this.meeting.agendas;
    }

    get group(): string {
        return this.meeting.groupName;
    }

    get location(): string {
        return this.meeting.location;
    }

    get meetingDate(): Date {
        return this.meeting.date;
    }

    get meetingId(): number {
        return this.meeting.id;
    }

    get meetingLink(): string {
        return `/${this.accountUrl}/meetings/${this.meetingId}`;
    }

    get meetingName(): string {
        return this.meeting.name;
    }

    get startTime(): Date {
        const str = this.meeting.date ? this.meeting.date.toString() : null;
        const date = str ? new Date(`${str.substring(0, str.length - 8)}${this.meeting.startTime}`) : new Date();
        return date;
    }
}

export class MeetingEdit {

    meetingName = '';
    meetingDate: Date = new Date();
    startTimeHour = 0;
    startTimeMinutes = 0;
    startTimeMeridian: 'AM' | 'PM' = 'AM';
    durationHours = 0;
    durationMinutes = 0;
    meetingLocation = '';
    groupId = 0;
    minuteTakerId = 0;
    minuteTakerInput = '';
    minuteTakerSelect = 0;
    attendanceTakerId = 0;
    attendanceTakerInput = '';
    attendanceTakerSelect = 0;
    voteTakerId = 0;
    voteTakerInput = '';
    voteTakerSelect = 0;
    securityStatusId = 0;
    generalInfo = '';
    metadata: Metadata = {
        ignore: ['_meeting', 'id', 'meeting', 'startTime', 'endTime'],
        meetingDate: {
            validators: [Validators.required]
        },
        meetingName: {
            validators: [Validators.required, Validators.maxLength(75)]
        },
        startTimeHour: {
            validators: [Validators.required]
        },
        startTimeMinutes: {
            validators: [Validators.required]
        }
    };

    static Build(meeting: Meeting, props: any = {}): MeetingEdit {
        return Object.assign(new MeetingEdit(meeting), props);
    }

    static BuildMeeting(meeting: Meeting, props: any = {}): Meeting {
        return MeetingEdit.Build(meeting, props).meeting;
    }

    constructor(private _meeting: Meeting = new Meeting()) {
        this.meetingName = this._meeting.name;
        this.meetingDate = new Date(this._meeting.date);
        this.startTimeHour = this._meeting.startHour || 8;
        this.startTimeMinutes = this._meeting.startMinutes;
        this.startTimeMeridian = this._meeting.startMeridian;
        this.durationHours = this._meeting.durationHour || 1;
        this.durationMinutes = this._meeting.durationMinutes;
        this.meetingLocation = this._meeting.location;
        this.groupId = this._meeting.groupId;
        this.minuteTakerId = this._meeting.minuteTakerId;
        this.attendanceTakerId = this._meeting.attendanceTakerId;
        this.voteTakerId = this._meeting.voteTakerId;
        this.securityStatusId = this._meeting.securityStatusId;
        this.generalInfo = this._meeting.generalInfo;
    }

    get meeting(): Meeting {
        return build(Meeting, this._meeting, {
            name: this.meetingName,
            date: this.meetingDate,
            startTime: this.startTime,
            endTime: this.endTime,
            location: this.meetingLocation,
            groupId: this.groupId,
            minuteTakerId: this.minuteTakerId,
            attendanceTakerId: this.attendanceTakerId,
            voteTakerId: this.voteTakerId,
            securityStatusId: this.securityStatusId,
            generalInfo: this.generalInfo
        });
    }

    get id(): number {
        return this.meeting.id;
    }

    get startTime(): Date {
        return DateHelper.BuildStartTime(this.meetingDate, this.startTimeHour, this.startTimeMinutes, this.startTimeMeridian);
    }

    get endTime(): Date {
        return DateHelper.BuildEndTime(this.startTime, this.durationHours, this.durationMinutes);
    }
}
