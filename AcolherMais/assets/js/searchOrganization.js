import { db } from "./firebaseConfig.js";
import { collection, getDocs, query, where, doc, getDoc} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

const searchBtn = document.getElementById('searchBtn');
const organizationList = document.getElementById('organizationList');
organizationList.innerHTML = "";

const orgFullList = [];

const orgCollection = collection(db, 'organizacao');
const orgSnapshot = await getDocs(orgCollection);
orgSnapshot.forEach((dcmt) => {            
      orgFullList.push({id: dcmt.id, ...dcmt.data()});            
});

createOrganizationList(orgFullList);

searchBtn.addEventListener('click', async (e) =>{    
    const organizationList = document.getElementById('organizationList');
    organizationList.innerHTML = "";

    const genderFilter = Array.from(document.getElementById('gender').selectedOptions).map(option => option.value);
    const orientationFilter = Array.from(document.getElementById('orientation').selectedOptions).map(option => option.value);
    const serviceFilter = Array.from(document.getElementById('service').selectedOptions).map(option => option.value);

    // Criar uma matriz para armazenar os resultados
    const resultados = [];        

     // Consulta para gêneros
    if (genderFilter.length > 0) {
        const genderQuery = query(collection(db, 'organizacao'), where('genero', 'array-contains-any', genderFilter));
        const genderSnapshot = await getDocs(genderQuery);
        genderSnapshot.forEach((dcmt) => {  
            const organizationData = dcmt.data();
            const organizationId = dcmt.id;          
              resultados.push({id:organizationId, ...organizationData});            
        });
    }

    // Consulta para orientações
    if (orientationFilter.length > 0) {
        const orientationQuery = query(collection(db, 'organizacao'), where('orientacao', 'array-contains-any', orientationFilter));
        const orientationSnapshot = await getDocs(orientationQuery);
        orientationSnapshot.forEach((dcmt) => {
            const organizationData = dcmt.data();
            const organizationId = dcmt.id;
            if (!resultados.some((org) => org.id === organizationId)) {
                resultados.push({id:organizationId, ...organizationData});                 
            }
        });
    }

    // Consulta para serviços
    if (serviceFilter.length > 0) {
        const serviceQuery = query(collection(db, 'organizacao'), where('servico', 'array-contains-any', serviceFilter));
        const serviceSnapshot = await getDocs(serviceQuery);
        serviceSnapshot.forEach((dcmt) => {
            const organizationData = dcmt.data();
            const organizationId = dcmt.id;
            if (!resultados.some((org) => org.id === organizationId)) {
                resultados.push({id:organizationId, ...organizationData});                 
            }
        });
    } 

    createOrganizationList(resultados);
 
});

async function createOrganizationList (orgArray) {
    orgArray.forEach(async (organizacao) => {
        const name = organizacao.nome;
        const gender = organizacao.genero;
        const orientation = organizacao.orientacao;
        const service = organizacao.servico;      

        //Titulo da organização        
        const nameElement = document.createElement('h2');
        nameElement.textContent = name;
        nameElement.classList.add('organization-name');

        //Botao Ver Mais
        const detailsBtn = document.createElement('button');
        detailsBtn.textContent = 'Ver mais';
        detailsBtn.classList.add('btn');
        detailsBtn.classList.add('btn-secondary');

        console.log(organizacao.id);

        // Adicione um evento de clique no botão "Ver mais"
        detailsBtn.addEventListener('click', () => {
            // Redirecione para a página de visualização de detalhes com o ID da organização
            window.location.href = `visualizacao-organizacao.html?id=${organizacao.id}`;
        });

        const nameContainer = document.createElement('div');
        nameContainer.classList.add('name-container');
        nameContainer.appendChild(nameElement);
        nameContainer.appendChild(detailsBtn);

        //Generos atendidos
        const genderTitle = document.createElement('h3');
        genderTitle.textContent = "Identidade de gênero atendida";
        genderTitle.classList.add('field-title');

        const genderTagContainer = document.createElement('div');
        genderTagContainer.classList.add('field-tags');       
  
       
        const genderTagPromises = gender.map(async (element) => {
              const genderDocRef = doc(db, 'genero', element);
              const genderDocSnap = await getDoc(genderDocRef);
              const genderName = genderDocSnap.data().nome;
        
              const genderTags = document.createElement('p');
              genderTags.textContent = genderName;
              genderTags.classList.add('tags-item');
              genderTags.classList.add('tag-gender');
              genderTagContainer.appendChild(genderTags);
            });
        
        await Promise.all(genderTagPromises);        

        const genderContainer = document.createElement('div');
        genderContainer.classList.add('field-container');
        genderContainer.appendChild(genderTitle);
        genderContainer.appendChild(genderTagContainer);


        //Orientacoes atendidas
        const orientationTitle = document.createElement('h3');
        orientationTitle.textContent = "Orientação sexual atendida";
        orientationTitle.classList.add('field-title');

        const orientationTagContainer = document.createElement('div');
        orientationTagContainer.classList.add('field-tags');       

        const orientationTagPromises = orientation.map(async (element) => {
              const orientationDocRef = doc(db, 'orientacao', element);
              const orientationDocSnap = await getDoc(orientationDocRef);
              const orientationName = orientationDocSnap.data().nome;
        
              const orientationTags = document.createElement('p');
              orientationTags.textContent = orientationName;
              orientationTags.classList.add('tags-item');
              orientationTags.classList.add('tag-orientation');
              orientationTagContainer.appendChild(orientationTags);
            });

        await Promise.all(orientationTagPromises);       

        const orientationContainer = document.createElement('div');
        orientationContainer.classList.add('field-container');        
        orientationContainer.appendChild(orientationTitle);
        orientationContainer.appendChild(orientationTagContainer);


        //Serviços oferecidos
        const serviceTitle = document.createElement('h3');
        serviceTitle.textContent = "Serviço oferecido";
        serviceTitle.classList.add('field-title');

        const serviceTagContainer = document.createElement('div');
        serviceTagContainer.classList.add('field-tags');       

        const serviceTagPromises = service.map(async (element) => {
              const serviceDocRef = doc(db, 'servico', element);
              const serviceDocSnap = await getDoc(serviceDocRef);
              const serviceName = serviceDocSnap.data().nome;
        
              const serviceTags = document.createElement('p');
              serviceTags.textContent = serviceName;
              serviceTags.classList.add('tags-item');
              serviceTags.classList.add('tag-service');
              serviceTagContainer.appendChild(serviceTags);
            });
        
        await Promise.all(serviceTagPromises);

        const serviceContainer = document.createElement('div');
        serviceContainer.classList.add('field-container');        
        serviceContainer.appendChild(serviceTitle);
        serviceContainer.appendChild(serviceTagContainer);


        //Organizacao
        const orgContainer = document.createElement('div');
        orgContainer.classList.add('organization-container');
        orgContainer.appendChild(nameContainer);
        orgContainer.appendChild(genderContainer); 
        orgContainer.appendChild(orientationContainer);  
        orgContainer.appendChild(serviceContainer);  

        
        //Adicionar organizacao a lista
        organizationList.appendChild(orgContainer);
    });
}
  