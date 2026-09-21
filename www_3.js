const http = require("http");
const url = require("url");
const path = require("path");
//const fs= require('fs'); ASYNC puhul on vaja seda toetavat erilisemat moodulit 
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Hans Oskar Erikson, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const fs= require('fs').promises;
const pageBody = '\t<h1>Hans Oskar Erikson, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageBanner = '<img src="veebiprogrammeerimine_2026_TA.png" alt="">'
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res) {

    // parsin URL-i
    console.log("päring " + req.url);

    let currentURL = url.parse(req.url, true);

    console.log("parsituna " + currentURL.pathname);

    if (currentURL.pathname === "/") {

        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write(pageBody);
		res.write(pageBanner);
        res.write('\n\t<ul>');
        res.write('\n\t\t<li><a href="/vanasona">Tänane vanasõna</a></li>');
        res.write('\n\t</ul>');

        res.write(pageFoot);

        return res.end();
    }

    else if (currentURL.pathname === "/vanasona") {

        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write("<h1>Eesti vanasõnad</h1>\n\t<p>Siin näed tänase päeva vanasõna</p>\n\t<hr>");
        res.write('\n\t<p><a href="/">Tänane vanasõna</a></p>');
        res.write(pageFoot);

        res.end();
    }
	
	else if (currentURL.pathname === '/veebiprogrammeerimine_2026_TA.png') {
		//teeme pilid tgeliku asukoha programmile kättesaadavaks
		let picPath = path.join (__dirname, 'pic', 'veebiprogrammeerimine_2026_TA.png');
		try {
			const data = await fs.readFile(picPath);
			res.writeHead(200,{"Content-type": "image/png"	}});
			res.end(data);
	}  catch(err) {
      res.writeHead(404,( "Content-type": "text/plain; charset=utf8"))
	  return res.end("pilti ei leitud");
		}	
	}

    else {
        res.writeHead(404, {"Content-type": "text/html"});
        res.end("Viga 404, ei leia sellist lehte");
    }

}).listen(5109);
