'use strict';

exports.Run = async function Run(caller, oldState, newState) { 
    if (newState.channel) {
        console.log("Moved Voice Channel");
        if (newState.member.roles.cache.find((role) => role.name == "victim")) {
            console.log("Correct Role!");
            if (newState.channel.name.includes("annoy-o-room-1")) {
                newState.member.voice.setChannel(caller.annoyTwo.id);
            } else if (newState.channel.name.includes("annoy-o-room-2")) {
                newState.member.voice.setChannel(caller.annoyOne.id);
            }
        } else {
            console.log("Wrong Role");
        }
    }
}
