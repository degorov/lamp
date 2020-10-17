document.addEventListener('init', (event) => {
    var pageId = event.target.id;
    console.log('PAGE LOAD', pageId);

    var iconStatus = event.target.querySelector('.iconStatus');

    if (iconStatus) {
        if (checkConnection()) {
            iconStatus.style.color = 'green';
        } else {
            iconStatus.style.color = 'red';
        }
    }

    if (pageId === 'effects') {
        console.log('GET EFFECT');
    } else if (pageId === 'alarm') {
        window.cmdAlarmSave = document.getElementById('cmdAlarmSave');
        console.log('GET ALARM');
    }
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

function effectLoad(effect, thisOli) {
    document.querySelectorAll('#effects ons-list-item').forEach((oli) => {
        if (oli.classList.contains('expanded')) {
            oli.hideExpansion();
        }
        if (oli === thisOli) {
            oli.querySelector('ons-icon').setAttribute('icon', 'md-check-circle');
        } else {
            oli.querySelector('ons-icon').setAttribute('icon', 'md-circle-o');
        }
    });
    console.log('SET EFFECT', effect);
}

function effectAdjust(thisRange) {
    console.log('ADJUST', thisRange.value);
}

function alarmSwitch() {
    console.log('ALARM SWITCH');
    alarmSave();
}

function alarmRepeat(day, onschk) {
    console.log('REPEAT', day, onschk.checked);
    window.cmdAlarmSave.style.visibility = 'visible';
}

function alarmTime(onstxt) {
    console.log(onstxt.value);
    window.cmdAlarmSave.style.visibility = 'visible';
}

function alarmBefore(onstxt) {
    console.log(onstxt.value);
    window.cmdAlarmSave.style.visibility = 'visible';
}

function alarmAfter(onstxt) {
    console.log(onstxt.value);
    window.cmdAlarmSave.style.visibility = 'visible';
}

function alarmSave() {
    console.log('SET ALARM');
    window.cmdAlarmSave.style.visibility = 'hidden';
}

