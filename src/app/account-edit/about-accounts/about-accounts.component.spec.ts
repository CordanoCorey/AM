import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAccountsComponent } from './about-accounts.component';

describe('AboutAccountsComponent', () => {
  let component: AboutAccountsComponent;
  let fixture: ComponentFixture<AboutAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
