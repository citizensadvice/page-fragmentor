# Change log

## v2.0.0-alpha.4

- Fix parent margin, padding and borders not being accounted for when fragmenting

## v2.0.0-alpha.1

- Fix infinite loop with large areas of break-inside avoid
- Line box breaking can be disabled by setting `--widows` and `--orphans` to `0`
- Default styles now include `break-inside: avoid` for headings
- No break-points will not occur within a table rows, including css tables
- Better algorithm for `break-inside: avoid` where a forced break is required
- `data-fragmented-start` and `data-framented-end` will be added to all fragmented elements and not just the top ancenstor

## v1.0.0

- Added `data-fragmented-start` and `data-framented-end`

## v1.0.0-rc2

- Fixed a crash if a table is fragmented without a `<thead>`
