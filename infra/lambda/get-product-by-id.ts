import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

// Define an interface for product structure
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
}

// Mock product data
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

// Lambda Handler Function
export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Log incoming event for debugging
    console.log("Event received:", event);

    // Extract productId from path parameters
    const productId: string | undefined = event.pathParameters?.productId;
    console.log("Product ID received:", productId);

    if (!productId) {
      // Return 400 (Bad Request) if productId is missing
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing productId in path parameters" }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    // Search for the product in the mock data array
    console.log("Available products:", mockProducts);
    const product = mockProducts.find((p) => p.id === productId);

    if (!product) {
      // Log for debugging when product is not found
      console.log(`Product with ID ${productId} not found`);

      // Return 404 (Not Found)
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `Product with ID ${productId} not found` }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    // Product found, return the product details
    console.log(`Product with ID ${productId} found:`, product);

    return {
      statusCode: 200,
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error("Error occurred:", error);

    // Return 500 (Internal Server Error) for unexpected failures
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An unexpected error occurred" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};