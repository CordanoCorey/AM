import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHelpComponent } from './about-help.component';

describe('AboutHelpComponent', () => {
  let component: AboutHelpComponent;
  let fixture: ComponentFixture<AboutHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
