import React, { useState } from 'react';

const DealAndTabs = () => {
  const [activeTab, setActiveTab] = useState('Destaque');
  const tabs = ['Destaque', 'Em Oferta', 'Mais Vendidos'];

  const products = [
    { name: "Smartphone Z Flip 5", price: "R$ 4.599", oldPrice: "R$ 5.999", img: "📱" },
    { name: "Macbook Air M2", price: "R$ 8.999", oldPrice: "R$ 10.999", img: "💻" },
    { name: "Sony WH-1000XM5", price: "R$ 2.199", oldPrice: "R$ 2.499", img: "🎧" },
    { name: "Canon EOS R6", price: "R$ 12.500", oldPrice: "R$ 14.000", img: "📷" },
    { name: "iPad Pro M1", price: "R$ 7.200", oldPrice: "R$ 8.500", img: "平板" },
    { name: "Apple Watch S8", price: "R$ 3.100", oldPrice: "R$ 3.800", img: "⌚" },
  ];

  return (
    <section className="deal-tabs-grid">
      {/* Special Offer (Left) */}
      <div className="special-offer">
        <div className="section-title">Oferta Especial</div>
        <div className="offer-card">
          <div className="product-img-large">🎮</div>
          <h3>Game Console <strong>PlayBox S</strong></h3>
          <div className="price-tag">
            <span className="current">R$ 2.899</span>
            <span className="old">R$ 3.499</span>
          </div>
          <div className="inventory-bar">
            <div className="bar-label">Disponível: <strong>12</strong></div>
            <div className="bar-track"><div className="bar-fill" style={{ width: '40%' }}></div></div>
          </div>
          <div className="countdown-timer">
            <div className="time-block"><span>02</span><small>Dias</small></div>
            <div className="time-block"><span>14</span><small>Horas</small></div>
            <div className="time-block"><span>35</span><small>Mins</small></div>
            <div className="time-block"><span>18</span><small>Segs</small></div>
          </div>
        </div>
      </div>

      {/* Tabs Section (Right) */}
      <div className="tabs-section">
        <ul className="tabs-nav">
          {tabs.map(tab => (
            <li 
              key={tab} 
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <div className="products-grid">
          {products.map((p, idx) => (
            <div key={idx} className="product-card">
              <div className="p-img">{p.img}</div>
              <div className="p-info">
                <div className="p-cat">Eletrônicos</div>
                <h4>{p.name}</h4>
                <div className="p-price">
                  <span className="p-curr">{p.price}</span>
                  <span className="p-old">{p.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .deal-tabs-grid {
          display: grid;
          grid-template-columns: 1fr 3fr;
          gap: 30px;
          margin-bottom: 50px;
        }
        .special-offer {
          border: 2px solid var(--electro-yellow);
          border-radius: 4px;
          padding: 20px;
          background: white;
        }
        .section-title {
          font-weight: 800;
          font-size: 1.2rem;
          margin-bottom: 20px;
          text-transform: uppercase;
          border-bottom: 1px solid var(--electro-border);
          padding-bottom: 10px;
        }
        .offer-card {
          text-align: center;
        }
        .product-img-large {
          font-size: 6rem;
          margin-bottom: 20px;
        }
        .price-tag {
          margin: 15px 0;
        }
        .price-tag .current {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--electro-red);
          margin-right: 10px;
        }
        .price-tag .old {
          text-decoration: line-through;
          color: #aaa;
        }
        .inventory-bar {
          margin: 20px 0;
          text-align: left;
        }
        .bar-label { font-size: 0.8rem; margin-bottom: 5px; }
        .bar-track { height: 8px; background: #eee; border-radius: 10px; overflow: hidden; }
        .bar-fill { height: 100%; background: var(--electro-yellow); }
        
        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
        }
        .time-block {
          background: #333;
          color: white;
          padding: 8px;
          border-radius: 4px;
          min-width: 50px;
        }
        .time-block span { display: block; font-weight: 800; font-size: 1.2rem; }
        .time-block small { font-size: 0.6rem; text-transform: uppercase; opacity: 0.7; }

        /* TABS */
        .tabs-nav {
          display: flex;
          gap: 30px;
          border-bottom: 1px solid var(--electro-border);
          list-style: none;
          margin-bottom: 30px;
        }
        .tabs-nav li {
          padding: 10px 0;
          font-weight: 700;
          cursor: pointer;
          position: relative;
          color: #888;
        }
        .tabs-nav li.active {
          color: var(--electro-dark);
        }
        .tabs-nav li.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--electro-yellow);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid var(--electro-border);
          border-left: 1px solid var(--electro-border);
        }
        .product-card {
          padding: 30px;
          border-right: 1px solid var(--electro-border);
          border-bottom: 1px solid var(--electro-border);
          transition: 0.3s;
          background: white;
        }
        .product-card:hover { border-color: transparent; box-shadow: 0 0 20px rgba(0,0,0,0.1); z-index: 10; }
        .p-img { font-size: 4rem; text-align: center; margin-bottom: 20px; }
        .p-cat { font-size: 0.7rem; color: #888; text-transform: uppercase; margin-bottom: 5px; }
        .p-info h4 { font-size: 1rem; color: var(--electro-blue); margin-bottom: 10px; height: 40px; overflow: hidden; }
        .p-curr { font-weight: 800; font-size: 1.1rem; margin-right: 10px; }
        .p-old { text-decoration: line-through; color: #ccc; font-size: 0.9rem; }
      `}</style>
    </section>
  );
};

export default DealAndTabs;
