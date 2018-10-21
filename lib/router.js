module.exports = function(req, res, routes, callback) {
    var a;
    for (a = 0; a < routes.length; a++) {
        var incomingRoute = req.path.split('/');
        var routeExplode = routes[a].path.split('/');

        var compute = {path:[], data:{}, supercatch:false};

        var b;
        for (b = 0; b < routeExplode.length; b++) {
            if (compute.supercatch || routeExplode[b].startsWith('*')) {
                if (!compute.supercatch && req.path.startsWith(routeExplode.join('/').replace('*', ''))) {
                    compute.supercatch = true;
                }

                compute.path.push(incomingRoute[b]);
            } else if (routeExplode[b].startsWith(':')) {
                compute.data[routeExplode[b].replace(':', '')] = incomingRoute[b];

                compute.path.push(incomingRoute[b]);
            } else {
                compute.path.push(routeExplode[b]);
            }
        }
        
        if (compute.path.join('/') == req.path || compute.supercatch) {
            req.params = compute.data;

            if (!callback('request', req, res)) {
                return false;
            }

            if (!callback('response', req, res)) {
                return false;
            }

            if (!callback('serve', req, res,  routes[a].callback)) {
                return false
            }

            return false;
        }
    }

    return true;
}