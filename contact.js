document.addEventListener("DOMContentLoaded", () => {

    // اضهار قائمه النافبار عند الضغط علئ المنيو في شاشات الايباد ولتلفون
    const mobileBar = document.querySelector("#mobile");
    const navagationBar =document.querySelector(".nav-bar");
    const mobileBarClose = document.querySelector("#close");
    
    if(mobileBar){
        mobileBar.addEventListener('click', () =>{
            navagationBar.classList.add("active");
        })
    }
    
    if(mobileBarClose){
        mobileBarClose.addEventListener('click', () =>{
            navagationBar.classList.remove("active");
        })
    }

    
    const form = document.querySelector(".contact-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for reaching out 💌 We’ll respond as soon as possible!");
        form.reset();
    });
});
