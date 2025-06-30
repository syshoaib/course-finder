import {
  signal,
  computed,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { OnInit } from '@angular/core';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../mock-course-data';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';
import { CourseListComponent } from '../../shared/components/course-list/course-list.component';
import { CourseDetailModalComponent } from '../../shared/components/course-detail-modal/course-detail-modal.component';

export interface FilterState {
  authors: string[];
  technologies: string[];
  ratings: number[];
  levels: ('Beginner' | 'Intermediate' | 'Advanced')[];
  languages: string[];
}

@Component({
  selector: 'app-course-search',
  imports: [SearchInputComponent, FilterSidebarComponent, CourseListComponent],
  templateUrl: './course-search.component.html',
  styleUrl: './course-search.component.scss',
})
export class CourseSearchComponent implements OnInit {
  // Master list of courses
  courses = signal<Course[]>([]);
  // User input signals
  searchTerm = signal<string>('');
  sortBy = signal<'rating' | 'duration' | 'title'>('title');
  activeFilters = signal<FilterState>({
    authors: [],
    technologies: [],
    ratings: [],
    levels: [],
    languages: [],
  });

  // Computed signal for filtered and sorted courses
  filteredCourses = computed(() => {
    let filtered = this.courses();

    // Filter by search term
    const search = this.searchTerm().toLowerCase();
    if (search) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(search)
      );
    }

    // Filter by authors
    if (this.activeFilters().authors.length) {
      filtered = filtered.filter((course) =>
        this.activeFilters().authors.includes(course.author)
      );
    }

    // Filter by technologies
    if (this.activeFilters().technologies.length) {
      filtered = filtered.filter((course) =>
        course.technologies.some((tech) =>
          this.activeFilters().technologies.includes(tech)
        )
      );
    }

    // Filter by ratings
    if (this.activeFilters().ratings.length) {
      filtered = filtered.filter((course) =>
        this.activeFilters().ratings.some((rating) => course.rating >= rating)
      );
    }

    // Filter by levels
    if (this.activeFilters().levels.length) {
      filtered = filtered.filter((course) =>
        this.activeFilters().levels.includes(course.level)
      );
    }

    // Filter by languages
    if (this.activeFilters().languages.length) {
      filtered = filtered.filter((course) =>
        this.activeFilters().languages.includes(course.language)
      );
    }

    // Sorting
    switch (this.sortBy()) {
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered = [...filtered].sort(
          (a, b) => a.durationInMinutes - b.durationInMinutes
        );
        break;
      case 'title':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  });

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses.set(courses);
    });
  }

  @ViewChild('modalHost', { read: ViewContainerRef })
  modalHost!: ViewContainerRef;

  showDetails(course: Course) {
    this.modalHost.clear();
    const componentRef = this.modalHost.createComponent(
      CourseDetailModalComponent
    );
    const selectedCourse = course;
    componentRef.setInput('course', selectedCourse);
    componentRef.location.nativeElement
      .querySelector('.close-btn')
      .addEventListener('click', () => this.modalHost.clear());
  }
}
