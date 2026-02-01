So I don't have to read the MIDI specification document again, here are all the possible messages from, and to, the APC40 Mk II. 

*Nb. I've flipped the Inbound/Outbound terminology as I found it confusing to my way of thinking. This list is from the perspective of the controller.*

------

## Inbound NoteOn MIDI Messages (*From PC or local*)

Sending a message with Velocity = 0 gives the same result as a Note Off message but Note Off is preffered.

||Channel||Note||Velocity||
|---|---:|-------|---:|-----|--------:|---|
|**Clip Launch**|**1-16**|*Mode*|**0-39**|*Pad*|**0-127**|*Colour*|
|**Scene Launch**|**1-16**|*Mode*|**82-86**|*Pad*|**0-127**|*Colour*|
|**Record / Arm**|**1-8**|*Track*|**48**||**0 / 1-127**|*Off* / *On*|
|**Solo**|**1-8**|*Track*|**49**||**0 / 1-127**|*Off* / *On*|
|**Activator / Mute [1-8]**|**1-8**|*Track*|**50**||**0 / 1-127**|*Off* / *On*|
|**Track Select**|**1-8**|*Track*|**51**||**0 / 1-127**|*Off* / *On*|
|**Clip Stop**|**1-8**|*Track*|**52**||**0 / 1 / 2 / 3-127**|*Off* / *On* / *Blink* / *On*|
|**Device Left**|**1**||**58**||**0 / 1-127**|*Off* / *On*|
|**Device Right**|**1**||**59**||**0 / 1-127**|*Off* / *On*|
|**Bank Left**|**1**||**60**||**0 / 1-127**|*Off* / *On*|
|**Bank Right**|**1**||**61**||**0 / 1-127**|*Off* / *On*|
|**Device On/Off**|**1**||**62**||**0 / 1-127**|*Off* / *On*|
|**Device Lock**|**1**||**63**||**0 / 1-127**|*Off* / *On*|
|**Clip/Device View**|**1**||**64**||**0 / 1-127**|*Off* / *On*|
|**Detail View**|**1**||**65**||**0 / 1-127**|*Off* / *On*||
|**Crossfader A/B**|**1-8**|*Track*|**66**||**0 / 1 / 2-127**|*Off* / *Yellow* / *Orange*|
|**Master**|**1**||**80**||**0 / 1-127**|*Off* / *On*|
|**Stop All Clips**|**1**||**81**||**None**|*(Doesn't light)*|
|**Pan**|**1**||**87**||**0 / 1-127**|*Off* / *On*||
|**Sends**|**1**||**88**||**0 / 1-127**|*Off* / *On*||
|**User**|**1**||**89**||**0 / 1-127**|*Off* / *On*||
|**Metronome**|**1**||**90**||**0 / 1-127**|*Off* / *On*||
|**Play**|**1**||**91**||**0 / 1-127**|*Off* / *On*||
|**Record**|**1**||**93**||**0 / 1-127**|*Off* / *On*||
|**Up**|**1**||**94**||**None**|*(Doesn't light)*|
|**Down**|**1**||**95**||**None**|*(Doesn't light)*|
|**Right**|**1**||**96**||**None**|*(Doesn't light)*|
|**Left**|**1**||**97**||**None**|*(Doesn't light)*|
|**Shift**|**1**||**98**||**None**|*(Doesn't light)*|
|**Tap Tempo**|**1**||**99**||**None**|*(Doesn't light)*|
|**Nudge &#8722;**|**1**||**100**||**None**|*(Doesn't light)*|
|**Nudge +**|**1**||**101**||**None**|*(Doesn't light)*|
|**Session**|**1**||**102**||**0 / 1-127**|*Off* / *On*||



## Inbound Absolute CC MIDI Messages (*From PC or local*)

Device knobs only use Channels 2-8 when the APC40 Mk II is in Generic Mode (0).

||Channel||Note||Value||
|---|---:|-------|---:|-----|--------:|---|
|**Track Fader**|**1-8**|*Track*|**7**||**0-127**||
|**Tempo Knob**|**1**||**13**||**1 / 127**|*Rotary Encoder ( &#8722;1 / +1)*|
|**Master Fader**|**1**|*Track*|**14**||**0-127**||
|**Crossfader**|**1**|*Track*|**15**||**0-127**||
|**Device Knobs**|**1-8**|*Track*|**16-23**|*Knob*|**0-127**||
|**Device Knobs (LED Ring Style)**|**1-8**|*Track*|**24-31**|*Knob*|**0 / 1 / 2 / 3 / 4-127**|*Off / Single / Volume / Pan / Single*|
|**Cue Level**|**1**||**47**||**1 / 127**|*Rotary Encoder ( &#8722;1 / +1)*|
|**Track Knobs**|**1**|*Track*|**48-55**|*Knob*|**0-127**||
|**Track Knobs (LED Ring Style)**|**1**|*Track*|**56-63**|*Knob*|**0 / 1 / 2 / 3 / 4-127**|*Off / Single / Volume / Pan / Single*|
|**Footswitch**|**1**||**64**|


## Outbound NoteOn MIDI Messages (*from Controller*)

NoteOff messages ignore the Velocity value

||Channel||Note||Velocity||
|---|---:|-------|---:|-----|--------:|---|
|**Clip Launch**|**1**||**0-39**|*Pad*|**127**||
|**Scene Launch**|**1**||**82-86**|*Pad*|**127**||
|**Record / Arm**|**1-8**|*Track*|**48**||**127**||
|**Solo**|**1-8**|*Track*|**49**||**127**||
|**Activator / Mute [1-8]**|**1-8**|*Track*|**50**||**127**||
|**Track Select**|**1-8**|*Track*|**51**||**127**||
|**Clip Stop**|**1-8**|*Track*|**52**||**127**||
|**Device Left**|**1**||**58**||**127**||
|**Device Right**|**1**||**59**||**127**||
|**Bank Left**|**1**||**60**||**127**||
|**Bank Right**|**1**||**61**||**127**||
|**Device On/Off**|**1**||**62**||**127**||
|**Device Lock**|**1**||**63**||**127**||
|**Clip/Device View**|**1**||**64**||**127**||
|**Detail View**|**1**||**65**||**127**||
|**Crossfader A/B**|**1**|*Track*|**66**||**127**||
|**Master**|**1**||**80**||**127**||
|**Stop All Clips**|**1**||**81**||**127**||
|**Pan**|**1**||**87**||**127**||
|**Sends**|**1**||**88**||**127**||
|**User**|**1**||**89**||**127**||
|**Metronome**|**1**||**90**||**127**||
|**Play**|**1**||**91**||**127**||
|**Record**|**1**||**93**||**127**||
|**Up**|**1**||**94**||**127**||
|**Down**|**1**||**95**||**127**||
|**Right**|**1**||**96**||**127**||
|**Left**|**1**||**97**||**127**||
|**Shift**|**1**||**98**||**127**||
|**Tap Tempo**|**1**||**99**||**127**||
|**Nudge &#8722;**|**1**||**100**||**127**||
|**Nudge +**|**1**||**101**||**127**||
|**Session**|**1**||**102**||**127**||
|**Bank Lock**|**1**||**103**||**127**||


## Outbound Absolute CC MIDI Messages (*from Controller*)

Device knobs only use Channels 2-8 when the APC40 Mk II is in Generic Mode (0).

||Channel||Note||Value||
|---|---:|-------|---:|-----|--------:|---|
|**Track Fader**|**1-8**|*Track*|**7**||**0-127**|
|**Master Fader**|**1**|*Track*|**14**||**0-127**|
|**Crossfader**|**1**|*Track*|**15**||**0-127**|
|**Device Knobs**|**1-8**|*Track*|**16-23**|*Knob*|**0-127**|
|**Track Knobs**|**1**|*Track*|**48-55**|*Knob*|**0-127**|
|**Footswitch**|**1**||**64**||**1 / 127**|*Released / Depressed*|

## Outbound Relative CC MIDI Messages (*from Controller*)

||Channel|Note|Value|
|---|---|-------|---|
|**Tempo Knob**|**1**|**13**|**0-127**|*Rotary Encoder ( &#8722;1 / +1)*|
|**Cue Level**|**1**|**47**|**0-127**|*Rotary Encoder ( &#8722;1 / +1)*|

Contrary to what I believed, these will both send values from 0-127 depending on how much they have turned since whatever you're sending the MIDI data to (or the controller) last checked. But important to note that turning the knob to the left starts the range from 127 and turning it right starts the range from 1.

|Value|Meaning|
|---:|---|
|**0**|*No change*|
|**1**|*Controller incremented its value by 1*|
|**2**|*Controller incremented its value by 2*|
|...||
|**63**|*Controller incremented its value by 63*|
|**64**|*Controller decremented its value by 64*|
|**65**|*Controller decremented its value by 63*|
|...||
|**126**|*Controller decremented its value by 2*|
|**127**|*Controller decremented its value by 1*|


