# Translations

## Adding new translations keys

1. Add keys to [Phrase App](https://retool.skypicker.com/presentation/phraseapp-upload) and run `paexport` in the _#logs-phraseapp_ Slack channel
2. Update `@kiwicom/translations`
3. Run `yarn fixtures` to update static files
4. Done 🎉

## Troubleshooting

If your new key isn't used, you could:
- check `node_modules/@kiwicom/translations` and verify that new translation keys are there
- check if you are using `withData` decorator in storybook
- check `data/tkeys.json` file and verify that your key is there, if not you probably forgot to wrap it using the `__("yourkey")` function
