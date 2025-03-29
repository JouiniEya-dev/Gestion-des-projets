<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        $user = auth()->user();

        $totalpendingTasks = Task::where('status', 'pending')->count();
        $mypendingTasks = Task::where('status', 'pending')->where('assigned_user_id', $user->id)->count();

        $totalProgressTasks = Task::where('status', 'in_progress')->count();
        $myProgressTasks = Task::where('status', 'in_progress')->where('assigned_user_id', $user->id)->count();

        $totalCompletedTasks = Task::where('status', 'completed')->count();
        $myCompletedTasks = Task::where('status', 'completed')->where('assigned_user_id', $user->id)->count();
        $activeTasks = Task::query()
            ->whereIn('status',['pending','in_progress'])
            ->where('assigned_user_id', $user->id)
            ->limit(10)
            ->get();
        $activeTasks = TaskResource::collection($activeTasks);
        return inertia('Dashboard', compact(
            'totalpendingTasks',
            'mypendingTasks',
            'totalProgressTasks',
            'myProgressTasks',
            'totalCompletedTasks',
            'myCompletedTasks',
            'activeTasks'
        ));
    }
}
