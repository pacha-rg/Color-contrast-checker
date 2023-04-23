//Referencias Iniciales
const textColor = document.getElementById('text-color');
const bgColor = document.getElementById('bg-color');
const previewText = document.getElementById('preview');
const contrastRef = document.getElementById('contrast');
const rating = document.getElementById('rating');

textColor.value = "#" + randomColor();
bgColor.value = "#" + randomColor();

function randomColor () {
    let hexNum = Math.floor(Math.random()*16777215).toString(16);
    console.log(hexNum);
    return hexNum;
};

//Funcion para convertir valore hexadecimales en array RGB
function hexToRGB (colorValue) {
    const red = parseInt(colorValue.substring(1,3), 16);
    const green = parseInt(colorValue.substring(3,5), 16);
    const blue = parseInt(colorValue.substring(5,7), 16);
    return [red,green,blue];
}

let getRelativeLuminance = (color) => {
    const sRGB = color.map((val) => {
        const s = val/255;
        return s < 0.03928 ? s / 12 / 92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
};

let calculateConstrastRatio = (color1, color2) => {
    const luminance1 = getRelativeLuminance(color1);
    const luminance2 = getRelativeLuminance(color2);

    const light = Math.max(luminance1, luminance2);
    const dark = Math.min(luminance1,luminance2);
    const contrast = ( light + 0.05 ) / ( dark + 0.05 );
    return contrast;
}

let calcRating = (contrastVal) => {
    if (contrastVal > 12) {
        rating.style.backgroundColor = '#69eb67';
        return 'Fantastico';
    } else if (contrastVal > 7) {
        rating.style.backgroundColor = '#b7ea84';
        return 'Muy bien';
    } else if (contrastVal > 5) {
        rating.style.backgroundColor = '#f7d658';
        return 'Bueno';
    } else if (contrastVal > 3) {
        rating.style.backgroundColor = '#f17a55';
        return 'Malo';
    } else {
        rating.style.backgroundColor = '#f24646';
        return 'Horrible';
    }
};

let contrastChecker = () => {
    let textColorValue = textColor.value;
    let textColorRGBArray = hexToRGB(textColorValue);

    let bgColorValue = bgColor.value;
    let bgColorRGBArray = hexToRGB(bgColorValue);

    const contrast = calculateConstrastRatio(textColorRGBArray, bgColorRGBArray);

    contrastRef.innerText = contrast.toFixed(2);
    rating.innerText = calcRating(contrast);
    previewText.style.cssText =  `
    background-color: ${bgColorValue};
    color: ${textColorValue}
    `;
};

textColor.addEventListener("input", contrastChecker);
bgColor.addEventListener("input", contrastChecker);
window.addEventListener('load', contrastChecker);