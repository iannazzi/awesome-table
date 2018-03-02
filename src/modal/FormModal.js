export class FormModal {
    constructor(id)
    {
        this.id = id;

        let modal_div = document.createElement('div');

        modal_div.className = "modal fade";
        modal_div.setAttribute('tabindex', -1);
        modal_div.setAttribute('id', this.id);
        modal_div.setAttribute('role', 'dialog');
        modal_div.setAttribute('data-backdrop', 'static');
        this.modal_div = modal_div;

        let modal_dialog_div =document.createElement('div');
        modal_div.appendChild(modal_dialog_div);
        modal_dialog_div.className = "modal-dialog";
        modal_dialog_div.setAttribute('id', this.id + '_dialog');
        modal_dialog_div.setAttribute('role', 'document');

        let modal_content_div =document.createElement('div');
        modal_dialog_div.appendChild(modal_content_div);
        modal_content_div.className = "modal-content";

        let modal_body_div =document.createElement('div');
        modal_content_div.appendChild(modal_body_div);
        modal_body_div.className = "modal-body";
        modal_body_div.setAttribute('id', this.id + '_body');
        this.modal_body_div = modal_body_div;

        let modal_footer_div =document.createElement('div');
        modal_content_div.appendChild(modal_footer_div);
        modal_footer_div.className = "modal-footer record_table_buttons";
        modal_footer_div.setAttribute('id', this.id + '_footer');
        this.modal_footer_div = modal_footer_div;


    }
    setBody(dom_object){
        this.modal_body_div.appendChild(dom_object);
    }
    get(){
        return this.modal_div;
    }
    create(modal_body) {



        let body= this.id+'_body';
        //this one needs bootstrap
        let div = document.createElement('div');


        let template = `
<div id="${this.id}" class="modal fade" tabindex="-1" role="dialog"  data-backdrop="static">
  <div id="${this.id}_dialog"class="modal-dialog" role="document">
    <div class="modal-content">
      
      <div id="${this.id + '_body'}" class="modal-body">
      </div> 
      
      <div id="${this.id}_footer"class="modal-footer">
        
      </div>
     
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
`
        div.innerHTML = template;

        let return_div = div.children[0];
        $(return_div).find('#'+this.id + '_body').html(modal_body);
        $(return_div).keypress(function (e) {
            if (e.which == 13) {
            }
        });
        this.modal_div = return_div;
        return return_div;
    }
    show()
    {
        $(this.modal_div).modal('show');
    }
    hide(){
        $(this.modal_div).modal('hide');
    }
    setFooter(dom_object){
        this.modal_footer_div.appendChild(dom_object);

//        $(this.modal_div).find('#'+this.id+'_footer').html(dom_object);
    }
}