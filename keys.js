console.log('this is loaded');



exports.ID = {
  OMDB:{
    id: process.env.OMDB_KEY
  },
  spotify: {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  }
}