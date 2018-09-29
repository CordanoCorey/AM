import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'am-bin-items-list',
  templateUrl: './bin-items-list.component.html',
  styleUrls: ['./bin-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinItemsListComponent {

  @Input() accounts: Account[] = [];
  @Input() activeId = 0;
  @Input() binItem: BinItem = new BinItem();
  @Input() binItems: BinItem[] = [];
  @Output() changeAccount = new EventEmitter<number>();
  @Output() changeBinItem = new EventEmitter<number>();
  @Output() changeOptions = new EventEmitter<BinItemOptions>();

  constructor() { }

  onChangeAccount(id: number) {
    this.changeAccount.emit(id);
  }

  onChangeBinItem(id: number) {
    this.changeBinItem.emit(id);
  }

  onOptionsChange(options: any) {
    this.changeOptions.emit(options);
  }

}
