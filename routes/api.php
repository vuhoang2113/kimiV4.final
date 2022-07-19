<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\UserController;
// use App\Http\Controllers\API\FileController;
use App\Http\Controllers\API\AboutController;
use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\ContactGroupController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::name('api.')->group(function () {
    Route::prefix('/auth')->name('auth.')->group(function () {
        Route::post('/login', [AuthController::class, 'login'])->name('login');
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
            Route::post('/change-password', [AuthController::class, 'changePassword'])->name('changePassword');
        });
    });

    Route::post('/register', [RegisterController::class, 'register'])->name('register');

    Route::prefix('/profile')->name('profile.')->group(function () {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/me', [UserController::class, 'me'])->name('me');
            Route::put('/me', [UserController::class, 'update'])->name('update');
            Route::post('/avatar', [UserController::class, 'uploadAvatar'])->name('uploadAvatar');
            Route::post('/background', [UserController::class, 'uploadBackground'])->name('uploadBackground');
            Route::get('/check-saved-contact/{uid}', [UserController::class, 'checkSavedContact'])->name('checkSaveContact');
        });
        Route::get('/{uid}', [UserController::class, 'show'])->name('show');
    });

    Route::prefix('/about')->name('about.')->middleware('auth:sanctum')->group(function () {
        Route::get('/', [AboutController::class, 'index'])->name('index');
        Route::post('/social-link', [AboutController::class, 'store'])->name('store');
        Route::post('/update-list/', [AboutController::class, 'updateList'])->name('updateList');
        Route::put('/social-link/{id}', [AboutController::class, 'update'])->name('update');
        Route::delete('/social-link/{id}', [AboutController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('setting')->middleware('auth:sanctum')->name('setting.')->group(function () {
        Route::prefix('user-setting')->name('userSetting.')->group(function () {
            Route::get('/', [SettingController::class, 'getUserSetting'])->name('getUserSetting');
            Route::put('/', [SettingController::class, 'updateUserSetting'])->name('updateUserSetting');
        });
    });

    Route::prefix('contact')->middleware('auth:sanctum')->name('contact.')->group(function () {
        Route::get('/', [ContactController::class, 'getUserContact'])->name('getUserContact');
        Route::post('/', [ContactController::class, 'createUserContact'])->name('createUserContact');
        Route::delete('/{id}', [ContactController::class, 'deleteUserContact'])->name('deleteUserContact');
        Route::prefix('group')->name('group.')->group(function () {
            Route::get('/', [ContactGroupController::class, 'getUserContactGroup'])->name('getUserContactGroup');
            Route::post('/', [ContactGroupController::class, 'createUserContactGroup'])->name('createUserContactGroup');
            Route::delete('/{id}', [ContactGroupController::class, 'deleteUserContactGroup'])->name('deleteUserContactGroup');
        });
    });
});
