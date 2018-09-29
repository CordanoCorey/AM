import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'am-email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailPreviewComponent implements OnInit {

  @Input() agendaItems: AgendaItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
