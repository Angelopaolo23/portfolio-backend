import { Technology } from 'src/technologies/entities/technology.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column({ unique: true })
  slug: string;
  @Column()
  shortDesc: string;
  @Column({ nullable: true })
  archDesc?: string;
  @Column({ nullable: true })
  aiDesc?: string;
  @Column({ nullable: true })
  deployUrl?: string;
  @Column({ nullable: true })
  repoUrl?: string;
  @Column()
  mainImage: string;
  @Column('text', { array: true, nullable: true, default: {} }) //OJO postgre maneja los arrays como {}
  gallery: string[];
  @Column({ default: false })
  isFeatured: boolean = false;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToMany(() => Technology, (technology) => technology.projects)
  @JoinTable()
  technologies: Technology[];
}
