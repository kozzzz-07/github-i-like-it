import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubheaderPresenter } from './subheader.presenter';

describe('SubheaderComponent', () => {
  let component: SubheaderPresenter;
  let fixture: ComponentFixture<SubheaderPresenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubheaderPresenter],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubheaderPresenter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
