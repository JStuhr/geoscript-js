var assert = require("test/assert");
var layer = require("geoscript/layer");
var Feature = require("geoscript/feature").Feature;

var file = require("file");
var path = file.resolve(module.path, "../../data/states.shp");

exports["test: ShapefileLayer.constructor"] = function() {

    var shp = new layer.ShapefileLayer();
    
    assert.isTrue(shp instanceof layer.Layer, "instanceof Layer");
    assert.isTrue(shp instanceof layer.ShapefileLayer, "instanceof ShapefileLayer");    

};

exports["test: ShapefileLayer.count"] = function() {

    var shp = new layer.ShapefileLayer(path);
    assert.is(49, shp.count, "correct count");
    
};

exports["test: ShapefileLayer.features"] = function() {

    var shp = new layer.ShapefileLayer(path);
    var count, features, feature;
    
    // call features with no filter
    features = shp.features();
    count = shp.count;
        
    assert.isTrue(features.hasNext(), "hasNext returns true");
    
    var log = [];
    var testScope = {};
    features.forEach(function() {log.push({args: arguments, scope: this})}, testScope);

    assert.is(count, log.length, "forEach calls block once for each feature");
    assert.isTrue(log[0].args[0] instanceof Feature, "forEach calls block with feature");
    assert.is(testScope, log[0].scope, "forEach calls block with correct scope");
    
    assert.isTrue(!features.hasNext(), "after forEach, hasNext returns false");
    
    var err;
    try {
        features.next();
    } catch (e) {
        err = e;
    }
    assert.isTrue(err instanceof StopIteration, "next throws StopIteration when no more features");
    
};

if (require.main === module.id) {
    require("test/runner").run(exports);
}