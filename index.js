import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './db.js';
import { router as goldRoutes } from './routes/goldRoutes.js';
import cron from 'node-cron';
import updateEveryItemPrice from './controllers/updateEveryItemPrice.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connect();

//Following code was used to create sample documents for the db

// async function temp() {
//   await connect();
  
//   const newGoldItem = new GoldItem({
//       customId: "necklace01",
//       price: 1000000,
//       grams: 23
//     });

//     await newGoldItem.save();

//     console.log('Document inserted successfully');
// }

// temp();

app.use('/gold', goldRoutes);

// Schedule the script to run daily at 12:00 AM
cron.schedule('0 0 * * *', updateEveryItemPrice);

//cron.schedule('*/5 * * * *', updateEveryItemPrice); //for testing 

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});