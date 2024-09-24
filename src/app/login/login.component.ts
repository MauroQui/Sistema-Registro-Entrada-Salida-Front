import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
  ],
  
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });

    console.log('HttpClient injected:', this.http);

  }

  onSubmit() {
    // Enviar las credenciales al backend
    this.http.post('http://127.0.0.1:8000/api/token/', this.loginForm.value).subscribe(
      (response: any) => {
        // Guardar el token en el localStorage para usarlo en futuras solicitudes
        localStorage.setItem('token', response.access);
  
        // Redirigir al usuario a la página de trabajadores después del login exitoso
        this.router.navigate(['/trabajadores']);
      },
      error => {
        console.error('Error en el login', error);
      }
    );
  }

  onLogout() {
    // Esto elimina el token del localStorage
    localStorage.removeItem('token');
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}


