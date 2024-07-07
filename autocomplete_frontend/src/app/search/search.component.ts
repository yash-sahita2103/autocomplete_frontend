import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myControl = new FormControl(); // FormControl for the input field
  filteredOptions: Observable<string[]> | undefined; // Observable for filtered autocomplete options

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Initialize filteredOptions with valueChanges stream from myControl
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), // Start with an empty string
      switchMap(value => {
        if (value.trim().length === 0) {
          return of([]); // Return an empty observable if query is blank
        }
        return this._filter(value); // Otherwise, filter the options based on the query
      })
    );
  }

  // Private method to filter autocomplete options based on the query
  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase().trim(); // Convert query to lowercase and trim whitespace
    // Send HTTP GET request to backend API for autocomplete suggestions
    return this.http.get<string[]>(`http://localhost:5000/autocomplete?query=${filterValue}`)
      .pipe(
        map(response => {
          if (response.length === 0) {
            return ['No suggestions found']; // Return 'No suggestions found' if response is empty
          }
          return response; // Otherwise, return the autocomplete suggestions from the backend
        }),
        catchError(() => {
          return of(['No suggestions found']); // Handle errors by returning 'No suggestions found'
        })
      );
  }
}
