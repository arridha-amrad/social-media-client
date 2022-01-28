export interface User {
  _id: string;
  username: string;
  avatarURL: string;
  // fullName and email may not appear in Comment-owner or Post-owner as they re using this type as well
  fullName?: string;
  email?: string;
}
