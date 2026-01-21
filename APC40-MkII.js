var RBGmodes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

// All note addresses are in the format [channel, note]

// AG > This variable is all the regular notes
var noteNote = {
    clipLaunch:[
        [1,32], [1,33], [1,34], [1,35], [1,36], [1,37], [1,38], [1,39], // Clip Launch Pads arranged on the APC40
        [1,24], [1,25], [1,26], [1,27], [1,28], [1,29], [1,30], [1,31],
        [1,16], [1,17], [1,18], [1,19], [1,20], [1,21], [1,22], [1,23], 
        [1, 8], [1, 9], [1,10], [1,11], [1,12], [1,13], [1,14], [1,15],  
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]
    ],
    sceneLaunch:[
        [1,82], // Scene Launch Pads arranged top to bottom
        [1,83],
        [1,84],
        [1,85],
        [1,86]
    ],
    clipStop:[
        [1,52], [2,52], [3,52], [4,52], [5,52], [6,52], [7,52], [8,52],    [1,81] // Clip Stop 1-8 + Stop All Clips
    ],
    trackSelector:[
        [1,51], [2,51], [3,51], [4,51], [5,51], [6,51], [7,51], [8,51],    [1,80]  // Track Selectors 1-8 + Master
    ],
    trackControl:{
        mute:[
            [1,50], [2,50], [3,50], [4,50], [5,50], [6,50], [7,50], [8,50] // Track 1-8 Mute [1-8]
        ],
        solo:[
            [1,66], [2,66], [3,66], [4,66], [5,66], [6,66], [7,66], [8,66] // Track 1-8 Solo [S]
        ],
        crossfadeAssign:[
            [1,49], [2,49], [3,49], [4,49], [5,49], [6,49], [7,49], [8,49] // Track 1-8 Crossfade Assign [A/B]
        ],
        recordArm:[
            [1,48], [2,48], [3,48], [4,48], [5,48], [6,48], [7,48], [8,48] // Track 1-8 Record-Arm [.]
        ]
    },
    button:{
        top:[
            [1, 87], // Buttons Top - pan
            [1, 88], // Buttons Top - sends
            [1, 89], // Buttons Top - user

            [1, 91], // Buttons Top - play
            [1, 93], // Buttons Top - record
            [1,102], // Buttons Top - session

            [1, 90], // Buttons Top - metronome
            [1, 99], // Buttons Top - tapTempo
            [1,100], // Buttons Top - nudgeMinus
            [1,101]  // Buttons Top - nudgePlus
        ],
        bottom:[
            [1, 58], // Buttons Bottom - 1DevicePrev
            [1, 59], // Buttons Bottom - 2DeviceNext
            [1, 60], // Buttons Bottom - 3BankPrev
            [1, 61], // Buttons Bottom - 4BankNext
            [1, 62], // Buttons Bottom - 5DevOnOff
            [1, 63], // Buttons Bottom - 6DevLock
            [1, 64], // Buttons Bottom - 7ClipDevView
            [1, 65], // Buttons Bottom - 8DetailView

            [1, 98], // Buttons Bottom - shift 
            [1,103]  // Buttons Bottom - bank
        ]
    },
    // Nb. Bank Select ordered CLOCKWISE FROM TOP
    bankSelect:[
        [1,94], // Bank Select - up	
        [1,96], // Bank Select - right
        [1,95], // Bank Select - down
        [1,97]  // Bank Select - left
    ]
};

var noteCC = {
    knobTop:[
        [1,48], [1,49], [1,50], [1,51], [1,52], [1,53], [1,54], [1,55] // Assignable Knobs (Top)
    ],
    knobRight:[
        [1,16], [1,17], [1,18], [1,19], [1,20], [1,21], [1,22], [1,23], // Device Knobs (Right) - All Modes
        [2,16], [2,17], [2,18], [2,19], [2,20], [2,21], [2,22], [2,23], // Device Knobs (Right) - Generic Mode (0) ONLY
        [3,16], [3,17], [3,18], [3,19], [3,20], [3,21], [3,22], [3,23], // Device Knobs (Right) - Generic Mode (0) ONLY
        [4,16], [4,17], [4,18], [4,19], [4,20], [4,21], [4,22], [4,23], // Device Knobs (Right) - Generic Mode (0) ONLY
        [5,16], [5,17], [5,18], [5,19], [5,20], [5,21], [5,22], [5,23], // Device Knobs (Right) - Generic Mode (0) ONLY
        [6,16], [6,17], [6,18], [6,19], [6,20], [6,21], [6,22], [6,23], // Device Knobs (Right) - Generic Mode (0) ONLY
        [7,16], [7,17], [7,18], [7,19], [7,20], [7,21], [7,22], [7,23], // Device Knobs (Right) - Generic Mode (0) ONLY
        [8,16], [8,17], [8,18], [8,19], [8,20], [8,21], [8,22], [8,23], // Device Knobs (Right) - Generic Mode (0) ONLY
        [9,16], [9,17], [9,18], [9,19], [9,20], [9,21], [9,22], [9,23]  // Device Knobs (Right) - Generic Mode (0) ONLY
    ],
    encoder:[
        [1,47], // Rotary Encoder - cue
        [1,13]  // Rotary Encoder - tempo
    ],
    fader:[
        [1,7], [2,7], [3,7], [4,7], [5,7], [6,7], [7,7], [8,7], [1,14], [1,15] // Faders Track 1-8 + Master + Crossfader
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
var buttonLedKeys = ["pan","sends","user","play","record","session","metronome", "1DevicePrev", "2DeviceNext", "3BankPrev", "4BankNext", "5DevOnOff", "6DevLock", "7ClipDevView", "8DetailView", "bank"];

var noteValueObj = [[],[],[],[],[],[],[],[],[]]; // AG > EMPTY ARRAY DECLARATION FOR MIDI MESSAGES ???

var ccValueObj = [[],[],[],[],[],[],[],[],[]]; // AG > EMPTY ARRAY DECLARATION FOR MIDI MESSAGES ???

var colorParameterObj = [[],[],[],[],[]]; // AG > EMPTY ARRAY DECLARATION FOR MIDI MESSAGES ???

var modeParameterObj = [[],[],[],[],[]]; // AG > EMPTY ARRAY DECLARATION FOR MIDI MESSAGES ???

var faderPadParameterObj = [[],[],[],[],[],[],[],[]]; // AG > EMPTY ARRAY DECLARATION FOR MIDI MESSAGES ???

var buttonParameterObj = {}; // AG > WHAT'S THIS FOR???

function setAPC40mode(Mode) { // Reset Controller
    var message;
    if      (Mode == 64){message = "Generic";               }
    else if (Mode == 65){message = "Ableton Live";          } 
    else if (Mode == 66){message = "Alternate Ableton Live";};
    local.sendSysex(71, 127, 41, 96, 0, 4, Mode, 8, 2, 1);
    script.log("APC40 MkII set to " + message + " Mode with Sysex Message ");
};


/*
function setLEDringMode(Group, Mode) {

    if(Group == 0){

    } else if(group == 1){

    } else if(group == 2){

    }
    parameters.lights.ledRingModes.assignableKnobs_Top_.1

}

var x = local.parameters.lights.rgbPadMode_Colour.clipLaunchPadColour.layer1_Clip1;

function moduleParameterChanged(x)
{
	if(param.isParameter())
	{
		script.log("Module parameter changed : "+param.name+" > "+param.get());
	}else 
	{
		script.log("Module parameter triggered : "+param.name);	
	}
}


function testRGB(x){
    local.sendNoteOn(1, 1, x);
    script.log(x);
};

testRGB();

*/
var x = noteNote.clipLaunch[3];

function testArray(x){
    script.log(x);
};