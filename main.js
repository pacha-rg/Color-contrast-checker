//Referencias Iniciales
const textColor = document.getElementById('text-color');
const bgColor = document.getElementById('bg-color');
const previewText = document.getElementById('preview');
const contrastRef = document.getElementById('contrast');
const rating = document.getElementById('rating');

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
        return s < 0.03928 ? s / 12 / 92 : Math.pow((s+0.055)/1.055, 2.4);
    });
    return 0.2126* sRGB[0] + 0.7152 * sRGB[1] + 0.722 * sRGB[2];
};
