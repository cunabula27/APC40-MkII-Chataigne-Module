# DON'T TRY AND USE THIS - ACTIVE DEVELOPMENT

N. Start Chataigne before connecting the APC40 for the Reset to work correctly (need to further test before this is definitely correct).

# APC40-mkII-Chataigne-Module
A Chataigne module for the Akai APC40 MkII MIDI Controller

## OLD Current Features I need to reinstate:
- All inputs mapped
- LED feedback for all pads and buttons
- RGB input for color pads (then matched to midi color pallette)
- Full feedback for encoders including different modes
- Resync function, restores last status after reconnecting

## OLD Planned Features:
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
