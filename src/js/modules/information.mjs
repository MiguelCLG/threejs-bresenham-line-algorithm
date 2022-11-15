import Singleton from "./singleton.mjs";

export default class Information {
    constructor() {
        this.singleton = new Singleton();
        this.informationData = {
            lastClicked: 'N/A',
            lastCalculation: 'N/A',
        }
        this.assignInfoBox();
    }

    assignInfoBox() {
        this.lastClickedText = document.querySelector('.last-clicked-text')
        this.lastClickedText.nodeValue = `Last Clicked: ${this.informationData.lastClicked}`;
        this.lastCalculationText = document.querySelector('.last-calculation-text')
        this.lastCalculationText.innerText = `Last Calculation: ${this.informationData.lastCalculation}`;
    }

    updateData(infoData) {
        this.informationData = {
            lastClicked: infoData.lastClicked || this.informationData.lastClicked,
            lastCalculation: infoData.lastCalculation || this.informationData.lastCalculation,
        };
    }
    
    updateInformation() {
        this.lastClickedText.innerText = `Last Clicked: ${this.informationData.lastClicked}`;
        this.lastCalculationText.innerText = `Last Calculation: ${this.informationData.lastCalculation}`;
    }
    resize() { }
    update() {  this.updateInformation(); }
}