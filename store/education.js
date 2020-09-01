export const state = ()=>(
  {
    current:null
  }
)
export const mutations={
  changeCurrent(state,path){
    state.current = path
  }
}
