class Scheme {
    constructor(name, colorCount, active = false,  colors = []) {
        this.name = name;
        this.active = active
        this.colors = colors;
        this.colorCount = colorCount;
    }
    getPaletteHtml(placement) {
        // The html for the page palette
        placement.innerHTML = '';
        for (let i = 0; i < this.colorCount; i++) {
            const color = this.colors[i];
            const hexValue = color.hex.value;
            placement.insertAdjacentHTML(
                'beforeend',
                `
                <div class="column">
                    <div class="color-box" style="background-color:${hexValue}"></div>
                    <div class="color-name"> 
                        <p data-hex-value="${hexValue}">${hexValue}</p>
                    </div>
                </div>
                `
            );
        }
    }
    getHexValues() {
        let colors = []
        for (let i of this.colors) {
            colors.push(i.hex.value)
        }
        return colors
    }
}

export default Scheme;
