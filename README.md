# **APC40-MkII-Chataigne-Module**

A Chataigne module for the Akai APC40 MkII MIDI Controller.

Version : 1.0.0-beta

> [!WARNING]
> Due to the dynamic way pads and knobs are created (including on reloading a Noisette), trying to use the Router in Chataigne will cause a crash.

Chataigne can be downloaded here : https://benjamin.kuperberg.fr/chataigne/

-----
## **Settings**

### Controller Mode 
Choose between Generic, Ableton Live and Alternate Ableton Live Modes (Modes 0, 1, and 2). The controller always starts in Generic Mode when powered on, I don't make the rules.

*(See explanation of APC40 modes below)*

### Pad Layout
Choose between Ableton and Resolume naming and layout or set as Default. 

Ableton : Clip Launch Pads named by Track (left to right) and Clip (top to bottom), Scene Launch Pads numbered 1-5 (top to bottom).

Resolume : Clip Launch Pads named by Layer (bottom to top) and Clip (left to right), Scene Launch Pads renamed to Layer and numbered 1-5 (bottom to top). 

Default : Clip Launch Pads laid out in rows, top to bottom, Scene Launch Pads numbered 1-5 top to bottom.

Yes, it was that much work.

## **Utilities**

### Manual Control
Toggles whether changing any of the pad or button Light or Mode values by hand has any effect on the controller. You probably don't want to do that anyway but the option is there for you. 

*Nb. You **can** change those values at any time but that won't do anything. It was simpler to just turn the feedback off than toggling over 100 button to read only and back every time the setting was used.* 

All knobs can be controlled manually from Chataigne at any time, give visual feedback and do not jump from their position if you go back to controlling them properly.

### Debug
Toggles logging for all connections and the module script.

------
## **Features**

All input and output MIDI messages and states should match the ***Akai APC40 MkII Communications Protocol*** document Version 1.2 (which is a fun read).

### Set LED Ring Mode
Choose between Off, Single, Volume and Pan styles. 

Options to apply to All, Track Knobs, Device Knobs (All), Device Knobs by Track + Master (only applies to Generic Mode) and by individual knob.

### Clear Clip and Scene Launch pads
By type. Sends Note Off to all pads in the block, resets mode to primary colour.

### Reset Mode for Clip and Scene Launch pads
By type. Resets every pad to its primary colour (if it's flashing or blinking or whatever) without changing that it's lit.

All pad and buttons can have any of their visual properties set by hand if Manual COntrol is toggled on (see above).

------

## **Commands**

### Set Knob Ring Mode
Choose between Off, Single, Volume and Pan styles. 

Options to apply to All, Track Knobs, Device Knobs (All), Device Knobs by Track + Master (only applies to Generic Mode) and by individual knob.

### Set Knob Ring Value
Should be self-explanatory. Range is 0-1.

### Set Clip Launch Pad
Set both Colour and Mode, or either. Will also set pad to Off if you select Colour : 0, Mode : Primary Colour.

### Set Scene Launch Pad
Set both Colour and Mode, or either. Will also set pad to Off if you select Colour : 0, Mode : Primary Colour.

### Set Clip Stop Pad
On, Off, Blinking. Nb. Stop All Clips pad doesn't have an LED but use this command to trigger it.

### Set Track Select Pad
Set to On or Off.

### Track Control Pad
Set Mute, Solo, Crossfade Assign and Record/Arm LEDs On or Off. Selecting Crossfade Assign gives you the options of Off, A (Yellow) and B (Orange).

### Set Button LED

Set all the buttons with LEDs to either On or Off

---------

## Additional Files

- APC40_MkII_Colours_Velocity_.json
Custom variable which hold all the colours that the APC40 MkII is programmed to use for RGB pads. 
 - Resolume_Colours.json
 Custom variable which hold all the Resolume UI Colours for theming. 

To use:

1. Copy all the code in the file.

2. In Chataigne go to the **Custom Variables** panel and click on the Green + icon to create a new group, select the group, then in the **Inspector** panel right click on the Header and select ***Paste (replace)***.

------

<details>

<summary>Explanation of APC 40 MkII Modes:</summary>

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
