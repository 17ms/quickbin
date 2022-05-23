import dotenv from "dotenv"
import path from "path"

/* Additional check for running migrations,
 as the working directory changes from dist/ to src/configs/ */

const workDir = process.cwd().split("/")

if (
  workDir[workDir.length - 1].toLowerCase() === "configs" &&
  workDir[workDir.length - 2].toLowerCase() === "src"
) {
  dotenv.config({ path: path.join(__dirname, "../..", ".env") })
  console.log("Migrations")
} else {
  dotenv.config({ path: path.join(__dirname, "../../..", ".env") })
}
