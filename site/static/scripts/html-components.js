
export function GetPopupMessageHTML(obj) {
    
    console.log(obj);
    let html = 
        `<h1 style='margin:0'>`                       +
            `Secția de votare nr. ${obj.id}`          +
        `</h1>`                                       +
        `<hr>`                                        +
        `<h2 style='margin:0'>`                       +
            `${obj.name}`                             +
        `</h2>`                                       +
        `<p style='margin:0'>`                        +
            `<a href='${obj.url}'>${obj.address}</a>` +
        `</p>`;
    
    if (obj.website) {
        html += 
            `<p style='margin:0'>`               +
                `<a href='${obj.website}'>`      + 
                    `${obj.website}`             + 
                `</a>`                           +
            `</p>`;
    }
    
    if (obj.phone) {
        html +=
            `<p style='margin:0'>`                          +
                `Telefon <a href='tel: ${obj.phone}'>` +
                    `${obj.phone}`                     +
                `</a>`                                      +
            `</p>`;
    }
    
    return html
}
