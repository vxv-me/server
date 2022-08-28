import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MetricsInterceptor } from '~/modules/metrics/metrics.intereptor';
import { HttpException, HttpStatus } from '@nestjs/common';

import { MainService } from './main.service';

@UseInterceptors(MetricsInterceptor) // track interceptor
@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  @Get('ready')
  public home(): Promise<string> {
    return this.mainService.ready();
  }

  @Get('err1')
  public ERROR(): Promise<string> {
    throw new Error('test');
  }

  @Get('err')
  public FORBIDDEN(): Promise<string> {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('404')
  public NOT_FOUND(): Promise<string> {
    throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
  }
}
