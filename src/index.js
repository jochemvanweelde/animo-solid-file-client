import { link, readFileSync } from 'fs';
import { SolidNodeClient } from 'solid-node-client';
const client = new SolidNodeClient();

const solid_link = "https://jvwer.solidcommunity.net";
const filename = "trinsic-wallet-16-6-2021-1399fdf6.txt";
const foldername = "backup_credentials";

const account_username = "USERNAME_HERE";
const account_password = "PASSWORD_HERE";

const main = async () => {
  //Sign in to a public accesible solid pod account
  let login_information = await login();

  //Wait for finishing signing in
  waitForLogin( login_information );

  //Write a credential file to the pod
  writeCredentialToPod();

  //Read a credential file from the pod (gibberish)
  readCredentialFromPod();
}

const login = async () => {
  let loginformation = await client.login({
    idp : solid_link, 
    username : account_username,
    password : account_password,
  });
  return loginformation;
}

const waitForLogin = async ( loginformation ) => {
  if(!loginformation.loggedIn){
    setTimeout(waitForLogin( loginformation ), 400);
    return;
  }
  console.log( loginformation );
}

const writeCredentialToPod = async () => {
  var filebuffer = readFileSync("saved_credentials/" + filename);

  console.log( filebuffer )

  // write a resource
  let writeResponse = await client.fetch( solid_link + "/" + foldername + "/" + filename, {
    method : "PUT",
    body : filebuffer,
    headers : { "Content-type" : 'text/plain' }
  });
  console.log( await writeResponse );
}

const readCredentialFromPod = async () => {
  let readResponse = await client.fetch( 'https://jvwer.solidcommunity.net/backup_credentials/' + filename );
  // display its contents
  console.log( await readResponse.text()  );
}

main();