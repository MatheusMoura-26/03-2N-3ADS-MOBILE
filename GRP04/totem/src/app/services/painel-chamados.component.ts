// painel-chamados.component.ts
import { Component } from '@angular/core';
import { FilaService } from './fila.service';

@Component({
  selector: 'app-painel-chamados',
  templateUrl: './painel-chamados.component.html',
  styleUrls: ['./painel-chamados.component.css']
})
export class PainelChamadosComponent {
  ultimaSenhaChamada: string | undefined;

  constructor(private filaService: FilaService) {}

  chamarProximaSenha() {
    this.ultimaSenhaChamada = this.filaService.chamarProximaSenha();
  }
}
