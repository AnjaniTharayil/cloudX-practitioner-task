import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const getProductsListLambda = new lambda.Function(this, 'GetProductsListLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'get-products-list.handler', // Path to the handler in the Lambda code
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/')), // Folder containing the Lambda code
    });

     // Define the Lambda function for fetching a product by its ID
     const getProductByIdLambda = new lambda.Function(this, 'GetProductByIdLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'get-product-by-id.handler', // Relative path in the Lambda folder
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/')), // Folder containing Lambda code
    });

    // Define API Gateway Rest API
    const api = new apigateway.RestApi(this, 'ProductServiceApi', {
      restApiName: 'Product Service API',
      description: 'API to fetch product data.',
      defaultCorsPreflightOptions: {
        allowOrigins: ['http://localhost:3000'], // Allow requests from the React frontend
        allowHeaders: ['Content-Type'], // Allow custom headers
        allowMethods: ['OPTIONS', 'GET'], // Allow only GET and OPTIONS methods
      },
    });

   // Lambda Integration for /products
    const productsListLambdaIntegration = new apigateway.LambdaIntegration(getProductsListLambda, {
      proxy: true, // Keep proxy mode enabled for simplicity
    });

        // Lambda Integration for `/products/{productId}`
    const productByIdLambdaIntegration = new apigateway.LambdaIntegration(getProductByIdLambda, {
      proxy: true, // Route all requests directly to the Lambda function
    });


   const productsResource = api.root.addResource('products');
    productsResource.addMethod(
      'GET',
      productsListLambdaIntegration,
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": true,
            },
          },
        ],
      }
    );

    // Create resource `/products/{productId}`
    const productByIdResource = productsResource.addResource('{productId}');
    productByIdResource.addMethod(
      'GET',
      productByIdLambdaIntegration,
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": true,
            },
          },
          {
            statusCode: "404",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": true,
            },
          },
        ],
      }
    );
  }
}
