// GLOBAL VARIABLES //////////////////////////

/* 
   Original variable list is at Additional Files\Original_Variable_Matrix.js
   I chopped out all the repeated information as it's not relevant and made 
   finding the array index harder. 
   Annotation is [Channel, Note]. [1-8, Note] means there are 8 of them.
*/



var noteNote = {                            // This variable is all the regular notes

    rgbPad:[                                // [1, Note] Array order is as on control surface. Indices:
        32, 33, 34, 35, 36, 37, 38, 39,     //  [0] -  [7] Clip Launch Pads
        24, 25, 26, 27, 28, 29, 30, 31,     //  [8] - [15] Clip Launch Pads
        16, 17, 18, 19, 20, 21, 22, 23,     // [16] - [23] Clip Launch Pads
         8,  9, 10, 11, 12, 13, 14, 15,     // [24] - [31] Clip Launch Pads
         0,  1,  2,  3,  4,  5,  6,  7,     // [32] - [39] Clip Launch Pads
        82, 83, 84, 85, 86],                // [40] - [44] Scene Launch Pads - [1, Note] - Array order is top to bottom on control surface
        
    clipStop:[52, 81],                      // Clip Stop [1-8, 52] + Stop All Clips [1, 81] 
    
    trackSelector:[51, 80],                 // Track Selectors [1-8, 51] + Master [1, 80]
        
    trackControl:[50, 66, 49, 48],          // Mute, Crossfade Assign [A/B], Solo [S], Record-Arm [.] - [1-8, Note] 
        
    button:{    // Button controls [1, Note]
        pan:                87, //  [0] Buttons Top - pan
        sends:              88, //  [1] Buttons Top - sends
        user:               89, //  [2] Buttons Top - user

        play:               91, //  [3] Buttons Top - play
        record:             93, //  [4] Buttons Top - record
        session:           102, //  [5] Buttons Top - session

        metronome:          90, //  [6] Buttons Top - metronome
        tapTempo:           99, //  [7] Buttons Top - tapTempo
        nudgeMinus:        100, //  [8] Buttons Top - nudgeMinus
        nudgePlus:         101, //  [9] Buttons Top - nudgePlus

        _1_DeviceLeft:      58, // [10] Buttons Bottom - 1DeviceLroot.modules.akaiAPC40MkII.parameters.lights.buttons.bottomSection._1_DeviceLeft
        _2_DeviceRight:     59, // [11] Buttons Bottom - 2DeviceR
        _3_BankLeft:        60, // [12] Buttons Bottom - 3BankL
        _4_BankRight:       61, // [13] Buttons Bottom - 4BankRroot.modules.akaiAPC40MkII.parameters.lights.buttons.bottomSection._8_DetailView

        _5_DeviceOn_Off:    62, // [14] Buttons Bottom - 5DevOnOffroot.modules.akaiAPC40MkII.parameters.lights.buttons.bottomSection._5_DeviceOn_Off
        _6_DeviceLock:      63, // [15] Buttons Bottom - 6DevLockroot.modules.akaiAPC40MkII.parameters.lights.buttons.bottomSection._6_DeviceLock
        _7_Clip_DeviceView: 64, // [16] Buttons Bottom - 7ClipDevViewroot.modules.akaiAPC40MkII.parameters.lights.buttons.bottomSection._7_Clip_DeviceView
        _8_DetailView:      65, // [17] Buttons Bottom - 8DetailView

        shift:              98, // [18] Buttons Bottom - shift 
        bank:              103, // [19] Buttons Bottom - bank
                                // Nb. Bank Select ordered CLOCKWISE FROM TOP. [1, Note]
        up:                 94, // Bank Select - up	
        right:              96, // Bank Select - right
        down:               95, // Bank Select - down
        left:               97  // Bank Select - left
    },
};

var noteCC = {                              // Control Change Notes
    knob:[48, 49, 50, 51, 52, 53, 54, 55,   // Track Knobs (Top) [1, Note] Array indices: [0]-[7]
          16, 17, 18, 19, 20, 21, 22, 23],  // Device Knobs (Right), Track 1 / All Modes [1, Note] Array indices: [8] - [15]. For Generic Mode (0) there are also  [2-8, Note] + Master [9, Note]

    encoder:[47, 13],                       // Rotary Encoders [1, 47] Cue [1, 47] Tempo

    fader:[7, 14, 15]                       // Faders Track [1-8, 7] + Master [1,14] + Crossfader [1,15]
};



// GLOBAL VARIABLES END //////////////////////

// HELPER FUNCTIONS //////////////////////////

function trackNo(param, x) {
    var a = parseInt(param.name.charAt(x));
    return a;
};


// MAIN //////////////////////////////////////


function init() {
    local.parameters.pass_through.setCollapsed(true);
    local.values.infos.setCollapsed(true);
    local.values.tempo.setCollapsed(true);
    local.values.mtc.setCollapsed(true);
    // local.scripts.setCollapsed(true);
    local.commandTester.setCollapsed(true);
    local.templates.setCollapsed(true);
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
    for (var noteIndex = 1; noteIndex < 9; noteIndex++) {
        setRingModeSingle(param, noteIndex, chanIndex);
    };
};

function lightRGBPad(param) {
    var y = trackNo(param, 5);
    if (param.getParent().getParent().name.charAt(0) == "c") { //clip
        var x = trackNo(param, 11) - 1;
        var z = x + 40 - (8 * y);
        var channel = local.parameters.lights.pads.clipLaunchPads.mode[param.name].get();
        var velocity = local.parameters.lights.pads.clipLaunchPads.colour[param.name].get();
    } else { //scene
        z = y + 39;
        var channel = local.parameters.lights.pads.sceneLaunchPads.mode[param.name].get();
        var velocity = local.parameters.lights.pads.sceneLaunchPads.colour[param.name].get();
    };
    var note = noteNote.rgbPad[z];
    local.sendNoteOn(channel, note, velocity);
};

function light012(param) { // Clip Stop and Crossfade Assign ONLY
    var channel = trackNo(param, 5);
    var velocity = param.get();
    if (param.getParent().name.charAt(1) == "l") {
        var note = 52;
    } else { note = 66; };
    local.sendNoteOn(channel, note, velocity);
};

function light01(param) { // Any button with Boolean condition
    var channel = 1;
    script.log(param.getParent().getParent().name);
    if (param.getParent().getParent().name == "buttons") {
        var note = noteNote.button[param.name];
    } else {
        channel = trackNo(param, 5);
        if (param.getParent().name.charAt(0) == "m") { note = 50; };
        if (param.getParent().name.charAt(0) == "s") { note = 49; };
        if (param.getParent().name.charAt(0) == "r") { note = 48; };
        if (param.getParent().name.charAt(0) == "t") {
            note = 51;
            if (!trackNo(param, 5)) { note = 80; };
        };
    };
    var velocity = param.get();
    local.sendNoteOn(channel, note, velocity);
}; 

function moduleParameterChanged(param) {
    var noteOrCC = param.getControlAddress();
    if (param.isParameter()) {

        if (param.name == "controllerMode") { setAPC40mode(param.get()); };
        if (param.name == "debug") { debug(param); };

        if (noteOrCC.contains("led")) {
            var noteIndex = parseInt(param.name.charAt(1));
            var chanIndex = param.getParent().name.charAt(5);
            if (chanIndex == "n") { setRingModeGroup(param, "K"); };      // All Rings
            if (chanIndex == "n" || chanIndex == "e") {
                setRingModeGroup(param, "r");
                for (var i = 1; i < 9; i++) { setRingModeGroup(param, i); };
            } else {
                if (noteIndex) {            // Any single Ring
                    setRingModeSingle(param, noteIndex, chanIndex);
                } else {                    // All Track Rings
                    setRingModeGroup(param, chanIndex);
                };
            };
            script.log("Module parameter changed : " + param.name + " > " + param.get());
        } else {

            if (param.getParent().getParent().name == "clipLaunchPads" || param.getParent().getParent().name == "sceneLaunchPads") {
                lightRGBPad(param);
            } else if (param.getParent().name.charAt(0) == "c") {
                light012(param);
            } else {
                light01(param);
            };
        };
    } else { 

        // TRIGGERS GO HERE

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

function noteOnEvent(channel, note, velocity) 
{
    /// myIntParam.set(2);
	script.log("Note on received "+channel+", "+note+", "+velocity);
};

function noteOffEvent(channel, note, velocity)
{
	script.log("Note off received "+channel+", "+note+", "+velocity);
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


