export class Certification {
  id: string;
  title: string;
  issuer: string; // Ej: "Microsoft"
  // En TypeScript usamos el objeto Date para representar DateTime de SQL
  issueDate: Date;
  credentialUrl?: string; // Link a la validación de la certificación
  badgeUrl?: string; // Link a la imagen de la insignia (badge)
  userId: string;
}
