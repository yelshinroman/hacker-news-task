const NEWS_DOMAIN = 'https://hacker-news.firebaseio.com/v0/item/';
const NEW_STORIES_DOMAIN =
  'https://hacker-news.firebaseio.com/v0/newstories.json';

export async function getAllNewStories() {
  const response = await fetch(
    `${NEW_STORIES_DOMAIN}?print=pretty&orderBy="$key"&limitToFirst=100`
  );

  if (!response.ok) {
    throw new Error('Fetching news data failed!');
  }
  const data = await response.json();

  const newsList = await Promise.all(
    data.map(async id => {
      const storyResponse = await fetch(`${NEWS_DOMAIN}${id}.json`);
      if (!storyResponse.ok) {
        throw new Error('Fetching news data failed!');
      }
      const storyData = await storyResponse.json();
      if (!storyData) {
        throw new Error('Oops, some story has been hidden from us!');
      }
      return storyData;
    })
  );
  return newsList;
}

export async function getSingleStory(id) {
  const response = await fetch(`${NEWS_DOMAIN}${id}.json`);
  if (!response.ok) {
    throw new Error('Fetching story data failed!');
  }
  const data = await response.json();
  if (!data) {
    throw new Error('Cannot find story!');
  }
  if (!data.kids) {
    return data;
  }

  const commentResponse = await data.kids;

  let commentsList = await Promise.all(
    commentResponse.map(async kid => {
      const response = await fetch(`${NEWS_DOMAIN}${kid}.json`);
      if (!response.ok) {
        throw new Error('Fetching comments data failed!');
      }
      const data = await response.json();
      return data;
    })
  );
  commentsList = commentsList.filter(
    comment => !comment.hasOwnProperty('deleted')
  );
  data['comments'] = commentsList;
  return data;
}

export async function getAllKidsComments(id) {
  const response = await fetch(`${NEWS_DOMAIN}${id}.json`);
  if (!response.ok) {
    throw new Error('Fetching comments data failed!');
  }
  const data = await response.json();
  if (data?.kids) {
    data.comments = await Promise.all(
      data.kids.map(async id => {
        return await getAllKidsComments(id);
      })
    );
  }
  return data;
}
