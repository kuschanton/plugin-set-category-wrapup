import React, {useState} from 'react'

import {CategorySelect, CustomCategorySelectorComponentStyles} from './CustomCategorySelectorStyles'
import {StateToProps, DispatchToProps} from './CustomCategorySelector.Container'
import {withTaskContext} from '@twilio/flex-ui'
import {CustomCategoryName} from '../../constants/CustomCategoryName'

interface OwnProps {
  // Props passed directly to the component
}

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = StateToProps & DispatchToProps & OwnProps;

// It is recommended to keep components stateless and use redux for managing states
const CustomCategorySelector = (props: Props) => {

  const handleChange = (e: any) => {
    props.selectCategory(e.target.value)
  }

  return (
    <CustomCategorySelectorComponentStyles>
      <div>Select category for this task:</div>
      <CategorySelect id="categorySelect" onChange={handleChange} disabled={props.submitted}>
        <option value="other">Other</option>
        <option value="prepaid">Prepaid</option>
        <option value="contract">Contract</option>
      </CategorySelect>
      <button onClick={props.submit} disabled={props.submitted}>
        Submit
      </button>
      <StateLoader loadState={props.loadState}/>
    </CustomCategorySelectorComponentStyles>
  )
}

export default CustomCategorySelector

class StateLoaderComponent extends React.Component<StateLoaderProps> {
  constructor(props: StateLoaderProps) {
    super(props)
  }

  render() {
    this.props.loadState(this.props.task.taskSid, !!this.props.task.attributes[CustomCategoryName])
    console.log('StateLoaderComponent props', this.props.task)
    return null
  }
}

type StateLoaderProps = {
  task: {
    taskSid: string,
    attributes: any
  },
  loadState: (taskSid: string, hasCustomCategory: boolean) => void
}

const StateLoader =
  withTaskContext<StateLoaderProps, typeof StateLoaderComponent>(StateLoaderComponent)