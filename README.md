# Nitro

Docs:
* [Git](./docs/01git.md)
* [Folder structure](./docs/02structure.md)
* [Rendering](./docs/03rendering.md)
* [Shared components](./docs/04shared.md)
* [Translations](./docs/05translations.md)
* [Styled components](./docs/06styled.md)
* [GraphQL](./docs/07graphql.md)

Use **yarn** as a package manager.

### Scripts

Run `yarn gulp fetch` and `yarn relay:schema` before developing. You will need a `.env` file with secrets for this to work:

- `yarn start` - Dev server
- `yarn relay` - GraphQL

Static analysis:
- `yarn test`
- `yarn lint`
- `yarn flow`
- `yarn madge`

### Features

- [x] i18n
- [x] Branding
- [x] Storybook
- [x] Static rendering
