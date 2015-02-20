sap.ui.jsview("employeeodata.EmployeeDetails", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf employeeodata.EmployeeDetails
	*/ 
	getControllerName : function() {
		return "employeeodata.EmployeeDetails";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf employeeodata.EmployeeDetails
	*/ 
	createContent : function(appController) {
 		var mainPage = sap.m.Page({
			title: "Employee Details"
		});
 		
 		var updateButton = new sap.m.Button("Update", {
 			text: "Update",
 			tap: [appController.updateEmployee, appController]
 		});
 		
 		var deleteButton = new sap.m.Button("Delete", {
 			text: "Delete",
 			tap: [appController.deleteEmployee, appController]
 		});
 		
 		var cancelButton = new sap.m.Button("Cancel", {
 			text: "Cancel",
 			tap: [appController.cancelAction, appController]
 		});
 		
 		var submitButton = new sap.m.Button("Submit", {
 			text: "Create New Employee",
 			press: appController.newEntry,
 		});
 		
 		var saveButton = new sap.m.Button("Save", {
 			text: "Save",
 			tap: [appController.saveEmployee, appController]
 		});
 		
 		var dialogElement = new sap.m.Dialog("Dialog", {
 			title: "Add or Modify Employee",
 			modal: true,
 			contentWidth:"1em",
 			
 			content: [
 			    new sap.m.Label({text: "Enter Emp Id (must be a number)"}),
 			    new sap.m.Input({
 			    	maxLength: 20,
 			    	id: "Id"
 			    }),
 			    new sap.m.Label({text: "Enter Name"}),
 			    new sap.m.Input({
 			    	maxLength: 20,
 			    	id: "Name"
 			    }),
 			    new sap.m.Label({text: "Enter Address"}),
 			    new sap.m.Input({
 			    	maxLength: 20,
 			    	id: "Address"
 			    }),
 			    new sap.m.Label({text: "Enter Designation"}),
 			    new sap.m.Input({
 			    	maxLength: 20,
 			    	id: "Role"
 			    }),
 			    updateButton,
 			    deleteButton,
 			    cancelButton,
 			    saveButton
 			]
 		});

 		var dataTable = new sap.m.Table({
 			id: "Employees",
 			itemPress : [ appController.itemPress, appController ],
 			columns : [
 			    new sap.m.Column({
 			    	width: "1em",
 			    	header: new sap.m.Label({
 			    		text: "Emp ID"
 			    	})
 			    }),
 			    new sap.m.Column({
 			    	width: "1em",
 			    	header: new sap.m.Label({
 			    		text: "Name"
 			    	})
 			    }),
 			    new sap.m.Column({
 			    	width: "1em",
 			    	header: new sap.m.Label({
 			    		text: "Address"
 			    	})
 			    }),
 			    new sap.m.Column({
 			    	width: "1em",
 			    	header: new sap.m.Label({
 			    		text: "Designation"
 			    	})
 			    })
 			]
 		});
 		
 		var template = new sap.m.ColumnListItem({
 			id:"first_template",
 			type: "Navigation",
 			visible: true,
 			cells: [
 			     new sap.m.Label("ID", {
 			    	 text: "{Empid}"
 			     }),
 			     new sap.m.Label({
 			    	 text: "{Empname}"
 			     }),
 			     new sap.m.Label({
 			    	 text: "{Empadd}"
 			     }),
 			     new sap.m.Label({
 			    	 text: "{Empdes}"
 			     })
 			]
 		});
 		
 		var filters = null;
 		dataTable.bindItems("/results", template, null, filters);
 		
 		mainPage.addContent(dataTable);
 		
 		mainPage.addContent(submitButton);
 		
 		return mainPage;
	}

});
