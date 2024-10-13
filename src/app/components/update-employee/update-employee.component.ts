// src/app/update-employee/update-employee.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/entitites/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    salary: 0,
    photo: undefined,
  };
  selectedFile: File | null = null;

  constructor(
    private employeeService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(+id).subscribe(
        (data: Employee) => (this.employee = data),
        (error) => console.error('Error fetching employee data', error)
      );
    }
  }

  // When the user selects a new file
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('firstName', this.employee.firstName);
    formData.append('lastName', this.employee.lastName);
    formData.append('mobile', this.employee.mobile);
    formData.append('email', this.employee.email);
    formData.append('salary', this.employee.salary.toString());

    // Append the new image if selected, otherwise don't send any image
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    // Make the API call to update the employee
    this.employeeService.updateEmployee(this.employee.id, formData).subscribe(
      (response) => {
        console.log('Employee updated successfully', response);
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error updating employee', error);
      }
    );
  }
}
