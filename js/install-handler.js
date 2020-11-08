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

            }else{
                console.log(choiceResult)
            }
        })
}

function showDownloadPrompt() {
    document.querySelector('.downloadPrompt').style.display = 'grid';
}


