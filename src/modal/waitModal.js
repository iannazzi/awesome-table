export function createWaitModal() {
    //this one needs bootstrap
    let div = document.createElement('div');
    // div.setAttribute("class", "modal fade");
    // div.setAttribute("role", "dialog");
    // div.setAttribute("id", "wait_modal");
    // div.setAttribute("tabindex", "-1");
    // div.setAttribute("aria-labelledby", "myModalLabel");
    // div.setAttribute("aria-hidden", "true");
    // div.setAttribute("data-keyboard", "false");
    // div.setAttribute("data-backdrop", "static");
    // let div2 = document.createElement('div');
    // div.setAttribute("class", "modal fade");

    let msg1 = 'Please wait...';
    let msg2 = 'I am communicating with the server...';

    let template = `
<div class="modal" id="wait_modal" tabindex="-1" role="dialog"  data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="modalWaitContents">
                    <div class="modalWaitIconDiv">               
                        <i class="fa fa-circle-o-notch fa-spin"></i>
                    </div>
                    <div class="modalWaitText">
                        <h2>${msg1}</h2>
                        <p>${msg2}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
    div.innerHTML = template;
    return div.children[0];
}