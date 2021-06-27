//Global
let $body = $(document.body);
let scrollPosition = 0;
let sug_arr = [];
let arg_arr_lst = [];
let point_ram = {
    "1":"",
    "2":"",
    "3":""
};
//End Global
function sleep(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
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
function window_sizes() {
    var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    return [ x, y];
}
function disable_drag() {
    const img = document.getElementsByTagName("img");
    const a = document.getElementsByTagName("a");
    for( let i = 0; i < img.length; i++) {
        img[i].setAttribute("draggable", false);
    }
    for( let i = 0; i < a.length; i++) {
        a[i].setAttribute("draggable", false);
    }
}
//funcForm_add_event
function funcForm_add_event() {
    const next_btn_1 = document.getElementById("t_func_next_page");
    const next_btn_2 = document.getElementById("t_func_next2_page");
    const back_btn_1 = document.getElementById("t_func_back2_page");
    const back_btn_2 = document.getElementById("t_func_back3_page");
    const submit_btn = document.getElementById("t_func_submit");
    const cross_menu = document.getElementById("t_bill_cross");
    const get_full_essay = document.getElementById("get_full_essay");

    get_full_essay.addEventListener("click", () => {
        submit_btn.click();
    });

    next_btn_1.addEventListener("click", () => {
        document.getElementById("t_func_tab_two").click();
        document.getElementById("t_func_tab_display_two").click();
    });

    next_btn_2.addEventListener("click", async () => { //important
        const preview_start_loading_gif = document.getElementById("preview_start_loading_gif");

        const final_title_subject = document.getElementById("final-title-subject").value;
        const final_title_impact = document.getElementById("final-title-impact").value;
        const final_title_object = document.getElementById("final-title-object").value;
        const final_title_audience = document.getElementById("final-title-audience").value;
    
        const final_point1_subject = document.getElementById("final-point1-subject").value;
        const final_point1_verb = document.getElementById("final-point1-verb").value;
        const final_point1_object = document.getElementById("final-point1-object").value;
        const final_point1_target = document.getElementById("final-point1-target").value;
        // const final_point1_arg = document.getElementById("final-point1-arg").value;
    
        const final_point2_subject = document.getElementById("final-point2-subject").value;
        const final_point2_verb = document.getElementById("final-point2-verb").value;
        const final_point2_object = document.getElementById("final-point2-object").value;
        const final_point2_target = document.getElementById("final-point2-target").value;
        // const final_point2_arg = document.getElementById("final-point2-arg").value;
    
        const final_point3_subject = document.getElementById("final-point3-subject").value;
        const final_point3_verb = document.getElementById("final-point3-verb").value;
        const final_point3_object = document.getElementById("final-point3-object").value;
        const final_point3_target = document.getElementById("final-point3-target").value;
        // const final_point3_arg = document.getElementById("final-point3-arg").value;

        let url = "https://beagleetech.ga/v1/essay?"+
        "ts="+encodeURIComponent(final_title_subject)+
        "&impact="+encodeURIComponent(final_title_impact)+
        "&to="+encodeURIComponent(final_title_object)+
        "&s1="+encodeURIComponent(final_point1_subject)+
        "&s2="+encodeURIComponent(final_point2_subject)+
        "&s3="+encodeURIComponent(final_point3_subject)+
        "&v1="+encodeURIComponent(final_point1_verb)+
        "&v2="+encodeURIComponent(final_point2_verb)+
        "&v3="+encodeURIComponent(final_point3_verb)+
        "&o1="+encodeURIComponent(final_point1_object)+
        "&o2="+encodeURIComponent(final_point2_object)+
        "&o3="+encodeURIComponent(final_point3_object)+
        "&tg1="+encodeURIComponent(final_point1_target)+
        "&tg2="+encodeURIComponent(final_point2_target)+
        "&tg3="+encodeURIComponent(final_point3_target)+
        "&aud="+encodeURIComponent(final_title_audience)+
        // "&="+encodeURIComponent()+ //final_point1_arg
        // "&="+encodeURIComponent()+ //final_point2_arg
        // "&="+encodeURIComponent()+ //final_point3_arg
        // "&callback=?";

        preview_start_loading_gif.click();

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // console.log(xhr.responseText);
                let result = foo(xhr.responseText);

                if(result != "error"){
                    let preview_rich = document.querySelectorAll("#preview-rich");
                    for(let i=0; i<preview_rich.length; i++){
                        preview_rich[i].innerText = result;
                    }
                    preview_start_loading_gif.click();
                    document.getElementById("t_func_tab_three").click();
                    document.getElementById("t_func_tab_display_three").click();
                } else {
                    alert("Somethings wrong, plesae refresh your browser.");
                    preview_start_loading_gif.click();
                }
            } else {
                alert(`Please contact us if situation continues, error: ${xhr.statusText}`);
                preview_start_loading_gif.click();
            }
          }
        };
        xhr.onerror = function (e) {
            alert(`Please contact us if situation continues, error: ${xhr.statusText}`);
            preview_start_loading_gif.click();
        };
        xhr.send(null);
    });

    back_btn_1.addEventListener("click", () => {
        document.getElementById("t_func_tab_one").click();
        document.getElementById("t_func_tab_display_one").click();
    });
    back_btn_2.addEventListener("click", () => {
        document.getElementById("t_func_tab_two").click();
        document.getElementById("t_func_tab_display_two").click();
    });
    submit_btn.addEventListener("click", () => {
        document.getElementById("open_pay_menu").click();
        paynow();
        disable_scroll();
    });
    cross_menu.addEventListener("click", () => {
        enable_scroll();
    });
}
//End funcForm_add_event

function foo(inf){
    let result = "";

    if(inf.charAt(0) == "?"){
        result = inf.slice(4, -3);
    } else {
        result = "error";
    }
    return result;
}

function toggle_onchange(impact){
    let type1_preview_title = document.querySelectorAll("#type1-preview-title");
    for(let i=0; i<type1_preview_title.length; i++){
        type1_preview_title[i].innerText = `${document.getElementById("type1-main-subject").value.toString()}'s ${impact} Impact on ${document.getElementById("type1-main-object").value.toString()}`;
    }
    return;
}
function togAddEvent() {
    $("#togBtn").on('change', function() {
        if (this.getAttribute("checked") == "checked") {
            document.getElementById("check_stands").innerText = "'s Positive Impact on";
            document.getElementById("check_content_stands").innerText = "Content: Positive";
            document.getElementById("final-title-impact").value = "positive"; //Final needed
            toggle_onchange("Positive");
            for(let i=0; i<document.querySelectorAll("#type1-preview-stands").length; i++){
                document.querySelectorAll("#type1-preview-stands")[i].innerText = "Positive";
            }
            this.removeAttribute("checked");
            this.checked = false;
            // alert("False");// To verify
        }
        else {
            document.getElementById("check_stands").innerText = "'s Negative Impact on";
            document.getElementById("check_content_stands").innerText = "Content: Negative";
            document.getElementById("final-title-impact").value = "negative"; //Final needed
            toggle_onchange("Negative");
            for(let i=0; i<document.querySelectorAll("#type1-preview-stands").length; i++){
                document.querySelectorAll("#type1-preview-stands")[i].innerText = "Negative";
            }
            this.setAttribute("checked", "checked");
            this.checked = true;
            // alert("True");// To verify
        }
    });
}
// Main field
function opt_preview_input(){
    const type1_main_subject = document.getElementById("type1-main-subject");
    const type1_main_object = document.getElementById("type1-main-object");
    const type1_main_audience = document.getElementById("type1-main-audience");

    const final_point1_target = document.getElementById("final-point1-target");
    const final_point2_target = document.getElementById("final-point2-target");
    const final_point3_target = document.getElementById("final-point3-target");

    const final_title_subject = document.getElementById("final-title-subject");
    const final_title_impact = document.getElementById("final-title-impact");
    const final_title_object = document.getElementById("final-title-object");
    const final_title_audience = document.getElementById("final-title-audience");

    const type1_preview_title = document.querySelectorAll("#type1-preview-title");
    const type1_preview_stands = document.querySelectorAll("#type1-preview-stands");
    
    //Default area
    final_title_impact.value = "positive";
    final_title_audience.value = "public";
    for(let i=0; i<type1_preview_stands.length; i++){
        type1_preview_stands[i].innerText = "Positive"
    }
    final_point1_target.value = "society";
    final_point2_target.value = "society";
    final_point3_target.value = "society";
    //End default area

    type1_main_subject.addEventListener("change", (e) => {
        let stands = document.getElementById("check_content_stands").innerText.split(" ");
        let word = e.target.value.toString().toLowerCase();
        let caped = cap_first_letter(word);
        for(let i=0; i<type1_preview_title.length; i++){
            type1_preview_title[i].innerText = `${caped}'s ${stands[1]} Impact on ${cap_first_letter(type1_main_object.value.toString())}`;
        }
        final_title_subject.value = caped;
        return;
    });

    type1_main_object.addEventListener("change", (e) => {
        let stands = document.getElementById("check_content_stands").innerText.split(" ");
        let word = e.target.value.toString().toLowerCase();
        let caped = cap_first_letter(word);
        for(let i=0; i<type1_preview_title.length; i++){
            type1_preview_title[i].innerText = `${cap_first_letter(type1_main_subject.value.toString())}'s ${stands[1]} Impact on ${caped}`;
        }
        final_title_object.value = caped;
        return;
    });
    
    type1_main_audience.addEventListener("change", (e) => {
        let word = e.target.value.toString().toLowerCase();
        let caped = cap_first_letter(word);
        if(word.length < 1){
            caped = "public";
        }
        final_title_audience.value = caped;
        return;
    });

    for(let i=0; i<3; i++){
        opt_point(i + 1);
    }
    return;
}
function opt_point(uzi){
    const type1_point_subject = document.getElementById(`type1-point${uzi.toString()}-subject`);
    const type1_point_verb = document.getElementById(`type1-point${uzi.toString()}-verb`);
    const type1_point_object = document.getElementById(`type1-point${uzi.toString()}-object`);
    const type1_point_target = document.getElementById(`type1-point${uzi.toString()}-target`);
    const type1_point_suggest = document.getElementById(`type1-point${uzi.toString()}-suggest`);

    const final_point_subject = document.getElementById(`final-point${uzi.toString()}-subject`);
    const final_point_verb = document.getElementById(`final-point${uzi.toString()}-verb`);
    const final_point_object = document.getElementById(`final-point${uzi.toString()}-object`);
    const final_point_target = document.getElementById(`final-point${uzi.toString()}-target`);
    const final_point_arg = document.getElementById(`final-point${uzi.toString()}-arg`);

    const t_sug_clear = document.getElementById(`t_sug${uzi.toString()}_clear`);

    const type1_preview_arg = document.querySelectorAll(`#type1-preview-arg${uzi.toString()}`);

    t_sug_clear.addEventListener("click", () => {
        type1_point_suggest.value = "";
        final_point_arg.value = sug_arr[uzi - 1].id;
        let subject = cap_first_letter(type1_point_subject.value.toString().toLowerCase());
        let object = cap_first_letter(type1_point_object.value.toString().toLowerCase());
        let verb = type1_point_verb.value.toString().toLowerCase();
        let target = final_point_target.value.toString().toLowerCase();
        let arg = preview_args(uzi);

        for(let i=0; i<type1_preview_arg.length; i++){
            type1_preview_arg[i].innerText = `${subject} ${verb} ${object} to ${target} because ${arg}`;
        }
    });

    type1_point_subject.addEventListener("change", async (e) => {
        let word = e.target.value.toString().toLowerCase();
        let caped = cap_first_letter(word);
        let verb = type1_point_verb.value.toString().toLowerCase();
        let object = cap_first_letter(type1_point_object.value.toString().toLowerCase());
        let target = final_point_target.value.toString().toLowerCase();
        change_colour(type1_point_subject, type1_point_verb, type1_point_object, `point${uzi.toString()}-border`);
        if(word.length > 0 && type1_point_suggest.value.length < 1){
            onchange_cat(uzi);
            final_point_arg.value = sug_arr[uzi - 1].id;
        } else if(word.length > 0){
            onchange_cat(uzi);
        } else {
            suggestion_auto(uzi, false);
            type1_point_suggest.value = "";
            type1_point_suggest.setAttribute("placeholder", "Suggestion: ");
        }
        point_ram[uzi.toString()] = caped;
        final_point_subject.value = caped;

        await sleep(500);

        let arg = preview_args(uzi);

        for(let i=0; i<type1_preview_arg.length; i++){
            type1_preview_arg[i].innerText = `${caped} ${verb} ${object} to ${target} because ${arg}`;
        }
        return;
    });

    type1_point_verb.addEventListener("change", (e) => { //verb1
        let word = e.target.value.toString().toLowerCase();
        let subject = cap_first_letter(type1_point_subject.value.toString().toLowerCase());
        let object = cap_first_letter(type1_point_object.value.toString().toLowerCase());
        let target = final_point_target.value.toString().toLowerCase();
        let arg = preview_args(uzi);

        for(let i=0; i<type1_preview_arg.length; i++){ //ARG!
            type1_preview_arg[i].innerText = `${subject} ${word} ${object} to ${target} because ${arg}`;
        }

        change_colour(type1_point_subject, type1_point_verb, type1_point_object, `point${uzi.toString()}-border`);

        final_point_verb.value = word;
        return;
    });

    type1_point_object.addEventListener("change", (e) => { //object1
        let word = e.target.value.toString().toLowerCase();
        let caped = cap_first_letter(word);
        let verb = type1_point_verb.value.toString().toLowerCase();
        let subject = cap_first_letter(type1_point_subject.value.toString().toLowerCase());
        let target = final_point_target.value.toString().toLowerCase();
        let arg = preview_args(uzi);

        for(let i=0; i<type1_preview_arg.length; i++){
            type1_preview_arg[i].innerText = `${subject} ${verb} ${caped} to ${target} because ${arg}`;
        }

        change_colour(type1_point_subject, type1_point_verb, type1_point_object, `point${uzi.toString()}-border`);

        final_point_object.value = caped;
        return;
    });

    type1_point_target.addEventListener("change", (e) => { //target1
        let word = e.target.value.toString().toLowerCase();
        if(word.length < 1) {
            word = "society";
        }
        let verb = type1_point_verb.value.toString().toLowerCase();
        let object = cap_first_letter(type1_point_object.value.toString().toLowerCase());
        let subject = cap_first_letter(type1_point_subject.value.toString().toLowerCase());
        let arg = preview_args(uzi);

        for(let i=0; i<type1_preview_arg.length; i++){
            type1_preview_arg[i].innerText = `${subject} ${verb} ${object} to ${word} because ${arg}`;
        }
        final_point_target.value = word;
        return;
    });

    return;
}
// End Main field

function preview_args(id){
    const sub = document.getElementById(`type1-point${id.toString()}-subject`);
    const arg = document.getElementById(`type1-point${id.toString()}-suggest`);

    if(sub.value.length > 0 && arg.value.length < 1){
        return `${sub.value} ${sug_arr[id - 1].label}`;
    } else if(arg.value.length > 0){
        return arg.value;
    } else {
        return sug_arr[id - 1].label;
    }
}

function cap_first_letter(word){
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

function change_colour(subject, verb, object, id){
    if(subject.value != "" && verb.value != "" && object.value != ""){
        $(`#${id}`).animate({"border-color": "#008000"}, "slow");
    } else {
        $(`#${id}`).animate({"border-color": "#e01563"}, "slow");
    }
}

function init(){
    let u = "https://beagleetech.ga/essay_init";

    let xhr = new XMLHttpRequest();
        xhr.open("GET", u, true);
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let result = xhr.responseText;
                let cats = JSON.parse(result);
                // console.log(cats[0]["cat1"]);
                init_suggestion(cats);
            } else {
                alert(`Please refresh your browser, error: ${xhr.statusText}`);
            }
          }
        };
        xhr.onerror = function (e) {
            alert(`Please refresh your browser, error: ${xhr.statusText}`);
        };
        xhr.send(null);
    return;
}

function init_suggestion(cats){
    let q;
    let extracted;
    let appened_arr = [];
    for(let i=0; i<3; i++){
        q = i + 1;
        extracted = extract_cats(cats, appened_arr);
        // document.getElementById(`type1-point${q.toString()}-suggest`).setAttribute("placeholder", extracted)
    }
    for(let i=0; i<cats.length; i++){
        arg_arr_lst.push(cats[i]);
    }
    // for(let i=0; i<3; i++){
    //     let id = i + 1;
    //     suggestion_auto(id);
    // }
    // console.log(`No dup: ${appened_arr}`);
    return;
}
function extract_cats(cats, appened_arr){
    let index;
    let random_status = true;
    let find_index;
    do{
        index = getRandomInt(cats.length);
        find_index = appened_arr.find((num) => {
            return num == index;
        });
  
        if(find_index == index){
            continue;
        } else {
            appened_arr.push(index);
            random_status = false;
        }
    } while(random_status);
    let cat_index = index + 1;

    let suggest = cats[index][`cat${cat_index}`][1] + " " + cats[index][`cat${cat_index}`][0];

    sug_arr.push({
        "label": suggest,
        "id": cat_index
    });
    // console.log(suggest);
    return `Suggestion: ${suggest}`;
}
function onchange_cat(id){
    const elmt = document.getElementById(`type1-point${id.toString()}-suggest`);
    const suggestion = document.getElementById(`type1-point${id.toString()}-subject`).value;

    suggestion_auto(id, true);
    elmt.setAttribute("placeholder", `Suggestion: ${suggestion} ${sug_arr[id - 1].label}`);
    if (elmt.value.length > 0) {
        let elmt_changed = elmt.value.replace(point_ram[id.toString()], cap_first_letter(suggestion));
        elmt.value = elmt_changed;
    }
    return;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function suggestion_auto(id, status){
    let source = [];
    let sub = document.getElementById(`type1-point${id.toString()}-subject`).value;
    const preview = document.querySelectorAll(`#type1-preview-arg${id.toString()}`);

    if(status){
        for(let i=0; i<arg_arr_lst.length; i++){
            let q = i + 1;
            source.push({
                "label":`${cap_first_letter(sub)} ${arg_arr_lst[i]["cat"+q.toString()][1]} ${arg_arr_lst[i]["cat"+q.toString()][0]}`,
                "id": q.toString()
            });
        }
    }

    $(`#type1-point${id}-suggest`).autocomplete({
        source: source,
        minLength: 0,
        select: function(event, ui){
            try{
                if(ui.item){
                    // console.log('select', ui.item.label);
                    // console.log("sub: " + sub);
                    // console.log("verb: " + document.getElementById(`type1-point${id.toString()}-verb`).value);
                    for(let i=0; i<preview.length; i++){
                        preview[i].innerText = `${cap_first_letter(sub)} ${document.getElementById(`type1-point${id.toString()}-verb`).value} ${document.getElementById(`type1-point${id.toString()}-object`).value} to ${document.getElementById(`final-point${id.toString()}-target`).value} because ${ui.item.label}`;
                    }
                    document.getElementById(`final-point${id.toString()}-arg`).value = ui.item.id;
                    return ui.item.label;
                  }
            } catch(err) {}
        },
        change: function(event, ui){
            try{
                var searched = this.value;
                //   console.log("Searched: " + searched);
                if(ui.item){} else{
                    // console.log("Change with no ui.item");
                    var result = source.filter(function( obj ) {
                      return obj.label.toLowerCase().indexOf(searched.toLowerCase()) !== -1;
                    });
                    if(result.length>0){
                      $(this).val(result[0].label);
                      document.getElementById(`final-point${id.toString()}-arg`).value = result[0].id;
                    //   console.log("Changed by: default");
                      for(let i=0; i<preview.length; i++){
                        preview[i].innerText = `${cap_first_letter(sub)} ${document.getElementById(`type1-point${id.toString()}-verb`).value} ${document.getElementById(`type1-point${id.toString()}-object`).value} to ${document.getElementById(`final-point${id.toString()}-target`).value} because ${result[0].label}`;
                    }
                    } else{
                      //clear the autocomplete
                    //   console.log("Changed with autocomplete");
                      let final_value = sug_arr[parseInt(id) - 1].label;
                      $(this).val(final_value);
                      document.getElementById(`final-point${id.toString()}-arg`).value = sug_arr[parseInt(id) - 1].id;
                    //   console.log("Changed by: else");
                      for(let i=0; i<preview.length; i++){
                        preview[i].innerText = `${cap_first_letter(sub)} ${document.getElementById(`type1-point${id.toString()}-verb`).value} ${document.getElementById(`type1-point${id.toString()}-object`).value} to ${document.getElementById(`final-point${id.toString()}-target`).value} because ${final_value}`;
                    }
                    }
                }
            } catch(err) {}
        }
      }).focus(function () {
        $(this).autocomplete("search");
    });
}
function paynow(){
    let deewsiehttseb = "3";

    document.getElementById('paypal-button-container').remove();
    paypal.Buttons({
        style: {
            color:  'gold',
            shape:  'pill',
            size: 'responsive',
            label:  'checkout',
            fundingicons: 'true'
        },
        createOrder: function(data, actions) {
         return actions.order.create({
             purchase_units: [{
                        amount: {
                            value: deewsiehttseb
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    // Show a success message to the buyer
                    // document.getElementById('loading-after-payment').style.display = 'flex';
                    console.log(details);

                });
            },
            onError: function (err) {
                    console.log(err);
                }
        }).render('#paypal-button-container');
          var para = document.createElement("DIV");
          para.className="paypal-div";
          para.id="paypal-button-container";
          document.getElementById("append-div").appendChild(para);
}

// $(window).resize(function() {
    //resize_element();
// });

$(document).ready(() => {
    // Initianize
    init();
    togAddEvent();
    disable_drag();
    funcForm_add_event();
    opt_preview_input();
    // preview_input();
    // End initianize
});