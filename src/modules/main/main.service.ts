import { Injectable } from '@nestjs/common';
import { MetricsService } from '~/modules/metrics/metrics.service';

@Injectable()
export class MainService {
  constructor(private metricsService: MetricsService) {}

  async ready(): Promise<string> {
    this.metricsService.onRequest();

    return 'ready';
  }
}
