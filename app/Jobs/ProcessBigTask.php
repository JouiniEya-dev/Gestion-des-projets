<?php

namespace App\Jobs;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessBigTask implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $task;

    /**
     * Create a new job instance.
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info("Processing task ID: {$this->task->id}");

        // Simulation de traitement lourd (ex: génération de rapport, export CSV, etc.)
        sleep(5); // À remplacer par un vrai traitement

        // Marquer la tâche comme complétée
        $this->task->update(['status' => 'completed']);

        Log::info("Task ID: {$this->task->id} completed.");
    }
}
