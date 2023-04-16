import { ImCross } from 'react-icons/im'

function Ingredient({ unit, amount, name, keyid, onChangeRecipeIngredient, onDeleteRecipeIngredient }) {

    return (
    <li key={keyid} className='recipe-ingredient-container'>
            <label htmlFor="ingredient-amount">Amount:</label>
            <input name='amount' value={amount} onChange={(e)=>onChangeRecipeIngredient(e, keyid)} className='recipe-form-input ingredient-amount ingredient-info' type="text" id='ingredient-amount'/>
            <label htmlFor="ingredient-unit">Unit:</label>
            <input placeholder='Not Required' name='unit' value={unit} onChange={(e)=>onChangeRecipeIngredient(e, keyid)} className='recipe-form-input ingredient-unit ingredient-info' list='ingredient-units' id='ingredient-unit'/>
            <datalist id='ingredient-units'>
                <option value="handfuls"></option>
                <option value="pinches"></option>
                <option value="cups"></option>
                <option value="tbsp."></option>
                <option value="tsp."></option>
                <option value="oz."></option>
                <option value="lbs."></option>
            </datalist>
            <label htmlFor="ingredient-name">Name:</label>
            <input value={name} name='name' onChange={(e)=>onChangeRecipeIngredient(e, keyid)} className='recipe-form-input ingredient-name ingredient-info' type="text" id='ingredient-name'/>
            <button className="delete-form-item-button ingredient-delete-button" onClick={(e)=>onDeleteRecipeIngredient(e, keyid)}><ImCross/></button>
    </li>
    )
}

export default Ingredient