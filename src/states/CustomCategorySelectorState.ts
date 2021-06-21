import { Action } from './index';
import {Manager} from '@twilio/flex-ui'

const ACTION_SUBMIT = 'SUBMIT';
const ACTION_SELECT_CATEGORY = 'SELECT_CATEGORY';

export interface CustomCategorySelectorState {
  selectedValue: string;
  submitted: boolean;
}

const initialState: CustomCategorySelectorState = {
  selectedValue: 'other',
  submitted: false
};

export class Actions {
  public static submit = (): Action => ({ type: ACTION_SUBMIT });
  public static selectCategory = (value: string): Action => ({ type: ACTION_SELECT_CATEGORY, payload: value });
}

export function reduce(state: CustomCategorySelectorState = initialState, action: Action) {
  switch (action.type) {
    case ACTION_SUBMIT: {
      console.log(`Submitted category: ${state.selectedValue}`)
      // TODO: call function to add category to the task attributes in TaskRouter
      return {
        ...state,
        submitted: true,
      };
    }

    case ACTION_SELECT_CATEGORY: {
      return {
        ...state,
        selectedValue: action.payload
      };
    }

    default:
      return state;
  }
}
