import { z } from "../lib/deps.ts";
import { createCollectionWhereValidator, FIELD_VALIDATORS } from "../lib/where.ts";
import { verifyCollection } from "../lib/common.ts";

export const InstanceValidator = z.object({
  closed_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  created_by: z.number(),
  createdate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  first_agent_reply_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_all_assigned_business_unit_ids: z.string().nullable(),
  hs_all_associated_contact_companies: z.string().nullable(),
  hs_all_associated_contact_emails: z.string().nullable(),
  hs_all_associated_contact_firstnames: z.string().nullable(),
  hs_all_associated_contact_lastnames: z.string().nullable(),
  hs_all_associated_contact_mobilephones: z.string().nullable(),
  hs_all_associated_contact_phones: z.string().nullable(),
  hs_all_conversation_mentions: z.string().nullable(),
  hs_applied_sla_rule_config_id: z.number(),
  hs_assigned_team_ids: z.string().nullable(),
  hs_assignment_method: z.enum([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ]),
  hs_auto_generated_from_thread_id: z.number(),
  hs_conversations_originating_message_id: z.string().nullable(),
  hs_conversations_originating_thread_id: z.number(),
  hs_created_by_user_id: z.number(),
  hs_createdate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_custom_inbox: z.number(),
  hs_date_entered_1: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_2: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_3: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_4: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_1: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_2: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_3: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_4: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_external_object_ids: z.string().nullable(),
  hs_feedback_last_ces_follow_up: z.string().nullable(),
  hs_feedback_last_ces_rating: z.enum([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ]),
  hs_feedback_last_survey_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_file_upload: z.string().nullable(),
  hs_first_agent_message_sent_at: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_helpdesk_sort_timestamp: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_in_helpdesk: z.boolean(),
  hs_inbox_id: z.number(),
  hs_is_visible_in_help_desk: z.boolean(),
  hs_last_email_activity: z.enum([
    "ORIGINAL_FROM_CONTACT",
    "SENT_TO_CONTACT",
    "REPLY_FROM_CONTACT",
  ]),
  hs_last_email_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_last_message_from_visitor: z.boolean(),
  hs_last_message_received_at: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_last_message_sent_at: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_lastactivitydate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_lastcontacted: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_lastmodifieddate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_latest_message_seen_by_agent_ids: z.string().nullable(),
  hs_merged_object_ids: z.string().nullable(),
  hs_most_relevant_sla_status: z.enum([
    "overdue",
    "due_soon",
    "active_sla",
    "sla_completed_late",
    "sla_completed_on_time",
  ]),
  hs_most_relevant_sla_type: z.enum([
    "TIME_TO_CLOSE",
    "TIME_TO_RESPOND",
    "TIME_TO_NEXT_RESPONSE",
  ]),
  hs_msteams_message_id: z.string().nullable(),
  hs_nextactivitydate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_num_associated_companies: z.number(),
  hs_num_associated_conversations: z.number(),
  hs_num_times_contacted: z.number(),
  hs_object_id: z.number(),
  hs_object_source: z.string().nullable(),
  hs_object_source_id: z.string().nullable(),
  hs_object_source_label: z.string().nullable(),
  hs_object_source_user_id: z.number(),
  hs_originating_channel_instance_id: z.string().nullable(),
  hs_originating_email_engagement_id: z.number(),
  hs_originating_generic_channel_id: z.string().nullable(),
  hs_pinned_engagement_id: z.number(),
  hs_pipeline: z.string().nullable(),
  hs_pipeline_stage: z.string().nullable(),
  hs_primary_company: z.string().nullable(),
  hs_primary_company_id: z.number(),
  hs_primary_company_name: z.string().nullable(),
  hs_read_only: z.boolean(),
  hs_resolution: z.enum([
    "ISSUE_FIXED",
    "FEATURE_REQUEST_TRACKED",
    "REFUND_APPLIED",
    "SENT_KNOWLEDGE_DOCUMENT_LINK",
  ]),
  hs_seen_by_agent_ids: z.string().nullable(),
  hs_source_object_id: z.number(),
  hs_tag_ids: z.string().nullable(),
  hs_thread_ids_to_restore: z.string().nullable(),
  hs_ticket_category: z.enum([
    "PRODUCT_ISSUE",
    "BILLING_ISSUE",
    "FEATURE_REQUEST",
    "GENERAL_INQUIRY",
  ]),
  hs_ticket_id: z.number(),
  hs_ticket_priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),
  hs_time_in_1: z.number(),
  hs_time_in_2: z.number(),
  hs_time_in_3: z.number(),
  hs_time_in_4: z.number(),
  hs_time_to_close_sla_at: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_time_to_close_sla_status: z.enum([
    "1",
    "2",
    "0",
    "4",
    "3",
  ]),
  hs_time_to_first_response_sla_at: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_time_to_first_response_sla_status: z.enum([
    "1",
    "2",
    "0",
    "4",
    "3",
  ]),
  hs_time_to_next_response_sla_at: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_time_to_next_response_sla_status: z.enum([
    "1",
    "2",
    "0",
    "4",
    "3",
  ]),
  hs_unique_creation_key: z.string().nullable(),
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
  last_engagement_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  last_reply_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  nps_follow_up_answer: z.string().nullable(),
  nps_follow_up_question_version: z.number(),
  nps_score: z.enum([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]),
  source_thread_id: z.string().nullable(),
  time_to_close: z.number(),
  time_to_first_agent_reply: z.number(),
  subject: z.string().nullable(),
  content: z.string().nullable(),
  source_type: z.enum([
    "CHAT",
    "EMAIL",
    "FORM",
    "PHONE",
  ]),
  source_ref: z.string().nullable(),
  tags: z.string().nullable(),
  hs_sales_email_last_replied: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hubspot_owner_id: z.string().nullable(),
  notes_last_contacted: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  notes_last_updated: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  notes_next_activity_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  num_contacted_notes: z.number(),
  num_notes: z.number(),
  hubspot_team_id: z.string().nullable(),
  hs_all_owner_ids: z.string().nullable(),
  hs_all_team_ids: z.string().nullable(),
  hs_all_accessible_team_ids: z.string().nullable(),
});
const WhereArgValidator = createCollectionWhereValidator(
  z.object({
    closed_date: FIELD_VALIDATORS.datetime,
    created_by: FIELD_VALIDATORS.number,
    createdate: FIELD_VALIDATORS.datetime,
    first_agent_reply_date: FIELD_VALIDATORS.datetime,
    hs_all_assigned_business_unit_ids: FIELD_VALIDATORS.enumeration,
    hs_all_associated_contact_companies: FIELD_VALIDATORS.string,
    hs_all_associated_contact_emails: FIELD_VALIDATORS.string,
    hs_all_associated_contact_firstnames: FIELD_VALIDATORS.string,
    hs_all_associated_contact_lastnames: FIELD_VALIDATORS.string,
    hs_all_associated_contact_mobilephones: FIELD_VALIDATORS.string,
    hs_all_associated_contact_phones: FIELD_VALIDATORS.string,
    hs_all_conversation_mentions: FIELD_VALIDATORS.enumeration,
    hs_applied_sla_rule_config_id: FIELD_VALIDATORS.number,
    hs_assigned_team_ids: FIELD_VALIDATORS.enumeration,
    hs_assignment_method: FIELD_VALIDATORS.enumeration,
    hs_auto_generated_from_thread_id: FIELD_VALIDATORS.number,
    hs_conversations_originating_message_id: FIELD_VALIDATORS.string,
    hs_conversations_originating_thread_id: FIELD_VALIDATORS.number,
    hs_created_by_user_id: FIELD_VALIDATORS.number,
    hs_createdate: FIELD_VALIDATORS.datetime,
    hs_custom_inbox: FIELD_VALIDATORS.number,
    hs_date_entered_1: FIELD_VALIDATORS.datetime,
    hs_date_entered_2: FIELD_VALIDATORS.datetime,
    hs_date_entered_3: FIELD_VALIDATORS.datetime,
    hs_date_entered_4: FIELD_VALIDATORS.datetime,
    hs_date_exited_1: FIELD_VALIDATORS.datetime,
    hs_date_exited_2: FIELD_VALIDATORS.datetime,
    hs_date_exited_3: FIELD_VALIDATORS.datetime,
    hs_date_exited_4: FIELD_VALIDATORS.datetime,
    hs_external_object_ids: FIELD_VALIDATORS.enumeration,
    hs_feedback_last_ces_follow_up: FIELD_VALIDATORS.string,
    hs_feedback_last_ces_rating: FIELD_VALIDATORS.enumeration,
    hs_feedback_last_survey_date: FIELD_VALIDATORS.datetime,
    hs_file_upload: FIELD_VALIDATORS.string,
    hs_first_agent_message_sent_at: FIELD_VALIDATORS.datetime,
    hs_helpdesk_sort_timestamp: FIELD_VALIDATORS.datetime,
    hs_in_helpdesk: FIELD_VALIDATORS.bool,
    hs_inbox_id: FIELD_VALIDATORS.number,
    hs_is_visible_in_help_desk: FIELD_VALIDATORS.bool,
    hs_last_email_activity: FIELD_VALIDATORS.enumeration,
    hs_last_email_date: FIELD_VALIDATORS.datetime,
    hs_last_message_from_visitor: FIELD_VALIDATORS.bool,
    hs_last_message_received_at: FIELD_VALIDATORS.datetime,
    hs_last_message_sent_at: FIELD_VALIDATORS.datetime,
    hs_lastactivitydate: FIELD_VALIDATORS.datetime,
    hs_lastcontacted: FIELD_VALIDATORS.datetime,
    hs_lastmodifieddate: FIELD_VALIDATORS.datetime,
    hs_latest_message_seen_by_agent_ids: FIELD_VALIDATORS.enumeration,
    hs_merged_object_ids: FIELD_VALIDATORS.enumeration,
    hs_most_relevant_sla_status: FIELD_VALIDATORS.enumeration,
    hs_most_relevant_sla_type: FIELD_VALIDATORS.enumeration,
    hs_msteams_message_id: FIELD_VALIDATORS.string,
    hs_nextactivitydate: FIELD_VALIDATORS.datetime,
    hs_num_associated_companies: FIELD_VALIDATORS.number,
    hs_num_associated_conversations: FIELD_VALIDATORS.number,
    hs_num_times_contacted: FIELD_VALIDATORS.number,
    hs_object_id: FIELD_VALIDATORS.number,
    hs_object_source: FIELD_VALIDATORS.string,
    hs_object_source_id: FIELD_VALIDATORS.string,
    hs_object_source_label: FIELD_VALIDATORS.enumeration,
    hs_object_source_user_id: FIELD_VALIDATORS.number,
    hs_originating_channel_instance_id: FIELD_VALIDATORS.enumeration,
    hs_originating_email_engagement_id: FIELD_VALIDATORS.number,
    hs_originating_generic_channel_id: FIELD_VALIDATORS.enumeration,
    hs_pinned_engagement_id: FIELD_VALIDATORS.number,
    hs_pipeline: FIELD_VALIDATORS.enumeration,
    hs_pipeline_stage: FIELD_VALIDATORS.enumeration,
    hs_primary_company: FIELD_VALIDATORS.string,
    hs_primary_company_id: FIELD_VALIDATORS.number,
    hs_primary_company_name: FIELD_VALIDATORS.string,
    hs_read_only: FIELD_VALIDATORS.bool,
    hs_resolution: FIELD_VALIDATORS.enumeration,
    hs_seen_by_agent_ids: FIELD_VALIDATORS.enumeration,
    hs_source_object_id: FIELD_VALIDATORS.number,
    hs_tag_ids: FIELD_VALIDATORS.enumeration,
    hs_thread_ids_to_restore: FIELD_VALIDATORS.enumeration,
    hs_ticket_category: FIELD_VALIDATORS.enumeration,
    hs_ticket_id: FIELD_VALIDATORS.number,
    hs_ticket_priority: FIELD_VALIDATORS.enumeration,
    hs_time_in_1: FIELD_VALIDATORS.number,
    hs_time_in_2: FIELD_VALIDATORS.number,
    hs_time_in_3: FIELD_VALIDATORS.number,
    hs_time_in_4: FIELD_VALIDATORS.number,
    hs_time_to_close_sla_at: FIELD_VALIDATORS.datetime,
    hs_time_to_close_sla_status: FIELD_VALIDATORS.enumeration,
    hs_time_to_first_response_sla_at: FIELD_VALIDATORS.datetime,
    hs_time_to_first_response_sla_status: FIELD_VALIDATORS.enumeration,
    hs_time_to_next_response_sla_at: FIELD_VALIDATORS.datetime,
    hs_time_to_next_response_sla_status: FIELD_VALIDATORS.enumeration,
    hs_unique_creation_key: FIELD_VALIDATORS.string,
    hs_updated_by_user_id: FIELD_VALIDATORS.number,
    hs_user_ids_of_all_notification_followers: FIELD_VALIDATORS.enumeration,
    hs_user_ids_of_all_notification_unfollowers: FIELD_VALIDATORS.enumeration,
    hs_user_ids_of_all_owners: FIELD_VALIDATORS.enumeration,
    hs_was_imported: FIELD_VALIDATORS.bool,
    hubspot_owner_assigneddate: FIELD_VALIDATORS.datetime,
    last_engagement_date: FIELD_VALIDATORS.datetime,
    last_reply_date: FIELD_VALIDATORS.datetime,
    nps_follow_up_answer: FIELD_VALIDATORS.string,
    nps_follow_up_question_version: FIELD_VALIDATORS.number,
    nps_score: FIELD_VALIDATORS.enumeration,
    source_thread_id: FIELD_VALIDATORS.string,
    time_to_close: FIELD_VALIDATORS.number,
    time_to_first_agent_reply: FIELD_VALIDATORS.number,
    subject: FIELD_VALIDATORS.string,
    content: FIELD_VALIDATORS.string,
    source_type: FIELD_VALIDATORS.enumeration,
    source_ref: FIELD_VALIDATORS.string,
    tags: FIELD_VALIDATORS.enumeration,
    hs_sales_email_last_replied: FIELD_VALIDATORS.datetime,
    hubspot_owner_id: FIELD_VALIDATORS.enumeration,
    notes_last_contacted: FIELD_VALIDATORS.datetime,
    notes_last_updated: FIELD_VALIDATORS.datetime,
    notes_next_activity_date: FIELD_VALIDATORS.datetime,
    num_contacted_notes: FIELD_VALIDATORS.number,
    num_notes: FIELD_VALIDATORS.number,
    hubspot_team_id: FIELD_VALIDATORS.enumeration,
    hs_all_owner_ids: FIELD_VALIDATORS.enumeration,
    hs_all_team_ids: FIELD_VALIDATORS.enumeration,
    hs_all_accessible_team_ids: FIELD_VALIDATORS.enumeration,
  }).partial(),
);
const SelectArgValidator = z.record(
  z.union([
    z.literal("closed_date"),
    z.literal("created_by"),
    z.literal("createdate"),
    z.literal("first_agent_reply_date"),
    z.literal("hs_all_assigned_business_unit_ids"),
    z.literal("hs_all_associated_contact_companies"),
    z.literal("hs_all_associated_contact_emails"),
    z.literal("hs_all_associated_contact_firstnames"),
    z.literal("hs_all_associated_contact_lastnames"),
    z.literal("hs_all_associated_contact_mobilephones"),
    z.literal("hs_all_associated_contact_phones"),
    z.literal("hs_all_conversation_mentions"),
    z.literal("hs_applied_sla_rule_config_id"),
    z.literal("hs_assigned_team_ids"),
    z.literal("hs_assignment_method"),
    z.literal("hs_auto_generated_from_thread_id"),
    z.literal("hs_conversations_originating_message_id"),
    z.literal("hs_conversations_originating_thread_id"),
    z.literal("hs_created_by_user_id"),
    z.literal("hs_createdate"),
    z.literal("hs_custom_inbox"),
    z.literal("hs_date_entered_1"),
    z.literal("hs_date_entered_2"),
    z.literal("hs_date_entered_3"),
    z.literal("hs_date_entered_4"),
    z.literal("hs_date_exited_1"),
    z.literal("hs_date_exited_2"),
    z.literal("hs_date_exited_3"),
    z.literal("hs_date_exited_4"),
    z.literal("hs_external_object_ids"),
    z.literal("hs_feedback_last_ces_follow_up"),
    z.literal("hs_feedback_last_ces_rating"),
    z.literal("hs_feedback_last_survey_date"),
    z.literal("hs_file_upload"),
    z.literal("hs_first_agent_message_sent_at"),
    z.literal("hs_helpdesk_sort_timestamp"),
    z.literal("hs_in_helpdesk"),
    z.literal("hs_inbox_id"),
    z.literal("hs_is_visible_in_help_desk"),
    z.literal("hs_last_email_activity"),
    z.literal("hs_last_email_date"),
    z.literal("hs_last_message_from_visitor"),
    z.literal("hs_last_message_received_at"),
    z.literal("hs_last_message_sent_at"),
    z.literal("hs_lastactivitydate"),
    z.literal("hs_lastcontacted"),
    z.literal("hs_lastmodifieddate"),
    z.literal("hs_latest_message_seen_by_agent_ids"),
    z.literal("hs_merged_object_ids"),
    z.literal("hs_most_relevant_sla_status"),
    z.literal("hs_most_relevant_sla_type"),
    z.literal("hs_msteams_message_id"),
    z.literal("hs_nextactivitydate"),
    z.literal("hs_num_associated_companies"),
    z.literal("hs_num_associated_conversations"),
    z.literal("hs_num_times_contacted"),
    z.literal("hs_object_id"),
    z.literal("hs_object_source"),
    z.literal("hs_object_source_id"),
    z.literal("hs_object_source_label"),
    z.literal("hs_object_source_user_id"),
    z.literal("hs_originating_channel_instance_id"),
    z.literal("hs_originating_email_engagement_id"),
    z.literal("hs_originating_generic_channel_id"),
    z.literal("hs_pinned_engagement_id"),
    z.literal("hs_pipeline"),
    z.literal("hs_pipeline_stage"),
    z.literal("hs_primary_company"),
    z.literal("hs_primary_company_id"),
    z.literal("hs_primary_company_name"),
    z.literal("hs_read_only"),
    z.literal("hs_resolution"),
    z.literal("hs_seen_by_agent_ids"),
    z.literal("hs_source_object_id"),
    z.literal("hs_tag_ids"),
    z.literal("hs_thread_ids_to_restore"),
    z.literal("hs_ticket_category"),
    z.literal("hs_ticket_id"),
    z.literal("hs_ticket_priority"),
    z.literal("hs_time_in_1"),
    z.literal("hs_time_in_2"),
    z.literal("hs_time_in_3"),
    z.literal("hs_time_in_4"),
    z.literal("hs_time_to_close_sla_at"),
    z.literal("hs_time_to_close_sla_status"),
    z.literal("hs_time_to_first_response_sla_at"),
    z.literal("hs_time_to_first_response_sla_status"),
    z.literal("hs_time_to_next_response_sla_at"),
    z.literal("hs_time_to_next_response_sla_status"),
    z.literal("hs_unique_creation_key"),
    z.literal("hs_updated_by_user_id"),
    z.literal("hs_user_ids_of_all_notification_followers"),
    z.literal("hs_user_ids_of_all_notification_unfollowers"),
    z.literal("hs_user_ids_of_all_owners"),
    z.literal("hs_was_imported"),
    z.literal("hubspot_owner_assigneddate"),
    z.literal("last_engagement_date"),
    z.literal("last_reply_date"),
    z.literal("nps_follow_up_answer"),
    z.literal("nps_follow_up_question_version"),
    z.literal("nps_score"),
    z.literal("source_thread_id"),
    z.literal("time_to_close"),
    z.literal("time_to_first_agent_reply"),
    z.literal("subject"),
    z.literal("content"),
    z.literal("source_type"),
    z.literal("source_ref"),
    z.literal("tags"),
    z.literal("hs_sales_email_last_replied"),
    z.literal("hubspot_owner_id"),
    z.literal("notes_last_contacted"),
    z.literal("notes_last_updated"),
    z.literal("notes_next_activity_date"),
    z.literal("num_contacted_notes"),
    z.literal("num_notes"),
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
