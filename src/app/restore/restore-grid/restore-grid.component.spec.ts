import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreGridComponent } from './restore-grid.component';

describe('RestoreGridComponent', () => {
  let component: RestoreGridComponent;
  let fixture: ComponentFixture<RestoreGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoreGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
