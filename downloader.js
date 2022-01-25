(function(){
    const user_btn = document.getElementById("user_btn");
    
    try {
        const typpo = new URLSearchParams(window.location.search).get('type');
        if (typpo=="user"){
            user_btn.click();
        }
    } catch(e){}
    
  })();