import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import { projectsData } from '../src/data/projects';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function populateProjects() {
  const batch = writeBatch(db);
  
  for (const project of projectsData) {
    const { id, ...projectData } = project;
    const docRef = doc(db, 'projects', id);
    batch.set(docRef, projectData);
  }

  try {
    await batch.commit();
    console.log('Successfully populated projects data!');
  } catch (error) {
    console.error('Error populating data:', error);
  }
}

// Run the population script
populateProjects().then(() => {
  console.log('Finished populating data');
  process.exit(0);
}).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
