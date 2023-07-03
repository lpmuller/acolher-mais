import { db } from "./firebaseConfig.js";
import { doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

const form = document.getElementById('organizationForm');

// Obter o ID da organização da URL
const urlParams = new URLSearchParams(window.location.search);
const organizationId = urlParams.get('id');

// Verificar se o ID da organização foi passado
if (organizationId) {
  // Buscar a organização no banco de dados
  const organizationDocRef = doc(db, 'organizacao', organizationId);

  getDoc(organizationDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const organizationData = docSnapshot.data();
        fillForm(organizationData);
      } else {
        console.log('Organização não encontrada');
      }
    })
    .catch((error) => {
      console.log('Erro ao buscar organização:', error);
    });
} else {
  console.log('ID da organização não fornecido');
}

// Função para preencher o formulário com os dados da organização
function fillForm(organization) {
  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');
  const genderSelect = document.getElementById('gender');
  const orientationSelect = document.getElementById('orientation');
  const serviceSelect = document.getElementById('service');
  const telInput = document.getElementById('tel');
  const socialNetworkInput = document.getElementById('socialnetwork');
  const siteInput = document.getElementById('site');
  const emailInput = document.getElementById('email');

  nameInput.value = organization.nome || '';
  descriptionInput.value = organization.descricao || '';
  getSelection(organization.genero || [], genderSelect);
  getSelection(organization.orientacao || [], orientationSelect);
  getSelection(organization.servico || [], serviceSelect);
  telInput.value = organization.telefone || '';
  socialNetworkInput.value = organization.redesocial || '';
  siteInput.value = organization.site || '';
  emailInput.value = organization.email || '';
}

// Função auxiliar para ter as opções cadastradas selecionadas
function getSelection(selection, selectElement) {
    // Limpar as seleções existentes
    Array.from(selectElement.options).forEach(option => option.selected = false);
  
    // Selecionar as opções correspondentes
    Array.from(selectElement.options).forEach(option => {
      if (selection.includes(option.value)) {
        option.selected = true;
      }
    });
  }

// Manipular o envio do formulário
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value;
  const description = form.description.value;
  const gender = Array.from(form.gender.selectedOptions).map(option => option.value);
  const orientation = Array.from(form.orientation.selectedOptions).map(option => option.value);
  const service = Array.from(form.service.selectedOptions).map(option => option.value);
  const tel = form.tel.value;
  const socialNetwork = form.socialnetwork.value;
  const site = form.site.value;
  const email = form.email.value;

  // Atualizar os dados da organização no banco de dados
  const organizationDocRef = doc(db, 'organizacao', organizationId);
  updateDoc(organizationDocRef, {
    nome: name,
    descricao: description,
    genero: gender,
    orientacao: orientation,
    servico: service,
    telefone: tel,
    redesocial: socialNetwork,
    site: site,
    email: email
  })
    .then(() => {
      console.log('Organização atualizada com sucesso');
      // Redirecionar para a página de visualização com o ID da organização
      window.location.href = `visualizacao-organizacao.html?id=${organizationId}`;
    })
    .catch((error) => {
      console.log('Erro ao atualizar organização:', error);
    });
});
