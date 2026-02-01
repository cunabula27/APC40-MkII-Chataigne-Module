// GLOBAL VARIABLES //////////////////////////

/* 
   Original variable list is at Additional Files\Original_Variable_Matrix.js
   I chopped out all the repeated information as it's not relevant and made 
   finding the array index harder. 
   Annotation is [Channel, Note]. [1-8, Note] means there are 8 of them.
*/

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

var apcMode = 0; // TODO add check to see if Device Knob messages over 1 are rejected or not.

var ccAr = [];

var noteAr = [];

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

    // CONSTRUCT NOTE ARRAY AND POPULATE /////////

    // Format is noteAr[MIDI Note] 
    for (i = 0; i < 104; i++) {
        noteAr[i] = [];
    };

    var m = -1;                             // Clip Launch Pads
    for (j = 1; j < 6; j++) {
        for (i = 1; i < 9; i++) {
            m++;
            var name = "layer" + j + "_clip" + i;
            noteAr[m][0] = local.values.pads.clipLaunchPads.getChild(name);
            noteAr[m][1] = local.parameters.lights.pads.clipLaunchPads.mode.getChild(name);
            noteAr[m][2] = local.parameters.lights.pads.clipLaunchPads.colour.getChild(name);
        };
    };

    for (i = 82; i < 87; i++) {             // Scene Launch Pads
        j = "layer" + (i - 81);
        noteAr[i][0] = local.values.pads.sceneLaunchPads.getChild(j);
        noteAr[i][1] = local.parameters.lights.pads.sceneLaunchPads.mode.getChild(j);
        noteAr[i][2] = local.parameters.lights.pads.sceneLaunchPads.colour.getChild(j);
    };

    for (i = 48; i < 53; i++) { noteAr[i] = [[], [], [], [], [], [], [], [], []]; };

    noteAr[66] = [[], [], [], [], [], [], [], [], []];

    for (i = 1; i < 9; i++) {
        var name = "track" + i;
        noteAr[48][i][0] = local.values.pads.trackControls.record_Arm__.getChild(name); // Record/Arm
        noteAr[48][i][1] = local.parameters.lights.pads.trackControls.record_Arm__.getChild(name);
        noteAr[49][i][0] = local.values.pads.trackControls.solo_S_.getChild(name); // Solo
        noteAr[49][i][1] = local.parameters.lights.pads.trackControls.solo_S_.getChild(name);
        noteAr[50][i][0] = local.values.pads.trackControls.mute_1_8_.getChild(name); // Mute
        noteAr[50][i][1] = local.parameters.lights.pads.trackControls.mute_1_8_.getChild(name);
        noteAr[51][i][0] = local.values.pads.trackControls.trackSelectors.getChild(name); // Track Select
        noteAr[51][i][1] = local.parameters.lights.pads.trackControls.trackSelectors.getChild(name);
        noteAr[52][i][0] = local.values.pads.clipStopPads.getChild(name);// Clip Stop
        noteAr[52][i][1] = local.parameters.lights.pads.clipStopPads.getChild(name);
        noteAr[66][i][0] = local.values.pads.trackControls.crossfadeAssign_AB_.getChild(name); // Crossfader A/B
        noteAr[66][i][1] = local.parameters.lights.pads.trackControls.crossfadeAssign_AB_.getChild(name);
    };

    var buttons = [
        ["pan", 87],
        ["sends", 88],
        ["user", 89],
        ["metronome", 90],
        ["play", 91],
        ["record", 93],

        ["tapTempo", 99], // Top, No Light
        ["nudge", 100],  // Top, No Light
        ["nudge_", 101], // Top, No Light

        ["_1_DeviceLeft", 58],
        ["_2_DeviceRight", 59],
        ["_3_BankLeft", 60],
        ["_4_BankRight", 61],
        ["_5_DeviceOn_Off", 62],
        ["_6_DeviceLock", 63],
        ["_7_Clip_DeviceView", 64],
        ["_8_DetailView", 65],
        ["bank", 103],

        ["up", 94],
        ["right", 96],
        ["down", 95],
        ["left", 97]
    ];

    for (i = 0; i < 6; i++) {
        noteAr[buttons[i][1]][0] = local.values.buttons.topSection.getChild(buttons[i][0]);
        noteAr[buttons[i][1]][1] = local.parameters.lights.buttons.topSection.getChild(buttons[i][0]);
    };

    for (i = 6; i < 9; i++) {
        noteAr[buttons[i][1]][0] = local.values.buttons.topSection.getChild(buttons[i][0]);
    };

    for (i = 9; i < 18; i++) {
        noteAr[buttons[i][1]][0] = local.values.buttons.bottomSection.getChild(buttons[i][0]);
        noteAr[buttons[i][1]][1] = local.parameters.lights.buttons.bottomSection.getChild(buttons[i][0]);
    };

    for (i = 18; i < 22; i++) {
        noteAr[buttons[i][1]][0] = true;
        noteAr[buttons[i][1]][1] = local.values.buttons.bankSelect.getChild(buttons[i][0]);
    };

    noteAr[80] = local.values.pads.trackControls.trackSelectors.getChild(master);
    noteAr[81] = local.values.pads.clipStopPads.getChild(stopAllClips);
    noteAr[98] = local.values.buttons.bottomSection.getChild(shift);

    // local.values.pads.trackControls.trackSelectors.master
    // local.values.pads.clipStopPads.stopAllClips
    // local.values.buttons.bottomSection.shift
    
    // CONSTRUCT CC ARRAY AND POPULATE ///////////

    for (i = 0; i < 65; i++) { ccAr[i] = []; };
    
    ccAr[7] = [[], [], [], [], [], [], [], [], []];

    for (i = 16; i < 32; i++) { ccAr[i] = [[], [], [], [], [], [], [], [], []]; };

    for (i = 1; i < 9; i++) {                   // Track Fader
        var name = "track" + i;
        ccAr[7][i][0] = local.values.faders.getChild(name);
    };

    for (i = 48; i < 56; i++) {                 // Track Knobs 
        var name = "_" + (i-47) + "_";
        ccAr[i][0] = local.values.knobs.trackKnobs_Top_.getChild(name);
    };

    for (i = 56; i < 64; i++) {                 // Track Knob LED Rings
        var name = "_" + (i-55) + "_";
        ccAr[i][0] = true;
        ccAr[i][1] = local.parameters.lights.ledRingModes.trackKnobs_Top_.getChild(name);
    };

    script.log(ccAr);

};

// TURN THE LIGHTS ON ////////////////////////

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

function lightRgb(a, b, channel, note, velocity) {   // The Clip and Scene Launch Pads

    script.log("a= " + a);
    script.log("b= " + b);
    script.log("channel= " + channel);
    script.log("note= " + note);
    script.log("velocity= " + velocity);

    var test = a.get();

    script.log("a.get() = " + a.get());

    if (a.get() = channel - 1) {

        b.set(velocity);

        // script.log("b= "+ b);
        // script.log("test = " +test);
        local.sendNoteOn(1, note, velocity);
    };








    /*  var y = trackNo(param, 5);
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
     local.sendNoteOn(channel, note, velocity); */
};

function lightTri(param) {      // Clip Stop and Crossfade Assign 
    var channel = trackNo(param, 5);
    var velocity = param.get();
    if (param.getParent().name.charAt(1) == "l") {
        var note = 52;
    } else { note = 66; };
    local.sendNoteOn(channel, note, velocity);
};

function lightBin(param) {       // Any button with Boolean condition
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

// TURN THEM OFF AGAIN ///////////////////////

function clearRGBPads(x, y) {
    for (i = x; i < y; i++) {
        local.sendNoteOff(1, noteNote.rgbPad[i]);
        // myIntParam.set(0);
    }
};

function handleCC(channel, number, value) {
    var obj = ccValueObj[channel][number];
    if (!!obj) {
        if (obj.name == "encoderCueLevel" || obj.name == "encoderTempo") {
            if (value > 63) value = value - 128;
            obj.set(value);
        }
        else {
            obj.set((value / 127));
        }
    }
    else {
        script.log("No Mapping for this Midi CC found");
    }
}

// EVERYTHING THAT HAPPENS TO PARAMETERS /////

/* 
function moduleParameterChanged(param) {
    var noteOrCC = param.getControlAddress();
    if (param.isParameter()) {

        if (param.name == "controllerMode") {
            setAPC40mode(param.get());

        } else if (param.name == "debug") {
            debug(param);

        } else if (noteOrCC.contains("led")) {
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
            
//             script.log(noteAr);
// script.log(ccAr);
        } else {

            if (param)
                lightRGBPad(param);
            } else if (param.getParent().name.charAt(0) == "c") {
                light012(param);
            } else {
                light01(param);
            };
            script.log("param = "+param+" param.name = "+param.name+" param.get() = "+param.get());
        };
    } else {

        if (param.getParent().name == "pads") { clearRGBPads(0, 45); };

        if (param.getParent().name == "clipLaunchPads") { clearRGBPads(0, 40); };

        if (param.getParent().name == "sceneLaunchPads") { clearRGBPads(40, 45); };

        // TRIGGERS GO HERE

        script.log("Module parameter triggered : " + param.name);
    };
};

// EVERYTHING THAT HAPPENS TO VALUES /////////

function moduleValueChanged(value) {
    var noteOrCC = value.getControlAddress();
    if(value.isParameter()){
        if (noteOrCC.contains("knob") || noteOrCC.contains("faders")){
ccAr[1][7][0].set(value);
var obj = ccAr[1][7][0];
           // myIntParam.set(2);
           script.log(obj.name);
            script.log("CC");
            script.log(ccAr[1][7][0]);
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

function noteOnEvent(channel, note, velocity) { 
    if (note <= 39 ||                       // Clip Launch Pads
       (note >= 82 && note <= 85)) {        // Scene Launch Pads
        lightRGBPad(noteAr[note][0], noteAr[note][1], channel, note, velocity);
    };
};
 */
// }else if (note >= 82 && note <= 86) { // Scene Launch Pads

// } else if (note == 52 && channel <= 8) { // Clip Stop Pads

// } else if (note == 66 && channel <= 8) { // Crossfader A/B

// } else if (note >= 48 && note <= 51) {

// } else if (
//     (note >= 58 && note <= 65) ||
//     (note == 80) || 
//     (note == 81) || 
//     (note >= 87 && note <= 91) || 
//     (note >= 93 && note <= 102) && 
//     (channel == 1)) {

//     } else {
//         script.log("No Mapping for this Midi Note found");
//     };

// 	script.log("Note on received "+channel+", "+note+", "+velocity);
// };

// function noteOffEvent(channel, note, velocity)
// {
// 	script.log("Note off received "+channel+", "+note+", "+velocity);
// };

function sysExEvent(data) // JUST LOGGING THIS FOR THE TIME BEING
{
    script.log("Sysex Message received, " + data.length + " bytes :");
    for (var i = 0; i < data.length; i++) {
        script.log(" > " + data[i]);
    };
};

/* function ccEvent(channel, number, value) {

    if (number == 7) { local.values.faders[ccAr[channel][number][0]].set(value); };
    if (number == 7 && channel <= 8) {x = "track" + channel; local.values.faders[x].set(value);
      
    };

}; */



/* function ccEvent(channel, number, value) {
    
    var x, y, z;

    if (number == 7 && channel <= 8) {                          // Track Faders
        x = "track" + channel; local.values.faders[x].set(value);
    } else if (number == 13 && channel == 1) {                  // Tempo Knob

    } else if (number == 14 && channel == 1) {                  // Master Fader
        local.values.faders.master.set(value);
    } else if (number == 15 && channel == 1) {                  // Crossfader
        local.values.faders.crossfader.set(value);
    } else if (number >= 16 && number <= 23 && channel <= 9) {
        x = number - 15;
        y = "_" + x + "_";
        if (channel == 1) {                                                             // Device Knobs All Modes
            local.values.knobs.deviceKnobs_Right_.track1_UsedByAllModes[y].set(value);
        } else if (channel >= 2 && channel <= 8) {                                      // Device Knobs Generic Mode (0) Tracks 2-8
            z = "track" + channel + "_GenericMode_0_Only";
            local.values.knobs.deviceKnobs_Right_[z][y].set(value);
        } else {                                                                        // Device Knobs Generic Mode (0) Master Track
            local.values.knobs.deviceKnobs_Right_.master_GenericMode_0_Only[y].set(value);
        };
    } else if (number >= 24 && number <= 31 && channel <= 9) {  // Device Knobs LED assignment
        if (channel == 1) {                                                             // Device Knobs All Modes
            x = number - 23;
            y = "_" + x + "_";
            local.parameters.lights.ledRingModes.deviceKnobs_Right_.track1_UsedByAllModes[y].set(value);
        } else if (channel >= 2 && channel <= 8) {                                      // Device Knobs Generic Mode (0) Tracks 2-8
            x = number - 23;
            y = "_" + x + "_";
            z = "track" + channel + "_GenericMode_0_Only";
            local.parameters.lights.ledRingModes.deviceKnobs_Right_[z][y].set(value);
        } else {                                                                        // Device Knobs Generic Mode (0) Master Track
            x = number - 23;
            y = "_" + x + "_";
            local.parameters.lights.ledRingModes.deviceKnobs_Right_.master_GenericMode_0_Only[y].set(value);
        };
    } else if (number == 47) {                                  // Cue Level

    } else if (number >= 48 && number <= 55 && channel == 1) {  // Track Knobs
        x = number - 47;
        y = "_" + x + "_";
        local.values.knobs.trackKnobs_Top_[y].set(value);
    } else if (number >= 56 && number <= 63 && channel == 1) {  // Track Knobs LED
        x = number - 55;
        y = "_" + x + "_";
        local.parameters.lights.ledRingModes.trackKnobs_Top_[y].set(value);
    } else if (number == 64 && channel == 1) {                  // Footswitch 

    } else {                                                    // No controller mapping
        script.log("No Mapping for this Midi CC found.");
    };
    script.log("ControlChange received " + channel + ", " + number + ", " + value);
}; */

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
    } else {
        local.logIncoming.set(false);
        local.logOutgoing.set(false);
        local.scripts.aPC40_MkII.enableLog.set(false);
    };
};

// UTILITIES // END /////////////////////////////

// TESTING //////////////////////////////////////

// var heirarchy = local.parameters.lights.getContainers();
// script.log(heirarchy);