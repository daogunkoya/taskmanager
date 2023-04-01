<?php
namespace Database\Factories;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
      
        //var_dump('user **********', $user_up['id']);

        $user =  User::factory()->create();
        $user_up = $user->toArray();
        
        $user_id =  $user_up['id'];
        return [
            'user_id' =>$user_id,
            'assigned_to' => function () {
                return User::factory()->create()->id;
            },
            'title' => $this->faker->sentence,
            'priority' => $this->faker->randomElement(['Low', 'Medium', 'High']),
            'progress' => $this->faker->numberBetween(0, 100),
            'description' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['todo', 'in_progress', 'completed']),
            'due_date' => $this->faker->dateTimeBetween('+1 day', '+1 week')->format('Y-m-d H:i:s'),
        ];
    }
}
