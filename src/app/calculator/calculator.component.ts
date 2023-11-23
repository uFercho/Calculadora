import { Component } from '@angular/core';
import { Error } from './interfaces/error.interface';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  public display: string = '';
  public error: Error = {
    tipo: '',
    mensaje: ''
  }
  public isResult: boolean = false;



  appendToDisplay(value: string): void {
    // Validar que el primer caracter no sea 0 o un operador
    if (!this.display && (value === '0' || this.esOperador(value))) return;
    // Validar después de un operador
    if (this.esOperador(this.display.slice(-1)) && value === '0') return;
    // validar si continua con el resultado o se reinicia
    if (this.isResult && !this.esOperador(value)) this.display = "";

    this.display += value;
    this.isResult = false;
  }

  calculate(): void {
    // Validar que los valores de la operacion sean correctos
    try {
      this.error = { tipo: '', mensaje: ''}
      this.display = String(eval(this.display));
      this.isResult = true;
      // Validar que el resultado sera numerico
      if ( isNaN(Number(this.display)) ) {
        this.error = {
          tipo: 'Resultado no numerico',
          mensaje: 'La operación anterior es invalida'
        }
        this.reset();
      }
      // Validar que el resultado sea finito
      if ( !isFinite(Number(this.display)) ) {
        this.error = {
          tipo: 'Se reinicio la memoria de calculo',
          mensaje: 'El resultado de la operacion fue infinito'
        }
        this.reset();
      }
    } catch (error) {
      const referenceError = error as ReferenceError;
      this.error = {
        tipo: referenceError.message,
        mensaje: 'Valores invalidos para la operación'
      }
      this.reset();
    }
  }
  // Borrar el ultimo digito
  delete(): void {
    this.display = this.display.slice(0,-1);
  }
  // Resetear la operacion
  reset(): void {
    this.display = '';
    this.isResult = false;
  }
  // Validar que el caracter sea de tipo operacion
  esOperador(caracter: string): boolean {
    return ['/', '*', '-', '+'].includes(caracter);
  }

}

