const Discord = require('discord.js');
const { brotliCompress } = require('zlib');
const bot = new Discord.Client();
const token = require("./token.json");
const bdd = require("./bdd.json");
const { fstat } = require('fs');
const fs = require ("fs")

bot.on("ready", async () =>{
    console.log("Ready to connect")
    bot.user.setStatus("online")
    bot.user.setActivity("In development")
});

bot.on("guildMemberAdd", member => {
    if (bdd["message-bienvenue"]) {
        bot.channels.cache.get('772572130050048011').send(bdd["message-bienvenue"]);
    } else {
        bot.channels.cache.get('772572130050048011').send("Bienvenue sur le serveur du célèbre streameur thomasmrn");
    }
    member.roles.add('772568813606273033');

})    

bot.on("message", message => {

    if(message.content.startsWith("!clear")){
    message.delete();    
        if(message.member.hasPermission("MANAGE_MESSAGES")){

            let args = message.content.trim().split(/ +/g);
            
            if(args[1]){
                if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

                    message.channel.bulkDelete(args[1])
                    message.channel.send("Vous avez supprimer les message(s) ")
                    
                }
                else{
                    message.channel.send(` Vous devez indiquez une valeur entre 1 et 99 !`)
                }
            }
            else{
                message.channel.send(` Vous devez indiquez un nombres de messages a supprimer !`)
            }
        }
        else{
            message.channel.send(`Vous devez être modérateur pour éxécuter cette commande !`)
        }
    }

    if(message.content.startsWith("!mb")){
        message.delete()
        if(message.member.hasPermission("MANAGE_MESSAGES")){
            if(message.content.length > 5){
                message_bienvenue = message.content.slice(4)
                console.log(message_bienvenue)
                bdd["message-bienvenue"] = message_bienvenue
                Savebdd()
            }
        }
    }

})

function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send(" Une erreur esr survenue ! ");
    }); 
}

bot.login(token.token)
