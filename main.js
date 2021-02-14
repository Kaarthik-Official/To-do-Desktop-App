const {app,BrowserWindow, Menu} = require("electron");

const path = require('path');
const url = require('url');
//Global variable to keep window open
let win;

function createWindow(){
    win = new BrowserWindow({icon: __dirname + '/ICON.png'});
    //load index.html page
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:' ,
        slashes: true
    }));

    
    //When we close the window
    win.on('closed',()=>{
        win = null;
    });
    
    //Build from Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert Menu
    Menu.setApplicationMenu(mainMenu); 
}

//When app is ready ,create we run createWindow
app.on('ready',createWindow);

//Quit when all windows are closed
app.on('window-all-closed', ()=>{
    if(process.platform !=='darwin'){ //goes when windows is operating system
        app.quit();
    }
});

//Create Menu Template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'Ctrl+R',
                click(){
                    win.reload();
                }
            },
            {
                label: 'Quit',
                accelerator: 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];