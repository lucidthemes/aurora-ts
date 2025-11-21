import NewsletterForm from '@features/newsletterForm';

export default function Newsletter() {
  return (
    <div className="rounded-md bg-white p-5 md:p-7.5">
      <div className="flex flex-col gap-y-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-y-2.5">
          <h3 className="text-2xl">Join my newsletter</h3>
          <p>Stay in touch by joining my newsletter</p>
        </div>
        <NewsletterForm layout="page" />
      </div>
    </div>
  );
}
