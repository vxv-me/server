import { Module } from '@nestjs/common';

import { HttpExceptionFilter } from '~/core/httpError.filter';
import { HttpErrorInterceptor } from '~/core/httpError.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { MainModule } from '~/modules/main/main.module';
import { MetricsModule } from '~/modules/metrics/metrics.module';
@Module({
  imports: [MainModule, MetricsModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpErrorInterceptor,
    },
  ],
})
export class AppModule {}
