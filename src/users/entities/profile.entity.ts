import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  userId: User;
  @Column({ nullable: true })
  fullName: string;
  @Column({ nullable: true })
  roleTitle: string;
  @Column({ nullable: true })
  bio: string;
  @Column({ nullable: true })
  avatarUrl?: string;
  @Column({ nullable: true })
  location?: string;
  @Column('jsonb', { nullable: true })
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    website?: string;
  };
}
