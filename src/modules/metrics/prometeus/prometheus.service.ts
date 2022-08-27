import { Injectable } from '@nestjs/common';
import {
  Registry,
  collectDefaultMetrics,
  Histogram,
  Gauge,
  Counter,
} from 'prom-client';

export type PrometheusHistogram = Histogram<string>;

interface MapHistogram {
  [key: string]: Histogram<string>;
}

interface MapGauge {
  [key: string]: Gauge<string>;
}

interface MapCounter {
  [key: string]: Counter<string>;
}

@Injectable()
export class PrometheusService {
  private readonly serviceTitle = 'nodejs'; // SERIVE NAME
  private readonly servicePrefix = 'nodejs_'; // SERVIE PREFIX

  private registeredMetrics: MapHistogram = {};
  private registeredGauges: MapGauge = {};
  private registerCounter: MapCounter = {};

  private readonly registry: Registry;

  public get metrics(): Promise<string> {
    return this.registry.metrics();
  }

  constructor() {
    this.registry = new Registry();
    this.registry.setDefaultLabels({
      app: this.serviceTitle,
    });
    collectDefaultMetrics({
      register: this.registry,
      prefix: '',
    });
  }

  public Histogram(
    name: string,
    help: string,
    labelNames: string[],
    buckets: number[],
  ): Histogram<string> {
    if (this.registeredMetrics[name] === undefined) {
      const histogram = new Histogram({ name, help, labelNames, buckets });
      this.registry.registerMetric(histogram);
      this.registeredMetrics[name] = histogram;
    }
    return this.registeredMetrics[name];
  }

  public registerMetrics(
    name: string,
    help: string,
    labelNames: string[],
    buckets: number[],
  ): Histogram<string> {
    if (this.registeredMetrics[name] === undefined) {
      const histogram = new Histogram({ name, help, labelNames, buckets });
      this.registry.registerMetric(histogram);
      this.registeredMetrics[name] = histogram;
    }
    return this.registeredMetrics[name];
  }

  public Counter(name: string, help: string): Counter<string> {
    if (this.registerCounter[name] === undefined) {
      const counter = new Counter({ name, help });
      this.registry.registerMetric(counter);
      this.registerCounter[name] = counter;
    }
    return this.registerCounter[name];
  }

  public Gauge(name: string, help: string): Gauge<string> {
    if (this.registeredGauges[name] === undefined) {
      const gauge = (this.registeredGauges[name] = new Gauge({
        name: this.servicePrefix + name,
        help,
      }));
      this.registry.registerMetric(gauge);
      this.registeredGauges[name] = gauge;
    }
    return this.registeredGauges[name];
  }

  public clearMetrics(): void {
    this.registry.resetMetrics();
    return this.registry.clear();
  }
}
