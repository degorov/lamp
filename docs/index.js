document.addEventListener('init', (event) => {
    var pageId = event.target.id;
    console.log('PAGE LOAD', pageId);

    if (pageId === 'connect') {
        checkConnection(true);
    } else if (pageId !== 'main') {
        checkConnection(false);
    }

    if (pageId === 'effects') {
        console.log('GET EFFECT');
    } else if (pageId === 'alarm') {
        window.cmdAlarmSave = document.getElementById('cmdAlarmSave');
        console.log('GET ALARM');
    } else if (pageId === 'settings') {
        console.log('GET SETTINGS');
    } else if (pageId === 'connect') {
        document.getElementById('txtConnectIp').value = localStorage.getItem('lamp-ip') || '';
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

function liveBrightness(br) {
    document.getElementById('lblBrightness').innerText = br;
}

function enableConnection() {
    document.getElementById('txtConnectIp').disabled = false;
    document.getElementById('cmdConnect').disabled = false;
}

function checkConnection(isConnectPage) {
    var lampIp = localStorage.getItem('lamp-ip') || '';
    var iconStatus = document.querySelector('.iconStatus');
    if (lampIp) {
        fetch(`http://${lampIp}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'ping' }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 'OK') {
                    iconStatus.style.color = 'forestgreen';
                } else {
                    iconStatus.style.color = 'red';
                }
                if (isConnectPage) enableConnection();
            })
            .catch(() => {
                iconStatus.style.color = 'red';
                if (isConnectPage) enableConnection();
            });
    } else {
        iconStatus.style.color = 'gray';
        if (isConnectPage) enableConnection();
    }
}

function connectLamp() {
    var txtConnectIp = document.getElementById('txtConnectIp');
    var enteredIp = txtConnectIp.value.trim();
    if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(enteredIp)) {
        document.querySelector('.iconStatus').style.color = 'gray';
        txtConnectIp.disabled = true;
        document.getElementById('cmdConnect').disabled = true;
        localStorage.setItem('lamp-ip', enteredIp);
    } else {
        ons.notification.alert('Недопустимый IP-адрес', { title: 'Ошибка ' });
        localStorage.removeItem('lamp-ip');
    }
    checkConnection(true);
}
