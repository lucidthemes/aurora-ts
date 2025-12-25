import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from '@components/Layout/Container';
import ProductList from '@features/product/productList/ProductList';
import { getCategoryBySlug } from '@server/products/getCategory';
import { getTagBySlug } from '@server/products/getTag';
import type { Category } from '@typings/products/category';
import type { Tag } from '@typings/products/tag';

export function Shop() {
  return (
    <Container>
      <ProductList pageTitle="Shop" showFilter={true} showResults={true} showSort={true} showPagination={true} productsPerPage={9} />
    </Container>
  );
}

export function ShopCategory() {
  const { slug } = useParams();
  const [shopCategory, setShopCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        const category = await getCategoryBySlug(slug);
        if (category) setShopCategory(category);
      } catch (error) {
        console.error('Failed to fetch category.', error);
      }
    };

    fetchCategory();
  }, [slug]);

  return (
    <Container>
      {shopCategory ? (
        <ProductList category={shopCategory.id} pageTitle={shopCategory.name} pageDescription={shopCategory.description} />
      ) : (
        <p className="rounded-sm bg-white p-5 text-center">Category not found</p>
      )}
    </Container>
  );
}

export function ShopTag() {
  const { slug } = useParams();
  const [shopTag, setShopTag] = useState<Tag | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchTag = async () => {
      try {
        const tag = await getTagBySlug(slug);
        if (tag) setShopTag(tag);
      } catch (error) {
        console.error('Failed to fetch tag.', error);
      }
    };

    fetchTag();
  }, [slug]);

  return (
    <Container>
      {shopTag ? (
        <ProductList tag={shopTag.id} pageTitle={shopTag.name} pageDescription={shopTag.description} />
      ) : (
        <p className="rounded-sm bg-white p-5 text-center">Tag not found</p>
      )}
    </Container>
  );
}
