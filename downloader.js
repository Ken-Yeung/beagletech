class workers{
    constructor(){
        this.url = "https://ws.beagletech.org/";
    }
    
    async request(type, url, data = {}){
        let result;

        await $.ajax({
            type: type, // POST, GET
            url: this.url + url,
            data: JSON.stringify(data),
            success: (resp) => {
                // POST was successful - do something with the response
                // console.log('Server sent back: ' + resp);
                result = resp;
            },
            error: (resp) => {
                // Server error, e.g. 404, 500, error
                console.log(resp);
                result = resp;
            }
        });

        return result;
    }
}

function proper(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
}

const update_time = async () => {
    let laber = new workers();
    let result = await laber.request("GET", "apk/time");

    let ids = [
        "label_driver",
        "label_user"
    ]

    for(let i = 0; i < ids.length; i++){
        let id = ids[i];
        let propered = proper(id.split("_")[1]);
        let date = result[id.split("_")[1]];

        document.getElementById(id).innerText = `${propered}\n最後更新：${date}`;
    }

    // console.log(result);
}

(function(){
    const user_btn = document.getElementById("user_btn");
    // const url = "https://ws.beagletech.org/";
    // console.log("Hello World.");

    update_time();
    
    try {
        const typpo = new URLSearchParams(window.location.search).get('type');
        if (typpo=="user"){
            setTimeout(()=>{
                user_btn.click();
            }, 333);
        }
    } catch(e){}
    
  })();