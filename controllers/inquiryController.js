const Inquiry = require('../models/inquiryModel');
const Property = require('../models/propertyModel');

// POST /api/inquiries
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, propertyId } = req.body;

    const newInquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
      propertyId,
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: newInquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// GET all inquiries

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({
      include: [{ model: Property, as: 'property' }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching inquiries', error: error.message });
  }
};


// GET inquiry by ID
exports.getInquiryById = async (req, res) => {
  const { id } = req.params;

  try {
    const inquiry = await Inquiry.findByPk(id, {
      include: [
        {
          model: Property,
          as: 'property',
          attributes: ['id', 'title', 'price', 'city']
        }
      ]
    });

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry fetched successfully',
      data: inquiry
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching inquiry',
      error: error.message
    });
  }
};

