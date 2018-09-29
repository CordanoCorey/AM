import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaItemsComponent } from './agenda-items.component';

describe('AgendaItemsComponent', () => {
  let component: AgendaItemsComponent;
  let fixture: ComponentFixture<AgendaItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
