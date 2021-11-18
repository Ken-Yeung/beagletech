class event_listen {
    constructor(){
        this.form = document.querySelectorAll(".form");

        this.form_1_sumbit = document.getElementById("submit-step1");
        // this.form_1 = document.getElementById("form")

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
                    }
                }
            });
        }
    }

}

(function(){
    const listener = new event_listen();
    listener.all_forms();

    console.log("Successfully imported and updated");
    document.getElementById("btn-start").addEventListener("click",(e)=>{
        document.getElementById("main-tab-1").click();
        console.log("Success");
    });
})();