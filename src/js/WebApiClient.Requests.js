(function (WebApiClient, undefined) {
    "use strict";
    
    function AppendRequestParams(url, params) {
        url += "(";
        var paramCount = 1;
        
        for (var parameter in params) {
            if (!params.hasOwnProperty(parameter)) {
                continue;
            }
            
            if (paramCount !== 1) {
                url += ",";
            }
            
            url += parameter + "=@p" + paramCount++;
        }
            
        url += ")";
        
        return url;
    }
    
    function AppendParamValues (url, params) {
        var paramCount = 1;
        
        for (var parameter in params) {
            if (!params.hasOwnProperty(parameter)) {
                continue;
            }
            
            if (paramCount === 1) {
                url += "?@p1=";
            }
            else {
                url += "&@p" + paramCount + "=";
            }
            paramCount++;
            
            url += params[parameter];
        }
        
        return url;
    }
    
    WebApiClient.Requests = WebApiClient.Requests || {};
    
    WebApiClient.Requests.Request = function () {
        this.method = "";
        this.name = "";
        this.bound = false;
        this.entityName = "";
        this.entityId = "";
        this.payload = null;
        this.headers = null;
        this.urlParams = null;
    };
    
    WebApiClient.Requests.Request.prototype.with = function (parameters) {
        var request = Object.create(this);
        
        for (var parameter in parameters) {
            if (!parameters.hasOwnProperty(parameter)) {
                continue;
            }
            
            request[parameter] = parameters[parameter];
        }
        
        return request;
    };
    
    WebApiClient.Requests.Request.prototype.buildUrl = function() {
        var baseUrl = WebApiClient.GetApiUrl();
        var url = baseUrl;
        
        if (this.bound && this.entityId) {
            var entityId = this.entityId.replace("{", "").replace("}", "");
            url += WebApiClient.GetSetName(this.entityName) + "(" + entityId + ")/"; 
        } 
        
        if (this.bound && this.name.indexOf("Microsoft.Dynamics.CRM.") === -1) {
            url += "Microsoft.Dynamics.CRM.";
        }
        url += this.name;
        
        if (this.urlParams) {
            url = AppendRequestParams(url, this.urlParams);
            url = AppendParamValues(url, this.urlParams);
        } else {
            url += "()";
        }
        
        return url;
    };
    
    // Functions
    
    // MSDN: https://msdn.microsoft.com/en-us/library/mt718083.aspx
    // Calculates the value of a rollup attribute. 
    WebApiClient.Requests.CalculateRollupFieldRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "CalculateRollupField",
            writeable: true
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt593054.aspx
    // Calculates the total time, in minutes, that you used while you worked on an incident (case). 
    WebApiClient.Requests.CalculateTotalTimeIncidentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "CalculateTotalTimeIncident",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "incident",
            writeable: true
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt683529.aspx
    // Check whether the incoming email message is relevant to the Microsoft Dynamics 365 system. 
    WebApiClient.Requests.CheckIncomingEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "CheckIncomingEmail",
            writeable: true
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt593013.aspx
    // Contains the data that is needed to check whether the incoming email message should be promoted to the Microsoft Dynamics 365 system. 
    WebApiClient.Requests.CheckPromoteEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "CheckPromoteEmail",
            writeable: true
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt607800.aspx
    // Downloads a report definition. 
    WebApiClient.Requests.DownloadReportDefinitionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "DownloadReportDefinition",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "report",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607824.aspx
	// Converts the calendar rules to an array of available time blocks for the specified period. 
    WebApiClient.Requests.ExpandCalendarRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "ExpandCalendar",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "calendar",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593047.aspx
	// Exports localizable fields values to a compressed file. 
    WebApiClient.Requests.ExportFieldTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "ExportFieldTranslation",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491169.aspx
	// Converts a query in FetchXML to a QueryExpression. 
    WebApiClient.Requests.FetchXmlToQueryExpressionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "FetchXmlToQueryExpression",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683530.aspx
	// Finds a parent resource group (scheduling group) for the specified resource groups (scheduling groups).
    WebApiClient.Requests.FindParentResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "FindParentResourceGroup",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "resourcegroup",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593004.aspx
	// Retrieves all the time zone definitions for the specified locale and to return only the display name attribute. 
    WebApiClient.Requests.GetAllTimeZonesWithDisplayNameRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetAllTimeZonesWithDisplayName",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608119.aspx
	// Retrieves the default price level (price list) for the current user based on the user’s territory relationship with the price level. 
    WebApiClient.Requests.GetDefaultPriceLevelRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetDefaultPriceLevel",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622422.aspx
	// Retrieves distinct values from the parse table for a column in the source file that contains list values. 
    WebApiClient.Requests.GetDistinctValuesImportFileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetDistinctValuesImportFile",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "importfile",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622408.aspx
	// Retrieves the source-file column headings; or retrieve the system-generated column headings if the source file does not contain column headings. 
    WebApiClient.Requests.GetHeaderColumnsImportFileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetHeaderColumnsImportFile",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "importfile",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683531.aspx
	// Gets the quantity decimal value of a product for the specified entity in the target. 
    WebApiClient.Requests.GetQuantityDecimalRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetQuantityDecimal",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607697.aspx
	// Retrieves the history limit for a report. 
    WebApiClient.Requests.GetReportHistoryLimitRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetReportHistoryLimit",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "report",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607644.aspx
	// Retrieves the time zone code for the specified localized time zone name. 
    WebApiClient.Requests.GetTimeZoneCodeByLocalizedNameRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetTimeZoneCodeByLocalizedName",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608131.aspx
	// Retrieves a list of all the entities that can participate in a Many-to-Many entity relationship. 
    WebApiClient.Requests.GetValidManyToManyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetValidManyToMany",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608031.aspx
	// Retrieves a list of entity logical names that are valid as the primary entity (one) from the specified entity in a one-to-many relationship. 
    WebApiClient.Requests.GetValidReferencedEntitiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetValidReferencedEntities",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt592992.aspx
	// Retrieves the set of entities that are valid as the related entity (many) to the specified entity in a one-to-many relationship. 
    WebApiClient.Requests.GetValidReferencingEntitiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "GetValidReferencingEntities",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683532.aspx
	// Increments the per day view count of a knowledge article record.
    WebApiClient.Requests.IncrementKnowledgeArticleViewCountRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "IncrementKnowledgeArticleViewCount",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683533.aspx
	// Initializes a new record from an existing record.
    WebApiClient.Requests.InitializeFromRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "InitializeFrom",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607606.aspx
	// Determines whether a solution component is customizable. 
    WebApiClient.Requests.IsComponentCustomizableRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "IsComponentCustomizable",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607678.aspx
	// Determines whether data encryption is currently running (active or inactive). 
    WebApiClient.Requests.IsDataEncryptionActiveRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "IsDataEncryptionActive",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683534.aspx
	// Validates the state transition.
    WebApiClient.Requests.IsValidStateTransitionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "IsValidStateTransition",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683535.aspx
	// Searches multiple resources for available time block that matches the specified parameters.
    WebApiClient.Requests.QueryMultipleSchedulesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "QueryMultipleSchedules",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608100.aspx
	// Searches the specified resource for an available time block that matches the specified parameters. 
    WebApiClient.Requests.QueryScheduleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "QuerySchedule",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622429.aspx
	// Retrieves the absolute URL and the site collection URL for a SharePoint location record in Microsoft Dynamics 365. 
    WebApiClient.Requests.RetrieveAbsoluteAndSiteCollectionUrlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveAbsoluteAndSiteCollectionUrl",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491171.aspx
	// TODO: RetrieveActivePath Function Description (No Joke, MS description)
    WebApiClient.Requests.RetrieveActivePathRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveActivePath",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607682.aspx
	// Retrieves the collection of users that report to the specified system user (user). 
    WebApiClient.Requests.RetrieveAllChildUsersSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveAllChildUsersSystemUser",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683536.aspx
	// Retrieves metadata information about all the entities. 
    WebApiClient.Requests.RetrieveAllEntitiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveAllEntities",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607503.aspx
	// Retrieve the data that defines the content and behavior of the application ribbon. 
    WebApiClient.Requests.RetrieveApplicationRibbonRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveApplicationRibbon",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593106.aspx
	// Retrieves the list of database partitions that are used to store audited history data. 
    WebApiClient.Requests.RetrieveAuditPartitionListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveAuditPartitionList",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607635.aspx
	// Retrieves the list of language packs that are installed and enabled on the server. 
    WebApiClient.Requests.RetrieveAvailableLanguagesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveAvailableLanguages",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607489.aspx
	// Retrieves all business units from the business unit hierarchy. 
    WebApiClient.Requests.RetrieveBusinessHierarchyBusinessUnitRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveBusinessHierarchyBusinessUnit",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "businessunit",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607979.aspx
	// Retrieves all resources that are related to the specified resource group 
    WebApiClient.Requests.RetrieveByGroupResourceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveByGroupResource",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "resourcegroup",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607881.aspx
	// Retrieves the resource groups (scheduling groups) that contain the specified resource. 
    WebApiClient.Requests.RetrieveByResourceResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveByResourceResourceGroup",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "resource",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491172.aspx
	// Retrieve the collection of services that are related to the specified set of resources.
    WebApiClient.Requests.RetrieveByResourcesServiceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveByResourcesService",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607560.aspx
	// Retrieves the top-ten articles about a specified product from the knowledge base of articles for the organization 
    WebApiClient.Requests.RetrieveByTopIncidentProductKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveByTopIncidentProductKbArticle",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "product",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608058.aspx
	// Retrieves the top-ten articles about a specified subject from the knowledge base of articles for your organization. 
    WebApiClient.Requests.RetrieveByTopIncidentSubjectKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveByTopIncidentSubjectKbArticle",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "subject",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608120.aspx
	// Retrieve information about the current organization. 
    WebApiClient.Requests.RetrieveCurrentOrganizationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveCurrentOrganization",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608110.aspx
	// Retrieves the data encryption key value. 
    WebApiClient.Requests.RetrieveDataEncryptionKeyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDataEncryptionKey",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607985.aspx
	// Retrieves a collection of dependency records that describe any solution components that would prevent a solution component from being deleted. 
    WebApiClient.Requests.RetrieveDependenciesForDeleteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDependenciesForDelete",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607791.aspx
	// Retrieves a list of the solution component dependencies that can prevent you from uninstalling a managed solution. 
    WebApiClient.Requests.RetrieveDependenciesForUninstallRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDependenciesForUninstall",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593045.aspx
	// Retrieves a list dependencies for solution components that directly depend on a solution component. 
    WebApiClient.Requests.RetrieveDependentComponentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDependentComponents",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593056.aspx
	// Retrieves the type of license for a deployment of Microsoft Dynamics 365. 
    WebApiClient.Requests.RetrieveDeploymentLicenseTypeRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDeploymentLicenseType",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607656.aspx
	// Retrieves a list of language packs that are installed on the server that have been disabled. 
    WebApiClient.Requests.RetrieveDeprovisionedLanguagesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDeprovisionedLanguages",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683537.aspx
	// Detects and retrieves duplicates for a specified record.
    WebApiClient.Requests.RetrieveDuplicatesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveDuplicates",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491170.aspx
	// Retrieve the changes for an entity. 
    WebApiClient.Requests.RetrieveEntityChangesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveEntityChanges",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607698.aspx
	// Retrieves ribbon definitions for an entity. 
    WebApiClient.Requests.RetrieveEntityRibbonRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveEntityRibbon",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491173.aspx
	// Retrieves the appointments for the current user for a specific date range from the exchange web service. 
    WebApiClient.Requests.RetrieveExchangeAppointmentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveExchangeAppointments",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607795.aspx
	// Retrieves the exchange rate. 
    WebApiClient.Requests.RetrieveExchangeRateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveExchangeRate",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491174.aspx
	// Retrieves the entity forms that are available for a specified user. 
    WebApiClient.Requests.RetrieveFilteredFormsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveFilteredForms",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607487.aspx
	// Retrieves the formatted results from an import job. 
    WebApiClient.Requests.RetrieveFormattedImportJobResultsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveFormattedImportJobResults",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607696.aspx
	// Retrieves the list of language packs that are installed on the server. 
    WebApiClient.Requests.RetrieveInstalledLanguagePacksRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveInstalledLanguagePacks",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608102.aspx
	// Retrieves the version of an installed language pack. 
    WebApiClient.Requests.RetrieveInstalledLanguagePackVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveInstalledLanguagePackVersion",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607844.aspx
	// Retrieves the number of used and available licenses for a deployment of Microsoft Dynamics 365. 
    WebApiClient.Requests.RetrieveLicenseInfoRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveLicenseInfo",
            writeable: true
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt683538.aspx
    // Retrieves localized labels for a limited set of entity attributes.
    WebApiClient.Requests.RetrieveLocLabelsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveLocLabels",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt592988.aspx
	// Retrieves folder-level tracking rules for a mailbox. 
    WebApiClient.Requests.RetrieveMailboxTrackingFoldersRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveMailboxTrackingFolders",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622412.aspx
	// Retrieves the members of a bulk operation. 
    WebApiClient.Requests.RetrieveMembersBulkOperationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveMembersBulkOperation",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "bulkoperation",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607580.aspx
	// Retrieves a list of missing components in the target organization. 
    WebApiClient.Requests.RetrieveMissingComponentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveMissingComponents",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607972.aspx
	// Retrieves any required solution components that are not included in the solution. 
    WebApiClient.Requests.RetrieveMissingDependenciesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveMissingDependencies",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607527.aspx
	// Retrieves the resources that are used by an organization. 
    WebApiClient.Requests.RetrieveOrganizationResourcesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveOrganizationResources",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607818.aspx
	// Retrieves the collection of the parent resource groups of the specified resource group (scheduling group). 
    WebApiClient.Requests.RetrieveParentGroupsResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveParentGroupsResourceGroup",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607594.aspx
	// Retrieves the data from the parse table.
    WebApiClient.Requests.RetrieveParsedDataImportFileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveParsedDataImportFile",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607613.aspx
	// Retrieves pages of posts, including comments for each post, for all records that the calling user is following. 
    WebApiClient.Requests.RetrievePersonalWallRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrievePersonalWall",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683539.aspx
	// Retrieves the access rights of the specified security principal (team or user) to the specified record.
    WebApiClient.Requests.RetrievePrincipalAccessRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrievePrincipalAccess",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607755.aspx
	// Retrieves all the secured attribute privileges a user or team has through direct or indirect (through team membership) associations with the FieldSecurityProfile entity. 
    WebApiClient.Requests.RetrievePrincipalAttributePrivilegesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrievePrincipalAttributePrivileges",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593098.aspx
	// For internal use only.
    WebApiClient.Requests.RetrievePrincipalSyncAttributeMappingsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrievePrincipalSyncAttributeMappings",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622426.aspx
	// Retrieves the set of privileges defined in the system. 
    WebApiClient.Requests.RetrievePrivilegeSetRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrievePrivilegeSet",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491175.aspx
	// TODO: RetrieveProcessInstances Function Description (By MS)
    WebApiClient.Requests.RetrieveProcessInstancesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveProcessInstances",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607701.aspx
	// Retrieve all the property instances (dynamic property instances) for a product added to an opportunity, quote, order, or invoice. 
    WebApiClient.Requests.RetrieveProductPropertiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveProductProperties",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593074.aspx
	// Retrieves the version of a provisioned language pack. 
    WebApiClient.Requests.RetrieveProvisionedLanguagePackVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveProvisionedLanguagePackVersion",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607900.aspx
	// Retrieves the list of provisioned languages. 
    WebApiClient.Requests.RetrieveProvisionedLanguagesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveProvisionedLanguages",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683540.aspx
	// Retrieves pages of posts, including comments for each post, for a specified record. 
    WebApiClient.Requests.RetrieveRecordWallRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveRecordWall",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607927.aspx
	// Retrieves a collection of solution components that are required for a solution component. 
    WebApiClient.Requests.RetrieveRequiredComponentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveRequiredComponents",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607997.aspx
	// Retrieves the privileges that are assigned to the specified role. 
    WebApiClient.Requests.RetrieveRolePrivilegesRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveRolePrivilegesRole",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607604.aspx
	// Retrieves the collection of child resource groups from the specified resource group. 
    WebApiClient.Requests.RetrieveSubGroupsResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveSubGroupsResourceGroup",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "resourcegroup",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608036.aspx
	// Retrieves the privileges for a team. 
    WebApiClient.Requests.RetrieveTeamPrivilegesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveTeamPrivileges",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "team",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607518.aspx
	// Retrieves a time stamp for the metadata. 
    WebApiClient.Requests.RetrieveTimestampRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveTimestamp",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683541.aspx
	// Retrieves a collection of unpublished organization-owned records that satisfy the specified query criteria. 
    WebApiClient.Requests.RetrieveUnpublishedMultipleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveUnpublishedMultiple",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607996.aspx
	// Retrieves the privileges a system user (user) has through his or her roles in the specified business unit. 
    WebApiClient.Requests.RetrieveUserPrivilegesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveUserPrivileges",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607579.aspx
	// Retrieves all private queues of a specified user and optionally all public queues. 
    WebApiClient.Requests.RetrieveUserQueuesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveUserQueues",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593041.aspx
	// Retrieves the version number of the Microsoft Dynamics 365 Server. 
    WebApiClient.Requests.RetrieveVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "RetrieveVersion",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491176.aspx
	// Retrieves all the entity records that are related to the specified record. 
    WebApiClient.Requests.RollupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "Rollup",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608029.aspx
	// Searches for available time slots that fulfill the specified appointment request. 
    WebApiClient.Requests.SearchRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "Search",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683542.aspx
	// Searches for knowledge base articles that contain the specified body text.
    WebApiClient.Requests.SearchByBodyKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "SearchByBodyKbArticle",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683543.aspx
	// Searches for knowledge base articles that contain the specified keywords.
    WebApiClient.Requests.SearchByKeywordsKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "SearchByKeywordsKbArticle",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683544.aspx
	// Searches for knowledge base articles that contain the specified title. 
    WebApiClient.Requests.SearchByTitleKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "SearchByTitleKbArticle",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683545.aspx
	// Validates a rule for a recurring appointment. 
    WebApiClient.Requests.ValidateRecurrenceRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "ValidateRecurrenceRule",
            writeable: true
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt607925.aspx
    // Retrieves the system user ID for the currently logged on user or the user under whose context the code is running. 
    WebApiClient.Requests.WhoAmIRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET",
            writeable: true
        },
        name: {
            value: "WhoAmI",
            writeable: true
        }
    });

    // Actions
    
	// MSDN: https://msdn.microsoft.com/en-us/library/mt607569.aspx
	// Adds an item to a campaign.
    WebApiClient.Requests.AddItemCampaignRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddItemCampaign",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN:https://msdn.microsoft.com/en-us/library/mt607559.aspx
	// Adds an item to a campaign activity. 
    WebApiClient.Requests.AddItemCampaignActivityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddItemCampaignActivity",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607641.aspx
	// Adds members to a list. 
    WebApiClient.Requests.AddListMembersListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddListMembersList",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607495.aspx
	// Adds a member to a list (marketing list). 
    WebApiClient.Requests.AddMemberListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddMemberList",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "list",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607496.aspx
	// Adds members to a team. 
    WebApiClient.Requests.AddMembersTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddMembersTeam",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "team",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593089.aspx
	// Adds the specified principal to the list of queue members. 
    WebApiClient.Requests.AddPrincipalToQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddPrincipalToQueue",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "queue",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607862.aspx
	// Adds a set of existing privileges to an existing role. 
    WebApiClient.Requests.AddPrivilegesRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddPrivilegesRole",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "role",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607566.aspx
	// Adds recurrence information to an existing appointment. 
    WebApiClient.Requests.AddRecurrenceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddRecurrence",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "appointment",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593057.aspx
	// Adds a solution component to an unmanaged solution. 
    WebApiClient.Requests.AddSolutionComponentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddSolutionComponent",
            writeable: true
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt607880.aspx
    // Moves an entity record from a source queue to a destination queue.
    WebApiClient.Requests.AddToQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddToQueue",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "queue",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607951.aspx
	// Adds a user to the auto created access team for the specified record. 
    WebApiClient.Requests.AddUserToRecordTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AddUserToRecordTeam",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608069.aspx
	// Applies record creation and update rules to activities in 365 created as a result of the integration with external applications. 
    WebApiClient.Requests.ApplyRecordCreationAndUpdateRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ApplyRecordCreationAndUpdateRule",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608125.aspx
	// Applies the active routing rule to an incident. 
    WebApiClient.Requests.ApplyRoutingRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ApplyRoutingRule",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607766.aspx
	// Generates a new set of attribute mappings based on the metadata. 
    WebApiClient.Requests.AutoMapEntityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "AutoMapEntity",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt718079.aspx
	// Schedules or "books" an appointment, recurring appointment, or service appointment (service activity). 
    WebApiClient.Requests.BookRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "Book",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491158.aspx
	// Submits a bulk delete job that deletes selected records in bulk. This job runs asynchronously in the background without blocking other activities.
    WebApiClient.Requests.BulkDeleteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "BulkDelete",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491162.aspx
	// Submits an asynchronous system job that detects and logs multiple duplicate records.
    WebApiClient.Requests.BulkDetectDuplicatesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "BulkDetectDuplicates",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607988.aspx
	// Calculates the value of an opportunity that is in the "Won" state. 
    WebApiClient.Requests.CalculateActualValueOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CalculateActualValueOpportunity",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "opportunity",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608012.aspx
	// Calculates price in an opportunity, quote, order, and invoice.
    WebApiClient.Requests.CalculatePriceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CalculatePrice",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593059.aspx
	// Checks whether the specified entity can be the primary entity (one) in a one-to-many relationship. 
    WebApiClient.Requests.CanBeReferencedRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CanBeReferenced",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607578.aspx
	// Checkes whether an entity can be the referencing entity in a one-to-many relationship. 
    WebApiClient.Requests.CanBeReferencingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CanBeReferencing",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607610.aspx
	// Cancels a contract. 
    WebApiClient.Requests.CancelContractRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CancelContract",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "contract",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607587.aspx
	// Cancels a sales order. 
    WebApiClient.Requests.CancelSalesOrderRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CancelSalesOrder",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607577.aspx
	// Checks whether an entity can participate in a many-to-many relationship. 
    WebApiClient.Requests.CanManyToManyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CanManyToMany",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607802.aspx
	// Creates a solution patch from a managed or unmanaged solution.
    WebApiClient.Requests.CloneAsPatchRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloneAsPatch",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607806.aspx
	// Creates a new copy of an unmanged solution that contains the original solution plus all of its patches.
    WebApiClient.Requests.CloneAsSolutionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloneAsSolution",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607895.aspx
	// Copies an existing contract and its line items. 
    WebApiClient.Requests.CloneContractRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloneContract",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "contract",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt718080.aspx
	// For internal use only. 
    WebApiClient.Requests.CloneMobileOfflineProfileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloneMobileOfflineProfile",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "mobileofflineprofile",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608030.aspx
	// Copies an existing product family, product, or bundle under the same parent record. 
    WebApiClient.Requests.CloneProductRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloneProduct",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "product",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607498.aspx
	// Closes an incident (case).
    WebApiClient.Requests.CloseIncidentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloseIncident",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607685.aspx
	// Closes a quote. 
    WebApiClient.Requests.CloseQuoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CloseQuote",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608088.aspx
	// Updates a duplicate rule (duplicate detection rule) and its related duplicate rule conditions. 
    WebApiClient.Requests.CompoundUpdateDuplicateDetectionRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CompoundUpdateDuplicateDetectionRule",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607749.aspx
	// Converts a team of type owner to a team of type access. 
    WebApiClient.Requests.ConvertOwnerTeamToAccessTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ConvertOwnerTeamToAccessTeam",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "team",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607933.aspx
	// Converts a product to a kit. 
    WebApiClient.Requests.ConvertProductToKitRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ConvertProductToKit",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607842.aspx
	// Converts a quote to a sales order. 
    WebApiClient.Requests.ConvertQuoteToSalesOrderRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ConvertQuoteToSalesOrder",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607736.aspx
	// Converts a sales order to an invoice. 
    WebApiClient.Requests.ConvertSalesOrderToInvoiceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ConvertSalesOrderToInvoice",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607820.aspx
	// Copies a campaign. 
    WebApiClient.Requests.CopyCampaignRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CopyCampaign",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "campaign",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607655.aspx
	// Creates a copy of a campaign response
    WebApiClient.Requests.CopyCampaignResponseRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CopyCampaignResponse",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "campaignresponse",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593064.aspx
	// Creates a static list from the specified dynamic list and add the members that satisfy the dynamic list query criteria to the static list. 
    WebApiClient.Requests.CopyDynamicListToStaticRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CopyDynamicListToStatic",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "list",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607620.aspx 
	// Copies the members from the source list to the target list without creating duplicates. 
    WebApiClient.Requests.CopyMembersListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CopyMembersList",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "list",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608044.aspx
	// Creates a new entity form that is based on an existing entity form. 
    WebApiClient.Requests.CopySystemFormRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CopySystemForm",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemform",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607931.aspx
	// Creates a quick campaign to distribute an activity to members of a list (marketing list). 
    WebApiClient.Requests.CreateActivitiesListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateActivitiesList",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491161.aspx
	// Creates a new customer lookup attribute, and optionally, to add it to a specified unmanaged solution.
    WebApiClient.Requests.CreateCustomerRelationshipsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateCustomerRelationships",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593100.aspx
	// Creates an exception for the recurring appointment instance. 
    WebApiClient.Requests.CreateExceptionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateException",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608070.aspx
	// Creates future unexpanded instances for the recurring appointment master. 
    WebApiClient.Requests.CreateInstanceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateInstance",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607622.aspx
	// Creates translation of a knowledge article instance.
    WebApiClient.Requests.CreateKnowledgeArticleTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateKnowledgeArticleTranslation",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607825.aspx
	// Creates a major or minor version of a knowledge article instance.
    WebApiClient.Requests.CreateKnowledgeArticleVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateKnowledgeArticleVersion",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622404.aspx
	// Creates a workflow (process) from a workflow template. 
    WebApiClient.Requests.CreateWorkflowFromTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "CreateWorkflowFromTemplate",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "workflow",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607488.aspx
	// Replaces managed solution (A) plus all of its patches with managed solution (B) that is the clone of (A) and all of its patches.
    WebApiClient.Requests.DeleteAndPromoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeleteAndPromote",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607758.aspx
	// Deletes all audit data records up until a specified end date. 
    WebApiClient.Requests.DeleteAuditDataRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeleteAuditData",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608051.aspx
	// Deletes instances of a recurring appointment master that have an “Open” state. 
    WebApiClient.Requests.DeleteOpenInstancesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeleteOpenInstances",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607754.aspx
	// Deletes an option value in a global or local option set. 
    WebApiClient.Requests.DeleteOptionValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeleteOptionValue",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607515.aspx
	// Creates an email activity record from an incoming email message. 
    WebApiClient.Requests.DeliverIncomingEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeliverIncomingEmail",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608033.aspx
	// Creates an email activity record from the specified email message 
    WebApiClient.Requests.DeliverPromoteEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeliverPromoteEmail",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "email",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608078.aspx
	// Deprovisions a language. 
    WebApiClient.Requests.DeprovisionLanguageRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DeprovisionLanguage",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607926.aspx
	// Creates a bulk operation that distributes a campaign activity. 
    WebApiClient.Requests.DistributeCampaignActivityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "DistributeCampaignActivity",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "campaignactivity",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491159.aspx
	// Executes a workflow.
    WebApiClient.Requests.ExecuteWorkflowRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ExecuteWorkflow",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "workflow",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622402.aspx
	// Exports a data map as an XML formatted data. 
    WebApiClient.Requests.ExportMappingsImportMapRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ExportMappingsImportMap",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "importmap",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607590.aspx
	// Exports a solution. 
    WebApiClient.Requests.ExportSolutionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ExportSolution",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608097.aspx
	// Exports all translations for a specific solution to a compressed file. 
    WebApiClient.Requests.ExportTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ExportTranslation",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607784.aspx
	// Fulfills a sales order.
    WebApiClient.Requests.FulfillSalesOrderRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "FulfillSalesOrder",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });
    
    // MSDN: https://msdn.microsoft.com/en-us/library/mt491160.aspx
	// Performs a full-text search on knowledge articles in Dynamics 365 using the specified search text.
    WebApiClient.Requests.FullTextSearchKnowledgeArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "FullTextSearchKnowledgeArticle",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593066.aspx
	// Generates an invoice from an opportunity. 
    WebApiClient.Requests.GenerateInvoiceFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GenerateInvoiceFromOpportunity",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607591.aspx
	// Generates a quote from an opportunity. 
    WebApiClient.Requests.GenerateQuoteFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GenerateQuoteFromOpportunity",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607659.aspx
	// Generates a sales order (order) from an opportunity. 
    WebApiClient.Requests.GenerateSalesOrderFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GenerateSalesOrderFromOpportunity",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593014.aspx
	// Returns an existing social profile record if one exists, otherwise generates a new one and returns it. 
    WebApiClient.Requests.GenerateSocialProfileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GenerateSocialProfile",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "socialprofile",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607526.aspx
	// Retrieves the products from an opportunity and copy them to the invoice. 
    WebApiClient.Requests.GetInvoiceProductsFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GetInvoiceProductsFromOpportunity",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "invoice",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607548.aspx
	// Retrieves the products from an opportunity and copy them to the quote. 
    WebApiClient.Requests.GetQuoteProductsFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GetQuoteProductsFromOpportunity",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "quote",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607869.aspx
	// Retrieves the products from an opportunity and copy them to the sales order. 
    WebApiClient.Requests.GetSalesOrderProductsFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GetSalesOrderProductsFromOpportunity",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "salesorder",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593007.aspx
	// Returns a tracking token that can then be passed as a parameter to the SendEmailRequest message. 
    WebApiClient.Requests.GetTrackingTokenEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "GetTrackingTokenEmail",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608013.aspx
	// Imports translations from a compressed file.
    WebApiClient.Requests.ImportFieldTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ImportFieldTranslation",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607768.aspx
	// Imports the XML representation of a data map and create an import map (data map) based on this data. 
    WebApiClient.Requests.ImportMappingsImportMapRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ImportMappingsImportMap",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622418.aspx
	// Submits an asynchronous job that uploads the transformed data into Microsoft Dynamics 365.
    WebApiClient.Requests.ImportRecordsImportRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ImportRecordsImport",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "import",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608117.aspx
	// Imports a solution. 
    WebApiClient.Requests.ImportSolutionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ImportSolution",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607744.aspx
	// Imports translations from a compressed file. 
    WebApiClient.Requests.ImportTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ImportTranslation",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607647.aspx
	// Inserts a new option value for a global or local option set. 
    WebApiClient.Requests.InsertOptionValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "InsertOptionValue",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607839.aspx
	// Inserts a new option into a StatusAttributeMetadata attribute. 
    WebApiClient.Requests.InsertStatusValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "InsertStatusValue",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608101.aspx
	// Installs the sample data. 
    WebApiClient.Requests.InstallSampleDataRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "InstallSampleData",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607877.aspx
	// Instantiates a set of filters for Dynamics 365 for Outlook for the specified user. 
    WebApiClient.Requests.InstantiateFiltersRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "InstantiateFilters",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt592993.aspx
	// Creates an email message from a template (email template). 
    WebApiClient.Requests.InstantiateTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "InstantiateTemplate",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607781.aspx
	// Locks the total price of products and services that are specified in the invoice. 
    WebApiClient.Requests.LockInvoicePricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "LockInvoicePricing",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "invoice",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607804.aspx
	// Locks the total price of products and services that are specified in the sales order (order). 
    WebApiClient.Requests.LockSalesOrderPricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "LockSalesOrderPricing",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "salesorder",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607618.aspx
	// Sets the state of an opportunity to Lost. 
    WebApiClient.Requests.LoseOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "LoseOpportunity",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607669.aspx
	// Merges the information from two entity records of the same type. 
    WebApiClient.Requests.MergeRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "Merge",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607483.aspx
	// Sets the order for an option set. 
    WebApiClient.Requests.OrderOptionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "OrderOption",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622440.aspx
	// Submits an asynchronous job that parses all import files that are associated with the specified import (data import). 
    WebApiClient.Requests.ParseImportRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ParseImport",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "import",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593071.aspx
	// Assigns a queue item to a user and optionally remove the queue item from the queue. 
    WebApiClient.Requests.PickFromQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PickFromQueue",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "queueitem",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607787.aspx
	// Processes the email responses from a marketing campaign. 
    WebApiClient.Requests.ProcessInboundEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ProcessInboundEmail",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "email",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491163.aspx
	// Creates a quick campaign to distribute an activity to accounts, contacts, or leads that are selected by a query. 
    WebApiClient.Requests.PropagateByExpressionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PropagateByExpression",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608077.aspx
	// Provisions a new language. 
    WebApiClient.Requests.ProvisionLanguageRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ProvisionLanguage",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607699.aspx
	// Publishes all changes to solution components. 
    WebApiClient.Requests.PublishAllXmlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PublishAllXml",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622423.aspx
	// Submits an asynchronous job to publish a duplicate rule. 
    WebApiClient.Requests.PublishDuplicateRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PublishDuplicateRule",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "duplicaterule",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593011.aspx
	// Publishes a product family record and all its child records. 
    WebApiClient.Requests.PublishProductHierarchyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PublishProductHierarchy",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "product",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608018.aspx
	// Publishes a theme and set it as the current theme. 
    WebApiClient.Requests.PublishThemeRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PublishTheme",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "theme",
            writeable: true
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt593076.aspx
    // Publishes specified solution components. 
    WebApiClient.Requests.PublishXmlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "PublishXml",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491164.aspx
	// Qualifies a lead and create account, contact, and opportunity records that are linked to the originating lead record. 
    WebApiClient.Requests.QualifyLeadRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "QualifyLead",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "lead",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607614.aspx
	// Qualifies the specified list and either override the list members or remove them according to the specified option. 
    WebApiClient.Requests.QualifyMemberListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "QualifyMemberList",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "list",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491165.aspx
	// Converts a QueryExpression query to its equivalent FetchXML query
    WebApiClient.Requests.QueryExpressionToFetchXmlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "QueryExpressionToFetchXml",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607627.aspx
	// Reassigns all records that are owned by the security principal (user or team) to another security principal (user or team). 
    WebApiClient.Requests.ReassignObjectsOwnerRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ReassignObjectsOwner",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607965.aspx
	// Reassigns all records that are owned by a specified user to another security principal (user or team). 
    WebApiClient.Requests.ReassignObjectsSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ReassignObjectsSystemUser",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607675.aspx
	// Recalculate system-computed values for rollup fields in the goal hierarchy. 
    WebApiClient.Requests.RecalculateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "Recalculate",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "goal",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593031.aspx
	// Assigns a queue item back to the queue owner so others can pick it. 
    WebApiClient.Requests.ReleaseToQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ReleaseToQueue",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "queueitem",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607534.aspx
	// Removes a queue item from a queue. 
    WebApiClient.Requests.RemoveFromQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemoveFromQueue",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "queueitem",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607537.aspx
	// Removes members from a team.
    WebApiClient.Requests.RemoveMembersTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemoveMembersTeam",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607528.aspx
	// Removes the parent for a system user (user) record. 
    WebApiClient.Requests.RemoveParentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemoveParent",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593107.aspx
	// Removes a privilege from an existing role. 
    WebApiClient.Requests.RemovePrivilegeRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemovePrivilegeRole",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "role",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608116.aspx
	// Removes a component from an unmanaged solution. 
    WebApiClient.Requests.RemoveSolutionComponentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemoveSolutionComponent",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607735.aspx
	// Removes a user from the auto created access team for the specified record. 
    WebApiClient.Requests.RemoveUserFromRecordTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RemoveUserFromRecordTeam",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593084.aspx
	// Renews a contract and create the contract details for a new contract. 
    WebApiClient.Requests.RenewContractRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RenewContract",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "contract",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607893.aspx
	// Renews an entitlement. 
    WebApiClient.Requests.RenewEntitlementRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RenewEntitlement",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "entitlement",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607752.aspx
	// Replaces the privilege set of an existing role. 
    WebApiClient.Requests.ReplacePrivilegesRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ReplacePrivilegesRole",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "role",
            writeable: true
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt718082.aspx
	// Reschedules an appointment, recurring appointment, or service appointment (service activity). 
    WebApiClient.Requests.RescheduleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "Reschedule",
            writeable: true
        }
    });
    
	// MSDN: https://msdn.microsoft.com/en-us/library/mt607633.aspx
	// Resets the offline data filters for the calling user to the default filters for the organization. 
    WebApiClient.Requests.ResetUserFiltersRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ResetUserFilters",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608006.aspx
	// Reverts changes done to properties of a product family, product, or bundle record, and set it back to its last published (active) state. 
    WebApiClient.Requests.RevertProductRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RevertProduct",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607543.aspx
	// Sets the state of a quote to Draft. 
    WebApiClient.Requests.ReviseQuoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ReviseQuote",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607505.aspx
	// Replaces the access rights on the target record for the specified security principal (user or team). 
    WebApiClient.Requests.RevokeAccessRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RevokeAccess",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607729.aspx
	// Routes a queue item to a queue, a user, or a team. 
    WebApiClient.Requests.RouteToRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "RouteTo",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491166.aspx
	// Sends bulk email messages.
    WebApiClient.Requests.SendBulkMailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SendBulkMail",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608061.aspx
	// Sends an e-mail message. 
    WebApiClient.Requests.SendEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SendEmail",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "email",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607523.aspx
	// Sends an e-mail message to a recipient using an e-mail template. 
    WebApiClient.Requests.SendEmailFromTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SendEmailFromTemplate",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607670.aspx
	// Sends a fax. 
    WebApiClient.Requests.SendFaxRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SendFax",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607717.aspx
	// Sends a bulk email message that is created from a template. 
    WebApiClient.Requests.SendTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SendTemplate",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608087.aspx
	// Assigns equipment (facility/equipment) to a specific business unit. 
    WebApiClient.Requests.SetBusinessEquipmentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetBusinessEquipment",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593023.aspx
	// Moves a system user (user) to a different business unit. 
    WebApiClient.Requests.SetBusinessSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetBusinessSystemUser",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608039.aspx
	// Sets or restore the data encryption key. 
    WebApiClient.Requests.SetDataEncryptionKeyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetDataEncryptionKey",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491167.aspx
	// TODO: SetFeatureStatus Action Description (Obviously no description yet)
    WebApiClient.Requests.SetFeatureStatusRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetFeatureStatus",
            writeable: true
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt607609.aspx
    // Sets localized labels for a limited set of entity attributes. 
    WebApiClient.Requests.SetLocLabelsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetLocLabels",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607617.aspx
	// Sets a new parent system user (user) for the specified user. 
    WebApiClient.Requests.SetParentSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetParentSystemUser",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "systemuser",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607705.aspx
	// Sets the process that associates with a given target entity. The user can set to another business process or specify null to clear out the current process.
    WebApiClient.Requests.SetProcessRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetProcess",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607765.aspx
	// Links an instance of a report entity to related entities. 
    WebApiClient.Requests.SetReportRelatedRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "SetReportRelated",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608027.aspx
	// Submits an asynchronous job that transforms the parsed data. 
    WebApiClient.Requests.TransformImportRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "TransformImport",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622443.aspx
	// Validates the configuration of a Microsoft Azure Service Bus solution’s service endpoint. 
    WebApiClient.Requests.TriggerServiceEndpointCheckRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "TriggerServiceEndpointCheck",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        },
        entityName: {
            value: "serviceendpoint",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608045.aspx
	// Uninstalls the sample data.
    WebApiClient.Requests.UninstallSampleDataRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UninstallSampleData",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608015.aspx
	// Unlocks pricing for an invoice. 
    WebApiClient.Requests.UnlockInvoicePricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UnlockInvoicePricing",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608026.aspx
	// Unlocks pricing for a sales order (order). 
    WebApiClient.Requests.UnlockSalesOrderPricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UnlockSalesOrderPricing",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593018.aspx
	// Submits an asynchronous job to unpublish a duplicate rule. 
    WebApiClient.Requests.UnpublishDuplicateRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UnpublishDuplicateRule",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491168.aspx
	// TODO: UpdateFeatureConfig Action Description (Missing)
    WebApiClient.Requests.UpdateFeatureConfigRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UpdateFeatureConfig",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607949.aspx
	// Updates an option value in a global or local option set. 
    WebApiClient.Requests.UpdateOptionValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UpdateOptionValue",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607561.aspx
	// Updates values of the property instances (dynamic property instances) for a product added to an opportunity, quote, order, or invoice. 
    WebApiClient.Requests.UpdateProductPropertiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UpdateProductProperties",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607611.aspx
	// Updates a component in an unmanaged solution.
    WebApiClient.Requests.UpdateSolutionComponentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UpdateSolutionComponent",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607556.aspx
	// Updates an option set value in for a StateAttributeMetadata attribute. 
    WebApiClient.Requests.UpdateStateValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "UpdateStateValue",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607767.aspx
	// Verifies that an appointment or service appointment (service activity) has valid available resources for the activity, duration, and site, as appropriate. 
    WebApiClient.Requests.ValidateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "Validate",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607945.aspx
	// Validates a saved query.
    WebApiClient.Requests.ValidateSavedQueryRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "ValidateSavedQuery",
            writeable: true
        },
        bound: {
            value: true,
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607971.aspx
	// Sets the state of an opportunity to Won. 
    WebApiClient.Requests.WinOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "WinOpportunity",
            writeable: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607710.aspx
	// Sets the state of a quote to Won. 
    WebApiClient.Requests.WinQuoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST",
            writeable: true
        },
        name: {
            value: "WinQuote",
            writeable: true
        }
    });

} (global.WebApiClient = global.WebApiClient || {}));