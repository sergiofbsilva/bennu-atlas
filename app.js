var app = angular.module('plunker', []);

app.filter('minify', function() {
	return function(input) {
		var parts =	input.split(".");

		var singleParts = _.map(parts, function(part) {
			return part[0];
		});

		singleParts[singleParts.length - 1] = parts[parts.length - 1];

		return singleParts.join(".");
	};
});
app.controller('MainCtrl', function($scope, $http) {


  $http.get("/domain_model.json").success(function(data) {
  	$scope.domainModel = data;
  });

  var getDomainClass = function(className) {
  	var found = _.findWhere($scope.domainModel.classes, {className : className});
  	if (found) {
  		console.log('Class ' + className + ' already present');
  		return found;
  	}
  	return false;
  }

  var getRelationFor = function(className) {

  	var relations = [];
  	
  	_.each($scope.domainModel.relations, function(relation) {
  		_.each(relation.roles, function(role) {
  			if (role.type === className) {
  				relations.push(relation);
  			}
  		});
  	});

  	console.log("Relations for " + className);

  	_.each(relations, function(relation) {
  		console.log(relation);
  	});

  	var relationCells = _.map(relations, function(relation) {

  		var classNameFrom = relation.roles[0].type;
  		var classNameTo = relation.roles[1].type;
  		var classFrom = hasClassCell(classNameFrom);
  		
  		if (!classFrom) {
  			classFrom = internalAddClass(getDomainClass(classNameFrom));
  		}

  		var classTo = hasClassCell(classNameTo);

  		if (!classTo) {
  			classTo = internalAddClass(getDomainClass(classNameTo));
  		}

  		console.log('from : ' + classFrom.id + ' to: ' + classTo.id);
  		return new uml.Composition({source : {id : classFrom.id }, target : {id : classTo.id} });
  	});

  	_.each(relationCells, function(relCell) {
  		addCell(relCell);
  	});

  };

  var getLatest = function(className) {
  	var parts = className.split(".");
  	return parts[parts.length - 1];
  }

  var getClassCell = function(clazz) {
  	var attrs = _.map(clazz.slots, function(slot) {
  		return slot.name + ": " + getLatest(slot.type);
  	});

  	var className = getLatest(clazz.className);

  	if (!attrs.length) {
  		height = 50;
  	} else {
  		height = 15 * attrs.length;
  		if (height < 50 ) {
  			height = 50;
  		}
  	}

  	return new uml.Class( {
  		size: { width: 240, height: height},
  		name : className,
  		attributes : attrs,
  		methods : []
  	});

  };

  $scope.cells = [];

  var hasClassCell = function(className) {
  	debugger;
  	var found = _.findWhere($scope.cells, {attributes : {name :  getLatest(className)}});
  	if (found) {
  		console.log('Class ' + className + ' already present');
  		return found;
  	}
  	return false;
  };

  var addCell = function(cell) {
  		console.log('add cell');
  		console.log(cell);
  	  	graph.addCell(cell);
  	  	$scope.cells.push(cell);
  	  	joint.layout.GridLayout.layout(graph, {
	  		columns: 5,
	  		dx: 150,
	  		dy: 5
		});

  };

  var internalAddClass = function(clazz, processRelations) {

  	var found = hasClassCell(clazz.className);
  	if (found) {
  		return found;
 	}

  	var cell = getClassCell(clazz);
  	addCell(cell);

  	if(processRelations) {
		getRelationFor(clazz.className);
  	}

  	return cell;

  };

  $scope.addClass = function(clazz) {

  	internalAddClass(clazz, true);

 //  	joint.layout.DirectedGraph.layout(graph, {
 //   	 	nodeSep: 50,
 //    	edgeSep: 80,
 //    	rankDir: "TB"
	// });

  	// $scope.visibleClasses.push(clazz);
  };

});
