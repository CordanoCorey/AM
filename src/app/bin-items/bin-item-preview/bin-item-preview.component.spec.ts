import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinItemPreviewComponent } from './bin-item-preview.component';

describe('BinItemPreviewComponent', () => {
  let component: BinItemPreviewComponent;
  let fixture: ComponentFixture<BinItemPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinItemPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
