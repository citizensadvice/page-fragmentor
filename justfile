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
    npm run playwright

# Run playwright in UI mode
[group('test')]
playwright-ui:
    npm run playwright:ui

# Show playwright report
[group('test')]
playwright-report:
    npx playwright show-report --host 0.0.0.0 --port 9323

# Run all checks
check-all: lint test playwright
