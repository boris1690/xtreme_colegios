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
//Route::resource('usuarios','AplRefUsuarioController');
//Route::get('usuarios/{id}','AplRefUsuarioController');
//Route::get('usuarios/{id}','AplRefUsuarioController');
/*Route::resource('blogs','WebblogController');
Route::resource('usuarios','WebusuarioController');
Route::put('usuarios/{id}','WebusuarioController');
Route::delete('usuarios/{id}','WebusuarioController');*/




//Route::resource('generic', 'GenericController@performance');
//Route::resource('generic/{table}', 'GenericController@show');

Route::filter('auth', function()
{
    // Slight change to redirect to login route
    return Auth::basic();
});

Route::group(['prefix' => '/usuarios', 'before' => 'auth'],  function()
{
    Route::get('', ['uses' => 'AplRefUsuarioController@index']);

    Route::get('{id}', ['uses' => 'AplRefUsuarioController@show']);

    Route::post('', ['uses' => 'AplRefUsuarioController@store']);

    Route::put('{id}', ['uses' => 'AplRefUsuarioController@update']);

    Route::delete('{id}', ['uses' => 'AplRefUsuarioController@destroy']);

});

Route::get('/test', function(){
    $users = Aplrefusuario::all();
    foreach($users as $user){
        echo $user->username.'<br>';
    }
});