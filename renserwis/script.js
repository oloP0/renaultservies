const { useEffect, useRef, useState } = React;

function ScrollLink({ href, children, onClick, ...rest }) {
  const handleClick = (event) => {
    if (typeof href === 'string' && href.startsWith('#')) {
      const targetEl = document.querySelector(href);
      if (targetEl) {
        event.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    onClick?.(event);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length === 0) return;

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
      return () => revealObserver.disconnect();
    }

    revealElements.forEach((el) => el.classList.add('is-visible'));
  }, []);

  const handleNavToggle = () => setNavOpen((prev) => !prev);
  const closeMenu = () => setNavOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const service = formData.get('service')?.toString();
    const date = formData.get('date')?.toString();

    if (!name || !email || !phone || !service || !date) {
      setMessage({ text: 'Proszę wypełnić wszystkie wymagane pola.', type: 'error' });
      return;
    }

    setMessage({ text: 'Dziękujemy! Twoje zgłoszenie zostało wysłane. Skontaktujemy się niebawem.', type: 'success' });
    form.reset();
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#">
            REN-Serwis
          </a>
          <nav className={`main-nav${navOpen ? ' open' : ''}`} aria-label="Główne menu">
            <ScrollLink href="#appointment" onClick={closeMenu}>
              Umów wizytę
            </ScrollLink>
            <ScrollLink href="#contact" onClick={closeMenu}>
              Kontakt
            </ScrollLink>
          </nav>
          <button
            className="nav-toggle"
            aria-label="Pokaż menu"
            aria-expanded={navOpen ? 'true' : 'false'}
            onClick={handleNavToggle}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-background" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-content" data-reveal>
              <p className="badge">Mobilny serwis • Pełna gwarancja • Dojazd do klienta</p>
              <h1>Serwis samochodowy z dojazdem</h1>
              <p>
                Czas to pieniądz – zadzwoń, a nasz mobilny zespół przyjedzie i zajmie się Twoim autem w dogodnym terminie.
              </p>
              <div className="hero-actions">
                <ScrollLink className="btn btn-primary" href="#appointment">
                  Umów wizytę
                </ScrollLink>
                <ScrollLink className="btn btn-ghost" href="#" aria-label="Pusty przycisk">
                  &nbsp;
                </ScrollLink>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true" data-reveal>
              <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustracja samochodu">
                <defs>
                  <linearGradient id="carGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M52 260c0 20 16 36 36 36h460c20 0 36-16 36-36v-100c0-22-18-40-40-40H92c-22 0-40 18-40 40v100Z"
                  fill="url(#carGrad)"
                  opacity="0.95"
                />
                <path d="M90 200h420" stroke="rgba(255,255,255,0.35)" strokeWidth="8" strokeLinecap="round" />
                <circle cx="160" cy="280" r="24" fill="#0f172a" stroke="#38bdf8" strokeWidth="10" />
                <circle cx="520" cy="280" r="24" fill="#0f172a" stroke="#38bdf8" strokeWidth="10" />
              </svg>
            </div>
          </div>
        </section>

        <section className="why" id="why">
          <div className="container">
            <h2>Dlaczego warto wybrać REN‑Serwis?</h2>
            <p className="lead">
              Nie jesteśmy kolejnym warsztatem. Stawiamy na szybkość, przejrzystość kosztów i serwis bez ukrytych
              niespodzianek.
            </p>
            <div className="why-grid">
              <article className="why-card" data-reveal>
                <div className="why-icon" aria-hidden="true">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 12c11 0 20 9 20 20s-9 20-20 20S12 43 12 32s9-20 20-20Z" fill="#38bdf8" opacity="0.15" />
                    <path d="M24 28l6 6 10-10" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Transparentne ceny</h3>
                <p>
                  Przed rozpoczęciem prac podajemy konkretną wycenę i czas realizacji – zero niespodzianek przy
                  odbiorze.
                </p>
              </article>
              <article className="why-card" data-reveal>
                <div className="why-icon" aria-hidden="true">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 10c12 0 22 10 22 22s-10 22-22 22S10 44 10 32 20 10 32 10Z" fill="#38bdf8" opacity="0.15" />
                    <path d="M20 33l12 9 16-24" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Serwis w dogodnym miejscu</h3>
                <p>
                  Nie musisz tracić dnia na dojazd do warsztatu – przyjedziemy tam, gdzie stoi Twój samochód.
                </p>
              </article>
              <article className="why-card" data-reveal>
                <div className="why-icon" aria-hidden="true">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 10c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20Z" fill="#38bdf8" opacity="0.15" />
                    <path d="M24 32h16" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                    <path d="M32 24v16" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Gwarancja i wsparcie</h3>
                <p>
                  Na każdą usługę oferujemy gwarancję, a w razie wątpliwości zawsze możesz do nas zadzwonić.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="appointment" id="appointment">
          <div className="container">
            <h2>Umów wizytę</h2>
            <p>Wypełnij formularz, a skontaktujemy się z Tobą, aby potwierdzić termin.</p>
            <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <label className="form-field">
                  <span>Imię i nazwisko</span>
                  <input type="text" name="name" required placeholder="Jan Kowalski" />
                </label>
                <label className="form-field">
                  <span>Telefon</span>
                  <input type="tel" name="phone" required placeholder="123 456 789" />
                </label>
                <label className="form-field">
                  <span>E‑mail</span>
                  <input type="email" name="email" required placeholder="jan@przyklad.pl" />
                </label>
                <label className="form-field">
                  <span>Marka i model</span>
                  <input type="text" name="car" required placeholder="Toyota Corolla" />
                </label>
                <label className="form-field">
                  <span>Usługa</span>
                  <select name="service" required>
                    <option value="">Wybierz usługę</option>
                    <option value="oil">Wymiana oleju</option>
                    <option value="inspection">Przegląd techniczny</option>
                    <option value="diagnostics">Diagnostyka</option>
                    <option value="repair">Naprawa mechaniczna</option>
                  </select>
                </label>
                <label className="form-field">
                  <span>Preferowany termin</span>
                  <input type="datetime-local" name="date" required />
                </label>
                <label className="form-field form-field--full">
                  <span>Uwagi / dodatkowe informacje</span>
                  <textarea name="notes" rows="4" placeholder="Należy podać np. nr rejestracyjny lub problem." />
                </label>
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit">
                  Wyślij zgłoszenie
                </button>
                <p className="form-info">Opiekun skontaktuje się w ciągu 24 godzin roboczych.</p>
              </div>
              <div id="formMessage" className={`form-message${message ? ' is-visible' : ''} ${message?.type ?? ''}`} aria-live="polite">
                {message?.text}
              </div>
            </form>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact-inner">
            <div className="contact-info">
              <h2>Kontakt</h2>
              <p>Masz pytania? Napisz lub zadzwoń — chętnie pomożemy.</p>
              <ul className="contact-list">
                <li>
                  <strong>Telefon:</strong> <a href="tel:+48123456789">+48 123 456 789</a>
                </li>
                <li>
                  <strong>Email:</strong> <a href="mailto:kontakt@renserwis.pl">kontakt@renserwis.pl</a>
                </li>
                <li>
                  <strong>Adres:</strong> ul. Warsztatowa 12, 00-100 Warszawa
                </li>
              </ul>
            </div>
            <div className="contact-map">
              <div className="map-placeholder" aria-hidden="true">
                Mapa (tu można dodać osadzenie mapy)
              </div>
            </div>
          </div>
        </section>
      </main>

      <a className="contact-float" href="#appointment" aria-label="Asystent">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7l-5 4V6a2 2 0 0 1 2-2z"
            opacity="0.9"
          />
          <circle cx="9" cy="11" r="1.25" fill="white" />
          <circle cx="12" cy="11" r="1.25" fill="white" />
          <circle cx="15" cy="11" r="1.25" fill="white" />
        </svg>
        Asystent
      </a>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            © <span id="currentYear">{currentYear}</span> RENAULT Serwis opaliński
          </p>
          <p className="small">Strona demonstracyjna. Dane kontaktowe są przykładowe.</p>
        </div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
