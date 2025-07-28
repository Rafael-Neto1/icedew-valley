const tamanCanteiro = 12;
const canteiro = [];
const canteiroContainer =  document.getElementById('canteiro');
let numDia = 1;
let hora = 6;
let min = 0;
const diaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
let indiceDiaSemana = 0;

//cria um vetor (linha) 12 vezes e depois adicionando cada linha a matriz canteiro (isso nao aparece visualmente, esta reservando na memoria)
for (let linha = 0; linha < tamanCanteiro; linha++) {
    const linhaCanteiro = [];
    for (let coluna = 0; coluna < tamanCanteiro; coluna++){
        const tipos = ['vazio', 'pedra', 'erva'];
        const tipoRandom = tipos[Math.floor(Math.random() * tipos.length)];
        linhaCanteiro.push({ tipo: tipoRandom});
    }
    canteiro.push(linhaCanteiro);
}

//esta criando visualmente o canteiro com base na matriz reservada na memoria (vazio, pedra ou erva daninha)
for (let linha = 0; linha < tamanCanteiro; linha++) {
    for (let coluna = 0; coluna < tamanCanteiro; coluna++){
        const chao = canteiro[linha][coluna];

        const quadrado = document.createElement('div');
        quadrado.classList.add('quadrado');
        quadrado.classList.add(chao.tipo);
        quadrado.dataset.linha = linha;
        quadrado.dataset.coluna = coluna;

        canteiroContainer.appendChild(quadrado);
    }

} 

function esconderMenus() {
    document.querySelectorAll('[id^="menu-"]').forEach(menu =>{
        menu.classList.remove('visivel');
        menu.classList.add('escondido');
    })
}

function mostrarMenu(tipo){
    esconderMenus();
    const menu = document.getElementById('menu-' + tipo);
    menu.classList.remove('escondido');
    menu.classList.add('visivel');
}

function avancaTempo(){
    min+= 10;

    if (min >= 60) {
        min = 0 ;
        hora += 1;
    }

    if (hora >= 24) {
        hora = 6;
        numDia += 1;

        diaSemana += 1;
        if (condition) {
            
        }

    }
}


function atualizaSolo(linha, coluna, novoSolo, planta = '') {
    canteiro[linha][coluna].tipo = novoSolo;

    const solo = document.querySelector(`[data-linha="${linha}"][data-coluna="${coluna}"]`);
    solo.className = 'quadrado ' + novoSolo + (planta ? ' ' + planta : '');
}



//variavel que guarda qual a posicao da matriz que foi clicada (linha e coluna)
let chaoClicado = null;

canteiroContainer.addEventListener('click', (event) => {
    //variavel que guarda qual posicao do dom que foi clicada
    const chaoFoco = event.target;
    if(!chaoFoco.classList.contains('quadrado')) return;

    const linha = +chaoFoco.dataset.linha;
    const coluna = +chaoFoco.dataset.coluna;

    chaoClicado = {linha, coluna};

    const tipoClicado = canteiro[linha][coluna].tipo;
    
    //verifica o tipo clicado para mostrar o menu correspondente
    if(tipoClicado === 'pedra' || tipoClicado === 'erva') {
        mostrarMenu ('limpar');
    }else if (tipoClicado === 'vazio'){
        mostrarMenu ('arar');
    }else if (tipoClicado === 'arado'){
        mostrarMenu ('plantar');
    }else if (tipoClicado === 'plantado'){
        mostrarMenu ('regar');
    }else if (tipoClicado === 'colheita'){
        mostrarMenu ('colher');
    }
    
})

document.getElementById('botao-limpar').addEventListener('click', () =>{
    if (!chaoClicado) return;
    const {linha, coluna} = chaoClicado;

    atualizaSolo(linha, coluna, 'vazio');
    esconderMenus();
})
document.getElementById('botao-arar').addEventListener('click', () =>{
    if (!chaoClicado) return;
    const {linha, coluna} = chaoClicado;

    atualizaSolo(linha, coluna, 'arado');
    esconderMenus();
});

document.getElementById('botao-plantar').addEventListener('click', () =>{
    if (!chaoClicado) return;

    esconderMenus();
    document.getElementById('menu-sementes').classList.remove('escondido');
    document.getElementById('menu-sementes').classList.add('visivel');
    
});

document.querySelectorAll('#menu-sementes button').forEach(botao =>{
    botao.addEventListener('click', () =>{
        if (!chaoClicado) return;

        const semente = botao.textContent.toLowerCase();
        const {linha, coluna} = chaoClicado;

        atualizaSolo (linha, coluna, 'plantado', semente);
        esconderMenus();
    })
})

document.getElementById('botao-regar').addEventListener('click', () =>{
    if (!chaoClicado) return;
    const {linha, coluna} = chaoClicado;

    atualizaSolo(linha, coluna, 'regado');
    esconderMenus();
});

document.getElementById('botao-colher').addEventListener('click', () =>{
    if (!chaoClicado) return;
    const {linha, coluna} = chaoClicado;

    atualizaSolo(linha, coluna, 'vazio');
    esconderMenus();
});



