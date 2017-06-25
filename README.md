# Haptic Movie File Reader

This is a typescript node/web library for parsing haptic movie files.
The following formats are supported:

- Vorze Interactive (CSV)
- Kiiroo (Javascript)
- Feelme (JSON)
- VirtualRealPlayer (INI)
- RealTouch (?)
- Funscript (JSON)

The library can autodetect format and load information from the files,
and given a time (in milliseconds), will return the closest command
available.

## Format Descriptions

Format descriptions are documented in
the [stpihkal documentation](https://metafetish.github.io/stpihkal).

## License

BSD 3-Clause. See LICENSE file for more info.
