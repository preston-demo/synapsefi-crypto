const Synapse = require('synapsenode');
const Client = Synapse.Client;
const User = Synapse.User;

const client = new Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    fingerprint: process.env.FINGERPRINT,
    ip_address: process.env.IP_ADDRESS,
    isProduction: false
});
  
const user = new User({
    data: {
        _id: process.env.USER_ID
    },
    headerObj: {
        fingerprint: process.env.FINGERPRINT,
        ip_address: process.env.IP_ADDRESS
    },
    client: client
});
// login to test user
const synapseRouter = (router) => {

    router.get('/getUser', async (req,res)=> {
        const userID = '5cbaadce01db7000656533f7';
        const options = {
        full_dehydrate: true
        };
        try {
            const user_res = await client.getUser(userID, options);
            res.cookie('auth_refresh_token', user_res.body.refresh_token);
            res.json({user_res: user_res});
        } catch(err) {
            throw new Error(err);
        }
    });
  
    router.get('/oauthUser', async (req, res)=>{
        const refresh_token = req.cookies.auth_refresh_token || null;
        console.log(refresh_token);
        try {
            const auth_user = await user._oauthUser({refresh_token: refresh_token});
            const oauth_key = auth_user.oauth_key;
            user.oauth_key = oauth_key;
            res.cookie('oauth_key', oauth_key);
            res.send({auth_user: auth_user});
        } catch(err) {
            throw new Error(err);
        }
    });
    
    router.get('/getCryptoData', async(req, res)=> {
        try {
            const crypto = await client.getCryptoMarketData();
            res.json({crypto: crypto.data});
        } catch(err) {
            throw new Error(err);
        }
    });
    
    /**
     * All routes after this point are experimental
     * 
     */

    router.get('/createCryptoWallet', async(req, res)=> {
        const body = {
            "type": "CRYPTO-US",
            "info": {
                "nickname":"My CRYPTO Wallet"
            }
        }
        
        try {
            const wallet = await user.createNode(body);;
            res.json({wallet: wallet.data});
        } catch(err) {
            throw new Error(err);
        }
    });
    
    router.get('/viewCard', async (req, res)=> {
        console.log(user)
        const interchangeNodeID = "5cbbb311a7279100d8f0808c";
    
        try {
            const card_node = await user.getNode("5cbbb311a7279100d8f0808c");
            res.json({card_node: card_node.data});
        } catch(err) {
            console.log(err)
            throw new Error(err);
        }
    });
    
    router.post('/depositFunds', async (req,res)=> {
        const depositNodeID = "5cbc2b80a7279100d8f09073";
        const body = {
            to: {
                type: 'DEPOSIT-US',
                id: depositNodeID
            },
            amount: {
                amount: 100.1,
                currency: 'USD'
            },
            extra: {
                ip: '127.0.0.1',
                note: 'Test transaction',
                same_day: true
            }
        }

        try {
            const deposit_funds = await user.createTransaction(depositNodeID, body);
            res.json({deposit_funds: deposit_funds.data});
        } catch(err) {
            throw new Error(err);
        }
        
    });
    
    router.post('/viewAcct', async (req,res)=> {
        const depositNodeID = "5cbc2b80a7279100d8f09073";
        try {
            const deposit_node = await user.getNode(depositNodeID);
            res.json({deposit_node: deposit_node.data});
        } catch(err) {
            console.log(err)
            throw new Error(err);
        }
    });
    
    router.post('/pushFunds', async (req, res)=> {
        const interchangeNodeID = "5cbbb311a7279100d8f0808c";
        const body = {
            "to": {
                "type": "INTERCHANGE-US",
                //user id
                "id": "5bd2b691dc00d56658258222"
            },
            "amount": {
                "amount": 100.1,
                "currency": "USD"
            }
        };

        try {
            const funds = await user.createTransaction(interchangeNodeID, body);
            res.json({funds: funds.data});
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
        
    });
    
    router.get('/getNodes', async (req, res)=> {
        try {
            const user_nodes = await user.getNode();
            res.send({user_nodes: user_nodes});
        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    });

    return router;
}

module.exports = synapseRouter;