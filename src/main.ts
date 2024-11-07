import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const allowedOrigins = 'https://user-mangement-frontend.onrender.com/'
  app.enableCors({
    origin: 'https://user-mangement-frontend.onrender.com/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
