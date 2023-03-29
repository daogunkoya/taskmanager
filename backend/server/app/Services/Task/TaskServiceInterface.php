<?php

namespace App\Services\Task;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;

interface TaskServiceInterface
{
    public function getAllTasks(): array;

    public function createTask(array $data): array;

    public function getTaskById(string $id): ?Task;

    public function updateTask(string $id, array $data): ?array;

    public function deleteTask(string $id): bool;
   
    public function addTaskComment(): ?Task;
   
    public function updateProgress():bool;
    
    public function getReport(): ?Task;
}
