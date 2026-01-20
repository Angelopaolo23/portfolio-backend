import { Project } from 'src/projects/entities/project.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

export enum TechCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  AI_INTEGRATION = 'ai_integration',
  AI_AGENTS = 'ai_agents',
  DATABASE = 'database',
  CLOUD = 'cloud',
  DEVOPS = 'devops',
  TESTING = 'testing',
  TOOLS = 'tools',
}

@Entity()
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  name: string;
  @Column()
  category: TechCategory;
  @Column()
  iconUrl?: string; // Opcional, por si alguna tecnología no tiene logo aún
  // Representa la relación Many-to-Many.
  // Una tecnología puede estar presente en muchos proyectos.
  @ManyToMany(() => Project, (project) => project.technologies)
  projects: Project[];
}
