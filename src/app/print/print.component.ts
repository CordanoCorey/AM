import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent extends SmartComponent implements OnInit {

  constructor(public store: Store<any>, private http: HttpService) {
    super(store);
  }

  get actions(): DialogAction[] {
    return [
      build(DialogAction, { value: null, label: 'Close' }),
    ];
  }

  get title(): string {
    return 'Print';
  }

  ngOnInit() {
  }

  getPdf(doc: PdfDoc) {
    this.http.post(`print/pdf`, doc);
  }

  getWordDoc(doc: WordDoc) {
    this.http.post(`print/word`, doc);
  }

}
