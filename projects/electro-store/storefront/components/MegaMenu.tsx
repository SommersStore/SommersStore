import React from 'react';

const MegaMenu = () => {
  const menuItems = [
    { 
      title: "Gadgets", 
      icon: "📱",
      promo: {
        title: "Gadgets 2026",
        image: "/images/vertical_mega_menu_bg_img_1.jpg"
      },
      subs: ["Smartphones", "Tablets", "Wearables", "Power Banks"]
    },
    { 
      title: "Computadores", 
      icon: "💻",
      promo: {
        title: "Laptops Pro",
        image: "/images/vertical_mega_menu_bg_img_2.jpg"
      },
      subs: ["Laptops", "Desktops", "Monitores", "Componentes"]
    },
    // Add more based on Electro V1
  ];

  return (
    <div className="mega-menu-vertical">
      <div className="sidebar-header">Categorias</div>
      <ul className="sidebar-list">
        {menuItems.map((item, idx) => (
          <li key={idx} className="menu-item-has-children">
            <a href="#" className="flex items-center justify-between">
              <span>{item.icon} {item.title}</span>
              <span className="arrow">›</span>
            </a>
            <div className="mega-menu-content">
              <div className="mega-menu-columns">
                <div className="column">
                  <h4>{item.title}</h4>
                  <ul>
                    {item.subs.map((sub, sidx) => (
                      <li key={sidx}><a href="#">{sub}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mega-menu-promo" style={{ backgroundImage: `url(${item.promo.image})` }}>
                <div className="promo-text">{item.promo.title}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .mega-menu-vertical {
          border: 1px solid var(--electro-border);
          position: relative;
        }
        .sidebar-header {
          background: var(--electro-dark);
          color: var(--electro-white);
          padding: 15px 20px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .sidebar-list {
          list-style: none;
        }
        .sidebar-list li a {
          display: flex;
          padding: 12px 20px;
          border-bottom: 1px solid var(--electro-border);
          font-weight: 600;
          transition: 0.3s;
        }
        .sidebar-list li a:hover {
          background: var(--electro-gray);
          color: var(--electro-blue);
        }
        .arrow {
          font-size: 1.2rem;
          color: #ccc;
        }
        
        /* MEGA MENU EXPANSION */
        .menu-item-has-children {
          position: static; /* Important for full-height mega menu */
        }
        .mega-menu-content {
          position: absolute;
          left: 100%;
          top: 0;
          width: 600px;
          height: 100%;
          background: white;
          border: 1px solid var(--electro-border);
          display: none;
          z-index: 1000;
          box-shadow: 10px 0 30px rgba(0,0,0,0.1);
          padding: 30px;
          display: none;
          flex-direction: row;
        }
        .menu-item-has-children:hover .mega-menu-content {
          display: flex;
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .mega-menu-columns {
          flex: 1;
        }
        .mega-menu-columns h4 {
          margin-bottom: 15px;
          border-bottom: 1px solid var(--electro-border);
          padding-bottom: 10px;
        }
        .mega-menu-columns ul li {
          margin-bottom: 8px;
        }
        .mega-menu-columns ul li a:hover {
          color: var(--electro-blue);
        }
        .mega-menu-promo {
          width: 200px;
          background-size: cover;
          background-position: center;
          border-radius: 4px;
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }
        .promo-text {
          background: var(--electro-yellow);
          padding: 5px 10px;
          font-weight: 700;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};

export default MegaMenu;
