import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingClass } from './star-rating.class';

describe('StarRatingClass', () => {
  let component: StarRatingClass;
  let fixture: ComponentFixture<StarRatingClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRatingClass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarRatingClass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
