export function createConfirmModal() {
    //this one needs bootstrap
    let div = document.createElement('div');

    let template = `
<div class="confirmModalDiv modal fade" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="confirmModalContent modal-content">
      <div class="confirmModalHeader modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  
      </div>
      <div class="confirmModalBody modal-body">
         <h3 id="confirmMessage"></h3>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-danger-light btn-lg" data-dismiss="modal" id="confirmFalse">Cancel</button>
        <button type="button" class="btn btn-primary btn-lg" id="confirmTrue">Confirm</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
`
    div.innerHTML = template;
    return div.children[0];
}