import Icon from './Icon';

export default function Share() {
  const currentPostUrl = window.location.href;

  return (
    <ul className="flex justify-center gap-x-6" role="region" aria-label="Share this post">
      <Icon site="facebook" shareUrl="http://www.facebook.com/sharer.php?u=" currentPostUrl={currentPostUrl} />
      <Icon site="X" shareUrl="https://twitter.com/share?url=" currentPostUrl={currentPostUrl} />
      <Icon site="pinterest" shareUrl="https://pinterest.com/pin/create/bookmarklet/?url=" currentPostUrl={currentPostUrl} />
      <Icon site="linkedin" shareUrl="https://www.linkedin.com/cws/share?url=" currentPostUrl={currentPostUrl} />
    </ul>
  );
}
