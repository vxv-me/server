import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Add custom error for catching http error
@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      catchError((err) => {
        throw {
          intercept: true,
          ...err,
          controllerName: context.getClass().name,
          handlerName: context.getHandler().name,
          duaration: Date.now() - now,
        };
      }),
    );
  }
}
