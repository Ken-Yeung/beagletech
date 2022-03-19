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

// Global Variable
const spin_icon = document.getElementById("spinning_icon");
const appId = 'sandbox-sq0idb-K3N9W0HFY7qJIxyu-tPANw'; // '{YOUR_SANDBOX_APPLICATION_ID}';
const locationId = 'LXS0ANA56TR98'; // '{YOUR_SANDBOX_LOCATION_ID}'; 
// Global Variable

// Payment Method

async function initializeCard(payments) {
    const card = await payments.card();
    await card.attach('#card-container'); 
    return card; 
}

 // Call this function to send a payment token, buyer name, and other details
 // to the project server code so that a payment can be created with 
 // Payments API
 async function createPayment(token) {
    const body = JSON.stringify({
      locationId,
      sourceId: token,
    });
    const paymentResponse = await fetch('/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    if (paymentResponse.ok) {
      return paymentResponse.json();
    }
    const errorBody = await paymentResponse.text();
    throw new Error(errorBody);
  }
 
  // This function tokenizes a payment method. 
  // The ‘error’ thrown from this async function denotes a failed tokenization,
  // which is due to buyer error (such as an expired card). It is up to the
  // developer to handle the error and provide the buyer the chance to fix
  // their mistakes.
  async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === 'OK') {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(
          tokenResult.errors
        )}`;
      }
      throw new Error(errorMessage);
    }
  }
 
  // Helper method for displaying the Payment Status on the screen.
  // status is either SUCCESS or FAILURE;
  function displayPaymentResults(status) {
    const statusContainer = document.getElementById(
      'payment-status-container'
    );
    if (status === 'SUCCESS') {
      statusContainer.classList.remove('is-failure');
      statusContainer.classList.add('is-success');
    } else {
      statusContainer.classList.remove('is-success');
      statusContainer.classList.add('is-failure');
    }
 
    statusContainer.style.visibility = 'visible';
  }    
 
 
  document.addEventListener('DOMContentLoaded', async function () {
    if (!window.Square) {
      throw new Error('Square.js failed to load properly');
    }
  
    const payments = window.Square.payments(appId, locationId);
    let card;
    try {
      card = await initializeCard(payments);
    } catch (e) {
      console.error('Initializing Card failed', e);
      return;
    }
  
    // Checkpoint 2.
    async function handlePaymentMethodSubmission(event, paymentMethod) {
      event.preventDefault();
  
      try {
        // disable the submit button as we await tokenization and make a
        // payment request.
        cardButton.disabled = true;
        const token = await tokenize(paymentMethod);
        const paymentResults = await createPayment(token);
        displayPaymentResults('SUCCESS');
  
        console.debug('Payment Success', paymentResults);
      } catch (e) {
        cardButton.disabled = false;
        displayPaymentResults('FAILURE');
        console.error(e.message);
      }
    }
  
    const cardButton = document.getElementById(
      'card-button'
    );
    cardButton.addEventListener('click', async function (event) {
      await handlePaymentMethodSubmission(event, card);
    });
  });

// Payment Method

// <-- ###### class ###### -->
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

class event_listen {
    constructor(){
        this.home = document.getElementById("home");
        this.form = document.querySelectorAll(".form");
        this.start = document.getElementById("btn-start");
        // this.popup = document.getElementById("popup");
        this.close_popup = document.getElementById("popup-close");
        // this.popup_slider
        this.progress_bar = document.getElementById("progress_bar");

        // this.form_1_sumbit = document.getElementById("submit-step1"); //Start
        // this.form_2_sumbit = document.getElementById("submit-step2"); //Arg 1
        // this.form_3_sumbit = document.getElementById("submit-step3"); //Arg 2
        // this.form_4_sumbit = document.getElementById("submit-step4"); //Arg 3
        // this.form_5_sumbit = document.getElementById("submit-step5"); //Preview

        this.home_tutor = document.getElementById("main-home-tutorial");
        this.home_about = document.getElementById("main-home-about");
        this.home_showcase = document.getElementById("main-home-showcase");

        this.mini_box1_control = new class_worker("mini_box_1");
        this.mini_box2_control = new class_worker("mini_box_2");
        this.mini_box3_control = new class_worker("mini_box_3");

        this.form_worker = new form_formation();
    }

    args_behave(e){
        // let arg_id = e.target.id.split("_")[1];
        let cur_id = e.target.id.split("_")[2];

        // let args_id = `arg_`

        document.getElementById(`arg_text_${cur_id}`).innerText = e.target.innerText;

        // console.log(e);

        let local_suggest = JSON.parse(localStorage.getItem("suggestions"));

        let genterator = new event_listen();
        
        genterator.args_menu_controller(cur_id, false);

        setTimeout(()=>{
            genterator.args_generator(local_suggest.args);
        }, 999);
    }

    args_generator(lst=[]){
        let choices = []
        let filted = []

        for(let i = 0; i < 3; i ++){
            let foo = (i + 1).toString();
            let data = document.getElementById(`arg_text_${foo}`).innerText;
            
            choices.push(data);
        }

        for(let i = 0; i < lst.length; i++){
            let caught = -1;
            choices.forEach((item, index, arr)=>{
                let status = lst[i] == item;
                if(status){
                    caught = i;
                }
            });
            if (i != caught){
                filted.push(lst[i]);
            }
        }

        for (let i = 0; i < 3; i++){
            let par_id = (i + 1).toString();
            let parent = document.getElementById(`args_menu_${par_id}`);
            while (parent.firstChild){
                parent.removeChild(parent.lastChild);
            }

            // Push all filterd args here
            filted.forEach((item, index, arr)=>{
                let create_wrapper = document.createElement("DIV");
                create_wrapper.className = "args";
                // console.log(item);
                create_wrapper.innerText = item;
                create_wrapper.id = `arg_${(index+1).toString()}_${par_id}`;
                create_wrapper.addEventListener("click", this.args_behave);
                
                parent.appendChild(create_wrapper);
            });

        }

        return filted;
    }

    args_menu_controller(id, on_off=false){

        let storage_id = "menu";
        try{
            if (on_off){
                let args_menu = new class_worker(`args_menu_${id}`);
                // alert(`Turn On ${id}`);
                // console.log(`Turn On ${id}`);
                args_menu.remove("noshow");
                args_menu.delay_remove("opc-0", 33);
    
                sessionStorage.setItem(storage_id, id);
            } else {
                let pre_id = sessionStorage.getItem(storage_id);
                let args_menu = new class_worker(`args_menu_${pre_id}`);
                // console.log(`Turn Off ${id}`);
                // alert(`Turn Off ${id}`);
    
                args_menu.add("opc-0");
                args_menu.delay_add("noshow", 333);
    
            }
        } catch (err) {}
    }

    arg_selectors(){
        for(let i = 0; i < 3; i++){
            let pos = i + 1;

            $(`#arg_selector_${pos.toString()}`).hover((e)=>{
                
                let id = e.target.id.split("_")[2];

                // let msg = `Hover to ${id}`;
                // console.log(msg);

                this.args_menu_controller(id, true);

            }, (e)=>{

                let id = e.target.id.split("_")[2];

                // let msg = `Hovout to ${id}`;
                // console.log(msg);

                this.args_menu_controller(id, false);
            });

            $(`#arg_text_${pos.toString()}`).click((e)=>{
                let id = e.target.id.split("_")[2];
                this.args_menu_controller(id, true);
            });

        }



        return;
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

    next_page(data, prog){
        let id = data.toString();
        push_history(id, `main-tab-${id}`);
        if (check_desktop_mode()) { // Desktop Mode

            this.right_card_animated_controller(id);

        } else { // Mobile Mode
            let finished_perc = (prog - 100).toString();
            this.progress_bar.style.transform = `translateX(${finished_perc}%)`;
        }

        if(id == "home"){
            this.change_nav_minicon(false);
        } else{
            this.change_nav_minicon(true);
        }

        document.getElementById(`main-tab-${id}`).click();

        spin_icon.click();
    }

    async pages(page){
        // const data = JSON.parse(localStorage.getItem("form"));
        const err_msg = "No such page here.";
        switch (page) {
            case "step1": // starting
            
                let subject = document.getElementById("ts");
                let impact = document.getElementById("impact");
                let object = document.getElementById("to");

                let status = subject.value != "" && object.value != "";
                if (status){
                    this.form_worker.topic.subject = subject.value;
                    this.form_worker.topic.impact = impact.value;
                    this.form_worker.topic.object = object.value;

                    let args = await this.form_worker.request_for_args();

                    // console.log("Fetch for args.");
                    // console.log("Fetched All ARGS:");
                    // console.log(args.args);
                    
                    // console.log("Filtered list.");
                    this.args_generator(args.args);

                    if (check_desktop_mode){
                        let pcard = document.getElementById("pcard-1-2");
                        pcard.innerHTML = `<p class="bold">Topic:</p>${subject.value} ${impact.value} impact to ${object.value}`;
                    }

                    // console.log(this.form_worker.topic);

                    this.next_page("2", 40);
                } else {
                    alert("Please fill in all spaces.");
                }
                break;

            case "step2":
                let args_status1 = document.getElementById("arg_text_1").innerText != "Choose a preferred argument";
                if (args_status1){
                    if (check_desktop_mode){
                        let pcard = document.getElementById("pcard-main-2");
                        pcard.innerHTML = `<p class="bold">Argument 1:</p>${document.getElementById("arg_text_1").innerText}`;
                    }
                    this.next_page("3", 55);
                } else {
                    alert("Please choose an argument.");
                }
                break;

            case "step3":

                let args_status2 = document.getElementById("arg_text_2").innerText != "Choose a preferred argument";
                if (args_status2){
                    if (check_desktop_mode){
                        let pcard = document.getElementById("pcard-2-3");
                        pcard.innerHTML = `<p class="bold">Argument 2:</p>${document.getElementById("arg_text_2").innerText}`;
                    }
                    this.next_page("4", 70);
                } else {
                    alert("Please choose an argument.");
                }

                break;

            case "step4":
                let args_status3 = document.getElementById("arg_text_3").innerText != "Choose a preferred argument";
                if (args_status3){
                    if (check_desktop_mode){
                        let pcard = document.getElementById("pcard-2-4");
                        pcard.innerHTML = `<p class="bold">Argument 3:</p>${document.getElementById("arg_text_3").innerText}`;
                    }
                    this.next_page("preview", 75);
                } else {
                    alert("Please choose an argument.");
                }

                break;

            case "step5": // preview

                this.next_page("payment", 90);
                break;

            case "step6": // payment
                
                this.next_page("final", 100);
                break;

            case "step7": // final

                this.next_page("1", 0);
                break;

            default:
                console.log(`Message: ${btn_id[1]}`);
                console.log(err_msg);
                break;
        }
    }

    go_home(){
        this.home.addEventListener("click", (e)=>{

            this.change_nav_minicon(false);
            push_history("home", "main-tab-home");
            document.getElementById("main-tab-home").click();
            if (check_desktop_mode()){

                this.right_card_animated_controller("home");
            } else {
                this.progress_bar.style.transform = "translateX(-100%)";
            }
            spin_icon.click();
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
        let home_showcase = this.home_showcase;
        let home_tutor = this.home_tutor;

        document.getElementById("nav_showcase").addEventListener("click", (e)=>{home_showcase.click();});

        document.getElementById("nav_tutor").addEventListener("click", (e)=>{ home_tutor.click(); });
        
        this.home_tutor.addEventListener("click", (e)=>{
            this.show_popup("popup-slider");
        });

        this.home_about.addEventListener("click", (e)=>{
            this.show_popup("popup-about");
        });

        this.home_showcase.addEventListener("click", (e)=>{
            this.show_popup("popup-showcase");
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

    change_nav_minicon(statu){
        let fb = new class_worker("nav_fb");
        let ig = new class_worker("nav_ig");
        let show_case = new class_worker("nav_showcase");
        let tutor = new class_worker("nav_tutor");
        if(statu){
            fb.add("opc-0");
            fb.delay_add("noshow", 333);

            ig.add("opc-0");
            ig.delay_add("noshow", 333);

            tutor.delay_remove("noshow", 333);
            tutor.delay_remove("opc-0", 333 + 33);

            show_case.delay_remove("noshow", 333);
            show_case.delay_remove("opc-0", 333 + 33);
        } else {
            tutor.add("opc-0");
            tutor.delay_add("noshow", 333);

            show_case.add("opc-0");
            show_case.delay_add("noshow", 333);

            fb.delay_remove("noshow", 333);
            fb.delay_remove("opc-0", 333 + 33);

            ig.delay_remove("noshow", 333);
            ig.delay_remove("opc-0", 333 + 33);
        }
        
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
    
    animated_actions(details){
        let icon_id = {
            "id": [
                "pcard-1-img-1",
                "pcard-2-img-1",
                "pcard-2-img-2",
                "pcard-2-img-3",
                "pcard-3-img-paid"
            ],
            "status": [
                "https://uploads-ssl.webflow.com/614ad10f1f9dc8890e785112/617e49af51b79651cf345bee_SINGLE%20ADD.svg",
                "https://uploads-ssl.webflow.com/614ad10f1f9dc8890e785112/617e49af51b7966f61345be4_Success.svg"
            ]
        };

        for (let i = 0; i < icon_id.id.length; i++){
            set_img(icon_id.id[i], icon_id.status[details.icon[i]]);
        }

        if (details.case == "1"){
            this.mini_box1_control.add("green");
            this.mini_box2_control.remove("green");
            this.mini_box3_control.remove("green");
        } else if (details.case == "2" || details.case == "3" || details.case == "4") {
            this.mini_box1_control.remove("green");
            this.mini_box2_control.add("green");
            this.mini_box3_control.remove("green");
        } else if (details.case == "preview" || details.case == "payment" || details.case == "final") {
            this.mini_box1_control.remove("green");
            this.mini_box2_control.remove("green");
            this.mini_box3_control.add("green");
        } else if (details.case == "home"){
            this.mini_box1_control.remove("green");
            this.mini_box2_control.remove("green");
            this.mini_box3_control.remove("green");
        }
        
        for (let i = 0; i < details.process.length; i++){
            this.main_tab_process(details.process[i][0], {tab: details.process[i][1], pos: details.process[i][2]}, details.process[i][3]);
        }
    }

    right_card_animated_controller(tab_id){

        let details = {
            "icon": [
                0,
                0,
                0,
                0,
                0
            ], //Total of 5
            "case":"0",
            "process": [
                [true, 1, 1, 0],
                [true, 1, 2, 0],
                [true, 2, 1, 0],
                [true, 2, 2, 0],
                [true, 2, 3, 0],
                [true, 2, 4, 0]
            ]
        };

        switch(tab_id){
            case "1":

                details.process[0][3] = 333;
                details.process[1][0] = false;
                details.process[2][3] = 333;
                details.process[3][0] = false;
                details.process[4][0] = false;
                details.process[5][0] = false;

                // this.change_nav_minicon(false);

                break;

            case "2":

                details.icon[0] = 1;
                details.process[0][0] = false;
                details.process[1][3] = 333;
                details.process[2][3] = 333;
                details.process[3][0] = false;
                details.process[4][0] = false;
                details.process[5][0] = false;

                // this.change_nav_minicon(true);

                break;

            case "3":

                details.icon[0] = 1;
                details.icon[1] = 1;
                details.process[0][0] = false;
                details.process[1][3] = 333;
                details.process[2][0] = false;
                details.process[3][3] = 333;
                details.process[4][0] = false;
                details.process[5][0] = false;

                // this.change_nav_minicon(true);

                break;

            case "4":

                details.icon[0] = 1;
                details.icon[1] = 1;
                details.icon[2] = 1;
                details.process[0][0] = false;
                details.process[1][3] = 333;
                details.process[2][0] = false;
                details.process[3][3] = 333;
                details.process[4][3] = 333;
                details.process[5][0] = false;

                // this.change_nav_minicon(true);

                break;

            case "preview":

                details.icon[0] = 1;
                details.icon[1] = 1;
                details.icon[2] = 1;
                details.icon[3] = 1;
                details.process[0][0] = false;
                details.process[1][3] = 333;
                details.process[2][0] = false;
                details.process[3][3] = 333;
                details.process[4][3] = 333;
                details.process[5][3] = 333;

                // this.change_nav_minicon(true);

                break;
            
            case "payment":

                details.icon[0] = 1;
                details.icon[1] = 1;
                details.icon[2] = 1;
                details.icon[3] = 1;
                details.process[0][0] = false;
                details.process[1][3] = 333;
                details.process[2][0] = false;
                details.process[3][3] = 333;
                details.process[4][3] = 333;
                details.process[5][3] = 333;

                // this.change_nav_minicon(true);

                break;
            
            case "final":

                details.icon[0] = 1;
                details.icon[1] = 1;
                details.icon[2] = 1;
                details.icon[3] = 1;
                details.icon[4] = 1;
                details.process[0][0] = false;
                details.process[1][3] = 333;
                details.process[2][0] = false;
                details.process[3][3] = 333;
                details.process[4][3] = 333;
                details.process[5][3] = 333;

                // this.change_nav_minicon(true);
                
                break;

            case "home":

                details.process[0][3] = 333;
                details.process[1][0] = false;
                details.process[2][3] = 333;
                details.process[3][0] = false;
                details.process[4][0] = false;
                details.process[5][0] = false;

                // this.change_nav_minicon(false);

                break;

            default:
                break;
        }

        details.case = tab_id;
        this.animated_actions(details);
    }

    btn_filter(id){ // for popstate

        let tab_id = id.split("-")[2];
        this.right_card_animated_controller(tab_id);

        document.getElementById(id).click();
    }

    init(){

        let all_back = document.querySelectorAll("#back");
        for(let i = 0; i < all_back.length; i++){
            all_back[i].addEventListener("click", (e)=>{
                history.back();
            });
        }

        this.start.addEventListener("click", (e)=>{
            push_history("1", "main-tab-1");

            this.change_nav_minicon(true);

            document.getElementById("main-tab-1").click();
            if (check_desktop_mode()){

                this.right_card_animated_controller("1");
            }
            spin_icon.click();
        });

        this.home_display_card();

        window.addEventListener("popstate", (e)=>{
            // console.log(e.state);
            let foo = e.state.id.split("-")[2];
            if (foo == "home"){
                this.change_nav_minicon(false);
            } else {
                this.change_nav_minicon(true);
            }
            try {
                if (check_desktop_mode()) { // Desktop Mode

                    this.btn_filter(e.state.id);

                } else { // Mobile Mode
                    document.getElementById(e.state.id).click();
                    this.progress_bar.style.transform = "translateX(-100%)";
                }
            } catch (err) {
                console.log("No previous record.");
            }
            spin_icon.click();
        });

        this.form_worker.init();

        this.arg_selectors();

    }

}

class form_formation {
    
    constructor(){

        this.topic = {
            "type": "topic", // Constant
            "subject": "",
            "impact": null, // boolean
            "object": "",
        };

        this.preview = {
            // "id": 0,
            "body": ""
        }

        this.form = {
            "token": "0",
            "type": "form", // Constant
            "topic": this.topic,
            "args": [
                "",
                "",
                ""
            ],
            "body": ""
        };

        this.suggestion = { // For return
            "topic": {
                "type": "topic",
                "subject": "",
                "impact": null,
                "object": ""
            },
            "args": [] // Total of 9
            // "arg1": [],
            // "arg2": [],
            // "arg3": []
        };

        this.form_id = "form";
        this.clean_form_id = "clean_form";
        this.clean_suggestion_id = "clean_suggestion";
        this.suggestion_id = "suggestions";

        this.worker = new workers();

    }

    // get_token(){}

    async request_for_args(){ // Get and save Topics
        loading_controller(true);
        // let args_lst = [];
        this.save();
        let local_suggestion;
        // this.suggestion.topic = this.topic;
        let local_form = JSON.parse(localStorage.getItem(this.form_id));
        try{
            local_suggestion = JSON.parse(localStorage.getItem(this.suggestion_id));
        } catch(err){
            local_suggestion = null;
        }

        let is_local_suggest = local_suggestion != null && _.isEqual(local_suggestion.topic, local_form.topic);
        if (is_local_suggest){
            
            console.log("Using Local Suggestions");
            this.suggestion.topic = local_form.topic;
            this.suggestion.args = local_suggestion.args;

            setTimeout(()=>{
                loading_controller(false);
            },999);
        } else {
            await this.worker.request("POST", "test", this.topic).then(async (res)=>{ // have to change url
                console.log("Fetch for new args");
                // console.log(res);
    
                this.suggestion.topic = res.body;
                //test
                console.log("Would return total of 9 args in a list");
                // for (let i = 0; i < 9; i++){
                //     let calter = i + 1;
                //     this.suggestion.args.push(`arg${calter.toString()}`);
                // }
                //test
                let test_res = [];
                for(let i = 0; i < 9; i++){
                    test_res.push(`Arguments of ${(i+1).toString()}`);
                }
    
                this.suggestion.args = test_res;

                await this.save(this.suggestion_id, this.suggestion);

                setTimeout(()=>{
                    loading_controller(false);
                },999);
            });
        }

        return this.suggestion;
    }

    save(id = '', obj = {}){
        if(id == '' || obj == {}){
            id = this.form_id;
            obj = this.form;
        }
        localStorage.setItem(id, JSON.stringify(obj));
    }

    request_for_final(){ //including preview

    }

    init_form(){ // Page Load
        localStorage.setItem(this.clean_form_id, JSON.stringify(this.form));
        localStorage.setItem(this.clean_suggestion_id, JSON.stringify(this.suggestion));

        let data = null;

        if (localStorage.getItem(this.form_id) != null){
            data = JSON.parse(localStorage.getItem(this.form_id));
        }

        let clean_form = JSON.parse(localStorage.getItem(this.clean_form_id));

        let status = _.isEqual(data, clean_form) || data == null;

        if (!status){
            setTimeout(()=>{
                try {
                    document.getElementById("btn-start").click();
                } catch (error){}
            },777); // Auto Delay start if record found

            document.getElementById("ts").value = data.topic.subject;
            document.getElementById("impact").value = data.topic.impact;
            document.getElementById("to").value = data.topic.object;

            // init suggestions as follow area


            // console.log(data.topic);
            // console.log(clean_form.topic);
            console.log("Record Found");
        } else {
            console.log("Empty Slot");
        }

        // Test
        // var worker = new workers();
        // let result = worker.request("POST", "test", this.form);
        // result.then((res) => {
        //     console.log(`Test result:`);
        //     console.log(res);
        // });
        // localStorage.removeItem(this.form_id);
        // console.log(localStorage.getItem(this.form_id));
    }

    init(){
        this.init_form();
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

function set_img(id, url){
    let img = document.getElementById(id.toString());
    let status = img.getAttribute("src") != url;
    if (status){
        img.setAttribute("src", url.toString());
    }
}

function loading_controller(on_off=false){
    
    let popup = new class_worker("popup");
    let loading_page = new class_worker("loading");
    let popup_close = new class_worker("popup-close");

    if (on_off){
        popup.remove("noshow");
        popup.delay_remove("hide-btn", 33);
        loading_page.delay_remove("noshow", 33);
        loading_page.delay_remove("opc-0", 33);
        popup_close.add("noshow");
    } else {
        loading_page.add("opc-0");
        loading_page.delay_add("noshow", 333);
        popup.add("hide-btn");
        popup.delay_add("noshow", 333);
        popup_close.delay_remove("noshow", 333);
    }

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


    // console.log(check_desktop_mode());
    // console.log("Hello World.");
    // tool_tips(document.getElementById("main-home-tutorial"), "Go To Tutorial");
})();