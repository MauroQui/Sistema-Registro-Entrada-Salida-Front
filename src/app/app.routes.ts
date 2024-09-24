import { Routes } from '@angular/router';
import { FormularioTrabajadorComponent } from './formulario-trabajador/formulario-trabajador.component';
import { LoginComponent } from './login/login.component';
import { RegEntradaSalidaComponent } from './reg-entrada-salida/reg-entrada-salida.component';
import { AuthGuard } from './auth.guard';
import { LiquidacionComponent } from './liquidacion/liquidacion.component';
import { EditarTrabajadorComponent } from './editar-trabajador/editar-trabajador.component';
import { ReportesComponent } from './reportes/reportes.component';
import { GenerarReportesComponent } from './generar-reportes/generar-reportes.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'trabajadores', component: FormularioTrabajadorComponent, canActivate: [AuthGuard] },
  { path: 'editar-trabajador/:id', component: EditarTrabajadorComponent, canActivate: [AuthGuard] },
  { path: 'registros/:id', component: RegEntradaSalidaComponent, canActivate: [AuthGuard] },
  { path: 'liquidacion/:id', component: LiquidacionComponent },  
  { path: 'reportes', component: ReportesComponent },
  { path: 'generar-reportes', component: GenerarReportesComponent },
  
   // Redireccionar al login si la ruta no existe
  { path: '**', redirectTo: 'login' }, 
  
];