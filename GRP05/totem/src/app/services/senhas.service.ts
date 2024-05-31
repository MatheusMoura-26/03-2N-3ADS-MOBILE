import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SenhasService {

  private horaInicioExpediente: number = 7; // 7:00 da manhã
  private horaFimExpediente: number = 17;   // 5:00 da tarde

  // Declaração das propriedades para as senhas e contadores
  public senhasArray: any = { SG: [], SP: [], SE: [] };
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public senhasChamadas: string[] = [];

  constructor() {}

  // Método para gerar uma nova senha
  novaSenha(tipoSenha: string) {
    let novaSenha: string = '';
    const horaAtual = new Date().getHours();
    if (horaAtual < this.horaInicioExpediente || horaAtual >= this.horaFimExpediente) {
      console.log('Fora do horário de expediente. Não é possível emitir senhas.');
      return;}

    // Lógica para gerar a nova senha
    const data = new Date();
    const ano = String(data.getFullYear()).substring(2);
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);

    switch (tipoSenha) {
      case 'SG':
        this.senhasGeral++;
        novaSenha = `${ano}${mes}${dia}-SG${this.senhasGeral.toString().padStart(2, '0')}`;
        this.senhasArray.SG.push(novaSenha);
        break;
      case 'SP':
        this.senhasPrior++;
        novaSenha = `${ano}${mes}${dia}-SP${this.senhasPrior.toString().padStart(2, '0')}`;
        this.senhasArray.SP.push(novaSenha);
        break;
      case 'SE':
        this.senhasExame++;
        novaSenha = `${ano}${mes}${dia}-SE${this.senhasExame.toString().padStart(2, '0')}`;
        this.senhasArray.SE.push(novaSenha);
        break;
    }

    this.senhasTotal++;
    
    // Retorna a nova senha gerada
    return novaSenha;
  }

  chamarProximaSenha() {
 // Verifica se está dentro do horário de expediente
    const horaAtual = new Date().getHours();
    if (horaAtual < this.horaInicioExpediente || horaAtual >= this.horaFimExpediente) {
      console.log('Fora do horário de expediente. Não é possível chamar senhas.');
      return;
    } 
    // Método para chamar a próxima senha na ordem especificada
    let senhaChamada: string = '';

    if (this.senhasArray.SP.length > 0) {
      senhaChamada = this.senhasArray.SP.shift();
    } else if (this.senhasArray.SE.length > 0) {
      senhaChamada = this.senhasArray.SE.shift();
    } else if (this.senhasArray.SG.length > 0) {
      senhaChamada = this.senhasArray.SG.shift();
    }

    if (senhaChamada) {
      this.senhasChamadas.push(senhaChamada);
    }

    return senhaChamada;
  }
}
