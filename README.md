# Business Form Studio

A local, no-code form builder — design, configure, preview, and save business forms without writing code.

## Business use case

A company admin needs to collect structured input (a vacation request, a feedback form, a support ticket) without waiting on a developer every time the fields change. They drag fields onto a canvas, configure each one, preview exactly what an end user will see, save the form locally, and export/import it as JSON to share or back up.

## Features

- Six field types: Text Input, Textarea, Select, Checkbox, Date Picker, Number Input.
- Per-field settings: label, placeholder, required toggle, helper text, select options, number min/max.
- Drag-and-drop reordering, duplicate and delete fields.
- A fully separate, read-only Preview built from real Ant Design `Form.Item`s.
- Save, load, rename, and delete named forms — persisted locally in IndexedDB (Dexie).
- Export/import a form as a JSON schema, with runtime validation on import.
- Light/dark theme, responsive layout, confirmation dialogs before destructive actions.
- Demo login screen gating the app (any credentials work — there's no real backend).

## Tech stack

React 19 + TypeScript, Vite, Redux Toolkit, Ant Design, @dnd-kit, Dexie (IndexedDB), ESLint + Prettier.

## Architecture

The core rule: **the Builder and the Preview never share a component.** `FieldSettingsCard` and `FieldPalette` own all editing UI; `PreviewField` only ever renders a read-only field from the same `Field[]` data. Either side can change without risking the other.

The form currently being edited lives in Redux (`formSlice`). The list of saved templates lives only in IndexedDB and is queried on demand — it's never duplicated into Redux.

## How to run

Requirements: Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8).

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run lint      # run ESLint
```

## Future improvements

- Deploy to Vercel/Netlify and link a live demo here.
- Replace the demo login with real authentication if this ever needs a real backend.
- Code-split the bundle — antd, dnd-kit, and dexie currently ship in a single ~1.1 MB chunk.
- More field types (file upload, radio group, rating), undo/redo, multi-step forms.
- Automated tests for the builder/preview split and schema validation.
