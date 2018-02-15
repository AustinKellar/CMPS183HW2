
var app = angular.module('app', []);
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
					title: 'Make a profile for Peter Parker',
					notes: 'These are notes about the profile',
					posted: '2/11/18',
					lastUpdated: '2/12/18',
					due: '2/15/18',
					completed: true,
					edit: false,
					visible: true
				},
				{
					title: 'Make a to do list for Peter Parker',
					notes: 'These are notes about the to do list',
					posted: '2/11/18',
					lastUpdated: '2/12/18',
					due: '2/16/18',
					completed: false,
					edit: false,
					visible: true
				},
				{
					title: 'Make a to do form for Peter Parker',
					notes: 'These are notes about the to do form',
					posted: '2/11/18',
					lastUpdated: '2/12/18',
					due: '12/17/18',
					completed: false,
					edit: false,
					visible: true
				},
				{
					title: 'Turn in this assignment',
					notes: 'This is the assignment to turn in',
					posted: '2/11/18',
					lastUpdated: '2/12/18',
					due: '12/18/18',
					completed: false,
					edit: false,
					visible: true
				}
			];
			localStorage.setItem('todos', JSON.stringify(todos));
		}
		$scope.todos = JSON.parse(localStorage.getItem('todos'));
		$scope.filter = 'Show All';
		$scope.filterTable();
	};

	$scope.updateStorage = function() {
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	};

	$scope.edit = function(title) {
		for(var i=0; i<$scope.todos.length; i++) {
			if($scope.todos[i].title == title) {
				$scope.todos[i].edit = true;
			}
		}
	};

	$scope.delete = function(title) {
		for(var i=0; i<$scope.todos.length; i++) {
			if($scope.todos[i].title == title) {
				$scope.todos.splice(i, 1);
				break;
			}
		}
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
	}

	$scope.initForm = function() {
		$scope.submission = {
			title: undefined,
			due: undefined,
			notes: undefined
		};
	}

	$scope.submitTask = function() {
		$scope.submission['posted'] = new Date();
		$scope.submission['lastUpdated'] = new Date();
		$scope.submission['completed'] = false;
		$scope.submission['edit'] = false;
		$scope.submission['visible'] = true;
		$scope.submission['class'] = '';

		var todos = JSON.parse(localStorage.getItem('todos'));
		todos.push($scope.submission);
		localStorage.setItem('todos', JSON.stringify(todos));	
		alert('Task Submitted!');
		$scope.submission.title = undefined;
		$scope.submission.due = undefined;
		$scope.submission.notes = undefined;
	};
}]);