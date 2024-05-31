import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  chamarProximaSenha() {
    throw new Error('Method not implemented.');
  }
  public senhasArray: { SG: string[], SP: string[], SE: string[] } = { SG: [], SP: [], SE: [] };
  public inputNovaSenha: string = '';

  novaSenha(tipoSenha: string = ''): void {
    if (tipoSenha == 'SG') {
      this.somaGeral();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SG'].length + 1).toString().padStart(2, '0');
      this.senhasArray.SG.push(this.inputNovaSenha);
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SP'].length + 1).toString().padStart(2, '0');
      this.senhasArray.SP.push(this.inputNovaSenha);
    } else if (tipoSenha == 'SE') {
      this.somaExame();
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        new Date().getMonth().toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray['SE'].length + 1).toString().padStart(2, '0');
      this.senhasArray.SE.push(this.inputNovaSenha);
    }
    console.log(this.senhasArray);
  }

  NovaSenha(tipoSenha: string = ''): void {
    // Verifica se o tipo de senha é válido
    if (tipoSenha === 'SG' || tipoSenha === 'SP' || tipoSenha === 'SE') {
      // Chama a função para gerar a senha e fazer a contagem
      this.gerarSenhaETipo(tipoSenha);
    } else {
      console.error('Tipo de senha inválido:', tipoSenha);
    }
    console.log(this.senhasArray);
  }
  
  private gerarSenhaETipo(tipoSenha: 'SG' | 'SP' | 'SE') {
    // Lógica para gerar a nova senha
    this.somaTipo(tipoSenha);
    this.inputNovaSenha =
      new Date().getFullYear().toString().substring(2, 4) +
      new Date().getMonth().toString().padStart(2, '0') +
      new Date().getDate().toString().padStart(2, '0') +
      '-' +
      tipoSenha +
      (this.senhasArray[tipoSenha].length + 1).toString().padStart(2, '0');
    this.senhasArray[tipoSenha].push(this.inputNovaSenha);
  }
  
  private somaTipo(tipo: 'SG' | 'SP' | 'SE') {
    switch (tipo) {
      case 'SG':
        this.senhasGeral++;
        break;
      case 'SP':
        this.senhasPrior++;
        break;
      case 'SE':
        this.senhasExame++;
        break;
      default:
        break;
    }
    this.senhasTotal++;
  }

  chamarproximaSenha(): void {
    // Verifica se há senhas na fila
    if (this.senhasArray.SP.length > 0) {
      // Se houver senhas prioritárias, chama a próxima senha prioritária
      const proximaSenha = this.senhasArray.SP.shift();
      console.log('Chamando próxima senha prioritária:', proximaSenha);
    } else if (this.senhasArray.SE.length > 0) {
      // Se não houver senhas prioritárias, mas houver senhas de exame, chama a próxima senha de exame
      const proximaSenha = this.senhasArray.SE.shift();
      console.log('Chamando próxima senha de exame:', proximaSenha);
    } else if (this.senhasArray.SG.length > 0) {
      // Se não houver senhas prioritárias nem de exame, chama a próxima senha geral
      const proximaSenha = this.senhasArray.SG.shift();
      console.log('Chamando próxima senha geral:', proximaSenha);
    } else {
      // Se não houver nenhuma senha na fila, exibe uma mensagem de aviso
      console.log('Não há mais senhas na fila.');
    }
  }

  obterUltimasSenhasChamadas(): string[] {
    // Verifica se há senhas chamadas
    if (this.senhasArray.SP.length === 0 && this.senhasArray.SE.length === 0 && this.senhasArray.SG.length === 0) {
      return []; // Retorna um array vazio se não houver senhas chamadas
    }
    
    // Concatena todas as senhas chamadas em um único array
    const senhasChamadas = [...this.senhasArray.SP, ...this.senhasArray.SE, ...this.senhasArray.SG];
    
    // Retorna as últimas 5 senhas chamadas
    return senhasChamadas.slice(-5);
  }

  calcularTempoMedioAtendimento(tipo: string): number {
    if (tipo === 'Prioritária') {
      return this.tempoMedioPrioritaria;
    } else if (tipo === 'Geral') {
      return this.tempoMedioGeral;
    } else {
      return 0; // Caso o tipo de senha seja inválido, retorne 0
    }
  }
  
  
  

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public tempoMedioPrioritaria: number = 15; 
  public tempoMedioGeral: number = 5; 

  somaGeral() { this.senhasGeral++; this.senhasTotal++; }
  somaPrior() { this.senhasPrior++; this.senhasTotal++; }
  somaExame() { this.senhasExame++; this.senhasTotal++; }
  constructor() { }
}
