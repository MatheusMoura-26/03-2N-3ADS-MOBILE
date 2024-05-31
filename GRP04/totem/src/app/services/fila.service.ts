// fila.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilaService {
  private fila: string[] = [];

  adicionarSenhaFila(tipo: string) {
    this.fila.push(tipo);
  }

  chamarProximaSenha(): string | undefined {
    return this.fila.shift();
  }
}
