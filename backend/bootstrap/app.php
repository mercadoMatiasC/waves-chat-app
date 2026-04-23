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
        ]);

        $middleware->alias([
            'abilities' => \Laravel\Sanctum\Http\Middleware\CheckAbilities::class,
            'ability' => \Laravel\Sanctum\Http\Middleware\CheckForAnyAbility::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // 1. Handle Validation specifically (should return 422)
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials.', // Or $e->getMessage()
                    'errors' => $e->errors(),
                ], 422); // Use 422 for validation/auth failures
            }
        });

        // 2. Handle your Business Logic exceptions (return 409)
        $exceptions->render(function (BusinessException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) 
                return response()->json(['success' => false, 'message' => $e->getMessage()], 409);
        });

        // 3. ONLY catch general Throwable at the very end
        $exceptions->render(function (Throwable $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                // Check if it's an AuthenticationException specifically
                if ($e instanceof \Illuminate\Auth\AuthenticationException) {
                    return response()->json(['success' => false, 'message' => 'Unauthenticated.'], 401);
                }

                $msg = config('app.debug') ? $e->getMessage() : 'Internal server error.';
                return response()->json(['success' => false, 'message' => $msg], 500);
            }
        });
    })->create();