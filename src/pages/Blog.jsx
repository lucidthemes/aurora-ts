import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getCategoryBySlug } from '@server/posts/getCategory';
import { getTagBySlug } from '@server/posts/getTag';
import { getAuthorBySlug } from '@server/posts/getAuthor';
import { PageLayout, PageSidebarLayout } from '@components/Layout/PageLayout';
import BlogList from '@features/blog/BlogList';
import { Sidebar } from '@components/Layout/Sidebar';
import SearchForm from '@features/searchForm';

export function Blog() {
  const [searchParams] = useSearchParams();
  const layout = searchParams.get('layout') || 'wide-small-small';

  return <PageSidebarLayout content={<BlogList style={layout} />} sidebar={<Sidebar></Sidebar>} sidebarPosition="right" />;
}

export function BlogLeftSidebar() {
  return <PageSidebarLayout content={<BlogList style="wide-small-small" />} sidebar={<Sidebar></Sidebar>} sidebarPosition="left" />;
}

export function BlogHiddenSidebar() {
  return (
    <PageLayout>
      <BlogList style="wide-small-small" />
    </PageLayout>
  );
}

export function BlogCategory() {
  const { slug } = useParams();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        const category = await getCategoryBySlug(slug);
        if (category) setCategory(category);
      } catch (error) {
        console.error('Failed to fetch category.', error);
      }
    };

    fetchCategory();
  }, [slug]);

  return (
    <PageSidebarLayout
      content={
        category.length !== 0 ? (
          <>
            <header className="mb-10 flex flex-col gap-y-5">
              <h1>{category.name}</h1>
              <p>{category.description}</p>
            </header>
            <BlogList category={category.id} style="wide-small-small" />
          </>
        ) : (
          <p className="rounded-sm bg-white p-5 text-center">Category not found</p>
        )
      }
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="right"
    />
  );
}

export function BlogTag() {
  const { slug } = useParams();
  const [tag, setTag] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchTag = async () => {
      try {
        const tag = await getTagBySlug(slug);
        if (tag) setTag(tag);
      } catch (error) {
        console.error('Failed to fetch tag.', error);
      }
    };

    fetchTag();
  }, [slug]);

  return (
    <PageSidebarLayout
      content={
        tag.length !== 0 ? (
          <>
            <header className="mb-10 flex flex-col gap-y-5">
              <h1>{tag.name}</h1>
              <p>{tag.description}</p>
            </header>
            <BlogList tag={tag.id} style="wide-small-small" />
          </>
        ) : (
          <p className="rounded-sm bg-white p-5 text-center">Tag not found</p>
        )
      }
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="right"
    />
  );
}

export function BlogSearch() {
  const { term } = useParams();

  return (
    <PageSidebarLayout
      content={
        <>
          <header className="mb-10 flex flex-col gap-y-5">
            <h1>Search results: {term}</h1>
            <SearchForm term={term} />
          </header>
          <BlogList search={term} style="wide-small-small" />
        </>
      }
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="right"
    />
  );
}

export function BlogAuthor() {
  const { slug } = useParams();
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchAuthor = async () => {
      try {
        const author = await getAuthorBySlug(slug);
        if (author) setAuthor(author);
      } catch (error) {
        console.error('Failed to fetch author.', error);
      }
    };

    fetchAuthor();
  }, [slug]);

  return (
    <PageSidebarLayout
      content={
        author.length !== 0 ? (
          <>
            <header className="mb-10 flex flex-col gap-y-5">
              <h1>{author.name}</h1>
              <p>{author.description}</p>
            </header>
            <BlogList author={author.id} style="wide-small-small" />
          </>
        ) : (
          <p className="rounded-sm bg-white p-5 text-center">Author not found</p>
        )
      }
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="right"
    />
  );
}
