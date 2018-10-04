'use strict';
const request = require('request')
const database = "http://boomlings.com/database";

class getLevel {
    /**
     * Gets information on a level
     * @param {string} str 
     * @param {number} diff 
     * @param {number} len 
     * @param {number} page 
     * @param {number} total 
     * @param {number} uncompleted 
     * @param {number} completed 
     * @param {number} featured 
     * @param {number} original 
     * @param {number} twoPlayer 
     * @param {number} coins 
     * @param {number} epic 
     * @param {number} star 
     * @param {number} type
     * @example Levels("Emit", "2", "1")
     * @returns JSON
     */
    levels(str, diff, len, page, total, uncompleted, completed, featured, original, twoPlayer, coins, epic, star, type) {
        if (!str) str = '';
        if (!diff) diff = '-';
        if (!len) len = '-';
        if (!page) page = '0';
        if (!total) total = '0';
        if (!uncompleted) uncompleted = '0';
        if (!completed) completed = '0';
        if (!featured) featured = '0';
        if (!original) original = '0';
        if (!twoPlayer) twoPlayer = '0';
        if (!coins) coins = '0';
        if (!epic) epic = '0';
        if (!star) star = '0';
        if (!type) type = '0';

        let prom = new Promise((res, rej) => {
            request.post({
                url: `${database}/getGJLevels21.php`,
                form: {
                    gameVersion: "21",
                    binaryVersion: "35",
                    str: str,
                    diff: diff,
                    len: len,
                    page: page,
                    total: total,
                    type: type,
                    uncompleted: uncompleted,
                    completed: completed,
                    featured: featured,
                    original: original,
                    twoPlayer: twoPlayer,
                    coins: coins,
                    epic: epic,
                    star: star,
                    secret: "Wmfd2893gb7"
                }
            }, (e, r, b) => {
                let levels = b.split("#")[0].split("|");
                let lvlarr = [];
                let demon = false;

                for (let i in levels) {
                    if (levels[i] == '-1') {
                        rej();
                    } else {
                        let lvlData = levels[i].split(':');
                        
                        if (lvlData[21] == '1') {
                            demon = true
                        } else if (lvlData[25] == '1') {
                            lvlData[11] = "Auto"
                        } else if (lvlData[11] == '50') {
                            lvlData[11] = "Insane"
                        }

                        if (!demon == true) {
                            switch (lvlData[11]) {
                                case "0":
                                    lvlData[11] = "N/A"
                                    break;
                                case "10":
                                    lvlData[11] = "Easy"
                                    break;
                                case "20":
                                    lvlData[11] = "Normal"
                                    break;
                                case "30":
                                    lvlData[11] = "Hard"
                                    break;
                                case "40":
                                    lvlData[11] = "Harder"
                                    break;
                            }
                        } else {
                            switch (lvlData[11]) {
                                case "0":
                                    lvlData[11] = "Demon"
                                    break;
                                case "10":
                                    lvlData[11] = "Easy Demon"
                                    break;
                                case "20":
                                    lvlData[11] = "Medium Demon"
                                    break;
                                case "30":
                                    lvlData[11] = "Hard Demon"
                                    break;
                                case "40":
                                    lvlData[11] = "Insane Demon"
                                    break;
                                case "50":
                                    lvlData[11] = "Extreme Demon"
                                    break;
                            }
                        }

                        const lengtharr = [
                            "Tiny",
                            "Short",
                            "Medium",
                            "Long",
                            "XL"
                        ];

                        const parsedData = {
                            name: lvlData[3],
                            id: lvlData[1],
                            author: {
                                name: "",
                                id: lvlData[7]
                            },
                            song: {},
                            difficulty: lvlData[11],
                            downloads: lvlData[13],
                            likes: lvlData[19],
                            stars: lvlData[27],
                            featured: (lvlData[29] != 0 ? true : false),
                            epic: (lvlData[31] != 0 ? true : false),
                            description: new Buffer(lvlData[35].toString(), "base64").toString(),
                            coins: lvlData[41],
                            version: lvlData[5],
                            verifiedCoins: (lvlData[43] == 1 ? true : false),
                            requestedStars: lvlData[45],
                            length: lengtharr[parseInt(lvlData[35])],
                        }

                        let authors = b.split("#")[1].split("|");
                        for (let a in authors) {
                            if (authors[a].split(":")[0] == lvlData[7]) {
                                parsedData.author.name = authors[a].split(":")[1];
                            }
                        }

                        let songs = b.split("#")[2].split(":");
                        if (lvlData[53] != "0") {
                            for (let s in songs) {
                                if (songs[s].split("~|~")[1] == lvlData[53]) {
                                    let song = songs[s].split("~|~");
                                    parsedData.song = {
                                        name: song[3],
                                        author: song[7],
                                        id: song[1],
                                        size: song[9] + "MB",
                                        url: decodeURIComponent(song[13])
                                    }
                                }
                            }
                        } else {
                            lvlData[47] = lvlData[15];
                            let mainSongs = {
                                "0": ["Stereo Madness", "ForeverBound"],
                                "1": ["Back On Track", "DJVI"],
                                "2": ["Polargeist", "Step"],
                                "3": ["Dry Out", "DJVI"],
                                "4": ["Base After Base", "DJVI"],
                                "5": ["Cant Let Go", "DJVI"],
                                "6": ["Jumper", "Waterflame"],
                                "7": ["Time Machine", "Waterflame"],
                                "8": ["Cycles", "DJVI"],
                                "9": ["xStep", "DJVI"],
                                "10": ["Clutterfunk", "Waterflame"],
                                "11": ["Theory of Everything", "DJ-Nate"],
                                "12": ["Electroman Adventures", "Waterflame"],
                                "13": ["Clubstep", "DJ-Nate"],
                                "14": ["Electrodynamix", "DJ-Nate"],
                                "15": ["Hexagon Force", "Waterflame"],
                                "16": ["Blast Processing", "Waterflame"],
                                "17": ["Theory of Everything 2", "DJ-Nate"],
                                "18": ["Geometrical Dominator", "Waterflame"],
                                "19": ["Deadlocked", "F-777"],
                                "20": ["Fingerbang", "MDK"]
                            }
                            let song = mainSongs[lvlData[47] + ""];
                            parsedData.song = {
                                name: song[0],
                                author: song[1],
                                id: lvlData[47],
                                size: null,
                                url: null
                            }
                        }
                        lvlarr.push(parsedData)
                    }
                }
                res(lvlarr)
            })
        })
        return prom
    }

    /**
     * Gets information on a user
     * @param {string} str 
     * @param {number} total 
     * @param {number} page - Currently not working because of the state of the server currently
     * @example Users("Optical", "2", "1")
     * @returns JSON
     */
    Users(str, total, page) {
        if (!str) str = '';
        if (!page) page = '0';
        if (!total) total = '0';

        let prom = new Promise((res, rej) => {
            request.post({
                url: `${database}/getGJUsers20.php`,
                form: {
                    gameVersion: "21",
                    binaryVersion: "35",
                    str: str,
                    page: page,
                    total: total,
                    secret: "Wmfd2893gb7"
                }
            }, (e, r, b) => {
                if (b == "-1")
                    rej();
                else {
                    let users = b.split("#")[0].split("|");
                    let userarr = [];
                    for (let user of users) {
                        user = user.split(":");
                        const parsedData = {
                            username: user[1],
                            id: user[3],
                            coins: user[5],
                            userCoins: user[7],
                            stars: user[23],
                            demons: user[27],
                            creatorPoints: user[25],
                            extID: user[21]
                        }
                        userarr.push(parsedData);
                    }
                    res(userarr);
                }
            })
        })
        return prom
    }
}

module.exports = getLevel; 
