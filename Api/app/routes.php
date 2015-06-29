<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

/*Route::get('/', function()
{
	return View::make('hello');
});*/

Route::filter('cors', function($route, $request, $response)
{
    $response->headers->set('Access-Control-Allow-Origin', '*');
    return $response;
});

Route::resource('blogs','WebblogController');

Route::resource('generic', 'GenericController@performance');
Route::resource('generic/{table}/id/{id}', 'GenericController@show');
