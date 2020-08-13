/*

Ahmet#0001 - @tatli.php

*/

const { ShardingManager } = require("discord.js");
const config = require("./config.json");
const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var api = false;
const gulu = new ShardingManager(`${__dirname}/gulu.js`, { totalShards: "auto", token: config.token, respawn: true });

gulu.spawn();
gulu.on("launch", shard => {
    console.log("Shard başarıyla başlatıldı! " + (shard.id + 1) + "/" + gulu.totalShards);
    if (gulu.totalShards == shard.id + 1) {
        if (!api) {
            app.listen(8080, () => {
                console.log("API başarıyla 8080 portunda başlatıldı!");
                api = true;
            });
        }
    }
});

app.get('/api', (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    gulu.fetchClientValues('guilds.size').then(g => {
        gulu.fetchClientValues('users.size').then(u => {
            gulu.fetchClientValues('channels.size').then(c => {
                res.json({sunucu: g.reduce((prev, val) => prev + val, 0), kullanici: u.reduce((prev, val) => prev + val, 0), kanal: c.reduce((prev, val) => prev + val, 0)});
            })
        })
    })
});
