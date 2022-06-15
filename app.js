import Mode from './scripts/mode-class.js';
/*
Different color modes available: 
    monochrome monochrome-dark monochrome-light 
    analogic complement triad quad
*/

const colorBoxes = document.getElementById('color-boxes');
const rootColor = document.getElementById('root-color');
const modeSelector = document.getElementById('mode-selector')
let currentMode = ''

rootColor.addEventListener('change', () => {
    const hexValue = JSON.stringify(rootColor.value);
    getAllColors(hexValue.slice(2, 8))
});

let quad = new Mode('quad', 4)
let triad = new Mode('triad', 3);
let analogic = new Mode('analogic');
let complement = new Mode('complement');
let monochrome = new Mode('monochrome');
let monochromeDark = new Mode('monochrome-dark');
let monochromeLight = new Mode('monochrome-light');

quad.active = true;

const allColors = [
    quad,
    triad,
    analogic,
    complement,
    monochrome,
    monochromeDark,
    monochromeLight,
];

function getColors(colorMode, startHex) {
    const colorModeName = colorMode.name;
    const count = colorMode.colorCount;
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${startHex}&mode=${colorModeName}&count=${count}&format=json`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            console.log(data.colors);
            colorMode.colors = data.colors;
            if (colorMode.active) {
                colorMode.getPaletteHtml(colorBoxes);
                modeSelector.textContent = colorMode.name;
            }
        });
}

function getAllColors(startHex) {
    for (let i of allColors) {
        getColors(i, startHex)
    }
}

getAllColors('0fbbd2')
