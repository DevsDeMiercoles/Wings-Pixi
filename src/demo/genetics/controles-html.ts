let populationSlider: HTMLElement;
let mutationSlider: HTMLElement;
let fitnessSlider: HTMLElement;
let bestSurvivorCheck: HTMLElement;
let targetText: HTMLElement;


function loadControlesHtml() {
	populationSlider = document.getElementById("populationSlide")!;
	mutationSlider = document.getElementById("mutationSlide")!;
	fitnessSlider = document.getElementById("fitnessSlide")!;
	bestSurvivorCheck = document.getElementById("saveBest")!;
	targetText = document.getElementById("target")!;
}



export { populationSlider, mutationSlider, fitnessSlider, bestSurvivorCheck, targetText, loadControlesHtml };

