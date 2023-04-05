<?php

namespace Tests\Unit\Services\Auth;

use App\Models\User;
use App\Services\Auth\LoginUserService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Passport\PersonalAccessTokenResult;
use Tests\TestCase;

class LoginUserServiceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
   

    /** @test */
    public function it_throws_exception_with_incorrect_credentials()
    {
        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password',
        ];

        $this->expectException(ValidationException::class);

        $loginService = new LoginUserService();
        $loginService->loginUser($credentials);
    }
}
