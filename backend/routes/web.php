<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

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

Route::get('/db-test', function() {
    try {
        DB::connection()->getPdo();
        return ['status' => 'Connected successfully!'];
    } catch (\Exception $e) {
        return [
            'status' => 'Connection failed',
            'error' => $e->getMessage(),
            'db_host' => config('database.connections.mysql.host')
        ];
    }
});

require __DIR__.'/auth.php';
