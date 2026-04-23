<?php

use App\Exceptions\BusinessException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi(); 

        $middleware->validateCsrfTokens(except: [
            'api/login',
            'api/logout',
            'api/*'
        ]);

        $middleware->alias([
            'abilities' => \Laravel\Sanctum\Http\Middleware\CheckAbilities::class,
            'ability' => \Laravel\Sanctum\Http\Middleware\CheckForAnyAbility::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //VALIDATIONS HANDLING
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, $request) {
            if ($request->expectsJson())
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials.',
                    'errors' => $e->errors(),
                ], 422);
        });

        //BUSINESS EXCEPTIONS HANDLING
        $exceptions->render(function (BusinessException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) 
                return response()->json(['success' => false, 'message' => $e->getMessage()], 409);
        });

        //GENERAL EXCEPTIONS HANDLING
        $exceptions->render(function (Throwable $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                if ($e instanceof \Illuminate\Auth\AuthenticationException)
                    return response()->json(['success' => false, 'message' => 'Unauthenticated.'], 401);

                $msg = config('app.debug') ? $e->getMessage() : 'Internal server error.';
                return response()->json(['success' => false, 'message' => $msg], 500);
            }
        });
    })->create();