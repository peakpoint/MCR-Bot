const request = require('request')
const database = "http://boomlings.com/database"

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
        let prom = new Promise((res, rej) => {
            request.post({
                url: `${database}/getGJLevels21.php`,
                form: {
                    gameVersion: "21",
                    binaryVersion: "35",
                    str: str || '',
                    diff: diff || '-',
                    len: len || '-',
                    page: page || '0',
                    total: total || '0',
                    type: type || '0',
                    uncompleted: uncompleted || '0',
                    completed: completed || '0',
                    featured: featured || '0',
                    original: original || '0',
                    twoPlayer: twoPlayer || '0',
                    coins: coins || '0',
                    epic: epic || '0',
                    star: star || '0',
                    secret: "Wmfd2893gb7"
                }
            }, (e, r, b) => {
                let levels = b.split("#")[0].split("|")
                let lvlarr = []
                let demon = false

                for (let i in levels) {
                    if (levels[i] == '-1') rej()
                    else {
                        let lvlData = levels[i].split(':')
                        
                        if (lvlData[21] == '1') {
                            demon = true
                        } else if (lvlData[25] == '1') {
                            lvlData[11] = "Auto"
                        } else if (lvlData[11] == '50') {
                            lvlData[11] = "Insane"
                        }

                        if (!demon) {
                            switch (lvlData[11]) {
                                case "0":
                                    lvlData[11] = "N/A"
                                    break
                                case "10":
                                    lvlData[11] = "Easy"
                                    break
                                case "20":
                                    lvlData[11] = "Normal"
                                    break
                                case "30":
                                    lvlData[11] = "Hard"
                                    break
                                case "40":
                                    lvlData[11] = "Harder"
                                    break
                            }
                        } else {
                            switch (lvlData[11]) {
                                case "0":
                                    lvlData[11] = "Demon"
                                    break
                                case "10":
                                    lvlData[11] = "Easy Demon"
                                    break
                                case "20":
                                    lvlData[11] = "Medium Demon"
                                    break
                                case "30":
                                    lvlData[11] = "Hard Demon"
                                    break
                                case "40":
                                    lvlData[11] = "Insane Demon"
                                    break
                                case "50":
                                    lvlData[11] = "Extreme Demon"
                                    break
                            }
                        }

                        const lengtharr = [
                            "Tiny",
                            "Short",
                            "Medium",
                            "Long",
                            "XL"
                        ]

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
                            featured: lvlData[29] != 0,
                            epic: lvlData[31] != 0,
                            description: new Buffer(lvlData[35].toString(), "base64").toString(),
                            coins: lvlData[41],
                            version: lvlData[5],
                            verifiedCoins: (lvlData[43] == 1 ? true : false),
                            requestedStars: lvlData[45]
                        }

                        let authors = b.split("#")[1].split("|")
                        for (let a in authors) {
                            if (authors[a].split(":")[0] == lvlData[7]) {
                                parsedData.author.name = authors[a].split(":")[1]
                            }
                        }

                        let songs = b.split("#")[2].split(":")
                        if (lvlData[53] != "0") {
                            for (let s in songs) {
                                if (songs[s].split("~|~")[1] == lvlData[53]) {
                                    let song = songs[s].split("~|~")
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
                            lvlData[47] = lvlData[15]
                            let mainSongs = [
                                ["Stereo Madness", "ForeverBound"],
                                ["Back On Track", "DJVI"],
                                ["Polargeist", "Step"],
                                ["Dry Out", "DJVI"],
                                ["Base After Base", "DJVI"],
                                ["Cant Let Go", "DJVI"],
                                ["Jumper", "Waterflame"],
                                ["Time Machine", "Waterflame"],
                                ["Cycles", "DJVI"],
                                ["xStep", "DJVI"],
                                ["Clutterfunk", "Waterflame"],
                                ["Theory of Everything", "DJ-Nate"],
                                ["Electroman Adventures", "Waterflame"],
                                ["Clubstep", "DJ-Nate"],
                                ["Electrodynamix", "DJ-Nate"],
                                ["Hexagon Force", "Waterflame"],
                                ["Blast Processing", "Waterflame"],
                                ["Theory of Everything 2", "DJ-Nate"],
                                ["Geometrical Dominator", "Waterflame"],
                                ["Deadlocked", "F-777"],
                                ["Fingerbang", "MDK"]
                            ]
                            let song = mainSongs[lvlData[47]]
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
        let prom = new Promise((res, rej) => {
            request.post({
                url: `${database}/getGJUsers20.php`,
                form: {
                    gameVersion: "21",
                    binaryVersion: "35",
                    str: str || '',
                    page: page || '0',
                    total: total || '0',
                    secret: "Wmfd2893gb7"
                }
            }, (e, r, b) => {
                if (b == "-1") rej()
                else {
                    let users = b.split("#")[0].split("|")
                    let userarr = []
                    for (let user of users) {
                        user = user.split(":")
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
                        userarr.push(parsedData)
                    }
                    res(userarr)
                }
            })
        })
        return prom
    }
}

module.exports = getLevel
