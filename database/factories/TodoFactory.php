<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $is_completed = rand(0, 1);
        return [
            'title' => $this->faker->text(40),
            'completed' => $is_completed,
            'completed_at' => $is_completed ? now() : null,
            'priority' => rand(0, 3),
            'user_id' => User::select('id')->inRandomOrder()->first()->id,
        ];
    }
}
