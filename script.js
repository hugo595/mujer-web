/**
 * Resolves the base path relative to the current file to support
 * navigating between root pages (index.html) and subpages (/pages/...)
 */
function getBasePath() {
  const isPagesDir = window.location.pathname.includes('/pages/');
  return isPagesDir ? '../' : './';
}

/**
 * Agrega los iconos de Lucide al cargar la página de forma más robusta
 */
function loadLucideIcons() {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lucide@latest';
  script.onload = () => {
    if (window.lucide) {
      window.lucide.createIcons();
      // Refresco adicional para asegurar componentes
      setTimeout(() => window.lucide.createIcons(), 100);
      setTimeout(() => window.lucide.createIcons(), 500);
    }
  };
  document.head.appendChild(script);
}

/**
 * 1. APP-HEADER COMPONENT
 */
class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.base = getBasePath();
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        .site-header {
          background-color: var(--color-surface);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border-bottom: 1px solid var(--color-border);
          padding: 0.6rem 0;
        }
        
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo-area {
          display: flex;
          align-items: center;
          height: 80px;
          overflow: hidden;
          margin-left: -90px;
          text-decoration: none;
        }

        .logo-img {
          height: 130px;
          width: auto;
          object-fit: contain;
          mix-blend-mode: multiply;
          filter: brightness(1.05) contrast(1.1);
          margin-top: -5px;
        }

        .main-nav {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .nav-link {
          color: var(--color-text);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link:hover, 
        .nav-link.active {
          color: var(--color-primary);
          background-color: rgba(106, 27, 154, 0.08);
        }

        .nav-link:active {
          transform: scale(0.95);
          background-color: rgba(106, 27, 154, 0.15);
        }

        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          transform: translateY(10px);
          background-color: var(--color-surface);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--color-border);
          width: 260px;
          padding: 0.5rem 0;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: 0.8rem 1.5rem;
          color: var(--color-text);
          text-decoration: none;
          font-size: 0.9rem;
          transition: background-color 0.2s;
        }

        .dropdown-item:hover {
          background-color: var(--color-bg);
          color: var(--color-primary);
        }

        /* Botón de Contacto Estilo Premium */
        .btn-contact {
          background-color: #6A1B9A;
          color: white !important;
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: 0 4px 12px rgba(106, 27, 154, 0.3);
          transition: all 0.3s ease;
        }

        .btn-contact:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(106, 27, 154, 0.4);
          background-color: #7B1FA2;
        }

        /* Theme Toggle Estilo Sol */
        .theme-toggle {
          background-color: #FFF9C4;
          color: #FBC02D;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .theme-toggle:hover {
          background-color: #FFF176;
          transform: scale(1.1) rotate(15deg);
        }

        [data-theme="dark"] .theme-toggle {
          background-color: #1a1421;
          color: #F8F9FA;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
          padding: 0.5rem;
        }

        @media (max-width: 992px) {
          .header-container { padding: 0 1.2rem; }
          .logo-area { margin-left: 0; height: 60px; }
          .logo-img { height: 100px; margin-top: 0; }
          .main-nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-surface);
            flex-direction: column;
            padding: 1.5rem;
            box-shadow: var(--shadow-lg);
            border-top: 1px solid var(--color-border);
            gap: 1rem;
          }
          .main-nav.active { display: flex; }
          .mobile-toggle { display: block; }
          .dropdown-menu {
            position: static;
            transform: none;
            opacity: 1;
            visibility: visible;
            display: none;
            width: 100%;
            box-shadow: none;
            border: none;
            padding-left: 1rem;
          }
          .dropdown.active .dropdown-menu { display: block; }
        }
      </style>

      <header class="site-header">
        <div class="container header-container">
          <a href="${this.base}index.html" class="logo-area">
            <img src="${this.base}assets/img/logo.png" alt="Logo" class="logo-img">
          </a>

          <div style="display: flex; align-items: center; gap: 1rem;">
            <button class="mobile-toggle" id="mobileMenuBtn">
              <i data-lucide="menu"></i>
            </button>
          </div>

          <nav class="main-nav" id="mainNav">
            <a href="${this.base}index.html" class="nav-link">Inicio</a>
            
            <div class="dropdown">
              <div class="nav-link dropdown-toggle">
                Temas de Interés
                <i data-lucide="chevron-down" style="width: 16px; height: 16px;"></i>
              </div>
              <div class="dropdown-menu">
                <a href="${this.base}pages/violentometro.html" class="dropdown-item" style="font-weight: 800; color: #D32F2F;">Violentómetro</a>
                <a href="${this.base}pages/prevencion.html" class="dropdown-item">Prevención de Violencia</a>
                <a href="${this.base}pages/tipos-violencia.html" class="dropdown-item">Tipos de Violencia</a>
                <a href="${this.base}pages/amor-propio.html" class="dropdown-item">Amor Propio</a>
                <a href="${this.base}pages/empoderamiento.html" class="dropdown-item">Empoderamiento</a>
                <a href="${this.base}pages/equidad-genero.html" class="dropdown-item">Equidad de Género</a>
                <a href="${this.base}pages/masculinidades.html" class="dropdown-item">Masculinidades</a>
                <a href="${this.base}pages/regulacion-emocional.html" class="dropdown-item">Regulación Emocional</a>
                <a href="${this.base}pages/noviazgo.html" class="dropdown-item">Violencia en el Noviazgo</a>
                <a href="${this.base}pages/violencia-genero.html" class="dropdown-item">Violencia de Género</a>
              </div>
            </div>

            <a href="${this.base}pages/contacto.html" class="nav-link btn-contact">
              <i data-lucide="phone" style="width: 18px; height: 18px;"></i>
              Contacto
            </a>
          </nav>
        </div>
      </header>
    `;

    this.initMobileMenu();
    this.setActiveLink();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setActiveLink() {
    const path = window.location.pathname;
    const isHome = path.endsWith('index.html') || path.endsWith('/') || path === '';
    const isPages = path.includes('/pages/') && !path.endsWith('contacto.html');
    
    if (isHome) {
      const homeLink = this.querySelector('a[href*="index.html"]');
      if (homeLink) homeLink.classList.add('active');
    } else if (isPages) {
      const themesLink = this.querySelector('.dropdown-toggle');
      if (themesLink) themesLink.classList.add('active');
    }
  }



  initMobileMenu() {
    const mobileBtn = this.querySelector('#mobileMenuBtn');
    const mainNav = this.querySelector('#mainNav');

    // Icon toggling
    mobileBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    // Lógica para dropdown en móvil
    const dropdowns = this.querySelectorAll('.dropdown');
    dropdowns.forEach(dd => {
      dd.querySelector('.dropdown-toggle').addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          dd.classList.toggle('active');
        }
      });
    });
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}
customElements.define('app-header', AppHeader);


/**
 * 2. APP-FOOTER COMPONENT
 */
class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.base = getBasePath();
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        .site-footer {
          background-color: var(--color-primary-dark);
          color: rgba(255, 255, 255, 0.8);
          padding: 4rem 0 2rem;
          margin-top: auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-logo {
          color: white;
          font-family: var(--font-family-headings);
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 1rem;
          display: block;
        }

        .footer-title {
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .footer-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.5rem;
          width: 40px;
          height: 2px;
          background-color: var(--color-accent);
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-links a:hover {
          color: white;
          padding-left: 5px;
        }

        .footer-contact li {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          align-items: flex-start;
        }

        .footer-contact i {
          color: var(--color-accent);
          flex-shrink: 0;
          margin-top: 4px;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2rem;
          text-align: center;
          font-size: 0.875rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          color: white;
          transition: var(--transition-normal);
        }

        .social-links a:hover {
          background: var(--color-primary);
          transform: translateY(-3px);
        }

        @media (max-width: 480px) {
          .site-footer { padding: 2.5rem 0 1.5rem; }
          .footer-grid { gap: 2rem; margin-bottom: 2rem; }
          .footer-title { margin-bottom: 1rem; }
        }
      </style>

      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            
            <!-- Columna 1 -->
            <div>
              <div class="footer-logo">INSTANCIA MUNICIPAL DE LAS MUJERES</div>
              <p>Trabajando por la igualdad, la justicia y una vida libre de violencia para todas las mujeres del municipio.</p>
              <div class="social-links">
                <a href="https://wa.me/527759742084" target="_blank" title="WhatsApp"><i data-lucide="message-circle"></i></a>
                <a href="#" title="Facebook"><i data-lucide="facebook"></i></a>
                <a href="#" title="Twitter"><i data-lucide="twitter"></i></a>
                <a href="#" title="Instagram"><i data-lucide="instagram"></i></a>
              </div>
            </div>

            <!-- Columna 2 -->
            <div>
              <h3 class="footer-title">Enlaces Rápidos</h3>
              <ul class="footer-links">
                <li><a href="${this.base}index.html">Inicio</a></li>
                <li><a href="${this.base}pages/violencia-genero.html">Violencia de Género</a></li>
                <li><a href="${this.base}pages/empoderamiento.html">Empoderamiento</a></li>
                <li><a href="${this.base}pages/amor-propio.html">Amor Propio</a></li>
              </ul>
            </div>

            <!-- Columna 3 -->
            <div>
              <h3 class="footer-title">Contacto</h3>
              <ul class="footer-links footer-contact">
                <li>
                  <i data-lucide="map-pin" style="width: 20px; height: 20px;"></i>
                  <span>Calle Tolteca esq. Azteca, Colonia Guadalupe tercera sección, C.P. 43650, Tulancingo de Bravo, Hgo.</span>
                </li>
                <li>
                  <i data-lucide="phone" style="width: 20px; height: 20px;"></i>
                  <span>Línea de Atención:<br><strong>775 974 2084</strong></span>
                </li>
                <li>
                  <i data-lucide="mail" style="width: 20px; height: 20px;"></i>
                  <span>instanciadelamujer@tulancingo.gob.mx</span>
                </li>
              </ul>
            </div>

          </div>

          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Instancia Municipal de las Mujeres. Trabajando por la igualdad y el bienestar.</p>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('app-footer', AppFooter);


/**
 * 3. PANIC-BUTTON COMPONENT
 */
class PanicButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .panic-button-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
        }

        .btn-panic {
          background-color: var(--color-danger);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 1rem 1.5rem;
          font-family: var(--font-family-base);
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(211, 47, 47, 0.4);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .btn-panic:hover {
          background-color: var(--color-danger-hover);
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(211, 47, 47, 0.6);
        }

        .btn-panic .icon-wrap {
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .panic-button-container {
            bottom: 20px;
            right: 20px;
          }
          .btn-panic span.text {
            display: none; /* Hide text on small screens, keep icon */
          }
          .btn-panic {
            padding: 1rem;
            border-radius: 50%;
          }
          .btn-panic .icon-wrap {
            background: transparent;
            width: auto;
            height: auto;
          }
        }
      </style>

      <div class="panic-button-container">
        <button class="btn-panic" id="quickExitBtn" title="Salir Rápidamente">
          <div class="icon-wrap">
            <i data-lucide="log-out" style="width: 20px; height: 20px;"></i>
          </div>
          <span class="text">Salida Rápida</span>
        </button>
      </div>
    `;

    // Lógica de escape rápido
    const exitBtn = this.querySelector('#quickExitBtn');
    exitBtn.addEventListener('click', () => {
      // Reemplaza el historial actual por Google, para que el botón "Atrás" del navegador no vuelva aquí
      window.location.replace("https://www.google.com");
    });
  }
}
customElements.define('panic-button', PanicButton);

// Inicializar iconos al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
    loadLucideIcons();
    initMapRouting();
    initContactFeatures();
    initFAQ();
    initQuiz();
    checkDownloadHash();
});

/**
 * Lógica para calcular la ruta dinámica en el mapa
 */
function initMapRouting() {
    const btnOpenMaps = document.getElementById('btn-open-maps');
    const destination = "Instancia+de+la+Mujer+Colonia+la+Guadalupe+Tulancingo+Hidalgo";
    
    if (!btnOpenMaps) return;

    btnOpenMaps.addEventListener('click', (e) => {
        e.preventDefault();
        // Abrir directamente la ubicación en Google Maps (marcador)
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
        window.open(mapsUrl, '_blank');
    });
}

/**
 * Lógica para las funciones adicionales de contacto
 */
function initContactFeatures() {
    // 1. Horario de Atención
    const hoursBadge = document.getElementById('hours-badge');
    if (hoursBadge) {
        const updateHours = () => {
            const now = new Date();
            const day = now.getDay(); // 0 = Dom, 1 = Lun, ..., 6 = Sab
            const hour = now.getHours();
            const mins = now.getMinutes();
            const currentTime = hour + mins / 60;
            
            // Horario: Lunes a Viernes (1-5), 8:30 a 16:00
            const isOpenDay = day >= 1 && day <= 5;
            const isOpenTime = currentTime >= 8.5 && currentTime < 16;
            
            if (isOpenDay && isOpenTime) {
                hoursBadge.innerHTML = `<i data-lucide="clock" style="width:14px; height:14px; margin-right:6px; color: #25D366;"></i> Abierto ahora`;
                hoursBadge.style.backgroundColor = "rgba(0, 0, 0, 0.25)";
                hoursBadge.style.color = "white";
                hoursBadge.style.border = "1px solid #25D366";
                hoursBadge.style.boxShadow = "none";
                hoursBadge.style.backdropFilter = "blur(10px)";
            } else {
                hoursBadge.innerHTML = `<i data-lucide="clock" style="width:14px; height:14px; margin-right:6px; color: var(--color-danger);"></i> Cerrado ahora`;
                hoursBadge.style.backgroundColor = "rgba(0, 0, 0, 0.25)";
                hoursBadge.style.color = "white";
                hoursBadge.style.border = "1px solid var(--color-danger)";
                hoursBadge.style.boxShadow = "none";
                hoursBadge.style.backdropFilter = "blur(10px)";
            }
            if (window.lucide) window.lucide.createIcons();
        };
        updateHours();
        setInterval(updateHours, 60000); // Actualizar cada minuto
    }

    // 2. Copiar Dirección
    const btnCopy = document.getElementById('btn-copy-address');
    const addressText = "Calle Tolteca esquina Azteca, Colonia Guadalupe tercera sección, 43650, Tulancingo de Bravo, Hidalgo";
    
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(addressText).then(() => {
                const originalIcon = btnCopy.innerHTML;
                btnCopy.innerHTML = '<i data-lucide="check" style="width: 20px; height: 20px; color: #2E7D32;"></i>';
                if (window.lucide) window.lucide.createIcons();
                
                setTimeout(() => {
                    btnCopy.innerHTML = originalIcon;
                    if (window.lucide) window.lucide.createIcons();
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    }
}

/**
 * 4. FAQ INTERACTIVITY
 */
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}



/**
 * 6. PDF DOWNLOAD LOGIC
 */
async function downloadViolentometroPDF(event = null) {
    if (event) event.preventDefault();
    const isViolentometroPage = window.location.pathname.includes('violentometro.html');
    
    if (!isViolentometroPage) {
        const base = typeof getBasePath === 'function' ? getBasePath() : './';
        window.location.href = `${base}pages/violentometro.html#download`;
        return;
    }
    // Si estamos en la página, la función local en violentometro.html se encargará.
}

function checkDownloadHash() {
    if (window.location.hash.includes('#download')) {
        // Wait for everything to be ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (typeof window.downloadViolentometroPDF === 'function') {
                    window.downloadViolentometroPDF();
                }
                window.location.hash = '';
            }, 1000);
        }, { once: true });
        
        if (document.readyState === 'complete') {
            setTimeout(() => {
                if (typeof window.downloadViolentometroPDF === 'function') {
                    window.downloadViolentometroPDF();
                }
                window.location.hash = '';
            }, 1000);
        }
    }
}

// Inicialización global
loadLucideIcons();
checkDownloadHash();
