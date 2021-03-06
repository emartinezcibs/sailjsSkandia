/**
 * SAPController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var rfc = require('node-rfc');
var abapSystem = {
    user: 'amurugesan',
    passwd: 'amurugesan9',
    ashost: '10.0.0.25',
    sysnr: '00',
    client: '330',
    saprouter: ''
};

// create new client
var client = new rfc.Client(abapSystem);
client.connect(function (err) {
    if (err) { // check for login/connection errors
        return console.error('could not connect to server', err);
    } else {
        return console.error('Connected');
    }



});
function getRoles(userType){
    switch (userType) {
        case "C":
        return {
            orders:{
                c:true,
                r:true,
                u:true,
                d:true
            },
            comments:{
                c: true,
                r: true,
                u: true,
                d: true
            }
        }
            
            break;
    
        default:
            break;
    }
    return [{ test: 'test' }]
}
module.exports = {
    login: async function (req, res) {
        let roles=[];
        try{
            if (!req.param('userId') && !req.param('password')) {
            return res.badRequest({ err: 'bad request params missing' })

        }
            client.invoke('ZSDJ_USER_VALIDATION_REACT',
            { USER_ID: req.param('userId'), PASSWORD: req.param('password') },
            //{ USER_ID: 'BOVERTON', PASSWORD: 'SAPTEST', IM_CSR: 'C' },
            function (err, response) {
                if (err) {
                    console.error('Error invoking STFC_STRUCTURE:', err);

                    client.close();
                    client.connect(function (err) {
                        if (err) {
                            console.error('could not connect to server', err);
                        } else {
                            console.error('Connected');
                        }
                    });
                    return res.serverError({msg:"Error"});
                }
                
                if (response.EMESSAGE ==="Authentication failed"){
                    res.status(401);
                    return res.send({ err: 'unauthorized', token: "", currentAuthority: "admin"});
                    

                }else{
                    const token = JWTService.issuer({ user: response.USER_ID }, '1 day');
                    console.log(response);
                    
                    return res.ok({ msg: response, roles: getRoles(response.USER_TYPE), token: token, currentAuthority: "admin" })
                }
                
            }); 
        }
        catch (err) {
            return res.serverError(err);
        }
       
    },
    fetchType: async function (req, res) {
        let data={};
        try {
            if (!req.param('userId') && !req.param('password')) {
                return res.badRequest({ err: 'bad request params missing' })

            }
            client.invoke('ZSDJ_USER_TYPE_REACT',
                { USER_ID: req.param('userId') },
                //{ USER_ID: 'BOVERTON', PASSWORD: 'SAPTEST', IM_CSR: 'C' },
                function (err, response) {
                    if (err) {
                        //return console.error('Error invoking STFC_STRUCTURE:', err);
                        client.close();
                        client.connect(function (err) {
                            if (err) {
                                console.error('could not connect to server', err);
                            } else {
                                console.error('Connected');
                            }
                        });
                    }
                    console.log(response);
                    //console.log(response.USER_TYPE);
                    let roles={};
                    let userType= (typeof response !== undefined) ? "" : response.USER_TYPE;  
                    switch (userType) {
                        case "C":
                            roles = { comments: { c: false, r: true, u: true, d: true } };
                            break;
                        case "D":
                            roles = { comments: { c: true, r: true, u: true, d: true } };
                            break;
                        default:
                            break;
                    }
                    data={user: response,roles};
                    return res.ok({ data })
                    

                });
        }
        catch (err) {
            return res.serverError(err);
        }

    },
    currentUser: async function(req, res){
        const payload = {
            $desc: "",
            $params: {
                pageSize: {
                    desc: 'test',
                    exp: 2,
                },
            },
            $body: {
                name: 'Serati Ma',
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                notifyCount: 12,
            },
            name: 'Skandia User',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            userid: '00000001',
            notifyCount: 12
        };
        return res.ok(payload);

    }
  

};

