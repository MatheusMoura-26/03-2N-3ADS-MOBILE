// atendimento.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  private senhas: any[] = []; // Armazena as senhas na fila
  private senhasAtendidas: any[] = []; // Armazena as senhas já atendidas

  constructor() { }

  // Função para emitir uma nova senha
  emitirSenha(tipo: string) {
    // Lógica para gerar uma nova senha e retorná-la
    const novaSenha = {
      numero: this.senhas.length + 1,
      tipo: tipo,
      dataEmissao: new Date(),
      dataAtendimento: null,
      guicheAtendimento: null
    };
    this.senhas.push(novaSenha);
    return novaSenha;
  }

  // Função para chamar a próxima senha na fila
  chamarProximaSenha() {
    // Verifica se há senhas na fila
    if (this.senhas.length === 0) {
      return null; // Não há senhas na fila
    }

    // Remove a próxima senha da fila e registra o tempo de atendimento
    const proximaSenha = this.senhas.shift();
    proximaSenha.dataAtendimento = new Date();
    proximaSenha.guicheAtendimento = Math.floor(Math.random() * 5) + 1; // Simula um guichê aleatório
    this.senhasAtendidas.push(proximaSenha);
    return proximaSenha;
  }

  // Função para calcular o tempo médio de atendimento para um determinado tipo de senha
  calcularTempoMedioAtendimento(tipo: string) {
    // Filtra as senhas atendidas pelo tipo especificado
    const senhasDoTipo = this.senhasAtendidas.filter(senha => senha.tipo === tipo);

    // Calcula o tempo médio de atendimento
    const totalTempo = senhasDoTipo.reduce((acc, senha) => {
      return acc + (senha.dataAtendimento - senha.dataEmissao);
    }, 0);
    return senhasDoTipo.length > 0 ? totalTempo / senhasDoTipo.length : 0;
  }

  // Função para acionar o totem e obter uma senha
  obterSenha(tipo: string) {
    // Chama a função do Agente Sistema para emitir uma senha
    return this.emitirSenha(tipo);
  }

  // Função para obter as últimas 5 senhas chamadas
  obterUltimasSenhasChamadas() {
    return this.senhasAtendidas.slice(-5);
  }

}
