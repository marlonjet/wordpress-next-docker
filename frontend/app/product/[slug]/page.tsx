import getProductBySlug from '@/lib/queries/getProductBySlug';
import ProductDetails from '@/components/ProductDetails';
interface producParams {
  params: {
    slug: string;
  };
}

export default async function Product({params}: producParams) {
  const product = await getProductBySlug(params?.slug);

  return (
    <>
      <ProductDetails product={product} />
    </>
  );
}
