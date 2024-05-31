// meu-componente.component.ts

import { Component, OnInit } from '@angular/core';
import { AtendimentoService } from './services/atendimento.service';

// Decorator

@Component({
  selector: 'app-meu-componente',
  templateUrl: './meu-componente.component.html',
  styleUrls: ['./meu-componente.component.css']
})
export class MeuComponenteComponent implements OnInit {

  constructor(private atendimentoService: AtendimentoService) { }

  ngOnInit(): void {
    // Exemplo de uso do serviço
    const senhaPrioritaria = this.atendimentoService.emitirSenha("Prioritária");
    console.log("Nova senha emitida:", senhaPrioritaria);

    const proximaSenhaChamada = this.atendimentoService.chamarProximaSenha();
    console.log("Senha chamada:", proximaSenhaChamada);

    const tempoMedioPrioritaria = this.atendimentoService.calcularTempoMedioAtendimento("Prioritária");
    console.log("Tempo médio de atendimento para senhas prioritárias:", tempoMedioPrioritaria);
  }

}
