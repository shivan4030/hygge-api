import initialize from "./express/initialize";


const app = initialize();


app.listen(4016, () => console.log("Server started on port 4016"));
