// selectors file
import { createSelector } from 'reselect'
import createFilterOptions from 'react-select-fast-filter-options'

// Create a search index optimized to quickly filter options.
// The search index will need to be recreated if your options array changes.
// This index is powered by js-search: https://github.com/bvaughn/js-search
// Reselect will only re-run this if options has changed
export const getIndexedOptions = (path) => createSelector(
  state => state[path],
  options => createFilterOptions({ options })
)
