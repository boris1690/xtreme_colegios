<?php

class WebusuarioController extends BaseController {

	/* -- Xtreme --
	 * -- Boris Benalcazar --
	 * -- 0984893627 --
	 * -- boris_90@hotmail.es --
	 *
	*/

	public function index()
	{
        try {
            $statusCode = 200;
            $message = "OK";
            $response = Webusuario::all();

        } catch (Exception $e) {
            $statusCode = 400;
            $message = $e->getMessage();

        } finally {
            $response['status'] = $statusCode;
            $response['message'] = $message;
        }

        return Response::json($response, $statusCode);

	}

    public function show($id)
    {
        try {
            $statusCode = 200;
            $message = "OK";
            $response = Webusuario::find($id);

        } catch (Exception $e) {
            $statusCode = 400;
            $message = $e->getMessage();
        } finally {
            $response['status'] = $statusCode;
            $response['message'] = $message;
        }



        return Response::json($response, $statusCode);
    }

    public function store()
    {
        // Recupero datos de la peticion
        $input = Input::all();

        // Instancio tabla web_usuario
        $tabla = new Webusuario;

        try {
            $statusCode = 200;
            $message = "OK";

            // Consulata columnas de la tabla
            $columns = DB::connection()
                ->getDoctrineSchemaManager()
                ->listTableColumns('web_usuarios');

            foreach($columns as $column) {

                $input['id'] = (DB::table('web_usuarios')->max('id') + 1);

                if(array_key_exists($column->getName(), $input))
                {
                    $tabla->{$column->getName()} = $input[$column->getName()];
                }
                elseif(!array_key_exists($column->getName(), $input) && $column->getNotnull())
                {
                    throw new Exception('Campo obligatorio ' . $column->getName());
                }
            }

            $tabla->save();
            $response = $input;

            //$usuario->save();
        } catch (Exception $e) {
            $statusCode = 400;
            $message = $e->getMessage();
        } finally {
            $response['status'] = $statusCode;
            $response['message'] = $message;
        }

        return Response::json($response, $statusCode);

    }

    public function update($id)
    {
        // Recupero datos de la peticion
        $input = Input::all();

        // Instancio tabla web_usuario
        $tabla = new Webusuario;

        try {
            $statusCode = 200;
            $message = "OK";

            // Consulata columnas de la tabla
            $columns = DB::connection()
                ->getDoctrineSchemaManager()
                ->listTableColumns('web_usuarios');

            $tabla = Webusuario::find($id);
            $input['id'] = $id;

            foreach($columns as $column) {

                // Valido que exista el campo en el array
                if(array_key_exists($column->getName(), $input))
                {
                    $tabla->{$column->getName()} = $input[$column->getName()];
                }
                elseif(!array_key_exists($column->getName(), $input) && $column->getNotnull())
                {
                    throw new Exception('Campo obligatorio ' . $column->getName());
                }
            }

            $tabla->save();
            $response = $input;

            //$usuario->save();
        } catch (Exception $e) {
            $statusCode = 400;
            $message = $e->getMessage();
        } finally {
            $response['status'] = $statusCode;
            $response['message'] = $message;
        }

        return Response::json($response, $statusCode);
    }

    public function destroy($id)
    {
        try {
            $statusCode = 200;
            $message = "OK";

            $tabla = Webusuario::find($id);
            $tabla->delete();

        } catch (Exception $e) {
            $statusCode = 400;
            $message = $e->getMessage();
        } finally {
            $response['status'] = $statusCode;
            $response['message'] = $message;
        }

        return Response::json($response, $statusCode);
    }

}