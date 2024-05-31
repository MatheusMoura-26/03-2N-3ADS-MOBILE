import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputNovaSenha: string = '';
  tipoSenhaSelecionada: string = ''; 
  ultimasSenhas: string[] = [];

  constructor(public senhasService: SenhasService) {
    this.atualizarUltimasSenhas();
  }

  gerarSenha(tipo: string) {
    this.senhasService.novaSenha(tipo);
    this.inputNovaSenha = this.senhasService.inputNovaSenha;
    this.tipoSenhaSelecionada = tipo;

    this.atualizarUltimasSenhas();
  }

  atualizarUltimasSenhas() {
    const senhasSP = this.senhasService.senhasArray['SP'];
    const senhasSG = this.senhasService.senhasArray['SG'];
    const senhasSE = this.senhasService.senhasArray['SE'];

    this.ultimasSenhas = [
      ...senhasSP.slice(-1),
      ...senhasSG.slice(-2),
      ...senhasSE.slice(-2)
    ];
  }
}
