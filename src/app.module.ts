import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CertificationsModule } from './certifications/certifications.module';
import { ProjectsModule } from './projects/projects.module';
import { TechnologiesModule } from './technologies/technologies.module';

@Module({
  imports: [
    // 1. Configuramos el acceso al archivo .env
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que el archivo .env se cargue para todos
      envFilePath: '.env', // Asegura la ruta explícitamente
    }),
    // 2. Configuramos TypeORM usando la URL de Neon
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        return {
          type: 'postgres',
          url: dbUrl,
          autoLoadEntities: true,
          synchronize: true,
          ssl: true,
          extra: {
            ssl: { rejectUnauthorized: false },
          },
        };
      },

      /*useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true, // Esto buscará automáticamente tus archivos .entity.ts
        synchronize: true, // Esto creará las tablas automáticamente (solo para desarrollo)
        ssl: true,
        extra: {
          ssl: { rejectUnauthorized: false }, // Necesario para evitar errores de certificado
        },
      }),*/
    }),
    UsersModule,
    CertificationsModule,
    ProjectsModule,
    TechnologiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
