import {fetchGraphQL} from '@/lib/functions';
import getAllPages from '@/lib/queries/getAllPages';

jest.mock('@/lib/http-request');
jest.mock('@/lib/functions');

it('Get Posts', async () => {
  //arrange
  const mockData = [
    {
      content: null,
      databaseId: 60,
      date: '2024-07-04T15:45:05',
      modified: '2024-07-04T17:14:31',
      excerpt: '',
      slug: 'homepage',
      featuredImage: null,
      seo: {metaDesc: '', title: 'Homepage - Woo Next'}
    }
  ];

  const resolvedValue = {
    status: 'MOCK',
    data: {pages: {nodes: mockData}}
  };

  (fetchGraphQL as jest.Mock).mockResolvedValue(resolvedValue);
  //act
  const pages = await getAllPages();

  //assert
  expect(pages).toEqual(mockData);
});
