import { addPost } from '/builder.js';

export function getAllPosts() {
  const thePromises = [];
  for (let index = 1; index <= 100; index++) {
    thePromises.push(
      fetch(`https://jsonplaceholder.typicode.com/posts/${index}`)
    );
  }
  Promise.all(thePromises).then(postValues => {
    const allPosts = postValues.map(postResponse => postResponse.json());
    Promise.all(allPosts)
      .then(postObjects => {
        const authorResponses =
          postObjects.map(post => getAuthor(post.userId));
        return Promise.all(authorResponses)
          .then(authorObjects => {
            return postObjects.map((post, index) => {
              post.author = authorObjects[index];
              return post
            })
          })
      })
      .then(allOrderedPosts => {
        return allOrderedPosts.sort((left, right) => {
          return left.id > right.id ? -1 : 1;
        });
      })
      .then(reversePostData => {
        console.log("All the posts...");
        console.log({ allPostData: reversePostData });
        reversePostData.forEach(post => {
          addPost(post);
        });
      });
  });
}

function getAuthor(authorId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`).then(
    response => {
      return response.json();
    }
  );
}
