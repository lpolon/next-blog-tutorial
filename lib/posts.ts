// lib ou utils
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
} from 'next';

const postsDir = path.join(process.cwd(), 'posts');

const isValidMatterResult = (
  object: Record<string, any>,
): object is Omit<Post, 'id'> => {
  return 'title' in object && 'date' in object;
};

export function getPostData(id: string) {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents).data;

  if (!isValidMatterResult(matterResult)) {
    return null;
  }
  return {
    id,
    ...matterResult,
  };
  // Combine the data with the id
}

// the same as GetStaticPathsResult['paths'] lol.
export function getAllPostIdPaths(): Awaited<
  ReturnType<GetStaticPaths>
>['paths'] {
  const filenames = fs.readdirSync(postsDir);
  return filenames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getSortedPosts() {
  const filenames = fs.readdirSync(postsDir);

  const allPostsData = filenames
    .map(fileName => {
      const fullpath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullpath, 'utf-8');

      const matterResult = matter(fileContents).data;

      const id = fileName.replace(/\.md$/, '');
      return {
        id,
        ...matterResult,
      };
    })
    .filter((matterResultObject): matterResultObject is Post =>
      isValidMatterResult(matterResultObject),
    );

  return allPostsData.sort(({ date: a }, { date: b }) => {
    return b - a;
  });
}
