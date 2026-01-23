# DON'T TRY AND USE THIS - ACTIVE DEVELOPMENT

# **APC40-MkII-Chataigne-Module**

A Chataigne module for the Akai APC40 MkII MIDI Controller.

*Nb. Start Chataigne before connecting the APC40 for the Reset to work correctly (need to further test before this is definitely correct).*

-----

### *Implemented:*


## **Utilities (Right click menu)**

### Set APC40 Mode *(See explanation of APC40 modes below)*
Choose between Generic, Ableton Live and Alternate Ableton Live Modes (Modes 0, 1, and 2).

### Set LED Ring Mode
Choose between Off, Single, Volume and Pan styles. 

Options to apply to All, Track Knobs, Device Knobs (All) and Device Knobs by Track and Master (only applies to Generic Mode).

### Clear Pads
Choose between Clip Launch, Scene Launch, Clip Stop, Track Selectors and Track Controls (either All or by individual function). 

-----

### Additional Files
- APC40_Clip_Launch_LED_Colours (Velocity).json
- APC40_Clip_Launch_LED_Colours (Velocity-Name).json

Custom variables which hold all the colours that the APC40 MkII is programmed to use for RGB pads - the same information just with simple and verbose names. 

To use:

1. Copy all the code in the file.

2. In Chataigne go to the **Custom Variables** panel and click on the Green + icon to create a new group, then in the **Inspector** panel right click on the Header and select ***Paste (replace)***.

-----

##### OLD Features I need to reinstate:
- All inputs mapped
- LED feedback for all pads and buttons
- RGB input for color pads (then matched to midi color palette)
- Resync function, restores last status after reconnecting

###### OLD Planned Features:
- Pulsing/blinking for non-color pads/buttons
- User-reset functions

## TO DO - Cunabula
- Learn enough JS to work out how much I might break things by renaming and reordering them.

## Additional Files
- APC40_Clip_Launch_LED_Colours (Velocity-Name).json
- APC40_Clip_Launch_LED_Colours (Velocity).json
Custom variable Groups which hold all the colours that the APC40 MkII is programmed to use for RGB pads. 

To use:

1. Copy all the code in the file.

2. In Chataigne go to the **Custom Variables** panel and click on the Green + icon to create a new group, then in the **Inspector** panel Right Click on the Header and select ***Paste (replace)***.

------

## **Explanation of APC 40 MkII Modes:**

### **Generic Mode (Mode 0):**
***CLIP LAUNCH*** buttons are momentary and should light their LED when ON.

***CLIP STOP*** buttons are momentary and should light their LED when ON.

***ACTIVATOR (MUTE)***, ***SOLO***, ***RECORD/ARM*** are toggle buttons and should light their LED when ON.

***TRACK SELECTION*** buttons (1-8 + MASTER) are radio style and only one of the nine buttons is ON at a time. When ON its LED should light. These buttons will NOT send out MIDI in generic mode for its state. These buttons dictate which one of nine banks the DEVICE CONTROL knobs and DEVICE CONTROL switches belong to. These knobs and switches will output on a different MIDI channel based on the current Track Selection (track 1 = MIDI channel 0, track 8 = MIDI channel 7, MASTER = MIDI
channel 8). Upon pressing one of the Track Selection buttons, the current position of the 8 Device Control knobs will be sent.

***TRACK ACTIVATOR*** buttons (1-8) are toggle buttons and will light their LED when ON.

***CROSSFADER A/B***, is a momentary button and will light its LED when ON.

***TRACK SOLO***, and ***RECORD ARM*** buttons are toggle buttons and will light their LED when ON.

***DEVICE LEFT (1)***, ***DEVICE RIGHT (2)***, ***BANK LEFT (3)***, ***BANK RIGHT (4)*** will be toggle style and will light their LED when ON.

***DEVICE ON/OFF (5)***, ***DEVICE LOCK (6)***, ***CLIP/DEVICE VIEW (7)***, ***DETAIL VIEW (8)*** will be momentary style and will light their LED when ON.

***BANK LOCK*** button is momentary and will light its LED when ON.

***SCENE LAUNCH*** and ***STOP ALL CLIPS*** buttons are momentary buttons and will light their LED when ON.

***TRACK CONTROL*** buttons are toggle buttons and will light their LED when ON.

***TRACK CONTROL KNOBS*** and buttons are NOT banked in any way.

***UP***, ***DOWN***, ***LEFT***, ***RIGHT***, ***SHIFT***, ***NUDGE+***, ***NUDGE-***, ***METRONOME***, and ***TAP TEMPO*** are momentary buttons.

***PLAY***, ***RECORD***, and ***SESSION RECORD*** are momentary buttons and will light their LED when ON.

***PAN***, ***SENDS***, ***USER***, are toggle buttons and will light their LED when ON.

LED rings are all set to SINGLE style.

### **Notes Regarding Ableton Live Mode (Mode 1):**

All buttons are momentary buttons.

Device control knobs and buttons are not banked within the APC40 MkII.

LED Rings around the knobs are controlled by the APC40 but can be updated by the Host.

All other LEDs are controlled by the Host.

### **Notes Regarding Alternate Ableton Live Mode (Mode 2):**

All buttons are momentary buttons.

Device control knobs and buttons are not banked within the APC40 MkII.

All LEDs are controlled by the Host.
