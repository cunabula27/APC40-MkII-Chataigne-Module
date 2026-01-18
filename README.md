# APC40-mkII-Chataigne-Module
A Chataigne module for the Akai APC40 MkII MIDI Controller

## Current Features:
- All inputs mapped
- LED feedback for all pads and buttons
- RGB input for color pads (then matched to midi color pallette)
- Full feedback for encoders including different modes
- Resync function, restores last status after reconnecting

## Planned Features:
- Pulsing/blinking for non-color pads/buttons
- User-reset functions

## Known Bugs
- Resyncing the midi status of encoders and buttons happens after first user input (instant resync was unreliable)

## TO DO - Cunabula
- Add in remaining missing colours from the APC40 MIDI spec document
- Learn enough JS to work out how much I might break things by renaming and reordering them.

## Additional Files
- APC40_Clip_Launch_LED_Colours.json
A custom variable which holds all the colours that the APC40 can use to light the Clip Launch Pads. To use:
1. Open in a text editor and copy all the code
2. In Chataigne go to the **Custom Variables** panel and click on the Green + icon to create a new group, then in the **Inspector** panel Right Click on the Header and select ***Paste (replace)***