
var app = angular.module('app', []);
app.filter('orderObjectBy', function() {
	return function(items, field, reverse) {
		var filtered = [];
		angular.forEach(items, function(item) {
			filtered.push(item);
		});
		filtered.sort(function (a, b) {
			return (new Date(a[field]) > new Date(b[field]) ? 1 : -1);
		});
		if(reverse) filtered.reverse();
		return filtered;
	};
});
app.controller('MainController', ['$scope', '$window', function($scope, $window) {
	$scope.courses = [
		{ number: 'CMPS109', title: 'Advanced Programming', dept: 'Computer Science', quarter: 'Fall' },
		{ number: 'CMPS180', title: 'Database Systems', dept: 'Computer Science', quarter: 'Fall' },
		{ number: 'ARTG80G', title: 'Interactive Design', dept: 'Art and Design', quarter: 'Fall' },
		{ number: 'CMPS128', title: 'Distributed Systems', dept: 'Computer Science', quarter: 'Winter' },
		{ number: 'CMPS183', title: 'Web Applications', dept: 'Computer Science', quarter: 'Winter' },
		{ number: 'CMPM176', title: 'Game Systems', dept: 'Computational Media', quarter: 'Winter' }
	];

	$scope.todoInit = function() {
		if(localStorage.getItem('todos') == undefined || localStorage.getItem('todos') == null) {
			console.log('inside if');
			var todos =  [
				{
					title: 'Make a to do list for Peter Parker',
					notes: 'These are notes about the to do list',
					posted: new Date('2/11/18'),
					lastUpdated: new Date('2/12/18'),
					due: new Date('2/16/18'),
					completed: false,
					edit: false,
					buttonText: 'Edit',
					visible: true
				},
				{
					title: 'Make a profile for Peter Parker',
					notes: 'These are notes about the profile',
					posted: new Date('2/12/18'),
					lastUpdated: new Date('2/12/18'),
					due: new Date('2/15/18'),
					completed: true,
					edit: false,
					buttonText: 'Edit',
					visible: true
				},
				{
					title: 'Make a to do form for Peter Parker',
					notes: 'These are notes about the to do form',
					posted: new Date('2/11/18'),
					lastUpdated: new Date('2/12/18'),
					due: new Date('12/17/18'),
					completed: false,
					edit: false,
					buttonText: 'Edit',
					visible: true
				},
				{
					title: 'Turn in this assignment',
					notes: 'This is the assignment to turn in',
					posted: new Date('2/9/18'),
					lastUpdated: new Date('2/10/18'),
					due: new Date('12/15/18'),
					completed: false,
					edit: false,
					buttonText: 'Edit',
					visible: true
				}
			];
			localStorage.setItem('todos', JSON.stringify(todos));
		}
		$scope.todos = JSON.parse(localStorage.getItem('todos'));
		$scope.filter = 'Show All';
		$scope.sortBy = 'due';
		$scope.orderBy = $scope.sortBy;
		$scope.filterTable();
		$scope.editing = false;
	};

	$scope.updateStorage = function() {
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};

	$scope.changeSort = function() {
		var temp = $scope.sortBy;
		if($scope.editing) {
			alert('Cannot sort while editing!')
		} else {
			$scope.orderBy = $scope.sortBy;
		}
	};

	$scope.edit = function(title, type) {
		if(!$scope.editing && type == 'Edit') {
			$scope.editing = true;
			for(var i=0; i<$scope.todos.length; i++) {
				if($scope.todos[i].title == title) {
					$scope.orderBy = '';
					var temp = $scope.todos[0];
					$scope.todos[0] = $scope.todos[i];
					$scope.todos[i] = temp;
					$scope.todos[0].edit = true;
					$scope.todos[0].lastUpdated = new Date();
					$scope.todos[0].buttonText = 'Save';
				}
			}
		} else if(type == 'Save') {
			$scope.editing = false;
			for(var i=0; i<$scope.todos.length; i++) {
				if($scope.todos[i].title == title) {
					$scope.todos[i].edit = false;
					$scope.todos[i].buttonText = 'Edit';
					$scope.orderBy = $scope.sortBy;
				}
			}
		} else {
			alert('You can only edit 1 row at a time!');
		}
	};

	$scope.delete = function(title) {
		for(var i=0; i<$scope.todos.length; i++) {
			if($scope.todos[i].title == title) {
				$scope.todos.splice(i, 1);
				break;
			}
		}
		$scope.editing = false;
		$scope.updateStorage();
	};

	$scope.check = function(tite) {
		$scope.filterTable();
	};

	$scope.filterTable = function() {
		if($scope.todos != undefined) {
			if($scope.filter == 'Show All') {
				for(var i=0; i<$scope.todos.length; i++) {
					$scope.todos[i].visible = true;
				}
			} else if($scope.filter == 'Show Completed') {
				for(var i=0; i<$scope.todos.length; i++) {
					if($scope.todos[i].completed) {
						$scope.todos[i].visible = true;
					} else {
						$scope.todos[i].visible = false;
					}
				}
			} else {
				for(var i=0; i<$scope.todos.length; i++) {
					if(!$scope.todos[i].completed) {
						$scope.todos[i].visible = true;
					} else {
						$scope.todos[i].visible = false;
					}
				}
			}
		}
	};

	$scope.initForm = function() {
		$scope.submission = {
			title: undefined,
			due: undefined,
			notes: undefined
		};
	}

	$scope.submitTask = function() {
		if($scope.submission.title == undefined || $scope.submission.due == undefined || $scope.submission.notes == undefined) {
			alert('You must fill out all fields before submitting!');
		} else {
			$scope.submission['posted'] = new Date();
			$scope.submission['lastUpdated'] = new Date();
			$scope.submission['completed'] = false;
			$scope.submission['edit'] = false;
			$scope.submission['visible'] = true;
			$scope.submission['class'] = '';
			$scope.submission['buttonText'] = 'Edit';

			if($scope.submission.due < $scope.submission.posted) {
				alert('The due date cannot be before tomorrow\'s date!')
			} else {
				var todos = JSON.parse(localStorage.getItem('todos'));
				todos.push($scope.submission);
				localStorage.setItem('todos', JSON.stringify(todos));	
				alert('Task Submitted!');
				$scope.submission.title = undefined;
				$scope.submission.due = undefined;
				$scope.submission.notes = undefined;
				var host = $window.location.host;
		        var landingUrl = "todo.html";
		        $window.location.href = landingUrl;
			}
		}
	};
}]);