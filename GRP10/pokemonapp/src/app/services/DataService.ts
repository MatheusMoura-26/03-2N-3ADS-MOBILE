import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  capturedPokemons: Pokemon[] = [];

  constructor() { }

  getCapturedPokemons(): Observable<Pokemon[]> {
  
    return of(this.capturedPokemons);
  }
}
