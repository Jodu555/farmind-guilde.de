const fs = require('fs');
const axios = require('axios');


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

const overallUpdates = [];

(async () => {

    const url = 'http://65.109.35.199:8123/up/world/world/1667494661476';



    let lastCheck = -1;
    setInterval(async () => {
        const { data: json } = await axios.get(url);
        let { players, updates } = json;
        updates = updates.filter(x => x.type != 'tile' && x.type != 'component').sort((a, b) => b.timestamp - a.timestamp);
        // console.log(`updates`, updates);

        updates = updates.filter(x => x.timestamp > lastCheck);

        if (updates[0]) {
            lastCheck = updates[0]?.timestamp;
        } else {
            if (lastCheck == -1)
                lastCheck = -1;
        }
        overallUpdates.push(...updates)

        fs.writeFileSync('out.json', JSON.stringify(overallUpdates, null, 3), 'utf8');
        console.log(`lastCheck`, lastCheck, 'len', overallUpdates.length);
    }, 1000);


})();
