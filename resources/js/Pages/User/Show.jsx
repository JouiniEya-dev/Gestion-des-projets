import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { USER_ROLE_TEXT_MAP, USER_ROLE_CLASS_MAP } from "../constants.jsx";

export default function Show({ auth, user }) {
    
    // Fonction pour obtenir la classe en fonction du role du projet
    const getClassName = (user) => {
        return USER_ROLE_CLASS_MAP[user.role] || 'bg-gray-500'; // Valeur par défaut si role inconnu
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`User "${user.name}"`}
                </h2>
            }
        >
            <Head title={`User "${user.name}"`} />
            <pre> {JSON.stringify(user)}</pre>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            
                            {/* Grille pour afficher plusieurs informations sur la même ligne */}
                            <div className="grid grid-cols-2 gap-6 mt-5">
                                {/* User ID et User Name sur la même ligne */}
                                <div>
                                    <label className="font-bold text-lg">User ID</label>
                                    <p className="mt-1">{user.id}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">User Name</label>
                                    <p className="mt-1">{user.name}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Role</label>
                                    <p className="mt-1">{user.role}</p>
                                </div>
                                {/* Created By et Updated By sur la même ligne */}
                                <div>
                                    <label className="font-bold text-lg">Created By</label>
                                    <p className="mt-1">{user.createdBy.name}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Updated By</label>
                                    <p className="mt-1">{user.updatedBy.name}</p>
                                </div>

                                {/* Created Date et Due Date sur la même ligne */}
                                <div>
                                    <label className="font-bold text-lg">Created Date</label>
                                    <p className="mt-1">{user.created_at}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-lg">Due Date</label>
                                    <p className="mt-1">{user.due_date}</p>
                                </div>

                                {/* User Status sur la dernière ligne */}
                                <div className="col-span-2">
                                    <label className="font-bold text-lg">User Status</label>
                                    <p className="mt-1">
                                        <span className={`px-2 py-1 rounded text-white ${getClassName(user)}`}>
                                            {USER_ROLE_TEXT_MAP[user.role]}
                                        </span>
                                    </p>
                                </div>
                                <div className=" col-span-2">
                                    <label className="font-bold text-lg">
                                        user Description 
                                    </label>
                                    <p className="mt-1">{user.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </AuthenticatedLayout>
    );
}