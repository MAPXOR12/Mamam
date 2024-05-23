const app = require ("express").Router();
console.log("security route has been ready")
app.get(
  "/dashboard/guild/:guildID/security",
  global.checkAuth,global.apiLimiter,
  async (req,res)=>{
  try{
  const guild = bot.guilds.cache.get(req.params.guildID)
  const user = await guild.members.fetch(req.user.id);
  if(!user.permissions.has("ManageGuild")){return res.send("You can't access to this page")}
  const data = await Antis.findOne({guildID:guild.id})
  if(!data){ return await Antis.create({
    guildID: guild.id
  })}

  res.render("./guild/security.ejs",{
config:config,
    req:req,
    guild:guild,
    bot: bot,
    data:data,
    user: req.isAuthenticated() ? req.user : null,

    
  })}catch(err){console.log(err.message)}})
app.post(
  "/dashboard/guild/:guildID/security",
         global.checkAuth, global.apiLimiter,
         async (req,res)=>{
    
    const guild = bot.guilds.cache.get(req.params.guildID)

  const user = await guild.members.fetch(req.user.id);
  if(!user.permissions.has("ManageGuild")){return res.send("You can't access to this page")}
    let rbody = req.body
  const data = await Guild.findOne({guildID:guild.id})
  if(!data){ return await Guild.create({
    guildID: guild.id
  })}



           if (
      Object.prototype.hasOwnProperty.call(
        rbody,"channelCnumber")){


await Antis.findOneAndUpdate({guildID: guild.id},{

$set:{
  "channelC.limit":rbody["channelCnumber"],
  "channelD.limit":rbody["channelDnumber"],
  "channelU.limit":rbody["channelUnumber"],
"roleC.limit":rbody["roleCnumber"],
  "roleD.limit":rbody["roleDnumber"],
  "roleU.limit":rbody["roleUnumber"],

}


  
})
             res.send({success:true, message:"successfully"})

             
        }

    if(rbody ["onoff"]=== "true"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ enabled:true}})
    
       
    
    }
    if(rbody ["onoff"]=== "false"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ enabled:false
}
      })
    
        
    
    }
///// channel Create enable or disable system 
    if(rbody ["channelCenabled"]=== "true"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "channelC.enabled":true
}
      })
    
        
    
    }
              
if(rbody ["channelCenabled"]=== "false"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "channelC.enabled":false
}
      })
    
        
    
}
           /////// channel Delete enable or disable system

if(rbody ["channelDenabled"]=== "true"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "channelD.enabled":true
}
      })
    
        
    
}
           if(rbody ["channelDenabled"]=== "false"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "channelD.enabled":false
}
      })
    
        
    
           }
////// chnnnel Update enable or disable system
           if(rbody ["channelUenabled"]=== "true"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "channelU.enabled":true
}
      })
    
        
    
           }
           if(rbody ["channelUenabled"]=== "false"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "channelU.enabled":false
}
      })
    
        
    
          
         }



           ///// role create 
           if(rbody ["roleCenabled"]=== "true"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "roleC.enabled":true
}
      })
    
        
    
           }
if(rbody ["roleCenabled"]=== "false"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "roleC.enabled":false
}
      })
    
        
    
}

////// role Deleted

if(rbody ["roleDenabled"]=== "true"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "roleD.enabled":true
}
      })
    
        
    
}
if(rbody ["roleDenabled"]=== "false"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "roleD.enabled":false
}
      })
    
        
    
}/////// role update 

if(rbody ["roleUenabled"]=== "true"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "roleU.enabled":true
}
      })
    
        
    
}
if(rbody ["roleUenabled"]=== "false"){
      await Antis.updateOne({
guildID: guild.id},{
        $set:{ "roleU.enabled":false
}
      })
    
        
    
}
         })
    









module.exports = app;