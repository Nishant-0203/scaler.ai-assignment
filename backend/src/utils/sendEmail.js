const nodemailer = require('nodemailer');

const sendOrderConfirmationEmail = async (orderId, shippingEmail, originalOrderDetails) => {
  try {
    let transporter;

    // Use SMTP options from env if available
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      console.log('No SMTP credentials found. Creating an Ethereal test account...');
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    }

    const itemsHtml = originalOrderDetails.orderItems
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${item.price}</td>
        </tr>
      `
      )
      .join('');

    const mailOptions = {
      from: process.env.SMTP_FROM || '"Amazon Clone Support" <no-reply@amazonclone.com>',
      to: shippingEmail,
      subject: `Order Confirmation - ${originalOrderDetails.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your order!</h2>
          <p>Hi ${originalOrderDetails.shippingName},</p>
          <p>We've received your order <strong>${originalOrderDetails.orderNumber}</strong> and are getting it ready to ship.</p>
          
          <h3>Order Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f8f8f8;">
                <th style="padding: 10px; text-align: left;">Item</th>
                <th style="padding: 10px; text-align: left;">Qty</th>
                <th style="padding: 10px; text-align: left;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Subtotal:</td>
                <td style="padding: 10px; font-weight: bold;">₹${originalOrderDetails.subtotal}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Shipping:</td>
                <td style="padding: 10px; font-weight: bold;">₹${originalOrderDetails.shipping}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold; font-size: 1.2em;">Total:</td>
                <td style="padding: 10px; font-weight: bold; font-size: 1.2em;">₹${originalOrderDetails.total}</td>
              </tr>
            </tfoot>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #f8f8f8; border-radius: 5px;">
            <h3>Shipping Address</h3>
            <p style="margin: 0;">${originalOrderDetails.shippingAddress}</p>
            <p style="margin: 0;">${originalOrderDetails.shippingCity}, ${originalOrderDetails.shippingState} ${originalOrderDetails.shippingZip}</p>
            <p style="margin: 0;">${originalOrderDetails.shippingCountry}</p>
          </div>
          
          <p style="margin-top: 30px; font-size: 0.9em; color: #777;">
            If you have any questions, reply to this email or contact us at support@amazonclone.com
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    
    // Preview URL for testing
    if (!process.env.SMTP_HOST || process.env.SMTP_HOST === 'smtp.ethereal.email') {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendOrderConfirmationEmail,
};