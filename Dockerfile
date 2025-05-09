FROM mcr.microsoft.com/playwright:v1.52.0-noble

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY tsconfig.json playwright.config.ts eslint.config.mjs ./
COPY .prettierrc.json* .eslintignore* .prettierignore* ./
COPY .gitignore* ./

COPY src/ ./src/
COPY tests/ ./tests/