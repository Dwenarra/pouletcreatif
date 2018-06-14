const Discord = require ('discord.js');

const client = new Discord.Client();

var prefix = "!";

client.login("NDQ5NjI4NTUyNTUyMjUxMzkz.Dencyg.rYeVxSXO5LC32pMQYCNYedUGhvA");

client.on("ready", () => {
    console.log("Je suis prêt !")
    client.user.setActivity(" NathBot | !aide");
});

client.on('message',message =>{

    if (message.content === "Ping"){
        message.reply("Pong");
        console.log ('Le bot dit Pong');
    }

    if(message.content === prefix + "aide"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("Voici mes commandes d'aide :D")
        .setDescription("Je suis un bot en dev. Voici mes commandes disponibles")
        .addField("!aide", "Affiche les commandes du bot")
        .addField("Ping", "Le bot répond")
        .addField("!stats", "Le bot vous envoie des informations sur votre profil")
        .addField("!info", "Donne des informations sur le bot et le serveur")
        .addField("!kick", "Kick un utilisateur")
        .addField("!ban", "Ban un utilisateur")
        .addField("!mute", "Mute un utilisateur")
        .addField("!clear", "Supprime le nombre de messages indiqué")
        .setFooter("Menu d'aide NathBot")
        message.channel.sendMessage(help_embed);
        console.log("Un utilisateur a effectué la commande d'aide")
    }

    if(message.content === prefix + "info") {
        var info_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("Voici les informations sur moi et le serveur")
        .addField(" :robot: Nom :", `${client.user.tag}`, true)
        .addField("Descrimilateur du bot :hash:", `#${client.user.discriminator}`)
        .addField("Nombres de membres", message.guild.members.size)
        .addField("Nombre de catégories et de salons", message.guild.channels.size)
        .setFooter("Info - NathBot")
        message.channel.sendMessage(info_embed)
        console.log("Un utilisateur a effectué la commande d'info")
    }

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe :/")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission de kick");
        }

        kick.kick().then(member => { 
            message.channel.send(`${member.user.username} a été kick par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un utilisateur");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Je ne sais pas si l'utilisateur existe");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission de ban");
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} est ban par ${message.author.username}`)
        }

        )
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permission");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Vous devez préciser un nombre de messages à supprimer")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été supprimés`);
        })
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute !`);
        })
    }

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch(args[0].toLowerCase()) {
        case "stats":

        var userCreateDate = message.author.createdAt.toDateString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("#FCDC12")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField("ID de l'utilisateur :id:",msgauthor, true)
        .addField("Date de création de l'utilisateur : ", userCreateDate[1] + ' '+ userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Tu peux regarder tes messages privés ! Tu viens de recevoir tes statistiques !")
        message.author.send({embed: stats_embed});
        break;
    }
});
