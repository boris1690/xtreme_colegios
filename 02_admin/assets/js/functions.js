/**
 * Created by BORIS on 23/9/15.
 */

function decodeJson( object ) {
    console.log(object);
    this.status = object.data.status;
    this.message = object.data.message;

    delete object.data.status;
    delete object.data.message;
    this.data = object.data;
}