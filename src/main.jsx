import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BadgePercent,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DoorOpen,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MonitorUp,
  Navigation,
  Phone,
  Presentation,
  ShieldCheck,
  Snowflake,
  Stethoscope,
  Users,
  Wifi,
  X
} from 'lucide-react';
import './styles.css';

const whatsappNumber = '5521998554243';

const images = {
  hero: '/sala-reuniao-4u.jpg',
  workstation: '/sala-estacao-4u.jpg',
  meeting: '/sala-reuniao-4u.jpg',
  clinic: '/consultorio-4u.jpg',
  fiscal: '/endereco-fiscal-4u.webp',
  point: '/point-imoveis-logo.png'
};

const navItems = [
  ['Início', 'inicio'],
  ['Localização', 'localizacao'],
  ['Sobre nós', 'sobre'],
  ['Salas', 'salas'],
  ['Vantagens', 'vantagens'],
  ['Valores', 'valores'],
  ['Endereço Fiscal', 'endereco-fiscal'],
  ['Depoimentos', 'depoimentos'],
  ['Contato', 'contato']
];

const spaces = [
  {
    title: 'Estação de Trabalho e Estudo',
    subtitle: 'Foco, rotina flexível e networking',
    image: images.workstation,
    alt: 'Estação de trabalho individual do 4UCoworking',
    icon: BriefcaseBusiness,
    copy:
      'Criado especialmente para profissionais independentes e estudantes, nosso ambiente foi projetado para proporcionar foco e alta produtividade. Com layout moderno e acolhedor, promovemos interações e networking entre pessoas de diversas áreas.',
    details:
      'Planos flexíveis com acesso 24 horas por dia, 7 dias por semana, conforto, Wi-Fi ultrarrápido e ambiente climatizado.'
  },
  {
    title: 'Espaço de Reunião e Eventos',
    subtitle: 'Uma sala pronta para receber melhor',
    image: images.meeting,
    alt: 'Sala de reunião equipada do 4UCoworking',
    icon: Presentation,
    copy:
      'Dispomos de uma sala de reunião profissional, completamente equipada e pronta para recebê-lo com a estrutura e o conforto necessários.',
    details:
      'Seja para reunião, apresentação ou evento, temos a solução ideal para os seus interesses.'
  },
  {
    title: 'Consultório para área da saúde',
    subtitle: 'Privacidade e estrutura para atendimento',
    image: images.clinic,
    alt: 'Consultório para profissionais da saúde no 4UCoworking',
    icon: Stethoscope,
    copy:
      'Nosso consultório é ideal para profissionais da saúde que buscam um ambiente moderno e funcional, com planos que permitem agendamentos conforme sua necessidade, 24 horas por dia.',
    details:
      'O espaço oferece conforto e privacidade aos pacientes, incluindo estacionamento e acessibilidade total.'
  }
];

const benefits = [
  ['Ar-condicionado', Snowflake],
  ['Internet de alta velocidade', Wifi],
  ['Equipamento de apresentação', MonitorUp],
  ['Networking', Users],
  ['Sala de Reunião e Eventos', CalendarDays],
  ['Estações de trabalho', DoorOpen],
  ['Consultório para área da saúde', Stethoscope],
  ['Endereço Fiscal/Comercial', Building2],
  ['Acesso virtual 24h', Clock3],
  ['Monitoramento por câmera de segurança', ShieldCheck]
];

const pricing = [
  {
    title: 'Estação de Trabalho e Estudo',
    icon: BriefcaseBusiness,
    note: 'Uso individual',
    prices: [
      ['Hora', 'R$ 39,90'],
      ['Período (4h)', 'R$ 99,90'],
      ['Diária (8h)', 'R$ 179,90'],
      ['Semanal (24h)', 'R$ 249,90'],
      ['Mensal (24h)', 'R$ 489,90']
    ]
  },
  {
    title: 'Espaço de Reunião e Eventos',
    icon: Presentation,
    note: 'Até 04 pessoas',
    featured: true,
    prices: [
      ['Hora', 'R$ 99,90'],
      ['Período (4h)', 'R$ 199,90'],
      ['Extra por pessoa', 'R$ 49,90']
    ]
  },
  {
    title: 'Consultório para área da saúde',
    icon: Stethoscope,
    note: 'Até 12 períodos mensais',
    prices: [
      ['Hora', 'R$ 99,90'],
      ['Período (4h)', 'R$ 249,90'],
      ['Mensal com endereço fiscal', 'R$ 1.398,90']
    ]
  }
];

function makeWhatsAppLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return scrolled;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0.15, 0.35, 0.55] }
    );

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    document.documentElement.classList.add('motion-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
          if (!target) return;

          const previousScrollBehavior = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = 'auto';
          target.scrollIntoView({ block: 'start' });
          document.documentElement.style.scrollBehavior = previousScrollBehavior;
        });
      });
    }

    return () => observer.disconnect();
  }, []);
}

function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <span className="brand-logo-mark">4U</span>
      <span className="brand-logo-word">coworking</span>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const sectionIds = useMemo(() => navItems.map(([, id]) => id), []);
  const active = useActiveSection(sectionIds);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#inicio" aria-label="4UCoworking início">
        <BrandLogo />
      </a>

      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
        {navItems.map(([label, id]) => (
          <a
            href={`#${id}`}
            key={id}
            className={active === id ? 'is-active' : ''}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a
          className="icon-button"
          href={makeWhatsAppLink('Olá, gostaria de falar com o 4UCoworking.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chamar no WhatsApp"
        >
          <MessageCircle size={20} />
        </a>
        <a
          className="icon-button"
          href="https://www.instagram.com/4ucoworking/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir Instagram"
        >
          <Instagram size={20} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-media" aria-hidden="true">
        <img src={images.hero} alt="" />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-content">
        <p className="eyebrow">Coworking em Niterói</p>
        <h1>
          <span className="hero-title-mark">4UCoworking:</span> espaço para criar, crescer, se destacar e economizar.
        </h1>
        <p>
          Um coworking compartilhado onde profissionais de diferentes empresas trabalham juntos,
          promovendo colaboração, networking e eficiência.
        </p>
        <p>
          Com planos adaptáveis às suas necessidades, você reduz custos operacionais pagando apenas
          pelo tempo e espaço que realmente usa, sem sacrificar a qualidade e o profissionalismo do
          ambiente.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#contato">
            Entre em contato <ArrowRight size={18} />
          </a>
          <a className="secondary-button" href="#valores">
            Ver valores
          </a>
        </div>
      </div>

      <div className="hero-panel" aria-label="Destaques do espaço">
        <span>
          <strong>24h</strong>
          Acesso virtual e planos flexíveis
        </span>
        <span>
          <strong>3</strong>
          Estação, reunião e consultório
        </span>
        <span>
          <strong>R$ 39,90</strong>
          Planos de uso a partir de
        </span>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="section location-section" id="localizacao">
      <div className="section-inner split">
        <div data-reveal>
          <p className="section-kicker">Localização</p>
          <h2>Onde se encontra o 4UCoworking?</h2>
          <p>
            Estamos no Shopping Pendotiba, em Niterói, em uma localização prática para trabalhar,
            estudar, atender clientes ou regularizar sua empresa.
          </p>
          <address className="address-card">
            <MapPin size={23} />
            <span>
              <strong>Estrada Caetano Monteiro, 818</strong>
              Sala 204 | 209 | 225
              <br />
              Shopping Pendotiba - Niterói - RJ
            </span>
          </address>
          <a
            className="text-link"
            href="https://www.google.com/maps/search/?api=1&query=Estrada%20Caetano%20Monteiro%20818%20Shopping%20Pendotiba%20Niteroi%20RJ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir rota <Navigation size={17} />
          </a>
        </div>

        <div className="location-visual" data-reveal style={{ '--reveal-delay': '90ms' }}>
          <iframe
            title="Mapa interativo do 4UCoworking no Shopping Pendotiba"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-43.0605%2C-22.9108%2C-43.0493%2C-22.9025&layer=mapnik&marker=-22.9066387%2C-43.0548888"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <a
            className="map-attribution"
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy; OpenStreetMap contributors
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="sobre">
      <div className="section-inner split reverse">
        <div className="image-stack" data-reveal>
          <img src={images.workstation} alt="Estação de trabalho individual do 4UCoworking" />
          <img src={images.meeting} alt="Sala de reunião do 4UCoworking" />
        </div>
        <div data-reveal style={{ '--reveal-delay': '90ms' }}>
          <p className="section-kicker">Sobre nós</p>
          <h2>Trabalho compartilhado, ideias multiplicadas.</h2>
          <p>
            O 4UCoworking é um ambiente compartilhado que reúne profissionais de diferentes áreas e
            empresas, incentivando a colaboração e o networking.
          </p>
          <p>
            Além de ser uma alternativa mais flexível aos escritórios tradicionais, oferece internet
            de alta velocidade, salas de reunião e áreas de convivência.
          </p>
          <p>
            Os membros escolhem planos que se adaptam às suas necessidades, permitindo economia
            significativa ao pagar apenas pelo tempo e espaço que realmente utilizam.
          </p>
        </div>
      </div>
    </section>
  );
}

function Spaces() {
  return (
    <section className="section spaces-section" id="salas">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Salas</p>
          <h2>Nossas salas</h2>
          <p>Ambientes prontos para foco, reuniões, eventos e atendimentos na área da saúde.</p>
        </div>

        <div className="spaces-grid">
          {spaces.map((space, index) => {
            const Icon = space.icon;
            return (
              <article
                className="space-card"
                key={space.title}
                data-reveal
                style={{ '--reveal-delay': `${index * 70}ms` }}
              >
                <img src={space.image} alt={space.alt} />
                <div className="space-card-body">
                  <span className="card-icon">
                    <Icon size={22} />
                  </span>
                  <p className="card-eyebrow">{space.subtitle}</p>
                  <h3>{space.title}</h3>
                  <p>{space.copy}</p>
                  <p>{space.details}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section benefits-section" id="vantagens">
      <div className="section-inner">
        <div className="section-heading compact" data-reveal>
          <p className="section-kicker">Vantagens</p>
          <h2>Vantagens de ser cliente 4UCoworking</h2>
        </div>

        <div className="benefits-grid">
          {benefits.map(([label, Icon], index) => (
            <div
              className="benefit-item"
              key={label}
              data-reveal
              style={{ '--reveal-delay': `${(index % 5) * 55}ms` }}
            >
              <Icon size={22} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section pricing-section" id="valores">
      <div className="section-inner">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Valores</p>
          <h2>Nossos valores</h2>
          <p>Escolha por hora, período, diária, semana ou mês, conforme sua rotina pedir.</p>
        </div>

        <div className="pricing-grid">
          {pricing.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <article
                className={`price-card ${plan.featured ? 'featured' : ''}`}
                key={plan.title}
                data-reveal
                style={{ '--reveal-delay': `${index * 70}ms` }}
              >
                <div className="price-title">
                  <Icon size={25} />
                  <div>
                    <span>{plan.note}</span>
                    <h3>{plan.title}</h3>
                  </div>
                </div>
                <ul>
                  {plan.prices.map(([label, value]) => (
                    <li key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="offer-strip" data-reveal>
          <BadgePercent size={26} />
          <strong>Oferta por tempo limitado</strong>
          <span>20% Off na 1ª visita</span>
          <span>15% Off aos fins de semana e feriados</span>
          <a href="#contato">Quero aproveitar</a>
        </div>
      </div>
    </section>
  );
}

function FiscalAddress() {
  return (
    <section className="section fiscal-section" id="endereco-fiscal">
      <div className="section-inner fiscal-layout">
        <div data-reveal>
          <p className="section-kicker">Endereço Fiscal</p>
          <h2>Com endereço fiscal, sua empresa não para.</h2>
          <p>
            Solucione a regularização da sua empresa com endereço fiscal/comercial no
            4UCoworking, sem burocracia e com mensalidade acessível.
          </p>
          <div className="fiscal-price">
            <span>Mensalidade por apenas</span>
            <strong>R$ 59,90</strong>
          </div>
          <a className="primary-button" href="#contato">
            Solicitar endereço fiscal <ArrowRight size={18} />
          </a>
        </div>

        <img
          className="fiscal-image"
          src={images.fiscal}
          alt="Serviço de endereço fiscal do 4UCoworking"
          data-reveal
          style={{ '--reveal-delay': '90ms' }}
        />
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section testimonial-section" id="depoimentos">
      <div className="section-inner testimonial-layout">
        <div data-reveal>
          <p className="section-kicker">Depoimentos</p>
          <h2>Quem usa o espaço sente a diferença na rotina.</h2>
        </div>
        <figure className="testimonial-card" data-reveal style={{ '--reveal-delay': '90ms' }}>
          <blockquote>
            “Procurava um consultório de fácil acesso e com todas as características para atendimento
            em laserterapia de reabilitação. Foi exatamente o que queria. Locação simples, rápida,
            sem burocracia, local sempre limpo e agradável. Antes tinha um consultório onde eu
            precisava prover tudo, agora só entro e faço meu trabalho sem me preocupar com mais nada.
            Otimização de tempo e dinheiro também, por não ter que pagar condomínio e outros custos
            de um local próprio. Além disso, a empresa é muito acessível, o que facilita a boa
            dinâmica entre nós. Estou há 2 meses e adorando a parceria. Super recomendo.”
          </blockquote>
          <figcaption>Cristiane Pires</figcaption>
        </figure>
      </div>
    </section>
  );
}

function ContactForm({ context = 'Formulário principal da landing page' }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const interest = String(formData.get('interest') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const whatsappMessage = [
      'Olá, 4UCoworking.',
      `Origem: ${context}.`,
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Interesse: ${interest}`,
      email ? `E-mail: ${email}` : null,
      message ? `Mensagem: ${message}` : null
    ]
      .filter(Boolean)
      .join('\n');

    setSubmitted(true);
    window.open(makeWhatsAppLink(whatsappMessage), '_blank', 'noopener,noreferrer');
    event.currentTarget.reset();
  }

  if (submitted) {
    return (
      <div className="success-message" role="status" aria-live="polite">
        <CheckCircle2 size={38} />
        <h3>Obrigado(a) por preencher nosso formulário.</h3>
        <p>Em instantes entraremos em contato.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="full">
        <span>Nome completo</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        <span>WhatsApp</span>
        <input name="phone" type="tel" autoComplete="tel" required />
      </label>
      <label>
        <span>E-mail <small>(opcional)</small></span>
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label className="full">
        <span>O que você procura?</span>
        <select name="interest" defaultValue="" required>
          <option value="" disabled>
            Selecione uma opção
          </option>
          <option value="Estação de trabalho e estudo">Estação de trabalho e estudo</option>
          <option value="Sala de reunião ou evento">Sala de reunião ou evento</option>
          <option value="Consultório para saúde">Consultório para saúde</option>
          <option value="Endereço fiscal ou comercial">Endereço fiscal ou comercial</option>
        </select>
      </label>
      <label className="full">
        <span>Mensagem <small>(opcional)</small></span>
        <textarea name="message" rows="3" />
      </label>
      <button className="primary-button full" type="submit">
        Quero falar com a equipe <ArrowRight size={18} />
      </button>
      <p className="form-note full">
        <ShieldCheck size={16} /> Seus dados serão usados apenas para este atendimento.
      </p>
    </form>
  );
}

function LeadCapture() {
  return (
    <section className="section lead-section" id="contato">
      <div className="section-inner lead-layout">
        <div className="lead-copy" data-reveal>
          <p className="section-kicker">Agende uma visita</p>
          <h2>Encontre o espaço certo para a sua rotina.</h2>
          <p>
            Conte o que você precisa e fale diretamente com a equipe do 4UCoworking pelo WhatsApp.
          </p>
        </div>

        <ContactForm />

        <ul className="lead-points" data-reveal>
          <li>
            <CheckCircle2 size={19} /> Atendimento direto com a equipe
          </li>
          <li>
            <CheckCircle2 size={19} /> Planos flexíveis a partir de R$ 39,90
          </li>
          <li>
            <CheckCircle2 size={19} /> Espaço no Shopping Pendotiba, em Niterói
          </li>
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="informacoes">
      <div className="section-inner contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="section-kicker">Fale com a gente</p>
          <h2>Informações para contato</h2>
          <p>Use o canal que preferir para conversar com a equipe ou acompanhar as novidades.</p>

          <div className="contact-list">
            <a href="tel:+5521998554243">
              <MessageCircle size={20} /> (21) 99855-4243
            </a>
            <a href="mailto:contato@4ucoworking.com.br">
              <Mail size={20} /> contato@4ucoworking.com.br
            </a>
            <span>
              <Building2 size={20} /> CNPJ: 21.428.334/0001-30
            </span>
          </div>

          <div className="social-row">
            <a
              href={makeWhatsAppLink('Olá, gostaria de falar com o 4UCoworking.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
            <a
              href="https://www.instagram.com/4ucoworking/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={18} /> Instagram
            </a>
          </div>
        </div>

        <aside className="partner-card" data-reveal style={{ '--reveal-delay': '90ms' }}>
          <p className="card-eyebrow">Administração parceira</p>
          <img src={images.point} alt="Point Imóveis" />
          <a href="tel:+552126161919">
            <Phone size={18} /> (21) 2616-1919
          </a>
          <a href="mailto:info@pointimoveis.com.br">
            <Mail size={18} /> info@pointimoveis.com.br
          </a>
          <span>CNPJ: 00.636.420/0001-69</span>
        </aside>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <BrandLogo />
        <p>© 2023 4UCoworking - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LeadCapture />
        <Location />
        <About />
        <Spaces />
        <Benefits />
        <Pricing />
        <FiscalAddress />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
