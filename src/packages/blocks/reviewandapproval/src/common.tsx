const config = require("./config");

// Customizable Area Start
export const ApprovalType = {
  [config.pending as string]: "0",
  [config.approved as string]: "1",
  [config.rejected as string]: "2",
};

export const CommentableTypes = {
  comment: config.commentableTypeComment as string,
  post: config.commentableTypePost as string,
};

export interface ReviewApprovalReviewableType {
  id: string;
  name: string;
  description: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  body: string;
  location: string | null;
  account_id: string;
}

export interface ReviewApprovalAccountType {
  id: string;
  first_name: string;
  last_name: string;
  full_phone_number: string;
  country_code: number;
  phone_number: number;
  email: string;
  activated: boolean;
  device_id: string | null;
  unique_auth_id: string;
  created_at: string;
  updated_at: string;
  user_name: string | null;
  platform: string | null;
  user_type: string | null;
  app_language_id: string | null;
  is_blacklisted: boolean;
  role_id: number;
}

export interface ReviewApprovalResponseDataType {
  id: string;
  type: string;
  attributes: {
    id: string;
    account_id: string;
    reviewable_id: string;
    reviewable_type: string;
    created_at: string;
    updated_at: string;
    approval_status: keyof typeof ApprovalType;
    reviewable: ReviewApprovalReviewableType | null;
    account: ReviewApprovalAccountType | null;
  };
}
// Customizable Area End
