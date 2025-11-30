import { Routes, Route } from 'react-router-dom';

import { Home, HomeClassic, HomeMagazine, HomeMinimal } from '@pages/Home';
import { About, AboutRightSidebar, AboutLeftSidebar } from '@pages/About';
import { Contact, ContactRightSidebar, ContactLeftSidebar } from '@pages/Contact';

import { Blog, BlogLeftSidebar, BlogHiddenSidebar, BlogCategory, BlogTag, BlogSearch, BlogAuthor } from '@pages/Blog';
import SinglePost from '@pages/SinglePost';

import { Shop, ShopCategory, ShopTag } from '@pages/Shop';
import SingleProduct from '@pages/SingleProduct';
import CartPage from '@pages/Cart';
import CheckoutPage from '@pages/Checkout';
import OrderReceivedPage from '@pages/OrderReceived';

import RequireAuth from '@features/auth/RequireAuth';
import Login from '@pages/Login';
import LostPassword from '@pages/LostPassword';

import { AccountPage } from '@pages/Account';
import Dashboard from '@features/account/components/Dashboard';
import Orders from '@features/account/components/orders';
import Addresses from '@features/account/components/addresses';
import Details from '@features/account/components/details';

import NotFound from '@pages/NotFound';

export default function AppRoutes() {
  const appRoutes = [
    { path: '/', element: <Home /> },
    { path: '/home-classic', element: <HomeClassic /> },
    { path: '/home-magazine', element: <HomeMagazine /> },
    { path: '/home-minimal', element: <HomeMinimal /> },
    { path: '/about', element: <About /> },
    { path: '/about-right', element: <AboutRightSidebar /> },
    { path: '/about-left', element: <AboutLeftSidebar /> },
    { path: '/contact', element: <Contact /> },
    { path: '/contact-right', element: <ContactRightSidebar /> },
    { path: '/contact-left', element: <ContactLeftSidebar /> },
    { path: '/blog', element: <Blog /> },
    { path: '/blog-left', element: <BlogLeftSidebar /> },
    { path: '/blog-hidden', element: <BlogHiddenSidebar /> },
    { path: '/blog/:slug', element: <SinglePost /> },
    { path: '/category/:slug', element: <BlogCategory /> },
    { path: '/tag/:slug', element: <BlogTag /> },
    { path: '/search', element: <BlogSearch /> },
    { path: '/search/:term', element: <BlogSearch /> },
    { path: '/author/:slug', element: <BlogAuthor /> },
    { path: '/shop', element: <Shop /> },
    { path: '/product-category/:slug', element: <ShopCategory /> },
    { path: '/product-tag/:slug', element: <ShopTag /> },
    { path: '/product/:slug', element: <SingleProduct /> },
    { path: '/cart', element: <CartPage /> },
    { path: '/checkout', element: <CheckoutPage /> },
    { path: '/checkout/order-received/:slug', element: <OrderReceivedPage /> },
    { path: '/login', element: <Login /> },
    { path: '/lost-password', element: <LostPassword /> },
    { path: '*', element: <NotFound /> },
  ];

  return (
    <Routes>
      {appRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/account" element={<AccountPage />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="details" element={<Details />} />
        </Route>
      </Route>
    </Routes>
  );
}
