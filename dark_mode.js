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
    let dark_mode = new dark_theme();
    dark_mode.remove();
    document.getElementById("theme").addEventListener("click", (e)=>{
        let theme_control = new dark_theme();
        theme_control.add();
    });
})();