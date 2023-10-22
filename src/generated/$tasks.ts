import { z } from "../lib/deps.ts";
import { createCollectionWhereValidator, FIELD_VALIDATORS } from "../lib/where.ts";
import { verifyCollection } from "../lib/common.ts";

export const InstanceValidator = z.object({
  hs_all_assigned_business_unit_ids: z.string().nullable(),
  hs_at_mentioned_owner_ids: z.string().nullable(),
  hs_attachment_ids: z.string().nullable(),
  hs_body_preview: z.string().nullable(),
  hs_body_preview_html: z.string().nullable(),
  hs_body_preview_is_truncated: z.boolean(),
  hs_calendar_event_id: z.string().nullable(),
  hs_created_by: z.number(),
  hs_created_by_user_id: z.number(),
  hs_createdate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_engagement_source: z.string().nullable(),
  hs_engagement_source_id: z.string().nullable(),
  hs_follow_up_action: z.string().nullable(),
  hs_gdpr_deleted: z.boolean(),
  hs_lastmodifieddate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_marketing_task_category: z.enum([
    "BLOG_POST",
    "CUSTOM",
    "EMAIL",
    "FACEBOOK",
    "LANDING_PAGE",
    "LEGACY_PAGE",
    "LINKEDIN",
    "SITE_PAGE",
    "TWITTER",
  ]),
  hs_marketing_task_category_id: z.number(),
  hs_merged_object_ids: z.string().nullable(),
  hs_modified_by: z.number(),
  hs_msteams_message_id: z.string().nullable(),
  hs_num_associated_companies: z.number(),
  hs_num_associated_contacts: z.number(),
  hs_num_associated_deals: z.number(),
  hs_num_associated_queue_objects: z.number(),
  hs_num_associated_tickets: z.number(),
  hs_object_id: z.number(),
  hs_object_source: z.string().nullable(),
  hs_object_source_id: z.string().nullable(),
  hs_object_source_label: z.string().nullable(),
  hs_object_source_user_id: z.number(),
  hs_product_name: z.string().nullable(),
  hs_queue_membership_ids: z.string().nullable(),
  hs_read_only: z.boolean(),
  hs_repeat_status: z.string().nullable(),
  hs_scheduled_tasks: z.unknown(),
  hs_task_body: z.string().nullable(),
  hs_task_campaign_guid: z.string().nullable(),
  hs_task_completion_count: z.number(),
  hs_task_completion_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_task_contact_timezone: z.string().nullable(),
  hs_task_family: z.enum([
    "SALES",
    "MARKETING",
  ]),
  hs_task_for_object_type: z.enum([
    "COMPANY",
    "CONTACT",
    "CONTENT",
    "DEAL",
    "OWNER",
    "QUOTE",
    "TICKET",
    "WORKFLOW",
  ]),
  hs_task_is_all_day: z.boolean(),
  hs_task_is_completed: z.number(),
  hs_task_is_completed_call: z.number(),
  hs_task_is_completed_email: z.number(),
  hs_task_is_completed_linked_in: z.number(),
  hs_task_is_completed_sequence: z.number(),
  hs_task_is_overdue: z.boolean(),
  hs_task_is_past_due_date: z.boolean(),
  hs_task_last_contact_outreach: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_task_last_sales_activity_timestamp: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_task_missed_due_date: z.boolean(),
  hs_task_missed_due_date_count: z.number(),
  hs_task_priority: z.enum([
    "NONE",
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),
  hs_task_probability_to_complete: z.number(),
  hs_task_relative_reminders: z.string().nullable(),
  hs_task_reminders: z.string().nullable(),
  hs_task_repeat_interval: z.string().nullable(),
  hs_task_send_default_reminder: z.boolean(),
  hs_task_sequence_enrollment_active: z.boolean(),
  hs_task_sequence_step_enrollment_id: z.string().nullable(),
  hs_task_sequence_step_order: z.number(),
  hs_task_status: z.enum([
    "COMPLETED",
    "DEFERRED",
    "IN_PROGRESS",
    "NOT_STARTED",
    "WAITING",
  ]),
  hs_task_subject: z.string().nullable(),
  hs_task_template_id: z.number(),
  hs_task_type: z.enum([
    "CALL",
    "EMAIL",
    "LINKED_IN",
    "MEETING",
    "LINKED_IN_CONNECT",
    "LINKED_IN_MESSAGE",
    "TODO",
  ]),
  hs_timestamp: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_unique_creation_key: z.string().nullable(),
  hs_unique_id: z.string().nullable(),
  hs_updated_by_user_id: z.number(),
  hs_user_ids_of_all_notification_followers: z.string().nullable(),
  hs_user_ids_of_all_notification_unfollowers: z.string().nullable(),
  hs_user_ids_of_all_owners: z.string().nullable(),
  hs_was_imported: z.boolean(),
  hubspot_owner_assigneddate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hubspot_owner_id: z.string().nullable(),
  hubspot_team_id: z.string().nullable(),
  hs_all_owner_ids: z.string().nullable(),
  hs_all_team_ids: z.string().nullable(),
  hs_all_accessible_team_ids: z.string().nullable(),
});
const WhereArgValidator = createCollectionWhereValidator(
  z.object({
    hs_all_assigned_business_unit_ids: FIELD_VALIDATORS.enumeration,
    hs_at_mentioned_owner_ids: FIELD_VALIDATORS.enumeration,
    hs_attachment_ids: FIELD_VALIDATORS.enumeration,
    hs_body_preview: FIELD_VALIDATORS.string,
    hs_body_preview_html: FIELD_VALIDATORS.string,
    hs_body_preview_is_truncated: FIELD_VALIDATORS.bool,
    hs_calendar_event_id: FIELD_VALIDATORS.string,
    hs_created_by: FIELD_VALIDATORS.number,
    hs_created_by_user_id: FIELD_VALIDATORS.number,
    hs_createdate: FIELD_VALIDATORS.datetime,
    hs_engagement_source: FIELD_VALIDATORS.string,
    hs_engagement_source_id: FIELD_VALIDATORS.string,
    hs_follow_up_action: FIELD_VALIDATORS.string,
    hs_gdpr_deleted: FIELD_VALIDATORS.bool,
    hs_lastmodifieddate: FIELD_VALIDATORS.datetime,
    hs_marketing_task_category: FIELD_VALIDATORS.enumeration,
    hs_marketing_task_category_id: FIELD_VALIDATORS.number,
    hs_merged_object_ids: FIELD_VALIDATORS.enumeration,
    hs_modified_by: FIELD_VALIDATORS.number,
    hs_msteams_message_id: FIELD_VALIDATORS.string,
    hs_num_associated_companies: FIELD_VALIDATORS.number,
    hs_num_associated_contacts: FIELD_VALIDATORS.number,
    hs_num_associated_deals: FIELD_VALIDATORS.number,
    hs_num_associated_queue_objects: FIELD_VALIDATORS.number,
    hs_num_associated_tickets: FIELD_VALIDATORS.number,
    hs_object_id: FIELD_VALIDATORS.number,
    hs_object_source: FIELD_VALIDATORS.string,
    hs_object_source_id: FIELD_VALIDATORS.string,
    hs_object_source_label: FIELD_VALIDATORS.enumeration,
    hs_object_source_user_id: FIELD_VALIDATORS.number,
    hs_product_name: FIELD_VALIDATORS.string,
    hs_queue_membership_ids: FIELD_VALIDATORS.enumeration,
    hs_read_only: FIELD_VALIDATORS.bool,
    hs_repeat_status: FIELD_VALIDATORS.enumeration,
    hs_scheduled_tasks: FIELD_VALIDATORS.unknown,
    hs_task_body: FIELD_VALIDATORS.string,
    hs_task_campaign_guid: FIELD_VALIDATORS.string,
    hs_task_completion_count: FIELD_VALIDATORS.number,
    hs_task_completion_date: FIELD_VALIDATORS.datetime,
    hs_task_contact_timezone: FIELD_VALIDATORS.string,
    hs_task_family: FIELD_VALIDATORS.enumeration,
    hs_task_for_object_type: FIELD_VALIDATORS.enumeration,
    hs_task_is_all_day: FIELD_VALIDATORS.bool,
    hs_task_is_completed: FIELD_VALIDATORS.number,
    hs_task_is_completed_call: FIELD_VALIDATORS.number,
    hs_task_is_completed_email: FIELD_VALIDATORS.number,
    hs_task_is_completed_linked_in: FIELD_VALIDATORS.number,
    hs_task_is_completed_sequence: FIELD_VALIDATORS.number,
    hs_task_is_overdue: FIELD_VALIDATORS.bool,
    hs_task_is_past_due_date: FIELD_VALIDATORS.bool,
    hs_task_last_contact_outreach: FIELD_VALIDATORS.datetime,
    hs_task_last_sales_activity_timestamp: FIELD_VALIDATORS.datetime,
    hs_task_missed_due_date: FIELD_VALIDATORS.bool,
    hs_task_missed_due_date_count: FIELD_VALIDATORS.number,
    hs_task_priority: FIELD_VALIDATORS.enumeration,
    hs_task_probability_to_complete: FIELD_VALIDATORS.number,
    hs_task_relative_reminders: FIELD_VALIDATORS.string,
    hs_task_reminders: FIELD_VALIDATORS.enumeration,
    hs_task_repeat_interval: FIELD_VALIDATORS.string,
    hs_task_send_default_reminder: FIELD_VALIDATORS.bool,
    hs_task_sequence_enrollment_active: FIELD_VALIDATORS.bool,
    hs_task_sequence_step_enrollment_id: FIELD_VALIDATORS.string,
    hs_task_sequence_step_order: FIELD_VALIDATORS.number,
    hs_task_status: FIELD_VALIDATORS.enumeration,
    hs_task_subject: FIELD_VALIDATORS.string,
    hs_task_template_id: FIELD_VALIDATORS.number,
    hs_task_type: FIELD_VALIDATORS.enumeration,
    hs_timestamp: FIELD_VALIDATORS.datetime,
    hs_unique_creation_key: FIELD_VALIDATORS.string,
    hs_unique_id: FIELD_VALIDATORS.string,
    hs_updated_by_user_id: FIELD_VALIDATORS.number,
    hs_user_ids_of_all_notification_followers: FIELD_VALIDATORS.enumeration,
    hs_user_ids_of_all_notification_unfollowers: FIELD_VALIDATORS.enumeration,
    hs_user_ids_of_all_owners: FIELD_VALIDATORS.enumeration,
    hs_was_imported: FIELD_VALIDATORS.bool,
    hubspot_owner_assigneddate: FIELD_VALIDATORS.datetime,
    hubspot_owner_id: FIELD_VALIDATORS.enumeration,
    hubspot_team_id: FIELD_VALIDATORS.enumeration,
    hs_all_owner_ids: FIELD_VALIDATORS.enumeration,
    hs_all_team_ids: FIELD_VALIDATORS.enumeration,
    hs_all_accessible_team_ids: FIELD_VALIDATORS.enumeration,
  }).partial(),
);
const SelectArgValidator = z.record(
  z.union([
    z.literal("hs_all_assigned_business_unit_ids"),
    z.literal("hs_at_mentioned_owner_ids"),
    z.literal("hs_attachment_ids"),
    z.literal("hs_body_preview"),
    z.literal("hs_body_preview_html"),
    z.literal("hs_body_preview_is_truncated"),
    z.literal("hs_calendar_event_id"),
    z.literal("hs_created_by"),
    z.literal("hs_created_by_user_id"),
    z.literal("hs_createdate"),
    z.literal("hs_engagement_source"),
    z.literal("hs_engagement_source_id"),
    z.literal("hs_follow_up_action"),
    z.literal("hs_gdpr_deleted"),
    z.literal("hs_lastmodifieddate"),
    z.literal("hs_marketing_task_category"),
    z.literal("hs_marketing_task_category_id"),
    z.literal("hs_merged_object_ids"),
    z.literal("hs_modified_by"),
    z.literal("hs_msteams_message_id"),
    z.literal("hs_num_associated_companies"),
    z.literal("hs_num_associated_contacts"),
    z.literal("hs_num_associated_deals"),
    z.literal("hs_num_associated_queue_objects"),
    z.literal("hs_num_associated_tickets"),
    z.literal("hs_object_id"),
    z.literal("hs_object_source"),
    z.literal("hs_object_source_id"),
    z.literal("hs_object_source_label"),
    z.literal("hs_object_source_user_id"),
    z.literal("hs_product_name"),
    z.literal("hs_queue_membership_ids"),
    z.literal("hs_read_only"),
    z.literal("hs_repeat_status"),
    z.literal("hs_scheduled_tasks"),
    z.literal("hs_task_body"),
    z.literal("hs_task_campaign_guid"),
    z.literal("hs_task_completion_count"),
    z.literal("hs_task_completion_date"),
    z.literal("hs_task_contact_timezone"),
    z.literal("hs_task_family"),
    z.literal("hs_task_for_object_type"),
    z.literal("hs_task_is_all_day"),
    z.literal("hs_task_is_completed"),
    z.literal("hs_task_is_completed_call"),
    z.literal("hs_task_is_completed_email"),
    z.literal("hs_task_is_completed_linked_in"),
    z.literal("hs_task_is_completed_sequence"),
    z.literal("hs_task_is_overdue"),
    z.literal("hs_task_is_past_due_date"),
    z.literal("hs_task_last_contact_outreach"),
    z.literal("hs_task_last_sales_activity_timestamp"),
    z.literal("hs_task_missed_due_date"),
    z.literal("hs_task_missed_due_date_count"),
    z.literal("hs_task_priority"),
    z.literal("hs_task_probability_to_complete"),
    z.literal("hs_task_relative_reminders"),
    z.literal("hs_task_reminders"),
    z.literal("hs_task_repeat_interval"),
    z.literal("hs_task_send_default_reminder"),
    z.literal("hs_task_sequence_enrollment_active"),
    z.literal("hs_task_sequence_step_enrollment_id"),
    z.literal("hs_task_sequence_step_order"),
    z.literal("hs_task_status"),
    z.literal("hs_task_subject"),
    z.literal("hs_task_template_id"),
    z.literal("hs_task_type"),
    z.literal("hs_timestamp"),
    z.literal("hs_unique_creation_key"),
    z.literal("hs_unique_id"),
    z.literal("hs_updated_by_user_id"),
    z.literal("hs_user_ids_of_all_notification_followers"),
    z.literal("hs_user_ids_of_all_notification_unfollowers"),
    z.literal("hs_user_ids_of_all_owners"),
    z.literal("hs_was_imported"),
    z.literal("hubspot_owner_assigneddate"),
    z.literal("hubspot_owner_id"),
    z.literal("hubspot_team_id"),
    z.literal("hs_all_owner_ids"),
    z.literal("hs_all_team_ids"),
    z.literal("hs_all_accessible_team_ids"),
  ]),
  z.literal(true),
);
export const definition = verifyCollection({
  SelectArgValidator: SelectArgValidator,
  WhereArgValidator: WhereArgValidator,
  InstanceValidator: InstanceValidator,
});
