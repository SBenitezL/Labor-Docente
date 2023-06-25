import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLaborComponent } from './listar-labor.component';

describe('ListarLaborComponent', () => {
  let component: ListarLaborComponent;
  let fixture: ComponentFixture<ListarLaborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarLaborComponent]
    });
    fixture = TestBed.createComponent(ListarLaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
