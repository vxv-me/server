import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from '~/app.module';
import * as configs from '~/configs';
import corsOptions from '~/core/cors.options';

export async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors(corsOptions);
  await app.listen(configs.PORT, '0.0.0.0');
}
