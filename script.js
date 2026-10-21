
document.addEventListener('DOMContentLoaded', () => {
  // MENÚ DE NAVEGACIÓN
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const opened = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(opened));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // TARJETAS: CONOCER MÁS
  document.querySelectorAll('.details-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.service-card');
      const expanded = card.classList.toggle('expanded');

      button.setAttribute('aria-expanded', String(expanded));
      button.textContent = expanded
        ? 'Mostrar menos −'
        : 'Conocer más +';
    });
  });

  // CUESTIONARIO DE RECOMENDACIÓN
  const recommendations = {
    spa: {
      title: 'Oasis Spa & Bienestar',
      text: 'Explora los cuidados estéticos y las experiencias de bienestar. Los servicios se confirmarían según las necesidades de cada mascota.'
    },
    moda: {
      title: 'The Atelier',
      text: 'Descubre Velvet & Gold, Glow-Tech y los accesorios pensados para combinar diseño y funcionalidad.'
    },
    bistro: {
      title: 'Bark & Meow Bistro',
      text: 'Conoce la propuesta gourmet y sus productos conceptuales. La alimentación debe ser adecuada para cada especie.'
    }
  };

  const recommendBtn = document.getElementById('recommendBtn');

  if (recommendBtn) {
    recommendBtn.addEventListener('click', () => {
      const pet = document.getElementById('petType').value;
      const interest = document.getElementById('interest').value;
      const chosen = recommendations[interest];

      document.getElementById('resultTitle').textContent = chosen.title;

      let extra = '';

      if (pet === 'gato') {
        extra = ' Si te acompaña un gato, confirma que cualquier servicio o producto sea apropiado para felinos.';
      } else if (pet === 'ambos') {
        extra = ' Recuerda que perros y gatos pueden necesitar cuidados y productos diferentes.';
      }

      document.getElementById('resultText').textContent =
        chosen.text + extra;

      document.getElementById('quizResult').classList.add('show');
    });
  }

  // PREGUNTAS FRECUENTES
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const opened = item.classList.toggle('open');

      button.setAttribute('aria-expanded', String(opened));
    });
  });

  // ENLACES QUE PRESELECCIONAN EL TEMA DE CONTACTO
  document.querySelectorAll('[data-interest]').forEach(link => {
    link.addEventListener('click', () => {
      const topic = document.getElementById('topic');
      const wanted = link.dataset.interest;

      if (wanted === 'moda') {
        topic.value = 'Atelier y accesorios';
      } else if (wanted === 'spa') {
        topic.value = 'Oasis Spa';
      } else {
        topic.value = 'Información general';
      }
    });
  });

  // DATOS DE LOS SABORES DEL BISTRO
  const flavorData = {
    puppyccinos: {
      title: 'Puppyccinos',
      description: 'Bebidas cremosas conceptuales para perros.',
      flavors: [
        ['Clásico Cremoso', 'Espuma suave sin azúcar añadida.'],
        ['Manzana & Avena', 'Inspirado en sabores suaves.'],
        ['Plátano Delicado', 'Una idea frutal para el menú.'],
        ['Calabaza Suave', 'Una opción inspirada en la calabaza.']
      ]
    },

    doggie: {
      title: 'Doggie Macarons',
      description: 'Galletitas inspiradas en la pastelería, adaptadas como concepto para perros.',
      flavors: [
        ['Manzana & Avena', 'La combinación insignia del bistró.'],
        ['Plátano', 'Una propuesta frutal.'],
        ['Zapallo', 'Un sabor suave inspirado en la huerta.'],
        ['Zanahoria', 'Una opción vegetal para el menú.']
      ]
    },

    cattinis: {
      title: 'Cattinis',
      description: 'Una propuesta conceptual para felinos, con ingredientes apropiados para gatos.',
      flavors: [
        ['Pollo', 'Perfil salado inspirado en su alimentación.'],
        ['Atún', 'Una opción marina en formato de degustación.'],
        ['Salmón', 'Una alternativa de sabor a pescado.'],
        ['Hierba gatera', 'Una propuesta aromática para enriquecer la experiencia.']
      ]
    }
  };

  // VENTANA EMERGENTE DE SABORES
  const flavorModal = document.getElementById('flavorModal');
  const flavorModalTitle = document.getElementById('flavorModalTitle');
  const flavorModalDescription = document.getElementById('flavorModalDescription');
  const flavorList = document.getElementById('flavorList');
  const flavorClose = document.getElementById('flavorClose');

  function closeFlavorModal() {
    if (!flavorModal) return;

    flavorModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-flavors]').forEach(button => {
    button.addEventListener('click', () => {
      const data = flavorData[button.dataset.flavors];

      if (!data) return;

      flavorModalTitle.textContent = data.title + ' · Sabores';
      flavorModalDescription.textContent = data.description;

      // Construir las tarjetas sin insertar HTML procedente de usuarios.
      flavorList.replaceChildren();

      data.flavors.forEach(flavor => {
        const option = document.createElement('div');
        option.className = 'flavor-option';

        const name = document.createElement('strong');
        name.textContent = flavor[0];

        const description = document.createElement('span');
        description.textContent = flavor[1];

        option.append(name, description);
        flavorList.appendChild(option);
      });

      flavorModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      flavorClose.focus();
    });
  });

  if (flavorClose) {
    flavorClose.addEventListener('click', closeFlavorModal);
  }

  if (flavorModal) {
    flavorModal.addEventListener('click', event => {
      if (event.target === flavorModal) {
        closeFlavorModal();
      }
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeFlavorModal();
    }
  });

  // FORMULARIO DE CONTACTO DE DEMOSTRACIÓN
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();

      const formMessage = document.getElementById('formMessage');
      formMessage.style.display = 'block';

      formMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    });
  }

  // BOTÓN PARA VOLVER ARRIBA
  const backTop = document.getElementById('backTop');

  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 500);
    });

    backTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // AÑO AUTOMÁTICO DEL PIE DE PÁGINA
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  
  // ANIMACIONES SUAVES AL DESPLAZARSE
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px 35px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add('in-view');
    });
  }
});