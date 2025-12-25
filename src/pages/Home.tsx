import Container from '@components/Layout/Container';
import { PageSidebarLayout } from '@components/Layout/PageLayout';
import { Sidebar, Sidebar2, Sidebar3 } from '@components/Layout/Sidebar';
import SectionHeading from '@components/UI/SectionHeading';
import BlogList from '@features/blog/blogList';
import { Slideshow } from '@features/home/slideshow/Slideshow';
import { Slide } from '@features/home/slideshow/components/slide/Slide';
import Banner from '@features/home/banner';
import PromoBox from '@features/home/promoBox';
import Newsletter from '@features/home/newsletter';

export function Home() {
  return (
    <>
      <section aria-label="Featured slideshow">
        <Container width="wide">
          <Slideshow height={500} loop={true} autoplay={false} navPosition="outside">
            <Slide
              image="/images/posts/post-1.jpg"
              heading="Dune walk"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum…"
              link="/blog/dune-walk"
              button={true}
              layout="split"
            />
            <Slide
              image="/images/posts/post-2.jpg"
              heading="Old town centre"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum…"
              link="/blog/old-town-centre"
              button={true}
              layout="split"
            />
            <Slide
              image="/images/posts/post-3.jpg"
              heading="Beach Adventure"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum…"
              link="/blog/beach-adventure"
              button={true}
              layout="split"
            />
            <Slide
              image="/images/posts/post-4.jpg"
              heading="Sweet Coffee"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum…"
              link="/blog/sweet-coffee"
              button={true}
              layout="split"
            />
            <Slide
              image="/images/posts/post-5.jpg"
              heading="Boho fashion"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum…"
              link="/blog/boho-fashion"
              button={true}
              layout="split"
            />
          </Slideshow>
        </Container>
      </section>

      <section aria-label="Category promo boxes">
        <Container>
          <div className="grid grid-cols-1 gap-x-7.5 gap-y-10 md:grid-cols-3 lg:grid-cols-3">
            <PromoBox
              image="/images/posts/post-8.jpg"
              heading="Lifestyle"
              subHeading="Lorem ipsum dolor sit amet"
              link="/category/lifestyle"
              position="bottom"
            />
            <PromoBox image="/images/posts/post-2.jpg" heading="Travel" subHeading="Lorem ipsum dolor sit amet" link="/category/travel" position="bottom" />
            <PromoBox
              image="/images/posts/post-12.jpg"
              heading="Photography"
              subHeading="Lorem ipsum dolor sit amet"
              link="/category/photography"
              position="bottom"
            />
          </div>
        </Container>
      </section>

      <section aria-label="Join my newsletter">
        <Container>
          <Newsletter />
        </Container>
      </section>

      <section aria-label="Latest blog posts">
        <PageSidebarLayout content={<BlogList style="wide-small-small" />} sidebar={<Sidebar />} sidebarPosition="right" />
      </section>
    </>
  );
}

export function HomeClassic() {
  return (
    <>
      <section aria-label="Featured slideshow">
        <Container width="full" customPadding="p-0">
          <Slideshow height={600} loop={true} autoplay={false} navPosition="inside">
            <Slide
              image="/images/posts/post-1.jpg"
              heading="Dune walk"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum…"
              link="/blog/dune-walk"
              button={false}
              layout="overlay-center"
            />
            <Slide
              image="/images/posts/post-2.jpg"
              heading="Old town centre"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum…"
              link="/blog/old-town-centre"
              button={false}
              layout="overlay-center"
            />
            <Slide
              image="/images/posts/post-3.jpg"
              heading="Beach Adventure"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum…"
              link="/blog/beach-adventure"
              button={false}
              layout="overlay-center"
            />
            <Slide
              image="/images/posts/post-4.jpg"
              heading="Sweet Coffee"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum…"
              link="/blog/sweet-coffee"
              button={false}
              layout="overlay-center"
            />
            <Slide
              image="/images/posts/post-5.jpg"
              heading="Boho fashion"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum…"
              link="/blog/boho-fashion"
              button={false}
              layout="overlay-center"
            />
          </Slideshow>
        </Container>
      </section>

      <section aria-label="Category promo boxes">
        <Container>
          <div className="grid grid-cols-1 gap-x-7.5 gap-y-10 md:grid-cols-3 lg:grid-cols-3">
            <PromoBox image="/images/posts/post-8.jpg" heading="Lifestyle" link="/category/lifestyle" position="center" />
            <PromoBox image="/images/posts/post-2.jpg" heading="Travel" link="/category/travel" position="center" />
            <PromoBox image="/images/posts/post-12.jpg" heading="Photography" link="/category/photography" position="center" />
          </div>
        </Container>
      </section>

      <section aria-label="Join my newsletter">
        <Container>
          <Newsletter />
        </Container>
      </section>

      <section aria-label="Latest blog posts">
        <PageSidebarLayout content={<BlogList style="wide-small-half" />} sidebar={<Sidebar />} sidebarPosition="right" />
      </section>
    </>
  );
}

export function HomeMagazine() {
  return (
    <>
      <section aria-label="Latest blog posts">
        <PageSidebarLayout content={<BlogList style="wide-small-small" postsPerPage={3} />} sidebar={<Sidebar2 />} sidebarPosition="right" />
      </section>

      <section className="bg-spring-wood py-10" aria-label="Lifestyle post slideshow">
        <Container width="wide">
          <SectionHeading heading="Lifestyle" align="center" link="/category/lifestyle" />
          <Slideshow height={600} loop={true} autoplay={true} navPosition="outside" multiSlide={3}>
            <Slide
              image="/images/posts/post-4.jpg"
              heading="Sweet Coffee"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque…"
              link="/blog/sweet-coffee"
              button={false}
              layout="overlay-bottom"
            />
            <Slide
              image="/images/posts/post-8.jpg"
              heading="Rustic decor"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque…"
              link="/blog/rustic-decor"
              button={false}
              layout="overlay-bottom"
            />
            <Slide
              image="/images/posts/post-9.jpg"
              heading="Love of Books"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque…"
              link="/blog/love-of-books"
              button={false}
              layout="overlay-bottom"
            />
            <Slide
              image="/images/posts/post-10.jpg"
              heading="Boho globe"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque…"
              link="/blog/boho-globe"
              button={false}
              layout="overlay-bottom"
            />
            <Slide
              image="/images/posts/post-11.jpg"
              heading="Lazy Days"
              subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque…"
              link="/blog/lazy-days"
              button={false}
              layout="overlay-bottom"
            />
          </Slideshow>
        </Container>
      </section>

      <section aria-label="Latest travel posts">
        <PageSidebarLayout
          content={
            <>
              <SectionHeading heading="Travel" link="/category/travel" />
              <BlogList limit={3} style="wide-grid-2" showPagination={false} />
            </>
          }
          sidebar={<Sidebar3 />}
          sidebarPosition="right"
        />
      </section>

      <section className="bg-spring-wood py-10" aria-label="Featured post">
        <Container width="wide">
          <SectionHeading heading="Featured" align="center" />
          <Banner
            image="/images/posts/post-5.jpg"
            heading="Boho fashion"
            subHeading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut."
            link="/blog/boho-fashion"
            layout="overlay"
          />
        </Container>
      </section>

      <section aria-label="Latest photography posts">
        <Container>
          <SectionHeading heading="Photography" link="/category/photography" linkButton="View more" />
          <BlogList limit={3} style="grid-3" showPagination={false} />
        </Container>
      </section>
    </>
  );
}

export function HomeMinimal() {
  return (
    <section aria-label="Latest blog posts">
      <Container>
        <BlogList style="grid-2" postsPerPage={8} />
      </Container>
    </section>
  );
}
