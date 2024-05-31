import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  quantidadeSenhasChamadas: number = 0;

  constructor(public senhasService: SenhasService) {}

  // Atualiza a quantidade de senhas chamadas
  atualizarQuantidadeSenhasChamadas() {
    this.quantidadeSenhasChamadas = this.senhasService.senhasChamadas.length;
  }

  ionViewWillEnter() {
    // Atualiza a quantidade de senhas chamadas sempre que a página for exibida
    this.atualizarQuantidadeSenhasChamadas();
  }
}
