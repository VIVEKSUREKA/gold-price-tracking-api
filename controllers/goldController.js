import GoldItem from '../models/GoldItem.js';
import generatePrice from '../utils/generatePrice.js';
import axios from 'axios';

export async function generateRandomPrice(req, res) {
  try {
    const goldPrice = generatePrice(); // generatePrice function gives random number between 5500 to 6500
    res.json({ price: goldPrice });
  } catch (error) {
    console.error('Failed to generate random gold price', error);
    res.status(500).json({ success: false, message: 'Failed to generate random gold price.' });
  }
}

export async function updateItemPrice(req, res) {
  const { itemId } = req.params; //itemId paramter value extracted from req.params

  try {
    const item = await GoldItem.findOne({ customId: itemId });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }

    const grams = item.grams;

    const goldPriceResponse = await axios.get('http://localhost:5000/gold/mock-price');
    const goldPrice = goldPriceResponse.data.price;
    const updatedPrice = goldPrice * grams;

    // await GoldItem.updateOne(
    //   { customId: itemId },
    //   {
    //     $set: { price: updatedPrice },
    //     $push: { priceHistory: { price: updatedPrice, timestamp: new Date() } }
    //   }
    // );
    // commented out updateOne since it doesn't trigger mongoose middleware pre()
    // so pre-save hook was getting bypassed. If save() function is too slow due to large document size, updateOne can be used
    
    item.price = updatedPrice; // price updated manually
    await item.save();

    res.json({ success: true, message: 'Gold item price updated successfully.' });
  } catch (error) {
    console.error('Failed to update gold item price', error);
    res.status(500).json({ success: false, message: 'Failed to update gold item price.' });
  }
}

export async function getGoldItemPrices(req, res) {
  const { itemId, timeRange } = req.query;
  const timeRangeInDays = parseInt(timeRange) || 30; //uses defalt value as 30 if timeRange not received or not valid

  try {
    let query = {};

    if (itemId) {
      query.customId = itemId;
    }

    const items = await GoldItem.find(query);
    if (!items || items.length === 0) {
      return res.status(404).json({ success: false, message: 'No gold items found.' });
    }

    const currentPrices = items.map((item) => ({
      itemId: item.customId,
      price: item.price,
    }));

    const fromDate = new Date(Date.now() - timeRangeInDays * 24 * 60 * 60 * 1000); 

    const bestPrices = await Promise.all(
      items.map(async (item) => {
        // Aggregate query to find the minimum price entry within the specified time range
        const minPriceEntry = await GoldItem.aggregate([
          {
            $match: { 
              _id: item._id,
              'priceHistory.timestamp': {
                $gte: fromDate,
                $lte: new Date(),
              },
            },
          },
          {
            $project: {
              customId: 1,
              bestPrice: {
                $min: 
                {
                  $filter: {
                    input: '$priceHistory',
                    as: 'entry',
                    cond: {
                      $and: [
                        { $gte: ['$$entry.timestamp', fromDate] },
                        { $lte: ['$$entry.timestamp', new Date()] },
                      ],
                    },
                  },
                },
              },
            },
          },
        ]);

        return {
          itemId: item.customId,
          bestPrice: minPriceEntry[0]?.bestPrice?.price, // Use optional chaining operator to handle undefined values
        };
      })
    );

    res.json({ currentPrices, bestPrices });
  } catch (error) {
    console.error('Failed to retrieve gold item prices', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve gold item prices.' });
  }
}