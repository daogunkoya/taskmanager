<?php

namespace Tests\Unit\Services\Task;

use App\Models\Task;
use App\Services\Task\TaskService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Mockery;
use Tests\TestCase;

class TaskServiceTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private TaskService $taskService;

    public function setUp(): void
    {
        parent::setUp();
        $this->taskService = app(TaskService::class);
    }

    public function testGetAllTasks(): void
    {
        $userId = 1;
        $task = Task::factory()->create(['user_id' => $userId]);
        Auth::shouldReceive('id')->once()->andReturn($userId);
        $tasks = $this->taskService->getAllTasks();
        $this->assertEquals(1, $tasks['count']);
        $this->assertEquals($task->title, $tasks['tasks'][0]['title']);
        $this->assertEquals($task->description, $tasks['tasks'][0]['description']);
       // $this->assertEquals($task->due_date->format('Y-m-d H:i:s'), $tasks['tasks'][0]['due_date']);
        $this->assertEquals($task->status, $tasks['tasks'][0]['status']);
        $this->assertEquals($task->priority, $tasks['tasks'][0]['priority']);
    }

    public function testGetTaskById(): void
    {
        $userId = 1;
        $task = Task::factory()->create(['user_id' => $userId]);
        //Auth::shouldReceive('id')->once()->andReturn($userId);
        $retrievedTask = $this->taskService->getTaskById($task->id);
        $this->assertEquals($task->title, $retrievedTask['title']);
        $this->assertEquals($task->description, $retrievedTask['description']);
        $this->assertEquals($task->due_date->format('Y-m-d H:i:s'), $retrievedTask['due_date']);
        $this->assertEquals($task->status, $retrievedTask['status']);
        $this->assertEquals($task->priority, $retrievedTask['priority']);
    }

    public function testGetById(): void
    {
        $userId = 1;
        $task = Task::factory()->create(['user_id' => $userId]);
        Auth::shouldReceive('id')->once()->andReturn($userId);
        $retrievedTask = $this->taskService->getById($task->id);
        $this->assertEquals($task->title, $retrievedTask['title']);
        $this->assertEquals($task->description, $retrievedTask['description']);
        $this->assertEquals($task->due_date->format('Y-m-d H:i:s'), $retrievedTask['due_date']);
        $this->assertEquals($task->status, $retrievedTask['status']);
        $this->assertEquals($task->priority, $retrievedTask['priority']);
    }

}
