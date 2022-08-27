import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

interface CustomHttpException extends HttpException {
  intercept?: boolean;
  controllerName?: string;
  handlerName?: string;
  duaration?: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: CustomHttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const context = host.switchToHttp();
    const code = (exception as unknown as { code: number }).code;
    httpAdapter.reply(context.getResponse(), exception, code);

    const { intercept } = exception;
    if (intercept) {
      // track intercepted error
    } else {
      // track uncalculable error (404)
    }
  }
}
