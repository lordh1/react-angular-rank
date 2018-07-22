import { combineReducers } from 'redux'
import { contributors } from './contributors'
import { contributor } from './contributor'
import { repos } from './repos'
import { repo } from './repo'

const rootReducer = combineReducers({
  contributors,
  contributor,
  repos,
  repo
})

export default rootReducer
