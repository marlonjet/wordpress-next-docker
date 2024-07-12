import getMenuBySlug from '@/lib/queries/getMenuBySlug';
import Link from 'next/link';

/**
 * Header component.
 */
export default async function Header() {
  const menu = await getMenuBySlug('header');

  return (
    <header className="w-screen max-w-full flex justify-center py-6">
      <div className="container flex justify-between">
        <div className="">
          <Link href="/">
            <h2 className="mb-0 text-xl font-bold">Next.js WordPress</h2>
          </Link>
        </div>
        <nav className="flex justify-between gap-4">
          {!!menu &&
            menu.menuItems.edges.map((item) => (
              <Link key={item.node.databaseId} href={item.node.uri}>
                {item.node.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}
