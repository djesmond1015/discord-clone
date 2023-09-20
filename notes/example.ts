const pageContent = {
  id: 'Page 1',
  text: 'Hello World!',
  author: {
    id: 110,
    name: 'Desmond',
  },
};

const oldData = {
  someOtherProperty: '...',
  pages: [
    {
      pageId: 1,
      pageTitle: 'Page 1',
      items: [
        {
          id: 'item1',
          text: 'Original Message 1',
          author: {
            id: 'author1',
            name: 'Author 1',
          },
        },
        {
          id: 'item2',
          text: 'Original Message 2',
          author: {
            id: 'author2',
            name: 'Author 2',
          },
        },
      ],
    },
    {
      pageId: 2,
      pageTitle: 'Page 2',
      items: [
        {
          id: 'item3',
          text: 'Original Message 3',
          author: {
            id: 'author3',
            name: 'Author 3',
          },
        },
      ],
    },
  ],
};

const message = {
  id: 'item2',
  text: 'Updated Message 2',
  author: {
    id: 'author2',
    name: 'Author 2',
  },
};

// Assuming the updateKey event was triggered for message with id 'item2'
// The code would generate the newData object:

const newData = {
  someOtherProperty: '...', // Preserved from oldData
  pages: [
    {
      pageId: 1,
      pageTitle: 'Page 1',
      items: [
        {
          id: 'item1',
          text: 'Original Message 1',
          author: {
            id: 'author1',
            name: 'Author 1',
          },
        },
        {
          id: 'item2',
          text: 'Updated Message 2', // Updated message
          author: {
            id: 'author2',
            name: 'Author 2',
          },
        },
      ],
    },
    {
      pageId: 2,
      pageTitle: 'Page 2',
      items: [
        {
          id: 'item3',
          text: 'Original Message 3',
          author: {
            id: 'author3',
            name: 'Author 3',
          },
        },
      ],
    },
  ],
};
