import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinItemsDropdownComponent } from './bin-items-dropdown.component';

describe('BinItemsDropdownComponent', () => {
  let component: BinItemsDropdownComponent;
  let fixture: ComponentFixture<BinItemsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinItemsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinItemsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
