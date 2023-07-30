import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavoritesComponent } from './list-favorites.component';

describe('ListFavoritesComponent', () => {
  let component: ListFavoritesComponent;
  let fixture: ComponentFixture<ListFavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFavoritesComponent]
    });
    fixture = TestBed.createComponent(ListFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
