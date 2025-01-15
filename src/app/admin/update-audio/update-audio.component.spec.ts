import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAudioComponent } from './update-audio.component';

describe('UpdateAudioComponent', () => {
  let component: UpdateAudioComponent;
  let fixture: ComponentFixture<UpdateAudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAudioComponent]
    });
    fixture = TestBed.createComponent(UpdateAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
