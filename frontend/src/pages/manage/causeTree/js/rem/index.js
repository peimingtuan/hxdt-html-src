function allSize() {
    let deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth <= 1200) deviceWidth = 1200;
    window.REM = deviceWidth / 19.2
    document.documentElement.style.fontSize = REM + 'px';
}

allSize();
window.onresize = function () {
    allSize();
};

