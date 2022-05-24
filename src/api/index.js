// Sets up our API route for the frontend to use our data from the database.
const ApiURL = "http://localhost:4000/api/";
// This sets up our register user API call that we can use to make a new user.
 const registerUser = async (name, email, username, password) => {
   console.log("inside index js api FE", name, email, username, password)
  try {
    const response = await fetch(
      `/api/user/register`, 
      {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
          name,
          email,
          username,
          password
        }),
      },
      );
      const data = await response.json();
      // console.log("DATA!!!", data)
      return data;
    } catch (error) {
    console.error("error", error);
  }
};
// This API call connects to the login user route we created on the backend.
export const userLogin = async (username, password) => {
  try {
    const response = await fetch(`${ApiURL}user/login`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};


const getUserProfile = async (token) => {
  const result = await fetch(`${ApiURL}/user/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await result.json();
  return data;
};


// This API call connects with the get all platforms route we created on the backend.

export const getPlatforms = async()=> {
try{
  const response = await fetch(`${ApiURL}platform`,{
  headers:{
    "Content-Type": "application/json",
  },
  })
  const data = response.json()
  return data
} catch(error){
  console.error(error)
}
} 

export const getPlatformGames = async()=>{
  try{
const response = await fetch(`${ApiURL}platformGames`, {
  headers: {
    "Content-Type": "application/json"
  }
})
const data = response.json()
return data
  }catch(error){
console.error(error)
  }
}

const getGames = async () => {
  const result = await fetch(`/api/games`)
  
  const data = await result.json();
  console.log(data, "----RESULT----")
  return data;
};

const getGameById = async(gameId) =>{
  const result = await fetch(`/api/games/${gameId}`)
  const data = await result.json()
  return data
}

const createGameCartItem = async (user, game, quantity, token) => {
  const result = await fetch(`${ApiURL}cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      usersId: +user.id,
      gamesId: +game.id,
      hardwareId: null,
      quantity,
      total_cost: +(quantity)*+(game.cost)
    }),
  });
  const data = await result.json();
  console.log(data, "DATA IN INDEX API FE")
  return data;
};

const getCartByUserId = async (user) => {
  const userId = user.id
  
  const result = await fetch(`/api/cart/${userId}`)

  const data = await result.json()
  console.log(data, "FETCH CART USER")
  return data
}

const deleteCartItem = async(cartItemId, token)=>{
  const result = await fetch(`/api/cart/${cartItemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    
  })
  console.log(result, "INSIDE DELETE API FRONTEND")
  return result
}


export {getGames, getGameById, registerUser, getUserProfile, createGameCartItem, getCartByUserId, deleteCartItem}

