import { Action } from './index';
import {Manager} from '@twilio/flex-ui'
import {addTaskAttribute} from '../helper/AddTaskAttributeHelper'

const ACTION_LOAD_STATE = 'LOAD_STATE';
const ACTION_SUBMIT = 'SUBMIT';
const ACTION_SELECT_CATEGORY = 'SELECT_CATEGORY';

export interface CustomCategorySelectorState {
  taskSid?: string;
  selectedValue: string;
  submitted: boolean;
}

const initialState: CustomCategorySelectorState = {
  taskSid: undefined,
  selectedValue: 'other',
  submitted: false
};

export class Actions {
  public static loadState = (taskSid: string): Action => ({ type: ACTION_LOAD_STATE, payload: taskSid});
  public static submit = (): Action => ({ type: ACTION_SUBMIT });
  public static selectCategory = (value: string): Action => ({ type: ACTION_SELECT_CATEGORY, payload: value });
}

export function reduce(state: CustomCategorySelectorState = initialState, action: Action) {
  switch (action.type) {
    case ACTION_LOAD_STATE: {
      console.log(`Loaded state taskSid: ${state.taskSid}`)
      return {
        ...state,
        taskSid: action.payload,
      };
    }
    case ACTION_SUBMIT: {
      console.log('Submitted category:', state)
      const manager = Manager.getInstance();
      addTaskAttribute(manager.user.token, state.taskSid!!, 'customCategory', state.selectedValue)
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
