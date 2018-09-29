import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-agenda-item-preview',
  templateUrl: './agenda-item-preview.component.html',
  styleUrls: ['./agenda-item-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgendaItemPreviewComponent {

  @Input() agendaItem: AgendaItem = new AgendaItem();

  constructor() { }

  get agendaItemDescription(): string {
    return this.agendaItem.description;
  }

  get agendaItemName(): string {
    return this.agendaItem.name;
  }

  get attachments(): Attachment[] {
    return this.agendaItem.attachments;
  }

  get minutes(): AgendaItemMinutes {
    return this.agendaItem.minutes;
  }

  get notes(): AgendaItemNotes {
    return this.agendaItem.notes;
  }

  get votes(): Votes {
    return this.agendaItem.votes;
  }

}
