import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfacturaComponent } from './addfactura.component';

describe('AddfacturaComponent', () => {
  let component: AddfacturaComponent;
  let fixture: ComponentFixture<AddfacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
