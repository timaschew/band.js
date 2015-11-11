var player = null;

function init() {
	var notifications = [];
	var c = 0;
	for (var i=0; i<100; i++) {
		notifications.push(i+1);
	}
	var conductor = new BandJS(null, 'northAmerican');
	conductor.setTimeSignature(2,2);
	conductor.setTempo(180);
  conductor.setNoteBufferLength(20);
   var rightHand = conductor.createInstrument('square', 'oscillators'),
        leftHand = conductor.createInstrument('triangle', 'oscillators'),
        drum = conductor.createInstrument('white', 'noises');


    /**
     * Intro
     */
    //     Bar 1

    rightHand.note('quarter', 'E5', null, notifications[c++])
        .note('quarter', 'E5', null, notifications[c++])
        .rest('quarter')
        .note('quarter', 'E5', null, notifications[c++])


    // // Bar2
    rightHand.rest('quarter')
        .note('quarter', 'C5', null, notifications[c++])
        .note('quarter', 'E5', null, notifications[c++])
        .rest('quarter')


    // // Bar 3
    rightHand.rest('whole', notifications[c++])


    // // Bar 4
    rightHand.note('quarter', 'G4', null, notifications[c++])
        .rest('quarter')
        .rest('half')


    // // Bar 5/13
    rightHand.repeatStart()
        .note('quarter', 'C5, E4', null, notifications[c++])
        .rest('quarter')
        .rest('quarter')
        .note('quarter', 'G4, C4', null, notifications[c++])


    // // bar 6/14
    rightHand.rest('half')
        .note('quarter', 'E4, G3', null, notifications[c++])
        .rest('quarter');


    // // Bar 7/15
    rightHand.rest('quarter')
        .note('quarter', 'A4, C4', null, notifications[c++])
        .rest('quarter')
        .note('quarter', 'B4, D4', null, notifications[c++])


    // // Bar 8/16
    rightHand.rest('quarter')
        .note('quarter', 'Bb4, Db4', null, notifications[c++])
        .note('quarter', 'A4, C4', null, notifications[c++])
        .rest('quarter');


    // // Bar 9/17
    rightHand.note('tripletHalf', 'G4, C4', null, notifications[c++])
        .note('tripletHalf', 'E5, G4', null, notifications[c++])
        .note('tripletHalf', 'G5, B4', null, notifications[c++])



    // // Bar 10/18
    rightHand.note('quarter', 'A5, C5', null, notifications[c++])
        .rest('quarter')
        .note('quarter', 'F5, A4', null, notifications[c++])
        .note('quarter', 'G5, B4', null, notifications[c++])


    // // Bar 11/19
    rightHand.rest('quarter')
        .note('quarter', 'E5, G4', null, notifications[c++])
        .rest('quarter')


    // // Bar 12/20
    rightHand.note('quarter', 'D5, F4', null, notifications[c++])
        .note('quarter', 'B4, D4', null, notifications[c++])
        .rest('half');

    // Repeat back to Bar 5
    rightHand.repeat(1);



    // Bar 21
    rightHand.rest('half')
        .note('quarter', 'G5, E5', null, notifications[c++])
        .note('quarter', 'Gb5, Eb5', null, notifications[c++])

    // // Bar 22
    rightHand.note('quarter', 'F5, D5', null, notifications[c++])
        .note('quarter', 'D#5, B4', null, notifications[c++])
        .rest('quarter')
        .note('quarter', 'E5, C5', null, notifications[c++])



    // Bar 23
    rightHand.rest('quarter')
        .note('quarter', 'G#4, E4', null, notifications[c++])
        .note('quarter', 'A4, F4', null, notifications[c++])
        .note('quarter', 'C5, A4', null, notifications[c++])



    // Bar 24
    rightHand.rest('quarter')
        .note('quarter', 'A4, C4', null, notifications[c++])
        .note('quarter', 'C5, E4', null, notifications[c++])
        .note('quarter', 'D5, F4', null, notifications[c++])


    // Bar 25
    rightHand.rest('half')
        .note('quarter', 'G5, E5', null, notifications[c++])
        .note('quarter', 'Gb5, Eb5', null, notifications[c++])


    // Bar 26
    rightHand.note('quarter', 'F5, D5', null, notifications[c++])
        .note('quarter', 'D#5, B4', null, notifications[c++])
        .rest('quarter')
        .note('quarter', 'E5, C5', null, notifications[c++])


    // Bar 27
    rightHand.rest('quarter')
        .note('quarter', 'C6, G6, F6', null, notifications[c++])
        .rest('quarter')
        .note('quarter', 'C6, G6, F6', null, notifications[c++])


    // Bar 28
    rightHand.note('quarter', 'C6, G6, F6', null, notifications[c++])
        .rest('quarter')
        .rest('half');


    // Bar 29
    rightHand.rest('half')
        .note('quarter', 'G5, E5', null, notifications[c++])
        .note('quarter', 'Gb5, Eb5', null, notifications[c++])



    // Bar 30
    rightHand.note('quarter', 'F5, D5', null, notifications[c++])
        .note('quarter', 'D#5, B4', null, notifications[c++])
        .rest('quarter')
        .note('quarter', 'E5, C5', null, notifications[c++])


    // Bar 31
    rightHand.rest('quarter')
        .note('quarter', 'G#4, E4', null, notifications[c++])
        .note('quarter', 'A4, F4', null, notifications[c++])
        .note('quarter', 'C5, A4', null, notifications[c++])


    // Bar 32
    rightHand.rest('quarter')
        .note('quarter', 'A4, C4', null, notifications[c++])
        .note('quarter', 'C5, E4', null, notifications[c++])
        .note('quarter', 'D5, F4', null, notifications[c++])



    // Bar 33
    rightHand.rest('half')
        .note('quarter', 'Eb5, Ab4', null, notifications[c++])
        .rest('quarter');



    // Bar 34
    rightHand.rest('quarter')
        .note('quarter', 'D5, F4', null, notifications[c++])
        .rest('half');


    // Bar 35
    rightHand.note('quarter', 'C5, E4', null, notifications[c++])
        .rest('quarter')
        .rest('half');


    // Bar 36
    rightHand.rest('whole');

   var id = setInterval(function() {
   	var result = player.getCurrentNotification();
   	if (result != null) {
   		document.querySelector("#output .start").textContent = result.startTime.toFixed(2);
   		document.querySelector("#output .duration").textContent = (result.stopTime - result.startTime).toFixed(2);
   		document.querySelector("#output .pitch").textContent = result.pitch;

   	}
   }, 15);
	player = conductor.finish();
   conductor.setOnFinishedCallback(function() {
   	clearInterval(id);
   });

}

function play() {
	player.play()
}
