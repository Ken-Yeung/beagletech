(function(){
    const user_btn = document.getElementById("user_btn");
    const url = "https://ws.beagletech.org/";
    // console.log("Hello World.");
    
    try {
        const typpo = new URLSearchParams(window.location.search).get('type');
        if (typpo=="user"){
            
            setTimeout(()=>{
                user_btn.click();
            }, 333);
        }
    } catch(e){}
    
  })();