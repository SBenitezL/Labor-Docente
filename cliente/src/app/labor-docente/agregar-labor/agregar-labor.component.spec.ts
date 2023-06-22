import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLaborComponent } from './agregar-labor.component';

describe('AgregarLaborComponent', () => {
  let component: AgregarLaborComponent;
  let fixture: ComponentFixture<AgregarLaborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarLaborComponent]
    });
    fixture = TestBed.createComponent(AgregarLaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
