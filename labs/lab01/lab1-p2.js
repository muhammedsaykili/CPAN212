const http = require("http");
const fs = require("fs");

const app = http.createServer((req, res)=>{
    if(req.url === "/") {
        res.end("hello from Home")
    }
    else if(req.url === "/homepage") {
        let webpage = fs.readFileSync("pages/homepage.html")
        res.end(webpage)
    }
    else if(req.url === "/login") {
        let webpage = fs.readFileSync("pages/login.html")
        res.end(webpage)
    }
    else if(req.url === "/details") {
        let webpage = fs.readFileSync("pages/details.html")
        res.end(webpage)
    }
    else if(req.url === "/about"){
        let webpage = fs.readFileSync("pages/about.html")
        res.end(webpage)
    }
    else if(req.url === "/contact-us") {
        let webpage = fs.readFileSync("pages/contact-us.html")
        res.end(webpage)
    }
    else if(req.url === "/fetch-data") {
        let webpage = fs.readFileSync("pages/fetch-data.html")
        res.end(webpage)
    }
    else if(req.url === "/sales") {
        let webpage = fs.readFileSync("pages/sales.html")
        res.end(webpage)
    }
    else if(req.url === "/themes") {
        let webpage = fs.readFileSync("pages/themes.html")
        res.end(webpage)
    }
    else if(req.url === "/non-fiction") {
        let webpage = fs.readFileSync("pages/non-fiction.html")
        res.end(webpage)
    }
    else if(req.url === "/genres") {
        let webpage = fs.readFileSync("pages/genres.html")
        res.end(webpage)
    }
    else if(req.url === "/fiction") {
        let webpage = fs.readFileSync("pages/fiction.html")
        res.end(webpage)
    }
    else if(req.url === "/children") {
        let webpage = fs.readFileSync("pages/children.html")
        res.end(webpage)
    }
    else if(req.url === "/best-sellers") {
        let webpage = fs.readFileSync("pages/best-sellers.html")
        res.end(webpage)
    }
    else {
        res.end("Page not found")
    }
})

let PORT = 8000;
app.listen(PORT, ( )=>{
    console.log(`http://localhost:${PORT}`);
});