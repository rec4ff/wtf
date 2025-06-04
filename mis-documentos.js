document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.Docs_contentCardFirstBtn');
  
    toggleButtons.forEach(function (btn) {
      let isActive = false;
  
      // Buscar el contenedor .Docs_contentOpen más cercano dentro del mismo .Docs_contentCard
      const card = btn.closest('.Docs_contentCard');
      const openSection = card.querySelector('.Docs_contentOpen');
  
      btn.addEventListener('click', function (event) {
        event.stopPropagation();
  
        if (!isActive) {
          // Activar
          btn.style.borderBottom = '1px solid rgb(148, 148, 148)';
          btn.style.borderTop = 'none';
          btn.style.borderRight = 'none';
          btn.style.borderLeft = 'none';
          btn.style.borderImage = 'initial';
  
          if (openSection) openSection.style.display = 'flex';
  
          isActive = true;
        } else {
          // Desactivar
          btn.style.border = 'none';
          btn.style.borderImage = 'initial';
  
          if (openSection) openSection.style.display = 'none';
  
          isActive = false;
        }
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const span = document.querySelector('.UltimaAct');
  
    if (span) {
      const ahora = new Date();
      const dia = String(ahora.getDate()).padStart(2, '0');
      const mes = String(ahora.getMonth() + 1).padStart(2, '0');
      const anio = ahora.getFullYear();
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
  
      const texto = `Última actualización ${dia}/${mes}/${anio} ${horas}:${minutos} hs`;
      span.textContent = texto;
    }
  });
  