import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Course, ALL_COURSES } from '../../mock-course-data';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  getCourses(): Observable<Course[]> {
    // Simulate API delay
    return of(ALL_COURSES).pipe(delay(500));
  }
}
