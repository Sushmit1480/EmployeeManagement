import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../entitites/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private url = 'http://localhost:8080/api/employees';

  constructor(private httpClient: HttpClient) {}

  getAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.url}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.url}/${id}`);
  }

  createEmployee(employee: FormData): Observable<any> {
    return this.httpClient.post(`${this.url}/create`, employee);
  }

  updateEmployee(id: number, formadata: FormData) {
    return this.httpClient.put(`${this.url}/update/${id}`, formadata);
  }

  deleteEmployee(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.url}/delete/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
