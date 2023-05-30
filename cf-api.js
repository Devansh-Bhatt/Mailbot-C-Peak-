const axios = require("axios");
const crypto = require("crypto");
const rand = (parseInt(Math.random()*1000000)).toString();
const current_time = (parseInt(new Date().getTime()/1000)).toString();

require("dotenv/config")
let apiSig = rand + '/contest.standings?apiKey=' + process.env.CF_API_KEY + '&contestId=' + process.env.CONTEST_ID + '&count=' + process.env.TO_RANK + '&from='+ process.env.FROM_RANK +'&showUnofficial=true' +'&time=' + current_time + '#' + process.env.CF_API_SECRET; 
let hash = crypto.createHash("sha512").update(apiSig).digest();
hash = hash.toString('hex');
apiSig = rand + hash;
const get = {
async response(){
    const finallist = [];
    try {
        const response = await axios.get(`https://codeforces.com/api/contest.standings?contestId=${process.env.CONTEST_ID}&apiKey=${process.env.CF_API_KEY}&time=${current_time}&from=${process.env.FROM_RANK}&count=${process.env.TO_RANK}&apiSig=${apiSig}&showUnofficial=true`);
        const data = response.data.result.rows;
        data.map((row)=>{
            const party = row.party.members;
            party.map((member)=>{finallist.push(member.handle)})
        });
    } catch (error) {
        console.log(error);
    }
    console.log(finallist)
    // return finallist;
    
}

};
get.response()
module.exports = get;


