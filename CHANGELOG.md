# Changelog

All notable changes to this project will be documented in this file.

## [0.10.0] - [Unreleased]

### Added

#### Pages

- status object to SinglePost for not found, loading, and loaded states

#### Types

- replies field to posts comment type

### Changed

#### Contexts

- add import type to components, hooks, and tests which import types

#### Features

##### Account

- add import type to components, hooks, and tests which import types

##### Auth

- add import type to components, hooks, and tests which import types

##### Blog

- convert CategoryList to TypeScript
- MetaList props interface author to Author typing

###### BlogList

- convert components to TypeScript
- convert hooks to TypeScript
- convert tests to TypeScript
- add import type to components, hooks, and tests which import types

###### BlogPost

- convert components to TypeScript
- convert hooks to TypeScript
- convert tests to TypeScript
- add import type to components, hooks, and tests which import types

#### Server

- posts getComments amend each returned comment to include replies field added to comment type

## [0.9.0] - 2025-12-13

### Changed

#### Auth

- convert components to TypeScript
- convert hooks to TypeScript
- convert tests to TypeScript

## [0.8.0] - 2025-12-12

### Changed

#### Account

- convert components to TypeScript
- convert hooks to TypeScript
- convert tests to TypeScript

## [0.7.1] - 2025-12-11

- fix incorrect App import using jsx in main

## [0.7.0] - 2025-12-11

### Changed

#### Components

##### Widgets

- convert posts widget tests to TypeScript
- convert products widget tests to TypeScript
- convert tags widget tests to TypeScript

#### Features

##### BlogList

- refactor blog list pagination to same structure as product list pagination

#### Utils

- convert formatters to TypeScript
- convert validators to TypeScript

## [0.6.1] - 2025-12-10

### Fixed

#### Checkout

- remove unnecessary useMemo import from useCheckout hook

## [0.6.0] - 2025-12-08

### Changed

#### Features

##### ContactForm

- useContactForm hook test to use separate functions for input and textarea change events

##### NewsletterForm

- NewsletterForm to TypeScript
- useNewsletterForm to TypeScript
- tests to TypeScript

##### SearchForm

- tests to TypeScript

#### Utils

- split tests utils create change event function into separate functions for input and textarea element types

### Removed

#### Utils

- create change event for both input and textarea combined

## [0.5.2] - 2025-12-08

- updated dependencies

## [0.5.1] - 2025-12-04

### Changed

#### Root

- eslint config to better handle linting JS/JSX, TS/TSX and test files

### Fixed

#### Components

##### Footer

- copyright link eslint error message of not having noreferrer

##### Form

- checkbox eslint error message of assigned a value but never used

##### Header

- HeaderTop Nav eslint error message of type format
- Search eslint error message of calling hooks conditionally

##### Notifcation

- useNotification eslint error message of calling setState synchronously within an effect

#### Features

##### Account

- useOrders eslint error message of calling setState synchronously within an effect

##### BlogPost

- useSinglePost eslint error message of calling setState synchronously within an effect
- useNavigation eslint error message of calling setState synchronously within an effect
- useRelated eslint error message of calling setState synchronously within an effect
- useTags eslint error message of calling setState synchronously within an effect

##### Cart

- CouponForm eslint error message of calling hooks conditionally

##### Checkout

- useCheckout eslint error message of calling setState synchronously within an effect by removing unnecessary useEffect
- orderReceived useOrderReceived eslint error message of calling setState synchronously within an effect
- orderReceived useItems hook eslint error message of calling hooks conditionally

##### ProductList

- ProductList reformat
- useSort eslint error message of calling setState synchronously within an effect
- usePagination reformat
- useFilters eslint error message of calling setState synchronously within an effect
- useFilterPrice eslint error message of calling setState synchronously within an effect

##### ProductPost

- useSingleProduct eslint error message of calling setState synchronously within an effect
- useBreadcrumb eslint error message of calling setState synchronously within an effect
- useSlideshow eslint error message of missing dependencies in effects
- useList eslint error message of calling setState synchronously within an effect
- useRelated eslint error message of calling setState synchronously within an effect
- useAddCartForm eslint error message of calling setState synchronously within an effect
- useVariations eslint error message of calling setState synchronously within an effect

##### SearchForm

- useSearchForm eslint error message of calling setState synchronously within an effect by removing unnecessary useEffect

## [0.5.0] - 2025-12-01

### Added

#### Utils

- tests sub folder for utils used only in tests

#### Root

- vitest/globals to tsconfig for vitest to work with TypeScript test files
- vitest.d.ts file for vitest to work with TypeScript test files

### Changed

#### ContactForm

- ContactForm to TypeScript
- useContactForm to TypeScript

## [0.4.1] - 2025-12-01

### Changed

- updated dependencies

## [0.4.0] - 2025-11-30

### Changed

#### Pages

- pages (home, blog, singlePost, about, contact, shop, singleProduct, cart, checkout, orderReceived, login, lostPassword, account, notFound) to TypeScript

#### Routes

- AppRoutes to TypeScript

## [0.3.0] - 2025-11-29

### Added

#### Schemas

- schemas folder
- instagram sub folder
- posts sub folder
- products sub folder
- shop sub folder

#### Server

- schema validation to instagram fetch file
- schema validation to posts fetch files
- schema validation to products fetch files
- schema validation to shop fetch files

#### Root

- Zod dependency to package
- schemas path to Vite config using @schemas
- schemas path to tsconfig using @schemas

## [0.2.0] - 2025-11-27

### Added

#### Types

- posts author type
- posts category type
- shop sub folder
- shop customer type
- shop address type
- shop coupon type
- shop paymentOption type
- shop shippingOption type
- shop order type
- instagram sub folder
- instagram feed type
- products tag type
- products category type
- products review type
- products attribute type

### Changed

#### Components

- tags widget limit parameter to optional so that all tags are shown by default

#### Contexts

- AppProviders to TypeScript
- AuthContext to TypeScript

#### Server

- posts fetch files to TypeScript
- instagram fetch feed file to TypeScript
- products fetch files to TypeScript
- shop fetch files to TypeScript

### Fixed

#### Components

- posts widget category incorrect type
- products widget category incorrect type

## [0.1.0] - 2025-11-25

### Added

#### Types

- types folder
- posts sub folder
- products sub folder
- posts post type
- posts tag type
- products product type
- contentBlock type

#### Root

- types path to Vite config using @typings
- types path to tsconfig using @typings

### Changed

#### Components

- header to TypeScript
- footer to TypeScript
- form (checkbox, password, select, textarea) to TypeScript
- layout (container, layout, pageLayout, sidebar) to TypeScript
- widgets (posts, products, tags, about, instagram, newsletter, promobox, search, social, title) to TypeScript
- notification to TypeScript
- UI (pageContent, pageTitle, sectionHeading) to TypeScript

#### Features

##### Blog

- convert MetaList to TypeScript

### Removed

#### Server

- posts getPosts limit and category defaults of null
- posts getTags limit default of null
- products getProducts limit and category defaults of null

## [0.0.0] - 2025-11-21

- initial development
