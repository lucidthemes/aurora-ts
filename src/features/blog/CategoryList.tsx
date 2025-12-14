import { Link } from 'react-router-dom';

import type { Category } from '@typings/posts/category';

interface CategoryListProps {
  categories: number[];
  categoryMap: Record<number, Category>;
}

export default function CategoryList({ categories, categoryMap }: CategoryListProps) {
  if (!categories || !categoryMap) return null;

  return (
    <ul className="flex flex-wrap gap-2.5">
      {categories.map((categoryId) => {
        const category = categoryMap[categoryId];
        return category ? (
          <li
            key={category.id}
            className="flex items-center gap-x-2.5 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-boulder first:before:hidden"
          >
            <Link
              to={`/category/${category.slug}`}
              className="text-sm/3 tracking-xwide text-boulder uppercase transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark"
            >
              {category.name}
            </Link>
          </li>
        ) : null;
      })}
    </ul>
  );
}
