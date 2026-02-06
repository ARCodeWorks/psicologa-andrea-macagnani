import React from 'react';

type IconProps = {
  className?: string;
  [key: string]: any;
};

const createIcon = (iconClass: string) => {
  const IconComponent: React.FC<IconProps> = ({ className, ...props }) => (
    <i className={`bi ${iconClass} ${className || ''}`} {...props}></i>
  );
  IconComponent.displayName = `Icon(${iconClass})`;
  return IconComponent;
};

export const HomeIcon = createIcon('bi-house-door-fill');
export const UserIcon = createIcon('bi-person-fill');
export const BriefcaseIcon = createIcon('bi-briefcase-fill');
export const EnvelopeIcon = createIcon('bi-envelope-fill');
export const WhatsappIcon = createIcon('bi-whatsapp');
export const BarsIcon = createIcon('bi-list');
export const XIcon = createIcon('bi-x-lg');
export const CheckCircleIcon = createIcon('bi-check-circle-fill');
export const HeartIcon = createIcon('bi-heart-fill');
export const CalendarIcon = createIcon('bi-calendar-check-fill');
export const SearchIcon = createIcon('bi-search');
export const UserMdIcon = createIcon('bi-person-badge');
export const GraduationCapIcon = createIcon('bi-mortarboard-fill');
export const LaptopHouseIcon = createIcon('bi-house-heart-fill');
export const StarIcon = createIcon('bi-star-fill');
export const UserTieIcon = createIcon('bi-person-vcard-fill');
export const ChildIcon = createIcon('bi-emoji-smile-fill');
export const UsersIcon = createIcon('bi-people-fill');
export const ClipboardCheckIcon = createIcon('bi-clipboard2-check-fill');
export const BrainIcon = createIcon('bi-lightbulb-fill');
export const PhoneIcon = createIcon('bi-telephone-fill');
export const MapPinIcon = createIcon('bi-geo-alt-fill');
export const ClockIcon = createIcon('bi-clock-fill');
export const InstagramIcon = createIcon('bi-instagram');
export const ChevronRightIcon = createIcon('bi-chevron-right');
export const ChevronUpIcon = createIcon('bi-arrow-up');
export const SendIcon = createIcon('bi-send-fill');
export const ChevronDownIcon = createIcon('bi-chevron-down');