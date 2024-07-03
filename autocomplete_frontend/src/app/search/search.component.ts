import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filter(value))
    );
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return this.http.get<{ suggestions: string[] }>(`http://localhost:5000/autocomplete?query=${filterValue}`)
      .pipe(
        map(response => response.suggestions)
      );
  }
}

