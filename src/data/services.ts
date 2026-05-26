export interface PriceVariant {
  id: string;
  label: string;
  priceCRC: number;
}

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
  /** Fixed price in CRC for B2C services. B2B services remain quote-based. */
  priceCRC?: number;
  /** Optional pricing variants (e.g. "1 sesión / 2 sesiones / 3 sesiones"). */
  priceVariants?: PriceVariant[];
  /** If set, after purchase the user is sent to this form URL instead of the booking flow. */
  postPurchaseFormUrl?: string;
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    id: 'reclutamiento',
    name: 'Atracción y Selección de Talento',
    slug: 'reclutamiento',
    category: 'empresa',
    icon: 'users',
    idealFor: 'EMPRESAS QUE BUSCAN INCORPORAR AL TALENTO CORRECTO',
    description: 'Acompañamos a tu organización en la identificación y selección del talento que realmente necesitas, con un proceso estructurado, objetivo y de alto estándar, sin sobrecargar a tu equipo interno. Modalidad 100% virtual.',
    includes: [
      'Sesión inicial',
      'Ayuda con el descriptivo de puesto',
      'Diseño de proceso de entrevistas estructurado',
      'Búsqueda activa incluyendo headhunting',
      'Filtro y evaluación de candidatos',
      'Entrega de shortlist: Opción 1, 2 y 3 con datos completos de cada perfil',
      'Guía de entrevistas para que el líder de la posición pueda entrevistar de la mejor manera',
      'Entrega del banco de datos de todos los perfiles evaluados',
    ],
    showInCards: true,
    faq: [
      { q: '¿Cuánto tarda el proceso?', a: 'Entre 3 y 6 semanas dependiendo del nivel del puesto.' },
      { q: '¿Qué pasa si el candidato no funciona?', a: 'Ofrecemos garantía de reposición dentro de los primeros 90 días.' },
      { q: '¿Manejan posiciones ejecutivas?', a: 'Sí, tenemos experiencia en búsqueda ejecutiva y headhunting.' },
    ],
  },
  {
    id: 'strategic-partner',
    name: 'Strategic Partner (HRBP)',
    slug: 'strategic-partner',
    category: 'empresa',
    icon: 'building',
    idealFor: 'Empresas en crecimiento que necesitan un aliado estratégico de RR.HH. sin contratar un equipo interno',
    description: 'Tu aliado estratégico de RR.HH. para gestionar cultura, liderazgo y cumplimiento legal de forma profesional y continua. Modalidad virtual + un día presencial mensual en instalaciones. Inversión: $1,800 – $3,000 / mes.',
    includes: [
      'Diagnóstico inicial de clima organizacional',
      'Mapeo de necesidades',
      'Acompañamiento estratégico mensual en gestión de personas',
      'Visita presencial mensual (1 día) a las instalaciones',
      'Gestión y fortalecimiento de cultura organizacional',
      'Asesoría en liderazgo y desarrollo de equipos',
      'Prevención y gestión de riesgos laborales-legales',
      'Punto de contacto ante conflictos laborales (consultas ilimitadas)',
      'Entregables mensuales con indicadores personalizados',
      'Plan de acción según necesidades mapeadas',
    ],
    showInCards: true,
    faq: [
      { q: '¿Con qué frecuencia nos reunimos?', a: 'Reuniones semanales o quincenales según el plan elegido, más disponibilidad continua para consultas urgentes.' },
      { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí, con 30 días de preaviso. Sin penalidades.' },
      { q: '¿Incluye representación legal?', a: 'Incluye asesoría preventiva. La representación en procesos judiciales se cotiza por separado.' },
    ],
  },
  {
    id: 'risk-compliance',
    name: 'Auditoría y Cumplimiento Legal',
    slug: 'risk-compliance',
    category: 'empresa',
    icon: 'shield',
    idealFor: 'Empresas que quieren blindarse ante riesgos laborales y asegurar que su documentación esté en orden',
    description: 'Blindamos tu empresa ante riesgos laborales, aseguramos que tu documentación esté en orden y entregamos un plan claro para corregir lo que no cumple. Modalidad virtual con opción de visita a la empresa si se requiere. No incluye creación de nuevos documentos, políticas o machotes adicionales (servicio aparte).',
    includes: [
      'Auditoría completa de contratos laborales vigentes',
      'Revisión de protocolos internos y gestión de conflictos',
      'Identificación de brechas y riesgos legales-laborales',
      'Informe final con plan de acción detallado',
      'Corrección de documentos auditados',
      'Recomendaciones de cumplimiento normativo',
    ],
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
    idealFor: 'Pequeñas empresas que están comenzando a consolidarse y no cuentan con respaldo de RR.HH.',
    description: 'Para patronos que quieren operar con respaldo legal desde el inicio. Modalidad 100% virtual. Inversión: $250 – $400 / mes.',
    includes: [
      'Asesoría al patrono en temas laborales y legales',
      'Punto de contacto ante conflictos entre empleados',
      'Kit de documentos esenciales: machotes, contratos y plantillas laborales',
      'Orientación en cumplimiento normativo básico',
      'Soporte virtual continuo durante el mes',
      '1 sesión virtual de seguimiento de 1 hora semanal',
    ],
    showInCards: true,
    faq: [
      { q: '¿Cuánto tarda la implementación?', a: 'Entre 2 y 4 semanas según la complejidad de tu operación.' },
      { q: '¿Es un pago único?', a: 'Sí, es un proyecto con entregables definidos. Sin mensualidades.' },
      { q: '¿Incluye capacitación al equipo?', a: 'Incluye una sesión de inducción para que tu equipo entienda las nuevas políticas.' },
    ],
  },
  {
    id: 'cv-rewrite',
    name: 'Modificación de CV',
    slug: 'cv-rewrite',
    category: 'candidato',
    icon: 'file-text',
    idealFor: 'Profesionales que buscan pasar filtros ATS',
    description: 'Damos a tu CV el formato válido para sistemas ATS, asegurando que tu perfil sea legible por los filtros automáticos de las empresas.',
    includes: [
      'Optimización de tu CV en un formato compatible con filtros ATS',
      'Corrección y mejora estratégica del contenido',
      'Entrega en formato Word para que puedas editarlo en el futuro',
    ],
    showInCards: true,
    priceCRC: 8000,
    postPurchaseFormUrl: 'https://forms.gle/Vo6VDxgqk2q5BFyj7',
    faq: [
      { q: '¿Qué es un formato ATS?', a: 'Es la estructura que utilizan los sistemas automatizados de reclutamiento para leer y filtrar CVs antes de que un humano los revise.' },
      { q: '¿En cuánto tiempo recibo mi CV?', a: 'Entre 3 y 5 días hábiles después de recibir tu información actual.' },
      { q: '¿Incluye rediseño visual?', a: 'No. El objetivo es priorizar la legibilidad por sistemas ATS, por eso usamos formatos limpios y estandarizados.' },
    ],
  },
  {
    id: 'first-step',
    name: 'ADD Step Up',
    slug: 'first-step',
    category: 'candidato',
    icon: 'rocket',
    idealFor: 'IDEAL PARA: ESTUDIANTES, PROFESIONALES EN TRANSICIÓN Y QUIENES QUIEREN MEJORAR SU EMPLEABILIDAD',
    description: 'Ya sea que estés buscando tu primer empleo o quieras mejorar cómo te presentas al mercado laboral, este paquete te da las herramientas y la estrategia para destacar desde tu CV hasta tu presencia en LinkedIn. En una sola sesión aprenderás todo esto. ',
    includes: [
      'Diagnóstico inicial para conocer a profundidad tu experiencia, fortalezas y objetivos profesionales',
      'Creación de CV profesional en formato Harvard, optimizado para filtros ATS',
      'Te enseño cómo adaptar tu CV estratégicamente utilizando herramientas de AI',
      'Recomendación de páginas y plataformas de reclutamiento según tu perfil profesional',
      'Preparación para prescreenings: cómo responder de forma estratégica y generar una excelente primera impresión',
      'Guía sobre cómo optimizar tu LinkedIn para atraer más oportunidades laborales',
    ],
    showInCards: true,
    priceCRC: 18000,
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
    description: 'Sesiones individuales de práctica con feedback profesional. Nuestras sesiones individuales replican los estándares del mercado para que tu desempeño hable por sí solo.',
    includes: ['Simulación de entrevista (45 min)', 'Feedback escrito detallado', 'Tips personalizados', 'Grabación de la sesión'],
    showInCards: true,
    priceVariants: [
      { id: 'sim-1', label: '1 sesión', priceCRC: 10000 },
      { id: 'sim-2', label: '2 sesiones', priceCRC: 15000 },
      { id: 'sim-3', label: '3 sesiones', priceCRC: 20000 },
    ],
    faq: [
      { q: '¿Cuántas sesiones necesito?', a: 'Recomendamos al menos 2, pero una sola sesión ya marca diferencia.' },
      { q: '¿Las hacen para puestos específicos?', a: 'Sí, adaptamos la simulación al tipo de puesto al que estás aplicando.' },
      { q: '¿Es individual o grupal?', a: '100% individual para máximo aprovechamiento.' },
    ],
  },
  {
    id: 'add-grow',
    name: 'ADD Grow',
    slug: 'add-grow',
    category: 'candidato',
    icon: 'trending-up',
    idealFor: 'Profesionales en transición o crecimiento',
    description: 'Programa integral de aceleración profesional. Te acompañamos en cada etapa de tu desarrollo: desde diagnóstico hasta colocación en una nueva oportunidad.',
    includes: [
      'Diagnóstico para analizar a profundidad tu experiencia, metas y enfoque profesional',
      'Creación de CV en formato Harvard optimizado para ATS y procesos de reclutamiento actuales',
      'Te enseño cómo adaptar tu CV estratégicamente utilizando herramientas de AI',
      'Recomendación de páginas de empleo y estrategias de búsqueda alineadas a tu perfil',
      'Preparación para entrevistas y prescreenings: cómo responder de forma estratégica y generar una excelente primera impresión',
      'Explicación práctica de la metodología STAR para responder preguntas conductuales con seguridad',
      'Apoyo para construir tu storytelling profesional y comunicar mejor tu experiencia',
      'Guía de entrevistas en formato entregable con preguntas frecuentes, estructura de respuestas y ejercicios prácticos',
      'Información para optimizar tu LinkedIn y fortalecer tu marca profesional',
      'Seguimiento posterior a la sesión para resolver dudas y acompañarte en el proceso',
    ],
    showInCards: true,
    priceCRC: 25000,
    faq: [
      { q: '¿Cuánto dura el programa?', a: '3 meses de acompañamiento intensivo con seguimiento posterior.' },
      { q: '¿Es solo para ejecutivos?', a: 'No, está diseñado para profesionales en cualquier etapa que busquen crecer.' },
      { q: '¿Incluye evaluaciones?', a: 'Sí, incluye assessment de competencias y plan de desarrollo.' },
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
    name: 'Learn & Save ',
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

import blogContrato from '@/assets/blog-contrato-trabajo.jpg';
import blogCultura from '@/assets/blog-cultura-organizacional.jpg';
import blogLinkedin from '@/assets/blog-linkedin.jpg';
import blogCompliance from '@/assets/blog-compliance.jpg';
import blogMercado from '@/assets/blog-mercado-laboral.jpg';
import blogEntrevista from '@/assets/blog-entrevista.jpg';

export const blogPosts = [
  { id: 1, tag: 'Derecho Laboral', title: '¿Qué debe incluir un contrato de trabajo en Costa Rica?', date: '12 Mar 2025', excerpt: 'Un contrato de trabajo bien redactado es la primera línea de defensa legal para cualquier empresa. En Costa Rica, el Código de Trabajo establece requisitos mínimos que todo empleador debe conocer...', slug: 'contrato-trabajo-costa-rica', image: blogContrato },
  { id: 2, tag: 'Recursos Humanos', title: 'Cómo construir una cultura organizacional sin presupuesto', date: '28 Feb 2025', excerpt: 'La cultura no se compra, se construye. Para PYMES costarricenses con recursos limitados, existen estrategias prácticas que no requieren grandes inversiones pero generan impacto real...', slug: 'cultura-organizacional-pyme', image: blogCultura },
  { id: 3, tag: 'Carrera Profesional', title: '5 errores que cometen los ticos en LinkedIn', date: '15 Feb 2025', excerpt: 'LinkedIn es la herramienta más poderosa para profesionales en Costa Rica, pero la mayoría la usa mal. Desde fotos inadecuadas hasta descripciones genéricas, estos son los errores más comunes...', slug: 'errores-linkedin-costa-rica', image: blogLinkedin },
  { id: 4, tag: 'Compliance', title: 'Inspecciones del Ministerio de Trabajo: guía de preparación', date: '02 Feb 2025', excerpt: 'Una inspección del Ministerio de Trabajo no tiene por qué ser motivo de pánico. Con la preparación adecuada, tu empresa puede enfrentar cualquier revisión con confianza...', slug: 'inspecciones-ministerio-trabajo', image: blogCompliance },
  { id: 5, tag: 'Tendencias', title: 'El mercado laboral costarricense en 2025: qué esperar', date: '20 Ene 2025', excerpt: 'El panorama laboral en Costa Rica está cambiando rápidamente. Desde el auge del trabajo remoto hasta nuevas regulaciones, analizamos las tendencias que definirán el 2025...', slug: 'mercado-laboral-2025', image: blogMercado },
  { id: 6, tag: 'Reclutamiento', title: 'Cómo identificar talento genuino en una entrevista', date: '08 Ene 2025', excerpt: 'Las entrevistas tradicionales fallan en predecir el desempeño real. Te compartimos técnicas basadas en evidencia para evaluar candidatos de manera más efectiva...', slug: 'identificar-talento-entrevista', image: blogEntrevista },
];
