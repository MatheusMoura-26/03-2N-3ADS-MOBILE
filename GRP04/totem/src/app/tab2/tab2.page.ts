import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  constructor(public senhasService: SenhasService) {}

  chamarProximaSenha(): string | null {
    // Verifique se há senhas na fila
    const filaSG = this.senhasService.senhasArray.SG;
    const filaSP = this.senhasService.senhasArray.SP;
    const filaSE = this.senhasService.senhasArray.SE;
  
    if (filaSG.length > 0) {
      return filaSG.shift() || null; // Remove e retorna a primeira senha da fila SG ou null se não houver
    } else if (filaSP.length > 0) {
      return filaSP.shift() || null; // Remove e retorna a primeira senha da fila SP ou null se não houver
    } else if (filaSE.length > 0) {
      return filaSE.shift() || null; // Remove e retorna a primeira senha da fila SE ou null se não houver
    } else {
      return null; // Se não houver senhas em nenhuma fila, retorne null
    }
  }

  calcularTempoMedioAtendimento(tipo: string) {
    let totalTempoEspera = 0;
    let totalSenhas = 0;

    // Verifica o tipo de senha e seleciona o array correspondente
    let arraySenhas: any[] = [];
    if (tipo === 'Prioritária') {
      arraySenhas = this.senhasService.senhasArray.SP;
    } else if (tipo === 'Geral') {
      arraySenhas = this.senhasService.senhasArray.SG;
    } else if (tipo === 'Exame') {
      arraySenhas = this.senhasService.senhasArray.SE;
    }

    // Calcula o tempo de espera para cada senha e adiciona ao total
    arraySenhas.forEach((senha) => {
      const tempoEntrada = senha.dataEmissao.getTime();
      const tempoAtendimento = senha.dataAtendimento ? senha.dataAtendimento.getTime() : new Date().getTime();
      totalTempoEspera += tempoAtendimento - tempoEntrada;
      totalSenhas++;
    });

    // Calcula o tempo médio de espera
    const tempoMedioEspera = totalSenhas > 0 ? totalTempoEspera / totalSenhas : 0;

    console.log(`Tempo médio de espera para senhas ${tipo}: ${tempoMedioEspera} milissegundos`);
  }

  obterUltimasSenhasChamadas() {
    const ultimasSenhasChamadas: string[] = [];

    // Obtém as últimas senhas chamadas de cada tipo
    const ultimasSP = this.senhasService.senhasArray.SP.slice(-5);
    const ultimasSG = this.senhasService.senhasArray.SG.slice(-5);
    const ultimasSE = this.senhasService.senhasArray.SE.slice(-5);

    // Adiciona as últimas senhas chamadas de cada tipo ao array final
    ultimasSenhasChamadas.push(...ultimasSP, ...ultimasSG, ...ultimasSE);

    // Retorna o array com as últimas senhas chamadas
    return ultimasSenhasChamadas;
  }
}
