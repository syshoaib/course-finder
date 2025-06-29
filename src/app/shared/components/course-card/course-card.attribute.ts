import { Component, input } from '@angular/core';
import { Course } from '../../../mock-course-data';

@Component({
  selector: '[app-course-card]',
  standalone: true,
  template: `
    <div class="card">
      <img
        [src]="course().imageUrl"
        [alt]="course().title"
        width="300"
        height="180"
      />
      <h2>{{ course().title }}</h2>
      <p>{{ course().description }}</p>
      <div>{{ course().author }}</div>
      <div>{{ course().level }} | {{ course().language }}</div>
      <div>
        <span>{{ course().rating }}</span>
        <span class="star-rating" [currentRating]="course().rating"></span>
      </div>
      <!-- Extra content slot -->
      <ng-content select="[extra-info]"></ng-content>
    </div>
  `,
})
export class CourseCardComponent {
  course = input.required<Course>();
}
