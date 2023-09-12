const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output: process.stdout
})
const contact = [];
function mainmenu(){
console.log("1) Add Contact");
console.log("2) view all contact");
console.log("3) search for a contact");
console.log("4)Exit ");
rl.question("Type a number",(ans)=>{
    switch (ans){
        case 1:
            addcontact();
            break;
        case 2:
            viewallcontacts() ;
            break;
        case 3:
            searchforaContact();
            break;
        case 4:
            exit();

    }
})
}
function addcontact(){
    rl.question("Enter name: ", (name) => {
        rl.question("Enter phone number: ", (phone) => {
            contacts.push({ name, phone });
            console.log(`Contact ${name} added successfully.`);
            mainMenu();
        });
    });
}
function viewallcontacts(){
    console.log("\nContacts:");
    contact.forEach(c => {
        console.log(`Name: ${c.name}, Phone: ${c.phone}`);
    });
    mainMenu();
}
function searchforaContact(){
    rl.question("Enter name to search: ", (name) => {
        const contact = contact.find(c => c.name.toLowerCase() === name.toLowerCase());
        if (contact) {
            console.log(`Found: Name: ${contact.name}, Phone: ${contact.phone}`);
        } else {
            console.log("Contact not found.");
        }
        mainMenu();
    });
}
mainmenu()