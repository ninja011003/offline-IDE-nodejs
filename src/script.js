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
    var output = document.getElementById("Output")
    // Send an HTTP request to the server with the input text
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/runningJava", true);
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.send(inputText);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log("Java file created successfully in script file");
            console.log(xhr.responseText);
            output.contentDocument.body.innerHTML="<p><strong>"+xhr.response+"</strong></p>";
        }
        else{
            console.log("Error occured")
        }
    };
}

