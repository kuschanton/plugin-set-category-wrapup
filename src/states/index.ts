import { AppState as FlexAppState } from '@twilio/flex-ui';
import { combineReducers, Action as ReduxAction } from 'redux';

import { CustomCategorySelectorState, reduce as CustomCategorySelectorReducer } from './CustomCategorySelectorState';

// Register your redux store under a unique namespace
export const namespace = 'add-category-on-wrap-up';

// Extend this payload to be of type that your ReduxAction is
export interface Action extends ReduxAction {
  payload?: any;
}

// Register all component states under the namespace
export interface AppState {
  flex: FlexAppState;
  'add-category-on-wrap-up': {
    customCategorySelector: CustomCategorySelectorState;
  };
}

// Combine the reducers
export default combineReducers({
  customCategorySelector: CustomCategorySelectorReducer
});
