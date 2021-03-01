import { TextStyle } from "pixi.js";

const genericStyle = new TextStyle({
	fontFamily: 'Arial',
	fontSize: 24,
	fontStyle: 'italic',
	fontWeight: 'bold',
	stroke: "#000000",
	strokeThickness: 2,
	fill: '#ffffff',
	wordWrap: true,
	wordWrapWidth: 440,
	lineJoin: 'round'
});
const styleTitle = genericStyle.clone();
styleTitle.fontSize = 36;
styleTitle.stroke = '#4a1850';
styleTitle.strokeThickness = 5,
	styleTitle.dropShadow = true;
styleTitle.dropShadowColor = '#000000';
styleTitle.dropShadowBlur = 4;
styleTitle.dropShadowAngle = Math.PI / 6;
styleTitle.dropShadowDistance = 6;
styleTitle.wordWrapWidth = 345;

const bestGuessStyle = styleTitle.clone();
bestGuessStyle.fontSize = 28;
bestGuessStyle.strokeThickness = 4;
bestGuessStyle.dropShadow = true;
bestGuessStyle.dropShadowColor = '#000000';
bestGuessStyle.dropShadowBlur = 4;
bestGuessStyle.dropShadowAngle = Math.PI / 6;
bestGuessStyle.dropShadowDistance = 6;

export { genericStyle, styleTitle, bestGuessStyle };

