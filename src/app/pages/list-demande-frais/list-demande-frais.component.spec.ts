import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeFraisComponent } from './list-demande-frais.component';

describe('ListDemandeFraisComponent', () => {
  let component: ListDemandeFraisComponent;
  let fixture: ComponentFixture<ListDemandeFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemandeFraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandeFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
