const {
  dummy,
  totalLikes,
  blogs,
  favouriteBlog,
  favBlog2,
} = require('../utils/listhelper');

describe('blogs', () => {
  test('dummy should return 1', () => {
    expect(dummy(blogs)).toBe(1);
  });
  test('should return total likes 36', () => {
    expect(totalLikes(blogs)).toBe(36);
  });
});

describe('favourite', () => {
  const fav = [
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
  ];
  test('should return favourite blog(s)', () => {
    expect(favouriteBlog(blogs)).toEqual(fav);
  });
  test('should return favourite blog(s)', () => {
    expect(favBlog2(blogs)).toEqual(fav[0]);
  });
});
