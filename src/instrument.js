/**
 * Constructor
 * @param name
 * @param pack
 * @param conductor
 */
module.exports = function(name, pack, conductor) {
    // Default to Sine Oscillator
    if (! name) {
        name = 'sine';
    }
    if (! pack) {
        pack = 'oscillators';
    }

    if (typeof conductor.packs.instrument[pack] === 'undefined') {
        throw new Error(pack + ' is not a currently loaded Instrument Pack.');
    }

    /**
     * Helper function to figure out how long a note is
     *
     * @param rhythm
     * @returns {number}
     */
    function getDuration(rhythm) {
        if (typeof conductor.notes[rhythm] === 'undefined') {
            throw new Error(rhythm + ' is not a correct rhythm.');
        }

        return conductor.notes[rhythm] * conductor.tempo / conductor.noteGetsBeat * 10;
    }

    /**
     * Helper function to clone an object
     *
     * @param obj
     * @returns {copy}
     */
    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }

        return copy;
    }

    var currentTime = 0,
        lastRepeatCount = 0,
        volumeLevel = 1,
        definition = {
            bufferPosition: 0,
            instrument: conductor.packs.instrument[pack](name, conductor.audioContext),
            sounds: [],
            /**
             * Set volume level for an instrument
             *
             * @param newVolumeLevel
             */
            setVolume: function(newVolumeLevel) {
                if (newVolumeLevel > 1) {
                    newVolumeLevel = newVolumeLevel / 100;
                }
                volumeLevel = newVolumeLevel;

                return definition;
            },
            /**
             * Add a note to an instrument
             * @param rhythm
             * @param [pitch] - Comma separated string if more than one pitch
             * @param [tie]
             */
            note: function(rhythm, pitch, tie) {
                var duration = getDuration(rhythm),
                    articulationGap = tie ? 0 : duration * 0.05;

                if (pitch) {
                    pitch = pitch.split(',');
                    var index = - 1;
                    while (++ index < pitch.length) {
                        var p = pitch[index];
                        p = p.trim();
                        if (typeof conductor.pitches[p] === 'undefined') {
                            p = parseFloat(p);
                            if (isNaN(p) || p < 0) {
                                throw new Error(p + ' is not a valid pitch.');
                            }
                        }
                    }
                }

                definition.sounds.push({
                    pitch: pitch,
                    duration: duration,
                    articulationGap: articulationGap,
                    tie: tie,
                    startTime: currentTime,
                    // Volume needs to be a quarter of the master so it doesn't clip
                    volumeLevel: volumeLevel / 4,
                    stopTime: currentTime + duration - articulationGap
                });

                currentTime += duration;

                return definition;
            },
            /**
             * Add a rest to an instrument
             *
             * @param rhythm
             */
            rest: function(rhythm) {
                var duration = getDuration(rhythm);

                definition.sounds.push({
                    pitch: false,
                    duration: duration,
                    articulationGap: 0,
                    startTime: currentTime,
                    stopTime: currentTime + duration
                });

                currentTime += duration;

                return definition;
            },
            /**
             * Place where a repeat section should start
             */
            repeatStart: function() {
                lastRepeatCount = definition.sounds.length;

                return definition;
            },
            /**
             * Repeat from beginning
             */
            repeatFromBeginning: function(numOfRepeats) {
                lastRepeatCount = 0;
                definition.repeat(numOfRepeats);

                return definition;
            },
            /**
             * Number of times the section should repeat
             * @param [numOfRepeats] - defaults to 1
             */
            repeat: function(numOfRepeats) {
                numOfRepeats = typeof numOfRepeats === 'undefined' ? 1 : numOfRepeats;
                var soundsBufferCopy = definition.sounds.slice(lastRepeatCount);
                for (var r = 0; r < numOfRepeats; r ++) {
                    var index = - 1;
                    while (++index < soundsBufferCopy.length) {
                        var soundCopy = clone(soundsBufferCopy[index]);

                        soundCopy.startTime = currentTime;
                        soundCopy.stopTime = currentTime + soundCopy.duration - soundCopy.articulationGap;

                        definition.sounds.push(soundCopy);
                        currentTime += soundCopy.duration;
                    }
                }

                return definition;
            }
        };

    return definition;
};
