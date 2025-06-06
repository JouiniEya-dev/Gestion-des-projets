<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description, // Correction ici
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d'),
            'due_date' => Carbon::parse($this->due_date)->format('Y-m-d'),
            'status' => $this->status,
            'priority' => $this->priority,
            'image_path' => $this->image_path ? 
            Storage::url(
            $this->image_path) : '',
            'project_id' => $this->project_id,
            'project' => $this->project ? new ProjectResource($this->project) : null,
            'assignedUser' => $this->assignedUser ? new UserResource($this->assignedUser) : null,
            'assigned_user_id' => $this->assigned_user_id,
            'createdBy' => $this->createdBy ? new UserResource($this->createdBy) : null,
            'updatedBy' => $this->updatedBy ? new UserResource($this->updatedBy) : null, // Correction ici
        ];
    }
}
