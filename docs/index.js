});

function menuOpen() {
    var menu = document.getElementById('menu');
    menu.open();
}

function menuLoad(page) {
    var content = document.getElementById('content');
    var menu = document.getElementById('menu');
    content.load(page).then(menu.close.bind(menu));
}

