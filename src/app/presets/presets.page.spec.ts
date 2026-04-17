import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresetsPage } from './presets.page';

describe('PresetsPage', () => {
  let component: PresetsPage;
  let fixture: ComponentFixture<PresetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
