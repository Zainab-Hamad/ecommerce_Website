document.addEventListener("DOMContentLoaded", ()=>{

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
    
    //  مصفوفة المقالات in the blog
    const posts = [
        {
            id: 1,
            title: "How to choose the perfect bouquet?",
            image: "./image/blog_flower-boquet.png",
            details: `Choosing the perfect bouquet begins with determining the occasion: For romantic occasions, red or pink roses are preferred, while for formal occasions, white flowers or light colors are appropriate...`,
            date: "28/10",
        },
        {
            id: 2,
            title: "Perfumes That Reflect Your Personality.",
            image: "./image/blog-perfem.webp",
            details: `To choose a fragrance that matches your personality, start by identifying your character. If you have a calm and romantic personality, you may prefer floral and fruity scents like rose, jasmine, and light fruits. If you are strong and confident, woody, musky, and amber fragrances reflect power and confidence...`,
            date: "30/10",
        },
        {
            id: 3,
            title: "To keep flowers and bouquets fresh and beautiful for as long as possible.",
            image: "./image/blog-flower-keep1.png",
            details: `To keep flowers and bouquets fresh and beautiful for as long as possible, start by regularly trimming the stems, cutting about 1–2 cm from the bottom at a 45° angle every couple of days. This helps the flowers absorb water more effectively. Use clean water and change it every 2–3 days, adding a little sugar or commercially available flower food to enhance their nourishment...`,
            date: "25/10",
        },

    ]

    // توليد المقالات داخل الصفحة section.blog
    const postsContainer = document.querySelector("section.blog");

    
    posts.forEach(post =>{
        const postHTML =`
            <div class="blog-box">
                    <div class="blog-img">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                    <div class="blog-details">
                        <h1 class="title">${post.title}</h1>
                        <p class="details">
                            ${post.details}
                        </p>
                        <a href="sblog.html?id=${post.id}" id="${post.id}" class="read-more">CONTINUE READING</a>
                    </div>
                    <h2 class="date">${post.date}</h2>
            </div>
        `;
        postsContainer.innerHTML += postHTML;
    });

    // ================== تأثير ظهور المنتجات عند التمرير =====================
    const blogBoxes = document.querySelectorAll("div.blog-box");
    function showPosts() {
        const triggerBottom = window.innerHeight * 0.85;
        blogBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            if (boxTop < triggerBottom) box.classList.add("show");
        });
    }
    window.addEventListener("scroll", showPosts);
    window.addEventListener("load", showPosts);

});
