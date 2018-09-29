import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-bin-item-options',
  templateUrl: './bin-item-options.component.html',
  styleUrls: ['./bin-item-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinItemOptionsComponent extends FormComponent implements OnInit {

  @Input() binItem: BinItem = new BinItem();
  @Output() changeOptions = new EventEmitter<BinItemOptions>();
  @ModelControl<BinItemOptions>(new BinItemOptions()) form: FormGroup;
  modelKey = 'binItem';
  modelChanges = ['id'];

  constructor() {
    super();
  }

  get valueIn(): BinItemOptions {
    return new BinItemOptions();
  }

  get valueOut(): BinItemOptions {
    return build(BinItemOptions, { options: this.form.value });
  }

  get valueChanges(): Subscription {
    return this.form.valueChanges.subscribe(options => {
      this.changeOptions.emit(options);
    });
  }

  ngOnInit() {
    this.subscribe([this.valueChanges]);
  }
}
