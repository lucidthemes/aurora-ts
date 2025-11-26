# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - [Unreleased]

### Added

#### Types

- shop sub folder
- shop customer type

### Changed

#### Contexts

- AppProviders to TypeScript
- AuthContext to TypeScript

### Fixed

#### Components

- Posts widget category incorrect type

## [0.1.0] - 2025-11-25

### Added

#### Types

- Types folder
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
