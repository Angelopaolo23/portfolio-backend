import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ¡ESTO elimina campos que no estén en el DTO!
      forbidNonWhitelisted: true, // Lanza error si envían campos extra
      transform: true, // Convierte los payloads a objetos de clase DTO
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Mi API de portafolio en NestJS')
    .setDescription('Descripción de los endpoints de mi proyecto')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' será la ruta (localhost:3000/api) para ver mis endpoints
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
