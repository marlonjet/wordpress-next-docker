import {fetchGraphQL} from '@/lib/functions';
import getAllProducts from '@/lib/queries/getAllProducts';

jest.mock('@/lib/http-request');
jest.mock('@/lib/functions');

it('Get Products', async () => {
  //arrange
  const mockData = [
    {
      databaseId: 35,
      name: 'WordPress Pennant',
      onSale: false,
      slug: 'wordpress-pennant',
      image: {
        sourceUrl:
          'http://localhost:8020/wp-content/uploads/2024/07/pennant-1.jpg',
        mediaDetails: {
          height: 800,
          width: 800
        }
      }
    }
  ];

  const resolvedValue = {
    status: 'MOCK',
    data: {products: {nodes: mockData}}
  };

  (fetchGraphQL as jest.Mock).mockResolvedValue(resolvedValue);
  //act
  const posts = await getAllProducts();

  //assert

  expect(posts).toEqual(mockData);
});
