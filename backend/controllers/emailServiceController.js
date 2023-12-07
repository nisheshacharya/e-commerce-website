const { sendEmail } = require("../email/emailService");

exports.sendEmailController = async (req, res) => {
  try {
    const { to } = req.body;
    const result = await sendEmail(to);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in sendEmailController:", error);
    res.status(500).json(error);
  }
};
