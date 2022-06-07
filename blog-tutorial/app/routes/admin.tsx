import { Link, Outlet, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return {
    posts: [
      { title: "First", slug: "slug1" },
      { title: "Second", slug: "slug2" },
      { title: "Third", slug: "slug3" },
    ],
  };
};
export default function Admin() {
  const { posts } = useLoaderData();
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.title} className="block" to={post.title}>
          {post.title}
        </Link>
      ))}
      <Outlet />
    </div>
  );
}
