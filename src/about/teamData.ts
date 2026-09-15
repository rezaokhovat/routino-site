export type TeamSocialLink = {
  label: string
  href: string
}

export type TeamMember = {
  name: string
  role: string
  shortBio: string
  image: string
  socialLinks: TeamSocialLink[]
  order: number
}

/**
 * اعضا را اینجا اضافه کنید. تا وقتی نام، نقش، متن کوتاه و عکس تأییدشده
 * در اختیار نباشد، این آرایه خالی می‌ماند و صفحه فقط جایگاه کارت را نشان می‌دهد.
 *
 * مسیر پیشنهادی عکس: /images/team/نام-عضو.jpg
 * مثال فیلدها: name, role, shortBio, image, socialLinks, order
 *
 * دکتر لیلا صفاری فقط در صورت وجود عکس و متن تأییدشده، با نقش مجری اضافه شود.
 */
export const teamMembers: TeamMember[] = []
