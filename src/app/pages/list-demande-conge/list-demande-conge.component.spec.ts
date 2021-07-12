import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeCongeComponent } from './list-demande-conge.component';

describe('ListDemandeCongeComponent', () => {
  let component: ListDemandeCongeComponent;
  let fixture: ComponentFixture<ListDemandeCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemandeCongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
