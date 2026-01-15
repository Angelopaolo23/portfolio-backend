# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS TypeScript backend application for a developer portfolio. It follows NestJS conventions with a modular architecture using decorators, dependency injection, and a resource-based structure.

## Common Commands

### Development
```bash
npm run start:dev    # Start development server with hot-reload
npm run start:debug  # Start with debugging enabled
npm run build        # Build the application
```

### Testing
```bash
npm run test              # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:e2e          # Run end-to-end tests
npm run test:cov          # Run tests with coverage report
npm run test:debug        # Debug tests with Node inspector
```

### Code Quality
```bash
npm run lint    # Run ESLint with auto-fix
npm run format  # Format code with Prettier
```

### Running a Single Test
```bash
npx jest path/to/test-file.spec.ts
npx jest -t "test name pattern"  # Run specific test by name
```

## Architecture

### Module Structure
The application uses NestJS's modular architecture. Each feature is organized as a module containing:
- **Module**: Declares controllers, providers, and dependencies (e.g., `users.module.ts`)
- **Controller**: Handles HTTP requests and routes (e.g., `users.controller.ts`)
- **Service**: Contains business logic (e.g., `users.service.ts`)
- **DTOs**: Data transfer objects for validation (e.g., `create-user.dto.ts`, `update-user.dto.ts`)
- **Entities**: Data models (e.g., `user.entity.ts`)

Current modules:
- `AppModule` (src/app.module.ts:6-11) - Root module that imports all feature modules
- `UsersModule` (src/users/users.module.ts:5-9) - User management feature

### Entry Point
The application bootstraps from `src/main.ts`, creating a NestJS application instance and listening on port 3000 (or PORT env variable).

### Dependency Injection
NestJS uses constructor-based dependency injection. Services are injected into controllers via constructors (e.g., `UsersController` injects `UsersService` at src/users/users.controller.ts:17).

### DTOs and Validation
- The project uses `class-validator` and `class-transformer` for request validation
- DTOs define the structure of incoming data
- `UpdateUserDto` uses `PartialType` from `@nestjs/mapped-types` to create partial versions of DTOs

### RESTful Routing
Controllers use decorators for routing:
- `@Controller('path')` - Base route path
- `@Get()`, `@Post()`, `@Patch()`, `@Delete()` - HTTP methods
- `@Param()`, `@Body()` - Parameter extraction

Example: The users controller (src/users/users.controller.ts:15) handles routes under `/users`.

## Configuration

### TypeScript
- Module system: NodeNext with ES2023 target
- Decorators enabled for NestJS dependency injection
- Strict null checks enabled, but `noImplicitAny` is disabled

### Code Style
- ESLint with TypeScript support and Prettier integration
- Single quotes, trailing commas enforced by Prettier
- Notable ESLint rules:
  - `@typescript-eslint/no-explicit-any`: off
  - `@typescript-eslint/no-floating-promises`: warn
  - `@typescript-eslint/no-unsafe-argument`: warn

### Testing
- Jest is used for unit and e2e tests
- Unit test files: `*.spec.ts` files alongside source code
- E2e tests: Located in `test/` directory with separate Jest config
- Test coverage output to `coverage/` directory

## Development Patterns

### Creating New Resources
Use NestJS CLI to generate resources with proper structure:
```bash
nest generate resource <name>
```
This creates the full module structure (module, controller, service, DTOs, entities, tests).

### Test Structure
- Unit tests use `@nestjs/testing` to create testing modules
- E2e tests bootstrap the entire application and use `supertest` for HTTP requests
- Each test file should import necessary testing utilities and module dependencies

### Module Dependencies
When adding new modules, import them in `AppModule` (src/app.module.ts) to make them available application-wide.
