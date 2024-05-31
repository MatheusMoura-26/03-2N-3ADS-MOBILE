import { Component, OnInit } from '@angular/core';
import { PokemonStorageService } from '../services/pokemon-storage.service';
import { Pokemon } from '../services/pokemon.model';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  pokemons: Pokemon[] = [];
  result: string = '';
  color: string = '';

  constructor(
    public pokeAPIService: PokeAPIService,
    private pokemonStorageService: PokemonStorageService) { }

  ngOnInit() {
    this.getPokemons();
  
  }

  getPokemons() {
    this.pokemons = this.pokemonStorageService.getPokemons();
  }
}
