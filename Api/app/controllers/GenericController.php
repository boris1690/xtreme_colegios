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



    public function show($jsonData)
    {
        print_r($jsonData);
        /*$arraytable = json_decode($jsontable,true);
        $arrayid = json_decode($jsonid,true);


        try {
            foreach(array_combine($arraytable['tables'],$arrayid["id"]) as $table => $id) {
                $statusCode = 200;
                $message = "OK";
                $response[$table] = DB::table($table)->select('*')->where('estado', 'A')->where('id', $id)->get();
                $response[$table]['status'] = $statusCode;
                $response[$table]['message'] = $message;
            }

        } catch (Exception $e) {
            $statusCode = 400;
            $message = $e->getMessage();

            $response['status'] = $statusCode;
            $response['message'] = $message;
        }

        return Response::json($response, $statusCode);*/
    }

    public function performance($jsonData)
    {

        $array = json_decode($jsonData,true);


        try {
            foreach ($array['tables'] as $item=>$value) {

                $table = $item;
                $fields = implode(",",$value['fields']);



                $statusCode = 200;
                $message = "OK";
                $response[$table] = DB::select('select ' . $fields . ' from ' . $table);

                //$response[$item]['status'] = $statusCode;
                //$response[$item]['message'] = $message;
            }

        } catch (Exception $e) {
            $statusCode = 400;
            $message = $e->getMessage();

            $response[$item]['status'] = $statusCode;
            $response[$item]['message'] = $message;
        }

        return Response::json($response, $statusCode);

    }


}