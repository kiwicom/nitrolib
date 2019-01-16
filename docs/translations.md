# Translations

## Adding new translations keys

1. Add keys to [Phrase App](https://retool.skypicker.com/presentation/phraseapp-upload) adn run `paexport` in logs-phraseapp Slack channel
2. Update package: `@kiwicom/translations`
3. Run `yarn fixtures` to create static files
4. Done 🎉

## Troubleshooting
- if your new key isn't used you could:
  - you can check `node_modules/@kiwicom/translations` and verify that new translation keys are there
  - check if you are using `withData` decorator in story
  - check `data/tkeys.json` file and verify that your key is there, if not you probably forgot to wrap it using `__("yourkey")` identity function
