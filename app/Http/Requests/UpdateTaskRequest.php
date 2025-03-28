<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à faire cette requête.
     */
    public function authorize(): bool
    {
        return true; // À adapter selon la logique d'autorisation
    }

    /**
     * Règles de validation pour la mise à jour d'une tâche.
     */
    public function rules(): array
    {
        return [
          "name" => ['required', 'max:255'],
            'image' =>['nullable','image'],
            "description" =>[ 'nullable','string'],
            'due-date' => ['nullable' , 'date'],
            'project_id' => ['required', 'exists:projects,id'],
            'assigned_user_id' => ['required', 'exists:users,id'],
            'status' => [
                'required' , 
                Rule::in(['pending' , 'in_progress', 'completed']
                )],
            'priority' => [
                'required' , 
                Rule::in(['low' , 'medium', 'high']
                )],
            ];
    }
}
