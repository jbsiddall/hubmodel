import { z } from "../lib/deps.ts";

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
  hs_num_times_contacted: z.number(),
  hs_object_id: z.number(),
  hs_object_source: z.string().nullable(),
  hs_object_source_id: z.string().nullable(),
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
const SelectArgValidator = z.object({
  closed_date: z.literal(true).optional(),
  created_by: z.literal(true).optional(),
  createdate: z.literal(true).optional(),
  first_agent_reply_date: z.literal(true).optional(),
  hs_all_assigned_business_unit_ids: z.literal(true).optional(),
  hs_all_associated_contact_companies: z.literal(true).optional(),
  hs_all_associated_contact_emails: z.literal(true).optional(),
  hs_all_associated_contact_firstnames: z.literal(true).optional(),
  hs_all_associated_contact_lastnames: z.literal(true).optional(),
  hs_all_associated_contact_mobilephones: z.literal(true).optional(),
  hs_all_associated_contact_phones: z.literal(true).optional(),
  hs_all_conversation_mentions: z.literal(true).optional(),
  hs_applied_sla_rule_config_id: z.literal(true).optional(),
  hs_assignment_method: z.literal(true).optional(),
  hs_auto_generated_from_thread_id: z.literal(true).optional(),
  hs_conversations_originating_message_id: z.literal(true).optional(),
  hs_conversations_originating_thread_id: z.literal(true).optional(),
  hs_created_by_user_id: z.literal(true).optional(),
  hs_createdate: z.literal(true).optional(),
  hs_custom_inbox: z.literal(true).optional(),
  hs_date_entered_1: z.literal(true).optional(),
  hs_date_entered_2: z.literal(true).optional(),
  hs_date_entered_3: z.literal(true).optional(),
  hs_date_entered_4: z.literal(true).optional(),
  hs_date_exited_1: z.literal(true).optional(),
  hs_date_exited_2: z.literal(true).optional(),
  hs_date_exited_3: z.literal(true).optional(),
  hs_date_exited_4: z.literal(true).optional(),
  hs_external_object_ids: z.literal(true).optional(),
  hs_feedback_last_ces_follow_up: z.literal(true).optional(),
  hs_feedback_last_ces_rating: z.literal(true).optional(),
  hs_feedback_last_survey_date: z.literal(true).optional(),
  hs_file_upload: z.literal(true).optional(),
  hs_first_agent_message_sent_at: z.literal(true).optional(),
  hs_helpdesk_sort_timestamp: z.literal(true).optional(),
  hs_in_helpdesk: z.literal(true).optional(),
  hs_inbox_id: z.literal(true).optional(),
  hs_last_email_activity: z.literal(true).optional(),
  hs_last_email_date: z.literal(true).optional(),
  hs_last_message_from_visitor: z.literal(true).optional(),
  hs_last_message_received_at: z.literal(true).optional(),
  hs_last_message_sent_at: z.literal(true).optional(),
  hs_lastactivitydate: z.literal(true).optional(),
  hs_lastcontacted: z.literal(true).optional(),
  hs_lastmodifieddate: z.literal(true).optional(),
  hs_latest_message_seen_by_agent_ids: z.literal(true).optional(),
  hs_merged_object_ids: z.literal(true).optional(),
  hs_most_relevant_sla_status: z.literal(true).optional(),
  hs_most_relevant_sla_type: z.literal(true).optional(),
  hs_msteams_message_id: z.literal(true).optional(),
  hs_nextactivitydate: z.literal(true).optional(),
  hs_num_associated_companies: z.literal(true).optional(),
  hs_num_times_contacted: z.literal(true).optional(),
  hs_object_id: z.literal(true).optional(),
  hs_object_source: z.literal(true).optional(),
  hs_object_source_id: z.literal(true).optional(),
  hs_object_source_user_id: z.literal(true).optional(),
  hs_originating_channel_instance_id: z.literal(true).optional(),
  hs_originating_email_engagement_id: z.literal(true).optional(),
  hs_originating_generic_channel_id: z.literal(true).optional(),
  hs_pinned_engagement_id: z.literal(true).optional(),
  hs_pipeline: z.literal(true).optional(),
  hs_pipeline_stage: z.literal(true).optional(),
  hs_primary_company: z.literal(true).optional(),
  hs_primary_company_id: z.literal(true).optional(),
  hs_primary_company_name: z.literal(true).optional(),
  hs_read_only: z.literal(true).optional(),
  hs_resolution: z.literal(true).optional(),
  hs_seen_by_agent_ids: z.literal(true).optional(),
  hs_source_object_id: z.literal(true).optional(),
  hs_tag_ids: z.literal(true).optional(),
  hs_thread_ids_to_restore: z.literal(true).optional(),
  hs_ticket_category: z.literal(true).optional(),
  hs_ticket_id: z.literal(true).optional(),
  hs_ticket_priority: z.literal(true).optional(),
  hs_time_in_1: z.literal(true).optional(),
  hs_time_in_2: z.literal(true).optional(),
  hs_time_in_3: z.literal(true).optional(),
  hs_time_in_4: z.literal(true).optional(),
  hs_time_to_close_sla_at: z.literal(true).optional(),
  hs_time_to_close_sla_status: z.literal(true).optional(),
  hs_time_to_first_response_sla_at: z.literal(true).optional(),
  hs_time_to_first_response_sla_status: z.literal(true).optional(),
  hs_time_to_next_response_sla_at: z.literal(true).optional(),
  hs_time_to_next_response_sla_status: z.literal(true).optional(),
  hs_unique_creation_key: z.literal(true).optional(),
  hs_updated_by_user_id: z.literal(true).optional(),
  hs_user_ids_of_all_notification_followers: z.literal(true).optional(),
  hs_user_ids_of_all_notification_unfollowers: z.literal(true).optional(),
  hs_user_ids_of_all_owners: z.literal(true).optional(),
  hs_was_imported: z.literal(true).optional(),
  hubspot_owner_assigneddate: z.literal(true).optional(),
  last_engagement_date: z.literal(true).optional(),
  last_reply_date: z.literal(true).optional(),
  nps_follow_up_answer: z.literal(true).optional(),
  nps_follow_up_question_version: z.literal(true).optional(),
  nps_score: z.literal(true).optional(),
  source_thread_id: z.literal(true).optional(),
  time_to_close: z.literal(true).optional(),
  time_to_first_agent_reply: z.literal(true).optional(),
  subject: z.literal(true).optional(),
  content: z.literal(true).optional(),
  source_type: z.literal(true).optional(),
  source_ref: z.literal(true).optional(),
  tags: z.literal(true).optional(),
  hs_sales_email_last_replied: z.literal(true).optional(),
  hubspot_owner_id: z.literal(true).optional(),
  notes_last_contacted: z.literal(true).optional(),
  notes_last_updated: z.literal(true).optional(),
  notes_next_activity_date: z.literal(true).optional(),
  num_contacted_notes: z.literal(true).optional(),
  num_notes: z.literal(true).optional(),
  hubspot_team_id: z.literal(true).optional(),
  hs_all_owner_ids: z.literal(true).optional(),
  hs_all_team_ids: z.literal(true).optional(),
  hs_all_accessible_team_ids: z.literal(true).optional(),
}).strict();
const WhereArgValidator = z.object({
  closed_date: z.literal(true).optional(),
  created_by: z.literal(true).optional(),
  createdate: z.literal(true).optional(),
  first_agent_reply_date: z.literal(true).optional(),
  hs_all_assigned_business_unit_ids: z.literal(true).optional(),
  hs_all_associated_contact_companies: z.literal(true).optional(),
  hs_all_associated_contact_emails: z.literal(true).optional(),
  hs_all_associated_contact_firstnames: z.literal(true).optional(),
  hs_all_associated_contact_lastnames: z.literal(true).optional(),
  hs_all_associated_contact_mobilephones: z.literal(true).optional(),
  hs_all_associated_contact_phones: z.literal(true).optional(),
  hs_all_conversation_mentions: z.literal(true).optional(),
  hs_applied_sla_rule_config_id: z.literal(true).optional(),
  hs_assignment_method: z.literal(true).optional(),
  hs_auto_generated_from_thread_id: z.literal(true).optional(),
  hs_conversations_originating_message_id: z.literal(true).optional(),
  hs_conversations_originating_thread_id: z.literal(true).optional(),
  hs_created_by_user_id: z.literal(true).optional(),
  hs_createdate: z.literal(true).optional(),
  hs_custom_inbox: z.literal(true).optional(),
  hs_date_entered_1: z.literal(true).optional(),
  hs_date_entered_2: z.literal(true).optional(),
  hs_date_entered_3: z.literal(true).optional(),
  hs_date_entered_4: z.literal(true).optional(),
  hs_date_exited_1: z.literal(true).optional(),
  hs_date_exited_2: z.literal(true).optional(),
  hs_date_exited_3: z.literal(true).optional(),
  hs_date_exited_4: z.literal(true).optional(),
  hs_external_object_ids: z.literal(true).optional(),
  hs_feedback_last_ces_follow_up: z.literal(true).optional(),
  hs_feedback_last_ces_rating: z.literal(true).optional(),
  hs_feedback_last_survey_date: z.literal(true).optional(),
  hs_file_upload: z.literal(true).optional(),
  hs_first_agent_message_sent_at: z.literal(true).optional(),
  hs_helpdesk_sort_timestamp: z.literal(true).optional(),
  hs_in_helpdesk: z.literal(true).optional(),
  hs_inbox_id: z.literal(true).optional(),
  hs_last_email_activity: z.literal(true).optional(),
  hs_last_email_date: z.literal(true).optional(),
  hs_last_message_from_visitor: z.literal(true).optional(),
  hs_last_message_received_at: z.literal(true).optional(),
  hs_last_message_sent_at: z.literal(true).optional(),
  hs_lastactivitydate: z.literal(true).optional(),
  hs_lastcontacted: z.literal(true).optional(),
  hs_lastmodifieddate: z.literal(true).optional(),
  hs_latest_message_seen_by_agent_ids: z.literal(true).optional(),
  hs_merged_object_ids: z.literal(true).optional(),
  hs_most_relevant_sla_status: z.literal(true).optional(),
  hs_most_relevant_sla_type: z.literal(true).optional(),
  hs_msteams_message_id: z.literal(true).optional(),
  hs_nextactivitydate: z.literal(true).optional(),
  hs_num_associated_companies: z.literal(true).optional(),
  hs_num_times_contacted: z.literal(true).optional(),
  hs_object_id: z.literal(true).optional(),
  hs_object_source: z.literal(true).optional(),
  hs_object_source_id: z.literal(true).optional(),
  hs_object_source_user_id: z.literal(true).optional(),
  hs_originating_channel_instance_id: z.literal(true).optional(),
  hs_originating_email_engagement_id: z.literal(true).optional(),
  hs_originating_generic_channel_id: z.literal(true).optional(),
  hs_pinned_engagement_id: z.literal(true).optional(),
  hs_pipeline: z.literal(true).optional(),
  hs_pipeline_stage: z.literal(true).optional(),
  hs_primary_company: z.literal(true).optional(),
  hs_primary_company_id: z.literal(true).optional(),
  hs_primary_company_name: z.literal(true).optional(),
  hs_read_only: z.literal(true).optional(),
  hs_resolution: z.literal(true).optional(),
  hs_seen_by_agent_ids: z.literal(true).optional(),
  hs_source_object_id: z.literal(true).optional(),
  hs_tag_ids: z.literal(true).optional(),
  hs_thread_ids_to_restore: z.literal(true).optional(),
  hs_ticket_category: z.literal(true).optional(),
  hs_ticket_id: z.literal(true).optional(),
  hs_ticket_priority: z.literal(true).optional(),
  hs_time_in_1: z.literal(true).optional(),
  hs_time_in_2: z.literal(true).optional(),
  hs_time_in_3: z.literal(true).optional(),
  hs_time_in_4: z.literal(true).optional(),
  hs_time_to_close_sla_at: z.literal(true).optional(),
  hs_time_to_close_sla_status: z.literal(true).optional(),
  hs_time_to_first_response_sla_at: z.literal(true).optional(),
  hs_time_to_first_response_sla_status: z.literal(true).optional(),
  hs_time_to_next_response_sla_at: z.literal(true).optional(),
  hs_time_to_next_response_sla_status: z.literal(true).optional(),
  hs_unique_creation_key: z.literal(true).optional(),
  hs_updated_by_user_id: z.literal(true).optional(),
  hs_user_ids_of_all_notification_followers: z.literal(true).optional(),
  hs_user_ids_of_all_notification_unfollowers: z.literal(true).optional(),
  hs_user_ids_of_all_owners: z.literal(true).optional(),
  hs_was_imported: z.literal(true).optional(),
  hubspot_owner_assigneddate: z.literal(true).optional(),
  last_engagement_date: z.literal(true).optional(),
  last_reply_date: z.literal(true).optional(),
  nps_follow_up_answer: z.literal(true).optional(),
  nps_follow_up_question_version: z.literal(true).optional(),
  nps_score: z.literal(true).optional(),
  source_thread_id: z.literal(true).optional(),
  time_to_close: z.literal(true).optional(),
  time_to_first_agent_reply: z.literal(true).optional(),
  subject: z.literal(true).optional(),
  content: z.literal(true).optional(),
  source_type: z.literal(true).optional(),
  source_ref: z.literal(true).optional(),
  tags: z.literal(true).optional(),
  hs_sales_email_last_replied: z.literal(true).optional(),
  hubspot_owner_id: z.literal(true).optional(),
  notes_last_contacted: z.literal(true).optional(),
  notes_last_updated: z.literal(true).optional(),
  notes_next_activity_date: z.literal(true).optional(),
  num_contacted_notes: z.literal(true).optional(),
  num_notes: z.literal(true).optional(),
  hubspot_team_id: z.literal(true).optional(),
  hs_all_owner_ids: z.literal(true).optional(),
  hs_all_team_ids: z.literal(true).optional(),
  hs_all_accessible_team_ids: z.literal(true).optional(),
}).strict();
export const definition = ({
  SelectArgValidator: SelectArgValidator,
  WhereArgValidator: WhereArgValidator,
  InstanceValidator: InstanceValidator,
}) as const;
