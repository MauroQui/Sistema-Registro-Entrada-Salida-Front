import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajadorService } from '../services/trabajador.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-trabajador',
  standalone: true,
  templateUrl: './editar-trabajador.component.html',
  styleUrls: ['./editar-trabajador.component.scss'],
  imports: [
        ReactiveFormsModule,
  ],
})
export class EditarTrabajadorComponent implements OnInit {
  trabajadorForm: FormGroup;
  // Para mostrar mensajes de error
  mensajeError: string = ''; 
  // Para mostrar mensajes de éxito
  mensajeExito: string = ''; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private trabajadorService: TrabajadorService
  ) {
    // Inicializar el formulario vacío
    this.trabajadorForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      cargo: [''],
    });
  }

  ngOnInit(): void {
    // Obtener el ID del trabajador desde la URL y validar si no es null
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam !== null) {  // Verificamos si idParam no es null
      const id = +idParam;   // Convertimos el string a número
      if (!isNaN(id)) {      // Verificamos si es un número válido
        this.trabajadorService.getTrabajadorById(id).subscribe({
          next: (trabajador) => {
            // Prellenar el formulario con los datos del trabajador
            this.trabajadorForm.patchValue({
              nombre: trabajador.nombre,
              apellido: trabajador.apellido,
              cargo: trabajador.cargo,
            });
          },
          error: (err) => {
            this.mensajeError = 'Error al cargar los datos del trabajador.';
            console.error('Error al obtener trabajador', err);
          }
        });
      } else {
        console.error('El ID del trabajador no es un número válido');
      }
    } else {
      console.error('El ID del trabajador no está presente en la URL');
      // Redirigir a la lista de trabajadores en caso de error
      this.router.navigate(['/trabajadores']);
    }
  }

  // Método para enviar los datos actualizados
  onSubmit(): void {
    if (this.trabajadorForm.valid) {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam !== null) {
        const id = +idParam;  
        this.trabajadorService.updateTrabajador(id, this.trabajadorForm.value).subscribe(() => {
          // Redirigir a la lista de trabajadores después de actualizar
          this.router.navigate(['/trabajadores']);
        });
      }
    }
  }

  volverATrabajadores(): void {
    this.router.navigate(['/trabajadores']);
  }
}