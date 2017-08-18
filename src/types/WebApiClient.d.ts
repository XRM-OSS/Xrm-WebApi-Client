import * as bluebird from "bluebird";

export module WebApiClient {
    let ApiVersion: string;
    let ReturnAllPages: boolean;
    let PrettifyErrors: boolean;
    let Async: boolean;
    let ClientUrl: string;
    let Token: string;
    
    export let Promise: typeof bluebird;

    interface Header {
        key: string;
        value: string;
    }

    interface Key {
        property: string;
        value: string | number;
    }

    interface EntityReference {
        entityName: string;
        entityId: string;
    }

    interface BaseParameters {
        async?: boolean;
        headers?: Array<Header>
    }

    interface CreateParameters extends BaseParameters {
        entityName?: string;
        overriddenSetName?: string;
        entity: object;
    }

    interface RetrieveParameters extends BaseParameters {
        entityName?: string;
        overriddenSetName?: string;        
        entityId?: string;
        alternateKey?: Array<Key>;
        queryParams?: string;
        fetchXml?: string;
        returnAllPages?: boolean;
    }

    interface UpdateParameters extends BaseParameters {
        entityName?: string;
        overriddenSetName?: string;        
        entityId?: string;
        entity: object;
        alternateKey?: Array<Key>;
    }

    interface DeleteParameters extends BaseParameters {
        entityName?: string;
        overriddenSetName?: string;        
        entityId?: string;
        alternateKey?: Array<Key>;
    }

    interface AssociationParameters extends BaseParameters {
        relationShip: string;
        source: EntityReference;
        target: EntityReference;
    }

    interface BatchRequestParameters {
        method: string;
        url?: string;
        payload?: string;
        headers?: Array<Header>;
        contentId?: string;
    }

    class BatchRequest implements BatchRequestParameters {
        method: string;
        url?: string;
        payload?: string;
        headers?: Array<Header>;
        contentId?: string;

        constructor(params: BatchRequestParameters);
    }

    interface ResponseParameters {
        rawData?: string;
        contentId?: string;
        payload?: object;
        status?: string;

        // Basically an object = associative array, access headers by name and get the value
        headers?: any;
    }

    class Response implements ResponseParameters {
        rawData?: string;
        contentId?: string;
        payload?: object;
        status?: string;
        headers?: any;

        constructor(parameters: ResponseParameters);
    }

    class ChangeSetResponse {
        name?: string;
        responses?: Array<Response>;
    }

    interface BatchResponseParameters {
        name?: string;
        changeSetResponses?: Array<ChangeSetResponse>;
        batchResponses?: Array<Response>;
        isFaulted?: boolean;
        errors?: Array<string>;
        xhr?: XMLHttpRequest;
    }

    class BatchResponse implements BatchResponseParameters {
        name?: string;
        changeSetResponses?: Array<ChangeSetResponse>;
        batchResponses?: Array<Response>;
        isFaulted?: boolean;
        errors?: Array<string>;
        xhr?: XMLHttpRequest;

        constructor(parameters: BatchResponseParameters);
    }

    interface ChangeSetParameters {
        name?: string;
        requests?: Array<BatchRequest>;
    }

    class ChangeSet implements ChangeSetParameters {
        name?: string;
        requests?: Array<BatchRequest>;

        constructor(parameters: ChangeSetParameters);
    }

    interface BatchParameters extends BaseParameters {
        name?: string;
        changeSets?: Array<ChangeSet>;
        requests?: Array<BatchRequest>;
        isOverLengthGet?: boolean;
    }

    class Batch implements BatchParameters {
        name?: string;
        changeSets?: Array<ChangeSet>;
        requests?: Array<BatchRequest>;
        headers?: Array<Header>;
        async?: boolean;
        isOverLengthGet?: boolean;

        constructor(parameters: BatchParameters);
    }

    function Create(parameters: CreateParameters): Promise<string> | Promise<any> | string | any;

    function Retrieve(parameters: RetrieveParameters): Promise<any> | any; 
    
    function Update(parameters: UpdateParameters): Promise<string> | Promise<any> | string | any;

    function Delete(parameters: DeleteParameters): Promise<string> | string;

    function Associate(parameters: AssociationParameters): Promise<string> | string;

    function Disassociate(parameters: AssociationParameters): Promise<string> | string;

    function Execute(request: object): Promise<any> | any;

    function SendBatch(batch: Batch): Promise<BatchResponse> | BatchResponse;

    namespace Requests {
        interface RequestParameters extends BaseParameters {
            method?: string;
            name?: string;
            bound?: boolean;
            entityName?: boolean;
            entityId?: string;
            payload?: object;
            urlParams?: object;
        }

        class Request implements RequestParameters {
            method?: string;
            name?: string;
            bound?: boolean;
            entityName?: boolean;
            entityId?: string;
            payload?: object;
            headers?: Array<Header>;
            urlParams?: object;
            async?: boolean;

            with(param: RequestParameters): this; 
        }

        class CalculateRollupFieldRequest extends Request { }
        class CalculateTotalTimeIncidentRequest extends Request { }
        class CheckIncomingEmailRequest extends Request { }
        class CheckPromoteEmailRequest extends Request { }
        class DownloadReportDefinitionRequest extends Request { }
        class ExpandCalendarRequest extends Request { }
        class ExportFieldTranslationRequest extends Request { }
        class FetchXmlToQueryExpressionRequest extends Request { }
        class FindParentResourceGroupRequest extends Request { }
        class GetAllTimeZonesWithDisplayNameRequest extends Request { }
        class GetDefaultPriceLevelRequest extends Request { }
        class GetDistinctValuesImportFileRequest extends Request { }
        class GetHeaderColumnsImportFileRequest extends Request { }
        class GetQuantityDecimalRequest extends Request { }
        class GetReportHistoryLimitRequest extends Request { }
        class GetTimeZoneCodeByLocalizedNameRequest extends Request { }
        class GetValidManyToManyRequest extends Request { }
        class GetValidReferencedEntitiesRequest extends Request { }
        class GetValidReferencingEntitiesRequest extends Request { }
        class IncrementKnowledgeArticleViewCountRequest extends Request { }
        class InitializeFromRequest extends Request { }
        class IsComponentCustomizableRequest extends Request { }
        class IsDataEncryptionActiveRequest extends Request { }
        class IsValidStateTransitionRequest extends Request { }
        class QueryMultipleSchedulesRequest extends Request { }
        class QueryScheduleRequest extends Request { }
        class RetrieveAbsoluteAndSiteCollectionUrlRequest extends Request { }
        class RetrieveActivePathRequest extends Request { }
        class RetrieveAllChildUsersSystemUserRequest extends Request { }
        class RetrieveAllEntitiesRequest extends Request { }
        class RetrieveApplicationRibbonRequest extends Request { }
        class RetrieveAuditPartitionListRequest extends Request { }
        class RetrieveAvailableLanguagesRequest extends Request { }
        class RetrieveBusinessHierarchyBusinessUnitRequest extends Request { }
        class RetrieveByGroupResourceRequest extends Request { }
        class RetrieveByResourceResourceGroupRequest extends Request { }
        class RetrieveByResourcesServiceRequest extends Request { }
        class RetrieveByTopIncidentProductKbArticleRequest extends Request { }
        class RetrieveByTopIncidentSubjectKbArticleRequest extends Request { }
        class RetrieveCurrentOrganizationRequest extends Request { }
        class RetrieveDataEncryptionKeyRequest extends Request { }
        class RetrieveDependenciesForDeleteRequest extends Request { }
        class RetrieveDependenciesForUninstallRequest extends Request { }
        class RetrieveDependentComponentsRequest extends Request { }
        class RetrieveDeploymentLicenseTypeRequest extends Request { }
        class RetrieveDeprovisionedLanguagesRequest extends Request { }
        class RetrieveDuplicatesRequest extends Request { }
        class RetrieveEntityChangesRequest extends Request { }
        class RetrieveEntityRibbonRequest extends Request { }
        class RetrieveExchangeAppointmentsRequest extends Request { }
        class RetrieveExchangeRateRequest extends Request { }
        class RetrieveFilteredFormsRequest extends Request { }
        class RetrieveFormattedImportJobResultsRequest extends Request { }
        class RetrieveInstalledLanguagePacksRequest extends Request { }
        class RetrieveInstalledLanguagePackVersionRequest extends Request { }
        class RetrieveLicenseInfoRequest extends Request { }
        class RetrieveLocLabelsRequest extends Request { }
        class RetrieveMailboxTrackingFoldersRequest extends Request { }
        class RetrieveMembersBulkOperationRequest extends Request { }
        class RetrieveMissingComponentsRequest extends Request { }
        class RetrieveMissingDependenciesRequest extends Request { }
        class RetrieveOrganizationResourcesRequest extends Request { }
        class RetrieveParentGroupsResourceGroupRequest extends Request { }
        class RetrieveParsedDataImportFileRequest extends Request { }
        class RetrievePersonalWallRequest extends Request { }
        class RetrievePrincipalAccessRequest extends Request { }
        class RetrievePrincipalAttributePrivilegesRequest extends Request { }
        class RetrievePrincipalSyncAttributeMappingsRequest extends Request { }
        class RetrievePrivilegeSetRequest extends Request { }
        class RetrieveProcessInstancesRequest extends Request { }
        class RetrieveProductPropertiesRequest extends Request { }
        class RetrieveProvisionedLanguagePackVersionRequest extends Request { }
        class RetrieveProvisionedLanguagesRequest extends Request { }
        class RetrieveRecordWallRequest extends Request { }
        class RetrieveRequiredComponentsRequest extends Request { }
        class RetrieveRolePrivilegesRoleRequest extends Request { }
        class RetrieveSubGroupsResourceGroupRequest extends Request { }
        class RetrieveTeamPrivilegesRequest extends Request { }
        class RetrieveTimestampRequest extends Request { }
        class RetrieveUnpublishedMultipleRequest extends Request { }
        class RetrieveUserPrivilegesRequest extends Request { }
        class RetrieveUserQueuesRequest extends Request { }
        class RetrieveVersionRequest extends Request { }
        class RollupRequest extends Request { }
        class SearchRequest extends Request { }
        class SearchByBodyKbArticleRequest extends Request { }
        class SearchByKeywordsKbArticleRequest extends Request { }
        class SearchByTitleKbArticleRequest extends Request { }
        class ValidateRecurrenceRuleRequest extends Request { }
        class WhoAmIRequest extends Request { }
        class AddItemCampaignRequest extends Request { }
        class AddItemCampaignActivityRequest extends Request { }
        class AddListMembersListRequest extends Request { }
        class AddMemberListRequest extends Request { }
        class AddMembersTeamRequest extends Request { }
        class AddPrincipalToQueueRequest extends Request { }
        class AddPrivilegesRoleRequest extends Request { }
        class AddRecurrenceRequest extends Request { }
        class AddSolutionComponentRequest extends Request { }
        class AddToQueueRequest extends Request { }
        class AddUserToRecordTeamRequest extends Request { }
        class ApplyRecordCreationAndUpdateRuleRequest extends Request { }
        class ApplyRoutingRuleRequest extends Request { }
        class AutoMapEntityRequest extends Request { }
        class BookRequest extends Request { }
        class BulkDeleteRequest extends Request { }
        class BulkDetectDuplicatesRequest extends Request { }
        class CalculateActualValueOpportunityRequest extends Request { }
        class CalculatePriceRequest extends Request { }
        class CanBeReferencedRequest extends Request { }
        class CanBeReferencingRequest extends Request { }
        class CancelContractRequest extends Request { }
        class CancelSalesOrderRequest extends Request { }
        class CanManyToManyRequest extends Request { }
        class CloneAsPatchRequest extends Request { }
        class CloneAsSolutionRequest extends Request { }
        class CloneContractRequest extends Request { }
        class CloneMobileOfflineProfileRequest extends Request { }
        class CloneProductRequest extends Request { }
        class CloseIncidentRequest extends Request { }
        class CloseQuoteRequest extends Request { }
        class CompoundUpdateDuplicateDetectionRuleRequest extends Request { }
        class ConvertOwnerTeamToAccessTeamRequest extends Request { }
        class ConvertProductToKitRequest extends Request { }
        class ConvertQuoteToSalesOrderRequest extends Request { }
        class ConvertSalesOrderToInvoiceRequest extends Request { }
        class CopyCampaignRequest extends Request { }
        class CopyCampaignResponseRequest extends Request { }
        class CopyDynamicListToStaticRequest extends Request { }
        class CopyMembersListRequest extends Request { }
        class CopySystemFormRequest extends Request { }
        class CreateActivitiesListRequest extends Request { }
        class CreateCustomerRelationshipsRequest extends Request { }
        class CreateExceptionRequest extends Request { }
        class CreateInstanceRequest extends Request { }
        class CreateKnowledgeArticleTranslationRequest extends Request { }
        class CreateKnowledgeArticleVersionRequest extends Request { }
        class CreateWorkflowFromTemplateRequest extends Request { }
        class DeleteAndPromoteRequest extends Request { }
        class DeleteAuditDataRequest extends Request { }
        class DeleteOpenInstancesRequest extends Request { }
        class DeleteOptionValueRequest extends Request { }
        class DeliverIncomingEmailRequest extends Request { }
        class DeliverPromoteEmailRequest extends Request { }
        class DeprovisionLanguageRequest extends Request { }
        class DistributeCampaignActivityRequest extends Request { }
        class ExecuteWorkflowRequest extends Request { }
        class ExportMappingsImportMapRequest extends Request { }
        class ExportSolutionRequest extends Request { }
        class ExportTranslationRequest extends Request { }
        class FulfillSalesOrderRequest extends Request { }
        class FullTextSearchKnowledgeArticleRequest extends Request { }
        class GenerateInvoiceFromOpportunityRequest extends Request { }
        class GenerateQuoteFromOpportunityRequest extends Request { }
        class GenerateSalesOrderFromOpportunityRequest extends Request { }
        class GenerateSocialProfileRequest extends Request { }
        class GetInvoiceProductsFromOpportunityRequest extends Request { }
        class GetQuoteProductsFromOpportunityRequest extends Request { }
        class GetSalesOrderProductsFromOpportunityRequest extends Request { }
        class GetTrackingTokenEmailRequest extends Request { }
        class ImportFieldTranslationRequest extends Request { }
        class ImportMappingsImportMapRequest extends Request { }
        class ImportRecordsImportRequest extends Request { }
        class ImportSolutionRequest extends Request { }
        class ImportTranslationRequest extends Request { }
        class InsertOptionValueRequest extends Request { }
        class InsertStatusValueRequest extends Request { }
        class InstallSampleDataRequest extends Request { }
        class InstantiateFiltersRequest extends Request { }
        class InstantiateTemplateRequest extends Request { }
        class LockInvoicePricingRequest extends Request { }
        class LockSalesOrderPricingRequest extends Request { }
        class LoseOpportunityRequest extends Request { }
        class MergeRequest extends Request { }
        class OrderOptionRequest extends Request { }
        class ParseImportRequest extends Request { }
        class PickFromQueueRequest extends Request { }
        class ProcessInboundEmailRequest extends Request { }
        class PropagateByExpressionRequest extends Request { }
        class ProvisionLanguageRequest extends Request { }
        class PublishAllXmlRequest extends Request { }
        class PublishDuplicateRuleRequest extends Request { }
        class PublishProductHierarchyRequest extends Request { }
        class PublishThemeRequest extends Request { }
        class PublishXmlRequest extends Request { }
        class QualifyLeadRequest extends Request { }
        class QualifyMemberListRequest extends Request { }
        class QueryExpressionToFetchXmlRequest extends Request { }
        class ReassignObjectsOwnerRequest extends Request { }
        class ReassignObjectsSystemUserRequest extends Request { }
        class RecalculateRequest extends Request { }
        class ReleaseToQueueRequest extends Request { }
        class RemoveFromQueueRequest extends Request { }
        class RemoveMembersTeamRequest extends Request { }
        class RemoveParentRequest extends Request { }
        class RemovePrivilegeRoleRequest extends Request { }
        class RemoveSolutionComponentRequest extends Request { }
        class RemoveUserFromRecordTeamRequest extends Request { }
        class RenewContractRequest extends Request { }
        class RenewEntitlementRequest extends Request { }
        class ReplacePrivilegesRoleRequest extends Request { }
        class RescheduleRequest extends Request { }
        class ResetUserFiltersRequest extends Request { }
        class RevertProductRequest extends Request { }
        class ReviseQuoteRequest extends Request { }
        class RevokeAccessRequest extends Request { }
        class RouteToRequest extends Request { }
        class SendBulkMailRequest extends Request { }
        class SendEmailRequest extends Request { }
        class SendEmailFromTemplateRequest extends Request { }
        class SendFaxRequest extends Request { }
        class SendTemplateRequest extends Request { }
        class SetBusinessEquipmentRequest extends Request { }
        class SetBusinessSystemUserRequest extends Request { }
        class SetDataEncryptionKeyRequest extends Request { }
        class SetFeatureStatusRequest extends Request { }
        class SetLocLabelsRequest extends Request { }
        class SetParentSystemUserRequest extends Request { }
        class SetProcessRequest extends Request { }
        class SetReportRelatedRequest extends Request { }
        class TransformImportRequest extends Request { }
        class TriggerServiceEndpointCheckRequest extends Request { }
        class UninstallSampleDataRequest extends Request { }
        class UnlockInvoicePricingRequest extends Request { }
        class UnlockSalesOrderPricingRequest extends Request { }
        class UnpublishDuplicateRuleRequest extends Request { }
        class UpdateFeatureConfigRequest extends Request { }
        class UpdateOptionValueRequest extends Request { }
        class UpdateProductPropertiesRequest extends Request { }
        class UpdateSolutionComponentRequest extends Request { }
        class UpdateStateValueRequest extends Request { }
        class ValidateRequest extends Request { }
        class ValidateSavedQueryRequest extends Request { }
        class WinOpportunityRequest extends Request { }
        class WinQuoteRequest extends Request { }
    }
}
