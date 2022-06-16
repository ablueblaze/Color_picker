/* 
Color picker
Features:
    Select the base color
    Select the type of color scheme to view
    Display colors
    Display hex values

Different modes available:
    quad
    triad 
    analogic 
    monochrome 
    complement 
    monochrome-dark 
    monochrome-light 
    analogic-complement 
*/

import Scheme from './scripts/scheme-class.js';

let activeColor = '0fbbd2';

let colorSchemes = [
    new Scheme('quad', 4, true),
    new Scheme('triad', 3),
    new Scheme('analogic', 5),
    new Scheme('complement', 2),
    new Scheme('monochrome', 5 ),
    // new Scheme('monochrome-dark', 5),
    // new Scheme('monochrome-light', 5),
    // new Scheme('analogic-complement', 5)
];

const colorField = document.getElementById('color-field');

const updateColorField = () => {
    colorSchemes.map((scheme) => {
        if (scheme.active) {
            getColors(scheme, activeColor)
        }
    })
}

const getColors = (colorScheme, startingHex) => {
    const count = colorScheme.colorCount;
    const modeName = colorScheme.name;
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${startingHex}&mode=${modeName}&count=${count}&format=json`
    )
        .then((res) => res.json())
        .then((data) => {
            colorScheme.colors = data.colors;
            colorScheme.getPaletteHtml(colorField)
        });
};

// initial instance
updateColorField()

/*
############
Event Listeners
############
*/

const schemeBtn = document.getElementById('scheme-btn')
const schemeList = document.getElementById('scheme-list')
const schemeNames = document.querySelectorAll('[data-scheme-name]')

// set active on the list item on page, and inside the scheme object
const setActiveScheme = (activeScheme) => {
    colorSchemes.map(scheme => {
        scheme.active = false
        if (scheme.name === activeScheme) {
            scheme.active = true
            // scheme.getPaletteHtml(colorField)
        }
    })
    schemeNames.forEach(scheme => {
        scheme.classList.remove('active')
        if (scheme.dataset.schemeName === activeScheme) {
            scheme.classList.add('active')
        }
    })
}

// Get a color from the user, update the active color
document.getElementById('color-selector').addEventListener('change', (e) => {
    activeColor = e.target.value.slice(1, 8);
})

// Activate the dropdown menu
schemeBtn.addEventListener('click', () => {
    schemeList.classList.add('active')
})


schemeNames.forEach(scheme => {
    scheme.addEventListener('click', (e) => {
        const schemeName = e.target.dataset.schemeName;
        schemeBtn.textContent = schemeName;
        setActiveScheme(schemeName)
        scheme.classList.add('active')
        schemeList.classList.remove('active')
    })
})

// Update the colors on screen
document.getElementById('get-colors-btn').addEventListener('click', () => {
    updateColorField()
})