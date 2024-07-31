const intialState ={
    list: []
}

const tasks = (state=intialState,action)=>{
      if(action.type === 'GET_ALL_TASKS'){
        let temp = action.payload; 
        return {...state, list: temp}
      }

    return state; 
}

export default tasks;