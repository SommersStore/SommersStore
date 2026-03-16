import Head from "next/head";
import React from "react";
import MegaMenu from "../components/MegaMenu";
import SideBanners from "../components/SideBanners";
import DealAndTabs from "../components/DealAndTabs";

export default function Home() {
  const categories = [
    "Acessórios", "Áudio & Vídeo", "Câmeras & Fotos", "Computadores & Laptops",
    "Gadgets", "GPS & Navegação", "Home Theater & Áudio", "Smartphones",
    "Software", "Vídeo Games"
  ];

  return (
    <div className="site-wrapper">
      <Head>
        <title>ElectroStore | Sua Loja de Tecnologia Premium</title>
        <meta name="description" content="Design oficial Electro com Next.js e MedusaJS." />
      </Head>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="container flex justify-between">
          <div className="welcome-msg">Bem-vindo à ElectroStore! Aproveite nossas ofertas.</div>
          <div className="top-links flex gap-4">
            <span>Rastrear Pedido</span>
            <span>Minha Conta</span>
            <span>Suporte</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header" style={{ padding: '30px 0', borderBottom: '1px solid var(--electro-border)', background: 'white' }}>
        <div className="container header-main" style={{ display: 'grid', gridTemplateColumns: '250px 1fr 300px', alignItems: 'center', gap: '40px' }}>
          <div className="logo" style={{ fontSize: '2.5rem', color: 'var(--electro-dark)', display: 'flex' }}>
            <span style={{ fontWeight: 800 }}>Electro</span>
            <span style={{ color: 'var(--electro-yellow)', fontWeight: 300 }}>Store</span>
          </div>

          <div className="search-bar" style={{ display: 'flex', border: '2px solid var(--electro-yellow)', borderRadius: '50px', overflow: 'hidden', height: '50px' }}>
            <input 
              type="text" 
              placeholder="Procurar produtos..." 
              style={{ flex: 1, border: 'none', padding: '0 25px', outline: 'none', fontSize: '1rem' }}
            />
            <button style={{ background: 'var(--electro-yellow)', border: 'none', padding: '0 30px', fontWeight: 800, cursor: 'pointer', fontSize: '0.9rem' }}>
              PESQUISAR
            </button>
          </div>

          <div className="header-actions" style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div className="action-item" style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '1.5rem', position: 'relative' }}>
                🔄
                <span style={{ position: 'absolute', top: '-8px', right: '-10px', background: 'var(--electro-yellow)', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifySelf: 'center', fontWeight: 800, justifyContent: 'center' }}>0</span>
              </div>
            </div>
            <div className="action-item" style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: '1.5rem', position: 'relative' }}>
                ❤️
                <span style={{ position: 'absolute', top: '-8px', right: '-10px', background: 'var(--electro-yellow)', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifySelf: 'center', fontWeight: 800, justifyContent: 'center' }}>0</span>
              </div>
            </div>
            <div className="cart flex items-center gap-3" style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '2rem', position: 'relative' }}>
                🛒
                <span style={{ position: 'absolute', top: '-8px', right: '-10px', background: 'var(--electro-yellow)', borderRadius: '50%', width: '20px', height: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', justifySelf: 'center', fontWeight: 800, justifyContent: 'center' }}>0</span>
              </div>
              <div className="cart-content">
                <div style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', fontWeight: 700 }}>Carrinho</div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>R$ 0,00</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        <div className="home-grid">
          {/* Sidebar Categories */}
          <aside className="sidebar">
            <MegaMenu />
          </aside>

          {/* Main Content Area */}
          <div className="main-content">
            {/* Hero Slider */}
            <section className="hero" style={{ background: 'var(--electro-gray)', padding: '50px', borderRadius: '4px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--electro-border)', position: 'relative', overflow: 'hidden' }}>
              <div className="hero-text" style={{ zIndex: 2 }}>
                <div style={{ color: 'var(--electro-yellow)', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Lançamento 2026</div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', lineHeight: 1, fontWeight: 300 }}>Sistemas de Som <br /><strong style={{ fontWeight: 800 }}>Ultra HD Pro</strong></h1>
                <p style={{ marginBottom: '30px', color: '#666', maxWidth: '400px', fontSize: '1.1rem' }}>A experiência definitiva em áudio para sua casa com cancelamento de ruído ativo.</p>
                <button className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>Ver Oferta Agora</button>
              </div>
              <div style={{ fontSize: '18rem', opacity: 0.05, position: 'absolute', right: '-20px', bottom: '-40px' }}>🎧</div>
            </section>

            {/* Side Banners Dynamic */}
            <SideBanners />

            {/* Ads Block */}
            <section className="ads-block" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
              <div style={{ background: 'var(--electro-gray)', padding: '30px', textAlign: 'center', border: '1px solid var(--electro-border)' }}>
                <h3>Câmeras <strong>Premium</strong></h3>
                <a href="#" style={{ color: 'var(--electro-blue)', fontWeight: 700 }}>Ver agora</a>
              </div>
              <div style={{ background: 'var(--electro-gray)', padding: '30px', textAlign: 'center', border: '1px solid var(--electro-border)' }}>
                <h3>Smartphones <strong>Hottest</strong></h3>
                <a href="#" style={{ color: 'var(--electro-blue)', fontWeight: 700 }}>Ver agora</a>
              </div>
              <div style={{ background: 'var(--electro-gray)', padding: '30px', textAlign: 'center', border: '1px solid var(--electro-border)' }}>
                <h3>Tablets <strong>Android</strong></h3>
                <a href="#" style={{ color: 'var(--electro-blue)', fontWeight: 700 }}>Ver agora</a>
              </div>
            </section>

            {/* Products Section */}
            <section className="products">
              <h2 className="section-title">Produtos em Destaque</h2>
              <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="product-card" style={{ border: '1px solid var(--electro-border)', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{i % 2 === 0 ? "📱" : "💻"}</div>
                    <div className="product-category" style={{ fontSize: '10px', color: '#888' }}>TECNOLOGIA</div>
                    <a href="#" className="product-name" style={{ color: 'var(--electro-blue)', fontWeight: 600, display: 'block', margin: '10px 0' }}>Gadget Premium Model {i}</a>
                    <div className="product-price" style={{ fontWeight: 700, fontSize: '1.2rem' }}>R$ {i * 199},00</div>
                    <button className="btn btn-primary" style={{ marginTop: '15px', padding: '8px 20px', fontSize: '12px' }}>Adicionar</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer" style={{ background: 'var(--electro-gray)', borderTop: '1px solid var(--electro-border)', marginTop: '80px', padding: '60px 0 20px' }}>
        <div className="container">
          <div className="footer-newsletter" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '60px', borderBottom: '1px solid #ddd', paddingBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '2.5rem' }}>✉️</span>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Inscreva-se na Newsletter</h4>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>...e receba um cupom de 10% para sua primeira compra.</p>
              </div>
            </div>
            <div className="newsletter-form" style={{ display: 'flex', borderRadius: '50px', overflow: 'hidden', width: '500px' }}>
              <input type="email" placeholder="Seu endereço de e-mail" style={{ flex: 1, padding: '15px 25px', border: '1px solid #ddd', borderRight: 'none', outline: 'none' }} />
              <button style={{ background: 'var(--electro-dark)', color: 'white', border: 'none', padding: '0 30px', fontWeight: 700, cursor: 'pointer' }}>INSCREVER</button>
            </div>
          </div>

          <div className="footer-widgets" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '60px' }}>
            <div>
              <div className="logo" style={{ fontSize: '1.8rem', color: 'var(--electro-dark)', marginBottom: '20px' }}>
                <span style={{ fontWeight: 800 }}>Electro</span><span style={{ fontWeight: 300 }}>Store</span>
              </div>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.8 }}>Somos líderes em eletrônicos premium, trazendo as últimas novidades do mundo da tecnologia diretamente para você.</p>
              <div className="social-links" style={{ marginTop: '20px', display: 'flex', gap: '15px', fontSize: '1.2rem' }}>
                <span>📱</span><span>📸</span><span>🐦</span><span>📺</span>
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: '25px', fontWeight: 800, fontSize: '1rem' }}>Sustentação</h4>
              <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>Laptops & Computadores</li>
                <li>Câmeras & Fotos</li>
                <li>Smartphones & Tablets</li>
                <li>Vídeo Games & Consoles</li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '25px', fontWeight: 800, fontSize: '1rem' }}>Atendimento</h4>
              <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>Minha Conta</li>
                <li>Rastrear Pedido</li>
                <li>Lista de Desejos</li>
                <li>Ajuda & FAQ</li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '25px', fontWeight: 800, fontSize: '1rem' }}>Links Rápidos</h4>
              <ul style={{ listStyle: 'none', color: '#666', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>Sobre Nós</li>
                <li>Contato</li>
                <li>Privacidade</li>
                <li>Termos de Uso</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom" style={{ borderTop: '1px solid #ddd', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#888', fontSize: '0.8rem' }}>© 2026 ElectroStore. Todos os direitos reservados. Design oficial.</p>
            <div className="payment-icons" style={{ display: 'flex', gap: '10px', opacity: 0.5, fontSize: '1.5rem' }}>
              💳 🏦 🏧 💰
            </div>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        .container { max-width: 1200px; margin: 0 auto; px: 15px; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        
        .btn { padding: 10px 25px; border-radius: 50px; font-weight: 700; cursor: pointer; border: none; transition: 0.3s; }
        .btn-primary { background: var(--electro-yellow); color: var(--electro-dark); }
        .btn-primary:hover { background: var(--electro-dark); color: white; transform: translateY(-2px); }

        .product-card { transition: 0.4s ease; background: white; }
        .product-card:hover { 
          transform: translateY(-10px); 
          box-shadow: 0 15px 30px rgba(0,0,0,0.1); 
          z-index: 10;
          border-color: var(--electro-yellow) !important;
        }
        
        .top-bar { background: var(--electro-gray); padding: 10px 0; font-size: 0.8rem; border-bottom: 1px solid #eee; }
      `}</style>
    </div>
  );
}
