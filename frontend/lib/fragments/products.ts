export const SIMPLE_PRODUCT_FIELDS = `
  fragment SimpleProductFields on SimpleProduct {
    databaseId
    price
    regularPrice
    salePrice
  }
`;

export const VARIABLE_PRODUCT_FIELDS = `
  fragment VariableProductFields on VariableProduct {
      databaseId
      price
      regularPrice
      salePrice
      variations {
      nodes {
        price
        regularPrice
        salePrice
      }
      }
  }
`;
