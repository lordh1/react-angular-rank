import { combineReducers } from 'redux'
import { contributors } from './contributors'
import { contributor } from './contributor'
import { repos } from './repos'

const rootReducer = combineReducers({
  contributors,
  contributor,
  repos
})

export default rootReducer
