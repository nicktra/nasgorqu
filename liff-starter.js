window.onload = function() {
    const useNodeJS = false;   // if you are not using a node server, set this value to false
    const defaultLiffId = "1655852149-bNvwDLLN";   // change the default LIFF value if you are not using a node server
 
    // DO NOT CHANGE THIS
    let myLiffId = "";
 
    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("liffAppContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};
 
/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}
 
/**
* Initialize LIFF
* @param {string} myLiffId The LIFF ID of the selected element
*/
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}
 
/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp() {
    displayLiffData();
    displayIsInClientInfo();
    registerButtonHandlers();
 
    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        getProfile();
        document.getElementById("isLogin").classList.remove('hidden');
        document.getElementById("isGuest").classList.add('hidden');
        document.getElementById('liffLoginButton').disabled = true;
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
    }
}
 
/**
* Display data generated by invoking LIFF methods
*/
function displayLiffData() {
    document.getElementById('isInClient').textContent = liff.isInClient();
    document.getElementById('isLoggedIn').textContent = liff.isLoggedIn();
}
 
/**
* Toggle the login/logout buttons based on the isInClient status, and display a message accordingly
*/
function displayIsInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('liffLoginButton').classList.toggle('hidden');
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
        document.getElementById('isInClientMessage').textContent = 'You are opening the app in the in-app browser of LINE.';
    } else {
        document.getElementById('isInClientMessage').textContent = 'You are opening the app in an external browser.';
    }
}

function getProfile(){
    //mendapatkan profil pengguna
    const lineProfile = document.getElementById('getProfileAcc');
    liff.getProfile()
    .then(profile => {
      nama = profile.displayName;
      avatar = profile.pictureUrl;
      lineProfile.innerHTML = `<img class="img-fluid rounded-circle" style="max-width: 80px;" src="${avatar}" alt="sobat"/> Hi, <b>${nama}</b>!`;
      })
    .catch((err) => {
      console.log('error', err);
    });
};

function registerButtonHandlers() {
    // openWindow call
    document.getElementById('openWindowButton').addEventListener('click', function() {
        liff.openWindow({
            url: 'https://nasgorqu.herokuapp.com/', // Isi dengan Endpoint URL aplikasi web Anda
            external: true
        });
    });

    // closeWindow call
    document.getElementById('closeWindowButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.closeWindow();
        }
    });

    // login call, only when external browser is used
    document.getElementById('liffLoginButton').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });

    // logout call only when external browse
    document.getElementById('liffLogoutButton').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });

    // sendMessages call
    document.getElementById('sendMessageButton').addEventListener('click', function() {
        let receipt = buttonReceiptListener();
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.sendMessages([{
                'type': 'text',
                'text': `${receipt}`
            }]).then(function() {
                window.alert('Ini adalah pesan dari fitur Send Message');
            }).catch(function(error) {
                window.alert('Error sending message: ' + error);
            });
        }
    });
}

// struk pesanan
function buttonReceiptListener() {

    let namaProfile = document.getElementById("getProfileAcc");

    let food1 = document.getElementById("item1");
    
    let food2 = document.getElementById("item2");
    
    let drink1 = document.getElementById("item3");
    
    let drink2 = document.getElementById("item4");
    
    let subPrice1 = document.getElementById("price1");
    
    let subPrice2 = document.getElementById("price2");
    
    let subPrice3 = document.getElementById("price3");
    
    let subPrice4 = document.getElementById("price4");
    
    let total = document.getElementById("total");
    
    
    let orderReceipt = "Hai, "+ namaProfile.innerHTML+"\n\n" +
    
        "Terimakasih telah memesan makanan dan minuman di NasgorQu! \n" +
    
        "Berikut adalah rincian pesanan anda: \n\n" +
    
        food1.innerHTML + " item Nasi Goreng : Rp. " + subPrice1.innerHTML + "\n" +
    
        food2.innerHTML + " item Mie Goreng : Rp. " + subPrice2.innerHTML + "\n" +
    
        drink1.innerHTML + " item Es Teh : Rp. " + subPrice3.innerHTML + "\n" +
    
        drink2.innerHTML + " item Es Jeruk : Rp. " + subPrice4.innerHTML + "\n\n" +
    
        "Maka,\n" +
    
        "Total harga Rp. " + total.innerHTML + "\n\n" +
    
        "Silahkan lakukan proses pembayaran di kasir ya :D";
   
    return orderReceipt;
}
/**
* Alert the user if LIFF is opened in an external browser and unavailable buttons are tapped
*/
function sendAlertIfNotInClient() {
    alert('This button is unavailable as LIFF is currently being opened in an external browser.');
}

/**
* Toggle specified element
* @param {string} elementId The ID of the selected element
*/
function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }
}