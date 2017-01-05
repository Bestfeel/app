/**
 * Created by feel on 2016/12/28.
 */
const {app, nativeImage, BrowserWindow, Menu} = require('electron');


// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var window = null;
if (app.dock) {
    app.dock.setIcon(nativeImage.createFromPath("publish/assets/logos/mac-logo.png"));
}
// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {

    // 创建浏览器窗口。
    window = new BrowserWindow({
        title: '数据点解析可视化工具',
        width: 860,
        height: 720,
        // frame: false,
       // show: false,
        minWidth: 500,
        minHeight: 350,
        // transparent: true,
        resizable: true,
        webPreferences: {webSecurity: false},
        icon: 'file://' + __dirname + '/publish/assets/logos/mac-logo.icns'
    });

    window.loadURL('file://' + __dirname + '/publish/index.html', {webSecurity: false});

    window.title = "数据点解析可视化工具";
    var template = [{
        label: "Application",
        submenu: [
            {label: "About Application", selector: "orderFrontStandardAboutPanel:"},
            {type: "separator"},
            {
                label: "Quit", accelerator: "Command+Q", click: function () {
                app.quit();
            }
            }
        ]
    }, {
        label: "Edit",
        submenu: [
            {label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
            {label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
            {type: "separator"},
            {label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
            {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
            {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
            {label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
        ]
    }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
// 打开开发工具
// window.openDevTools();

// 当 window 被关闭，这个事件会被发出
    window.on('closed', function () {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        window = null;
    });
})
;
// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        app.quit();
    }
    app.quit();

});


