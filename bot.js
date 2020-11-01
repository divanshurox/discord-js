// require("dotenv").config();
// const { Client, MessageEmbed } = require("discord.js");
// const client = new Client();
// const axios = require("axios");

// client.login(process.env.BOT_TOKEN);

// const PREFIX = process.env.PREFIX;

// // Utils
// const checkPermissions = (findRole) =>
//   findRole.permissions.has("ADMINISTRATOR") ||
//   findRole.permissions.has("KICK_MEMBERS") ||
//   findRole.permissions.has("BAN_MEMBERS") ||
//   findRole.permissions.has("MANAGE_GUILD");

// client.on("ready", () => {
//   console.log(`${client.user.tag} has logged in!`);
// });

// client.on("message", async (message) => {
//   if (
//     !message.author.bot &&
//     message.content.toLowerCase().startsWith(PREFIX + "tenet")
//   ) {
//     const queries = message.content.split(" ");
//     switch (queries[1]) {
//       case "choose": {
//         const randomIndex = Math.floor(Math.random() * 2) + 2;
//         message.channel.send(`I choose ${queries[randomIndex]}!!`);
//         message.react("😂");
//       }
//       case "breakbad": {
//         if (queries[2] === "randomChar") {
//           const getChar = async () => {
//             const res = await axios.get(
//               "https://www.breakingbadapi.com/api/character/random"
//             );
//             return res.data;
//           };
//           const char = await getChar();
//           const embed = new MessageEmbed()
//             .setTitle("Your mystery breaking bad character:")
//             .setColor(0xff0000)
//             .setImage(char[0].img)
//             .setDescription(`${char[0].portrayed} appeared!`)
//             .setAuthor(message.author.tag, message.author.displayAvatarURL())
//             .setThumbnail(message.author.displayAvatarURL())
//             .setTimestamp(new Date());
//           message.channel.send(embed);
//         }
//         break;
//       }
//       case "addrole": {
//         const arg = queries[2].toLowerCase();
//         const { cache } = message.guild.roles;
//         const findRole = cache.find((role) => role.name.toLowerCase() === arg);
//         if (findRole) {
//           if (message.member.roles.cache.has(findRole.id)) {
//             message.reply("You already have this role!");
//             return;
//           }
//           if (checkPermissions(findRole)) {
//             message.reply("You cant add yourself to this role!");
//           } else {
//             message.member.roles
//               .add(findRole)
//               .then((member) => {
//                 message.channel.send("You have been assigned the role!");
//                 message.react("👍🏼");
//               })
//               .catch((err) => {
//                 console.log(err);
//                 message.channel.send("Something went wrong");
//               });
//           }
//         } else {
//           message.reply("No such role found, punk!");
//           message.react("😂");
//         }
//         break;
//       }
//       case "addmultiRole": {
//         const args = message.content.toLowerCase().substring(20).split(", ");
//         const roleSet = new Set(args);
//         const { cache } = message.guild.roles;
//         roleSet.forEach((ele) => {
//           const role = cache.find((role) => role.name.toLowerCase() === ele);
//           if (role) {
//             if (message.member.roles.cache.has(role.id)) {
//               message.reply("You already have this role!");
//               return;
//             }
//             if (checkPermissions(role)) {
//               message.reply("You cannot be assigned a greater role!");
//             } else {
//               message.member.roles
//                 .add(role)
//                 .then((member) => {
//                   message.react("👍🏼");
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                   message.channel.send("Something went wrong");
//                 });
//             }
//           } else {
//             message.reply("No such role found, punk!");
//             message.react("😂");
//           }
//         });
//         message.channel.send("You have been assigned the role!");
//         break;
//       }
//       case "removeRole": {
//         const arg = queries[2].toLowerCase();
//         const { cache } = message.guild.roles;
//         const role = cache.find((role) => role.name.toLowerCase() === arg);
//         if (role) {
//           if (message.member.roles.cache.has(role.id)) {
//             message.member.roles
//               .remove(role)
//               .then((member) => {
//                 message.react("👍🏼");
//                 message.reply("Role has been de-assigned!");
//               })
//               .catch((err) => {
//                 console.log(err);
//                 message.channel.send("Something went wrong");
//               });
//           } else {
//             message.reply("You have got to be kidding me!");
//             message.react("👎🏼");
//           }
//         }
//         break;
//       }
//       case "announce": {
//         const text = message.content.substring("-tenet announce".length);
//         const channel = client.channels.cache.get("768509222144442389");
//         if (channel) {
//           channel.send(text);
//         }
//         break;
//       }
//       case "shortURL": {
//         if (queries.slice(2).length === 0) {
//           message.channel.send("Enter a link to short, punk!");
//           message.react("😂");
//         }
//         const [target, ...args] = queries.slice(2);
//         const config = {
//           headers: {
//             "X-API-KEY": "VcMiC4tZGdD1Lgu1KTiYfSNrs3Q_K3TMdVuSnStl",
//             "Content-Type": "application/json",
//           },
//         };
//         const jsonBody =
//           args.length !== 0
//             ? {
//                 target: target,
//                 description: args[0],
//                 expire_in: args[1],
//                 password: args[2],
//                 domain: args[3],
//               }
//             : {
//                 target: target,
//               };
//         const body = JSON.stringify(jsonBody);
//         const getShortUrl = async () => {
//           const res = await axios.post(
//             "https://kutt.it/api/v2/links",
//             body,
//             config
//           );
//           return res.data;
//         };
//         try {
//           const { link } = await getShortUrl();
//           message.channel.send("```Your shortened URL is: ${link}```");
//           message.react("🚀");
//         } catch (err) {
//           message.channel.send("oOps, There was some error!");
//           console.log(err);
//         }
//         break;
//       }
//       case "help": {
//         if (queries[2].toLowerCase() === "shorturl") {
//           const embed = new MessageEmbed()
//             .setTitle("ShortURL")
//             .setColor(0xff0000)
//             .setDescription(
//               'Fields:\n1) target- The url you want to short!\n2) description- The description of the url\n3) expire_in- The time you want to the link to retain\n4) password- Set password on the short URL\n5) domain- "kutt.it"\n-> Only target field is requiered field!\n-> The order is a must!!'
//             );
//           message.channel.send(embed);
//         }
//         break;
//       }
//     }
//   }
// });

require("dotenv").config();
const { Client, MessageEmbed } = require("discord.js");

const client = new Client();

const { getShortURL } = require("./discord");

client.login(process.env.BOT_TOKEN);

const PREFIX = process.env.PREFIX;

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in!`);
});

// -shorturl link expires 2 minutes domain dsctiet.in password test123 description []

client.on("message", async (message) => {
  if (!message.author.bot && message.content.toLowerCase().startsWith(PREFIX)) {
    const queries = message.content.split(" ");
    switch (queries[0]) {
      case PREFIX + "shortURL": {
        if (queries.length <= 1) {
          message.channel.send("Enter a link to shorten it!");
          message.react("😕");
          return;
        }
        try {
          const link = await getShortURL(queries.slice(1));
          message.channel.send(`Your short URL is: ${link}`);
          message.react("🚀");
        } catch (err) {
          message.channel.send(
            "There was some error! Please check the syntax by typing -help shortURL"
          );
          console.log(err);
        }
        break;
      }
      case PREFIX + "help": {
        if (queries[1].toLowerCase() === "shorturl") {
          const embed = new MessageEmbed()
            .setTitle("ShortURL")
            .setColor(0xff0000)
            .setDescription(
              'Fields:\n1) **target**- The url you want to short!\n2)**password**- Set password on the short URL\n3)**description**- The description of the url\n4)**domain**- "kutt.it"\n5)**expire_in**- The time you want to the link to retain\n-> Only target field is required field!\n->The order is a must!!'
            );
          message.channel.send(embed);
        }
        break;
      }
    }
  }
});
