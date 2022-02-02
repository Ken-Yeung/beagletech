class class_worker{
    constructor(id, debug=false){
        let status = id.toString().charAt(0) == ".";
        if(!status){
            this.elem = document.getElementById(id.toString());
        } else {
            this.elem = document.querySelector(id,toString());
        }
        this.debug = debug;
    }

    add(class_name){
        if(this.elem.classList.contains(class_name) == false){
            this.elem.classList.add(class_name);
            if(this.debug){
                console.log(`Class: [${class_name}] added.`);
            }
        } else if(this.debug){
            console.log(`Class: [${class_name}] existed.`);
        }
        return false;
    }

    remove(class_name){
        if(this.elem.classList.contains(class_name)){
            this.elem.classList.remove(class_name);
            if(this.debug){
                console.log(`Class: [${class_name}] removed.`);
            }
        } else if(this.debug){
            console.log(`Class: [${class_name}] not found.`);
        }
        return false;
    }

    delay_add(class_name, ms){
        var element = this.elem;
        let debug = this.debug;
        setTimeout(()=>{
            if(element.classList.contains(class_name) == false){
                element.classList.add(class_name);
                if(debug){
                    console.log(`Class: [${class_name}] added by delay after ${ms.toString()}ms.`);
                }
            } else if(debug){
                console.log(`Class: [${class_name}] existed after ${ms.toString()}ms.`);
            }
        },ms);
    }

    delay_remove(class_name, ms){
        var element = this.elem;
        let debug = this.debug;
        setTimeout(()=>{
            if(element.classList.contains(class_name)){
                element.classList.remove(class_name);
                if(debug){
                    console.log(`Class: [${class_name}] removed by delay after ${ms.toString()}ms.`);
                }
            } else if(debug){
                console.log(`Class: [${class_name}] not found after ${ms.toString()}ms.`);
            }
        },ms);
    }
}

class workers{
    constructor(){
        this.url = "https://app.beagletech.org/";
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
        let date = result[id.split("_")[1]][0];
        let time = result[id.split("_")[1]][1];

        document.getElementById(id).innerText = `${propered}\n最後更新：${date}\n${time}`;
    }

    // console.log(result);
}

var shown = (id)=>{
    let table = new class_worker(id);
    table.remove("noshow");
    table.delay_remove("opc-0", 99);
};

(function(){
    const user_btn = document.getElementById("user_btn");
    // const url = "https://ws.beagletech.org/";
    // console.log("Hello World.");

    update_time();
    
    try {
        const typpo = new URLSearchParams(window.location.search).get('type');
        if (typpo!="" && typpo != null){
            setTimeout(()=>{
                // if (typpo == "user"){
                //     user_btn.click();
                // }
                shown(typpo);
                // user_btn.click();
            }, 333);
        }
    } catch(e){}
    
  })();