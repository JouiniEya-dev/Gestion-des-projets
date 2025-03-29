import create from 'zustand';

const useStore = create((set) => ({
  projects: [],
  tasks: [],

  // Charger les projets depuis Laravel
  loadProjects: async () => {
    const response = await fetch('/api/projects');
    const data = await response.json();
    set({ projects: data });
  },

  // Charger les tâches depuis Laravel
  loadTasks: async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    set({ tasks: data });
  },

  // Ajouter un projet
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  
  // Ajouter une tâche
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
}));

export default useStore;