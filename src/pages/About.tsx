import { ContentBlock } from '@typings/contentBlock';
import { PageLayout, PageSidebarLayout } from '@components/Layout/PageLayout';
import PageTitle from '@components/UI/PageTitle';
import PageContent from '@components/UI/PageContent';
import { Sidebar } from '@components/Layout/Sidebar';

const aboutTitle = 'About';

const aboutContent: ContentBlock[] = [
  {
    id: 1,
    type: 'paragraph',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id volutpat quam iaculis eu. Nunc sit amet scelerisque mauris. Phasellus volutpat mauris ac sem tincidunt, in fringilla arcu ultrices. Phasellus scelerisque eros vel pulvinar gravida. Aenean suscipit felis orci, sed egestas libero dignissim at. Sed commodo malesuada ligula, nec vehicula risus fermentum sed.',
  },
  {
    id: 2,
    type: 'paragraph',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id volutpat quam iaculis eu. Nunc sit amet scelerisque mauris. Phasellus volutpat mauris ac sem tincidunt, in fringilla arcu ultrices. Phasellus scelerisque eros vel pulvinar gravida. Aenean suscipit felis orci, sed egestas libero dignissim at. Sed commodo malesuada ligula, nec vehicula risus fermentum sed.',
  },
  {
    id: 3,
    type: 'paragraph',
    text: 'Integer pretium posuere est. Ut interdum mollis ipsum, ac vehicula nisl laoreet et. Curabitur ac ipsum aliquam, varius purus at, lobortis purus. Maecenas quis sem dapibus, volutpat odio non, mattis dui. Nam eget urna nec mi tempor mollis vel nec felis. Cras tellus est, malesuada at leo vitae, lacinia pellentesque eros. Donec accumsan tincidunt velit.',
  },
  {
    id: 4,
    type: 'paragraph',
    text: 'Nullam dictum congue vestibulum. Suspendisse vitae nisl purus. Aliquam ullamcorper dolor rutrum eros tincidunt, non dapibus neque placerat. Vivamus vitae aliquam mauris. Vestibulum facilisis elit nec mi facilisis fringilla. Vivamus bibendum, orci at rutrum laoreet, nunc dui pellentesque ipsum, id bibendum erat urna sed mi. Proin fringilla, arcu ac aliquet lacinia, nulla nibh ornare sem, sit amet condimentum dui ex eget turpis. Duis in quam sit amet tortor lobortis placerat. Pellentesque molestie aliquam arcu quis accumsan. Phasellus facilisis mi eu turpis varius, at vestibulum massa pharetra. Curabitur consectetur interdum dignissim. Aliquam commodo tincidunt luctus. Mauris facilisis odio sed leo blandit, at lacinia quam imperdiet. Vestibulum diam mauris, laoreet quis sagittis nec, mollis maximus libero. Integer vitae orci nec est malesuada lobortis vitae nec diam. Donec dictum dolor ac elit dapibus ullamcorper.',
  },
  {
    id: 5,
    type: 'pullquote',
    text: 'Integer commodo, sem eget maximus dapibus, ipsum mi ultrices lacus, sit amet hendrerit nibh felis gravida ipsum. Phasellus et congue lacus. Etiam tristique lectus at leo aliquam pellentesque. Duis vel augue eget augue hendrerit aliquam, Cras eleifend magna tellus.',
    cite: 'Lucid Themes',
  },
  {
    id: 6,
    type: 'paragraph',
    text: 'Etiam et ultrices arcu. In vitae dui posuere, aliquet justo a, gravida tellus. Vivamus sollicitudin, nunc ut interdum vulputate, dolor massa volutpat ipsum, in auctor tellus augue sed nisl. Fusce a risus eu est iaculis ultrices id eget magna. Duis nisl nunc, fringilla quis feugiat vel, interdum et lacus. Integer eleifend iaculis lorem non maximus. Sed et quam in ipsum semper malesuada in vitae dolor. Quisque ullamcorper augue in pharetra tempor. Sed vel risus at urna cursus blandit. Nulla dignissim turpis neque, non dignissim sem posuere ac. Vestibulum convallis condimentum nisl sed suscipit.',
  },
  {
    id: 7,
    type: 'paragraph',
    text: 'Donec vel imperdiet justo, eu malesuada nulla. Praesent vel suscipit nibh. Aliquam eu turpis in est varius finibus. Nam ac facilisis lorem. Cras vitae condimentum libero. Donec nec ligula faucibus, tempus tellus nec, luctus odio. Nulla lobortis consectetur eros, vitae tincidunt magna cursus in. Nam tristique nulla non ultricies blandit.',
  },
];

export function About() {
  return (
    <PageLayout>
      <PageTitle>{aboutTitle}</PageTitle>
      <PageContent content={aboutContent} />
    </PageLayout>
  );
}

export function AboutRightSidebar() {
  return (
    <PageSidebarLayout
      content={
        <>
          <PageTitle>{aboutTitle}</PageTitle>
          <PageContent content={aboutContent} />
        </>
      }
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="right"
    />
  );
}

export function AboutLeftSidebar() {
  return (
    <PageSidebarLayout
      content={
        <>
          <PageTitle>{aboutTitle}</PageTitle>
          <PageContent content={aboutContent} />
        </>
      }
      sidebar={<Sidebar></Sidebar>}
      sidebarPosition="left"
    />
  );
}
