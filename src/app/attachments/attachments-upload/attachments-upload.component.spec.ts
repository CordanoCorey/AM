import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsUploadComponent } from './attachments-upload.component';

describe('AttachmentsUploadComponent', () => {
  let component: AttachmentsUploadComponent;
  let fixture: ComponentFixture<AttachmentsUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentsUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
