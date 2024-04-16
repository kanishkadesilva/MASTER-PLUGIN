
const express = require("express");
const app = express();





const pino = require("pino");
let { toBuffer } = require("qrcode");
const path = require('path');
const fs = require("fs-extra");
const { Boom } = require("@hapi/boom");
const PORT = process.env.PORT ||  5000
const MESSAGE = process.env.MESSAGE ||  `
*┏━━━━━━━━━━━━━━*
*┃𝐐𝐔𝐄𝐄𝐍 𝐓𝐇𝐀𝐑𝐔 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐈𝐒*
*┃𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘*
*┃𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃 ✅🔥*
*┗━━━━━━━━━━━━━━━*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
𓃮 || 𝐂𝐫𝐞𝐚𝐭𝐨𝐫 = 𝐊𝐀𝐍𝐈𝐒𝐇𝐊𝐀_𝐗🥷
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
𓃮 || 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 = https://whatsapp.com/channel/0029VaWWZa1G3R3c4TPADo0M
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
𓃮 || 𝐎𝐰𝐧𝐞𝐫 = https://wa.me/+94722477361
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
𓃮 || 𝐒𝐮𝐩𝐩𝐨𝐫𝐭𝐞𝐝 𝐂𝐨𝐧𝐭𝐚𝐜𝐭𝐬 = 

➯"𝐈𝐝𝐞𝐚 & 𝐂𝐨 𝐎𝐰𝐧𝐞𝐫 𝐌𝐚𝐬𝐭𝐞𝐫 𝐌𝐢𝐧𝐝,"
https://wa.me/+94720797915

➯"𝐁𝐮𝐠 𝐓𝐞𝐬𝐭𝐞𝐫 𝐂𝐲𝐛𝐞𝐫 𝐊𝐚𝐯𝐢,"
https://wa.me/+94743579892

▬▬▬▬▬▬▬▬▬▬▬▬▬▬
𓃮 || 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 = https://www.facebook.com/kanishka.de.silva.01
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
𓃮 || 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 = https://www.instagram.com/kanishka_de_silva_01
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
𓃮 || 𝐓𝐢𝐤𝐭𝐨𝐤 = https://www.tiktok.com/@kanishka____x
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴋᴀɴɪꜱʜᴋᴀ_x*
`











if (fs.existsSync('./auth_info_baileys')) {
    fs.emptyDirSync(__dirname + '/auth_info_baileys');
  };
  
  app.use("/", async(req, res) => {

  const { default: SuhailWASocket, useMultiFileAuthState, Browsers, delay,DisconnectReason, makeInMemoryStore, } = require("@whiskeysockets/baileys");
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  async function SUHAIL() {
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys')
    try {
      let Smd =SuhailWASocket({ 
        printQRInTerminal: false,
        logger: pino({ level: "silent" }), 
        browser: Browsers.baileys("Desktop"),
        auth: state 
        });


      Smd.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect, qr } = s;
        if (qr) { res.end(await toBuffer(qr)); }


        if (connection == "open"){
          await delay(3000);
          let user = Smd.user.id;


//===========================================================================================
//===============================  SESSION ID    ===========================================
//===========================================================================================

          let CREDS = fs.readFileSync(__dirname + '/auth_info_baileys/creds.json')
          var Scan_Id = Buffer.from(CREDS).toString('base64')
         // res.json({status:true,Scan_Id })
          console.log(`
====================  SESSION ID  ==========================                   
SESSION-ID ==> ${Scan_Id}
-------------------   SESSION CLOSED   -----------------------
`)


          let msgsss = await Smd.sendMessage(user, { text:  Scan_Id });
          await Smd.sendMessage(user, { text: MESSAGE } , { quoted : msgsss });
          await delay(1000);
          try{ await fs.emptyDirSync(__dirname+'/auth_info_baileys'); }catch(e){}


        }

        Smd.ev.on('creds.update', saveCreds)

        if (connection === "close") {            
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            // console.log("Reason : ",DisconnectReason[reason])
            if (reason === DisconnectReason.connectionClosed) {
              console.log("Connection closed!")
             // SUHAIL().catch(err => console.log(err));
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server!")
            //  SUHAIL().catch(err => console.log(err));
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...")
              SUHAIL().catch(err => console.log(err));
            } else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut!")
             // SUHAIL().catch(err => console.log(err));
            }  else {
                console.log('Connection closed with bot. Please run again.');
                console.log(reason)
              //process.exit(0)
            }
          }



      });
    } catch (err) {
        console.log(err);
       await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 
    }
  }








  SUHAIL().catch(async(err) => {
    console.log(err)
    await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 


    //// MADE WITH 

});


  })


app.listen(PORT, () => console.log(`App listened on port http://localhost:${PORT}`));
