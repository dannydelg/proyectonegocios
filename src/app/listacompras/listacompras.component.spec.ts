import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacomprasComponent } from './listacompras.component';

describe('ListacomprasComponent', () => {
  let component: ListacomprasComponent;
  let fixture: ComponentFixture<ListacomprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListacomprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
