import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Download,
  Factory,
  FileText,
  LayoutList,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  User,
  Wrench,
  X,
} from "lucide-react";
const logo = "/assets/03_Logo_Oficial_Compomoldes_Horizontal_Branco_Registrado.png";
const facadeSede = "/assets/fachada-sede.jpg";


const productLines = [
  "Aceleradores de Extração",
  "Buchas e Colunas",
  "Centralizadores",
  "Componentes",
  "Controladores",
  "Datadores",
  "Molas",
  "Pinos Extratores",
  "Resistências e Termopares",
  "Retentores de Gaveta",
  "Travas",
  "Válvulas de Ar",
];

const products = [
  {
    name: "Acelerador de Extração EP",
    line: "Aceleradores de Extração",
    image: "/assets/01_2c2496_326a4476671945eeaf9b3044ea6ca58c_mv2.png",
    summary: "Evita que peças fiquem engatadas em componentes e mecanismos como os próprios extratores.",
    specs: ["Aplicação: extração em moldes de injeção", "Função: aceleração de curso", "Indicação: liberação do produto moldado"],
  },
  {
    name: "Bucha do Conjunto Extrator",
    line: "Buchas e Colunas",
    image: "/assets/10_2c2496_29a734e2667d451fbcbbdb8c76770762_mv2.png",
    summary: "Buchas com material, tratamento e dureza resistentes ao atrito e ao desgaste.",
    specs: ["Acabamento externo e interno retificado", "Alta resistência ao desgaste", "Aplicação: conjunto extrator"],
  },
  {
    name: "Centralizador Lateral",
    line: "Centralizadores",
    image: "/assets/09_2c2496_cedc17bbd78d4f75b572f6cd13db7b46_mv2.png",
    summary: "Duas peças com encaixe preciso para fechamento confiável do molde.",
    specs: ["Dureza elevada: 50-54 HRC", "Conjunto com encaixe perfeito", "Aplicação: fechamento do molde"],
  },
  {
    name: "Controladores",
    line: "Controladores",
    image: "/assets/16_2c2496_0717ed043e83474da41de774c97fbca5_mv2.png",
    summary: "Controladores fabricados sob medida com tecnologia para controle térmico industrial.",
    specs: ["Projeto sob medida", "Aplicação: zonas quentes e temperatura", "Suporte técnico especializado"],
  },
  {
    name: "Datadores",
    line: "Datadores",
    image: "/assets/15_2c2496_b179707477b4416795b68f403d1d98e9_mv2.png",
    summary: "Identificação técnica para rastreabilidade em moldes de diferentes segmentos industriais.",
    specs: ["Aplicação: moldes plásticos", "Função: gravação de data e lote", "Indicado para rastreabilidade"],
  },
  {
    name: "Lâmina Extratora",
    line: "Pinos Extratores",
    image: "/assets/08_2c2496_2ccf082944674cbc82f088ec0240ad6d_mv2.png",
    summary: "Lâmina nitretada para extração com acabamento técnico e resistência superficial.",
    specs: ["DIN 1530 / ISO 8693", "Material: aço para trabalho a quente", "Dureza superficial: 950 HV 0,3"],
  },
  {
    name: "Molas de Compressão",
    line: "Molas",
    image: "/assets/14_2c2496_c30212e465f34e3b9f8fc11041ab5d67_mv2.png",
    summary: "Molas para cargas industriais, produzidas conforme especificações técnicas do mercado.",
    specs: ["Norma: ISO 10243", "Linhas por carga: amarela, azul, verde e vermelha", "Aplicação: retorno e compressão"],
  },
  {
    name: "Resistência Tubular Flexível",
    line: "Resistências e Termopares",
    image: "/assets/05_2c2496_09ede26ef1c444c0b90cde2ffbe5ea04_mv2.png",
    summary: "Montagem rápida, simples e fácil sem necessidade de ferramentas especiais.",
    specs: ["Aplicação: aquecimento de moldes", "Instalação: flexível", "Compatível com canais e geometrias variadas"],
  },
  {
    name: "Retentor de Gaveta RC",
    line: "Retentores de Gaveta",
    image: "/assets/17_2c2496_ca79c0b78944489f8b1ebd0be986c1b8_mv2.png",
    summary: "Componente para facilitar a construção e operação de gavetas em moldes de injeção.",
    specs: ["Aplicação: gavetas de molde", "Função: retenção e posicionamento", "Linha técnica para injeção plástica"],
  },
  {
    name: "Trava de Gaveta Z5130",
    line: "Travas",
    image: "/assets/12_2c2496_b05f8f6f6b16456da29fbe8b0b70145a_mv2.png",
    summary: "Trava de gaveta para segurança e precisão em sistemas de molde.",
    specs: ["Aplicação: travamento de gaveta", "Construção robusta", "Indicação: moldes de injeção"],
  },
  {
    name: "Válvula de Ar APV",
    line: "Válvulas de Ar",
    image: "/assets/11_2c2496_c084cc1061be4539b7368ce416aa39ee_mv2.png",
    summary: "Válvula para controle de ar em aplicações industriais e moldes de injeção.",
    specs: ["Aplicação: válvulas de ar", "Acionamento técnico", "Produto para sistemas de molde"],
  },
  {
    name: "Carro Deslizante Kocus S10",
    line: "Componentes",
    image: "/assets/06_2c2496_6b5f7be4282a40fc8ba0347ec6efc366_mv2.png",
    summary: "Conjunto montado e ajustado para instalação e reposição imediata.",
    specs: ["Inclinação livre da haste até 30 graus", "Auto lubrificante", "Instalação imediata"],
  },
];

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const productPath = (product) => `/produtos/${slugify(product.name)}`;

const getProductByPath = (path) =>
  products.find((product) => path === productPath(product));

const lineApplications = {
  "Aceleradores de Extração": ["Extração sequencial", "Moldes com curso ampliado", "Peças com retenção mecânica"],
  "Buchas e Colunas": ["Guiamento do conjunto extrator", "Moldes de alta repetibilidade", "Redução de atrito"],
  Centralizadores: ["Fechamento preciso", "Alinhamento de cavidades", "Moldes com ajustes críticos"],
  Componentes: ["Reposição imediata", "Montagens especiais", "Sistemas de gaveta"],
  Controladores: ["Controle de zonas quentes", "Sistemas térmicos", "Processos com estabilidade de temperatura"],
  Datadores: ["Rastreabilidade", "Identificação de lote", "Marcação de peças plásticas"],
  Molas: ["Retorno mecânico", "Moldes de injeção", "Estampos e dispositivos"],
  "Pinos Extratores": ["Extração de peças", "Moldes plásticos", "Componentes com acabamento técnico"],
  "Resistências e Termopares": ["Aquecimento de moldes", "Canais e cavidades", "Controle térmico"],
  "Retentores de Gaveta": ["Travamento de gavetas", "Posicionamento mecânico", "Segurança operacional"],
  Travas: ["Gavetas de molde", "Travamento mecânico", "Operação segura do molde"],
  "Válvulas de Ar": ["Controle pneumático", "Extração por ar", "Moldes com canais de ar"],
};

const productDetails = (product) => ({
  code: product.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 4)
    .toUpperCase(),
  available: product.line === "Molas" ? "Séries por carga e cor" : "Sob consulta técnica",
  features: [
    "Produto selecionado para aplicações em moldes de injeção.",
    "Fornecimento com suporte técnico para equivalência e aplicação.",
    "Linha organizada para facilitar reposição, projeto e orçamento.",
  ],
  applications: lineApplications[product.line] || ["Moldes de injeção", "Ferramentarias", "Reposição técnica"],
  table: [
    ["Linha", product.line],
    ["Código base", product.name],
    ["Disponibilidade", product.line === "Controladores" ? "Projeto sob medida" : "Sob consulta"],
    ["Documentação", "Ficha técnica e desenho mediante solicitação"],
  ],
});

const units = [
  {
    city: "Curitiba/PR",
    address: "Rua Napoleão Laureano, 300 - Boqueirão - CEP 81.650-210",
    phone: "(41) 3085-4649",
    email: "vendas@compomoldes.com.br",
    whatsapp: "https://wa.link/cnkp9d",
  },
  {
    city: "Joinville/SC",
    address: "Rua Rui Barbosa, 576, loja 4 - Zona Industrial Norte - CEP 89.219-522",
    phone: "(47) 3027-3572",
    email: "joinville@compomoldes.com.br",
    whatsapp: "https://wa.link/zzyamc",
  },
  {
    city: "São Paulo/SP",
    address: "Rua do Acre, 75 - Vila Bertioga - CEP 03.181-100",
    phone: "(11) 2368-8846",
    email: "saopaulo@compomoldes.com.br",
    whatsapp: "https://wa.link/r3pq2w",
  },
];

function HeroVideo() {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    tryPlay();
    v.addEventListener("canplay", tryPlay);

    // some browsers block muted autoplay until the first user gesture
    const onGesture = () => tryPlay();
    const opts = { once: true, passive: true };
    window.addEventListener("pointerdown", onGesture, opts);
    window.addEventListener("scroll", onGesture, opts);
    window.addEventListener("keydown", onGesture, opts);

    return () => {
      v.removeEventListener("canplay", tryPlay);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("scroll", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/assets/hero-poster.jpg"
    >
      <source src="/assets/hero-bg.mp4" type="video/mp4" />
      <source src="/assets/hero-bg.webm" type="video/webm" />
    </video>
  );
}

function AboutPage() {
  return (
    <>
      <section className="page-hero institutional-hero">
        <div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Início</a>
            <span>/</span>
            <strong>Quem somos</strong>
          </nav>
          <span className="eyebrow">Compomoldes</span>
          <h1>Precisão, estoque e suporte para moldes de injeção.</h1>
          <p>
            A Compomoldes iniciou suas atividades em 2010, importando componentes para moldes e matrizes da Europa,
            Ásia e Estados Unidos. Hoje atende ferramentarias e indústrias com um mix técnico de componentes,
            disponibilidade e orientação para aplicação.
          </p>
          <div className="hero-actions">
            <a className="primary-cta" href="/#produtos">Ver catálogo</a>
            <a className="secondary-cta" href="/contato">Falar com atendimento</a>
          </div>
        </div>
        <div className="institutional-card">
          <img src={facadeSede} alt="Fachada da sede da Compomoldes em Curitiba/PR" />
          <div className="institutional-card-caption">
            <MapPin size={16} />
            <span>Sede — Curitiba/PR</span>
          </div>
        </div>
      </section>

      <section className="section value-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Diferenciais</span>
            <h2>O que sustenta a operação.</h2>
          </div>
        </div>
        <div className="value-grid">
          <article>
            <Factory size={28} />
            <strong>Mix técnico</strong>
            <p>Linhas de componentes organizadas por aplicação, reposição, especificação e necessidade do projeto.</p>
          </article>
          <article>
            <ShieldCheck size={28} />
            <strong>Qualidade</strong>
            <p>Produtos selecionados para durabilidade, precisão e repetibilidade em ambiente industrial.</p>
          </article>
          <article>
            <Users size={28} />
            <strong>Atendimento consultivo</strong>
            <p>Equipe preparada para apoiar equivalência, medidas, disponibilidade e melhor alternativa para o molde.</p>
          </article>
          <article>
            <MapPin size={28} />
            <strong>Presença regional</strong>
            <p>Unidades em Curitiba, Joinville e São Paulo, com atendimento para todo o território nacional.</p>
          </article>
        </div>
      </section>

      <section className="about-band">
        <div>
          <span className="eyebrow">Posicionamento</span>
          <h2>Um catálogo feito para acelerar decisões técnicas.</h2>
        </div>
        <p>
          A nova experiência digital prioriza busca, linha de produtos, dados técnicos e contato rápido com consultores,
          reduzindo o caminho entre a necessidade do projeto e a peça correta.
        </p>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero">
        <div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Início</a>
            <span>/</span>
            <strong>Contato</strong>
          </nav>
          <span className="eyebrow">Atendimento</span>
          <h1>Fale com a<br />Compomoldes.</h1>
          <p>
            Envie sua solicitação para orçamento, suporte técnico ou disponibilidade de produtos. Atendimento de segunda
            a sexta-feira, das 09h às 18h.
          </p>
          <div className="hero-actions">
            <a className="primary-cta" href="https://wa.link/cnkp9d">Chamar no WhatsApp</a>
            <a className="secondary-cta" href="mailto:vendas@compomoldes.com.br">Enviar e-mail</a>
          </div>
        </div>
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Nome
            <input type="text" placeholder="Seu nome" />
          </label>
          <label>
            Empresa
            <input type="text" placeholder="Nome da empresa" />
          </label>
          <label>
            E-mail
            <input type="email" placeholder="seuemail@empresa.com.br" />
          </label>
          <label>
            Mensagem
            <textarea rows="4" placeholder="Descreva o produto, medida ou aplicação que precisa consultar." />
          </label>
          <button className="primary-cta" type="submit">
            Enviar solicitação <Send size={18} />
          </button>
        </form>
      </section>

      <section className="section units-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Unidades</span>
            <h2>Atendimento por região.</h2>
          </div>
        </div>
        <div className="units-grid">
          {units.map((unit) => (
            <article className="unit-card" key={unit.city}>
              <strong>{unit.city}</strong>
              <span><MapPin size={17} /> {unit.address}</span>
              <a href={`tel:${unit.phone.replace(/\D/g, "")}`}><Phone size={17} /> {unit.phone}</a>
              <a href={`mailto:${unit.email}`}><Mail size={17} /> {unit.email}</a>
              <a className="text-link" href={unit.whatsapp}>WhatsApp da unidade</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ProductPage({ product }) {
  const details = productDetails(product);
  const related = products
    .filter((item) => item.line === product.line && item.name !== product.name)
    .concat(products.filter((item) => item.line !== product.line))
    .slice(0, 4);

  return (
    <>
      <section className="product-page">
        <aside className="product-sidebar">
          <span className="sidebar-title">INJEÇÃO PLÁSTICA</span>
          {productLines.map((line) => (
            <a className={line === product.line ? "active" : ""} href={`/#produtos`} key={line}>
              {line}
              <ArrowRight size={15} />
            </a>
          ))}
        </aside>

        <article className="product-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Início</a>
            <span>/</span>
            <a href="/#produtos">Produtos</a>
            <span>/</span>
            <strong>{product.name}</strong>
          </nav>

          <div className="product-hero-panel">
            <div className="product-gallery">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-intro">
              <span className="eyebrow">{product.line}</span>
              <h1>{product.name}</h1>
              <p>{product.summary}</p>
              <dl className="product-meta">
                <div>
                  <dt>Código base</dt>
                  <dd>{details.code}</dd>
                </div>
                <div>
                  <dt>Disponibilidade</dt>
                  <dd>{details.available}</dd>
                </div>
                <div>
                  <dt>Aplicação</dt>
                  <dd>Moldes de injeção</dd>
                </div>
              </dl>
              <div className="detail-actions">
                <a href="#orcamento" className="primary-cta">Solicitar orçamento</a>
                <button type="button" className="download-button">
                  <Download size={18} />
                  Baixar ficha técnica
                </button>
              </div>
            </div>
          </div>

          <nav className="product-anchor-nav">
            <a href="#mais-informacoes">Mais informações</a>
            <a href="#caracteristicas">Características</a>
            <a href="#aplicacoes-produto">Aplicações</a>
            <a href="#tabela-tecnica">Tabela técnica</a>
            <a href="#orcamento">Orçamento</a>
          </nav>

          <section className="product-info-section" id="mais-informacoes">
            <span className="section-kicker"><FileText size={18} /> Mais informações</span>
            <h2>{product.name} para projetos e reposição técnica.</h2>
            <p>
              Esta página reúne os dados principais para pré-seleção do componente, validação de aplicação e abertura de
              orçamento. Para itens com medidas especiais, a equipe técnica pode confirmar equivalência, material,
              tratamento e disponibilidade.
            </p>
          </section>

          <section className="product-info-grid">
            <div className="info-block" id="caracteristicas">
              <span className="section-kicker"><ShieldCheck size={18} /> Características</span>
              {details.features.concat(product.specs).map((item) => (
                <p key={item}><CheckCircle2 size={17} /> {item}</p>
              ))}
            </div>
            <div className="info-block" id="aplicacoes-produto">
              <span className="section-kicker"><Factory size={18} /> Aplicações</span>
              {details.applications.map((item) => (
                <p key={item}><CheckCircle2 size={17} /> {item}</p>
              ))}
            </div>
          </section>

          <section className="technical-table-section" id="tabela-tecnica">
            <div>
              <span className="section-kicker"><Ruler size={18} /> Dados técnicos</span>
              <h2>Especificações para consulta</h2>
            </div>
            <table className="technical-table">
              <tbody>
                {details.table.map(([label, value]) => (
                  <tr key={label}>
                    <th>{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="quote-box" id="orcamento">
            <div>
              <span className="section-kicker"><LayoutList size={18} /> Para solicitar orçamento</span>
              <h2>Informe a linha, o código base e as medidas do projeto.</h2>
              <p>
                Quando houver desenho técnico, envie o arquivo junto da solicitação. Isso reduz retrabalho e acelera a
                confirmação de disponibilidade, equivalência e prazo.
              </p>
            </div>
            <a className="primary-cta" href="https://wa.link/cnkp9d">Falar com consultor</a>
          </section>
        </article>
      </section>

      <section className="section related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Relacionados</span>
            <h2>Produtos próximos</h2>
          </div>
          <a className="text-link" href="/#produtos">Ver catálogo</a>
        </div>
        <div className="related-grid">
          {related.map((item) => (
            <a className="related-card" href={productPath(item)} key={item.name}>
              <span className="product-image">
                <img src={item.image} alt={item.name} />
              </span>
              <span className="product-line">{item.line}</span>
              <strong>{item.name}</strong>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [activeLine, setActiveLine] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  const activeProduct = getProductByPath(path);
  const isAboutPage = path === "/quem-somos";
  const isContactPage = path === "/contato";
  const isInnerPage = activeProduct || isAboutPage || isContactPage;

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const byLine = activeLine === "Todos" || product.line === activeLine;
      const byText = !term || `${product.name} ${product.line} ${product.summary}`.toLowerCase().includes(term);
      return byLine && byText;
    });
  }, [activeLine, query]);

  const chooseLine = (line) => {
    setActiveLine(line);
    setMenuOpen(false);
    if (isInnerPage) {
      window.location.href = `/#produtos`;
      return;
    }
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <header className="site-header">
        <div className="header-main">
          <a className="brand" href="/" aria-label="Compomoldes">
            <img src={logo} alt="Compomoldes" />
          </a>

          <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
            <button type="button" className="category-button">
              Todas <ChevronDown size={16} />
            </button>
            <label className="search-input">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pesquisar produtos"
              />
            </label>
            <button type="submit" className="search-button">Pesquisar</button>
          </form>

          <div className="header-actions" aria-label="Atendimento e acesso">
            <a href="tel:+554130854649" className="phone-block">
              <Phone size={26} />
              <span>Televendas/WhatsApp<strong>(41) 3085-4649</strong></span>
            </a>
            <button type="button" className="icon-button" title="Catálogo">
              <ClipboardList size={25} />
            </button>
            <button type="button" className="login-button">
              <User size={28} />
              <span>Área técnica<strong>Entrar</strong></span>
            </button>
          </div>
        </div>

        <nav className="nav-row">
          <button type="button" className="line-trigger" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />} Linha de Produtos
          </button>
          <a href="/#produtos">Produtos</a>
          <a href="/quem-somos">Quem somos</a>
          <a href="/#aplicacoes">Indústrias</a>
          <a href="/#consultor">Consultoria Técnica</a>
          <a href="/#produtos">Downloads</a>
          <a href="/contato">Contato</a>
        </nav>

        {menuOpen && (
          <div className="mega-menu">
            {productLines.map((line) => (
              <button type="button" key={line} onClick={() => chooseLine(line)}>
                {line}
                <ArrowRight size={17} />
              </button>
            ))}
          </div>
        )}
      </header>

      {activeProduct ? (
        <ProductPage product={activeProduct} />
      ) : isAboutPage ? (
        <AboutPage />
      ) : isContactPage ? (
        <ContactPage />
      ) : (
        <>
      <div className="hero-outer">
        <HeroVideo />
        <div className="hero-scrim" aria-hidden="true" />
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Componentes para moldes de injeção</span>
            <h1>Componentes certos para moldes mais produtivos.</h1>
            <p>
              Encontre linhas técnicas, aplicações e especificações de componentes para moldes de injeção com atendimento
              especializado em todo o Brasil.
            </p>
            <div className="hero-actions">
              <a className="primary-cta" href="#produtos">
                Ver produtos <ArrowRight size={19} />
              </a>
              <a className="secondary-cta" href="#consultor">
                Falar com consultor
              </a>
            </div>
            <div className="trust-row">
              <span><ShieldCheck size={18} /> Qualidade industrial</span>
              <span><Factory size={18} /> Entrega nacional</span>
              <span><Wrench size={18} /> Suporte técnico</span>
            </div>
          </div>
        </section>
      </div>

      <section className="section products-section" id="produtos">
        <div className="line-strip" aria-label="Linhas de produtos">
          {productLines.slice(0, 8).map((line) => (
            <button type="button" key={line} onClick={() => chooseLine(line)}>
              {line}
            </button>
          ))}
        </div>

        <div className="section-heading">
          <div>
            <span className="eyebrow">Catálogo</span>
            <h2>Produtos em destaque</h2>
          </div>
          <div className="filter-pill">
            <SlidersHorizontal size={17} />
            {activeLine}
          </div>
        </div>

        <div className="catalog-layout">
          <aside className="filters">
            <button
              type="button"
              className={activeLine === "Todos" ? "active" : ""}
              onClick={() => setActiveLine("Todos")}
            >
              Todos os produtos
            </button>
            {productLines.map((line) => (
              <button
                type="button"
                key={line}
                className={activeLine === line ? "active" : ""}
                onClick={() => setActiveLine(line)}
              >
                {line}
              </button>
            ))}
          </aside>

          <div className="product-grid">
            {filtered.map((product) => (
              <article className="product-card" key={product.name}>
                <a href={productPath(product)}>
                  <span className="product-image">
                    <img src={product.image} alt={product.name} />
                  </span>
                  <span className="product-line">{product.line}</span>
                  <strong>{product.name}</strong>
                  <span>{product.summary}</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section application-section" id="aplicacoes">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Aplicações</span>
            <h2>Componentes para setores que exigem repetibilidade.</h2>
          </div>
        </div>
        <div className="application-grid">
          {["Automotivo", "Embalagens", "Linha branca", "Ferramentarias"].map((item) => (
            <div className="application-item" key={item}>
              <Factory size={24} />
              <strong>{item}</strong>
              <span>Peças, moldes e componentes com seleção técnica por aplicação.</span>
            </div>
          ))}
        </div>
      </section>

      <section className="consultant-band" id="consultor">
        <div>
          <span className="eyebrow">Consultoria técnica</span>
          <h2>Precisa validar medidas, aplicação ou equivalência?</h2>
          <p>O atendimento da Compomoldes apoia a seleção do componente e a disponibilidade por unidade.</p>
        </div>
        <a className="primary-cta" href="https://wa.link/cnkp9d">Chamar no WhatsApp</a>
      </section>
        </>
      )}

      <footer className="footer" id="contato">
        <div>
          <img src={logo} alt="Compomoldes" />
          <p>Componentes para moldes de injeção com atendimento em Curitiba, Joinville e São Paulo.</p>
        </div>
        <address>
          <span><MapPin size={17} /> Rua Napoleão Laureano, 300 - Curitiba/PR</span>
          <span><Phone size={17} /> (41) 3085-4649</span>
          <span><Mail size={17} /> vendas@compomoldes.com.br</span>
        </address>
      </footer>
    </main>
  );
}

export default App;
