import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { PokemonStorageService } from '../services/pokemon-storage.service';
import { Pokemon } from '../services/pokemon.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  areaBuscarPokemon: string = '';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  }

  constructor(
    public pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private pokemonStorageService: PokemonStorageService
  ) { }

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];
      });

    this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokeAPIService.pokemontab1.name          = JSON.parse(JSON.stringify(value))['name'];
        this.pokeAPIService.pokemontab1.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
        this.pokeAPIService.pokemontab1.abilities     = JSON.parse(JSON.stringify(value))['abilities'];
        this.pokeAPIService.pokemontab1.height        = JSON.parse(JSON.stringify(value))['height'];
        this.pokeAPIService.pokemontab1.weight        = JSON.parse(JSON.stringify(value))['weight'];

      
        this.capturePokemon(value);
      });
  }

  capturePokemon(pokemonData: any) {
    const pokemon: Pokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      base_experience: pokemonData.base_experience,
      height: pokemonData.height,
      weight: pokemonData.weight,
      abilities: pokemonData.abilities,
      sprites: {
        front_default: pokemonData.sprites.front_default,
      },
      resultHistory: {
        victories: [],
        defeats: [],
        draws: []
      }
    };

    this.pokemonStorageService.addPokemon(pokemon);
  }
}
