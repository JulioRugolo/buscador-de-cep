import './style.css';
import Swal from 'sweetalert2';

const resultado = document.getElementById('result');
const button = document.getElementById('button');
const rua = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const cep = document.getElementById('cep');

async function getCep() {
    resultado.style.display = 'none'
  const input = document.getElementById('cepNumber').value;
  try {
    const result = await fetch(`https://viacep.com.br/ws/${input}/json/`);
    const data = await result.json();
    if(data.logradouro) {
      rua.innerHTML = `<span>Rua:</span> ${data.logradouro}`;
      bairro.innerHTML = `<span>Bairro:</span> ${data.bairro}`;
      cidade.innerHTML = `<span>Cidade:</span> ${data.localidade}`;
      estado.innerHTML = `<span>Estado:</span> ${data.uf}`;
      cep.innerHTML = `<span>Cep:</span> ${data.cep}`;
      resultado.style.visibility = 'visible';
      return;
    } else {
      Swal.fire({
      title: 'CEP não encontrado',
      text: 'Tente novamente!',
      icon: 'error',
      confirmButtonText: 'Ok!',
    });
    }
  } catch (error) {
    Swal.fire({
      title: 'CEP não encontrado',
      text: 'Tente novamente!',
      icon: 'error',
      confirmButtonText: 'Ok!',
    });
  }
}

button.addEventListener('click', (event) => {
  event.preventDefault();
  getCep();
});
