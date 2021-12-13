
Moralis.Cloud.define("createDex", async (request)=> {

    const logger = Moralis.Cloud.getLogger();

    const Dex = Moralis.Object.extend("Dex");
    const dex = new Dex();

    dex.set("name", request.params.name);
    dex.set("address", request.params.address);


    dex.save()
        .then((dex) => {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + dex.id);
        }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Moralis.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        });

})
