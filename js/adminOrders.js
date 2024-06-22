document.addEventListener("DOMContentLoaded", function () {
    const ordersContainer = document.getElementById('orders-container');

    function loadOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        ordersContainer.innerHTML = '';

        orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('order-item');
            orderItem.innerHTML = `
                <div>
                    <h3>Order ID: ${order.id}</h3>
                    <p>Status: ${order.status}</p>
                    <p>Items: ${order.items.map(item => item.name).join(', ')}</p>
                    <p>Total Amount: ${order.totalAmount.toFixed(2)} LE</p>
                </div>
                <div>
                    <button class="confirm" data-id="${order.id}">Confirm</button>
                    <button class="reject" data-id="${order.id}">Reject</button>
                </div>
            `;
            ordersContainer.appendChild(orderItem);
        });
    }

    ordersContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('confirm') || event.target.classList.contains('reject')) {
            const orderId = event.target.getAttribute('data-id');
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            const orderIndex = orders.findIndex(order => order.id == orderId);

            if (orderIndex > -1 && orders[orderIndex].status === 'Pending') {
                orders[orderIndex].status = event.target.classList.contains('confirm') ? 'Confirmed' : 'Rejected';
                localStorage.setItem('orders', JSON.stringify(orders));
                loadOrders();
            }
        }
    });

    loadOrders();
});

function logoutUser() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../html/LoginPage.html';
}
