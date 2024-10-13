import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/entitites/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeesService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getAllEmployee().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }
}
