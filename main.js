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
        // Generate the Java file name (you can modify this to suit your needs)
        const fileName = "input.java";
        // Write the input text to the Java file
        fs.writeFile(fileName, inputText, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Failed to create Java file.");
            } else {
                console.log(`Java file "${fileName}" created successfully.`);
                res.status(200).send("Java file created successfully."); 
            }
        });
    });
});
app.post("/outputJava",(req,res)=>{
    // Replace the CMD command with the one you want to run
    const cmdCommand = 'java input.java';
    // Run the CMD command
    exec(cmdCommand, (error, stdout, stderr) => {
        const file = "output.txt";
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            fs.writeFile(file,`Error executing command: ${error.message}`,(err)=>{
                if (err) {
                    console.error(err);
                    res.status(500).send("Failed to process java file");
                } else {
                    console.log(`Java file "${file}" processed successfully.`);
                    res.status(200).send("Java file processed successfully."); 
                }
            })
            return;
        }
        if (stdout) {
            console.log(`Command output: ${stdout}`);
            fs.writeFile(file,`Command output: ${stdout}`,(err)=>{
                if (err) {
                    console.error(err);
                    res.status(500).send("Failed to process java file");
                } else {
                    console.log(`Java file "${file}" processed successfully.`);
                    res.status(200).send("Java file processed successfully."); 
                }
            })
        }
        if (stderr) {
            console.error(`Command error: ${stderr}`);
            fs.writeFile(file,`Command error: ${stderr}`,(err)=>{
                if (err) {
                    console.error(err);
                    res.status(500).send("Failed to process java file");
                } else {
                    console.log(`Java file "${file}" processed successfully.`);
                    res.status(200).send("Java file processed successfully."); 
                }
            })
        }
    });
})

app.listen(5050,()=>{
    console.log('server running');
})
