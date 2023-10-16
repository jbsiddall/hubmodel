import { z } from "../lib/deps.ts";

export const InstanceValidator = z.object({
  company_size: z.string().nullable(),
  date_of_birth: z.string().nullable(),
  days_to_close: z.number(),
  degree: z.string().nullable(),
  field_of_study: z.string().nullable(),
  first_conversion_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  first_conversion_event_name: z.string().nullable(),
  first_deal_created_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  gender: z.string().nullable(),
  graduation_date: z.string().nullable(),
  hs_additional_emails: z.string().nullable(),
  hs_all_assigned_business_unit_ids: z.string().nullable(),
  hs_all_contact_vids: z.string().nullable(),
  hs_analytics_first_touch_converting_campaign: z.string().nullable(),
  hs_analytics_last_touch_converting_campaign: z.string().nullable(),
  hs_avatar_filemanager_key: z.string().nullable(),
  hs_buying_role: z.enum([
    "BLOCKER",
    "BUDGET_HOLDER",
    "CHAMPION",
    "DECISION_MAKER",
    "END_USER",
    "EXECUTIVE_SPONSOR",
    "INFLUENCER",
    "LEGAL_AND_COMPLIANCE",
    "OTHER",
  ]),
  hs_calculated_form_submissions: z.string().nullable(),
  hs_calculated_merged_vids: z.string().nullable(),
  hs_calculated_mobile_number: z.string().nullable(),
  hs_calculated_phone_number: z.string().nullable(),
  hs_calculated_phone_number_area_code: z.string().nullable(),
  hs_calculated_phone_number_country_code: z.string().nullable(),
  hs_calculated_phone_number_region_code: z.string().nullable(),
  hs_clicked_linkedin_ad: z.enum([
    "true",
    "false",
  ]),
  hs_content_membership_email: z.string().nullable(),
  hs_content_membership_email_confirmed: z.boolean(),
  hs_content_membership_follow_up_enqueued_at: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_content_membership_notes: z.string().nullable(),
  hs_content_membership_registered_at: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_content_membership_registration_domain_sent_to: z.string().nullable(),
  hs_content_membership_registration_email_sent_at: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_content_membership_status: z.enum([
    "active",
    "inactive",
  ]),
  hs_conversations_visitor_email: z.string().nullable(),
  hs_count_is_unworked: z.number(),
  hs_count_is_worked: z.number(),
  hs_created_by_conversations: z.boolean(),
  hs_created_by_user_id: z.number(),
  hs_createdate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_customer: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_evangelist: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_lead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_marketingqualifiedlead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_opportunity: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_other: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_salesqualifiedlead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_entered_subscriber: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_customer: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_evangelist: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_lead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_marketingqualifiedlead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_opportunity: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_other: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_salesqualifiedlead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_date_exited_subscriber: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_document_last_revisited: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_email_bad_address: z.boolean(),
  hs_email_customer_quarantined_reason: z.enum([
    "SUSPENSION_REMEDIATION",
    "BLOCKLIST_REMEDIATION",
    "TRUST_SAFETY_REMEDIATION",
  ]),
  hs_email_domain: z.string().nullable(),
  hs_email_hard_bounce_reason: z.string().nullable(),
  hs_email_hard_bounce_reason_enum: z.enum([
    "CONTENT",
    "MAILBOX_FULL",
    "OTHER",
    "POLICY",
    "SPAM",
    "UNKNOWN_USER",
  ]),
  hs_email_quarantined: z.boolean(),
  hs_email_quarantined_reason: z.enum([
    "ON_LIST_IMPORT",
    "HIGH_HARD_BOUNCE_RATE",
    "MULTIPLE_CANCELLED_CAMPAIGNS",
    "FORM_ABUSE",
    "RECIPIENT_COMPLAINT",
    "SUSPENSION_REMEDIATION",
    "BLOCKLIST_REMEDIATION",
    "TRUST_SAFETY_REMEDIATION",
    "OTHER",
    "UNDELIVERABLE_ADDRESS",
  ]),
  hs_email_recipient_fatigue_recovery_time: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_email_sends_since_last_engagement: z.number(),
  hs_emailconfirmationstatus: z.enum([
    "",
    "Confirmed",
    "Confirmation Pending",
    "Confirmation Email Sent",
    "User clicked confirmation",
    "HubSpot Rep. marked confirmed",
    "Customer marked confirmed",
    "Confirmed from previous behavior",
    "Confirmed due to form",
  ]),
  hs_facebook_ad_clicked: z.boolean(),
  hs_facebook_click_id: z.string().nullable(),
  hs_facebookid: z.string().nullable(),
  hs_feedback_last_nps_follow_up: z.string().nullable(),
  hs_feedback_last_nps_rating: z.enum([
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
  hs_feedback_last_survey_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_feedback_show_nps_web_survey: z.boolean(),
  hs_first_engagement_object_id: z.number(),
  hs_first_outreach_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_first_subscription_create_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_google_click_id: z.string().nullable(),
  hs_googleplusid: z.string().nullable(),
  hs_has_active_subscription: z.number(),
  hs_ip_timezone: z.string().nullable(),
  hs_is_contact: z.boolean(),
  hs_is_unworked: z.boolean(),
  hs_last_sales_activity_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_last_sales_activity_timestamp: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_last_sales_activity_type: z.enum([
    "COMPANYPROSPECTS_REVISIT",
    "PRESENTATION_REVISIT",
    "EMAIL_CLICK",
    "EMAIL_OPEN",
    "EMAIL_REPLY",
    "FORM_SUBMITTED",
    "MEETING_BOOKED",
    "HUBSPOT_REVISIT",
  ]),
  hs_lastmodifieddate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_latest_sequence_ended_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_latest_sequence_enrolled: z.number(),
  hs_latest_sequence_enrolled_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_latest_sequence_finished_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_latest_sequence_unenrolled_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_latest_source_timestamp: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_latest_subscription_create_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_lead_status: z.enum([
    "NEW",
    "OPEN",
    "IN_PROGRESS",
    "OPEN_DEAL",
    "UNQUALIFIED",
    "ATTEMPTED_TO_CONTACT",
    "CONNECTED",
    "BAD_TIMING",
  ]),
  hs_legal_basis: z.enum([
    "Legitimate interest – prospect/lead",
    "Legitimate interest – existing customer",
    "Legitimate interest - other",
    "Performance of a contract",
    "Freely given consent from contact",
    "Not applicable",
  ]),
  hs_linkedin_ad_clicked: z.enum([
    "true",
    "false",
  ]),
  hs_linkedinid: z.string().nullable(),
  hs_marketable_reason_id: z.string().nullable(),
  hs_marketable_reason_type: z.enum([
    "AD",
    "CONTACT_IMPORT",
    "CONVERSATION",
    "FORM_SUBMISSION",
    "INITIAL_STATE",
    "INTEGRATOR_SET",
    "USER_SET",
    "WORKFLOW",
    "EMAIL",
    "SAMPLE_CONTACT",
  ]),
  hs_marketable_status: z.enum([
    "true",
    "false",
  ]),
  hs_marketable_until_renewal: z.enum([
    "true",
    "false",
  ]),
  hs_merged_object_ids: z.string().nullable(),
  hs_object_id: z.number(),
  hs_object_source: z.string().nullable(),
  hs_object_source_id: z.string().nullable(),
  hs_object_source_user_id: z.number(),
  hs_pinned_engagement_id: z.number(),
  hs_pipeline: z.string().nullable(),
  hs_predictivecontactscore_v2: z.number(),
  hs_predictivescoringtier: z.enum([
    "tier_1",
    "tier_2",
    "tier_3",
    "tier_4",
    "closed_won",
  ]),
  hs_read_only: z.boolean(),
  hs_sa_first_engagement_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_sa_first_engagement_descr: z.enum([
    "EMPTY_DESCRIPTION",
    "BOUNCED",
    "BUSY",
    "CALLING_CRM_USER",
    "CANCELED",
    "COMPLETED",
    "CONNECTING",
    "DEFERRED",
    "FB_MESSENGER",
    "FAILED",
    "IN_PROGRESS",
    "LIVE_CHAT",
    "LOGGED_CALL",
    "NO_ANSWER",
    "NO_SHOW",
    "NOT_STARTED",
    "QUEUED",
    "RESCHEDULED",
    "RINGING",
    "SCHEDULED",
    "SENDING",
    "SENT",
    "WAITING",
    "MISSED",
  ]),
  hs_sa_first_engagement_object_type: z.enum([
    "CALL",
    "CONVERSATION_SESSION",
    "EMAIL",
    "MEETING_EVENT",
    "TASK",
  ]),
  hs_sales_email_last_clicked: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_sales_email_last_opened: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_searchable_calculated_international_mobile_number: z.string().nullable(),
  hs_searchable_calculated_international_phone_number: z.string().nullable(),
  hs_searchable_calculated_mobile_number: z.string().nullable(),
  hs_searchable_calculated_phone_number: z.string().nullable(),
  hs_sequences_actively_enrolled_count: z.number(),
  hs_sequences_enrolled_count: z.number(),
  hs_sequences_is_enrolled: z.boolean(),
  hs_source_object_id: z.number(),
  hs_source_portal_id: z.number(),
  hs_testpurge: z.string().nullable(),
  hs_testrollback: z.string().nullable(),
  hs_time_between_contact_creation_and_deal_close: z.number(),
  hs_time_between_contact_creation_and_deal_creation: z.number(),
  hs_time_in_customer: z.number(),
  hs_time_in_evangelist: z.number(),
  hs_time_in_lead: z.number(),
  hs_time_in_marketingqualifiedlead: z.number(),
  hs_time_in_opportunity: z.number(),
  hs_time_in_other: z.number(),
  hs_time_in_salesqualifiedlead: z.number(),
  hs_time_in_subscriber: z.number(),
  hs_time_to_first_engagement: z.number(),
  hs_time_to_move_from_lead_to_customer: z.number(),
  hs_time_to_move_from_marketingqualifiedlead_to_customer: z.number(),
  hs_time_to_move_from_opportunity_to_customer: z.number(),
  hs_time_to_move_from_salesqualifiedlead_to_customer: z.number(),
  hs_time_to_move_from_subscriber_to_customer: z.number(),
  hs_timezone: z.enum([
    "pacific_slash_midway",
    "pacific_slash_niue",
    "pacific_slash_pago_pago",
    "pacific_slash_samoa",
    "us_slash_samoa",
    "pacific_slash_honolulu",
    "pacific_slash_johnston",
    "pacific_slash_rarotonga",
    "pacific_slash_tahiti",
    "us_slash_hawaii",
    "pacific_slash_marquesas",
    "america_slash_adak",
    "america_slash_atka",
    "pacific_slash_gambier",
    "us_slash_aleutian",
    "america_slash_anchorage",
    "america_slash_juneau",
    "america_slash_metlakatla",
    "america_slash_nome",
    "america_slash_sitka",
    "america_slash_yakutat",
    "pacific_slash_pitcairn",
    "us_slash_alaska",
    "america_slash_creston",
    "america_slash_dawson",
    "america_slash_dawson_creek",
    "america_slash_ensenada",
    "america_slash_fort_nelson",
    "america_slash_hermosillo",
    "america_slash_los_angeles",
    "america_slash_phoenix",
    "america_slash_santa_isabel",
    "america_slash_tijuana",
    "america_slash_vancouver",
    "america_slash_whitehorse",
    "canada_slash_pacific",
    "canada_slash_yukon",
    "mexico_slash_bajanorte",
    "us_slash_arizona",
    "us_slash_pacific",
    "us_slash_pacific_hyphen_new",
    "america_slash_belize",
    "america_slash_boise",
    "america_slash_cambridge_bay",
    "america_slash_chihuahua",
    "america_slash_costa_rica",
    "america_slash_denver",
    "america_slash_edmonton",
    "america_slash_el_salvador",
    "america_slash_guatemala",
    "america_slash_inuvik",
    "america_slash_managua",
    "america_slash_mazatlan",
    "navajo",
    "america_slash_ojinaga",
    "america_slash_regina",
    "america_slash_shiprock",
    "america_slash_swift_current",
    "america_slash_tegucigalpa",
    "america_slash_yellowknife",
    "canada_slash_mountain",
    "canada_slash_saskatchewan",
    "chile_slash_easterisland",
    "mexico_slash_bajasur",
    "pacific_slash_easter",
    "pacific_slash_galapagos",
    "us_slash_mountain",
    "america_slash_atikokan",
    "america_slash_bahia_banderas",
    "america_slash_bogota",
    "america_slash_cancun",
    "america_slash_cayman",
    "america_slash_chicago",
    "america_slash_coral_harbour",
    "america_slash_eirunepe",
    "america_slash_guayaquil",
    "america_slash_indiana_slash_knox",
    "america_slash_indiana_slash_tell_city",
    "america_slash_jamaica",
    "america_slash_knox_in",
    "america_slash_lima",
    "america_slash_matamoros",
    "america_slash_menominee",
    "america_slash_merida",
    "america_slash_mexico_city",
    "america_slash_monterrey",
    "america_slash_north_dakota_slash_beulah",
    "america_slash_north_dakota_slash_center",
    "america_slash_north_dakota_slash_new_salem",
    "america_slash_panama",
    "america_slash_porto_acre",
    "america_slash_rainy_river",
    "america_slash_rankin_inlet",
    "america_slash_resolute",
    "america_slash_rio_branco",
    "america_slash_winnipeg",
    "brazil_slash_acre",
    "canada_slash_central",
    "mexico_slash_general",
    "us_slash_central",
    "us_slash_indiana_hyphen_starke",
    "america_slash_anguilla",
    "america_slash_antigua",
    "america_slash_aruba",
    "america_slash_asuncion",
    "america_slash_barbados",
    "america_slash_blanc_hyphen_sablon",
    "america_slash_boa_vista",
    "america_slash_campo_grande",
    "america_slash_caracas",
    "cuba",
    "america_slash_cuiaba",
    "america_slash_curacao",
    "america_slash_detroit",
    "america_slash_dominica",
    "america_slash_fort_wayne",
    "america_slash_grand_turk",
    "america_slash_grenada",
    "america_slash_guadeloupe",
    "america_slash_guyana",
    "america_slash_havana",
    "america_slash_indiana_slash_indianapolis",
    "america_slash_indiana_slash_marengo",
    "america_slash_indiana_slash_petersburg",
    "america_slash_indiana_slash_vevay",
    "america_slash_indiana_slash_vincennes",
    "america_slash_indiana_slash_winamac",
    "america_slash_indianapolis",
    "america_slash_iqaluit",
    "america_slash_kentucky_slash_louisville",
    "america_slash_kentucky_slash_monticello",
    "america_slash_kralendijk",
    "america_slash_la_paz",
    "america_slash_louisville",
    "america_slash_lower_princes",
    "america_slash_manaus",
    "america_slash_marigot",
    "america_slash_martinique",
    "america_slash_montreal",
    "america_slash_montserrat",
    "america_slash_nassau",
    "america_slash_new_york",
    "america_slash_nipigon",
    "america_slash_pangnirtung",
    "america_slash_port_of_spain",
    "america_slash_port_hyphen_au_hyphen_prince",
    "america_slash_porto_velho",
    "america_slash_puerto_rico",
    "america_slash_santiago",
    "america_slash_santo_domingo",
    "america_slash_st_barthelemy",
    "america_slash_st_kitts",
    "america_slash_st_lucia",
    "america_slash_st_thomas",
    "america_slash_st_vincent",
    "america_slash_thunder_bay",
    "america_slash_toronto",
    "america_slash_tortola",
    "america_slash_virgin",
    "brazil_slash_west",
    "canada_slash_eastern",
    "chile_slash_continental",
    "us_slash_east_hyphen_indiana",
    "us_slash_eastern",
    "us_slash_michigan",
    "america_slash_araguaina",
    "america_slash_argentina_slash_buenos_aires",
    "america_slash_argentina_slash_catamarca",
    "america_slash_argentina_slash_comodrivadavia",
    "america_slash_argentina_slash_cordoba",
    "america_slash_argentina_slash_jujuy",
    "america_slash_argentina_slash_la_rioja",
    "america_slash_argentina_slash_mendoza",
    "america_slash_argentina_slash_rio_gallegos",
    "america_slash_argentina_slash_salta",
    "america_slash_argentina_slash_san_juan",
    "america_slash_argentina_slash_san_luis",
    "america_slash_argentina_slash_tucuman",
    "america_slash_argentina_slash_ushuaia",
    "america_slash_bahia",
    "america_slash_belem",
    "america_slash_buenos_aires",
    "america_slash_catamarca",
    "america_slash_cayenne",
    "america_slash_cordoba",
    "america_slash_fortaleza",
    "america_slash_glace_bay",
    "america_slash_goose_bay",
    "america_slash_halifax",
    "america_slash_jujuy",
    "america_slash_maceio",
    "america_slash_mendoza",
    "america_slash_moncton",
    "america_slash_montevideo",
    "america_slash_paramaribo",
    "america_slash_punta_arenas",
    "america_slash_recife",
    "america_slash_rosario",
    "america_slash_santarem",
    "america_slash_sao_paulo",
    "america_slash_thule",
    "antarctica_slash_palmer",
    "antarctica_slash_rothera",
    "atlantic_slash_bermuda",
    "atlantic_slash_stanley",
    "brazil_slash_east",
    "canada_slash_atlantic",
    "america_slash_st_johns",
    "canada_slash_newfoundland",
    "america_slash_godthab",
    "america_slash_miquelon",
    "america_slash_noronha",
    "atlantic_slash_south_georgia",
    "brazil_slash_denoronha",
    "atlantic_slash_cape_verde",
    "africa_slash_abidjan",
    "africa_slash_accra",
    "africa_slash_bamako",
    "africa_slash_banjul",
    "africa_slash_bissau",
    "africa_slash_conakry",
    "africa_slash_dakar",
    "africa_slash_freetown",
    "africa_slash_lome",
    "africa_slash_monrovia",
    "africa_slash_nouakchott",
    "africa_slash_ouagadougou",
    "africa_slash_timbuktu",
    "america_slash_danmarkshavn",
    "america_slash_scoresbysund",
    "atlantic_slash_azores",
    "atlantic_slash_reykjavik",
    "atlantic_slash_st_helena",
    "iceland",
    "africa_slash_algiers",
    "africa_slash_bangui",
    "africa_slash_brazzaville",
    "africa_slash_casablanca",
    "africa_slash_douala",
    "africa_slash_el_aaiun",
    "africa_slash_kinshasa",
    "africa_slash_lagos",
    "africa_slash_libreville",
    "africa_slash_luanda",
    "africa_slash_malabo",
    "africa_slash_ndjamena",
    "africa_slash_niamey",
    "africa_slash_porto_hyphen_novo",
    "africa_slash_sao_tome",
    "africa_slash_tunis",
    "atlantic_slash_canary",
    "atlantic_slash_faeroe",
    "atlantic_slash_faroe",
    "atlantic_slash_madeira",
    "europe_slash_belfast",
    "europe_slash_dublin",
    "eire",
    "europe_slash_guernsey",
    "europe_slash_isle_of_man",
    "europe_slash_jersey",
    "europe_slash_lisbon",
    "europe_slash_london",
    "portugal",
    "africa_slash_blantyre",
    "africa_slash_bujumbura",
    "africa_slash_cairo",
    "africa_slash_ceuta",
    "egypt",
    "africa_slash_gaborone",
    "africa_slash_harare",
    "africa_slash_johannesburg",
    "africa_slash_khartoum",
    "africa_slash_kigali",
    "libya",
    "africa_slash_lubumbashi",
    "africa_slash_lusaka",
    "africa_slash_maputo",
    "africa_slash_maseru",
    "africa_slash_mbabane",
    "africa_slash_tripoli",
    "africa_slash_windhoek",
    "antarctica_slash_troll",
    "arctic_slash_longyearbyen",
    "atlantic_slash_jan_mayen",
    "europe_slash_amsterdam",
    "europe_slash_andorra",
    "europe_slash_belgrade",
    "europe_slash_berlin",
    "europe_slash_bratislava",
    "europe_slash_brussels",
    "europe_slash_budapest",
    "europe_slash_busingen",
    "europe_slash_copenhagen",
    "europe_slash_gibraltar",
    "europe_slash_kaliningrad",
    "europe_slash_ljubljana",
    "europe_slash_luxembourg",
    "europe_slash_madrid",
    "europe_slash_malta",
    "europe_slash_monaco",
    "europe_slash_oslo",
    "europe_slash_paris",
    "europe_slash_podgorica",
    "poland",
    "europe_slash_prague",
    "europe_slash_rome",
    "europe_slash_san_marino",
    "europe_slash_sarajevo",
    "europe_slash_skopje",
    "europe_slash_stockholm",
    "europe_slash_tirane",
    "europe_slash_vaduz",
    "europe_slash_vatican",
    "europe_slash_vienna",
    "europe_slash_warsaw",
    "europe_slash_zagreb",
    "europe_slash_zurich",
    "africa_slash_addis_ababa",
    "africa_slash_asmara",
    "africa_slash_asmera",
    "africa_slash_dar_es_salaam",
    "africa_slash_djibouti",
    "africa_slash_juba",
    "africa_slash_kampala",
    "africa_slash_mogadishu",
    "africa_slash_nairobi",
    "antarctica_slash_syowa",
    "asia_slash_aden",
    "asia_slash_amman",
    "asia_slash_baghdad",
    "asia_slash_bahrain",
    "asia_slash_beirut",
    "asia_slash_damascus",
    "asia_slash_famagusta",
    "asia_slash_gaza",
    "asia_slash_hebron",
    "israel",
    "asia_slash_istanbul",
    "asia_slash_jerusalem",
    "asia_slash_kuwait",
    "asia_slash_nicosia",
    "asia_slash_qatar",
    "asia_slash_riyadh",
    "asia_slash_tel_aviv",
    "turkey",
    "europe_slash_athens",
    "europe_slash_bucharest",
    "europe_slash_chisinau",
    "europe_slash_helsinki",
    "europe_slash_istanbul",
    "europe_slash_kiev",
    "europe_slash_kirov",
    "europe_slash_mariehamn",
    "europe_slash_minsk",
    "europe_slash_moscow",
    "europe_slash_nicosia",
    "europe_slash_riga",
    "europe_slash_simferopol",
    "europe_slash_sofia",
    "europe_slash_tallinn",
    "europe_slash_tiraspol",
    "europe_slash_uzhgorod",
    "europe_slash_vilnius",
    "europe_slash_zaporozhye",
    "indian_slash_antananarivo",
    "indian_slash_comoro",
    "indian_slash_mayotte",
    "asia_slash_baku",
    "asia_slash_dubai",
    "asia_slash_muscat",
    "asia_slash_tbilisi",
    "asia_slash_yerevan",
    "europe_slash_astrakhan",
    "europe_slash_samara",
    "europe_slash_saratov",
    "europe_slash_ulyanovsk",
    "europe_slash_volgograd",
    "indian_slash_mahe",
    "indian_slash_mauritius",
    "indian_slash_reunion",
    "iran",
    "asia_slash_kabul",
    "asia_slash_tehran",
    "antarctica_slash_mawson",
    "asia_slash_aqtau",
    "asia_slash_aqtobe",
    "asia_slash_ashgabat",
    "asia_slash_ashkhabad",
    "asia_slash_atyrau",
    "asia_slash_dushanbe",
    "asia_slash_karachi",
    "asia_slash_oral",
    "asia_slash_samarkand",
    "asia_slash_tashkent",
    "asia_slash_yekaterinburg",
    "indian_slash_kerguelen",
    "indian_slash_maldives",
    "asia_slash_calcutta",
    "asia_slash_colombo",
    "asia_slash_kolkata",
    "asia_slash_kathmandu",
    "asia_slash_katmandu",
    "antarctica_slash_vostok",
    "asia_slash_almaty",
    "asia_slash_bishkek",
    "asia_slash_dacca",
    "asia_slash_dhaka",
    "asia_slash_kashgar",
    "asia_slash_omsk",
    "asia_slash_qyzylorda",
    "asia_slash_thimbu",
    "asia_slash_thimphu",
    "asia_slash_urumqi",
    "indian_slash_chagos",
    "asia_slash_rangoon",
    "asia_slash_yangon",
    "indian_slash_cocos",
    "antarctica_slash_davis",
    "asia_slash_bangkok",
    "asia_slash_barnaul",
    "asia_slash_ho_chi_minh",
    "asia_slash_hovd",
    "asia_slash_jakarta",
    "asia_slash_krasnoyarsk",
    "asia_slash_novokuznetsk",
    "asia_slash_novosibirsk",
    "asia_slash_phnom_penh",
    "asia_slash_pontianak",
    "asia_slash_saigon",
    "asia_slash_tomsk",
    "asia_slash_vientiane",
    "indian_slash_christmas",
    "antarctica_slash_casey",
    "asia_slash_brunei",
    "asia_slash_choibalsan",
    "asia_slash_chongqing",
    "asia_slash_chungking",
    "asia_slash_harbin",
    "asia_slash_hong_kong",
    "asia_slash_irkutsk",
    "asia_slash_kuala_lumpur",
    "asia_slash_kuching",
    "asia_slash_macao",
    "asia_slash_macau",
    "asia_slash_makassar",
    "asia_slash_manila",
    "asia_slash_shanghai",
    "asia_slash_singapore",
    "asia_slash_taipei",
    "asia_slash_ujung_pandang",
    "asia_slash_ulaanbaatar",
    "asia_slash_ulan_bator",
    "australia_slash_perth",
    "australia_slash_west",
    "australia_slash_eucla",
    "asia_slash_chita",
    "asia_slash_dili",
    "japan",
    "asia_slash_jayapura",
    "asia_slash_khandyga",
    "asia_slash_pyongyang",
    "asia_slash_seoul",
    "asia_slash_tokyo",
    "asia_slash_yakutsk",
    "pacific_slash_palau",
    "australia_slash_adelaide",
    "australia_slash_broken_hill",
    "australia_slash_darwin",
    "australia_slash_north",
    "australia_slash_south",
    "australia_slash_yancowinna",
    "antarctica_slash_dumontdurville",
    "asia_slash_ust_hyphen_nera",
    "asia_slash_vladivostok",
    "australia_slash_act",
    "australia_slash_brisbane",
    "australia_slash_canberra",
    "australia_slash_currie",
    "australia_slash_hobart",
    "australia_slash_lindeman",
    "australia_slash_melbourne",
    "australia_slash_nsw",
    "australia_slash_queensland",
    "australia_slash_sydney",
    "australia_slash_tasmania",
    "australia_slash_victoria",
    "pacific_slash_chuuk",
    "pacific_slash_guam",
    "pacific_slash_port_moresby",
    "pacific_slash_saipan",
    "pacific_slash_truk",
    "pacific_slash_yap",
    "australia_slash_lhi",
    "australia_slash_lord_howe",
    "antarctica_slash_macquarie",
    "asia_slash_magadan",
    "asia_slash_sakhalin",
    "asia_slash_srednekolymsk",
    "pacific_slash_bougainville",
    "pacific_slash_efate",
    "pacific_slash_guadalcanal",
    "pacific_slash_kosrae",
    "pacific_slash_norfolk",
    "pacific_slash_noumea",
    "pacific_slash_pohnpei",
    "pacific_slash_ponape",
    "antarctica_slash_mcmurdo",
    "antarctica_slash_south_pole",
    "asia_slash_anadyr",
    "asia_slash_kamchatka",
    "pacific_slash_auckland",
    "pacific_slash_fiji",
    "pacific_slash_funafuti",
    "kwajalein",
    "pacific_slash_majuro",
    "pacific_slash_nauru",
    "pacific_slash_tarawa",
    "pacific_slash_wake",
    "pacific_slash_wallis",
    "pacific_slash_chatham",
    "pacific_slash_apia",
    "pacific_slash_enderbury",
    "pacific_slash_fakaofo",
    "pacific_slash_tongatapu",
    "pacific_slash_kiritimati",
  ]),
  hs_twitterid: z.string().nullable(),
  hs_unique_creation_key: z.string().nullable(),
  hs_updated_by_user_id: z.number(),
  hs_user_ids_of_all_notification_followers: z.string().nullable(),
  hs_user_ids_of_all_notification_unfollowers: z.string().nullable(),
  hs_user_ids_of_all_owners: z.string().nullable(),
  hs_v2_cumulative_time_in_customer: z.number(),
  hs_v2_cumulative_time_in_evangelist: z.number(),
  hs_v2_cumulative_time_in_lead: z.number(),
  hs_v2_cumulative_time_in_marketingqualifiedlead: z.number(),
  hs_v2_cumulative_time_in_opportunity: z.number(),
  hs_v2_cumulative_time_in_other: z.number(),
  hs_v2_cumulative_time_in_salesqualifiedlead: z.number(),
  hs_v2_cumulative_time_in_subscriber: z.number(),
  hs_v2_date_entered_customer: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_entered_evangelist: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_entered_lead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_entered_marketingqualifiedlead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_entered_opportunity: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_entered_other: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_entered_salesqualifiedlead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_entered_subscriber: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_exited_customer: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_exited_evangelist: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_exited_lead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_exited_marketingqualifiedlead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_exited_opportunity: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_exited_other: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_exited_salesqualifiedlead: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_date_exited_subscriber: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_v2_latest_time_in_customer: z.number(),
  hs_v2_latest_time_in_evangelist: z.number(),
  hs_v2_latest_time_in_lead: z.number(),
  hs_v2_latest_time_in_marketingqualifiedlead: z.number(),
  hs_v2_latest_time_in_opportunity: z.number(),
  hs_v2_latest_time_in_other: z.number(),
  hs_v2_latest_time_in_salesqualifiedlead: z.number(),
  hs_v2_latest_time_in_subscriber: z.number(),
  hs_was_imported: z.boolean(),
  hs_whatsapp_phone_number: z.string().nullable(),
  hubspot_owner_assigneddate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  ip_city: z.string().nullable(),
  ip_country: z.string().nullable(),
  ip_country_code: z.string().nullable(),
  ip_latlon: z.string().nullable(),
  ip_state: z.string().nullable(),
  ip_state_code: z.string().nullable(),
  ip_zipcode: z.string().nullable(),
  job_function: z.string().nullable(),
  lastmodifieddate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  marital_status: z.string().nullable(),
  military_status: z.string().nullable(),
  num_associated_deals: z.number(),
  num_conversion_events: z.number(),
  num_unique_conversion_events: z.number(),
  recent_conversion_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  recent_conversion_event_name: z.string().nullable(),
  recent_deal_amount: z.number(),
  recent_deal_close_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  relationship_status: z.string().nullable(),
  school: z.string().nullable(),
  seniority: z.string().nullable(),
  start_date: z.string().nullable(),
  total_revenue: z.number(),
  work_email: z.string().nullable(),
  firstname: z.string().nullable(),
  hs_analytics_first_url: z.string().nullable(),
  hs_email_delivered: z.number(),
  hs_email_optout_227290470: z.enum([
    "true",
    "false",
  ]),
  hs_email_optout_227290476: z.enum([
    "true",
    "false",
  ]),
  twitterhandle: z.string().nullable(),
  currentlyinworkflow: z.enum([
    "true",
    "false",
  ]),
  followercount: z.number(),
  hs_analytics_last_url: z.string().nullable(),
  hs_email_open: z.number(),
  lastname: z.string().nullable(),
  hs_analytics_num_page_views: z.number(),
  hs_email_click: z.number(),
  salutation: z.string().nullable(),
  twitterprofilephoto: z.string().nullable(),
  email: z.string().nullable(),
  hs_analytics_num_visits: z.number(),
  hs_email_bounce: z.number(),
  hs_persona: z.string().nullable(),
  hs_social_last_engagement: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_analytics_num_event_completions: z.number(),
  hs_email_optout: z.boolean(),
  hs_social_twitter_clicks: z.number(),
  mobilephone: z.string().nullable(),
  phone: z.string().nullable(),
  fax: z.string().nullable(),
  hs_analytics_first_timestamp: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_email_last_email_name: z.string().nullable(),
  hs_email_last_send_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_social_facebook_clicks: z.number(),
  address: z.string().nullable(),
  engagements_last_meeting_booked: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  engagements_last_meeting_booked_campaign: z.string().nullable(),
  engagements_last_meeting_booked_medium: z.string().nullable(),
  engagements_last_meeting_booked_source: z.string().nullable(),
  hs_analytics_first_visit_timestamp: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_email_last_open_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_latest_meeting_activity: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_sales_email_last_replied: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_social_linkedin_clicks: z.number(),
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
  owneremail: z.string().nullable(),
  ownername: z.string().nullable(),
  surveymonkeyeventlastupdated: z.number(),
  webinareventlastupdated: z.number(),
  city: z.string().nullable(),
  hs_analytics_last_timestamp: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_email_last_click_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_social_google_plus_clicks: z.number(),
  hubspot_team_id: z.string().nullable(),
  linkedinbio: z.string().nullable(),
  twitterbio: z.string().nullable(),
  hs_all_owner_ids: z.string().nullable(),
  hs_analytics_last_visit_timestamp: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_email_first_send_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_social_num_broadcast_clicks: z.number(),
  state: z.string().nullable(),
  hs_all_team_ids: z.string().nullable(),
  hs_analytics_source: z.enum([
    "ORGANIC_SEARCH",
    "PAID_SEARCH",
    "EMAIL_MARKETING",
    "SOCIAL_MEDIA",
    "REFERRALS",
    "OTHER_CAMPAIGNS",
    "DIRECT_TRAFFIC",
    "OFFLINE",
    "PAID_SOCIAL",
  ]),
  hs_email_first_open_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_latest_source: z.enum([
    "ORGANIC_SEARCH",
    "PAID_SEARCH",
    "EMAIL_MARKETING",
    "SOCIAL_MEDIA",
    "REFERRALS",
    "OTHER_CAMPAIGNS",
    "DIRECT_TRAFFIC",
    "OFFLINE",
    "PAID_SOCIAL",
  ]),
  zip: z.string().nullable(),
  country: z.string().nullable(),
  hs_all_accessible_team_ids: z.string().nullable(),
  hs_analytics_source_data_1: z.string().nullable(),
  hs_email_first_click_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_latest_source_data_1: z.string().nullable(),
  linkedinconnections: z.number(),
  hs_analytics_source_data_2: z.string().nullable(),
  hs_email_is_ineligible: z.boolean(),
  hs_language: z.enum([
    "af",
    "sq",
    "sq-al",
    "ar",
    "ar-dz",
    "ar-bh",
    "ar-eg",
    "ar-iq",
    "ar-jo",
    "ar-kw",
    "ar-lb",
    "ar-ly",
    "ar-ma",
    "ar-om",
    "ar-qa",
    "ar-sa",
    "ar-sd",
    "ar-sy",
    "ar-tn",
    "ar-ae",
    "ar-ye",
    "hy",
    "eu",
    "be",
    "be-by",
    "bg",
    "bg-bg",
    "ca",
    "ca-es",
    "zh",
    "zh-cn",
    "zh-hk",
    "zh-mo",
    "zh-sg",
    "zh-tw",
    "zh-chs",
    "zh-cht",
    "hr",
    "hr-hr",
    "cs",
    "cs-cz",
    "da",
    "da-dk",
    "nl",
    "nl-be",
    "nl-nl",
    "en",
    "en-au",
    "en-ca",
    "en-hk",
    "en-in",
    "en-ie",
    "en-my",
    "en-mt",
    "en-nz",
    "en-ph",
    "en-sg",
    "en-za",
    "en-gb",
    "en-us",
    "en-zw",
    "et",
    "et-ee",
    "fo",
    "fa",
    "fi",
    "fi-fi",
    "fr",
    "fr-be",
    "fr-ca",
    "fr-fr",
    "fr-lu",
    "fr-mc",
    "fr-ch",
    "gl",
    "ka",
    "de",
    "de-at",
    "de-de",
    "de-gr",
    "de-li",
    "de-lu",
    "de-ch",
    "el",
    "el-cy",
    "el-gr",
    "gu",
    "he",
    "iw-il",
    "hi",
    "hi-in",
    "hu",
    "hu-hu",
    "is",
    "is-is",
    "id",
    "in-id",
    "ga",
    "ga-ie",
    "it",
    "it-it",
    "it-ch",
    "ja",
    "ja-jp",
    "kn",
    "kk",
    "kok",
    "ko",
    "ko-kr",
    "ky",
    "lv",
    "lv-lv",
    "lt",
    "lt-lt",
    "mk",
    "mk-mk",
    "ms",
    "ms-bn",
    "ms-my",
    "mt",
    "mt-mt",
    "mr",
    "mn",
    "my",
    "my-mm",
    "no",
    "nb",
    "no-no",
    "pl",
    "pl-pl",
    "pt",
    "pt-br",
    "pt-pt",
    "pa",
    "ro",
    "ro-ro",
    "ru",
    "ru-ru",
    "sa",
    "sr",
    "sr-ba",
    "sr-me",
    "sr-rs",
    "sr-cs",
    "sk",
    "sk-sk",
    "sl",
    "sl-si",
    "es",
    "es-ar",
    "es-bo",
    "es-cl",
    "es-co",
    "es-cr",
    "es-cu",
    "es-do",
    "es-ec",
    "es-sv",
    "es-gt",
    "es-hn",
    "es-mx",
    "es-ni",
    "es-pa",
    "es-py",
    "es-pe",
    "es-pr",
    "es-es",
    "es-us",
    "es-uy",
    "es-ve",
    "sw",
    "sv",
    "sv-fi",
    "sv-se",
    "sy",
    "ta",
    "tt",
    "te",
    "th",
    "th-th",
    "tr",
    "tr-tr",
    "uk",
    "uk-ua",
    "ur",
    "vi",
    "vi-vn",
    "bn",
    "t1",
    "m1",
    "as",
    "cb-pl",
    "ha",
    "ki",
    "rw",
    "ny",
    "mg",
    "yo",
    "ht",
  ]),
  hs_latest_source_data_2: z.string().nullable(),
  kloutscoregeneral: z.number(),
  hs_analytics_first_referrer: z.string().nullable(),
  hs_email_first_reply_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  jobtitle: z.string().nullable(),
  photo: z.string().nullable(),
  hs_analytics_last_referrer: z.string().nullable(),
  hs_email_last_reply_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  message: z.string().nullable(),
  closedate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_analytics_average_page_views: z.number(),
  hs_email_replied: z.number(),
  hs_analytics_revenue: z.number(),
  hs_lifecyclestage_lead_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_lifecyclestage_marketingqualifiedlead_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_lifecyclestage_opportunity_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  lifecyclestage: z.enum([
    "subscriber",
    "lead",
    "marketingqualifiedlead",
    "salesqualifiedlead",
    "opportunity",
    "customer",
    "evangelist",
    "other",
  ]),
  hs_lifecyclestage_salesqualifiedlead_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  createdate: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_lifecyclestage_evangelist_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_lifecyclestage_customer_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hubspotscore: z.number(),
  company: z.string().nullable(),
  hs_lifecyclestage_subscriber_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  hs_lifecyclestage_other_date: z.string()
    .nullable()
    .transform((x) => {
      if (x) {
        return new Date(x);
      }
      return null;
    }),
  website: z.string().nullable(),
  numemployees: z.enum([
    "1-5",
    "5-25",
    "25-50",
    "50-100",
    "100-500",
    "500-1000",
    "1000+",
  ]),
  annualrevenue: z.string().nullable(),
  industry: z.string().nullable(),
  associatedcompanyid: z.number(),
  associatedcompanylastupdated: z.number(),
  hs_predictivecontactscorebucket: z.enum([
    "bucket_1",
    "bucket_2",
    "bucket_3",
    "bucket_4",
  ]),
  hs_predictivecontactscore: z.number(),
});
const SelectArgValidator = z.object({
  company_size: z.literal(true).optional(),
  date_of_birth: z.literal(true).optional(),
  days_to_close: z.literal(true).optional(),
  degree: z.literal(true).optional(),
  field_of_study: z.literal(true).optional(),
  first_conversion_date: z.literal(true).optional(),
  first_conversion_event_name: z.literal(true).optional(),
  first_deal_created_date: z.literal(true).optional(),
  gender: z.literal(true).optional(),
  graduation_date: z.literal(true).optional(),
  hs_additional_emails: z.literal(true).optional(),
  hs_all_assigned_business_unit_ids: z.literal(true).optional(),
  hs_all_contact_vids: z.literal(true).optional(),
  hs_analytics_first_touch_converting_campaign: z.literal(true).optional(),
  hs_analytics_last_touch_converting_campaign: z.literal(true).optional(),
  hs_avatar_filemanager_key: z.literal(true).optional(),
  hs_buying_role: z.literal(true).optional(),
  hs_calculated_form_submissions: z.literal(true).optional(),
  hs_calculated_merged_vids: z.literal(true).optional(),
  hs_calculated_mobile_number: z.literal(true).optional(),
  hs_calculated_phone_number: z.literal(true).optional(),
  hs_calculated_phone_number_area_code: z.literal(true).optional(),
  hs_calculated_phone_number_country_code: z.literal(true).optional(),
  hs_calculated_phone_number_region_code: z.literal(true).optional(),
  hs_clicked_linkedin_ad: z.literal(true).optional(),
  hs_content_membership_email: z.literal(true).optional(),
  hs_content_membership_email_confirmed: z.literal(true).optional(),
  hs_content_membership_follow_up_enqueued_at: z.literal(true).optional(),
  hs_content_membership_notes: z.literal(true).optional(),
  hs_content_membership_registered_at: z.literal(true).optional(),
  hs_content_membership_registration_domain_sent_to: z.literal(true).optional(),
  hs_content_membership_registration_email_sent_at: z.literal(true).optional(),
  hs_content_membership_status: z.literal(true).optional(),
  hs_conversations_visitor_email: z.literal(true).optional(),
  hs_count_is_unworked: z.literal(true).optional(),
  hs_count_is_worked: z.literal(true).optional(),
  hs_created_by_conversations: z.literal(true).optional(),
  hs_created_by_user_id: z.literal(true).optional(),
  hs_createdate: z.literal(true).optional(),
  hs_date_entered_customer: z.literal(true).optional(),
  hs_date_entered_evangelist: z.literal(true).optional(),
  hs_date_entered_lead: z.literal(true).optional(),
  hs_date_entered_marketingqualifiedlead: z.literal(true).optional(),
  hs_date_entered_opportunity: z.literal(true).optional(),
  hs_date_entered_other: z.literal(true).optional(),
  hs_date_entered_salesqualifiedlead: z.literal(true).optional(),
  hs_date_entered_subscriber: z.literal(true).optional(),
  hs_date_exited_customer: z.literal(true).optional(),
  hs_date_exited_evangelist: z.literal(true).optional(),
  hs_date_exited_lead: z.literal(true).optional(),
  hs_date_exited_marketingqualifiedlead: z.literal(true).optional(),
  hs_date_exited_opportunity: z.literal(true).optional(),
  hs_date_exited_other: z.literal(true).optional(),
  hs_date_exited_salesqualifiedlead: z.literal(true).optional(),
  hs_date_exited_subscriber: z.literal(true).optional(),
  hs_document_last_revisited: z.literal(true).optional(),
  hs_email_bad_address: z.literal(true).optional(),
  hs_email_customer_quarantined_reason: z.literal(true).optional(),
  hs_email_domain: z.literal(true).optional(),
  hs_email_hard_bounce_reason: z.literal(true).optional(),
  hs_email_hard_bounce_reason_enum: z.literal(true).optional(),
  hs_email_quarantined: z.literal(true).optional(),
  hs_email_quarantined_reason: z.literal(true).optional(),
  hs_email_recipient_fatigue_recovery_time: z.literal(true).optional(),
  hs_email_sends_since_last_engagement: z.literal(true).optional(),
  hs_emailconfirmationstatus: z.literal(true).optional(),
  hs_facebook_ad_clicked: z.literal(true).optional(),
  hs_facebook_click_id: z.literal(true).optional(),
  hs_facebookid: z.literal(true).optional(),
  hs_feedback_last_nps_follow_up: z.literal(true).optional(),
  hs_feedback_last_nps_rating: z.literal(true).optional(),
  hs_feedback_last_survey_date: z.literal(true).optional(),
  hs_feedback_show_nps_web_survey: z.literal(true).optional(),
  hs_first_engagement_object_id: z.literal(true).optional(),
  hs_first_outreach_date: z.literal(true).optional(),
  hs_first_subscription_create_date: z.literal(true).optional(),
  hs_google_click_id: z.literal(true).optional(),
  hs_googleplusid: z.literal(true).optional(),
  hs_has_active_subscription: z.literal(true).optional(),
  hs_ip_timezone: z.literal(true).optional(),
  hs_is_contact: z.literal(true).optional(),
  hs_is_unworked: z.literal(true).optional(),
  hs_last_sales_activity_date: z.literal(true).optional(),
  hs_last_sales_activity_timestamp: z.literal(true).optional(),
  hs_last_sales_activity_type: z.literal(true).optional(),
  hs_lastmodifieddate: z.literal(true).optional(),
  hs_latest_sequence_ended_date: z.literal(true).optional(),
  hs_latest_sequence_enrolled: z.literal(true).optional(),
  hs_latest_sequence_enrolled_date: z.literal(true).optional(),
  hs_latest_sequence_finished_date: z.literal(true).optional(),
  hs_latest_sequence_unenrolled_date: z.literal(true).optional(),
  hs_latest_source_timestamp: z.literal(true).optional(),
  hs_latest_subscription_create_date: z.literal(true).optional(),
  hs_lead_status: z.literal(true).optional(),
  hs_legal_basis: z.literal(true).optional(),
  hs_linkedin_ad_clicked: z.literal(true).optional(),
  hs_linkedinid: z.literal(true).optional(),
  hs_marketable_reason_id: z.literal(true).optional(),
  hs_marketable_reason_type: z.literal(true).optional(),
  hs_marketable_status: z.literal(true).optional(),
  hs_marketable_until_renewal: z.literal(true).optional(),
  hs_merged_object_ids: z.literal(true).optional(),
  hs_object_id: z.literal(true).optional(),
  hs_object_source: z.literal(true).optional(),
  hs_object_source_id: z.literal(true).optional(),
  hs_object_source_user_id: z.literal(true).optional(),
  hs_pinned_engagement_id: z.literal(true).optional(),
  hs_pipeline: z.literal(true).optional(),
  hs_predictivecontactscore_v2: z.literal(true).optional(),
  hs_predictivescoringtier: z.literal(true).optional(),
  hs_read_only: z.literal(true).optional(),
  hs_sa_first_engagement_date: z.literal(true).optional(),
  hs_sa_first_engagement_descr: z.literal(true).optional(),
  hs_sa_first_engagement_object_type: z.literal(true).optional(),
  hs_sales_email_last_clicked: z.literal(true).optional(),
  hs_sales_email_last_opened: z.literal(true).optional(),
  hs_searchable_calculated_international_mobile_number: z.literal(true).optional(),
  hs_searchable_calculated_international_phone_number: z.literal(true).optional(),
  hs_searchable_calculated_mobile_number: z.literal(true).optional(),
  hs_searchable_calculated_phone_number: z.literal(true).optional(),
  hs_sequences_actively_enrolled_count: z.literal(true).optional(),
  hs_sequences_enrolled_count: z.literal(true).optional(),
  hs_sequences_is_enrolled: z.literal(true).optional(),
  hs_source_object_id: z.literal(true).optional(),
  hs_source_portal_id: z.literal(true).optional(),
  hs_testpurge: z.literal(true).optional(),
  hs_testrollback: z.literal(true).optional(),
  hs_time_between_contact_creation_and_deal_close: z.literal(true).optional(),
  hs_time_between_contact_creation_and_deal_creation: z.literal(true).optional(),
  hs_time_in_customer: z.literal(true).optional(),
  hs_time_in_evangelist: z.literal(true).optional(),
  hs_time_in_lead: z.literal(true).optional(),
  hs_time_in_marketingqualifiedlead: z.literal(true).optional(),
  hs_time_in_opportunity: z.literal(true).optional(),
  hs_time_in_other: z.literal(true).optional(),
  hs_time_in_salesqualifiedlead: z.literal(true).optional(),
  hs_time_in_subscriber: z.literal(true).optional(),
  hs_time_to_first_engagement: z.literal(true).optional(),
  hs_time_to_move_from_lead_to_customer: z.literal(true).optional(),
  hs_time_to_move_from_marketingqualifiedlead_to_customer: z.literal(true).optional(),
  hs_time_to_move_from_opportunity_to_customer: z.literal(true).optional(),
  hs_time_to_move_from_salesqualifiedlead_to_customer: z.literal(true).optional(),
  hs_time_to_move_from_subscriber_to_customer: z.literal(true).optional(),
  hs_timezone: z.literal(true).optional(),
  hs_twitterid: z.literal(true).optional(),
  hs_unique_creation_key: z.literal(true).optional(),
  hs_updated_by_user_id: z.literal(true).optional(),
  hs_user_ids_of_all_notification_followers: z.literal(true).optional(),
  hs_user_ids_of_all_notification_unfollowers: z.literal(true).optional(),
  hs_user_ids_of_all_owners: z.literal(true).optional(),
  hs_v2_cumulative_time_in_customer: z.literal(true).optional(),
  hs_v2_cumulative_time_in_evangelist: z.literal(true).optional(),
  hs_v2_cumulative_time_in_lead: z.literal(true).optional(),
  hs_v2_cumulative_time_in_marketingqualifiedlead: z.literal(true).optional(),
  hs_v2_cumulative_time_in_opportunity: z.literal(true).optional(),
  hs_v2_cumulative_time_in_other: z.literal(true).optional(),
  hs_v2_cumulative_time_in_salesqualifiedlead: z.literal(true).optional(),
  hs_v2_cumulative_time_in_subscriber: z.literal(true).optional(),
  hs_v2_date_entered_customer: z.literal(true).optional(),
  hs_v2_date_entered_evangelist: z.literal(true).optional(),
  hs_v2_date_entered_lead: z.literal(true).optional(),
  hs_v2_date_entered_marketingqualifiedlead: z.literal(true).optional(),
  hs_v2_date_entered_opportunity: z.literal(true).optional(),
  hs_v2_date_entered_other: z.literal(true).optional(),
  hs_v2_date_entered_salesqualifiedlead: z.literal(true).optional(),
  hs_v2_date_entered_subscriber: z.literal(true).optional(),
  hs_v2_date_exited_customer: z.literal(true).optional(),
  hs_v2_date_exited_evangelist: z.literal(true).optional(),
  hs_v2_date_exited_lead: z.literal(true).optional(),
  hs_v2_date_exited_marketingqualifiedlead: z.literal(true).optional(),
  hs_v2_date_exited_opportunity: z.literal(true).optional(),
  hs_v2_date_exited_other: z.literal(true).optional(),
  hs_v2_date_exited_salesqualifiedlead: z.literal(true).optional(),
  hs_v2_date_exited_subscriber: z.literal(true).optional(),
  hs_v2_latest_time_in_customer: z.literal(true).optional(),
  hs_v2_latest_time_in_evangelist: z.literal(true).optional(),
  hs_v2_latest_time_in_lead: z.literal(true).optional(),
  hs_v2_latest_time_in_marketingqualifiedlead: z.literal(true).optional(),
  hs_v2_latest_time_in_opportunity: z.literal(true).optional(),
  hs_v2_latest_time_in_other: z.literal(true).optional(),
  hs_v2_latest_time_in_salesqualifiedlead: z.literal(true).optional(),
  hs_v2_latest_time_in_subscriber: z.literal(true).optional(),
  hs_was_imported: z.literal(true).optional(),
  hs_whatsapp_phone_number: z.literal(true).optional(),
  hubspot_owner_assigneddate: z.literal(true).optional(),
  ip_city: z.literal(true).optional(),
  ip_country: z.literal(true).optional(),
  ip_country_code: z.literal(true).optional(),
  ip_latlon: z.literal(true).optional(),
  ip_state: z.literal(true).optional(),
  ip_state_code: z.literal(true).optional(),
  ip_zipcode: z.literal(true).optional(),
  job_function: z.literal(true).optional(),
  lastmodifieddate: z.literal(true).optional(),
  marital_status: z.literal(true).optional(),
  military_status: z.literal(true).optional(),
  num_associated_deals: z.literal(true).optional(),
  num_conversion_events: z.literal(true).optional(),
  num_unique_conversion_events: z.literal(true).optional(),
  recent_conversion_date: z.literal(true).optional(),
  recent_conversion_event_name: z.literal(true).optional(),
  recent_deal_amount: z.literal(true).optional(),
  recent_deal_close_date: z.literal(true).optional(),
  relationship_status: z.literal(true).optional(),
  school: z.literal(true).optional(),
  seniority: z.literal(true).optional(),
  start_date: z.literal(true).optional(),
  total_revenue: z.literal(true).optional(),
  work_email: z.literal(true).optional(),
  firstname: z.literal(true).optional(),
  hs_analytics_first_url: z.literal(true).optional(),
  hs_email_delivered: z.literal(true).optional(),
  hs_email_optout_227290470: z.literal(true).optional(),
  hs_email_optout_227290476: z.literal(true).optional(),
  twitterhandle: z.literal(true).optional(),
  currentlyinworkflow: z.literal(true).optional(),
  followercount: z.literal(true).optional(),
  hs_analytics_last_url: z.literal(true).optional(),
  hs_email_open: z.literal(true).optional(),
  lastname: z.literal(true).optional(),
  hs_analytics_num_page_views: z.literal(true).optional(),
  hs_email_click: z.literal(true).optional(),
  salutation: z.literal(true).optional(),
  twitterprofilephoto: z.literal(true).optional(),
  email: z.literal(true).optional(),
  hs_analytics_num_visits: z.literal(true).optional(),
  hs_email_bounce: z.literal(true).optional(),
  hs_persona: z.literal(true).optional(),
  hs_social_last_engagement: z.literal(true).optional(),
  hs_analytics_num_event_completions: z.literal(true).optional(),
  hs_email_optout: z.literal(true).optional(),
  hs_social_twitter_clicks: z.literal(true).optional(),
  mobilephone: z.literal(true).optional(),
  phone: z.literal(true).optional(),
  fax: z.literal(true).optional(),
  hs_analytics_first_timestamp: z.literal(true).optional(),
  hs_email_last_email_name: z.literal(true).optional(),
  hs_email_last_send_date: z.literal(true).optional(),
  hs_social_facebook_clicks: z.literal(true).optional(),
  address: z.literal(true).optional(),
  engagements_last_meeting_booked: z.literal(true).optional(),
  engagements_last_meeting_booked_campaign: z.literal(true).optional(),
  engagements_last_meeting_booked_medium: z.literal(true).optional(),
  engagements_last_meeting_booked_source: z.literal(true).optional(),
  hs_analytics_first_visit_timestamp: z.literal(true).optional(),
  hs_email_last_open_date: z.literal(true).optional(),
  hs_latest_meeting_activity: z.literal(true).optional(),
  hs_sales_email_last_replied: z.literal(true).optional(),
  hs_social_linkedin_clicks: z.literal(true).optional(),
  hubspot_owner_id: z.literal(true).optional(),
  notes_last_contacted: z.literal(true).optional(),
  notes_last_updated: z.literal(true).optional(),
  notes_next_activity_date: z.literal(true).optional(),
  num_contacted_notes: z.literal(true).optional(),
  num_notes: z.literal(true).optional(),
  owneremail: z.literal(true).optional(),
  ownername: z.literal(true).optional(),
  surveymonkeyeventlastupdated: z.literal(true).optional(),
  webinareventlastupdated: z.literal(true).optional(),
  city: z.literal(true).optional(),
  hs_analytics_last_timestamp: z.literal(true).optional(),
  hs_email_last_click_date: z.literal(true).optional(),
  hs_social_google_plus_clicks: z.literal(true).optional(),
  hubspot_team_id: z.literal(true).optional(),
  linkedinbio: z.literal(true).optional(),
  twitterbio: z.literal(true).optional(),
  hs_all_owner_ids: z.literal(true).optional(),
  hs_analytics_last_visit_timestamp: z.literal(true).optional(),
  hs_email_first_send_date: z.literal(true).optional(),
  hs_social_num_broadcast_clicks: z.literal(true).optional(),
  state: z.literal(true).optional(),
  hs_all_team_ids: z.literal(true).optional(),
  hs_analytics_source: z.literal(true).optional(),
  hs_email_first_open_date: z.literal(true).optional(),
  hs_latest_source: z.literal(true).optional(),
  zip: z.literal(true).optional(),
  country: z.literal(true).optional(),
  hs_all_accessible_team_ids: z.literal(true).optional(),
  hs_analytics_source_data_1: z.literal(true).optional(),
  hs_email_first_click_date: z.literal(true).optional(),
  hs_latest_source_data_1: z.literal(true).optional(),
  linkedinconnections: z.literal(true).optional(),
  hs_analytics_source_data_2: z.literal(true).optional(),
  hs_email_is_ineligible: z.literal(true).optional(),
  hs_language: z.literal(true).optional(),
  hs_latest_source_data_2: z.literal(true).optional(),
  kloutscoregeneral: z.literal(true).optional(),
  hs_analytics_first_referrer: z.literal(true).optional(),
  hs_email_first_reply_date: z.literal(true).optional(),
  jobtitle: z.literal(true).optional(),
  photo: z.literal(true).optional(),
  hs_analytics_last_referrer: z.literal(true).optional(),
  hs_email_last_reply_date: z.literal(true).optional(),
  message: z.literal(true).optional(),
  closedate: z.literal(true).optional(),
  hs_analytics_average_page_views: z.literal(true).optional(),
  hs_email_replied: z.literal(true).optional(),
  hs_analytics_revenue: z.literal(true).optional(),
  hs_lifecyclestage_lead_date: z.literal(true).optional(),
  hs_lifecyclestage_marketingqualifiedlead_date: z.literal(true).optional(),
  hs_lifecyclestage_opportunity_date: z.literal(true).optional(),
  lifecyclestage: z.literal(true).optional(),
  hs_lifecyclestage_salesqualifiedlead_date: z.literal(true).optional(),
  createdate: z.literal(true).optional(),
  hs_lifecyclestage_evangelist_date: z.literal(true).optional(),
  hs_lifecyclestage_customer_date: z.literal(true).optional(),
  hubspotscore: z.literal(true).optional(),
  company: z.literal(true).optional(),
  hs_lifecyclestage_subscriber_date: z.literal(true).optional(),
  hs_lifecyclestage_other_date: z.literal(true).optional(),
  website: z.literal(true).optional(),
  numemployees: z.literal(true).optional(),
  annualrevenue: z.literal(true).optional(),
  industry: z.literal(true).optional(),
  associatedcompanyid: z.literal(true).optional(),
  associatedcompanylastupdated: z.literal(true).optional(),
  hs_predictivecontactscorebucket: z.literal(true).optional(),
  hs_predictivecontactscore: z.literal(true).optional(),
}).strict();
const WhereArgValidator = z.object({
  company_size: z.literal(true).optional(),
  date_of_birth: z.literal(true).optional(),
  days_to_close: z.literal(true).optional(),
  degree: z.literal(true).optional(),
  field_of_study: z.literal(true).optional(),
  first_conversion_date: z.literal(true).optional(),
  first_conversion_event_name: z.literal(true).optional(),
  first_deal_created_date: z.literal(true).optional(),
  gender: z.literal(true).optional(),
  graduation_date: z.literal(true).optional(),
  hs_additional_emails: z.literal(true).optional(),
  hs_all_assigned_business_unit_ids: z.literal(true).optional(),
  hs_all_contact_vids: z.literal(true).optional(),
  hs_analytics_first_touch_converting_campaign: z.literal(true).optional(),
  hs_analytics_last_touch_converting_campaign: z.literal(true).optional(),
  hs_avatar_filemanager_key: z.literal(true).optional(),
  hs_buying_role: z.literal(true).optional(),
  hs_calculated_form_submissions: z.literal(true).optional(),
  hs_calculated_merged_vids: z.literal(true).optional(),
  hs_calculated_mobile_number: z.literal(true).optional(),
  hs_calculated_phone_number: z.literal(true).optional(),
  hs_calculated_phone_number_area_code: z.literal(true).optional(),
  hs_calculated_phone_number_country_code: z.literal(true).optional(),
  hs_calculated_phone_number_region_code: z.literal(true).optional(),
  hs_clicked_linkedin_ad: z.literal(true).optional(),
  hs_content_membership_email: z.literal(true).optional(),
  hs_content_membership_email_confirmed: z.literal(true).optional(),
  hs_content_membership_follow_up_enqueued_at: z.literal(true).optional(),
  hs_content_membership_notes: z.literal(true).optional(),
  hs_content_membership_registered_at: z.literal(true).optional(),
  hs_content_membership_registration_domain_sent_to: z.literal(true).optional(),
  hs_content_membership_registration_email_sent_at: z.literal(true).optional(),
  hs_content_membership_status: z.literal(true).optional(),
  hs_conversations_visitor_email: z.literal(true).optional(),
  hs_count_is_unworked: z.literal(true).optional(),
  hs_count_is_worked: z.literal(true).optional(),
  hs_created_by_conversations: z.literal(true).optional(),
  hs_created_by_user_id: z.literal(true).optional(),
  hs_createdate: z.literal(true).optional(),
  hs_date_entered_customer: z.literal(true).optional(),
  hs_date_entered_evangelist: z.literal(true).optional(),
  hs_date_entered_lead: z.literal(true).optional(),
  hs_date_entered_marketingqualifiedlead: z.literal(true).optional(),
  hs_date_entered_opportunity: z.literal(true).optional(),
  hs_date_entered_other: z.literal(true).optional(),
  hs_date_entered_salesqualifiedlead: z.literal(true).optional(),
  hs_date_entered_subscriber: z.literal(true).optional(),
  hs_date_exited_customer: z.literal(true).optional(),
  hs_date_exited_evangelist: z.literal(true).optional(),
  hs_date_exited_lead: z.literal(true).optional(),
  hs_date_exited_marketingqualifiedlead: z.literal(true).optional(),
  hs_date_exited_opportunity: z.literal(true).optional(),
  hs_date_exited_other: z.literal(true).optional(),
  hs_date_exited_salesqualifiedlead: z.literal(true).optional(),
  hs_date_exited_subscriber: z.literal(true).optional(),
  hs_document_last_revisited: z.literal(true).optional(),
  hs_email_bad_address: z.literal(true).optional(),
  hs_email_customer_quarantined_reason: z.literal(true).optional(),
  hs_email_domain: z.literal(true).optional(),
  hs_email_hard_bounce_reason: z.literal(true).optional(),
  hs_email_hard_bounce_reason_enum: z.literal(true).optional(),
  hs_email_quarantined: z.literal(true).optional(),
  hs_email_quarantined_reason: z.literal(true).optional(),
  hs_email_recipient_fatigue_recovery_time: z.literal(true).optional(),
  hs_email_sends_since_last_engagement: z.literal(true).optional(),
  hs_emailconfirmationstatus: z.literal(true).optional(),
  hs_facebook_ad_clicked: z.literal(true).optional(),
  hs_facebook_click_id: z.literal(true).optional(),
  hs_facebookid: z.literal(true).optional(),
  hs_feedback_last_nps_follow_up: z.literal(true).optional(),
  hs_feedback_last_nps_rating: z.literal(true).optional(),
  hs_feedback_last_survey_date: z.literal(true).optional(),
  hs_feedback_show_nps_web_survey: z.literal(true).optional(),
  hs_first_engagement_object_id: z.literal(true).optional(),
  hs_first_outreach_date: z.literal(true).optional(),
  hs_first_subscription_create_date: z.literal(true).optional(),
  hs_google_click_id: z.literal(true).optional(),
  hs_googleplusid: z.literal(true).optional(),
  hs_has_active_subscription: z.literal(true).optional(),
  hs_ip_timezone: z.literal(true).optional(),
  hs_is_contact: z.literal(true).optional(),
  hs_is_unworked: z.literal(true).optional(),
  hs_last_sales_activity_date: z.literal(true).optional(),
  hs_last_sales_activity_timestamp: z.literal(true).optional(),
  hs_last_sales_activity_type: z.literal(true).optional(),
  hs_lastmodifieddate: z.literal(true).optional(),
  hs_latest_sequence_ended_date: z.literal(true).optional(),
  hs_latest_sequence_enrolled: z.literal(true).optional(),
  hs_latest_sequence_enrolled_date: z.literal(true).optional(),
  hs_latest_sequence_finished_date: z.literal(true).optional(),
  hs_latest_sequence_unenrolled_date: z.literal(true).optional(),
  hs_latest_source_timestamp: z.literal(true).optional(),
  hs_latest_subscription_create_date: z.literal(true).optional(),
  hs_lead_status: z.literal(true).optional(),
  hs_legal_basis: z.literal(true).optional(),
  hs_linkedin_ad_clicked: z.literal(true).optional(),
  hs_linkedinid: z.literal(true).optional(),
  hs_marketable_reason_id: z.literal(true).optional(),
  hs_marketable_reason_type: z.literal(true).optional(),
  hs_marketable_status: z.literal(true).optional(),
  hs_marketable_until_renewal: z.literal(true).optional(),
  hs_merged_object_ids: z.literal(true).optional(),
  hs_object_id: z.literal(true).optional(),
  hs_object_source: z.literal(true).optional(),
  hs_object_source_id: z.literal(true).optional(),
  hs_object_source_user_id: z.literal(true).optional(),
  hs_pinned_engagement_id: z.literal(true).optional(),
  hs_pipeline: z.literal(true).optional(),
  hs_predictivecontactscore_v2: z.literal(true).optional(),
  hs_predictivescoringtier: z.literal(true).optional(),
  hs_read_only: z.literal(true).optional(),
  hs_sa_first_engagement_date: z.literal(true).optional(),
  hs_sa_first_engagement_descr: z.literal(true).optional(),
  hs_sa_first_engagement_object_type: z.literal(true).optional(),
  hs_sales_email_last_clicked: z.literal(true).optional(),
  hs_sales_email_last_opened: z.literal(true).optional(),
  hs_searchable_calculated_international_mobile_number: z.literal(true).optional(),
  hs_searchable_calculated_international_phone_number: z.literal(true).optional(),
  hs_searchable_calculated_mobile_number: z.literal(true).optional(),
  hs_searchable_calculated_phone_number: z.literal(true).optional(),
  hs_sequences_actively_enrolled_count: z.literal(true).optional(),
  hs_sequences_enrolled_count: z.literal(true).optional(),
  hs_sequences_is_enrolled: z.literal(true).optional(),
  hs_source_object_id: z.literal(true).optional(),
  hs_source_portal_id: z.literal(true).optional(),
  hs_testpurge: z.literal(true).optional(),
  hs_testrollback: z.literal(true).optional(),
  hs_time_between_contact_creation_and_deal_close: z.literal(true).optional(),
  hs_time_between_contact_creation_and_deal_creation: z.literal(true).optional(),
  hs_time_in_customer: z.literal(true).optional(),
  hs_time_in_evangelist: z.literal(true).optional(),
  hs_time_in_lead: z.literal(true).optional(),
  hs_time_in_marketingqualifiedlead: z.literal(true).optional(),
  hs_time_in_opportunity: z.literal(true).optional(),
  hs_time_in_other: z.literal(true).optional(),
  hs_time_in_salesqualifiedlead: z.literal(true).optional(),
  hs_time_in_subscriber: z.literal(true).optional(),
  hs_time_to_first_engagement: z.literal(true).optional(),
  hs_time_to_move_from_lead_to_customer: z.literal(true).optional(),
  hs_time_to_move_from_marketingqualifiedlead_to_customer: z.literal(true).optional(),
  hs_time_to_move_from_opportunity_to_customer: z.literal(true).optional(),
  hs_time_to_move_from_salesqualifiedlead_to_customer: z.literal(true).optional(),
  hs_time_to_move_from_subscriber_to_customer: z.literal(true).optional(),
  hs_timezone: z.literal(true).optional(),
  hs_twitterid: z.literal(true).optional(),
  hs_unique_creation_key: z.literal(true).optional(),
  hs_updated_by_user_id: z.literal(true).optional(),
  hs_user_ids_of_all_notification_followers: z.literal(true).optional(),
  hs_user_ids_of_all_notification_unfollowers: z.literal(true).optional(),
  hs_user_ids_of_all_owners: z.literal(true).optional(),
  hs_v2_cumulative_time_in_customer: z.literal(true).optional(),
  hs_v2_cumulative_time_in_evangelist: z.literal(true).optional(),
  hs_v2_cumulative_time_in_lead: z.literal(true).optional(),
  hs_v2_cumulative_time_in_marketingqualifiedlead: z.literal(true).optional(),
  hs_v2_cumulative_time_in_opportunity: z.literal(true).optional(),
  hs_v2_cumulative_time_in_other: z.literal(true).optional(),
  hs_v2_cumulative_time_in_salesqualifiedlead: z.literal(true).optional(),
  hs_v2_cumulative_time_in_subscriber: z.literal(true).optional(),
  hs_v2_date_entered_customer: z.literal(true).optional(),
  hs_v2_date_entered_evangelist: z.literal(true).optional(),
  hs_v2_date_entered_lead: z.literal(true).optional(),
  hs_v2_date_entered_marketingqualifiedlead: z.literal(true).optional(),
  hs_v2_date_entered_opportunity: z.literal(true).optional(),
  hs_v2_date_entered_other: z.literal(true).optional(),
  hs_v2_date_entered_salesqualifiedlead: z.literal(true).optional(),
  hs_v2_date_entered_subscriber: z.literal(true).optional(),
  hs_v2_date_exited_customer: z.literal(true).optional(),
  hs_v2_date_exited_evangelist: z.literal(true).optional(),
  hs_v2_date_exited_lead: z.literal(true).optional(),
  hs_v2_date_exited_marketingqualifiedlead: z.literal(true).optional(),
  hs_v2_date_exited_opportunity: z.literal(true).optional(),
  hs_v2_date_exited_other: z.literal(true).optional(),
  hs_v2_date_exited_salesqualifiedlead: z.literal(true).optional(),
  hs_v2_date_exited_subscriber: z.literal(true).optional(),
  hs_v2_latest_time_in_customer: z.literal(true).optional(),
  hs_v2_latest_time_in_evangelist: z.literal(true).optional(),
  hs_v2_latest_time_in_lead: z.literal(true).optional(),
  hs_v2_latest_time_in_marketingqualifiedlead: z.literal(true).optional(),
  hs_v2_latest_time_in_opportunity: z.literal(true).optional(),
  hs_v2_latest_time_in_other: z.literal(true).optional(),
  hs_v2_latest_time_in_salesqualifiedlead: z.literal(true).optional(),
  hs_v2_latest_time_in_subscriber: z.literal(true).optional(),
  hs_was_imported: z.literal(true).optional(),
  hs_whatsapp_phone_number: z.literal(true).optional(),
  hubspot_owner_assigneddate: z.literal(true).optional(),
  ip_city: z.literal(true).optional(),
  ip_country: z.literal(true).optional(),
  ip_country_code: z.literal(true).optional(),
  ip_latlon: z.literal(true).optional(),
  ip_state: z.literal(true).optional(),
  ip_state_code: z.literal(true).optional(),
  ip_zipcode: z.literal(true).optional(),
  job_function: z.literal(true).optional(),
  lastmodifieddate: z.literal(true).optional(),
  marital_status: z.literal(true).optional(),
  military_status: z.literal(true).optional(),
  num_associated_deals: z.literal(true).optional(),
  num_conversion_events: z.literal(true).optional(),
  num_unique_conversion_events: z.literal(true).optional(),
  recent_conversion_date: z.literal(true).optional(),
  recent_conversion_event_name: z.literal(true).optional(),
  recent_deal_amount: z.literal(true).optional(),
  recent_deal_close_date: z.literal(true).optional(),
  relationship_status: z.literal(true).optional(),
  school: z.literal(true).optional(),
  seniority: z.literal(true).optional(),
  start_date: z.literal(true).optional(),
  total_revenue: z.literal(true).optional(),
  work_email: z.literal(true).optional(),
  firstname: z.literal(true).optional(),
  hs_analytics_first_url: z.literal(true).optional(),
  hs_email_delivered: z.literal(true).optional(),
  hs_email_optout_227290470: z.literal(true).optional(),
  hs_email_optout_227290476: z.literal(true).optional(),
  twitterhandle: z.literal(true).optional(),
  currentlyinworkflow: z.literal(true).optional(),
  followercount: z.literal(true).optional(),
  hs_analytics_last_url: z.literal(true).optional(),
  hs_email_open: z.literal(true).optional(),
  lastname: z.literal(true).optional(),
  hs_analytics_num_page_views: z.literal(true).optional(),
  hs_email_click: z.literal(true).optional(),
  salutation: z.literal(true).optional(),
  twitterprofilephoto: z.literal(true).optional(),
  email: z.literal(true).optional(),
  hs_analytics_num_visits: z.literal(true).optional(),
  hs_email_bounce: z.literal(true).optional(),
  hs_persona: z.literal(true).optional(),
  hs_social_last_engagement: z.literal(true).optional(),
  hs_analytics_num_event_completions: z.literal(true).optional(),
  hs_email_optout: z.literal(true).optional(),
  hs_social_twitter_clicks: z.literal(true).optional(),
  mobilephone: z.literal(true).optional(),
  phone: z.literal(true).optional(),
  fax: z.literal(true).optional(),
  hs_analytics_first_timestamp: z.literal(true).optional(),
  hs_email_last_email_name: z.literal(true).optional(),
  hs_email_last_send_date: z.literal(true).optional(),
  hs_social_facebook_clicks: z.literal(true).optional(),
  address: z.literal(true).optional(),
  engagements_last_meeting_booked: z.literal(true).optional(),
  engagements_last_meeting_booked_campaign: z.literal(true).optional(),
  engagements_last_meeting_booked_medium: z.literal(true).optional(),
  engagements_last_meeting_booked_source: z.literal(true).optional(),
  hs_analytics_first_visit_timestamp: z.literal(true).optional(),
  hs_email_last_open_date: z.literal(true).optional(),
  hs_latest_meeting_activity: z.literal(true).optional(),
  hs_sales_email_last_replied: z.literal(true).optional(),
  hs_social_linkedin_clicks: z.literal(true).optional(),
  hubspot_owner_id: z.literal(true).optional(),
  notes_last_contacted: z.literal(true).optional(),
  notes_last_updated: z.literal(true).optional(),
  notes_next_activity_date: z.literal(true).optional(),
  num_contacted_notes: z.literal(true).optional(),
  num_notes: z.literal(true).optional(),
  owneremail: z.literal(true).optional(),
  ownername: z.literal(true).optional(),
  surveymonkeyeventlastupdated: z.literal(true).optional(),
  webinareventlastupdated: z.literal(true).optional(),
  city: z.literal(true).optional(),
  hs_analytics_last_timestamp: z.literal(true).optional(),
  hs_email_last_click_date: z.literal(true).optional(),
  hs_social_google_plus_clicks: z.literal(true).optional(),
  hubspot_team_id: z.literal(true).optional(),
  linkedinbio: z.literal(true).optional(),
  twitterbio: z.literal(true).optional(),
  hs_all_owner_ids: z.literal(true).optional(),
  hs_analytics_last_visit_timestamp: z.literal(true).optional(),
  hs_email_first_send_date: z.literal(true).optional(),
  hs_social_num_broadcast_clicks: z.literal(true).optional(),
  state: z.literal(true).optional(),
  hs_all_team_ids: z.literal(true).optional(),
  hs_analytics_source: z.literal(true).optional(),
  hs_email_first_open_date: z.literal(true).optional(),
  hs_latest_source: z.literal(true).optional(),
  zip: z.literal(true).optional(),
  country: z.literal(true).optional(),
  hs_all_accessible_team_ids: z.literal(true).optional(),
  hs_analytics_source_data_1: z.literal(true).optional(),
  hs_email_first_click_date: z.literal(true).optional(),
  hs_latest_source_data_1: z.literal(true).optional(),
  linkedinconnections: z.literal(true).optional(),
  hs_analytics_source_data_2: z.literal(true).optional(),
  hs_email_is_ineligible: z.literal(true).optional(),
  hs_language: z.literal(true).optional(),
  hs_latest_source_data_2: z.literal(true).optional(),
  kloutscoregeneral: z.literal(true).optional(),
  hs_analytics_first_referrer: z.literal(true).optional(),
  hs_email_first_reply_date: z.literal(true).optional(),
  jobtitle: z.literal(true).optional(),
  photo: z.literal(true).optional(),
  hs_analytics_last_referrer: z.literal(true).optional(),
  hs_email_last_reply_date: z.literal(true).optional(),
  message: z.literal(true).optional(),
  closedate: z.literal(true).optional(),
  hs_analytics_average_page_views: z.literal(true).optional(),
  hs_email_replied: z.literal(true).optional(),
  hs_analytics_revenue: z.literal(true).optional(),
  hs_lifecyclestage_lead_date: z.literal(true).optional(),
  hs_lifecyclestage_marketingqualifiedlead_date: z.literal(true).optional(),
  hs_lifecyclestage_opportunity_date: z.literal(true).optional(),
  lifecyclestage: z.literal(true).optional(),
  hs_lifecyclestage_salesqualifiedlead_date: z.literal(true).optional(),
  createdate: z.literal(true).optional(),
  hs_lifecyclestage_evangelist_date: z.literal(true).optional(),
  hs_lifecyclestage_customer_date: z.literal(true).optional(),
  hubspotscore: z.literal(true).optional(),
  company: z.literal(true).optional(),
  hs_lifecyclestage_subscriber_date: z.literal(true).optional(),
  hs_lifecyclestage_other_date: z.literal(true).optional(),
  website: z.literal(true).optional(),
  numemployees: z.literal(true).optional(),
  annualrevenue: z.literal(true).optional(),
  industry: z.literal(true).optional(),
  associatedcompanyid: z.literal(true).optional(),
  associatedcompanylastupdated: z.literal(true).optional(),
  hs_predictivecontactscorebucket: z.literal(true).optional(),
  hs_predictivecontactscore: z.literal(true).optional(),
}).strict();
export const definition = ({
  SelectArgValidator: SelectArgValidator,
  WhereArgValidator: WhereArgValidator,
  InstanceValidator: InstanceValidator,
}) as const;
