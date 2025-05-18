import { OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/services/services.service';  
import { Service } from 'src/app/models/services.model';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true, // eesto ya esta
  imports: [CommonModule], //agrgado
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services: Service[] = [];

  constructor(private servicesService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.servicesService.getAll().subscribe((data) => {
      this.services = data;
    }, (error) => {
      console.error('Error fetching services', error);
    });
  }
}