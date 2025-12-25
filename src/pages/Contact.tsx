import { PageLayout, PageSidebarLayout } from '@components/Layout/PageLayout';
import { Sidebar } from '@components/Layout/Sidebar';
import PageTitle from '@components/UI/PageTitle';
import PageContent from '@components/UI/PageContent';
import ContactForm from '@features/contactForm';
import type { ContentBlock } from '@typings/contentBlock';

const contactTitle = 'Contact';

const contactContent: ContentBlock[] = [
  {
    id: 1,
    type: 'paragraph',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id volutpat quam iaculis eu. Nunc sit amet scelerisque mauris. Phasellus volutpat mauris ac sem tincidunt, in fringilla arcu ultrices. Phasellus scelerisque eros vel pulvinar gravida. Aenean suscipit felis orci, sed egestas libero dignissim at. Sed commodo malesuada ligula, nec vehicula risus fermentum sed.',
  },
];

export function Contact() {
  return (
    <PageLayout>
      <PageTitle>{contactTitle}</PageTitle>
      <PageContent content={contactContent} />
      <ContactForm />
    </PageLayout>
  );
}

export function ContactRightSidebar() {
  return (
    <PageSidebarLayout
      content={
        <>
          <PageTitle>{contactTitle}</PageTitle>
          <PageContent content={contactContent} />
          <ContactForm />
        </>
      }
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="right"
    />
  );
}

export function ContactLeftSidebar() {
  return (
    <PageSidebarLayout
      content={
        <>
          <PageTitle>{contactTitle}</PageTitle>
          <PageContent content={contactContent} />
          <ContactForm />
        </>
      }
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="left"
    />
  );
}
