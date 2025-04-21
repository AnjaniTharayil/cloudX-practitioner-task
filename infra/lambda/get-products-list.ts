import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (_event, _context) => {
// Define an interface for product structure
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
}
const mockProducts: Product[] = [
  {
    description: "Lightweight laptop with 8GB RAM and 256GB SSD, perfect for everyday use.",
    id: "1",
    price: 600,
    title: "Dell Inspiron 15",
  },
  {
    description: "Powerful gaming laptop with 16GB RAM, 1TB SSD, and NVIDIA GTX 3060.",
    id: "2",
    price: 1200,
    title: "Asus ROG Zephyrus G15",
  },
  {
    description: "Business laptop featuring Intel i7, 16GB RAM, and a touchscreen display.",
    id: "3",
    price: 900,
    title: "HP EliteBook 850 G8",
  },
  {
    description: "Slim and portable Ultrabook with Apple M2 chip and 512GB SSD.",
    id: "4",
    price: 1300,
    title: "Apple MacBook Air M2",
  },
  {
    description: "High-performance workstation for creators with 32GB RAM and 1TB SSD.",
    id: "5",
    price: 2000,
    title: "Lenovo ThinkPad P1 Gen 4",
  },
  {
    description: "Affordable Chromebook with 4GB RAM and 64GB eMMC storage, ideal for students.",
    id: "6",
    price: 300,
    title: "Acer Chromebook Spin 311",
  },
];
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000', // Or use '*' to allow any origin
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
    body: JSON.stringify(mockProducts),
  };
};