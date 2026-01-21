  var RBGmodes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

var colorsHex = [ // RGB Colours defined by Ableton for Clip Launch Pad LEDs (Hexadecimal notation)
    [0x00, 0x00, 0x00],
    [0x1E, 0x1E, 0x1E],
    [0x7F, 0x7F, 0x7F],
    [0xFF, 0xFF, 0xFF],
    [0xFF, 0x4C, 0x4C],
    [0xFF, 0x00, 0x00],
    [0x59, 0x00, 0x00],
    [0x19, 0x00, 0x00],
    [0xFF, 0xBD, 0x6C],
    [0xFF, 0x54, 0x00],
    [0x59, 0x1D, 0x00],
    [0x27, 0x1B, 0x00],
    [0xFF, 0xFF, 0x4C],
    [0xFF, 0xFF, 0x00],
    [0x59, 0x59, 0x00],
    [0x19, 0x19, 0x00],
    [0x88, 0xFF, 0x4C],
    [0x54, 0xFF, 0x00],
    [0x1D, 0x59, 0x00],
    [0x14, 0x2B, 0x00],
    [0x4C, 0xFF, 0x4C],
    [0x00, 0xFF, 0x00],
    [0x00, 0x59, 0x00],
    [0x00, 0x19, 0x00],
    [0x4C, 0xFF, 0x5E],
    [0x00, 0xFF, 0x19],
    [0x00, 0x59, 0x0D],
    [0x00, 0x19, 0x02],
    [0x4C, 0xFF, 0x88],
    [0x00, 0xFF, 0x55],
    [0x00, 0x59, 0x1D],
    [0x00, 0x1F, 0x12],
    [0x4C, 0xFF, 0xB7],
    [0x00, 0xFF, 0x99],
    [0x00, 0x59, 0x35],
    [0x00, 0x19, 0x12],
    [0x4C, 0xC3, 0xFF],
    [0x00, 0xA9, 0xFF],
    [0x00, 0x41, 0x52],
    [0x00, 0x10, 0x19],
    [0x4C, 0x88, 0xFF],
    [0x00, 0x55, 0xFF],
    [0x00, 0x1D, 0x59],
    [0x00, 0x08, 0x19],
    [0x4C, 0x4C, 0xFF],
    [0x00, 0x00, 0xFF],
    [0x00, 0x00, 0x59],
    [0x00, 0x00, 0x19],
    [0x87, 0x4C, 0xFF],
    [0x54, 0x00, 0xFF],
    [0x19, 0x00, 0x64],
    [0x0F, 0x00, 0x30],
    [0xFF, 0x4C, 0xFF],
    [0xFF, 0x00, 0xFF],
    [0x59, 0x00, 0x59],
    [0x19, 0x00, 0x19],
    [0xFF, 0x4C, 0x87],
    [0xFF, 0x00, 0x54],
    [0x59, 0x00, 0x1D],
    [0x22, 0x00, 0x13],
    [0xFF, 0x15, 0x00],
    [0x99, 0x35, 0x00],
    [0x79, 0x51, 0x00],
    [0x43, 0x64, 0x00],
    [0x03, 0x39, 0x00],
    [0x00, 0x57, 0x35],
    [0x00, 0x54, 0x7F],
    [0x00, 0x00, 0xFF],
    [0x00, 0x45, 0x4F],
    [0x25, 0x00, 0xCC],
    [0x7F, 0x7F, 0x7F],
    [0x20, 0x20, 0x20],
    [0xF0, 0xF0, 0x00],
    [0xBD, 0xFF, 0x2D],
    [0xAF, 0xED, 0x06],
    [0x64, 0xFF, 0x09],
    [0x10, 0x8B, 0x00],
    [0x00, 0xFF, 0x87],
    [0x00, 0xA9, 0xFF],
    [0x00, 0x2A, 0xFF],
    [0x3F, 0x00, 0xFF],
    [0x7A, 0x00, 0xFF],
    [0xB2, 0x1A, 0x7D],
    [0x40, 0x21, 0x00],
    [0xFF, 0x4A, 0x00],
    [0x88, 0xE1, 0x06],
    [0x72, 0xFF, 0x15],
    [0x00, 0xFF, 0x00],
    [0x3B, 0xFF, 0x26],
    [0x59, 0xFF, 0x71],
    [0x38, 0xFF, 0xCC],
    [0x5B, 0x8A, 0xFF],
    [0x31, 0x51, 0xC6],
    [0x87, 0x7F, 0xE9],
    [0xD3, 0x1D, 0xFF],
    [0xFF, 0x00, 0x5D],
    [0xFF, 0x7F, 0x00],
    [0xB9, 0xB0, 0x00],
    [0x90, 0xFF, 0x00],
    [0x83, 0x5D, 0x07],
    [0x39, 0x2b, 0x00],
    [0x14, 0x4C, 0x10],
    [0x0D, 0x50, 0x38],
    [0x15, 0x15, 0x2A],
    [0x16, 0x20, 0x5A],
    [0x69, 0x3C, 0x1C],
    [0xA8, 0x00, 0x0A],
    [0xDE, 0x51, 0x3D],
    [0xD8, 0x6A, 0x1C],
    [0xFF, 0xE1, 0x26],
    [0x9E, 0xE1, 0x2F],
    [0x67, 0xB5, 0x0F],
    [0x1E, 0x1E, 0x30],
    [0xDC, 0xFF, 0x6B],
    [0x80, 0xFF, 0xBD],
    [0x9A, 0x99, 0xFF],
    [0x8E, 0x66, 0xFF],
    [0x40, 0x40, 0x40],
    [0x75, 0x75, 0x75],
    [0xE0, 0xFF, 0xFF],
    [0xA0, 0x00, 0x00],
    [0x35, 0x00, 0x00],
    [0x1A, 0xD0, 0x00],
    [0x07, 0x42, 0x00],
    [0xB9, 0xB0, 0x00],
    [0x3F, 0x31, 0x00],
    [0xB3, 0x5F, 0x00],
    [0x4B, 0x15, 0x02]
];

var colors = [ // RGB colours defined by Ableton for Clip Launch Pad LEDs (Decimal notation)
    [  0,   0,   0],
    [ 30,  30,  30],
    [127, 127, 127],
    [255, 255, 255],
    [255,  76,  76],
    [255,   0,   0],
    [ 89,   0,   0],
    [ 25,   0,   0],
    [255, 189, 108],
    [255,  84,   0],
    [ 89,  29,   0],
    [ 39,  27,   0],
    [255, 255,  76],
    [255, 255,   0],
    [ 89,  89,   0],
    [ 25,  25,   0],
    [136, 255,  76],
    [ 84, 255,   0],
    [ 29,  89,   0],
    [ 20,  43,   0],
    [ 76, 255,  76],
    [  0, 255,   0],
    [  0,  89,   0],
    [  0,  25,   0],
    [ 76, 255,  94],
    [  0, 255,  25],
    [  0,  89,  13],
    [  0,  25,   2],
    [ 76, 255, 136],
    [  0, 255,  85],
    [  0,  89,  29],
    [  0,  31,  18],
    [ 76, 255, 183],
    [  0, 255, 153],
    [  0,  89,  53],
    [  0,  25,  18],
    [ 76, 195, 255],
    [  0, 169, 255],
    [  0,  65,  82],
    [  0,  16,  25],
    [ 76, 136, 255],
    [  0,  85, 255],
    [  0,  29,  89],
    [  0,   8,  25],
    [ 76,  76, 255],
    [  0,   0, 255],
    [  0,   0,  89],
    [  0,   0,  25],
    [135,  76, 255],
    [ 84,   0, 255],
    [ 25,   0, 100],
    [ 15,   0,  48],
    [255,  76, 255],
    [255,   0, 255],
    [ 89,   0,  89],
    [ 25,   0,  25],
    [255,  76, 135],
    [255,   0,  84],
    [ 89,   0,  29],
    [ 34,   0,  19],
    [255,  21,   0],
    [153,  53,   0],
    [121,  81,   0],
    [ 67, 100,   0],
    [  3,  57,   0],
    [  0,  87,  53],
    [  0,  84, 127],
    [  0,   0, 255],
    [  0,  69,  79],
    [ 37,   0, 204],
    [127, 127, 127],
    [ 32,  32,  32],
    [255,   0,   0],
    [189, 255,  45],
    [175, 237,   6],
    [100, 255,   9],
    [ 16, 139,   0],
    [  0, 255, 135],
    [  0, 169, 255],
    [  0,  42, 255],
    [ 63,   0, 255],
    [122,   0, 255],
    [178,  26, 125],
    [ 64,  33,   0],
    [255,  74,   0],
    [136, 225,   6],
    [114, 255,  21],
    [  0, 255,   0],
    [ 59, 255,  38],
    [ 89, 255, 113],
    [ 56, 255, 204],
    [ 91, 138, 255],
    [ 49,  81, 198],
    [135, 127, 233],
    [211,  29, 255],
    [255,   0,  93],
    [255, 127,   0],
    [185, 176,   0],
    [144, 255,   0],
    [131,  93,   7],
    [ 57,  43,   0],
    [ 20,  76,  16],
    [ 13,  80,  56],
    [ 21,  21,  42],
    [ 22,  32,  90],
    [105,  60,  28],
    [168,   0,  10],
    [222,  81,  61],
    [216, 106,  28],
    [255, 225,  38],
    [158, 225,  47],
    [103, 181,  15],
    [ 30,  30,  48],
    [220, 255, 107],
    [128, 255, 189],
    [154, 153, 255],
    [142, 102, 255],
    [ 64,  64,  64],
    [117, 117, 117],
    [224, 255, 255],
    [160,   0,   0],
    [ 53,   0,   0],
    [ 26, 208,   0],
    [  7,  66,   0],
    [185, 176,   0],
    [ 63,  49,   0],
    [179,  95,   0],
    [ 75,  21,   2]
];

// noted in [channel,note]
// AG > This variable is all the regular notes
var noteNotes = {
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

                                                                // AG > THis is all the names of the buttons that light up
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