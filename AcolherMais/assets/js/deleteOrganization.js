import { db } from "./firebaseConfig.js";
import { doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

// Obter o ID da organização da URL
const urlParams = new URLSearchParams(window.location.search);
const organizationId = urlParams.get('id');

// Verificar se o ID da organização foi passado
if (organizationId) {
  // Buscar a organização no banco de dados
  const organizationDocRef = doc(db, 'organizacao', organizationId);

  // Função para deletar a organização
  async function deleteOrganization() {
    try {
      // Deleta a organização do banco de dados
      await deleteDoc(organizationDocRef);
      console.log('Organização deletada com sucesso');
      // Redireciona para a página inicial ou uma página de confirmação
      window.location.href = 'delecao-sucesso.html'; 
    } catch (error) {
      console.log('Erro ao deletar organização:', error);
    }
  }

 
  const deleteBtn = document.getElementById('deleteBtn');
 
  deleteBtn.addEventListener('click', deleteOrganization);
}
