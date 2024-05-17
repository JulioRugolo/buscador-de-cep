import './style.css';
import Swal from 'sweetalert2';

const resultado = document.getElementById('result');
const button = document.getElementById('button');
const rua = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const cep = document.getElementById('cep');
const cepInput = document.getElementById('cepNumber');

async function getCep() {
  const input = cepInput.value.trim();

  if (!input) {
    Swal.fire({
      title: 'CEP inválido',
      text: 'Por favor, insira um CEP válido!',
      icon: 'warning',
      confirmButtonText: 'Ok!',
    });
    return;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${input}/json/`);
    const data = await response.json();

    if (data.erro) {
      throw new Error('CEP não encontrado');
    }

    rua.innerHTML = `<span>Rua:</span> ${data.logradouro}`;
    bairro.innerHTML = `<span>Bairro:</span> ${data.bairro}`;
    cidade.innerHTML = `<span>Cidade:</span> ${data.localidade}`;
    estado.innerHTML = `<span>Estado:</span> ${data.uf}`;
    cep.innerHTML = `<span>CEP:</span> ${data.cep}`;

    resultado.style.display = 'flex';
  } catch (error) {
    Swal.fire({
      title: 'Erro',
      text: error.message || 'Não foi possível buscar o CEP. Tente novamente!',
      icon: 'error',
      confirmButtonText: 'Ok!',
    });
  }
}

button.addEventListener('click', (event) => {
  event.preventDefault();
  resultado.style.display = 'none';
  getCep();
});
