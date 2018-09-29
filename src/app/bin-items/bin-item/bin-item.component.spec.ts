import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinItemComponent } from './bin-item.component';

describe('BinItemComponent', () => {
  let component: BinItemComponent;
  let fixture: ComponentFixture<BinItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
