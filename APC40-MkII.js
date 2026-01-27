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

// GLOBAL VARIABLES END //////////////////////

// MAIN //////////////////////////////////////


function init() {
    local.parameters.pass_through.setCollapsed(true);
    local.values.infos.setCollapsed(true);
    local.values.tempo.setCollapsed(true);
    local.values.mtc.setCollapsed(true);
    local.scripts.setCollapsed(true);
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
