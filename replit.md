# Overview

Aura is a mental wellness and emotional support application built as a full-stack web application. The project provides users with tools for emotional tracking, daily check-ins, and data insights to support their mental health journey. The application features a modern React frontend with a clean, calming design and an Express.js backend with PostgreSQL database integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side is built with **React 18** using TypeScript and follows a component-based architecture:

- **Routing**: Uses Wouter for lightweight client-side routing with three main routes: home, data insights, and daily check-in
- **State Management**: Leverages React Query (@tanstack/react-query) for server state management and data fetching
- **UI Framework**: Built with shadcn/ui components on top of Radix UI primitives, providing accessible and customizable components
- **Styling**: Uses Tailwind CSS with custom CSS variables for theming, featuring a soft purple/pink gradient color scheme optimized for wellness applications
- **Build Tool**: Vite handles development server, hot module replacement, and production builds

## Backend Architecture

The server-side uses **Express.js** with TypeScript in a modular structure:

- **API Design**: RESTful API architecture with `/api` prefix for all endpoints
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware with standardized error responses
- **Development Tools**: Custom Vite integration for development mode with hot reloading

## Data Storage

The application uses **PostgreSQL** as the primary database with modern ORM tooling:

- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Database Client**: Neon Database serverless client for PostgreSQL connections
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Current Schema**: User table with ID, username, and password fields, prepared for expansion

The storage layer includes an abstraction interface (`IStorage`) with both in-memory implementation for development and database implementation ready for production use.

## Authentication and Authorization

The application is structured to support user authentication:

- **User Management**: User creation and retrieval methods implemented in storage layer
- **Session Handling**: Uses connect-pg-simple for PostgreSQL-backed session storage
- **Security**: Prepared for secure password handling and user session management

## Development and Deployment

- **Development**: Concurrent client and server development with Vite dev server integration
- **Build Process**: Separate build processes for client (Vite) and server (esbuild) with optimized production outputs
- **Environment**: Supports both development and production environments with appropriate tooling

# External Dependencies

## Core Framework Dependencies

- **@neondatabase/serverless**: Serverless PostgreSQL client for database connectivity
- **drizzle-orm**: Modern TypeSQL ORM for database operations
- **express**: Web application framework for the backend server
- **react**: Frontend UI library with hooks and modern patterns
- **@tanstack/react-query**: Server state management and data fetching

## UI and Design Dependencies

- **@radix-ui/***: Comprehensive set of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for creating variant-based component APIs
- **lucide-react**: Icon library for consistent iconography

## Development and Build Tools

- **vite**: Frontend build tool and development server
- **typescript**: Type safety and enhanced developer experience
- **drizzle-kit**: Database schema management and migration tool
- **esbuild**: Fast JavaScript bundler for server-side code

## Validation and Forms

- **zod**: Schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod for type-safe validation
- **@hookform/resolvers**: Form validation resolvers for React Hook Form integration

## Development Environment

- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit environment
- **@replit/vite-plugin-cartographer**: Development tooling for Replit integration