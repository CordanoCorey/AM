import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinAccountsComponent } from './bin-accounts.component';

describe('BinAccountsComponent', () => {
  let component: BinAccountsComponent;
  let fixture: ComponentFixture<BinAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
