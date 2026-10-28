
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passInput = document.getElementById('password');
const reasonInput = document.getElementById('reason');
const messageInput = document.getElementById('message');
const bar = document.getElementById('bar');
const eyeBtn = document.getElementById('eyeBtn');
const successBox = document.getElementById('success');

function showError(input, errorId, tickId, isValid, crossId = null, goodId = null) {
  const error = document.getElementById(errorId);
  const tick = tickId ? document.getElementById(tickId) : null;
  const cross = crossId ? document.getElementById(crossId) : null;
  const good = goodId ? document.getElementById(goodId) : null;

  if (!isValid) {
    error.style.display = 'block';
    input.classList.add('input-error');
    input.classList.remove('input-success');
    if (tick) tick.classList.remove('show');
    if (cross) cross.classList.add('show');
    if (good) good.style.display = 'none';
  } else {
    error.style.display = 'none';
    input.classList.remove('input-error');
    input.classList.add('input-success');
    if (tick) tick.classList.add('show');
    if (cross) cross.classList.remove('show');
    if (good) good.style.display = 'block';
  }
  return isValid;
}

// Password Eye
eyeBtn.addEventListener('click', () => {
  if (passInput.type === 'password') {
    passInput.type = 'text';
    eyeBtn.textContent = '🙈';
  } else {
    passInput.type = 'password';
    eyeBtn.textContent = '👁️';
  }
});

// Real Time Validation
nameInput.addEventListener('input', () => {
  showError(nameInput, 'nameError', 'nameTick', nameInput.value.trim().length >= 3, null, 'nameGood');
});

emailInput.addEventListener('input', () => {
  showError(emailInput, 'emailError', null, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value), 'emailCross');
});

phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
  showError(phoneInput, 'phoneError', 'phoneTick', /^[6-9]\d{9}$/.test(phoneInput.value));
});

passInput.addEventListener('input', () => {
  const v = passInput.value;
  let s = 0;
  if (v.length >= 8) s += 40;
  if (/\d/.test(v)) s += 30;
  if (/[A-Z]/.test(v)) s += 30;
  bar.style.width = s + '%';
  bar.style.background = s < 40 ? 'red' : s < 70 ? 'orange' : 'green';
  showError(passInput, 'passError', null, v.length >= 8 && /\d/.test(v));
});

messageInput.addEventListener('input', () => {
  showError(messageInput, 'messageError', null, messageInput.value.trim().length >= 5);
});

// Focus / Blur
[nameInput, emailInput, phoneInput, passInput, messageInput].forEach(input => {
  input.addEventListener('focus', () => {
    input.style.transform = 'scale(1.02)';
    input.style.boxShadow = '0 0 0 3px #FFD9A0';
  });
  input.addEventListener('blur', () => {
    input.style.transform = 'scale(1)';
    input.style.boxShadow = '';
  });
});

// SUBMIT - SUCCESS VARANUM NA ITHU THAAN MUKKIYAM
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let v1 = showError(nameInput, 'nameError', 'nameTick', nameInput.value.trim().length >= 3, null, 'nameGood');
  let v2 = showError(emailInput, 'emailError', null, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value), 'emailCross');
  let v3 = showError(phoneInput, 'phoneError', 'phoneTick', /^[6-9]\d{9}$/.test(phoneInput.value));
  let v4 = showError(passInput, 'passError', null, passInput.value.length >= 8 && /\d/.test(passInput.value));
  let v5 = reasonInput.value !== '';
  let v6 = showError(messageInput, 'messageError', null, messageInput.value.trim().length >= 5);

  if (v1 && v2 && v3 && v4 && v5 && v6) {
    successBox.style.display = 'block';
    successBox.textContent = '✅ Message Sent Successfully! Thank you!';
    form.reset();
    bar.style.width = '0%';
    document.querySelectorAll('.tick').forEach(t => t.classList.remove('show'));
    document.getElementById('nameGood').style.display = 'none';
    [nameInput, emailInput, phoneInput, passInput, messageInput].forEach(i => i.classList.remove('input-success'));
  } else {
    successBox.style.display = 'none';
  }
});
