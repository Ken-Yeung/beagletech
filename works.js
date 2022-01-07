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
    constructor(id, debug=false){
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
        this.progress_bar = document.getElementById("progress_bar");

        this.form_1_sumbit = document.getElementById("submit-step1"); //Start
        this.form_2_sumbit = document.getElementById("submit-step2"); //Arg 1
        this.form_3_sumbit = document.getElementById("submit-step3"); //Arg 2
        this.form_4_sumbit = document.getElementById("submit-step4"); //Arg 3
        this.form_5_sumbit = document.getElementById("submit-step5"); //Preview

        this.home_tutor = document.getElementById("main-home-tutorial");

        this.mini_box1_control = new class_worker("mini_box_1");
        this.mini_box2_control = new class_worker("mini_box_2");
        this.mini_box3_control = new class_worker("mini_box_3");

        this.popstate_id_list = [
            "main-tab-1", 
            "main-tab-2", 
            "main-tab-3", 
            "main-tab-4", 
            "main-tab-preview"
        ]
    }

    all_forms(){
        for(let i = 0; i < this.form.length; i++){
            this.form[i].addEventListener("submit", (e)=>{
                e.preventDefault();
                const btn_id = e.target.id.split("-");
                const btn_state = btn_id[0];
                if(btn_state == "form"){
                    this.pages(btn_id[1]);
                }
            });
        }
    }

    pages(page){
        const err_msg = "No such page here.";
        const desktop_status = check_desktop_mode();
        switch (page) {
            case "step1": // starting

                // Start Next page
                push_history("2", "main-tab-2");
                if (desktop_status) { // Desktop Mode
                    this.mini_box1_control.remove("green");
                    this.mini_box2_control.add("green");
                    this.mini_box3_control.remove("green");

                    // let poc_1 = {tab: 1, pos: 1};
                    // this.main_tab_process(false, poc_1, 0);

                    // let poc_2 = {tab:1, pos: 2};
                    // this.main_tab_process(true, poc_2, 333);
                    this.right_card_animated_controller("2");

                } else { // Mobile Mode
                    let finished_perc = (40 - 100).toString();
                    this.progress_bar.style.transform = `translateX(${finished_perc}%)`;
                }
                document.getElementById(`main-tab-2`).click();
                break;

            case "step2":

                // Start Next page
                push_history("3", "main-tab-3");
                if (desktop_status) { // Desktop Mode
                    this.mini_box1_control.remove("green");
                    this.mini_box2_control.add("green");
                    this.mini_box3_control.remove("green");

                    this.right_card_animated_controller("3");

                } else { // Mobile Mode
                    let finished_perc = (55 - 100).toString();
                    this.progress_bar.style.transform = `translateX(${finished_perc}%)`;
                }
                document.getElementById(`main-tab-3`).click();
                break;

            case "step3":

                // Start Next page
                push_history("4", "main-tab-4");
                if (desktop_status) { // Desktop Mode
                    this.mini_box1_control.remove("green");
                    this.mini_box2_control.add("green");
                    this.mini_box3_control.remove("green");

                    this.right_card_animated_controller("4");

                } else { // Mobile Mode
                    let finished_perc = (70 - 100).toString();
                    this.progress_bar.style.transform = `translateX(${finished_perc}%)`;
                }
                document.getElementById(`main-tab-4`).click();
                break;

            case "step4":

                // Start Next page
                push_history("preview", "main-tab-preview");
                if (desktop_status) { // Desktop Mode
                    this.mini_box1_control.remove("green");
                    this.mini_box2_control.remove("green");
                    this.mini_box3_control.add("green");

                    // let poc_4 = {tab:2, pos: 4};
                    // this.main_tab_process(true, poc_4, 0);
                    this.right_card_animated_controller("preview");

                } else { // Mobile Mode
                    let finished_perc = (75 - 100).toString();
                    this.progress_bar.style.transform = `translateX(${finished_perc}%)`;
                }
                document.getElementById("main-tab-preview").click();
                break;

            case "step5": // preview

                // Start Next page
                push_history("payment", "main-tab-payment");
                if (desktop_status) { // Desktop Mode
                    this.mini_box1_control.remove("green");
                    this.mini_box2_control.remove("green");
                    this.mini_box3_control.add("green");

                    this.right_card_animated_controller("payment");
                } else { // Mobile Mode
                    let finished_perc = (90 - 100).toString();
                    this.progress_bar.style.transform = `translateX(${finished_perc}%)`;
                }
                document.getElementById(`main-tab-payment`).click();
                break;

            case "step6": // payment
                
                // Start Next page
                push_history("final", "main-tab-final");
                if (desktop_status) { // Desktop Mode
                    this.mini_box1_control.remove("green");
                    this.mini_box2_control.remove("green");
                    this.mini_box3_control.add("green");
                } else { // Mobile Mode
                    let finished_perc = (100 - 100).toString();
                    this.progress_bar.style.transform = `translateX(${finished_perc}%)`;
                }
                document.getElementById(`main-tab-final`).click();
                break;

            case "step7": // final

                // Start Next page
                push_history("1", "main-tab-1");
                if (desktop_status) { // Desktop Mode
                    this.mini_box1_control.add("green");
                    this.mini_box2_control.remove("green");
                    this.mini_box3_control.remove("green");

                    this.right_card_animated_controller("1");
                } else { // Mobile Mode
                    this.progress_bar.style.transform = "translateX(-100%)";
                }
                document.getElementById(`main-tab-1`).click();
                break;

            default:
                console.log(`Message: ${btn_id[1]}`);
                console.log(err_msg);
                break;
        }
    }

    go_home(){
        this.home.addEventListener("click", (e)=>{

            push_history("home", "main-tab-home");
            document.getElementById("main-tab-home").click();
            if (check_desktop_mode()){
                this.mini_box1_control.remove("green");
                this.mini_box2_control.remove("green");
                this.mini_box3_control.remove("green");

                this.right_card_animated_controller("home");
            } else {
                this.progress_bar.style.transform = "translateX(-100%)";
            }
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

    main_tab_process(dir=true, id = {tab: 0, pos: 0}, delay_ms=0){
        let pcard = new class_worker(`pcard-${id.tab.toString()}-${id.pos.toString()}`);
        setTimeout(()=>{
            if(dir){ //accending
                pcard.remove("noshow");
                pcard.delay_remove("opc-0", 33);
                pcard.delay_remove("pos-right", 33);
            } else { //deccending
                pcard.add("pos-right");
                pcard.add("opc-0");
                pcard.delay_add("noshow", 333);
            }
        },delay_ms);
    }

    right_card_animated_controller(tab_id){
        switch(tab_id){
            case "1":
                this.main_tab_process(true, {tab: 1, pos: 1}, 333);
                this.main_tab_process(false, {tab: 1, pos: 2}, 0);

                this.main_tab_process(true, {tab: 2, pos: 1}, 0);
                this.main_tab_process(false, {tab: 2, pos: 2}, 0);
                this.main_tab_process(false, {tab: 2, pos: 3}, 0);
                this.main_tab_process(false, {tab: 2, pos: 4}, 0);
                break;

            case "2":
                this.main_tab_process(false, {tab: 1, pos: 1}, 0);
                this.main_tab_process(true, {tab: 1, pos: 2}, 333);
                this.main_tab_process(true, {tab: 2, pos: 1}, 333);
                this.main_tab_process(false, {tab: 2, pos: 2}, 0);

                this.main_tab_process(false, {tab: 2, pos: 3}, 0);
                this.main_tab_process(false, {tab: 2, pos: 4}, 0);
                break;

            case "3":
                this.main_tab_process(false, {tab: 1, pos: 1}, 0);
                this.main_tab_process(true, {tab: 1, pos: 2}, 333);

                this.main_tab_process(false, {tab: 2, pos: 1}, 0);
                this.main_tab_process(true, {tab: 2, pos: 2}, 333);

                this.main_tab_process(false, {tab: 2, pos: 3}, 0);
                this.main_tab_process(false, {tab: 2, pos: 4}, 0);
                break;

            case "4":
                this.main_tab_process(false, {tab: 1, pos: 1}, 0);
                this.main_tab_process(true, {tab: 1, pos: 2}, 333);
                this.main_tab_process(false, {tab: 2, pos: 1}, 0);
                this.main_tab_process(true, {tab: 2, pos: 2}, 333);

                this.main_tab_process(true, {tab: 2, pos: 3}, 333);

                this.main_tab_process(false, {tab: 2, pos: 4}, 0);
                break;

            case "preview":
                this.main_tab_process(false, {tab: 1, pos: 1}, 0);
                this.main_tab_process(true, {tab: 1, pos: 2}, 333);
                this.main_tab_process(false, {tab: 2, pos: 1}, 0);
                this.main_tab_process(true, {tab: 2, pos: 2}, 333);
                this.main_tab_process(true, {tab: 2, pos: 3}, 333);
                this.main_tab_process(true, {tab: 2, pos: 4}, 333);
                break;
            
            case "payment":
                this.main_tab_process(false, {tab: 1, pos: 1}, 0);
                this.main_tab_process(true, {tab: 1, pos: 2}, 333);
                this.main_tab_process(false, {tab: 2, pos: 1}, 0);
                this.main_tab_process(true, {tab: 2, pos: 2}, 333);
                this.main_tab_process(true, {tab: 2, pos: 3}, 333);
                this.main_tab_process(true, {tab: 2, pos: 4}, 333);
                break;
            
            case "home":
                this.main_tab_process(true, {tab: 1, pos: 1}, 333);
                this.main_tab_process(false, {tab: 1, pos: 2}, 0);
                this.main_tab_process(true, {tab: 2, pos: 1}, 333);
                this.main_tab_process(false, {tab: 2, pos: 2}, 0);
                this.main_tab_process(false, {tab: 2, pos: 3}, 0);
                this.main_tab_process(false, {tab: 2, pos: 4}, 0);
                break;

            default:
                break;
        }
    }

    btn_filter(id){ // for popstate

        let tab_id = id.split("-")[2];
        this.right_card_animated_controller(tab_id);

        document.getElementById(id).click();
    }

    init(){
        this.start.addEventListener("click", (e)=>{
            push_history("1", "main-tab-1");

            document.getElementById("main-tab-1").click();
            if (check_desktop_mode()){
                this.mini_box1_control.add("green");
                this.mini_box2_control.remove("green");
                this.mini_box3_control.remove("green");

                this.main_tab_process(true, {tab: 1, pos: 1}, 333);
                this.main_tab_process(false, {tab: 1, pos: 2}, 0);
                this.main_tab_process(true, {tab: 2, pos: 1}, 333);
                this.main_tab_process(false, {tab: 2, pos: 2}, 0);
                this.main_tab_process(false, {tab: 2, pos: 3}, 0);
                this.main_tab_process(false, {tab: 2, pos: 4}, 0);
            }
        });

        this.home_display_card();

        window.addEventListener("popstate", (e)=>{
            // console.log(e.state);
            try {
                // document.getElementById(e.state.id).click();
                if (check_desktop_mode()) { // Desktop Mode
                    this.btn_filter(e.state.id);
                    // document.getElementById(e.state.id).click();
                    this.mini_box1_control.remove("green");
                    this.mini_box2_control.remove("green");
                    this.mini_box3_control.remove("green");
                } else { // Mobile Mode
                    document.getElementById(e.state.id).click();
                    this.progress_bar.style.transform = "translateX(-100%)";
                }
            } catch (err) {
                console.log("No previous record.");
            }
        });

        let form = new form_formation();
        form.init();

    }

}

class form_formation {
    
    constructor(){

        this.topic = {
            "subject": "",
            "impact": null, // boolean
            "object": "",
        };

        this.form = {
            // "token": "",
            "topic": this.topic,
            "args": [
                "",
                "",
                ""
            ],
            "preview": "",
            "body": ""
        };

        this.suggestion = {
            "arg1": [],
            "arg2": [],
            "arg3": []
        };

        this.form_id = "form";
        this.clean_form_id = "clean_form";
        this.clean_suggestion_id = "clean_suggestion";

    }

    // get_token(){}

    init_form(){ // Page Load

        // Test Init
        // localStorage.setItem(this.form_id, JSON.stringify(this.form));
        // Test Init

        localStorage.setItem(this.clean_form_id, JSON.stringify(this.form));
        localStorage.setItem(this.clean_suggestion_id, JSON.stringify(this.suggestion));

        let data = null;

        if (localStorage.getItem(this.form_id) != null){
            data = JSON.parse(localStorage.getItem(this.form_id));
            // data.preview = "Hello World";
        }

        let clean_form = JSON.parse(localStorage.getItem(this.clean_form_id));

        let status = _.isEqual(data, clean_form) || data == null;

        if (!status){
            console.log("Record Found");
        } else {
            console.log("Empty Slot");
        }

        // console.log(data);
        // console.log(typeof(data));

        // Test
        // localStorage.removeItem(this.form_id);
        // console.log(localStorage.getItem(this.form_id));
    }

    init(){
        this.init_form();
    }

}

class workers{
    constructor(){
        this.url = "https://ws.beagletech.org/api/";
    }
    
    request(type, url, data = {}){
        let result;

        $.ajax({
            type: type, // POST, GET
            url: this.url + url,
            data: data,
            success: (resp) => {
                // POST was successful - do something with the response
                console.log('Server sent back: ' + resp);
                result = resp;
            },
            error: (resp) => {
                // Server error, e.g. 404, 500, error
                console.log(resp.responseText);
                result = resp;
            }
        });

        return result;
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

function check_desktop_mode(){
    const progress = document.getElementById("progress");
    const display = window.getComputedStyle(progress).display;
    // console.log(display);
    if (display != "none"){
        return false;
    } else {
        return true;
    }
}

function push_history(to_page, id){
    history.pushState({id: id}, `Page ${to_page}`, `./?page=${to_page}`);
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
    history.pushState({id: "main-tab-home"}, `Page home`, `./?page=home`);

    var worker = new workers();
    let response = worker.request("GET", "works.min.js");
    console.log(response);
    // console.log(check_desktop_mode());
    // console.log("Hello World.");
    // tool_tips(document.getElementById("main-home-tutorial"), "Go To Tutorial");
})();