import { Component } from '@angular/core';
import { CourseSearchComponent } from './pages/course-search/course-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CourseSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'course-finder';
}
