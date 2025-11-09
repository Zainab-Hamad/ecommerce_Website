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


    const posts = [
        {
            id: 1,
            title: "How to choose the perfect bouquet?",
            image: "./image/blog_flower-boquet.png",
            details: `Choosing the perfect bouquet begins with determining the occasion: For romantic occasions, red or pink roses are preferred, while for formal occasions, white flowers or light colors are appropriate. For gifts or congratulations, cheerful colors like yellow and orange add an atmosphere of joy and happiness.
                        The type of flowers should be carefully chosen; roses express love, lilies symbolize purity, peonies reflect femininity and beauty, while sunflowers spread energy and joy. The beauty of the bouquet is complemented by color coordination. Similar shades can be blended to create a sense of softness, or contrasting colors can be carefully chosen to add a touch of luxury and distinction.
                        The size and shape of the bouquet play an important role. Small bouquets are suitable for everyday or simple gifts, while large, round bouquets are ideal for weddings and major celebrations. Finishing touches such as green leaves or shiny ribbons can also be added to complete the elegance of the bouquet.  Don't forget to add a card or a short message expressing your feelings, as it's what makes the bouquet truly unique and special.`,
            date: "28/10",
        },
        {
            id: 2,
            title: "Perfumes That Reflect Your Personality.",
            image: "./image/blog-perfem.webp",
            details: `To choose a fragrance that matches your personality, start by identifying your character. If you have a calm and romantic personality, you may prefer floral and fruity scents like rose, jasmine, and light fruits. If you are strong and confident, woody, musky, and amber fragrances reflect power and confidence. For cheerful and adventurous personalities, fresh and lively scents such as citrus and herbs convey energy and vitality.
                        The choice of fragrance also depends on the occasion. For daytime and work, light and refreshing scents are ideal as they are pleasant and not overpowering. Evening events and special occasions, on the other hand, call for warm and rich fragrances that exude elegance and allure. Season and weather also play an important role; in summer and hot weather, light and refreshing fragrances are preferable, while in winter and cold weather, heavier and warmer scents like oud, amber, and vanilla are more suitable.
                        When testing a fragrance, spray it on your skin rather than just on paper, and allow it to develop for an hour to experience the top, middle, and base notes. Ultimately, the right fragrance is the one that makes you feel comfortable and confident, not just because it is trendy or liked by others.`,
            date: "30/10",
        },
        {
            id: 3,
            title: "To keep flowers and bouquets fresh and beautiful for as long as possible.",
            image: "./image/blog-flower-keep1.png",
            details: `To keep flowers and bouquets fresh and beautiful for as long as possible, start by regularly trimming the stems, cutting about 1–2 cm from the bottom at a 45° angle every couple of days. This helps the flowers absorb water more effectively. Use clean water and change it every 2–3 days, adding a little sugar or commercially available flower food to enhance their nourishment.
                        Place the bouquet in a relatively cool area, away from direct sunlight, as high temperatures can cause the flowers to wilt quickly. Remove any leaves that fall below the water level to prevent decay, and keep fruits away from the flowers, as they release ethylene gas which accelerates wilting.
                        To maintain petal moisture, lightly mist them with water daily. You can also use a flower preservative, available at florists, which helps keep flowers fresh for longer.`,
            date: "25/10",
        },

    ]

     // جلب الـ id من الرابط
    const params = new URLSearchParams(window.location.search);
    console.log(params)
    const postId = parseInt(params.get("id"));
    console.log(postId);

    const post = posts.find(p => p.id === postId);

    if (post) {
        document.querySelector(".postImage").src = post.image;
        document.querySelector(".title").textContent = post.title;
        document.querySelector(".details").textContent = post.details;
        document.querySelector(".date").innerHTML = `<h2 class="date sdate">${post.date}</h2>`;
    }else {
        document.querySelector(".blog").innerHTML = `
            <h2 style="text-align:center;color:#d26ba3;">😢 The blog will not be found.</h2>
            <a href="blog.html" class="return">RETURN TO THE BLOG</a>
        `;
    } 

})