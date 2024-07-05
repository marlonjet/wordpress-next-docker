export const fetchGraphQL = jest.fn(() => {
  return Promise.resolve({
    status: '',
    data: {
      posts: {
        nodes: []
      }
    }
  });
});
