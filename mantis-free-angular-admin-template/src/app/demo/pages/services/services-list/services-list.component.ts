import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/services/services.service';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/services.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ServicesListComponent implements OnInit {
  services: Service[] = [];
  isLoading = true;

  constructor(private serviceService: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.services = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  goToAdd() {
    this.router.navigate(['/services/form']);
  }

  goToUpdate(service_id: string) {
    this.router.navigate(['/services/form', service_id]);
  }
}