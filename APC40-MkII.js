// GLOBAL VARIABLES //////////////////////////

var RBGmodes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; // All the different ways the RGB pads can behave, this is the third byte of a MIDI Note On message

// All note addresses are in the format [channel, note]

var noteNote = {                // This variable is all the regular notes
    clipLaunch:[                // Clip Launch Pads ordered as arranged on the APC40 [0] - [39]
        [1,32], [1,33], [1,34], [1,35], [1,36], [1,37], [1,38], [1,39], //  [0] -  [7]
        [1,24], [1,25], [1,26], [1,27], [1,28], [1,29], [1,30], [1,31], //  [8] - [15]
        [1,16], [1,17], [1,18], [1,19], [1,20], [1,21], [1,22], [1,23], // [16] - [23]
        [1, 8], [1, 9], [1,10], [1,11], [1,12], [1,13], [1,14], [1,15], // [24] - [31]
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]  // [32] - [39]
    ],
    sceneLaunch:[               // Scene Launch Pads ordered as arranged on the APC40 top to bottom
        [1,82], 
        [1,83],
        [1,84],
        [1,85],
        [1,86]
    ],
    clipStop:[                  // Clip Stop 1-8 + Stop All Clips
        [1,52], [2,52], [3,52], [4,52], [5,52], [6,52], [7,52], [8,52],    [1,81] 
    ],
    trackSelector:[             // Track Selectors 1-8 + Master
        [1,51], [2,51], [3,51], [4,51], [5,51], [6,51], [7,51], [8,51],    [1,80] 
    ],
    trackControl:[
        [1,50], [2,50], [3,50], [4,50], [5,50], [6,50], [7,50], [8,50], //  [0] -  [7] // Track 1-8 Mute [1-8]
              
        [1,66], [2,66], [3,66], [4,66], [5,66], [6,66], [7,66], [8,66], //  [8] - [15] // Track 1-8 Crossfade Assign [A/B]
    
        [1,49], [2,49], [3,49], [4,49], [5,49], [6,49], [7,49], [8,49], // [16] - [23] // Track 1-8 Solo [S]
        
        [1,48], [2,48], [3,48], [4,48], [5,48], [6,48], [7,48], [8,48], // [24] - [31] // Track 1-8 Record-Arm [.]
    ],
    button:[                    // Button controls 
            [1, 87], //  [0] Buttons Top - pan
            [1, 88], //  [1] Buttons Top - sends
            [1, 89], //  [2] Buttons Top - user

            [1, 91], //  [3] Buttons Top - play
            [1, 93], //  [4] Buttons Top - record
            [1,102], //  [5] Buttons Top - session

            [1, 90], //  [6] Buttons Top - metronome
            [1, 99], //  [7] Buttons Top - tapTempo
            [1,100], //  [8] Buttons Top - nudgeMinus
            [1,101], //  [9] Buttons Top - nudgePlus

            [1, 58], // [10] Buttons Bottom - 1DevicePrev
            [1, 59], // [11] Buttons Bottom - 2DeviceNext
            [1, 60], // [12] Buttons Bottom - 3BankPrev
            [1, 61], // [13] Buttons Bottom - 4BankNext

            [1, 62], // [14] Buttons Bottom - 5DevOnOff
            [1, 63], // [15] Buttons Bottom - 6DevLock
            [1, 64], // [16] Buttons Bottom - 7ClipDevView
            [1, 65], // [17] Buttons Bottom - 8DetailView

            [1, 98], // [18] Buttons Bottom - shift 
            [1,103], // [19] Buttons Bottom - bank
        ],
    bankSelect:[                // Nb. Bank Select ordered CLOCKWISE FROM TOP
        [1,94], // Bank Select - up	
        [1,96], // Bank Select - right
        [1,95], // Bank Select - down
        [1,97]  // Bank Select - left
    ]
};

var noteCC = {                  // Control Change Notes
    knob:[                      // All Knobs
        [1,48], [1,49], [1,50], [1,51], [1,52], [1,53], [1,54], [1,55], // Track Knobs (Top) [0]-[7]
                                // Device Knobs (Right)
        [1,16], [1,17], [1,18], [1,19], [1,20], [1,21], [1,22], [1,23], // Track 1 / All Modes              [8] - [15]
        [2,16], [2,17], [2,18], [2,19], [2,20], [2,21], [2,22], [2,23], // Track 2 - Generic Mode (0) ONLY [16] - [23]
        [3,16], [3,17], [3,18], [3,19], [3,20], [3,21], [3,22], [3,23], // Track 3 - Generic Mode (0) ONLY [24] - [31]
        [4,16], [4,17], [4,18], [4,19], [4,20], [4,21], [4,22], [4,23], // Track 4 - Generic Mode (0) ONLY [32] - [39]
        [5,16], [5,17], [5,18], [5,19], [5,20], [5,21], [5,22], [5,23], // Track 5 - Generic Mode (0) ONLY [40] - [47]
        [6,16], [6,17], [6,18], [6,19], [6,20], [6,21], [6,22], [6,23], // Track 6 - Generic Mode (0) ONLY [48] - [55]
        [7,16], [7,17], [7,18], [7,19], [7,20], [7,21], [7,22], [7,23], // Track 7 - Generic Mode (0) ONLY [56] - [63]
        [8,16], [8,17], [8,18], [8,19], [8,20], [8,21], [8,22], [8,23], // Track 8 - Generic Mode (0) ONLY [64] - [71]
        [9,16], [9,17], [9,18], [9,19], [9,20], [9,21], [9,22], [9,23]  // Master  - Generic Mode (0) ONLY [72] - [79]
    ],
    encoder:[                   // Rotary Encoders
        [1,47], // Rotary Encoder - cue
        [1,13]  // Rotary Encoder - tempo
    ],
    fader:[                     // Faders Track 1-8 + Master + Crossfader
        [1,7], [2,7], [3,7], [4,7], [5,7], [6,7], [7,7], [8,7],     [1,14],     [1,15]
    ]
};
			
/* ORIGINAL NOTE VARIABLE

    pads: {
        main: // AG > These are all the RGB Pads including the Scene Launch Pads in the final column
        [ 
			[[1,32], [1,33], [1,34], [1,35], [1,36], [1,37], [1,38], [1,39],    [1,82]], // Layer 5
			[[1,24], [1,25], [1,26], [1,27], [1,28], [1,29], [1,30], [1,31],    [1,83]], // Layer 4 
			[[1,16], [1,17], [1,18], [1,19], [1,20], [1,21], [1,22], [1,23],    [1,84]], // Layer 3
			[[1, 8], [1, 9], [1,10], [1,11], [1,12], [1,13], [1,14], [1,15],    [1,85]], // Layer 2
			[[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],    [1,86]], // Layer 1

			[[1,52], [2,52], [3,52], [4,52], [5,52], [6,52], [7,52], [8,52],    [1,81]], // Clip Stop and Stop All Clips

			[[1,51], [2,51], [3,51], [4,51], [5,51], [6,51], [7,51], [8,51],    [1,80]]  // Track Selectors inc Master
		],
		faders: // AG > These are all the Track controls by Channel in this order [Mute] [Solo] [A/B] [Record-Arm]
        [ 
			[[1,50], [1,66], [1,49], [1,48]], // Channel 1 [Mute] [Solo] [A/B] [Record-Arm]
			[[2,50], [2,66], [2,49], [2,48]], // Channel 2 [Mute] [Solo] [A/B] [Record-Arm]
			[[3,50], [3,66], [3,49], [3,48]], // Channel 3 [Mute] [Solo] [A/B] [Record-Arm]
			[[4,50], [4,66], [4,49], [4,48]], // Channel 4 [Mute] [Solo] [A/B] [Record-Arm]
			[[5,50], [5,66], [5,49], [5,48]], // Channel 5 [Mute] [Solo] [A/B] [Record-Arm]
			[[6,50], [6,66], [6,49], [6,48]], // Channel 6 [Mute] [Solo] [A/B] [Record-Arm]
			[[7,50], [7,66], [7,49], [7,48]], // Channel 7 [Mute] [Solo] [A/B] [Record-Arm]
			[[8,50], [8,66], [8,49], [8,48]]  // Channel 8 [Mute] [Solo] [A/B] [Record-Arm]
		]
	},
	buttons: {
		top:                                  // AG > Buttons Top Block
        { 
			"pan":          [1, 87],
			"sends":        [1, 88],
			"user":         [1, 89],

			"play":         [1, 91],
			"record":       [1, 93],
			"session":      [1,102],

			"metronome":    [1, 90],
			"tapTempo":     [1, 99],
			"nudgeMinus":   [1,100],
			"nudgePlus":    [1,101],
		},

		encoders: // AG > Buttons Bottom Block (need renaming)
        { 
			"1DevicePrev":  [1, 58],
			"2DeviceNext":  [1, 59],
			"3BankPrev":    [1, 60],
			"4BankNext":    [1, 61],
			"5DevOnOff":    [1, 62],
			"6DevLock":     [1, 63],
			"7ClipDevView": [1, 64],
			"8DetailView":  [1, 65],

			"shift":        [1, 98],
			"bank":         [1,103]
		},

		bankSelect: // AG >  Bank Select Different Order than I have in JSON - TAKE CARE
        { 
			up:     [1,94], // WHY NO "" ?
			down:   [1,95],
			left:   [1,97],
			right:  [1,96]
		}
	},
};

*/

/* ORIGINAL CC VARIABLE
var ccNotes = {
	encoders:                                                   // AG > This is the Knobs - NAME CHANGE NEEDED
    { 
		top: [[1,48], [1,49], [1,50], [1,51], [1,52], [1,53], [1,54], [1,55]],


		side:
        [
            [[1,16], [1,17], [1,18], [1,19], [1,20], [1,21], [1,22], [1,23]], // All Modes
            [[2,16], [2,17], [2,18], [2,19], [2,20], [2,21], [2,22], [2,23]], // Generic Mode (0) ONLY
            [[3,16], [3,17], [3,18], [3,19], [3,20], [3,21], [3,22], [3,23]], // Generic Mode (0) ONLY
            [[4,16], [4,17], [4,18], [4,19], [4,20], [4,21], [4,22], [4,23]], // Generic Mode (0) ONLY
            [[5,16], [5,17], [5,18], [5,19], [5,20], [5,21], [5,22], [5,23]], // Generic Mode (0) ONLY
            [[6,16], [6,17], [6,18], [6,19], [6,20], [6,21], [6,22], [6,23]], // Generic Mode (0) ONLY
            [[7,16], [7,17], [7,18], [7,19], [7,20], [7,21], [7,22], [7,23]], // Generic Mode (0) ONLY
            [[8,16], [8,17], [8,18], [8,19], [8,20], [8,21], [8,22], [8,23]], // Generic Mode (0) ONLY
            [[9,16], [9,17], [9,18], [9,19], [9,20], [9,21], [9,22], [9,23]], // Generic Mode (0) ONLY
        ],

		cue: [1,47],                                            // AG > The actual Rotary Encoders
		tempo: [1,13]
	},                                                          // AG > Th faders inc Master and Cross
	faders:                                                     // CHECK BRACKETS HERE
    [
        [1,7], [2,7], [3,7], [4,7], [5,7], [6,7], [7,7], [8,7], [1,14], [1,15]
    ]
};

*/

// AG > This is all the names of the buttons that light up
// var buttonLedKeys = ["pan","sends","user","play","record","session","metronome", "1DevicePrev", "2DeviceNext", "3BankPrev", "4BankNext", "5DevOnOff", "6DevLock", "7ClipDevView", "8DetailView", "bank"];

var noteValueObj = [[],[],[],[],[],[],[],[],[]]; // AG > EMPTY ARRAY DECLARATION FOR MIDI MESSAGES ???

var ccValueObj = [[],[],[],[],[],[],[],[],[]]; // AG > EMPTY ARRAY DECLARATION FOR MIDI MESSAGES ???

var colorParameterObj = [[],[],[],[],[]]; // AG > EMPTY ARRAY DECLARATION FOR MIDI MESSAGES ???

var modeParameterObj = [[],[],[],[],[]]; // AG > EMPTY ARRAY DECLARATION FOR MIDI MESSAGES ???

var faderPadParameterObj = [[],[],[],[],[],[],[],[]]; // AG > EMPTY ARRAY DECLARATION FOR MIDI MESSAGES ???

var buttonParameterObj = {}; // AG > WHAT'S THIS FOR???

// GLOBAL VARIABLES END //////////////////////

// MAIN //////////////////////////////////////

function init()
{
	
;}

function moduleParameterChanged(param)
{
	if(param.isParameter())
	{
		script.log("Module parameter changed : "+param.name+" > "+param.get());
	}else 
	{
		script.log("Module parameter triggered : "+param.name);	
	};
};

/*
 This function will be called each time a value of this module has changed, meaning a parameter or trigger inside the "Values" panel of this module
 This function only exists because the script is in a module
*/

function moduleValueChanged(value)
{
	if(value.isParameter())
	{
		script.log("Module value changed : "+value.name+" > "+value.get());	
	}else 
	{
		script.log("Module value triggered : "+value.name);	
	};
};

function noteOnEvent(channel, pitch, velocity)
{
	script.log("Note on received "+channel+", "+pitch+", "+velocity);
};

function noteOffEvent(channel, pitch, velocity)
{
	script.log("Note off received "+channel+", "+pitch+", "+velocity);
};

function ccEvent(channel, number, value)
{
	script.log("ControlChange received "+channel+", "+number+", "+value);
};

function ccEvent(channel, number, value)
{
	script.log("ControlChange received "+channel+", "+number+", "+value);
};

function sysExEvent(data)
{
	script.log("Sysex Message received, "+data.length+" bytes :");
	for(var i=0; i < data.length; i++)
	{
		script.log(" > "+data[i]);
	};
};


// MAIN END //////////////////////////////////

// UTILITIES START ///////////////////////////

function setAPC40mode(mode) { 
    local.sendSysex(71, 127, 41, 96, 0, 4, mode[0], 8, 2, 1);
    script.log("APC40 MkII set to " + mode[1] + " Mode with Sysex Message ");
    script.log(mode);
};

function setLEDringMode(group, mode) {
    for (var i = group[0]; i < group[1]+1; i++) {
        local.sendCC(noteCC.knob[i][0], 8+noteCC.knob[i][1], mode);
    };
};

function clearPads(wipe) {
    for (i = wipe[1]; i < wipe[2]+1; i++){
        local.sendNoteOff(noteNote[wipe[0]][i][0], noteNote[wipe[0]][i][1]);
    };
};

// UTILITIES // END /////////////////////////////

// TESTING //////////////////////////////////////

function testRGB(){
    var x = local.parameters.lights.rgbPadMode_Colour.clipLaunchPadColour.layer1_Clip1.get();
    local.sendNoteOn(1, 0, x);
    script.log(x);
};
