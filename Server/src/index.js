const axios = require('axios');

(async () => {

    const url = 'http://65.109.35.199:8123/up/world/world/1667494661476';

    // {
    //     type: 'chat',
    //     source: 'player',
    //     playerName: 'vunux',
    //     message: 'ist jz tag',
    //     account: 'vunux',
    //     channel: '',
    //     timestamp: 1667496830354
    //   },

    // {
    //     type: 'playerjoin',
    //     playerName: 'stoar',
    //     account: 'stoar',
    //     timestamp: 1667496852005
    //   }
    // {
    //     type: 'playerquit',
    //     playerName: 'stoar',
    //     account: 'stoar',
    //     timestamp: 1667496852005
    //   }

    setInterval(async () => {
        const { data: json } = await axios.get(url);
        console.log(json.updates.filter(x => x.type != 'tile').length);
    }, 1000);


})();
