import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAgregarComponent } from './usuario-agregar.component';

describe('UsuarioAgregarComponent', () => {
  let component: UsuarioAgregarComponent;
  let fixture: ComponentFixture<UsuarioAgregarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioAgregarComponent]
    });
    fixture = TestBed.createComponent(UsuarioAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
