document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.PIN_pinConde');
    const toggle = document.querySelector('.PIN_toggleVisibility');
    const errorSpan = document.querySelector('.PinInc');
    const button = document.querySelector('.PIN_contentBtn');
  
    let oculto = false;
  
    toggle.addEventListener('click', function () {
      oculto = !oculto;
  
      if (oculto) {
        input.type = 'password';
        toggle.classList.remove('fa-eye');
        toggle.classList.add('fa-eye-slash');
        toggle.style.color = '#3630ba';
        input.style.borderBottom = '1px solid rgb(148, 148, 148)';
        errorSpan.textContent = '';
      } else {
        input.type = 'text';
        toggle.classList.remove('fa-eye-slash');
        toggle.classList.add('fa-eye');
        toggle.style.color = '#3630ba';
        input.style.borderBottom = '1px solid rgb(148, 148, 148)';
        errorSpan.textContent = '';
      }
    });
  
    input.addEventListener('input', function () {
      input.value = input.value.replace(/\D/g, '').slice(0, 6);
    });
  
    button.addEventListener('click', function (event) {
      const pin = input.value.trim();
  
      if (/^\d{6}$/.test(pin)) {
        button.setAttribute('href', 'dni-digital.html');
        input.style.borderBottom = '1px solid rgb(148, 148, 148)';
        errorSpan.textContent = '';
      } else {
        event.preventDefault();
        errorSpan.textContent = 'El pin ingresado es incorrecto. Intentá nuevamente.';
        input.style.borderBottom = '1px solid red';
        
        toggle.classList.remove('fa-eye', 'fa-eye-slash');
        toggle.classList.add('fa-circle-exclamation');
        toggle.style.color = '#e30e0e';

      }
    });
  });
  