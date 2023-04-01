<?php

namespace App\Providers;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\Auth\LoginServiceInterface;
use App\Interfaces\Auth\RegisterServiceInterface;
use App\Services\Auth\LoginUserService;
use App\Services\Auth\RegisterUserService;

use App\Services\Task\TaskService;
use App\Services\Task\TaskServiceInterface;

use Illuminate\Support\Facades\Gate;


/**
 * @mixin \Eloquent
 */

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        $this->app->bind(LoginServiceInterface::class, LoginUserService::class);
        $this->app->bind(RegisterServiceInterface::class, RegisterUserService::class);

        $this->app->bind(TaskServiceInterface::class, TaskService::class);
    
        $this->registerRolesAndPermissions();
    
    
    }

     protected function registerRolesAndPermissions()
    {
        // Register permissions
       // Register permissions
       
        Permission::firstOrCreate(['name' => 'create task', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'edit task', 'guard_name' => 'api']);
        Permission::firstOrCreate(['name' => 'delete task', 'guard_name' => 'api']);

        // Register roles and assign permissions
        $role = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        $role->syncPermissions(['create task', 'edit task', 'delete task']);

        $role = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        $role->givePermissionTo('create task');

    }
}
