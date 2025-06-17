const Property = require('../models/propertyModel');
const { Op } = require('sequelize');

// GET all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties', details: error.message });
  }
};

// GET property by ID
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get property', details: error.message });
  }
};

// POST create new property (with Multer image upload)
const createProperty = async (req, res) => {
  try {
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

    res.status(201).json({ message: 'Property created successfully', property: newProperty });
  } catch (error) {
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

    const image = req.file?.filename;
    if (image) {
      req.body.image = image;
    }

    await property.update(req.body);

    res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
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
const searchProperties = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const properties = await Property.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { city: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } }
        ]
      }
    });

    if (properties.length === 0) {
      return res.status(404).json({ message: 'No matching properties found' });
    }

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Search failed', details: error.message });
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
