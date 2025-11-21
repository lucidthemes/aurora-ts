import Container from '@components/Layout/Container';
import { AboutWidget, PostsWidget, ProductsWidget } from '@components/Widgets';

export default function FooterMain() {
  return (
    <div className="bg-pampas py-10">
      <Container>
        <div className="grid grid-cols-1 gap-x-7.5 gap-y-10 md:grid-cols-3">
          <AboutWidget
            title="About me"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut."
          />
          <PostsWidget title="Latest posts" limit={3} style="small" />
          <ProductsWidget title="Latest products" limit={2} style="small" />
        </div>
      </Container>
    </div>
  );
}
