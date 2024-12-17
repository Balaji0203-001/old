document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    const addBillButton = document.getElementById('addBillButton');
    const viewBillsButton = document.getElementById('viewBills');
    const searchBillsButton = document.getElementById('searchBills');
    const addSupplierButton = document.getElementById('addSupplier');
    const showTotalsButton = document.getElementById('showTotals');
    const viewSuppliersButton = document.getElementById('viewSuppliers');
    const billSection = document.getElementById('billSection');
    const totalsSection = document.getElementById('totalsSection');
    const searchSection = document.getElementById('searchSection');
    const supplierSection = document.getElementById('supplierSection');
    const addBillSection = document.getElementById('addBillSection');
    const addSupplierSection = document.getElementById('addSupplierSection');
    const billsTableBody = document.getElementById('billsTableBody');
    const suppliersTableBody = document.getElementById('suppliersTableBody');
    const totalAmount = document.getElementById('totalAmount');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const addBillForm = document.getElementById('addBillForm');
    const addSupplierForm = document.getElementById('addSupplierForm');
    const itemsSection = document.getElementById('itemsSection');

    let bills = JSON.parse(localStorage.getItem('bills')) || [];
    let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];

    const renderBills = () => {
        billsTableBody.innerHTML = '';
        bills.forEach((bill, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${bill.shopName}</td>
                <td>${bill.amount}</td>
                <td>${bill.date}</td>
                <td><button class="deleteBillButton" data-index="${index}">Delete</button></td>
            `;
            billsTableBody.appendChild(row);
        });

        // Delete Bill button
        document.querySelectorAll('.deleteBillButton').forEach(button => {
            button.addEventListener('click', (e) => {
                const billIndex = e.target.getAttribute('data-index');
                bills.splice(billIndex, 1);
                localStorage.setItem('bills', JSON.stringify(bills));
                renderBills();
            });
        });
    };

    const renderSuppliers = () => {
        suppliersTableBody.innerHTML = '';
        suppliers.forEach((supplier, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${supplier.supplierName}</td>
                <td>${supplier.supplierContact}</td>
                <td>${supplier.supplierShop}</td>
                <td><button class="deleteSupplierButton" data-index="${index}">Delete</button></td>
            `;
            suppliersTableBody.appendChild(row);
        });

        // Delete Supplier button
        document.querySelectorAll('.deleteSupplierButton').forEach(button => {
            button.addEventListener('click', (e) => {
                const supplierIndex = e.target.getAttribute('data-index');
                suppliers.splice(supplierIndex, 1);
                localStorage.setItem('suppliers', JSON.stringify(suppliers));
                renderSuppliers();
            });
        });
    };

    const calculateTotal = () => {
        const total = bills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
        totalAmount.textContent = `Total Amount: $${total.toFixed(2)}`;
    };

    const searchBills = (query) => {
        searchResults.innerHTML = '';
        const filteredBills = bills.filter(bill => bill.shopName.toLowerCase().includes(query.toLowerCase()));
        filteredBills.forEach((bill, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${bill.shopName}</td>
                <td>${bill.amount}</td>
                <td>${bill.date}</td>
            `;
            searchResults.appendChild(row);
        });
    };

    // Handle navigation
    logoutButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    addBillButton.addEventListener('click', () => {
        billSection.style.display = 'none';
        totalsSection.style.display = 'none';
        searchSection.style.display = 'none';
        supplierSection.style.display = 'none';
        addBillSection.style.display = 'block';
        addSupplierSection.style.display = 'none';
    });

    viewBillsButton.addEventListener('click', () => {
        billSection.style.display = 'block';
        totalsSection.style.display = 'none';
        searchSection.style.display = 'none';
        supplierSection.style.display = 'none';
        addBillSection.style.display = 'none';
        addSupplierSection.style.display = 'none';
    });

    viewSuppliersButton.addEventListener('click', () => {
        billSection.style.display = 'none';
        totalsSection.style.display = 'none';
        searchSection.style.display = 'none';
        supplierSection.style.display = 'block';
        addBillSection.style.display = 'none';
        addSupplierSection.style.display = 'none';
    });

    showTotalsButton.addEventListener('click', () => {
        calculateTotal();
        billSection.style.display = 'none';
        totalsSection.style.display = 'block';
        searchSection.style.display = 'none';
        supplierSection.style.display = 'none';
        addBillSection.style.display = 'none';
        addSupplierSection.style.display = 'none';
    });

    searchBillsButton.addEventListener('click', () => {
        billSection.style.display = 'none';
        totalsSection.style.display = 'none';
        searchSection.style.display = 'block';
        supplierSection.style.display = 'none';
        addBillSection.style.display = 'none';
        addSupplierSection.style.display = 'none';
    });

    addSupplierButton.addEventListener('click', () => {
        billSection.style.display = 'none';
        totalsSection.style.display = 'none';
        searchSection.style.display = 'none';
        supplierSection.style.display = 'none';
        addBillSection.style.display = 'none';
        addSupplierSection.style.display = 'block';
    });

     // Add More Items Button
     document.getElementById('addMoreItemsButton').addEventListener('click', () => {
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
            <input type="text" placeholder="Item Name" class="itemName" required>
            <input type="number" placeholder="Quantity" class="itemQuantity" required>
            <input type="number" placeholder="Price per Item" class="itemPrice" required>
        `;
        itemsSection.appendChild(newItem);
    });

    // Add Bill Form Submission
    addBillForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const shopName = e.target.shopName.value;
        const amount = e.target.amount.value;
        const paidBy = e.target.paidBy.value;
        const returnPaidBy = e.target.returnPaidBy.value;
        const billDate = e.target.billDate.value;
        const items = [];
        const itemNames = document.querySelectorAll('.itemName');
        const itemQuantities = document.querySelectorAll('.itemQuantity');
        const itemPrices = document.querySelectorAll('.itemPrice');
        for (let i = 0; i < itemNames.length; i++) {
            items.push({
                itemName: itemNames[i].value,
                quantity: itemQuantities[i].value,
                price: itemPrices[i].value,
            });
        }

        const bill = {
            shopName,
            amount,
            paidBy,
            returnPaidBy,
            date: billDate,
            items,
        };

        bills.push(bill);
        localStorage.setItem('bills', JSON.stringify(bills));
        renderBills();
        e.target.reset();
        viewBillsButton.click();
    });

    // Add Supplier Form Submission
    addSupplierForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const supplierName = e.target.supplierName.value;
        const supplierContact = e.target.supplierContact.value;
        const supplierShop = e.target.supplierShop.value;
        const supplierAddress = e.target.supplierAddress.value;

        const supplier = {
            supplierName,
            supplierContact,
            supplierShop,
            supplierAddress,
        };

        suppliers.push(supplier);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        renderSuppliers();
        e.target.reset();
        viewSuppliersButton.click();
    });

    renderBills();
    renderSuppliers();
});
