import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  issuer: string; // Lo dejamos flexible pero lo validaremos en el DTO
  @Column()
  issueDate: Date; // En TypeScript usamos el objeto Date para representar DateTime de SQL
  @Column()
  credentialUrl?: string; // Link a la validación de la certificación
  @Column()
  badgeUrl?: string; // Link a la imagen de la insignia (badge)
  @ManyToOne(() => User, (user) => user.certs)
  userId: string;
}
