var player = null;

function init() {
	var conductor = new BandJS();
	conductor.setTimeSignature(4,4);
	conductor.setTempo(120);

	var piano = conductor.createInstrument(null, null, function(){console.log('X')});
	piano.note('4', 'E4');
	piano.note('32', 'C4');
	piano.note('32', 'D4');
	piano.note('4', 'E4');
	piano.note('4', 'F4');
	piano.note('16.', 'G4');
	piano.note('16.', 'A4');
	piano.note('16.', 'B4');
	piano.note('4', 'C5');
	piano.note('4', 'B4');
	piano.note('4', 'A4');
	piano.note('4', 'G4');
	piano.note('4', 'F4');
	piano.note('4', 'E4');
	piano.note('4', 'D4');
	piano.note('2', 'C4,E4,G4');
	piano.note('8', 'C5');
	player = conductor.finish();
}

function play() {
	player.play()
}
