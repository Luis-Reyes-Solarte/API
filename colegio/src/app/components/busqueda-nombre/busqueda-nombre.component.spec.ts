import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaNombreComponent } from './busqueda-nombre.component';

describe('BusquedaNombreComponent', () => {
  let component: BusquedaNombreComponent;
  let fixture: ComponentFixture<BusquedaNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaNombreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
