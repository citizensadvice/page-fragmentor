_default:
    @just --list

# Run formatters
format:
    just --fmt --unstable
    npm run format

alias fmt := format

# Setup the project
[group('setup')]
setup:
    npm install
    npx playwright install --with-deps chromium

# Run lint checks
[group('lint')]
lint:
    npm run lint

# Run unit tests
[group('test')]
test:
    npm test

# Run playwright
[group('test')]
playwright:
    bin/playwright-ci --quiet

# Run all checks
check-all: lint test playwright
