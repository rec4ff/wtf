const content = document.querySelector('.DNI_content1');
let startX = 0;
let currentX = 0;
let isDragging = false;
let isFlipped = false;

// Variables para el canvas de firma
let canvas = document.getElementById('signatureCanvas');
let ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Configuración del canvas de firma
ctx.strokeStyle = '#000';
ctx.lineWidth = 2;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

content.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

content.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  currentX = e.touches[0].clientX;
  const diffX = currentX - startX;
  const progress = Math.abs(diffX) / content.offsetWidth;

  content.style.transition = 'none';

  if (!isFlipped && diffX < 0) {
    // Frente → Dorso (deslizar izquierda)
    const angle = Math.min(180, Math.abs(diffX) / content.offsetWidth * 180);
    content.style.transform = `rotateY(-${angle}deg)`;
  } else if (isFlipped && diffX > 0) {
    // Dorso → Frente (deslizar derecha)
    const angle = Math.min(180, diffX / content.offsetWidth * 180);
    content.style.transform = `rotateY(-${180 - angle}deg)`;
  }
});

content.addEventListener('touchend', () => {
  if (!isDragging) return;

  const diffX = currentX - startX;
  const progress = Math.abs(diffX) / content.offsetWidth;

  content.style.transition = 'transform 0.5s ease';

  if (!isFlipped && diffX < 0 && progress > 0.2) {
    // Completar frente → dorso
    isFlipped = true;
    content.style.transform = 'rotateY(-180deg)';
  } else if (isFlipped && diffX > 0 && progress > 0.2) {
    // Completar dorso → frente
    isFlipped = false;
    content.style.transform = 'rotateY(0deg)';
  } else {
    // Cancelar gesto, volver al estado original
    content.style.transform = isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)';
  }

  isDragging = false;
});

// Eventos del canvas de firma
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Eventos táctiles para dispositivos móviles
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    isDrawing = true;
    [lastX, lastY] = [x, y];
}

function handleTouchMove(e) {
    if (!isDrawing) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    [lastX, lastY] = [x, y];
}

function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Manejo de la foto del DNI
const dniPhotoInput = document.querySelector('input[name="dniPhoto"]');
const dniPhotoPreview = document.getElementById('dniPhotoPreview');
const previewOverlay = document.querySelector('.registerForm_previewOverlay');

dniPhotoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            dniPhotoPreview.src = e.target.result;
            dniPhotoPreview.style.display = 'block';
            previewOverlay.style.display = 'none';
            
            // Actualizar la foto en el DNI digital
            const dniPhoto = document.querySelector('.DNI_profilePhoto[texttype="dniPhoto"] img');
            if (dniPhoto) {
                dniPhoto.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
});

// Función para guardar la firma
function saveSignature() {
    const signatureData = canvas.toDataURL('image/png');
    const signatureImg = document.querySelector('.DNI_profilePhoto[texttype="signPhoto"] img');
    if (signatureImg) {
        signatureImg.src = signatureData;
    }
    localStorage.setItem('dniSignature', signatureData);
}

// Función para cargar la firma guardada
function loadSignature() {
    const savedSignature = localStorage.getItem('dniSignature');
    if (savedSignature) {
        const signatureImg = document.querySelector('.DNI_profilePhoto[texttype="signPhoto"] img');
        if (signatureImg) {
            signatureImg.src = savedSignature;
        }
    }
}

// Función para guardar los datos del formulario
function saveFormData() {
    const form = document.querySelector('.registerForm');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Guardar la foto del DNI si existe
    const dniPhoto = document.getElementById('dniPhotoPreview');
    if (dniPhoto && dniPhoto.src) {
        data.dniPhoto = dniPhoto.src;
    }
    
    localStorage.setItem('dniFormData', JSON.stringify(data));
}

// Función para cargar los datos del formulario
function loadFormData() {
    const savedData = localStorage.getItem('dniFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        const form = document.querySelector('.registerForm');
        
        // Restaurar los valores de los campos
        for (let key in data) {
            if (key !== 'dniPhoto') {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = data[key];
                }
            }
        }
        
        // Restaurar la foto del DNI si existe
        if (data.dniPhoto) {
            const dniPhoto = document.getElementById('dniPhotoPreview');
            const dniPhotoDisplay = document.querySelector('.DNI_profilePhoto[texttype="dniPhoto"] img');
            if (dniPhoto) {
                dniPhoto.src = data.dniPhoto;
                dniPhoto.style.display = 'block';
            }
            if (dniPhotoDisplay) {
                dniPhotoDisplay.src = data.dniPhoto;
            }
        }
    }
}

// Evento de envío del formulario
document.querySelector('.registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    saveSignature();
    saveFormData();
    generatePDF417();
    
    // Mostrar mensaje de éxito
    alert('Datos guardados correctamente');
});

// Función para generar el código PDF417
function generatePDF417() {
    const formData = {
        dni: document.querySelector('input[name="dni"]').value,
        tramite: document.querySelector('input[name="tramite"]').value,
        nombre: document.querySelector('input[name="name"]').value,
        apellido: document.querySelector('input[name="surname"]').value,
        sexo: document.querySelector('input[name="sex"]:checked').value,
        fechaNacimiento: document.querySelector('input[type="date"]').value,
        fechaEmision: document.querySelector('.Emision input[type="date"]').value,
        domicilio: document.querySelector('input[name="domicilio"]').value
    };

    // Crear el string para el código PDF417
    const pdf417Data = `${formData.dni}|${formData.tramite}|${formData.apellido}|${formData.nombre}|${formData.sexo}|${formData.fechaNacimiento}|${formData.fechaEmision}|${formData.domicilio}`;

    // Generar el código PDF417
    const barcodeImg = document.querySelector('.C_Barras');
    if (barcodeImg) {
        try {
            const canvas = document.createElement('canvas');
            const options = {
                width: 300,
                height: 100,
                backgroundColor: '#ffffff',
                foregroundColor: '#000000'
            };
            
            PDF417.draw(pdf417Data, canvas, options);
            
            // Convertir el canvas a imagen
            const dataUrl = canvas.toDataURL('image/png');
            barcodeImg.src = dataUrl;
        } catch (error) {
            console.error('Error al generar el código PDF417:', error);
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
    loadSignature();
    
    // Configurar el canvas de firma
    canvas = document.getElementById('signatureCanvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Ajustar el tamaño del canvas al contenedor
        function resizeCanvas() {
            const container = canvas.parentElement;
            canvas.width = container.offsetWidth - 30; // Restar el padding
            canvas.height = 150;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    // Escuchar cambios en los campos del formulario para actualizar el PDF417
    const formInputs = document.querySelectorAll('.registerForm_input');
    formInputs.forEach(input => {
        input.addEventListener('change', generatePDF417);
    });

    // Escuchar la carga de la foto del DNI
    if (dniPhotoInput) {
        dniPhotoInput.addEventListener('change', handleDNIPhotoUpload);
    }
});
