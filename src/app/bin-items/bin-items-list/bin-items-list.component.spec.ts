import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinItemsListComponent } from './bin-items-list.component';

describe('BinItemsListComponent', () => {
  let component: BinItemsListComponent;
  let fixture: ComponentFixture<BinItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
