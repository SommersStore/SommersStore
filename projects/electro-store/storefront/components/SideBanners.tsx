import React from 'react';

const SideBanners = () => {
  return (
    <section className="side-banners-grid">
      <div className="banner center-banner">
        <div className="banner-content">
          <span className="badge">Limited Edition</span>
          <h3>Smartphones <strong>Ultra</strong></h3>
          <p>The best tech in your hand.</p>
          <a href="#" className="shop-now">Shop Now ›</a>
        </div>
      </div>
      <div className="banner side-banner">
        <div className="banner-content">
          <h3>Tablets <strong>Pro</strong></h3>
          <p>Work from anywhere.</p>
        </div>
      </div>
      
      <style jsx>{`
        .side-banners-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 40px;
        }
        .banner {
          background: #f5f5f5;
          height: 200px;
          border-radius: 4px;
          padding: 30px;
          display: flex;
          align-items: center;
          border: 1px solid var(--electro-border);
          transition: 0.3s;
          cursor: pointer;
        }
        .banner:hover {
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          transform: translateY(-5px);
        }
        .center-banner {
          background: linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%);
        }
        .side-banner {
          background: linear-gradient(90deg, #fff9c4 0%, #fff176 100%);
        }
        .banner-content h3 {
          font-size: 1.8rem;
          margin-bottom: 10px;
        }
        .badge {
          background: var(--electro-yellow);
          padding: 3px 10px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .shop-now {
          display: inline-block;
          margin-top: 15px;
          font-weight: 700;
          color: var(--electro-blue);
        }
      `}</style>
    </section>
  );
};

export default SideBanners;
