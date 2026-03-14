import Head from "next/head";
import React from "react";

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
      <header className="header">
        <div className="container header-main flex items-center justify-between">
          <div className="logo" style={{ fontSize: '2rem', color: 'var(--electro-dark)', display: 'flex' }}>
            <span style={{ fontWeight: 800 }}>Electro</span>
            <span style={{ color: 'var(--electro-yellow)', fontWeight: 300 }}>Store</span>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Procurar produtos..." />
            <button>Pesquisar</button>
          </div>

          <div className="header-actions flex gap-4 items-center">
            <div className="wishlist" style={{ fontSize: '1.5rem' }}>❤️</div>
            <div className="cart flex items-center gap-2">
              <span style={{ fontSize: '1.8rem' }}>🛒</span>
              <div className="cart-content">
                <div style={{ fontSize: '10px', color: '#888' }}>Cart</div>
                <div style={{ fontWeight: 700 }}>R$ 0,00</div>
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
            <div className="sidebar-menu">
              <div className="sidebar-header">Categorias</div>
              <ul className="sidebar-list">
                {categories.map(cat => (
                  <li key={cat}><a href="#">{cat}</a></li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="main-content">
            {/* Hero Slider */}
            <section className="hero" style={{ background: 'var(--electro-gray)', padding: '40px', borderRadius: '4px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--electro-border)' }}>
              <div className="hero-text">
                <div style={{ color: 'var(--electro-yellow)', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase' }}>Lançamento 2026</div>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px', lineHeight: 1.1 }}>Sistemas de Som <br /><strong>Ultra HD Pro</strong></h1>
                <p style={{ marginBottom: '20px', color: '#666', maxWidth: '300px' }}>A experiência definitiva em áudio para sua casa com cancelamento de ruído.</p>
                <button className="btn btn-primary">Ver Oferta</button>
              </div>
              <div style={{ fontSize: '10rem', opacity: 0.1 }}>🎧</div>
            </section>

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
      <footer style={{ background: 'var(--electro-gray)', padding: '60px 0', borderTop: '1px solid var(--electro-border)', marginTop: '60px' }}>
        <div className="container">
          <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>
            Electro<span>Store</span>
          </div>
          <p style={{ color: '#888' }}>© 2026 ElectroStore. Design oficial integrado com MedusaJS e Next.js.</p>
        </div>
      </footer>
    </div>
  );
}
