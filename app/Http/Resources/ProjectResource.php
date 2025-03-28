<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'description' => $this->description, 
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d'),
            'due_date' => Carbon::parse($this->due_date)->format('Y-m-d'),
            'status' => $this->status,
            'image_path' => $this->image_path ? 
            Storage::url(
            $this->image_path) : '',
            'createdBy' => $this->createdBy ? new UserResource($this->createdBy) : null,
            'updatedBy' => $this->updatedBy ? new UserResource($this->updatedBy) : null,
            
        ];
    }
}
