
module.exports = async () => {
    mongoose.connect(config.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

        autoIndex: false
    }).then(() => {
    console.log(" Mongoose successfully connected.");
    }).catch(err => console.log(" An error occurred while connecting mongoose.", err));
}