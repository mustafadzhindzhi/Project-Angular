const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');

router.post('/', authController.saveMessage);
router.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;
  
    try {
      await sendEmail(to, subject, message);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    }
  });

module.exports = router