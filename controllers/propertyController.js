const Property = require('../models/propertyModel');
const { Op } = require('sequelize');

// GET all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json({ success: true, properties });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch properties',
      details: error.message,
    });
  }
};

// GET property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }
    res.status(200).json({ success: true, property });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching property", error: error.message });
  }
};

// POST create new property (with Multer image upload)
const createProperty = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    const {
      title, price, city, description, type, size, area,
      bedroom, bathroom, garage, year, address, zip_code,
      city_area, state, country
    } = req.body;

    const image = req.file?.filename;

    // Validate required fields
    if (!title || !image) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    const newProperty = await Property.create({
      title,
      price,
      city,
      description,
      type,
      image,
      size,
      area,
      bedroom,
      bathroom,
      garage,
      year,
      address,
      zip_code,
      city_area,
      state,
      country
    });

    res.status(201).json({ message: 'Property created successfully', id: newProperty.id });
  } catch (error) {
    console.error("Create property error:", error);
    res.status(500).json({ error: 'Failed to create property', details: error.message });
  }
};

// PUT update existing property (with Multer image upload if provided)
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    const image = req.file?.filename;
    if (image) {
      req.body.image = image;
    }

    await property.update(req.body);

    res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
    console.error("Update property error:", error);
    res.status(500).json({ error: 'Failed to update property', details: error.message });
  }
};

// DELETE property
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await property.destroy();
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete property', details: error.message });
  }
};

// GET search properties (title, city, or description)

// controllers/propertyController.js
const searchProperties = async (req, res) => {
  try {
    const {
      location = "",
      type = "",
      priceRange = "",
      bedroom = ""
    } = req.query;

    const whereClause = {};

    // Location filter (city, state, or address)
    if (location) {
      whereClause[Op.or] = [
        { city: { [Op.like]: `%${location}%` } },
        { state: { [Op.like]: `%${location}%` } },
        { address: { [Op.like]: `%${location}%` } }
      ];
    }

    // Type filter
    let dbType = null;
if (type) {
  if (type.toLowerCase() === "rent") dbType = "For Rent";
  else if (type.toLowerCase() === "sale") dbType = "For Sale";
  else dbType = type; // fallback in case exact match sent
}

if (dbType) {
  whereClause.type = dbType;
}

  if (bedroom) {
  if (bedroom === "4+") {
    whereClause.bedroom = { [Op.gte]: 4 };
  } else if (bedroom === "3+") {
    whereClause.bedroom = { [Op.gte]: 3 };
  } else {
    whereClause.bedroom = Number(bedroom);
  }
}
    // Price range filter
    if (priceRange) {
      if (priceRange === "5000000+") {
        whereClause.price = { [Op.gte]: 5000000 };
      } else {
        const [min, max] = priceRange.split("-");
        whereClause.price = {
          ...(min && { [Op.gte]: Number(min) }),
          ...(max && { [Op.lte]: Number(max) })
        };
      }
    }

    const properties = await Property.findAll({ where: whereClause });

    return res.json({ success: true, properties });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties
};
