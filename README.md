# Business Form Studio

A local, no-code form builder for business teams — design, preview, save, and share form schemas without writing a line of code.

## Overview

Business Form Studio lets a non-technical admin assemble a form (an application, a survey, an internal request form) from a palette of ready-made field types, configure each field's behavior, see exactly how the end user will experience it, and store the result locally for reuse. No server, no account system beyond a demo login screen — everything lives in the browser.

This project was built as a portfolio piece to demonstrate enterprise-grade frontend engineering practices: typed React, normalized Redux state, drag-and-drop UX, local persistence, schema import/export with runtime validation, and a clean separation between "editing" and "viewing" concerns.

## Business use case

A company admin needs to collect structured input from employees or customers — a vacation request, a customer feedback form, a support ticket intake — but doesn't want to wait on a developer every time the fields change. With Business Form Studio they can:

1. Drag fields from a palette onto a canvas.
2. Configure labels, placeholders, required flags, helper text, `select` options, and `number` min/max constraints.
3. Reorder and duplicate fields.
4. Preview the form exactly as an end user would see it.
5. Save the form locally, come back later, rename or delete it.
6. Export the form as a JSON schema to share or back up, and re-import it elsewhere.

## Features

**Form Builder**
- Six field types: Text Input, Textarea, Select, Checkbox, Date Picker, Number Input.
- Per-field settings: label, placeholder, required toggle, helper text, select options, number min/max.
- Drag-and-drop reordering with a dedicated drag handle (doesn't interfere with editing inputs).
- Duplicate and delete individual fields.
- Empty state when the canvas has no fields yet.

**Form Preview**
- A fully separate read-only rendering of the current form, using real Ant Design `Form.Item`s and required-field indicators — exactly what an end user would fill in.

**Local storage (IndexedDB via Dexie)**
- Save, load, rename, and delete named form templates.
- The currently open form lives in Redux; the list of saved templates is read on demand from IndexedDB — no duplicated source of truth.

**Import / Export**
- Export the current form as a downloadable JSON schema (`name`, `fields`, `exportedAt`, `version`).
- Import a JSON schema from disk, with runtime structural validation and clear error messages for malformed files.

**UX polish**
- Responsive layout: side-by-side panels on desktop, stacked panels on tablet/mobile.
- Toast notifications for save / load / import / delete outcomes.
- Confirmation dialogs before destructive actions (delete, reset).
- Dark / light theme toggle (Ant Design theme tokens, persisted to `localStorage`).

**Demo authentication**
- A local, mock login screen gates access to the builder (any non-empty username/password is accepted — there is no backend to authenticate against). Session persists in `localStorage`; a logout button clears it.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** — dev server and build tooling
- **Redux Toolkit** + **React Redux** — state for the form currently being edited and auth/session state
- **Ant Design** — component library and design tokens (including dark theme support)
- **@dnd-kit** (`core`, `sortable`, `utilities`) — drag-and-drop field reordering
- **Dexie** (IndexedDB wrapper) — local persistence of saved form templates
- **ESLint** + **Prettier** — linting and formatting

## Architecture

The core design rule: **the Builder and the Preview never share a component.** Builder components own editing UI (inputs, toggles, drag handles); Preview components only ever render read-only `Form.Item`s from the same `Field[]` data. This keeps "how a field is configured" and "how a field looks to an end user" independent, so either side can change without risking the other.

```
src/
├── components/        # UI components (one component, one responsibility)
│   ├── FieldPalette.tsx        # add-field buttons
│   ├── FormBuilder.tsx         # builder canvas + drag-and-drop context
│   ├── FieldSettingsCard.tsx   # per-field settings UI
│   ├── SortableFieldCard.tsx   # drag-and-drop wrapper around a settings card
│   ├── FormPreview.tsx         # read-only preview canvas
│   ├── PreviewField.tsx        # read-only rendering of a single field
│   ├── SaveFormButton.tsx      # save / update the current form
│   ├── LoadFormButton.tsx      # list, load, rename, delete saved forms
│   ├── ExportFormButton.tsx    # download current form as JSON
│   ├── ImportFormButton.tsx    # upload + validate a JSON schema
│   ├── ResetFormButton.tsx     # clear the current form
│   ├── ThemeToggle.tsx         # light/dark theme switch
│   ├── LoginPage.tsx           # demo login screen
│   ├── AuthGate.tsx            # gates the app behind the demo login
│   └── LogoutButton.tsx
├── store/
│   ├── slices/formSlice.ts     # the form currently open in the builder
│   ├── slices/authSlice.ts     # demo auth/session state
│   ├── store.ts                # Redux store setup
│   └── hooks.ts                # typed useAppDispatch / useAppSelector
├── db/
│   ├── formDb.ts                # Dexie database schema
│   └── formTemplateService.ts   # CRUD for saved form templates
├── theme/
│   ├── ThemeProvider.tsx        # dark/light ConfigProvider + persistence
│   └── themeContext.ts          # theme context + hook
├── types/form.ts                 # shared domain types (Field, FieldType, FormTemplate)
└── utils/
    ├── createField.ts            # default-field factory
    ├── schemaValidation.ts       # runtime validation for imported schemas
    └── authStorage.ts            # localStorage helpers for the demo session
```

**Where state lives, and why:**
- **Redux (`formSlice`)** holds only the form currently being edited (`id`, `name`, `fields`) — this is "what's on screen right now."
- **IndexedDB (Dexie)** is the source of truth for the list of *saved* templates. It is never mirrored into Redux; components that need the list (like `LoadFormButton`) query it directly and re-fetch on demand. This avoids keeping two copies of the same data in sync.
- **Redux (`authSlice`)** + `localStorage` hold the demo session — intentionally simple, since there's no real backend to check credentials against.
- **React Context (`ThemeProvider`)** holds the theme mode — a cross-cutting UI preference, not domain data, so it doesn't belong in the Redux store.

## How to run

Requirements: Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8).

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run lint      # run ESLint
```

## Screenshots

See [`docs/screenshots`](docs/screenshots) for the builder, preview, saved-forms list, and drag-and-drop in action.

## Demo

_Live demo link: TBD (pending deployment — see "Future improvements")._

## Future improvements

- Deploy to Vercel/Netlify and link a live demo here.
- Replace the demo login with real authentication (e.g. a lightweight backend or a BaaS like Supabase/Firebase Auth) if this ever needs to be more than a local tool.
- Add more field types (file upload, radio group, rating).
- Undo/redo history for builder edits.
- Multi-page / multi-step forms.
- Shareable, read-only public links for a saved form.
- Automated tests (component tests for the builder/preview split, unit tests for schema validation).
