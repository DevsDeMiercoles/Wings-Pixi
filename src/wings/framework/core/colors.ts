function rgb(r: number, g?: number, b?: number): number {
	return rgb255(r * 255, g ?? r * 255, b ?? r * 255);
}
function rgb255(r: number, g?: number, b?: number): number {
	var red = toHex(Math.floor(r));
	var green = g ? toHex(Math.floor(g)) : red;
	var blue = b ? toHex(Math.floor(b)) : red;
	return Number("0x" + red + green + blue);
}


function toHex(x: number): string {
	var hex = x.toString(16);
	if (hex.length < 2)
		hex = "0" + hex;

	return hex;
}

let colors = {
	rgb,
	rgb255
};

export default colors;