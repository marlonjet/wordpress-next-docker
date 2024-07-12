'use client';

import Image from 'next/image';
import {ProductNode} from '@/lib/types';
import Button from '@/components/Button';

interface ProductDetailsProps {
  product: ProductNode;
}

export default function ProductDetails({product}: ProductDetailsProps) {
  const handleClick = () => {
    console.log(alert('Que pasa'));
  };

  return (
    <section className="w-screen max-w-full flex justify-center py-10">
      <div className="container flex flex-row gap-12">
        <main className="w-1/2">
          <Image
            alt={product?.featuredImage?.node?.altText}
            height={product?.featuredImage?.node?.mediaDetails?.height}
            src={product?.featuredImage?.node?.sourceUrl}
            width={product?.featuredImage?.node?.mediaDetails.width}
            priority={true}
          />
        </main>
        <aside className="w-1/2">
          <div>
            <h1 className="text-3xl font-bold mb-6"> {product.name}</h1>
            <div
              className="short-description mb-4"
              dangerouslySetInnerHTML={{__html: product?.shortDescription}}
            />
            <div
              className="full-description"
              dangerouslySetInnerHTML={{__html: product?.description}}
            />
            <div className="mt-4">
              <Button label="Add to cart" onClick={handleClick} outline />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
