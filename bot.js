'use strict';
const { Client, MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const client = new Client({ disableEveryone: true});
const moment = require('moment');
const fs = require('fs');
const request = require('request');
const fetch = require("node-fetch");
const search = require('youtube-search');

const opts = {
    maxResults: 25,
    key: "Google_Api_Key",
    type: 'video'
};

let maskdata = new Object;
let maskdataArray = new Array();
let end = new Array();

/* 봇이 준비를 완료하면 */
client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity('Hello? I am NODEBOT!', {type: "PLAYING"})
});

/* 랜덤 숫자 뽑는 함수 */
function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* 랜덤 색상 뽑는 함수 */
function RandomColor() {
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
}

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', async message => {

  
  let prefix = "노드야 ";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  const getJSON = await fetch(`https://builder.pingpong.us/api/builder/PingPong_ID/integration/v0.2/custom/${message.author.id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic APIKEY`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      request: {
        query: message.content.substring("노드야 ".length)
      }
    })
  }).then(res => res.json());



  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(`${prefix}서버정보`)) {

    const servericon = message.guild.iconURL;
    const infoEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle('ServerInfo!')
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setDescription(message.guild.name + ' 의 정보 입니다.')
      .setThumbnail(message.guild.iconURL())
      .addFields(
        { name: 'Server Name', value: message.guild.name, inline: true },
        { name: 'Total Members', value: message.guild.memberCount + "명", inline: true },
        { name: 'Owner Name', value: message.guild.owner, inline: true },
        { name: 'System Channel', value: message.guild.systemChannel, inline: true },
        { name: 'Server Region', value: message.guild.region, inline: true },
        { name: 'AFK Voice Channel', value: message.guild.afkChannel, inline: true },
        { name: 'Created Date', value: moment(message.guild.createdAt).format("YYYY MM DD, h:mm A"), inline: false },
        { name: 'Server Emojis', value: message.guild.emojis, inline: false },
        )
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());

    message.channel.send(infoEmbed);
  }

  else if (message.content.startsWith(`${prefix}유저정보`)) {
    const infoEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle('User Info!')
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(message.author.username + ' 의 정보 입니다.')
      .setThumbnail(message.author.avatarURL())
      .addFields(
        { name: 'User Name', value: message.author.username, inline: false },
        { name: 'User Status', value: message.author.presence.status, inline: false },
        { name: 'User Discord Tag', value: message.author.tag, inline: false },
        { name: 'Account Created At', value: moment(message.author.createdAt).format("YYYY년 MM월 DD일"), inline: false },
        { name: 'Server Joined At', value: moment(message.author.joinedAt).format("YYYY년 MM월 DD일"), inline: false },
        { name: 'Currently Playing', value: message.author.presence.game, inline: false },
        { name: 'Have Roles', value: message.author.roles, inline: false },
        )
      .setTimestamp()
      .setFooter(message.author.username, message.guild.iconURL());

    message.channel.send(infoEmbed);
  }

  else if (message.content.startsWith(`${prefix}브라우저`)) {
    let SelectNumber = 111;
    let BrowserName = [ "웨일 (Whale)", "크롬 (Chrome)", "크로미움 (Chromium)", "오페라 (Opera)", "사파리 (Safari)", "엣지 (Edge)", "익스플로러 (Internet Explorer, IE)" ];
    let BrowserImgUrl = [ 
      "https://pbs.twimg.com/profile_images/974568795950915584/1mLPi8Qd_400x400.jpg", // 웨일 
      "https://lh3.googleusercontent.com/KwUBNPbMTk9jDXYS2AeX3illtVRTkrKVh5xR1Mg4WHd0CG2tV4mrh1z3kXi5z_warlk", // 크롬 
      "https://dydtjr1128.github.io/img/Chromium/Chromium_logo.png", // 크로미움
      "https://ww.namu.la/s/ae80ced893201aafc6a456d91d7c8dbf4689bcd0e4d69186bff9b729ea00034a162678dd5881331f72b94cca54bcb6e9c50052ed9e7016f75ece765dc0c4c2aa0626a3ba8ba4493f6f513e6f9f6b13b42aa4d0475549aad09723e48aac634478", // 오페라
      "https://lh3.googleusercontent.com/proxy/jAeNikZ7-dI0CkHLP2ltyDrOmQ9izu1VjfBld2iyh7lxQGYxCeoXzfZuErSTg4Zo0GK9JJeYyUY1UM9XaYx8OyIj4YqpBedMYJhdcCHtPOhbuIZW6GC0CYAEHZeh0SPmwwOIY7gb75DYW4gV5sm63lJulS1pNqeF9bgf2TbL6UXRTy3NcQHilQ", // 사파리
      "https://www.bloter.net/wp-content/uploads/2015/05/edge_logo.jpg", // 엣지 
      "https://lh3.googleusercontent.com/proxy/9or4fq_SKwwiZcV2_YTYeEcPPw5xcAyatecjFZMSP3D8VfBXGpMvEB9PFfwogZgzicsq9xSC4GxsF6aghqXL2yX0iRCGbVC1GaNbnLHx8ff180JxavWFXoIp5Vo3rEVKdCTOfKs5hi5ud3uNae1TdlRdnxSdivxjZaQvxpRsEHr4K-hA4PwQuMfJMseE1__WyIOY20mco8G4bbTz6F571oUqwqbav6nF3kYUtXiqx0vvPWzTgIIMq_d60Zo9dX-mAJ4taGbiP_F6Kcslm9dV2XdUJuW9WG4P2b6Wm_fN" // IE
    ];
    let BrowserCompany = [ "네이버 (Naver)", "구글 (Google)", "구글 (Google)", "오페라 (Opera)", "애플 (Apple)", "마이크로소프트 (Microsoft)", "마이크로소프트 (Microsoft)" ];
    let BrowserReleased = [
      "2017년 10월 16일",
      "2008년 9월 2일",
      "2008년 9월 2일",
      "2012년 6월 14일",
      "2003년 1월 7일",
      "‎2015년‎ ‎7월 29일",
      "1995년 8월 16일"
    ];
    let BrowserLanguages = [
      "C, C++, 자바스크립트",
      "C, C++, 자바스크립트, 자바, 파이썬",
      "C, C++, 자바스크립트",
      "C++",
      "C++, 오브젝티브-C, 스위프트",
      "C++, C#",
      "C++"
    ];
    let BrowserGood = [
      "옴니태스킹, 퀵 서치, 사이트 번역, TTS(문장을 음성으로 읽기)",
      "인터페이스, 쉬운 검색, 탭 조절, 사생활 보호, 확장 프로그램",
      "오픈소스, 플래시 플러그인, AV 코덱",
      "속도, 자체 VPN",
      "IOS 연동성, I Cloud 연동가능",
      "UI, (노트북) 배터리, 다양한 확장 앱",
      "ActiveX의 연동성(?)",
    ];
    let BrowserEmbedColor = [ "#2ECCFA", "#F3F781", "#81BEF7", "#FA5858", "#5858FA", "#A9A9F5", "#58FAF4" ];

    if(messageArray[2] === "웨일") { SelectNumber = 0; }
    else if (messageArray[2] === "크롬") { SelectNumber = 1; }
    else if (messageArray[2] === "크로미움") { SelectNumber = 2; }
    else if (messageArray[2] === "오페라") { SelectNumber = 3; }
    else if (messageArray[2] === "사파리") { SelectNumber = 4; }
    else if (messageArray[2] === "엣지") { SelectNumber = 5; }
    else if (messageArray[2] === "익스플로러") { SelectNumber = 6; }
    else if (messageArray[2] === "목록") {
      const BrowserListEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle(`
웨일
크롬
크로미움
오페라
사파리
엣지
익스플로러
      `)
      .setTimestamp()
    message.channel.send(BrowserListEmbed);
    }
    else { 
      message.channel.send("브라우저 이름이 올바르지 않습니다. (노드야 브라우저 목록)");  
    }
    
    if (SelectNumber !== 111) {
      const BrowserEmbed = new Discord.MessageEmbed()
        .setColor(BrowserEmbedColor[SelectNumber])
        .setTitle('Browser Infomation!')
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(BrowserName[SelectNumber] + ' 의 정보 입니다.')
        .setThumbnail(BrowserImgUrl[SelectNumber])
        .addFields(
          { name: '개발사 (회사)', value: BrowserCompany[SelectNumber], inline: false },
          { name: '브라우저 발표일', value: BrowserReleased[SelectNumber], inline: false },
          { name: '작성 언어', value: BrowserLanguages[SelectNumber], inline: false },
          { name: '장점', value: BrowserGood[SelectNumber], inline: false },
        )
        .setTimestamp()
      message.channel.send(BrowserEmbed);
    } else { return; }
  }

  else if (message.content.startsWith(`${prefix}아이디`)) {
    const idEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle('Discord ID Info!')
      .setDescription('User ID : ' + message.author.id)
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());

    message.channel.send(idEmbed);
  }

  else if (message.content.startsWith(`${prefix}표정`)) { 
    let FaceVlue = RandomInt(0, 19);
    let FaceArray = [
      "(*ૂ❛ัᴗ❛ั*ૂ)", "(￣(ｴ)￣)ﾉ",
      "(◍•ᴗ•◍)", "(๑˃̵ᴗ˂̵)و",
      "(❁´▽`❁)", "✿˘◡˘✿",
      "(͒ ˊ• ૢ·̫•ˋૢ)", "(❀╹◡╹)",
      "'◡'✿", "°˖✧◝(⁰▿⁰)◜✧˖°",
      "✦‿✦", "٩(๑>∀<๑)۶",
      "( ๑˃̶ ꇴ ˂̶)♪⁺", "✧*.◟(ˊᗨˋ)◞.*✧",
      "₍₍ ◝(・ω・)◟ ⁾⁾", "₍₍ ◝(・ω・)◟ ⁾⁾",
      "凸(｀0´)凸", "╭∩╮(︶︿︶)╭∩╮",
      "(♯ ▼ 皿 ▼)", "(╬◣ 益 ◢)"
    ];

    if(messageArray[2] === "목록") { 
      const FaceEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle(FaceArray)
    message.channel.send(FaceEmbed); 

    } else {
    const FaceEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle(FaceArray[FaceVlue])
    message.channel.send(FaceEmbed);
    }
  }

  else if (message.content.startsWith(`${prefix}도와줘`)) {
    const servericon = message.guild.iconURL;
    const helpEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle('Command Help')
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setDescription('Node.BOT의 명령어 입니다.')
      .addFields(
        { name: '노드야 도와줘', value: '도움말을 전송합니다.', inline: false },
        { name: '노드야 서버정보', value: '서버의 정보를 확인합니다.', inline: false },
        { name: '노드야 유저정보', value: '자신의 정보를 확인합니다.', inline: false },
        { name: '노드야 다이스 (목록)', value: '주사위를 돌립니다.', inline: false },
        { name: '노드야 운세 (목록)', value: '운세를 확인합니다.', inline: false },
        { name: '노드야 표정 (목록)', value: '노드봇의 표정을 확인합니다 (랜덤)', inline: false },
        { name: '노드야 핑', value: '핑을 확인합니다.', inline: false },
        { name: '노드야 확률 [~~~]', value: '~~할 확률을 봅니다.', inline: false },
        { name: '노드야 브라우저 목록', value: '지원하는 브라우저 목록을 확인합니다.', inline: false },
        { name: '노드야 브라우저 [~~~]', value: '~~~ 브라우저의 정보를 확인합니다.', inline: false },
        { name: '노드야 초대해', value: '노드봇을 초대하는 링크를 출력합니다.', inline: false },
        { name: '노드야 유튭검색', value: '유튜브에서 영상을 검색합니다 (명령어 사용 후 키워드 입력)', inline: false },
        )
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL());
    message.author.send(helpEmbed)
    message.reply('DM으로 도움말을 전송하였습니다.');
  }

  else if (message.content.startsWith(`${prefix}다이스`)) {
    if(messageArray[2] === "목록") { 
      const LuckyEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle("주사위인데 당연히 1, 2, 3, 4, 5, 6 중에 하나 아니겠음? ㅋ")
    message.channel.send(LuckyEmbed); 

    } else {
      let DiceVlue = RandomInt(1, 6);
      const diceEmbed = new Discord.MessageEmbed()
        .setColor(RandomColor())
        .setTitle("🎲 " + DiceVlue)
      message.channel.send(diceEmbed);
    }
  }

  else if (message.content.startsWith(`${prefix}운세`)) {
    let LuckyVlue = RandomInt(0, 6);
    let LuckyArray = [
      "💖 하는 일마다 잘된다.",
      "💙 흔들림이 있지만 결과가 좋다",
      "💛 심하게 흔들리지만 결과는 좋다",
      "🖤 자신을 잘 살펴라, 악순환이 반복될 것이다.",
      "💔 만남이 있으면 헤어짐이 있을 것이다.",
      "💕 곧 새로운 짝을 만나게 될 것이다.",
      "🔥 운세를 판별할 수 없는 인생입니다."
    ];

    if(messageArray[2] === "목록") { 
      const LuckyEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle(LuckyArray)
    message.channel.send(LuckyEmbed); 

    } else {
    const LuckyEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle(LuckyArray[LuckyVlue])
    message.channel.send(LuckyEmbed);
    }
  }

  else if (message.content.startsWith(`${prefix}핑`)) {
    const msg = await message.channel.send(`🏓 Pinging....`);
    setTimeout(function() {
      msg.edit(`🏓 Pong! (${msg.createdAt - message.createdAt}ms)`);
    }, 1000);
  }

  else if (message.content.startsWith(`${prefix}확률`)) {
    const text = args.join(' ')
    setTimeout(function() {
      const RandomEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle(text + " [" + Math.floor(Math.random() * 100 + 1) + "%]")
      .setTimestamp()
      .setFooter("NodeBot", message.guild.iconURL());
    message.channel.send(RandomEmbed);
    }, 1000);
  }

  else if (message.content.startsWith(`${prefix}초대해`)) {
    const InviteNormalEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle('일반(추천) 권한으로 초대')
      .setURL('https://discordapp.com/api/oauth2/authorize?client_id=685101146951516180&permissions=2103475366&scope=bot')
      .setFooter(message.author.username, message.guild.iconURL());
    message.channel.send(InviteNormalEmbed);
    const InviteSudoEmbed = new Discord.MessageEmbed()
      .setColor(RandomColor())
      .setTitle('관리자(Sudo) 권한으로 초대')
      .setURL('https://discordapp.com/api/oauth2/authorize?client_id=685101146951516180&permissions=8&scope=bot')
      .setFooter(message.author.username, message.guild.iconURL());
    message.channel.send(InviteSudoEmbed);
  }

  else if (message.content.startsWith(`${prefix}노드야`)) {
    message.channel.send("저 안죽었어요! 왜그러시죠?");
  }

  else if (message.content.startsWith(`${prefix}유튭검색`)) {
    let embed = new Discord.MessageEmbed()
      .setColor("#73ffdc")
      .setTitle("검색할 유튜브 동영상 제목을 입력하세요.")
      .addFields(
        { name: 'Tip Plus', value: '검색은 접두사 없이 입력해 주세요', inline: false },
        { name: 'Serach Example', value: '리그오브레전드 매드무비 (Enter)', inline: false },
      )
    let embedMsg = await message.channel.send(embed);
    let filter = m => m.author.id === message.author.id;
    let query = await message.channel.awaitMessages(filter, { max: 1 });
    let results = await search(query.first().content, opts).catch(err => console.log(err));
    if (results) {
      let youtubeResults = results.results;
      let i = 0;
      let titles = youtubeResults.map(result => {
        i++;
        return i + "번 : " + result.title;
      });
      message.author.send({
        embed: {
          title: '검색하신 유튜브 검색 결과 입니다!',
          description: titles.join("\n")
        }
      }).catch(err => console.log(err));
      message.channel.send("검색 결과를 DM으로 전송하였습니다!");
      filter = m => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length;
      let collected = await message.channel.awaitMessages(filter, { maxMatches: 1 });
      let selected = youtubeResults[collected.first().content - 1];
      embed = new Discord.MessageEmbed()
        .setTitle(`${selected.title}`)
        .setURL(`${selected.link}`)
        .setDescription(`${selected.description}`)
        .setThumbnail(`${selected.thumbnails.default.url}`);
      message.author.send(Embed);
    }
  }
  else {
    const DefaultChatEmbed = new Discord.MessageEmbed()
      .setColor("#4C939D")
      .setTitle(getJSON.response.replies[0].text)
    message.channel.send(DefaultChatEmbed);
  }

});
  

client.login('Token');
