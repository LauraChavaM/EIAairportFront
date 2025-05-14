import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../../services/personnel.services';
import { Personnel } from '../../models/personnel.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html'
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
