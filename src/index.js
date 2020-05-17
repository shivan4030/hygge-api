import initialize from "./express/initialize";


const app = initialize();


app.listen(4014, () => console.log("Server started on port 4000"));
