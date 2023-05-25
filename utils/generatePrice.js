function generatePrice() {
  const baseValue = 6000;
  const range = 500;
  const randomNumber = Math.floor(Math.random() * (range * 2 + 1)) - range;
  //the randomNumber will be between -500 to 500
  // 6000 was chosen as base price considering current gold price in India
  return baseValue + randomNumber;
}

export default generatePrice;