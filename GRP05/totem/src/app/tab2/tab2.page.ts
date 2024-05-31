import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  ultimasSenhasChamadas: string[] = [];

  constructor(public senhasService: SenhasService) {
    // Inicialmente, carrega as últimas 5 senhas chamadas
    this.atualizarUltimasSenhasChamadas();
  }

  chamarProximaSenha() {
    // Chama a próxima senha e atualiza as últimas senhas chamadas
    this.senhasService.chamarProximaSenha();
    this.atualizarUltimasSenhasChamadas();
  }

  // Atualiza a lista de últimas senhas chamadas
  atualizarUltimasSenhasChamadas() {
    // Obtém as últimas 5 senhas chamadas do serviço SenhasService
    this.ultimasSenhasChamadas = this.senhasService.senhasChamadas.slice(-5);
  }
}
