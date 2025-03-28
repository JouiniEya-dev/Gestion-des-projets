import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PROJECT_STATUTS_TEXT_MAP, PROJECT_STATUTS_CLASS_MAP } from "../constants";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, project, tasks, queryParams }) {
    
    // Fonction pour obtenir la classe en fonction du statut du projet
    const getClassName = (project) => {
        return PROJECT_STATUTS_CLASS_MAP[project.status] || 'bg-gray-500'; // Valeur par défaut si statut inconnu
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Project "${project.name}"`}
                </h2>
            }
        >
            <Head title={`Project "${project.name}"`} />
            <pre> {JSON.stringify(project)}</pre>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div>
                                <img
                                    src={project.image_path}
                                    alt=""
                                    className="w-full h-64 object-cover"
                                />
                            </div>

                            {/* Grille pour afficher plusieurs informations sur la même ligne */}
                            <div className="grid grid-cols-2 gap-6 mt-5">
                                {/* Project ID et Project Name sur la même ligne */}
                                <div>
                                    <label className="font-bold text-lg">Project ID</label>
                                    <p className="mt-1">{project.id}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Project Name</label>
                                    <p className="mt-1">{project.name}</p>
                                </div>

                                {/* Created By et Updated By sur la même ligne */}
                                <div>
                                    <label className="font-bold text-lg">Created By</label>
                                    <p className="mt-1">{project.createdBy.name}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Updated By</label>
                                    <p className="mt-1">{project.updatedBy.name}</p>
                                </div>

                                {/* Created Date et Due Date sur la même ligne */}
                                <div>
                                    <label className="font-bold text-lg">Created Date</label>
                                    <p className="mt-1">{project.created_at}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Due Date</label>
                                    <p className="mt-1">{project.due_date}</p>
                                </div>

                                {/* Project Status sur la dernière ligne */}
                                <div className="col-span-2">
                                    <label className="font-bold text-lg">Project Status</label>
                                    <p className="mt-1">
                                        <span className={`px-2 py-1 rounded text-white ${getClassName(project)}`}>
                                            {PROJECT_STATUTS_TEXT_MAP[project.status]}
                                        </span>
                                    </p>
                                </div>
                                <div className=" col-span-2">
                                    <label className="font-bold text-lg">
                                        Project Description 
                                    </label>
                                    <p className="mt-1">{project.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
            <div className="pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable tasks={tasks} queryParams={queryParams}
                            hideProjectColumn={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}