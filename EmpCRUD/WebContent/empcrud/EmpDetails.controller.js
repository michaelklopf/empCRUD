sap.ui.controller("employeeodata.EmployeeDetails", {
	
	getServiceUrl : function() {
		return "http://fis54.fis-gmbh.de:8000/sap/opu/odata/sap/zmk_emp_srv";
	},

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf employeeodata.EmployeeDetails
*/
	onInit: function() {
		var serviceUrl = this.getServiceUrl();

		var applicationModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);

		var jsonModel = new sap.ui.model.json.JSONModel();
		
		applicationModel.read("/EmployeeSet?", null, null, true, function(oData, response) {
			jsonModel.setData(oData);
		});
		sap.ui.getCore().setModel(jsonModel);

	},

	itemPress: function(evt) {
		sap.ui.getCore().byId("Dialog").open();
		sap.ui.getCore().byId("Update").setVisible(true);
		sap.ui.getCore().byId("Delete").setVisible(true);
		sap.ui.getCore().byId("Save").setVisible(false);
		
		var selectedItem = evt.getParameter("listItem");
		var employeeId = selectedItem.getBindingContext().getProperty("Empid");
		var employeeName = selectedItem.getBindingContext().getProperty("Empname");
		var employeeAddress = selectedItem.getBindingContext().getProperty("Empadd");
		var employeeRole = selectedItem.getBindingContext().getProperty("Empdes");
		
		sap.ui.getCore().byId("Id").setValue(employeeId);
		sap.ui.getCore().byId("Id").setEnabled(false);
		
		sap.ui.getCore().byId("Name").setValue(employeeName);
		sap.ui.getCore().byId("Address").setValue(employeeAddress);
		sap.ui.getCore().byId("Role").setValue(employeeRole);
	},
	
	newEntry: function(evt) {
        	sap.ui.getCore().byId("Dialog").open();
        	sap.ui.getCore().byId("Save").setVisible(true);
        	sap.ui.getCore().byId("Update").setVisible(false);
        	sap.ui.getCore().byId("Delete").setVisible(false);
        	sap.ui.getCore().byId("Id").setValue("");
        	sap.ui.getCore().byId("Name").setValue("");
        	sap.ui.getCore().byId("Address").setValue("");
        	sap.ui.getCore().byId("Role").setValue("");                
        	sap.ui.getCore().byId("Id").setEnabled(true);
	},
	
	updateEmployee: function() {
		var newEntry = {};
		newEntry.Empid = sap.ui.getCore().byId("Id").getValue();
		newEntry.Empname = sap.ui.getCore().byId("Name").getValue();
		newEntry.Empadd = sap.ui.getCore().byId("Address").getValue();
		newEntry.Empdes = sap.ui.getCore().byId("Role").getValue();
		
		console.log(newEntry);
		var getServiceUrl = this.getServiceUrl() + "/EmployeeSet";
		OData.request({
			requestUri : getServiceUrl,
			method: "GET",
			headers: {
				"X-Requested-With" : "XMLHttpRequest",
				"Content-Type" : "application/atom+xml",
				"DataServiceVersion" : "2.0",
				"X-CSRF-Token": "Fetch"
			}
		},
		function(data, response) {
			var header_xcsrf_token = response.headers['x-csrf-token'];
			var oHeaders = {
					"x-csrf-token" : header_xcsrf_token,
					"Accept" : "application/json",
			};
			var extServiceUrl = getServiceUrl + "('" + newEntry.Empid + "')";
			OData.request({
				requestUri : extServiceUrl,
				method : "PUT",
				headers: oHeaders,
				data: newEntry
			},
			function(data, request) {
				console.log("Updated Successfully");
				location.reload(true);
			},
			function(err) {
				console.log("Update Failed");
			});
		},
		function(err) {
			var request = err.request;
			var response = err.response;
			console.log("Error in Get -- Request " + request + " Response " + response);
		});
	},
	
	deleteEmployee : function() {
		var currentEntry = {};
		currentEntry.Empid = sap.ui.getCore().byId("Id").getValue();
		
		var getServiceUrl = this.getServiceUrl() + "/EmployeeSet('" + currentEntry.Empid + "')";
		OData.request({
			requestUri : getServiceUrl,
			method: "GET",
			headers: {
				"X-Requested-With" : "XMLHttpRequest",
				"Content-Type" : "application/atom+xml",
				"DataServiceVersion" : "2.0",
				"X-CSRF-Token": "Fetch"
			}
		},
		function(data, response) {
			var header_xcsrf_token = response.headers['x-csrf-token'];
			var oHeaders = {
					"x-csrf-token" : header_xcsrf_token,
					"Accept" : "application/json",
			};
			var extServiceUrl = getServiceUrl;
			OData.request({
				requestUri : extServiceUrl,
				method : "DELETE",
				headers: oHeaders,
				data: currentEntry
			},
			function(data, request) {
				console.log("Deleted Successfully");
				location.reload(true);
			},
			function(err) {
				console.log("Deletion Failed");
			});
		},
		function(err) {
			var request = err.request;
			var response = err.response;
			console.log("Error in Get -- Request " + request + " Response " + response);
		});
	},
	
	cancelAction : function() {
		sap.ui.getCore().byId("Dialog").close();
	},
	
	saveEmployee : function() {
		var newEntry = {};
		newEntry.Empid = sap.ui.getCore().byId("Id").getValue();
		newEntry.Empname = sap.ui.getCore().byId("Name").getValue();
		newEntry.Empadd = sap.ui.getCore().byId("Address").getValue();
		newEntry.Empdes = sap.ui.getCore().byId("Role").getValue();
		
		var getServiceUrl = this.getServiceUrl() + "/EmployeeSet";
		OData.request({
			requestUri : getServiceUrl,
			method: "GET",
			headers: {
				"X-Requested-With" : "XMLHttpRequest",
				"Content-Type" : "application/atom+xml",
				"DataServiceVersion" : "2.0",
				"X-CSRF-Token": "Fetch"
			}
		},
		function(data, response) {
			var header_xcsrf_token = response.headers['x-csrf-token'];
			var oHeaders = {
					"x-csrf-token" : header_xcsrf_token,
					"Accept" : "application/json",
			};
			var extServiceUrl = getServiceUrl;
			OData.request({
				requestUri : extServiceUrl,
				method : "POST",
				headers: oHeaders,
				data: newEntry
			},
			function(data, request) {
				console.log("Created Successfully");
				location.reload(true);
			},
			function(err) {
				console.log("Creation Failed");
			});
		},
		function(err) {
			var request = err.request;
			var response = err.response;
			console.log("Error in Get -- Request " + request + " Response " + response);
		});
	}

});
