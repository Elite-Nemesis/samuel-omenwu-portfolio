---
title: How this portfolio is built
date: 2026-10-10
summary: Why I kept this site small, using React, TypeScript, Vite, and plain CSS, and where its content lives.
tags: react, typescript, web
draft: true
---

> **Draft — review before publishing.** This describes the site's actual setup, but rewrite it in your own words and only keep points you can explain. Then set `draft: false`.

## The goal

A portfolio should load quickly, work for everyone, and be easy to update. I wanted the code to be small enough that I can explain every part of it.

## The stack

- **React + TypeScript** for components. TypeScript checks that every project has the fields the page expects, so a missing field is a build error instead of a blank spot on the live site.
- **Vite** for the dev server and production build. The output is plain static files (HTML, CSS, JavaScript), so it can be hosted almost anywhere.
- **Plain CSS with custom properties** (CSS variables) for colors, spacing, and dark mode. No CSS framework.
- **Markdown** for these notes. Each post is a `.md` file, and Vite bundles them at build time.

## Content is data

Projects, skills, and contact links live in TypeScript files under `src/content/`. Components only decide how things look. To add a project, I edit a data file and don't touch layout code.

## Unfinished content can't leak

Any detail I haven't written yet is marked with `todo("...")`. In development it shows as a dashed placeholder box. In the production build it's removed, so the live site never shows something that isn't finished or true.

## Routing without a server

Notes use URLs like `#/notes/how-this-site-is-built`. Everything after `#` is handled in the browser, so the host only ever serves one `index.html`. That means no server rewrite rules, and the same build works on any static host.

## Accessibility

A skip link, real headings and landmarks, visible keyboard focus, color contrast checked against WCAG AA, and animation that turns off when the system "reduce motion" setting is on.
