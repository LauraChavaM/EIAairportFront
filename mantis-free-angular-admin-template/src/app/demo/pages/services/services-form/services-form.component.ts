import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from 'src/app/services/services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Service } from 'src/app/models/services.model';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ServicesFormComponent implements OnInit {
  serviceForm!: FormGroup;
  isEditMode = false;
  serviceId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.serviceId = this.route.snapshot.paramMap.get('id');
    if (this.serviceId) {
      this.isEditMode = true;
      this.serviceService.getAllServices().subscribe(services => {
        const service = services.find(s => s.service_id === this.serviceId);
        if (service) {
          this.serviceForm.patchValue(service);
        }
      });
    }
  }

  onSubmit() {
    if (this.serviceForm.invalid) return;

    if (this.isEditMode && this.serviceId) {
      this.serviceService.updateService(this.serviceId, this.serviceForm.value).subscribe(() => {
        this.router.navigate(['/services/list']);
      });
    } else {
      this.serviceService.addService(this.serviceForm.value).subscribe(() => {
        this.router.navigate(['/services/list']);
      });
    }
  }
}