import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import { USER_ROLE_CLASS_MAP, USER_ROLE_TEXT_MAP } from "../constants.jsx";
export default function Index({auth , users , queryParams = null, success}){
    queryParams = queryParams || {}
    const searchFieldChanged = (name , value) => {
        if (value) {
            queryParams[name] = value
        } else{
            delete queryParams[name]
        }
        
        router.get(route('user.index'), queryParams);
    };
     const onKeyPress =(name, e)=>{
        if (e.key!== 'Enter') return;
        searchFieldChanged(name, e.target.value);

     };
    const sortChanged = (name) => {
        if (name === queryParams.sort_field){
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction ='desc';
            } else{
                queryParams.sort_direction ='asc';
            }
        } else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('user.index'), queryParams);
     };
     const deleteUser = (user) => {
        if (!window.confirm('Are you sure you want to delete the user?')){
            return;
        }
        router.delete(route('user.destroy', user.id));
       
     };
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between items-center"> 
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Users
            </h2>
            <Link
            href={route("user.create")}
            className="bg-emerald-600 py-1 px-3 text-white rounded
            shadow transition-all hover:bg-emerald-600">
                Add new
            </Link>
            </div>
        }>
        <Head title="Users" />
        { success &&(
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
            {success}
        </div>
        )}
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                    <div className="overflow-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">  
                            <tr className="text-nowrap">
                            <TableHeading 
                                name="id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                                <TableHeading 
                                name="name"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Name
                            </TableHeading>
                            <TableHeading 
                                name="role"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Role
                            </TableHeading>
                            <TableHeading 
                                name="email"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Email
                            </TableHeading>
                            <TableHeading 
                                name="created_at"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Created at
                            </TableHeading>
                            
                                <th className="px-3 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">  
                            <tr className="text-nowrap">
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3">
                                    <TextInput className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="User Name"
                                                onChange={e => searchFieldChanged('name', e.target.value)}
                                                onKeyDown={(e) => onKeyPress("name", e)}
                                                />
                                </th>
                                <th className="px-3 py-3">
                                    <SelectInput 
                                        className="w-full"
                                        defaultValue={queryParams.role}
                                        onChange={(e) =>
                                            searchFieldChanged('role', e.target.value)
                                            }  
                                        >
                                        <option value="">Select Role </option>
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                        <option value="manager">manager </option>
                                </SelectInput>
                                </th>
                                <th className="px-3 py-3">
                                <TextInput className="w-full"
                                                defaultValue={queryParams.email}
                                                placeholder="User Email"
                                                onChange={e => searchFieldChanged('email', e.target.value)}
                                                onKeyDown={(e) => onKeyPress("email", e)}
                                                />
                                </th>
                                <th className="px-3 py-3"></th>
                                <th className="px-3 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user)=>(
                            <tr className="bg-white border- dark:bg-gray-800 dark:border-gray-700"
                            key={user.id}>
                                <td className="px-3 py-3">{user.id}</td>
                                <td className="px-3 py-2 text-white text-nowrap
                                hover:underline ">
                                <Link href={route("user.show", { user: user.id })} aria-label={`Voir les Utilisateurs ${user.name}`}>
                                   {user.name}
                                </Link>
                                </td>
                                <td className="px-3 py-3">
                                <span className={`px-2 py-1 rounded text-white ${USER_ROLE_CLASS_MAP[user.role] || 'bg-gray-500'}`}>
                                    {USER_ROLE_TEXT_MAP[user.role]}
                                </span>
                                </td>
                                <td className="px-3 py-3">
                                {user.email}
                                </td>
                                <td className="px-3 py-3">
                                    {user.created_at}
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                <Link href={route('user.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                Edit
                                </Link>
                                <button
                                onClick={(e)=> deleteUser(user)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                Delete
                                </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                       </table>
                    </div>
                       <Pagination Links={users.meta.links} />
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}