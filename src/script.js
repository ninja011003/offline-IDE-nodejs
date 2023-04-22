const fs = require('fs');
const { Http2ServerRequest } = require('http2');
function web_run(){
    var html=document.getElementById("html_input").value;
    var css="<style>"+ document.getElementById("css_input").value + "</style>";
    var js=document.getElementById("js_input").value;
    var output=document.getElementById("Output");
    output.contentDocument.body.innerHTML=html+css;
    output.contentWindow.eval(js);
}
function java_run(){
    // Get the input from the textarea
    var inputText = document.getElementById("java_input").value;

    // Send an HTTP request to the server with the input text
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/runningJava", true);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("Java file created successfully.");
            //processing the java file
            fetch("/outputJava", {
                method: "POST",
                body: console.log('running the java file'),
            })
            .then((response) => {
                // Handle response from server
                if (response.ok) {
                    console.log("Java file processed successfully.");
                    alert("Java file processed successfully."); // Show success message
                } else {
                    console.error("Failed to process Java file.");
                    alert("Failed to process Java file."); // Show error message
                }
            })
            .catch((error) => {
                console.error("Failed to send subsequent request:", error);
                alert("Failed to send subsequent request."); // Show error message
            });
        }
        else{
            console.log("Error occured")
        }
    };
    xhr.send(inputText);
    
}

/*
const { exec } = require('child_process');

// Replace "HelloWorld.java" with the name of your .java file
const javaFileName = "HelloWorld.java";

// Execute the "javac" command to compile the .java file
exec(`javac ${javaFileName}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error compiling Java file: ${err.message}`);
    return;
  }

  if (stderr) {
    console.error(`Compilation warnings/errors: ${stderr}`);
    return;
  }

  // Execute the "java" command to run the compiled .class file
  exec(`java ${javaFileName.replace('.java', '')}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error running Java program: ${err.message}`);
      return;
    }

    console.log(`Java program output:\n${stdout}`);
  });
});
*/




