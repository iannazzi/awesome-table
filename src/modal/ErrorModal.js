export class ErrorModal {
    constructor(id)
    {
        this.id = id;
        this.error_body_id = this.id +'_body';
    }
    createErrorModal() {
        let body= this.id+'_body';
        //this one needs bootstrap
        let div = document.createElement('div');

        let template = `
<div id="${this.id}" class="modal fade" tabindex="-1" role="dialog"  data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      
      <div id="${this.error_body_id}" class="modal-body">
         
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-lg" id="${this.id}_confirmTrue" >OK</button>
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
        let self = this;
        $(document).on("click", '#' + this.id + '_confirmTrue', function(event){
            self.hide();
        });
        this.error_div = return_div;
        return return_div;
    }
    addErrorMessage(message_array){
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        h2.innerHTML = 'There was a problem:'
        div.appendChild(h2);
        let ul = document.createElement('ul');
        ul.className = "errorList";
        let li, msg;

        for(let key in message_array){
            msg = message_array[key];
            msg.forEach(error_msg => {
                li = document.createElement('li');
                li.innerHTML = error_msg;
                ul.appendChild(li);
            })

        }
        div.appendChild(ul);
        $('#' + this.error_body_id).html(div);
        //return div;
    }
    show()
    {
        console.log('showing error modal')

        $(this.error_div).modal('show');
    }
    hide(){
        $(this.error_div).modal('hide');
    }
    onClick(){
        console.log('user clicked modal dismiss');
    }

}