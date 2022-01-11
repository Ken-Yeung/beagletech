class dark_theme{
    constructor(){
        this.classes = [
            {
                "mode": "dark-background",
                "ids": [
                    "content_wrapper",
                    "mini_box_1",
                    "mini_box_2",
                    "mini_box_3",
                    "ts",
                    "ts_label",
                    "impact",
                    "impact_label",
                    "to",
                    "to_label",
                    "arg_selector_1",
                    "arg_selector_2",
                    "arg_selector_3",
                    ".body",
                    "progress"
                ]
            },
            {
                "mode": "light-dark-bg",
                "ids": [
                    "nav",
                    "portal_progress",
                    "main-home-tutorial",
                    "main-home-about",
                    "main-home-showcase",
                ]
            },
            {
                "mode": "dark-words",
                "ids": [
                    "btn-start",
                    "popup_back"
                ]
            },
            {
                "mode": "dark-mode",
                "ids": [
                    "stick"
                ]
            }
        ];
    }

    remove(){
        for(let i = 0; i < this.classes.length; i++){
            for(let ii = 0; ii < this.classes[i].ids.length; ii++){
                let mode_change = new class_worker(this.classes[i].ids[ii]);
                mode_change.remove(this.classes[i].mode);
            }
        }
    }

    add(){
        for(let i = 0; i < this.classes.length; i++){
            for(let ii = 0; ii < this.classes[i].ids.length; ii++){
                let mode_change = new class_worker(this.classes[i].ids[ii]);
                mode_change.add(this.classes[i].mode);
            }
        }
    }
}

(function(){
    // let dark_mode = new dark_theme();
    $('#theme').click();
    let stored_theme = localStorage.getItem("theme");
    let theme_stat = stored_theme == null || stored_theme == "0";

    setTimeout(()=>{
        try {
            if (theme_stat){
                $('#theme').click();
                console.log(theme_stat);
            }
        } catch (error){}
    },999);

    // dark_mode.remove();
    // document.getElementById("theme").addEventListener("click", (e)=>{
    //     let theme_control = new dark_theme();
    //     theme_control.add();
    // });
    $("#theme").on('change', function() {
        // var switchStatus = false;
        let dark = new dark_theme();
        if ($(this).is(':checked')) { // true
            // switchStatus = $(this).is(':checked');
            // alert(switchStatus);// To verify
            set_img("home", "https://uploads-ssl.webflow.com/614ad10f1f9dc8890e785112/61dd5779f0eb77638667a17d_logo4darkmode-cutout.png");
            dark.add();
            localStorage.setItem("theme", "1");
        }
        else { // false
        //    switchStatus = $(this).is(':checked');
        //    alert(switchStatus);// To verify
            set_img("home", "https://uploads-ssl.webflow.com/614ad10f1f9dc8890e785112/61dd5779a26af837182b662d_raw_logo_without_name.png");
            dark.remove();
            localStorage.setItem("theme", "0");
        }
    });
})();