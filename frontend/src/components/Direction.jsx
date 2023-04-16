import { ImCross } from 'react-icons/im'

function Direction({ text, keyid, onChangeDirectionInfo, onDeleteRecipeDirection }) {

    return (
    <li className='recipe-form-direction' key={keyid}>
        <label htmlFor="recipe-direction"></label>
        <textarea name='text' value={text} keyid={keyid} onChange={(e)=>onChangeDirectionInfo(e,keyid)} className='recipe-form-textarea direction-textarea' id='recipe-direction'/>
        <button className='delete-form-item-button direction-delete-button' onClick={(e)=>onDeleteRecipeDirection(e, keyid)}><ImCross/></button>
    </li>
    )
}

export default Direction