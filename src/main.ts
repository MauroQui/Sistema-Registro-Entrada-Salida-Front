import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthGuard } from './app/auth.guard';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(),  
    provideRouter(routes),  // Aquí se añade el enrutamiento
    AuthGuard, 
    ...(appConfig.providers || []) 
  ]
})
  .catch((err) => console.error(err));