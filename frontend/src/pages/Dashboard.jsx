import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RecipeForm from '../components/RecipeForm'
import Recipe from '../components/Recipe'

function Dashboard() {
  const navigate = useNavigate()
  const [recipeList, setRecipeList] = useState([])
  const [recipeModalInfo, setRecipeModalInfo] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    // console.log('ran effect')
    if(!localStorage.getItem('user')) {
      navigate('/Login')
      return
    }

    const user = JSON.parse(localStorage.getItem('user'))

    fetch('https://cookbookapi.onrender.com/api/recipes', {
      headers:{
        authorization: `Bearer ${user.token}`
      }
    })
    .then(response=>{
      if(!response.ok) {
        throw Promise.reject(response)
      }
      return response.json()
    })
    .then(data=>{
      setRecipeList(data)
    })
    .catch(error=>{
      setError(true)
      error.json().then(err=>console.log(`ERROR: ${err}`))
    })

  }, [navigate])
  

  return (
    <main className='dashboard-container'>
      <RecipeForm setRecipeList={setRecipeList} recipeEditInfo={recipeModalInfo} setRecipeModalInfo={setRecipeModalInfo}/>
      {error&&<div className='recipe-modal'><button onClick={()=>setError(false)} className='close-modal-button'>x</button> There was an issue retrieving your recipes. Please try again later.</div> }
      <h2 className='recipes-title'>Your Recipes</h2>
      {recipeList.length===0?
      (<div className='no-recipes-text'>No recipes to display yet!</div>)
      :(<ul className='recipes'>
        {recipeList.map(recipe=>(
          <Recipe setRecipeList={setRecipeList} setRecipeModalInfo={setRecipeModalInfo} key={recipe._id} recipeID={recipe._id} recipeName={recipe.name} ingredients={recipe.ingredients} directions={recipe.directions} time={recipe.time} description={recipe.description}/>
        ))}
      </ul>)}
      
    </main>
  )
}

export default Dashboard