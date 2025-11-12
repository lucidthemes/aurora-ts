export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <p className="flex gap-x-1 self-center text-sm tracking-xwide text-shark uppercase lg:self-start">
      <span>© {currentYear}. Created By</span>
      <a href="https://www.lucid-themes.com/" target="_blank" className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
        Lucid Themes
      </a>
    </p>
  );
}
