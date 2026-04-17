import { g as getDatabase } from './mongo_BfYADjV2.mjs';

const productsCollectionName = "products";
const promotionsCollectionName = "promotions";
function getProductImageUrl(image) {
  if (!image) {
    return "";
  }
  return typeof image === "string" ? image : image.url;
}
async function getVisibleProducts() {
  const database = await getDatabase();
  const products = await database.collection(productsCollectionName).find({ visible: true }).toArray();
  return products;
}
async function getProductById(id) {
  const database = await getDatabase();
  const product = await database.collection(productsCollectionName).findOne({ _id: id, visible: true });
  return product ? product : null;
}
async function getPromotions() {
  const database = await getDatabase();
  const promotions = await database.collection(promotionsCollectionName).find({}).toArray();
  return promotions;
}

export { getProductById as a, getPromotions as b, getVisibleProducts as c, getProductImageUrl as g };
