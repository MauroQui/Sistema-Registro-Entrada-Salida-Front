import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../services/trabajador.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-formulario-trabajador',
  standalone: true,
  templateUrl: './formulario-trabajador.component.html',
  styleUrls: ['./formulario-trabajador.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule], 
})
export class FormularioTrabajadorComponent implements OnInit {
  trabajadorForm: FormGroup;
  //Esta es la variable donde almacenamos la lista de todos los trabajadores
  trabajadores: any[] = [];
  

  constructor(
    private fb: FormBuilder,
    private trabajadorService: TrabajadorService,
    private router: Router,
  ) {
    this.trabajadorForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      cargo: [''],
      vigencia: ['']
    });
  }
  
  ngOnInit(): void {
    this.getTrabajadores();  // Obtener la lista de trabajadores al inicializar el componente
  }

  // Método para obtener la lista de trabajadores
  getTrabajadores(): void {
    this.trabajadorService.getTrabajadores().subscribe(
      (data) => {
        this.trabajadores = data;
      },
      (error) => {
        console.error('Error al obtener trabajadores', error);
      }
    );
  }

  // Función para manejar el envío del formulario
  onSubmit() {
    if (this.trabajadorForm.valid) {
      // Envía los datos del formulario al servicio
      this.trabajadorService.addTrabajador(this.trabajadorForm.value).subscribe(
        (response) => {
          console.log('Trabajador registrado exitosamente:', response);
          // Limpiar el formulario
          this.trabajadorForm.reset();  
          // Llamar al método para obtener nuevamente la lista actualizada de trabajadores
          this.getTrabajadores();
        },
        (error) => {
          console.error('Error al registrar el trabajador:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  // Función para ver los registros de cada trabajador
  verRegistro(trabajadorId: number) {
    this.router.navigate([`/registros/${trabajadorId}`]);
  }

  // Función para redirigir a la vista de liquidación con el ID del trabajador
  verLiquidacion(id: number): void {
    this.router.navigate([`/liquidacion/${id}`]); 
  }

  // Función para editar un trabajador en específico 
  editarTrabajador(id: number): void {
    this.router.navigate([`editar-trabajador/${id}`]); 
  }

  // Función para eliminar un trabajador en específico
  eliminarTrabajador(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este trabajador?')) {
      this.trabajadorService.deleteTrabajador(id).subscribe(() => {
        // Actualizar la lista de trabajadores después de eliminar uno
        this.trabajadores = this.trabajadores.filter(trabajador => trabajador.id !== id);
        alert('Trabajador eliminado exitosamente');
      }, error => {
        console.error('Hubo un error al eliminar el trabajador:', error);
      });
    }
  }

  // Funcion que lleva la página de reportes
  irAReportes(): void {
  this.router.navigate(['/reportes']);
}
}