const express = require('express')
const fs = require('fs')
const path = require('path')
const child_process = require('child_process');
const bodyParser = require('body-parser');
const http = require('http');

const server = express()
const app = http.createServer(server);
const port  = 6969;
// server.set('view engine','ejs');
async function openBrowser(port) {
    const url = `http://localhost:${port}`;
    const open = await import('open');
    open.default(url);
}
// Middleware to parse JSON data in the request body
server.use(bodyParser.json());
// Set the extended option to true if you expect nested objects in the data
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname,'views')));

//API
server.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','HTML_page.html'));
    // res.sendFile('HTML_page.ejs');
})
server.post('/shutdown', (req, res) => {
    app.close();
    console.log('Server terminated');
    process.exit(0);
});
server.post('/runHTML', (req, res) => {
    //console.log(req.body);
    const { html, css, js } = req.body; 
    // Concatenate CSS, JS, and HTML
    const output = `
      <style>${css}</style>
      <script>${js}</script>
      ${html}
    `;
  
    // Write the data to a sample.html file
    fs.writeFile('sample.html', output, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error writing file');
      } else {
        // Send the sample.html file as the response
        res.sendFile('sample.html', { root: __dirname });
      }
    });
  });
  
server.post("/runJava", (req, res) => {
    console.log(req.body);
    var inputText = req.body.java;
    const fileName = "sample.java";
        // Write the input text to the Java file
        fs.writeFile(fileName, inputText, (err) => {
            if (err) {
                //console.error(err);
                res.status(500).send("Failed to create Java file.");
            }
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

server.post("/runPython", (req, res) => {
    console.log(req.body);
    var inputText = req.body.python;
    const fileName = "sample.py";
        // Write the input text to the Java file
        fs.writeFile(fileName, inputText, (err) => {
            if (err) {
                //console.error(err);
                res.status(500).send("Failed to create python file.");
            }
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



