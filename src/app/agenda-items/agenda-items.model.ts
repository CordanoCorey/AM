

export class AgendaItem extends BaseEntity {

    static get TreeItem(): TreeItem<AgendaItem> {
        return new TreeItem<AgendaItem>(new AgendaItem());
    }

    agendaId = 0;
    description = '';
    isAcceptingSuggestions = false;
    isPrivate = false;
    isSuggestion = false;
    isVotable = false;
    name = '';
    order = 0;
    parentId = 0;

    agendaItems: AgendaItem[] = [];
    attachments: Attachment[] = [];
    email: EmailItem[] = [];
    minutes: AgendaItemMinutes = new AgendaItemMinutes();
    notes: AgendaItemNotes = new AgendaItemNotes();
    // securityStatus: SecurityStatus = SecurityStatus.DEFAULT;
    votes: Votes = new Votes();

    get hasAttachments(): boolean {
        return this.attachments.length > 0;
    }

    get treeItem(): TreeItem<AgendaItem> {
        return Object.assign(AgendaItem.TreeItem, TreeItem.Build<AgendaItem>(this));
    }
}

export class AgendaItems extends Collection<AgendaItem> {

    static BuildTree(items: AgendaItem[]): Tree<AgendaItem> {
        return Tree.Build(items.map(item => build(AgendaItem, item).treeItem), AgendaItem);
    }

    constructor() {
        super(AgendaItem);
    }

    get tree(): Tree<AgendaItem> {
        return AgendaItems.BuildTree(this.toArray());
    }

    get treeItems(): TreeItem<AgendaItem>[] {
        return this.tree.treeItems;
    }
}

export class AgendaItemEdit {

    attachments = [];
    rejectReason = '';
    metadata: Metadata = {
        ignore: ['_agendaItem', 'agendaItem']
    };

    static Build(agendaItem: AgendaItem, props: any = {}): AgendaItemEdit {
        return Object.assign(new AgendaItemEdit(agendaItem), props);
    }

    static BuildAgendaItem(agendaItem: AgendaItem, props: any = {}): AgendaItem {
        return AgendaItemEdit.Build(agendaItem, props).agendaItem;
    }

    constructor(private _agendaItem: AgendaItem = new AgendaItem()) {
    }

    get agendaItem(): AgendaItem {
        return build(AgendaItem, this._agendaItem, {
            name: this.agendaItemName,
            description: this.description,
            isPrivate: this.isPrivate,
            isVotable: this.isVotable
        });
    }

    get agendaItemName(): string {
        return this._agendaItem.name;
    }

    get description(): string {
        return this._agendaItem.description;
    }

    get isPrivate(): boolean {
        return this._agendaItem.isPrivate;
    }

    get isVotable(): boolean {
        return this._agendaItem.isVotable;
    }
}
