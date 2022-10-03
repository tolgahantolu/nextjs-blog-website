import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
const hygraphToken = process.env.HYGRAPH_TOKEN;

export default async function commentsAPI(req, res) {
  console.log(hygraphToken);

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      Authorization: `Bearer ${hygraphToken}`,
    },
  });

  const query = gql`
    #mutation query
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      #create new comment in hygraph cms
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    //  const { name, email, slug, comment } = req.body; // !req.body => name, email, comment ve slug'ı içeriyor (req.body.name gibi)
    const result = await graphQLClient.request(query, req.body);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
