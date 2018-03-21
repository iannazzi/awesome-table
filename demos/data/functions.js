export function addTemplate(title,id){
    let template =  `  <div class="container">
    <h1>${title}</h1>
    <div id="${id}"></div>
  </div>`
    let body = document.getElementById('body');
    body.insertAdjacentHTML( 'beforeend', template );
}