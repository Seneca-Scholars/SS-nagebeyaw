const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlite = require("sqlite3").verbose();

app.use(bodyParser.json());

class HouseComponents {
  constructor() {
    if (HouseComponents.instance) {
      // Return the existing instance if it already exists (singleton pattern)
      return HouseComponents.instance;
    }

    // Initialize the database property
    this.db = null;

    // Connect to the database when the instance is created
    this.connect()
      .then(() => {
        console.log("Database connection established.");
      })
      .catch((error) => {
        console.error("Failed to connect to the database:", error);
      });

    // Save the instance for future use
    HouseComponents.instance = this;
  }

  // Method to connect to the database and create the appointments table if it doesn't exist
  async connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite.Database(
        "../backend-api/database/data.db",
        sqlite.OPEN_READWRITE,
        (err) => {
          if (err) {
            console.error("Failed to connect to the database:", err);
            reject(err);
          } else {
            console.log("HouseComponents connection to database established.");
          }

          // Check if the 'appointments' table exists
          this.db.get(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='Components'",
            (err, row) => {
              if (err) {
                console.error("Failed to check for Components table:", err);
                reject(err);
              } else {
                if (!row) {
                  // If the 'appointments' table does not exist, create it
                  const sql = `CREATE TABLE components(
                  id INTEGER PRIMARY KEY,
                    price TEXT,
                    sqrft TEXT,
                    beds TEXT,
                    baths TEXT,
                    dateListed TEXT,
                    interestedPpl INTEGER
                )`;
                  this.db.run(sql, [], (err) => {
                    if (err) {
                      console.error("Failed to create table:", err);
                      reject(err);
                    } else {
                      console.log("Components table created successfully");
                      resolve();
                    }
                  });
                } else {
                  // If the 'appointments' table already exists, resolve the promise
                  console.log("Components table already exists");
                  resolve();
                }
              }
            }
          );
        }
      );
    });
  }
// Insert data

// const insertQuery = `INSERT INTO users (name, age) VALUES (?, ?)`;
// const name = 'Trevor';
// const age = 5;
// db.run(insertQuery, [name, age], function (err) {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log(`Inserted data with id ${this.lastID}`);
//     }
// });


}
const HouseInstance = new HouseComponents();
module.exports = {HouseInstance, HouseComponents}
