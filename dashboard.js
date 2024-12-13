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
    const billsTableBody = document.getElementById('billsTableBody');
    const totalAmount = document.getElementById('totalAmount');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const supplierSection = document.getElementById('supplierSection');
    const suppliersTableBody = document.getElementById('suppliersTableBody');
    const supplierListSection = document.getElementById('supplierListSection');
    const supplierForm = document.getElementById('supplierForm');
    const billFormSection = document.getElementById('billFormSection');
    const billForm = document.getElementById('billForm');

    // Load bills and suppliers from localStorage
    let bills = JSON.parse(localStorage.getItem('bills')) || [];
    let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];

    const renderBills = () => {
        billsTableBody.innerHTML = '';
        bills.forEach((bill, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bill.billID}</td>
                <td>${bill.shopName}</td>
                <td>${bill.amount}</td>
                <td>${bill.date}</td>
                <td><img src="${bill.image}" alt="Bill Image" width="50"></td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            billsTableBody.appendChild(row);
        });
    };

    const renderSuppliers = () => {
        suppliersTableBody.innerHTML = '';
        suppliers.forEach((supplier, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${supplier.name}</td>
                <td>${supplier.contact}</td>
                <td>${supplier.address}</td>
                <td>${supplier.email}</td>
                <td><button class="delete-supplier-btn" data-index="${index}">Delete</button></td>
            `;
            suppliersTableBody.appendChild(row);
        });
    };

    const calculateTotal = () => {
        const total = bills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
        totalAmount.textContent = `Total Amount: $${total.toFixed(2)}`;
    };

    const searchBills = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBills = bills.filter(bill => bill.shopName.toLowerCase().includes(searchTerm));
        searchResults.innerHTML = '';
        filteredBills.forEach((bill, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bill.billID}</td>
                <td>${bill.shopName}</td>
                <td>${bill.amount}</td>
                <td>${bill.date}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            searchResults.appendChild(row);
        });
    };

    const deleteBill = (index) => {
        bills.splice(index, 1);
        localStorage.setItem('bills', JSON.stringify(bills));
        renderBills();
    };

    const deleteSupplier = (index) => {
        suppliers.splice(index, 1);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        renderSuppliers();
    };

    // Logout - redirect to signup page
    logoutButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Show Bills section
    viewBillsButton.addEventListener('click', () => {
        billSection.style.display = 'block';
        totalsSection.style.display = 'none';
        searchSection.style.display = 'none';
        supplierSection.style.display = 'none';
        supplierListSection.style.display = 'none';
        billFormSection.style.display = 'none';
        renderBills();
    });

    // Show Search Bills section
    searchBillsButton.addEventListener('click', () => {
        billSection.style.display = 'none';
        totalsSection.style.display = 'none';
        searchSection.style.display = 'block';
        supplierSection.style.display = 'none';
        supplierListSection.style.display = 'none';
        billFormSection.style.display = 'none';
    });

    // Show Totals section
    showTotalsButton.addEventListener('click', () => {
        billSection.style.display = 'none';
        totalsSection.style.display = 'block';
        searchSection.style.display = 'none';
        supplierSection.style.display = 'none';
        supplierListSection.style.display = 'none';
        billFormSection.style.display = 'none';
        calculateTotal();
    });

    // Show Add Supplier form
    addSupplierButton.addEventListener('click', () => {
        billSection.style.display = 'none';
        totalsSection.style.display = 'none';
        searchSection.style.display = 'none';
        supplierSection.style.display = 'block';
        supplierListSection.style.display = 'none';
        billFormSection.style.display = 'none';
    });

    // Show View Suppliers section
    viewSuppliersButton.addEventListener('click', () => {
        billSection.style.display = 'none';
        totalsSection.style.display = 'none';
        searchSection.style.display = 'none';
        supplierSection.style.display = 'none';
        supplierListSection.style.display = 'block';
        billFormSection.style.display = 'none';
        renderSuppliers();
    });

    // Show Add Bill form
    addBillButton.addEventListener('click', () => {
        billSection.style.display = 'none';
        totalsSection.style.display = 'none';
        searchSection.style.display = 'none';
        supplierSection.style.display = 'none';
        supplierListSection.style.display = 'none';
        billFormSection.style.display = 'block';
    });

    // Submit Supplier Form
    supplierForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(supplierForm);
        const supplierData = {
            name: formData.get('supplierName'),
            contact: formData.get('supplierContact'),
            address: formData.get('supplierAddress'),
            email: formData.get('supplierEmail')
        };
        suppliers.push(supplierData);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        alert(`Supplier added: ${supplierData.name}`);
        supplierForm.reset();
        supplierSection.style.display = 'none';
    });

    // Submit Bill Form
    billForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get form values
        const billID = document.getElementById('billID').value;
        const shopName = document.getElementById('shopName').value;
        const amount = document.getElementById('amount').value;
        const billDate = document.getElementById('billDate').value;
        const billImageFile = document.getElementById('billImage').files[0];
        
        const reader = new FileReader();
        reader.onload = () => {
            const billImage = reader.result;
            const newBill = { billID, shopName, amount, date: billDate, image: billImage };
            bills.push(newBill);
            localStorage.setItem('bills', JSON.stringify(bills));
            billSection.style.display = 'block';
            totalsSection.style.display = 'none';
            searchSection.style.display = 'none';
            supplierSection.style.display = 'none';
            supplierListSection.style.display = 'none';
            billFormSection.style.display = 'none';
            renderBills();
        };
        reader.readAsDataURL(billImageFile);
    });

    // Initial view
    renderBills();

    // Search bills on input change
    searchInput.addEventListener('input', searchBills);

    // Delete bill event delegation
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            deleteBill(index);
        }
        if (event.target.classList.contains('delete-supplier-btn')) {
            const index = event.target.getAttribute('data-index');
            deleteSupplier(index);
        }
    });

    
});
