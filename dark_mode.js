var dark_mode = (e)=>{
    let classes = [
        {
            "mode": "dark-background",
            "ids": [
                "content_wrapper",
                "portal_progress",
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

    for(let i = 0; i < classes.length; i++){
        for(let ii = 0; ii < classes[i].ids.length; ii++){
            let mode_change = new class_worker(classes[i].ids[ii]);
            mode_change.remove(classes[i].mode);
        }
    }

};

(function(){
    dark_mode();
    // document.getElementById("changemode").addEventListener("toggle", dark_mode);
})();