import { Lang } from './constants';

export interface Translations {
  // Navbar
  nav: {
    forCompanies: string;
    forCandidates: string;
    digitalResources: string;
    blog: string;
    aboutAdd: string;
    contactUs: string;
  };

  // Language banner
  langBanner: {
    message: string;
    switchBtn: string;
    dismiss: string;
  };

  // Hero
  hero: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    socialProof: string;
  };

  // About section
  about: {
    eyebrow: string;
    heading: string;
    body: string;
    ctaVacancies: string;
    ctaRecruit: string;
  };

  // Services section
  services: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    b2bEyebrow: string;
    b2bTitle: string;
    b2bSubtitle: string;
    b2cEyebrow: string;
    b2cTitle: string;
    b2cSubtitle: string;
    requestInfo: string;
  };

  // Service names & descriptions (keyed by service id)
  serviceItems: Record<string, { name: string; description: string; includes: string[] }>;

  // Stats / social proof
  stats: {
    companies: string;
    placements: string;
    experience: string;
    testimonials: Array<{
      quote: string;
      name: string;
      title: string;
      company: string;
    }>;
  };

  // Cotizador CTA
  cotizadorCta: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: string;
  };

  // Kit PYME / Digital products
  kitPyme: {
    eyebrow: string;
    heading: string;
    obtain: string;
  };

  // Digital product names
  digitalProducts: Record<string, { name: string; audience: string; description: string }>;

  // Blog preview
  blogPreview: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    readMore: string;
  };

  // CTA Final
  ctaFinal: {
    heading: string;
    body: string;
    cta: string;
  };

  // Footer
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    copyright: string;
    currencyNote: string;
    links: Array<{ label: string; to: string }>;
  };

  // Floating CTA / Contact form
  floatingCta: {
    buttonLabel: string;
    title: string;
    subtitle: string;
    labels: {
      name: string;
      company: string;
      email: string;
      serviceOfInterest: string;
      preferredCurrency: string;
      message: string;
    };
    placeholders: {
      name: string;
      company: string;
      email: string;
      message: string;
    };
    serviceOptions: Array<{ value: string; label: string }>;
    selectPlaceholder: string;
    submit: string;
    successTitle: string;
    successMessage: string;
    errors: {
      nameRequired: string;
      nameMax: string;
      emailRequired: string;
      emailInvalid: string;
      messageMax: string;
    };
  };

  // Quote modal
  quoteModal: {
    title: string;
    serviceLabel: string;
    labels: {
      fullName: string;
      email: string;
      company: string;
      size: string;
      need: string;
      urgency: string;
    };
    placeholders: {
      name: string;
      email: string;
      company: string;
    };
    sizes: string[];
    needs: string[];
    urgencies: string[];
    submit: string;
    successTitle: string;
    successMessage: string;
  };

  // About drawer
  aboutDrawer: {
    eyebrow: string;
    heading: string;
    body1: string;
    body2: string;
    values: Array<{ label: string; desc: string }>;
    cta: string;
  };

  // Mega menu CTA labels
  megaCta: {
    cotizador: string;
    vacantes: string;
  };

  // Mega menu item descriptions
  megaDescriptions: Record<string, string>;
}

const es: Translations = {
  nav: {
    forCompanies: 'SOY EMPRESA',
    forCandidates: 'SOY CANDIDATO',
    digitalResources: 'RECURSOS DIGITALES',
    blog: 'Blog',
    aboutAdd: 'Sobre ADD',
    contactUs: 'AGENDA UNA CITA',
  },

  langBanner: {
    message: 'This site is also available in English',
    switchBtn: 'Switch to English',
    dismiss: '✕',
  },

  hero: {
    eyebrow: '· TALENTO · ESTRATEGIA · PROPÓSITO ·',
    headline: 'Impulsamos carreras. Transformamos organizaciones. ',
    subtitle: 'Detrás de cada gran equipo hay una estrategia de personas. Detrás de cada gran carrera, alguien que supo cómo presentarse. En ADD, somos ese respaldo para ambos.',
    ctaPrimary: 'Soy Empresa',
    ctaSecondary: 'Soy Candidato',
    socialProof: '+50 clientes confían en ADD ',
  },

  about: {
    eyebrow: '· Nuestro enfoque',
    heading: 'Criterio experto, soluciones a la medida.',
    body: 'Cada empresa y cada profesional tiene una realidad diferente. No ofrecemos paquetes genéricos: diseñamos acompañamientos que se ajustan a tu contexto, tu industria y tu legislación local.',
    ctaVacancies: 'Ver vacantes',
    ctaRecruit: 'Quiero reclutar',
  },

  services: {
    eyebrow: '· NUESTROS SERVICIOS ',
    heading: 'Acompañamiento experto en cada etapa',
    subtitle: 'Brindamos soluciones reales a profesionales que quieren avanzar y a empresas que quieren crecer. Siempre boutique, siempre a la medida.',
    b2bEyebrow: '· DIVISIÓN CORPORATIVA',
    b2bTitle: 'B2B — Soy Empresa',
    b2bSubtitle: 'Desde la documentación legal hasta la cultura organizacional — te acompañamos en construir un área de RR.HH. sólida y humana.',
    b2cEyebrow: '· DIVISIÓN DE CARRERA',
    b2cTitle: 'B2C — Soy Candidato',
    b2cSubtitle: 'Herramientas, estrategia y práctica real. Te preparamos para destacar en cada etapa del proceso.',
    requestInfo: 'Solicitar información',
  },

  serviceItems: {
    'strategic-partner': {
      name: 'Strategic Partner (HRBP)',
      description: 'Nos convertimos en tu departamento de RR.HH. externo. Gestionamos todo: desde contratos hasta cultura organizacional y cumplimiento legal.',
      includes: ['HR Business Partner', 'Cultura y clima organizacional', 'Prevención legal', 'Gestión de talento'],
    },
    'risk-compliance': {
      name: 'Auditoría & Cumplimiento',
      description: 'Auditoría legal integral y cumplimiento normativo laboral. Identificamos riesgos, corregimos incumplimientos y te preparamos para inspecciones.',
      includes: ['Auditoría de procesos', 'Compliance laboral', 'Mitigación de riesgos', 'Informe ejecutivo'],
    },
    essentials: {
      name: 'Corporative Essentials',
      description: 'Gestión operativa básica de recursos humanos para empresas en crecimiento.',
      includes: ['Creación de políticas', 'Asesoría laboral', 'Creación de documento', 'Soporte continuo'],
    },
    outplacement: {
      name: 'Modificación de CV',
      description: 'Damos a tu CV el formato válido para sistemas ATS, asegurando que tu perfil sea legible por los filtros automáticos de las empresas.',
      includes: ['Reestructuración de CV en formato ATS', 'Optimización de palabras clave', 'Limpieza de formato y diseño', 'Entrega en formato editable'],
    },
    'first-step': {
      name: 'ADD Step Up',
      description: 'Ya sea que estés buscando tu primer empleo o quieras mejorar cómo te presentas al mercado laboral, este paquete te da las herramientas y la estrategia para destacar desde tu CV hasta tu presencia en LinkedIn. En una sola sesión aprenderás todo esto. ',
      includes: ['Diseño y optimización de CV con formato ATS', 'Perfil de LinkedIn desde cero', 'Guía para poder pasar la primer entrevista con éxito ', 'Orientación vocacional', 'Acceso a vacantes junior'],
    },
    simulaciones: {
      name: 'Simulaciones de Entrevista',
      description: 'Sesiones individuales de práctica con feedback profesional. Simulamos entrevistas reales del mercado costarricense.',
      includes: ['Simulación de entrevista (45 min)', 'Feedback escrito detallado', 'Tips personalizados', 'Grabación de la sesión'],
    },
    'add-grow': {
      name: 'ADD Grow',
      description: 'Programa integral de aceleración profesional. Te acompañamos en cada etapa: desde diagnóstico hasta colocación en una nueva oportunidad.',
      includes: ['Diagnóstico profesional 360°', 'Plan de carrera personalizado', 'Mentoría 1:1', 'Networking estratégico', 'Acceso a vacantes exclusivas'],
    },
    reclutamiento: {
      name: 'Reclutamiento & Selección',
      description: 'Encontramos al candidato correcto para tu cultura, no solo para el puesto. Proceso completo: desde el perfil ideal hasta la contratación.',
      includes: ['Levantamiento de perfil', 'Publicación y búsqueda activa', 'Filtrado y entrevistas', 'Evaluación de competencias', 'Acompañamiento en onboarding'],
    },
    'consultoria-legal': {
      name: 'Consultoría Legal Laboral',
      description: 'Asesoría legal laboral preventiva y correctiva. Blindamos tu empresa ante riesgos laborales.',
      includes: ['Asesoría legal laboral continua', 'Corrección de contratos', 'Protocolo de amonestaciones', 'Preparación para inspecciones'],
    },
    capacitacion: {
      name: 'Capacitación & Desarrollo',
      description: 'Programas de formación y desarrollo organizacional.',
      includes: ['Contratos de trabajo ajustados a ley', 'Reglamento interno de trabajo', 'Política de vacaciones y permisos', 'Checklist de cumplimiento legal'],
    },
  },

  stats: {
    companies: 'AÑOS DE EXPERIENCIA',
    placements: 'CLIENTES',
    experience: 'PROPÓSITO CLARO',
    testimonials: [
      {
        quote: 'ADD transformó nuestra gestión de talento. Pasamos de improvisar a tener procesos claros y legales.',
        name: 'María Fernández',
        title: 'Gerente de Operaciones',
        company: 'TechCR Solutions',
      },
      {
        quote: 'Gracias al programa ADD Grow, conseguí una posición que realmente se alinea con mi perfil profesional.',
        name: 'Carlos Rojas',
        title: 'Analista Senior',
        company: 'Grupo Financiero Nacional',
      },
    ],
  },

  cotizadorCta: {
    eyebrow: '· ¿No sabes por dónde empezar?',
    heading: 'Cada situación es diferente. Tu solución también.',
    body: 'Responde unas preguntas rápidas y te orientamos hacia el servicio que mejor se adapta a lo que necesitas',
    cta: 'ENCONTRAR MI SERVICIO→',
  },

  kitPyme: {
    eyebrow: '· RECURSOS DIGITALES',
    heading: 'Todo lo que necesitas, listo para usar.',
    obtain: 'Obtener →',
  },

  digitalProducts: {
    'hr-toolkit': {
      name: 'HR Toolkit',
      audience: 'Para PYMES',
      description: 'Documentación laboral lista para implementar. Diseñada para PYMEs que quieren hacer las cosas bien desde el inicio.',
    },
    'career-blueprint': {
      name: 'Learn & Save',
      audience: 'PARA EMPRENDEDORES O PARTICULARES',
      description: 'De los fundamentos al criterio experto. Formación en liderazgo y RR.HH. para quienes quieren entender y aplicar.',
    },
  },

  blogPreview: {
    eyebrow: '· Recursos Editoriales',
    heading: 'Blog',
    subtitle: 'Artículos sobre el mercado laboral y derecho laboral costarricense.',
    readMore: 'Leer →',
  },

  ctaFinal: {
    heading: '¿Listo para transformar talento en tu empresa?',
    body: 'Agenda una consulta gratuita y descubre cómo ADD puede ayudarte con tu gestión de talento.',
    cta: 'Agendar consulta gratuita',
  },

  footer: {
    tagline: 'Consultoría boutique de RR.HH. y Derecho Laboral',
    navTitle: 'Navegación',
    contactTitle: 'Contacto',
    copyright: '© 2025 ADD · Costa Rica · Política de privacidad',
    currencyNote: 'Precios en CRC son referenciales según tipo de cambio del día',
    links: [
      { label: 'Soy Empresa', to: '/empresa' },
      { label: 'Soy Candidato', to: '/candidato' },
      { label: 'Recursos Digitales', to: '/recursos/hr-toolkit' },
      { label: 'Blog', to: '/recursos/blog' },
      { label: 'Sobre ADD', to: '/contacto' },
    ],
  },

  floatingCta: {
    buttonLabel: 'ENVÍA TU CONSULTA',
    title: 'ENVÍA TU CONSULTA',
    subtitle: 'Déjanos tus datos y se enviarán a nuestro correo. Te contactamos en menos de 24 horas.',
    labels: {
      name: 'Nombre',
      company: 'Empresa',
      email: 'Correo electrónico',
      serviceOfInterest: 'Servicio de interés',
      preferredCurrency: 'Moneda preferida para cotización',
      message: 'Mensaje',
    },
    placeholders: {
      name: 'Tu nombre',
      company: 'Nombre de tu empresa',
      email: 'correo@ejemplo.com',
      message: '¿Cómo podemos ayudarte?',
    },
    serviceOptions: [
      { value: 'strategic-partner', label: 'Strategic Partner (HRBP)' },
      { value: 'essentials', label: 'Corporative Essentials' },
      { value: 'reclutamiento', label: 'Reclutamiento' },
      { value: 'auditoria', label: 'Auditoría y Cumplimiento' },
      { value: 'grow', label: 'ADD Grow' },
      { value: 'first-step', label: 'ADD Step Up' },
      { value: 'simulaciones', label: 'Simulaciones' },
      { value: 'otro', label: 'Otro' },
    ],
    selectPlaceholder: 'Seleccionar...',
    submit: 'Enviar consulta',
    successTitle: '¡Listo!',
    successMessage: 'Te contactaremos en menos de 24 horas.',
    errors: {
      nameRequired: 'El nombre es obligatorio',
      nameMax: 'Máximo 100 caracteres',
      emailRequired: 'El correo es obligatorio',
      emailInvalid: 'Correo inválido',
      messageMax: 'Máximo 1000 caracteres',
    },
  },

  quoteModal: {
    title: 'Cuéntanos sobre tu situación',
    serviceLabel: 'Servicio',
    labels: {
      fullName: 'Nombre completo',
      email: 'Correo electrónico',
      company: 'Empresa (opcional)',
      size: 'Tamaño / Situación',
      need: 'Necesidad principal',
      urgency: 'Urgencia',
    },
    placeholders: {
      name: 'Tu nombre',
      email: 'correo@ejemplo.com',
      company: 'Nombre de tu empresa',
    },
    sizes: ['1–5', '6–20', '21–80', '+80', 'Soy candidato'],
    needs: ['RR.HH.', 'Legal', 'Reclutamiento', 'Carrera', 'Otro'],
    urgencies: ['Esta semana', 'Este mes', '1–3 meses', 'Solo explorando'],
    submit: 'Enviar consulta',
    successTitle: '¡Listo!',
    successMessage: 'Te contactaremos en menos de 24 horas con una propuesta personalizada.',
  },

  aboutDrawer: {
    eyebrow: '· Sobre ADD',
    heading: 'Una firma construida sobre criterio, no sobre volumen.',
    body1: 'Somos una consultoría boutique especializada en Recursos Humanos y Derecho Laboral en Costa Rica. No ofrecemos soluciones genéricas: cada empresa y cada profesional recibe un acompañamiento diseñado para su realidad específica.',
    body2: 'Nuestro equipo combina experiencia legal con visión estratégica de negocio, siempre con un enfoque humano y confidencial.',
    values: [
      { label: 'Confidencialidad', desc: 'Protección total de información sensible' },
      { label: 'Experticia local', desc: 'Conocimiento profundo del mercado tico' },
      { label: 'Enfoque humano', desc: 'Las personas primero, siempre' },
      { label: 'Legislación CR', desc: 'Dominio del marco legal vigente' },
    ],
    cta: 'Agenda una conversación →',
  },

  megaCta: {
    cotizador: 'Ir al Cotizador →',
    vacantes: 'Ver Vacantes →',
  },

  megaDescriptions: {
    'strategic-partner': 'Tu HRBP externo',
    essentials: 'Formalización y cumplimiento básico',
    reclutamiento: 'Encontramos al talento ideal',
    'risk-compliance': 'Auditoría y blindaje legal',
    'add-grow': 'Aceleración profesional',
    'first-step': 'Herramientas y estrategia para tu primer empleo o transición laboral',
    simulaciones: 'Práctica de entrevistas',
    'hr-toolkit': 'Machotes y guías para PYMES',
    'career-blueprint': 'Curso de estrategia laboral',
    'insider-club': 'Comunidad exclusiva',
  },
};

const en: Translations = {
  nav: {
    forCompanies: 'FOR COMPANIES',
    forCandidates: 'FOR CANDIDATES',
    digitalResources: 'DIGITAL RESOURCES',
    blog: 'Blog',
    aboutAdd: 'About ADD',
    contactUs: 'Contact Us',
  },

  langBanner: {
    message: 'Este sitio también está disponible en español',
    switchBtn: 'Cambiar a español',
    dismiss: '✕',
  },

  hero: {
    eyebrow: '· Boutique Consulting · Costa Rica',
    headline: 'Talent and labor advisory, in expert hands.',
    subtitle: 'We support Costa Rican companies and professionals with tailored HR and labor law solutions.',
    ctaPrimary: 'For Companies',
    ctaSecondary: 'For Candidates',
    socialProof: '50+ companies trust ADD · Costa Rica',
  },

  about: {
    eyebrow: '· Our Approach',
    heading: 'Expert judgment, tailored solutions.',
    body: 'Every company and every professional has a different reality. We don\'t offer generic packages: we design support that fits your context, your industry, and your local legislation.',
    ctaVacancies: 'View openings',
    ctaRecruit: 'I want to recruit',
  },

  services: {
    eyebrow: '· ADD SERVICES',
    heading: 'What we do',
    subtitle: 'Comprehensive HR and labor law solutions for companies and professionals in Costa Rica.',
    b2bEyebrow: '· CORPORATE DIVISION',
    b2bTitle: 'B2B — For Companies',
    b2bSubtitle: 'Comprehensive solutions for Costa Rican businesses.',
    b2cEyebrow: '· CAREER DIVISION',
    b2cTitle: 'B2C — For Candidates',
    b2cSubtitle: 'Support for professionals and candidates.',
    requestInfo: 'Request information',
  },

  serviceItems: {
    'strategic-partner': {
      name: 'Strategic Partner (HRBP)',
      description: 'We become your external HR department. We manage everything: from contracts to organizational culture and legal compliance.',
      includes: ['HR Business Partner', 'Culture & organizational climate', 'Legal prevention', 'Talent management'],
    },
    'risk-compliance': {
      name: 'Audit & Compliance',
      description: 'Comprehensive legal audit and labor regulatory compliance. We identify risks, fix non-compliance, and prepare you for inspections.',
      includes: ['Process audit', 'Labor compliance', 'Risk mitigation', 'Executive report'],
    },
    essentials: {
      name: 'Corporative Essentials',
      description: 'Basic HR operational management for growing companies.',
      includes: ['Policy creation', 'Labor advisory', 'Document creation', 'Ongoing support'],
    },
    outplacement: {
      name: 'CV Formatting',
      description: 'We format your CV to be valid for ATS systems, ensuring your profile is readable by companies\' automated filters.',
      includes: ['ATS-format CV restructuring', 'Keyword optimization', 'Format and design cleanup', 'Editable file delivery'],
    },
    'first-step': {
      name: 'ADD Step Up',
      description: 'Whether you are looking for your first job or want to improve how you present yourself to the job market, this package gives you the tools and strategy to stand out from your CV to your LinkedIn presence. In just one session you will learn all this.',
      includes: ['ATS-format CV design and optimization', 'LinkedIn profile from scratch', 'Guide to passing your first interview successfully', 'Career guidance', 'Access to junior openings'],
    },
    simulaciones: {
      name: 'Interview Simulations',
      description: 'Individual practice sessions with professional feedback. We simulate real interviews from the Costa Rican market.',
      includes: ['Interview simulation (45 min)', 'Detailed written feedback', 'Personalized tips', 'Session recording'],
    },
    'add-grow': {
      name: 'ADD Grow',
      description: 'Comprehensive professional acceleration program. We support you at every stage: from diagnosis to placement in a new opportunity.',
      includes: ['360° professional diagnosis', 'Personalized career plan', '1:1 mentorship', 'Strategic networking', 'Access to exclusive openings'],
    },
    reclutamiento: {
      name: 'Recruitment & Selection',
      description: 'We find the right candidate for your culture, not just for the position. Complete process: from the ideal profile to hiring.',
      includes: ['Profile assessment', 'Posting & active search', 'Screening & interviews', 'Competency evaluation', 'Onboarding support'],
    },
    'consultoria-legal': {
      name: 'Labor Legal Advisory',
      description: 'Preventive and corrective labor legal advisory. We shield your company from labor risks.',
      includes: ['Ongoing labor legal advisory', 'Contract correction', 'Warning protocol', 'Inspection preparation'],
    },
    capacitacion: {
      name: 'Training & Development',
      description: 'Training and organizational development programs.',
      includes: ['Law-compliant employment contracts', 'Internal work regulations', 'Vacation & leave policy', 'Legal compliance checklist'],
    },
  },

  stats: {
    companies: 'Companies',
    placements: 'Placements',
    experience: 'Years of experience',
    testimonials: [
      {
        quote: 'ADD transformed our talent management. We went from improvising to having clear and legal processes.',
        name: 'María Fernández',
        title: 'Operations Manager',
        company: 'TechCR Solutions',
      },
      {
        quote: 'Thanks to the ADD Grow program, I landed a position that truly aligns with my professional profile.',
        name: 'Carlos Rojas',
        title: 'Senior Analyst',
        company: 'Grupo Financiero Nacional',
      },
    ],
  },

  cotizadorCta: {
    eyebrow: "· Don't know where to start?",
    heading: 'We help you find the ideal service.',
    body: 'Answer 4 quick questions and receive a personalized recommendation based on your situation.',
    cta: 'Go to quoter →',
  },

  kitPyme: {
    eyebrow: '· Digital Products',
    heading: 'Tools that work when you can\'t.',
    obtain: 'Get it →',
  },

  digitalProducts: {
    'hr-toolkit': {
      name: 'HR Toolkit',
      audience: 'For SMEs',
      description: 'Legal templates, contracts, warning guides, and Costa Rican compliance documents.',
    },
    'career-blueprint': {
      name: 'Learn & Save',
      audience: 'For Professionals',
      description: 'Recorded labor strategy course. Learn at your own pace.',
    },
  },

  blogPreview: {
    eyebrow: '· Editorial Resources',
    heading: 'Blog',
    subtitle: 'Articles about the Costa Rican labor market and labor law.',
    readMore: 'Read →',
  },

  ctaFinal: {
    heading: 'Ready to find the right talent?',
    body: 'Schedule a free consultation and discover how ADD can transform your talent management.',
    cta: 'Schedule free consultation',
  },

  footer: {
    tagline: 'Boutique HR & Labor Law Consulting',
    navTitle: 'Navigation',
    contactTitle: 'Contact',
    copyright: '© 2025 ADD Consulting · Costa Rica · Privacy Policy',
    currencyNote: 'Prices in CRC are reference rates based on the daily exchange rate',
    links: [
      { label: 'For Companies', to: '/empresa' },
      { label: 'For Candidates', to: '/candidato' },
      { label: 'Digital Resources', to: '/recursos/hr-toolkit' },
      { label: 'Blog', to: '/recursos/blog' },
      { label: 'About ADD', to: '/contacto' },
    ],
  },

  floatingCta: {
    buttonLabel: 'Contact Us',
    title: 'Contact Us',
    subtitle: 'Leave your details and we\'ll get back to you within 24 hours.',
    labels: {
      name: 'Name',
      company: 'Company',
      email: 'Email address',
      serviceOfInterest: 'Service of interest',
      preferredCurrency: 'Preferred currency for quote',
      message: 'Message',
    },
    placeholders: {
      name: 'Your name',
      company: 'Company name',
      email: 'email@example.com',
      message: 'How can we help you?',
    },
    serviceOptions: [
      { value: 'strategic-partner', label: 'Strategic Partner (HRBP)' },
      { value: 'essentials', label: 'Corporative Essentials' },
      { value: 'reclutamiento', label: 'Recruitment' },
      { value: 'auditoria', label: 'Audit & Compliance' },
      { value: 'grow', label: 'ADD Grow' },
      { value: 'first-step', label: 'ADD First Step' },
      { value: 'simulaciones', label: 'Simulations' },
      { value: 'otro', label: 'Other' },
    ],
    selectPlaceholder: 'Select...',
    submit: 'Send inquiry',
    successTitle: 'Done!',
    successMessage: 'We\'ll contact you within 24 hours.',
    errors: {
      nameRequired: 'Name is required',
      nameMax: 'Maximum 100 characters',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email',
      messageMax: 'Maximum 1000 characters',
    },
  },

  quoteModal: {
    title: 'Tell us about your situation',
    serviceLabel: 'Service',
    labels: {
      fullName: 'Full name',
      email: 'Email address',
      company: 'Company (optional)',
      size: 'Size / Situation',
      need: 'Main need',
      urgency: 'Urgency',
    },
    placeholders: {
      name: 'Your name',
      email: 'email@example.com',
      company: 'Company name',
    },
    sizes: ['1–5', '6–20', '21–80', '80+', 'I\'m a candidate'],
    needs: ['HR', 'Legal', 'Recruitment', 'Career', 'Other'],
    urgencies: ['This week', 'This month', '1–3 months', 'Just exploring'],
    submit: 'Send inquiry',
    successTitle: 'Done!',
    successMessage: 'We\'ll contact you within 24 hours with a personalized proposal.',
  },

  aboutDrawer: {
    eyebrow: '· About ADD Consulting',
    heading: 'A firm built on judgment, not volume.',
    body1: 'We are a boutique consulting firm specialized in Human Resources and Labor Law in Costa Rica. We don\'t offer generic solutions: every company and professional receives support designed for their specific reality.',
    body2: 'Our team combines legal experience with strategic business vision, always with a human and confidential approach.',
    values: [
      { label: 'Confidentiality', desc: 'Total protection of sensitive information' },
      { label: 'Local expertise', desc: 'Deep knowledge of the Costa Rican market' },
      { label: 'Human focus', desc: 'People first, always' },
      { label: 'CR Legislation', desc: 'Mastery of current legal framework' },
    ],
    cta: 'Schedule a conversation →',
  },

  megaCta: {
    cotizador: 'Go to Quoter →',
    vacantes: 'View Openings →',
  },

  megaDescriptions: {
    'strategic-partner': 'Your external HRBP',
    essentials: 'Formalization and basic compliance',
    reclutamiento: 'We find the ideal talent',
    'risk-compliance': 'Audit and legal shielding',
    'add-grow': 'Professional acceleration',
    'first-step': 'Everything you need to know to start your venture related to Labor Law',
    simulaciones: 'Interview practice',
    'hr-toolkit': 'Templates and guides for SMEs',
    'career-blueprint': 'Labor strategy course',
    'insider-club': 'Exclusive community',
  },
};

export const translations: Record<Lang, Translations> = { es, en };
