import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  standalone: true,
  template: `
    <input
      type="text"
      placeholder="Search courses..."
      (input)="onInput($event)"
    />
  `,
})
export class SearchInputComponent {
  @Output() searchChange = new EventEmitter<string>();
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
}
