import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CertificationsModule } from './certifications/certifications.module';
import { ProjectsModule } from './projects/projects.module';
import { TechnologiesModule } from './technologies/technologies.module';

@Module({
  imports: [UsersModule, CertificationsModule, ProjectsModule, TechnologiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
