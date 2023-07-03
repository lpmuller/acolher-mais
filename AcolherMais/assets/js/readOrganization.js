import { db } from "./firebaseConfig.js";
import { doc, getDoc} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

//Pegar id a partir de url
const urlParams = new URLSearchParams(window.location.search);
const organizationId = urlParams.get('id');

const organizationDetails = document.getElementById('organizationDetails');
organizationDetails.innerHTML = ""; 

const getOrganizationDetails = async (organizationId) => {
    try {
        const organizationDocRef = doc(db, 'organizacao', organizationId);
        const organizationDocSnap = await getDoc(organizationDocRef);

        if (organizationDocSnap.exists()) {
            const organization = organizationDocSnap.data();
            organizationDetails.innerHTML=`
            <h1 class="page-title">${organization.nome}</h1>

            <h3 class="field-title">Sobre</h3>
            <p class="field-text">${organization.descricao}</p>
                    
            <h3 class="field-title">Identidade de gênero atendida</h3>
            <div class="field-tags" id="genderTagContainer"></div>        

            <h3 class="field-title">Orientação sexual atendida</h3>
            <div class="field-tags" id="orientationTagContainer"></div>

            <h3 class="field-title">Serviço oferecido</h3>
            <div class="field-tags" id="serviceTagContainer"></div>
            
            <h3 class="field-title">Site</h3>
            <p class="field-text" href="${organization.site}">${organization.site}</p>

            <h3 class="field-title">Telefone</h3>
            <p class="field-text">${organization.telefone}</p>

            <h3 class="field-title">E-mail</h3>
            <p class="field-text">${organization.email}</p>

            <h3 class="field-title">Rede social</h3>
            <p class="field-text">${organization.redesocial}</p>
            `; 
                        
            //Generos atendidos
            const gender = organization.genero;  
            const genderTagContainer = document.getElementById('genderTagContainer');
            
            gender.forEach(async (element) => {   
                const genderDocRef = doc(db, 'genero', element);
                const genderDocSnap = await getDoc(genderDocRef);
                const genderName = genderDocSnap.data().nome;
            
                const genderTags = document.createElement('p');
                genderTags.textContent = genderName;
                genderTags.classList.add('tags-item');
                genderTags.classList.add('tag-gender');
                genderTagContainer.appendChild(genderTags);             
            });

            //Orientações atendidas
            const orientation = organization.orientacao;  
            const orientationTagContainer = document.getElementById('orientationTagContainer');
            
            orientation.forEach(async (element) => {
                const orientationDocRef = doc(db, 'orientacao', element);
                const orientationDocSnap = await getDoc(orientationDocRef);
                const orientationName = orientationDocSnap.data().nome;
            
                const orientationTags = document.createElement('p');
                orientationTags.textContent = orientationName;
                orientationTags.classList.add('tags-item');
                orientationTags.classList.add('tag-orientation');
                orientationTagContainer.appendChild(orientationTags);
            });

            //Servicos atendidos
            const service = organization.servico;  
            const serviceTagContainer = document.getElementById('serviceTagContainer');

            service.forEach(async (element) => {
                const serviceDocRef = doc(db, 'servico', element);
                const serviceDocSnap = await getDoc(serviceDocRef);
                const serviceName = serviceDocSnap.data().nome;
            
                const serviceTags = document.createElement('p');
                serviceTags.textContent = serviceName;
                serviceTags.classList.add('tags-item');
                serviceTags.classList.add('tag-service');
                serviceTagContainer.appendChild(serviceTags);
            });

        } else {
            console.log('Organização não encontrada');
        }
    } catch (error) {
        console.log('Erro ao obter detalhes da organização', error);
    }  

};

getOrganizationDetails(organizationId);

const editBtn = document.getElementById('editBtn');

// Adicionar um evento de clique no botão "Editar organização"
editBtn.addEventListener('click', () => {
    // Redirecionar para a página de edição com o ID da organização
    window.location.href = `edicao-organizacao.html?id=${organizationId}`;
});