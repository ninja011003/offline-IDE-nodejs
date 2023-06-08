@echo off

cd %~dp0

REM Check if required node_modules exist
if not exist "node_modules\express" (
    echo express is not installed
    echo Installing express...
    npm install express
)

if not exist "node_modules\fs" (
    echo fs is not installed
    echo Installing fs...
    npm install fs
)

if not exist "node_modules\path" (
    echo path is not installed
    echo Installing path...
    npm install path
)

if not exist "node_modules\child_process" (
    echo child_process is not installed
    echo Installing child_process...
    npm install child_process
)

if not exist "node_modules\body-parser" (
    echo body-parser is not installed
    echo Installing body-parser...
    npm install body-parser
)

if not exist "node_modules\http" (
    echo http is not installed
    echo Installing http...
    npm install http
)

echo All node requirements exists