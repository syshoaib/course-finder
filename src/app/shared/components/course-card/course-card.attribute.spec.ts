import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardAttribute } from './course-card.attribute';

describe('CourseCardAttribute', () => {
  let component: CourseCardAttribute;
  let fixture: ComponentFixture<CourseCardAttribute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardAttribute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCardAttribute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
