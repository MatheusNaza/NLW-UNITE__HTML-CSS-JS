
let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: new Date(2024, 2, 25, 20, 20)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: new Date(2024, 0, 4, 20, 20)
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: new Date(2023, 11, 5, 20, 20)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: new Date(2023, 9, 7, 20, 20)
  },
  {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Lucas Sousa",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Paula Costa",
    email: "paula@gmail.com",
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: new Date(2023, 6, 10, 20, 20)
  },
  {
    nome: "Gabriel Almeida",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: new Date(2023, 5, 11, 20, 20)
  }
];

const criarnovoparticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  if (participante.dataCheckIn == null) {
    dataCheckIn = `
  <button 
  data-email="${participante.email}"
  onclick= fazercheckin(event)
  >
  confirmar check-in
  </button>
  `

  }
  return ` 
   <tr>
        <td>
          <strong>
           ${participante.nome}
          </strong>
          <br>
          <small>
           ${participante.email}
          </small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr> 
  `
}


const atualizarlista = (participantes) => {
  let output = " "
  for (let participante of participantes) {
    output = output + criarnovoparticipante(participante)

  }

  document.querySelector('tbody')
    .innerHTML = output

}

atualizarlista(participantes)

const adicionarparticipante = (event) => {
  event.preventDefault()

  const dadosdoformulario = new FormData(event.target)

  const participante = {
    nome: dadosdoformulario.get('nome'),
    email: dadosdoformulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
  const participanteexiste = participantes.find(
    (p) => p.email == participante.email
  )
  if (participanteexiste) {
    alert('email ja cadastrado !!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarlista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazercheckin = (event) => {

  const mensagemconfirmacao = ("tem certeza que deseja fazer o check-in ?? ")
  if (confirm(mensagemconfirmacao) == false) {
    return
  }


  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  participante.dataCheckIn = new Date()

  atualizarlista(participantes)
}







