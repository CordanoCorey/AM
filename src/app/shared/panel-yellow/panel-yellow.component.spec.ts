import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelYellowComponent } from './panel-yellow.component';

describe('PanelYellowComponent', () => {
  let component: PanelYellowComponent;
  let fixture: ComponentFixture<PanelYellowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelYellowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelYellowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
