// import dns from "dns"
// dns.setServers(["8.8.8.8", "8.8.4.4"]);
// dns.setDefaultResultOrder("ipv4first");

import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

