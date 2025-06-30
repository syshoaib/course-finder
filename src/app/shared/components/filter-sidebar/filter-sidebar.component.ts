import { Component } from '@angular/core';
import { output } from '@angular/core';
import { FilterState } from '../../../pages/course-search/course-search.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="filter-form">
      <h3>Authors</h3>
      <div *ngFor="let author of authors">
        <label>
          <input
            type="checkbox"
            [(ngModel)]="selected.authors[author]"
            name="author-{{ author }}"
            (change)="emitFilters()"
          />
          {{ author }}
        </label>
      </div>

      <h3>Technologies</h3>
      <div *ngFor="let tech of technologies">
        <label>
          <input
            type="checkbox"
            [(ngModel)]="selected.technologies[tech]"
            name="tech-{{ tech }}"
            (change)="emitFilters()"
          />
          {{ tech }}
        </label>
      </div>

      <h3>Ratings</h3>
      <div *ngFor="let rating of ratings">
        <label>
          <input
            type="checkbox"
            [(ngModel)]="selected.ratings[rating]"
            name="rating-{{ rating }}"
            (change)="emitFilters()"
          />
          {{ rating }}+
        </label>
      </div>

      <h3>Levels</h3>
      <div *ngFor="let level of levels">
        <label>
          <input
            type="checkbox"
            [(ngModel)]="selected.levels[level]"
            name="level-{{ level }}"
            (change)="emitFilters()"
          />
          {{ level }}
        </label>
      </div>

      <h3>Languages</h3>
      <div *ngFor="let lang of languages">
        <label>
          <input
            type="checkbox"
            [(ngModel)]="selected.languages[lang]"
            name="lang-{{ lang }}"
            (change)="emitFilters()"
          />
          {{ lang }}
        </label>
      </div>
    </form>
  `,
  styles: [
    `
      .filter-form {
        padding: 1rem;
      }
      h3 {
        margin-top: 1rem;
      }
    `,
  ],
})
export class FilterSidebarComponent {
  filtersChanged = output<FilterState>();

  // Example static options; you can make these dynamic if you wish
  authors = ['Jane Doe', 'John Smith', 'Carlos Ruiz', 'Anna Müller'];
  technologies = [
    'Angular',
    'React',
    'Vue',
    'TypeScript',
    'Node.js',
    'Redux',
    'Jasmine',
    'RxJS',
    'JavaScript',
    'Jest',
  ];
  ratings = [4.5, 4.0];
  levels = ['Beginner', 'Intermediate', 'Advanced'];
  languages = ['English', 'Spanish', 'German'];

  selected = {
    authors: {} as Record<string, boolean>,
    technologies: {} as Record<string, boolean>,
    ratings: {} as Record<string, boolean>,
    levels: {} as Record<string, boolean>,
    languages: {} as Record<string, boolean>,
  };

  emitFilters() {
    const filters: FilterState = {
      authors: Object.keys(this.selected.authors).filter(
        (a) => this.selected.authors[a]
      ),
      technologies: Object.keys(this.selected.technologies).filter(
        (t) => this.selected.technologies[t]
      ),
      ratings: Object.keys(this.selected.ratings)
        .filter((r) => this.selected.ratings[r])
        .map((r) => Number(r)),
      levels: Object.keys(this.selected.levels).filter(
        (l) => this.selected.levels[l]
      ) as ('Beginner' | 'Intermediate' | 'Advanced')[],
      languages: Object.keys(this.selected.languages).filter(
        (l) => this.selected.languages[l]
      ),
    };
    this.filtersChanged.emit(filters);
  }
}
