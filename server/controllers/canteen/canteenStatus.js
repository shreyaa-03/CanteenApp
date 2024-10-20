// controllers/canteenController.js

const CanteenModel = require('../../models/canteenModel');

const getCanteenStatus = async (req, res) => {
    try {
      const canteenName = req.query.canteenName; // Assuming canteen name is passed as a query parameter
      const canteen = await CanteenModel.findOne({ name: canteenName }); // Find canteen by name
  
      if (!canteen) {
        return res.status(404).json({ message: "Canteen not found." });
      }
  
      res.status(200).json({ isOnline: canteen.isOnline });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch canteen status." });
    }
  };
  

// Update canteen status
const updateCanteenStatus = async (req, res) => {
  const { isOnline,canteenId } = req.body;

  try {
      await CanteenModel.findByIdAndUpdate(canteenId, { isOnline });

    res.status(200).json({ message: "Canteen status updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update canteen status." });
  }
};

module.exports = {
  getCanteenStatus,
  updateCanteenStatus,
};
