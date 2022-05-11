import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '../../components/layout';
import {
  getAllPostIdPaths,
  getSortedPosts,
  getPostData,
} from '../../lib/posts';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPostIdPaths(),
    // about fallback behaviours: https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Post> = async ({
  params: { id } = { id: '' },
}) => {
  // TODO: Why is this dude can be an array?
  /*
   because of catch-all dynamic routes.
   e. g.:
   /posts/[...id]
   https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
   /posts/a/b/c return ['a', 'b', 'c']
  */
  const postData = getPostData(id as string);
  if (!postData) {
    return {
      notFound: true,
    };
  }
  return {
    props: postData,
  };
};

export default function Post(
  {
    date,
    id,
    title,
  }: InferGetStaticPropsType<
    typeof getStaticProps
  > /*: Awaited<ReturnType<typeof getStaticProps>> not good enough*/,
) {
  return (
    <Layout>
      {title}
      <br />
      {id}
      <br />
      {date}
    </Layout>
  );
}
