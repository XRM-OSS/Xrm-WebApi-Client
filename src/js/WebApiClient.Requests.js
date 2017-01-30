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
        
        if (this.bound) {
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
    WebApiClient.Requests.CalculateRollupFieldRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CalculateTotalTimeIncidentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CheckIncomingEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CheckPromoteEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.DownloadReportDefinitionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ExpandCalendarRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ExportFieldTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.FetchXmlToQueryExpressionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.FindParentResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetAllTimeZonesWithDisplayNameRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetDefaultPriceLevelRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetDistinctValuesImportFileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetHeaderColumnsImportFileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetQuantityDecimalRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetReportHistoryLimitRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetTimeZoneCodeByLocalizedNameRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetValidManyToManyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetValidReferencedEntitiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetValidReferencingEntitiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.IncrementKnowledgeArticleViewCountRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.InitializeFromRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.IsComponentCustomizableRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.IsDataEncryptionActiveRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.IsValidStateTransitionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.QueryMultipleSchedulesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.QueryScheduleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveAbsoluteAndSiteCollectionUrlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveActivePathRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveAllChildUsersSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveAllEntitiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveApplicationRibbonRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveAuditPartitionListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveAvailableLanguagesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveBusinessHierarchyBusinessUnitRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveByGroupResourceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveByResourceResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveByResourcesServiceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveByTopIncidentProductKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveByTopIncidentSubjectKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveCurrentOrganizationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveDataEncryptionKeyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveDependenciesForDeleteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveDependenciesForUninstallRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveDependentComponentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveDeploymentLicenseTypeRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveDeprovisionedLanguagesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveDuplicatesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveEntityChangesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveEntityRibbonRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveExchangeAppointmentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveExchangeRateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveFilteredFormsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveFormattedImportJobResultsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveInstalledLanguagePacksRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveInstalledLanguagePackVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveLicenseInfoRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    // MSDN: https://msdn.microsoft.com/de-de/library/mt683538.aspx
    WebApiClient.Requests.RetrieveLocLabelsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RetrieveLocLabels"
        }
    });

    WebApiClient.Requests.RetrieveMailboxTrackingFoldersRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveMembersBulkOperationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveMissingComponentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveMissingDependenciesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveOrganizationResourcesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveParentGroupsResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveParsedDataImportFileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrievePersonalWallRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrievePrincipalAccessRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrievePrincipalAttributePrivilegesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrievePrincipalSyncAttributeMappingsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrievePrivilegeSetRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveProcessInstancesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveProductPropertiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveProvisionedLanguagePackVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveProvisionedLanguagesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveRecordWallRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveRequiredComponentsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveRolePrivilegesRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveSubGroupsResourceGroupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveTeamPrivilegesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveTimestampRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveUnpublishedMultipleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveUserPrivilegesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveUserQueuesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RetrieveVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RollupRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SearchRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SearchByBodyKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SearchByKeywordsKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SearchByTitleKbArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ValidateRecurrenceRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "RequestName"
        }
    });

    // MSDN: https://msdn.microsoft.com/de-de/library/mt607925.aspx
    WebApiClient.Requests.WhoAmIRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "GET"
        },
        name: {
            value: "WhoAmI"
        }
    });

    // Actions
    WebApiClient.Requests.AddItemCampaignRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.AddItemCampaignActivityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.AddListMembersListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.AddMemberListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.AddMembersTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.AddPrincipalToQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.AddPrivilegesRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.AddRecurrenceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.AddSolutionComponentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    // MSDN: https://msdn.microsoft.com/en-us/library/mt607880.aspx
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

    WebApiClient.Requests.AddUserToRecordTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ApplyRecordCreationAndUpdateRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ApplyRoutingRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.AutoMapEntityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.BookRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.BulkDeleteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.BulkDetectDuplicatesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CalculateActualValueOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CalculatePriceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CanBeReferencedRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CanBeReferencingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CancelContractRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CancelSalesOrderRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CanManyToManyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CloneAsPatchRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CloneAsSolutionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CloneContractRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CloneMobileOfflineProfileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CloneProductRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CloseIncidentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CloseQuoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CompoundUpdateDuplicateDetectionRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ConvertOwnerTeamToAccessTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ConvertProductToKitRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ConvertQuoteToSalesOrderRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ConvertSalesOrderToInvoiceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CopyCampaignRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CopyCampaignResponseRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CopyDynamicListToStaticRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CopyMembersListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CopySystemFormRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CreateActivitiesListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CreateCustomerRelationshipsRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CreateExceptionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CreateInstanceRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CreateKnowledgeArticleTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CreateKnowledgeArticleVersionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.CreateWorkflowFromTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.DeleteAndPromoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.DeleteAuditDataRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.DeleteOpenInstancesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.DeleteOptionValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.DeliverIncomingEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.DeliverPromoteEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.DeprovisionLanguageRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.DistributeCampaignActivityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ExecuteWorkflowRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ExportMappingsImportMapRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ExportSolutionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ExportTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.FullTextSearchKnowledgeArticleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.FulfillSalesOrderRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GenerateInvoiceFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GenerateQuoteFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GenerateSalesOrderFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GenerateSocialProfileRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetInvoiceProductsFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetQuoteProductsFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetSalesOrderProductsFromOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.GetTrackingTokenEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ImportFieldTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ImportMappingsImportMapRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ImportRecordsImportRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ImportSolutionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ImportTranslationRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.InsertOptionValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.InsertStatusValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.InstallSampleDataRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.InstantiateFiltersRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.InstantiateTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.LockInvoicePricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.LockSalesOrderPricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.LoseOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.MergeRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.OrderOptionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ParseImportRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.PickFromQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ProcessInboundEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.PropagateByExpressionRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ProvisionLanguageRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.PublishAllXmlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.PublishDuplicateRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.PublishProductHierarchyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

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

    WebApiClient.Requests.QualifyLeadRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.QualifyMemberListRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.QueryExpressionToFetchXmlRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ReassignObjectsOwnerRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ReassignObjectsSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RecalculateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ReleaseToQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RemoveFromQueueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RemoveMembersTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RemoveParentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RemovePrivilegeRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RemoveSolutionComponentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RemoveUserFromRecordTeamRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RenewContractRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RenewEntitlementRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ReplacePrivilegesRoleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ResetUserFiltersRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RescheduleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RevertProductRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ReviseQuoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RevokeAccessRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.RouteToRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SendBulkMailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SendEmailRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SendEmailFromTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SendFaxRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SendTemplateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SetBusinessEquipmentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SetBusinessSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SetDataEncryptionKeyRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

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

    WebApiClient.Requests.SetParentSystemUserRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SetProcessRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.SetReportRelatedRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.TransformImportRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.TriggerServiceEndpointCheckRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.UninstallSampleDataRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.UnlockInvoicePricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.UnlockSalesOrderPricingRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.UnpublishDuplicateRuleRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.UpdateFeatureConfigRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.UpdateOptionValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.UpdateProductPropertiesRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.UpdateSolutionComponentRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.UpdateStateValueRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ValidateRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.ValidateSavedQueryRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.WinOpportunityRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

    WebApiClient.Requests.WinQuoteRequest = Object.create(WebApiClient.Requests.Request.prototype, {
        method: {
            value: "POST"
        },
        name: {
            value: "RequestName"
        }
    });

} (window.WebApiClient = window.WebApiClient || {}));