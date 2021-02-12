import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleErrorAreaComponent } from './collapsible-error-area.component';

describe('CollapsibleErrorAreaComponent', () => {
  let component: CollapsibleErrorAreaComponent;
  let fixture: ComponentFixture<CollapsibleErrorAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollapsibleErrorAreaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleErrorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
