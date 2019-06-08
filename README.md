# dark-moe: a fork of Dark Reader

This extension is a fork of [Dark Reader](https://github.com/darkreader/darkreader) that removes some features I didn't want. Changes made include:

 - remove news functionality
 - remove social links on extension popup
 - remove Halloween mode

This fork is not distributed on the Chrome Web Store; it is shared in the spirit of FOSS and for educational purposes. I recommend that if you want up-to-date themes, bug fixes, and features, you use and contribute to [Dark Reader](https://github.com/darkreader/darkreader) itself.

## Development

```bash
npm install
npm run debug
```

Then go to `chrome://extensions` and `Load unpacked` the `debug/` folder.


## Distribution

```bash
npm install
npm run release
```

This will generate `build.zip` for use in Chromium browsers and `build-firefox.xpi` for use in Firefox.
