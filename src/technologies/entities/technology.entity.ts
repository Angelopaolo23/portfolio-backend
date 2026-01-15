import { Project } from 'src/projects/entities/project.entity';

export type TechCategory =
  | 'frontend'
  | 'backend'
  | 'fullstack' // Útil para frameworks como Next.js o Remix
  | 'ai_ml' // Para OpenAI, LangChain, Agentes, PyTorch
  | 'cloud' // Específicamente para servicios de Azure/AWS
  | 'devops' // Para Docker, CI/CD, Azure Pipelines (AZ-400)
  | 'database' // Para PostgreSQL, Supabase, Redis
  | 'mobile'; // Por si en el futuro agregas Flutter o React Native
export class Technology {
  id: string;
  name: string;
  category: TechCategory;
  iconUrl?: string; // Opcional, por si alguna tecnología no tiene logo aún
  // Representa la relación Many-to-Many.
  // Una tecnología puede estar presente en muchos proyectos.
  projects: Project[];
}
