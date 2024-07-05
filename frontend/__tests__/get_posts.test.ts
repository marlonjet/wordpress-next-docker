import {fetchGraphQL} from '@/lib/functions';
import getAllPosts from '@/lib/queries/getAllPosts';

jest.mock('@/lib/http-request');
jest.mock('@/lib/functions');

it('Get Posts', async () => {
  //arrange
  const mockData = [
    {
      commentCount: 1,
      databaseId: 1,
      date: '2024-07-04T12:54:31',
      modified: '2024-07-04T17:14:55',
      title: 'Hello world!',
      slug: 'hello-world',
      excerpt:
        '<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n',
      featuredImage: {},
      seo: {metaDesc: '', title: 'Hello world! - Woo Next'}
    }
  ];

  const resolvedValue = {
    status: 'MOCK',
    data: {posts: {nodes: mockData}}
  };

  (fetchGraphQL as jest.Mock).mockResolvedValue(resolvedValue);
  //act
  const posts = await getAllPosts();

  //assert

  expect(posts).toEqual(mockData);
});
