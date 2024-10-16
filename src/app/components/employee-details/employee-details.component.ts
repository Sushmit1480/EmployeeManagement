import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/entitites/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null = null;
  deletionMessage: string = '';

  constructor(
    private service: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getEmployeeById(+id);
    }
  }

  getEmployeeById(id: number): void {
    this.service.getEmployeeById(id).subscribe(
      (data: Employee) => {
        this.employee = data;
      },
      (error) => {
        console.error('Error while fetchinf employee details', error);
      }
    );
  }

  goToUpdateEmployee(): void {
    if (this.employee?.id) {
      this.router.navigate([`/update-employee/${this.employee.id}`]);
    }
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  deleteEmployee(): void {
    if (this.employee?.id) {
      const confirmed = confirm(
        'Are you sure you want to delete this employee?'
      );
      if (confirmed) {
        this.service.deleteEmployee(this.employee.id).subscribe({
          next: (message: string) => {
            alert(message); // Display the deletion message from the server
            this.router.navigate(['']); // Navigate back to employee list
          },
          error: (error) => {
            console.error('Error deleting employee', error);
            alert('Error deleting employee');
          },
        });
      }
    }
  }
}
