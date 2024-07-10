import {fetchGraphQL} from '@/lib/functions';
import {Products} from '@/lib/types';

import {
  SIMPLE_PRODUCT_FIELDS,
  VARIABLE_PRODUCT_FIELDS
} from '../fragments/products';
/**
 * Fetch All Woocommerce Products.
 */
export default async function getAllPosts() {
  const query = `
    query GetAllProducts {
      products(first: 50) {
        nodes {
            databaseId
            name
            onSale
            slug
            image {
              sourceUrl
              altText
              mediaDetails {
                height
                width
              }
            }
            ... on SimpleProduct {
              ...SimpleProductFields
            }
            ... on VariableProduct {
              ...VariableProductFields
            }
        }
      }
    }
  ${SIMPLE_PRODUCT_FIELDS}
  ${VARIABLE_PRODUCT_FIELDS}
  `;

  const response = await fetchGraphQL(query);

  return response?.data?.products?.nodes as Products;
}

/**
 * Fetch first 200 Woocommerce products from GraphQL
 */
