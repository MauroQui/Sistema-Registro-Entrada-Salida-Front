import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Si el token existe, permitir acceso a la ruta
      return true;
    } else {
      // Si no existe el token, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}