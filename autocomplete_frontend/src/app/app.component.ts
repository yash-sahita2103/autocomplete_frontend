import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'autocomplete_frontend';

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three']; // Replace with your options
  filteredOptions: Observable<string[]> | undefined;
  selectedSuggestion: string | null = null;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onOptionSelected(event: any) {
    this.selectedSuggestion = event.option.value;
  }
}
