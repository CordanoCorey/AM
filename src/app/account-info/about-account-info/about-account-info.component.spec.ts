import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAccountInfoComponent } from './about-account-info.component';

describe('AboutAccountInfoComponent', () => {
  let component: AboutAccountInfoComponent;
  let fixture: ComponentFixture<AboutAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutAccountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
