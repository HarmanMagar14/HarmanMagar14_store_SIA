
async function fetchProductData() {
    const apiURL = 'https://fakestoreapi.com/products';
    
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const products = await response.json();
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td>${product.category}</td>
                <td>
                    <img src="${product.image}" 
                         alt="${product.title}" 
                         width="50" 
                         style="cursor:pointer;">
                </td>
            `;


            row.addEventListener("click", () => {
                showModal(product);
            });

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching product data:', error);
        document.getElementById('tableBody').innerHTML =
            '<tr><td colspan="5">Failed to load data. Please try again later.</td></tr>';
    }
}

fetchProductData();



function showModal(product) {
    const modal = document.getElementById("userModal");
    const modalDetails = document.getElementById("modalDetails");

    modalDetails.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}" width="150">
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Rating:</strong> ${product.rating.rate} 
           (${product.rating.count} reviews)</p>
    `;

    modal.style.display = "block";
}


document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("userModal").style.display = "none";
});



window.addEventListener("click", (event) => {
    const modal = document.getElementById("userModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});