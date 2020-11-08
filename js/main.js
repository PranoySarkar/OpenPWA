


window.addEventListener('load',main)
function main(){

    vaildateCacheIfOnline()
    .then(_=>{
        
    })

}




function vaildateCacheIfOnline(){

    return new Promise((resolve,reject)=>{

        fetch(`config.json?cacheBust=${new Date().getTime()}`)
        .then(response => { return response.json() })
        .then(config => {

            let installedVersion = Settings.getVersion()
            if ( installedVersion== 0) {
                Settings.setVersion(config.version)
                document.querySelector('#version').innerHTML= `version ${config.version}`;
                return resolve();
            }
            else if (installedVersion != config.version) {
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
                document.querySelector('#version').innerHTML= `version ${installedVersion}`;
                return resolve();
            }
        }).catch(err=>{
            console.log(err);
            return resolve();
            //handle offline here 
        })
    })

}

