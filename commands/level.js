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
            if (levels[0].epic == true) {
                switch(levels[0].difficulty) {
                    case "N/A":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/naepic.png")
                        break;
                    case "Auto":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/autoepic.png")
                        break;
                    case "Easy":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/easyepic.png")
                        break;
                    case "Normal":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/normalepic.png")
                        break;
                    case "Hard":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/hardepic.png")
                        break;
                    case "Harder":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/harderepic.png")
                        break;
                    case "Insane":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/insaneepic.png")
                        break;
                    case "Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/demonepic.png")
                        break;
                    case "Easy Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/EasyDem.png")
                        break;
                    case "Medium Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/MedDem.png")
                        break;
                    case "Hard Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/demonepic.png")
                        break;
                    case "Insane Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/InsaneDem.png")
                        break;
                    case "Extreme Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/EPIC/ExtremeDem.png")
                        break;
                }
            } else if (levels[0].featured == true) {
                switch(levels[0].difficulty) {
                    case "N/A":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/nafeat.png")
                        break;
                    case "Auto":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/autofeat.png")
                        break;
                    case "Easy":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/easyfeat.png")
                        break;
                    case "Normal":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/normalfeat.png")
                        break;
                    case "Hard":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/hardfeat.png")
                        break;
                    case "Harder":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/harderfeat.png")
                        break;
                    case "Insane":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/insanefeat.png")
                        break;
                    case "Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/demonfeat.png")
                        break;
                    case "Easy Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/EasyDemFeat.png")
                        break;
                    case "Medium Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/MedDemFeat.png")
                        break;
                    case "Hard Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/demonfeat.png")
                        break;
                    case "Insane Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/InsaneDemFeat.png")
                        break;
                    case "Extreme Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/FEATURED/ExtremeDemFeat.png")
                        break;
                }
            } else {
                switch(levels[0].difficulty) {
                    case "N/A":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/NA.png")
                        break;
                    case "Auto":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/Auto.png")
                        break;
                    case "Easy":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/Easy.png")
                        break;
                    case "Normal":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/Normal.png")
                        break;
                    case "Hard":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/Hard.png")
                        break;
                    case "Harder":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/Harder.png")
                        break;
                    case "Insane":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/Insane.png")
                        break;
                    case "Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/Demon_Face.png")
                        break;
                    case "Easy Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/EasyDemon.png")
                        break;
                    case "Medium Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/MediumDemon.png")
                        break;
                    case "Hard Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/Demon_Face.png")
                        break;
                    case "Insane Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/InsaneDemon.png")
                        break;
                    case "Extreme Demon":
                        embed.setThumbnail("https://raw.githubusercontent.com/AltenGD/MCR-Bot/master/Faces/NONFEATURED/ExtremeDemon.png")
                        break;
                }
            }
            console.log(levels[0].difficulty)

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
