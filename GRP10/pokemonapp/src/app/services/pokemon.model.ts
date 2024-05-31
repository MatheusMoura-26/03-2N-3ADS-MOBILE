

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: number;
  sprites: Sprites;
  resultHistory: ResultHistory;
}


export interface ResultHistory {
  victories: number[];
  defeats: number[];
  draws: number[];
}

export interface Sprites {
  front_default: string;
}
