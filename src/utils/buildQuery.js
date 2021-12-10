export default function(values) {
    var esc = encodeURIComponent;
    var query = []
    Object.keys(values)
        .map(k => {
            if(values[k] != undefined) {
                query.push(esc(k) + '=' + esc(values[k]))
            }
        })
    return query.join('&')
}