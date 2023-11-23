import { Component, Input } from '@angular/core';
import { Error } from '../../interfaces/error.interface';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  @Input()
  error!: Error;

}
