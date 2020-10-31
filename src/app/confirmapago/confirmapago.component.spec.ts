import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmapagoComponent } from './confirmapago.component';

describe('ConfirmapagoComponent', () => {
  let component: ConfirmapagoComponent;
  let fixture: ComponentFixture<ConfirmapagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmapagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmapagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
