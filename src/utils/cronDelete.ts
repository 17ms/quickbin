import cron from "node-cron"
import db from "../configs/database"

// Cleans week old posts every Sunday from the database

// Formatting to ISO 8601 for postgres
const curDate = new Date(Date.now())
const limitDateISO = new Date(curDate.getDate() - 7).toISOString()

cron.schedule("0 0 * * 0", async () => {
  console.log("Running cron job to clean week old posts from the database")
  await db("posts")
    .where("created_at", "<=", limitDateISO)
    .del()
    .catch((err) => {
      console.log(`Error running the cron job: ${err}`)
    })
  console.log("Cron job completed successfully")
})
