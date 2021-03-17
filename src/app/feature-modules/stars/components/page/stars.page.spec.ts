import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsPageComponent } from './stars.page';

describe('StarsPageComponent', () => {
  let component: StarsPageComponent;
  let fixture: ComponentFixture<StarsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
