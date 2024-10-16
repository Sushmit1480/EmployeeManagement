import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/entitites/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private service: EmployeesService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.service.getAllEmployee().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  viewEmployee(id: number): void {
    this.router.navigate(['/employee-detail', id]);
  }
}
