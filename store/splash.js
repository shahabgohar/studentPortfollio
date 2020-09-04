export const state = ()=>
  (
    {
      isSplash:true
    }
  )

export const mutations = {
  setIsSplash(state){
    state.isSplash = !state.isSplash
  }
}
