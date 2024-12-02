import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { swaggerBootstrap } from './bootstrap/swagger.bootstrap';
import { PrismaClientExceptionFilter } from './filters/prisma.filter';
import { ConfigService } from '@nestjs/config';
import { PORT } from './config/global.config';
import * as cookieParser from 'cookie-parser';
import { CustomLoggerService } from './logger/custom-logger.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
  });
  const configService = app.get(ConfigService);
  const logger = app.get(CustomLoggerService);

  // CORS
  const origin: RegExp[] = configService
    .get<string>('CORS_ORIGIN_CONFIG')
    ?.split('\n')
    .map((item: string): RegExp => new RegExp(item));
  if (!origin) {
    logger.warn(`Failed to get the value "CORS_ORIGIN_CONFIG"`, 'Bootstrap');
  }
  app.enableCors({
    origin: origin ?? ['*'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  swaggerBootstrap(app);

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        exposeDefaultValues: true,
      },
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );

  // interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  const { httpAdapter } = app.get(HttpAdapterHost);

  // Filters
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.use(cookieParser());

  const port = configService.get(PORT);
  await app.listen(port, () => {
    logger.log(`App has started on port ${port}`, 'Bootstrap');
  });
}

bootstrap();
