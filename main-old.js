// 1) try get progress from local storage
// 2) save progress to local storage
// 3) refresh after resized

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

// input area id
const input_field = {
    select_init_words: "This a a suggested argument for you to choose",
    ts: document.getElementById("ts"),
    impact: document.getElementById("impact"),
    to: document.getElementById("to"),
    arg1_select: document.getElementById("arg1-select"),
    arg2_select: document.getElementById("arg2-select"),
    arg3_select: document.getElementById("arg3-select")
}
// input area id

// <-- ###### resized ###### -->
var rtime;
var timeout = false;
var delta = 333;
$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});
function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        console.log('Done resizing');
    }               
}
// <-- ###### resized ###### -->
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
// <-- ###### class ###### -->


function elem_size(dom){
    let height = dom.offsetHeight;
    let width = dom.offsetWidth;
    return [width, height];
}

function clear_menu_css(){
    const menu = document.getElementById("home-main-menu");
    for(let i = 0; i < menu.childElementCount; i++){
        let inner = menu.childNodes[i];
        if(inner.childElementCount > 0){
            if(inner.childNodes[0].classList.contains("home_menu_current")){
                inner.childNodes[0].classList.remove("home_menu_current");
                if(inner.childNodes[1].classList.contains("hide") == false){
                    inner.childNodes[1].classList.add("hide");
                }
            }
        }
    }
}

function main_menu_control(e){
    var nav_btn_showcase = new class_worker("nav_showcase", false);

    let el_full_id = e.target.id.split("-");
    let el_id = el_full_id[el_full_id.length - 1];

    if(el_full_id[0] == "menu"){
        if(el_id == "home"){
            clear_menu_css();
            const to_home = document.getElementById("tab-home");

            nav_btn_showcase.add("hide-btn");
            nav_btn_showcase.delay_add("noshow", 432);
            document.getElementById("menu-home").classList.add("home_menu_current");
            document.getElementById("menu-state-home").classList.remove("hide");
            to_home.click();
        } else if(el_id == "start"){
            clear_menu_css();
            const to_step1_pg = document.getElementById("tab-start");
            nav_btn_showcase.remove("noshow");
            nav_btn_showcase.delay_remove("hide-btn", 72);
            document.getElementById("menu-start").classList.add("home_menu_current");
            document.getElementById("menu-state-start").classList.remove("hide");
            to_step1_pg.click();
        } else { // Set rules below 15/10/2021
            const to_step_pg = document.getElementById(`tab-sp${el_id}`);
            let status = false;

            if(el_id == "1"){
                if(input_field.ts.value != "" && input_field.to.value !=""){
                    status = true;
                }
            } else { 
                if(parseInt(el_id) < 4 && input_field[`arg${(parseInt(el_id) - 1).toString()}_select`].innerText != input_field.select_init_words){
                    status = true;
                }
            }
            
            if(status){
                clear_menu_css();
                nav_btn_showcase.remove("noshow");
                nav_btn_showcase.delay_remove("hide-btn", 72);
                document.getElementById(`menu-${el_id}`).classList.add("home_menu_current");
                document.getElementById(`menu-state-${el_id}`).classList.remove("hide");
                to_step_pg.click();
            } else if(parseInt(el_id) < 4) {
                alert("Please fill in all the blanks or choose an argument.");
            }
        } // Set rules above 15/10/2021
    } else {
        if(el_id == "start"){
            clear_menu_css();
            document.getElementById("menu-start").classList.add("home_menu_current");
            document.getElementById("menu-state-start").classList.remove("hide");
            const to_step1_pg = document.getElementById("tab-start");

            nav_btn_showcase.remove("noshow");
            nav_btn_showcase.delay_remove("hide-btn", 72);
            to_step1_pg.click();
        } else {
            clear_menu_css();
            document.getElementById(`menu-${el_id.charAt(el_id.length-1)}`).classList.add("home_menu_current");
            document.getElementById(`menu-state-${el_id.charAt(el_id.length-1)}`).classList.remove("hide");
            const to_next_pg = document.getElementById(`tab-sp${el_id.charAt(el_id.length-1)}`);

            try{
                const arg_select = document.getElementById(`arg${el_id.charAt(el_id.length-1)}-select-pr`);
                arg_select.onmouseover = arg_select_hover;
                op_clicked(el_id.charAt(el_id.length-1));
            } catch(e){
                console.log("Start preview and payment");
            }

            to_next_pg.click();
        }
    }
}

function arg_select_hover(e){
    const pr_id = e.target.id.split("-")[0];
    const id = pr_id.charAt(pr_id.length-1);
    var select_icon = new class_worker(`arg${id}-op-icon`, false);
    var select_menu = new class_worker(`arg${id}-op-menu`, false);
    select_icon.add("open");
    select_menu.remove("noshow");
    select_menu.delay_remove("hide", 99);
    return;
}

function op_clicked(id){
    const arg_menu = document.getElementById(`arg${id.toString()}-op-menu`);

    for(let i = 0; i < arg_menu.childElementCount; i++){
        let temp_id = i + 1;
        document.getElementById(`arg${id.toString()}-op${temp_id.toString()}`).addEventListener("click", (e) => {
            var select_icon = new class_worker(`arg${id.toString()}-op-icon`, false);
            var select_menu = new class_worker(`arg${id.toString()}-op-menu`, false);
            const select_btn = document.getElementById(`arg${id.toString()}-select`);

            select_icon.remove("open");

            select_menu.add("hide");
            select_menu.delay_add("noshow", 456);

            let words = e.target.innerText;
            select_btn.innerText = words;
        });
    }
}

(function () {
    const start_to_step1 = document.getElementById("btn-start");
    const submit_step1 = document.getElementById("form-step1");
    const submit_step2 = document.getElementById("form-step2");
    const submit_step3 = document.getElementById("form-step3");
    const submit_step4 = document.getElementById("form-step4");
    const submit_to_pay = document.getElementById("submit-to-pay5");
    const menu = document.getElementById("home-main-menu");
    const showcase_btn = document.querySelectorAll("#nav_showcase");
    const showcase_close = document.getElementById("popup-close");

    // Preview area
    // Preview area

    // Showcase area
    for(let i = 0; i < showcase_btn.length; i++){
        showcase_btn[i].addEventListener("click", (e)=>{
            let popup_control = new class_worker("popup", false);
            let popup_slide_worker = new class_worker("popup-slider", false);
            
            disable_scroll();

            popup_control.remove("noshow");
            popup_control.delay_remove("hide-btn", 99);
            popup_slide_worker.delay_remove("noshow", 333);
            popup_slide_worker.delay_remove("hide-btn", 345);

        });
    }

    showcase_close.addEventListener("click", (e)=>{
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
    // Showcase area

    start_to_step1.addEventListener("click", (e)=>{ // Tab 1 to Tab 2
        main_menu_control(e);
    }); // End

    submit_step1.addEventListener("submit", (e)=>{ // Tab 2 to Tab 3
        e.preventDefault();
        // console.log("step1: Prevent success");
        if(input_field.ts.value != "" && input_field.to.value !=""){
            main_menu_control(e);
        } else {
            alert("Please fill in all the blanks.");
        }
    }); // End

    submit_step2.addEventListener("submit", (e)=>{ // Tab 3 to Tab 4
        e.preventDefault();
        // console.log("step2: Prevent success");
        if(input_field.arg1_select.innerText != input_field.select_init_words){
            main_menu_control(e);
        } else {
            alert("Please select an argument for your essay.")
        }
    }); // End

    submit_step3.addEventListener("submit", (e)=>{ // Tab 4 to Tab 5
        e.preventDefault();
        // console.log("step3: Prevent success");
        if(input_field.arg2_select.innerText != input_field.select_init_words){
            main_menu_control(e);
        } else {
            alert("Please select an argument for your essay.")
        }
    }); // End

    submit_step4.addEventListener("submit", (e)=>{ // Tab 5 to Tab 6
        e.preventDefault();
        // console.log("step4: Prevent success");
        if(input_field.arg3_select.innerText != input_field.select_init_words){
            main_menu_control(e);
            var preview_rich = new class_worker("test-rich", false);
            var preview_point_1 = new class_worker("test-point-1", false);
            var preview_point_2 = new class_worker("test-point-2", false);
            var preview_point_3 = new class_worker("test-point-3", false);
            
            preview_point_1.delay_remove("hide", 99);
            preview_point_2.delay_remove("hide",333+99);
            preview_point_3.delay_remove("hide", 666+99);
            preview_rich.delay_remove("hide",333+333+333+99);
        } else {
            alert("Please select an argument for your essay.")
        }
    }); // End

    submit_to_pay.addEventListener("click", (e)=>{
        e.preventDefault();
        main_menu_control(e);
    });

    for(let i = 0; i < menu.childElementCount; i++){
        let inner = menu.childNodes[i];
        if(inner.childElementCount > 0){
            inner.childNodes[0].addEventListener("click", main_menu_control);
        }
    }
})(); // End