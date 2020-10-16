const app = {};

ons.ready(() => {
    app.menuOpen = function () {
        var menu = document.getElementById('menu');
        menu.open();
    };

    app.menuLoad = function (page) {
        var content = document.getElementById('content');
        var menu = document.getElementById('menu');
        content.load(page).then(menu.close.bind(menu));
    };
});
