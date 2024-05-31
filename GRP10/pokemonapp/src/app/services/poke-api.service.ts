import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  public pokemontab1: any = {
    name: '',
    front_default: '',
    abilities: '',
    height: 0,
    weight: 0,
    sprites: '',
    resultHistory: {
      victories: [],
      defeats: [],
      draws: []
    }
  };

  public pokemontab2: any = {
    name: '',
    front_default: '',
    abilities: '',
    height: 0,
    weight: 0,
    sprites: '',
    resultHistory: {
      victories: [],
      defeats: [],
      draws: []
    }
  };

  constructor(private httpClient: HttpClient) { }

  getPokeAPIService(id: number = Math.floor(Math.random() * 100)) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  comparePokemons() {
    const abilities1 = this.pokemontab1.abilities;
    const abilities2 = this.pokemontab2.abilities;
  
 
    
    if (String(abilities1) === String(abilities2)) {
      this.pokemontab2.resultHistory.draws.push('draw');
      this.pokemontab1.resultHistory.draws.push('draw');
      return { color: 'yellow', result: 'Empate' };
  }
   else if (abilities1 < abilities2) {
      this.pokemontab2.resultHistory.victories.push('victory');
      this.pokemontab1.resultHistory.defeats.push('defeat');
      return { color: 'green', result: 'Ganhou' };
    } else {
      this.pokemontab2.resultHistory.defeats.push('defeat');
      this.pokemontab1.resultHistory.victories.push('victory');
      return { color: 'red', result: 'Perdeu' };
    }
  }
}
