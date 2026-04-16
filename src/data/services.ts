export interface Service {
  id: string;
  name: string;
  slug: string;
  category: 'empresa' | 'candidato';
  icon: string;
  idealFor: string;
  description: string;
  includes: string[];
  showInCards?: boolean;
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    id: 'reclutamiento',
    name: 'Reclutamiento & Selección',
    slug: 'reclutamiento',
    category: 'empresa',
    icon: 'users',
    idealFor: 'Empresas en etapa de crecimiento',
    description: 'Encontramos al candidato correcto para tu cultura, no solo para el puesto. Proceso completo: desde el perfil ideal hasta la contratación.',
    includes: ['Levantamiento de perfil', 'Publicación y búsqueda activa', 'Filtrado y entrevistas', 'Evaluación de competencias', 'Acompañamiento en onboarding'],
    showInCards: false,
    faq: [
      { q: '¿Cuánto tarda el proceso?', a: 'Entre 3 y 6 semanas dependiendo del nivel del puesto.' },
      { q: '¿Qué pasa si el candidato no funciona?', a: 'Ofrecemos garantía de reposición dentro de los primeros 90 días.' },
      { q: '¿Manejan posiciones ejecutivas?', a: 'Sí, tenemos experiencia en búsqueda ejecutiva y headhunting.' },
    ],
  },
  {
    id: 'consultoria-legal',
    name: 'Consultoría Legal Laboral',
    slug: 'consultoria-legal',
    category: 'empresa',
    icon: 'scale',
    idealFor: 'Empresas con exposición legal',
    description: 'Asesoría legal laboral preventiva y correctiva. Blindamos tu empresa ante riesgos laborales y te mantenemos en cumplimiento con la legislación costarricense.',
    includes: ['Asesoría legal laboral continua', 'Corrección de contratos', 'Protocolo de amonestaciones', 'Preparación para inspecciones', 'Representación ante el Ministerio de Trabajo'],
    showInCards: false,
    faq: [
      { q: '¿Incluye representación legal?', a: 'Incluye asesoría preventiva. La representación en procesos judiciales se cotiza por separado.' },
      { q: '¿Cada cuánto se recomienda una auditoría?', a: 'Al menos una vez al año, o cuando haya cambios significativos en la operación.' },
      { q: '¿Es confidencial?', a: 'Absolutamente. Firmamos NDA antes de iniciar cualquier proceso.' },
    ],
  },
  {
    id: 'strategic-partner',
    name: 'HR Business Partner (HRBP)',
    slug: 'strategic-partner',
    category: 'empresa',
    icon: 'building',
    idealFor: 'Empresas de 10–80 colaboradores',
    description: 'Nos convertimos en tu departamento de RR.HH. externo. Gestionamos todo: desde contratos hasta cultura organizacional y cumplimiento legal.',
    includes: ['HR Business Partner', 'Cultura y clima organizacional', 'Prevención legal', 'Gestión de talento'],
    showInCards: true,
    faq: [
      { q: '¿Con qué frecuencia nos reunimos?', a: 'Reuniones semanales o quincenales según el plan elegido, más disponibilidad continua para consultas urgentes.' },
      { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí, con 30 días de preaviso. Sin penalidades.' },
      { q: '¿Incluye representación legal?', a: 'Incluye asesoría preventiva. La representación en procesos judiciales se cotiza por separado.' },
    ],
  },
  {
    id: 'capacitacion',
    name: 'Capacitación & Desarrollo',
    slug: 'capacitacion',
    category: 'empresa',
    icon: 'book-open',
    idealFor: 'PYMES iniciando su formalización',
    description: 'Programas de formación y desarrollo organizacional. Desde inducción de nuevos colaboradores hasta talleres de liderazgo y cultura empresarial.',
    includes: ['Contratos de trabajo ajustados a ley', 'Reglamento interno de trabajo', 'Política de vacaciones y permisos', 'Checklist de cumplimiento legal', 'Sesiones de capacitación'],
    showInCards: false,
    faq: [
      { q: '¿Cuánto tarda la implementación?', a: 'Entre 2 y 4 semanas según la complejidad de tu operación.' },
      { q: '¿Es un pago único?', a: 'Sí, es un proyecto con entregables definidos. Sin mensualidades.' },
      { q: '¿Incluye capacitación al equipo?', a: 'Incluye una sesión de inducción para que tu equipo entienda las nuevas políticas.' },
    ],
  },
  {
    id: 'risk-compliance',
    name: 'Auditoría & Compliance',
    slug: 'risk-compliance',
    category: 'empresa',
    icon: 'shield',
    idealFor: 'Empresas con exposición legal',
    description: 'Auditoría legal integral y cumplimiento normativo laboral. Identificamos riesgos, corregimos incumplimientos y te preparamos para inspecciones.',
    includes: ['Auditoría de procesos', 'Compliance laboral', 'Mitigación de riesgos', 'Informe ejecutivo'],
    showInCards: true,
    faq: [
      { q: '¿Cada cuánto se recomienda una auditoría?', a: 'Al menos una vez al año, o cuando haya cambios significativos en la operación.' },
      { q: '¿Nos representan ante el Ministerio de Trabajo?', a: 'Podemos acompañarles en inspecciones y preparar toda la documentación necesaria.' },
      { q: '¿Es confidencial?', a: 'Absolutamente. Firmamos NDA antes de iniciar cualquier proceso.' },
    ],
  },
  {
    id: 'essentials',
    name: 'Corporative Essentials',
    slug: 'essentials',
    category: 'empresa',
    icon: 'book-open',
    idealFor: 'PYMES iniciando su formalización',
    description: 'Gestión operativa básica de recursos humanos para empresas en crecimiento.',
    includes: ['Nómina básica', 'Contratos laborales', 'Consultas legales', 'Soporte continuo'],
    showInCards: true,
    faq: [
      { q: '¿Cuánto tarda la implementación?', a: 'Entre 2 y 4 semanas según la complejidad de tu operación.' },
      { q: '¿Es un pago único?', a: 'Sí, es un proyecto con entregables definidos. Sin mensualidades.' },
      { q: '¿Incluye capacitación al equipo?', a: 'Incluye una sesión de inducción para que tu equipo entienda las nuevas políticas.' },
    ],
  },
  {
    id: 'outplacement',
    name: 'Outplacement & Carrera',
    slug: 'outplacement',
    category: 'candidato',
    icon: 'trending-up',
    idealFor: 'Profesionales con 2+ años de experiencia',
    description: 'Programa de aceleración profesional. Optimizamos tu perfil, preparamos tu estrategia de búsqueda y te conectamos con oportunidades reales.',
    includes: ['Optimización de CV y LinkedIn', 'Estrategia de búsqueda personalizada', 'Preparación para entrevistas', 'Negociación salarial'],
    showInCards: true,
    faq: [
      { q: '¿Cuánto dura el programa?', a: '4 semanas de acompañamiento activo, más 8 semanas de seguimiento.' },
      { q: '¿Garantizan colocación?', a: 'No garantizamos colocación, pero sí que estarás significativamente mejor preparado.' },
      { q: '¿Es presencial o virtual?', a: '100% virtual, con sesiones en vivo y materiales grabados.' },
    ],
  },
  {
    id: 'first-step',
    name: 'ADD First Step',
    slug: 'first-step',
    category: 'candidato',
    icon: 'rocket',
    idealFor: 'Estudiantes y recién graduados',
    description: 'Tu primer paso al mundo laboral. Te ayudamos a construir tu perfil profesional desde cero y a conseguir tu primera oportunidad.',
    includes: ['Creación de CV profesional', 'Perfil de LinkedIn desde cero', 'Taller de entrevistas', 'Orientación vocacional', 'Acceso a vacantes junior'],
    showInCards: true,
    faq: [
      { q: '¿Necesito experiencia previa?', a: 'No. Este programa está diseñado específicamente para quienes inician.' },
      { q: '¿Incluye prácticas profesionales?', a: 'No directamente, pero te conectamos con empresas que buscan practicantes.' },
      { q: '¿Puedo tomarlo mientras estudio?', a: 'Sí, las sesiones son flexibles y se adaptan a tu horario.' },
    ],
  },
  {
    id: 'simulaciones',
    name: 'Simulaciones de Entrevista',
    slug: 'simulaciones',
    category: 'candidato',
    icon: 'mic',
    idealFor: 'Candidatos en proceso activo',
    description: 'Sesiones individuales de práctica con feedback profesional. Simulamos entrevistas reales del mercado costarricense para que llegues preparado.',
    includes: ['Simulación de entrevista (45 min)', 'Feedback escrito detallado', 'Tips personalizados', 'Grabación de la sesión'],
    showInCards: true,
    faq: [
      { q: '¿Cuántas sesiones necesito?', a: 'Recomendamos al menos 2, pero una sola sesión ya marca diferencia.' },
      { q: '¿Las hacen para puestos específicos?', a: 'Sí, adaptamos la simulación al tipo de puesto al que estás aplicando.' },
      { q: '¿Es individual o grupal?', a: '100% individual para máximo aprovechamiento.' },
    ],
  },
];

export const digitalProducts = [
  {
    id: 'hr-toolkit',
    name: 'HR Toolkit',
    audience: 'Para PYMES',
    description: 'Machotes legales, contratos, guías de amonestación y cumplimiento costarricense.',
    price: '$60',
    slug: 'hr-toolkit',
  },
  {
    id: 'career-blueprint',
    name: 'Career Blueprint',
    audience: 'Para Profesionales',
    description: 'Curso grabado de estrategia laboral. Avanza a tu ritmo.',
    price: '$65',
    slug: 'career-blueprint',
  },
];

export const vacantes = [
  { id: 1, area: 'Recursos Humanos', zona: 'San José', titulo: 'Analista de Reclutamiento', empresa: 'Empresa confidencial', publicado: 'Publicado hace 2 días', salario: '₡800.000 – ₡1.200.000' },
  { id: 2, area: 'Legal', zona: 'Heredia', titulo: 'Asistente Legal Laboral', empresa: 'Empresa confidencial', publicado: 'Publicado hace 3 días', salario: '₡700.000 – ₡950.000' },
  { id: 3, area: 'Administración', zona: 'San José', titulo: 'Coordinador/a de Planillas', empresa: 'Empresa confidencial', publicado: 'Publicado hace 5 días', salario: '₡900.000 – ₡1.400.000' },
  { id: 4, area: 'Recursos Humanos', zona: 'Cartago', titulo: 'Generalista de RR.HH.', empresa: 'Empresa confidencial', publicado: 'Publicado hace 1 semana', salario: '₡1.000.000 – ₡1.500.000' },
  { id: 5, area: 'Legal', zona: 'San José', titulo: 'Abogado/a Laboralista Jr.', empresa: 'Empresa confidencial', publicado: 'Publicado hace 1 semana', salario: '₡850.000 – ₡1.100.000' },
  { id: 6, area: 'Administración', zona: 'Alajuela', titulo: 'Encargado/a de Capacitación', empresa: 'Empresa confidencial', publicado: 'Publicado hace 2 semanas', salario: '₡750.000 – ₡1.000.000' },
  { id: 7, area: 'Recursos Humanos', zona: 'Heredia', titulo: 'Especialista en Compensación y Beneficios', empresa: 'Empresa confidencial', publicado: 'Publicado hace 2 semanas', salario: '₡1.200.000 – ₡1.800.000' },
  { id: 8, area: 'Legal', zona: 'Alajuela', titulo: 'Analista de Cumplimiento Laboral', empresa: 'Empresa confidencial', publicado: 'Publicado hace 3 semanas', salario: '₡900.000 – ₡1.300.000' },
  { id: 9, area: 'Administración', zona: 'Cartago', titulo: 'Coordinador/a de Desarrollo Organizacional', empresa: 'Empresa confidencial', publicado: 'Publicado hace 3 semanas', salario: '₡1.100.000 – ₡1.600.000' },
  { id: 10, area: 'Recursos Humanos', zona: 'San José', titulo: 'Director/a de Talento Humano', empresa: 'Empresa confidencial', publicado: 'Publicado hace 1 mes', salario: '₡1.500.000 – ₡2.500.000' },
];

export const blogPosts = [
  { id: 1, tag: 'Derecho Laboral', title: '¿Qué debe incluir un contrato de trabajo en Costa Rica?', date: '12 Mar 2025', excerpt: 'Un contrato de trabajo bien redactado es la primera línea de defensa legal para cualquier empresa. En Costa Rica, el Código de Trabajo establece requisitos mínimos que todo empleador debe conocer...', slug: 'contrato-trabajo-costa-rica' },
  { id: 2, tag: 'Recursos Humanos', title: 'Cómo construir una cultura organizacional sin presupuesto', date: '28 Feb 2025', excerpt: 'La cultura no se compra, se construye. Para PYMES costarricenses con recursos limitados, existen estrategias prácticas que no requieren grandes inversiones pero generan impacto real...', slug: 'cultura-organizacional-pyme' },
  { id: 3, tag: 'Carrera Profesional', title: '5 errores que cometen los ticos en LinkedIn', date: '15 Feb 2025', excerpt: 'LinkedIn es la herramienta más poderosa para profesionales en Costa Rica, pero la mayoría la usa mal. Desde fotos inadecuadas hasta descripciones genéricas, estos son los errores más comunes...', slug: 'errores-linkedin-costa-rica' },
  { id: 4, tag: 'Compliance', title: 'Inspecciones del Ministerio de Trabajo: guía de preparación', date: '02 Feb 2025', excerpt: 'Una inspección del Ministerio de Trabajo no tiene por qué ser motivo de pánico. Con la preparación adecuada, tu empresa puede enfrentar cualquier revisión con confianza...', slug: 'inspecciones-ministerio-trabajo' },
  { id: 5, tag: 'Tendencias', title: 'El mercado laboral costarricense en 2025: qué esperar', date: '20 Ene 2025', excerpt: 'El panorama laboral en Costa Rica está cambiando rápidamente. Desde el auge del trabajo remoto hasta nuevas regulaciones, analizamos las tendencias que definirán el 2025...', slug: 'mercado-laboral-2025' },
  { id: 6, tag: 'Reclutamiento', title: 'Cómo identificar talento genuino en una entrevista', date: '08 Ene 2025', excerpt: 'Las entrevistas tradicionales fallan en predecir el desempeño real. Te compartimos técnicas basadas en evidencia para evaluar candidatos de manera más efectiva...', slug: 'identificar-talento-entrevista' },
];
