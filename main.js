const express = require('express')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process');

const app = express()
app.use(express.static('./src'))
app.use(express.static(__dirname))

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./src/HTML_page.html'))
})

app.post("/runningJava", (req, res) => {
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
    const cmdCommand = 'java sample.java';
    // Run the CMD command
    exec(cmdCommand, (error, stdout, stderr) => {
        const file = "src/output.txt";
        if (error) {
            fs.writeFile(file,`${error.message}`,(err)=>{
                if(err){
                    alert("error running the java code plz retry");
                }
            })
            res.send(error.message);
        }
        else if (stdout) {
            
            fs.writeFile(file,`${stdout}`,(err)=>{
                if(err){
                    alert("error running the java code plz retry");
                }
            })
            res.send(stdout);
        }
        else if (stderr) {
            fs.writeFile(file,`${stderr}`,(err)=>{
                if(err){
                    alert("error running the java code plz retry");
                }
            })
            res.send(stderr);
        }
    }
    );
});

app.listen(5050,()=>{
    console.log('server running');
})

