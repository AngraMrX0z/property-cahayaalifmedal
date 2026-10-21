
document.documentElement.classList.add('js');

const agentDialog = document.querySelector('.agent-dialog');

function openAgentDialog(message) {
  const encodedMessage = encodeURIComponent(message);

  agentDialog.querySelectorAll('.agent-option').forEach(option => {
    option.href = `https://wa.me/${option.dataset.number}?text=${encodedMessage}`;
  });
  agentDialog.showModal();
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const nama = form.elements.nama.value.trim();
  const wa = form.elements.wa.value.trim();
  const alamat = form.elements.alamat.value.trim();
  const minat = form.elements.minat.value;
  const msg = `Halo CAM, saya ${nama} (WA: ${wa}) berminat ${minat}.\nAlamat: ${alamat}\nMohon info lengkap.`;
  openAgentDialog(msg);
}
const contactForm = document.querySelector('.contact-form');
if (contactForm) contactForm.addEventListener('submit', handleSubmit);

const typeDialog = document.querySelector('.type-dialog');
if (typeDialog && contactForm) {
  const typeOptions = typeDialog.querySelector('.type-options');
  const propertyTypes = {
    'Bahuan Mekar Indah': {
      images: [
        'images/Bahuan%20mekar%20indah.jpeg',
        'images/bahuan%20mekar%20indah%2030x50.jpg',
        'images/bahuan%20mekar%20indah%2036x60.jpg'
      ],
      types: [
        { title: 'Tipe 25 × 40', description: 'Luas tanah 40 m² · Luas bangunan 25 m²', price: 'Rp 165 juta' },
        { title: 'Tipe 30 × 50', description: 'Luas tanah 50 m² · Luas bangunan 30 m²', price: 'Rp 195 juta' },
        { title: 'Tipe 36 × 60', description: 'Luas tanah 60 m² · Luas bangunan 36 m²', price: 'Rp 235 juta' }
      ]
    },
    'Limus Lestari': {
      images: [
        'images/Limus%20Lestari.jpeg',
        'images/limus%20lestari%2036x50.jpg',
        'images/limus%20lestari%2036x60.jpg',
        'images/limus%20lestari%2040x60.jpg',
        'images/limus%20lestari%2045x70.jpg',
        'images/limus%20lestari%2050x70.jpg'
      ],
      types: [
        { title: 'Tipe 30 × 50', description: 'Luas tanah 50 m² · Luas bangunan 30 m²', price: 'Rp 215 juta' },
        { title: 'Tipe 36 × 50', description: 'Luas tanah 50 m² · Luas bangunan 36 m²', price: 'Rp 233 juta' },
        { title: 'Tipe 36 × 60', description: 'Luas tanah 60 m² · Luas bangunan 36 m²', price: 'Rp 258 juta' },
        { title: 'Tipe 40 × 60', description: 'Luas tanah 60 m² · Luas bangunan 40 m²', price: 'Rp 270 juta' },
        { title: 'Tipe 45 × 70', description: 'Luas tanah 70 m² · Luas bangunan 45 m²', price: 'Rp 310 juta' },
        { title: 'Tipe 50 × 70', description: 'Luas tanah 70 m² · Luas bangunan 50 m²', price: 'Rp 325 juta' }
      ]
    }
  };

  const selectPropertyInterest = selectedInterest => {
    const interestField = contactForm.elements.minat;
    if (![...interestField.options].some(item => item.value === selectedInterest)) {
      interestField.add(new Option(selectedInterest, selectedInterest, true, true));
    }
    interestField.value = selectedInterest;
    contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    contactForm.elements.nama.focus({ preventScroll: true });
  };

  document.querySelectorAll('button.card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.dataset.interest) {
        selectPropertyInterest(card.dataset.interest);
        return;
      }
      const property = card.getAttribute('aria-label').replace('Pilih properti ', '');
      const config = propertyTypes[property];
      typeDialog.querySelector('#type-dialog-title').textContent = `Pilih Tipe ${property}`;
      typeOptions.replaceChildren(...config.types.map((type, index) => {
        const typeName = type.title;
        const option = document.createElement('button');
        option.className = 'type-option';
        option.type = 'button';
        option.dataset.property = `${property} — ${typeName}`;
        const image = config.images ? config.images[index] : config.image;
        option.innerHTML = `<img src="${image}" alt="${typeName} ${property}"><span class="type-option-details"><strong>${typeName}</strong><small>${type.description}</small>${type.price ? `<strong class="type-option-price">${type.price}</strong>` : ''}</span><span class="type-option-arrow" aria-hidden="true">→</span>`;
        return option;
      }));
      typeDialog.showModal();
    });
  });

  typeDialog.querySelector('.type-dialog-close').addEventListener('click', () => {
    typeDialog.close();
  });

  typeDialog.addEventListener('click', event => {
    if (event.target === typeDialog) typeDialog.close();
  });

  typeDialog.addEventListener('click', event => {
    const option = event.target.closest('.type-option');
    if (option) {
      selectPropertyInterest(option.dataset.property);
      typeDialog.close();
    }
  });
}

const imageLightbox = document.querySelector('.image-lightbox');
if (imageLightbox) {
  const lightboxImage = imageLightbox.querySelector('.image-lightbox-image');
  const lightboxCaption = imageLightbox.querySelector('.image-lightbox-caption');
  const lightboxClose = imageLightbox.querySelector('.image-lightbox-close');
  const propertyImages = document.querySelectorAll('.denah img, .photos img, .property-card-image img');

  const openImageLightbox = image => {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;
    imageLightbox.showModal();
    lightboxClose.focus();
  };

  propertyImages.forEach(image => {
    if (image.closest('.card')) return;

    image.addEventListener('click', event => {
      event.stopPropagation();
      openImageLightbox(image);
    });

    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Perbesar gambar: ${image.alt}`);
    image.setAttribute('aria-haspopup', 'dialog');
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImageLightbox(image);
      }
    });
  });

  lightboxClose.addEventListener('click', () => imageLightbox.close());
  imageLightbox.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      imageLightbox.close();
    }
  });
  imageLightbox.addEventListener('click', event => {
    if (event.target === imageLightbox) imageLightbox.close();
  });
  imageLightbox.addEventListener('close', () => {
    lightboxImage.removeAttribute('src');
    lightboxCaption.textContent = '';
  });
}

if (agentDialog) {
  agentDialog.querySelector('.agent-dialog-close').addEventListener('click', () => {
    agentDialog.close();
  });

  agentDialog.addEventListener('click', event => {
    if (event.target === agentDialog) agentDialog.close();
  });
}

const floatingWhatsApp = document.querySelector('.floating-whatsapp');
if (floatingWhatsApp && agentDialog) {
  floatingWhatsApp.addEventListener('click', () => {
    openAgentDialog('Halo, saya ingin bertanya mengenai properti. Mohon info lebih lanjut.');
  });
}

const disclaimerWhatsApp = document.querySelector('.disclaimer-whatsapp');
if (disclaimerWhatsApp && agentDialog) {
  disclaimerWhatsApp.addEventListener('click', event => {
    event.preventDefault();
    openAgentDialog('Halo CAM, saya ingin bertanya mengenai tipe dan model properti. Mohon info lebih lanjut.');
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]:not(.disclaimer-whatsapp)').forEach(a=>{
  a.addEventListener('click', function(e){
    const targetId = this.getAttribute('href').slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth'});
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
if (menuToggle && navigation) {
  const closeNavigation = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Buka menu navigasi');
    navigation.hidden = true;
  };

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.setAttribute('aria-label', isExpanded ? 'Buka menu navigasi' : 'Tutup menu navigasi');
    navigation.hidden = isExpanded;
  });

  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNavigation);
  });

  document.addEventListener('click', event => {
    if (!(event.target instanceof Element) || !event.target.closest('.nav')) closeNavigation();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !navigation.hidden) {
      closeNavigation();
      menuToggle.focus();
    }
  });
}

// Intro animation when an element enters the viewport while scrolling.
const revealElements = document.querySelectorAll('.reveal-on-scroll, .scroll-reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.2 });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('is-visible'));
}
