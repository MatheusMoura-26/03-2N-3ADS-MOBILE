import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public senhasService: SenhasService) {}

  chamarSenha(): void {
    const senhaChamada = this.senhasService.chamarSenha();
    if (senhaChamada) {
      console.log(`Senha chamada: ${senhaChamada}`);
    } else {
      console.log('Não há senhas para chamar.');
    }
  }
}
