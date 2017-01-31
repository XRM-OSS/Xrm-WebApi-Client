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
        var url = "";
        
        if (this.bound && this.entityId) {
            var entityId = this.entityId.replace("{", "").replace("}", "");
            url = baseUrl + WebApiClient.GetSetName(this.entityName) + "(" + entityId + ")/" + this.name; 
        } else {
            url = baseUrl + this.name;
        }
        
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
            value: "GET"
        },
        name: {
            value: "CalculateRollupField"
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt593054.aspx
    // Calculates the total time, in minutes, that you used while you worked on an incident (case). 
    WebApiClient.Requests.CalculateTotalTimeIncidentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "CalculateTotalTimeIncident"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "incident"
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt683529.aspx
    // Check whether the incoming email message is relevant to the Microsoft Dynamics 365 system. 
    WebApiClient.Requests.CheckIncomingEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "CheckIncomingEmail"
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt593013.aspx
    // Contains the data that is needed to check whether the incoming email message should be promoted to the Microsoft Dynamics 365 system. 
    WebApiClient.Requests.CheckPromoteEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "CheckPromoteEmail"
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt607800.aspx
    // Downloads a report definition. 
    WebApiClient.Requests.DownloadReportDefinitionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "DownloadReportDefinition"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "report"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607824.aspx
	// Converts the calendar rules to an array of available time blocks for the specified period. 
    WebApiClient.Requests.ExpandCalendarRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "ExpandCalendar"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "calendar"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593047.aspx
	// Exports localizable fields values to a compressed file. 
    WebApiClient.Requests.ExportFieldTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "ExportFieldTranslation"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491169.aspx
	// Converts a query in FetchXML to a QueryExpression. 
    WebApiClient.Requests.FetchXmlToQueryExpressionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "FetchXmlToQueryExpression"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683530.aspx
	// Finds a parent resource group (scheduling group) for the specified resource groups (scheduling groups).
    WebApiClient.Requests.FindParentResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "FindParentResourceGroup"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "resourcegroup"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593004.aspx
	// Retrieves all the time zone definitions for the specified locale and to return only the display name attribute. 
    WebApiClient.Requests.GetAllTimeZonesWithDisplayNameRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "GetAllTimeZonesWithDisplayName"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608119.aspx
	// Retrieves the default price level (price list) for the current user based on the user’s territory relationship with the price level. 
    WebApiClient.Requests.GetDefaultPriceLevelRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "GetDefaultPriceLevel"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622422.aspx
	// Retrieves distinct values from the parse table for a column in the source file that contains list values. 
    WebApiClient.Requests.GetDistinctValuesImportFileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "GetDistinctValuesImportFile"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "importfile"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622408.aspx
	// Retrieves the source-file column headings; or retrieve the system-generated column headings if the source file does not contain column headings. 
    WebApiClient.Requests.GetHeaderColumnsImportFileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "GetHeaderColumnsImportFile"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "importfile"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683531.aspx
	// Gets the quantity decimal value of a product for the specified entity in the target. 
    WebApiClient.Requests.GetQuantityDecimalRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "GetQuantityDecimal"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607697.aspx
	// Retrieves the history limit for a report. 
    WebApiClient.Requests.GetReportHistoryLimitRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "GetReportHistoryLimit"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "report"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607644.aspx
	// Retrieves the time zone code for the specified localized time zone name. 
    WebApiClient.Requests.GetTimeZoneCodeByLocalizedNameRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "GetTimeZoneCodeByLocalizedName"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608131.aspx
	// Retrieves a list of all the entities that can participate in a Many-to-Many entity relationship. 
    WebApiClient.Requests.GetValidManyToManyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "GetValidManyToMany"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608031.aspx
	// Retrieves a list of entity logical names that are valid as the primary entity (one) from the specified entity in a one-to-many relationship. 
    WebApiClient.Requests.GetValidReferencedEntitiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "GetValidReferencedEntities"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt592992.aspx
	// Retrieves the set of entities that are valid as the related entity (many) to the specified entity in a one-to-many relationship. 
    WebApiClient.Requests.GetValidReferencingEntitiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "GetValidReferencingEntities"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683532.aspx
	// Increments the per day view count of a knowledge article record.
    WebApiClient.Requests.IncrementKnowledgeArticleViewCountRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "IncrementKnowledgeArticleViewCount"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683533.aspx
	// Initializes a new record from an existing record.
    WebApiClient.Requests.InitializeFromRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "InitializeFrom"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607606.aspx
	// Determines whether a solution component is customizable. 
    WebApiClient.Requests.IsComponentCustomizableRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "IsComponentCustomizable"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607678.aspx
	// Determines whether data encryption is currently running (active or inactive). 
    WebApiClient.Requests.IsDataEncryptionActiveRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "IsDataEncryptionActive"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683534.aspx
	// Validates the state transition.
    WebApiClient.Requests.IsValidStateTransitionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "IsValidStateTransition"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683535.aspx
	// Searches multiple resources for available time block that matches the specified parameters.
    WebApiClient.Requests.QueryMultipleSchedulesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "QueryMultipleSchedules"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608100.aspx
	// Searches the specified resource for an available time block that matches the specified parameters. 
    WebApiClient.Requests.QueryScheduleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "QuerySchedule"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622429.aspx
	// Retrieves the absolute URL and the site collection URL for a SharePoint location record in Microsoft Dynamics 365. 
    WebApiClient.Requests.RetrieveAbsoluteAndSiteCollectionUrlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveAbsoluteAndSiteCollectionUrl"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491171.aspx
	// TODO: RetrieveActivePath Function Description (No Joke, MS description)
    WebApiClient.Requests.RetrieveActivePathRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveActivePath"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607682.aspx
	// Retrieves the collection of users that report to the specified system user (user). 
    WebApiClient.Requests.RetrieveAllChildUsersSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveAllChildUsersSystemUser"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "systemuser"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683536.aspx
	// Retrieves metadata information about all the entities. 
    WebApiClient.Requests.RetrieveAllEntitiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveAllEntities"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607503.aspx
	// Retrieve the data that defines the content and behavior of the application ribbon. 
    WebApiClient.Requests.RetrieveApplicationRibbonRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveApplicationRibbon"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593106.aspx
	// Retrieves the list of database partitions that are used to store audited history data. 
    WebApiClient.Requests.RetrieveAuditPartitionListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveAuditPartitionList"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607635.aspx
	// Retrieves the list of language packs that are installed and enabled on the server. 
    WebApiClient.Requests.RetrieveAvailableLanguagesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveAvailableLanguages"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607489.aspx
	// Retrieves all business units from the business unit hierarchy. 
    WebApiClient.Requests.RetrieveBusinessHierarchyBusinessUnitRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveBusinessHierarchyBusinessUnit"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "businessunit"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607979.aspx
	// Retrieves all resources that are related to the specified resource group 
    WebApiClient.Requests.RetrieveByGroupResourceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveByGroupResource"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "resourcegroup"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607881.aspx
	// Retrieves the resource groups (scheduling groups) that contain the specified resource. 
    WebApiClient.Requests.RetrieveByResourceResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveByResourceResourceGroup"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "resource"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491172.aspx
	// Retrieve the collection of services that are related to the specified set of resources.
    WebApiClient.Requests.RetrieveByResourcesServiceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveByResourcesService"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607560.aspx
	// Retrieves the top-ten articles about a specified product from the knowledge base of articles for the organization 
    WebApiClient.Requests.RetrieveByTopIncidentProductKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveByTopIncidentProductKbArticle"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "product"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608058.aspx
	// Retrieves the top-ten articles about a specified subject from the knowledge base of articles for your organization. 
    WebApiClient.Requests.RetrieveByTopIncidentSubjectKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveByTopIncidentSubjectKbArticle"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "subject"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608120.aspx
	// Retrieve information about the current organization. 
    WebApiClient.Requests.RetrieveCurrentOrganizationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveCurrentOrganization"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608110.aspx
	// Retrieves the data encryption key value. 
    WebApiClient.Requests.RetrieveDataEncryptionKeyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveDataEncryptionKey"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607985.aspx
	// Retrieves a collection of dependency records that describe any solution components that would prevent a solution component from being deleted. 
    WebApiClient.Requests.RetrieveDependenciesForDeleteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveDependenciesForDelete"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607791.aspx
	// Retrieves a list of the solution component dependencies that can prevent you from uninstalling a managed solution. 
    WebApiClient.Requests.RetrieveDependenciesForUninstallRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveDependenciesForUninstall"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593045.aspx
	// Retrieves a list dependencies for solution components that directly depend on a solution component. 
    WebApiClient.Requests.RetrieveDependentComponentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveDependentComponents"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593056.aspx
	// Retrieves the type of license for a deployment of Microsoft Dynamics 365. 
    WebApiClient.Requests.RetrieveDeploymentLicenseTypeRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveDeploymentLicenseType"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607656.aspx
	// Retrieves a list of language packs that are installed on the server that have been disabled. 
    WebApiClient.Requests.RetrieveDeprovisionedLanguagesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveDeprovisionedLanguages"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683537.aspx
	// Detects and retrieves duplicates for a specified record.
    WebApiClient.Requests.RetrieveDuplicatesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveDuplicates"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491170.aspx
	// Retrieve the changes for an entity. 
    WebApiClient.Requests.RetrieveEntityChangesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveEntityChanges"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607698.aspx
	// Retrieves ribbon definitions for an entity. 
    WebApiClient.Requests.RetrieveEntityRibbonRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveEntityRibbon"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491173.aspx
	// Retrieves the appointments for the current user for a specific date range from the exchange web service. 
    WebApiClient.Requests.RetrieveExchangeAppointmentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveExchangeAppointments"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607795.aspx
	// Retrieves the exchange rate. 
    WebApiClient.Requests.RetrieveExchangeRateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveExchangeRate"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491174.aspx
	// Retrieves the entity forms that are available for a specified user. 
    WebApiClient.Requests.RetrieveFilteredFormsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveFilteredForms"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607487.aspx
	// Retrieves the formatted results from an import job. 
    WebApiClient.Requests.RetrieveFormattedImportJobResultsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveFormattedImportJobResults"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607696.aspx
	// Retrieves the list of language packs that are installed on the server. 
    WebApiClient.Requests.RetrieveInstalledLanguagePacksRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveInstalledLanguagePacks"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608102.aspx
	// Retrieves the version of an installed language pack. 
    WebApiClient.Requests.RetrieveInstalledLanguagePackVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveInstalledLanguagePackVersion"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607844.aspx
	// Retrieves the number of used and available licenses for a deployment of Microsoft Dynamics 365. 
    WebApiClient.Requests.RetrieveLicenseInfoRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveLicenseInfo"
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt683538.aspx
    // Retrieves localized labels for a limited set of entity attributes.
    WebApiClient.Requests.RetrieveLocLabelsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveLocLabels"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt592988.aspx
	// Retrieves folder-level tracking rules for a mailbox. 
    WebApiClient.Requests.RetrieveMailboxTrackingFoldersRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveMailboxTrackingFolders"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622412.aspx
	// Retrieves the members of a bulk operation. 
    WebApiClient.Requests.RetrieveMembersBulkOperationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveMembersBulkOperation"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "bulkoperation"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607580.aspx
	// Retrieves a list of missing components in the target organization. 
    WebApiClient.Requests.RetrieveMissingComponentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveMissingComponents"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607972.aspx
	// Retrieves any required solution components that are not included in the solution. 
    WebApiClient.Requests.RetrieveMissingDependenciesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveMissingDependencies"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607527.aspx
	// Retrieves the resources that are used by an organization. 
    WebApiClient.Requests.RetrieveOrganizationResourcesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveOrganizationResources"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607818.aspx
	// Retrieves the collection of the parent resource groups of the specified resource group (scheduling group). 
    WebApiClient.Requests.RetrieveParentGroupsResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveParentGroupsResourceGroup"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607594.aspx
	// Retrieves the data from the parse table.
    WebApiClient.Requests.RetrieveParsedDataImportFileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveParsedDataImportFile"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607613.aspx
	// Retrieves pages of posts, including comments for each post, for all records that the calling user is following. 
    WebApiClient.Requests.RetrievePersonalWallRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrievePersonalWall"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683539.aspx
	// Retrieves the access rights of the specified security principal (team or user) to the specified record.
    WebApiClient.Requests.RetrievePrincipalAccessRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrievePrincipalAccess"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607755.aspx
	// Retrieves all the secured attribute privileges a user or team has through direct or indirect (through team membership) associations with the FieldSecurityProfile entity. 
    WebApiClient.Requests.RetrievePrincipalAttributePrivilegesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrievePrincipalAttributePrivileges"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593098.aspx
	// For internal use only.
    WebApiClient.Requests.RetrievePrincipalSyncAttributeMappingsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrievePrincipalSyncAttributeMappings"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt622426.aspx
	// Retrieves the set of privileges defined in the system. 
    WebApiClient.Requests.RetrievePrivilegeSetRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrievePrivilegeSet"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491175.aspx
	// TODO: RetrieveProcessInstances Function Description (By MS)
    WebApiClient.Requests.RetrieveProcessInstancesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveProcessInstances"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607701.aspx
	// Retrieve all the property instances (dynamic property instances) for a product added to an opportunity, quote, order, or invoice. 
    WebApiClient.Requests.RetrieveProductPropertiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveProductProperties"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593074.aspx
	// Retrieves the version of a provisioned language pack. 
    WebApiClient.Requests.RetrieveProvisionedLanguagePackVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveProvisionedLanguagePackVersion"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607900.aspx
	// Retrieves the list of provisioned languages. 
    WebApiClient.Requests.RetrieveProvisionedLanguagesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveProvisionedLanguages"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683540.aspx
	// Retrieves pages of posts, including comments for each post, for a specified record. 
    WebApiClient.Requests.RetrieveRecordWallRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveRecordWall"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607927.aspx
	// Retrieves a collection of solution components that are required for a solution component. 
    WebApiClient.Requests.RetrieveRequiredComponentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveRequiredComponents"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607997.aspx
	// Retrieves the privileges that are assigned to the specified role. 
    WebApiClient.Requests.RetrieveRolePrivilegesRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveRolePrivilegesRole"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607604.aspx
	// Retrieves the collection of child resource groups from the specified resource group. 
    WebApiClient.Requests.RetrieveSubGroupsResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveSubGroupsResourceGroup"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "resourcegroup"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608036.aspx
	// Retrieves the privileges for a team. 
    WebApiClient.Requests.RetrieveTeamPrivilegesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveTeamPrivileges"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "team"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607518.aspx
	// Retrieves a time stamp for the metadata. 
    WebApiClient.Requests.RetrieveTimestampRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveTimestamp"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683541.aspx
	// Retrieves a collection of unpublished organization-owned records that satisfy the specified query criteria. 
    WebApiClient.Requests.RetrieveUnpublishedMultipleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveUnpublishedMultiple"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607996.aspx
	// Retrieves the privileges a system user (user) has through his or her roles in the specified business unit. 
    WebApiClient.Requests.RetrieveUserPrivilegesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveUserPrivileges"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "systemuser"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607579.aspx
	// Retrieves all private queues of a specified user and optionally all public queues. 
    WebApiClient.Requests.RetrieveUserQueuesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveUserQueues"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "systemuser"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593041.aspx
	// Retrieves the version number of the Microsoft Dynamics 365 Server. 
    WebApiClient.Requests.RetrieveVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveVersion"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt491176.aspx
	// Retrieves all the entity records that are related to the specified record. 
    WebApiClient.Requests.RollupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "Rollup"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt608029.aspx
	// Searches for available time slots that fulfill the specified appointment request. 
    WebApiClient.Requests.SearchRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "Search"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683542.aspx
	// Searches for knowledge base articles that contain the specified body text.
    WebApiClient.Requests.SearchByBodyKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "SearchByBodyKbArticle"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683543.aspx
	// Searches for knowledge base articles that contain the specified keywords.
    WebApiClient.Requests.SearchByKeywordsKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "SearchByKeywordsKbArticle"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683544.aspx
	// Searches for knowledge base articles that contain the specified title. 
    WebApiClient.Requests.SearchByTitleKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "SearchByTitleKbArticle"
        },
        bound: {
            value: true
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt683545.aspx
	// Validates a rule for a recurring appointment. 
    WebApiClient.Requests.ValidateRecurrenceRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "ValidateRecurrenceRule"
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt607925.aspx
    // Retrieves the system user ID for the currently logged on user or the user under whose context the code is running. 
    WebApiClient.Requests.WhoAmIRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "WhoAmI"
        }
    });

    // Actions
    
	// MSDN: https://msdn.microsoft.com/en-us/library/mt607569.aspx
	// Adds an item to a campaign.
    WebApiClient.Requests.AddItemCampaignRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "AddItemCampaign"
        },
        bound: {
            value: true
        }
    });

	// MSDN:https://msdn.microsoft.com/en-us/library/mt607559.aspx
	// Adds an item to a campaign activity. 
    WebApiClient.Requests.AddItemCampaignActivityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "AddItemCampaignActivity"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607641.aspx
	// Adds members to a list. 
    WebApiClient.Requests.AddListMembersListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "AddListMembersList"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607495.aspx
	// Adds a member to a list (marketing list). 
    WebApiClient.Requests.AddMemberListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "AddMemberList"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "list"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607496.aspx
	// Adds members to a team. 
    WebApiClient.Requests.AddMembersTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "AddMembersTeam"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "team"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt593089.aspx
	// Adds the specified principal to the list of queue members. 
    WebApiClient.Requests.AddPrincipalToQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "AddPrincipalToQueue"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "queue"
        }
    });

	// MSDN: https://msdn.microsoft.com/en-us/library/mt607862.aspx
	// Adds a set of existing privileges to an existing role. 
    WebApiClient.Requests.AddPrivilegesRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "AddPrivilegesRole"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "role"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.AddRecurrenceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.AddSolutionComponentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt607880.aspx
    //
    WebApiClient.Requests.AddToQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "Microsoft.Dynamics.CRM.AddToQueue"
        },
        bound: {
            value: true
        },
        entityName: {
            value: "queue"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.AddUserToRecordTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ApplyRecordCreationAndUpdateRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ApplyRoutingRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.AutoMapEntityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.BookRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.BulkDeleteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.BulkDetectDuplicatesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CalculateActualValueOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CalculatePriceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CanBeReferencedRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CanBeReferencingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CancelContractRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CancelSalesOrderRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CanManyToManyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CloneAsPatchRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CloneAsSolutionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CloneContractRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CloneMobileOfflineProfileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CloneProductRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CloseIncidentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CloseQuoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CompoundUpdateDuplicateDetectionRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ConvertOwnerTeamToAccessTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ConvertProductToKitRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ConvertQuoteToSalesOrderRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ConvertSalesOrderToInvoiceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CopyCampaignRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CopyCampaignResponseRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CopyDynamicListToStaticRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CopyMembersListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CopySystemFormRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CreateActivitiesListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CreateCustomerRelationshipsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CreateExceptionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CreateInstanceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CreateKnowledgeArticleTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CreateKnowledgeArticleVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.CreateWorkflowFromTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.DeleteAndPromoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.DeleteAuditDataRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.DeleteOpenInstancesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.DeleteOptionValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.DeliverIncomingEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.DeliverPromoteEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.DeprovisionLanguageRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.DistributeCampaignActivityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ExecuteWorkflowRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ExportMappingsImportMapRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ExportSolutionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ExportTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.FullTextSearchKnowledgeArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.FulfillSalesOrderRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.GenerateInvoiceFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.GenerateQuoteFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.GenerateSalesOrderFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.GenerateSocialProfileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.GetInvoiceProductsFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.GetQuoteProductsFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.GetSalesOrderProductsFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.GetTrackingTokenEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ImportFieldTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ImportMappingsImportMapRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ImportRecordsImportRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ImportSolutionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ImportTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.InsertOptionValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.InsertStatusValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.InstallSampleDataRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.InstantiateFiltersRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.InstantiateTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.LockInvoicePricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.LockSalesOrderPricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.LoseOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.MergeRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.OrderOptionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ParseImportRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.PickFromQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ProcessInboundEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.PropagateByExpressionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ProvisionLanguageRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.PublishAllXmlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.PublishDuplicateRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.PublishProductHierarchyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.PublishThemeRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt593076.aspx
    WebApiClient.Requests.PublishXmlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "PublishXml"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.QualifyLeadRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.QualifyMemberListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.QueryExpressionToFetchXmlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ReassignObjectsOwnerRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ReassignObjectsSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RecalculateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ReleaseToQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RemoveFromQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RemoveMembersTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RemoveParentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RemovePrivilegeRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RemoveSolutionComponentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RemoveUserFromRecordTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RenewContractRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RenewEntitlementRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ReplacePrivilegesRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ResetUserFiltersRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RescheduleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RevertProductRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ReviseQuoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RevokeAccessRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.RouteToRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SendBulkMailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SendEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SendEmailFromTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SendFaxRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SendTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SetBusinessEquipmentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SetBusinessSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SetDataEncryptionKeyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SetFeatureStatusRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt607609.aspx
    WebApiClient.Requests.SetLocLabelsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "SetLocLabels"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SetParentSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SetProcessRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.SetReportRelatedRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.TransformImportRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.TriggerServiceEndpointCheckRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.UninstallSampleDataRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.UnlockInvoicePricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.UnlockSalesOrderPricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.UnpublishDuplicateRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.UpdateFeatureConfigRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.UpdateOptionValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.UpdateProductPropertiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.UpdateSolutionComponentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.UpdateStateValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ValidateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.ValidateSavedQueryRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.WinOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

	// MSDN: 
	//
    WebApiClient.Requests.WinQuoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

} (window.WebApiClient = window.WebApiClient || {}));