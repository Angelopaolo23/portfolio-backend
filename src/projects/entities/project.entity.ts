import { Technology } from 'src/technologies/entities/technology.entity';

export class Project {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  archDesc?: string;
  aiDesc?: string;
  deployUrl?: string;
  repoUrl?: string;
  mainImage: string;
  gallery: string[];
  isFeatured: boolean = false;
  createdAt: Date;
  technologies: Technology[];
}
/*
model Project {
  id               String   @id @default(uuid())
  title            String
  slug             String   @unique
  shortDesc        String
  archDesc         String?  @db.Text
  aiDesc           String?  @db.Text
  deployUrl        String?
  repoUrl          String?
  mainImage        String?
  gallery          String[]
  isFeatured       Boolean  @default(false)
  createdAt        DateTime @default(now())
  technologies     Technology[]
}
*/
