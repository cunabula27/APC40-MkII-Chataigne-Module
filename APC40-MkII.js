// GLOBAL VARIABLES //////////////////////////

/* 
   Original variable list is at Additional Files\Original_Variable_Matrix.js
   I chopped out all the repeated information as it's not relevant and made 
   finding the array index harder. 
   Annotation is [Channel, Note]. [1-8, Note] means there are 8 of them.
*/

var noteNote = {                            // This variable is all the regular notes
    clipLaunch:[                            // [1, Note] Array order is as on control surface. Indices:
        32, 33, 34, 35, 36, 37, 38, 39,     //  [0] -  [7]
        24, 25, 26, 27, 28, 29, 30, 31,     //  [8] - [15]
        16, 17, 18, 19, 20, 21, 22, 23,     // [16] - [23]
         8,  9, 10, 11, 12, 13, 14, 15,     // [24] - [31]
         0,  1,  2,  3,  4,  5,  6,  7],    // [32] - [39]
    
    sceneLaunch:[82, 83, 84, 85, 86],       // Scene Launch Pads - [1, Note] - Array order is top to bottom on control surface
        
    clipStop:[52, 81],                      // Clip Stop [1-8, 52] + Stop All Clips [1, 81] 
    
    trackSelector:[51, 80],                 // Track Selectors [1-8, 51] + Master [1, 80]
        
    trackControl:[50, 66, 49, 48],          // Mute, Crossfade Assign [A/B], Solo [S], Record-Arm [.] - [1-8, Note] 
        
    button:[    // Button controls [1, Note]
         87,    //  [0] Buttons Top - pan
         88,    //  [1] Buttons Top - sends
         89,    //  [2] Buttons Top - user

         91,    //  [3] Buttons Top - play
         93,    //  [4] Buttons Top - record
        102,    //  [5] Buttons Top - session

         90,    //  [6] Buttons Top - metronome
         99,    //  [7] Buttons Top - tapTempo
        100,    //  [8] Buttons Top - nudgeMinus
        101,    //  [9] Buttons Top - nudgePlus

         58,    // [10] Buttons Bottom - 1DevicePrev
         59,    // [11] Buttons Bottom - 2DeviceNext
         60,    // [12] Buttons Bottom - 3BankPrev
         61,    // [13] Buttons Bottom - 4BankNext

         62,    // [14] Buttons Bottom - 5DevOnOff
         63,    // [15] Buttons Bottom - 6DevLock
         64,    // [16] Buttons Bottom - 7ClipDevView
         65,    // [17] Buttons Bottom - 8DetailView

         98,    // [18] Buttons Bottom - shift 
        103],   // [19] Buttons Bottom - bank
        
    bankSelect:[                            // Nb. Bank Select ordered CLOCKWISE FROM TOP. [1, Note]
         94,    // Bank Select - up	
         96,    // Bank Select - right
         95,    // Bank Select - down
         97]    // Bank Select - left
};

var noteCC = {                              // Control Change Notes
    knob:[48, 49, 50, 51, 52, 53, 54, 55,   // Track Knobs (Top) [1, Note] Array indices: [0]-[7]
          16, 17, 18, 19, 20, 21, 22, 23],  // Device Knobs (Right), Track 1 / All Modes [1, Note] Array indices: [8] - [15]. For Generic Mode (0) there are also  [2-8, Note] + Master [9, Note]

    encoder:[47, 13],                       // Rotary Encoders [1, 47] Cue [1, 47] Tempo

    fader:[7, 14, 15]                       // Faders Track [1-8, 7] + Master [1,14] + Crossfader [1,15]
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

function init ()
{
	
};

function setRingModeSingle(param, noteIndex, chanIndex) {
    if (chanIndex == "K") {             // Track Knobs
        local.sendCC(1, noteCC.knob[noteIndex - 1] + 8, param.get());
    } else if (chanIndex == "r") {      // Master Track, Mode 0
        local.sendCC(9, noteCC.knob[noteIndex + 7] + 8, param.get());
    } else {                            // Device Knobs Track 1-8
        local.sendCC(chanIndex, noteCC.knob[noteIndex + 7] + 8, param.get());
    };
};

function setRingModeGroup(param, chanIndex) {
    for (var i = 1; i < 9; i++) {
        if (chanIndex == "K") {         // Track Knobs
            local.sendCC(1, noteCC.knob[i - 1] + 8, param.get());
        } else if (chanIndex == "r") {  // Master Track, Mode 0
            local.sendCC(9, noteCC.knob[i + 7] + 8, param.get());
        } else {                        //Device Knobs Track 1-8
            local.sendCC(chanIndex, noteCC.knob[i + 7] + 8, param.get());
        };
    };
};

function moduleParameterChanged(param) {
    var noteOrCC = param.getControlAddress();
    if (param.isParameter()) {

        if (param.name == "controllerMode") { setAPC40mode(param.get()); };
        if (param.name == "debug") { debug(param); };

        if (noteOrCC.contains("led")) {
            var noteIndex = parseInt(param.name.charAt(1));
            var chanIndex = param.getParent().name.charAt(5);
            if (chanIndex == "n") { setRingModeGroup(param, "K");  };      // All Rings
            if (chanIndex == "n" || chanIndex == "e") {
                setRingModeGroup(param, "r");
                for (var i = 1; i < 9; i++) {setRingModeGroup(param, i); };
            } else {
                if (noteIndex) {            // Any single Ring
                    setRingModeSingle(param, noteIndex, chanIndex);
                } else {                    // All Track Rings
                    setRingModeGroup(param, chanIndex);
                };
            };
            script.log("Module parameter changed : "+param.name+" > "+param.get());
        } else {

            // ALL BUTTON PARAM FUNCTIONS HERE

        };
    } else {
        script.log("Module parameter triggered : " + param.name);
    };
};

/*
 This function will be called each time a value of this module has changed, 
 meaning a parameter or trigger inside the "Values" panel of this module
 This function only exists because the script is in a module
*/

function moduleValueChanged(value) {
    var noteOrCC = value.getControlAddress();
    if(value.isParameter()){
        if (noteOrCC.contains("knob") || noteOrCC.contains("faders")){
            script.log("CC");
            script.log("Module value changed : "+value.name+" > "+value.get());
        } else {

            
            script.log("NOTE");
            script.log("Module value changed : "+value.name+" > "+value.get());
        };
    } else {
        script.log("Module value triggered : "+value.name);	
	};
};

// Logs incoming Note On, leaving controller to do what it's programmed to do. 
// Does turning off Module logging bypass this? Need to check.

function noteOnEvent(channel, pitch, velocity) 
{
    /// myIntParam.set(2);
	script.log("Note on received "+channel+", "+pitch+", "+velocity);
};

function noteOffEvent(channel, pitch, velocity)
{
	script.log("Note off received "+channel+", "+pitch+", "+velocity);
};

function sysExEvent(data) // JUST LOGGING THIS FOR THE TIME BEING
{
	script.log("Sysex Message received, "+data.length+" bytes :");
	for(var i=0; i < data.length; i++)
	{
		script.log(" > "+data[i]);
	};
};

/*//////////////////////////////////////////*/

// Don't think APC40 MkII can do anything with these but leaving them here just in case

function ccEvent(channel, number, value)
{
	script.log("ControlChange received "+channel+", "+number+", "+value);
};

function ccEvent(channel, number, value)
{
	script.log("ControlChange received "+channel+", "+number+", "+value);
};

// MAIN END //////////////////////////////////

// UTILITIES START ///////////////////////////

function setAPC40mode(mode) {
    local.sendSysex(71, 127, 41, 96, 0, 4, mode[0], 8, 2, 1);
    script.log("APC40 MkII set to " + mode[1] + " Mode with Sysex Message ");
    script.log(mode);
};

function debug(param) {
    if (param.get() == true) {
        local.logIncoming.set(true);
        local.logOutgoing.set(true);
        local.scripts.aPC40_MkII.enableLog.set(true);
    } else { if (param.get() == false) {
        local.logIncoming.set(false);
        local.logOutgoing.set(false);
        local.scripts.aPC40_MkII.enableLog.set(false);
        };
    };
};

// UTILITIES // END /////////////////////////////

// TESTING //////////////////////////////////////

// function testRGB(){
//     var x = local.parameters.lights.rgbPadMode_Colour.clipLaunchPadColour.layer1_Clip1.get();
//     local.sendNoteOn(1, 0, x);
//     script.log(x);
// };

// var heirarchy = local.parameters.lights.getContainers();
// script.log(heirarchy);
