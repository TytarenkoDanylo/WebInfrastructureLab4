const apiUrl = 'http://localhost:8000/api/v1/orders/'; // Replace with your API endpoint
//let allOrders = [];

// async function fetchOrderDetails() {
//     try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             throw new Error('Failed to fetch data from the server');
//         }

//         allOrders = await response.json();
//         displayOrderDetails(allOrders);
//     } catch (error) {
//         document.getElementById('message').textContent = `Error: ${error.message}`;
//         document.getElementById('message').className = 'error';
//     }
// }


let allOrders = [
    {
        "id": 1,
        "client": 1,
        "car": 1,
        "client_details": {
            "id": 1,
            "full_name": "test",
            "age": 20,
            "gender": "Male",
            "email": null
        },
        "car_details": {
            "id": 1,
            "car_type": "test",
            "price": "200.00",
            "mileage": 2000,
            "condition": "test"
        },
        "seller_details": {
            "seller_id": 1,
            "full_name": "test",
            "age": 20,
            "gender": "Male"
        },
        "order_date": "2024-12-16T23:12:39.573806Z"
    },
    {
        "id": 2,
        "client": 1,
        "car": 1,
        "client_details": {
            "id": 1,
            "full_name": "test",
            "age": 20,
            "gender": "Male",
            "email": null
        },
        "car_details": {
            "id": 1,
            "car_type": "test",
            "price": "200.00",
            "mileage": 2000,
            "condition": "test"
        },
        "seller_details": {
            "seller_id": 1,
            "full_name": "test",
            "age": 20,
            "gender": "Male"
        },
        "order_date": "2024-12-16T23:12:53.982670Z"
    }
];

function displayOrderDetails(data) {
    const table = document.getElementById('order-table');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Clear previous rows

    data.forEach(order => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.client_details.full_name}</td>
            <td>${order.client_details.email || 'N/A'}</td>
            <td>${order.seller_details.full_name}</td>
            <td>${order.car_details.car_type}</td>
            <td>$${order.car_details.price}</td>
            <td>${new Date(order.order_date).toLocaleString()}</td>
        `;

        tbody.appendChild(row);
    });

    document.getElementById('message').style.display = 'none';
    table.style.display = 'table';
}

function filterOrders() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        alert('Please enter both start date and end date to filter orders.');
        return;
    }
    if (startDate > endDate) {
        alert('Start date must be earlier than End date');
        return;
    }

    const filteredOrders = allOrders.filter(order => {
        const orderDate = new Date(order.order_date);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    displayOrderDetails(filteredOrders);
}

async function filterOrdersWithRequest() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        alert('Please enter both start date and end date to filter orders.');
        return;
    }
    if (startDate > endDate) {
        alert('Start date must be earlier than End date');
        return;
    }

    try {
        const filterUrl = `${apiUrl}?start_date=${startDate}&end_date=${endDate}`;
        const response = await fetch(filterUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch filtered data from the server');
        }

        const filteredData = await response.json();
        displayOrderDetails(filteredData);
    } catch (error) {
        document.getElementById('message').textContent = `Error: ${error.message}`;
        document.getElementById('message').className = 'error';
    }
}

// fetchOrderDetails();
displayOrderDetails(allOrders);
