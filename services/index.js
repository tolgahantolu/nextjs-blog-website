import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

// schema
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  // Gelen Error için => hygraph settings'den API Access altındaki Content API Permission'da initialize defaults'u seç!
  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
	query GetPostDetails() {
		posts (
			orderBy: createdAt_ASC,
			last: 3
		) {
			title
			featuredImage {
				url
			}
			createdAt
			slug
		}
	}
  `;

  const result = await request(graphqlAPI, query);

  // Gelen Error için => hygraph settings'den API Access altındaki Content API Permission'da initialize defaults'u seç!
  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_sum: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { categories, slug });

  // Gelen Error için => hygraph settings'den API Access altındaki Content API Permission'da initialize defaults'u seç!
  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
		query GetCategories() {
			categories {
				name
				slug
			}
		}

	`;

  const result = await request(graphqlAPI, query);

  // Gelen Error için => hygraph settings'den API Access altındaki Content API Permission'da initialize defaults'u seç!
  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  // Gelen Error için => hygraph settings'den API Access altındaki Content API Permission'da initialize defaults'u seç!
  return result.post;
};

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};
