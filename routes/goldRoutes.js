import { Router } from 'express';
import { generateRandomPrice, updateItemPrice, getGoldItemPrices } from '../controllers/goldController.js';

export const router = Router();

router.get('/mock-price', generateRandomPrice);
router.put('/update-item-price/:itemId', updateItemPrice);
router.get('/item-prices', getGoldItemPrices);
