import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborDocenteComponent } from './labor-docente.component';

describe('LaborDocenteComponent', () => {
  let component: LaborDocenteComponent;
  let fixture: ComponentFixture<LaborDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaborDocenteComponent]
    });
    fixture = TestBed.createComponent(LaborDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
