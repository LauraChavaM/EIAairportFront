import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss'
})
export class FlightFormComponent {

}
