import { Profile } from './profile.entity';
import { Certification } from 'src/certifications/entities/certification.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @OneToOne(() => Profile, (profile) => profile.userId)
  profile?: Profile;
  @OneToMany(() => Certification, (cert) => cert.userId)
  certs: Certification[];
}
