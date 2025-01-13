<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/env-check', function() {
    return [
        'app_url' => env('APP_URL'),
        'db_host' => env('DB_HOST'),
        'db_name' => env('DB_DATABASE'),
        'db_connection' => env('DB_CONNECTION'),
        'app_env' => env('APP_ENV')
    ];
});

require __DIR__.'/auth.php';
