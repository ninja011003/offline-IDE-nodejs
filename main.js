const express = require('express')
const fs = require('fs')
const path = require('path')
const child_process = require('child_process');
const http = require('http');

const server = express()
const app = http.createServer(server);
const port  = 6969;

async function openBrowser(port) {
    const url = `http://localhost:${port}`;
    const open = await import('open');
    open.default(url);
}

server.use(express.static(path.join(__dirname, 'src')));
function shutdown() {
    app.close(() => {
      console.log('Server terminated');
      process.exit(0);
    });
  }


//API
server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'src','HTML_page.html'));
})

server.get('/shutdown', (req, res) => {
    shutdown();
});

server.post("/runningJava", (req, res) => {
    let inputText = "";
    req.on("data", (chunk) => {
        inputText += chunk;
    });
    req.on("end", () => {
        const fileName = "sample.java";
        // Write the input text to the Java file
        fs.writeFile(fileName, inputText, (err) => {
            if (err) {
                //console.error(err);
                res.status(500).send("Failed to create Java file.");
            }
        });
    });
    const cmdCommand = 'java sample.java ';
    // Run the CMD command
    child_process.exec(cmdCommand, (error, stdout, stderr) => {
        //const file = "src/output.txt";
        if (error) {
            
            res.send("<pre><h3>"+error.message+"</h3></pre>");
        }
        else if (stdout) {
            
            res.send("<pre><h3>"+stdout+"</h3></pre>");
        }
        else if (stderr) {
            res.send("<pre><h3>"+stderr+"</h3></pre>");
        }
    }
    );
});

server.post("/runningPython", (req, res) => {
    let inputText = "";
    req.on("data", (chunk) => {
        inputText += chunk;
    });
    req.on("end", () => {
        const fileName = "sample.py";
        // Write the input text to the Java file
        fs.writeFile(fileName, inputText, (err) => {
            if (err) {
                //console.error(err);
                res.status(500).send("Failed to create Python file.");
            }
        });
    });
    const cmdCommand = 'python sample.py ';
    // Run the CMD command
    child_process.exec(cmdCommand, (error, stdout, stderr) => {
        //const file = "src/output.txt";
        if (error) {
            res.send("<pre><h3>"+error.message+"</h3></pre>");
        }
        else if (stdout) {
            res.send("<pre><h3>"+stdout+"</h3></pre>");
        }
        else if (stderr) {
            res.send("<pre><h3>"+stderr+"</h3></pre>");
        }
    }
    );
});

app.listen(port,()=>{
    console.log(`server running on port 6969`);
    openBrowser(port);
})



