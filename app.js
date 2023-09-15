document.addEventListener("DOMContentLoaded", function () {
    const orderLines = document.getElementById("order-lines");
    const addProductButton = document.getElementById("add-product");
    const deleteSelectedButton = document.getElementById("delete-selected");
    const totalPriceDisplay = document.getElementById("total-price");
    const balanceDisplay = document.getElementById("balance");

    let productData = []; // An array to store product data for each line

    // Function to create a new product line
    function createProductLine() {
        // Create a container div for the product line
        const productLine = document.createElement("div");
        productLine.classList.add("product-line");

        // Create a dropdown for product name
        const productNameDropdown = document.createElement("select");
        productNameDropdown.classList.add("product-name-dropdown");

        // Add an empty option as the default
        const emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.textContent = "Select a product";
        productNameDropdown.appendChild(emptyOption);

        // Create a dropdown for product name
        const productNameDropdown = document.createElement("select");
        productNameDropdown.classList.add("product-name-dropdown");

        // Add an empty option as the default
        const emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.textContent = "Select a product";
        productNameDropdown.appendChild(emptyOption);

        // Fetch product names from the server using AJAX
        fetch('/get-product-names.php') // Replace with the actual server endpoint
        .then(response => response.json())
        .then(productNames => {
            // Loop through the retrieved product names and create options
            productNames.forEach(productName => {
                const option = document.createElement("option");
                option.value = productName;
                option.textContent = productName;
                productNameDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching product names:', error);
        });

        // Create an input for cost
        const costInput = document.createElement("input");
        costInput.type = "text";
        costInput.classList.add("cost-input");
        costInput.placeholder = "Cost per Case";

        // Event listener for changes in the product name dropdown
        productNameDropdown.addEventListener("change", function () {
            const selectedProduct = productNameDropdown.value;

            // Fetch the cost for the selected product from the server using AJAX
            fetch(`/get-product-cost.php?product=${selectedProduct}`) // Replace with the actual server endpoint
            .then(response => response.json())
            .then(productCost => {
                // Set the cost input value based on the retrieved cost
                costInput.value = productCost;
            })
            .catch(error => {
                console.error('Error fetching product cost:', error);
            });
        });


        // Create an input for product code
        const productCodeInput = document.createElement("input");
        productCodeInput.type = "text";
        productCodeInput.classList.add("product-code-input");
        productCodeInput.placeholder = "Product Code";
        // You'll need to implement logic to set the product code based on the selected product

        // Create a dropdown for product size
        const productSizeDropdown = document.createElement("select");
        productSizeDropdown.classList.add("product-size-dropdown");

        // Add options for different sizes (case, pack, unit)
        const caseOption = document.createElement("option");
        caseOption.value = "case";
        caseOption.textContent = "Case (default)";

        const packOption = document.createElement("option");
        packOption.value = "pack";
        packOption.textContent = "Pack";

        const unitOption = document.createElement("option");
        unitOption.value = "unit";
        unitOption.textContent = "Unit";

        productSizeDropdown.appendChild(caseOption);
        productSizeDropdown.appendChild(packOption);
        productSizeDropdown.appendChild(unitOption);

        // Create an input for quantity
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.classList.add("quantity-input");
        quantityInput.placeholder = "Quantity";

        // Create an input for cost
        const costInput = document.createElement("input");
        costInput.type = "text";
        costInput.classList.add("cost-input");
        costInput.placeholder = "Cost per Case";
        // You'll need to implement logic to set the cost based on the selected product

        // Create a checkbox for delete option
        const deleteCheckbox = document.createElement("input");
        deleteCheckbox.type = "checkbox";
        deleteCheckbox.classList.add("delete-checkbox");

        // Append all elements to the product line container
        productLine.appendChild(productNameDropdown);
        productLine.appendChild(productCodeInput);
        productLine.appendChild(productSizeDropdown);
        productLine.appendChild(quantityInput);
        productLine.appendChild(costInput);
        productLine.appendChild(deleteCheckbox);

        // Append the product line container to the order lines
        orderLines.appendChild(productLine);
    }


    // Function to calculate and update the total price
    function updateTotalPrice() {
        // Calculate the total price based on product data
        let total = 0;
        for (const data of productData) {
            // Calculate line price based on quantity and product cost
            const linePrice = data.quantity * data.cost;
            total += linePrice;
        }

        // Update the total price display
        totalPriceDisplay.textContent = total;
    }

    // Function to update the balance
    function updateBalance() {
        // Fetch the user's balance from the server using AJAX
        // Subtract the total price from the balance
        // Update the balance display
        // You'll need a PHP endpoint to fetch user data and update balance
    }

    // Event listener to add a new product line
    addProductButton.addEventListener("click", createProductLine);

    // Event listener to delete selected product lines
    deleteSelectedButton.addEventListener("click", function () {
        // Identify and remove selected product lines
        // You'll need to implement this logic
        // Update productData accordingly
        // Call updateTotalPrice() and updateBalance() to recalculate
    });

    // Event listener to update total price when a product line changes
    orderLines.addEventListener("change", function (event) {
        const target = event.target;

        // Check if the change happened in a relevant element (e.g., quantity input)
        // Update the productData array accordingly
        // Call updateTotalPrice() to recalculate
    });
});