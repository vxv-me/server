import { Test, TestingModule } from '@nestjs/testing';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { MetricsModule } from '../metrics/metrics.module';

describe('HomeController', () => {
  let mainController: MainController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MetricsModule],
      controllers: [MainController],
      providers: [MainService],
    }).compile();

    mainController = app.get<MainController>(MainController);
  });

  describe('Main', () => {
    it('should return "ready"', async () => {
      expect(await mainController.home()).toBe('ready');
    });
  });
});
