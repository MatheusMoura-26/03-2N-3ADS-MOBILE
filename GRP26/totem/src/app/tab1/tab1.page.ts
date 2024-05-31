import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  inputNovaSenha: string = '';

  constructor(public senhasService: SenhasService) {}

  gerarSenhaGeral(): void {
    this.inputNovaSenha = this.senhasService.somaGeral();
  }

  gerarSenhaPrior(): void {
    this.inputNovaSenha = this.senhasService.somaPrior();
  }

  gerarSenhaExame(): void {
    this.inputNovaSenha = this.senhasService.somaExame();
  }
}
