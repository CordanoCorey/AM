import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsGridComponent } from './meetings-grid.component';

describe('MeetingsGridComponent', () => {
  let component: MeetingsGridComponent;
  let fixture: ComponentFixture<MeetingsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
