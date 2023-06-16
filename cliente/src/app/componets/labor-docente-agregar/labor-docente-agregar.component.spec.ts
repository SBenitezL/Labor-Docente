import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborDocenteAgregarComponent } from './labor-docente-agregar.component';

describe('LaborDocenteAgregarComponent', () => {
  let component: LaborDocenteAgregarComponent;
  let fixture: ComponentFixture<LaborDocenteAgregarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborDocenteAgregarComponent]
    });
    fixture = TestBed.createComponent(LaborDocenteAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
