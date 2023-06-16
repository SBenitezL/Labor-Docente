import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborDocenteListarComponent } from './labor-docente-listar.component';

describe('LaborDocenteListarComponent', () => {
  let component: LaborDocenteListarComponent;
  let fixture: ComponentFixture<LaborDocenteListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborDocenteListarComponent]
    });
    fixture = TestBed.createComponent(LaborDocenteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
