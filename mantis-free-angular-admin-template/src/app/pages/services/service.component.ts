import {  OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.services';
import { Service } from '../../models/service.models';
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
