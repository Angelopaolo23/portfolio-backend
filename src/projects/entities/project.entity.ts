import { Technology } from 'src/technologies/entities/technology.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  slug: string;
  @Column()
  shortDesc: string;
  @Column()
  archDesc?: string;
  @Column()
  aiDesc?: string;
  @Column()
  deployUrl?: string;
  @Column()
  repoUrl?: string;
  @Column()
  mainImage: string;
  @Column('text', { array: true, nullable: true })
  gallery: string[];
  @Column()
  isFeatured: boolean = false;
  @Column()
  createdAt: Date;
  @ManyToMany(() => Technology, (technology) => technology.projects)
  @JoinTable()
  technologies: Technology[];
}
