import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
// import { TokenInterceptor } from './interceptors/token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // { provide: HTTP_INTERCEPTORS, useClass:, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideAnimations()
],
};
