import { Component, input } from '@angular/core';
import { Course } from '../../../mock-course-data';

@Component({
  selector: 'app-course-detail-modal',
  standalone: true,
  template: `
    <div class="modal-backdrop">
      <div class="modal-content">
        <button class="close-btn" (click)="onClose()">×</button>
        <img
          [src]="course().imageUrl"
          [alt]="course().title"
          width="300"
          height="180"
        />
        <h2>{{ course().title }}</h2>
        <p>{{ course().description }}</p>
        <div><strong>Author:</strong> {{ course().author }}</div>
        <div><strong>Level:</strong> {{ course().level }}</div>
        <div><strong>Language:</strong> {{ course().language }}</div>
        <div>
          <strong>Technologies:</strong> {{ course().technologies.join(', ') }}
        </div>
        <div><strong>Rating:</strong> {{ course().rating }}</div>
        <div>
          <strong>Duration:</strong> {{ course().durationInMinutes }} min
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .modal-content {
        background: #fff;
        padding: 2rem;
        border-radius: 8px;
        position: relative;
        min-width: 320px;
      }
      .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        background: none;
        border: none;
        cursor: pointer;
      }
    `,
  ],
})
export class CourseDetailModalComponent {
  course = input.required<Course>();
  onClose() {
    // To be handled by parent via ViewContainerRef
  }
}
