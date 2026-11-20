/**
 * TERRASAN — JavaScript Principal
 * Cumplimiento de Políticas de Verificación de Negocios en Meta
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCookieBanner();
  initContactForm();
  setCurrentYear();
});

/**
 * Menú móvil responsive
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      menuBtn.setAttribute('aria-expanded', isExpanded);
      menuBtn.innerHTML = isExpanded ? '✕' : '☰';
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '☰';
      });
    });
  }
}

/**
 * Banner de Consentimiento de Cookies (Requisito estricto de Meta / GDPR)
 */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const btnAccept = document.getElementById('btn-accept-cookies');
  const btnReject = document.getElementById('btn-reject-cookies');

  if (!banner) return;

  const consent = localStorage.getItem('terrasan_cookie_consent');
  if (!consent) {
    setTimeout(() => {
      banner.style.display = 'block';
    }, 600);
  }

  btnAccept?.addEventListener('click', () => {
    localStorage.setItem('terrasan_cookie_consent', 'accepted');
    banner.style.display = 'none';
  });

  btnReject?.addEventListener('click', () => {
    localStorage.setItem('terrasan_cookie_consent', 'rejected');
    banner.style.display = 'none';
  });
}

/**
 * Formulario de Contacto interactivo
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('nombre')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('telefono')?.value.trim();
    const subject = document.getElementById('asunto')?.value.trim();
    const message = document.getElementById('mensaje')?.value.trim();
    const terms = document.getElementById('acepta-terminos')?.checked;

    if (!name || !email || !message || !terms) {
      if (alertBox) {
        alertBox.className = 'alert-danger';
        alertBox.innerHTML = '⚠️ Por favor complete los campos obligatorios y acepte la política de privacidad.';
        alertBox.style.display = 'block';
      }
      return;
    }

    // Simulación de envío exitoso
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Enviando mensaje...';
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Enviar Mensaje';
      }
      if (alertBox) {
        alertBox.className = 'alert-success';
        alertBox.style.display = 'block';
        alertBox.style.background = '#dcfce7';
        alertBox.style.color = '#15803d';
        alertBox.style.padding = '14px';
        alertBox.style.borderRadius = '6px';
        alertBox.style.marginBottom = '16px';
        alertBox.style.fontWeight = '600';
        alertBox.innerHTML = `✓ Estimado/a ${name}, su solicitud ha sido recibida con éxito. Nuestro equipo de Terrasan se comunicará con usted a la brevedad al correo ${email} o teléfono comercial.`;
      }
    }, 900);
  });
}

/**
 * Actualizar año dinámico en el footer
 */
function setCurrentYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const year = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = year);
}
