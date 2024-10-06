const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0xqVzNpWnNBVnNZZ2VqeFNjMzdnUytmQWgvTStzUm9qcStVMVRJYWNFOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2I2YzRhc0xOcWxobDIzK1NEWEprUGpkc3hlc1BYdTNCeUoveGRwcFRDQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTVM3a3NXbFk2b2t6a1g4WFR5aTVWeW9YbnlzNXY3RDUwaVU2YU1heVZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6L3VLTFc4VFgrNk5HdlgxVENkMGlnL0dyY1ZJTzBGQmhpVmdsZjNmbWlBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdCZVJPVXMwZEQ5VmkzL3Y4M282QU5NNk9JZ2w0cUxtWGZ1KzNDZEsrME09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpkSVYwQnRTUDZzeUZjRDdBdHVGRDBNSHVnbnVNRWFzUEVacW1Uc0dTbDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0MwSVJzcktId01EdEdQMzIzQmJVNDFrOTQ1MHJxRXBrbkJhSDYrUmVHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEg0SklVWXl2aktZWFRmWnc3cHhYdThWRC8va1BJWmppYXc4UStzaHAwZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9SSEppUi9GUGVpT29jL0JhTktIVzc2T0ZWekNGTmhmbUZXbTh4ZndZNnRYZS9TazN2cGs4RDBqTWxzRTdUSVVWT3Z4cCszR1BZWEQ4dnNrTVhKcUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIzLCJhZHZTZWNyZXRLZXkiOiI2Uk5meUtweWhGanJRc1FMa2x4bmJEZmpFVFlGcUF5N2ZrdjVrUnZEcE93PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqZkVUY3ltNlNCR2lBU05jaWNWbk5RIiwicGhvbmVJZCI6ImI4NThjZTI5LTMwNDQtNGI2NC1hMmIyLWMxNTlkYzhiMzFjNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5dC8vR2NlUkV5TTR0cXZxSkpoajZ2QUp6MEk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUIremxmWVRxSHZJZU50K0dQY0tZNlB5eHdRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlA0OFAzTUNNIiwibWUiOnsiaWQiOiIyNTQxMTIxOTIxMTk6ODNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Qgs2GzLrwnZCAzYbMuvCdkJLNhsy68J2QhM2GzLrwnZCYzYbMuvCdkJHNhsy68J2Qh82GzLrwnZCOzYbMuvCdkIPNhsy68J2QhM2GzLrwnZCSzYbMuiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGFQMVpzQkVQU21pN2dHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUmZMWHVkb05xZDd3VFpFT1VzMWhGbTBRWnR4dTRabU00RlJsTTQzcFBncz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZm9ZWEo2azdDK2NuUmxoUkxlbnpWZWUwMS9YeFFoSlhhK1dCY3ljRHNaQ21Sdmx3TXd4d1FoTnBFYU8rbWNkVVhaMUhkNU9TbWsrSUtvTCt5YXJkQWc9PSIsImRldmljZVNpZ25hdHVyZSI6IjdTYTVueStwNFJpZG9LMGV0YUx6bHBGSFVaZkxoN2t0YXBLUEJFV3REOTFSQzl1UTlpREpDMTI5NXBnZ2ZTZzFtS3FVU3Y2VU9uTjlmeThFQnNtNUR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0MTEyMTkyMTE5OjgzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVYeTE3bmFEYW5lOEUyUkRsTE5ZUlp0RUdiY2J1R1pqT0JVWlRPTjZUNEwifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjgyMzg0NjZ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "CASEYRHODES",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254112192119",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'GON-FREECSS-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/WEaLzHn.jpeg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
