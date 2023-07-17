import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertidorDialogMusicComponent } from './convertidor-dialog-music.component';

describe('ConvertidorDialogMusicComponent', () => {
  let component: ConvertidorDialogMusicComponent;
  let fixture: ComponentFixture<ConvertidorDialogMusicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConvertidorDialogMusicComponent]
    });
    fixture = TestBed.createComponent(ConvertidorDialogMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
