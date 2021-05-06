'use strict';

exports.Run = async function Run(caller, message) {
    if (caller.annoyOne == null || caller.annoyTwo == null) {
        message.channel.send("Type !start to start using me");
        return;
    }
    let guild = message.guild;
    let targetUserId = message.content.split(" ")[1];
    let targetUser = guild.members.cache.find((user) => user.id == targetUserId);
    let victimRole = message.guild.roles.cache.find(r => r.name === "victim");
    if (targetUser === undefined) {        
        targetUser = guild.members.cache.find((user) => user.user.username == targetUserId);
    } 
    try {
        targetUser.roles.add(victimRole);
    } catch (e) {
        console.log(e);
    }

   targetUser.voice.setChannel(caller.annoyOne.id);
}