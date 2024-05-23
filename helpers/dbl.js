
const { AutoPoster } = require('topgg-autoposter')
module.exports = {
    

	init(bot){
    try{
    
    
    
    AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyMDQxMDM1NjAzNDE3OTA4MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjU4NjU0ODEyfQ.ddQgzL2XdZszR0Oo8wiU4cTfDacJ_cKNIiVmNgKg0BQ', bot)
  .on('posted', () => {
    console.log('Posted stats to Top.gg!')
  });
    
		
      const express = require('express')
const Topgg = require('@top-gg/sdk')

const app = express() // Your express app

const webhook = new Topgg.Webhook("hama1234+") // add your Top.gg webhook authorization (not bot token)

app.post('/dblwebhook', webhook.listener(async (vote) => {
  console.log("top.gg voted")
  
  const dUser = await bot.users.fetch(vote.user)
  const member= await User.findOne({userID: dUser.id}) || await User.create({userID: dUser.id});
  member.money = member.money + 1200;
  member.save();
  dUser.send({content:`You are Voted BoBo amd gave your 1200 BoBo money`}).catch(()=>{});
  const logsChannel = bot.channels.cache.get(config.votes.channel);
  if(logsChannel){
    logsChannel.send({content:`${dUser.tag} Voted BoBo bot id: ${dUser.id}`})
  }
  
  // vote is your vote object // 221221226561929217
})) // attach the middleware
//app.listen(8080) // your port
      
      
      
      
      
      
		
		
	}catch(err){
    return console.log(err.message)
  }}

};