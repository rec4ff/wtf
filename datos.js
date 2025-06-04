// Función para actualizar la imagen del DNI
function updateDniImage(isOld) {
    const dniImg = document.querySelector('.DNI_IMG');
    if (dniImg) {
        dniImg.src = isOld ? 'imgs/arg_front_viejo.webp' : 'imgs/arg_front_new.webp';
    }
}

// Función para guardar la preferencia
function saveDniPreference(isOld) {
    localStorage.setItem('dniType', isOld ? 'old' : 'new');
}

// Función para cargar la preferencia
function loadDniPreference() {
    const savedPreference = localStorage.getItem('dniType');
    return savedPreference === 'old';
}

// --- Página tramites.html (inputs) ---
if (document.querySelector('input[name="oldDniBg"]')) {
    // Configurar estado inicial
    const isOld = loadDniPreference();
    document.querySelector(`input[name="oldDniBg"][value="${isOld}"]`).checked = true;

    // Escuchar cambios en los radio buttons
    document.querySelectorAll('input[name="oldDniBg"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const isOld = this.value === 'true';
            saveDniPreference(isOld);
        });
    });
}

// --- Página dni-digital.html (imagen) ---
if (document.querySelector('.DNI_IMG')) {
    // Actualizar imagen al cargar
    const isOld = loadDniPreference();
    updateDniImage(isOld);

    // Escuchar cambios en localStorage (actualización en tiempo real)
    window.addEventListener('storage', function(e) {
        if (e.key === 'dniType') {
            const isOld = e.newValue === 'old';
            updateDniImage(isOld);
        }
    });
}



//////// NOMBRE Y APELLIDO //////
document.addEventListener('DOMContentLoaded', function() {
    // Función para formatear nombre (primera letra mayúscula, resto minúsculas)
    function formatNameProperCase(name) {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    // Función para guardar los datos en localStorage
    function saveFormData() {
        const formData = {
            name: document.querySelector('input[name="name"]')?.value,
            surname: document.querySelector('input[name="surname"]')?.value
        };
        localStorage.setItem('dniFormData', JSON.stringify(formData));
    }

    // Función para cargar los datos desde localStorage
    function loadFormData() {
        const savedData = localStorage.getItem('dniFormData');
        return savedData ? JSON.parse(savedData) : null;
    }

    // Función para actualizar TODOS los elementos que muestran nombre y apellido
    function updateAllNameDisplays() {
        const formData = loadFormData();
        if (!formData) return;

        // 1. Actualizar spans del DNI (en MAYÚSCULAS)
        const surnameSpan = document.querySelector('.Apellido .DNI_text');
        if (surnameSpan && formData.surname) {
            surnameSpan.textContent = formData.surname.toUpperCase();
        }

        const nameSpan = document.querySelector('.Nombre .DNI_text');
        if (nameSpan && formData.name) {
            nameSpan.textContent = formData.name.toUpperCase();
        }

        const surnameSpanDetail = document.querySelector('.ApellidoDetalle');
        if (surnameSpanDetail && formData.surname) {
            surnameSpanDetail.textContent = formData.surname.toUpperCase();
        }

        const nameSpanDetail = document.querySelector('.NombreDetalle');
        if (nameSpanDetail && formData.name) {
            nameSpanDetail.textContent = formData.name.toUpperCase();
        }

        const nameSurnSpanHeader = document.querySelector('.NombreApellidoHeader');
        if (nameSurnSpanHeader && formData.name && formData.surname) {
            nameSurnSpanHeader.textContent = `${formData.name.toUpperCase()} ${formData.surname.toUpperCase()}`;
        }
        

        // 2. Actualizar el elemento p.NombreIndex (Primera letra mayúscula)
        const nombreIndexElement = document.querySelector('.NombreIndex');
        if (nombreIndexElement && formData.name) {
            nombreIndexElement.textContent = `¡Hola, ${formatNameProperCase(formData.name)}!`;
        }

        // 3. Actualizar los nuevos elementos de Mis Docs (en MAYÚSCULAS)
        const nombreMisDocs = document.querySelector('.Docs_contentOpenInfoInfo.NombreMisDocs');
        if (nombreMisDocs && formData.name) {
            nombreMisDocs.textContent = formData.name.toUpperCase();
        }

        const apellidoMisDocs = document.querySelector('.Docs_contentOpenInfoInfo.ApellidoMisDocs');
        if (apellidoMisDocs && formData.surname) {
            apellidoMisDocs.textContent = formData.surname.toUpperCase();
        }
    }

    // --- Página tramites.html (inputs) ---
    const nameInput = document.querySelector('input[name="name"]');
    const surnameInput = document.querySelector('input[name="surname"]');
    
    if (nameInput && surnameInput) {
        // Cargar datos guardados al iniciar (si existen)
        const savedData = loadFormData();
        if (savedData) {
            nameInput.value = savedData.name || '';
            surnameInput.value = savedData.surname || '';
        }

        // Escuchar cambios en los inputs
        nameInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase(); // Guardamos en mayúsculas
            saveFormData();
            updateAllNameDisplays();
        });
        
        surnameInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase(); // Guardamos en mayúsculas
            saveFormData();
            updateAllNameDisplays();
        });

        // Guardar datos iniciales
        saveFormData();
    }

    // --- Páginas de visualización ---
    if (document.querySelector('.DNI_text') || document.querySelector('.NombreIndex') || 
        document.querySelector('.NombreMisDocs') || document.querySelector('.ApellidoMisDocs') ||
        document.querySelector('.NombreDetalle') || document.querySelector('.ApellidoDetalle') ||
        document.querySelector('.NombreApellidoHeader')) {
        updateAllNameDisplays();
        
        // Escuchar cambios en localStorage desde otras pestañas
        window.addEventListener('storage', function(event) {
            if (event.key === 'dniFormData') {
                updateAllNameDisplays();
            }
        });
    }
});



/////// M/F /////////
document.addEventListener('DOMContentLoaded', function() {
    // Función para guardar el sexo seleccionado
    function saveSexPreference(isMale) {
        localStorage.setItem('dniSex', isMale ? 'M' : 'F');
    }

    // Función para cargar la preferencia guardada
    function loadSexPreference() {
        return localStorage.getItem('dniSex') || 'M'; // Por defecto Masculino
    }

    // Función para actualizar el texto del sexo en el DNI
    function updateSexText() {
        const sexSpan = document.querySelector('.Sex .DNI_text');
        if (sexSpan) {
            sexSpan.textContent = loadSexPreference();
        }
    }

    // --- Página tramites.html (inputs) ---
    const sexRadios = document.querySelectorAll('input[name="sex"]');
    if (sexRadios.length > 0) {
        // Configurar el estado inicial desde localStorage
        const savedSex = loadSexPreference();
        const isMale = savedSex === 'M';
        
        // Marcar el radio button correspondiente
        document.querySelector(`input[name="sex"][value="${isMale ? 'Masculino' : 'Femenino'}"]`).checked = true;

        // Escuchar cambios en los radio buttons
        sexRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const isMale = this.value === 'Masculino';
                saveSexPreference(isMale);
            });
        });
    }

    // --- Página dni-digital.html (span) ---
    if (document.querySelector('.Sex .DNI_text')) {
        // Actualizar el texto al cargar la página
        updateSexText();
        
        // Escuchar cambios en localStorage desde otras pestañas
        window.addEventListener('storage', function(event) {
            if (event.key === 'dniSex') {
                updateSexText();
            }
        });
    }
});



///////// FECHAS NACIMIENTO, VENICMIENTO, EMISIÓN ////////////
document.addEventListener('DOMContentLoaded', function() {
    // Función para convertir fecha a formato YYYY-MM-DD sin problemas de zona horaria
    function normalizeDate(dateString) {
        if (!dateString) return '';
        
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
        }
        return dateString;
    }

    // Función para formatear fecha al formato del DNI (ej: "27 AGO/ AUG 2005")
    function formatDateForDNI(dateString) {
        if (!dateString) return '';
        
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        
        const dayFormatted = parseInt(day, 10);
        const monthEs = date.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
        const monthEn = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const yearFormatted = year;
        
        return `${dayFormatted} ${monthEs}/ ${monthEn} ${yearFormatted}`;
    }

    // Función para formatear fecha simple (DD/MM/YYYY)
    function formatSimpleDate(dateString) {
        if (!dateString) return '-';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    // Función para calcular fecha de vencimiento (emisión +15 años)
    function calculateExpirationDate(emissionDate) {
        if (!emissionDate) return '';
        const [year, month, day] = emissionDate.split('-');
        const expirationYear = parseInt(year, 10) + 15;
        return `${expirationYear}-${month}-${day}`;
    }

    // Función para guardar las fechas en localStorage
    function saveDates(birthDate, emissionDate) {
        const dates = {
            birthDate: normalizeDate(birthDate),
            emissionDate: normalizeDate(emissionDate),
            expirationDate: calculateExpirationDate(normalizeDate(emissionDate))
        };
        localStorage.setItem('dniDates', JSON.stringify(dates));
    }

    // Función para cargar las fechas desde localStorage
    function loadDates() {
        const savedDates = localStorage.getItem('dniDates');
        return savedDates ? JSON.parse(savedDates) : null;
    }

    // Función para actualizar TODOS los elementos de fecha
    function updateAllDateTexts() {
        const dates = loadDates();
        if (!dates) return;

        // 1. Actualizar spans del DNI (formato especial)
        const birthSpan = document.querySelector('.FechaNacimiento .DNI_text');
        if (birthSpan) {
            birthSpan.textContent = formatDateForDNI(dates.birthDate);
        }

        const emissionSpan = document.querySelector('.FechaEmision .DNI_text');
        if (emissionSpan) {
            emissionSpan.textContent = formatDateForDNI(dates.emissionDate);
        }

        const expirationSpan = document.querySelector('.FechaVencimiento .DNI_text');
        if (expirationSpan) {
            expirationSpan.textContent = formatDateForDNI(dates.expirationDate);
        }

        // 2. Actualizar nuevo span con formato simple (DD/MM/YYYY)
        const expirationSimpleSpan = document.querySelector('.Docs_contentOpenInfoInfo.FechaVencimientoMisDocs');
        if (expirationSimpleSpan) {
            expirationSimpleSpan.textContent = formatSimpleDate(dates.expirationDate);
        }

        const expirationSimpleSpanDetail = document.querySelector('.FechaVencimientoDetalle');
        if (expirationSimpleSpanDetail) {
            expirationSimpleSpanDetail.textContent = formatSimpleDate(dates.expirationDate);
        }

        const emissionSimpleSpanDetail = document.querySelector('.FechaEmisionDetalle');
        if (emissionSimpleSpanDetail) {
            emissionSimpleSpanDetail.textContent = formatSimpleDate(dates.emissionDate);
        }

        const birthSimpleSpanDetail = document.querySelector('.FechaNacimientoDetalle');
        if (birthSimpleSpanDetail) {
            birthSimpleSpanDetail.textContent = formatSimpleDate(dates.birthDate);
        }
    }

    // --- Página tramites.html (inputs) ---
    const birthInput = document.querySelector('.nacimiento input[type="date"]');
    const emissionInput = document.querySelector('.Emision input[type="date"]');
    
    if (birthInput && emissionInput) {
        // Cargar datos guardados al iniciar (si existen)
        const savedDates = loadDates();
        if (savedDates) {
            birthInput.value = savedDates.birthDate;
            emissionInput.value = savedDates.emissionDate;
        } else {
            // Guardar valores iniciales si no hay datos guardados
            saveDates(birthInput.value, emissionInput.value);
        }

        // Escuchar cambios en los inputs
        birthInput.addEventListener('change', function() {
            saveDates(this.value, emissionInput.value);
            updateAllDateTexts(); // Actualización inmediata
        });
        
        emissionInput.addEventListener('change', function() {
            saveDates(birthInput.value, this.value);
            updateAllDateTexts(); // Actualización inmediata
        });
    }

    // --- Páginas de visualización ---
    if (document.querySelector('.FechaNacimiento .DNI_text') || 
        document.querySelector('.Docs_contentOpenInfoInfo.FechaVencimientoMisDocs') ||
        document.querySelector('.FechaVencimientoDetalle') ||
        document.querySelector('.FechaNacimientoDetalle')) {
        updateAllDateTexts();
        
        // Escuchar cambios en localStorage desde otras pestañas
        window.addEventListener('storage', function(event) {
            if (event.key === 'dniDates') {
                updateAllDateTexts();
            }
        });
    }
});


///////// NRO DNI /////////
document.addEventListener('DOMContentLoaded', function() {
    // Función para formatear el DNI con puntos
    function formatDNIWithDots(dniNumber) {
        if (!dniNumber) return '';
        
        const cleanDNI = dniNumber.toString().replace(/\D/g, '').substring(0, 8);
        
        if (cleanDNI.length > 5) {
            return `${cleanDNI.substring(0, 2)}.${cleanDNI.substring(2, 5)}.${cleanDNI.substring(5)}`;
        } else if (cleanDNI.length > 2) {
            return `${cleanDNI.substring(0, 2)}.${cleanDNI.substring(2)}`;
        }
        return cleanDNI;
    }

    // Función para guardar el DNI en localStorage
    function saveDNI(dniNumber) {
        localStorage.setItem('dniNumber', dniNumber);
    }

    // Función para cargar el DNI desde localStorage
    function loadDNI() {
        return localStorage.getItem('dniNumber') || '';
    }

    // Función para actualizar TODAS las visualizaciones del DNI
    function updateAllDNIDisplays() {
        const dniNumber = loadDNI();
        
        // 1. Actualizar span con formato XX.XXX.XXX
        const dniFormattedSpan = document.querySelector('.Documento .DNI_text');
        if (dniFormattedSpan) {
            dniFormattedSpan.textContent = formatDNIWithDots(dniNumber);
        }
        
        // 2. Actualizar span con formato sin puntos (solo números)
        const dniPlainSpan = document.querySelector('.Docs_contentOpenInfoInfo.DocumentoMisDocs');
        if (dniPlainSpan) {
            dniPlainSpan.textContent = dniNumber;
        }

        const dniDetailSpan = document.querySelector('.NroDniDetalle');
        if (dniDetailSpan) {
            dniDetailSpan.textContent = dniNumber;
        }
    }

    // --- Página tramites.html (input) ---
    const dniInput = document.querySelector('input[name="dni"]');
    if (dniInput) {
        // Cargar DNI guardado al iniciar
        const savedDNI = loadDNI();
        if (savedDNI) {
            dniInput.value = savedDNI;
        } else {
            // Guardar valor inicial si no hay dato guardado
            saveDNI(dniInput.value);
        }

        // Escuchar cambios en el input
        dniInput.addEventListener('input', function() {
            const cleanValue = this.value.replace(/\D/g, '').substring(0, 8);
            this.value = cleanValue;
            saveDNI(cleanValue);
            updateAllDNIDisplays(); // Actualización inmediata en la misma pestaña
        });
    }

    // --- Páginas de visualización ---
    if (document.querySelector('.Documento .DNI_text') || document.querySelector('.Docs_contentOpenInfoInfo.DocumentoMisDocs') || document.querySelector('.NroDniDetalle')) {
        updateAllDNIDisplays();
        
        // Escuchar cambios en localStorage desde otras pestañas
        window.addEventListener('storage', function(event) {
            if (event.key === 'dniNumber') {
                updateAllDNIDisplays();
            }
        });
    }
});


//////// DOMICILIO ///////
document.addEventListener('DOMContentLoaded', function() {
    // Función para guardar el domicilio en localStorage (siempre en mayúsculas)
    function saveDomicilio(domicilio) {
        localStorage.setItem('dniDomicilio', domicilio.toUpperCase());
    }

    // Función para cargar el domicilio desde localStorage
    function loadDomicilio() {
        return localStorage.getItem('dniDomicilio') || '';
    }

    // Función para actualizar el texto del domicilio (ya viene en mayúsculas)
    function updateDomicilioText() {
        const domicilioSpans = document.querySelectorAll('.Domicilio .DNI_text');
        if (domicilioSpans.length >= 2) {
            // El segundo span es donde va el texto del domicilio (índice 1)
            domicilioSpans[1].textContent = loadDomicilio();
        }

        const domicilioDetail = document.querySelector('.DomicilioDetalle');
        if (domicilioDetail) {
            domicilioDetail.textContent = loadDomicilio();
        }
    }

    // --- Página con el input de domicilio ---
    const domicilioInput = document.querySelector('input[name="domicilio"]');
    if (domicilioInput) {
        // Convertir a mayúsculas al cargar
        domicilioInput.value = domicilioInput.value.toUpperCase();
        
        // Cargar domicilio guardado al iniciar
        const savedDomicilio = loadDomicilio();
        if (savedDomicilio) {
            domicilioInput.value = savedDomicilio;
        } else {
            // Guardar valor inicial si no hay dato guardado
            saveDomicilio(domicilioInput.value);
        }

        // Escuchar cambios en el input y convertir a mayúsculas
        domicilioInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            saveDomicilio(this.value);
        });
    }

    // --- Página con el span de domicilio ---
    if (document.querySelector('.Domicilio') || document.querySelector('.DomicilioDetalle')) {
        updateDomicilioText();
        
        // Escuchar cambios en localStorage desde otras pestañas
        window.addEventListener('storage', function(event) {
            if (event.key === 'dniDomicilio') {
                updateDomicilioText();
            }
        });
    }
});



//////// DNI BACK ////////////
document.addEventListener('DOMContentLoaded', function() {
    // Función para guardar el DNI en localStorage
    function saveDNI(dniNumber) {
        localStorage.setItem('dniNumber', dniNumber);
    }

    // Función para cargar el DNI desde localStorage
    function loadDNI() {
        return localStorage.getItem('dniNumber') || '';
    }

    // Función para actualizar los spans del DNI
    function updateDNISpans() {
        const dniContainer = document.querySelector('.dni_back_num');
        if (!dniContainer) return;
        
        const dniSpans = dniContainer.querySelectorAll('.DNI_text');
        const dniNumber = loadDNI();
        
        // Verificar que tenemos suficientes spans (necesitamos al menos 13)
        if (dniSpans.length >= 13) {
            // Distribuir los dígitos del DNI en los spans 6 al 13 (índices 5 a 12)
            for (let i = 0; i < 8; i++) {
                const spanIndex = 5 + i; // Comenzamos en el 6to span
                if (spanIndex < dniSpans.length && i < dniNumber.length) {
                    dniSpans[spanIndex].textContent = dniNumber[i];
                } else if (spanIndex < dniSpans.length) {
                    dniSpans[spanIndex].textContent = ''; // Limpiar si no hay dígito
                }
            }
        }
    }

    // --- Página con el input de DNI ---
    const dniInput = document.querySelector('input[name="dni"]');
    if (dniInput) {
        // Cargar DNI guardado al iniciar
        const savedDNI = loadDNI();
        if (savedDNI) {
            dniInput.value = savedDNI;
        } else {
            // Guardar valor inicial si no hay dato guardado
            saveDNI(dniInput.value);
        }

        // Escuchar cambios en el input
        dniInput.addEventListener('input', function() {
            // Validar que solo contenga números y máximo 8 dígitos
            const cleanValue = this.value.replace(/\D/g, '').substring(0, 8);
            this.value = cleanValue;
            saveDNI(cleanValue);
        });
    }

    // --- Página con los spans de DNI ---
    if (document.querySelector('.dni_back_num')) {
        updateDNISpans();
        
        // Escuchar cambios en localStorage desde otras pestañas
        window.addEventListener('storage', function(event) {
            if (event.key === 'dniNumber') {
                updateDNISpans();
            }
        });
    }
});



/////////// NOMBRE Y APELLIDO BACK //////////
document.addEventListener('DOMContentLoaded', function() {
    // Función para guardar nombre y apellido
    function saveNameData(name, surname) {
        localStorage.setItem('dniNameData', JSON.stringify({
            name: name.toUpperCase(),
            surname: surname.toUpperCase()
        }));
    }

    // Función para cargar nombre y apellido
    function loadNameData() {
        const savedData = localStorage.getItem('dniNameData');
        return savedData ? JSON.parse(savedData) : { name: '', surname: '' };
    }

    // Función para actualizar los spans
    function updateNameSpans() {
        const nameContainer = document.querySelector('.dni_back_name_surname');
        if (!nameContainer) return;
        
        const nameSpans = nameContainer.querySelectorAll('.DNI_text');
        const { name, surname } = loadNameData();
        
        // Insertar apellido (letra por letra)
        let currentIndex = 0;
        for (; currentIndex < surname.length && currentIndex < nameSpans.length; currentIndex++) {
            nameSpans[currentIndex].textContent = surname[currentIndex];
        }
        
        // Primeros dos separadores "<" después del apellido
        if (currentIndex < nameSpans.length) nameSpans[currentIndex++].textContent = '<';
        if (currentIndex < nameSpans.length) nameSpans[currentIndex++].textContent = '<';
        
        // Insertar nombre
        for (let i = 0; i < name.length && currentIndex < nameSpans.length; i++, currentIndex++) {
            nameSpans[currentIndex].textContent = name[i];
        }
        
        // Siguientes dos separadores "<" después del nombre
        if (currentIndex < nameSpans.length) nameSpans[currentIndex++].textContent = '<';
        if (currentIndex < nameSpans.length) nameSpans[currentIndex++].textContent = '<';
        
        // Rellenar todos los spans restantes con "<"
        for (; currentIndex < nameSpans.length; currentIndex++) {
            nameSpans[currentIndex].textContent = '<';
        }
    }

    // --- Página con inputs ---
    const nameInput = document.querySelector('input[name="name"]');
    const surnameInput = document.querySelector('input[name="surname"]');
    
    if (nameInput && surnameInput) {
        // Cargar datos guardados
        const savedData = loadNameData();
        if (savedData.name || savedData.surname) {
            nameInput.value = savedData.name;
            surnameInput.value = savedData.surname;
        } else {
            saveNameData(nameInput.value, surnameInput.value);
        }

        // Escuchar cambios
        nameInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            saveNameData(this.value, surnameInput.value);
        });
        
        surnameInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
            saveNameData(nameInput.value, this.value);
        });
    }

    // --- Página con spans ---
    if (document.querySelector('.dni_back_name_surname')) {
        updateNameSpans();
        
        window.addEventListener('storage', function(event) {
            if (event.key === 'dniNameData') {
                updateNameSpans();
            }
        });
    }
});