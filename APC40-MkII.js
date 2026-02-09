// GLOBAL VARIABLES //////////////////////////

var apcMode = 0; // TODO add check to see if Device Knob messages over 1 are rejected or not.

var buttons = [
    "pan", 87,
    "sends", 88,
    "user", 89,
    "metronome", 90,
    "play", 91,
    "record", 93,
    "session", 102,

    "tapTempo", 99,     // Top, No Light
    "nudge", 100,       // Top, No Light
    "nudge_", 101,      // Top, No Light

    "_1_DeviceLeft", 58,
    "_2_DeviceRight", 59,
    "_3_BankLeft", 60,
    "_4_BankRight", 61,
    "_5_DeviceOn_Off", 62,
    "_6_DeviceLock", 63,
    "_7_Clip_DeviceView", 64,
    "_8_DetailView", 65,
    "bank", 103,
    "shift", 98,        // Bottom, No Light

    "up", 94,           // Bank Select, No Light
    "right", 96,        // Bank Select, No Light
    "down", 95,         // Bank Select, No Light
    "left", 97          // Bank Select, No Light
];

// CHATAIGNE FUNCTIONS ///////////////////////

// SETUP /////////////////////////////////////

function noteArray() {                      // Create Note Buffer

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

    return noteArr;
};

function ccArray() {                        // Create CC Buffer

    /* CONSTRUCT CC ARRAY AND POPULATE ///////

    Format is:
    
    ccArr[MIDI Note][0] value
                    [1] param 
                    
    For CC Notes that cover multiple tracks, format is:

    ccArr[MIDI Note][Track Number][0] value
                                  [1] param
    */

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

    return ccArr;
};

function setInterface() {                   // Tidy Interface - Move to JSON?

    local.parameters.pass_through.setCollapsed(true);
    local.values.infos.setCollapsed(true);
    local.values.tempo.setCollapsed(true);
    local.values.mtc.setCollapsed(true);
    // local.scripts.setCollapsed(true);
    local.commandTester.setCollapsed(true);
    local.templates.setCollapsed(true);
};

function setAPC40mode(mode) {               // Set Mode, populate all necessary knobs, delete those that have been created and aren't needed.

    local.sendSysex(71, 127, 41, 96, 0, 4, mode[0], 8, 2, 1);
    script.log("APC40 MkII set to " + mode[1] + " Mode with Sysex Message ");
    if (mode[0] == 64) {                    // Generic Mode
        
        for (var i = 1; i < 9; i++) {       // Remove Device Knobs One Bank Ring and Values
            name = "(" + i + ")";
            local.values.knobs.deviceKnobs_Right_.removeParameter(name);
            local.parameters.ledRingModes.deviceKnobs_Right_.removeParameter(name);
        };

        for (var j = 1; j < 9; j++) {       // Add Tracks 1-8 to Ring And Values
            for (i = 1; i < 9; i++) {
                var name = "Track " + j + " (" + i + ")";
                var desc = "Track " + j + ", Knob " + i;
                local.values.knobs.deviceKnobs_Right_.addFloatParameter(name, desc, 0, 0, 1);
                local.parameters.ledRingModes.deviceKnobs_Right_.addEnumParameter(name, desc, "Single", 1, "Volume", 2, "Pan", 3, "Off", 0);
            };
        };

        for (i = 1; i < 9; i++) {           // Add Master to Ring And Values
            name = "Master (" + i + ")";
            desc = "Master, Knob " + i;
            local.values.knobs.deviceKnobs_Right_.addFloatParameter(name, desc, 0, 0, 1);
            local.parameters.ledRingModes.deviceKnobs_Right_.addEnumParameter(name, desc, "Single", 1, "Volume", 2, "Pan", 3, "Off", 0);
        };

        for (i=1;i<9;i++){                  // Add Tracks 1-8 Or Group Set
            name = "Track " + i;
            desc = "Set LED Ring Mode";
            local.parameters.ledRingModes.setByGroup.addEnumParameter(name, desc, "Single", 1, "Volume", 2, "Pan", 3, "Off", 0);
        };

        local.parameters.ledRingModes.setByGroup.addEnumParameter("Master", "Set Master Knob Rings", "Single", 1, "Volume", 2, "Pan", 3, "Off", 0);
        
        var knobIndex = local.values.knobs.deviceKnobs_Right_.getControllables(true, false);

        var ringIndex = local.parameters.ledRingModes.deviceKnobs_Right_.getControllables(true, false);
        
        var r = -1;
        for (var y = 1; y < 10; y++) {
            for (var x = 16; x < 24; x++) {
                r++;
                ccArr[x][y] = knobIndex[r];
                ccArr[x + 8][y] = ringIndex[r];
            };
        };

       script.log(ccArr);

    } else if (mode[0] > 0) {

        for (j = 1; j < 9; j++) {
            for (i = 1; i < 9; i++) {
                name = "Track " + j + " (" + i + ")";
                local.values.knobs.deviceKnobs_Right_.removeParameter(name);
                local.parameters.ledRingModes.deviceKnobs_Right_.removeParameter(name);
            };
        };

        for (i = 1; i < 9; i++) {
            name = "Master (" + i + ")";
            local.values.knobs.deviceKnobs_Right_.removeParameter(name);
            local.parameters.ledRingModes.deviceKnobs_Right_.removeParameter(name);
        };

        for (i = 1; i < 9; i++) {
            name = name = "track" + i;
            local.parameters.ledRingModes.setByGroup.removeParameter(name);
        };

        local.parameters.ledRingModes.setByGroup.removeParameter("master");

        for (i = 1; i < 9; i++) {
            name = "(" + i + ")";
            desc = "Device Knob " + i;
            local.values.knobs.deviceKnobs_Right_.addFloatParameter(name, desc, 0, 0, 1);
            local.parameters.ledRingModes.deviceKnobs_Right_.addEnumParameter(name, desc, "Single", 1, "Volume", 2, "Pan", 3, "Off", 0);
        };
        
        knobIndex = local.values.knobs.deviceKnobs_Right_.getControllables(true, false);
        ringIndex = local.parameters.ledRingModes.deviceKnobs_Right_.getControllables(true, false);
        
        for (i = 48; i < 56; i++) {
             ccArr[i][0] = knobIndex[i - 48];
            ccArr[i + 8][0] = ringIndex[i - 48];
         };
    };
    return parseInt(mode[0]) - 64;
};

function setPadStyle(style) {               // Rename Clip and Scene Launch Pads

    var descPress = "Press the button, you know you want to.";
    var descLight = "Choose the pad colour.";
    var descMode = "Set the way the pad lights.";

    local.values.pads.clipLaunch.press.clear(false, true);
    local.values.pads.clipLaunch.light.clear(false, true);
    local.values.pads.clipLaunch.mode.clear(false, true);

    local.values.pads.sceneLaunch.press.clear(false, true);
    local.values.pads.sceneLaunch.light.clear(false, true);
    local.values.pads.sceneLaunch.mode.clear(false, true);

    if (style.get() == "0") {                       // Ableton Style
        for (j = 1; j < 9; j++) {
            for (k = 1; k < 6; k++) {               // Create Clip Launch Controls

                var name = "Track " + j + " > Clip " + k;
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
        };

        for (i = 1; i < 6; i++) {                   // Create Scene Launch Controls
            name = "Scene " + i;
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

        var padIndex = [];
        for (var x = 0; x < 8; x++) {
            for (var y = 32; y >= 0; y = y - 8) {
                padIndex.push(x + y);
            };
        };

        var clipPress = local.values.pads.clipLaunch.press.getControllables(true, false);
        var clipLight = local.values.pads.clipLaunch.light.getControllables(true, false);
        var clipMode = local.values.pads.clipLaunch.mode.getControllables(true, false);

        var scenePress = local.values.pads.sceneLaunch.press.getControllables(true, false);
        var sceneLight = local.values.pads.sceneLaunch.light.getControllables(true, false);
        var sceneMode = local.values.pads.sceneLaunch.mode.getControllables(true, false);

        for (i = 0; i < 40; i++) {
            noteArr[i][0] = clipPress[i];
            clipPress[i].setAttribute("readonly", true);
            noteArr[i][1] = clipLight[i];
            noteArr[i][2] = clipMode[i];
        };

        for (i = 0; i < 5; i++) {
            noteArr[i + 82][0] = scenePress[i];
            scenePress[i].setAttribute("readonly", true);
            noteArr[i + 82][1] = sceneLight[i];
            noteArr[i + 82][2] = sceneMode[i];
        };

    } else if (style.get() == "1") {                // Resolume Style

        for (k = 1; k < 6; k++) {
            for (j = 1; j < 9; j++) {
                name = "Layer " + k + " > Clip " + j;
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
        };

        for (i = 1; i < 6; i++) {                 // Create Scene Launch Controls
            name = "Layer " + i;
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

        padIndex = [];
        for (var y = 32; y >= 0; y = y - 8) {
            for (var x = 0; x < 8; x++) {
                padIndex.push(x + y);
            };
        };

        var clipPress = local.values.pads.clipLaunch.press.getControllables(true, false);
        var clipLight = local.values.pads.clipLaunch.light.getControllables(true, false);
        var clipMode = local.values.pads.clipLaunch.mode.getControllables(true, false);

        var scenePress = local.values.pads.sceneLaunch.press.getControllables(true, false);
        var sceneLight = local.values.pads.sceneLaunch.light.getControllables(true, false);
        var sceneMode = local.values.pads.sceneLaunch.mode.getControllables(true, false);

        for (i = 0; i < 40; i++) {
            noteArr[i][0] = clipPress[i];
            clipPress[i].setAttribute("readonly", true);
            noteArr[i][1] = clipLight[i];
            noteArr[i][2] = clipMode[i];
        };

        var j = 5;

        for (i = 0; i < 5; i++) {
            j--;
            noteArr[i + 82][0] = scenePress[j];
            scenePress[j].setAttribute("readonly", true);
            noteArr[i + 82][1] = sceneLight[j];
            noteArr[i + 82][2] = sceneMode[j];
        };
    
    } else if (style.get() == "2") {                // Default

        for (k = 1; k < 6; k++) {
            for (j = 1; j < 9; j++) {
                name = "Row " + k + " > Clip " + j;
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
        };

        for (i = 1; i < 6; i++) {                 // Create Scene Launch Controls
            name = "Row " + i;
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

        for (i = 0; i < 40; i++) {
            noteArr[i][0] = clipPress[i];
            clipPress[i].setAttribute("readOnly", true);
            noteArr[i][1] = clipLight[i];
            noteArr[i][2] = clipMode[i];
        };

        for (i = 0; i < 5; i++) {
            noteArr[i + 82][0] = scenePress[i];
            scenePress[i].setAttribute("readOnly", true);
            noteArr[i + 82][1] = sceneLight[i];
            noteArr[i + 82][2] = sceneMode[i];
        };
    };
};

noteArr = noteArray();
ccArr = ccArray();

setInterface();                             // Tidy Interface - Move to JSON?

// UTILITIES /////////////////////////////////

function debug(param) 
{
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

// MODULE SPECIFIC FUNCTIONS /////////////////

function moduleParameterChanged(param) {
    if (param.isParameter()) {
        if (param.name == "controllerMode") {
            apcMode = setAPC40mode(param.get());
        } else if (param.name == "padLayout") {
            setPadStyle(param);
        } else if (param.name == "debug") {
            debug(param);
        } 
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        else if (param.getControlAddress().contains("led")) {
            if (param.name == "all") {
                ringModeGroup(param, param.get());
            } else {
                ringModeSingle(param);
            };
        } else if (param.name.charAt(0) == "l") {
            lightRgb(param);
        } else if (param.type == "Enum") {
            lightTri(param); // Three state button
        } else {
            lightBin(param); // Binary button
        };
        script.log("Module parameter changed : " + param.name + " > " + param.get());
    } else {
        if (param == noteArr[40][0]) { // Clear all Pads
            for (var i = 3; i < 15; i++) {
                noteArr[40][i].trigger();
            };
        } else
        if (param == noteArr[40][1]) { // Clear all Track Controls
            for (var i = 6; i < 11; i++) {
                noteArr[40][i].trigger();
            };
        } else
            if (param == noteArr[40][2]) { // Clear all Buttons
                noteArr[40][11].trigger();
                noteArr[40][12].trigger();
        } else { 
            clearBank(param); 
            script.log("Module parameter triggered : " + param.name); 
        };
    };
};
 
function moduleValueChanged(value) {
    
    if (value.getControlAddress().contains("knob")) {
        var channel = 1;
        var note;
        if (value.getParent().name == "trackKnobs_Top_") {
            note = parseInt(value.name.charAt(1)) + 47;
        } else {
            channel = parseInt(value.getParent().name.charAt(5));
            if (!channel) { channel = 9; };                     // Master
            note = parseInt(value.name.charAt(1)) + 15;
        };
        local.sendCC(channel, note, Math.round(value.get() * 127));
    };
};

// MIDI MODULE SPECIFIC FUNCTIONS ////////////

function noteOnEvent(channel, pitch, velocity) {
    if (noteArr[pitch][0])                                          // Check Mapping
    {
        if ((pitch <= 39) || (pitch >= 82 && pitch <= 86)) {        // RGB Buttons
            noteArr[pitch][0].set(velocity);
        } else if (pitch >= 48 && pitch <= 51 && channel <= 8) {    // Track Control Pads
            noteArr[pitch][channel][0].set(velocity);
        } else if (pitch == 52 && channel <= 8) {                   // Clip Stop Pad
            noteArr[pitch][channel][0].setData(velocity);
        } else if (pitch == 66 && channel <= 8) {                   // Crossfader A/B
            noteArr[pitch][channel][0].set(127);
        } else if (channel == 1) {                                  // Any other button
            noteArr[pitch][0].set(velocity);
        } else { script.log("No mapping for this Midi Note found"); };
    } else {
        script.log("No mapping for this Midi Note found");
    };
};

function noteOffEvent(channel, pitch, velocity) {
    if (noteArr[pitch][0]) // Check Mapping
    {
        if ((pitch <= 39) || (pitch >= 82 && pitch <= 86)) { // RGB Pad no change to channel just in case
            noteArr[pitch][0].set(velocity);
        } else if ((pitch >= 48 && pitch <= 51 && channel <= 8) || (pitch == 66 && channel <= 8)) {
            noteArr[pitch][channel][0].set(velocity);
        } else if ((pitch == 52 && channel <= 8) || (pitch == 66 && channel <= 8)) {
            noteArr[pitch][channel][0].set(0);
        } else if (channel == 1) { 
            noteArr[pitch][0].set(velocity);
        } else { script.log("No mapping for this Midi Note found"); };
    } else {
        script.log("No mapping for this Midi Note found");
    };
};

function ccEvent(channel, number, value) {
    if (ccArr[number][0])                                               // Remove Completely unmapped CCs
    {
        if (number >= 24 && number <= 31 && channel <= 9) {             // Device Knobs LED Mode
            if (value >= 4) { var norm = 1; } else { norm = value; }
            ccArr[number][channel][1].set(norm);
        } else if (number >= 56 && number <= 63 && channel == 1) {      // Track Knobs LED Mode
            if (value >= 4) { var norm = 1; } else { norm = value; }
            ccArr[number][1].set(norm);
        } else if (number >= 16 && number <= 23 && channel <= 9) {      // Device Knobs Value
            ccArr[number][channel][0].set(value/127);
        } else if (number >= 48 && number <= 55 && channel == 1) {      // Track Knobs Value
            ccArr[number][0].set(value/127);
        } else if (number == 7) {                                       // Track Faders
            ccArr[7][channel][0].set(value/127);
        } else if (number == 14 && channel == 1) {                      // Master Fader 
            ccArr[number][0].set(value/127);
        } else if (number == 15 && channel == 1) {                      // Crossfader 
            ccArr[number][0].set((value / 127) * 2 - 1);                
            // For reference: Range calculation is ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin)
        } else if ((number == 13 || number == 47) && (channel == 1)) {  // Tempo and Cue Level
            if (value > 63) value = value - 128;
            ccArr[number][0].set(value);
        } else if (channel == 1) {                                      // Everything else              
            ccArr[number][0].set(value);
        } else { script.log("No mapping for this Midi CC found"); };
        script.log("ControlChange received " + channel + ", " + number + ", " + value);
    }
    else { script.log("No mapping for this Midi CC found"); };
};

function sysExEvent(data) {
    script.log("Sysex Message received, " + data.length + " bytes :");
    for (var i = 0; i < data.length; i++) {
        script.log(" > " + data[i]);
    }
};

// THIS MODULE SPECIFIC FUNCTIONS ////////////

// TURN THE LIGHTS ON ////////////////////////

function ringModeSingle(param) 
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

function ringModeGroup(param, value) {
    if (param == ccArr[40][10]) {
        for (var i = 1; i < 10; i++) {
            ringModeGroup(ccArr[40][i], param.get());
        };
    } else
        if (param == ccArr[40][11]) {
            for (var i = 0; i < 10; i++) {
                ringModeGroup(ccArr[40][i], param.get());
            };
            ccArr[40][10].setData(value);
        } else {
            var siblings = param.getParent().getControllables(true, false);
            script.log(siblings);
            for (var i = 0; i < 9; i++) {
        siblings[i].setData(value);
        };
    };
};

function lightRgb(param) {                  // The Clip and Scene Launch Pads
    var midiNote;
    if (param.name.charAt(11)) {
        midiNote = ((parseInt(param.name.charAt(5)) - 1) * 8) + (parseInt(param.name.charAt(11)) - 1);
    } else {
        var tired = parseInt(param.name.charAt(5));
        if (tired == 5) { midiNote = 82; };
        if (tired == 4) { midiNote = 83; };
        if (tired == 3) { midiNote = 84; };
        if (tired == 2) { midiNote = 85; };
        if (tired == 1) { midiNote = 86; };
    };
    if (param.getParent().name.charAt(0) == "m") {      // use Mode get Colour
        local.sendNoteOn(param.get(), midiNote, noteArr[midiNote][2].get());
    } else {                                            // Use colour get Mode
        local.sendNoteOn(noteArr[midiNote][1].get(), midiNote, param.get());
    };
};

function lightTri(param) {                  // Clip Stop and Crossfade Assign 
    var chanIndex = param.name.charAt(5);
    var note = 66;
    if (param.getParent().name=="clipStop"){note = 52;}
    local.sendNoteOn(chanIndex, note, param.get());
};

function lightBin(param) {                  // Any button with Boolean condition
    if (param.getParent().getParent().name == "trackControls") {
        var chanIndex = param.name.charAt(5);
        var nameCheck = param.getParent().name.charAt(0);
        if (nameCheck == "m") { var note = 50; } else
        if (nameCheck == "s") { note = 49; } else
        if (nameCheck == "r") { note = 48; } else
        if (chanIndex == "r") { note = 80; } else { note = 51; };
    } else {
        chanIndex = 1;
        var i = buttons.indexOf(param.name);
        note = buttons[i + 1];
    };
    local.sendNoteOn(chanIndex, note, param.get());
};

function setTrackControl(track, control, options){
    if (control==1){control = 50; if (options> 0){options = 127;}}else 
    if (control==2){control = 66;} else 
    if (control==3){control = 49; if (options> 0){options = 127;}} else 
        {control = 48; if (options> 0){options = 127;}};
    local.sendNoteOn(track, control, options);
};
function setButtonLed(button, on_Off){
if (on_Off == true){on_Off = 127;};
    local.sendNoteOn(1, button, on_Off);
};

// TURN THE LIGHTS OFF ///////////////////////

function clearBank(param) {
    if (param.name == "resetMode") {
        var siblings = param.getParent().getChild("mode").getControllables(true, false);
    } else 
    if (param.getParent().name.contains("Launch")) {
        siblings = param.getParent().getChild("colour").getControllables(true, false);
    } else 
    { siblings = param.getParent().getControllables(true, false); };
    for (var i = 0; i < siblings.length; i++) {
        siblings[i].resetValue();
    };
};

// TESTING ///////////////////////////////////

function test(){
//ccArr[i][1][0].setAttribute("enabled",false);
script.log(util.getObjectMethods(ccArr[i][1][0]));
}

//////////////////////////////////////////////

// Everything should go to these:

function localNote(c, n, v) {
    if (velocity > 0) {
        local.sendNoteOn(c, n, v);
    } else {
        local.sendNoteOff(c, n);
    };
};

function localCC(c, n, v) { // Bit pointless (maybe)
    local.sendCC(c, n, v);
};

function setValue(c, n, v) {
    noteArr[n][0].set(v);
    noteArr[n][c][0].set(v);
    ccArr[n][0].set(v);
    ccArr[n][c][0].set(v);
};

function setParam(c, n, v) {
    noteArr[n][1].set(v);
    noteArr[n][2].set(v);
    noteArr[n][c][1].set(v);
    ccArr[n][1].set(v);
    ccArr[n][c][1].set(v);
};


