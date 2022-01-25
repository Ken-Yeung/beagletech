(function(){
    const user_btn = document.getElementById("user_btn");
    console.log("Hello World.");
    
    try {
        const typpo = new URLSearchParams(window.location.search).get('type');
        if (typpo=="user"){
            
            setTimeout(()=>{
                user_btn.click();
            }, 333);
            // user_btn.click();

            // console.log("True");
        } else {
            // print(typpo);
            // print(window.location.search);
        }

        // console.log("Hello World.");
    } catch(e){}
    
  })();