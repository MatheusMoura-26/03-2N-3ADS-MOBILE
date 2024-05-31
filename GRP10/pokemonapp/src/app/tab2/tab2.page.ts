import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { PhotoService } from '../services/photo.service';
import { PokemonStorageService } from '../services/pokemon-storage.service';
import { Pokemon } from '../services/pokemon.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  result: string = '';
  color: string = '';
  pokemon: Pokemon | null = null;

  constructor(
    public pokeAPIService: PokeAPIService,
    public photoService: PhotoService,
    private pokemonStorageService: PokemonStorageService
  ) {}

  ngOnInit() {
    this.loadRandomPokemon();
  }

  loadRandomPokemon() {
    this.pokeAPIService.getPokeAPIService().subscribe((data: any) => {
      this.pokemon = data;
      this.pokeAPIService.pokemontab2 = {
        name: data.name,
        front_default: data.sprites.front_default,
        abilities: data.abilities,
        height: data.height,
        weight: data.weight,
        sprites: data.sprites,
        resultHistory: {
          victories: [],
          defeats: [],
          draws: []
        }
      };

      const comparisonResult = this.pokeAPIService.comparePokemons();
      this.color = comparisonResult.color;
      this.result = comparisonResult.result;

      this.capturePokemon(data);
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  capturePokemon(pokemonData: any) {
    const pokemontab2: Pokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      base_experience: pokemonData.base_experience,
      height: pokemonData.height,
      weight: pokemonData.weight,
      abilities: pokemonData.abilities,
      sprites: pokemonData.sprites,
      resultHistory: {
        victories: [],
        defeats: [],
        draws: []
      }
    };

    this.pokemonStorageService.addPokemon(pokemontab2);
  }
}
