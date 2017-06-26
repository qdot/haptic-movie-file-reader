# Haptic Movie File Reader

[![Build Status](https://travis-ci.org/qdot/systray-rs.svg?branch=master)](https://travis-ci.org/metafetish/haptic-movie-file-reader) [![codecov](https://codecov.io/gh/metafetish/haptic-movie-file-reader/branch/master/graph/badge.svg)](https://codecov.io/gh/metafetish/haptic-movie-file-reader) [![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)

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
