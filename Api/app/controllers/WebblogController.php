<?php

class WebblogController extends BaseController {

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

	public function index()
	{
        return Webblog::all();
	}

    public function show($id)
    {
        return Webblog::find($id);
    }

    public function store()
    {

    }

    public function update()
    {

    }

    public function destroy()
    {

    }

}