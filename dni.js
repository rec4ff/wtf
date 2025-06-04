(function () {
  const styleData = {
    280: [
      { bottom: 33.405, left: 19.4855, width: 44.5393, height: 56.2318 },
      { bottom: 44.5393, left: 167.027, width: 32.2905 },
      { bottom: 1.1124, left: 125.269, width: 77.9442 }
    ],
    320: [
      { bottom: 39.8914, left: 23.2691, width: 53.1877, height: 67.1506 },
      { bottom: 53.1877, left: 199.459, width: 38.5605 },
      { bottom: 1.3284, left: 149.593, width: 93.079 }
    ],
    375: [
      { bottom: 48.8102, left: 28.4716, width: 65.0792, height: 82.164 },
      { bottom: 65.0792, left: 244.054, width: 47.1818 },
      { bottom: 1.6254, left: 183.038, width: 113.889 }
    ],
    414: [
      { bottom: 55.1344, left: 32.1606, width: 73.5114, height: 92.8098 },
      { bottom: 73.5114, left: 275.675, width: 53.295 },
      { bottom: 1.836, left: 206.754, width: 128.646 }
    ],
    430: [
      { bottom: 57.729, left: 33.674, width: 76.9708, height: 97.1773 },
      { bottom: 76.9708, left: 288.648, width: 55.803 },
      { bottom: 1.9224, left: 216.484, width: 134.7 }
    ],
    768: [
      { bottom: 101.512, left: 59.2133, width: 135.347, height: 170.879 },
      { bottom: 135.347, left: 507.567, width: 98.1255 },
      { bottom: 3.3804, left: 380.671, width: 236.86 }
    ]
  };

  function interpolateStyles(width) {
    const breakpoints = Object.keys(styleData).map(Number).sort((a, b) => a - b);
    if (width <= breakpoints[0]) return styleData[breakpoints[0]];
    if (width >= breakpoints[breakpoints.length - 1]) return styleData[breakpoints[breakpoints.length - 1]];

    let lower, upper;
    for (let i = 0; i < breakpoints.length - 1; i++) {
      if (width >= breakpoints[i] && width <= breakpoints[i + 1]) {
        lower = breakpoints[i];
        upper = breakpoints[i + 1];
        break;
      }
    }

    const ratio = (width - lower) / (upper - lower);
    return styleData[lower].map((item, i) => {
      const result = {};
      for (const key in item) {
        result[key] = item[key] + (styleData[upper][i][key] - item[key]) * ratio;
      }
      return result;
    });
  }

  function applyStyles() {
    const width = window.innerWidth;
    const styles = interpolateStyles(width);
    const elements = document.querySelectorAll("div.DNI_profilePhoto");

    elements.forEach((el, i) => {
      const s = styles[i];
      if (!s) return;
      el.style.position = 'absolute';
      for (const [key, value] of Object.entries(s)) {
        el.style[key] = `${value}px`;
      }
    });
  }

  // Control de ejecución
  function initProfilePhotos() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(applyStyles, 0);
    } else {
      window.addEventListener('load', applyStyles);
    }
    window.addEventListener("resize", applyStyles);
  }

  initProfilePhotos();
})();



(function () {
  const content1LettersData = {
    280: [
      { bottom: 20.0562, left: 11.1364, fontSize: 5.00992 },
      { bottom: 5.56612, left: 11.1343, fontSize: 11.6905 },
      { bottom: 106.898, left: 72.3781, fontSize: 5.00992 },
      { bottom: 97.4339, left: 72.3781, fontSize: 7.23678 },
      { bottom: 92.424, left: 72.3781, fontSize: 5.00992 },
      { bottom: 82.9603, left: 72.3781, fontSize: 7.23678 },
      { bottom: 77.9504, left: 72.3781, fontSize: 5.00992 },
      { bottom: 68.4868, left: 72.3781, fontSize: 7.23678 },
      { bottom: 77.9504, left: 105.783, fontSize: 5.00992 },
      { bottom: 68.4868, left: 105.783, fontSize: 7.23678 },
      { bottom: 77.9504, left: 172.593, fontSize: 5.00992 },
      { bottom: 68.4868, left: 172.593, fontSize: 7.23678 },
      { bottom: 63.4768, left: 72.3781, fontSize: 5.00992 },
      { bottom: 54.0132, left: 72.3781, fontSize: 7.23678 },
      { bottom: 49.0033, left: 72.3781, fontSize: 5.00992 },
      { bottom: 39.5396, left: 72.3781, fontSize: 7.23678 },
      { bottom: 34.5297, left: 150.322, fontSize: 5.00992 },
      { bottom: 34.5297, left: 72.3781, fontSize: 5.00992 },
      { bottom: 25.0661, left: 72.3781, fontSize: 7.23678 },
      { bottom: 20.0562, left: 72.3781, fontSize: 5.00992 },
      { bottom: 10.5925, left: 72.3781, fontSize: 7.23678 },
      { bottom: 3.35574, left: 72.3781, fontSize: 7.23678 }
    ],
    320: [
      { bottom: 23.9506, left: 13.2988, fontSize: 5.98272 },
      { bottom: 6.64692, left: 13.2963, fontSize: 13.9605 },
      { bottom: 127.654, left: 86.4321, fontSize: 5.98272 },
      { bottom: 116.353, left: 86.4321, fontSize: 8.64198 },
      { bottom: 110.37, left: 86.4321, fontSize: 5.98272 },
      { bottom: 99.0691, left: 86.4321, fontSize: 8.64198 },
      { bottom: 93.0864, left: 86.4321, fontSize: 5.98272 },
      { bottom: 81.7852, left: 86.4321, fontSize: 8.64198 },
      { bottom: 93.0864, left: 126.323, fontSize: 5.98272 },
      { bottom: 81.7852, left: 126.323, fontSize: 8.64198 },
      { bottom: 93.0864, left: 206.106, fontSize: 5.98272 },
      { bottom: 81.7852, left: 206.106, fontSize: 8.64198 },
      { bottom: 75.8024, left: 86.4321, fontSize: 5.98272 },
      { bottom: 64.5012, left: 86.4321, fontSize: 8.64198 },
      { bottom: 58.5185, left: 86.4321, fontSize: 5.98272 },
      { bottom: 47.2172, left: 86.4321, fontSize: 8.64198 },
      { bottom: 41.2345, left: 179.511, fontSize: 5.98272 },
      { bottom: 41.2345, left: 86.4321, fontSize: 5.98272 },
      { bottom: 29.9333, left: 86.4321, fontSize: 8.64198 },
      { bottom: 23.9506, left: 86.4321, fontSize: 5.98272 },
      { bottom: 12.6493, left: 86.4321, fontSize: 8.64198 },
      { bottom: 4.00734, left: 86.4321, fontSize: 8.64198 }
    ],
    375: [
      { bottom: 29.3054, left: 16.2721, fontSize: 7.32032 },
      { bottom: 8.13302, left: 16.2691, fontSize: 17.0817 },
      { bottom: 156.195, left: 105.756, fontSize: 7.32032 },
      { bottom: 142.367, left: 105.756, fontSize: 10.5741 },
      { bottom: 135.047, left: 105.756, fontSize: 7.32032 },
      { bottom: 121.219, left: 105.756, fontSize: 10.5741 },
      { bottom: 113.898, left: 105.756, fontSize: 7.32032 },
      { bottom: 100.07, left: 105.756, fontSize: 10.5741 },
      { bottom: 113.898, left: 154.567, fontSize: 7.32032 },
      { bottom: 100.07, left: 154.567, fontSize: 10.5741 },
      { bottom: 113.898, left: 252.187, fontSize: 7.32032 },
      { bottom: 100.07, left: 252.187, fontSize: 10.5741 },
      { bottom: 92.7501, left: 105.756, fontSize: 7.32032 },
      { bottom: 78.9222, left: 105.756, fontSize: 10.5741 },
      { bottom: 71.6019, left: 105.756, fontSize: 7.32032 },
      { bottom: 57.7739, left: 105.756, fontSize: 10.5741 },
      { bottom: 50.4536, left: 219.646, fontSize: 7.32032 },
      { bottom: 50.4536, left: 105.756, fontSize: 7.32032 },
      { bottom: 36.6257, left: 105.756, fontSize: 10.5741 },
      { bottom: 29.3054, left: 105.756, fontSize: 7.32032 },
      { bottom: 15.4774, left: 105.756, fontSize: 10.5741 },
      { bottom: 4.90329, left: 105.756, fontSize: 10.5741 }
    ],
    390: [
      { bottom: 30.7658, left: 17.083, fontSize: 7.68512 },
      { bottom: 8.53832, left: 17.0798, fontSize: 17.933 },
      { bottom: 163.979, left: 111.027, fontSize: 7.68512 },
      { bottom: 149.462, left: 111.027, fontSize: 11.1011 },
      { bottom: 141.777, left: 111.027, fontSize: 7.68512 },
      { bottom: 127.26, left: 111.027, fontSize: 11.1011 },
      { bottom: 119.574, left: 111.027, fontSize: 7.68512 },
      { bottom: 105.057, left: 111.027, fontSize: 11.1011 },
      { bottom: 119.574, left: 162.269, fontSize: 7.68512 },
      { bottom: 105.057, left: 162.269, fontSize: 11.1011 },
      { bottom: 119.574, left: 264.754, fontSize: 7.68512 },
      { bottom: 105.057, left: 264.754, fontSize: 11.1011 },
      { bottom: 97.3722, left: 111.027, fontSize: 7.68512 },
      { bottom: 82.8552, left: 111.027, fontSize: 11.1011 },
      { bottom: 75.1701, left: 111.027, fontSize: 7.68512 },
      { bottom: 60.653, left: 111.027, fontSize: 11.1011 },
      { bottom: 52.9679, left: 230.592, fontSize: 7.68512 },
      { bottom: 52.9679, left: 111.027, fontSize: 7.68512 },
      { bottom: 38.4509, left: 111.027, fontSize: 11.1011 },
      { bottom: 30.7658, left: 111.027, fontSize: 7.68512 },
      { bottom: 16.2487, left: 111.027, fontSize: 11.1011 },
      { bottom: 5.14764, left: 111.027, fontSize: 11.1011 }
    ],
    414: [
      { bottom: 33.1024, left: 18.3804, fontSize: 8.2688 },
      { bottom: 9.1868, left: 18.377, fontSize: 19.295 },
      { bottom: 176.433, left: 119.459, fontSize: 8.2688 },
      { bottom: 160.813, left: 119.459, fontSize: 11.9442 },
      { bottom: 152.544, left: 119.459, fontSize: 8.2688 },
      { bottom: 136.925, left: 119.459, fontSize: 11.9442 },
      { bottom: 128.656, left: 119.459, fontSize: 8.2688 },
      { bottom: 113.036, left: 119.459, fontSize: 11.9442 },
      { bottom: 128.656, left: 174.593, fontSize: 8.2688 },
      { bottom: 113.036, left: 174.593, fontSize: 11.9442 },
      { bottom: 128.656, left: 284.862, fontSize: 8.2688 },
      { bottom: 113.036, left: 284.862, fontSize: 11.9442 },
      { bottom: 104.768, left: 119.459, fontSize: 8.2688 },
      { bottom: 89.148, left: 119.459, fontSize: 11.9442 },
      { bottom: 80.8792, left: 119.459, fontSize: 8.2688 },
      { bottom: 65.2596, left: 119.459, fontSize: 11.9442 },
      { bottom: 56.9908, left: 248.105, fontSize: 8.2688 },
      { bottom: 56.9908, left: 119.459, fontSize: 8.2688 },
      { bottom: 41.3712, left: 119.459, fontSize: 11.9442 },
      { bottom: 33.1024, left: 119.459, fontSize: 8.2688 },
      { bottom: 17.4828, left: 119.459, fontSize: 11.9442 },
      { bottom: 5.5386, left: 119.459, fontSize: 11.9442 }
    ],
    430: [
      { bottom: 34.6602, left: 19.2454, fontSize: 8.65792 },
      { bottom: 9.61912, left: 19.2418, fontSize: 20.203 },
      { bottom: 184.736, left: 125.081, fontSize: 8.65792 },
      { bottom: 168.381, left: 125.081, fontSize: 12.5063 },
      { bottom: 159.723, left: 125.081, fontSize: 8.65792 },
      { bottom: 143.368, left: 125.081, fontSize: 12.5063 },
      { bottom: 134.71, left: 125.081, fontSize: 8.65792 },
      { bottom: 118.356, left: 125.081, fontSize: 12.5063 },
      { bottom: 134.71, left: 182.81, fontSize: 8.65792 },
      { bottom: 118.356, left: 182.81, fontSize: 12.5063 },
      { bottom: 134.71, left: 298.267, fontSize: 8.65792 },
      { bottom: 118.356, left: 298.267, fontSize: 12.5063 },
      { bottom: 109.698, left: 125.081, fontSize: 8.65792 },
      { bottom: 93.3432, left: 125.081, fontSize: 12.5063 },
      { bottom: 84.6853, left: 125.081, fontSize: 8.65792 },
      { bottom: 68.3306, left: 125.081, fontSize: 12.5063 },
      { bottom: 59.6727, left: 259.78, fontSize: 8.65792 },
      { bottom: 59.6727, left: 125.081, fontSize: 8.65792 },
      { bottom: 43.3181, left: 125.081, fontSize: 12.5063 },
      { bottom: 34.6602, left: 125.081, fontSize: 8.65792 },
      { bottom: 18.3055, left: 125.081, fontSize: 12.5063 },
      { bottom: 5.79924, left: 125.081, fontSize: 12.5063 }
    ],
    768: [
      { bottom: 60.9474, left: 33.8416, fontSize: 15.2243 },
      { bottom: 16.9145, left: 33.8353, fontSize: 35.5255 },
      { bottom: 324.844, left: 219.945, fontSize: 15.2243 },
      { bottom: 296.085, left: 219.945, fontSize: 21.9914 },
      { bottom: 280.861, left: 219.945, fontSize: 15.2243 },
      { bottom: 252.103, left: 219.945, fontSize: 21.9914 },
      { bottom: 236.878, left: 219.945, fontSize: 15.2243 },
      { bottom: 208.12, left: 219.945, fontSize: 21.9914 },
      { bottom: 236.878, left: 321.457, fontSize: 15.2243 },
      { bottom: 208.12, left: 321.457, fontSize: 21.9914 },
      { bottom: 236.878, left: 524.482, fontSize: 15.2243 },
      { bottom: 208.12, left: 524.482, fontSize: 21.9914 },
      { bottom: 192.896, left: 219.945, fontSize: 15.2243 },
      { bottom: 164.137, left: 219.945, fontSize: 21.9914 },
      { bottom: 148.913, left: 219.945, fontSize: 15.2243 },
      { bottom: 120.154, left: 219.945, fontSize: 21.9914 },
      { bottom: 104.93, left: 456.805, fontSize: 15.2243 },
      { bottom: 104.93, left: 219.945, fontSize: 15.2243 },
      { bottom: 76.1717, left: 219.945, fontSize: 21.9914 },
      { bottom: 60.9474, left: 219.945, fontSize: 15.2243 },
      { bottom: 32.1889, left: 219.945, fontSize: 21.9914 },
      { bottom: 10.1975, left: 219.945, fontSize: 21.9914 }
    ]
  };

  function interpolate(width, data) {
    const breakpoints = Object.keys(data).map(Number).sort((a, b) => a - b);
    if (width <= breakpoints[0]) return data[breakpoints[0]];
    if (width >= breakpoints[breakpoints.length - 1]) return data[breakpoints[breakpoints.length - 1]];

    let lower, upper;
    for (let i = 0; i < breakpoints.length - 1; i++) {
      if (width >= breakpoints[i] && width <= breakpoints[i + 1]) {
        lower = breakpoints[i];
        upper = breakpoints[i + 1];
        break;
      }
    }

    const ratio = (width - lower) / (upper - lower);
    const interpolated = [];
    for (let i = 0; i < data[lower].length; i++) {
      const a = data[lower][i];
      const b = data[upper][i];
      const entry = {};
      for (const key in a) {
        entry[key] = a[key] + (b[key] - a[key]) * ratio;
      }
      interpolated.push(entry);
    }
    return interpolated;
  }

  function applyLetterStyles() {
    const width = window.innerWidth;
    const styles = interpolate(width, content1LettersData);
    const elements = document.querySelectorAll("[class^='DNI_content1Letters']");

    elements.forEach((el, i) => {
      const s = styles[i];
      if (!s) return;
      
      // Aplicar ajuste de -4px a bottom para índices 3 a 22 (considerando que i empieza en 0)
      const adjustedBottom = (i >= 2 && i <= 21) ? s.bottom - 3 : s.bottom;
      
      el.style.position = 'absolute';
      el.style.bottom = `${adjustedBottom}px`;
      el.style.left = `${s.left}px`;
      el.style.fontSize = `${s.fontSize}px`;
    });
  }

  // Control de ejecución
  function initLetters() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(applyLetterStyles, 0);
    } else {
      window.addEventListener('load', applyLetterStyles);
    }
    window.addEventListener("resize", applyLetterStyles);
  }

  initLetters();
})();



(function () {
  const content1LettersData = {
    280: [
      { top: 12.2488, left: 11.1343, fontSize: 7.79298 },
      { bottom: 8.35124, left: 11.1343, fontSize: 8.90744 }
    ],
    375: [
      { top: 17.8975, left: 16.2691, fontSize: 11.3868 },
      { bottom: 12.2025, left: 16.2691, fontSize: 13.0152 }
    ],
    390: [
      { top: 18.7894, left: 17.0798, fontSize: 11.9543 },
      { bottom: 12.8106, left: 17.0798, fontSize: 13.6638 }
    ],
    414: [
      { top: 20.2164, left: 18.377, fontSize: 12.8622 },
      { bottom: 13.7836, left: 18.377, fontSize: 14.7016 }
    ],
    430: [
      { top: 21.1678, left: 19.2418, fontSize: 13.4675 },
      { bottom: 14.4322, left: 19.2418, fontSize: 15.3934 }
    ],
    768: [
      { top: 37.222, left: 33.8353, fontSize: 23.6816 },
      { bottom: 25.378, left: 33.8353, fontSize: 27.0682 }
    ]
  };

  function interpolate(width, data) {
    const breakpoints = Object.keys(data).map(Number).sort((a, b) => a - b);
    if (width <= breakpoints[0]) return data[breakpoints[0]];
    if (width >= breakpoints[breakpoints.length - 1]) return data[breakpoints[breakpoints.length - 1]];

    let lower, upper;
    for (let i = 0; i < breakpoints.length - 1; i++) {
      if (width >= breakpoints[i] && width <= breakpoints[i + 1]) {
        lower = breakpoints[i];
        upper = breakpoints[i + 1];
        break;
      }
    }

    const ratio = (width - lower) / (upper - lower);
    const interpolated = [];
    for (let i = 0; i < data[lower].length; i++) {
      const a = data[lower][i];
      const b = data[upper][i];
      const entry = {};
      for (const key in a) {
        entry[key] = a[key] + (b[key] - a[key]) * ratio;
      }
      interpolated.push(entry);
    }
    return interpolated;
  }

  function applyLetterStyles() {
    const width = window.innerWidth;
    const styles = interpolate(width, content1LettersData);
    const elements = document.querySelectorAll(".DNI_content1Letters_back");

    elements.forEach((el, i) => {
      const s = styles[i];
      if (!s) return;
      
      el.style.position = 'absolute';
      
      // Aplicar top o bottom según corresponda
      if (s.top !== undefined) {
        el.style.top = `${s.top}px`;
        el.style.bottom = ''; // Limpiar bottom si existe
      } else if (s.bottom !== undefined) {
        el.style.bottom = `${s.bottom}px`;
        el.style.top = ''; // Limpiar top si existe
      }
      
      el.style.left = `${s.left}px`;
      el.style.fontSize = `${s.fontSize}px`;
      
      // Ajustar el transform scale del primer span si existe
      if (i === 0) {
        const firstSpan = el.querySelector('.DNI_text');
        if (firstSpan) {
          firstSpan.style.display = 'inline-block';
          firstSpan.style.transform = 'scale(0.8)';
          firstSpan.style.marginLeft = '-6px';
        }
      }
    });
  }

  // Control de ejecución
  function initLetters() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(applyLetterStyles, 0);
    } else {
      window.addEventListener('load', applyLetterStyles);
    }
    window.addEventListener("resize", applyLetterStyles);
  }

  initLetters();
})();




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