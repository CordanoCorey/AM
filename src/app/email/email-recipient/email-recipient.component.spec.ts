import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRecipientComponent } from './email-recipient.component';

describe('EmailRecipientComponent', () => {
  let component: EmailRecipientComponent;
  let fixture: ComponentFixture<EmailRecipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRecipientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
