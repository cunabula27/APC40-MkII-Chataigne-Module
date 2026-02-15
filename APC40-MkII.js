// GLOBAL VARIABLES //////////////////////////

var apcMode;
var padStyle;
var clipPress;
var clipLight;
var clipMode;
var scenePress;
var sceneLight;
var sceneMode;
var knobIndex;
var deviceRingIndex;

var buttons = [
    "pan", 87,
    "sends", 88,
    "user", 89,
    "metronome", 90,
    "play", 91,
    "record", 93,
    "session", 102,

    "tapTempo", 99,                         // Top, No Light
    "nudge", 100,                           // Top, No Light
    "nudge_", 101,                          // Top, No Light

    "_1_DeviceLeft", 58,
    "_2_DeviceRight", 59,
    "_3_BankLeft", 60,
    "_4_BankRight", 61,
    "_5_DeviceOn_Off", 62,
    "_6_DeviceLock", 63,
    "_7_Clip_DeviceView", 64,
    "_8_DetailView", 65,
    "bank", 103,
    "shift", 98,                            // Bottom, No Light

    "up", 94,                               // Bank Select, No Light
    "right", 96,                            // Bank Select, No Light
    "down", 95,                             // Bank Select, No Light
    "left", 97                              // Bank Select, No Light
];

// CHATAIGNE FUNCTIONS ///////////////////////

function init() {
    noteArr = noteArray();                                          // Create Note Buffer
    ccArr = ccArray();                                              // Create CC Buffer
    setInterface();                                                 // Tidy Interface
    var refresh = local.parameters.controllerMode.get()[0];         // Check if the Noisette is new
    if (refresh >= 0) {
        apcMode = setAPC40mode(refresh);                            // Reset Controller
        knobIndex = setKnobLayout(refresh);                         // Reload Knob Layout
        padStyle = setPadStyle(local.parameters.padLayout.get());   // Reload Pad Layout
    };
};

// MODULE SPECIFIC FUNCTIONS /////////////////

function moduleParameterChanged(param) {
    if (param.isParameter()) {
        if (param.name == "controllerMode") {
            apcMode = setAPC40mode(param.get()[0]);
            knobIndex = setKnobLayout(apcMode);
        } else if (param.name == "padLayout") {
            padStyle = setPadStyle(param.get());
        } else if (param.name == "debug") {
            debug(param);
        } else if (param.getParent().name == "setByGroup") {
            ringModeGroup(param);
        } else {
            ringModeSingle(param);
        };
    } else {
        clearPads(param);
    };
};

function moduleValueChanged(value) {
    if (local.parameters.utilities.manualControl.get() == true
        && (value.getControlAddress().contains("pads")
            || value.getControlAddress().contains("buttons"))) {

        var noteControl = parseNoteControl(noteArr, value);
        var n = noteControl[0];
        var control = noteControl[1];

        if ((n <= 39) || (n >= 82 && n <= 86)) {
            if (control == 1) {
                localNote(noteArr[n][2].get(), n, value.get());
            } else
                localNote(value.get(), n, noteArr[n][1].get());     // Nb. Secondary colour continues to light if Primary 'Off'
        } else if (n == 56 || n == 62) {
            localNote(control, n, value.get());
        } else if (n >= 48 && n <= 51) {
            localNote(control, n, value.get());
        } else {
            localNote(1, n, value.get());
        };
    };
    if (value.getParent().name.contains("Knobs")) {
        noteControl = parseNoteControl(ccArr, value);
        n = noteControl[0];
        c = noteControl[1];
        local.sendCC(c, n, Math.round(value.get() * 127));
    };
};

// MIDI MODULE SPECIFIC FUNCTIONS ////////////

function noteOnEvent(channel, pitch) {
    if ((pitch >= 48 && pitch <= 52) || (pitch == 66)) {            // Track Control Pads
        noteArr[pitch][channel][0].set(true);
    } else {                                                        // Any other buttons
        noteArr[pitch][0].set(true);
    };
};

function noteOffEvent(channel, pitch) {
    if ((pitch >= 48 && pitch <= 52) || (pitch == 66)) {            // Track Control Pads
        noteArr[pitch][channel][0].set(false);
    } else                                                          // Any other button
        noteArr[pitch][0].set(false);
};

function ccEvent(channel, number, value) {
    if (number == 7) {                                              // Track Faders 
        ccArr[number][channel][0].set(value / 127);
    } else if (number == 15) {                                      // Crossfader 
        ccArr[number][0].set((value / 127) * 2 - 1);
    } else if ((number == 13 || number == 47)) {                    // Tempo and Cue Level
        if (value > 63) { value = value - 128; };
        ccArr[number][0].set(value);
    } else if ((number == 14) || (number >= 48 && number <= 55)) {  // Master Fader and Track Knobs
        ccArr[number][0].set(value / 127);
    } else if (number >= 16 && number <= 23) {                      // Device Knobs
        ccArr[number][channel].set(value / 127);
    } else                                                          // Footswitch
        ccArr[number][0].set(value);
};

// THIS MODULE SPECIFIC FUNCTIONS ////////////

// SETUP /////////////////////////////////////

function noteArray() {                      // Note Buffer

    /* CONSTRUCT NOTE ARRAY AND POPULATE /////
    
    Format is:
    
    noteArr[MIDI Note][0] Press
                      [1] Light
                      [2] Mode (if available)
                    
    For notes that cover multiple tracks, format is:
    
    noteArr[MIDI Note][Track Number][0] Press
                                    [1] Light
                                                                
    ////////////////////////////////////////*/

    var noteArr = [];

    for (var i = 0; i < 104; i++) { noteArr[i] = []; };

    for (var i = 48; i < 53; i++) { noteArr[i] = [[], [], [], [], [], [], [], [], []]; };

    noteArr[66] = [[], [], [], [], [], [], [], [], []];

    for (var i = 1; i < 9; i++) {
        var name = "track" + i;
        noteArr[48][i][0] = local.values.pads.trackControls.record_Arm__.press.getChild(name);
        noteArr[48][i][1] = local.values.pads.trackControls.record_Arm__.light.getChild(name);
        noteArr[49][i][0] = local.values.pads.trackControls.solo_S_.press.getChild(name);
        noteArr[49][i][1] = local.values.pads.trackControls.solo_S_.light.getChild(name);
        noteArr[50][i][0] = local.values.pads.trackControls.mute_1_8_.press.getChild(name);
        noteArr[50][i][1] = local.values.pads.trackControls.mute_1_8_.light.getChild(name);
        noteArr[51][i][0] = local.values.pads.trackControls.trackSelectors.press.getChild(name);
        noteArr[51][i][1] = local.values.pads.trackControls.trackSelectors.light.getChild(name);
        noteArr[52][i][0] = local.values.pads.clipStop.press.getChild(name);
        noteArr[52][i][1] = local.values.pads.clipStop.light.getChild(name);
        noteArr[66][i][0] = local.values.pads.trackControls.crossfadeAssign_AB_.press.getChild(name);
        noteArr[66][i][1] = local.values.pads.trackControls.crossfadeAssign_AB_.light.getChild(name);
    };

    for (var i = 0; i < 20; i = i + 2) {
        noteArr[buttons[i + 1]][0] = local.values.buttons.topSection.press.getChild(buttons[i]);
    };

    for (var i = 0; i < 14; i = i + 2) {
        noteArr[buttons[i + 1]][1] = local.values.buttons.topSection.light.getChild(buttons[i]);
    };

    for (var i = 20; i < 40; i = i + 2) {
        noteArr[buttons[i + 1]][0] = local.values.buttons.bottomSection.press.getChild(buttons[i]);
    };
    for (var i = 20; i < 38; i = i + 2) {
        noteArr[buttons[i + 1]][1] = local.values.buttons.bottomSection.light.getChild(buttons[i]);
    };

    for (var i = 40; i < 48; i = i + 2) {
        noteArr[buttons[i + 1]][0] = local.values.buttons.bankSelect.getChild(buttons[i]);
    };

    noteArr[80][0] = local.values.pads.trackControls.trackSelectors.press.master;
    noteArr[80][1] = local.values.pads.trackControls.trackSelectors.light.master;
    noteArr[81][0] = local.values.pads.clipStop.press.stopAllClips;

    noteArr[40][0] = local.parameters.clearAndResetPads.clearClipPads;
    noteArr[40][1] = local.parameters.clearAndResetPads.clearScenePads;
    noteArr[40][2] = local.parameters.clearAndResetPads.resetClipPadMode;
    noteArr[40][3] = local.parameters.clearAndResetPads.resetScenePadMode;

    return noteArr;
};

function ccArray() {                        // CC Buffer

    /* CONSTRUCT CC ARRAY AND POPULATE ///////

    Format is:
    
    ccArr[MIDI Note][0] value
                    [1] param 
                    
    For CC Notes that cover multiple tracks, format is:

    ccArr[MIDI Note][Track Number][0] value
                                  [1] param
                                  
    ////////////////////////////////////////*/

    var ccArr = [];

    for (var i = 0; i < 65; i++) { ccArr[i] = []; };

    ccArr[7] = [[], [], [], [], [], [], [], [], []];

    for (var i = 16; i < 32; i++) { ccArr[i] = [[], [], [], [], [], [], [], [], [], []]; };

    for (var i = 1; i < 9; i++) {               // Track Fader
        var name = "track" + i;
        ccArr[7][i][0] = local.values.faders.getChild(name);
    };

    ccArr[13][0] = local.values.knobs.rotaryEncoders.tempo;
    ccArr[14][0] = local.values.faders.master;
    ccArr[15][0] = local.values.faders.crossfader;

    ccArr[47][0] = local.values.knobs.rotaryEncoders.cueLevel;

    for (var i = 48; i < 56; i++) {
        var name = "_" + (i - 47) + "_";
        ccArr[i][0] = local.values.knobs.trackKnobs_Top_.getChild(name);
    };

    for (var i = 56; i < 64; i++) {
        var name = "_" + (i - 55) + "_";
        ccArr[i][0] = local.parameters.ledRingModes.trackKnobs_Top_.getChild(name);
    };

    ccArr[64][0] = local.values.buttons.footswitch.footswitch;

    ccArr[40][0] = local.parameters.ledRingModes.setByGroup.getChild("allTrackKnobs_Top_");
    ccArr[40][10] = local.parameters.ledRingModes.setByGroup.getChild("allDeviceKnobs_Right_");
    ccArr[40][11] = local.parameters.ledRingModes.setByGroup.getChild("all");

    return ccArr;
};

function setInterface() {                   // Tidy Interface

    local.parameters.pass_through.setCollapsed(true);
    local.values.infos.setCollapsed(true);
    local.values.tempo.setCollapsed(true);
    local.values.mtc.setCollapsed(true);
    local.scripts.setCollapsed(true);
    local.commandTester.setCollapsed(true);
    local.templates.setCollapsed(true);
};

function setAPC40mode(mode) {               // Set APC40 Mode, Return apcMode
    var modeSysex = mode + 64;
    var modeNames = ["Generic", "Ableton Live", "Alternate Ableton Live"];
    local.sendSysex(71, 127, 41, 96, 0, 4, modeSysex, 8, 2, 1);
    script.log("APC40 MkII set to " + modeNames[mode] + " Mode with Sysex Message ");
    return mode;
};

function setKnobLayout(apcMode) {           // Create and name Knobs depending on APC40 Mode
    for (var i = 16; i < 24; i++) { ccArr[i][0] = [true]; }
    for (var i = 24; i < 32; i++) { ccArr[i][0] = [true]; }
    if (apcMode == 0) {                    // Generic Mode

        for (var i = 1; i < 9; i++) {       // Remove Device Knobs One Bank Ring and Values
            name = "(" + i + ")";
            local.values.knobs.deviceKnobs_Right_.removeParameter(name);
            local.parameters.ledRingModes.deviceKnobs_Right_.removeParameter(name);
        };

        for (var j = 1; j < 9; j++) {       // Add Tracks 1-8 to Ring And Values
            for (var i = 1; i < 9; i++) {
                var name = "Track " + j + " (" + i + ")";
                var desc = "Track " + j + ", Knob " + i;
                local.values.knobs.deviceKnobs_Right_.addFloatParameter(name, desc, 0, 0, 1);
                local.parameters.ledRingModes.deviceKnobs_Right_.addEnumParameter(name, desc, "Single", 1, "Volume", 2, "Pan", 3, "Off", 0);
            };
        };

        for (var i = 1; i < 9; i++) {       // Add Master to Ring And Values
            name = "Master (" + i + ")";
            desc = "Master, Knob " + i;
            local.values.knobs.deviceKnobs_Right_.addFloatParameter(name, desc, 0, 0, 1);
            local.parameters.ledRingModes.deviceKnobs_Right_.addEnumParameter(name, desc, "Single", 1, "Volume", 2, "Pan", 3, "Off", 0);
        };

        for (var i = 1; i < 9; i++) {       // Add Tracks 1-8 Or Group Set
            name = "Track " + i;
            desc = "Set LED Ring Mode";
            local.parameters.ledRingModes.setByGroup.addEnumParameter(name, desc, "Single", 1, "Volume", 2, "Pan", 3, "Off", 0);
            ccArr[40][i] = local.parameters.ledRingModes.setByGroup.getChild(name);
        };

        local.parameters.ledRingModes.setByGroup.addEnumParameter("Master", "Set Master Knob Rings", "Single", 1, "Volume", 2, "Pan", 3, "Off", 0);
        ccArr[40][9] = local.parameters.ledRingModes.setByGroup.master;
        knobIndex = local.values.knobs.deviceKnobs_Right_.getControllables(true, false);
        deviceRingIndex = local.parameters.ledRingModes.deviceKnobs_Right_.getControllables(true, false);

        var r = -1;
        for (var y = 1; y < 10; y++) {
            for (var x = 16; x < 24; x++) {
                r++;
                ccArr[x][y] = knobIndex[r];
                ccArr[x + 8][y] = deviceRingIndex[r];
            };
        };

    } else if (apcMode > 0) {

        for (j = 1; j < 9; j++) {
            for (var i = 1; i < 9; i++) {
                name = "Track " + j + " (" + i + ")";
                local.values.knobs.deviceKnobs_Right_.removeParameter(name);
                local.parameters.ledRingModes.deviceKnobs_Right_.removeParameter(name);
            };
        };

        for (var i = 1; i < 9; i++) {
            name = "Master (" + i + ")";
            local.values.knobs.deviceKnobs_Right_.removeParameter(name);
            local.parameters.ledRingModes.deviceKnobs_Right_.removeParameter(name);
        };

        for (var i = 1; i < 9; i++) {
            name = name = "track" + i;
            local.parameters.ledRingModes.setByGroup.removeParameter(name);
        };

        local.parameters.ledRingModes.setByGroup.removeParameter("master");

        for (var i = 1; i < 9; i++) {
            name = "(" + i + ")";
            desc = "Device Knob " + i;
            local.values.knobs.deviceKnobs_Right_.addFloatParameter(name, desc, 0, 0, 1);
            local.parameters.ledRingModes.deviceKnobs_Right_.addEnumParameter(name, desc, "Single", 1, "Volume", 2, "Pan", 3, "Off", 0);
        };

        knobIndex = local.values.knobs.deviceKnobs_Right_.getControllables(true, false);
        deviceRingIndex = local.parameters.ledRingModes.deviceKnobs_Right_.getControllables(true, false);

        for (var i = 16; i < 24; i++) {
            ccArr[i][1] = knobIndex[i - 16];
            ccArr[i + 8][1] = deviceRingIndex[i - 16];
        };
    };
    return knobIndex;
};

function setPadStyle(padStyle) {            // Create and name Clip and Scene Launch Pads 

    var descPress = "Press the button, you know you want to.";
    var descLight = "Choose the pad colour.";
    var descMode = "Set the way the pad lights.";

    local.values.pads.clipLaunch.press.clear(false, true);
    local.values.pads.clipLaunch.light.clear(false, true);
    local.values.pads.clipLaunch.mode.clear(false, true);

    local.values.pads.sceneLaunch.press.clear(false, true);
    local.values.pads.sceneLaunch.light.clear(false, true);
    local.values.pads.sceneLaunch.mode.clear(false, true);

    if (padStyle == 1) {                    // Ableton Style
        for (j = 1; j < 9; j++) {
            for (k = 1; k < 6; k++) {       // Create Clip Launch Controls
                var name = "Track " + j + " > Clip " + k;
                constructClipLaunch(name, descPress, descLight, descMode);
            };
        };

        for (i = 1; i < 6; i++) {           // Create Scene Launch Controls
            name = "Scene " + i;
            constructSceneLaunch(name, descPress, descLight, descMode);
        };

        var padIndex = [];
        for (var x = 0; x < 8; x++) {
            for (var y = 32; y >= 0; y = y - 8) {
                padIndex.push(x + y);
            };
        };

        clipPress = local.values.pads.clipLaunch.press.getControllables(true, false);
        clipLight = local.values.pads.clipLaunch.light.getControllables(true, false);
        clipMode = local.values.pads.clipLaunch.mode.getControllables(true, false);

        scenePress = local.values.pads.sceneLaunch.press.getControllables(true, false);
        sceneLight = local.values.pads.sceneLaunch.light.getControllables(true, false);
        sceneMode = local.values.pads.sceneLaunch.mode.getControllables(true, false);

        for (var i = 0; i < 40; i++) {
            noteArr[padIndex[i]][0] = clipPress[i];
            clipPress[i].setAttribute("readonly", true);
            noteArr[padIndex[i]][1] = clipLight[i];
            noteArr[padIndex[i]][2] = clipMode[i];
        };

        for (var i = 0; i < 5; i++) {
            noteArr[i + 82][0] = scenePress[i];
            scenePress[i].setAttribute("readonly", true);
            noteArr[i + 82][1] = sceneLight[i];
            noteArr[i + 82][2] = sceneMode[i];
        };

    } else if (padStyle == 2) {             // Resolume Style

        for (k = 1; k < 6; k++) {
            for (j = 1; j < 9; j++) {
                name = "Layer " + k + " > Clip " + j;
                constructClipLaunch(name, descPress, descLight, descMode);
            };
        };

        for (var i = 1; i < 6; i++) {       // Create Scene Launch Controls
            name = "Layer " + i;
            constructSceneLaunch(name, descPress, descLight, descMode);
        };

        clipPress = local.values.pads.clipLaunch.press.getControllables(true, false);
        clipLight = local.values.pads.clipLaunch.light.getControllables(true, false);
        clipMode = local.values.pads.clipLaunch.mode.getControllables(true, false);

        scenePress = local.values.pads.sceneLaunch.press.getControllables(true, false);
        sceneLight = local.values.pads.sceneLaunch.light.getControllables(true, false);
        sceneMode = local.values.pads.sceneLaunch.mode.getControllables(true, false);

        for (var i = 0; i < 40; i++) {
            noteArr[i][0] = clipPress[i];
            clipPress[i].setAttribute("readonly", true);
            noteArr[i][1] = clipLight[i];
            noteArr[i][2] = clipMode[i];
        };

        var j = 5;

        for (var i = 0; i < 5; i++) {
            j--;
            noteArr[i + 82][0] = scenePress[j];
            scenePress[j].setAttribute("readonly", true);
            noteArr[i + 82][1] = sceneLight[j];
            noteArr[i + 82][2] = sceneMode[j];
        };

    } else if (padStyle == 0) {             // Default

        for (k = 1; k < 6; k++) {
            for (j = 1; j < 9; j++) {
                name = "Row " + k + " > Clip " + j;
                constructClipLaunch(name, descPress, descLight, descMode);
            };
        };

        for (var i = 1; i < 6; i++) {       // Create Scene Launch Controls
            name = "Row " + i;
            constructSceneLaunch(name, descPress, descLight, descMode);
        };

        var padIndex = [];
        for (var y = 32; y >= 0; y = y - 8) {
            for (var x = 0; x < 8; x++) {
                padIndex.push(x + y);
            };
        };

        clipPress = local.values.pads.clipLaunch.press.getControllables(true, false);
        clipLight = local.values.pads.clipLaunch.light.getControllables(true, false);
        clipMode = local.values.pads.clipLaunch.mode.getControllables(true, false);

        scenePress = local.values.pads.sceneLaunch.press.getControllables(true, false);
        sceneLight = local.values.pads.sceneLaunch.light.getControllables(true, false);
        sceneMode = local.values.pads.sceneLaunch.mode.getControllables(true, false);

        for (var i = 0; i < 40; i++) {
            noteArr[i][0] = clipPress[padIndex[i]];
            clipPress[i].setAttribute("readOnly", true);
            noteArr[i][1] = clipLight[padIndex[i]];
            noteArr[i][2] = clipMode[padIndex[i]];
        };

        for (var i = 0; i < 5; i++) {
            noteArr[i + 82][0] = scenePress[i];
            scenePress[i].setAttribute("readOnly", true);
            noteArr[i + 82][1] = sceneLight[i];
            noteArr[i + 82][2] = sceneMode[i];
        };
    };
    return padStyle;
};

// UTILITIES /////////////////////////////////

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

// LIGHT PARAMS //////////////////////////////

function clearPads(param) {
    if (param.name.contains("Clip")) {
        if (noteArr[40][0]) {
            for (var i = 0; i < 40; i++) {
                local.sendNoteOff(1, i);
            };
        } else { local.sendNoteOn(1, i, noteArr[i][1]); }
    } else {
        if (noteArr[40][1]) {
            for (var i = 82; i < 87; i++) {
                local.sendNoteOff(1, i);
            };
        } else { local.sendNoteOn(1, i, noteArr[i][1]); }
    };
};

function ringModeSingle(param) {
    var noteControl = parseNoteControl(ccArr, param);
    var n = noteControl[0];
    var c = noteControl[1];
    local.sendCC(c, n, param.get());
};

function ringModeGroup(param) {
    if (param == ccArr[40][11]) {
        ringModeGroupTrack(param);
        ringModeGroupDevice(param);
    } else if (param == ccArr[40][0]) {
        ringModeGroupTrack(param);
    } else {
        ringModeGroupDevice(param);
    };
};

function ringModeGroupTrack(param) {
    for (var i = 56; i < 64; i++) {
        ccArr[i][0].setData(param.get());
    };
};

function ringModeGroupDevice(param) {
    if (param == ccArr[40][10] || param == ccArr[40][11]) {
        for (var i = 0; i < deviceRingIndex.length; i++) {
            deviceRingIndex[i].setData(param.get());
        };
    } else {
        var noteControl = parseNoteControl(ccArr, param);
        var c = noteControl[1];
        for (var i = c * 8 - 8; i < c * 8; i++) {
            deviceRingIndex[i].setData(param.get());
        };
    };
};

// COMMANDS //////////////////////////////////

function setClipLaunch(padStyle, row, track, layer, clipr, clipt, clipl, v, c) {
    if (padStyle == 0) {                    // Default
        n = (5 - row) * 8 + clipr - 1;
    } else if (padStyle == 1) {             // Ableton
        n = 40 - clipt * 8 + track - 1;
    } else if (padStyle == 2) {             // Resolume
        n = (layer - 1) * 8 + clipl - 1;
    };
    localNote(c, n, v);
};

function setSceneLaunch(padStyle, row, scene, layer, v, c) {
    if (padStyle == 0) {
        n = row;
    } else if (padStyle == 1) {
        n = scene;
    } else if (padStyle == 2) {
        n = layer;
    };
    localNote(c, n, v);
};

function setClipStop(c, state, onoff) {
    if (c == 81) { c = 1; n = 81; v = onoff; }
    else { n = 52; v = state; };
    localNote(c, n, v);
};

function setTrackSelect(c, v) {
    var n = 51;
    if (c == 9) { c = 1; n = 80; };
    localNote(c, n, v);
};

function setTrackControl(c, n, crossf, onoff) {
    if (n == 66) { v = crossf; } else { v = onoff; };
    localNote(c, n, v);
};

function setButtonLed(n, v) {
    var c = 1;
    localNote(c, n, v);
};

function localNote(c, n, v) {
    if (v > 0) {
        local.sendNoteOn(c, n, v);
    } else {
        local.sendNoteOff(c, n);
    };
};

// HELPERS ///////////////////////////////////

function parseNoteControl(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        var controlType = arr[i];                               // Find Note
        for (j = 0; j < controlType.length; j++) {              // Find Control
            if (controlType[j] == value) { return [i, j]; };
            var thirdLevel = controlType[j];
            for (k = 0; k < thirdLevel.length; k++) {           // Find Value if Track Control
                if (thirdLevel[k] == value) { return [i, j]; };
            };
        };
    };
};

function constructSceneLaunch(name, descPress, descLight, descMode) {
    local.values.pads.sceneLaunch.press.addBoolParameter(name, descPress, false);
    local.values.pads.sceneLaunch.light.addIntParameter(name, descLight, 0, 0, 127);
    local.values.pads.sceneLaunch.mode.addEnumParameter(name, descMode,
        "Primary Colour", 0,
        "Secondary Colour - Oneshot 1/24", 1,
        "Secondary Colour - Oneshot 1/16", 2,
        "Secondary Colour - Oneshot 1/8", 3,
        "Secondary Colour - Oneshot 1/4", 4,
        "Secondary Colour - Oneshot 1/2", 5,
        "Secondary Colour - Pulsing 1/24", 6,
        "Secondary Colour - Pulsing 1/16", 7,
        "Secondary Colour - Pulsing 1/8", 8,
        "Secondary Colour - Pulsing 1/4", 9,
        "Secondary Colour - Pulsing 1/2", 10,
        "Secondary Colour - Blinking 1/24", 11,
        "Secondary Colour - Blinking 1/16", 12,
        "Secondary Colour - Blinking 1/8", 13,
        "Secondary Colour - Blinking 1/4", 14,
        "Secondary Colour - Blinking 1/2", 15
    );
};

function constructClipLaunch(name, descPress, descLight, descMode) {
    local.values.pads.clipLaunch.press.addBoolParameter(name, descPress, false);
    local.values.pads.clipLaunch.light.addIntParameter(name, descLight, 0, 0, 127);
    local.values.pads.clipLaunch.mode.addEnumParameter(name, descMode,
        "Primary Colour", 0,
        "Secondary Colour - Oneshot 1/24", 1,
        "Secondary Colour - Oneshot 1/16", 2,
        "Secondary Colour - Oneshot 1/8", 3,
        "Secondary Colour - Oneshot 1/4", 4,
        "Secondary Colour - Oneshot 1/2", 5,
        "Secondary Colour - Pulsing 1/24", 6,
        "Secondary Colour - Pulsing 1/16", 7,
        "Secondary Colour - Pulsing 1/8", 8,
        "Secondary Colour - Pulsing 1/4", 9,
        "Secondary Colour - Pulsing 1/2", 10,
        "Secondary Colour - Blinking 1/24", 11,
        "Secondary Colour - Blinking 1/16", 12,
        "Secondary Colour - Blinking 1/8", 13,
        "Secondary Colour - Blinking 1/4", 14,
        "Secondary Colour - Blinking 1/2", 15
    );
};

/////////////////////////////////////// FIN //

