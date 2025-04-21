const nodemailer = require("nodemailer");

// Create a transporter object using the default SMTP transport with Gmail service
const transporter = nodemailer.createTransport({
	// service: 'gmail',
	host: "smtp.gmail.com",

	auth: {
		user: process.env.user, // Your Gmail address from environment variables
		pass: process.env.pass, // Your Gmail password from environment variables
	},
});

/**
 * Function to send an email with an OTP
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject of the email
 * @param {string} text - Text content of the email
 * @returns {Promise} - Promise representing the result of the email send operation
 */
const sendMailForOTP = async (to, subject, text, html = "") => {
	const mailOptions = {
		from: "themarketingteam@summitstrike.com", // Sender address
		// from: process.env.user, // Sender address

		to, // Recipient address
		subject, // Subject line
		text, // Plain text body
		html, // HTML body
	};

	// Log mail options for debugging purposes
	try {
		// Send mail using the transporter object
		const info = await transporter.sendMail(mailOptions);
		return info; // Return the result of the send operation
	} catch (error) {
		// Throw error if sending fails
		// biome-ignore lint/complexity/noUselessCatch: <explanation>
		throw error;
	}
};

module.exports = { sendMailForOTP };