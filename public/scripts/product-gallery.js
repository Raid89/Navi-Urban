const mainImage = document.getElementById('productMainImage');
const thumbButtons = Array.from(document.querySelectorAll('[data-thumb-src]'));
const colorButtons = Array.from(document.querySelectorAll('[data-color-filter]'));
const sizeButtons = Array.from(document.querySelectorAll('[data-size-option]'));
const buyNowButton = document.getElementById('buyNowButton');
const checkoutPanel = document.getElementById('checkoutPanel');
const checkoutBackdrop = document.getElementById('checkoutBackdrop');
const closeCheckoutButton = document.getElementById('closeCheckoutButton');
const quickCheckoutForm = document.getElementById('quickCheckoutForm');
const rememberDataCheckbox = document.getElementById('rememberDataCheckbox');
const checkoutSuccessMessage = document.getElementById('checkoutSuccessMessage');
const orderSuccessPopup = document.getElementById('orderSuccessPopup');
const successBackdrop = document.getElementById('successBackdrop');
const closeSuccessPopupButton = document.getElementById('closeSuccessPopupButton');
const orderSuccessDescription = document.getElementById('orderSuccessDescription');
const productDetailCard = document.querySelector('[data-product-name]');
const purchaseSelectionHint = document.getElementById('purchaseSelectionHint');
const checkoutSummaryColor = document.getElementById('checkoutSummaryColor');
const checkoutSummarySize = document.getElementById('checkoutSummarySize');
const checkoutName = document.getElementById('checkoutName');
const checkoutDocument = document.getElementById('checkoutDocument');
const checkoutAddress = document.getElementById('checkoutAddress');
const checkoutCity = document.getElementById('checkoutCity');
const checkoutPhone = document.getElementById('checkoutPhone');

const PROFILE_STORAGE_KEY = 'navi-urban-checkout-profile-v1';

const PRODUCT_ORDER_ENDPOINT = '/api/orders';

const productName = productDetailCard instanceof HTMLElement ? String(productDetailCard.getAttribute('data-product-name') || '').trim() : '';
const productId = String(window.location.pathname.split('/').pop() || '').trim();
const priceNode = document.querySelector('.product-detail-price');
const priceText = priceNode instanceof HTMLElement ? String(priceNode.textContent || '') : '';
const parsedPrice = Number(priceText.replace(/[^\d]/g, ''));

let selectedSize = '';

const normalizeColorKey = (value) => String(value || '').trim().toLowerCase();

const hasSpecificColorOptions = colorButtons.some((button) => normalizeColorKey(button.getAttribute('data-color-filter') || '') !== '');

const getSelectedColorName = () => {
  const activeButton = colorButtons.find((button) => button.classList.contains('is-active'));
  if (!activeButton) return '';
  return String(activeButton.getAttribute('data-color-filter') || '').trim();
};

const setSelectionHint = (message) => {
  if (!(purchaseSelectionHint instanceof HTMLElement)) return;
  purchaseSelectionHint.textContent = message;
};

const updateSelectionSummary = () => {
  const selectedColor = getSelectedColorName();

  if (checkoutSummaryColor instanceof HTMLElement) {
    checkoutSummaryColor.textContent = `Color: ${selectedColor || 'pendiente'}`;
  }

  if (checkoutSummarySize instanceof HTMLElement) {
    checkoutSummarySize.textContent = `Talla: ${selectedSize || 'pendiente'}`;
  }

  if (selectedColor && selectedSize) {
    setSelectionHint(`Seleccion actual: ${selectedColor}, talla ${selectedSize}.`);
    return;
  }

  if (!selectedColor && !selectedSize) {
    setSelectionHint('Selecciona color y talla para continuar con tu compra.');
    return;
  }

  if (!selectedColor) {
    setSelectionHint('Selecciona un color para continuar.');
    return;
  }

  setSelectionHint('Selecciona una talla para continuar.');
};

const saveProfile = () => {
  const profile = {
    name: checkoutName instanceof HTMLInputElement ? checkoutName.value.trim() : '',
    document: checkoutDocument instanceof HTMLInputElement ? checkoutDocument.value.trim() : '',
    address: checkoutAddress instanceof HTMLInputElement ? checkoutAddress.value.trim() : '',
    city: checkoutCity instanceof HTMLInputElement ? checkoutCity.value.trim() : '',
    phone: checkoutPhone instanceof HTMLInputElement ? checkoutPhone.value.trim() : ''
  };

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
};

const clearProfile = () => {
  localStorage.removeItem(PROFILE_STORAGE_KEY);
};

const hasSavedProfile = () => Boolean(localStorage.getItem(PROFILE_STORAGE_KEY));

const loadProfile = () => {
  const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!rawProfile) return false;

  try {
    const profile = JSON.parse(rawProfile);
    if (checkoutName instanceof HTMLInputElement) checkoutName.value = String(profile.name || '');
    if (checkoutDocument instanceof HTMLInputElement) checkoutDocument.value = String(profile.document || '');
    if (checkoutAddress instanceof HTMLInputElement) checkoutAddress.value = String(profile.address || '');
    if (checkoutCity instanceof HTMLInputElement) checkoutCity.value = String(profile.city || '');
    if (checkoutPhone instanceof HTMLInputElement) checkoutPhone.value = String(profile.phone || '');
    return true;
  } catch {
    return false;
  }
};

const openCheckoutPanel = () => {
  if (!(checkoutPanel instanceof HTMLElement)) return;
  checkoutPanel.hidden = false;
  checkoutPanel.setAttribute('aria-hidden', 'false');
  document.body.classList.add('checkout-open');
  checkoutSuccessMessage?.setAttribute('hidden', 'true');
  if (checkoutSuccessMessage instanceof HTMLElement) {
    checkoutSuccessMessage.textContent = '';
  }
};

const closeCheckoutPanel = () => {
  if (!(checkoutPanel instanceof HTMLElement)) return;
  checkoutPanel.hidden = true;
  checkoutPanel.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('checkout-open');
};

const openSuccessPopup = (message) => {
  if (!(orderSuccessPopup instanceof HTMLElement)) return;
  orderSuccessPopup.hidden = false;
  orderSuccessPopup.setAttribute('aria-hidden', 'false');
  document.body.classList.add('checkout-open');

  if (orderSuccessDescription instanceof HTMLElement) {
    orderSuccessDescription.textContent = message;
  }
};

const closeSuccessPopup = () => {
  if (!(orderSuccessPopup instanceof HTMLElement)) return;
  orderSuccessPopup.hidden = true;
  orderSuccessPopup.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('checkout-open');
};

const syncMainImage = (button) => {
  if (!(mainImage instanceof HTMLImageElement)) return;

  const nextSrc = button.getAttribute('data-thumb-src');
  const nextAlt = button.getAttribute('data-thumb-alt');

  if (!nextSrc) return;

  mainImage.src = nextSrc;
  if (nextAlt) {
    mainImage.alt = nextAlt;
  }
};

const updateThumbState = (activeThumb) => {
  thumbButtons.forEach((button) => button.classList.toggle('is-active', button === activeThumb));
};

const applyColorFilter = (selectedColor = '') => {
  const normalizedSelectedColor = normalizeColorKey(selectedColor);
  const visibleThumbs = normalizedSelectedColor
    ? thumbButtons.filter((button) => normalizeColorKey(button.getAttribute('data-image-color') || '') === normalizedSelectedColor)
    : thumbButtons;

  thumbButtons.forEach((button) => {
    button.hidden = !visibleThumbs.includes(button);
  });

  const currentImageSrc = mainImage instanceof HTMLImageElement ? mainImage.getAttribute('src') || '' : '';
  const activeThumb = visibleThumbs.find((button) => button.getAttribute('data-thumb-src') === currentImageSrc) || visibleThumbs[0];

  if (activeThumb) {
    syncMainImage(activeThumb);
    updateThumbState(activeThumb);
  } else {
    updateThumbState(null);
    if (mainImage instanceof HTMLImageElement) {
      mainImage.removeAttribute('src');
      mainImage.alt = 'Sin imagen para este color';
    }
  }

  colorButtons.forEach((button) => {
    const buttonColor = button.getAttribute('data-color-filter') || '';
    button.classList.toggle('is-active', normalizeColorKey(buttonColor) === normalizedSelectedColor);
  });

  updateSelectionSummary();
};

sizeButtons.forEach((sizeButton) => {
  sizeButton.addEventListener('click', () => {
    selectedSize = String(sizeButton.getAttribute('data-size-option') || '').trim();
    sizeButtons.forEach((button) => button.classList.toggle('is-active', button === sizeButton));
    updateSelectionSummary();
  });
});

thumbButtons.forEach((thumbButton) => {
  thumbButton.addEventListener('click', () => {
    syncMainImage(thumbButton);
    updateThumbState(thumbButton);
  });
});

colorButtons.forEach((colorButton) => {
  colorButton.addEventListener('click', () => {
    applyColorFilter(colorButton.getAttribute('data-color-filter') || '');
  });
});

buyNowButton?.addEventListener('click', () => {
  const selectedColor = getSelectedColorName();

  if (hasSpecificColorOptions && !selectedColor) {
    setSelectionHint('Para comprar ahora selecciona un color especifico.');
    return;
  }

  if (!selectedSize) {
    setSelectionHint('Para comprar ahora selecciona una talla disponible.');
    return;
  }

  openCheckoutPanel();

  if (rememberDataCheckbox instanceof HTMLInputElement && rememberDataCheckbox.checked) {
    const loaded = loadProfile();
    if (!loaded) {
      setSelectionHint('Aun no hay datos guardados. Completa tu formulario y confirma para guardarlos.');
    }
  }
});

closeCheckoutButton?.addEventListener('click', () => {
  closeCheckoutPanel();
});

checkoutBackdrop?.addEventListener('click', () => {
  closeCheckoutPanel();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  if (orderSuccessPopup instanceof HTMLElement && !orderSuccessPopup.hidden) {
    closeSuccessPopup();
    return;
  }

  if (checkoutPanel instanceof HTMLElement && !checkoutPanel.hidden) {
    closeCheckoutPanel();
  }
});

closeSuccessPopupButton?.addEventListener('click', () => {
  closeSuccessPopup();
});

successBackdrop?.addEventListener('click', () => {
  closeSuccessPopup();
});

rememberDataCheckbox?.addEventListener('change', () => {
  if (!(rememberDataCheckbox instanceof HTMLInputElement)) return;

  if (rememberDataCheckbox.checked) {
    const loaded = loadProfile();
    setSelectionHint(loaded ? 'Usando datos guardados automaticamente.' : 'Se guardaran tus datos al confirmar compra.');
    return;
  }

  setSelectionHint('No se usaran datos guardados en esta compra.');
});

quickCheckoutForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!(quickCheckoutForm instanceof HTMLFormElement)) return;
  if (!quickCheckoutForm.reportValidity()) return;

  const selectedColor = getSelectedColorName();
  if (hasSpecificColorOptions && !selectedColor) {
    setSelectionHint('Selecciona un color antes de confirmar la compra.');
    return;
  }

  if (!selectedSize) {
    setSelectionHint('Selecciona una talla antes de confirmar la compra.');
    return;
  }

  const customer = {
    name: checkoutName instanceof HTMLInputElement ? checkoutName.value.trim() : '',
    document: checkoutDocument instanceof HTMLInputElement ? checkoutDocument.value.trim() : '',
    address: checkoutAddress instanceof HTMLInputElement ? checkoutAddress.value.trim() : '',
    city: checkoutCity instanceof HTMLInputElement ? checkoutCity.value.trim() : '',
    phone: checkoutPhone instanceof HTMLInputElement ? checkoutPhone.value.trim() : ''
  };

  const submitButton = quickCheckoutForm.querySelector('button[type="submit"]');
  if (submitButton instanceof HTMLButtonElement) {
    submitButton.disabled = true;
    submitButton.textContent = 'Procesando...';
  }

  fetch(PRODUCT_ORDER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId,
      productName,
      color: selectedColor,
      size: selectedSize,
      price: parsedPrice,
      currency: 'MXN',
      customer
    })
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('No se pudo registrar el pedido');
      }

      if (rememberDataCheckbox instanceof HTMLInputElement && rememberDataCheckbox.checked) {
        saveProfile();
      } else {
        clearProfile();
      }

      closeCheckoutPanel();
      openSuccessPopup(`Compra exitosa, ${customer.name || 'cliente'}. Tu pedido fue tomado correctamente y en breve un asesor se comunicara contigo.`);
    })
    .catch((error) => {
      setSelectionHint(error instanceof Error ? error.message : 'No se pudo completar la compra. Intenta de nuevo.');
    })
    .finally(() => {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.textContent = 'Confirmar compra';
      }
    });
});

applyColorFilter('');
updateSelectionSummary();

if (rememberDataCheckbox instanceof HTMLInputElement) {
  rememberDataCheckbox.checked = hasSavedProfile();

  if (rememberDataCheckbox.checked) {
    loadProfile();
  }
}
