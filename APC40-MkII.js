// GLOBAL VARIABLES //////////////////////////

/* 
   Original variable list is at Additional Files\Original_Variable_Matrix.js
   I chopped out all the repeated information as it's not relevant and made 
   finding the array index harder. 
   Annotation is [Channel, Note]. [1-8, Note] means there are 8 of them.
*/
/* 
var noteNote = {                            // This variable is all the regular notes

    rgbPad: [                                // [1, Note] Array order is as on control surface. Indices:
        32, 33, 34, 35, 36, 37, 38, 39,     //  [0] -  [7] Clip Launch Pads
        24, 25, 26, 27, 28, 29, 30, 31,     //  [8] - [15] Clip Launch Pads
        16, 17, 18, 19, 20, 21, 22, 23,     // [16] - [23] Clip Launch Pads
         8,  9, 10, 11, 12, 13, 14, 15,     // [24] - [31] Clip Launch Pads
         0,  1,  2,  3,  4,  5,  6,  7,     // [32] - [39] Clip Launch Pads
        82, 83, 84, 85, 86],                // [40] - [44] Scene Launch Pads - [1, Note] - Array order is top to bottom on control surface

    clipStop: [52, 81],                      // Clip Stop [1-8, 52] + Stop All Clips [1, 81] 

    trackSelector: [51, 80],                 // Track Selectors [1-8, 51] + Master [1, 80]

    trackControl: [50, 66, 49, 48],          // Mute, Crossfade Assign [A/B], Solo [S], Record-Arm [.] - [1-8, Note] 


};

var noteCC = {                              // Control Change Notes
    knob: [
        48, 49, 50, 51, 52, 53, 54, 55,     // Track Knobs (Top) [1, Note] Array indices: [0]-[7]
        16, 17, 18, 19, 20, 21, 22, 23],    // Device Knobs (Right), Track 1 / All Modes [1, Note] Array indices: [8] - [15]. For Generic Mode (0) there are also  [2-8, Note] + Master [9, Note]

    encoder: [47, 13],                      // Rotary Encoders [1, 47] Cue [1, 47] Tempo

    fader: [7, 14, 15]                      // Faders Track [1-8, 7] + Master [1,14] + Crossfader [1,15]
};
 */
var apcMode = 0; // TODO add check to see if Device Knob messages over 1 are rejected or not.

var ccArr = [];

var noteArr = [];

var buttons = [
    "pan", 87,
    "sends", 88,
    "user", 89,
    "metronome", 90,
    "play", 91,
    "record", 93,
    "session", 102,

    "tapTempo", 99,   // Top, No Light
    "nudge", 100,     // Top, No Light
    "nudge_", 101,    // Top, No Light

    "_1_DeviceLeft", 58,
    "_2_DeviceRight", 59,
    "_3_BankLeft", 60,
    "_4_BankRight", 61,
    "_5_DeviceOn_Off", 62,
    "_6_DeviceLock", 63,
    "_7_Clip_DeviceView", 64,
    "_8_DetailView", 65,
    "bank", 103,

    "up", 94,
    "right", 96,
    "down", 95,
    "left", 97
];

// HELPER FUNCTIONS //////////////////////////

// function trackNo(param, x) 
// {
//     var a = parseInt(param.name.charAt(x));
//     return a;
// };

// CHATAIGNE FUNCTIONS ///////////////////////

function init() 
{
    // INTERFACE /////////////////////////////

    local.parameters.pass_through.setCollapsed(true);
    local.values.infos.setCollapsed(true);
    local.values.tempo.setCollapsed(true);
    local.values.mtc.setCollapsed(true);
    // local.scripts.setCollapsed(true);
    local.commandTester.setCollapsed(true);
    local.templates.setCollapsed(true);

    /* CONSTRUCT NOTE ARRAY AND POPULATE /////

    Format is:
    
    noteArr[MIDI Note][0] value
                      [1] param (For RGB Pads : Mode)
                      [2] param (For RGB Pads : Colour)
                    
    For notes that cover multiple tracks, format is:

    noteArr[MIDI Note][Track Number][0] value
                                    [1] param                         
    */

    for (i = 0; i < 104; i++) {
        noteArr[i] = [];
    };

    var m = -1;                             // Clip Launch Pads
    for (j = 1; j < 6; j++) {
        for (i = 1; i < 9; i++) {
            m++;
            var name = "layer" + j + "_clip" + i;
            noteArr[m][0] = local.values.pads.clipLaunchPads.getChild(name);
            noteArr[m][1] = local.parameters.lights.pads.clipLaunchPads.mode.getChild(name);
            noteArr[m][2] = local.parameters.lights.pads.clipLaunchPads.colour.getChild(name);
        };
    };

    for (i = 82; i < 87; i++) {             // Scene Launch Pads
        var name = "layer" + (i - 81);
        noteArr[i][0] = local.values.pads.sceneLaunchPads.getChild(name);
        noteArr[i][1] = local.parameters.lights.pads.sceneLaunchPads.mode.getChild(name);
        noteArr[i][2] = local.parameters.lights.pads.sceneLaunchPads.colour.getChild(name);
    };

    for (i = 48; i < 53; i++) { noteArr[i] = [[], [], [], [], [], [], [], [], []]; };

    noteArr[66] = [[], [], [], [], [], [], [], [], []];

    for (i = 1; i < 9; i++) {
        var name = "track" + i;
        noteArr[48][i][0] = local.values.pads.trackControls.record_Arm__.getChild(name); // Record/Arm
        noteArr[48][i][1] = local.parameters.lights.pads.trackControls.record_Arm__.getChild(name);
        noteArr[49][i][0] = local.values.pads.trackControls.solo_S_.getChild(name); // Solo
        noteArr[49][i][1] = local.parameters.lights.pads.trackControls.solo_S_.getChild(name);
        noteArr[50][i][0] = local.values.pads.trackControls.mute_1_8_.getChild(name); // Mute
        noteArr[50][i][1] = local.parameters.lights.pads.trackControls.mute_1_8_.getChild(name);
        noteArr[51][i][0] = local.values.pads.trackControls.trackSelectors.getChild(name); // Track Select
        noteArr[51][i][1] = local.parameters.lights.pads.trackControls.trackSelectors.getChild(name);
        noteArr[52][i][0] = local.values.pads.clipStopPads.getChild(name);// Clip Stop
        noteArr[52][i][1] = local.parameters.lights.pads.clipStopPads.getChild(name);
        noteArr[66][i][0] = local.values.pads.trackControls.crossfadeAssign_AB_.getChild(name); // Crossfader A/B
        noteArr[66][i][1] = local.parameters.lights.pads.trackControls.crossfadeAssign_AB_.getChild(name);
    };

    for (i = 0; i < 14; i=i+2) {
        noteArr[buttons[i+1]][0] = local.values.buttons.topSection.getChild(buttons[i]);
        noteArr[buttons[i+1]][1] = local.parameters.lights.buttons.topSection.getChild(buttons[i]);
    };

    for (i = 14; i < 20; i=i+2) {
        noteArr[buttons[i+1]][0] = local.values.buttons.topSection.getChild(buttons[i]);
    };

    for (i = 20; i < 38; i=i+2) {
        noteArr[buttons[i+1]][0] = local.values.buttons.bottomSection.getChild(buttons[i]);
        noteArr[buttons[i+1]][1] = local.parameters.lights.buttons.bottomSection.getChild(buttons[i]);
    };

    for (i = 38; i < 46; i=i+2) {
        noteArr[buttons[i+1]][0] = true;
        noteArr[buttons[i+1]][1] = local.values.buttons.bankSelect.getChild(buttons[i]);
    };

   
    
    noteArr[80][0] = local.values.pads.trackControls.trackSelectors.getChild("master");
    noteArr[81][0] = local.values.pads.clipStopPads.getChild("stopAllClips");
    noteArr[98][0] = local.values.buttons.bottomSection.getChild("shift");

    /* CONSTRUCT CC ARRAY AND POPULATE ///////

    Format is:
    
    ccArr[MIDI Note][0] value
                    [1] param
                    
    For CC Notes that cover multiple tracks, format is:

    ccArr[MIDI Note][Track Number][0] value
                                  [1] param
    */

    for (i = 0; i < 65; i++) { ccArr[i] = []; };

    ccArr[7] = [[], [], [], [], [], [], [], [], []];

    for (i = 16; i < 32; i++) { ccArr[i] = [[], [], [], [], [], [], [], [], [], []]; };

    for (i = 1; i < 9; i++) {               // Track Fader
        var name = "track" + i;
        ccArr[7][i][0] = local.values.faders.getChild(name);
    };

    ccArr[13][0] = local.values.knobs.rotaryEncoders.getChild("tempo");

    ccArr[14][0] = local.values.faders.getChild("master");

    ccArr[15][0] = local.values.faders.getChild("crossfader");
    
  
    for (i = 16; i < 24; i++) {             // Device Knobs Track 1
        var j = i - 15;
        var name = "_" + j + "_";
        ccArr[i][1][0] = local.values.knobs.deviceKnobs_Right_.track1_UsedByAllModes.getChild(name);
    };

    for (k = 2; k < 9; k++) {               // Device Knobs Track 2-8 (Mode 0 Only)
        var m = "track" + k + "_GenericMode_0_Only";
        for (i = 16; i < 24; i++) {
            var j = i - 15;             
            var name = "_" + j + "_";
            ccArr[i][k][0] = local.values.knobs.deviceKnobs_Right_[m].getChild(name);
        };
    };

    for (i = 16; i < 24; i++) {             // Device Knobs Master Track (Mode 0 Only)
        var j = i - 15;
        var name = "_" + j + "_";
        ccArr[i][9][0] = local.values.knobs.deviceKnobs_Right_.master_GenericMode_0_Only.getChild(name);
    };

    for (i = 24; i < 32; i++) {             // Device Knob LED Ring Mode Track 1
        var j = i - 23;
        var name = "_" + j + "_";
        ccArr[i][1][0] = true;
        ccArr[i][1][1] = local.parameters.lights.ledRingModes.deviceKnobs_Right_.track1_UsedByAllModes.getChild(name);
    };


    for (k = 2; k < 9; k++) {               // Device Knobs LED Ring Mode Track 2-8 (Mode 0 Only)
        var m = "track" + k + "_GenericMode_0_Only";
        for (i = 24; i < 32; i++) {
            var j = i - 23;
            var name = "_" + j + "_";
            ccArr[i][k][1] = local.parameters.lights.ledRingModes.deviceKnobs_Right_[m].getChild(name);

        };
    };

    for (i = 24; i < 32; i++) {             // Device Knob LED Ring Mode Master Track (Mode 0 Only)
        var j = i - 23;
        var name = "_" + j + "_";
        ccArr[i][9][0] = true;
        ccArr[i][9][1] = local.parameters.lights.ledRingModes.deviceKnobs_Right_.master_GenericMode_0_Only.getChild(name);
    };

    ccArr[47][0] = local.values.knobs.rotaryEncoders.getChild("cueLevel");

    for (i = 48; i < 56; i++) {                 // Track Knobs 
        var name = "_" + (i - 47) + "_";
        ccArr[i][0] = local.values.knobs.trackKnobs_Top_.getChild(name);
    };

    for (i = 56; i < 64; i++) {                 // Track Knob LED Ring Mode
        var name = "_" + (i - 55) + "_";
        ccArr[i][0] = true;
        ccArr[i][1] = local.parameters.lights.ledRingModes.trackKnobs_Top_.getChild(name);
    };

    ccArr[64][0] = local.values.buttons.footswitch.getChild("footswitch");
};

// This function will be called each time a parameter of your script has changed

function scriptParameterChanged(param)
{
	script.log("Parameter changed : "+param.name); // All parameters have "name" property

	if(param.is(myTrigger)) 
	{
		script.log("Trigger !");    //You can check if two variables are the reference to the same parameter or object with the method .is()
		                            //Here we can for example show a "Ok cancel" box. The result will be called in the messageBoxCallback function below
		                            //util.showOkCancelBox("myBoxId", "Super warning!", "This is a warning for you", "warning", "Got it","Naaah");
	}
	else if(param.is(myEnumParam))
	{
		script.log("Key = "+param.getKey()+", data = "+param.get()); //The enum parameter has a special function getKey() to get the key associated to the option. .get() will give you the data associated
	}
	else
	{
		script.log("Value is "+param.get()); //All parameters have a get() method that will return their value
	} 
};

/* MODULE SPECIFIC FUNCTIONS /////////////////

	The "local" variable refers to the object containing the scripts. In this case, the local variable refers to the module.
	It means that you can access any control inside  this module by accessing it through its address.
	For instance, if the module has a float value named "Density", you can access it via local.values.density
	Then you can retrieve its value using local.values.density.get() and change its value using local.values.density.set()

/////////////////////////////////////////// */

// This function will be called each time a parameter of this module has changed, meaning a parameter or trigger inside the "Parameters" panel of this module

function moduleParameterChanged(param) {
    if (param.isParameter()) {
        if (param.name == "controllerMode") {
            setAPC40mode(param.get());
        } else if (param.name == "debug") {
            debug(param);
        } else if (param.getControlAddress().contains("led")) {
            if (param.name == "all") {
                setRingModeGroup(param);
            } else {
                setRingModeSingle(param);
            };
        } else if (param.name.charAt(0) == "l") {
            lightRgb(param);
        } else if (param.getParent().name.charAt(11) == "s") {
            lightTri(param); // Three state button
        } else {
            lightBin(param); // Binary button
        };
        script.log("Module parameter changed : " + param.name + " > " + param.get());
    } else {

        if (param.name == "clearAll"){clearBank(param);}

        // TRIGGERS

        script.log("Module parameter triggered : " + param.name);
    }
};

// This function will be called each time a value of this module has changed, meaning a parameter or trigger inside the "Values" panel of this module

function moduleValueChanged(value)
{
	if(value.isParameter())
	{
		script.log("Module value changed : "+value.name+" > "+value.get());	
	}else 
	{
		script.log("Module value triggered : "+value.name);	
	}
};

/* NIDI MODULE SPECIFIC FUNCTIONS ////////////

local.sendNoteOn(channel, note, velocity);
local.sendNoteOff(channel, note);
local.sendCC(channel, note, value);

You can intercept MIDI Events with the functions below:

/////////////////////////////////////////// */

function noteOnEvent(channel, pitch, velocity)
{
    if (noteArr[pitch][0]) // Check Mapping
    {
        script.log("NoteOn received "+channel+", "+pitch+", "+velocity);
    }
    else
    {
        script.log("No mapping for this Midi Note found");
    };
};

function noteOffEvent(channel, pitch, velocity) {
    if (noteArr[pitch][0]) // Check Mapping
    {
        // noteArr[pitch]
        script.log("NoteOff received " + channel + ", " + pitch + ", " + velocity);
    }
    else {
        script.log("No mapping for this Midi Note found");
    };
};

function ccEvent(channel, number, value) {
    if (ccArr[number][0])                                               // Remove Completely unmapped CCs
    {
        if (number >= 24 && number <= 31 && channel <= 9) {             // Device Knobs LED Mode
            if (value >= 4) { var norm = 1; } else { norm = value; }
            ccArr[number][channel][1].set(norm);
            script.log("ControlChange received " + channel + ", " + number + ", " + value);
        } else if (number >= 56 && number <= 63 && channel == 1) {      // Track Knobs LED Mode
            if (value >= 4) { var norm = 1; } else { norm = value; }
            ccArr[number][1].set(norm);
            script.log("ControlChange received " + channel + ", " + number + ", " + value);
        } else if (number >= 16 && number <= 23 && channel <= 9) {      // Device Knobs Value
            ccArr[number][channel][0].set(value);
            script.log("ControlChange received " + channel + ", " + number + ", " + value);
        } else if (number >= 48 && number <= 55 && channel == 1) {      // Track Knobs Value
            ccArr[number][0].set(value);
            script.log("ControlChange received " + channel + ", " + number + ", " + value);
        } else if (number == 7) {                                       // Track Faders
            ccArr[7][channel][0].set(value);
            script.log("ControlChange received " + channel + ", " + number + ", " + value);
        } else if (channel == 1) {                                      // Everything else
            ccArr[number][0].set(value);
            script.log("ControlChange received " + channel + ", " + number + ", " + value);
        } else {
            script.log("No mapping for this Midi CC found");
        };
    }
    else { script.log("No mapping for this Midi CC found"); };
};

function sysExEvent(data)
{
	script.log("Sysex Message received, "+data.length+" bytes :");
	for(var i=0; i < data.length; i++)
	{
		script.log(" > "+data[i]);
	}
};

// THIS MODULE SPECIFIC FUNCTIONS ////////////

// TURN THE LIGHTS ON ////////////////////////

function setRingModeSingle(param) 
{
    var chanIndex = param.getParent().name.charAt(5);
    var noteIndex = parseInt(param.name.charAt(1));
    if (chanIndex == "K") {// Track Knobs
        local.sendCC(1, noteIndex + 55, param.get());
    } else {
        if (chanIndex == "r") {// Master Track, Mode 0
            local.sendCC(9, noteIndex + 23, param.get());
        } else {
            chanIndex = parseInt(chanIndex);// Device Knobs Track 1-8
            local.sendCC(chanIndex, noteIndex + 23, param.get());
        };
    };
};

function setRingModeGroup(param) {
    var siblings = param.getParent().getControllables(true, false);
    for (i = 1; i < 9; i++) {
        siblings[i].setData(param.get());
    };
};

function lightRgb(param) {   // The Clip and Scene Launch Pads
    var midiNote;
    if (param.name.charAt(11)) {
        midiNote = ((parseInt(param.name.charAt(5)) - 1) * 8) + (parseInt(param.name.charAt(11)) - 1);
    } else {
        midiNote = parseInt(param.name.charAt(5)) + 81;
    };
    if (param.getParent().name.charAt(0) == "m") {      // use Mode get Colour
        local.sendNoteOn(param.get(), midiNote, noteArr[midiNote][2].get());
    } else {                                            // Use colour get Mode
        local.sendNoteOn(noteArr[midiNote][1].get(), midiNote, param.get());
    };
};

function lightTri(param) {      // Clip Stop and Crossfade Assign 
    var chanIndex = param.name.charAt(5);
    var note = 66;
    if (param.getParent().name=="clipStopPads"){note = 52;}
    local.sendNoteOn(chanIndex, note, param.get());
};

function lightBin(param) {       // Any button with Boolean condition
    var note;
    if (param.getParent().getParent().name == "trackControls") {
        var chanIndex = param.name.charAt(5);
        var nameCheck = param.getParent().name.charAt(0);
        if (nameCheck == "m") { note = 50; } else
        if (nameCheck == "s") { note = 49; } else
        if (nameCheck == "r") { note = 48; } else { note = 51; };
    } else {
        chanIndex = 1;
        var i = buttons.indexOf(param.name);
        note = buttons[i + 1];
    };
    local.sendNoteOn(chanIndex, note, param.get());
};

// TURN THE LIGHTS OFF ///////////////////////

function clearBank(param) {
    if (param.name == "clearAll") {
        var siblings = param.getParent().getControllables(true, false);
        for (i = 0; i < 9; i++) {
            siblings[i].set(0);
        };
    };
}

// UTILITIES /////////////////////////////////

function setAPC40mode(mode) {
    local.sendSysex(71, 127, 41, 96, 0, 4, mode[0], 8, 2, 1);
    script.log("APC40 MkII set to " + mode[1] + " Mode with Sysex Message ");
    apcMode = mode;
};

function debug(param) {
    if (param.get() == true) {
        local.logIncoming.set(true);
        local.logOutgoing.set(true);
        local.scripts.aPC40_MkII.enableLog.set(true);
    } else {
        local.logIncoming.set(false);
        local.logOutgoing.set(false);
        local.scripts.aPC40_MkII.enableLog.set(false);
    };
};

// TESTING ///////////////////////////////////

// var heirarchy = local.parameters.lights.getContainers();
// script.log(heirarchy);

//////////////////////////////////////////////