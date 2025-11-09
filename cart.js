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


    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    const shippingCost = 5;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // دالة لتحديث القيم داخل localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

  // دالة لحساب الإجماليات
    function calculateTotals() {
    let subtotal = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price); // ← تحويل السعر من نص إلى رقم
        if (!isNaN(price)) {
            subtotal += price * (item.quantity || 1);
        }
    });

        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        totalEl.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;
    }

  // دالة لرسم الجدول
    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <tr><td colspan="6" style="text-align:center;color:#c06c84;">Your cart is empty 😢</td></tr>
            `;
            subtotalEl.textContent = "$0.00";
            totalEl.textContent = `$${shippingCost.toFixed(2)}`;
            return;
        }

        cart.forEach((item, index) => {
            const price = parseFloat(item.price); // ← تأكيد أن السعر رقم
            const quantity = item.quantity || 1;
            const subtotal = isNaN(price) ? 0 : price * quantity;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><button class="remove-btn">&times;</button></td>
                <td><img src="${item.img}" alt="${item.name}" style="width:60px; border-radius:8px;"></td>
                <td>${item.name}</td>
                <td>$${price.toFixed(2)}</td>
                <td class="quantityInput">
                    <button class="decrease">-</button>
                    <input type="number" min="1" value="${quantity}" class="quantity-input">
                    <button class="increase">+</button>
                </td>
                <td>$${subtotal.toFixed(2)}</td>
            `;

      // الأزرار
            const decreaseBtn = row.querySelector(".decrease");
            const increaseBtn = row.querySelector(".increase");
            const quantityInput = row.querySelector(".quantity-input");
            const removeBtn = row.querySelector(".remove-btn");

            decreaseBtn.addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                }
                saveCart();
                renderCart();
            });

        increaseBtn.addEventListener("click", () => {
            item.quantity++;
            saveCart();
            renderCart();
        });

        quantityInput.addEventListener("change", (e) => {
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 1) val = 1;
            item.quantity = val;
            saveCart();
            renderCart();
        });

        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        });

        cartItemsContainer.appendChild(row);
    });

        calculateTotals();
    }

    renderCart();
});
