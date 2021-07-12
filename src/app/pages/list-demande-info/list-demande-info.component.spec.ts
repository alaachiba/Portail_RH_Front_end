import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeInfoComponent } from './list-demande-info.component';

describe('ListDemandeInfoComponent', () => {
  let component: ListDemandeInfoComponent;
  let fixture: ComponentFixture<ListDemandeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemandeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
