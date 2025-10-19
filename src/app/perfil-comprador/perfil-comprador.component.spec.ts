import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCompradorComponent } from './perfil-comprador.component';

describe('PerfilCompradorComponent', () => {
  let component: PerfilCompradorComponent;
  let fixture: ComponentFixture<PerfilCompradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilCompradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilCompradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
