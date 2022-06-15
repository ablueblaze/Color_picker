class Mode {
    constructor(name, colorCount = 5, colors = []) {
        this.name = name;
        this.colors = colors;
        this.colorCount = colorCount;
    }
    getDemoHtml() {
        // This will be the html to generate the circle demos I have in mind
    }
    getPaletteHtml(placement) {
        // The html for the page palette
        placement.innerHTML = '';
        for (let i = 0; i < this.colorCount; i++) {
            const color = this.colors[i];
            const hexValue = color.hex.value;
            const colorName = color.name.value;
            placement.insertAdjacentHTML(
                'beforeend',
                `
                <div class="column">
                    <div class="color-box" style="background-color:${hexValue}"></div>
                    <div class="color-name"> 
                        <p [data-hex-value="${hexValue}"]>${hexValue}</p>
                        <p [data-color-name="${colorName}"]>${colorName}</p>
                    </div>
                </div>
                `
            );
        }
    }
}

export default Mode;
