import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { TASK_STATUTS_TEXT_MAP, TASK_STATUTS_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from "../constants";

export default function Show({ auth, task }) {
    
    // Fonction pour obtenir la classe en fonction du statut du projet
    const getClassName = (task) => {
        return TASK_STATUTS_CLASS_MAP[task.status] || 'bg-gray-500'; // Valeur par défaut si statut inconnu
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Task "${task.name}"`}
                </h2>
            }
        >
            <Head title={`Task "${task.name}"`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div>
                                <img
                                    src={task.image_path}
                                    alt=""
                                    className="w-full h-64 object-cover"
                                />
                            </div>

                            {/* Grille pour afficher plusieurs informations sur la même ligne */}
                            <div className="grid grid-cols-2 gap-6 mt-5">
                                {/* Task ID et Task Name sur la même ligne */}
                                <div>
                                    <label className="font-bold text-lg">Task ID</label>
                                    <p className="mt-1">{task.id}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Task Name</label>
                                    <p className="mt-1">{task.name}</p>
                                </div>

                                {/* Created By et Updated By sur la même ligne */}
                                <div>
                                    <label className="font-bold text-lg">Created By</label>
                                    <p className="mt-1">{task.createdBy.name}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Updated By</label>
                                    <p className="mt-1">{task.updatedBy.name}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Project </label>
                                    <p className="mt-1">
                                        <Link
                                        href={route("project.show", task.project.id)}
                                        className="hover:underline"
                                        >
                                        {task.project.name}
                                        </Link>
                                    </p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Assigned  User </label>
                                    <p className="mt-1">{task.assignedUser.name}</p>
                                </div>
                                {/* Created Date et Due Date sur la même ligne */}
                                <div>
                                    <label className="font-bold text-lg">Created Date</label>
                                    <p className="mt-1">{task.created_at}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Due Date</label>
                                    <p className="mt-1">{task.due_date}</p>
                                </div>

                                {/* Task Status sur la dernière ligne */}
                                <div >
                                    <label className="font-bold text-lg">Task Status</label>
                                    <p className="mt-1">
                                        <span className={`px-2 py-1 rounded text-white ${getClassName(task)}`}>
                                            {TASK_STATUTS_TEXT_MAP[task.status]}
                                        </span>
                                    </p>
                                </div>
                                <div >
                                    <label className="font-bold text-lg">Task Priority </label>
                                    <p className="mt-1">
                                        <span className={`px-2 py-1 rounded text-white ${getClassName(task)}`}>
                                            {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                        </span>
                                    </p>
                                </div>
                                <div className=" col-span-2">
                                    <label className="font-bold text-lg">
                                        Task Description 
                                    </label>
                                    <p className="mt-1">{task.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
            
        </AuthenticatedLayout>
    );
}