import {default as styled} from 'react-emotion'
import CustomCategorySelector from './CustomCategorySelector'

export const CustomCategorySelectorComponentStyles
  = styled('div')`
  padding: 10px;
  margin: 0px;
  color: #000;
  background: #fff;

  .accented {
    color: red;
    cursor: pointer;
    float: right;
  }
`

export const CategorySelect = styled('select')`
  margin: 10px;
`
