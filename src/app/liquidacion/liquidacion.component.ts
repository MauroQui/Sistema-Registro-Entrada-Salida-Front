import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TrabajadorService } from '../services/trabajador.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-liquidacion',
  standalone: true, 
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    CommonModule 
  ],
})
export class LiquidacionComponent implements OnInit {
  liquidacion: any;

  constructor(
    private route: ActivatedRoute,
    private trabajadorService: TrabajadorService,
    private router: Router, 
   
  ) {}

  ngOnInit(): void {
    // Obtener el ID del trabajador desde la URL y validar si no es null
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam !== null) {  // Verificamos si idParam no es null
      const id = +idParam;   // Convertimos el string a number
      if (!isNaN(id)) {      // Verificamos si es un número válido
        this.trabajadorService.getLiquidacion(id).subscribe(data => {
          this.liquidacion = data;
        });
      } else {
        console.error('El ID del trabajador no es un número válido');
      }
    } else {
      console.error('El ID del trabajador no está presente en la URL');
    }
  }

  volverATrabajadores(): void {
    this.router.navigate(['/trabajadores']);
  }
  
}