// /pages/index.tsx
import Head from "next/head";
import { gql, useQuery, useMutation } from "@apollo/client";
// import { AwesomeLink } from "../components/AwesomeLink";
import { ChuckNorrisPost } from "../components/ChuckNorrisPost";
import type { Link as Node } from "@prisma/client";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const AllLinksQuery = gql`
  query allLinksQuery($first: Int, $after: ID) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          imageUrl
          url
          title
          category
          description
          id
        }
      }
    }
  }
`;

const AllChuckNorrisPostsQuery = gql`
  query AllChuckNorrisPostsQuery($first: Int, $after: ID) {
    chuck_norris_posts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          icon_url
          value
        }
      }
    }
  }
`;

function Home() {
  const { user } = useUser()
  console.log("in index file");
  // console.log(process);
  console.log(process.env);
  console.log('new changes')
  console.log(process.env.NODE_ENV);
  console.log(process.env.NODE_ENV === 'production')
  console.log(`user: ${user}`)
  // const { data, loading, error, fetchMore } = useQuery(AllLinksQuery, {
  //   variables: { first: 3 },
  // });

  const { data, loading, error, fetchMore } = useQuery(AllChuckNorrisPostsQuery, {
    variables: { first: 3 },
  });

  // if (!user) {
  //   return (
  //     <div className="flex items-center justify-center">
  //       To view the awesome links you need to{' '}
  //       <Link href="/api/auth/login" className=" block bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
  //         Login
  //       </Link>
  //     </div>
  //   );
  // }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { endCursor, hasNextPage } = data?.chuck_norris_posts.pageInfo;

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-5xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.chuck_norris_posts.edges.map(({ node }: { node: Node }) => (
            <Link href={`/link/${node.id}`}>
              <ChuckNorrisPost
                icon_url={node.icon_url}
                value={node.value}
                id={node.id}
              />
            </Link>
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.chuck_norris_posts.edges = [
                    ...prevResult.chuck_norris_posts.edges,
                    ...fetchMoreResult.chuck_norris_posts.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You've reached the end!{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
