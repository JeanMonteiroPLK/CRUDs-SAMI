var listaDeEventos = []
var novoEvento
var id = 1
var data, horario, plataformaNumerada
var nomeUsuario = document.getElementById("nomeUsuario")

var objetoAtual
var posicao = -1
var idParaDeletar = document.getElementById("idRegistroDeletar")
var idParaEditar = document.getElementById("#")

// ----- CONSTRUTOR -----

function Evento(id, data, horario, plataforma) {
    this.id = id
    this.data = data;
    this.horario = horario;
    this.plataforma = plataforma;
}

// ----- CRUD -----

function cadastrarNovoEvento() {
    validaListaEventosDoLocalStorage()
    data = instanciaDataAtual()
    horario = instanciaHorarioAtual()
    plat = gerarSecaoPlataformaAleatoria()
    numPlat = gerarInteiroAleatorio(1, 20)
    plataformaNumerada = plat + numPlat
    novoEvento = new Evento(this.id, data, horario, plataformaNumerada)
    listaDeEventos.push(novoEvento)
    localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))

    if(nomeUsuario.value == ''){
        alert('Usuário [Fulano] registrou passagem pela plataforma')
    } else {
        alert(`Usuário [${nomeUsuario.value}] registrou passagem pela plataforma`)
    }
}

function listarTodosEventosSalvos() {
    document.querySelector('#listar').innerHTML = ''
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    if (listaDeEventos == null || listaDeEventos == '') {
        alert('Não há registros!')
    } else {
        var cabecalho = '<br> <<< REGISTROS >>> <br> <br> (ID / PLTF / DATA / HORÁRIO) <br>'
        var stringPrint = ''
        for (i = 0; i < listaDeEventos.length; i++) {
            objetoAtual = listaDeEventos[i]
            stringPrint += `<br> ${objetoAtual.id} | ${objetoAtual.plataforma} | ${objetoAtual.data} | ${objetoAtual.horario} <br>`
        }

        document.querySelector('#listar').innerHTML = cabecalho + stringPrint
    }
}

function deletarEventoPorId() {
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    if (!ehInputVazio(idParaDeletar.value)) {
        if (existeId(idParaDeletar.value)) {
            listaDeEventos.splice(posicao, 1)
            localStorage.setItem("eventosKey", JSON.stringify(listaDeEventos))
            alert('Registro deletado!')
        } else {
            alert(`O seguinte ID não existe: [${idParaDeletar.value}]`)
        }
    } else {
        alert("Campo não pode ser vazio!")
    }
}

function editarEventoPorId() {
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    if (!ehInputVazio(idParaEditar.value)) {
        if (existeId(idParaEditar.value)) {
            //Recebe valor do <select> de atributos do objeto com o 'id' encontrado
            //Lógica de substituição com valor recebido no <input> após o <select>
        } else {
            alert(`Este id [${idParaEditar.value}] não existe!`)
        }
    } else {
        alert("Campo não pode ser vazio!")
    }
}

// ----- VALIDAÇÕES -----

function validaListaEventosDoLocalStorage() {
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))
    if (listaDeEventos == null || listaDeEventos == '') {
        listaDeEventos = []
        this.id = 1
    } else {
        var ultimoIndice = (listaDeEventos.length) - 1
        this.id = (listaDeEventos[ultimoIndice].id) + 1
    }
}

function existeId(id) {
    var retorno = false
    listaDeEventos = JSON.parse(localStorage.getItem("eventosKey"))

    if(listaDeEventos == null || listaDeEventos == ''){
        alert('Não há registros!')
    } else {
        for (i = 0; i < listaDeEventos.length; i++) {
            if (listaDeEventos[i].id == id) {
                posicao = i
                retorno = true
            }
        }
    }
    return retorno
}

function ehInputVazio(input) {
    if (input == '' || input == null || input == undefined) {
        return true
    } else {
        return false
    }
}

// ----- BUILDERS -----

function instanciaDataAtual() {
    diasDaSemana = new Array("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")
    mesesDoAno = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
    data = new Date
    return `${diasDaSemana[data.getDay()]}, ${data.getDate()}/${mesesDoAno[data.getMonth()]}/${data.getFullYear()}`
}

function instanciaHorarioAtual() {
    agora = new Date();
    horas = agora.getHours();
    minutos = agora.getMinutes();
    segundos = agora.getSeconds();
    return `${horas}:${minutos}:${segundos}`
}

// ----- SIMULADORES -----

function gerarInteiroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarSecaoPlataformaAleatoria() {
    var letras = ['A', 'B', 'C', 'D', 'E']
    var index = gerarInteiroAleatorio(0, 4)
    return letras[index]
}
