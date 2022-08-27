import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { MetricsService } from '~/modules/metrics/metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    // const request = context.switchToHttp().getRequest();
    // const controllerName = context.getClass().name;
    // const сontrollerMethod = context.getHandler().name;

    return next.handle().pipe(
      tap((data) => {
        // console.log('duaration', Date.now() - now);
        // console.log('controllerName', controllerName);
        // console.log('сontrollerMethod', сontrollerMethod);
      }),
    );
  }
}
