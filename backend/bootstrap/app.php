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
        $middleware->statefulApi(); // You already have this
        
        $middleware->validateCsrfTokens(except: [
            'login', 
            'register',
            'logout',
            'api/*',
        ]);

        $middleware->group('api', [
            \Illuminate\Cookie\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class, // <--- ADD THIS
            //\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (BusinessException $e, $request) { //DOMAIN EXCEPTIONS
            if ($request->is('api/*') || $request->expectsJson()) 
                return response()->json(['success' => false, 'message' => $e->getMessage()], 409);
        });
        
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Resource not found.'], 404);
            }
        });

        $exceptions->render(function (Throwable $e, $request) { //UNEXPECTED SERVER ERRORS
            if ($request->is('api/*') || $request->expectsJson()) {
                $msg = config('app.debug') ? $e->getMessage() : 'Internal server error.';
                return response()->json(['success' => false, 'message' => $msg], 500);
            }
        });

        $exceptions->render(function (\Illuminate\Validation\ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation errors',
                    'errors' => $e->errors(),
                ], 422);
            }
        });
    })->create();