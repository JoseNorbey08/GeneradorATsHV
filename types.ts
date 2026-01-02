
export interface TextContent {
  matchPercentage: number;
  justification: string;
  linkedin_long: string;
  linkedin_ats: string;
  copilot_long: string;
  copilot_ats: string;
  linkedin_image_prompt: string;
  copilot_image_prompt: string;
}

export interface GeneratedContent extends TextContent {
  linkedin_image_url: string;
  copilot_image_url: string;
}

export interface ToneOption {
  value: string;
  label: string;
}
