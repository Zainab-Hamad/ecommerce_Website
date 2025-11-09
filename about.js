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

    const sections = document.querySelectorAll("section");

    function revealSections() {
        const triggerBottom = window.innerHeight * 0.85;

        sections.forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < triggerBottom) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    window.addEventListener("load", revealSections);
});