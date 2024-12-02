import { DatabaseModule } from '@database';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globalConfig from 'src/config/global.config';
import { LoggerModule } from 'src/logger/logger.module';
import { LoggerMiddleware } from 'src/middlewares/log-incoming-request.middleware';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.${process.env.NODE_ENV}.env`
        : '.env',
      load: [globalConfig],
      isGlobal: true,
    }),
    LoggerModule,
    DatabaseModule,
    LinkModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
