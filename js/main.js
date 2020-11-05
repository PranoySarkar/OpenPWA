


window.addEventListener('load',main)
function main(){

    vaildateCacheIfOnline()
    .then(_=>{
        
    })

}

function handleInstall(){

  

   

}


function vaildateCacheIfOnline(){

    return new Promise((resolve,reject)=>{

        fetch(`config.json?cacheBust=${new Date().getTime()}`)
        .then(response => { return response.json() })
        .then(config => {

            if (Settings.getVersion() == 0) {
                Settings.setVersion(config.version)
                return resolve();
            }
            else if (Settings.getVersion() != config.version) {
                console.log('Cache Version mismatch')
                fetch(`config.json?clean-cache=true&cacheBust=${new Date().getTime()}`).then(_ => {
                    //actually cleans the cache
                    Settings.setVersion(config.version);
                    window.location.reload();
                   
                    return resolve();  // unnecessary
                });

            }else{
                // already updated
                console.log('Cache Updated')
                return resolve();
            }
        }).catch(err=>{
            console.log(err);
            return resolve();
            //handle offline here 
        })
    })

}

