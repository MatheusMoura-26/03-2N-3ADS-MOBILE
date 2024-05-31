// src/app/services/pokemon-storage.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonStorageService {

  private pokemonsSubject: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);
  public pokemons$: Observable<Pokemon[]> = this.pokemonsSubject.asObservable();

  constructor() { }

  addPokemon(pokemon: Pokemon) {
    const currentPokemons = this.pokemonsSubject.value;
    if (pokemon.resultHistory) {
      pokemon.resultHistory = {
        victories: [],
        defeats: [],
        draws: []
      };
    }
    this.pokemonsSubject.next([...currentPokemons, pokemon]);
  }

  updatePokemon(pokemon: Pokemon) {
    const currentPokemons = this.pokemonsSubject.value;
    const index = currentPokemons.findIndex(p => p.id === pokemon.id);
    if (index !== -1) {
      currentPokemons[index] = pokemon;
      this.pokemonsSubject.next([...currentPokemons]);
    }
  }

  getPokemons(): Pokemon[] {
    return this.pokemonsSubject.value;
  }
}
