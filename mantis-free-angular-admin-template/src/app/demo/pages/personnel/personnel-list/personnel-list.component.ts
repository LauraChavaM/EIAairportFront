import { Component, OnInit } from '@angular/core';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { Router } from '@angular/router';
import { Personnel } from 'src/app/models/personnel.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PersonnelListComponent implements OnInit {
  personnel: Personnel[] = [];
  isLoading = true;

  constructor(private personnelService: PersonnelService, private router: Router) {}

  ngOnInit(): void {
    this.personnelService.getAllPersonnel().subscribe({
      next: (data) => {
        this.personnel = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  goToAdd() {
    this.router.navigate(['/personnel/form']);
  }

  goToUpdate(id: string) {
    this.router.navigate(['/personnel/form', id]);
  }
}