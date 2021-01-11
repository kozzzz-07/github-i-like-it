import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './authorizationInterceptor';

export const AUTHORIZATION_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthorizationInterceptor,
  multi: true,
};
