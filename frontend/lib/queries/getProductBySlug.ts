import {fetchGraphQL} from '@/lib/functions';
import {ProductNode} from '@/lib/types';

/**
 * Fetch a book by slug.
 */
export default async function getProductBySlug(slug: string) {
  const query = `
    query GetProductBySlug($slug: ID!) {
      product(id: $slug, idType: SLUG) {
        id
        databaseId
        averageRating
        slug
        shortDescription
        description
        onSale
        name
        image {
          id
          uri
          title
          srcSet
          sourceUrl
        }
        featuredImage {
          node {
            altText
            databaseId
            sourceUrl
            srcSet
            title
            mediaDetails {
              width
              height
            }
          }
        }
        ... on SimpleProduct {
          salePrice
          regularPrice
          price
          id
          stockQuantity
        }
        ... on VariableProduct {
          salePrice
          regularPrice
          price
          id
        }
      }
    }
  `;

  const variables = {
    slug: slug
  };

  const response = await fetchGraphQL(query, variables);

  return response.data.product as ProductNode;
}
