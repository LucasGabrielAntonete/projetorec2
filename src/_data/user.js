import {ref} from 'vue'

const user = ref({
    primeiro: '',
    segundo: '',
    cartao: '',
    seguranca: '',  
    zip: ''
  })
  
let mostraFormularioFinal = ref(false)


function validacao() {  
    let mensagemErro = false
    let valido = true
    
      Object.keys(user.value).forEach((classe) => {
        if (typeof user.value[classe] === 'string') {
          if (user.value[classe] === '') {
           mensagemErro = true
           valido = false
          }
        }}
      )
      if(mensagemErro){
        valido = false
        alert("tem algum erro")
           }
           else if(valido){
            mostraFormularioFinal = true
           }}

export{ mostraFormularioFinal, user, validacao }