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
        
        //VALIDATION (422)
        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid data.',
                    'errors' => $e->errors(),
                ], 422);
            }
        });

        //MODEL NOT FOUND (404)
        $exceptions->render(function (\Illuminate\Database\Eloquent\ModelNotFoundException $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'The requested resource does not exist.'
            ], 404);
        });

        //BUSINESS LOGIC (409)
        $exceptions->render(function (BusinessException $e, $request) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 409);
        });

        //READ ID ON NULL
        $exceptions->render(function (\Error $e, $request) {
            if (str_contains($e->getMessage(), 'read property "id" on null')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Internal logic error: Tried to access an ID on a non-existent object.'
                ], 500);
            }
        });

        //GLOBAL FALLBACK
        $exceptions->render(function (Throwable $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                if ($e instanceof \Illuminate\Auth\AuthenticationException) {
                    return response()->json(['success' => false, 'message' => 'Unauthenticated.'], 401);
                }

                $status = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : 500;
                $msg = config('app.debug') ? $e->getMessage() : 'Internal server error.';
                
                return response()->json(['success' => false, 'message' => $msg], $status);
            }
        });
    })->create();