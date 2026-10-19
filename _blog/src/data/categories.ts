// Categorias do blog. Para criar uma nova, adicione aqui e em keystatic.config.ts.
export const CATEGORIES = [
  {
    slug: 'gestao',
    name: 'Gestão de clínicas',
    description: 'Como organizar a rotina, a equipe e os processos de uma clínica de terapia.',
  },
  {
    slug: 'agenda',
    name: 'Agenda',
    description: 'Agenda, faltas, confirmações e agendamento online para terapeutas.',
  },
  {
    slug: 'financeiro',
    name: 'Financeiro',
    description: 'Precificação, cobrança, repasse, nota fiscal e impostos para clínicas e terapeutas.',
  },
  {
    slug: 'prontuario',
    name: 'Prontuário',
    description: 'Prontuário eletrônico, documentos clínicos, LGPD e registros de sessão.',
  },
  {
    slug: 'teleconsulta',
    name: 'Teleconsulta',
    description: 'Atendimento online: tecnologia, regras dos conselhos e boas práticas.',
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];
export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug) as [CategorySlug, ...CategorySlug[]];
export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

// Autores. O primeiro é o padrão.
export const AUTHORS = {
  'equipe-terapee': { name: 'Equipe Terapee', role: 'Terapee' },
  vitor: { name: 'Vitor Rosas', role: 'Fundador da Terapee' },
} as const;
export type AuthorId = keyof typeof AUTHORS;
