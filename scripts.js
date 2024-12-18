document.addEventListener("DOMContentLoaded", () => {
    const pizzas = document.querySelectorAll(".pizzas-sabores-pedido");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalContainer = document.getElementById("cart-total");

    let cart = []; // Arreglo para almacenar los productos agregados al carrito

    // Función para actualizar el carrito en el HTML
    function updateCart() {
        // Limpiar los ítems del carrito
        cartItemsContainer.innerHTML = "";

        let total = 0;

        // Iterar sobre el carrito para mostrar los ítems
        cart.forEach(item => {
            const pizzaElement = document.createElement("div");
            pizzaElement.classList.add("cart-item");
            pizzaElement.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>$${item.totalPrice}</span>
            `;
            cartItemsContainer.appendChild(pizzaElement);

            total += item.totalPrice; // Sumar al total
        });

        // Mostrar el total en el carrito
        cartTotalContainer.textContent = `Total: $${total}`;
    }

    pizzas.forEach(pizza => {
        const incrementButton = pizza.querySelector(".increment");
        const decrementButton = pizza.querySelector(".decrement");
        const counterValue = pizza.querySelector(".counter-value");
        const addButton = pizza.querySelector(".boton-agregar");

        incrementButton.addEventListener("click", () => {
            let currentValue = parseInt(counterValue.textContent);
            counterValue.textContent = currentValue + 1;
        });

        decrementButton.addEventListener("click", () => {
            let currentValue = parseInt(counterValue.textContent);
            if (currentValue > 1) {
                counterValue.textContent = currentValue - 1;
            }
        });

        addButton.addEventListener("click", () => {
            const pizzaName = pizza.getAttribute("data-name");
            const pizzaPrice = parseInt(pizza.getAttribute("data-price"));
            const quantity = parseInt(counterValue.textContent);

            const totalPrice = pizzaPrice * quantity;

            // Crear un objeto para el item
            const pizzaItem = {
                name: pizzaName,
                price: pizzaPrice,
                quantity: quantity,
                totalPrice: totalPrice
            };

            // Agregar el item al carrito
            cart.push(pizzaItem);

            // Actualizar el carrito en el HTML
            updateCart();

            // Mostrar una alerta con el detalle del producto agregado
            alert(`Agregaste ${quantity} ${pizzaName} por un total de $${totalPrice}`);
        });
    });
});
