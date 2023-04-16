import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useState } from 'react'
import { ImCross } from 'react-icons/im'
import Spinner from './Spinner'

function Recipe({ recipeName, time, description, directions, ingredients, recipeID, setRecipeModalInfo, setRecipeList }) {
    const parsedIngredients = JSON.parse(ingredients)
    const parsedDirections = JSON.parse(directions)
    const [isRecipeModal, setIsRecipeModal] = useState(false)
    const [deleteRecipeModal, setDeleteRecipeModal] = useState(false)
    const [deletePending, setDeletePending] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [deleteError, setDeleteError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onDeleteRecipe = (e, id) => {
        e.preventDefault()
        setDeletePending(true)
        const user = JSON.parse(localStorage.getItem('user'))
    
        fetch(`https://cookbookapi.onrender.com/api/recipes/${id}`, {
            method:'DELETE',
            headers:{
            authorization: `Bearer ${user.token}`
        }
        })
        .then(response=>{
            if(!response.ok) {
                throw response
            }
            return response.json()
        })
        .then(data=>{
            setDeletePending(false)
            setDeleteSuccess(true)
        })
        .catch(error=>{
            setDeletePending(false)
            setDeleteError(true)
            error.json().then(err=>setErrorMessage(err))
        })
        setDeleteRecipeModal(false)
        setIsRecipeModal(false)
        }

    return (
    <>
    <li className="recipe">
        <div className="recipe-header">
            <div>
                <h2 className='recipe-name'>{recipeName}</h2>
                <p className='recipe-time'>{time}</p>
            </div>
            <div onClick={()=>setIsRecipeModal(!isRecipeModal)} 
            className='recipe-edit-button' tabIndex={0}>
                <HiOutlineDotsHorizontal/>
            </div>
        </div>
        <p className='recipe-description'>{description}</p>
        <h3>Ingredients</h3>
        <ul className="recipe-ingredients">
            {parsedIngredients.map(ingredient=>(
                <li key={ingredient.id} className="recipe-ingredient">
                    <span className='ingredient-amount'>- {ingredient.amount}</span>
                    <span className='ingredient-unit'> {ingredient.unit} </span>
                    <span className='ingredient-name'>{ingredient.name}</span>
                </li>
            ))}
        </ul>
        <ol className='recipe-directions'>
            <h3>Directions</h3>
            {parsedDirections.map(direction=>(
                <li key={direction.id} className="recipe-direction">
                    {direction.text}
                </li>
            ))}
        </ol>
    </li>
    {isRecipeModal&&<div className='recipe-modal'>
        <button onClick={()=>{setRecipeModalInfo({})
            setIsRecipeModal(!isRecipeModal)}} className='close-modal-button'><ImCross/></button>
        What would you like to do with {recipeName}?
        <button onClick={()=>{setRecipeModalInfo({recipe:recipeName,time, description, id:recipeID, directions:parsedDirections, ingredients:parsedIngredients})
            setIsRecipeModal(!isRecipeModal)}} className='recipe-modal-edit-button modal-button'>EDIT</button>
        <button onClick={()=>{
        setIsRecipeModal(!isRecipeModal)
        setDeleteRecipeModal(!deleteRecipeModal)}} className='recipe-modal-delete-button modal-button'>DELETE</button>
    </div>}
    {deleteRecipeModal&&<div className='recipe-modal'>
        <button onClick={()=>{setDeleteRecipeModal(!deleteRecipeModal)}} className='close-modal-button'><ImCross/></button>
        This is irreversible. <br/> Are you sure you want to <strong>DELETE</strong> {recipeName}?
        <button onClick={(e)=>onDeleteRecipe(e, recipeID)} className='recipe-modal-yes-delete-button modal-button'>Yes</button>
        <button onClick={()=>{setDeleteRecipeModal(!deleteRecipeModal)}} className='recipe-modal-no-delete-button modal-button'>No</button>
    </div>}
    {deletePending&&<div className='recipe-modal delete-loading-modal'><p>Deleting...</p><Spinner/></div>}
    {deleteSuccess&&<div className='recipe-modal'><button className='close-modal-button' onClick={()=>{
        setRecipeList(prevState=>prevState.filter(recipe=>recipe._id!==recipeID))
        setDeleteSuccess(false)}}><ImCross/></button><p>Delete Successful</p></div>}
    {deleteError&&<div className='recipe-modal'><button className='close-modal-button' onClick={()=>setDeleteError(false)}><ImCross/></button><p><strong>Delete Error.</strong><br/> {errorMessage||`Try Again Later.`}</p></div>}
    </>
)
}

export default Recipe