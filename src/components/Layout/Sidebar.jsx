import { AboutWidget, PostsWidget, InstagramWidget, SocialWidget, NewsletterWidget, PromoBoxWidget, SearchWidget, TagsWidget } from '@components/Widgets';

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-y-10 rounded-md bg-white p-5" aria-label="Sidebar widgets">
      <AboutWidget
        bgImage="/images/posts/post-8.jpg"
        authorImage="/images/author.jpg"
        heading="Lucid Themes"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu"
        centered={true}
        padding={true}
      />
      <PostsWidget title="Latest posts" limit={2} style="wide" />
      <InstagramWidget title="Instagram" limit={9} columns={3} />
      <SocialWidget title="Follow me" />
      <NewsletterWidget title="Newsletter" />
      <PromoBoxWidget title="Promo box" image="/images/posts/post-8.jpg" heading="Lifestyle" link="/category/lifestyle" position="center" />
      <SearchWidget title="Search" />
      <TagsWidget title="Tags" />
    </aside>
  );
}

export function Sidebar2() {
  return (
    <aside className="flex flex-col gap-y-10 rounded-md bg-white p-5" aria-label="Sidebar 2 widgets">
      <AboutWidget
        bgImage="/images/posts/post-8.jpg"
        authorImage="/images/author.jpg"
        heading="Lucid Themes"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu"
        centered={true}
        padding={true}
      />
      <InstagramWidget title="Instagram" limit={9} columns={3} />
      <PromoBoxWidget image="/images/posts/post-8.jpg" heading="Lifestyle" link="/category/lifestyle" position="center" />
      <PromoBoxWidget image="/images/posts/post-2.jpg" heading="Travel" link="/category/travel" position="center" />
      <PromoBoxWidget image="/images/posts/post-12.jpg" heading="Photography" link="/category/photography" position="center" />
      <NewsletterWidget title="Newsletter" />
    </aside>
  );
}

export function Sidebar3() {
  return (
    <aside className="flex flex-col gap-y-10 rounded-md bg-white p-5" aria-label="Sidebar 3 widgets">
      <PostsWidget title="Latest posts" limit={3} style="wide" />
      <SearchWidget title="Search" />
      <TagsWidget title="Tags" />
    </aside>
  );
}
