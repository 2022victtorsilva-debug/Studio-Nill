import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

import cachos from "./assets/cachos-v2.jpg";
import loiroLongo from "./assets/loiro-longo-v2.jpg";
import loiroOndas from "./assets/loiro-ondas-v2.jpg";
import recepcao from "./assets/recepcao-v2.jpg";
import salao from "./assets/salao-v2.jpg";
import unhas from "./assets/unhas-v2.jpg";

const WHATSAPP_URL = "https://wa.me/5562982891084";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Studio+Nill+Cabeleireiros+Goiania+GO";

const gallery = [
  { src: loiroLongo, alt: "Cabelo longo com mechas loiras e ondas finalizadas", className: "gallery-tall photo-long" },
  { src: cachos, alt: "Cabelo cacheado escuro finalizado", className: "gallery-wide photo-curls" },
  { src: unhas, alt: "Unhas com esmaltação rosé delicada", className: "gallery-square photo-nails" },
  { src: loiroOndas, alt: "Cabelo loiro com ondas suaves", className: "gallery-tall photo-waves" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [headerSolid, setHeaderSolid] = useState(false);
  const activeImage = activePhoto === null ? null : gallery[activePhoto];

  useEffect(() => {
    const updateHeader = () => setHeaderSolid(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activePhoto === null) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActivePhoto(null);
      if (event.key === "ArrowRight") setActivePhoto((activePhoto + 1) % gallery.length);
      if (event.key === "ArrowLeft") setActivePhoto((activePhoto - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activePhoto]);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className={`site-header ${headerSolid ? "is-solid" : ""}`}>
        <div className="site-container grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center md:h-24 md:flex md:justify-between">
          <a href="#inicio" className="min-w-0 font-display text-xl text-hero-foreground md:text-2xl" aria-label="Studio Nill — início">
            Studio Nill
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            <a className="nav-link" href="#studio">O Studio</a>
            <a className="nav-link" href="#servicos">Serviços</a>
            <a className="nav-link" href="#galeria">Galeria</a>
            <a className="nav-link" href="#localizacao">Localização</a>
          </nav>
          <button
            className="icon-button border-hero-line text-hero-foreground md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navegação móvel">
            {[["studio", "O Studio"], ["servicos", "Serviços"], ["galeria", "Galeria"], ["localizacao", "Localização"]].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      <section id="inicio" className="hero-section">
        <img src={loiroLongo} alt="Trabalho de mechas e ondas realizado no Studio Nill" className="hero-image" />
        <div className="hero-overlay" />
        <div className="site-container relative z-10 flex min-h-[92svh] items-end pb-12 pt-32 md:pb-20">
          <div className="max-w-3xl reveal-up">
            <p className="eyebrow text-hero-muted">Cabeleireiros · Goiânia, GO</p>
            <h1 className="mt-5 font-display text-5xl leading-[0.96] text-hero-foreground sm:text-6xl md:text-8xl">
              Beleza feita<br />com intenção.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-hero-muted md:text-lg">
              Cabelos e unhas cuidados em um espaço acolhedor no coração do Setor Oeste.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="primary-cta mt-8">
              <MessageCircle size={19} /> Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section id="studio" className="section-space bg-background">
        <div className="site-container grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div data-reveal className="scroll-reveal">
            <p className="eyebrow text-primary">Studio Nill</p>
            <h2 className="section-title mt-4">Seu momento,<br />do seu jeito.</h2>
          </div>
          <div data-reveal className="scroll-reveal reveal-delay-1 border-l border-border pl-6 md:pl-10">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Um salão onde técnica e cuidado se encontram. Cada detalhe — do atendimento ao acabamento — é pensado para valorizar a sua beleza com leveza e personalidade.
            </p>
          </div>
        </div>
      </section>

      <section id="servicos" className="section-space bg-surface-dark text-surface-dark-foreground">
        <div className="site-container">
          <div data-reveal className="scroll-reveal max-w-2xl">
            <p className="eyebrow text-surface-dark-muted">Cuidados</p>
            <h2 className="section-title mt-4">Beleza em cada detalhe.</h2>
          </div>
          <div className="mt-12 grid border-y border-surface-dark-line md:grid-cols-2 md:divide-x md:divide-surface-dark-line">
            <article data-reveal className="scroll-reveal service-item md:pr-12">
              <div className="service-number">01</div>
              <h3 className="font-display text-4xl">Cabelos</h3>
              <p>Transformações, mechas, cachos e finalizações que respeitam seu estilo e a identidade dos seus fios.</p>
            </article>
            <article data-reveal className="scroll-reveal reveal-delay-1 service-item md:pl-12">
              <div className="service-number">02</div>
              <h3 className="font-display text-4xl">Unhas</h3>
              <p>Cuidado e esmaltação com acabamento preciso, em escolhas que vão do delicado ao marcante.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="galeria" className="section-space bg-background">
        <div className="site-container">
          <div data-reveal className="scroll-reveal grid items-end gap-5 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow text-primary">Trabalhos reais</p>
              <h2 className="section-title mt-4">Feito no Studio Nill.</h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Cortes, cores, texturas e acabamentos registrados no próprio Studio.</p>
          </div>
          <div className="gallery-grid mt-10 md:mt-14">
            {gallery.map((photo, index) => (
              <button key={photo.src} data-reveal style={{ "--reveal-delay": `${index * 70}ms` }} className={`scroll-reveal gallery-item ${photo.className}`} onClick={() => setActivePhoto(index)} aria-label={`Ampliar foto: ${photo.alt}`}>
                <img src={photo.src} alt={photo.alt} loading={index > 1 ? "lazy" : "eager"} />
                <span className="gallery-expand"><ArrowUpRight size={18} /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="proof-section">
        <div data-reveal className="scroll-reveal site-container grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="eyebrow text-primary">Avaliações</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl">A experiência de quem já passou por aqui.</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">Veja fotos, comentários e experiências compartilhadas por clientes no perfil do Studio Nill no Google.</p>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="text-link mt-5">Ver no Google <ArrowUpRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="relative min-h-[72svh] overflow-hidden">
        <img src={salao} alt="Interior do Studio Nill Cabeleireiros em Goiânia" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="space-overlay" />
        <div className="site-container relative z-10 flex min-h-[72svh] items-end pb-10 md:pb-16">
          <div data-reveal className="scroll-reveal max-w-xl">
            <p className="eyebrow text-hero-muted">O espaço</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-hero-foreground md:text-6xl">Preparado para receber você.</h2>
          </div>
        </div>
      </section>

      <section id="localizacao" className="section-space bg-background">
        <div className="site-container grid gap-10 md:grid-cols-[1fr_1fr] md:gap-20">
          <div data-reveal className="scroll-reveal">
            <p className="eyebrow text-primary">Onde estamos</p>
            <h2 className="section-title mt-4">No Setor Oeste,<br />em Goiânia.</h2>
          </div>
          <div data-reveal className="scroll-reveal reveal-delay-1 flex flex-col justify-end border-t border-border pt-7 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <MapPin className="mb-6 text-primary" size={28} strokeWidth={1.5} />
            <address className="not-italic text-lg leading-relaxed text-muted-foreground">
              Rua 6, 370, salas 5, 6 e 7<br />Setor Oeste, Goiânia — GO
            </address>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="secondary-cta mt-7">Abrir no Google Maps <ArrowUpRight size={18} /></a>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <img src={recepcao} alt="Recepção do Studio Nill Cabeleireiros" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="cta-overlay" />
        <div data-reveal className="scroll-reveal site-container relative z-10 py-20 text-center md:py-28">
          <p className="eyebrow text-hero-muted">Seu horário</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-hero-foreground md:text-7xl">Vamos cuidar de você?</h2>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="primary-cta mt-8"><MessageCircle size={19} /> Falar com o Studio Nill</a>
        </div>
      </section>

      <footer className="bg-surface-dark py-10 text-surface-dark-foreground">
        <div className="site-container grid gap-8 border-t border-surface-dark-line pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-display text-2xl">Studio Nill</p>
            <p className="mt-2 text-sm text-surface-dark-muted">Cabeleireiros · Goiânia, GO</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-surface-dark-muted md:items-end">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">+55 62 98289-1084</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer">Rua 6, 370 · Setor Oeste</a>
          </div>
        </div>
      </footer>

      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Agendar pelo WhatsApp">
        <MessageCircle size={22} />
      </a>

      {activePhoto !== null && activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Foto ampliada" onClick={() => setActivePhoto(null)}>
          <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Fechar"><X size={22} /></button>
          <button className="lightbox-prev" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto - 1 + gallery.length) % gallery.length); }} aria-label="Foto anterior"><ChevronLeft size={26} /></button>
          <img src={activeImage.src} alt={activeImage.alt} onClick={(event) => event.stopPropagation()} />
          <button className="lightbox-next" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto + 1) % gallery.length); }} aria-label="Próxima foto"><ChevronRight size={26} /></button>
        </div>
      )}
    </main>
  );
}
