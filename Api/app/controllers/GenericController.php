<?php

class GenericController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/



    public function show($table,$id)
    {
        try {
            $statusCode = 200;
            $response = DB::table($table)->select('*')->where('id', $id)->get();
        } catch (Exception $e) {
            $statusCode = 400;
        }

        return Response::json($response, $statusCode);


    }

    public function performance($table)
    {
        try {
            $statusCode = 200;

            $response = DB::table($table)->select('*')->get();
        } catch (Exception $e) {
            $statusCode = 400;
        }

        $response['status'] = $statusCode;

        return Response::json($response, $statusCode);


    }


}