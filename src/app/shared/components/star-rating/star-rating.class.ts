import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: '.star-rating',
  standalone: true,
  template: `
    <span *ngFor="let star of stars; let i = index">
      <span [class.filled]="i < rating">&#9733;</span>
    </span>
  `,
  styles: [
    `
      .filled {
        color: gold;
      }
    `,
  ],
})
export class StarRatingComponent {
  private _rating = 0;
  private _maxRating = 5;

  @Input('currentRating')
  set rating(val: number) {
    this._rating = val;
  }
  get rating() {
    return this._rating;
  }

  @Input()
  set maxRating(val: number) {
    this._maxRating = Math.max(5, Math.min(val, 10));
  }
  get maxRating() {
    return this._maxRating;
  }

  get stars() {
    return Array(this.maxRating);
  }

  @HostBinding('attr.aria-label')
  get ariaLabel() {
    return `Rating: ${this.rating} out of ${this.maxRating} stars`;
  }
}
