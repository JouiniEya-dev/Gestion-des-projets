import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import Pagination from "@/Components/Pagination";
import { 
    TASK_STATUTS_CLASS_MAP,
    TASK_STATUTS_TEXT_MAP,
} from "../constants.jsx";
import { Link, router } from "@inertiajs/react";
export default function TasksTable({
    tasks, 
    success,
    queryParams = null, 
    hideTaskColumn = false }){
    queryParams = queryParams || {};
    const searchFieldChanged = (name , value) => {
            if (value) {
                queryParams[name] = value
            } else{
                delete queryParams[name]
            }
            router.get(route('task.index'), queryParams);
        };
         const onKeyPress =(name, e)=>{
            if (e.key!== 'Entrer') return;
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
            router.get(route('task.index'), queryParams);
         };
         const deleteTask = (task) => {
            if (!window.confirm('Are you sure you want to delete the task ? :(')){
                return;
            }
            router.delete(route('task.destroy', task.id));
           
         };
    return(
        <>
        { success &&(
        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
            {success}
        </div>
        )}
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">                                  <tr className="text-nowrap">
                        <TableHeading 
                            name="id"
                            sort_field={queryParams.sort_field}
                            sort_direction={queryParams.sort_direction}
                            sortChanged={sortChanged}
                            >
                            ID
                            </TableHeading>
                            <th className="px-3 py-3">Image</th>
                            {!hideTaskColumn && (
                                <th className="px-3 py-3">Project Name</th>
                            )}

                            <TableHeading 
                            name="name"
                            sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    >
                                        Name
                                    </TableHeading>
                                    <TableHeading 
                                        name="status"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    >
                                        Status
                                    </TableHeading>
                                    <TableHeading 
                                        name="created_at"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    >
                                        Created at
                                    </TableHeading>
                                    <TableHeading 
                                        name="due_date"
                                        sort_field={queryParams.sort_field}
                                        sort_direction={queryParams.sort_direction}
                                        sortChanged={sortChanged}
                                    >
                                        Due Date
                                    </TableHeading>
                                        <th className="px-3 py-3">Created By</th>
                                        <th className="px-3 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">  
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        {!hideTaskColumn && (
                                            <th className="px-3 py-3"></th>
                                    )}
                                        <th className="px-3 py-3">
                                            <TextInput className="w-full"
                                                        defaultValue={queryParams.name}
                                                        placeholder="Task Name"
                                                        onBlur={e=> searchFieldChanged('name' , e.target.value)}
                                                        onKeyPress={(e)=> onKeyPress("name", e)}
                                                        />
                                        </th>
                                        <th className="px-3 py-3">
                                        <SelectInput 
                                                    className="w-full"
                                                    defaultValue={queryParams.status}
                                                    onChange={(e) =>
                                                         searchFieldChanged("status", e.target.value)
                                                        }  // Correction ici
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Completed">Completed</option>
                                        </SelectInput>
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3 text-nowrap"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task)=>(
                                    <tr className="bg-white border- dark:bg-gray-800 dark:border-gray-700"
                                    key={task.id}>
                                        <td className="px-3 py-3">{task.id}</td>
                                        <td className="px-3 py-3">
                                            <img src={task.image_path} style={{width : 60 }} />
                                        </td>
                                        {!hideTaskColumn &&( 
                                            <td className="px-3 py-3">{task.project.name}</td>
                                        )}
                                        <th className="px-3 py-3 text-white hover:underline">
                                        <Link href={route("task.show" , task.id)} aria-label={`Voir le projet ${task.name}`}>
                                        {task.name}
                                        </Link>

                                        </th>
                                        <td className="px-3 py-3">
                                        <span className={`px-2 py-1 rounded text-nowrap text-white ${TASK_STATUTS_CLASS_MAP[task.status] || 'bg-gray-500'}`}>
                                            {TASK_STATUTS_TEXT_MAP[task.status]}
                                        </span>
                                        </td>
                                        <td className="px-3 py-3">{task.created_at}</td>
                                        <td className="px-3 py-3">{task.due_date}</td>
                                        <td className="px-3 py-3">{task.createdBy.name}</td>
                                        <td className="px-3 py-3 text-nowrap">
                                        <Link 
                                        href={route('task.edit', task.id)} 
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                        Edit
                                        </Link>
                                        <button
                                        onClick={(e)=> deleteTask(task)}
                                         className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                        Delete
                                        </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                               </table>
            </div>
               <Pagination Links={tasks.meta.links} />
            </>
    );
}