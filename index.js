const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const port = process.env.DB_PORT || 3001;
// Syncing all the models at once.
conn.sync({ alter:true }).then(() => {
  server.listen(port, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
