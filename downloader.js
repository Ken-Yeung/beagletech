(function(){
    const user_btn = document.getElementById("user_btn");
    console.log("Hello World.");
    
    try {
        const typpo = new URLSearchParams(window.location.search).get('type');
        if (typpo=="user"){
            user_btn.click();
        }

        // console.log("Hello World.");
    } catch(e){}
    
  })();