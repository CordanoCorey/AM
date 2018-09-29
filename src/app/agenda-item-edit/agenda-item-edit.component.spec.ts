import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaItemEditComponent } from './agenda-item-edit.component';

describe('AgendaItemEditComponent', () => {
  let component: AgendaItemEditComponent;
  let fixture: ComponentFixture<AgendaItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
