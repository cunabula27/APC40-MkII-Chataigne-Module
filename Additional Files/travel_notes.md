Final things

Try and bypass the param code, see if I can sort the flow.

If velocity = 0 make it send a note off instead

Reorder commands to be channel, note velocity

function name (param, channel, note, velocity){
};

Or 

function name (channel, note, velocity, param){
};

Probably the latter as more updates from the software.

Every command should have an "off" option.

more commands that go to the same places or overload them in the UI?


version number is 1.0.0-beta

need testing from Ableton users?

code to reorder layers columns?

not compatible with Chataigne earlier than 1.10.0.

see if existing code can be simplifies with if (param.type == "whatever")...