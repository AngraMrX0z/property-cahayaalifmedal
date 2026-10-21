
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

const locationButton = document.querySelector('.location-button');
const locationStatus = document.querySelector('.location-status');
if (locationButton && locationStatus && contactForm) {
  const addressField = contactForm.elements.alamat;
  let lastAutoAddress = '';

  locationButton.addEventListener('click', () => {
    locationStatus.textContent = '';
    if (!navigator.geolocation || !window.isSecureContext) {
      locationStatus.textContent = 'Akses lokasi memerlukan browser yang mendukung lokasi dan halaman HTTPS atau localhost.';
      return;
    }

    const mapsWindow = window.open('about:blank', '_blank');
    if (mapsWindow) {
      mapsWindow.document.title = 'Mencari lokasi…';
      mapsWindow.document.body.textContent = 'Meminta izin lokasi…';
    }

    locationButton.disabled = true;
    navigator.geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude.toFixed(6);
      const longitude = position.coords.longitude.toFixed(6);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`;
      const popupBlocked = !mapsWindow || mapsWindow.closed;
      if (!popupBlocked) mapsWindow.location.replace(mapsUrl);
      let addressLine = '';

      try {
        const reverseUrl = new URL('https://nominatim.openstreetmap.org/reverse');
        reverseUrl.search = new URLSearchParams({
          format: 'jsonv2', lat: latitude, lon: longitude, zoom: '18', addressdetails: '1', 'accept-language': 'id'
        });
        const response = await fetch(reverseUrl);
        if (!response.ok) throw new Error('Address lookup failed');
        const result = await response.json();
        const parts = result.address || {};
        let road = parts.road || parts.pedestrian || parts.residential || parts.footway || '';
        if (road && !/^(jl\.?|jalan)\s/i.test(road)) road = `Jl. ${road}`;
        const street = [road, parts.house_number ? `No. ${parts.house_number}` : ''].filter(Boolean).join(' ');
        const neighbourhood = parts.neighbourhood || parts.suburb || parts.village || parts.hamlet || '';
        const district = parts.city_district || parts.district || parts.municipality_district || '';
        const regency = parts.county || parts.regency || '';
        const city = parts.city || parts.town || '';
        addressLine = [street || neighbourhood, district ? `Kec. ${district}` : '', regency ? `Kab. ${regency}` : '', city ? `Kota ${city}` : '', parts.state || '', parts.postcode || '']
          .filter(Boolean)
          .filter((part, index, all) => all.findIndex(candidate => candidate.toLowerCase() === part.toLowerCase()) === index)
          .join(', ');
      } catch {
        addressLine = '';
      }

      if (addressLine) {
        const currentAddress = addressField.value.trim();
        const manualAddress = lastAutoAddress && currentAddress.endsWith(lastAutoAddress)
          ? currentAddress.slice(0, -lastAutoAddress.length).trim()
          : currentAddress;
        lastAutoAddress = addressLine;
        addressField.value = [manualAddress, addressLine].filter(Boolean).join('\n');
        locationStatus.textContent = 'Lokasi perangkat berhasil digunakan dan alamat terisi otomatis.';
      } else {
        locationStatus.textContent = 'Alamat tidak ditemukan untuk titik ini. Silakan isi alamat secara manual.';
      }

      if (popupBlocked) {
        locationStatus.append(locationStatus.textContent ? ' ' : '');
        const mapsLink = document.createElement('a');
        mapsLink.href = mapsUrl;
        mapsLink.target = '_blank';
        mapsLink.rel = 'noopener noreferrer';
        mapsLink.textContent = 'Ubah titik lokasi di Google Maps';
        locationStatus.append(mapsLink);
      }
      locationButton.disabled = false;
    }, error => {
      if (mapsWindow && !mapsWindow.closed) mapsWindow.close();
      const messages = {
        1: 'Izin lokasi ditolak. Aktifkan izin lokasi pada browser, lalu coba lagi.',
        2: 'Lokasi belum dapat ditentukan. Periksa GPS atau koneksi, lalu coba lagi.',
        3: 'Permintaan lokasi terlalu lama. Coba lagi.'
      };
      locationStatus.textContent = messages[error.code] || 'Lokasi tidak dapat diakses.';
      locationButton.disabled = false;
    }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 0 });
  });
}
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

  document.querySelectorAll('button.card').forEach(card => {
    card.addEventListener('click', () => {
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
      const selectedInterest = option.dataset.property;
      if (![...contactForm.elements.minat.options].some(item => item.value === selectedInterest)) {
        contactForm.elements.minat.add(new Option(selectedInterest, selectedInterest, true, true));
      }
      contactForm.elements.minat.value = selectedInterest;
      typeDialog.close();
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      contactForm.elements.nama.focus({ preventScroll: true });
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
    image.addEventListener('click', event => {
      event.stopPropagation();
      openImageLightbox(image);
    });

    if (!image.closest('.card')) {
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
    }
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
