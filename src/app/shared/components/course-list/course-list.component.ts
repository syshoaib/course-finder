import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../mock-course-data';
import { CourseCardComponent } from '../course-card/course-card.attribute';
import { StarRatingComponent } from '../star-rating/star-rating.class';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCardComponent, StarRatingComponent],
  template: `
    <div
      class="course-list"
      [style.display]="'grid'"
      [style.gridTemplateColumns]="'repeat(' + columns() + ', 1fr)'"
    >
      @for (course of courses; track course.id; let i = $index) {
      <div app-course-card [course]="course">
        <button extra-info (click)="showDetails(course)">View Details</button>
      </div>
      } @empty {
      <div>No Courses Found</div>
      }
    </div>
  `,
  styles: [
    `
      .course-list {
        gap: 1rem;
      }
    `,
  ],
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Output() viewDetails = new EventEmitter<Course>();

  columns() {
    return Math.max(1, Math.min(3, this.courses.length));
  }

  showDetails(course: Course) {
    this.viewDetails.emit(course);
    // To be implemented: emit event or call parent handler
    alert(`Show details for: ${course.title}`);
  }
}
