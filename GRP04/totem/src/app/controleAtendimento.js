// Estrutura de dados para armazenar as senhas
let senhas = [];
let senhasAtendidas = [];

// Função para gerar uma nova senha
function emitirSenha(tipo) {
    const novaSenha = {
        numero: senhas.length + 1,
        tipo: tipo,
        dataEmissao: new Date(),
        dataAtendimento: null,
        guicheAtendimento: null
    };
    senhas.push(novaSenha);
    return novaSenha;
}

// Função para chamar a próxima senha
function chamarProximaSenha() {
    if (senhas.length === 0) {
        return null; // Não há senhas na fila
    }
    const proximaSenha = senhas.shift();
    proximaSenha.dataAtendimento = new Date();
    proximaSenha.guicheAtendimento = Math.floor(Math.random() * 5) + 1; // Simula um guichê aleatório
    senhasAtendidas.push(proximaSenha);
    return proximaSenha;
}

// Função para calcular o tempo médio de atendimento para cada tipo de senha
function calcularTempoMedioAtendimento(tipo) {
    const senhasDoTipo = senhasAtendidas.filter(senha => senha.tipo === tipo);
    const totalTempo = senhasDoTipo.reduce((acc, senha) => {
        return acc + (senha.dataAtendimento - senha.dataEmissao);
    }, 0);
    return senhasDoTipo.length > 0 ? totalTempo / senhasDoTipo.length : 0;
}

// Exemplo de uso
console.log("Emitindo nova senha...");
const senhaPrioritaria = emitirSenha("Prioritária");
console.log("Nova senha emitida:", senhaPrioritaria);

console.log("Chamando próxima senha...");
const proximaSenhaChamada = chamarProximaSenha();
console.log("Senha chamada:", proximaSenhaChamada);

console.log("Tempo médio de atendimento para senhas prioritárias:", calcularTempoMedioAtendimento("Prioritária"));