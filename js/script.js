const slides = document.querySelectorAll('.slide')
const bolinhas = document.querySelectorAll('.bolinha')

let slideatual = 0
let cronometro = setInterval(proximoslide, 5000) /* a cada 5 segundos */

function proximoslide(){
    slides[slideatual].classList.remove('ativa')
    bolinhas[slideatual].classList.remove('ativa')

    slideatual = (slideatual + 1) % slides.length;
    slides[slideatual].classList.add('ativa')
    bolinhas[slideatual].classList.add('ativa')
}

function resetarTempo(){
    clearInterval(cronometro)
    cronometro = setInterval(proximoslide, 5000)
}

/* Botões proximo e anterior */

const botaoProximo = document.querySelector('.proximo')
const botaoAnterior = document.querySelector('.anterior')

function slideAnterior() {
    slides[slideatual].classList.remove('ativa')
    bolinhas[slideatual].classList.remove('ativa')
    if (slideatual === 0) {
        slideatual = slides.length - 1;
    } else {
        slideatual = slideatual - 1;
    }

    slides[slideatual].classList.add('ativa')
    bolinhas[slideatual].classList.add('ativa')
}

botaoProximo.addEventListener('click', function () {
    proximoslide();
    resetarTempo();
})

botaoAnterior.addEventListener('click', function() {
    slideAnterior();
    resetarTempo();
})

/* botão do + do faq */
const faqHeaders = document.querySelectorAll('.faq-header');

faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const answer = item.querySelector('.faq-answer');
        
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

        item.classList.toggle('active');
        
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 50 + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

/* Só pode numeros no telefone */
const campoTelefone = document.querySelector ('[name="telefone"]')

campoTelefone.addEventListener('input', function(event) {
        const valorAtual = event.target.value;
        const apenasNumero = valorAtual.replace(/\D/g, "");

        if (apenasNumero.length == 0) {
            event.target.value = "";
        }

        else if (apenasNumero.length <=2) {
            event.target.value = "(" + apenasNumero;
        }
        else if (apenasNumero.length <= 7) {
            event.target.value = "(" + apenasNumero.slice(0, 2) + ") " + apenasNumero.slice(2, 7);
        }
        else {
            event.target.value = "(" + apenasNumero.slice(0, 2) + ") " + apenasNumero.slice(2, 7) + "-" + apenasNumero.slice(7, 11);
        }
    });

/* verificar o e-mail */
const campoEmail = document.querySelector ('[name="email"]')

campoEmail.addEventListener('input', function(event) {
    const emailAtual = event.target.value
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailAtual == "") {
        event.target.style.borderColor = ''
    }
    else if (regexEmail.test(emailAtual)) {
        event.target.style.borderColor = 'green'
    }
    else {
        event.target.style.borderColor = 'red'
    }
});

/* Verificar nome */

const campoNome = document.querySelector ('[name="nome"]')

campoNome.addEventListener('input', function(event) {
    const nomeAtual = event.target.value
    const regexNome = /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)+$/;

    if(nomeAtual == "") {
        event.target.style.borderColor = ''
    }
    else if (regexNome.test(nomeAtual)) {
        event.target.style.borderColor = 'green'
    }
    else {
        event.target.style.borderColor = 'red'
    }
});

/* verificar mensagem */

const msg = document.querySelector('[name="mensagem"]')

msg.addEventListener('input', function(event) {
    const msgAtual = event.target.value

    if (msgAtual.length == "") {
        event.target.style.borderColor = ''
    }
    else if (msgAtual.length <= 30) {
        event.target.style.borderColor = 'red'
    }
    else {
        event.target.style.borderColor = 'green'
    }
    });

/* EmailJS */
const formulario = document.getElementById('meu-formulario');
const botaoSubmit = formulario.querySelector('.btn-submit');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexNome = /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)+$/;

    if (!regexNome.test(campoNome.value)) {
        alert('Nome ou sobrenome faltando. Insira seu nome completo por favor.')
        return;
    }

    if (!regexEmail.test(campoEmail.value)) {
        alert('E-mail invalido! Insira um e-mail valido.')
        return;
    }
    
    if (msg.value.length <= 30){
        alert('Caracteres insuficiente, por favor detalhe mais seu projeto')
        return;
    }

    botaoSubmit.innerText = "Enviando...";
    botaoSubmit.disabled = true; 

    emailjs.sendForm('service_1qf2b8n', 'template_6ac4ebo', this)
        .then(() => {

            botaoSubmit.innerText = "Enviado!";
            formulario.reset();
        }, (error) => {
   
            console.log('Erro:', error);
            botaoSubmit.innerText = "Erro ao enviar";
            botaoSubmit.disabled = false;
        });
});

/* botão hamburguer */
const botaoMenu = document.querySelector('.bars')
const menu = document.querySelector('.hd1')

botaoMenu.addEventListener('click', function(){
    menu.classList.toggle('ativa')
});

const linkMenu = document.querySelectorAll('.hd1 a')

linkMenu.forEach(link => {
    link.addEventListener('click', function() {
        menu.classList.remove('ativa')
    })
});
