import getAllPosts from '@/lib/queries/getAllPosts';
import getAllProducts from '@/lib/queries/getAllProducts';
import getPageBySlug from '@/lib/queries/getPageBySlug';
import {Post} from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ProductNode} from '@/lib/types';
/**
 * The homepage route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Home() {
  // Fetch homepage from WordPress.
  const homepage = await getPageBySlug('homepage');

  // Fetch posts from WordPress.
  const posts = await getAllPosts();
  const products = await getAllProducts();

  // No data? Bail...
  if (!posts || !posts.length || !homepage || !products) {
    notFound();
  }

  return (
    <main className="">
      <div>
        <h1 dangerouslySetInnerHTML={{__html: homepage.title}} />
        <div dangerouslySetInnerHTML={{__html: homepage.content}} />
      </div>

      <section className="w-screen max-w-full flex justify-center">
        <div className="container flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
          <div className="grid grid-cols-4 gap-4">
            {products.map((product: ProductNode) => (
              <div key={product?.databaseId}>
                <div>
                  <Image
                    alt={product?.image?.altText}
                    height={product?.image?.mediaDetails?.height}
                    src={product?.image?.sourceUrl}
                    width={product?.image?.mediaDetails?.width}
                    priority={true}
                  />
                </div>
                <div>
                  <Link href={`/product/${product?.slug}`}>
                    <h3 className="text-white">{product?.name}</h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-screen max-w-full flex justify-center">
        <div className="container flex flex-col">
          <h2 className="text-white">Latest Posts</h2>
          <div className="flex flex-wrap gap-8">
            {posts.map((post: Post) => (
              <article className="w-72" key={post?.databaseId}>
                <Image
                  alt={post?.featuredImage?.node?.altText}
                  height={post?.featuredImage?.node?.mediaDetails?.height}
                  src={post?.featuredImage?.node?.sourceUrl}
                  width={post?.featuredImage?.node?.mediaDetails.width}
                  priority={true}
                />
                <Link href={`/blog/${post.slug}`}>
                  <h2 dangerouslySetInnerHTML={{__html: post?.title}} />
                </Link>
                <p className="text-sm text-gray-500">
                  {post.commentCount} Comments
                </p>
                <div dangerouslySetInnerHTML={{__html: post?.excerpt}} />
                <Link className="button" href={`/blog/${post?.slug}`}>
                  View Post
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
