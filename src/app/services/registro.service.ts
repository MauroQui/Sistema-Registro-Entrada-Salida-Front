import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
   // URL endpoint de registro
   private apiUrl = 'http://127.0.0.1:8000/api/registros/';

  constructor(private http: HttpClient) { }
 
  // Método para obtener registros filtrados por el trabajador
  getRegistrosPorTrabajador(trabajadorId: number): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` 
    });

    return this.http.get<any[]>(`${this.apiUrl}?trabajador=${trabajadorId}`, { headers });
  }

  // Método para registrar entrada/salida
  registrarEntradaSalida(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`  
    });

    return this.http.post<any>(this.apiUrl, data, { headers });
  }

}

