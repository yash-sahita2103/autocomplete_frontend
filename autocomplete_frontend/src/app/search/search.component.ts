import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      filter(value => value.trim().length > 0), // Filter out empty queries
      switchMap(value => this._filter(value))
    );
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase().trim();
    if (filterValue.length === 0) {
      return of([]); // Return an empty observable if query is empty
    }

    return this.http.get<string[]>(`http://localhost:5000/autocomplete?query=${filterValue}`)
      .pipe(
        map(response => {
          if (response.length === 0) {
            return ['No suggestions found'];
          }
          return response;
        }),
        catchError(() => {
          return of(['No suggestions found']);
        })
      );
  }
}
