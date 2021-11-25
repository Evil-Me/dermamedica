export default function(ctx) {
  if(ctx.route.fullPath == '/appointment')
    ctx.redirect(301, 'https://de.fresha.com/book-now/zahn-oase-schweiz-gmbh-wzmbhll0/services?lid=377400&pId=351897')
}
