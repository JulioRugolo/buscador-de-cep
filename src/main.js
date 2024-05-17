import './style.css';
import Swal from 'sweetalert2';

const button = document.getElementById('button');
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

    Swal.fire({
      title: 'Resultado da Busca',
      html: `
        <p><strong>Rua:</strong> ${data.logradouro}</p>
        <p><strong>Bairro:</strong> ${data.bairro}</p>
        <p><strong>Cidade:</strong> ${data.localidade}</p>
        <p><strong>Estado:</strong> ${data.uf}</p>
        <p><strong>CEP:</strong> ${data.cep}</p>
      `,
      icon: 'success',
      confirmButtonText: 'Ok!',
    });
  } catch (error) {
    Swal.fire({
      title: 'Erro',
      text: 'Não foi possível buscar o CEP. Tente novamente!',
      icon: 'error',
      confirmButtonText: 'Ok!',
    });
  }
}

button.addEventListener('click', (event) => {
  event.preventDefault();
  getCep();
});
