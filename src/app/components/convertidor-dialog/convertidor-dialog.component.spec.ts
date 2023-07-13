import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertidorDialogComponent } from './convertidor-dialog.component';

describe('ConvertidorDialogComponent', () => {
  let component: ConvertidorDialogComponent;
  let fixture: ComponentFixture<ConvertidorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertidorDialogComponent]
    });
    fixture = TestBed.createComponent(ConvertidorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
