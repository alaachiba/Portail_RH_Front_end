import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemaideFraisComponent } from './list-demaide-frais.component';

describe('ListDemaideFraisComponent', () => {
  let component: ListDemaideFraisComponent;
  let fixture: ComponentFixture<ListDemaideFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemaideFraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemaideFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
