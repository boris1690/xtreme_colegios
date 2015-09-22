<?php


class AplRefUsuarioController extends BaseController{

	/* -- Xtreme --
	 * -- Boris Benalcazar --
	 * -- 0984893627 --
	 * -- boris_90@hotmail.es --
	 *
	*/

    public $table = 'apl_ref_usuario';

	public function index()
	{

        try {
            $statusCode = 200;
            $message = "OK";
            $response = Aplrefusuario::paginate(100);

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
            $response = Aplrefusuario::where('id','=',$id);
            //$response = $response::paginate($limit=100);

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
        $tabla = new Aplrefusuario;

        try {
            $statusCode = 200;
            $message = "OK";



            // Consulata columnas de la tabla
            $columns = DB::connection()
                ->getDoctrineSchemaManager()
                ->listTableColumns($this->table);

            foreach($columns as $column) {

                $input['id'] = (DB::table($this->table)->max('id') + 1);

                if(array_key_exists($column->getName(), $input))
                {
                    if($column->getName()=='password_username')
                        $tabla->{$column->getName()} = Hash::make($input[$column->getName()]);
                    else
                        $tabla->{$column->getName()} = $input[$column->getName()];
                }
                elseif(!array_key_exists($column->getName(), $input) && $column->getNotnull())
                {
                    throw new Exception('Campo obligatorio ' . $column->getName());
                }
            }

            // validacion de usuario
            $sql = Aplrefusuario::Where('apldatcolegio_id','=', $input['apldatcolegio_id'])
                ->Where(function($query) use ($input)
                {
                    $query->orwhere('identificacion_usuario','=', $input['identificacion_usuario'])
                        ->orWhere('username_usuario','=', $input['username_usuario']);
                })->get();

            if(count($sql)>0)throw new Exception('Usuario ya existe ');

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
        $tabla = new Aplrefusuario;

        try {
            $statusCode = 200;
            $message = "OK";

            // Consulata columnas de la tabla
            $columns = DB::connection()
                ->getDoctrineSchemaManager()
                ->listTableColumns($this->table);

            $tabla = Aplrefusuario::find($id);
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

            $tabla = Aplrefusuario::find($id);
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