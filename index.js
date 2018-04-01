const Discord = require('discord.js'); 
const bot = new Discord.Client(); 
const fs = require("fs"); 
const Prefix = ('!')
var hostIDs = []; 
var sentActions = []; 

//When Bot Comes Online
bot.on("ready", ()=> {
    console.log('Mafia Bot Online!');
    bot.user.setActivity('Mafia Reborn'); 
   ;
});

 bot.login(process.env.BOT_TOKEN);

bot.on('guildMemberAdd', member => { 
    const Alive1 = member.guild.roles.find("name", "Alive")
    member.addRole(Alive1)
});

//Host Assistant Commands
bot.on('message', (message) => { 
    const systemMessages = message.guild.channels.find('name', 'system-messages');
    const actionMessages = message.guild.channels.find('name', 'action-chat');
    const Alive = message.guild.roles.find("name", 'Alive'); 
    const Host = message.guild.roles.find("name", 'Host');
    const Hosts = message.guild.roles.find("name", "Host").members
    

    if (!message.content.startsWith(Prefix)) return; 
    if (message.author.bot) return; 
    
    if(message.content.startsWith(Prefix + 'ping')) {
        message.reply(`Pong! \`${Date.now() - message.createdTimestamp}ms\``); 
        console.log('Ping Tested!');
        //message.reply means it @'s author
        //to send message to channel do message.channel.sendMessage('message content'); 
        //add more commands by adding else to } ex. }else etc. 
    } else

    if(message.content.startsWith(Prefix + "sethost")) {
        if(message.member.roles.find("name", "Host")) { 
            hostIDs.unshift(`${message.author.id}`) 
            message.channel.send(`Host Set!`) 
            
            console.log(`${message.author.username} is now a Host!`);
        }else 
        message.channel.send("You don't have access to this command!")
    }
    
    if(message.content.startsWith(Prefix + "players")) {
        let membersWithRole = message.guild.roles.find("name", "Alive").members;
        message.channel.send(`${membersWithRole.size} Players Alive!`)
    } else 
   
    
    //This Command will send a message starting the night!
    if(message.content.startsWith(Prefix + 'night')) {
        if(message.member.roles.find("name", "Host")) { 
            let AlivePeople = message.member.guild.roles.find("name", "Alive").members
            systemMessages.send(`Night has begun! \n${AlivePeople.size} Actions Remain!`)
            sentActions = []
        } else 
        message.channel.send('You don\'t have access to this Command!') 
        } else  

    
        if(message.content.startsWith(Prefix + 'help')) {
        message.channel.send('!action Submits action to host')
        message.channel.send('!update If you need to change your action use the update command!')
    }else

    //These Commands Will take actions. 
    //Note: Tell anyone who has alreadysubmitted an Action, if they need to change it use "!update"
    if(message.content.startsWith(Prefix + 'update')) {
        if(message.member.roles.find("name", "Alive")) {
            actionMessages.send(`${(message.author.username)}'s new action is : ${(message.content.split('!update').slice(1, 2)[0])}`) 
            message.channel.send('Action Updated!'); 
        } else 
        message.channel.send("You don't have access to this Command!"); 
    } else 
    
    if(message.content.startsWith(Prefix + 'action')) { 
            let AlivePeople = message.guild.roles.find("name", "Alive").members;
            let actions = AlivePeople.size 
            let actionsRemaining = (actions - 1 - sentActions.length); 
            var checkActions = sentActions.includes(`${message.author.username}`)
            if(message.member.roles.find("name", "Alive")) { 
                if (checkActions == true) { 
                     message.channel.send('You have already submitted an Action! \nUse the !update command to alter it!');
                }else  
                if(checkActions == false) { 
                    sentActions.unshift(`${message.author.username}`);
                 if(actionsRemaining === 0) {
                     actionMessages.send(`${(message.author.username)}: ${(message.content.split(Prefix + 'action').slice(1, 2)[0])}`); 
                     message.channel.send('Action Recieved!');
                 } else  
                 if(actionsRemaining === 1) {
                     actionMessages.send(`${(message.author.username)}: ${(message.content.split(Prefix +'action').slice(1, 2)[0])}`);
                     message.channel.send('Action Recieved!');
                 } else 
                 if (actionsRemaining > 1){   
                     actionMessages.send(`${(message.author.username)}: ${(message.content.split(Prefix +'action').slice(1, 2)[0])}`); 
                     message.channel.send('Action Recieved!');
                 }else
                     console.log("Action Command Used");
 
             } else 
             message.channel.send("You don't have access to this Command!")
         }  else 
         
     if(message.content.startsWith(Prefix + 'shoot')) { 
        message.channel.send('This Command has been disabled until bugfixing is complete. Please message the host to use your gun!')
    } 
    
}})
