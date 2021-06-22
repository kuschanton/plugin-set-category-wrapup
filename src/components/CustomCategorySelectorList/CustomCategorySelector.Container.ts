import { AppState } from '../../states';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Actions } from '../../states/CustomCategorySelectorState';
import CustomCategorySelector from './CustomCategorySelector';

export interface StateToProps {
  submitted: boolean;
}

export interface DispatchToProps {
  loadState: (taskSid: string) => void;
  submit: () => void;
  selectCategory: (value: string) => void;
}

const mapStateToProps = (state: AppState): StateToProps => ({
  submitted: state['add-category-on-wrap-up'].customCategorySelector.submitted,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  loadState: bindActionCreators(Actions.loadState, dispatch),
  submit: bindActionCreators(Actions.submit, dispatch),
  selectCategory: bindActionCreators(Actions.selectCategory, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCategorySelector);