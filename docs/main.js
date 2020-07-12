const divLampStatus = document.getElementById('lamp-status');

const txtIpAddress = document.getElementById('txt-ip-address');
const btnSaveConnection = document.getElementById('btn-save-connection');

txtIpAddress.value = getIpFromStorage();
checkConnection();

function getIpFromStorage() {
  return localStorage.getItem('lamp-ip') || '';
}

function checkConnection() {
  const lampIp = getIpFromStorage();
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
          divLampStatus.style.backgroundColor = 'lime';
        } else {
          divLampStatus.style.backgroundColor = 'red';
        }
        txtIpAddress.disabled = false;
        btnSaveConnection.disabled = false;
      })
      .catch(() => {
        divLampStatus.style.backgroundColor = 'red';
        txtIpAddress.disabled = false;
        btnSaveConnection.disabled = false;
      });
  } else {
    divLampStatus.style.backgroundColor = 'gray';
    txtIpAddress.disabled = false;
    btnSaveConnection.disabled = false;
  }
}

btnSaveConnection.addEventListener('click', () => {
  const enteredIp = txtIpAddress.value.trim();
  if (/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(enteredIp)) {
    divLampStatus.style.backgroundColor = 'gray';
    txtIpAddress.disabled = true;
    btnSaveConnection.disabled = true;
    localStorage.setItem('lamp-ip', enteredIp);
  } else {
    alert('Недопустимый IP-адрес');
    localStorage.removeItem('lamp-ip');
  }
  checkConnection();
});
