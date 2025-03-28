<?php

namespace Database\Seeders;

use App\Models\project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'eya',
            'email' => 'jouiniieya6@gmail.com',
            'password'=>Hash::make('eya123456'),
            'email_verified_at'=>now()
            
        ]);
        $user = User::find(1); // Remplace 1 par l'ID de l'utilisateur
        $user->email_verified_at = now();
        $user->save();
        project::factory()
        ->count(30)
        ->hasTasks(30)
        ->create();
    }
}
