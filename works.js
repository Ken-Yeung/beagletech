// scroll control
let $body = $(document.body);
let scrollPosition = 0;
function disable_scroll() {
    var oldWidth = $body.innerWidth();
    scrollPosition = window.pageYOffset;
    $body.css('overflow', 'hidden');
    $body.css('position', 'fixed');
    $body.css('top', `-${scrollPosition}px`);
    $body.width(oldWidth);
    return;
}

function enable_scroll() {
    if ($body.css('overflow') != 'hidden') { scrollPosition = window.pageYOffset; }
    $body.css('overflow', '');
    $body.css('position', '');
    $body.css('top', '');
    $body.width('');
    $(window).scrollTop(scrollPosition);
    return;
}
// scroll control

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
        this.home = document.getElementById("home");
        this.form = document.querySelectorAll(".form");
        this.start = document.getElementById("btn-start");
        // this.popup = document.getElementById("popup");
        this.close_popup = document.getElementById("popup-close");
        // this.popup_slider

        this.form_1_sumbit = document.getElementById("submit-step1"); //Start
        this.form_2_sumbit = document.getElementById("submit-step2"); //Arg 1
        this.form_3_sumbit = document.getElementById("submit-step3"); //Arg 2
        this.form_4_sumbit = document.getElementById("submit-step4"); //Arg 3
        this.form_5_sumbit = document.getElementById("submit-step5"); //Preview

        this.home_tutor = document.getElementById("main-home-tutorial");
    }

    all_forms(){
        const err_msg = "No such page here.";
        for(let i = 0; i < this.form.length; i++){
            this.form[i].addEventListener("submit", (e)=>{
                e.preventDefault();
                const btn_id = e.target.id.split("-");
                const btn_state = btn_id[0];
                if(btn_state == "form"){
                    switch (btn_id[2]) {
                        case "step1":
                            document.getElementById(`main-tab-2`).click();
                            break;

                        case "step2":
                            document.getElementById(`main-tab-3`).click();
                            break;

                        case "step3":
                            document.getElementById(`main-tab-4`).click();
                            break;

                        case "step4":
                            document.getElementById("main-tab-preview").click();
                            break;

                        case "preview":
                            document.getElementById(`main-tab-${btn_id[2]}`).click();
                            break;

                        case "payment":
                            document.getElementById(`main-tab-${btn_id[2]}`).click();
                            break;

                        case "final":
                            document.getElementById(`main-tab-${btn_id[2]}`).click();
                            break;

                        default:
                            console.log(`Message: ${btn_id[2]}`);
                            console.log(err_msg);
                            break;
                    }
                    // try{
                    //     let tab_id = (parseInt(btn_id[2].charAt(btn_id[2].length-1)) + 1).toString();
                    //     document.getElementById(`main-tab-${tab_id}`).click();
                    // } catch (error){
                    //     try {
                    //         switch (btn_id[2]) {
                    //             case "preview":
                    //                 document.getElementById(`main-tab-${btn_id[2]}`).click();
                    //                 break;

                    //             case "payment":
                    //                 document.getElementById(`main-tab-${btn_id[2]}`).click();
                    //                 break;

                    //             case "final":
                    //                 document.getElementById(`main-tab-${btn_id[2]}`).click();
                    //                 break;

                    //             default:
                    //                 console.log(err_msg);
                    //                 break;
                    //         }
                    //     } catch (err){
                    //         console.log(err_msg);
                    //         // console.log(`ID: main-tab-${(parseInt(btn_id.charAt(btn_id.length-1)) + 1).toString()}`);
                    //     }
                    // }
                }
            });
        }
    }

    go_home(){
        this.home.addEventListener("click", (e)=>{
            document.getElementById("main-tab-home").click();
        });
        tool_tips(this.home, "Home Page");
    }

    show_popup(popup_id){
        let popup = new class_worker("popup", false);
        let show = new class_worker(popup_id.toString(), false);

        show.remove("noshow");
        show.delay_remove("hide-btn", 399);

        popup.remove("noshow");
        popup.delay_remove("hide-btn", 33);
        disable_scroll();

        return;
    }

    home_display_card(){
        
        this.home_tutor.addEventListener("click", (e)=>{
            this.show_popup("popup-slider");
        });

        this.close_popup.addEventListener("click", (e)=>{
            enable_scroll();
            let popup_control = new class_worker("popup", false);
            let childs = document.getElementById("popup").children;

            for(let i = 0; i < childs.length; i++){
                let child = childs[i];
                if(child.id != "popup-close"){
                    // console.log(`Clear Event: ${child.id}`);
                    let child_class_worker = new class_worker(child.id, false);
                    child_class_worker.add("hide-btn");
                    child_class_worker.delay_add("noshow", 345);
                }
            }

            popup_control.delay_add("hide-btn", 345);
            popup_control.delay_add("noshow", 345+333);
        });

        return;
    }

    init(){
        this.start.addEventListener("click", (e)=>{
            document.getElementById("main-tab-1").click();
        });
        this.home_display_card();
    }

}
// <-- ###### class ###### -->
// <-- ###### function ###### -->
var tool_tips = (parent, content) => {

    // let parent = document.getElementById(e.target.id);

    parent.addEventListener("mouseover", ()=>{
        try {
            if (!document.getElementById("tool_tip")){
                let child = document.createElement("p");
                child.textContent = content.toString();
                child.id = "tool_tip";
                child.className = "tool_tip nomove opc-0 noshow";
                parent.parentNode.appendChild(child);

                let class_work = new class_worker("tool_tip", false);
                class_work.remove("noshow");
                class_work.delay_remove("opc-0", 33);
                class_work.delay_remove("nomove", 33);
                // let tool_tip = document.getElementById("tool_tip");
            }

        } catch (err) {
            console.log("Unable to insert tool tip.");
            console.log(`Error: ${err}`);
        }
        
        return;
    })

    parent.addEventListener("mouseout", ()=>{
        try {
            let child = document.getElementById("tool_tip");
            let class_work = new class_worker("tool_tip", false);
            class_work.delay_add("opc-0", 366);
            class_work.delay_add("nomove", 366);
            setTimeout(()=>{
                try {
                    parent.parentNode.removeChild(child);
                } catch (error){}
            },699);
        } catch (err){
            console.log("Unable to clear tool tip.");
            console.log(`Error: ${err}`);
        }
    });

    return;
}
// <-- ###### function ###### -->
// <-- ###### test func ###### -->

// <-- ###### test func ###### -->


(function(){
    const listener = new event_listen();
    listener.all_forms();
    listener.go_home();
    listener.init();

    // console.log("Hello World.");
    // tool_tips(document.getElementById("main-home-tutorial"), "Go To Tutorial");
})();