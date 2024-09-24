import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistroService } from '../services/registro.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-reg-entrada-salida',
  standalone: true,
  templateUrl: './reg-entrada-salida.component.html',
  styleUrls: ['./reg-entrada-salida.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    CommonModule 
  ],
})
export class RegEntradaSalidaComponent implements OnInit {
registrarEntradaSalida() {
throw new Error('Method not implemented.');
}
  registroForm: FormGroup;
  registros: any[] = [];
  trabajadorId: number | null = null;
alertMessage: any;
registro: any;
trabajadores: any;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private route: ActivatedRoute,
    private router: Router 

  ) {
    this.registroForm = this.fb.group({
      trabajadorId: [''],
      hora: [''],
      tipoRegistro: ['entrada']
    });
  }

  ngOnInit(): void {
    // Obtener el ID del trabajador de la URL y asegurar que sea un número válido
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id !== null) {
      this.trabajadorId = +id;
      this.getRegistros(); 
    } else {
      console.error('No se pudo obtener el ID del trabajador');
    }
  }

  onSubmit() {
    this.registroService.registrarEntradaSalida(this.registroForm.value).subscribe(response => {
      console.log('Registro exitoso', response);
      this.getRegistros();     
    });
  }

  // Llamamos al servicio para obtener los registros de este trabajador
  getRegistros(): void {
    if (this.trabajadorId !== null) {
      this.registroService.getRegistrosPorTrabajador(this.trabajadorId).subscribe( //trabajadorId!
        (data) => {
          this.registros = data; 
          console.log('Registros obtenidos:', this.registros); 
        },
        (error) => {
          console.error('Error al obtener los registros', error);
        }
      );
    } else {
      console.error('El ID del trabajador es nulo');
    }
  }

  volverATrabajadores(): void {
    this.router.navigate(['/trabajadores']);
  }
  
}