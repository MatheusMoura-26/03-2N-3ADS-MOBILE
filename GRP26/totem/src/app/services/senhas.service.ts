

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;

  public senhas: { icon: string, color: string, senha: string, tm_geracao: string }[] = [];
  public senhasChamadas: string[] = [];

  constructor() { }

  somaGeral(): string {
    this.senhasGeral++;
    this.senhasTotal++;
    return this.gerarSenha('SG');
  }

  somaPrior(): string {
    this.senhasPrior++;
    this.senhasTotal++;
    return this.gerarSenha('SP');
  }

  somaExame(): string {
    this.senhasExame++;
    this.senhasTotal++;
    return this.gerarSenha('SE');
  }

  chamarSenha(): string | null {
    if (this.senhas.length === 0) {
      return null;
    }
    const senhaChamada = this.senhas[0].senha;
    this.senhasChamadas.unshift(senhaChamada); 
    this.senhas.splice(0, 1);
    return senhaChamada;
  }

  private gerarSenha(tipo: string): string {
    const numeroSenha = this.senhasTotal.toString().padStart(2, '0');
    const data = new Date().toLocaleDateString('pt-BR').split('/').join('');
    const senha = `${data}-${tipo}${numeroSenha}`;
    this.senhas.push({
      icon: this.getIconByTipo(tipo),
      color: this.getColorByTipo(tipo),
      senha: senha,
      tm_geracao: new Date().toISOString(),
    });
    return senha;
  }

  private getIconByTipo(tipo: string): string {
    switch (tipo) {
      case 'SG':
        return 'bandage';
      case 'SP':
        return 'star';
      case 'SE':
        return 'document';
      default:
        return 'help';
    }
  }

  private getColorByTipo(tipo: string): string {
    switch (tipo) {
      case 'SG':
        return 'dark';
      case 'SP':
        return 'primary';
      case 'SE':
        return 'medium';
      default:
        return 'medium';
    }
  }
}
