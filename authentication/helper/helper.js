// export function createResponse(status, code, message, document) {
//     return {"status":status,"code":code,"message":message,"document":document};
// }
//
// export let Success = "Success";

function Helper(){
    this.Success = "Success";
    this.Error = "Error";

	this.createResponse = function(status,code,message,document){
        return {"status":status,"code":code,"message":message,"document":document};
    };

	this.checkPermission = function (req,action,_callback) {
        try{
            // ToDo - check permission
            return _callback(1);
        } catch (ex) {
            console.error("Internal error:" + ex);
            return _callback(0);
        }
    };
}

module.exports = new Helper();
