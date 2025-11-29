# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - [Unreleased]

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
- Schemas path to Vite config using @schemas
- Schemas path to tsconfig using @schemas

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

- Tags widget limit parameter to optional so that all tags are shown by default

#### Contexts

- AppProviders to TypeScript
- AuthContext to TypeScript

#### Server

- Convert posts fetch files to TypeScript
- Convert instagram fetch feed file to TypeScript
- Convert products fetch files to TypeScript
- Convert shop fetch files to TypeScript

### Fixed

#### Components

- Posts widget category incorrect type
- Products widget category incorrect type

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

- Types path to Vite config using @typings
- Types path to tsconfig using @typings

### Changed

#### Components

- Header to TypeScript
- Footer to TypeScript
- Form (checkbox, password, select, textarea) to TypeScript
- Layout (container, layout, pageLayout, sidebar) to TypeScript
- Widgets (posts, products, tags, about, instagram, newsletter, promobox, search, social, title) to TypeScript
- Notification to TypeScript
- UI (pageContent, pageTitle, sectionHeading) to TypeScript

#### Features

- blog MetaList to TypeScript

### Removed

#### Server

- posts getPosts limit and category defaults of null
- posts getTags limit default of null
- products getProducts limit and category defaults of null

## [0.0.0] - 2025-11-21

- Initial development
