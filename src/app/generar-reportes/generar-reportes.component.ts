import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-generar-reportes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    CommonModule 
  ],
  templateUrl: './generar-reportes.component.html',
  styleUrl: './generar-reportes.component.scss'
})
export class GenerarReportesComponent {
  constructor(
    private http: HttpClient,
    
  ) {}

  generarReporte(tipo: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let url = '';

    switch (tipo) {
      case 'llegadas-tardias':
        url = '/exportar_llegadas_tardias/';
        break;
      case 'llegadas-tempranas':
        url = '/exportar_llegadas_tempranas/';
        break;
      case 'salidas-tardias':
        url = '/exportar_salidas_tardias/';
        break;
      case 'salidas-tempranas':
        url = '/exportar_salidas_tempranas/';
        break;
      case 'ausencias':
        url = '/exportar_ausencias/';
        break;
    }

    this.http.get(url, { headers, responseType: 'blob' }).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${tipo}.csv`;
        a.click();
      },
      (error) => {
        console.error('Error al generar el reporte:', error);
      }
    );
  }

 
}


