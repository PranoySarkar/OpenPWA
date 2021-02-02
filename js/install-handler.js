var deferredInstallPrompt = null;


window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredInstallPrompt = event;
    showDownloadPrompt();
});


document.querySelector('.downloadButton').addEventListener('click', downloadButtonClicked)

function downloadButtonClicked() {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice
        .then(function (choiceResult) {
            if (choiceResult.outcome === 'accepted') {

                deferredInstallPrompt = null;
                document.querySelector('.downloadPrompt').style.display = 'none';

            } else {
                console.log(choiceResult)
            }
        })
}

function showDownloadPrompt() {
    document.querySelector('.downloadPrompt').style.display = 'grid';
}

window.addEventListener('appinstalled', (evt) => {
    // Log install to analytics
    
    if (!isInStandaloneMode()) {
        alert('open in app');
    }
});

async function foo(){
    if ('getInstalledRelatedApps' in window.navigator) {
        const relatedApps = await navigator.getInstalledRelatedApps();
        relatedApps.forEach((app) => {
          //if your PWA exists in the array it is installed
          alert(app.platform, app.url);
        });
      }
}

foo();



const isInStandaloneMode = () =>(window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');



