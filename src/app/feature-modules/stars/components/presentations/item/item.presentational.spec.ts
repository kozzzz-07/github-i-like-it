import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPresentationalComponent } from './item.presentational';

describe('ItemPresentationalComponent', () => {
  let component: ItemPresentationalComponent;
  let fixture: ComponentFixture<ItemPresentationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemPresentationalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPresentationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
