# Change log

## v2.0.0-rc.1

- Fix infinite loop with large areas of break-inside avoid
- Line box breaking can be disabled by setting `--widows` and `--orphans` to `0`
- Default styles now include `break-inside: avoid` for headings
- No break-points will not occur between table rows, including css tables, and not within table cells
- Better algorithm for relaxing breaking-inside avoid allows nested break-inside rules to be obeyed

## v1.0.0

- Added `data-fragmented-start` and `data-framented-end`

## v1.0.0-rc2

- Fixed a crash if a table is fragmented without a `<thead>`
