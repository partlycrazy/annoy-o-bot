'use strict';

exports.Run = async function Run(caller, message) {
    let guild = message.guild;
    let targetUserId = caller.targetUserId;
    let channelOne;
    let channelTwo;
    try {
        channelOne = await guild.channels.create("annoy-o-room-1", {
            type: 'voice',
            parent: message.channel.parentID,
        });
        channelTwo = await guild.channels.create("annoy-o-room-2", {
            type: 'voice',
            parent: message.channel.parentID,
        });
    } catch (e) {
        console.log(e);
    }

    caller.annoyOne = channelOne;
    caller.annoyTwo = channelTwo;
}