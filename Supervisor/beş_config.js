module.exports = {

    token: "", //Bot Tokeniniz => Bot Oluşturduktan Sonra Intentsleri Açmayı Unutma!
    guildID: "", //Kullanıcağın Sunucunun ID'si
    voiceChannelID: "", // Ses Kanal ID'si
    presence: "Beş Was Here", //Botun Durumu
    footer: "Beş & Luppux", //Embedların Footer Yazısı
    botOwners: ["928259219038302258"], //Bot Sahibinin ID'si
    prefix: ".", //Botun Prefix'i 
    manemoji: "♂️", //Erkek Emojisi
    womanemoji: "♀️", //Kadın Emojisi
    tagSymbol: "•", //Sunucunun Taglı İsim Sembolu => Eğer Tagınız Yoksa Boş Bırakın Veya "•" Kalsın
    normalSymbol: "•", //Normal Kayıt Olucak Kullanıcıların Başına Gelicek Sembol
    symbolBeş: "|", //Kayıt Esnasında İsim Ve Yaş'ı Ayıran Çizgi
    minageAge: 15, //En Düşük Kayıt Edilebilir Yaş
    welcomeResimURL: "https://cdn.discordapp.com/attachments/950167988127006821/1088263193832472656/beeautiful-sunset-illustration-1212023.png", //Resimli Hoşgeldin Tasarımının Arkaplan'ı => URL Şeklinde Giriniz / gif veya webp Uzantısı Kabul Etmez  
    welcomeResimRenk: "#861765", //Resimli Hoşgeldin Tasarımının Çerçeve Rengi => HexColor Şeklinde Giriniz
    kayitsizHesapIsim: "İsim | Yaş", //Kayıtsızların Düzeltileceği İsim
    supheliHesapIsim: "Şüpheli", //Şüpheli Hesapların Düzeltileceği İsim
    banGif: "https://cdn.discordapp.com/attachments/1102681495283433612/1102723534612082798/wallpaperflare.com_wallpaper_1.jpg",
    shipArkaplan: "https://cdn.discordapp.com/attachments/930486300639891466/1103290225750450196/pexels-eberhard-grossgasteiger-1421903.jpg",
    selamVer:false, // Kayıt Olduktan Sonra Chat kanalında Butonla Selam Verme Sistemi


    //Eğer Buraya Kadar Yaptıysan .setup Komudunu Kullanarak Botu Sunucuna Kurmaya Başla.
    mongoURL: "", //MongoDB URL'niz
    topArkaplan: "https://cdn.discordapp.com/attachments/946826067174375494/1106207234783981678/pexels-eberhard-grossgasteiger-1421903.jpg", //Top Komutundaki Arkaplan Resmi (URL Şeklinde Girilicek) - Eğer Hata Verirse Bilinki URL'de Resim Yoktur,Başka Bir URL Deneyin. (⚠️ GIF,APNG Uzantılı Resimleri Desteklemez)
    taskSystem: false, // Görev Sisteminin Aktif Veya Deaktif Hale Getirir - true = Aktif / false = Deaktif

    staffs: [""], // Yetkililerin Rol ID'leri ["55555","55555"] Şeklinde Girilir

    parents: { // Kategorilerin ID'leri ["55555","55555"] Şeklinde Çoklu Girilebilir
        publicParents: [""],
        registerParents: [""],
        solvingParents: [""],
        privateParents: [""],
        aloneParents: [""],
        funParents: [""]
    },



    limit: {
        banLimit: 2,
        jailLimit: 3,
        muteLimit: 5,
    },


    logs: [
        { name: "guard-log" },
        { name: "family-log" },
        { name: "command-log" },
        { name: "ban-log" },
        { name: "jail-log" },
        { name: "vmute-log" },
        { name: "mute-log" },
        { name: "message-log" },
        { name: "voice-log" },
        { name: "register-log" },
        { name: "şüpheli-log" },
        { name: "rol-log" },
        { name: "yasaklı-tag-log" },
        { name: "rank-log" },
        { name: "others-log" },
        { name: "yetkili-başvurular" },
        { name: "invite-log" }
    ],
    emojis: [
        { name: "emote_hi", url: "https://cdn.discordapp.com/emojis/1102624348130521151.gif?size=128&quality=lossless" },
        { name: "emote_true", url: "https://cdn.discordapp.com/emojis/1102619858941784155.webp?size=128&quality=lossless" },
        { name: "emote_false", url: "https://cdn.discordapp.com/emojis/1102619855162703952.webp?size=128&quality=lossless" },
        { name: "emote_warn", url: "https://cdn.discordapp.com/emojis/1102620367337562273.webp?size=128&quality=lossless" },
        { name: "emote_man", url: "https://cdn.discordapp.com/emojis/1102620523780919376.webp?size=128&quality=lossless" },
        { name: "emote_woman", url: "https://cdn.discordapp.com/emojis/1102620489429565553.webp?size=128&quality=lossless" },
        { name: "emote_chat", url: "https://cdn.discordapp.com/emojis/1102621542363439305.webp?size=128&quality=lossless" },
        { name: "emote_computer", url: "https://cdn.discordapp.com/emojis/1102621545022627850.webp?size=128&quality=lossless" },
        { name: "emote_invite", url: "https://cdn.discordapp.com/emojis/1102621541121925262.webp?size=128&quality=lossless" },
        { name: "emote_voice", url: "https://cdn.discordapp.com/emojis/1102621543709806602.webp?size=128&quality=lossless" },
        { name: "emote_coin", url: "https://cdn.discordapp.com/emojis/1102622139376480276.gif?size=128&quality=lossless" },
        { name: "emote_home", url: "https://cdn.discordapp.com/emojis/1102622711718612993.webp?size=128&quality=lossless" },
        { name: "emote_value", url: "https://cdn.discordapp.com/emojis/1102622713408929923.gif?size=128&quality=lossless" },
        { name: "emote_others", url: "https://cdn.discordapp.com/emojis/1102624779950895134.webp?size=128&quality=lossless" },
        { name: "emote_emptystart", url: "https://cdn.discordapp.com/emojis/1102623376083791882.webp?size=128&quality=lossless" },
        { name: "emote_empty", url: "https://cdn.discordapp.com/emojis/1102623377421766687.webp?size=128&quality=lossless" },
        { name: "emote_emptyend", url: "https://cdn.discordapp.com/emojis/1102623378919149668.webp?size=128&quality=lossless" },
        { name: "emote_fillstart", url: "https://cdn.discordapp.com/emojis/1102623397550227577.webp?size=128&quality=lossless" },
        { name: "emote_fill", url: "https://cdn.discordapp.com/emojis/1102623398913376347.webp?size=128&quality=lossless" },
        { name: "emote_fillend", url: "https://cdn.discordapp.com/emojis/1102623401337696349.webp?size=128&quality=lossless" },
        { name: "emote_cmute", url: "https://cdn.discordapp.com/emojis/1102741501890547794.webp?size=128&quality=lossless" },
        { name: "emote_vmute", url: "https://cdn.discordapp.com/emojis/1102741503329194035.webp?size=128&quality=lossless" },
        { name: "emote_zero", url: "https://cdn.discordapp.com/emojis/1103844496162160650.gif?size=128&quality=lossless" },
        { name: "emote_one", url: "https://cdn.discordapp.com/emojis/1103844498670354522.gif?size=128&quality=lossless" },
        { name: "emote_two", url: "https://cdn.discordapp.com/emojis/1103844441598464040.gif?size=128&quality=lossless" },
        { name: "emote_three", url: "https://cdn.discordapp.com/emojis/1103844446468063282.gif?size=128&quality=lossless" },
        { name: "emote_four", url: "https://cdn.discordapp.com/emojis/1103844448787505232.gif?size=128&quality=lossless" },
        { name: "emote_five", url: "https://cdn.discordapp.com/emojis/1103844452218458212.gif?size=128&quality=lossless" },
        { name: "emote_six", url: "https://cdn.discordapp.com/emojis/1103844319644885082.gif?size=128&quality=lossless" },
        { name: "emote_seven", url: "https://cdn.discordapp.com/emojis/1103844321591038104.gif?size=128&quality=lossless" },
        { name: "emote_eight", url: "https://cdn.discordapp.com/emojis/1103844324346699796.gif?size=128&quality=lossless" },
        { name: "emote_nine", url: "https://cdn.discordapp.com/emojis/1103844326095732776.gif?size=128&quality=lossless" },
        { name: "emote_submessage", url: "https://cdn.discordapp.com/emojis/1103846079235108924.webp?size=128&quality=lossless" },
        { name: "emote_web", url: "https://cdn.discordapp.com/emojis/1105493458933792819.webp?size=128&quality=lossless" },
        { name: "emote_camera", url: "https://cdn.discordapp.com/emojis/1105493457453187162.webp?size=128&quality=lossless" },
        { name: "emote_time", url: "https://cdn.discordapp.com/emojis/1105494402136285376.webp?size=128&quality=lossless" }
    ],


    burcRoles: [
        { name: "Koç", icon: "https://cdn.discordapp.com/emojis/1054803690848006164.png?size=128&quality=lossless" },
        { name: "Boğa", icon: "https://cdn.discordapp.com/emojis/1054803741250957324.png?size=128&quality=lossless" },
        { name: "İkizler", icon: "https://cdn.discordapp.com/emojis/1054803754232324107.png?size=128&quality=lossless" },
        { name: "Yengeç", icon: "https://cdn.discordapp.com/emojis/1054788879422599209.png?size=128&quality=lossless" },
        { name: "Aslan", icon: "https://cdn.discordapp.com/emojis/1054803703808397413.png?size=128&quality=lossless" },
        { name: "Başak", icon: "https://cdn.discordapp.com/emojis/1054803729901166622.png?size=128&quality=lossless" },
        { name: "Terazi", icon: "https://cdn.discordapp.com/emojis/1099539509596663819.png?size=128&quality=lossless" },
        { name: "Akrep", icon: "https://cdn.discordapp.com/emojis/1054803768031588403.png?size=128&quality=lossless" },
        { name: "Yay", icon: "https://cdn.discordapp.com/emojis/1054788894262038548.png?size=128&quality=lossless" },
        { name: "Oğlak", icon: "https://cdn.discordapp.com/emojis/1054803665367617586.png?size=128&quality=lossless" },
        { name: "Kova", icon: "https://cdn.discordapp.com/emojis/1054803678168629398.png?size=128&quality=lossless" },
        { name: "Balık", icon: "https://cdn.discordapp.com/emojis/1054803716689113108.png?size=128&quality=lossless" },
    ],

    iliskiRoles: [
        { name: "Sevgilim Var", icon: "💖", color: "#ff0000" },
        { name: "Sevgilim Yok", icon: "🙄", color: "#2e5a6e" },
        { name: "Sevgili Yapmıyorum", icon: "🥱", color: "#bf9f3d" },
    ],

    etkinlikRoles: [
        { name: "Çekiliş Katılımcısı", icon: "🎉", color: "#21a327" },
        { name: "Etkinlik Katılımcısı", icon: "📣", color: "#2151a3" },
    ],

    renkRoles: [
        { name: "🍓", color: "#ff0000" },
        { name: "🍏", color: "#00ff00" },
        { name: "🍌", color: "#fffb17" },
        { name: "🍇", color: "#7417ff" },
        { name: "🌼", color: "#ffffff" },
        { name: "🥕", color: "#ff8400" },
    ],

    levelRoles: [
        { name: "Chat Bronze", color: "#b47402" },
        { name: "Chat Silver", color: "#b1b1b1" },
        { name: "Chat Gold", color: "#faff00" },
        { name: "Chat Diamond", color: "#00fffb" },
        { name: "Voice Bronze", color: "#b47402" },
        { name: "Voice Silver", color: "#b1b1b1" },
        { name: "Voice Gold", color: "#faff00" },
        { name: "Voice Diamond", color: "#00fffb" },
    ]



}