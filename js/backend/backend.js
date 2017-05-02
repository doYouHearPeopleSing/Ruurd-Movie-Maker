const electron = require('electron');
const {app, BrowserWindow} = electron;
const isDev = require('electron-is-dev');

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function exportWindowsInstaller() {
    const electronInstaller = require('electron-winstaller');
    resultPromise = electronInstaller.createWindowsInstaller({
        appDirectory: 'C:\\Users\\ruurd\\Documents\\Ruurd Movie Maker',
        outputDirectory: 'C:\\Users\\ruurd\\Documents\\Ruurd Movie Maker\\out',
        authors: 'Ruurd Bijlsma',
        exe: 'VideoEditor.exe'
    });

    console.log('Exporting file... Please wait');

    resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
}

function createWindow() {
    // if (isDev)
    //     exportWindowsInstaller();

    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, '../frontend/img/icon2.png'),
        width: width + 20,
        height: height + 20
    });

    let indexUrl = path.join(__dirname, '../frontend/index.html');
    mainWindow.loadURL(url.format({
        pathname: indexUrl,
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.setMenu(null);
    mainWindow.maximize();

    if (isDev)
        mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

require('./ffmpeg.js');