export type RegionId = 'norte' | 'leste';

export type RoleId =
  | 'admin'
  | 'leaderSupervisor'
  | 'regionalSupervisor'
  | 'supportSupervisor'
  | 'postGuard'
  | 'armedSecurity';

export type ShiftKind = 'day' | 'night';
export type AttendanceStatus = 'in_service' | 'closed';
export type OccurrenceSeverity = 'baixa' | 'media' | 'alta' | 'critica';

export type Region = {
  id: RegionId;
  name: string;
};

export type Post = {
  id: string;
  code: string;
  name: string;
  regionId: RegionId;
};

export type RoleDefinition = {
  id: RoleId;
  name: string;
  scope: 'global' | 'region' | 'post';
};

export type Team = {
  id: string;
  name: string;
  shiftKind: ShiftKind;
  cycle: string;
  coverage: RegionId[];
};

export type ShiftTemplate = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  scale: string;
};

export type DemoUser = {
  id: string;
  displayName: string;
  role: RoleId;
  regionId?: RegionId;
  postId?: string;
  teamId: string;
  active: boolean;
};

export type EvidenceFile = {
  id: string;
  uri: string;
  type: 'image' | 'video';
  label: string;
  capturedAt: string;
  demo?: boolean;
};

export type GeoPoint = {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
  capturedAt: string;
};

export type AttendanceRecord = {
  id: string;
  userId: string;
  postId: string;
  regionId: RegionId;
  teamId: string;
  roleAtShift: RoleId;
  checkInAtDevice: string;
  checkInGeo: GeoPoint | null;
  checkInPhotos: EvidenceFile[];
  checkInNote: string;
  checkOutAtDevice?: string;
  checkOutNote?: string;
  status: AttendanceStatus;
};

export type OccurrenceRecord = {
  id: string;
  title: string;
  description: string;
  type: string;
  severity: OccurrenceSeverity;
  regionId: RegionId;
  postId: string;
  createdBy: string;
  evidence: EvidenceFile[];
  status: 'aberta' | 'acompanhamento' | 'resolvida' | 'cancelada';
  createdAt: string;
};

export type MobileSeed = {
  projectId: string;
  name: string;
  regions: Region[];
  posts: Post[];
  roles: RoleDefinition[];
  teams: Team[];
  shiftTemplates: ShiftTemplate[];
  mvpRules: {
    minimumCheckInPhotos: number;
    videoEnabledForOccurrences: boolean;
    gpsRequiredWhenAvailable: boolean;
    postUserScope: 'own_post';
    regionalScope: 'own_region';
    leaderScope: 'all_regions';
  };
  demoUsers: DemoUser[];
};
