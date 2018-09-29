import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeetingsComponent } from './about-meetings.component';

describe('AboutMeetingsComponent', () => {
  let component: AboutMeetingsComponent;
  let fixture: ComponentFixture<AboutMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
