import { Component, OnInit } from '@angular/core';
import { PersonnelService } from 'src/app/services/personnel/personnel.service';
import { Personnel } from 'src/app/models/personnel.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personnel',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule for *ngFor and other directives
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'],
})

export class PersonnelComponent implements OnInit {
  personnel: Personnel[] = [];

  constructor(private personnelService: PersonnelService) {}

  ngOnInit(): void {
    this.personnelService.getAll().subscribe({
      next: (data) => {
        this.personnel = data;
      },
      error: (err) => {
        console.error('Error fetching personnel', err);
      }
    });
  }
}