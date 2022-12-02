import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ContextMiddleware } from './shared/context/context.middleware';
import { ErrorResponse } from './shared/errors/error-respones.service';
import { GlobalExceptionFilter } from './shared/errors/global.exception-filter';
import { LoggingMiddleware } from './shared/logging/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  loadMiddlewares(app);
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(ErrorResponse)));
  app.enableCors();
  await app.listen(3000);
}

function loadMiddlewares(app: INestApplication) {
  const middlewares = [ContextMiddleware, LoggingMiddleware];

  for (const middleware of middlewares.map((m) => app.get(m))) {
    app.use(middleware.use.bind(middleware));
  }
}
bootstrap();
