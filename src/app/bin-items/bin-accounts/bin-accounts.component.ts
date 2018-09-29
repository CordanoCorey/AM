import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-bin-accounts',
  templateUrl: './bin-accounts.component.html',
  styleUrls: ['./bin-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinAccountsComponent {

  @Input() accounts: Account[] = [];
  @Output() changeAccount = new EventEmitter<number>();
  control: AbstractControl;

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
    this.control = this.fb.control([0]);
    this.control.valueChanges.subscribe(id => {
      // console.log('Account ID:\t', id);
      this.changeAccount.emit(str2int(id.toString()));
    });
  }

}
