document.addEventListener("DOMContentLoaded", ()=>{


// عرص الصور عي قسم الhero بشكل متسلسل 
const heroSlideshow = document.querySelector(".slide-show");

// مصفوفة الصور للخلفية (غيري المسارات حسب مجلدك)
const heroImages = [
    "./image/perfume_2.jpg",
    "./image/flower&parfume.jpeg",
    "./image/flower-2.jpeg",
    "./image/parfumeAA.jpg",
    "./image/parfumeBB.jpg",
    "./image/flowerDD.jpg",
    "./image/perfum_1.jpg",
    "./image/flowerParfumer.jpg",
    "./image/flowerCC.jpg"
];
heroImages.forEach((img, index) => {
    const slide = document.createElement("div");
    slide.classList.add("hero-slide");
    slide.style.backgroundImage = `url(${img})`;
    if (index === 0) slide.classList.add("active");
    heroSlideshow.appendChild(slide);
}); 

let current = 0;
const slides = document.querySelectorAll(".hero-slide");

function changeSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
}

setInterval(changeSlide, 5000);


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


// ضافه المنتجات الى السله 

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    
    // تحديث عداد السلة (إذا عندك عنصر بالهيدر)
    const cartCount = document.querySelector("span#cart-count");
    
    function updateCartCount(){
        if (cartCount) {
            const count = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
            cartCount.textContent = count;
        }
    }
    updateCartCount();

    // ربط الأزرار مع الإضافة
    // اضافه حدث لمل زر
    addToCartButtons.forEach((btn) =>{
        btn.addEventListener("click", () =>{
            const productEl = btn.closest(".product");
            const product = { // هذا الاوبجيكت يحتوي على معلومات كل منتج يمكن اختياره لاضافته للسله
                id: productEl.dataset.id,
                name: productEl.querySelector("h3").textContent,
                price: productEl.querySelector(".price").textContent,
                img: productEl.querySelector("img").src,
                quantity: 1
            };
            addToCart(product);
            console.log("Product element:", productEl);
            console.log("Product ID:", productEl?.dataset.id);
    
        });
    });


    // دالة لإضافة المنتج إلى السلة
    function addToCart(product){
        const existingProduct = cart.find((item) => item.id === product.id);
    
        if (existingProduct) {
            existingProduct.quantity = parseInt(existingProduct.quantity) + 1;
        } else {
            cart.push(product);
        }
    
         // حفظ في localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    
        // تحديث العدد في الواجهة
        updateCartCount();
    
        // إشعار بسيط عند الإضافة
        showAddedMessage(product.name);
        console.log(cartCount);
    }
// تحديث العدد في الواجهة
    function updateCartCount() {
        if (cartCount) {
            const count = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
            cartCount.textContent = count;
        }
    }

// دالة لعرض رسالة صغيرة بعد الإضافة
    function showAddedMessage(name){
        const msg = document.createElement("div");
        msg.className ="added-msg";
        msg.textContent = `${name} Added to cart ✔`;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2000);
    }


    // لعرض تاريخ حقوق التصميم
    const yearEl = document.querySelector("span#year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();


// ================== تأثير ظهور المنتجات عند التمرير ========================
const productCards = document.querySelectorAll("article.product-card");
    function showProducts() {
        const triggerBottom = window.innerHeight * 0.85;

        productCards.forEach(product => {
            const productTop = product.getBoundingClientRect().top;

            if (productTop < triggerBottom) {
                product.classList.add("show"); // هنا نضيف الكلاس show
            }
        });
    }
    // استدعاء عند التحميل والتمرير
    window.addEventListener("scroll", showProducts);
    window.addEventListener("load", showProducts);


});