const fs = require("fs");

function createEnvFile() {
  console.log(process.env);
  const envContent = `window.env = ${JSON.stringify(process.env, null, 2)};`;

  fs.writeFile("./src/env.js", envContent, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("env.js file has been created with environment variables");
    }
  });
}

createEnvFile();
