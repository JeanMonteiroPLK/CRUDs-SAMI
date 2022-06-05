var listaDeUsuarios = []
var listaDeResponsaveis = []
var objetoAtual
var posicao
// ---- USUÁRIO -----
var novoUsuario
var novoEndereco
var novoID

var id, nome, cpf, senha, endereco
var cidade, bairro, rua, numero, complemento
// ----- RESPONSÁVEL -----
/*
var selectResp = document.querySelector('#responsavel')
selectResp.addEventListener('change', function () { })

var novoResponsavel
var novoEnderecoResponsavel
var novoIDResponsavel
var idTitular

var idResp, nomeResp, cpfResp, senhaResp, enderecoResp
var cidadeResp, bairroResp, ruaResp, numeroResp, complementoResp
*/
var selectAtributosUsuario = document.querySelector('#atributo')
selectAtributosUsuario.addEventListener('change', function () { })

// ----- INPUTS HTML USUÁRIO-----

var nomeInput = document.getElementById("nome")
var cpfInput = document.getElementById("cpf")
var senhaInput = document.getElementById("senha")

var cidadeInput = document.getElementById("cidade")
var bairroInput = document.getElementById("bairro")
var ruaInput = document.getElementById("rua")
var numeroInput = document.getElementById("numero")
var complementoInput = document.getElementById("complemento")

var idParaBuscar
var idParaDeletar = document.getElementById("idParaDeletar")
var idParaEditar = document.getElementById("idParaEditar")
var novoValorEditar = document.getElementById("novoValorEditar")

// ----- INPUTS HTML RESPONSÁVEL -----
/*
var nomeRespInput = document.getElementById("nomeResp")
var cpfRespInput = document.getElementById("cpfResp")
var senhaRespInput = document.getElementById("senhaResp")

var cidadeRespInput = document.getElementById("cidadeResp")
var bairroRespInput = document.getElementById("bairroResp")
var ruaRespInput = document.getElementById("ruaResp")
var numeroRespInput = document.getElementById("numeroResp")
var complementoRespInput = document.getElementById("complementoResp")
*/

// ----- CONSTRUTORES DOS OBJETOS -----

function Usuario(id, nome, cpf, senha, endereco) {
    this.id = id
    this.nome = nome
    this.cpf = cpf
    this.senha = senha
    this.endereco = endereco
}

function Endereco(cidade, bairro, rua, numero, complemento) {
    this.cidade = cidade
    this.bairro = bairro
    this.rua = rua
    this.numero = numero
    this.complemento = complemento
}
/*
function Responsavel(idResp, nomeResp, cpfResp, senhaResp, enderecoResp) {
    this.idResp = idResp
    this.nomeResp = nomeResp
    this.cpfResp = cpfResp
    this.senhaResp = senhaResp
    this.enderecoResp = enderecoResp
}

function EnderecoResponsavel(cidadeResp, bairroResp, ruaResp, numeroResp, complementoResp) {
    this.cidadeResp = cidadeResp
    this.bairroResp = bairroResp
    this.ruaResp = ruaResp
    this.numeroResp = numeroResp
    this.complementoResp = complementoResp
}
*/

// ----- CRUD -----

function cadastrarNovoUsuario() {
    validaListaUsuariosDoLocalStorage()
    novoID = gerarIdAleatorio(1, 100)
    id = novoID

    novoEndereco = criarObjetoEndereco()
    novoUsuario = criarObjetoUsuario()

    if (!ehListaVazia(listaDeUsuarios)) {
        if (cpfUsuarioEstaCadastrado(novoUsuario.cpf)) {
            return
        }

        // Certifica que ID gerado é único
        while (existeId(novoUsuario.id)) {
            novoID = gerarIdAleatorio(1, 100)
            novoUsuario.id = novoID
        }
    }

    /*
    if (selectResp.value == 'sim') {
        idResp = novoUsuario.id

        novoEnderecoResponsavel = criarObjetoEnderecoResponsavel()
        novoResponsavel = criarObjetoResponsavel()

        if (!ehListaVazia(listaDeResponsaveis)) {
            if (cpfResponsavelEstaCadastrado(novoResponsavel.cpf)) {
                return
            }
        }
    }
    */

    listaDeUsuarios.push(novoUsuario)
    localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))

    alert('Novo usuário cadastrado!')

}

function listarTodosUsuariosSalvos() {
    document.querySelector('#listar').innerHTML = ''
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (listaDeUsuarios == null || listaDeUsuarios == '') {
        alert('Não há registros!')
    } else {
        var cabecalho = '<br> <<< REGISTROS >>> <br> <br> (ID / NOME / CPF) <br>'
        var stringPrint = ''
        for (i = 0; i < listaDeUsuarios.length; i++) {
            objetoAtual = listaDeUsuarios[i]
            stringPrint += `<br> ${objetoAtual.id} | ${objetoAtual.nome} | ${objetoAtual.cpf} <br>`
        }
        document.querySelector('#listar').innerHTML = cabecalho + stringPrint
    }
}

function deletarUsuarioPorId() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (!ehInputVazio(idParaDeletar.value)) {
        if (existeId(idParaDeletar.value)) {
            listaDeUsuarios.splice(posicao, 1)
            localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))
            alert('Usuário deletado!')
        } else {
            alert(`O seguinte ID não existe: [${idParaDeletar.value}]`)
        }
    } else {
        alert("Campo não pode ser vazio!")
    }
}

function editarUsuario() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (!ehInputVazio(idParaEditar.value)) {
        if (existeId(idParaEditar.value)) {
            switch (selectAtributosUsuario.value) {
                case 'nome':
                    listaDeUsuarios[posicao].nome = novoValorEditar.value
                    break
                case 'cpf':
                    listaDeUsuarios[posicao].cpf = novoValorEditar.value
                    break
                case 'senha':
                    listaDeUsuarios[posicao].senha = novoValorEditar.value
                    break

                /* Validar com Lucas sobre como abrir um <select> a partir de uma <option> de outro <select>
                    case 'endereco':
                    listaDeUsuarios[posicao].endereco = novoValorEditar.value
                    break
                */

            }
            localStorage.setItem("usuariosKey", JSON.stringify(listaDeUsuarios))
        } else {
            alert(`Este id [${idParaEditar.value}] não existe!`)
        }
    } else {
        alert("Campo não pode ser vazio!")
    }
}


// ----- VALIDAÇÕES -----

function validaListaUsuariosDoLocalStorage() {
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    if (ehListaVazia(listaDeUsuarios)) {
        listaDeUsuarios = []
    }
}
/*
function validaListaResponsaveisDoLocalStorage() {
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    if(ehListaVazia(listaDeResponsaveis)){
        listaDeResponsaveis = []
    }
}
*/
function existeId(idCheck) {
    var retorno = false
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    for (i = 0; i < listaDeUsuarios.length; i++) {
        if (listaDeUsuarios[i].id == idCheck) {
            posicao = i
            retorno = true
        }
    }
    return retorno
}

function cpfUsuarioEstaCadastrado(cpfCheck) {
    var retorno = false
    listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosKey"))
    for (i = 0; i < listaDeUsuarios.length; i++) {
        if (listaDeUsuarios[i].cpf == cpfCheck) {
            alert(`CPF [${cpfCheck}] já cadastrado!`)
            retorno = true
        }
    }
    return retorno
}
/*
function cpfResponsavelEstaCadastrado(cpfCheck) {
    var retorno = false
    listaDeResponsaveis = JSON.parse(localStorage.getItem("responsaveisKey"))
    for (i = 0; i < listaDeResponsaveis.length; i++) {
        if (listaDeResponsaveis[i].cpf == cpfCheck) {
            alert(`CPF [${cpfCheck}] já cadastrado!`)
            retorno = true
        }
    }
    return retorno
}
*/
function ehInputVazio(input) {
    var retorno = false
    if (input == '' || input == null || input == undefined) {
        retorno = true
    }
    return retorno
}

function ehListaVazia(lista) {
    if (lista == null || lista == '' || lista == undefined) {
        return true
    }
    return false
}


// ----- BUILDERS -----

function criarObjetoUsuario() {
    var objetoUsuario = new Usuario(
        id,
        nomeInput.value,
        cpfInput.value,
        senhaInput.value,
        novoEndereco
    )

    return objetoUsuario
}

function criarObjetoEndereco() {
    var objetoEndereco = new Endereco(
        cidadeInput.value,
        bairroInput.value,
        ruaInput.value,
        numeroInput.value,
        complementoInput.value
    )

    return objetoEndereco
}

function criarObjetoResponsavel() {
    var objetoResponsavel = new Responsavel(
        idResp,
        nomeRespInput.value,
        cpfRespInput.value,
        senhaRespInput.value,
        novoEnderecoResponsavel
    )

    return objetoResponsavel
}

function criarObjetoEnderecoResponsavel() {
    var objetoEnderecoResponsavel = new EnderecoResponsavel(
        cidadeRespInput.value,
        bairroRespInput.value,
        ruaRespInput.value,
        numeroRespInput.value,
        complementoRespInput.value
    )

    return objetoEnderecoResponsavel
}

// ----- GERADOR DE ID ALEATÓRIO -----

function gerarIdAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}