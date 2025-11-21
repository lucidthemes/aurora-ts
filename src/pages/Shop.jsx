import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryBySlug } from '@server/products/getCategory';
import { getTagBySlug } from '@server/products/getTag';
import Container from '@components/Layout/Container';
import ProductList from '@features/product/productList/ProductList';

export function Shop() {
  return (
    <Container>
      <ProductList pageTitle="Shop" showFilter={true} showResults={true} showSort={true} showPagination={true} productsPerPage={9} />
    </Container>
  );
}

export function ShopCategory() {
  const { slug } = useParams();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        const category = await getCategoryBySlug(slug);
        if (category) setCategory(category);
      } catch (error) {
        console.error('Failed to fetch category.', error);
      }
    };

    fetchCategory();
  }, [slug]);

  return (
    <Container>
      <ProductList category={category.id} pageTitle={category.name} pageDescription={category.description} />
    </Container>
  );
}

export function ShopTag() {
  const { slug } = useParams();
  const [tag, setTag] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchTag = async () => {
      try {
        const tag = await getTagBySlug(slug);
        if (tag) setTag(tag);
      } catch (error) {
        console.error('Failed to fetch tag.', error);
      }
    };

    fetchTag();
  }, [slug]);

  return (
    <Container>
      <ProductList tag={tag.id} pageTitle={tag.name} pageDescription={tag.description} />
    </Container>
  );
}
