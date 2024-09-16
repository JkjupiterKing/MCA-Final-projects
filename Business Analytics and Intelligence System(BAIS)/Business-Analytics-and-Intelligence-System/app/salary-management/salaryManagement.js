document.addEventListener('DOMContentLoaded', function() {
    // Load sidebar content
    $('#mySidenav').load('../../app/sidebar/sidebar.html');

    // Fetch employee data from local storage
    const employeeData = JSON.parse(localStorage.getItem('user'));
    const salaryData = parseFloat(employeeData.salary); // Convert salary to number

    // Check if employee data exists
    if (employeeData) {
        // Update UI with employee details
        document.querySelector('.card .row .col-md-6:nth-child(1) .mb-2:nth-child(1) span').textContent = employeeData.userId || 'N/A';
        document.querySelector('.card .row .col-md-6:nth-child(1) .mb-2:nth-child(2) span').textContent = generateRandomPF();
        document.querySelector('.card .row .col-md-6:nth-child(1) .mb-2:nth-child(3) span').textContent = employeeData.email || 'N/A';
        document.querySelector('.card .row .col-md-6:nth-child(1) .mb-2:nth-child(4) span').textContent = employeeData.roleName || 'N/A';
        document.querySelector('.card .row .col-md-6:nth-child(2) .mb-2:nth-child(1) span').textContent = employeeData.username || 'N/A';
        document.querySelector('.card .row .col-md-6:nth-child(2) .mb-2:nth-child(2) span').textContent = generateRandomModeOfPay();
        document.querySelector('.card .row .col-md-6:nth-child(2) .mb-2:nth-child(3) span').textContent = generateRandomAccountNo();

        // Calculate and update earnings
        calculateEarnings(salaryData);
    } else {
        console.error('No employee or salary data found in local storage.');
    }
});

// Function to generate random PF No.
function generateRandomPF() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
}

// Function to generate random account number
function generateRandomAccountNo() {
    return '*******' + Math.floor(Math.random() * 10000);
}

// Function to generate random mode of pay
function generateRandomModeOfPay() {
    const modes = ['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Other'];
    return modes[Math.floor(Math.random() * modes.length)];
}

// Function to calculate and update earnings
function calculateEarnings(salary) {
    if (isNaN(salary) || salary <= 0) {
        console.error('Invalid salary data');
        return;
    }

    // Define percentages or logic for different components
    const percentages = {
        basic: 0.60, // 60% of total salary
        da: 0.05,    // 5% of total salary
        hra: 0.10,   // 10% of total salary
        wa: 0.01,    // 1% of total salary
        ca: 0.00,    // 0% of total salary
        cca: 0.00,   // 0% of total salary
        ma: 0.12,    // 12% of total salary
        salesIncentive: 0.00, // 0% of total salary
        leaveEncashment: 0.00, // 0% of total salary
        holidayWages: 0.02,   // 2% of total salary
        specialAllowance: 0.01, // 1% of total salary
        bonus: 0.05,   // 5% of total salary
        individualIncentive: 0.10 // 10% of total salary
    };

    // Calculate earnings based on the percentages
    const earnings = {};
    for (const [key, percentage] of Object.entries(percentages)) {
        earnings[key] = salary * percentage;
    }

    // Define fixed deductions (you can also make these dynamic)
    const deductions = {
        pf: 0.10 * salary, // 10% of total salary
        esi: 0.01 * salary, // 1% of total salary
        tds: 0.00, // No TDS
        lop: 0.00, // No LOP
        pt: 0.00,  // No PT
        splDeduction: 0.02 * salary, // 2% of total salary
        ewf: 0.00, // No EWF
        cd: 0.00   // No CD
    };

    // Calculate total earnings and total deductions
    const totalEarnings = Object.values(earnings).reduce((sum, value) => sum + parseFloat(value), 0);
    const totalDeductions = Object.values(deductions).reduce((sum, value) => sum + parseFloat(value), 0);
    const netPay = totalEarnings - totalDeductions;

    // Calculate percentage of each deduction relative to the total earnings
    const deductionPercentages = {};
    for (const [key, value] of Object.entries(deductions)) {
        deductionPercentages[key] = ((value / totalEarnings) * 100).toFixed(2);
    }

    // Update earnings table
    const earningsTable = document.querySelector('.table tbody');
    earningsTable.innerHTML = `
        <tr>
            <th scope="row">Basic</th>
            <td>${earnings.basic.toFixed(2)}</td>
            <td>PF</td>
            <td>${deductions.pf.toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">DA</th>
            <td>${earnings.da.toFixed(2)}</td>
            <td>ESI</td>
            <td>${deductions.esi.toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">HRA</th>
            <td>${earnings.hra.toFixed(2)}</td>
            <td>TDS</td>
            <td>${deductions.tds.toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">WA</th>
            <td>${earnings.wa.toFixed(2)}</td>
            <td>LOP</td>
            <td>${deductions.lop.toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">CA</th>
            <td>${earnings.ca.toFixed(2)}</td>
            <td>PT</td>
            <td>${deductions.pt.toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">CCA</th>
            <td>${earnings.cca.toFixed(2)}</td>
            <td>SPL. Deduction</td>
            <td>${deductions.splDeduction.toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">MA</th>
            <td>${earnings.ma.toFixed(2)}</td>
            <td>EWF</td>
            <td>${deductions.ewf.toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">Sales Incentive</th>
            <td>${earnings.salesIncentive.toFixed(2)}</td>
            <td>CD</td>
            <td>${deductions.cd.toFixed(2)}</td>
        </tr>
        <tr>
            <th scope="row">Leave Encashment</th>
            <td>${earnings.leaveEncashment.toFixed(2)}</td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <th scope="row">Holiday Wages</th>
            <td>${earnings.holidayWages.toFixed(2)}</td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <th scope="row">Special Allowance</th>
            <td>${earnings.specialAllowance.toFixed(2)}</td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <th scope="row">Bonus</th>
            <td>${earnings.bonus.toFixed(2)}</td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <th scope="row">Individual Incentive</th>
            <td>${earnings.individualIncentive.toFixed(2)}</td>
            <td colspan="2"></td>
        </tr>
        <tr class="border-top">
            <th scope="row">Total Earning</th>
            <td>${totalEarnings.toFixed(2)}</td>
            <td>Total Deductions</td>
            <td>${totalDeductions.toFixed(2)}</td>
        </tr>
    `;

    // Update net pay and amount in words
    document.querySelector('.card.mt-4 .card-body .fw-bold').textContent = `Net Pay: ${netPay.toFixed(2)}`;

    // Add percentage of deductions
    const deductionsPercentage = document.querySelector('.card.mt-4 .card-body .deductions-percentage');
    deductionsPercentage.innerHTML = `
        <div><strong>Deductions Breakdown:</strong></div>
        ${Object.entries(deductionPercentages).map(([key, value]) => `<div>${key}: ${value}%</div>`).join('')}
    `;

    // Function to convert number to words
    function numberToWords(amount) {
        if (amount === 0) return 'Zero';
        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' });
        return formatter.format(amount).replace(/[^a-zA-Z\s]/g, ''); // Remove non-letter characters
    }

    document.querySelector('.card.mt-4 .card-body div:nth-child(2)').textContent = numberToWords(netPay);
}
