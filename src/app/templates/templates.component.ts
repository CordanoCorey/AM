import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent extends SmartComponent implements OnInit {

  template$: Observable<Template>;
  templates$: Observable<Template[]>;

  constructor(public store: Store<any>) {
    super(store);
    this.template$ = templateSelector(this.store);
    this.templates$ = templatesSelector(this.store).map(templates => templates.toArray());
  }

  get loading(): boolean {
    return false;
  }

  get actions(): DialogAction[] {
    return [
      build(DialogAction, { value: null, label: 'Close' }),
    ];
  }

  get title(): string {
    return 'Template Manager';
  }

  ngOnInit() {
  }

}
