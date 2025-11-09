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

    // اختيار كل كروت المنتجات
    const productCards = document.querySelectorAll("article.product-card");

    // قاعدة بيانات مصغرة للصور حسب نوع المنتج
    const productImages = {
        "Rose Flower Bouquet": [
            "./image/flowerShop1.jpg",
            "./image/rose1.jpg",
            "./image/rose2.jpg",
            "./image/rose3.jpg"
        ],
        "Perfume VEREVASE": [
            "./image/parfumeV.jpg",
            "./image/PBlue.jpg",
            "./image/PRed.jpg",
            "./image/Pparper.jpg"
        ],
        "Bouquet of Butterflies": [
            "./image/flowerBaterfly.jpg",
            "./image/flowerBatterflyBlue.jpg",
            "./image/flowerBetterflyppp.jpg",
            "./image/flowerBetterflyRed.jpg"
        ],
        "White rose bouquet": [
            "./image/flowerRoZa.jpg",
            "./image/BlueFlower.jpg",
            "./image/pppFlower.jpg",
            "./image/RedFlower.jpg"
        ],
        "Perfume TOM FORD": [
            "./image/perfumshop2.jpg",
            "./image/PTomFord1.jpg",
            "./image/PTomFord2.jpg"
        ],
        "Yellow rose bouquet": [
            "./image/bouquetflowerC.jpg",
            "./image/ProsePink.jpg",
            "./image/pRoseBB.jpg",
            "./image/pRoseP.jpg"
        ],
        "Drops of Magic Concentrated Perfume with a Long-Lasting Scent": [
            "./image/parfumeshop4.jpg",
            "./image/PQflower1.jpg",
            "./image/PQflower2.jpg",
            "./image/PQflower3.jpg"
        ],
        "Yellow rose bouquet": [
            "./image/bouquetflowerC.jpg",
            "./image/ProsePink.jpg",
            "./image/pRoseBB.jpg",
            "./image/pRoseP.jpg"
        ],
};
    productCards.forEach( cart => {
        cart.addEventListener("click", ()=>{
            
            const productData = {
                id: cart.dataset.id,
                name: cart.dataset.name,
                price: cart.dataset.price,
                img: cart.dataset.img,
                type: cart.dataset.type,
                description: cart.dataset.description,
                images: productImages[cart.dataset.name] || [] // يضيف صور بناء غلى الاسم
            };
            localStorage.setItem("selectedType", JSON.stringify(productData));
            window.location.href = "sproduct.html";
        })
    })


    // ================== تأثير ظهور المنتجات عند التمرير ==================
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