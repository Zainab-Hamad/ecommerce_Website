//ربط عل منتج بصفحه الشوب بواجهه صفحه سبروديكت وعرض المنتجات من نفس النوع

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

    const productData = JSON.parse(localStorage.getItem("selectedType"));
    if (!productData) {
        document.querySelector(".title").textContent = "The product is not Defined 😢";
        return;
    }
    if (productData) {
        document.querySelector(".mainImage").src = productData.img;
        document.querySelector(".title").textContent = productData.name;
        document.querySelector(".price").textContent = productData.price;
        document.querySelector(".product-desc").textContent = productData.description;
    }

    // توليد الصور المصغرة ديناميكيًا
    const smallImgGroup = document.querySelector(".small-img-group");
    smallImgGroup.innerHTML = productData.images.map(img => `
        <div class="small-img-col">
            <img src="${img}" class="small-img" width="100%">
        </div>
    `).join("");

    // تبديل الصورة الرئيسية عند الضغط على أي مصغرة
    const mainImg = document.querySelector(".mainImage");
    const smallImg = document.querySelectorAll(".small-img");
    smallImg.forEach((img) =>{
        img.addEventListener("click", ()=> {
            mainImg.src = img.src;
        })
    })

    // === التحكم بعدد المنتجات ===
    const decreaseBtn = document.querySelector(".decrease");
    const increaseBtn = document.querySelector(".increase");
    const quantityInput = document.querySelector(".quantity input");
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener("click", () => {
            if (quantityInput.value > 1) {
                quantityInput.value--;
            }
        });
    
        increaseBtn.addEventListener("click", () => {
            quantityInput.value++;
        });
    }

    
    const allProducts = [
        { name: "Rose Flower Bouquet", img: "./image/floweBouquet.jpg", price: 20, type: "flowers" },
        { name: "Perfume Chanel", img: "./image/parfumeBB.jpg", price: 67, type: "perfumes" },
        { name: "Yellow Flower", img: "./image/bouquetflowerB.jpg", price: 10, type: "flowers" },
        { name: "Perfume VEREVASE", img: "./image/parfumeV.jpg", price: 67, type: "perfumes" },
        { name: "Bouquet of Butterflies", img: "./image/flowerBaterfly.jpg", price: 25, type: "flowers" },
        { name: "Perfume ENCRE NOIRE", img: "./image/parfumeE.jpg", price: 53.5, type: "perfumes" },
        { name: "White rose bouquet", img: "./image/flowerRoZa.jpg", price: 20, type: "flowers" },
        { name: "Perfume TOM FORD", img: "./image/perfumshop2.jpg", price: 291, type: "perfumes" },
        { name: "Yellow rose bouquet", img: "./image/bouquetflowerC.jpg", price: 10, type: "flowers" },
        { name: "Drops of Magic Concentrated Perfume with a Long-Lasting Scent", img: "./image/parfumeshop4.jpg", price: 125, type: "perfumes" },
        { name: "ORIENTAL Perfume", img: "./image/parfumeQ.jpg", price: 10, type: "perfumes" },
        
        { name: "Spring Elegance Bouquet", img: "./image/bouquetflowerA.jpg", price: 12, type: "flowers" },


    ];

    const relatedContainer = document.querySelector("section.featured div.product");
    const related = allProducts.filter(p => p.type === productData.type && p.name !== productData.name);
        relatedContainer.innerHTML = related.map(p => `
            <article class="product-card product" >
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">${p.price}</p>
                <div class="icon-btn">
                    <button class="btn add-to-cart">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <button class="btn like">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
            </article>
        `).join("");

 // زر "أضف إلى السلة"
    const addToCartBtn = document.querySelector(".add-to-cart");
    
    addToCartBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(item => item.id === productData.id);
    
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...productData, quantity: 1 });
            }

        localStorage.setItem("cart", JSON.stringify(cart));

       // تحديث العداد
        const cartCount = document.querySelector("span#cart-count");
    
        function updateCartCount(){
            if (cartCount) {
                const count = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
                cartCount.textContent = count;
            }
        }
        updateCartCount();
    
    // رسالة إضافة بسيطة
        const msg = document.createElement("div");
        msg.className = "added-msg";
        msg.textContent = `${productData.name} Added to cart ✔`;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2000);
    });


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