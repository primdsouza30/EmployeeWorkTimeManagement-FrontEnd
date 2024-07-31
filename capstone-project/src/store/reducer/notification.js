const intialState ={
    list: []
}

const notification = (state=intialState,action)=>{
      if(action.type === 'GET_ALL_NOTIFICATION'){
        let temp = action.payload; 
        return {...state, list: temp}
      }

    return state; 
}

export default notification;