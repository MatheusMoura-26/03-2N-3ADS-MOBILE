import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  constructor() { }

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;

  somaGeral() {this.senhasGeral++; this.senhasTotal++;}
  somaPrior() {this.senhasPrior++; this.senhasTotal++;}
  somaExame() {this.senhasExame++; this.senhasTotal++;}

  senhas = [
    {
      icon: 'accessibility',
      color: 'primary',
      senha: '240401-SP01',
      tm_geracao: '2024-04-01 19:10:09',
    },
    {
      icon: 'document',
      color: 'medium',
      senha: '240401-SE01',
      tm_geracao: '2024-04-01 19:20:09',
    },
    {
      icon: 'accessibility',
      color: 'primary',
      senha: '240401-SP02',
      tm_geracao: '2024-04-01 19:30:09',
    },
    {
      icon: 'bandage',
      color: 'dark',
      senha: '240401-SG01',
      tm_geracao: '2024-04-01 19:40:09',
    },
  ];

  chamarSenha() {
    //
  }
  
}
