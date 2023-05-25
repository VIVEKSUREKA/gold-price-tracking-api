import GoldItem from '../models/GoldItem.js';
import axios from 'axios';

async function updateEveryItemPrice() {
 console.log('updateEveryItemPrice function called');
  try {
    // Call the Mock Gold Price API to get the current gold price
    const goldPriceResponse = await axios.get('http://localhost:5000/gold/mock-price');
    const goldPrice = goldPriceResponse.data.price;

    // Update the price of each gold item in the MongoDB database with the new gold price
    const items = await GoldItem.find();

    for (const item of items) {
      const grams = item.grams;
      const updatedPrice = goldPrice * grams;

      item.price = updatedPrice; //price is updated manually
      await item.save();
    }

    console.log('Gold item prices updated successfully.');
  } catch (error) {
    console.error('Failed to update gold item prices', error);
  }
}

export default updateEveryItemPrice;