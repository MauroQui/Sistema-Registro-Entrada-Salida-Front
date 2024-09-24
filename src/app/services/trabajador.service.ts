import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  // URL endpoint de trabajadores
  private apiUrl = 'http://127.0.0.1:8000/api/trabajadores/';  
  // URL para la liquidación
  private liquidacionUrl = 'http://127.0.0.1:8000/api/liquidacion-trabajador/'; 

  constructor(private http: HttpClient) {}

  // Método para obtener todos los trabajadores
  getTrabajadores(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers });
  }

   // Obtener un trabajador por ID
   getTrabajadorById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
  

  // Método para agregar un nuevo trabajador
  addTrabajador(trabajador: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, trabajador, { headers });
  }

  // Método para actualizar un trabajador
  updateTrabajador(id: number, trabajador: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}${id}/`, trabajador, { headers });
  }

  // Método para eliminar un trabajador
  deleteTrabajador(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}${id}/`, { headers });
  }

  // Método para obtener la liquidación de un trabajador por su ID
  getLiquidacion(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Cambia la URL para obtener la liquidación de un trabajador
    return this.http.get<any>(`${this.liquidacionUrl}${id}/`, { headers });
  }

  // Método para obtener reportes desde el backend
  getReporte(tipo: string): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}reportes/${tipo}/`, { headers, responseType: 'blob' });
  }
}