/*

This is the old verbose version of the MIDI address variables

All note addresses are in the format [channel, note]

*/

var noteNote = {                // This variable is all the regular notes
    clipLaunch:[                // Clip Launch Pads ordered as arranged on the APC40 [0] - [39]
        [1,32], [1,33], [1,34], [1,35], [1,36], [1,37], [1,38], [1,39], //  [0] -  [7]
        [1,24], [1,25], [1,26], [1,27], [1,28], [1,29], [1,30], [1,31], //  [8] - [15]
        [1,16], [1,17], [1,18], [1,19], [1,20], [1,21], [1,22], [1,23], // [16] - [23]
        [1, 8], [1, 9], [1,10], [1,11], [1,12], [1,13], [1,14], [1,15], // [24] - [31]
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7]  // [32] - [39]
    ],
    sceneLaunch:[               // Scene Launch Pads - Channel 1, Array order is top to bottom
        [1, 82], [1, 83], [1, 84], [1, 85],  [1, 86]
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
