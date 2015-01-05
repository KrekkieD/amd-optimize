(function () {

    'use strict';

    module.exports = resolve;

    function resolve (path, config) {

        var paths = config.paths || {};

        return resolvePaths(path, paths);

        // TODO: implement shims

    }

    function resolvePaths (path, paths) {

        var keys = Object.keys(paths || {});
        var keyLength = keys.length;

        var resolvedPath = {
            resolved: false,
            path: path,
            matchValue: 0
        };

        for (var i = 0; i < keyLength; i++) {

            if (path.indexOf(keys[i]) === 0) {

                // split the key on '/' to determine depth (== value)
                var matchValue = keys[i].split('/').length;

                // this match overrules any previous matches because it has a deeper match
                if (matchValue > resolvedPath.matchValue) {

                    resolvedPath.resolved = true;
                    resolvedPath.matchValue = matchValue;
                    // creates: { pathKey: 'some/path', pathValue: '/resolved/path' }
                    resolvedPath.matchPath = {
                        pathKey: keys[i],
                        pathValue: paths[keys[i]]
                    };

                }

            }

        }

        // if there's a match, parse the path
        if (resolvedPath.resolved === true) {

            if (resolvedPath.matchPath.pathValue === 'empty:') {
                resolvedPath.path = 'empty:';
            }
            else {
                resolvedPath.path = resolvedPath.path.replace(
                    resolvedPath.matchPath.pathKey,
                    resolvedPath.matchPath.pathValue
                );
            }

        }

        return resolvedPath.path;

    }

    function resolveShims (path, shims) {

    }

}).call(this);