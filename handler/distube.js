module.exports = async (bot,distube) => {

    distube.on("addSong", async (queue, song) => {
      try {
        queue.textChannel.send({content:
          `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
                               });
      }catch(err){ console.log(err)}
    });
  distube.on("addList", async(queue,song)=>{
    
    
    queue.textChannel.send({content:`Songs add to list`})
    
  })

  distube.on("empty", (queue) =>
    queue.textChannel.send({content:"Channel is empty. Leaving the channel"})
  );

distube.on("error", (channel, e) => {
    if (channel) channel.send({content:`An error encountered: ${e}`});
    else console.error(e);
  });

  distube.on("finish", (queue) =>
    queue.textChannel.send({content:"No more song in queue"})
  );
distube.on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 100;
  });
  distube.on("noRelated", (queue) =>
    queue.textChannel.send({content:"Can't find related video to play."})
  );

  distube.on("playSong", (queue, song) =>
    queue.textChannel.send({content:
      `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
                           } )
  );
distube.on("searchCancel", (message) =>
    message.channel.send({content:`Searching canceled`})
  );
  distube.on("searchNoResult", (message, query) =>
    message.channel.send({content:`No result found for ${query}!`})
  );
  
  distube.on("searchResult", (message, results) => {
    message.channel.send({content:
      `**Choose an option from below**\n${results
        .map(
          (song, i) =>
            `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``
        )
        .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
                         } );
  });
};
