import { Component } from '@angular/core';
import { TrabajadorService } from '../services/trabajador.service';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  standalone: true,
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    CommonModule 
  ],
})
export class ReportesComponent {

  constructor(
    private trabajadorService: TrabajadorService,
    private router: Router,
  ) { }

  // Método para generar y descargar el reporte basado en el tipo
  generarReporte(tipo: string): void {
    this.trabajadorService.getReporte(tipo).subscribe((response) => {
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tipo}.csv`;
      a.click();
    }, (error) => {
      console.error('Error al generar el reporte', error);
    });
  }

  volverATrabajadores(): void {
    this.router.navigate(['/trabajadores']);
  }
}