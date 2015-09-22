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

Route::post('login', function()
{
    // Recupero datos de la peticion
    $input = Input::all();
    $data = array();

    try {
        $statusCode = 200;
        $message = "OK";
        if (isset($input['email'])) $email = $input['email']; else throw new Exception('Campo obligatorio EMAIL');
        if (isset($input['password'])) $password = $input['password']; else throw new Exception('Campo obligatorio PASSWORD');

        if (Auth::attempt(array('email' => $email, 'password' => $password))) {
            //loop para crear un token unico
            while (true) {
                $token = str_random(15); //TODO: usar una manera mas segura para generar el token
                $user = Aplrefusuario::where('authentication_token', '=', $token)->get();

                if ($user->count() > 0) continue;
                else break;
            }

            //setear el token para el usuario
            $user = Auth::user();
            $user->authentication_token = $token;
            $user->save();

            // Genero la Data
            $data['0']['auth_token'] = $token;
            $response = Paginator::make($items = $data, $totalItems = 1, $perPage = 1);

        } else {

        }
    } catch (Exception $e) {
        $statusCode = 400;
        $message = $e->getMessage();
    } finally {
        $response['status'] = $statusCode;
        $response['message'] = $message;
    }

    return Response::json($response, $statusCode);
});

Route::group(['prefix' => '/usuarios','before' => 'authenticated'],  function()
{


        Route::get('', ['uses' => 'AplRefUsuarioController@index']);

        Route::get('{id}', ['uses' => 'AplRefUsuarioController@show']);

        Route::post('', ['uses' => 'AplRefUsuarioController@store']);

        Route::put('{id}', ['uses' => 'AplRefUsuarioController@update']);

        Route::delete('{id}', ['uses' => 'AplRefUsuarioController@destroy']);

});


Route::filter('authenticated',function(){
    $token = Request::header('token');

    $user = Aplrefusuario::where('authentication_token', '=', $token)->get();
    if($token && $user->count() == 0){
        return Response::json(['Content' => 'No esta autorizado'], 401);
    }

});