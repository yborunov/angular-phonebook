"strict"

var contactsList = angular.module('contactsList', []);

contactsList.controller('mainController', function ($scope) {

	var contacts = window.localStorage.getItem('contactsList');

	if( !contacts ) {
		
		contacts = [
			{ 
				id: 1,
				name: 'Richard', 
				surname: 'Brenson', 
				phone: '+1 (233) 537-23-75', 
				group: 'work' 
			},
			{ 
				id: 2,
				name: 'Jack', 
				surname: '', 
				phone: '+1 (566) 233-25-12', 
				group: 'family' 
			},
			{ 
				id: 3,
				name: 'Susan', 
				surname: 'Boyle', 
				phone: '+44 (526) 674-45-83', 
				group: '' 
			}
		];

		window.localStorage.setItem('contactsList', JSON.stringify(contacts));

		$scope.contacts = contacts;

	} else {

		$scope.contacts = JSON.parse(contacts);
	}

	$scope.modalFormSubmit = function (isValid) {

		$scope.modalInfo.submitted = true;

		if( isValid ) {

			if( $scope.modalInfo.type === 'add' ) {

				$scope.contacts.push({
					id: 	 $scope.contacts.length + 1,
					name: 	 $scope.modalInfo.name,
					surname: $scope.modalInfo.surname,
					phone: 	 $scope.modalInfo.phone,
					group: 	 $scope.modalInfo.group,
				});

			} else if ( $scope.modalInfo.type === 'edit' &&
						$scope.modalInfo.edit_id !== undefined ) {

				$scope.contacts[ $scope.modalInfo.edit_id - 1 ] = {
					id: 	 $scope.modalInfo.edit_id,
					name: 	 $scope.modalInfo.name,
					surname: $scope.modalInfo.surname,
					phone: 	 $scope.modalInfo.phone,
					group: 	 $scope.modalInfo.group,
				};
			}

			window.localStorage.setItem('contactsList', JSON.stringify( $scope.contacts ));

			$('#contactModal').modal('hide');			
		}
	};

	$scope.showAddContact = function () {

		$scope.modalInfo = {

			type: 		'add',
			title: 		'Add contact',
			submitText: 'Create',

			submitted: 	false,

			name: 		'',
			surname: 	'',
			phone: 		'',
			group: 		''
		};

		$('#contactModal').modal('show');
	};

	$scope.showEditContact = function (contact_id) {

		var contact = $scope.contacts[ contact_id - 1 ];

		$scope.modalInfo = {

			type: 		'edit',
			title: 		'Edit contact',
			submitText: 'Save',

			submitted: 	false,
			edit_id: 	contact.id,

			name: 		contact.name,
			surname: 	contact.surname,
			phone: 		contact.phone,
			group: 		contact.group
		};

		$('#contactModal').modal('show');
	};
});