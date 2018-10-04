const GDClient = require('../GD/GD.js');
const GD = new GDClient();
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
    const embed = new Discord.RichEmbed()

    let daNivel = args[0];
    if(args[1]) {
        for(i = 1; i < args.length; i++) {
            daNivel = daNivel + " " + args[i];
        }  
    }

    var j = 1;
    GD.levels(daNivel).then(levels => {
        console.log(levels)
        if (isNaN(args)) {
            embed.setTitle(`<:info:453605020529721356> Found ${levels.length} different levels`)
            for (var i in levels) {
                if (levels[i].description === "") {
                    embed.addField(`${j}. **${levels[i].name} - ${levels[i].author.name}**`, `(No description provided)`)
                } else {
                    embed.addField(`${j}. **${levels[i].name} - ${levels[i].author.name}** (${levels[i].id})`, levels[i].description)
                }
                j++;
            }
        } else {
            if (levels[0].description === "") {
                embed.addField(`**${levels[0].name} - ${levels[0].author.name}**`, `(No description provided)`)
                embed.setFooter(`${level[0].coins} coins, ${level[0].length}, ${level[0].downloads} downloads, ${level[0].likes} likes`)
            } else {
                embed.addField(`**${levels[0].name} - ${levels[0].author.name}** (${levels[0].id})`, levels[0].description)

                if (levels[0].featured === true && levels[0].epic === true) {
                    embed.setFooter(`${levels[0].coins} coins, ${levels[0].length}, ${levels[0].downloads} downloads, ${levels[0].likes} likes, Featured and Epic!`)
                } else if (levels[0].featured === true) {
                    embed.setFooter(`${levels[0].coins} coins, ${levels[0].length}, ${levels[0].downloads} downloads, ${levels[0].likes} likes, Featured!`)
                } else {
                    embed.setFooter(`${levels[0].coins} coins, ${levels[0].length}, ${levels[0].downloads} downloads, ${levels[0].likes} likes`)
                }
            }
            console.log(levels[0].difficulty)

            let rating;
            let difficulty = levels[0].difficulty
            difficulty = difficulty.replace(/\s/g, '');
            difficulty = difficulty.replace('/', '');
            console.log(difficulty)

            if (levels[0].epic == true) rating = "EPIC"
            else if (levels[0].featured == true) rating = "FEATURED"
            else rating = "NONFEATURED";

            embed.setThumbnail(`https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/${rating}/${difficulty}.png`)

        }
        message.channel.send(embed);
    }).catch(error => message.reply('Sorry that was in invalid level.'))

}

module.exports.help = {
    name: "Level",
    desc: "Gets information on a level",
    usage: "!level <ID or Name>",
    hidden: false,
    mod: false
}
