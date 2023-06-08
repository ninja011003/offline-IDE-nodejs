@echo off

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo Java is not installed
    echo Installing Java...
    mkdir requirement
    REM Place the JDK installer file (e.g., jdk-installer.exe) in the same directory as this batch file
    start /wait jdk-19_windows-x64_bin.exe /s
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed
    echo Installing Python...
    mkdir requirement
    REM Place the Python installer file (e.g., python-installer.exe) in the same directory as this batch file
    start /wait python-3.9.5.exe /quiet InstallAllUsers=1 PrependPath=1 Include_test=0
)

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed
    echo Installing Node.js...
    mkdir requirement
    REM Place the Node.js installer file (e.g., node-installer.msi) in the same directory as this batch file
    start /wait msiexec /i "node-v18.16.0-x64.msi" /qn /norestart
)

REM All required software is now installed

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

REM All required node_modules are now installed

echo All required software and node_modules are installed...
echo Starting Application.....
node main




