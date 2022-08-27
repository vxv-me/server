import { Injectable } from '@nestjs/common';
import { PrometheusService } from './prometeus/prometheus.service';

@Injectable()
export class MetricsService {
  constructor(private promClientService: PrometheusService) {}

  public get metrics(): Promise<string> {
    return this.promClientService.metrics;
  }

  public commonRequest() {
    this.promClientService.Gauge('request', 'http request').inc();
  }

  public onRequest() {
    this.promClientService.Gauge('request', 'http request').inc();
  }
}
