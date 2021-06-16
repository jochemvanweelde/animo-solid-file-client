import { readFile, readFileSync } from 'fs';
import { SolidNodeClient } from 'solid-node-client';
const client = new SolidNodeClient();

let loginformation = await client.login({
  idp : "https://jvwer.solidcommunity.net", 
  username : "USERNAME_HERE",
  password : "PASSWORD_HERE",
});

const filename = "trinsic-wallet-16-6-2021-1399fdf6.txt"

function waitForLogin() {
  if(!loginformation.loggedIn){
    setTimeout(waitForLogin, 50);
    return;
  }
  console.log(loginformation);
}

waitForLogin()

var filebuffer = readFileSync("saved_credentials/" + filename);

console.log(filebuffer)

// write a resource
let writeResponse = await client.fetch( 'https://jvwer.solidcommunity.net/backup_credentials/' + filename, {
  method : "PUT",
  body : filebuffer,
  headers : { "Content-type" : 'text/plain' }
});
console.log( await writeResponse);

let readResponse = await client.fetch( 'https://jvwer.solidcommunity.net/backup_credentials/' + filename );
// display its contents
console.log( await readResponse.text()  );
