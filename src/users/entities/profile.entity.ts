export class Profile {
  id: string;
  userId: string;
  fullName: string;
  roleTitle: string;
  bio: string;
  avatarUrl?: string;
  location?: string;
  socialLinks?: Record<string, string>;
}
/*
model Profile {
  id          String   @id @default(uuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  fullName    String
  roleTitle   String
  bio         String   @db.Text
  avatarUrl   String?
  location    String?
  socialLinks Json?    // Para guardar { "linkedin": "...", "github": "..." }
}
*/
