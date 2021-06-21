import React, {useState} from 'react'

import {CategorySelect, CustomCategorySelectorComponentStyles} from './CustomCategorySelectorStyles'
import {StateToProps, DispatchToProps} from './CustomCategorySelector.Container'

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
      <CategorySelect id='categorySelect' onChange={handleChange} disabled={props.submitted}>
        <option value='other'>Other</option>
        <option value='prepaid'>Prepaid</option>
        <option value='contract'>Contract</option>
      </CategorySelect>
      <button onClick={props.submit} disabled={props.submitted}>
        Submit
      </button>
    </CustomCategorySelectorComponentStyles>
  )
}

export default CustomCategorySelector
