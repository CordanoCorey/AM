import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutGroupsComponent } from './about-groups.component';

describe('AboutGroupsComponent', () => {
  let component: AboutGroupsComponent;
  let fixture: ComponentFixture<AboutGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
