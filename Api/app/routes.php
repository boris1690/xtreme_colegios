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

//region Filtro cors
Route::filter('cors', function($route, $request, $response)
{
    $response->headers->set('Access-Control-Allow-Origin', '*');
    return $response;
});
//endregion

//region Filtro de autenticacion
Route::filter('authenticated',function(){

    $token = Request::header('token');

    $user = Aplrefusuario::where('authentication_token', '=', $token)->get();
    if($user->count() == 0){
        return Response::json(['Content' => 'No esta autorizado'], 401);
    }


});
//endregion

//region Route post login
Route::post('login', function()
{
    // Recupero datos de la peticion
    $input = Input::all();
    $data = array();

    try {
        $statusCode = 200;
        $message = "OK";

        //recupero campos y los valido
        if (isset($input['email'])) $email = $input['email']; else throw new Exception('Campo obligatorio EMAIL');
        if (isset($input['password'])) $password = $input['password']; else throw new Exception('Campo obligatorio PASSWORD');
        if (isset($input['colegio'])) $colegio = $input['colegio']; else throw new Exception('Campo obligatorio COLEGIO');

        if (Auth::attempt(array('email' => $email, 'password' => $password, 'apldatcolegio_id' => $colegio))) {
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
//endregion

//region Route Group Usuarios privado
Route::group(['prefix' => '/usuarios','before' => 'authenticated'],  function()
{
        Route::get('', ['uses' => 'AplRefUsuarioController@index']);

        Route::get('{id}', ['uses' => 'AplRefUsuarioController@show']);

        Route::post('', ['uses' => 'AplRefUsuarioController@store']);

        Route::put('{id}', ['uses' => 'AplRefUsuarioController@update']);

        Route::delete('{id}', ['uses' => 'AplRefUsuarioController@destroy']);

});
//endregion pri pri priva


//region Route Group Usuarios privado
Route::get('/publicocolegios',  function()
{
    try {
        $statusCode = 200;
        $message = "OK";
        $response = DB::table('apl_dat_colegio')->where('estado_colegio','=','A')->paginate($limit = 100);
        //$response = $response::paginate($limit=100);

    } catch (Exception $e) {
        $statusCode = 400;
        $message = $e->getMessage();
    } finally {
        $response['status'] = $statusCode;
        $response['message'] = $message;
    }

    return Response::json($response, $statusCode);

});
//endregion pri pri priva

