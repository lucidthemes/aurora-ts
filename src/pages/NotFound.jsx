import Container from '@components/Layout/Container';

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col gap-y-4 rounded-sm bg-white px-8 py-15 text-center md:px-10 md:py-20 lg:px-12 lg:py-25">
        <h1>Page not found</h1>
        <p>Sorry, but we cannot find the page you were looking for.</p>
      </div>
    </Container>
  );
}
