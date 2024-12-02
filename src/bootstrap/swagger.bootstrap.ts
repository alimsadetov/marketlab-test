import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export function swaggerBootstrap(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Marketlab API documentation')
    .setDescription('Marketlab API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      defaultModelsExpandDepth: 0,
      docExpansion: 'none',
    },
  };
  const swaggerPath = '/api/swagger';
  SwaggerModule.setup(swaggerPath, app, document, swaggerOptions);
}
