export const state = ()=>(
  {
    path:"Home",
    options:[
      {
        name:"Home",
        color:"white",
        clicked:true
      },
      {
        name:"Expertise",
        color:"black",
        clicked: false
      },
      {
        name:"Contact",
        color:"black",
        clicked: false
      },
      {
        name:"Education",
        color:"black",
        clicked: false
      }
    ],
  }
)
export const mutations ={
  setPath(state,path){
    state.path =path
  },
  setRef(state,ref){
    state.selectedOptionRef = ref
  },
  setOptions(state,ref){
    state.options.push(ref)
    if(ref.name === "Home"){
      ref.el.style.color = "White"
    }
  },
  setOptionsMutate(state,name){

    state.options.forEach((e)=>{

      if(e.name === name){
        console.log(e.el)
        e.el.style.color = "white"
      }else{
        e.el.style.color = "black"
      }
    })
  }
}

export const getters = {
  getCurrentPath:state => {
    return state.path
  },
  getCurrentLocatorObject:(state,name) =>{

  },

}
