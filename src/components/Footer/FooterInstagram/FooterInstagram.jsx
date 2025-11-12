import Container from '@components/Layout/Container';
import InstagramFeed from '@features/instagramFeed';

export default function FooterInstagram() {
  return (
    <div className="bg-spring-wood py-10">
      <Container width="wide">
        <InstagramFeed limit={6} columns={6} link="/" />
      </Container>
    </div>
  );
}
