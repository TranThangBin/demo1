const http = require("http");
const fs = require("fs");

const server = http.createServer(async (req, res) => {
	switch (req.url) {
		case "":
		case "/":
			fs.readFile("./index.html", (err, buff) => {
				res.end(buff);
			});
			break;

		case "/dog":
			try {
				const dogRes = await fetch("https://dog.ceo/api/breeds/image/random");
				const data = await dogRes.json();
				res.setHeader("Content-Type", "text/html");
				res.end(`<img src="${data.message}" />`);
			} catch (error) {
				res.statusCode = 500;
				res.setHeader("Content-Type", "text/plain");
				res.end("internal server error");
			}
			break;

		default:
			res.statusCode = 404;
			res.end("Page not found");
			break;
	}
});

server.listen(3000);
