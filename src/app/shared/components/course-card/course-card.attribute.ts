import { Component, input } from '@angular/core';
import { Course } from '../../../mock-course-data';
import { StarRatingComponent } from '../star-rating/star-rating.class';

@Component({
  selector: '[app-course-card]',
  standalone: true,
  imports: [StarRatingComponent],
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
        <star-rating [currentRating]="course().rating"></star-rating>
      </div>
      <!-- Extra content slot -->
      <ng-content select="[extra-info]"></ng-content>
    </div>
  `,
})
export class CourseCardComponent {
  course = input.required<Course>();
}
