<?php


class AplNavigateController extends BaseController{

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
            $response = DB::table('apl_ref_usuario')->where('apl_ref_usuario.id','=', Auth::user()->id)
                            ->join('aplrefperfil_aplrefusuario', 'apl_ref_usuario.id', '=', 'aplrefperfil_aplrefusuario.aplrefusuario_id')
                            ->join('aplrefperfil_aplsistemaopcion', 'aplrefperfil_aplrefusuario.aplrefperfil_id', '=', 'aplrefperfil_aplsistemaopcion.aplrefperfil_id')
                            ->join('apl_sistema_opcion', 'apl_sistema_opcion.id', '=', 'aplrefperfil_aplsistemaopcion.aplsistemaopcion_id')
                            ->join('apl_sistema_modulo', 'apl_sistema_modulo.id', '=', 'apl_sistema_opcion.aplsistemamodulo_id')
                            ->select('apl_ref_usuario.id','apl_ref_usuario.nombre_usuario','apl_ref_usuario.apellido_usuario','apl_sistema_opcion.id as id_sistema_opcion','apl_sistema_opcion.nombre_opcion','apl_sistema_modulo.nombre_modulo')
                            ->distinct()
                            ->get();

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