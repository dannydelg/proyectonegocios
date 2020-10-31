import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoscategoriaComponent } from './productoscategoria.component';

describe('ProductoscategoriaComponent', () => {
  let component: ProductoscategoriaComponent;
  let fixture: ComponentFixture<ProductoscategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoscategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoscategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
