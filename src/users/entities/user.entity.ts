import { Profile } from './profile.entity';
import { Certification } from 'src/certifications/entities/certification.entity';

export class User {
  id: string;
  email: string;
  password: string;
  profile?: Profile;
  certs: Certification[];
}

/*
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  profile   Profile?
  certs     Certification[]
}
*/
