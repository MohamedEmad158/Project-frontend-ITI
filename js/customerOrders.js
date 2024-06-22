document.addEventListener("DOMContentLoaded", function () {
    const ordersContainer = document.getElementById('orders-container');

    function loadOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        ordersContainer.innerHTML = '';

        orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            orderItem.innerHTML = `
                <h3>Order ID: ${order.id}</h3>
                <p>Status: ${order.status}</p>
                <p>Items: ${order.items.map(item => item.name).join(', ')}</p>
                <p>Total Amount: ${order.totalAmount.toFixed(2)} LE</p>
            `;
            ordersContainer.appendChild(orderItem);
        });
    }

    loadOrders();
});

function logoutUser() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../html/LoginPage.html';
}
