export interface Service {
  id: string;
  name: string;
  slug: string;
  category: 'empresa' | 'candidato';
  idealFor: string;
  description: string;
  includes: string[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    id: 'strategic-partner',
    name: 'ADD Strategic Partner',
    slug: 'strategic-partner',
    category: 'empresa',
    idealFor: 'Empresas de 10–80 colaboradores',
    description: 'Nos convertimos en tu departamento de RR.HH. externo. Gestionamos todo: desde contratos y planillas hasta cultura organizacional y cumplimiento legal. Tú te enfocas en crecer, nosotros en tu gente.',
    includes: ['Gestión integral de RR.HH.', 'Asesoría legal laboral continua', 'Diseño de políticas internas', 'Manejo de planillas y beneficios', 'Auditorías de cumplimiento'],
    faq: [
      { q: '¿Con qué frecuencia nos reunimos?', a: 'Reuniones semanales o quincenales según el plan elegido, más disponibilidad continua para consultas urgentes.' },
      { q: '¿Incluye representación legal?', a: 'Incluye asesoría preventiva. La representación en procesos judiciales se cotiza por separado.' },
      { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí, con 30 días de preaviso. Sin penalidades.' },
    ],
  },
  {
    id: 'essentials',
    name: 'Corporative Essencials',
    slug: 'essentials',
    category: 'empresa',
    idealFor: 'PYMES iniciando su formalización',
    description: 'El punto de partida para empresas que quieren hacer las cosas bien desde el principio. Contratos, reglamento interno, políticas básicas y cumplimiento mínimo viable.',
    includes: ['Contratos de trabajo ajustados a ley', 'Reglamento interno de trabajo', 'Política de vacaciones y permisos', 'Checklist de cumplimiento legal'],
    faq: [
      { q: '¿Cuánto tarda la implementación?', a: 'Entre 2 y 4 semanas según la complejidad de tu operación.' },
      { q: '¿Es un pago único?', a: 'Sí, es un proyecto con entregables definidos. Sin mensualidades.' },
      { q: '¿Incluye capacitación al equipo?', a: 'Incluye una sesión de inducción para que tu equipo entienda las nuevas políticas.' },
    ],
  },
  {
    id: 'reclutamiento',
    name: 'Reclutamiento y Selección',
    slug: 'reclutamiento',
    category: 'empresa',
    idealFor: 'Empresas en etapa de crecimiento',
    description: 'Encontramos al candidato correcto para tu cultura, no solo para el puesto. Proceso completo: desde el perfil ideal hasta la contratación.',
    includes: ['Levantamiento de perfil', 'Publicación y búsqueda activa', 'Filtrado y entrevistas', 'Evaluación de competencias', 'Acompañamiento en onboarding'],
    faq: [
      { q: '¿Cuánto tarda el proceso?', a: 'Entre 3 y 6 semanas dependiendo del nivel del puesto.' },
      { q: '¿Qué pasa si el candidato no funciona?', a: 'Ofrecemos garantía de reposición dentro de los primeros 90 días.' },
      { q: '¿Manejan posiciones ejecutivas?', a: 'Sí, tenemos experiencia en búsqueda ejecutiva y headhunting.' },
    ],
  },
  {
    id: 'risk-compliance',
    name: 'Risk & Compliance',
    slug: 'risk-compliance',
    category: 'empresa',
    idealFor: 'Empresas con exposición legal',
    description: 'Auditoría y blindaje legal laboral. Identificamos riesgos, corregimos incumplimientos y te preparamos para inspecciones del Ministerio de Trabajo.',
    includes: ['Auditoría de cumplimiento laboral', 'Corrección de contratos', 'Protocolo de amonestaciones', 'Preparación para inspecciones', 'Plan de mitigación de riesgos'],
    faq: [
      { q: '¿Cada cuánto se recomienda una auditoría?', a: 'Al menos una vez al año, o cuando haya cambios significativos en la operación.' },
      { q: '¿Nos representan ante el Ministerio de Trabajo?', a: 'Podemos acompañarles en inspecciones y preparar toda la documentación necesaria.' },
      { q: '¿Es confidencial?', a: 'Absolutamente. Firmamos NDA antes de iniciar cualquier proceso.' },
    ],
  },
  {
    id: 'add-grow',
    name: 'ADD Grow',
    slug: 'add-grow',
    category: 'candidato',
    idealFor: 'Profesionales con 2+ años de experiencia',
    description: 'Programa de aceleración profesional. Optimizamos tu perfil, preparamos tu estrategia de búsqueda y te conectamos con oportunidades reales en Costa Rica.',
    includes: ['Optimización de CV y LinkedIn', 'Estrategia de búsqueda personalizada', 'Preparación para entrevistas', 'Negociación salarial', 'Acceso a red de vacantes'],
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
    idealFor: 'Estudiantes y recién graduados',
    description: 'Tu primer paso al mundo laboral. Te ayudamos a construir tu perfil profesional desde cero y a conseguir tu primera oportunidad.',
    includes: ['Creación de CV profesional', 'Perfil de LinkedIn desde cero', 'Taller de entrevistas', 'Orientación vocacional', 'Acceso a vacantes junior'],
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
    idealFor: 'Candidatos en proceso activo',
    description: 'Sesiones individuales de práctica con feedback profesional. Simulamos entrevistas reales del mercado costarricense para que llegues preparado.',
    includes: ['Simulación de entrevista (45 min)', 'Feedback escrito detallado', 'Tips personalizados', 'Grabación de la sesión'],
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
