export class SuccessModal {
    constructor(id)
    {
        this.id = id;
        this.message_id = this.id +'_body';
    }
    create() {

        let div = document.createElement('div');

        let template = `
<div id="${this.id}" class="modal fade" tabindex="-1" role="dialog"  data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      
      <div  class="modal-body">
      <h2>Success!</h2>
      <p id="${this.message_id}"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-lg" id="confirmTrue" data-dismiss="modal">OK</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
`
        div.innerHTML = template;
        let return_div = div.children[0];
        $(return_div).keypress(function (e) {
            if (e.which == 13) {
                $(return_div).modal('hide');
            }
        });
        this.success_div = return_div;
        // this.message = document.getElementById(this.message_id);
        // console.log(this.message);
        return return_div;
    }
    addMessage(message){
        console.log(message);
        //this.message.innerHTML = message;
         $('#'+this.message_id).html(message);

    }
    show(message)
    {
        this.addMessage(message);
        $(this.success_div).modal('show');
    }
    hide(){
        $(this.success_div).modal('hide');
    }
}