/* A WebApp that utilizes HTML5, CSS, and Javascript (specifically Web Audio API) to provide major, minor, melodic minor, and harmonic minor scales in all keys.  Planned features include bpm, looping,  ascending/descending.. ideally for play along practice

coded by Steve Podgorski as a project for LaunchCode
github: medianocturne

*/
// initiates the audio element
var context = new (window.AudioContext || window.webkitAudioContext)();


// grabs dropdown menu selections from html

function player() {
    var scaleSelector = document.getElementById("scale").value;
    var keySelector = document.getElementById("key").value;
    var direction = document.getElementById("direction").value;
    var tempo = document.getElementById("bpm").value;


    if (scaleSelector === "major") {
        var scale = keySelector;
        var unit = majorArray
        scalePlayer(unit, scale, direction, tempo)
    } else if (scaleSelector === 'minor') {
        var scale = keySelector;
        var unit = minorArray
        scalePlayer(unit, scale, direction, tempo);
    } else if (scaleSelector === 'melodic') {
        var scale = keySelector;
        var unit = melodicArray
        scalePlayer(unit, scale, direction, tempo);
    } else if (scaleSelector === 'harmonic') {
        var scale = keySelector;
        var unit = harmonicArray
        scalePlayer(unit, scale, direction, tempo);
    }

}


// index of all tones by hertz in frequency, key/value pairs for injection into player

toneIndex = {
    "C":130.81,
    "C#":138.591,
    "D":146.832,
    "Dsharp":155.563,
    "E":164.814,
    "F":174.614,
    "Fsharp":184.997,
    "G":195.998,
    "Gsharp":207.652,
    "A":220,
    "Asharp":233.082,
    "B":246.942,
    "C8":261.626,
    "Csharp8":277.183,
    "D8":293.665,
    "Dsharp8":311.127,
    "E8":329.628,
    "F8":349.228,
    "Fsharp8":369.994,
    "G8":391.995,
    "Gsharp8":415.305,
    "A8":440,
    "Asharp8":466.164,
    "B8":493.883
}

//Major Arrays

var majorArray = [toneIndex.C,toneIndex.D,toneIndex.E,toneIndex.F,toneIndex.G,
    toneIndex.A,toneIndex.B,toneIndex.C8]

// these exist as variable overwrites, potentially to package into scale types as passable objects

    var first = majorArray[0]
    var second = majorArray[1]
    var third = majorArray[2]
    var fourth = majorArray[3]
    var fifth = majorArray[4]
    var sixth = majorArray[5]
    var seventh = majorArray[6]
    var octave = majorArray[7]

//Minor arrays

var minorArray = [toneIndex.C,toneIndex.D,toneIndex.Dsharp,toneIndex.F,toneIndex.G,
    toneIndex.Gsharp,toneIndex.Asharp,toneIndex.C8]

    var first = minorArray[0]
    var second = minorArray[1]
    var third = minorArray[2]
    var fourth = minorArray[3]
    var fifth = minorArray[4]
    var sixth = minorArray[5]
    var seventh = minorArray[6]
    var octave = minorArray[7]

//Melodic Minor arrays

var melodicArray = [toneIndex.C,toneIndex.D,toneIndex.Dsharp,toneIndex.F,toneIndex.G,
    toneIndex.A,toneIndex.B,toneIndex.C8]

    var first = melodicArray[0]
    var second = melodicArray[1]
    var third = melodicArray[2]
    var fourth = melodicArray[3]
    var fifth = melodicArray[4]
    var sixth = melodicArray[5]
    var seventh = melodicArray[6]
    var octave = melodicArray[7]

//Harmonic Minor arrays

var harmonicArray = [toneIndex.C,toneIndex.D,toneIndex.Dsharp,toneIndex.F,toneIndex.G,
    toneIndex.Gsharp,toneIndex.B,toneIndex.C8]

    var first = harmonicArray[0]
    var second = harmonicArray[1]
    var third = harmonicArray[2]
    var fourth = harmonicArray[3]
    var fifth = harmonicArray[4]
    var sixth = harmonicArray[5]
    var seventh = harmonicArray[6]
    var octave = harmonicArray[7]



//////// PLAYER FUNCTION BELOW //////////
// player takes in toneIndex 'unit' of frequencies for scale types,
// and 'scale' takes key info and modifys initial frequencies

function scalePlayer(unit, scale, direction, tempo) {


// overwrite players interval variables with toneIndex values for scale type

// if statement for reversing intervalic direction

    if (direction === "up"){

        first = unit[0];
        second = unit[1];
        third = unit[2];
        fourth = unit[3];
        fifth = unit[4];
        sixth = unit[5];
        seventh = unit[6];
        octave = unit[7];
    } else if (direction === "down"){
        first = unit[7];
        second = unit[6];
        third = unit[5];
        fourth = unit[4];
        fifth = unit[3];
        sixth = unit[2];
        seventh = unit[1];
        octave = unit[0];
    }

    // keySelector value brought in as 'scale' -- modifies oscillator.detune via 'detune'

    if (scale === "B") {
            var detune = 100;
        } else if (scale === "A#/Bb"){
            var detune = 200;
        } else if (scale === "A"){
            var detune = 300;
        } else if (scale === "G#/Ab"){
            var detune = 400;
        } else if (scale === "G"){
            var detune = 500;
        } else if (scale === "F#/Gb"){
            var detune = 600;
        } else if (scale === "F"){
            var detune = 700;
        } else if (scale === "E"){
            var detune = 800;
        } else if (scale === "D#/Eb"){
            var detune = 900;
        } else if (scale === "D"){
            var detune = 1000;
        } else if (scale === "C#/Db"){
            var detune = 1100;
        } else {
            var detune = 0;
    }

// if statement makes sure ALL needed variables are in-function before allowing the synth to instantiate and trigger

    if ((unit !== undefined) && (scale !== undefined) && (direction !== undefined)){

// initializes WebAudio API
    console.log(tempo);

        var oscillator = context.createOscillator();
        var gain = context.createGain();
        gain.value = .5

        oscillator.type = 'sine';

        oscillator.detune.value = detune;

        var quarterNoteTime = 60/tempo;

        var startTime = 1

        oscillator.frequency.setValueAtTime(first, startTime)
        oscillator.frequency.setValueAtTime(second, startTime + quarterNoteTime)
        oscillator.frequency.setValueAtTime(third, startTime + 2*quarterNoteTime)
        oscillator.frequency.setValueAtTime(fourth, startTime+ 3*quarterNoteTime)
        oscillator.frequency.setValueAtTime(fifth, startTime+ 4*quarterNoteTime)
        oscillator.frequency.setValueAtTime(sixth, startTime+ 5*quarterNoteTime)
        oscillator.frequency.setValueAtTime(seventh, startTime+ 6*quarterNoteTime)
        oscillator.frequency.setValueAtTime(octave, startTime+ 7*quarterNoteTime)

//

        oscillator.connect(gain)
        gain.connect(context.destination)

        oscillator.start(startTime)
        gain.gain.linearRampToValueAtTime(0, startTime+ 8*quarterNoteTime + 1)
        oscillator.stop(startTime + 8*quarterNoteTime + 2)

    }
}
