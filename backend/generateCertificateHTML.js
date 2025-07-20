

function generateCertificateHTML(data,logoUrl) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 20px;
            color: #1f2937;
          }
          .container {
            max-width: 800px;
            margin: auto;
            background: #ffffff;
            padding: 24px;
            border: 1px solid #d1d5db;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            font-size: 14px;
            line-height: 1.6;
          }
          .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #d1d5db;
            padding-bottom: 16px;
          }
          .header-left {
            display: flex;
            gap: 12px;
          }
          .logo {
            width: 64px;
            height: 64px;
            background: #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            overflow: hidden;
          }
          .logo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .header-right {
            text-align: right;
          }
          .section {
            margin: 24px 0;
          }
          .section-title {
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 8px;
          }
          .receipt-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
          }
          .receipt-table th, .receipt-table td {
            border: 1px solid #d1d5db;
            padding: 8px 12px;
          }
          .receipt-table th {
            background: #f3f4f6;
            text-align: left;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #d1d5db;
            padding-top: 16px;
            margin-top: 24px;
          }
          .text-sm { font-size: 13px; }
          .text-xs { font-size: 12px; color: #6b7280; }
          .font-semibold { font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="header-left">
              <div class="logo">
                <img src="${logoUrl}"  alt="Logo" />
              </div>
              <div>
                <h2 class="font-semibold">Helping Hands Foundation</h2>
                <p class="text-xs">123 Charity Lane, Generosity City, 12345</p>
                <p class="text-xs">+1 234 567 890 | contact@helpinghands.org</p>
              </div>
            </div>
            <div class="header-right">
              <h2 class="font-semibold">Donation Receipt</h2>
              <p class="text-sm font-semibold">Receipt No: ${data._id}</p>
              <p class="text-xs">Date: ${data.date}</p>
            </div>
          </div>

          <!-- Acknowledgment -->
          <div class="section" style="background: #f3f4f6; padding: 12px; border-radius: 8px;">
            Received with thanks from <span class="font-semibold">Mr. ${data.name}</span>
          </div>

          <!-- Donor Details -->
          <div class="section" style="border-bottom: 1px solid #d1d5db; padding-bottom: 16px;">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <p><strong>Mobile:</strong> ${data.mobile}</p>
                <p><strong>PAN:</strong> ${data.PAN}</p>
              </div>
              <div>
                <p><strong>Address:</strong> ${data.address}</p>
              </div>
            </div>
          </div>

          <!-- Donation Table -->
          <div class="section">
            <div class="section-title">Donation Details</div>
            <table class="receipt-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align:right;">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Donation</td>
                  <td style="text-align:right;">${data.amount}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Total Amount</td>
                  <td style="text-align:right;" class="font-semibold">₹${data.amount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Payment Summary -->
          <div class="section">
            <p><strong>Amount in words:</strong> ${data.amount_in_words}</p>
            <p><strong>Payment Method:</strong> ${data.payment_method}</p>
            <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="text-sm">
              <p><strong>Organization Details</strong></p>
              <p>PAN: AABCH1234E</p>
              <p>80G Certificate: 80G/2023/12345</p>
              <p class="text-xs">
                This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961.
              </p>
            </div>
            <div style="text-align: right;">
              <div style="height: 64px; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">Signature</div>
              <p class="font-semibold">Shri Shantaram Udage</p>
              <p class="text-sm text-xs">President</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = generateCertificateHTML;
