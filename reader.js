let db = require('./db.json')
// console.log(db)

for (const dbElement of db) {
    console.log(dbElement.link)
}
