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
  @Column()
  fullName: string;
  @Column()
  roleTitle: string;
  @Column()
  bio: string;
  @Column()
  avatarUrl?: string;
  @Column()
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
