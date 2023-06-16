import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborDocenteEditarComponent } from './labor-docente-editar.component';

describe('LaborDocenteEditarComponent', () => {
  let component: LaborDocenteEditarComponent;
  let fixture: ComponentFixture<LaborDocenteEditarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborDocenteEditarComponent]
    });
    fixture = TestBed.createComponent(LaborDocenteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
