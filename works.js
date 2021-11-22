// <-- ###### class ###### -->
class class_worker{
    constructor(id, debug){
        this.elem = document.getElementById(id.toString());
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

class event_listen {
    constructor(){
        this.form = document.querySelectorAll(".form");

        this.form_1_sumbit = document.getElementById("submit-step1"); //Start
        this.form_2_sumbit = document.getElementById("submit-step2"); //Arg 1
        this.form_3_sumbit = document.getElementById("submit-step3"); //Arg 2
        this.form_4_sumbit = document.getElementById("submit-step4"); //Arg 3

    }

    all_forms(){
        for(let i = 0; i < this.form.length; i++){
            this.form[i].addEventListener("submit", (e)=>{
                e.preventDefault();
                const btn_id = e.target.id;
                const btn_state = btn_id.split("-")[0];
                if(btn_state == "form"){
                    try{
                        let tab_id = (parseInt(btn_id.charAt(btn_id.length-1)) + 1).toString();
                        document.getElementById(`main-tab-${tab_id}`).click();
                    } catch (error){
                        console.log("No such page here.");
                        console.log(`ID: main-tab-${(parseInt(btn_id.charAt(btn_id.length-1)) + 1).toString()}`);
                    }
                }
            });
        }
    }

}
// <-- ###### class ###### -->

(function(){
    const listener = new event_listen();
    listener.all_forms();

    // console.log("Successfully imported and updated");
    document.getElementById("btn-start").addEventListener("click",(e)=>{
        document.getElementById("main-tab-1").click();
        // console.log("Success");
    });
})();