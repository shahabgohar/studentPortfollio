export default {
  data(){
    return{
      isLeft : false,
      handlerRef:null,
      isFirst:true,
      height:0
    }
  },
  methods:{
    displayHoverElement() {
      if (this.isFirst) {
        this.isFirst = false

        this.handlerRef = setInterval(() => {
          if (this.height <= 80) {
            if(this.height === 0){
              this.$refs['hover'].style.display="flex"
              this.$refs['append-child'].style.display = "block"
              this.$refs['hover'].appendChild(this.$refs['append-child'])
            }
            this.height += 10
            this.$refs['hover'].style.height = this.height + "%"
          } else {
            clearInterval(this.handlerRef)
          }
        }, 50).toExponential(2)
      }
    },
    removeHoverElement(){
      console.log("leave")
      this.isLeft = false
      this.isFirst = true
      this.$refs['hover'].style.display="none"
      if(this.$refs['hover'].hasChildNodes())
      this.$refs['hover'].removeChild(this.$refs['append-child'])
      this.$refs['hover'].style.height = "0%"
      this.height = 0
      clearInterval(this.handlerRef)
    }

  }
}
